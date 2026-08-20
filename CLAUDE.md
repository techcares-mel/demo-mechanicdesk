# CLAUDE.md — MechanicDesk (redesign demo, 3 concepts)

## What this is

A redesign proposal for **https://www.mechanicdesk.com.au/**. The brief: keep **all** existing
content, go minimalistic, keep the mechanical/automotive character, keep part of the current
palette (the orange from the logo), look more professional — and deliver **three** directions to
compare.

| Concept | Folder | Direction |
|---|---|---|
| 01 — **Blueprint** | `v1/` | Light, technical, editorial. Hairline grid, monospace spec labels, sharp 3px corners, feature index + detail panel, pricing as a comparison table. Orange used only as a signal colour. |
| 02 — **Graphite** | `v2/` | Dark, precision-industrial. Graphite surfaces, orange signal light, floating pill nav, partner-logo marquee, chip-based feature explorer, glowing plan cards. |
| 03 — **Torque** | `v3/` | Warm light, bold and friendly. Cream background, big display type, large orange panel behind the product shot, bento "why" grid, expandable feature cards, orange-filled featured plan. |

`index.html` at the root is the **concept chooser** — three live (scaled iframe) previews side by
side. Each concept also has a small fixed switcher at the bottom of the page to jump between
concepts and back to the chooser.

## Content rules

- Every string comes from the live site (home, `integrations.html`, `support.html`,
  `contact-us.html`, and the pricing data in `js/index.js`). Nothing is invented, nothing is dropped.
- Content lives in **one** place: `build/content.cjs`. All three concepts render that same object,
  so content parity between them is structural, not manual.
- Kept verbatim: 12 features with every bullet + the two "HIGHLIGHT" notes, 18 integrations with
  their descriptions and URLs grouped in the site's 6 categories, 4 plans × 4 regions
  (AU / NZ / UK / Global) including extra-user, SMS and stock-item limits, both optional addons, the
  5 "Suitable for" categories, the 3 named customers, both blog teasers, the support channels, all
  4 phone numbers, both email addresses, the About us paragraph, and the full footer menu tree.
- Deep links (Sign Up, Login, feature detail pages, partner pages, blog, policies) point at the real
  mechanicdesk.com.au URLs so every link works from the demo.
- English only. `DEMO` watermark on every concept page (fixed right side, rotated, opacity ~0.09).

## Design system

Shared across concepts: orange accent extracted from `images/logo.png` (`colors.json` → `#fc9604`,
tuned per concept for contrast), the real logo, the product screenshot, partner logos, service-type
photos and customer logos from the current site.

| | Blueprint | Graphite | Torque |
|---|---|---|---|
| Accent | `#e07b05` | `#fca311` | `#f5860f` |
| Background | `#fbfaf8` | `#0b0d0f` | `#fffbf5` |
| Text | `#14171b` | `#eef1f3` | `#16130f` |
| Headings | Archivo 700 | Space Grotesk 700 | Plus Jakarta Sans 800 |
| Body | Inter | Inter | Inter |
| Labels | IBM Plex Mono | JetBrains Mono | Inter 700 caps |
| Radius | 3px | 14px | 18–26px |

## Build system

The pages are generated, not hand-edited:

```
build/
  content.cjs           ← ALL copy/data (edit here for any content change)
  icons.cjs             ← 50 inline SVG icons: UI set + automotive set (wrench, gauge, piston,
                          tyre, oilcan, car, brakedisc, hoist, torque, bolt, obd, …)
  shared.cjs            ← shared HTML fragments: head, product mock, disclosures, integration
                          list, plan inclusions, contact form, maps, footer bits, watermark
  app.js                ← shared runtime, copied to v1|v2|v3/script.js
  v1.cjs v1.css         ← concept 1 template + stylesheet
  v2.cjs v2.css         ← concept 2
  v3.cjs v3.css         ← concept 3
  landing.cjs           ← the concept chooser (root index.html)
  build.cjs             ← renders everything
  qa.cjs                ← headless-Chrome screenshots for visual QA
  normalize-slides.cjs  ← pads/crops every images/app/*.png to one 1400x743 canvas
```

### Product tour (hero)

`S.productMock()` renders a macOS browser window playing the ten app screenshots in
`images/app/` like a video (crossfade, progress bar, play/pause, caption, slide counter — all in
`app.js` section 13), with an iPhone 17 Pro in front of it showing `images/app-mobile/m1–m3.png`,
and a floating notification card. The composition mirrors the hero of scan2eat.com.au.

- Desktop screens are frames cut from MechanicDesk's own tutorial videos: Tutorial 3 "Working on a
  job" (dashboard, job card, check sheet, timesheet, invoice, tax invoice PDF, printed job card),
  Tutorial 7 (booking diary), Tutorial 8 (inventory), Tutorial 26 (reports). Crop used for the
  1080p captures: `left 130, top 172, width 1640, height 870`, then resized to 1400px wide.
- Phone screens are the real App Store screenshots (`itunes.apple.com/lookup?id=1441067162`), with
  the simulator status bar cropped off and the canvas extended top/bottom in the screen's own edge
  colours to reach the 2.174 iPhone ratio.
- Any slide whose file is missing is dropped at build time, so a partial asset set still renders.
- iPhone geometry is driven off the device width `W`: body `1/2.086`, radius `17.9%/8.6%`, rail
  padding `1.6%`, screen radius `15.4%/7.1%` at `1/2.174`, Dynamic Island `30.3%` of screen width
  and `4.2%` of screen height at `1.3%` from the top. Rail colours are Apple's three Pro finishes —
  Silver `#F5F5F5` (concept 1), Deep Blue `#32374A` (concept 2), Cosmic Orange `#F77E2D` (concept 3).

### Minimalism by disclosure

Long copy is never printed in full. `S.disclose()`, `S.integrationList()`, `S.planIncludes()` and
`S.phoneDisclosure()` emit click-to-open blocks (`data-acc` / `data-acc-toggle`, handled by
`app.js`). Collapsed by default: the 18 integration descriptions, every pricing inclusion beyond
price and user count, the optional addons, feature bullet lists, support phone numbers and the
footer About us paragraph.

Rebuild from **this** folder:

```bash
node build/build.cjs
```

That writes `v1|v2|v3/index.html`, `v1|v2|v3/styles.css`, `v1|v2|v3/script.js` and root `index.html`.
**Do not edit those generated files directly** — the next build overwrites them. Edit the template
or CSS in `build/` instead.

Visual QA (needs Chrome installed):

```bash
node build/qa.cjs v2 top:1050 features:1200 pricing:1400 foot:900
node build/qa.cjs v3 top:1000:500          # third field = viewport width (min ~500 in headless)
```

Each shot hides the other sections so the target section starts at the top of the frame, and
disables the reveal animations.

## Behaviour (identical in all three)

- Sticky nav that gains a background/blur past 50px, hamburger + full-screen drawer under 1024px
  (closes on link click and on ESC).
- Scroll progress bar, back-to-top past 300px, IntersectionObserver reveal with 70ms stagger.
- Animated stat counters (`data-target` / `data-suffix`, `requestAnimationFrame`, easeOutQuad).
- Pricing region switcher — reads the JSON in `#pricing-data` and swaps price, extra-user, SMS and
  stock-item values with a short fade; a `<select>` replaces the chips on small screens.
- Feature explorer: tab rail + panels (Blueprint, Graphite) or expandable cards (Torque).
- Integration category filter, Google Maps embed of the Queen Street office, contact form with a
  demo "Thank you!" confirmation (no backend).

## Assets

```
images/logo.png              nav/footer logo (gear mark)
images/logo-with-text.png    original horizontal lockup (spare)
images/app/*.png             10 product-tour screens, all 1400x743 (see Product tour above)
images/app-mobile/m1–m3.png  real App Store screens, 560x1215, for the iPhone frame
images/logos/*               17 partner logos (real brands — never replace these)
images/proven/*              3 customer logos: Mag & Turbo, Tyres2go, Ironman4x4 (real — keep)
images/pexels/               licensed photography + credits.json
  blog-vehicle-visuals.jpg     blog cover 1 (technician with a diagnostic tablet)
  blog-time-clocking.jpg       blog cover 2 (punch clock and timecards)
  type-auto|marine|machinery|bikes|tyres.jpg
                               the five "Suitable for" categories, 4:3, object-fit: cover
  auto-workshop-wide.jpg       establishing shot: classic car on a two-post hoist
  auto-engine-bay.jpg  auto-tools-bench.jpg  auto-tyre-tread.jpg
  auto-brake-disc.jpg  auto-hands-wrench.jpg
```

The original site's cut-out category images (`images/suitable/*`), plan icons, feature icons and the
`app-presentation.png` composite were replaced by the above and are no longer referenced.

## Redeployment

From the project root (one level up):

```bash
node scripts/deploy.js "MechanicDesk" "MechanicDesk"
```

Or, once the Vercel project is linked, from inside this folder:

```bash
git add -A && git commit -m "describe your changes" && git push
vercel --prod --yes
```

## Notes / open items

- The live testimonials page loads reviews through a script, so no quotable testimonial text was
  available. The concepts show the three customers the home page names (Mag & Turbo, Tyres2go,
  Ironman4x4) instead of inventing quotes.
- Stats used on the pages are all from the site itself: 20,000+ mechanics, 14-day trial,
  18 integrations, 4 supported regions.
- `robots: noindex` is set on all concept pages so the demo cannot compete with the real site.
