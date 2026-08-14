# ASSETS REQUIRED

Every asset the site needs but does not have, sorted by blocking severity.
Protocol: never block on a missing asset — ship a labelled placeholder at the
correct aspect ratio, log the request here, and write the full generation
prompt so the asset can be produced without further briefing. Prompts are
art-directed in the established house style before an entry is marked READY.

Status legend: `REQUESTED` (prompt ready) · `PROMPT-PENDING` (logged, prompt
follows with the phase that defines its look) · `DELIVERED`.

---

## [ASSET: logo-vector]

- **Used at:** every page (header, footer, OG imagery, favicons)
- **Format:** SVG (master), plus derived PNG/ICO favicon set
- **Placeholder:** wordmark set in the display face; legacy `public/logo.png`
  (1.9 MB raster, only surviving logo asset) available as reference
- **Status:** REQUESTED — needs the original logo source from the owner, or a
  redraw approval if no vector source exists

### Generation prompt

Not applicable — this is a request for the owner's original brand asset, not a
generated image. If no vector exists, a redraw will be specced in Phase 2.

---

## [ASSET: og-image]

- **Used at:** every route (social sharing card); legacy site references
  `og-image.png` that does not exist — currently a broken reference in production
- **Format:** PNG, 1200×630, ≤ 300 KB
- **Placeholder:** none needed on-page; metadata omits the image until delivered
- **Status:** PROMPT-PENDING — the card must reflect the homepage design
  language, which Phase 2 defines. Prompt will be written then.

---

## [ASSET: hero-video]

- **Used at:** / (Section 1 — APEX), 0.4 opacity behind grain
- **Format:** MP4 (H.264) + WebM, 1920×1080, 20–30 s seamless loop,
  ≤ 4 Mbps target bitrate, no narrative content — ambient, slow, no cuts
- **Placeholder:** solid `--void` with the apex-node 3D scene only
- **Status:** PROMPT-PENDING — art direction lands with Phase 2.
