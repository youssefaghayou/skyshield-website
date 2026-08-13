#!/usr/bin/env python3
"""Phase 0 salvage extractor for the legacy skyshieldtechnology.com build.

Non-destructive: reads the legacy ``*.html`` files in the repo, writes structured
MDX archives plus a machine-readable inventory under ``content/legacy/``.

Stdlib only — the Phase 0 rule is that nothing gets installed. Deterministic —
re-running against the same tree produces identical output, so the archive is
diffable and auditable.

Usage:  python3 tools/salvage/extract.py
"""
from __future__ import annotations

import hashlib
import json
import re
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "content" / "legacy"
PAGES_OUT = OUT / "pages"

# Fixed so re-runs are deterministic; bump manually if the archive is regenerated.
EXTRACTED_DATE = "2026-08-13"

SITE = "https://skyshieldtechnology.com"

# Tags whose entire subtree is dropped (non-content).
SKIP_TAGS = {"script", "style", "noscript", "svg", "template", "iframe", "canvas", "video", "audio"}
HEADINGS = {"h1", "h2", "h3", "h4", "h5", "h6"}
# Block-level tags: closing (or opening) one flushes the current inline buffer.
BLOCKS = {
    "p", "div", "section", "article", "header", "footer", "main", "aside", "nav",
    "figure", "figcaption", "ul", "ol", "form", "fieldset", "details", "summary",
    "address", "blockquote", "hr", "br",
}


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


class PageExtractor(HTMLParser):
    """Walks one HTML document; produces markdown lines + head metadata."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.meta: dict[str, str] = {}
        self.canonical = ""
        self.jsonld: list[str] = []
        self.images: list[dict[str, str]] = []
        self.form_fields: list[str] = []
        self.lines: list[str] = []
        # parser state
        self._skip_depth = 0
        self._jsonld_active = False
        self._in_title = False
        self._buf: list[str] = []
        self._heading: int | None = None
        self._li = False
        self._link: dict | None = None  # {"href": str, "text": []}
        self._row: list[str] | None = None
        self._cell: list[str] | None = None

    # ---- emit helpers -------------------------------------------------
    def _flush(self) -> None:
        text = norm(" ".join(self._buf))
        self._buf = []
        if not text:
            return
        if self._heading:
            line = "#" * self._heading + " " + text
        elif self._li:
            line = "- " + text
        else:
            line = text
        # collapse exact consecutive duplicates (repeated chrome)
        if self.lines and self.lines[-1] == line:
            return
        self.lines.append(line)

    def _append_inline(self, text: str) -> None:
        if self._cell is not None:
            self._cell.append(text)
        elif self._link is not None:
            self._link["text"].append(text)
        else:
            self._buf.append(text)

    # ---- tag handling -------------------------------------------------
    def handle_starttag(self, tag: str, attrs) -> None:
        a = dict(attrs)
        if tag == "script" and a.get("type") == "application/ld+json" and self._skip_depth == 0:
            self._jsonld_active = True
            return
        if tag in SKIP_TAGS:
            self._skip_depth += 1
            return
        if self._skip_depth:
            return

        if tag == "title":
            self._in_title = True
        elif tag == "meta":
            key = a.get("name") or a.get("property")
            if key and a.get("content") is not None:
                self.meta[key] = a["content"]
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href", "")
        elif tag in HEADINGS:
            self._flush()
            self._heading = int(tag[1])
        elif tag in ("li", "option"):
            self._flush()
            self._li = True
        elif tag == "a":
            self._link = {"href": a.get("href", ""), "text": []}
        elif tag == "img":
            src, alt = a.get("src", ""), a.get("alt", "")
            self.images.append({"src": src, "alt": alt})
            self._append_inline(f"![{alt}]({src})")
        elif tag in ("input", "textarea", "select"):
            if a.get("type") in ("hidden", "submit"):
                if a.get("type") == "submit" and a.get("value"):
                    self._append_inline(a["value"])
                return
            desc = a.get("name") or a.get("id") or ""
            extra = a.get("placeholder", "")
            field = f"`[form field: {tag} {desc}" + (f" — “{extra}”" if extra else "") + "]`"
            self._flush()
            self._buf.append(field)
            self._flush()
            self.form_fields.append(norm(f"{tag} {desc} {extra}"))
        elif tag == "tr":
            self._flush()
            self._row = []
        elif tag in ("td", "th"):
            self._cell = []
        elif tag in ("strong", "b"):
            self._append_inline("**")
        elif tag in ("em", "i"):
            self._append_inline("*")
        elif tag in ("br", "hr"):
            self._flush()
        elif tag in BLOCKS:
            self._flush()

    def handle_endtag(self, tag: str) -> None:
        if tag == "script" and self._jsonld_active:
            self._jsonld_active = False
            return
        if tag in SKIP_TAGS:
            self._skip_depth = max(0, self._skip_depth - 1)
            return
        if self._skip_depth:
            return

        if tag == "title":
            self._in_title = False
        elif tag in HEADINGS:
            self._flush()
            self._heading = None
        elif tag in ("li", "option"):
            self._flush()
            self._li = False
        elif tag == "a" and self._link is not None:
            text = norm(" ".join(self._link["text"]))
            href = self._link["href"]
            self._link = None
            if text:
                self._append_inline(f"[{text}]({href})" if href else text)
        elif tag in ("td", "th") and self._cell is not None:
            cell = norm(" ".join(self._cell))
            self._cell = None
            if self._row is not None:
                self._row.append(cell)
        elif tag == "tr" and self._row is not None:
            if any(self._row):
                self.lines.append("| " + " | ".join(self._row) + " |")
            self._row = None
        elif tag in ("strong", "b"):
            self._append_inline("**")
        elif tag in ("em", "i"):
            self._append_inline("*")
        elif tag in BLOCKS:
            self._flush()

    def handle_data(self, data: str) -> None:
        if self._jsonld_active:
            self.jsonld.append(data)
            return
        if self._skip_depth:
            return
        if self._in_title:
            self.title += data
            return
        if norm(data):
            self._append_inline(data)

    # ---- output -------------------------------------------------------
    def markdown(self) -> str:
        self._flush()
        out: list[str] = []
        for line in self.lines:
            out.append(line)
            out.append("")
        return "\n".join(out).strip() + "\n"


def yaml_str(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def served_urls(rel: str) -> list[str]:
    """URL forms GitHub Pages serves for a given file (verified live 2026-08-13)."""
    if rel == "index.html":
        return ["/", "/index.html"]
    if rel.endswith("/index.html"):
        return ["/" + rel[: -len("index.html")]]
    if rel.endswith(".html"):
        stem = "/" + rel[: -len(".html")]
        return [stem + ".html", stem]  # extensionless form confirmed to resolve
    return ["/" + rel]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    PAGES_OUT.mkdir(parents=True, exist_ok=True)

    page_files = sorted(
        [p for p in ROOT.glob("*.html")]
        + [p for p in (ROOT / "404").glob("index.html")]
        + [p for p in (ROOT / "_not-found").glob("index.html")]
    )

    # Group byte-identical files: extract once, record every alias.
    by_hash: dict[str, list[Path]] = {}
    for p in page_files:
        by_hash.setdefault(sha256(p), []).append(p)

    sitemap_urls: set[str] = set()
    sm = ROOT / "sitemap.xml"
    if sm.exists():
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        for loc in ET.parse(sm).getroot().findall(".//s:loc", ns):
            sitemap_urls.add((loc.text or "").replace(SITE, "") or "/")

    inventory: dict = {
        "generated": EXTRACTED_DATE,
        "site": SITE,
        "source_branch": "main",
        "note": "Legacy build inventory. Live site verified byte-identical to main on 2026-08-13.",
        "pages": [],
        "files": [],
    }
    summary: list[str] = []

    for digest, paths in sorted(by_hash.items(), key=lambda kv: str(kv[1][0])):
        primary = paths[0]
        rel = primary.relative_to(ROOT).as_posix()
        aliases = [p.relative_to(ROOT).as_posix() for p in paths[1:]]
        ex = PageExtractor()
        ex.feed(primary.read_text(encoding="utf-8", errors="replace"))
        body = ex.markdown()

        urls: list[str] = []
        for p in paths:
            urls += served_urls(p.relative_to(ROOT).as_posix())

        slug = rel.replace("/index.html", "").replace(".html", "").replace("/", "-") or "index"
        words = len(re.findall(r"\w+", body))

        fm = ["---"]
        fm.append(f"source_file: {yaml_str(rel)}")
        if aliases:
            fm.append("byte_identical_aliases:")
            fm += [f"  - {yaml_str(a)}" for a in aliases]
        fm.append(f"source_sha256: {yaml_str(digest)}")
        fm.append(f"source_bytes: {primary.stat().st_size}")
        fm.append(f"extracted: {yaml_str(EXTRACTED_DATE)}")
        fm.append("legacy_urls:")
        fm += [f"  - {yaml_str(u)}" for u in urls]
        fm.append(f"in_sitemap: {str(any(u in sitemap_urls for u in urls)).lower()}")
        fm.append(f"title: {yaml_str(norm(ex.title))}")
        fm.append(f"description: {yaml_str(ex.meta.get('description', ''))}")
        fm.append(f"canonical: {yaml_str(ex.canonical)}")
        og = {k: v for k, v in ex.meta.items() if k.startswith(("og:", "twitter:"))}
        if og:
            fm.append("social_meta:")
            fm += [f"  {yaml_str(k)}: {yaml_str(v)}" for k, v in sorted(og.items())]
        if ex.images:
            fm.append("images:")
            for im in ex.images:
                fm.append(f"  - src: {yaml_str(im['src'])}")
                fm.append(f"    alt: {yaml_str(im['alt'])}")
        if ex.form_fields:
            fm.append("form_fields:")
            fm += [f"  - {yaml_str(f)}" for f in ex.form_fields]
        fm.append("---")

        doc = "\n".join(fm) + "\n\n" + body
        if ex.jsonld:
            doc += "\n## Structured data (JSON-LD, verbatim)\n\n```json\n" + "\n".join(ex.jsonld).strip() + "\n```\n"
        (PAGES_OUT / f"{slug}.mdx").write_text(doc, encoding="utf-8")

        inventory["pages"].append({
            "slug": slug,
            "source_file": rel,
            "aliases": aliases,
            "sha256": digest,
            "bytes": primary.stat().st_size,
            "urls": urls,
            "in_sitemap": any(u in sitemap_urls for u in urls),
            "title": norm(ex.title),
            "description": ex.meta.get("description", ""),
            "word_count": words,
            "headings": sum(1 for l in body.splitlines() if l.startswith("#")),
            "images": ex.images,
        })
        summary.append(f"{slug:38s} {words:5d} words  {len(urls)} urls  sitemap={any(u in sitemap_urls for u in urls)}")

    # Whole-tree file inventory (everything tracked except .git)
    def category(rel: str) -> str:
        if rel.startswith("_next/"):
            return "build-artifact"
        if rel.startswith("_not-found") or rel.startswith("404"):
            return "system-page"
        if rel.endswith(".html"):
            return "content-page"
        if rel in ("logo.png", "favicon.png", "favicon.ico"):
            return "brand-asset"
        if rel in ("site-enhancements.css", "site-enhancements.js"):
            return "enhancement-layer"
        if rel in ("sitemap.xml", "robots.txt"):
            return "seo"
        if rel in ("CNAME", ".nojekyll"):
            return "hosting-infra"
        return "meta"

    for p in sorted(ROOT.rglob("*")):
        if p.is_dir() or ".git" in p.parts or "content" in p.parts or "tools" in p.parts:
            continue
        rel = p.relative_to(ROOT).as_posix()
        inventory["files"].append({
            "path": rel,
            "bytes": p.stat().st_size,
            "sha256": sha256(p),
            "category": category(rel),
        })

    (OUT / "inventory.json").write_text(
        json.dumps(inventory, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    print(f"{len(inventory['pages'])} unique pages ({len(page_files)} files) → {PAGES_OUT.relative_to(ROOT)}")
    print(f"{len(inventory['files'])} files inventoried → {OUT.relative_to(ROOT)}/inventory.json")
    print()
    print("\n".join(summary))


if __name__ == "__main__":
    main()
