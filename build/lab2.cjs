/* =========================================================================
   INTEGRATIONS LAB II — four dreamier alternatives to the solar system.
   Rendered to integrations/index.html; the main page keeps the orbit until
   one of these is chosen. Self-contained CSS + JS.

   Rules carried over from the orbit: all 18 partners on screen at once, no
   plates and no rings around the marks, original brand colours, every mark
   optically normalised to the same AREA, and a click opens that partner's
   detail. What changes is the motion.
   ========================================================================= */
const { esc, slug, icons, C, alphaLogo, markSize, markLift } = require('./shared.cjs');

const board = require('./lab2-board.cjs');

const ITEMS = [];
C.integrations.categories.forEach((g) => g.items.forEach((it) => ITEMS.push({
  key: slug(it.name), name: it.name, cat: g.name, file: it.file, lines: it.lines, url: it.url
})));

const AREA = 2400;
const BOOST = { 'ams_rewards.png': 1.7 };
const size = (it) => it.file
  ? markSize(it.file, AREA * (BOOST[it.file] || 1), 20, 66)
  : { w: 76, h: 22 };

const mark = (it, cls) => it.file
  ? `<img class="${cls}${markLift(it.file) ? ' lift' : ''}" src="../${alphaLogo(it.file)}"
       alt="" loading="lazy" style="--h:${size(it).h}px">`
  : `<em class="${cls} is-text">${esc(it.name.split(' ')[0])}</em>`;

/* --------------------------------------------------------------- layout --- */
/* Seeded dart-throwing: scatter the marks inside an ellipse, rejecting any
   position whose box overlaps one already placed. Deterministic per build. */
const scatter = (opts) => {
  const o = Object.assign({ W: 1180, H: 560, pad: 18, hole: 0, seed: 424242 }, opts);
  let seed = o.seed;
  const rnd = () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const placed = [];
  /* biggest first: the hard ones need the free space */
  const order = ITEMS.slice().sort((a, b) => size(b).w - size(a).w);
  order.forEach((it) => {
    const m = size(it);
    const bw = m.w + o.pad, bh = m.h + o.pad + 14;
    for (let tries = 0; tries < 4000; tries++) {
      const relax = tries / 4000;                       // loosen slowly if it is tight
      const x = bw / 2 + rnd() * (o.W - bw);
      const y = bh / 2 + rnd() * (o.H - bh);
      const nx = (x - o.W / 2) / (o.W / 2), ny = (y - o.H / 2) / (o.H / 2);
      const r = Math.sqrt(nx * nx + ny * ny);
      if (r > 1) continue;                              // keep the cluster elliptical
      if (o.hole && r < o.hole) continue;               // leave the middle clear
      const gap = 1 - 0.55 * relax;
      const clash = placed.some((p) =>
        Math.abs(p.x - x) < ((p.bw + bw) / 2) * gap && Math.abs(p.y - y) < ((p.bh + bh) / 2) * gap);
      if (clash) continue;
      placed.push({ it, x, y, bw, bh, r });
      return;
    }
    placed.push({ it, x: o.W / 2, y: o.H / 2, bw, bh, r: 0 });   // never happens in practice
  });
  return placed.map((p) => ({
    it: p.it, xPct: (p.x / o.W) * 100, yPct: (p.y / o.H) * 100, r: p.r
  }));
};

/* ------------------------------------------------------------- 01 nebula --- */
const nebula = () => {
  const pts = scatter({ W: 1180, H: 560, pad: 26, seed: 9137 });
  return `
<div class="neb" data-scope="neb" data-parallax>
  <i class="neb-cloud c1" aria-hidden="true"></i><i class="neb-cloud c2" aria-hidden="true"></i>
  <i class="neb-cloud c3" aria-hidden="true"></i>
  <div class="neb-field">
    ${pts.map((p, i) => `
    <button class="neb-node node" data-node="${p.it.key}" aria-label="${esc(p.it.name)}"
            style="left:${p.xPct.toFixed(2)}%;top:${p.yPct.toFixed(2)}%;--d:${(0.35 + (i % 7) * 0.11).toFixed(2)};
                   --bob:${(9 + (i % 5) * 2.4).toFixed(1)}s;--lag:${(i * 0.37).toFixed(2)}s">
      ${mark(p.it, 'mk')}
    </button>`).join('')}
  </div>
</div>`;
};

/* -------------------------------------------------------------- 02 depth --- */
const depth = () => {
  const pts = scatter({ W: 1180, H: 540, pad: 22, seed: 55501 });
  return `
<div class="dep" data-scope="dep" data-parallax>
  <i class="dep-bokeh b1" aria-hidden="true"></i><i class="dep-bokeh b2" aria-hidden="true"></i>
  <i class="dep-bokeh b3" aria-hidden="true"></i><i class="dep-bokeh b4" aria-hidden="true"></i>
  <div class="dep-stage">
    ${pts.map((p, i) => {
      const tier = i % 3;                              // 0 = near, 2 = far
      return `
    <button class="dep-node node t${tier}" data-node="${p.it.key}" aria-label="${esc(p.it.name)}"
            style="left:${p.xPct.toFixed(2)}%;top:${p.yPct.toFixed(2)}%;--d:${(0.25 + tier * 0.35).toFixed(2)};
                   --lag:${(i * 0.29).toFixed(2)}s">
      ${mark(p.it, 'mk')}
    </button>`;
    }).join('')}
  </div>
</div>`;
};

/* ------------------------------------------------------ 03 constellation --- */
const constellation = () => {
  const pts = scatter({ W: 1180, H: 560, pad: 30, seed: 777001 });
  /* join every mark to its two nearest neighbours, no duplicate edges */
  const edges = [];
  pts.forEach((a, i) => {
    const near = pts.map((b, j) => ({ j, d: Math.hypot(a.xPct - b.xPct, (a.yPct - b.yPct) * 0.47) }))
      .filter((x) => x.j !== i).sort((x, y) => x.d - y.d).slice(0, 2);
    near.forEach((n) => {
      const key = i < n.j ? i + '-' + n.j : n.j + '-' + i;
      if (!edges.some((e) => e.key === key)) edges.push({ key, a: i, b: n.j });
    });
  });
  return `
<div class="cons" data-scope="cons" data-parallax>
  <i class="cons-stars" aria-hidden="true"></i>
  <svg class="cons-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    ${edges.map((e, n) => `<line class="cw" vector-effect="non-scaling-stroke" style="--i:${n}"
      x1="${pts[e.a].xPct.toFixed(2)}" y1="${pts[e.a].yPct.toFixed(2)}"
      x2="${pts[e.b].xPct.toFixed(2)}" y2="${pts[e.b].yPct.toFixed(2)}"></line>`).join('')}
  </svg>
  <div class="cons-field">
    ${pts.map((p, i) => `
    <button class="cons-node node" data-node="${p.it.key}" aria-label="${esc(p.it.name)}"
            style="left:${p.xPct.toFixed(2)}%;top:${p.yPct.toFixed(2)}%;--lag:${(i * 0.44).toFixed(2)}s">
      <i class="cons-dot" aria-hidden="true"></i>
      ${mark(p.it, 'mk')}
    </button>`).join('')}
  </div>
</div>`;
};

/* -------------------------------------------------------------- 04 sonar --- */
const sonar = () => {
  const SWEEP = 14;                                    // seconds per revolution
  const wide = ITEMS.slice().sort((a, b) => size(b).w - size(a).w);
  const rings = [wide.slice(13, 18), wide.slice(7, 13), wide.slice(0, 7)];
  const R = [25, 36, 47];                              // % of the stage, from the centre
  const OFF = [0, 30, 15];                             // ring phase, degrees
  return `
<div class="son" data-scope="son">
  <div class="son-stage">
  <i class="son-grid" aria-hidden="true"></i>
  <i class="son-beam" aria-hidden="true" style="--sweep:${SWEEP}s"></i>
  <i class="son-ping p1" aria-hidden="true"></i><i class="son-ping p2" aria-hidden="true"></i>
  <div class="son-core"><img src="../images/logo.png" alt="MechanicDesk" width="34" height="35"></div>
  ${rings.map((ring, r) => ring.map((it, i) => {
    const a = (360 / ring.length) * i + OFF[r];
    const t = (a * Math.PI) / 180;
    const x = 50 + R[r] * Math.sin(t);
    const y = 50 - R[r] * Math.cos(t);
    const delay = (((a % 360) / 360) * SWEEP).toFixed(2);
    return `
  <button class="son-node node" data-node="${it.key}" aria-label="${esc(it.name)}"
          style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;--lit:${delay}s;--sweep:${SWEEP}s">
    ${mark(it, 'mk')}
  </button>`;
  }).join('')).join('')}
  </div>
</div>`;
};

const detail = (scope) => `<div class="detail" data-detail="${scope}"><div class="detail-inner"></div></div>`;

const VARIANTS = [
  { key: 'neb', n: '01', name: 'Nebula drift', build: nebula,
    line: 'No geometry at all. The marks hang in a drifting nebula, each breathing on its own slow cycle, and the whole field parallaxes with the cursor. The calmest and dreamiest of the four.' },
  { key: 'dep', n: '02', name: 'Depth of field', build: depth,
    line: 'Three depth planes: near marks are sharp and large, far ones small and softly out of focus, with bokeh lights drifting between them. The field sways in 3D and the near plane tracks your cursor faster than the far one.' },
  { key: 'cons', n: '03', name: 'Constellation', build: constellation,
    line: 'A star map. Every partner is joined to its nearest neighbours by a thread of light that keeps flowing; hovering one lights its own constellation. Still, quiet, premium.' },
  { key: 'son', n: '04', name: 'Sonar sweep', build: sonar,
    line: 'A radar beam turns once every 14 seconds and each mark ignites exactly as the beam reaches it, then fades back down. Nothing moves except the light.' },
  { key: 'brd', n: '05', name: 'Circuit board', build: board.html,
    line: 'The apps are wired to each other, not just to the middle. Two buses carry them, light runs the traces, and every partner in the same category is joined by its own link that lights up when you pick one. MechanicDesk is the chip at the centre.' }
];

const CSS = `
:root{
  --accent:#fca311;--cool:#4a7dff;--violet:#8b5cf6;
  --bg:#0b0d0f;--line:rgba(255,255,255,.07);--line-2:rgba(255,255,255,.13);
  --text:#eef1f3;--text-2:#b1bac2;--muted:#7c8792;
  --mono:'JetBrains Mono',ui-monospace,Menlo,monospace;
  --sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  --head:'Space Grotesk','Inter',sans-serif;
  --lift:drop-shadow(0 0 1.5px rgba(255,255,255,.95)) drop-shadow(0 0 4px rgba(255,255,255,.7))
    drop-shadow(0 0 10px rgba(255,255,255,.28));
  --lift-on:brightness(1.1) drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 5px rgba(255,255,255,.9))
    drop-shadow(0 0 14px rgba(252,163,17,.5));
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

header.top{padding:clamp(3rem,6vw,4.5rem) 0 clamp(1.75rem,3vw,2.5rem);position:relative;overflow:hidden}
header.top::after{content:'';position:absolute;top:-70%;right:-10%;width:60vw;height:150%;background:radial-gradient(circle,rgba(252,163,17,.12),transparent 62%);pointer-events:none}
.brandline{display:flex;align-items:center;gap:.7rem;margin-bottom:1.6rem}
.brandline img{width:34px}
.brandline strong{font-family:var(--head);font-size:1.1rem;color:var(--text)}
.brandline strong em{font-style:normal;color:var(--accent)}
.lede{margin-top:1rem;max-width:64ch;font-size:1.06rem}
.back{margin-top:1.4rem;display:inline-flex;align-items:center;gap:.5rem;font-size:.93rem;font-weight:600;color:var(--accent)}
.back svg{width:15px;height:15px}

.variant{padding:clamp(2.5rem,5vw,4rem) 0;border-top:1px solid var(--line)}
.v-head{display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;flex-wrap:wrap;margin-bottom:clamp(1.5rem,3vw,2.25rem)}
.v-title{display:flex;align-items:baseline;gap:.9rem}
.v-title span{font-family:var(--mono);font-size:.82rem;color:var(--accent);letter-spacing:.12em}
.v-line{max-width:56ch;font-size:.97rem;color:var(--muted)}

/* every mark: free-floating, own colours, area-normalised, no plate --------- */
.mk{display:block;height:var(--h,34px);width:auto;object-fit:contain;
  filter:brightness(1.12) saturate(1.04) drop-shadow(0 6px 14px rgba(0,0,0,.55));
  transition:transform .4s cubic-bezier(.34,1.4,.64,1),filter .4s ease}
.mk.is-text{font-family:var(--head);font-style:normal;font-weight:700;font-size:1rem;color:var(--text)}
.node{border:0;background:none;padding:0;color:inherit;position:absolute;transform:translate(-50%,-50%)}
.node:focus-visible{outline:2px solid var(--accent);outline-offset:6px;border-radius:6px}
.node:hover .mk,.node.on .mk{transform:scale(1.16);filter:brightness(1.3) saturate(1.12) drop-shadow(0 0 11px rgba(252,163,17,.45))}

/* the shared detail panel -------------------------------------------------- */
.detail{margin-top:clamp(1.5rem,3vw,2.5rem);min-height:150px}
.detail-inner{max-width:64ch;margin:0 auto;text-align:center;opacity:0;transform:translateY(8px);transition:opacity .35s ease,transform .35s ease}
.detail-inner.in{opacity:1;transform:none}
.detail-head{display:inline-flex;align-items:center;gap:.9rem;margin-bottom:.8rem;text-align:left}
.detail-mark{height:30px;width:auto;max-width:150px;object-fit:contain;filter:brightness(1.12)}
.detail p{font-size:.97rem;color:var(--text-2)}
.detail p+p{margin-top:.5rem}
.detail a{display:inline-flex;align-items:center;gap:.45rem;margin-top:.9rem;font-weight:600;color:var(--accent);font-size:.9rem}
.detail a svg{width:15px;height:15px}

/* ---------------------------------------------------------- 01 nebula ----- */
.neb{position:relative;width:100%;aspect-ratio:1180/560;min-height:420px;isolation:isolate;overflow:hidden;border-radius:20px}
.neb-cloud{position:absolute;border-radius:50%;filter:blur(80px);z-index:-1;pointer-events:none}
.neb-cloud.c1{width:52%;height:110%;left:2%;top:-24%;background:radial-gradient(circle,rgba(252,163,17,.46),transparent 64%);animation:cloud 34s ease-in-out infinite alternate}
.neb-cloud.c2{width:56%;height:120%;right:-4%;bottom:-30%;background:radial-gradient(circle,rgba(74,125,255,.42),transparent 64%);animation:cloud 44s ease-in-out infinite alternate-reverse}
.neb-cloud.c3{width:40%;height:90%;left:34%;top:6%;background:radial-gradient(circle,rgba(139,92,246,.34),transparent 66%);animation:cloud 54s ease-in-out infinite alternate}
@keyframes cloud{from{transform:translate3d(-5%,-4%,0) scale(1)}to{transform:translate3d(7%,6%,0) scale(1.2)}}
.neb-field{position:absolute;inset:0;transform:translate3d(calc(var(--px,0) * 1px),calc(var(--py,0) * 1px),0);transition:transform .5s cubic-bezier(.2,.7,.3,1)}
.neb-node{animation:bob var(--bob,11s) ease-in-out infinite alternate;animation-delay:calc(var(--lag,0s) * -1)}
.neb-node .mk{filter:brightness(1.14) saturate(1.05) drop-shadow(0 0 22px rgba(255,255,255,.1)) drop-shadow(0 8px 18px rgba(0,0,0,.6))}
@keyframes bob{from{transform:translate(-50%,-50%) translateY(-9px)}to{transform:translate(-50%,-50%) translateY(9px)}}

/* ----------------------------------------------------------- 02 depth ----- */
.dep{position:relative;width:100%;aspect-ratio:1180/540;min-height:400px;perspective:1400px;overflow:hidden;border-radius:20px}
.dep-bokeh{position:absolute;border-radius:50%;filter:blur(22px);pointer-events:none;opacity:.8}
.dep-bokeh.b1{width:120px;height:120px;left:12%;top:18%;background:radial-gradient(circle,rgba(252,163,17,.5),transparent 70%);animation:float 26s ease-in-out infinite alternate}
.dep-bokeh.b2{width:78px;height:78px;right:16%;top:26%;background:radial-gradient(circle,rgba(74,125,255,.45),transparent 70%);animation:float 34s ease-in-out infinite alternate-reverse}
.dep-bokeh.b3{width:150px;height:150px;left:38%;bottom:-6%;background:radial-gradient(circle,rgba(139,92,246,.35),transparent 70%);animation:float 44s ease-in-out infinite alternate}
.dep-bokeh.b4{width:60px;height:60px;right:34%;bottom:14%;background:radial-gradient(circle,rgba(255,255,255,.3),transparent 70%);animation:float 30s ease-in-out infinite alternate-reverse}
@keyframes float{from{transform:translate3d(-8%,-6%,0)}to{transform:translate3d(10%,8%,0)}}
.dep-stage{position:absolute;inset:0;transform-style:preserve-3d;animation:sway 26s ease-in-out infinite alternate}
@keyframes sway{from{transform:rotateY(-7deg) rotateX(2.5deg)}to{transform:rotateY(7deg) rotateX(-2.5deg)}}
.dep-node{transform:translate(-50%,-50%) translateZ(calc((1 - var(--d)) * 120px))}
.dep-node.t0 .mk{transform:scale(1.14);filter:brightness(1.16) saturate(1.06) drop-shadow(0 10px 22px rgba(0,0,0,.7))}
.dep-node.t1 .mk{filter:brightness(1.02) saturate(.98) blur(.6px) drop-shadow(0 8px 18px rgba(0,0,0,.6));opacity:.82}
.dep-node.t2 .mk{filter:brightness(.92) saturate(.9) blur(1.5px);opacity:.6;transform:scale(.86)}
.dep-node:hover .mk,.dep-node.on .mk{filter:brightness(1.3) saturate(1.14) drop-shadow(0 0 12px rgba(252,163,17,.45));opacity:1;transform:scale(1.14)}

/* --------------------------------------------------- 03 constellation ----- */
.cons{position:relative;width:100%;aspect-ratio:1180/560;min-height:420px;overflow:hidden;border-radius:20px}
.cons-stars{position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(1.4px 1.4px at 12% 24%,rgba(255,255,255,.5) 0 45%,transparent 60%),
    radial-gradient(1.2px 1.2px at 28% 68%,rgba(255,255,255,.4) 0 45%,transparent 60%),
    radial-gradient(1.8px 1.8px at 47% 16%,rgba(255,255,255,.55) 0 45%,transparent 60%),
    radial-gradient(1.3px 1.3px at 63% 78%,rgba(255,255,255,.45) 0 45%,transparent 60%),
    radial-gradient(2px 2px at 78% 34%,rgba(255,255,255,.6) 0 45%,transparent 60%),
    radial-gradient(1.4px 1.4px at 88% 62%,rgba(255,255,255,.4) 0 45%,transparent 60%),
    radial-gradient(1.2px 1.2px at 36% 42%,rgba(255,255,255,.35) 0 45%,transparent 60%),
    radial-gradient(1.6px 1.6px at 8% 82%,rgba(255,255,255,.45) 0 45%,transparent 60%),
    radial-gradient(1.3px 1.3px at 92% 12%,rgba(255,255,255,.4) 0 45%,transparent 60%);
  animation:twinkle 7s ease-in-out infinite alternate}
@keyframes twinkle{from{opacity:.45}to{opacity:1}}
.cons-wires{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.cw{stroke:rgba(255,255,255,.13);stroke-width:1;stroke-dasharray:3 7;
  animation:flow 4.5s linear infinite;animation-delay:calc(var(--i) * -.14s)}
@keyframes flow{to{stroke-dashoffset:-40}}
.cons-field{position:absolute;inset:0;transform:translate3d(calc(var(--px,0) * .6px),calc(var(--py,0) * .6px),0);transition:transform .6s cubic-bezier(.2,.7,.3,1)}
.cons-node .cons-dot{position:absolute;left:50%;top:-14px;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;
  background:var(--accent);box-shadow:0 0 10px rgba(252,163,17,.8);opacity:.55;
  animation:pulseDot 4.2s ease-in-out infinite;animation-delay:calc(var(--lag,0s) * -1)}
@keyframes pulseDot{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.25)}}
.cons:hover .cw{stroke:rgba(252,163,17,.28)}
.cons-node:hover .cons-dot,.cons-node.on .cons-dot{opacity:1;transform:scale(1.4)}

/* --------------------------------------------------------- 04 sonar ------- */
.son{position:relative;width:100%;aspect-ratio:1180/620;min-height:440px;border-radius:20px;display:grid;place-items:center}
.son-stage{position:relative;height:100%;aspect-ratio:1}
.son-grid{position:absolute;inset:0;pointer-events:none;opacity:.85;
  background-image:repeating-radial-gradient(circle at 50% 50%,transparent 0 11.5%,rgba(255,255,255,.055) 11.5% 11.7%),
    conic-gradient(from 0deg at 50% 50%,rgba(255,255,255,.05) 0 .3deg,transparent .3deg 30deg,
      rgba(255,255,255,.05) 30deg 30.3deg,transparent 30.3deg 60deg,
      rgba(255,255,255,.05) 60deg 60.3deg,transparent 60.3deg 90deg,
      rgba(255,255,255,.05) 90deg 90.3deg,transparent 90.3deg 120deg,
      rgba(255,255,255,.05) 120deg 120.3deg,transparent 120.3deg 150deg,
      rgba(255,255,255,.05) 150deg 150.3deg,transparent 150.3deg 180deg,
      rgba(255,255,255,.05) 180deg 180.3deg,transparent 180.3deg 210deg,
      rgba(255,255,255,.05) 210deg 210.3deg,transparent 210.3deg 240deg,
      rgba(255,255,255,.05) 240deg 240.3deg,transparent 240.3deg 270deg,
      rgba(255,255,255,.05) 270deg 270.3deg,transparent 270.3deg 300deg,
      rgba(255,255,255,.05) 300deg 300.3deg,transparent 300.3deg 330deg,
      rgba(255,255,255,.05) 330deg 330.3deg,transparent 330.3deg 360deg);
  mask-image:radial-gradient(circle closest-side at 50% 50%,#000 22%,#000 88%,transparent 99%);
  -webkit-mask-image:radial-gradient(circle closest-side at 50% 50%,#000 22%,#000 88%,transparent 99%)}
.son-beam{position:absolute;left:50%;top:50%;width:100%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;
  background:conic-gradient(from 0deg,rgba(252,163,17,.3),rgba(252,163,17,.1) 5%,rgba(252,163,17,.02) 13%,transparent 20%,transparent 100%);
  animation:spin var(--sweep,14s) linear infinite;
  mask-image:radial-gradient(circle closest-side,transparent 9%,#000 15%,#000 90%,transparent 100%);
  -webkit-mask-image:radial-gradient(circle closest-side,transparent 9%,#000 15%,#000 90%,transparent 100%)}
@keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
.son-ping{position:absolute;left:50%;top:50%;width:14%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;
  border:1px solid rgba(252,163,17,.45);animation:ping 7s ease-out infinite}
.son-ping.p2{animation-delay:3.5s}
@keyframes ping{0%{transform:translate(-50%,-50%) scale(.6);opacity:.8}80%{transform:translate(-50%,-50%) scale(5);opacity:0}100%{opacity:0}}
.son-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:70px;aspect-ratio:1;border-radius:50%;
  display:grid;place-items:center;background:radial-gradient(circle at 40% 34%,#1c2126,#0d1013);
  box-shadow:0 0 0 1px var(--line-2),0 0 60px -8px rgba(252,163,17,.5)}
.son-core img{width:34px}
.son-node .mk{opacity:.34;filter:brightness(.9) saturate(.85);
  animation:ignite var(--sweep,14s) linear infinite;animation-delay:calc(var(--lit,0s) * -1)}
@keyframes ignite{
  0%{opacity:1;filter:brightness(1.35) saturate(1.15) drop-shadow(0 0 18px rgba(252,163,17,.55))}
  14%{opacity:.62;filter:brightness(1.05) saturate(1)}
  40%,100%{opacity:.34;filter:brightness(.9) saturate(.85)}
}
.son-node:hover .mk,.son-node.on .mk{animation:none;opacity:1;
  filter:brightness(1.3) saturate(1.12) drop-shadow(0 0 12px rgba(252,163,17,.45))}

footer{border-top:1px solid var(--line);padding:1.75rem 0 3.5rem;font-family:var(--mono);font-size:.76rem;letter-spacing:.05em;color:var(--muted)}

/* Marks whose own ink is near-black. A white light traced around the letterforms
   (drop-shadow reads the alpha channel, so it hugs the shapes rather than making
   a box) — no plate, no colour shift, just readable. */
.node .mk.lift,.brd-node .mk.lift,.neb-node .mk.lift,.dep-node .mk.lift,.cons-node .mk.lift{filter:var(--lift)}
.node:hover .mk.lift,.node.on .mk.lift{filter:var(--lift-on)}
.son-node .mk.lift{animation-name:ignite-lift}
@keyframes ignite-lift{
  0%{opacity:1;filter:var(--lift-on)}
  14%{opacity:.78;filter:var(--lift)}
  40%,100%{opacity:.52;filter:var(--lift)}
}

@media (max-width:900px){
  .neb,.dep,.cons{aspect-ratio:1/1.15;min-height:520px}
  .son{aspect-ratio:1/1.05;min-height:480px}
  .son-stage{height:auto;width:100%}
  .mk{height:calc(var(--h,34px) * .74)}
}
@media (prefers-reduced-motion:reduce){
  .neb-cloud,.neb-node,.dep-stage,.dep-bokeh,.cons-stars,.cw,.cons-node .cons-dot,
  .son-beam,.son-ping,.son-node .mk{animation:none!important}
  .son-node .mk{opacity:1}
}
`;

const JS = `
const DATA = __DATA__;
const ARROW = '__ARROW__';

function fill(scope, key) {
  const wrap = document.querySelector('[data-detail="' + scope + '"] .detail-inner');
  const it = DATA[key];
  if (!wrap || !it) return;
  wrap.classList.remove('in');
  setTimeout(function () {
    wrap.innerHTML =
      '<div class="detail-head">' +
        (it.file ? '<img class="detail-mark" src="../images/logos-alpha/' + it.file + '" alt="">' : '') +
        '<span><span class="eyebrow">' + it.cat + '</span><h3>' + it.name + '</h3></span>' +
      '</div>' +
      it.lines.map(function (l) { return '<p>' + l + '</p>'; }).join('') +
      (it.url ? '<a href="' + it.url + '" target="_blank" rel="noopener">' +
        it.url.replace(/^https?:\\/\\//, '').replace(/\\/$/, '') + ARROW + '</a>' : '');
    requestAnimationFrame(function () { wrap.classList.add('in'); });
  }, 110);
}

document.querySelectorAll('[data-scope]').forEach(function (scope) {
  const name = scope.getAttribute('data-scope');
  const nodes = Array.prototype.slice.call(scope.querySelectorAll('[data-node]'));
  nodes.forEach(function (n) {
    n.addEventListener('click', function () {
      nodes.forEach(function (o) { o.classList.toggle('on', o === n); });
      const cat = n.getAttribute('data-cat');
      scope.querySelectorAll('[data-chord]').forEach(function (c) {
        c.classList.toggle('lit', !!cat && c.getAttribute('data-chord') === cat);
      });
      fill(name, n.getAttribute('data-node'));
    });
  });
  if (nodes.length) nodes[0].click();
});

/* cursor parallax for the fields that ask for it */
document.querySelectorAll('[data-parallax]').forEach(function (el) {
  el.addEventListener('pointermove', function (e) {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width - 0.5) * -34).toFixed(1));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height - 0.5) * -22).toFixed(1));
  });
  el.addEventListener('pointerleave', function () {
    el.style.setProperty('--px', 0); el.style.setProperty('--py', 0);
  });
});
`;

module.exports = () => {
  const data = {};
  ITEMS.forEach((it) => {
    data[it.key] = {
      name: it.name, cat: it.cat, lines: it.lines, url: it.url,
      file: it.file ? String(it.file).replace(/\.jpe?g$/i, '.png') : ''
    };
  });
  const js = JS.replace('__DATA__', JSON.stringify(data)).replace('__ARROW__', icons.arrow.replace(/"/g, '\\"'));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Integrations — four dreamier directions</title>
<meta name="robots" content="noindex">
<link rel="icon" type="image/png" href="../images/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${CSS}${board.css}</style>
</head>
<body>
<header class="top">
  <div class="wrap">
    <div class="brandline">
      <img src="../images/logo.png" alt="MechanicDesk logo" width="34" height="35">
      <strong>Mechanic<em>Desk</em></strong>
    </div>
    <p class="eyebrow">Integrations · four dreamier directions</p>
    <h1>Past the solar system.</h1>
    <p class="lede">Same rules as the orbit — all eighteen partners on screen, no plates, no rings,
      original colours, every mark normalised to the same optical area, click to read one. What
      changes is what the light does. Pick one and it replaces the orbit on the site.</p>
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
  <div class="wrap">Demo · the orbit stays on the site until one of these is chosen</div>
</footer>
<script>${js}</script>
</body>
</html>`;
};
