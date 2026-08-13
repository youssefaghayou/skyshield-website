# URL inventory — legacy site, verified against production 2026-08-13

Every URL the legacy site serves, with its proposed disposition in the rebuild.
GitHub Pages serves each `page.html` at **both** `/page.html` and `/page` (verified live),
so every retirement must redirect both forms. `redirects.json` (Phase 4) is generated
from this table once dispositions are approved.

**Status: PROPOSED — no disposition is final until approved by the owner.**

## Content pages (14 URLs in sitemap.xml)

| Legacy URL | Title (trimmed) | Weight | Proposed disposition |
|---|---|---|---|
| `/` | AI-Powered Cybersecurity & Autonomous Defense | 602 words | Replaced by new homepage |
| `/about.html` | About | 307 words | Redirect → `/company` (content migrates) |
| `/services.html` | Services | 211 words | Redirect → `/cyber` (see note 1) |
| `/cybersecurity.html` | Cybersecurity | 179 words | Redirect → `/cyber` (content migrates) |
| `/cybersecurity-offensive.html` | Offensive Security Services | 188 words | Redirect → `/cyber/offensive` (content migrates) |
| `/cybersecurity-defensive.html` | Defensive Operations Services | 178 words | Redirect → `/cyber/defensive` (content migrates) |
| `/cybersecurity-cloud.html` | Cloud & Application Security | 159 words | Redirect → `/cyber/cloud` (content migrates) |
| `/cybersecurity-incident-forensics.html` | Incident Response & Forensics | 128 words | Redirect → `/cyber/incident-forensics` (see note 2) |
| `/contact.html` | Contact | 85 words | Redirect → `/contact` |
| `/ai-automation.html` | AI Automation | thin ("coming soon") | Redirect → target TBD (see note 3) |
| `/cloud.html` | Cloud Architecture | thin ("coming soon") | Redirect → `/cyber/cloud` (see note 3) |
| `/development.html` | Web & Mobile Development | thin ("coming soon") | **Owner decision** (see note 4) |
| `/blockchain.html` | Blockchain & Digital Asset Security | thin ("coming soon") | Redirect → `/cyber/offensive` (see note 3) |
| `/robotics.html` | Robotics & Autonomous Systems Security | thin ("coming soon") | Redirect → target TBD (see note 3) |

Each row implies its extensionless twin (`/about.html` **and** `/about`), plus `/index.html` → `/`.

## System and infrastructure

| Path | Disposition |
|---|---|
| `/404.html`, `/404/`, `/_not-found/` | Replaced by new 404 (three byte-identical copies today) |
| `/sitemap.xml`, `/robots.txt` | Regenerated at build. Keep the explicit AI-crawler allowances from legacy robots.txt |
| `CNAME` (`skyshieldtechnology.com`), `.nojekyll` | Carry into published branch untouched |
| `/site-enhancements.css`, `/site-enhancements.js` | Retired with the legacy build (see ENHANCEMENTS-ANALYSIS.md) |
| `/_next/*` | Legacy build artifacts, retired |
| `/ACCESS-CHECK.md` | Temporary write-access check, to be removed (owner approved removal pending) |

## Assets

| Path | Size | Note |
|---|---|---|
| `/logo.png` | 1.9 MB | Only logo asset in existence. Referenced as OG image by hand-built pages. Needs optimized derivatives + proper source |
| `/favicon.png` | 316 KB | Oversized for purpose |
| `/favicon.ico` | 25 KB | In use |
| `/og-image.png` | **missing** | Referenced by the Next-generated pages (404 page today) — broken OG reference in production |

## Notes / open decisions

1. **`/services`** was a six-pillar hub (cybersecurity, AI automation, cloud, development,
   blockchain, robotics). Five of six pillars are security services; the new IA has no
   generic services hub. `/cyber` is the closest stable target.
2. Legacy cyber IA is **offensive / defensive / cloud / incident-forensics**. Proposal:
   keep all four as `/cyber/*` slugs (content exists for each). SOC lives inside defensive
   and GRC/compliance inside cloud until there is enough content to split them out.
3. The five thin "coming soon" pages have no content to migrate; only their URLs matter.
   Targets marked TBD depend on decisions about the new IA.
4. **`/development`** (web & mobile app development) has no home in the new IA. Whether the
   company still offers it is a business decision, not an engineering one.

## Search-console / verification

No `google-site-verification` meta tag and no verification files found in the build.
If Search Console is verified via DNS, nothing carries over; if via HTML file, none exists
to preserve.
