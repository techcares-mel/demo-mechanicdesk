/* =========================================================================
   INTEGRATIONS LAB III — seven tidier treatments.
   Rendered to integrations2/index.html (noindex, not linked from the site).

   The circuit board that is on the site now is busy by nature: eighteen marks,
   two buses, four spokes, four vias and light moving along all of them. That is
   a lot of simultaneous information. Everything here is the opposite bet —
   tidiness comes from structure and restraint, not from decoration:

     · no crossing lines anywhere
     · one alignment per treatment, held everywhere
     · at most one thing moving, and in most of them nothing moves
     · all eighteen partners on screen at once (the client's own rule), each
       optically normalised to the same area, click for the full detail

   Six of the seven also show each partner's NAME, which the board never did.
   ========================================================================= */
const S = require('./shared.cjs');
const { esc, slug, icons, C, alphaLogo, markSize, markLift } = S;

/* --------------------------------------------------------------- the data -- */
const CATS = C.integrations.categories.map((g) => ({
  name: g.name,
  key: slug(g.name),
  items: g.items.map((it) => ({ ...it, key: slug(it.name), cat: g.name, catKey: slug(g.name) }))
}));
const ITEMS = CATS.flatMap((g) => g.items);

const AREA = 2100;
const BOOST = { 'ams_rewards.png': 1.6, 'repco_navigator.png': 1.5, 'vehicle_visual.png': 1.7 };
const size = (it, area) => it.file
  ? markSize(it.file, (area || AREA) * (BOOST[it.file] || 1), 18, 58)
  : { w: 70, h: 20 };

const mark = (it, area) => it.file
  ? `<img class="mk${markLift(it.file) ? ' lift' : ''}" src="../${alphaLogo(it.file)}"
       alt="" loading="lazy" style="--h:${size(it, area).h}px">`
  : `<em class="mk is-text">${esc(it.name.split(' ')[0])}</em>`;

const btn = (it, cls, inner) => `
  <button class="${cls}" data-pop="${it.key}" data-cat="${it.catKey}" aria-label="${esc(it.name)}">
    ${inner}
  </button>`;

/* ------------------------------------------------------------- 01 ledger --- */
/* A spec sheet. Category on the left, its marks on the right, one hairline per
   row. Nothing decorative at all — the tidiest thing this content can be. */
const ledger = () => `
<div class="led-wrap">
  ${CATS.map((g) => `
  <div class="led-row">
    <div class="led-head">
      <span class="led-name">${esc(g.name)}</span>
      <span class="led-count">${g.items.length}</span>
    </div>
    <div class="led-marks">
      ${g.items.map((it) => btn(it, 'led-mark', mark(it))).join('')}
    </div>
  </div>`).join('')}
</div>`;

/* --------------------------------------------------------------- 02 grid --- */
/* One table: eighteen equal cells, hairline dividers, marks centred on a shared
   optical size. No labels, no lines, no motion. */
const grid = () => `
<div class="gr">
  ${ITEMS.map((it) => btn(it, 'gr-cell', mark(it))).join('')}
</div>`;

/* ------------------------------------------------------------- 03 strips --- */
/* The ledger's information, banded: each category is a full-width strip, label
   left, marks right, alternating surface so the groups read at a glance. */
const strips = () => `
<div class="st">
  ${CATS.map((g, i) => `
  <section class="st-band${i % 2 ? ' alt' : ''}">
    <div class="st-in">
      <p class="st-label"><b>${esc(g.name)}</b><span>${g.items.length} ${g.items.length === 1 ? 'partner' : 'partners'}</span></p>
      <div class="st-marks">${g.items.map((it) => btn(it, 'st-mark', mark(it))).join('')}</div>
    </div>
  </section>`).join('')}
</div>`;

/* -------------------------------------------------------------- 04 cards --- */
/* Eighteen compact cards, six across: the mark, its name, its category. The
   only treatment here that gives every partner its name on the page. */
const cards = () => `
<div class="cd">
  ${ITEMS.map((it) => btn(it, 'cd-card', `
      <span class="cd-mark">${mark(it, 1500)}</span>
      <span class="cd-name">${esc(it.name)}</span>
      <span class="cd-cat">${esc(it.cat)}</span>`)).join('')}
</div>`;

/* ----------------------------------------------------------- 05 quiet hub -- */
/* The board's idea with the wiring taken out: the chip in the middle, the marks
   on two calm rings, no traces and no moving light. Positions are computed here
   so nothing overlaps. */
const hub = () => {
  const rings = [ITEMS.slice(0, 6), ITEMS.slice(6, 18)];
  const R = [15, 27];   /* x spread is R * 1.62, so 27 is the most that fits */
  return `
<div class="hb">
  <i class="hb-ring r1" aria-hidden="true"></i><i class="hb-ring r2" aria-hidden="true"></i>
  <div class="hb-core"><img src="../images/logo.png" alt="MechanicDesk" width="34" height="35"></div>
  ${rings.map((ring, r) => ring.map((it, i) => {
    const a = (360 / ring.length) * i - 90 + (r ? 15 : 0);
    const t = (a * Math.PI) / 180;
    const x = 50 + R[r] * Math.cos(t) * 1.62;
    const y = 50 + R[r] * Math.sin(t);
    return btn(it, 'hb-mark', mark(it, 1700)).replace('<button', `<button style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%"`);
  }).join('')).join('')}
</div>`;
};

/* --------------------------------------------------------------- 06 rail --- */
/* One line. The whole section is a heading and a single slow rail of marks, with
   the six categories named underneath as a legend. Takes the least height of
   anything here, and the only thing moving is the rail. */
const rail = () => `
<div class="rl" data-rail>
  <div class="rl-track">
    ${[0, 1].map(() => ITEMS.map((it) => btn(it, 'rl-mark', mark(it, 1900))).join('')).join('')}
  </div>
</div>
<p class="rl-legend">${CATS.map((g) => `<span>${esc(g.name)}<b>${g.items.length}</b></span>`).join('')}</p>`;

/* -------------------------------------------------------------- 07 split --- */
/* Categories on the left as a list with counts; the eighteen marks on the right.
   Pointing at a category lifts its own marks and dims the rest — nothing is
   hidden, and the grouping is answered without drawing a single line. */
const split = () => `
<div class="sp" data-split>
  <div class="sp-list">
    <button class="sp-cat is-on" data-filter="all">All partners<b>${ITEMS.length}</b></button>
    ${CATS.map((g) => `<button class="sp-cat" data-filter="${g.key}">${esc(g.name)}<b>${g.items.length}</b></button>`).join('')}
  </div>
  <div class="sp-grid">
    ${ITEMS.map((it) => btn(it, 'sp-cell', mark(it))).join('')}
  </div>
</div>`;

const VARIANTS = [
  { key: 'led', n: '01', name: 'Ledger', build: ledger,
    line: 'A spec sheet: category on the left, its partners on the right, one hairline per row. No decoration at all — this is the tidiest this content can be, and it answers "what kind of thing is it" before you even look at a logo.' },
  { key: 'gr', n: '02', name: 'Plain grid', build: grid,
    line: 'One table of eighteen equal cells with hairline dividers. Every mark is normalised to the same optical area, so nothing shouts. Nothing moves, nothing crosses.' },
  { key: 'st', n: '03', name: 'Category strips', build: strips,
    line: 'The ledger banded: each category is a full-width strip with its name and count on the left. The groups read from across the room, and the alternating surface does the work a line would otherwise do.' },
  { key: 'cd', n: '04', name: 'Name cards', build: cards,
    line: 'Eighteen compact cards, six across, each carrying the partner name and its category. The only treatment where a visitor can read every name without touching anything.' },
  { key: 'hb', n: '05', name: 'Quiet hub', build: hub,
    line: 'The board’s idea with the wiring removed: the chip in the middle, the partners on two calm rings, no traces and no moving light. Keeps "everything connects to us" and drops the clutter that came with it.' },
  { key: 'rl', n: '06', name: 'Single rail', build: rail,
    line: 'One line. A heading, a slow rail of all eighteen marks, and the six categories named underneath. It takes a third of the height of anything else here, which is its own kind of tidy.' },
  { key: 'sp', n: '07', name: 'Split panel', build: split,
    line: 'Categories listed on the left, the eighteen marks on the right. Pointing at a category lifts its own marks and dims the rest — the grouping is answered without drawing a single line, and nothing is ever hidden.' }
];

/* ------------------------------------------------------------------- css -- */
const CSS = `
:root {
  --accent: #fca311; --accent-2: #ffb43a;
  --bg: #0b0d0f; --bg-2: #0e1114; --surface: #12161a; --card: #151a1f;
  --line: rgba(255,255,255,.07); --line-2: rgba(255,255,255,.14);
  --text: #eef1f3; --text-2: #b1bac2; --muted: #7c8792;
  --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  --sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --head: 'Space Grotesk', 'Inter', sans-serif;
  --radius: 12px;
  --lift: brightness(1.16) drop-shadow(0 0 1px rgba(255,255,255,.98)) drop-shadow(0 0 1px rgba(255,255,255,.92))
    drop-shadow(0 0 2px rgba(255,255,255,.6)) drop-shadow(0 1px 3px rgba(0,0,0,.85));
  --lift-on: brightness(1.2) drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff)
    drop-shadow(0 0 3px rgba(255,255,255,.8)) drop-shadow(0 0 12px rgba(252,163,17,.45));
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text-2); font-family: var(--sans); line-height: 1.65; overflow-x: hidden; }
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; border: 0; background: none; color: inherit; }
h1, h2, h3 { font-family: var(--head); color: var(--text); margin: 0; font-weight: 700; letter-spacing: -.025em; }
h1 { font-size: clamp(2rem, 3.6vw, 2.9rem); line-height: 1.06; }
h2 { font-size: clamp(1.5rem, 2.4vw, 2.05rem); }
h3 { font-size: 1.16rem; }
p { margin: 0; }
.wrap { max-width: 1240px; margin: 0 auto; padding: 0 clamp(1.25rem, 4vw, 2.5rem); }
.eyebrow { font-family: var(--mono); font-size: .78rem; letter-spacing: .15em; text-transform: uppercase; color: var(--accent); }
.lnk { display: inline-flex; align-items: center; gap: .45rem; font-weight: 600; font-size: .92rem; color: var(--accent); }
.lnk svg { width: 15px; height: 15px; }

header.top { padding: clamp(3rem,6vw,4.5rem) 0 clamp(1.5rem,3vw,2.25rem); position: relative; overflow: hidden; }
header.top::after { content:''; position:absolute; top:-70%; right:-10%; width:60vw; height:150%; background: radial-gradient(circle, rgba(252,163,17,.12), transparent 62%); pointer-events:none; }
.brandline { display:flex; align-items:center; gap:.7rem; margin-bottom:1.5rem; }
.brandline img { width: 34px; }
.brandline strong { font-family: var(--head); font-size: 1.1rem; color: var(--text); }
.brandline strong em { font-style: normal; color: var(--accent); }
.lede { margin-top: 1rem; max-width: 68ch; }
.jump { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:1.5rem; }
.jump a { font-family: var(--mono); font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:var(--text-2); border:1px solid var(--line-2); border-radius:999px; padding:.42rem .8rem; }
.jump a:hover { border-color: var(--accent); color: var(--accent); }
.back { margin-top:1.3rem; display:inline-flex; align-items:center; gap:.5rem; font-size:.93rem; font-weight:600; color:var(--accent); }
.back svg { width:15px; height:15px; }

.variant { padding: clamp(2.5rem,5vw,4rem) 0; border-top: 1px solid var(--line); }
.v-head { display:flex; align-items:flex-end; justify-content:space-between; gap:2rem; flex-wrap:wrap; margin-bottom: clamp(1.5rem,3vw,2.25rem); }
.v-title { display:flex; align-items:baseline; gap:.9rem; }
.v-title span { font-family: var(--mono); font-size:.82rem; color: var(--accent); letter-spacing:.12em; }
.v-line { max-width: 62ch; font-size:.95rem; color: var(--muted); }

/* every mark, everywhere: same optical area, own colours, no plate ---------- */
.mk { height: var(--h, 26px); width: auto; max-width: none; object-fit: contain;
  filter: brightness(1.1) saturate(1.03); transition: transform .3s ease, filter .3s ease; }
.mk.is-text { font-family: var(--head); font-style: normal; font-weight: 700; font-size: .95rem; color: var(--text); }
.mk.lift { filter: var(--lift); }
[data-pop] { display: grid; place-items: center; }
[data-pop]:hover .mk { transform: scale(1.07); }
[data-pop]:hover .mk.lift { filter: var(--lift-on); }
[data-pop]:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }

/* ---------------------------------------------------------- 01 ledger ----- */
.led-wrap { border-top: 1px solid var(--line-2); }
.led-row { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 2rem; align-items: center;
  padding: 1.15rem 0; border-bottom: 1px solid var(--line); }
.led-head { display: flex; align-items: baseline; gap: .6rem; }
.led-name { font-family: var(--head); font-weight: 600; font-size: 1rem; color: var(--text); }
.led-count { font-family: var(--mono); font-size: .72rem; color: var(--muted); }
.led-marks { display: flex; flex-wrap: wrap; align-items: center; gap: clamp(1.25rem, 3vw, 2.75rem); }
.led-mark { padding: .35rem 0; }

/* ------------------------------------------------------------ 02 grid ----- */
.gr { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.gr-cell { aspect-ratio: 16 / 9; background: var(--bg-2); transition: background .3s ease; }
.gr-cell:hover { background: var(--card); }

/* ---------------------------------------------------------- 03 strips ----- */
.st-band { border-bottom: 1px solid var(--line); }
.st-band.alt { background: var(--bg-2); }
.st-in { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 2rem; align-items: center; padding: 1.35rem clamp(1rem, 2vw, 1.75rem); }
.st-label b { display: block; font-family: var(--head); font-weight: 600; font-size: 1.02rem; color: var(--text); }
.st-label span { font-family: var(--mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
.st-marks { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: clamp(1.25rem, 3vw, 2.5rem); }
.st-mark { padding: .3rem 0; }

/* ----------------------------------------------------------- 04 cards ----- */
.cd { display: grid; grid-template-columns: repeat(6, 1fr); gap: clamp(.5rem, .9vw, .8rem); }
.cd-card { display: grid; grid-template-rows: 54px auto auto; gap: .5rem; align-content: start; justify-items: start;
  padding: 1rem; text-align: left; border: 1px solid var(--line); border-radius: var(--radius); background: var(--card);
  transition: border-color .3s ease, transform .3s cubic-bezier(.2,.8,.3,1); }
.cd-card:hover { border-color: var(--line-2); transform: translateY(-3px); }
.cd-mark { display: grid; place-items: center start; height: 54px; }
.cd-name { font-family: var(--head); font-weight: 600; font-size: .88rem; line-height: 1.25; color: var(--text); }
.cd-cat { font-family: var(--mono); font-size: .62rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }

/* ------------------------------------------------------------- 05 hub ----- */
.hb { position: relative; aspect-ratio: 1180 / 560; min-height: 420px; }
.hb-ring { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border: 1px solid var(--line); border-radius: 50%; }
.hb-ring.r1 { width: 49%; height: 30%; }
.hb-ring.r2 { width: 87%; height: 54%; }
.hb-core { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 74px; aspect-ratio: 1;
  display: grid; place-items: center; border-radius: 50%; background: var(--card); box-shadow: 0 0 0 1px var(--line-2), 0 0 50px -12px rgba(252,163,17,.4); }
.hb-core img { width: 34px; }
.hb-mark { position: absolute; transform: translate(-50%, -50%); padding: .4rem; }

/* ------------------------------------------------------------ 06 rail ----- */
.rl { position: relative; overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 1.6rem 0;
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.rl-track { display: flex; align-items: center; gap: clamp(2rem, 4vw, 3.5rem); width: max-content; animation: rail 90s linear infinite; }
@keyframes rail { to { transform: translateX(-50%); } }
.rl:hover .rl-track { animation-play-state: paused; }
.rl-mark { padding: .3rem 0; }
.rl-legend { display: flex; flex-wrap: wrap; gap: .5rem 2rem; margin-top: 1.4rem; font-family: var(--mono); font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.rl-legend span { display: inline-flex; align-items: baseline; gap: .45rem; }
.rl-legend b { color: var(--accent); font-weight: 500; }

/* ----------------------------------------------------------- 07 split ----- */
.sp { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: clamp(1.5rem, 3vw, 3rem); align-items: start; }
.sp-list { display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); }
.sp-cat { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; width: 100%; text-align: left;
  padding: .8rem 1rem; background: var(--bg-2); font-size: .92rem; color: var(--text-2); transition: background .25s ease, color .25s ease; }
.sp-cat b { font-family: var(--mono); font-size: .72rem; font-weight: 400; color: var(--muted); }
.sp-cat:hover { background: var(--card); color: var(--text); }
.sp-cat.is-on { background: var(--card); color: var(--text); box-shadow: inset 2px 0 0 var(--accent); }
.sp-cat.is-on b { color: var(--accent); }
.sp-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.sp-cell { aspect-ratio: 16 / 10; background: var(--bg-2); transition: background .3s ease, opacity .3s ease; }
.sp-cell:hover { background: var(--card); }
.sp.is-filtered .sp-cell { opacity: .22; }
.sp.is-filtered .sp-cell.is-match { opacity: 1; background: var(--card); }

/* --------------------------------------------------------------- popup ---- */
.pop { margin:auto; border:0; padding:0; background:transparent; overflow:hidden; width:min(660px,92vw); }
.pop::backdrop { background: rgba(5,7,9,.78); backdrop-filter: blur(6px); }
.pop-in { position:relative; max-height:86vh; overflow:hidden; background: var(--card); border:1px solid var(--line-2); border-radius: var(--radius); }
.pop[open] .pop-in { animation: popIn .32s cubic-bezier(.2,.9,.3,1) both; }
@keyframes popIn { from { opacity:0; transform: scale(.96);} to { opacity:1; transform:none;} }
.pop-scroll { max-height:86vh; overflow-y:auto; overscroll-behavior:contain; scrollbar-gutter:stable; padding: clamp(1.4rem,2.8vw,2rem);
  scrollbar-width:thin; scrollbar-color: rgba(255,255,255,.2) transparent; }
.pop-scroll::-webkit-scrollbar { width:10px; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.18); border:3px solid transparent; background-clip: padding-box; }
.pop-x { position:absolute; top:.7rem; right:.7rem; width:32px; height:32px; z-index:2; border:1px solid var(--line);
  border-radius:50%; background: rgba(20,24,29,.9); color: var(--text-2); font-size:1.1rem; line-height:1; display:grid; place-items:center; }
.pop-x:hover { border-color: var(--accent); color: var(--accent); }
.pop-head { display:flex; align-items:center; gap:1rem; margin-bottom:1rem; }
.pop-head .mk { height: 34px; }
.pop-cat { font-family: var(--mono); font-size:.66rem; letter-spacing:.16em; text-transform:uppercase; color: var(--accent); }
.pop-body p { font-size:.96rem; }
.pop-body p + p { margin-top:.5rem; }
.pop-body .lnk { margin-top:1.1rem; font-size:.86rem; }

footer { border-top:1px solid var(--line); padding:1.75rem 0 3.5rem; font-family: var(--mono); font-size:.76rem; letter-spacing:.05em; color: var(--muted); }

@media (max-width: 1024px) {
  .gr, .cd { grid-template-columns: repeat(4, 1fr); }
  .sp { grid-template-columns: 1fr; }
  .sp-grid { grid-template-columns: repeat(4, 1fr); }
  .led-row, .st-in { grid-template-columns: 1fr; gap: .9rem; }
  .st-marks { justify-content: flex-start; }
  .hb { aspect-ratio: 1/1; min-height: 520px; }
  .hb-ring.r1 { width: 44%; height: 44%; } .hb-ring.r2 { width: 80%; height: 80%; }
}
@media (max-width: 620px) {
  .gr, .cd, .sp-grid { grid-template-columns: repeat(2, 1fr); }
  .cd-card { grid-template-rows: 44px auto auto; }
  .cd-mark { height: 44px; }
}
@media (prefers-reduced-motion: reduce) { .rl-track { animation: none; } }
`;

/* -------------------------------------------------------------------- js -- */
const JS = `
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* one popup for all seven treatments */
  var pop = $('#pop'), slot = $('[data-pop-slot]', pop), opener = null;
  $$('[data-pop]').forEach(function (t) {
    t.addEventListener('click', function () {
      var src = $('[data-pop-body="' + t.getAttribute('data-pop') + '"]');
      if (!src) return;
      slot.innerHTML = src.innerHTML;
      slot.scrollTop = 0;
      opener = t;
      if (pop.showModal) pop.showModal(); else pop.setAttribute('open', '');
    });
  });
  $$('[data-pop-close]', pop).forEach(function (b) { b.addEventListener('click', function () { pop.close(); }); });
  pop.addEventListener('click', function (e) { if (e.target === pop) pop.close(); });
  pop.addEventListener('close', function () { if (opener) opener.focus(); });

  /* 07 — the category list lifts its own marks and dims the rest */
  $$('[data-split]').forEach(function (sp) {
    var cats = $$('.sp-cat', sp), cells = $$('.sp-cell', sp);
    var apply = function (key) {
      cats.forEach(function (c) { c.classList.toggle('is-on', c.getAttribute('data-filter') === key); });
      sp.classList.toggle('is-filtered', key !== 'all');
      cells.forEach(function (c) { c.classList.toggle('is-match', c.getAttribute('data-cat') === key); });
    };
    cats.forEach(function (c) {
      var key = c.getAttribute('data-filter');
      c.addEventListener('click', function () { apply(key); });
      c.addEventListener('mouseenter', function () { apply(key); });
    });
    sp.addEventListener('mouseleave', function () { apply('all'); });
  });
})();
`;

module.exports = () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Integrations — seven tidier treatments</title>
<meta name="robots" content="noindex">
<link rel="icon" type="image/png" href="../images/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
<header class="top">
  <div class="wrap">
    <div class="brandline">
      <img src="../images/logo.png" alt="MechanicDesk logo" width="34" height="35">
      <strong>Mechanic<em>Desk</em></strong>
    </div>
    <p class="eyebrow">Integrations · seven tidier treatments</p>
    <h1>Less to look at, same eighteen partners.</h1>
    <p class="lede">The board on the site draws eighteen marks, two buses, eight connectors and light
      moving along all of them. Everything here takes the opposite bet: no crossing lines, one
      alignment held everywhere, and at most one thing moving. All eighteen are still on screen at
      once and every one still opens its full detail — six of the seven also show the partner names,
      which the board never did.</p>
    <nav class="jump" aria-label="Jump to a treatment">
      ${VARIANTS.map((v) => `<a href="#${v.key}">${v.n} ${esc(v.name)}</a>`).join('')}
    </nav>
    <a class="back" href="../">${icons.arrow} Back to the site</a>
  </div>
</header>

${VARIANTS.map((v) => `
<section class="variant" id="${v.key}">
  <div class="wrap">
    <div class="v-head">
      <div class="v-title"><span>${v.n}</span><h2>${esc(v.name)}</h2></div>
      <p class="v-line">${v.line}</p>
    </div>
    ${v.build()}
  </div>
</section>`).join('')}

<div hidden>
  ${ITEMS.map((it) => `
  <div data-pop-body="${it.key}">
    <div class="pop-head">
      ${mark(it, 1900)}
      <span><span class="pop-cat">${esc(it.cat)}</span><h3>${esc(it.name)}</h3></span>
    </div>
    <div class="pop-body">
      ${it.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
      ${it.url ? `<a class="lnk" href="${it.url}" target="_blank" rel="noopener">${esc(it.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}${icons.arrow}</a>` : ''}
    </div>
  </div>`).join('')}
</div>

<dialog class="pop" id="pop" aria-label="Partner detail">
  <div class="pop-in">
    <button class="pop-x" data-pop-close aria-label="Close">&times;</button>
    <div class="pop-scroll" data-pop-slot></div>
  </div>
</dialog>

<footer><div class="wrap">Demo · the site keeps the circuit board until one of these is chosen</div></footer>
<script>${JS}</script>
</body>
</html>`;
