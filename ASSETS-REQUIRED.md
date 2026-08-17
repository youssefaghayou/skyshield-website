# ASSETS REQUIRED

Every asset the site needs but does not have, sorted by blocking severity.
Protocol: never block on a missing asset — ship a labelled placeholder at the
correct aspect ratio, log the request here, and write the complete generation
prompt so the asset can be produced with no further briefing.

Status legend: `REQUESTED` (prompt ready, can be generated now) ·
`PROMPT-PENDING` (logged, prompt follows with the phase that defines its look) ·
`DELIVERED`.

House prompt structure, always in this order: material law → form →
environment → camera (focal length, aperture) → motivated light plot → text
overlay → logo placement → hex palette → explicit negatives → atmosphere.

---

## [ASSET: air-domain-hero]

- **Used at:** `/` (Section 3 — AIR), `/air` (header)
- **Format:** AVIF + WebP fallback, 2560×1440, ≤ 400 KB
- **Placeholder:** retired — asset live on `/`
- **Status:** DELIVERED 2026-08-17 (1672×941 vs 2560×1440 spec — fine at display opacity;
  higher-res welcome, not required). Derivatives: `public/media/air-domain-hero-*.{avif,webp}`

### Generation prompt

Material law: everything in frame obeys one law — matte engineered surfaces,
no chrome, no gloss; cloud is volumetric water vapour, not smoke; light is
scattered, never emitted by objects. Form: a vast serpentine formation of
thousands of identical small fixed-wing aircraft, reading at distance as a
single dragon-like animal banking through a storm shelf; the body tapers and
the head region is denser than the tail; individual airframes only resolve
within 100 m of the camera — nearest ones show matte grey-blue composite
skin. Environment: night, high-altitude storm deck seen from slightly above
cloud tops; a second cloud layer far below; distant intracloud lightning
illuminating the formation from inside the cloud. Camera: full-frame, 85 mm,
f/5.6, 1/250 s, slight downward pitch, formation crossing frame
left-to-right, horizon low and level. Light plot: single key = the lightning
flash inside the cloud bank camera-left, cold violet-white (#EAE4FF); fill =
faint starlight from above; rim on the nearest airframes only, motivated by
the flash. No other light sources. Text overlay: none. Logo: none. Palette:
deep #141C2E, primary #3FE0FF used only as faint formation navigation lights,
accent #EAE4FF lightning, blacks to #000000. Negatives: no lens flare, no
readable markings or insignia, no missiles or weapons visible, no glowing
engine trails, no sci-fi hologram UI, no birds, no sun, no god rays, no text.
Atmosphere: cold, silent, patient — the scale should read as weather, not as
a swarm of products.

---

## [ASSET: land-domain-hero]

- **Used at:** `/` (Section 4 — LAND), `/land` (header)
- **Format:** AVIF + WebP fallback, 2560×1440, ≤ 400 KB
- **Placeholder:** retired — asset live on `/`
- **Status:** DELIVERED 2026-08-17 (1672×941 vs 2560×1440 spec — fine at display opacity;
  higher-res welcome, not required). Derivatives: `public/media/land-domain-hero-*.{avif,webp}`

### Generation prompt

Material law: dust hangs and settles under gravity; lidar scan lines are thin
volumetric planes of light, visible only where they intersect dust; rock and
metal are matte and sand-abraded. Form: in the valley floor, a small convoy
of low, wheeled uncrewed ground vehicles drives a switchback track, each
casting a fan of ochre scan lines upslope; on the ridgeline above them, the
intersecting scan fans and hanging dust resolve into the standing silhouette
of an Atlas lion, mane defined by the densest scan interference — the lion is
made of light and dust, traceably assembled from the convoy's own sensors.
Environment: pre-dawn Moroccan Atlas mountains, ridgelines in three planes of
atmospheric perspective, indigo sky (#1B2547) with the last stars.
Camera: full-frame, 35 mm, f/8, low position on the valley floor looking up
the slope so the lion stands against the sky. Light plot: key = the vehicles'
scan fans (#FFB13D) — every bright surface must trace back to a scan line;
fill = pre-dawn skylight, cold and dim; the lion's eye region is the single
brightest scan intersection. Text overlay: none. Logo: none. Palette: deep
#1B2547, ochre #8C4A2F terrain, accent #FFB13D scans and eyes. Negatives: no
sunrise, no lens flare, no visible weapons, no flags, no human figures, no
glowing eyes without scan-line motivation, no fantasy-art painterly fur, no
text. Atmosphere: restrained and archaeological — a national animal, extinct
in the wild, rebuilt from data by machines that work the same ground.

---

## [ASSET: sea-domain-hero]

- **Used at:** `/` (Section 5 — SEA), `/sea` (header)
- **Format:** AVIF + WebP fallback, 2560×1440, ≤ 400 KB
- **Placeholder:** retired — asset live on `/`
- **Status:** DELIVERED 2026-08-17 (1672×941 vs 2560×1440 spec — fine at display opacity;
  higher-res welcome, not required). Derivatives: `public/media/sea-domain-hero-*.{avif,webp}`

### Generation prompt

Material law: water absorbs light exponentially with depth — the bottom third
of frame approaches true black; suspended particulate catches light; nothing
below the surface has hard edges. Form: viewpoint just beneath a moonlit
waterline that crosses the top sixth of frame; below, the colossal flank of
Bahamut — a fish-form so large that both its head and tail exit the frame,
its surface suggested by ranks of sonar-return speckle and faint teal
bioluminescent lines that align, on inspection, into the wake patterns of
small surface vessels crossing above. One small autonomous surface vessel's
hull silhouette breaks the waterline, tiny against the shape below.
Camera: full-frame, 24 mm, f/2.8, tilted 10° down, half-submerged position.
Light plot: key = moonlight through the surface, broken into caustic shafts;
secondary = the vessel's faint teal wake glow (#22F0E0), motivated as
bioluminescence stirred by the propeller; no light source below 40 % frame
height — the depth stays unlit. Text overlay: none. Logo: none. Palette:
deep #02040A, primary #1FC9B4, accent #22F0E0, surface moonlight desaturated
white. Negatives: no full creature visible, no eye looking at camera, no
teeth, no shipwrecks, no divers, no submarine hull details, no lens flare,
no horror-movie framing, no text. Atmosphere: the frame must feel like it is
withholding the animal — scale conveyed by what does not fit.

---

## [ASSET: hero-video]

- **Used at:** `/` (Section 1 — APEX), 0.4 opacity under grain, behind the apex node
- **Format:** MP4 (H.264) + WebM (VP9), 1920×1080, 24 fps, 20–30 s seamless
  loop (first and last frame identical), target ≤ 4 Mbps, no audio
- **Placeholder:** hatched `--void` panel with visible asset ID
- **Status:** REQUESTED

### Generation prompt

Material law: cloud is the only subject; it moves as one connected mass, no
cuts, no camera shake; light changes arrive as slow pressure, not flicker.
Form: a night cloud deck filmed from directly above, drifting laterally at
walking pace; two faint intracloud pulses per loop, deep in the layer.
Environment: featureless night sky above; no ground visible. Camera: locked
tripod, 50 mm, f/4, top-down 70° pitch; zero camera motion — all motion is
the cloud's. Light plot: key = the two intracloud pulses, cold white; base
= starlight ambience just lifting the deck out of black. Text overlay: none.
Logo: none. Palette: blacks to #000000, cloud greys kept below 40 % L, pulse
tint toward #EAE4FF. Negatives: absolutely no narrative — no aircraft, no
objects, no horizon, no stars streaking, no colour grading toward teal-orange,
no visible loop seam, no flicker. Atmosphere: ambient pressure; the video is
felt, not watched — anything with a story in it will fight the copy.

---

## [ASSET: og-image]

- **Used at:** every route (social share card); replaces the broken
  `og-image.png` reference the legacy site ships today
- **Format:** PNG, 1200×630, ≤ 300 KB
- **Placeholder:** metadata currently omits the image
- **Status:** REQUESTED

### Generation prompt

Material law: flat graphic construction, print-precise edges; the only glow
permitted is the apex node's, tight and circular. Form: true-black field;
2–3 % monochrome film grain; a single white 10 px node at the optical centre
with four hairline gold threads descending to the bottom edge, splaying to
x-positions 20/40/60/80 %; wordmark "SKYSHIELD" set wide and uppercase in
Archivo Expanded, centred 120 px above the node; beneath the node, one line
in JetBrains Mono, letterspaced: "ONE ARCHITECTURE. FOUR DOMAINS." Camera:
n/a — flat artwork. Light plot: n/a — the node glow is the only luminance
gradient. Text overlay: exactly the two strings above, nothing else. Logo:
none besides the wordmark. Palette: #000000 field, #FFFFFF node and
wordmark, #FFD24A threads, mono line #9BA6B2. Negatives: no gradients other
than the node glow, no bevels, no drop shadows, no stock imagery, no extra
taglines, no border. Atmosphere: an instrument label, not a poster.

---

## [ASSET: logo-vector]

- **Used at:** header/footer lockups, favicons, print
- **Format:** SVG master + derived favicon set
- **Placeholder:** typographic wordmark in the display face (in use);
  white-inverted raster derivatives generated from the delivered PNG
  (`public/brand/logo-white-{1024,320}.png`, via `tools/brand/derive-logo.mjs`)
- **Status:** PARTIALLY DELIVERED — owner supplied `brand-assets/SkyShield-Logo.png`
  (2048², black on transparent) on 2026-08-14. It is a raster; no vector
  source exists. Open ask: original vector file if one exists, otherwise a
  vector redraw decision (logged for Phase 7; not blocking).

---

## [ASSET: cyber-domain-hero]

- **Used at:** reserved for `/cyber` (Phase 4 header). The homepage cyber section keeps the
  live SVG ouroboros (D-016) — the delivered still complements it, does not replace it.
- **Status:** DELIVERED 2026-08-17, unsolicited (owner-generated, accepted). 1672×941;
  derivatives processed alongside the other heroes.

---

## [ASSET: platform-turntables] (8 slots)

- **Used at:** every platform page (`/air/*`, `/land/*`, `/sea/*`) — Tier 2 hero slot
- **Format:** 36–72 frame turntable sequence per platform, WebP/AVIF, 1600×900,
  or a single high-quality still per platform as an interim
- **Placeholder:** labelled per-page (`[ASSET: air-interceptor-turntable]` etc.)
- **Status:** AWAITING OWNER MEDIA — deliberately **no generation prompt** (D-022):
  a platform page depicts the product, and generated concept hardware would be an
  invented product fact. Real renders or photography only, whenever platforms are
  ready to be shown. Drop into `incoming-assets/` named by asset ID.
