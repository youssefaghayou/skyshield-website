# Content gaps — what the rebuild needs that the legacy site cannot provide

The salvage covers the cyber offering, company basics, and contact details. Everything else
on the new sitemap has **no legacy source** and must come from the owner or be drafted for
owner approval. Nothing on this list may be invented; unknowns ship as `[NEEDS INPUT]`
placeholders per the project rules.

Publishing constraint that governs all of it: public pages describe mission profiles and
architecture only — no performance figures, payload configurations, range/endurance numbers,
or system integration specifics. Detailed material goes behind the verified-contact path.

## Blocking severity: HIGH (needed for core pages)

| Gap | Needed for | What exists today |
|---|---|---|
| Public architecture narrative (approved wording) | `/atlas` | One sentence of positioning in old meta description |
| Domain overview copy: air, sea, land | `/air` `/sea` `/land` | Nothing |
| Platform designations, classes, mission profiles per domain | platform pages | Nothing |
| Company trajectory with dates (founding → cloud → security → autonomy) | `/company`, homepage | JSON-LD says `foundingDate: 2024`; no other dated milestones |
| Brand assets: vector logo, mark variants | every page | One 1.9 MB raster `logo.png`; no SVG, no source file |
| OG/social image | every page | `og-image.png` referenced in production but missing from the build |

## Blocking severity: MEDIUM

| Gap | Needed for | What exists today |
|---|---|---|
| Team beyond the founder | `/company` | Leadership section names founder only |
| Sponsor/partner details and approval to name them | `/company` | One line: incubators, cloud partners, communities; one named: "1000 Fikra - Afriquia" |
| Verified-technical-request policy (who qualifies, what is shared, response expectations) | `/contact` split paths | Single booking form only |
| Legal pages: privacy policy, terms, responsible disclosure | `/legal/*` | **None exist on the legacy site at all** |
| Two seed posts for insights | `/insights` | Nothing |
| French / Arabic content plan | i18n readiness | Site is EN-only; JSON-LD claims EN/FR/AR service languages |

## Facts requiring owner verification before reuse

Claims that appear in the legacy build and will be either confirmed or dropped — not
carried forward on momentum:

- ~~"24/7 AI Monitoring", "30+ Service Modules", "Global Service Reach"~~ **Resolved 2026-08-17:**
  24/7 confirmed; global confirmed; the "30+ modules" number retired (unverifiable)
- ~~50 km radius vs global~~ **Resolved: global** — the GeoCircle does not carry forward
- ~~foundingDate~~ **Resolved: founded 2026** (legacy JSON-LD's 2024 was incorrect).
  Founder title still to confirm for /company (Phase 6)
- ~~Sponsor~~ **Resolved: confirmed** — "1000 Fikra – Afriquia", displayable
- ~~Catalogue~~ **Resolved: curated to 28 services** across four areas (D-021)

## Defects found in production (fixed by rewrite, listed for the record)

- Draft copy addressed to the owner is live on public pages: "…extracted from **your**
  SkyShield architecture file" (`/cybersecurity`), "This page gives **your clients** a clear
  view… use this as your central services page" (`/services`), and same pattern on all four
  cyber subpages
- Five sitemap-listed pages are "coming soon" placeholders (ai-automation, cloud,
  development, blockchain, robotics)
- 404 page title renders as "404: This page could not be found.SkyShield Technology | …"
  (template concatenation bug)
- OG image 404s on Next-generated pages (`og-image.png` missing)
- Legacy metadata is cyber-only everywhere — full metadata rewrite is planned anyway

## NEEDS-INPUT registry (Phase 5, 2026-08-17)

Markers currently visible on the site, each waiting on the owner:

| Marker | Where | Needed |
|---|---|---|
| Public designation | all 8 platform pages + domain platform grids | A public name per platform, if/when naming is wanted (owner chose mission-profile-only for launch, D-022) |
| Public-releasable specifications | all 8 platform pages | Approved figures only — pages ship without specs until then |
| Platform turntable media | all 8 platform pages | Real renders/photos; not generatable (D-022) |
| Founder title | /company (Phase 6) | Confirm "Founder & Chief Cybersecurity Engineer" or supply current title |
