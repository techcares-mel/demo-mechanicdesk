/* =========================================================================
   INTEGRATIONS — 05 "Circuit board"
   The apps are wired to each other, with the MechanicDesk mark still at the
   centre.

   Structure, and it is a real structure rather than decoration:
     · centre        the MechanicDesk chip
     · 4 spokes      chip -> inner bus
     · inner bus     a rounded-rect trace carrying Accounting, EFTPOS and
                     Vehicle Lookup (8 marks)
     · 4 vias        rounded-elbow bridges, inner bus -> outer bus
     · outer bus     the Supplier network + MailChimp + AMS (10 marks)
     · chords        direct app-to-app links inside a category, lit when one
                     of its members is selected

   Everything sits on one loop, so every app is genuinely connected to every
   other one and to the centre. Light travels the traces; nothing rotates.
   ========================================================================= */
const { esc, slug, C, alphaLogo, markSize, markLift } = require('./shared.cjs');

const VB = { W: 1200, H: 660 };
const HUB = { x: 600, y: 330 };
const IN = { x: 270, y: 150, w: 660, h: 360, r: 90 };      /* 270..930 / 150..510 */
const OUT = { x: 70, y: 56, w: 1060, h: 548, r: 140 };     /*  70..1130 /  56..604 */

const AREA = 2400;
const BOOST = { 'ams_rewards.png': 1.7 };
const size = (it) => it.file
  ? markSize(it.file, AREA * (BOOST[it.file] || 1), 20, 66)
  : { w: 76, h: 22 };

/* ---------------------------------------------------------------- geometry */
const rr = (b) => {
  const { x, y, w, h, r } = b;
  return `M ${x + r} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r}` +
    ` V ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}` +
    ` H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + h - r}` +
    ` V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
};
const rrLen = (b) => 2 * (b.w - 2 * b.r) + 2 * (b.h - 2 * b.r) + 2 * Math.PI * b.r;

/* corner-arc midpoint of a rounded rect: q 0=TL 1=TR 2=BR 3=BL */
const corner = (b, q) => {
  const c = [
    [b.x + b.r, b.y + b.r], [b.x + b.w - b.r, b.y + b.r],
    [b.x + b.w - b.r, b.y + b.h - b.r], [b.x + b.r, b.y + b.h - b.r]
  ][q];
  const a = [225, 315, 45, 135][q] * Math.PI / 180;
  return [c[0] + b.r * Math.cos(a), c[1] + b.r * Math.sin(a)];
};

/* rounded-elbow via: out horizontally from the inner bus, then vertically
   into the outer bus — the shape the client's reference image is built on */
const elbow = (from, to, cr) => {
  const sx = Math.sign(to[0] - from[0]);
  const sy = Math.sign(to[1] - from[1]);
  const yStart = from[1];
  const hx = to[0] - sx * cr;
  const vy = yStart + sy * cr;
  return {
    d: `M ${from[0].toFixed(1)} ${yStart.toFixed(1)} L ${hx.toFixed(1)} ${yStart.toFixed(1)}` +
       ` Q ${to[0].toFixed(1)} ${yStart.toFixed(1)} ${to[0].toFixed(1)} ${vy.toFixed(1)}` +
       ` L ${to[0].toFixed(1)} ${to[1].toFixed(1)}`,
    len: Math.abs(hx - from[0]) + (Math.PI * cr) / 2 + Math.abs(to[1] - vy)
  };
};

/* app-to-app chord: a shallow arc bowing towards the centre */
const chord = (a, b, bow) => {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const cx = mx + (HUB.x - mx) * bow;
  const cy = my + (HUB.y - my) * bow;
  return `M ${a[0]} ${a[1]} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b[0]} ${b[1]}`;
};

/* ------------------------------------------------------------------- slots */
/* Inner bus, clockwise from the top-left; then the outer bus the same way.
   Widest marks sit on the horizontal runs, where there is room for them. */
const SLOT_IN = [
  [460, IN.y], [740, IN.y],
  [IN.x + IN.w, 272], [IN.x + IN.w, 388],
  [740, IN.y + IN.h], [460, IN.y + IN.h],
  [IN.x, 388], [IN.x, 272]
];
const SLOT_OUT = [
  [330, OUT.y], [600, OUT.y], [870, OUT.y],
  [OUT.x + OUT.w, 250], [OUT.x + OUT.w, 410],
  [870, OUT.y + OUT.h], [600, OUT.y + OUT.h], [330, OUT.y + OUT.h],
  [OUT.x, 410], [OUT.x, 250]
];

const byName = {};
C.integrations.categories.forEach((g) => g.items.forEach((it) => {
  byName[it.name] = {
    key: slug(it.name), name: it.name, cat: g.name, catKey: slug(g.name), file: it.file
  };
}));
const pick = (n) => {
  if (!byName[n]) throw new Error('circuit board: unknown integration "' + n + '"');
  return byName[n];
};

/* Categories stay contiguous on their bus, so the chords are short and the
   grouping reads without a legend. */
const RING_IN = ['Intuit QuickBooks', 'MYOB', 'Xero', 'Till Payments', 'Windcave',
  'Australian Vehicle Lookup', 'CarJam (New Zealand only)',
  'MyCarCheck (United Kingdom only)'].map(pick);
const RING_OUT = ['MailChimp', 'AMS Rewards (Australia only)', 'Repco Navigator Pro', 'BNT',
  'hsy', 'Autolign', 'NAPA PROLink', 'Burson EzyParts', 'Autopro', 'Auto One'].map(pick);

const AT = {};
RING_IN.forEach((it, i) => { AT[it.name] = SLOT_IN[i]; });
RING_OUT.forEach((it, i) => { AT[it.name] = SLOT_OUT[i]; });

/* every same-category pair that is adjacent on its bus */
const CHORDS = [];
[RING_IN, RING_OUT].forEach((ring) => ring.forEach((it, i) => {
  const next = ring[(i + 1) % ring.length];
  if (next.catKey === it.catKey) CHORDS.push({ cat: it.catKey, a: AT[it.name], b: AT[next.name] });
}));

const mark = (it) => it.file
  ? `<img class="mk${markLift(it.file) ? ' lift' : ''}" src="../${alphaLogo(it.file)}"
       alt="" loading="lazy" style="--h:${size(it).h}px">`
  : `<em class="mk is-text">${esc(it.name.split(' ')[0])}</em>`;

const node = (it, i, tier) => {
  const p = AT[it.name];
  return `
    <button class="brd-node node ${tier}" data-node="${it.key}" data-cat="${it.catKey}"
            aria-label="${esc(it.name)}"
            style="left:${((p[0] / VB.W) * 100).toFixed(3)}%;top:${((p[1] / VB.H) * 100).toFixed(3)}%;--lag:${(i * 0.5).toFixed(2)}s">
      ${mark(it)}
    </button>`;
};

module.exports.html = () => {
  const spokes = [
    { d: `M ${HUB.x} ${HUB.y} V ${IN.y}`, len: HUB.y - IN.y },
    { d: `M ${HUB.x} ${HUB.y} V ${IN.y + IN.h}`, len: IN.y + IN.h - HUB.y },
    { d: `M ${HUB.x} ${HUB.y} H ${IN.x}`, len: HUB.x - IN.x },
    { d: `M ${HUB.x} ${HUB.y} H ${IN.x + IN.w}`, len: IN.x + IN.w - HUB.x }
  ];
  const vias = [0, 1, 2, 3].map((q) => elbow(corner(IN, q), corner(OUT, q), 40));

  return `
<div class="brd-scroll">
<div class="brd" data-scope="brd">
  <i class="brd-dots" aria-hidden="true"></i>
  <svg class="brd-wires" viewBox="0 0 ${VB.W} ${VB.H}" aria-hidden="true">
    ${CHORDS.map((c) => `<path class="chord" data-chord="${c.cat}" d="${chord(c.a, c.b, 0.14)}"
      vector-effect="non-scaling-stroke" fill="none"></path>`).join('')}

    <path class="bus" d="${rr(OUT)}" vector-effect="non-scaling-stroke" fill="none"></path>
    <path class="bus" d="${rr(IN)}" vector-effect="non-scaling-stroke" fill="none"></path>

    ${spokes.map((s, i) => `<path class="spoke" d="${s.d}" vector-effect="non-scaling-stroke" fill="none"></path>
    <path class="pulse p-spoke" d="${s.d}" vector-effect="non-scaling-stroke" fill="none"
      style="--len:${s.len.toFixed(0)}px;--t:2.4s;--lag:${(i * 0.6).toFixed(2)}s"></path>`).join('')}

    ${vias.map((v, i) => `<path class="via" d="${v.d}" vector-effect="non-scaling-stroke" fill="none"></path>
    <path class="pulse p-via" d="${v.d}" vector-effect="non-scaling-stroke" fill="none"
      style="--len:${v.len.toFixed(0)}px;--t:3.4s;--lag:${(i * 0.85 + 1.2).toFixed(2)}s"></path>`).join('')}

    <path class="pulse p-in" d="${rr(IN)}" vector-effect="non-scaling-stroke" fill="none"
      style="--len:${rrLen(IN).toFixed(0)}px;--t:9s"></path>
    <path class="pulse p-in" d="${rr(IN)}" vector-effect="non-scaling-stroke" fill="none"
      style="--len:${rrLen(IN).toFixed(0)}px;--t:9s;--lag:4.5s"></path>
    <path class="pulse p-out" d="${rr(OUT)}" vector-effect="non-scaling-stroke" fill="none"
      style="--len:${rrLen(OUT).toFixed(0)}px;--t:14s"></path>
    <path class="pulse p-out" d="${rr(OUT)}" vector-effect="non-scaling-stroke" fill="none"
      style="--len:${rrLen(OUT).toFixed(0)}px;--t:14s;--lag:7s"></path>
  </svg>

  <div class="brd-hub">
    <i class="brd-halo" aria-hidden="true"></i>
    <i class="brd-ping" aria-hidden="true"></i>
    <div class="brd-chip"><img src="../images/logo.png" alt="MechanicDesk" width="36" height="37"></div>
    <span class="brd-chip-label">MechanicDesk</span>
  </div>

  ${RING_IN.map((it, i) => node(it, i, 'in')).join('')}
  ${RING_OUT.map((it, i) => node(it, i, 'out')).join('')}
</div>
</div>`;
};

module.exports.css = `
.brd-scroll{overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch}
.brd{position:relative;width:100%;min-width:860px;aspect-ratio:${VB.W}/${VB.H};border-radius:20px;overflow:hidden;isolation:isolate}
.brd-dots{position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(circle,rgba(255,255,255,.115) 1px,transparent 1.4px);
  background-size:34px 34px;
  mask-image:radial-gradient(ellipse 74% 74% at 50% 50%,#000 26%,transparent 82%);
  -webkit-mask-image:radial-gradient(ellipse 74% 74% at 50% 50%,#000 26%,transparent 82%)}
.brd::after{content:'';position:absolute;left:50%;top:50%;width:58%;aspect-ratio:1.5;transform:translate(-50%,-50%);
  background:radial-gradient(ellipse,rgba(252,163,17,.13),transparent 66%);pointer-events:none;z-index:-1}
/* the wires are a full-size transparent overlay: without this they would
   compete with the marks for clicks */
.brd-wires{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.bus{stroke:rgba(255,255,255,.13);stroke-width:1.5}
.spoke{stroke:rgba(255,255,255,.12);stroke-width:1.5}
.via{stroke:rgba(139,92,246,.3);stroke-width:1.5}
.chord{stroke:rgba(255,255,255,.055);stroke-width:1;stroke-dasharray:2 6;transition:stroke .45s ease}
.chord.lit{stroke:rgba(252,163,17,.65);stroke-dasharray:none;filter:drop-shadow(0 0 5px rgba(252,163,17,.6))}
.pulse{stroke-width:2.5;stroke-linecap:round;stroke-dasharray:64 9999;stroke-dashoffset:0;
  animation:run var(--t,9s) linear infinite;animation-delay:calc(var(--lag,0s) * -1)}
@keyframes run{to{stroke-dashoffset:calc((var(--len) + 64px) * -1)}}
.p-in{stroke:var(--accent);filter:drop-shadow(0 0 7px rgba(252,163,17,.85))}
.p-out{stroke:var(--cool);filter:drop-shadow(0 0 8px rgba(74,125,255,.85))}
.p-spoke{stroke:#fff;stroke-dasharray:30 9999;filter:drop-shadow(0 0 6px rgba(255,255,255,.8))}
.p-via{stroke:var(--violet);stroke-dasharray:38 9999;filter:drop-shadow(0 0 7px rgba(139,92,246,.9))}

.brd-hub{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:grid;justify-items:center;gap:.5rem}
.brd-chip{width:76px;height:76px;border-radius:22px;display:grid;place-items:center;position:relative;z-index:2;
  background:linear-gradient(160deg,#1b2026,#0c0f12);box-shadow:0 0 0 1px rgba(255,255,255,.14),0 18px 40px rgba(0,0,0,.6)}
.brd-chip img{width:36px}
.brd-chip-label{font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--text);
  background:rgba(11,13,15,.75);padding:.2rem .55rem;border-radius:999px;z-index:2}
.brd-halo{position:absolute;left:50%;top:0;width:190px;aspect-ratio:1;transform:translate(-50%,-57px);border-radius:50%;
  background:conic-gradient(from 0deg,transparent 0 62%,rgba(252,163,17,.5) 78%,transparent 88%);
  filter:blur(9px);animation:hubspin 7s linear infinite}
@keyframes hubspin{to{transform:translate(-50%,-57px) rotate(360deg)}}
.brd-ping{position:absolute;left:50%;top:38px;width:76px;aspect-ratio:1;margin:-38px 0 0 -38px;border-radius:24px;
  border:1px solid rgba(252,163,17,.5);animation:chipping 3.6s ease-out infinite}
@keyframes chipping{0%{transform:scale(1);opacity:.85}70%{transform:scale(2.5);opacity:0}100%{opacity:0}}

.brd-node{z-index:3}
.brd-node .mk{animation:breathe 6.5s ease-in-out infinite;animation-delay:calc(var(--lag,0s) * -1);
  filter:brightness(1.14) saturate(1.05) drop-shadow(0 0 9px #0b0d0f) drop-shadow(0 0 5px #0b0d0f) drop-shadow(0 8px 16px rgba(0,0,0,.7))}
@keyframes breathe{0%,100%{opacity:.86}50%{opacity:1}}
.brd-node:hover .mk,.brd-node.on .mk{animation:none;opacity:1;transform:scale(1.15);
  filter:brightness(1.32) saturate(1.14) drop-shadow(0 0 9px #0b0d0f) drop-shadow(0 0 12px rgba(252,163,17,.5))}

@media (prefers-reduced-motion:reduce){
  .pulse,.brd-halo,.brd-ping,.brd-node .mk{animation:none!important}
}
`;
