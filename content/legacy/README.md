# content/legacy — the salvage archive

**Read-only. Never edited, never deleted.** This directory is the only surviving copy of the
legacy skyshieldtechnology.com content, extracted from the compiled build output that used to
be the entire repository. The rebuild consumes it as source material; it never modifies it.

Extracted 2026-08-13 from `main` @ `695fb57`, at which point the live site was verified
byte-identical to the repo (homepage and one subpage hash-compared against production).

## Layout

| Path | What it is |
|---|---|
| `pages/*.mdx` | One file per unique legacy page: full front-matter provenance + extracted content |
| `inventory.json` | Machine-readable inventory of every file in the legacy build, with hashes |
| `URL-INVENTORY.md` | Every URL the legacy site serves, and its proposed disposition in the rebuild |
| `ENHANCEMENTS-ANALYSIS.md` | What `site-enhancements.css/js` were patching — the requirements they encode |
| `CONTENT-GAPS.md` | What the new site needs that the legacy site cannot provide |

## Provenance model

Each `pages/*.mdx` front-matter records: source file, SHA-256, byte size, extraction date,
every URL form the page serves, sitemap membership, full head metadata (title, description,
canonical, OG/Twitter), image references, and form fields. Byte-identical files (the three
404 variants) are archived once with their aliases listed. JSON-LD blocks are preserved
verbatim in a fenced section.

## Extraction notes

- Produced by `tools/salvage/extract.py` (Python stdlib only, deterministic, re-runnable).
- Navigation/footer chrome is deliberately retained — link labels are authored copy too.
- Tables are archived row-per-line without separator rows; these files are an archive,
  not render-ready MDX. Adapt content out of them; do not compile them directly.
- `<option>` lists (the booking form's service catalogue) extract as list items.
