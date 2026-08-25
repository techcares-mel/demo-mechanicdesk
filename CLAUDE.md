# CLAUDE.md — MechanicDesk redesign

## What this is

A redesign of **https://www.mechanicdesk.com.au/** that keeps all of the existing content but
replaces the design system. It is one page, rendered from `build/page.cjs` + `build/page.css` into
the folder root, and it is what gets handed to the client — see `README.md`, which is written for
them rather than for us.

**The design**: light and precision-engineered. Paper surfaces (`#f5f7f9`), amber used as a signal
light rather than decoration, hazard tape, carbon weave, a tyre-tread edge on the footer, and a spec
plate on every module. Deliberately few boxes — sections are separated by space and hairlines.

Several other directions were built and shown while this was being chosen (a dark "Graphite" page,
a 3D layer over it, a "Flight deck" V3, five colour tones, and three idea labs for the features and
integrations blocks). **The client chose the light tone of the main design, and everything else was
deleted** — pages, generators and QA scripts. Nothing in the folder renders any other style, and
there is no theme layer: the palette in `page.css` *is* the light palette, with every dark-page
assumption corrected where the rule lives rather than overridden further down the file. That was the
point of folding it in — the client is going to edit this stylesheet.

## Content rules

- Every string comes from the live site (home, `integrations.html`, `support.html`,
  `contact-us.html`, and the pricing data in `js/index.js`). Nothing is invented, nothing is dropped.
- Content lives in **one** place: `build/content.cjs`.
- Kept in full: 12 features with every bullet + the two "HIGHLIGHT" notes, 18 integrations with
  their descriptions and URLs, 4 plans × 4 regions (AU / NZ / UK / Global) including extra-user, SMS
  and stock-item limits, both optional addons, the 5 "Suitable for" categories, both blog teasers,
  the support channels, all 4 phone numbers, both email addresses, the About us paragraph, and the
  full footer menu tree.
- Long copy is never printed by default — it sits behind click-to-open blocks (see below).
- Deep links (Sign Up, Login, feature detail pages, partner pages, blog, policies) point at the real
  mechanicdesk.com.au URLs. English only. `DEMO` watermark and `robots: noindex` are on the page.

## Page order

Matches the live home page's own order:

nav → hero (product tour) → Why MechanicDesk → Integrations (the circuit board) → Suitable for →
Testimonials → Features → Pricing table → Blog → **Support → CTA band → Contact** → footer

The last three do not exist on the live home page (Support/Demo and Contact are separate pages
there); they sit after Blog because this demo is a single page. The nav is in this same order.
Section rhythm is `--pad: clamp(2.6rem, 4.55vw, 4.55rem)`.

Gone at the client's request: the logo marquee under the hero, the notification chip on the hero
mock, the photograph behind the "Suitable for" band, the whole four-number stats strip under it, all
three customer photo cards under the reviews, and the hazard tape that sat under the board.

## Design system

Accent `#d97a06` on `#f5f7f9`; Space Grotesk headings, Inter body, JetBrains Mono labels. Nothing
meaningful below `0.72rem`; body copy `0.95–1.08rem`.

The brand orange `#fca311` (from `images/logo.png`, see `colors.json`) comes **down a stop for ink**
— on a near-white ground it cannot carry text or 1px marks. `--accent-2` (`#ffb43a`) and
`--accent-hot` (`#ff8a00`) keep the bright end for hovers and large fills, and amber fills take
white type at this darkness.

- **No hand-mixed colour.** `--accent-wash / -tint / -tint-2 / -edge / -glow` are the accent at five
  strengths. Changing `--accent` and those five lines re-brands the page; nothing else mixes amber.
- **Hazard tape** (`.tape`, three appearances): 6px amber / 6px white on a 12px period, 3px tall.
- **Dash rule** (`--dash`): 3px dash / 4px gap — finer than a browser `dashed` border.
- **Textures**: `--carbon` (crossed 3% gradients), `--brushed`, and the tyre-tread photo masked into
  the top of the footer at 28% — a texture, not a photograph.
- **The product tour keeps a dark island of tokens** (`.mock { --text … }`). It is a dark device on a
  light page — a photograph of the app, in effect — so its own chrome stays legible inside it.

## Build system

The page is generated, not hand-edited:

```
build/
  content.cjs           ← ALL copy/data (edit here for any content change)
  icons.cjs             ← 50 inline SVG icons: UI set + automotive set
  shared.cjs            ← shared fragments: head, product mock, disclosures, form, maps, footer bits
  page.cjs page.css     ← the template and the stylesheet
  board.cjs             ← the integrations circuit board: geometry, markup and its own CSS
  app.js                ← runtime, copied to script.js
  build.cjs             ← renders index.html + styles.css + script.js into the folder root
  qa.cjs                ← headless-Chrome screenshots for visual QA
  probe.cjs             ← runs a script inside the built page and prints what it reported
  logos-alpha.cjs       ← strips partner-logo backgrounds into images/logos-alpha/ + manifest
  normalize-slides.cjs  ← pads/crops every images/app/*.png to one 1400x743 canvas
```

Rebuild from **this** folder:

```bash
node build/build.cjs
```

That writes `index.html`, `styles.css` and `script.js`. **Do not edit those generated files** — edit
`build/page.cjs`, `build/page.css` or `build/content.cjs` instead.

Visual QA (needs Chrome installed):

```bash
node build/qa.cjs . top:700 features:850 integrations:900 pricing:1000 contact:900 foot:750
node build/qa.cjs . top:1000:500          # third field = viewport width (min ~500 in headless)
node build/probe.cjs <probe.js>           # runs a script in the page, prints its report
```

Each shot hides the other sections and disables the reveal animations, so the target section starts
at the top of the frame. Both take `CHROME` and `OUT_DIR` from the environment.

### Product tour (hero)

`S.productMock()` renders a macOS-style browser window playing the ten app screenshots in
`images/app/` like a video — 2.6s per screen, 0.85s eased crossfade, slow scale drift, progress bar,
play/pause, caption and slide counter (all in `app.js` 11) — with an iPhone 17 Pro in front of it
showing `images/app-mobile/m1–m3.png`.

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

### Features

`#features` is twelve tiles on a 6×2 grid: a solid `--card` tile on a `--line` hairline, an
amber-tinted icon plate, and on hover an accent wipe crossing from the left (`.au-wipe`, `scaleX`
from the left edge) while the tile rises 3px, the icon lifts and the `+` turns.

Clicking a tile opens its detail in the page's popup rather than unfolding a panel underneath it, so
the page never shifts under the reader. The twelve bodies — spec plate, icon, name, blurb, every
bullet, the highlight and the deep link — are rendered once into a hidden `.pop-well` and cloned in
on click. The tiles hold a size rather than a column count: 6 across, then 5 / 4 / 3 / 2 as the
viewport narrows, so they stay about 180px square at every width. (The `au-` prefix is historical —
the block began as a different treatment — and the popup keys are keyed on it.)

**The popup** — `#pop`, one `<dialog>` for the whole page (`app.js` 1). A trigger carries
`data-pop="<key>"`; the matching `[data-pop-body]` is cloned into it. The feature tiles and the
partner marks on the board both use it. Escape and a backdrop click close it and focus returns to
whatever opened it. The animated box clips, and a separate `.pop-scroll` inside carries the overflow
with its own styled thin scrollbar.

The scrollbar that kept flickering on open was the **dialog's own**: the UA stylesheet gives
`<dialog>` `overflow: auto`, and the entry animation translated the box 16px down, which counts as
scrollable overflow — so Chrome showed a scrollbar for the length of the animation and then removed
it. The keyframes now only scale and fade (nothing leaves the box) and `.pop` is `overflow: hidden`.
If you ever animate a dialog's child, keep it inside the dialog's own bounds.

### Minimalism by disclosure

`S.disclose()`, `S.planIncludes()` and `S.phoneDisclosure()` emit click-to-open blocks (`data-acc` /
`data-acc-toggle`, handled by `app.js` 7). Collapsed by default: each module's bullet list and
highlight, the optional addons, the support phone numbers and the footer About us paragraph.

### Integrations — the circuit board

All 18 partners sit on two rounded-rect buses around the MechanicDesk chip: four spokes chip → inner
bus, four rounded-elbow vias inner → outer. Light runs the traces in one amber, at half its original
speed (18s inner bus, 28s outer, 4.8s spokes, 6.8s vias), so it reads as data moving rather than as
four systems — and the logos keep the only real colour on the board. Nothing rotates. Clicking a
mark selects it and opens that partner in the page's shared popup (`data-brd-node`, `app.js` 8).
"More details" rides at the end of the section's sub line.

Geometry, layout and CSS all live in **`build/board.cjs`**; `.css` is appended to `styles.css` at
build time by `build.cjs`. Computed at build time:

- **backgrounds stripped** — `build/logos-alpha.cjs` flood-fills each logo's background in from the
  border (so white *inside* a mark survives) and writes `images/logos-alpha/` + a manifest with each
  mark's size and ink luminance. Logos that are a coloured block, or already transparent, are skipped.
- **optical-size normalisation** — every mark is rendered at the height that gives it the same AREA
  (`shared.cjs markSize()`), so a 5:1 wordmark cannot dwarf a 1:1 roundel. Seven marks carry a
  deliberate boost in `board.cjs BOOST` (AMS 1.7, Repco Navigator 1.9, Vehicle Visual 2.0, Windcave
  and MailChimp 1.6, QuickBooks and Burson EzyParts 1.5): equal area leaves a long thin wordmark
  only 20px tall, which is unreadable when its ink is near-black as well.
- **slot assignment** — categories stay contiguous on their bus, so each group reads as a run of
  neighbours without needing a legend.
- **near-black marks** get a soft white halo behind them, never a plate (`shared.cjs markLift()` +
  `--lift` / `--lift-on`). On the dark design this was a tight white *outline*; on paper their own
  ink is the contrast, so the outline came off and only the halo stayed.

Two things that will break it if changed carelessly:

- The SVG wire layer covers the whole board, so it must stay `pointer-events: none` or it swallows
  every click meant for a logo. Re-check with `node build/probe.cjs <probe.js>` — it should report
  18 nodes, 0 blocked.
- The board is laid out on a 1200×660 canvas and `.brd` is a size container: marks size themselves
  in `cqw` (`1cqw` = 12px at the design width) so they shrink with the board and never collide.
  Fixed px sizes inside the board would overlap as soon as it is narrower than 1200px. Below its
  620px floor the board scrolls sideways, with a faded right edge and a "swipe" hint.

### Pricing

A spec-sheet comparison table: one row per attribute, plans as columns, hairline row rules only,
featured column washed in the accent, and the region switcher swapping every price cell
(`#pricing-data` + `[data-region]` + `[data-price-cell]`, `app.js` 9). Below 620px the region chips
become a `<select>` and the table scrolls inside `.table-scroll`.

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

## Handover package

`node build/package.cjs` writes `dist/mechanicdesk-website.zip` — the site, its images, the
generator and `README.md`, and nothing else. It refuses to run if any file in the tree still
mentions another style, so a stray page or a leftover theme cannot ship by accident.

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
  and NZ: three on the page, six behind the "Read more reviews" button, plus a link out to their
  full testimonials page. No quote, author or rating is invented, and there are no star rows.
- Stats are all from the site itself: 20,000+ mechanics, 14-day trial, 18 integrations, 4 regions.
- `vercel.json` sets `trailingSlash: true`.
