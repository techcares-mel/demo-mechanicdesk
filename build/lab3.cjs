/* =========================================================================
   FEATURES LAB — five treatments for the "Everything you need in one place"
   block, rendered to features/index.html (noindex, not linked from the site).

   Rules carried over from the section on the site: the same twelve real
   modules, the same automotive icon set, and clicking one opens its full
   detail — spec plate, blurb, every bullet, the highlight, the deep link — in
   the same kind of popup. What changes is the block and what the light does.
   ========================================================================= */
const S = require('./shared.cjs');
const { esc, slug, ico, icons, C } = S;

const F = C.features.items;
const n2 = (i) => String(i + 1).padStart(2, '0');

/* ------------------------------------------------------------------ copy -- */
const VARIANTS = [
  { key: 'au', n: '01', name: 'Aurora glass',
    line: 'Frosted glass over a slow aurora. Hovering a tile clears its glass, so the light behind it comes through, and a spotlight follows the cursor across the grid.' },
  { key: 'tr', n: '02', name: 'Traced border',
    line: 'The same light that runs the integration board runs the rim of every tile — a single bright arc travelling the perimeter, faster and brighter under the cursor.' },
  { key: 'bn', n: '03', name: 'Bento mosaic',
    line: 'Not twelve equal squares: the four modules a workshop opens every day are given the room, the rest sit tight around them. Accent wipes across on hover.' },
  { key: 'ho', n: '04', name: 'Hologram',
    line: 'Each tile is a pane in space: it tilts to the cursor, the icon floats above the surface, a scanline drifts down it, and the whole grid powers on one tile at a time.' },
  { key: 'pl', n: '05', name: 'Plasma panel',
    line: 'One panel divided by hairlines instead of twelve cards. A plasma light moves under the surface with the cursor and lights whichever cell it is beneath.' }
];

/* the popup body for one module — identical in every variant */
const body = (f, i) => `
<div data-pop-body="${slug(f.name)}">
  <div class="pop-plate">
    <span>MODULE ${n2(i)}/12</span>
    <span class="pop-bolt">${icons.bolt}</span>
  </div>
  <div class="pop-head">
    <span class="pop-ico">${ico(f.icon, 'ico')}</span>
    <h3>${esc(f.name)}</h3>
  </div>
  <p class="pop-blurb">${esc(f.blurb)}</p>
  <ul class="pop-list">${f.bullets.map((b) => `<li>${icons.check}<span>${esc(b)}</span></li>`).join('')}</ul>
  ${f.highlight ? `<div class="pop-hl"><span class="eyebrow">Highlight</span><p>${esc(f.highlight)}</p></div>` : ''}
  <a class="lnk" href="${f.link.url}" target="_blank" rel="noopener">${esc(f.link.label)}${icons.arrow}</a>
</div>`;

/* ------------------------------------------------------- 01 aurora glass -- */
const aurora = () => `
<div class="au">
  <i class="au-blob b1" aria-hidden="true"></i><i class="au-blob b2" aria-hidden="true"></i>
  <i class="au-blob b3" aria-hidden="true"></i>
  <div class="au-grid" data-spot>
    ${F.map((f, i) => `
    <button class="au-tile tile" data-pop="${slug(f.name)}" aria-label="${esc(f.name)}">
      <span class="t-no">${n2(i)}</span>
      <span class="au-ico">${ico(f.icon, 'ico')}</span>
      <span class="t-name">${esc(f.name)}</span>
    </button>`).join('')}
  </div>
</div>`;

/* ------------------------------------------------------ 02 traced border -- */
const traced = () => `
<div class="tr-grid">
  ${F.map((f, i) => `
  <button class="tr-tile tile" data-pop="${slug(f.name)}" aria-label="${esc(f.name)}"
          style="--d:${(i * 0.42).toFixed(2)}s">
    <span class="tr-in">
      <span class="t-no">${n2(i)}</span>
      <span class="tr-ico">${ico(f.icon, 'ico')}</span>
      <span class="t-name">${esc(f.name)}</span>
      <span class="tr-ticks" aria-hidden="true"></span>
    </span>
  </button>`).join('')}
</div>`;

/* -------------------------------------------------------- 03 bento mosaic -- */
/* Every tile gets an explicit cell: auto-placement with mixed spans leaves
   holes, and the sizes mean something here — the two modules a workshop lives
   in get the room, the two it uses next get a wide strip. 4 columns x 5 rows,
   20 cells, no gaps. */
const CELLS = {
  'Booking Diary':               [1, 1, 2, 2],
  'Invoicing/Quoting':           [1, 3, 1, 2],
  'Service Scheduling':          [2, 3, 1, 1],
  'Reporting':                   [2, 4, 1, 1],
  'Job Management':              [3, 1, 2, 2],
  'Stock Control':               [3, 3, 1, 2],
  'Multisite Management':        [4, 3, 1, 1],
  'Customer and Vehicle Management': [4, 4, 1, 1],
  'Supplier Management':         [5, 1, 1, 1],
  'Point of Sales':              [5, 2, 1, 1],
  'Data Import/Export':          [5, 3, 1, 1],
  'Superhero Support':           [5, 4, 1, 1]
};
const bento = () => `
<div class="bn-grid">
  ${F.map((f, i) => {
    const c = CELLS[f.name] || [5, 1, 1, 1];
    const big = c[2] > 1;
    const wide = !big && c[3] > 1;
    return `
  <button class="bn-tile tile${big ? ' is-big' : (wide ? ' is-wide' : '')}" data-pop="${slug(f.name)}"
          aria-label="${esc(f.name)}" style="--r:${c[0]};--c:${c[1]};--rs:${c[2]};--cs:${c[3]}">
    <span class="bn-wipe" aria-hidden="true"></span>
    ${big ? `<span class="bn-ghost" aria-hidden="true">${n2(i)}</span>` : ''}
    <span class="bn-top"><span class="t-no">${n2(i)}</span><span class="bn-plus">${icons.plus}</span></span>
    <span class="bn-ico">${ico(f.icon, 'ico')}</span>
    <span class="bn-txt">
      <span class="t-name">${esc(f.name)}</span>
      ${big || wide ? `<span class="bn-blurb">${esc(f.blurb)}</span>` : ''}
    </span>
  </button>`;
  }).join('')}
</div>`;

/* ----------------------------------------------------------- 04 hologram -- */
const holo = () => `
<div class="ho-grid">
  ${F.map((f, i) => `
  <button class="ho-tile tile" data-pop="${slug(f.name)}" aria-label="${esc(f.name)}"
          data-tilt style="--d:${(i * 0.09).toFixed(2)}s">
    <span class="ho-scan" aria-hidden="true"></span>
    <span class="ho-in">
      <span class="t-no">${n2(i)}</span>
      <span class="ho-ico">${ico(f.icon, 'ico')}</span>
      <span class="t-name">${esc(f.name)}</span>
    </span>
  </button>`).join('')}
</div>`;

/* ------------------------------------------------------- 05 plasma panel -- */
const plasma = () => `
<div class="pl" data-plasma>
  <i class="pl-blob pl-idle" aria-hidden="true"></i>
  <i class="pl-blob pl-follow" aria-hidden="true"></i>
  <i class="pl-grain" aria-hidden="true"></i>
  <div class="pl-grid">
    ${F.map((f, i) => `
    <button class="pl-cell tile" data-pop="${slug(f.name)}" aria-label="${esc(f.name)}">
      <span class="t-no">${n2(i)}</span>
      <span class="pl-ico">${ico(f.icon, 'ico')}</span>
      <span class="t-name">${esc(f.name)}</span>
    </button>`).join('')}
  </div>
</div>`;

const BUILD = { au: aurora, tr: traced, bn: bento, ho: holo, pl: plasma };

/* ------------------------------------------------------------------- css -- */
const CSS = `
@property --a { syntax: '<angle>'; inherits: false; initial-value: 0deg; }

:root {
  --accent: #fca311; --accent-2: #ff8a00; --cool: #4a7dff; --violet: #8b5cf6;
  --bg: #0b0d0f; --surface: #12161a; --card: #151a1f;
  --line: rgba(255,255,255,.07); --line-2: rgba(255,255,255,.14);
  --text: #eef1f3; --text-2: #b1bac2; --muted: #7c8792;
  --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
  --sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --head: 'Space Grotesk', 'Inter', sans-serif;
  --radius: 14px;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text-2); font-family: var(--sans); line-height: 1.6; overflow-x: hidden; }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; }
h1, h2, h3 { font-family: var(--head); color: var(--text); margin: 0; font-weight: 700; letter-spacing: -0.025em; }
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
.lede { margin-top: 1rem; max-width: 66ch; }
.jump { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:1.5rem; }
.jump a { font-family: var(--mono); font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:var(--text-2);
  border:1px solid var(--line-2); border-radius:999px; padding:.42rem .8rem; }
.jump a:hover { border-color: var(--accent); color: var(--accent); }
.back { margin-top:1.3rem; display:inline-flex; align-items:center; gap:.5rem; font-size:.93rem; font-weight:600; color:var(--accent); }
.back svg { width:15px; height:15px; }

.variant { padding: clamp(2.5rem,5vw,4rem) 0; border-top: 1px solid var(--line); }
.v-head { display:flex; align-items:flex-end; justify-content:space-between; gap:2rem; flex-wrap:wrap; margin-bottom: clamp(1.5rem,3vw,2.25rem); }
.v-title { display:flex; align-items:baseline; gap:.9rem; }
.v-title span { font-family: var(--mono); font-size:.82rem; color: var(--accent); letter-spacing:.12em; }
.v-line { max-width: 58ch; font-size:.97rem; color: var(--muted); }

/* shared bits of every tile ------------------------------------------------ */
.tile { position: relative; border: 0; background: none; color: inherit; text-align: left; display: grid; }
.tile:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.t-no { font-family: var(--mono); font-size: .96rem; letter-spacing: .1em; color: var(--muted); }
.t-name { font-family: var(--head); font-weight: 600; font-size: clamp(.8rem, .85vw, .92rem); line-height: 1.2; color: var(--text); letter-spacing: -.015em; }
.ico { display: inline-flex; }
.ico svg { width: 18px; height: 18px; }

/* ---------------------------------------------------- 01 aurora glass ---- */
.au { position: relative; padding: clamp(1rem,2vw,2rem); border-radius: 22px; overflow: hidden; isolation: isolate; }
.au-blob { position:absolute; border-radius:50%; filter: blur(70px); z-index:-1; pointer-events:none; }
.au-blob.b1 { width:46%; height:120%; left:-4%; top:-30%; background: radial-gradient(circle, rgba(252,163,17,.42), transparent 66%); animation: drift 30s ease-in-out infinite alternate; }
.au-blob.b2 { width:52%; height:130%; right:-8%; bottom:-40%; background: radial-gradient(circle, rgba(74,125,255,.4), transparent 66%); animation: drift 42s ease-in-out infinite alternate-reverse; }
.au-blob.b3 { width:38%; height:100%; left:36%; top:-14%; background: radial-gradient(circle, rgba(139,92,246,.34), transparent 68%); animation: drift 52s ease-in-out infinite alternate; }
@keyframes drift { from { transform: translate3d(-6%,-5%,0) scale(1);} to { transform: translate3d(8%,7%,0) scale(1.22);} }
.au-grid { position: relative; display:grid; grid-template-columns: repeat(6,1fr); gap: clamp(.5rem,.8vw,.8rem); }
.au-grid::after {
  content:''; position:absolute; inset:0; pointer-events:none; border-radius:18px; opacity: var(--spot,0);
  background: radial-gradient(340px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.10), transparent 70%);
  transition: opacity .4s ease;
}
.au-tile {
  aspect-ratio: 1; grid-template-rows: auto 1fr auto; gap:.4rem; padding: clamp(.7rem,1vw,.9rem);
  border-radius: 18px; background: rgba(255,255,255,.055); border: 1px solid rgba(255,255,255,.10);
  backdrop-filter: blur(16px) saturate(1.25); -webkit-backdrop-filter: blur(16px) saturate(1.25);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 20px 40px -30px #000;
  transition: transform .4s cubic-bezier(.2,.8,.3,1), background .4s ease, backdrop-filter .4s ease, border-color .4s ease;
}
.au-tile:hover { transform: translateY(-5px); background: rgba(255,255,255,.02); border-color: rgba(255,255,255,.28);
  backdrop-filter: blur(3px) saturate(1.5); -webkit-backdrop-filter: blur(3px) saturate(1.5); }
.au-ico { width: clamp(34px,2.9vw,40px); aspect-ratio:1; border-radius:12px; display:grid; place-items:center; align-self:center;
  background: rgba(255,255,255,.10); color: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,.25); transition: transform .4s ease, background .4s ease; }
.au-tile:hover .au-ico { transform: translateY(-2px) scale(1.08); background: rgba(252,163,17,.35); }

/* --------------------------------------------------- 02 traced border ---- */
.tr-grid { display:grid; grid-template-columns: repeat(6,1fr); gap: clamp(.5rem,.8vw,.8rem); }
.tr-tile {
  aspect-ratio: 1; padding: 1px; border-radius: var(--radius); position: relative;
  background: conic-gradient(from var(--a), rgba(255,255,255,.05) 0 66%, var(--accent) 80%, rgba(255,255,255,.05) 90%);
  animation: trace 6s linear infinite; animation-delay: calc(var(--d) * -1);
  transition: filter .35s ease, transform .35s cubic-bezier(.2,.8,.3,1);
}
@keyframes trace { to { --a: 360deg; } }
.tr-tile:hover { transform: translateY(-4px); animation-duration: 2.2s; filter: drop-shadow(0 0 12px rgba(252,163,17,.35)); }
.tr-in {
  display:grid; grid-template-rows: auto 1fr auto; gap:.4rem; height:100%; padding: clamp(.7rem,1vw,.9rem);
  border-radius: calc(var(--radius) - 1px); background: #101418; position: relative; overflow: hidden;
}
.tr-in::before { content:''; position:absolute; inset:0; opacity:0; transition:opacity .35s ease;
  background: radial-gradient(120% 80% at 50% 118%, rgba(252,163,17,.20), transparent 62%); }
.tr-tile:hover .tr-in::before { opacity: 1; }
.tr-ico { width: clamp(34px,2.9vw,40px); aspect-ratio:1; border-radius:10px; display:grid; place-items:center; align-self:center;
  background: rgba(252,163,17,.1); color: var(--accent); transition: transform .35s ease; }
.tr-tile:hover .tr-ico { transform: translateY(-2px) scale(1.07); }
.tr-ticks { position:absolute; left:0; right:0; bottom:0; height:2px; transform: scaleX(0); transform-origin:left;
  background: repeating-linear-gradient(90deg, var(--accent) 0 6px, transparent 6px 12px); transition: transform .45s cubic-bezier(.2,.8,.3,1); }
.tr-tile:hover .tr-ticks { transform: scaleX(1); }

/* ----------------------------------------------------- 03 bento mosaic --- */
.bn-grid { display:grid; grid-template-columns: repeat(4,1fr); grid-auto-rows: minmax(104px, auto); gap: clamp(.5rem,.8vw,.8rem); }
.bn-tile { grid-row: var(--r) / span var(--rs); grid-column: var(--c) / span var(--cs); }
.bn-tile {
  grid-template-rows: auto 1fr auto; gap:.5rem; padding: clamp(.85rem,1.2vw,1.15rem); overflow:hidden;
  border:1px solid var(--line); border-radius: var(--radius); background: var(--card);
  transition: transform .35s cubic-bezier(.2,.8,.3,1), border-color .35s ease;
}
.bn-tile:hover { transform: translateY(-3px); border-color: var(--line-2); }
.bn-wipe { position:absolute; inset:0; transform: scaleX(0); transform-origin:left; transition: transform .5s cubic-bezier(.2,.8,.3,1);
  background: linear-gradient(90deg, rgba(252,163,17,.20), rgba(252,163,17,.04) 60%, transparent); }
.bn-tile:hover .bn-wipe { transform: scaleX(1); }
.bn-top { display:flex; align-items:center; justify-content:space-between; position:relative; }
.bn-plus { color: var(--muted); display:inline-flex; transition: color .3s ease, transform .3s ease; }
.bn-plus svg { width:12px; height:12px; }
.bn-tile:hover .bn-plus { color: var(--accent); transform: rotate(90deg); }
.bn-ico { position:relative; width:40px; aspect-ratio:1; border-radius:11px; display:grid; place-items:center; align-self:end;
  background: rgba(252,163,17,.1); color: var(--accent); transition: transform .35s ease; }
.bn-tile.is-big .bn-ico { width:52px; }
.bn-tile.is-big .bn-ico svg { width:22px; height:22px; }
.bn-tile:hover .bn-ico { transform: translateY(-2px) scale(1.06); }
.bn-txt { position:relative; display:grid; gap:.3rem; }
.bn-ghost { position:absolute; right:.22em; bottom:-.2em; font-family: var(--head); font-weight:700;
  font-size: clamp(3.6rem, 6vw, 6.5rem); line-height:1; color: rgba(255,255,255,.05); letter-spacing:-.04em; }
.bn-tile.is-big .t-name { font-size: clamp(1rem, 1.3vw, 1.25rem); }
.bn-blurb { font-size:.88rem; color: var(--muted); line-height:1.5; }

/* -------------------------------------------------------- 04 hologram ---- */
.ho-grid { display:grid; grid-template-columns: repeat(6,1fr); gap: clamp(.5rem,.8vw,.8rem); perspective: 900px; }
.ho-tile {
  aspect-ratio: 1; border-radius: var(--radius); overflow:hidden; position:relative;
  background: linear-gradient(160deg, rgba(74,125,255,.20), rgba(120,180,255,.06) 48%, rgba(252,163,17,.06) 78%, transparent), #0d1116;
  border: 1px solid rgba(120,180,255,.16); transform-style: preserve-3d;
  transform: rotateX(calc(var(--my,0) * -12deg)) rotateY(calc(var(--mx,0) * 16deg));
  transition: transform .5s cubic-bezier(.2,.8,.3,1), border-color .4s ease, box-shadow .4s ease;
  animation: powerOn .7s steps(6, end) both; animation-delay: var(--d);
}
@keyframes powerOn { from { opacity: 0; filter: brightness(2.4); } to { opacity: 1; filter: none; } }
.ho-tile.is-live { transition: transform .12s linear, border-color .4s ease, box-shadow .4s ease; }
.ho-tile:hover { border-color: rgba(120,180,255,.5); box-shadow: 0 0 0 1px rgba(120,180,255,.25), 0 22px 44px -26px rgba(30,80,200,.7); }
.ho-in { position:relative; display:grid; grid-template-rows:auto 1fr auto; gap:.4rem; height:100%; padding: clamp(.7rem,1vw,.9rem); transform-style: preserve-3d; }
.ho-scan { position:absolute; inset:0; pointer-events:none; opacity:.5;
  background: repeating-linear-gradient(180deg, rgba(180,220,255,.10) 0 1px, transparent 1px 3px); }
.ho-scan::after { content:''; position:absolute; left:0; right:0; height:32%;
  background: linear-gradient(180deg, transparent, rgba(150,210,255,.26), transparent);
  animation: sweepDown 4.5s linear infinite; }
@keyframes sweepDown { from { transform: translateY(-120%); } to { transform: translateY(420%); } }
.ho-ico { width: clamp(34px,2.9vw,40px); aspect-ratio:1; border-radius:11px; display:grid; place-items:center; align-self:center;
  background: rgba(150,210,255,.12); color: #cfe6ff; transform: translateZ(26px);
  box-shadow: 0 10px 20px -12px rgba(0,0,0,.9); transition: transform .4s ease; }
.ho-tile:hover .ho-ico { transform: translateZ(42px) scale(1.06); background: rgba(252,163,17,.22); color: #ffd591; }
.ho-tile .t-name { transform: translateZ(14px); }
.ho-tile .t-no { color: rgba(180,220,255,.55); }

/* ----------------------------------------------------- 05 plasma panel --- */
.pl { position:relative; border:1px solid var(--line); border-radius: 18px; overflow:hidden; background:#0e1216; isolation:isolate; }
.pl-blob { position:absolute; top:0; left:0; width: 460px; aspect-ratio:1; margin:-230px 0 0 -230px; pointer-events:none; z-index:0;
  background: radial-gradient(circle, rgba(252,163,17,.55), rgba(255,138,0,.18) 40%, transparent 68%);
  filter: blur(28px); transition: opacity .55s ease; }
/* one light drifts on its own so the panel is never dead, and hands over to
   the one that follows the cursor as soon as there is a cursor */
.pl-idle { opacity: .62; filter: blur(24px); animation: plasmaDrift 24s ease-in-out infinite alternate; }
.pl:hover .pl-idle { opacity: 0; }
@keyframes plasmaDrift {
  0%   { transform: translate3d(60%, 62%, 0); }
  34%  { transform: translate3d(140%, 26%, 0); }
  68%  { transform: translate3d(225%, 76%, 0); }
  100% { transform: translate3d(85%, 42%, 0); }
}
.pl-follow { opacity: 0; transform: translate3d(calc(var(--x,0) * 1px), calc(var(--y,0) * 1px), 0); }
.pl:hover .pl-follow { opacity: 1; }
.pl-grain { position:absolute; inset:0; pointer-events:none; z-index:1; opacity:.5; mix-blend-mode: overlay;
  background-image: repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,.05) 0 .3deg, transparent .3deg 1.4deg);
  background-size: 7px 7px; }
.pl-grid { position:relative; z-index:2; display:grid; grid-template-columns: repeat(6,1fr); }
.pl-cell {
  aspect-ratio: 1; grid-template-rows:auto 1fr auto; gap:.4rem; padding: clamp(.7rem,1vw,.95rem);
  border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
  transition: background .35s ease, transform .35s cubic-bezier(.2,.8,.3,1);
}
.pl-cell:nth-child(6n) { border-right: 0; }
.pl-cell:nth-child(n+7) { border-bottom: 0; }
.pl-cell:hover { background: rgba(255,255,255,.04); }
.pl-ico { width: clamp(34px,2.9vw,40px); aspect-ratio:1; border-radius:11px; display:grid; place-items:center; align-self:center;
  background: rgba(255,255,255,.06); color: var(--text); transition: transform .35s ease, background .35s ease, color .35s ease; }
.pl-cell:hover .pl-ico { transform: translateY(-2px) scale(1.08); background: rgba(252,163,17,.28); color: #fff; }

/* --------------------------------------------------------------- popup --- */
.pop { margin:auto; border:0; padding:0; background:transparent; overflow:hidden; width:min(700px,92vw); }
.pop::backdrop { background: rgba(5,7,9,.78); backdrop-filter: blur(6px); }
.pop-in { position:relative; max-height:86vh; overflow:hidden; background: var(--card); border:1px solid var(--line-2); border-radius: var(--radius); }
.pop[open] .pop-in { animation: popIn .34s cubic-bezier(.2,.9,.3,1) both; }
@keyframes popIn { from { opacity:0; transform: scale(.955);} to { opacity:1; transform:none;} }
.pop-scroll { max-height:86vh; overflow-y:auto; overscroll-behavior:contain; scrollbar-gutter:stable;
  padding: clamp(1.3rem,2.6vw,1.9rem); scrollbar-width:thin; scrollbar-color: rgba(255,255,255,.2) transparent; }
.pop-scroll::-webkit-scrollbar { width:10px; }
.pop-scroll::-webkit-scrollbar-track { background:transparent; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.18); border-radius:999px; border:3px solid transparent; background-clip: padding-box; }
.pop-x { position:absolute; top:.7rem; right:.7rem; width:34px; height:34px; z-index:2; border:1px solid var(--line);
  border-radius:50%; background: rgba(20,24,28,.9); color: var(--text-2); font-size:1.15rem; line-height:1; display:grid; place-items:center; }
.pop-x:hover { border-color: var(--accent); color: var(--accent); }
.pop-plate { display:flex; align-items:center; justify-content:space-between; padding-bottom:.8rem; margin-bottom:1.1rem; position:relative;
  font-family: var(--mono); font-size:.74rem; letter-spacing:.16em; color: var(--muted); }
.pop-plate::after { content:''; position:absolute; left:0; right:0; bottom:0; height:1px;
  background-image: repeating-linear-gradient(90deg, var(--line-2) 0 3px, transparent 3px 7px); }
.pop-bolt { color: rgba(255,255,255,.16); display:inline-flex; }
.pop-bolt svg { width:16px; height:16px; }
.pop-head { display:flex; align-items:center; gap:.85rem; }
.pop-ico { width:46px; height:46px; flex:0 0 auto; border-radius:12px; display:grid; place-items:center; background: rgba(252,163,17,.1); color: var(--accent); }
.pop-blurb { margin:.9rem 0 1.1rem; font-size:1.02rem; color: var(--text-2); }
.pop-list { display:grid; gap:.6rem; margin:0; padding:0; list-style:none; }
.pop-list li { display:grid; grid-template-columns:18px 1fr; gap:.65rem; font-size:.95rem; color: var(--text-2); }
.pop-list svg { width:14px; height:14px; color: var(--accent); margin-top:.3rem; }
.pop-hl { margin-top:1.2rem; padding-left:1.1rem; border-left:2px solid var(--accent); }
.pop-hl p { margin-top:.4rem; font-size:.96rem; }
.pop .lnk { margin-top:1.2rem; }

footer { border-top:1px solid var(--line); padding:1.75rem 0 3.5rem; font-family: var(--mono); font-size:.76rem; letter-spacing:.05em; color: var(--muted); }

@media (max-width: 1180px) { .au-grid, .tr-grid, .ho-grid, .pl-grid { grid-template-columns: repeat(5,1fr); } .pl-cell:nth-child(6n){border-right:1px solid var(--line)} .pl-cell:nth-child(5n){border-right:0} .pl-cell:nth-child(n+7){border-bottom:1px solid var(--line)} .pl-cell:nth-child(n+11){border-bottom:0} }
@media (max-width: 1024px) { .au-grid, .tr-grid, .ho-grid, .pl-grid { grid-template-columns: repeat(4,1fr); } .pl-cell:nth-child(5n){border-right:1px solid var(--line)} .pl-cell:nth-child(4n){border-right:0} .pl-cell:nth-child(n+11){border-bottom:1px solid var(--line)} .pl-cell:nth-child(n+9){border-bottom:0} }
@media (max-width: 760px) {
  .au-grid, .tr-grid, .ho-grid, .pl-grid { grid-template-columns: repeat(3,1fr); }
  .bn-grid { grid-template-columns: repeat(2,1fr); }
  .bn-tile { grid-row: auto; grid-column: auto; }
  .bn-tile.is-big, .bn-tile.is-wide { grid-column: span 2; }
  .bn-ghost { display: none; }
  .pl-cell { border-right:1px solid var(--line); border-bottom:1px solid var(--line) }
  .pl-cell:nth-child(3n){border-right:0} .pl-cell:nth-child(n+10){border-bottom:0}
}
@media (max-width: 520px) {
  .au-grid, .tr-grid, .ho-grid, .pl-grid { grid-template-columns: repeat(2,1fr); }
  .pl-cell:nth-child(3n){border-right:1px solid var(--line)} .pl-cell:nth-child(2n){border-right:0}
  .pl-cell:nth-child(n+10){border-bottom:1px solid var(--line)} .pl-cell:nth-child(n+11){border-bottom:0}
}
@media (prefers-reduced-motion: reduce) {
  .au-blob, .tr-tile, .ho-scan::after, .ho-tile { animation: none !important; }
  .ho-tile { transform: none !important; }
}
`;

/* -------------------------------------------------------------------- js -- */
const JS = `
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* one popup, every tile ------------------------------------------------- */
  var pop = $('#pop');
  var slot = $('[data-pop-slot]', pop);
  var opener = null;
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

  if (coarse || reduced) return;

  /* 01 — the spotlight follows the cursor across the glass ---------------- */
  $$('[data-spot]').forEach(function (el) {
    var q = false, x = 0, y = 0;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      x = e.clientX - r.left; y = e.clientY - r.top;
      if (!q) { q = true; requestAnimationFrame(function () {
        q = false; el.style.setProperty('--mx', x + 'px'); el.style.setProperty('--my', y + 'px');
      }); }
    }, { passive: true });
    el.addEventListener('pointerenter', function () { el.style.setProperty('--spot', 1); });
    el.addEventListener('pointerleave', function () { el.style.setProperty('--spot', 0); });
  });

  /* 04 — every pane tilts to the cursor ---------------------------------- */
  $$('[data-tilt]').forEach(function (el) {
    var q = false, mx = 0, my = 0;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      if (!q) { q = true; requestAnimationFrame(function () {
        q = false; el.style.setProperty('--mx', mx.toFixed(3)); el.style.setProperty('--my', my.toFixed(3));
      }); }
    }, { passive: true });
    el.addEventListener('pointerenter', function () { el.classList.add('is-live'); });
    el.addEventListener('pointerleave', function () {
      el.classList.remove('is-live');
      el.style.setProperty('--mx', 0); el.style.setProperty('--my', 0);
    });
  });

  /* 05 — the plasma light tracks the cursor under the panel -------------- */
  $$('[data-plasma]').forEach(function (el) {
    var blob = $('.pl-follow', el), q = false, x = 0, y = 0;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      x = e.clientX - r.left; y = e.clientY - r.top;
      if (!q) { q = true; requestAnimationFrame(function () {
        q = false; blob.style.setProperty('--x', x.toFixed(0)); blob.style.setProperty('--y', y.toFixed(0));
      }); }
    }, { passive: true });
    /* the fade is CSS (.pl:hover) — JS only carries the position */
  });
})();
`;

module.exports = () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Features — five treatments</title>
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
    <p class="eyebrow">Features · five treatments</p>
    <h1>${esc(C.features.heading)}</h1>
    <p class="lede">The same twelve modules and the same popup in all five — every one of them opens
      the real detail, bullets and all. What changes is the block and what the light does. Pick one
      and it replaces the grid on the site.</p>
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
      <p class="v-line">${esc(v.line)}</p>
    </div>
    ${BUILD[v.key]()}
  </div>
</section>`).join('')}

<div hidden>${F.map(body).join('')}</div>

<dialog class="pop" id="pop" aria-label="Feature detail">
  <div class="pop-in">
    <button class="pop-x" data-pop-close aria-label="Close">&times;</button>
    <div class="pop-scroll" data-pop-slot></div>
  </div>
</dialog>

<footer><div class="wrap">Demo · the site keeps its current grid until one of these is chosen</div></footer>
<script>${JS}</script>
</body>
</html>`;
