# CLAUDE.md — MechanicDesk redesign demo

## What this is

A redesign of **https://www.mechanicdesk.com.au/** that keeps all of the existing content but
replaces the design system. Three concepts were presented (Blueprint / Graphite / Torque); the
client chose **Graphite**, so the site is now a single page rendered from `build/v2.cjs` +
`build/v2.css` to the folder root. The two other concepts are kept in `build/archive/` for
reference and are no longer rendered or linked.

**Graphite** — dark and precision-engineered: graphite surfaces, orange used as a signal light,
hazard tape, carbon weave, a tyre-tread footer edge, spec plates on every module, and a full-bleed
workshop photo band. Deliberately few borders and boxes: sections are separated by space and
hairlines rather than cards inside cards.

## Content rules

- Every string comes from the live site (home, `integrations.html`, `support.html`,
  `contact-us.html`, and the pricing data in `js/index.js`). Nothing is invented, nothing is dropped.
- Content lives in **one** place: `build/content.cjs`.
- Kept in full: 12 features with every bullet + the two "HIGHLIGHT" notes, 18 integrations with
  their descriptions and URLs, 4 plans × 4 regions (AU / NZ / UK / Global) including extra-user, SMS
  and stock-item limits, both optional addons, the 5 "Suitable for" categories, the 3 named
  customers, both blog teasers, the support channels, all 4 phone numbers, both email addresses, the
  About us paragraph, and the full footer menu tree.
- Long copy is never printed by default — it sits behind click-to-open blocks (see below).
- Deep links (Sign Up, Login, feature detail pages, partner pages, blog, policies) point at the real
  mechanicdesk.com.au URLs. English only. `DEMO` watermark and `robots: noindex` are on the page.

## Page order

Matches the live home page's own order:

nav → hero (product tour) → Why MechanicDesk → Integrations cluster → Suitable for + stats band →
Testimonials → Features → Pricing table → Blog → **Support → CTA band → Contact** → footer

The last three do not exist on the live home page (Support/Demo and Contact are separate pages
there); they sit after Blog because this demo is a single page. Section rhythm is
`--pad: clamp(2rem, 3.5vw, 3.5rem)`.

## Design system

Accent `#fca311` (from `images/logo.png`, see `colors.json`) on `#0b0d0f`; Space Grotesk headings,
Inter body, JetBrains Mono labels. Nothing meaningful below `0.72rem`; body copy `0.95–1.08rem`.

- **Hazard tape** (`.tape`, three appearances): 6px stripe on a 12px period, 3px tall.
- **Dash rule** (`--dash`): 3px dash / 4px gap — finer than a browser `dashed` border.
- **Textures**: `--carbon` (crossed 2% gradients), `--brushed`, and the tyre-tread photo masked into
  the top of the footer.

## Build system

The page is generated, not hand-edited:

```
build/
  content.cjs           ← ALL copy/data (edit here for any content change)
  icons.cjs             ← 50 inline SVG icons: UI set + automotive set
  shared.cjs            ← shared fragments: head, product mock, disclosures, form, maps, footer bits
  app.js                ← runtime, copied to script.js
  v2.cjs v2.css         ← the chosen design (template + stylesheet)
  build.cjs             ← renders index.html + styles.css + script.js into the folder root
  qa.cjs                ← headless-Chrome screenshots for visual QA
  normalize-slides.cjs  ← pads/crops every images/app/*.png to one 1400x743 canvas
  archive/              ← the two concepts that were not chosen (v1/v3 + the old chooser page)
```

Rebuild from **this** folder:

```bash
node build/build.cjs
```

That writes `index.html`, `styles.css` and `script.js`. **Do not edit those generated files** — edit
`build/v2.cjs`, `build/v2.css` or `build/content.cjs` instead.

Visual QA (needs Chrome installed):

```bash
node build/qa.cjs . top:700 features:850 integrations:900 pricing:1000 contact:900 foot:750
node build/qa.cjs . top:1000:500          # third field = viewport width (min ~500 in headless)
```

Each shot hides the other sections and disables the reveal animations, so the target section starts
at the top of the frame.

### Product tour (hero)

`S.productMock()` renders a macOS-style browser window playing the ten app screenshots in
`images/app/` like a video — 2.6s per screen, 0.85s eased crossfade, slow scale drift, progress bar,
play/pause, caption and slide counter (all in `app.js` section 13) — with an iPhone 17 Pro in front
of it showing `images/app-mobile/m1–m3.png`, and a floating notification chip.

- Desktop screens are frames cut from MechanicDesk's own tutorial videos: Tutorial 3 "Working on a
  job" (dashboard, job card, check sheet, timesheet, invoice, tax invoice PDF, printed job card),
  Tutorial 7 (booking diary), Tutorial 8 (inventory), Tutorial 26 (reports). Crop used for the
  1080p captures: `left 130, top 172, width 1640, height 870`, resized to 1400px wide.
- Phone screens are the real App Store screenshots (`itunes.apple.com/lookup?id=1441067162`), with
  the simulator status bar cropped off and the canvas extended top/bottom in the screen's own edge
  colours to reach the 2.174 iPhone ratio.
- Any slide whose file is missing is dropped at build time.
- iPhone geometry is driven off the device width `W`: body `1/2.086`, radius `17.9%/8.6%`, rail
  padding `1.6%`, screen radius `14.8%/7.1%` at `1/2.174`, Dynamic Island `30.3%` of screen width
  and `4.2%` of screen height at `1.3%` from the top. Rail is Deep Blue `#32374A` (an Apple Pro
  finish).

### Minimalism by disclosure

`S.disclose()`, `S.planIncludes()` and `S.phoneDisclosure()` emit click-to-open blocks (`data-acc` /
`data-acc-toggle`, handled by `app.js`). Collapsed by default: each module's bullet list and
highlight, the optional addons, the support phone numbers and the footer About us paragraph.

### Integrations — the orbit

All 18 partners circle the MechanicDesk core on three counter-rotating tracks (96s / 132s reversed /
168s) over a generated starfield, with a radar sweep and a warm corona on the core. Logos float free:
no plate, no ring, original brand colours. Hovering the cluster freezes every animation; hovering or
selecting a mark lifts it, brightens it and shows its name; clicking opens that partner's category,
description and link underneath (`data-hive-tab` / `data-hive-panel`, `app.js` 8b).

Three things are computed at build time in `v2.cjs`:
- **backgrounds stripped** — `build/logos-alpha.cjs` flood-fills each logo's background in from the
  border (so white *inside* a mark survives) and writes `images/logos-alpha/` + a manifest with each
  mark's size and ink luminance. Logos that are a coloured block, or already transparent, are skipped.
- **optical-size normalisation** — every mark is rendered at the height that gives it the same AREA
  (`shared.cjs markSize()`), so a 5:1 wordmark cannot dwarf a 1:1 roundel. AMS Rewards carries a
  deliberate 1.8x boost.
- **collision-free layout** — the widest marks are assigned to the outer ring (most circumference),
  then the three ring phases are chosen by maximising the smallest gap between the real bounding boxes
  of any two marks on different rings. The build prints the result (currently 14px of clearance).

The rotating tracks and slots are full-size transparent divs, so they must stay `pointer-events:
none` or they swallow every click meant for a logo.

### Pricing

A spec-sheet comparison table (the layout from the Blueprint concept) in the graphite palette: one
row per attribute, plans as columns, hairline row rules only, featured column tinted, and the region
switcher swapping every price cell (`#pricing-data` + `[data-region]` + `[data-price-cell]`).
Below 620px the region chips become a `<select>` and the table scrolls inside `.table-scroll`.

## Assets

```
images/logo.png              nav/footer logo (gear mark)
images/logo-with-text.png    original horizontal lockup (spare)
images/app/*.png             10 product-tour screens, all 1400x743
images/app-mobile/m1–m3.png  real App Store screens, 560x1215, for the iPhone frame
images/logos/*               18 partner logos as supplied (real brands — never replace these)
images/logos-alpha/*         the same logos with their background stripped, + manifest.json
images/proven/*              3 customer logos: Mag & Turbo, Tyres2go, Ironman4x4 (real — keep)
images/pexels/               licensed photography + credits.json
  blog-vehicle-visuals.jpg   blog cover 1 (technician with a diagnostic tablet)
  blog-time-clocking.jpg     blog cover 2 (punch clock and timecards)
  type-auto|marine|machinery|bikes|tyres.jpg   the five "Suitable for" categories, 4:3
  auto-workshop-wide.jpg     establishing shot: classic car on a two-post hoist
  auto-engine-bay.jpg  auto-tools-bench.jpg  auto-tyre-tread.jpg
  auto-brake-disc.jpg  auto-hands-wrench.jpg
```

## Redeployment

From the project root (one level up):

```bash
node scripts/deploy.js "MechanicDesk" "MechanicDesk"
```

Or, from inside this folder (the Vercel project is already linked):

```bash
git add -A && git commit -m "describe your changes" && git push
vercel --prod --yes
```

Live: **https://demo-mechanicdesk.vercel.app**

## Notes

- Testimonials are real. The live site keeps its reviews in `javascripts/testimonials.js` as an
  `allTestimonials` array (32 entries, `person` / `company` / `address` / `text` / `short_text`) which
  its carousel shuffles. `content.cjs` carries nine of them verbatim — the shortest, spread across AU
  and NZ: three on the page, six behind the "Read 6 more reviews" button, plus a link out to their
  full testimonials page. No quote, author or rating is invented, and there are no star rows.
- Stats are all from the site itself: 20,000+ mechanics, 14-day trial, 18 integrations, 4 regions.
- `vercel.json` sets `trailingSlash: true`.
