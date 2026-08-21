/* =========================================================================
   INTEGRATIONS LAB — four design directions for the integrations section.
   Rendered to integrations/index.html so the main page stays untouched
   until one is chosen. Self-contained: its own tokens, CSS and JS.

   All four share one discipline the first attempt lacked: every logo sits on
   an identical plate at an identical optical size, desaturated at rest and
   full colour on focus. The motion carries the "futuristic" read, not the
   logos.
   ========================================================================= */
const { esc, slug, icons, C } = require('./shared.cjs');

const ITEMS = [];
C.integrations.categories.forEach((g) => g.items.forEach((it) => ITEMS.push({
  key: slug(it.name), name: it.name, cat: g.name, file: it.file, lines: it.lines, url: it.url
})));

const logo = (it, cls) => `<span class="${cls || 'mark'}">${it.file
  ? `<img src="../images/logos/${it.file}" alt="" loading="lazy">`
  : `<em>${esc(it.name.split(' ')[0])}</em>`}</span>`;

/* ---------------------------------------------------------------- 01 orbit */
const orbit = () => {
  const rings = [ITEMS.slice(0, 5), ITEMS.slice(5, 11), ITEMS.slice(11, 18)];
  const spin = [86, 118, 152];
  return `
<div class="orbit" data-scope="orbit">
  <div class="orbit-field" aria-hidden="true">
    <i class="orb-ring r1"></i><i class="orb-ring r2"></i><i class="orb-ring r3"></i>
    <i class="orb-sweep"></i>
  </div>
  <div class="orbit-core">
    <img src="../images/logo.png" alt="MechanicDesk" width="44" height="45">
    <i class="orb-pulse"></i><i class="orb-pulse d"></i>
  </div>
  ${rings.map((ring, r) => `
  <div class="orb-track t${r + 1}" style="--spin:${spin[r]}s">
    ${ring.map((it, i) => `
    <div class="orb-slot" style="--a:${(360 / ring.length) * i}deg">
      <button class="node" data-node="${it.key}" style="--spin:${spin[r]}s" aria-label="${esc(it.name)}">
        ${logo(it)}
      </button>
    </div>`).join('')}
  </div>`).join('')}
</div>`;
};

/* --------------------------------------------------------------- 02 aurora */
const aurora = () => `
<div class="aurora" data-scope="aurora">
  <i class="au-blob a" aria-hidden="true"></i><i class="au-blob b" aria-hidden="true"></i>
  <div class="au-grid" data-spot>
    ${ITEMS.map((it) => `
    <button class="au-cell node" data-node="${it.key}" aria-label="${esc(it.name)}">
      ${logo(it)}
      <span class="au-name">${esc(it.name)}</span>
    </button>`).join('')}
  </div>
</div>`;

/* --------------------------------------------------------------- 03 signal */
/* Hub at the top, eighteen nodes fanned out below it. Node positions and the
   SVG wires are computed from the same 0..100 coordinate space, so the lines
   always land exactly on the nodes at any width. */
const signal = () => {
  const HUB = { x: 50, y: 11 };
  const per = 9;
  const pts = ITEMS.map((it, i) => {
    const r = Math.floor(i / per), c = i % per;
    return { it, x: 7 + c * 10.75, y: r === 0 ? 52 : 88 };
  });
  return `
<div class="signal" data-scope="signal">
  <svg class="sig-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    ${pts.map((p, i) => `<path class="wire" vector-effect="non-scaling-stroke" style="--i:${i}"
      d="M ${p.x.toFixed(2)} ${p.y} C ${p.x.toFixed(2)} ${((p.y + HUB.y) / 2).toFixed(2)}, ${HUB.x} ${((p.y + HUB.y) / 2).toFixed(2)}, ${HUB.x} ${HUB.y}"></path>`).join('')}
  </svg>
  <div class="sig-hub" style="left:${HUB.x}%;top:${HUB.y}%">
    <img src="../images/logo.png" alt="MechanicDesk" width="30" height="31">
    <span>MechanicDesk</span>
    <i class="sig-halo"></i>
  </div>
  ${pts.map((p) => `
  <button class="sig-node node" data-node="${p.it.key}" style="left:${p.x.toFixed(2)}%;top:${p.y}%" aria-label="${esc(p.it.name)}">
    ${logo(p.it)}
  </button>`).join('')}
</div>`;
};

/* --------------------------------------------------------------- 04 ribbon */
const ribbon = () => {
  const rows = [ITEMS.slice(0, 6), ITEMS.slice(6, 12), ITEMS.slice(12, 18)];
  const dur = [64, 78, 58];
  return `
<div class="ribbon" data-scope="ribbon">
  <div class="rib-stage">
    ${rows.map((row, r) => `
    <div class="rib-row${r % 2 ? ' rev' : ''}" style="--dur:${dur[r]}s">
      <div class="rib-track">
        ${[0, 1].map(() => row.map((it) => `
        <button class="rib-card node" data-node="${it.key}" aria-label="${esc(it.name)}">
          ${logo(it)}<span>${esc(it.name)}</span>
        </button>`).join('')).join('')}
      </div>
    </div>`).join('')}
  </div>
</div>`;
};

const detail = (scope) => `
<div class="detail" data-detail="${scope}">
  <div class="detail-inner"></div>
</div>`;

const VARIANTS = [
  { key: 'orbit', n: '01', name: 'Orbit', line: 'Three counter-rotating rings around the MechanicDesk core, with a slow radar sweep. Hover anywhere to freeze the system; click a satellite to read it.', build: orbit },
  { key: 'aurora', n: '02', name: 'Aurora grid', line: 'A calm 6-column grid over two drifting light fields. The cursor carries a spotlight that lifts the tile under it — idle, the light keeps moving on its own.', build: aurora },
  { key: 'signal', n: '03', name: 'Signal hub', line: 'Every partner wired into MechanicDesk, with data pulses running down the lines. Shows what an integration actually is, not just who it is.', build: signal },
  { key: 'ribbon', n: '04', name: 'Drifting ribbons', line: 'Three ribbons gliding at different speeds on a slight tilt. All eighteen stay on screen; hovering a ribbon stops it.', build: ribbon }
];

const CSS = `
:root{
  --accent:#fca311;--accent-2:#ff7a2f;--cool:#4a7dff;
  --bg:#0b0d0f;--bg-2:#0e1114;--surface:#12161a;
  --line:rgba(255,255,255,.07);--line-2:rgba(255,255,255,.13);
  --text:#eef1f3;--text-2:#b1bac2;--muted:#7c8792;
  --mono:'JetBrains Mono',ui-monospace,Menlo,monospace;
  --sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  --head:'Space Grotesk','Inter',sans-serif;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text-2);font-family:var(--sans);font-size:1rem;line-height:1.65;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
button{font:inherit;cursor:pointer}
h1,h2,h3{font-family:var(--head);color:var(--text);margin:0;font-weight:700;letter-spacing:-.025em}
h1{font-size:clamp(2rem,3.6vw,2.9rem);line-height:1.06}
h2{font-size:clamp(1.5rem,2.4vw,2.05rem)}
h3{font-size:1.16rem;font-weight:600}
p{margin:0}
.wrap{max-width:1240px;margin:0 auto;padding:0 clamp(1.25rem,4vw,2.5rem)}
.eyebrow{display:inline-block;font-family:var(--mono);font-size:.78rem;letter-spacing:.15em;text-transform:uppercase;color:var(--accent)}

header.top{padding:clamp(3rem,6vw,5rem) 0 clamp(2rem,4vw,3rem);position:relative;overflow:hidden}
header.top::after{content:'';position:absolute;top:-70%;right:-10%;width:60vw;height:150%;background:radial-gradient(circle,rgba(252,163,17,.13),transparent 62%);pointer-events:none}
.brandline{display:flex;align-items:center;gap:.7rem;margin-bottom:1.8rem}
.brandline img{width:34px}
.brandline strong{font-family:var(--head);font-size:1.1rem;color:var(--text)}
.brandline strong em{font-style:normal;color:var(--accent)}
.lede{margin-top:1rem;max-width:66ch;font-size:1.06rem}
.back{margin-top:1.6rem;display:inline-flex;align-items:center;gap:.5rem;font-size:.93rem;font-weight:600;color:var(--accent)}
.back svg{width:15px;height:15px}

.variant{padding:clamp(3rem,6vw,5.5rem) 0;border-top:1px solid var(--line)}
.v-head{display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;flex-wrap:wrap;margin-bottom:clamp(2rem,4vw,3rem)}
.v-title{display:flex;align-items:baseline;gap:.9rem}
.v-title span{font-family:var(--mono);font-size:.82rem;color:var(--accent);letter-spacing:.12em}
.v-line{max-width:52ch;font-size:.97rem;color:var(--muted)}

/* shared: a logo mark, identical size and treatment everywhere ---------- */
.mark{display:grid;place-items:center;width:100%;height:100%;overflow:hidden}
.mark img{max-width:74%;max-height:52%;width:auto;object-fit:contain;filter:grayscale(.92) contrast(.95) brightness(1.08);opacity:.86;transition:filter .35s ease,opacity .35s ease}
.mark em{font-family:var(--head);font-style:normal;font-weight:700;font-size:.72rem;color:#0b0d0f}
.node{border:0;background:none;padding:0;color:inherit}
.node:hover .mark img,.node:focus-visible .mark img,.node.on .mark img{filter:none;opacity:1}
.node:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* detail panel, shared by all four ------------------------------------- */
.detail{margin-top:clamp(2rem,4vw,3rem);min-height:132px}
.detail-inner{max-width:64ch;margin:0 auto;text-align:center;opacity:0;transform:translateY(8px);transition:opacity .35s ease,transform .35s ease}
.detail-inner.in{opacity:1;transform:none}
.detail-head{display:inline-flex;align-items:center;gap:.85rem;margin-bottom:.85rem;text-align:left}
.detail-mark{width:68px;height:42px;flex:0 0 auto;display:grid;place-items:center;background:#f4f4f2;border-radius:9px;padding:.3rem;overflow:hidden}
.detail-mark img{max-width:100%;max-height:100%;width:auto;object-fit:contain}
.detail-mark em{font-family:var(--head);font-style:normal;font-weight:700;font-size:.72rem;color:#0b0d0f}
.detail p{font-size:.97rem;color:var(--text-2)}
.detail p+p{margin-top:.5rem}
.detail a{display:inline-flex;align-items:center;gap:.45rem;margin-top:.9rem;font-weight:600;color:var(--accent);font-size:.9rem}
.detail a svg{width:15px;height:15px}
.detail-hint{text-align:center;font-family:var(--mono);font-size:.76rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}

/* ---------------------------------------------------------- 01 orbit ---- */
.orbit{position:relative;width:min(760px,92vw);aspect-ratio:1;margin:0 auto}
.orbit-field{position:absolute;inset:0}
.orb-ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:50%;border:1px solid var(--line)}
.orb-ring.r1{width:42%;height:42%}
.orb-ring.r2{width:70%;height:70%}
.orb-ring.r3{width:98%;height:98%}
.orb-sweep{position:absolute;top:50%;left:50%;width:98%;height:98%;transform:translate(-50%,-50%);border-radius:50%;
  background:conic-gradient(from 0deg,rgba(252,163,17,.16),rgba(252,163,17,0) 28%,transparent 100%);
  animation:spin 9s linear infinite;mask-image:radial-gradient(circle,transparent 34%,#000 36%);-webkit-mask-image:radial-gradient(circle,transparent 34%,#000 36%)}
.orbit-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:96px;height:96px;border-radius:50%;
  display:grid;place-items:center;background:radial-gradient(circle at 40% 35%,#1c2126,#0e1215);box-shadow:0 0 0 1px var(--line-2),0 18px 50px -18px rgba(0,0,0,.9)}
.orbit-core img{width:44px}
.orb-pulse{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(252,163,17,.5);animation:pulse 3.4s ease-out infinite}
.orb-pulse.d{animation-delay:1.7s}
.orb-track{position:absolute;border-radius:50%;animation:spin var(--spin) linear infinite}
.orb-track.t1{inset:29%}
.orb-track.t2{inset:15%;animation-direction:reverse}
.orb-track.t3{inset:1%}
.orb-slot{position:absolute;inset:0;transform:rotate(var(--a))}
.orb-slot .node{position:absolute;top:0;left:50%;width:clamp(50px,6.8vw,70px);height:clamp(50px,6.8vw,70px);
  border-radius:50%;background:#f4f4f2;box-shadow:0 10px 24px -10px rgba(0,0,0,.75);
  transform:translate(-50%,-50%) rotate(calc(-1 * var(--a)));
  animation:spin-back var(--spin) linear infinite;transition:box-shadow .3s ease}
.orb-track.t2 .orb-slot .node{animation-direction:reverse}
.orb-slot .node:hover,.orb-slot .node.on{box-shadow:0 0 0 2px var(--accent),0 14px 30px -10px rgba(252,163,17,.5)}
.orbit:hover .orb-track,.orbit:hover .orb-sweep,.orbit:hover .orb-slot .node{animation-play-state:paused}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes spin-back{from{rotate:0deg}to{rotate:-360deg}}
@keyframes pulse{0%{transform:scale(1);opacity:.7}70%{transform:scale(2.1);opacity:0}100%{opacity:0}}

/* --------------------------------------------------------- 02 aurora ---- */
.aurora{position:relative;padding:clamp(1.5rem,3vw,2.5rem) 0;isolation:isolate}
.au-blob{position:absolute;border-radius:50%;filter:blur(70px);opacity:.5;z-index:-1;pointer-events:none}
.au-blob.a{width:46%;height:70%;left:4%;top:-10%;background:radial-gradient(circle,rgba(252,163,17,.5),transparent 68%);animation:drift 26s ease-in-out infinite alternate}
.au-blob.b{width:52%;height:72%;right:2%;bottom:-14%;background:radial-gradient(circle,rgba(74,125,255,.34),transparent 68%);animation:drift 34s ease-in-out infinite alternate-reverse}
@keyframes drift{from{transform:translate3d(-4%,-3%,0) scale(1)}to{transform:translate3d(6%,5%,0) scale(1.14)}}
.au-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;position:relative}
.au-grid::before{content:'';position:absolute;inset:-1px;border-radius:16px;pointer-events:none;
  background:radial-gradient(340px circle at var(--mx,50%) var(--my,0%),rgba(252,163,17,.16),transparent 70%);
  opacity:.9;transition:opacity .4s ease}
.au-cell{position:relative;aspect-ratio:1.35;border-radius:14px;overflow:hidden;
  background:rgba(255,255,255,.028);box-shadow:inset 0 0 0 1px var(--line);
  display:grid;grid-template-rows:1fr auto;align-items:center;padding:.9rem .7rem .7rem;
  transition:transform .35s cubic-bezier(.34,1.4,.64,1),box-shadow .35s ease,background .35s ease}
.au-cell::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:radial-gradient(220px circle at var(--cx,50%) var(--cy,50%),rgba(252,163,17,.16),transparent 72%);opacity:0;transition:opacity .35s ease}
.au-cell:hover,.au-cell.on{transform:translateY(-4px);background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px rgba(252,163,17,.45),0 18px 34px -18px rgba(0,0,0,.8)}
.au-cell:hover::after,.au-cell.on::after{opacity:1}
.au-cell .mark img{max-height:34px;max-width:78%}
.au-name{font-family:var(--mono);font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);text-align:center;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .3s ease}
.au-cell:hover .au-name,.au-cell.on .au-name{color:var(--text-2)}

/* --------------------------------------------------------- 03 signal ---- */
.signal{position:relative;width:100%;aspect-ratio:2.5/1;min-height:400px}
.sig-wires{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.wire{fill:none;stroke:rgba(255,255,255,.16);stroke-width:1;stroke-dasharray:4 8;
  animation:flow 3.2s linear infinite;animation-delay:calc(var(--i) * -.16s)}
@keyframes flow{to{stroke-dashoffset:-48}}
.signal:hover .wire{stroke:rgba(252,163,17,.45)}
.sig-node{position:absolute;transform:translate(-50%,-50%);width:clamp(48px,4.6vw,66px);height:clamp(48px,4.6vw,66px);
  border-radius:50%;background:#f4f4f2;box-shadow:0 0 0 1px rgba(255,255,255,.14),0 12px 26px -14px rgba(0,0,0,.85);
  transition:transform .3s cubic-bezier(.34,1.5,.64,1),box-shadow .3s ease}
.sig-node::before{content:'';position:absolute;inset:-6px;border-radius:50%;border:1px solid rgba(252,163,17,.4);opacity:0;transition:opacity .3s ease}
.sig-node:hover,.sig-node.on{transform:translate(-50%,-50%) scale(1.12)}
.sig-node:hover::before,.sig-node.on::before{opacity:1}
.sig-node .mark img{max-height:40%;max-width:70%}
.sig-hub{position:absolute;transform:translate(-50%,-50%);z-index:2;
  display:flex;align-items:center;gap:.55rem;padding:.6rem 1rem .6rem .7rem;border-radius:999px;white-space:nowrap;
  background:linear-gradient(#1a2026,#101418);box-shadow:0 0 0 1px var(--line-2),0 0 46px -8px rgba(252,163,17,.5)}
.sig-hub img{width:26px}
.sig-hub span{font-family:var(--head);font-weight:600;color:var(--text);font-size:.95rem}
.sig-halo{position:absolute;inset:-6px;border-radius:999px;border:1px solid rgba(252,163,17,.4);animation:halo 3.6s ease-out infinite}
@keyframes halo{0%{transform:scale(1);opacity:.65}70%{transform:scale(1.5);opacity:0}100%{opacity:0}}

/* --------------------------------------------------------- 04 ribbon ---- */
.ribbon{perspective:1200px}
.rib-stage{display:grid;gap:14px;transform:rotateX(9deg);transform-style:preserve-3d;
  mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
.rib-row{overflow:hidden}
.rib-track{display:flex;gap:14px;width:max-content;animation:slide var(--dur) linear infinite}
.rib-row.rev .rib-track{animation-direction:reverse}
.rib-row:hover .rib-track{animation-play-state:paused}
@keyframes slide{to{transform:translateX(-50%)}}
.rib-card{flex:0 0 auto;width:clamp(158px,16vw,204px);height:clamp(72px,7.4vw,88px);border-radius:13px;
  display:grid;grid-template-columns:auto 1fr;align-items:center;gap:.7rem;padding:0 .95rem;text-align:left;
  background:rgba(255,255,255,.03);box-shadow:inset 0 0 0 1px var(--line);
  transition:transform .3s ease,box-shadow .3s ease,background .3s ease}
.rib-card .mark{width:40px;height:34px}
.rib-card .mark img{max-height:100%;max-width:100%}
.rib-card span{font-size:.8rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .3s ease}
.rib-card:hover,.rib-card.on{transform:translateY(-3px);background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(252,163,17,.45),0 16px 30px -16px rgba(0,0,0,.85)}
.rib-card:hover span,.rib-card.on span{color:var(--text)}

footer{border-top:1px solid var(--line);padding:2rem 0 4rem;font-family:var(--mono);font-size:.76rem;letter-spacing:.05em;color:var(--muted)}

@media (max-width:1024px){
  .au-grid{grid-template-columns:repeat(4,1fr)}
  .signal{aspect-ratio:1.9/1}
}
@media (max-width:620px){
  .au-grid{grid-template-columns:repeat(3,1fr);gap:9px}
  .au-name{display:none}
  .signal{aspect-ratio:1.05/1;min-height:520px}
  .sig-hub span{display:none}
  .rib-stage{transform:none}
  .orbit{width:96vw}
}
@media (prefers-reduced-motion:reduce){
  .orb-track,.orb-sweep,.orb-slot .node,.rib-track,.au-blob,.wire,.orb-pulse{animation:none!important}
}
`;

const JS = `
const DATA = __DATA__;
const ICON_ARROW = '__ARROW__';

function fill(scope, key) {
  const wrap = document.querySelector('[data-detail="' + scope + '"] .detail-inner');
  const it = DATA[key];
  if (!wrap || !it) return;
  wrap.classList.remove('in');
  setTimeout(function () {
    wrap.innerHTML =
      '<div class="detail-head">' +
        '<span class="detail-mark">' + (it.file
          ? '<img src="../images/logos/' + it.file + '" alt="">'
          : '<em>' + it.name.split(' ')[0] + '</em>') + '</span>' +
        '<span><span class="eyebrow">' + it.cat + '</span><h3>' + it.name + '</h3></span>' +
      '</div>' +
      it.lines.map(function (l) { return '<p>' + l + '</p>'; }).join('') +
      (it.url ? '<a href="' + it.url + '" target="_blank" rel="noopener">' +
        it.url.replace(/^https?:\\/\\//, '').replace(/\\/$/, '') + ICON_ARROW + '</a>' : '');
    requestAnimationFrame(function () { wrap.classList.add('in'); });
  }, 120);
}

document.querySelectorAll('[data-scope]').forEach(function (scope) {
  const name = scope.getAttribute('data-scope');
  const nodes = Array.prototype.slice.call(scope.querySelectorAll('[data-node]'));
  nodes.forEach(function (n) {
    n.addEventListener('click', function () {
      nodes.forEach(function (o) { o.classList.toggle('on', o === n); });
      fill(name, n.getAttribute('data-node'));
    });
  });
  if (nodes.length) { nodes[0].classList.add('on'); fill(name, nodes[0].getAttribute('data-node')); }
});

/* cursor spotlight for the aurora grid */
const spot = document.querySelector('[data-spot]');
if (spot) {
  let idle = true, t = 0;
  const set = function (x, y) { spot.style.setProperty('--mx', x + '%'); spot.style.setProperty('--my', y + '%'); };
  spot.addEventListener('pointermove', function (e) {
    idle = false;
    const r = spot.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width * 100).toFixed(2), ((e.clientY - r.top) / r.height * 100).toFixed(2));
    const cell = e.target.closest('.au-cell');
    if (cell) {
      const c = cell.getBoundingClientRect();
      cell.style.setProperty('--cx', ((e.clientX - c.left) / c.width * 100).toFixed(2) + '%');
      cell.style.setProperty('--cy', ((e.clientY - c.top) / c.height * 100).toFixed(2) + '%');
    }
  });
  spot.addEventListener('pointerleave', function () { idle = true; });
  (function loop() {
    if (idle) { t += 0.006; set((50 + Math.cos(t) * 34).toFixed(2), (46 + Math.sin(t * 1.3) * 40).toFixed(2)); }
    requestAnimationFrame(loop);
  })();
}
`;

module.exports = () => {
  const data = {};
  ITEMS.forEach((it) => { data[it.key] = { name: it.name, cat: it.cat, file: it.file, lines: it.lines, url: it.url }; });
  const js = JS.replace('__DATA__', JSON.stringify(data)).replace('__ARROW__', icons.arrow.replace(/"/g, '\\"'));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Integrations — four design directions</title>
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
    <p class="eyebrow">Integrations section · 4 directions</p>
    <h1>Four ways to show the eighteen partners.</h1>
    <p class="lede">All eighteen stay on screen in every version, and every one of them opens its own
      description on click. What changes is the motion and the geometry. One rule runs through all
      four: identical plates, identical optical logo size, desaturated at rest and full colour on
      focus — that is what the first attempt was missing.</p>
    <a class="back" href="../">${icons.arrow} Back to the site</a>
  </div>
</header>

${VARIANTS.map((v) => `
<section class="variant" id="${v.key}">
  <div class="wrap">
    <div class="v-head">
      <div class="v-title"><span>${v.n}</span><h2>${v.name}</h2></div>
      <p class="v-line">${v.line}</p>
    </div>
    ${v.build()}
    ${detail(v.key)}
  </div>
</section>`).join('')}

<footer>
  <div class="wrap">Demo · pick one and it replaces the integrations section on the main page</div>
</footer>
<script>${js}</script>
</body>
</html>`;
};
