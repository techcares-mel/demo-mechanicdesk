/* Concept chooser — MechanicDesk/index.html
   Side-by-side entry point for the three redesign concepts, with live
   (scaled iframe) previews so they can be compared before opening. */

const CONCEPTS = [
  {
    key: 'v1',
    n: '01',
    name: 'Blueprint',
    tagline: 'Light · technical',
    en: 'A light engineering document: hairline grid, monospace spec labels, dimension lines, and pricing as a comparison table.',
    vi: 'Sáng, kỹ thuật, kiểu bản vẽ. Cam chỉ dùng làm màu tín hiệu.',
    traits: ['Archivo + Inter + IBM Plex Mono', 'Dimension lines, hex-bolt marks', 'Pricing as a spec table'],
    swatches: ['#e07b05', '#fbfaf8', '#14171b', '#e4e2db'],
    best: 'Reads most “engineering company”.'
  },
  {
    key: 'v2',
    n: '02',
    name: 'Graphite',
    tagline: 'Dark · industrial',
    en: 'Graphite dark with orange as a signal light: hazard tape, carbon weave, a tyre-tread footer edge and a workshop photo band.',
    vi: 'Tối kiểu graphite, cam làm đèn tín hiệu. Nhiều chi tiết xưởng nhất.',
    traits: ['Space Grotesk + Inter + JetBrains Mono', 'Hazard tape, carbon weave, tread edge', 'Module chips + spec plate'],
    swatches: ['#fca311', '#0b0d0f', '#171c21', '#eef1f3'],
    best: 'Most premium, most workshop.'
  },
  {
    key: 'v3',
    n: '03',
    name: 'Torque',
    tagline: 'Warm light · bold',
    en: 'Warm cream with bold display type, a large orange panel behind the product tour, and real workshop photography leading.',
    vi: 'Nền kem ấm, chữ to đậm, ảnh xưởng thật làm chủ đạo.',
    traits: ['Plus Jakarta Sans + Inter', 'Workshop photography, tread strip', 'Modules open one at a time'],
    swatches: ['#f5860f', '#fffbf5', '#16130f', '#fdf3e6'],
    best: 'Warmest, most conversion-forward.'
  }
];

const NOTES = [
  ['The product tour', 'All three heroes run the same ten screens of the real app inside a macOS window — diary, job card, check sheet, timesheets, invoice, tax invoice, inventory, reports — with the real mobile app on an iPhone in front. Frames come from MechanicDesk’s own tutorials and App Store listing.'],
  ['Content', 'Every feature bullet, integration, price, phone number and policy link from the live site is kept — but nothing long is printed by default. Detail sits behind click-to-open blocks.'],
  ['Automotive character', 'Automotive iconography, a workshop photo band, and per-concept cues: dimension lines and bolt marks, hazard tape and carbon weave, or workshop photography and a tread strip.'],
  ['Photography', 'The old cut-out category images and both stock blog covers were replaced with licensed Pexels photography. Real brand assets — the logo, 17 partner logos, 3 customer logos — are untouched.']
];

const CSS = `
:root{
  --accent:#fca311;--bg:#0c0e11;--surface:#14181d;--card:#171c22;
  --line:rgba(255,255,255,.09);--line2:rgba(255,255,255,.16);
  --text:#eef1f4;--text2:#c2cad2;--muted:#8b959f;
  --sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  --head:'Space Grotesk','Inter',sans-serif;
  --mono:'JetBrains Mono',ui-monospace,Menlo,monospace;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text2);font-family:var(--sans);font-size:1rem;line-height:1.65;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3{font-family:var(--head);color:var(--text);margin:0;letter-spacing:-.03em;font-weight:700}
h1{font-size:clamp(2.1rem,4.2vw,3.2rem);line-height:1.05}
h2{font-size:1.4rem}
p{margin:0}
ul{margin:0;padding:0;list-style:none}
.wrap{max-width:1280px;margin:0 auto;padding:0 clamp(1.25rem,4vw,2.5rem)}
.mono{font-family:var(--mono);font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}

header.top{padding:clamp(2.5rem,6vw,4.5rem) 0 clamp(2rem,4vw,3rem);border-bottom:1px solid var(--line);position:relative;overflow:hidden}
header.top::after{content:'';position:absolute;top:-60%;right:-10%;width:60vw;height:120%;background:radial-gradient(circle,rgba(252,163,17,.12),transparent 65%);pointer-events:none}
.brandline{display:flex;align-items:center;gap:.7rem;margin-bottom:2rem}
.brandline img{width:38px}
.brandline strong{font-family:var(--head);font-size:1.2rem;color:var(--text);letter-spacing:-.02em}
.brandline strong em{font-style:normal;color:var(--accent)}
.lede{margin-top:1.2rem;max-width:60ch;font-size:1.12rem}
.meta{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.8rem}
.meta span{border:1px solid var(--line2);border-radius:999px;padding:.45rem 1rem;font-size:.88rem;color:var(--text2)}
.meta a{color:var(--accent)}

.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;padding:clamp(2.5rem,5vw,4rem) 0}
.concept{background:var(--card);border:1px solid var(--line);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;transition:border-color .25s ease,transform .25s ease}
.concept:hover{border-color:rgba(252,163,17,.4);transform:translateY(-4px)}
.thumb{position:relative;width:100%;aspect-ratio:16/11;overflow:hidden;background:#0f1216;border-bottom:1px solid var(--line)}
.thumb iframe{position:absolute;top:0;left:0;width:1440px;height:990px;border:0;transform-origin:0 0;pointer-events:none}
.thumb .shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(12,14,17,.55));pointer-events:none}
.thumb .badge{position:absolute;top:.8rem;left:.9rem;background:rgba(12,14,17,.78);backdrop-filter:blur(6px);border:1px solid var(--line2);border-radius:999px;padding:.3rem .75rem;font-family:var(--mono);font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text)}
.body{padding:1.6rem 1.5rem 1.75rem;display:flex;flex-direction:column;gap:.85rem;flex:1}
.title-row{display:flex;align-items:baseline;justify-content:space-between;gap:1rem}
.tagline{font-size:.9rem;color:var(--accent);font-weight:500;white-space:nowrap}
.en{font-size:.98rem;color:var(--text2)}
.vi{font-size:.92rem;color:var(--muted);border-left:2px solid var(--line2);padding-left:.75rem}
.traits{display:grid;gap:.45rem;margin-top:.15rem}
.traits li{display:grid;grid-template-columns:14px 1fr;gap:.6rem;font-size:.9rem;color:var(--muted)}
.traits li::before{content:'';width:5px;height:5px;margin-top:.6rem;border-radius:50%;background:var(--accent)}
.best{font-size:.92rem;color:var(--text);border-left:2px solid var(--accent);padding-left:.85rem}
.sw{display:flex;gap:.4rem}
.sw i{width:26px;height:26px;border-radius:8px;border:1px solid var(--line2);display:block}
.open{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;background:var(--accent);color:#17130a;font-family:var(--head);font-weight:700;font-size:.98rem;padding:.9rem 1.2rem;border-radius:999px;transition:all .2s ease}
.open:hover{background:#ffb43a}

.notes{border-top:1px solid var(--line);padding:clamp(2rem,4vw,3rem) 0 4rem}
.notes h2{margin-bottom:1.25rem}
.notes-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}
.note{border:1px solid var(--line);border-radius:14px;padding:1.5rem}
.note p{font-size:.96rem;color:var(--muted);margin-top:.55rem}
footer{border-top:1px solid var(--line);padding:1.5rem 0 3rem;font-family:var(--mono);font-size:.76rem;letter-spacing:.06em;color:var(--muted)}
@media(max-width:1024px){.grid{grid-template-columns:1fr;gap:1.5rem}.notes-grid{grid-template-columns:1fr}.thumb{aspect-ratio:16/9}}
`;

const JS = `
(function(){
  var frames = document.querySelectorAll('.thumb');
  var fit = function(){
    frames.forEach(function(t){
      var f = t.querySelector('iframe');
      if (!f) return;
      var s = t.clientWidth / 1440;
      f.style.transform = 'scale(' + s + ')';
      f.style.height = (t.clientHeight / s) + 'px';
    });
  };
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  fit();
})();
`;

module.exports = () => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MechanicDesk — 3 redesign concepts</title>
<meta name="description" content="Three minimalistic redesign concepts for mechanicdesk.com.au. Same content, three design directions.">
<meta name="robots" content="noindex">
<link rel="icon" type="image/png" href="images/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
<header class="top">
  <div class="wrap">
    <div class="brandline">
      <img src="images/logo.png" alt="MechanicDesk logo" width="38" height="39">
      <strong>Mechanic<em>Desk</em></strong>
    </div>
    <p class="mono">Website redesign · 3 concepts · demo build</p>
    <h1>Same content, three<br>design directions.</h1>
    <p class="lede">All of the content from mechanicdesk.com.au, kept — only the design system
      changes. Pick one and it becomes the production design.</p>
    <div class="meta">
      <span>Reference: <a href="https://www.mechanicdesk.com.au/" target="_blank" rel="noopener">mechanicdesk.com.au</a></span>
      <span>Content parity: 100%</span>
      <span>HTML + CSS + vanilla JS</span>
    </div>
  </div>
</header>

<main class="wrap">
  <section class="grid">
    ${CONCEPTS.map((c) => `
    <article class="concept">
      <div class="thumb">
        <iframe src="${c.key}/index.html" title="${c.name} concept preview" loading="lazy" scrolling="no" tabindex="-1"></iframe>
        <div class="shade"></div>
        <span class="badge">${c.n} · ${c.name}</span>
      </div>
      <div class="body">
        <div class="title-row">
          <h2>${c.name}</h2>
          <span class="tagline">${c.tagline}</span>
        </div>
        <div class="sw">${c.swatches.map((s) => `<i style="background:${s}"></i>`).join('')}</div>
        <p class="en">${c.en}</p>
        <p class="vi">${c.vi}</p>
        <ul class="traits">${c.traits.map((t) => `<li><span>${t}</span></li>`).join('')}</ul>
        <p class="best">${c.best}</p>
        <a class="open" href="${c.key}/index.html">Open ${c.name} &rarr;</a>
      </div>
    </article>`).join('')}
  </section>

  <section class="notes">
    <h2>Identical across all three</h2>
    <div class="notes-grid">
      ${NOTES.map(([t, p]) => `
      <div class="note">
        <p class="mono">${t}</p>
        <p>${p}</p>
      </div>`).join('')}
    </div>
  </section>
</main>

<footer>
  <div class="wrap">Demo build for review · content © MechanicDesk / Autodeck Pty. Ltd. · not a live production site</div>
</footer>
<script>${JS}</script>
</body>
</html>`;
