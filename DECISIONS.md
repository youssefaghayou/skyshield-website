# DECISIONS

One line per non-obvious choice, newest last. The reason is the point — record it.

- **D-001** (2026-08-13) Full rebuild. The repo contained only compiled Next.js output plus
  hand-patched HTML; no source exists in any branch or any commit. Verified before deciding.
- **D-002** (2026-08-13) Live production was hash-verified byte-identical to `main` before
  salvage, so the repo is a faithful capture of the site — no separate production scrape needed.
- **D-003** (2026-08-13) Salvage extractor (`tools/salvage/extract.py`) is Python-stdlib-only
  and deterministic: Phase 0 installs nothing, and re-runs must diff clean to stay auditable.
- **D-004** (2026-08-13) The three byte-identical 404 files are archived once with aliases
  recorded, not three times.
- **D-005** (2026-08-13) Phase 0 output committed directly to `main`: additive files only,
  zero rendered-page changes, and `main` remains the live Pages source until the deploy
  pipeline switches to a build branch in Phase 1.
- **D-006** (2026-08-13) GitHub Pages serves every `page.html` at `/page` too (verified in
  production), so the redirect plan must cover both URL forms for every retired page.
- **D-007** (2026-08-14) Hosting: Cloudflare Pages (owner decision). Free tier permits
  commercial use, gives true 301s via `_redirects`, custom headers, and per-branch preview
  deploys. GitHub Pages stays only as the legacy host until DNS cutover.
- **D-008** (2026-08-14) Branch strategy during transition: `main` is frozen as the live
  GitHub Pages site; all rebuild work happens on the `rebuild` branch, deployed by
  Cloudflare Pages to a *.pages.dev preview. At cutover: merge `rebuild` → `main`, point
  Cloudflare production at `main`, move DNS, retire GitHub Pages. Reason: pushing source to
  `main` before cutover would 404 the live site.
- **D-009** (2026-08-14) Single dark theme (owner decision). The legacy light/dark toggle is
  retired; there is no second theme to maintain.
- **D-010** (2026-08-14) Web & mobile app development is no longer offered (owner decision).
  `/development.html` gets a redirect, no successor page.
- **D-011** (2026-08-14) Cyber IA derives from salvage (owner decision): offensive /
  defensive / cloud / incident-forensics under `/cyber/*`. SOC folds into defensive,
  GRC/compliance into cloud, until content justifies a split.
