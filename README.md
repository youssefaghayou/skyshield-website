# skyshieldtechnology.com — source

Next.js 15 static export, deployed on Cloudflare Pages. This branch (`rebuild`)
is the source of truth during the rebuild; `main` is frozen as the legacy
GitHub Pages site until DNS cutover (see `DECISIONS.md`, D-008).

```sh
npm ci          # install
npm run dev     # local dev server
npm run build   # static export → out/
npm run typecheck && npm run lint && npm run format:check
```

## Layout

```
app/                routes (App Router)
components/
  primitives/       corner brackets, rule labels, telemetry, node markers, scanlines
  motion/           Lenis + GSAP wiring
  site/             header, footer, placeholders
content/legacy/     Phase 0 salvage of the old site — READ ONLY, never deleted
lib/                fonts, motion constants
styles/tokens.css   every colour, size, duration and easing — the only place raw values live
public/_redirects   Cloudflare redirects (populated in Phase 4)
DECISIONS.md        every non-obvious choice, one line each, with the reason
ASSETS-REQUIRED.md  missing-asset log with generation prompts
```

## Rules that keep this maintainable

- No raw hex/duration/easing outside `styles/tokens.css`.
- No invented product facts — unknowns are `[NEEDS INPUT]` and logged.
- `content/legacy/` is an archive: read, never edit.
- `prefers-reduced-motion` variants are designed, not stubbed.
- Commit in small, described increments; record non-obvious choices in `DECISIONS.md`.
