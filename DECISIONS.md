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
