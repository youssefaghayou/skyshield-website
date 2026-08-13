# What site-enhancements.css/js were actually fixing

The legacy build shipped as static output, so every post-launch fix was layered into two
override files loaded by every page: `site-enhancements.css` (423 lines) and
`site-enhancements.js` (221 lines). Those files are a requirements document written as
patches — each one is something someone needed the site to do. Decoded below, with what
the rebuild does about it.

## The requirements they encode

| # | What the patch does | Root cause it papers over | Carry into rebuild? |
|---|---|---|---|
| 1 | Full dark theme via `[data-theme="dark"]` overrides on every component, persisted in `localStorage("skyshield-theme")`, toggle button injected at runtime | Pages were designed light-only; dark mode was retrofitted twice (base + enhancement layer), which is why subpage logos and CTA sections kept breaking in dark mode (see commits `10f9d5e`, `61bab6f`, `386e723`) | **Superseded.** New design is a single dark system defined in tokens — no second theme to patch. Confirm dropping the light/dark toggle (visible change for users) |
| 2 | Mobile hamburger nav injected at ≤768 px: dropdown panel, outside-click close, `aria-expanded`, resize reset | Hand-built pages had no mobile navigation at all — links just wrapped | **Yes.** Real responsive nav, designed not injected |
| 3 | Active nav link highlight (path match + IntersectionObserver for hash sections) | No wayfinding in base pages | **Yes.** Active state in the new nav |
| 4 | 3 px scroll-progress bar fixed to viewport top | — | **Yes**, reinterpreted in the new design language (progress as instrument readout) |
| 5 | Floating "Get Protected" CTA appearing after 30 % scroll, targeting the homepage `#booking` form | Conversion path needed on every page | **Yes as requirement** (persistent conversion affordance), form and wording redesigned with `/contact` |
| 6 | Reveal-on-scroll (IntersectionObserver) with `prefers-reduced-motion` fallback to visible | Static pages felt dead | **Yes.** GSAP-based entrances with a deliberate reduced-motion variant |
| 7 | Smooth anchor scrolling compensating for the sticky header height | Anchors hid under the sticky header | **Yes.** Lenis + scroll-margin handles this properly |
| 8 | Hover lift/scale on cards, panels, and table rows | — | Reinterpreted in the new hover language |
| 9 | Dark-mode form field styling (`input`, `select`, `textarea`) | Booking form unreadable in dark mode | Superseded by tokens |
| 10 | Contact email styled as link; a copy-to-clipboard button was added (`37a7ca4`) then removed (`14e2a46`) | — | Keep contact simple: `mailto:` link, no copy widget (the removal was a decision — respect it) |
| 11 | `.enhance-reveal` reduced-motion opt-out and passive scroll listeners | — | Baseline expectations, kept |

## Structural facts worth keeping

- The booking form (`#booking` on the homepage) is the site's only conversion mechanism.
  Its `<select>` catalogue enumerates **25 named services** — the most complete statement of
  the cyber offering anywhere on the site. Archived in `pages/index.mdx`; it seeds the new
  cyber pages and the contact form's service taxonomy.
- The enhancement JS ships a feature-flag object (`FEATURES = {...}`) — someone wanted
  per-feature kill switches. Cheap to honour in the rebuild's config.
- Both files respect `prefers-reduced-motion` — that standard was already set; the rebuild
  must not regress it.

## The lesson the layer teaches

Eleven fixes, five of them dark-mode repairs of components designed light-only. The pattern
is one theme system patching another — the strongest argument for the rebuild's rule that
every colour lives in `tokens.css` and nothing styles itself outside the system.
