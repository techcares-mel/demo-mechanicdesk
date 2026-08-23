# MechanicDesk — website

A redesign of mechanicdesk.com.au as a single page. Everything on it is real
content from the live site.

---

## What it is built with

**Plain HTML5, CSS3 and browser JavaScript.** No framework, no bundler, no
package to install, nothing to compile. Open `index.html` in a browser and it
runs; upload the folder to any static host and it is live.

| File | What is in it |
|---|---|
| `index.html` | The page: structure and every word on it. Blocks are signposted with `<!-- ===== SECTION -->` comments. |
| `styles.css` | Every style, in labelled sections. The design system is the custom properties in `:root` at the top. |
| `script.js` | Behaviour, in 15 numbered blocks. Each one is independent and does nothing if its markup is absent. |
| `images/` | Photography, partner logos, product screenshots. |
| `vercel.json` | One line of hosting config (`trailingSlash`). Delete it if you host elsewhere. |
| `research.json`, `colors.json` | Working files from the build (the researched business data, and the palette read out of the logo). Not used by the page — safe to delete. |

Browser baseline: anything from 2020 onwards (Chrome/Edge 88+, Safari 14+,
Firefox 85+). The code uses `const`/`let`, arrow functions, optional chaining,
`IntersectionObserver`, `<dialog>` and CSS custom properties — all supported
everywhere now, so there are no polyfills.

---

## Two ways to work on it

### A. Edit the three files directly

Fine for copy changes, new sections, restyling. `index.html`, `styles.css` and
`script.js` are readable, commented, and have no build dependency.

### B. Use the generator in `build/` (Node)

The three files are **generated**. If you are going to keep using the
generator, edit these instead and re-render:

```bash
node build/build.cjs     # writes index.html, styles.css and script.js
```

| Source | Produces |
|---|---|
| `build/content.cjs` | **Every string and number on the page** — copy, prices, phone numbers, features, partners, reviews. |
| `build/v2.cjs` | `index.html` |
| `build/v2.css` | `styles.css` |
| `build/app.js` | `script.js` |
| `build/lab2-board.cjs` | The Integrations circuit board — markup **and** the CSS that is appended to `styles.css`. |
| `build/shared.cjs` | Reusable fragments: the product tour, the contact form, disclosures, the `<head>`. |
| `build/icons.cjs` | Every inline SVG icon, by name. |

> **The one thing to know:** `node build/build.cjs` overwrites `index.html`,
> `styles.css` and `script.js`. Pick one way of working. If you edit the three
> files directly, don't run the build afterwards — or copy your changes back
> into `build/` first.

---

## Common jobs

**Change a phone number, an address, a price, a heading** — one place:
`build/content.cjs`, then rebuild. Or find the text in `index.html` if you have
gone direct. Prices live in `content.cjs pricing.data` per region, and they are
also written into the JSON at the very bottom of `index.html`, which is what the
region chips read — change both, or rebuild.

**Add a feature module** — add an object to `content.cjs features.items` (name,
blurb, bullets, icon name from `icons.cjs`, link). It appears as a tile and its
popup is generated with it. Going direct: copy an `.au-tile` button, give it
`data-pop="feat-your-key"`, and add a matching
`<div data-pop-body="feat-your-key">` in the hidden `.pop-well` in the same
section.

**Add an integration partner** — add it to a category in
`content.cjs integrations.categories`, put its logo in `images/logos/`, then:

```bash
node build/logos-alpha.cjs    # strips the logo background, writes images/logos-alpha/
node build/build.cjs
```

Then give it a slot in `build/lab2-board.cjs` (`RING_IN` / `RING_OUT`) — the
board's layout is a fixed set of positions, not automatic.

**Swap a photo** — drop the new file into `images/pexels/` (or wherever the
original lives) with the same filename and it is picked up. Different filename:
update it in `content.cjs`.

**Change the colours or fonts** — `styles.css`, the `:root` block at the top.
`--accent` is the orange; the greys are `--bg`, `--surface`, `--card`. Fonts are
loaded in the `<head>` of `index.html`.

**Remove a whole section** — delete its `<section>` from `index.html` (each one
is signposted). Nothing in `script.js` will break: every block checks for its
own markup first.

**Add a fade-in to something new** — give it `class="reveal"`, and `d1`…`d4` to
stagger several in a row.

---

## Conventions

Behaviour is wired through `data-` attributes, never through classes, so you can
restyle freely without breaking anything:

| Attribute | Does |
|---|---|
| `data-pop="key"` / `data-pop-body="key"` | Opens the page's single popup with that body. |
| `data-acc` / `data-acc-toggle` | Click-to-open block (long lists, phone numbers, "Read more reviews"). |
| `data-nav`, `data-navlink` | The fixed nav, and the links that highlight as you scroll. |
| `data-menu`, `data-menu-open`, `data-menu-close` | Mobile drawer. |
| `data-region`, `data-price-cell`, `data-month-unit` | Pricing region switcher. |
| `data-brd-node`, `data-chord` | Circuit board marks and the links between them. |
| `data-spot` | Container whose cursor position drives the spotlight. |
| `data-target`, `data-suffix` | Number that counts up when scrolled into view. |
| `data-year` | Filled with the current year. |
| `data-tour`, `data-phone` | The product tour and the phone screens. |

Breakpoints: **1180 / 1024 / 860 / 620 / 520px**, all together in the responsive
section at the bottom of `styles.css`.

---

## Before this goes live

1. **Remove `<meta name="robots" content="noindex">`** from the `<head>` — it is
   there because this is a demo, and it stops Google indexing the page.
2. **Remove the DEMO watermark**: the `<div class="demo-watermark">` near the top
   of `<body>`, and its rule in `styles.css`.
3. **The contact form does not send anything.** It validates and shows a
   thank-you. Point it at a real endpoint (your own handler, Formspree, Netlify
   Forms…) and delete block 11 in `script.js`.
4. **Check the outbound links.** Sign Up, Login, feature detail pages, partner
   pages and the blog all point at the current mechanicdesk.com.au URLs.
5. **Photography.** The photos in `images/pexels/` are licensed stock (Pexels
   licence, credits in `images/pexels/credits.json`). Partner logos in
   `images/logos/` belong to those companies; the product screenshots and
   customer photos are MechanicDesk's own.
6. Add a `favicon.ico`/`apple-touch-icon` if you want more than the PNG that is
   linked now.

---

## Extra pages in this folder

Comparison pages used while choosing the design. All `noindex`, none linked from
the site, and all safe to delete along with their `build/lab*.cjs` generators:

| Path | What it shows |
|---|---|
| `/features/` | Five treatments for the Features block. Aurora glass is the one now on the page. |
| `/integrations/` | Five treatments for the Integrations block. The circuit board is the one now on the page. |
| `/v2/` | The same page with a 3D layer over it (tilt, depth, parallax) and a toggle to switch it off. |

---

## Hosting

It is a static folder — anything will serve it. Currently on Vercel:

```bash
vercel --prod --yes
```

`vercel.json` sets `trailingSlash: true`, which is what keeps the relative
`styles.css` working inside the subfolders above.
