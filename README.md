# MechanicDesk — website

The MechanicDesk website as a single page. Production build.

---

## What it is built with

**Plain HTML5, CSS3 and browser JavaScript.** No framework, no bundler, no
package to install, nothing to compile. Open `index.html` in a browser and it
runs; upload the folder to any static host and it is live.

| File | What is in it |
|---|---|
| `index.html` | The page: structure and every word on it. Blocks are signposted with `<!-- ===== SECTION -->` comments. |
| `styles.css` | Every style, in labelled sections. The design system is the custom properties in `:root` at the top. |
| `script.js` | Behaviour, in 14 numbered blocks. Each one is independent and does nothing if its markup is absent. |
| `images/` | Photography, partner logos, product screenshots. |
| `vercel.json` | One line of hosting config. Delete it if you host somewhere other than Vercel. |

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

The three files are **generated**. If you are going to keep using the generator,
edit these instead and re-render:

```bash
node build/build.cjs     # writes index.html, styles.css and script.js
```

| Source | Produces |
|---|---|
| `build/content.cjs` | **Every string and number on the page** — copy, prices, phone numbers, features, partners, reviews. |
| `build/page.cjs` | `index.html` |
| `build/page.css` | `styles.css` |
| `build/app.js` | `script.js` |
| `build/board.cjs` | The Integrations circuit board — its markup **and** the CSS that gets appended to `styles.css`. |
| `build/shared.cjs` | Reusable fragments: the product tour, the contact form, disclosures, the `<head>`. |
| `build/icons.cjs` | Every inline SVG icon, by name. |

Three more scripts are tools rather than sources, and are only needed when you
change assets:

| Script | Run it when |
|---|---|
| `build/logos-alpha.cjs` | You add a partner logo — strips its background into `images/logos-alpha/`. |
| `build/normalize-slides.cjs` | You add a product screenshot — pads or crops it to the tour's canvas. |
| `build/qa.cjs`, `build/probe.cjs` | You want headless-Chrome screenshots or an in-page check. Needs Chrome; set `CHROME` and `OUT_DIR` if it is not in the usual place. |

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

Then give it a slot in `build/board.cjs` (`RING_IN` / `RING_OUT`) — the board's
layout is a fixed set of positions, not automatic.

**Swap a photo** — drop the new file into `images/pexels/` (or wherever the
original lives) with the same filename and it is picked up. Different filename:
update it in `content.cjs`.

**Change the colours** — `styles.css`, the `:root` block at the top. `--accent`
is the amber, and the four `--accent-*` tints below it are derived from it;
nothing in the stylesheet mixes the colour by hand, so changing those five
lines re-brands the whole page. The greys are `--bg`, `--surface`, `--card` and
`--line`.

**Change the fonts** — the Google Fonts `<link>` in the `<head>` of
`index.html`, and `--head` / `--sans` / `--mono` in `:root`.

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
| `data-brd-node` | A partner mark on the circuit board. |
| `data-target`, `data-suffix` | Number that counts up when scrolled into view. |
| `data-year` | Filled with the current year. |
| `data-tour`, `data-phone` | The product tour and the phone screens. |

Breakpoints: **1180 / 1024 / 860 / 620 / 520px**, all together in the responsive
section at the bottom of `styles.css`.

---

## Before this goes live

1. **Wire up the contact form — this is the only thing that is not finished.**
   It validates in the browser and shows a thank-you, but the message is **not
   sent anywhere**. Give the `<form>` an `action` (your own handler, Formspree,
   Netlify Forms…) and delete block 10 in `script.js`. There is a comment
   saying so in `index.html`, right after the submit button. Left as it is, you
   will lose enquiries without knowing.
2. **Check the outbound links.** Sign Up, Login, feature detail pages, partner
   pages and the blog all point at the current mechanicdesk.com.au URLs.
3. **Photography.** The photos in `images/pexels/` are licensed stock (Pexels
   licence, credits in `images/pexels/credits.json`, and one line in the footer
   — `content.cjs brand.credit`, set it to `''` to drop it). Partner logos in
   `images/logos/` belong to those companies; the product screenshots and
   customer logos are MechanicDesk's own.
4. Add a `favicon.ico` / `apple-touch-icon` if you want more than the PNG that is
   linked now, and a `sitemap.xml` / `robots.txt` if you care about those.

The page is production-ready otherwise: it is indexable (no `noindex`), carries
no watermark or demo wording, and nothing on it is placeholder text.

---

## Hosting

It is a static folder — anything will serve it: Vercel, Netlify, Cloudflare
Pages, S3, or plain Apache/nginx. Nothing runs on the server.

On Vercel:

```bash
vercel --prod --yes
```
