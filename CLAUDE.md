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

nav → hero (product tour) → Why MechanicDesk → Integrations (the circuit board) → Suitable for →
Testimonials → Features → Pricing table → Blog → **Support → CTA band → Contact** → footer

The last three do not exist on the live home page (Support/Demo and Contact are separate pages
there); they sit after Blog because this demo is a single page. Section rhythm is
`--pad: clamp(2.6rem, 4.55vw, 4.55rem)`.

Gone at the client's request: the logo marquee under the hero, the notification chip on the hero
mock, the photograph behind the "Suitable for" band, the whole four-number stats strip under it, all
three customer photo cards under the reviews, and the
hazard tape that sat under the board.

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

### Features — twelve tiles and the popup

`#features` is a 6x2 grid of small square tiles (`.feat-tile`: module number, icon, name, a `+` that
turns on hover, an accent wash rising from the bottom edge and a tick strip drawing across it).
Clicking one opens its detail in the page's popup over the grid rather than unfolding a panel
underneath it, so the page never shifts under the reader. The twelve bodies — spec plate, icon,
name, blurb, every bullet, the highlight and the deep link — are rendered once into a hidden
`.pop-well` and cloned in on click. The tiles hold a size rather than a column count: 6 across, then
5 / 4 / 3 / 2 as the viewport narrows, so they stay about 180px square at every width.

**The popup** — `#pop`, one `<dialog>` for the whole page (`app.js` 0b). A trigger carries
`data-pop="<key>"`; the matching `[data-pop-body]` is cloned into it. The feature tiles and the
partner marks on the board both use it. Escape and a backdrop click close it and focus returns to
whatever opened it. The animated box clips, and a separate `.pop-scroll` inside carries the overflow
with its own styled thin scrollbar.

The scrollbar that kept flickering on open was the **dialog's own**: the UA stylesheet gives
`<dialog>` `overflow: auto`, and the entry animation translated the box 16px down, which counts as
scrollable overflow — so Chrome showed a scrollbar for the length of the animation and then removed
it. The keyframes now only scale and fade (nothing leaves the box) and `.pop` is `overflow: hidden`.
If you ever animate a dialog's child, keep it inside the dialog's own bounds.

### Features — the treatments lab

`/features/` (noindex, not linked) is a comparison page of five treatments for this block, rendered
by `build/lab3.cjs`:

- **01 Aurora glass** — frosted tiles over a drifting aurora; hovering one clears its glass so the
  light behind comes through, and a spotlight follows the cursor across the grid.
- **02 Traced border** — a bright arc travels each tile's rim (an `@property` angle on a conic
  gradient), faster and brighter under the cursor. The same light as the integration board.
- **03 Bento mosaic** — explicit 4x5 cells, no auto-placement: the two modules a workshop lives in
  get a 2x2, the next two a wide strip, and an accent wipes across on hover.
- **04 Hologram** — blue glass panes that tilt to the cursor, icon lifted on `translateZ`, a
  scanline drifting down, and the grid powering on one tile at a time.
- **05 Plasma panel** — one hairline-divided panel instead of twelve cards, with a plasma light
  drifting underneath that hands over to a cursor-following one on hover.

All five carry the same twelve real modules and the same popup, so the only thing being compared is
the block and what its light does.

Screenshots: `node build/qa7.cjs au:620` (or `tr` / `bn` / `ho` / `pl` / `all`, then `:height:width`).

### Minimalism by disclosure

`S.disclose()`, `S.planIncludes()` and `S.phoneDisclosure()` emit click-to-open blocks (`data-acc` /
`data-acc-toggle`, handled by `app.js`). Collapsed by default: each module's bullet list and
highlight, the optional addons, the support phone numbers and the footer About us paragraph.

### Integrations — the circuit board

Chosen from the idea lab (see below) and dropped into Graphite. All 18 partners sit on two
rounded-rect buses around the MechanicDesk chip: four spokes chip → inner bus, four rounded-elbow
vias inner → outer, and a chord between every pair of partners in the same category. Light runs the
traces (amber on the inner bus, blue on the outer, violet through the vias, white down the spokes);
nothing rotates. Clicking a mark opens that partner's category, description and link underneath and
lights its own category's chords and opens that partner in the page's shared popup — `data-brd-node`
plus `data-pop-body="int-<slug>"`, `app.js` 8c and 0b. "More details" rides at the end of the
section's sub line.

Geometry, layout and CSS live in **`build/lab2-board.cjs`**, shared with the idea lab.
`html({ prefix, attr })` lets each host ask for its own asset prefix and click hook; `.css` is
appended to `styles.css` at build time by `build.cjs`. Computed at build time:

- **backgrounds stripped** — `build/logos-alpha.cjs` flood-fills each logo's background in from the
  border (so white *inside* a mark survives) and writes `images/logos-alpha/` + a manifest with each
  mark's size and ink luminance. Logos that are a coloured block, or already transparent, are skipped.
- **optical-size normalisation** — every mark is rendered at the height that gives it the same AREA
  (`shared.cjs markSize()`), so a 5:1 wordmark cannot dwarf a 1:1 roundel. Seven marks carry a
  deliberate boost in `lab2-board.cjs BOOST` (AMS 1.7, Repco Navigator 1.9, Vehicle Visual 2.0,
  Windcave and MailChimp 1.6, QuickBooks and Burson EzyParts 1.5): equal area leaves a long thin
  wordmark only 20px tall, which is unreadable when its ink is near-black as well.
- **slot assignment** — categories stay contiguous on their bus so the chords are short and the
  grouping reads without a legend; the widest marks go on the horizontal runs, where there is room.
- **dark marks** — anything whose own ink is near-black (`needsLift` in the alpha manifest, plus
  `vehicle_visual` by eye) gets a **tight white outline**, never a plate: `shared.cjs markLift()` +
  `--lift` / `--lift-on`. The outline is a stack of 1px drop-shadows on purpose — the soft glow it
  replaced smeared fine type.

Two things that will break it if changed carelessly:

- The SVG wire layer covers the whole board, so it must stay `pointer-events: none` or it swallows
  every click meant for a logo. Re-check with `node build/qa3.cjs <probe.js> .` — it should report
  18 nodes, 0 blocked.
- The board is laid out on a 1200×660 canvas and `.brd` is a size container: marks size themselves
  in `cqw` (`1cqw` = 12px at the design width) so they shrink with the board and never collide.
  Fixed px sizes inside the board would overlap as soon as it is narrower than 1200px. Below its
  620px floor the board scrolls sideways, with a faded right edge and a "swipe" hint.

### Integrations — the idea lab

`/integrations/` (noindex, not linked from the page) is a comparison page of five directions for
this section, rendered by `build/lab2.cjs` + `build/lab2-board.cjs`: **01 Nebula drift**,
**02 Depth of field**, **03 Constellation**, **04 Sonar sweep** and **05 Circuit board** (two
rounded-rect buses, rounded-elbow vias, light running the traces, MechanicDesk as the chip in the
middle, and app-to-app chords that light up when a category member is picked). Every variant keeps
the orbit's rules: all 18 marks on screen, no plates, original colours, one optical area each, click
for detail. Marks whose own ink is near-black (`needsLift` in the alpha manifest, plus
`vehicle_visual` by eye) get a white light traced around their letterforms — `shared.cjs markLift()`.

Screenshots: `node build/qa2.cjs brd 980` (or `neb` / `dep` / `cons` / `son` / `all`).
Probes: `node build/qa3.cjs <probe.js> [dir]` runs a script inside a built page and prints what
it reported (`.` for the site itself, `integrations` for the lab).

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

## /v2/ — the same page with depth

The root page is the deliverable and is never touched by this. `/v2/` is a copy of it for judging
one question: does 3D make it better? `build/v5.cjs` re-renders `build/v2.cjs` — the exact same
markup the root serves — and only lifts the asset paths (`images/` → `../images/`) and marks the
tab. The depth is two files appended at build time: `build/v5.css` after the stylesheet,
`build/v5.js` after the runtime. Change the design in `v2.cjs` and this page follows.

- **One contract.** The runtime writes exactly two unitless numbers on a surface, `--mx` and `--my`
  (-0.5..0.5, where the pointer is inside it). The stylesheet decides what depth those numbers buy.
  No transform maths in JS.
- **The board** is where the depth is the point. `.brd-scroll` holds the perspective, `.brd` is the
  stage: the dot grid drops to `-150px`, the traces sit at `+10px`, outer-bus marks stand at
  `+30px`, inner-bus at `+62px`, a selected mark at `+120px`, and the chip at `+112px`. Every mark
  drops a blurred contact shadow back onto the surface (`.brd-node::after` at `translateZ(-var(--z))`)
  — that shadow is what makes them read as standing on the board rather than floating loose.
  A pane of glass over the whole thing catches a highlight wherever the pointer is.
- **It tilts without being touched.** While the pointer is away, `--my` comes from the board's
  position in the viewport, so it tips as you scroll past it, and `--mx` drifts on a slow sine. The
  pointer takes over on hover and the scroll tilt stands down.
- **The hero** keeps a resting turn (`rotateY(-7deg)`) with the phone at `+78px` and the
  notification chip at `+120px` in front of the browser window.
- **Everything else** — the why cards, the "suitable for" photos, blog cards, customer cards, the
  spec plate — gets the same idea at a fraction of the strength on hover.
- **Toggle.** A pill in the bottom-left switches `.flat` on `<html>`; every rule in the layer is
  behind `html:not(.flat)`, so one click is a clean A/B against the flat page. It also links back
  to the root.
- Coarse pointers get no tracking (it reads as jitter on a phone), and `prefers-reduced-motion`
  turns the transforms off entirely.

Screenshots: `node build/qa5.cjs integrations:1250:1440:tilt` — the fourth field pins `--mx/--my`
so a still frame shows the parallax a pointer would produce.

Live: **https://demo-mechanicdesk.vercel.app/v2/**

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
