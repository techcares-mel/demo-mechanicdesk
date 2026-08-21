/* =========================================================================
   MECHANICDESK — "GRAPHITE" (the chosen design, rendered as the site root)
   Dark, precision-engineered. Graphite surfaces, orange as a signal light.
   Automotive cues: hazard tape, carbon weave, tyre-tread edge, spec plates.
   Few borders, few boxes; long copy sits behind click-to-open blocks.
   ========================================================================= */
const S = require('./shared.cjs');
const { esc, ico, icons, C, slug, alphaLogo, markHeight, markSize } = S;

const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">';

const n2 = (i) => String(i + 1).padStart(2, '0');

const secHead = (label, title, sub, extra, mod) => `
<div class="sec-head${mod ? ' ' + mod : ''} reveal">
  <span class="eyebrow">${esc(label)}</span>
  <h2>${title}</h2>
  ${sub ? `<p class="sec-sub">${esc(sub)}</p>` : ''}
  ${extra || ''}
</div>`;

const tape = () => '<div class="tape" aria-hidden="true"></div>';


/* ---------------------------------------------------------- starfield ---- */
/* Three layers of stars behind the orbit, generated at build time from a
   seeded PRNG (so the field is identical on every build) and painted as one
   background-image per layer — 90 stars, three DOM nodes. The middle of the
   field is kept clear so nothing crowds the core. */
const starfield = () => {
  let seed = 20260821;
  const rnd = () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const layer = (n, size, alpha) => {
    const out = [];
    while (out.length < n) {
      const x = rnd() * 100, y = rnd() * 100;
      const dx = (x - 50) / 50, dy = (y - 50) / 50;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 0.2 || d > 1.12) continue;                 // clear of the core, inside the field
      const a = (alpha * (0.55 + rnd() * 0.45)).toFixed(2);
      out.push(`radial-gradient(${size}px ${size}px at ${x.toFixed(2)}% ${y.toFixed(2)}%, rgba(255,255,255,${a}) 0 45%, transparent 60%)`);
    }
    return out.join(',');
  };
  const css = [
    '.orb-stars.s1{background-image:' + layer(78, 1.5, 0.55) + '}',
    '.orb-stars.s2{background-image:' + layer(38, 2.1, 0.85) + '}',
    '.orb-stars.s3{background-image:' + layer(16, 2.8, 1) + '}'
  ].join('\n');
  const html = '<i class="orb-stars s1"></i><i class="orb-stars s2"></i><i class="orb-stars s3"></i>';
  return { css, html };
};
const STARS = starfield();

/* ---------------------------------------------------------------- nav ---- */
const navBar = () => `
<header class="nav" data-nav>
  <div class="nav-inner">
    <a class="brand" href="#home">
      <img src="images/logo.png" alt="MechanicDesk logo" width="34" height="35">
      <span class="brand-name">Mechanic<em>Desk</em></span>
    </a>
    <nav class="nav-links" aria-label="Main">
      ${C.nav.map((i) => `<a href="${i.href}" data-navlink>${esc(i.label)}</a>`).join('')}
    </nav>
    <div class="nav-actions">
      <a class="nav-login" href="${C.brand.login.url}">${esc(C.brand.login.label)}</a>
      <a class="btn btn-primary btn-sm" href="${C.brand.signup.url}">${esc(C.brand.signup.label)}</a>
      <button class="burger" data-menu-open aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="drawer" data-menu>
  <button class="drawer-close" data-menu-close aria-label="Close menu">&times;</button>
  <nav aria-label="Mobile">
    ${C.nav.map((i) => `<a href="${i.href}">${esc(i.label)}</a>`).join('')}
    <a href="${C.brand.blogUrl}">Our Blog</a>
    <a href="${C.brand.login.url}">${esc(C.brand.login.label)}</a>
    <a class="btn btn-primary" href="${C.brand.signup.url}">${esc(C.brand.signup.label)}</a>
  </nav>
</div>`;

/* --------------------------------------------------------------- hero ---- */
const hero = () => `
<section id="home" class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="hero-grid-lines" aria-hidden="true"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1 class="reveal d1">Workshop <em>Management</em> Software</h1>
      <p class="hero-sub reveal d2">${esc(C.brand.heroSub)}</p>
      <div class="hero-cta reveal d3">
        <a class="btn btn-primary btn-lg" href="${C.brand.signup.url}">${esc(C.brand.cta)}</a>
        <a class="btn btn-outline btn-lg" href="#support">Book a demo</a>
      </div>
    </div>
    <div class="hero-art reveal d2">
      ${S.productMock({})}
    </div>
  </div>
  <div class="marquee" aria-label="Integration partners">
    <div class="marquee-track">
      ${[0, 1].map(() => C.integrations.logos.map((l) =>
        `<span class="mq-item"><img src="${alphaLogo(l.file)}" alt="${esc(l.name)}" loading="lazy" style="--h:${markHeight(l.file, 900, 14, 30)}px"></span>`).join('')).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ pillars ---- */
const pillars = () => `
<section id="why" class="sec">
  <div class="wrap">
    ${secHead(C.pillars.eyebrow, esc(C.pillars.heading), null, null, 'centered')}
    <div class="card-grid cols-3">
      ${C.pillars.items.map((p, i) => `
      <article class="card reveal d${i + 1}">
        <div class="card-ico">${ico(p.icon, 'ico')}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------- workshop photo band --- */
/* "Suitable for" and the four numbers in one automotive band. */
const bay = () => `
<section id="suitable" class="sec-bay">
  <div class="bay-media" aria-hidden="true">
    <img src="images/pexels/auto-workshop-wide.jpg" alt="" loading="lazy">
  </div>
  ${tape()}
  <div class="wrap bay-inner">
    <div class="bay-head reveal">
      <span class="eyebrow">${esc(C.suitable.eyebrow)}</span>
      <h2>${esc(C.suitable.heading)}</h2>
    </div>
    <div class="bay-types">
      ${C.suitable.items.map((s, i) => `
      <article class="bay-type reveal d${(i % 4) + 1}">
        <div class="bay-type-img"><img src="images/pexels/${s.file}" alt="${esc(s.title)}" loading="lazy"></div>
        <h3>${esc(s.title)}</h3>
      </article>`).join('')}
    </div>
    <div class="bay-stats reveal">
      ${C.proven.stats.map((s) => `
      <div class="stat">
        <strong data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</strong>
        <span>${esc(s.label)}</span>
        <i class="stat-ticks" aria-hidden="true"></i>
      </div>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ features --- */
const features = () => `
<section id="features" class="sec sec-features">
  <div class="wrap">
    ${secHead(C.features.eyebrow, esc(C.features.heading), null, null, 'centered')}
    <div class="feat-rail reveal" role="tablist" aria-label="Features">
      ${C.features.items.map((f, i) => `
      <button class="feat-chip${i === 0 ? ' active' : ''}" role="tab" data-feature-tab="${slug(f.name)}" aria-selected="${i === 0 ? 'true' : 'false'}">
        ${ico(f.icon, 'ico ico-sm')}<span>${esc(f.name)}</span>
      </button>`).join('')}
    </div>
    <div class="feat-stage reveal">
      ${C.features.items.map((f, i) => `
      <article class="feat-panel${i === 0 ? ' active' : ''}" data-feature-panel="${slug(f.name)}" role="tabpanel">
        <div class="feat-plate">
          <span class="feat-plate-no">MODULE ${n2(i)}/12</span>
          <span class="feat-plate-bolt">${icons.bolt}</span>
        </div>
        <div class="feat-head">
          <div class="feat-head-ico">${ico(f.icon, 'ico')}</div>
          <h3>${esc(f.name)}</h3>
        </div>
        <p class="feat-blurb">${esc(f.blurb)}</p>
        ${S.disclose({
          label: 'Everything in ' + esc(f.name),
          meta: f.bullets.length + ' details',
          body: `<ul class="feat-list">${f.bullets.map((b) => `<li>${icons.check}<span>${esc(b)}</span></li>`).join('')}</ul>
                 ${f.highlight ? `<div class="feat-highlight"><span class="eyebrow">Highlight</span><p>${esc(f.highlight)}</p></div>` : ''}`
        })}
        <a class="link-arrow" href="${f.link.url}" target="_blank" rel="noopener">${esc(f.link.label)}${icons.arrow}</a>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------- integrations ---- */
/* Orbit: the eighteen partners circling the MechanicDesk core on three
   counter-rotating rings, logos floating free — no plate, no ring around
   them, original brand colours. Hovering the system freezes it; clicking a
   satellite opens that partner underneath. Reuses the data-hive-* hooks. */
const orbit = () => {
  const items = [];
  C.integrations.categories.forEach((g) => g.items.forEach((it) => items.push({ ...it, cat: g.name })));
  const spin = [96, 132, 168];
  const R = [0.21, 0.35, 0.47];                  // ring radii, fraction of the box
  const BOX = 656;                               // design width of the orbit, px
  const AREA = 2600;

  /* AMS Rewards reads small next to the rest, so it gets 1.8x the area. */
  const BOOST = { 'ams_rewards.png': 1.8 };
  const size = (it, area) => markSize(it.file, (area || AREA) * (BOOST[it.file] || 1), 20, 72);
  const box = (it) => {
    const m = it.file ? size(it, AREA) : { w: 74, h: 22 };
    return { w: (m.w + 14) / BOX, h: (m.h + 12) / BOX };   // + breathing room
  };

  /* Widest marks to the outer ring: it has the most circumference to give. */
  const byWidth = items.slice().sort((a, b) => box(b).w - box(a).w);
  const rings = [byWidth.slice(13, 18), byWidth.slice(7, 13), byWidth.slice(0, 7)];

  /* Phase search: maximise the smallest gap between the bounding boxes of any
     two marks on different rings (centre distance alone is misleading — a wide
     wordmark and a narrow roundel are not the same object). */
  const phase = (() => {
    const step = rings.map((r) => 360 / r.length);
    const pt = (ring, i, p) => {
      const t = ((step[ring] * i + p) * Math.PI) / 180;
      return [R[ring] * Math.sin(t), -R[ring] * Math.cos(t)];
    };
    const worstGap = (p) => {
      let worst = 9;
      for (let a = 0; a < 3; a++) {
        for (let b = a + 1; b < 3; b++) {
          for (let i = 0; i < rings[a].length; i++) {
            const A = pt(a, i, p[a]), ba = box(rings[a][i]);
            for (let j = 0; j < rings[b].length; j++) {
              const B = pt(b, j, p[b]), bb = box(rings[b][j]);
              const gx = Math.abs(A[0] - B[0]) - (ba.w + bb.w) / 2;
              const gy = Math.abs(A[1] - B[1]) - (ba.h + bb.h) / 2;
              const g = Math.max(gx, gy);        // boxes clear if either axis clears
              if (g < worst) worst = g;
            }
          }
        }
      }
      return worst;
    };
    let best = [0, 0, 0], bestGap = -9;
    for (let p2 = 0; p2 < 60; p2 += 1) {
      for (let p3 = 0; p3 < 52; p3 += 1) {
        const g = worstGap([0, p2, p3]);
        if (g > bestGap) { bestGap = g; best = [0, p2, p3]; }
      }
    }
    console.log('  orbit: smallest gap between marks on different rings = ' +
      Math.round(bestGap * BOX) + 'px (phases ' + best.join('/') + ')');
    return best;
  })();

  const mark = (it, cls, area) => {
    if (!it.file) return `<em class="${cls} is-text">${esc(it.name.split(' ')[0])}</em>`;
    const m = size(it, area);
    return `<img class="${cls}" src="${alphaLogo(it.file)}" alt="" loading="lazy" style="--h:${m.h}px">`;
  };

  return `
<section id="integrations" class="sec sec-integrations">
  <div class="wrap">
    ${secHead(C.integrations.eyebrow, esc(C.integrations.heading), C.integrations.sub,
      `<a class="link-arrow" href="${C.integrations.moreUrl}" target="_blank" rel="noopener">${esc(C.integrations.moreLabel)}${icons.arrow}</a>`, 'centered')}
    <div class="orbit reveal">
      <div class="orb-field" aria-hidden="true">
        ${STARS.html}
        <i class="orb-ring r1"></i><i class="orb-ring r2"></i><i class="orb-ring r3"></i>
        <i class="orb-sweep"></i>
      </div>
      <div class="orb-core">
        <img src="images/logo.png" alt="MechanicDesk" width="42" height="43">
        <i class="orb-pulse"></i><i class="orb-pulse d"></i>
      </div>
      ${rings.map((ring, r) => `
      <div class="orb-track t${r + 1}" style="--spin:${spin[r]}s">
        ${ring.map((it, i) => `
        <div class="orb-slot" style="--a:${((360 / ring.length) * i + phase[r]).toFixed(2)}deg">
          <button class="orb-node" data-hive-tab="${slug(it.name)}"
                  style="--spin:${spin[r]}s;--w:${size(it, 2600).w}px" aria-label="${esc(it.name)}">
            ${mark(it, 'orb-mark', 2600)}
            <span class="orb-name">${esc(it.name)}</span>
          </button>
        </div>`).join('')}
      </div>`).join('')}
    </div>
    <div class="orb-stage reveal">
      ${items.map((it, n) => `
      <article class="hive-panel${n === 0 ? ' active' : ''}" data-hive-panel="${slug(it.name)}">
        <div class="hive-panel-head">
          ${mark(it, 'hive-mark', 1500)}
          <span>
            <span class="eyebrow">${esc(it.cat)}</span>
            <h3>${esc(it.name)}</h3>
          </span>
        </div>
        ${it.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
        ${it.url ? `<a class="link-arrow sm" href="${it.url}" target="_blank" rel="noopener">${esc(it.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}${icons.arrow}</a>` : ''}
      </article>`).join('')}
    </div>
  </div>
</section>`;
};

/* -------------------------------------------------------------- proven --- */
/* "Proven. Loved. Relied on." — the real reviews from their own testimonials
   carousel: three on the page, six more behind a button, and a link out to the
   full set. The three named customers keep their logo row underneath. */
const proven = () => {
  const R = C.proven.reviews;
  const card = (r) => `
      <figure class="quote reveal">
        <span class="quote-mark" aria-hidden="true">&ldquo;</span>
        <blockquote>${esc(r.text)}</blockquote>
        <figcaption>
          <strong>${esc(r.person)}</strong>
          <span>${esc(r.company)}${r.address ? ' · ' + esc(r.address) : ''}</span>
        </figcaption>
      </figure>`;
  return `
<section id="proven" class="sec sec-proven">
  <div class="wrap">
    ${secHead(C.proven.eyebrow, esc(C.proven.heading), C.proven.sub, null, 'centered')}
    <div class="quote-grid">${R.slice(0, 3).map(card).join('')}</div>
    ${S.disclose({
      mod: 'reviews-more reveal',
      label: 'Read more reviews',
      body: `<div class="quote-grid">${R.slice(3).map(card).join('')}</div>
        <p class="reviews-out"><a class="link-arrow sm" href="${C.proven.reviewsUrl}" target="_blank" rel="noopener">${esc(C.proven.moreLabel)}${icons.arrow}</a></p>`
    })}
    <div class="cust-row reveal">
      ${C.proven.customers.map((c) => `
      <figure class="cust-card">
        <div class="cust-photo"><img src="images/proven/${c.file}" alt="${esc(c.name)}" loading="lazy"></div>
        <figcaption>${esc(c.name)}</figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>`;
};

/* ------------------------------------------------------------- pricing --- */
/* Spec-sheet comparison table (the layout from the Blueprint concept), in the
   graphite palette: one row per attribute, plans as columns, first column
   sticky so the table stays readable while it scrolls on small screens. */
const pricing = () => {
  const P = C.pricing;
  const au = P.data.australia;
  const rows = [
    { label: 'Monthly price', field: 'cost', big: true },
    { label: 'Included users', field: 'users' },
    { label: 'Extra user / month', field: 'costPerExtraUser' },
    { label: 'Per SMS', field: 'costPerSms' },
    { label: 'Stock items', field: 'stockCountLimit' }
  ];
  return `
<section id="pricing" class="sec sec-pricing">
  <div class="wrap">
    ${secHead(P.eyebrow, esc(P.heading), null,
      `<div class="segmented">
        ${P.regions.map((r, i) => `<button class="seg${i === 0 ? ' active' : ''}" data-region="${r.key}">${esc(r.name)}</button>`).join('')}
      </div>
      <select id="regionSelect" class="region-select" aria-label="Select region">
        ${P.regions.map((r) => `<option value="${r.key}">${esc(r.name)}</option>`).join('')}
      </select>`, 'centered')}
    <div class="table-scroll reveal">
      <table class="price-table">
        <thead>
          <tr>
            <th><span class="mono-plate">Plan · <span data-region-name>Australia</span></span></th>
            ${P.plans.map((p) => `<th class="${p.featured ? 'featured' : ''}">
              ${p.featured ? '<span class="badge">Most popular</span>' : ''}
              <span class="plan-name">${esc(p.name)}</span>
            </th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map((r) => `
          <tr>
            <th scope="row">${esc(r.label)}</th>
            ${P.plans.map((p) => {
              const val = r.field === 'users' ? p.users : au[p.key][r.field];
              const attrs = r.field === 'users' ? '' : ` data-price-cell data-plan="${p.key}" data-field="${r.field}"`;
              return `<td class="${p.featured ? 'featured' : ''}${r.big ? ' cell-price' : ''}">
                <span${attrs}>${esc(val)}</span>${r.big ? `<em class="per" data-month-unit>${esc(P.regions[0].monthUnit)}</em>` : ''}
              </td>`;
            }).join('')}
          </tr>`).join('')}
          <tr>
            <th scope="row">Free trial</th>
            ${P.plans.map((p) => `<td class="${p.featured ? 'featured' : ''}">${icons.check} ${esc(P.trial)}</td>`).join('')}
          </tr>
          <tr>
            <th scope="row">Support</th>
            ${P.plans.map((p) => `<td class="${p.featured ? 'featured' : ''}">${icons.check} ${esc(P.support)}</td>`).join('')}
          </tr>
          <tr class="row-cta">
            <th scope="row"></th>
            ${P.plans.map((p) => `<td class="${p.featured ? 'featured' : ''}">
              <a class="btn ${p.featured ? 'btn-primary' : 'btn-outline'} btn-sm" href="${P.signupUrl}">${esc(P.signupLabel)}</a>
            </td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>
    ${S.disclose({
      mod: 'addons reveal',
      icon: 'toolbox',
      label: esc(P.addons.heading),
      meta: P.addons.items.length + ' available',
      body: `<div class="addon-grid">
        ${P.addons.items.map((a) => `<article class="addon"><h4>${esc(a.name)}</h4><p>${esc(a.text)}</p></article>`).join('')}
      </div><p class="addons-note">${esc(P.addons.note)}</p>`
    })}
  </div>
</section>`;
};

/* ------------------------------------------------------------- support --- */
const support = () => `
<section id="support" class="sec sec-support">
  <div class="wrap">
    ${secHead(C.support.eyebrow, esc(C.support.heading), null, null, 'centered')}
    <div class="card-grid cols-4">
      ${C.support.items.map((s, i) => `
      <article class="card reveal d${i + 1}">
        <div class="card-ico">${ico(s.icon, 'ico')}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        ${s.phones ? S.phoneDisclosure() : ''}
        ${s.action ? `<a class="link-arrow sm" href="${s.action.url}"${s.action.url.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(s.action.label)}${icons.arrow}</a>` : ''}
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ---------------------------------------------------------------- blog --- */
const blog = () => `
<section id="blog" class="sec sec-blog">
  <div class="wrap">
    ${secHead(C.blog.eyebrow, esc(C.blog.heading), null, null, 'centered')}
    <div class="blog-grid">
      ${C.blog.posts.map((p, i) => `
      <article class="blog-card reveal d${i + 1}">
        <a class="blog-img" href="${p.url}" target="_blank" rel="noopener"><img src="images/pexels/${p.file}" alt="${esc(p.title)}" loading="lazy"></a>
        <div class="blog-body">
          <h3><a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
          <a class="link-arrow sm" href="${p.url}" target="_blank" rel="noopener">${esc(C.blog.moreLabel)}${icons.arrow}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ----------------------------------------------------------- cta band ---- */
const ctaBand = () => `
<section id="cta" class="sec sec-cta">
  <div class="wrap">
    <div class="cta-box reveal">
      ${tape()}
      <div class="cta-copy">
        <h2>Ready to run the whole workshop from one screen?</h2>
        <p>${esc(C.pricing.trial)} · ${esc(C.trustStrip[0])} · ${esc(C.pricing.support)}</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-primary btn-lg" href="${C.brand.signup.url}">${esc(C.brand.cta)}</a>
        <a class="btn btn-ghost btn-lg" href="tel:1300737100">${icons.phone}Call 1300 737 100</a>
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------- contact --- */
const contact = () => `
<section id="contact" class="sec sec-contact">
  <div class="wrap">
    ${secHead(C.contact.eyebrow, esc(C.contact.heading), null, null, 'centered')}
    <div class="contact-grid">
      <div class="contact-info reveal">
        <div class="info-card">
          <p class="info-strong">${esc(C.brand.legal)}</p>
          <p class="info-row">${ico('pin', 'ico ico-sm')}<span>${esc(C.brand.address.line1)}, ${esc(C.brand.address.line2)}, ${esc(C.brand.address.line3)}</span></p>
          <p class="info-row">${ico('mail', 'ico ico-sm')}<span><a href="mailto:${C.brand.email}">${esc(C.brand.email)}</a> · <a href="mailto:${C.brand.supportEmail}">${esc(C.brand.supportEmail)}</a></span></p>
          ${S.phoneDisclosure()}
        </div>
        <div class="map">${S.mapsIframe(230)}</div>
      </div>
      <div class="contact-form reveal d2">${S.contactForm()}</div>
    </div>
  </div>
</section>`;

/* -------------------------------------------------------------- footer --- */
const footer = () => `
<footer class="footer">
  ${tape()}
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="#home">
          <img src="images/logo.png" alt="MechanicDesk logo" width="38" height="39">
          <span class="brand-name">Mechanic<em>Desk</em></span>
        </a>
        <p class="foot-line">${esc(C.brand.legal)} · ${esc(C.brand.address.oneLine)}</p>
        ${S.socialLinks()}
        ${S.disclose({ mod: 'foot-about', label: esc(C.brand.about.heading), body: `<p>${esc(C.brand.about.body)}</p>` })}
      </div>
      ${C.navFull.map((g) => `
      <div class="foot-col">
        <p class="eyebrow">${esc(g.label)}</p>
        <ul>${g.children.map((c) => `<li><a href="${c.href}"${c.href.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(c.label)}</a></li>`).join('')}</ul>
      </div>`).join('')}
      <div class="foot-col">
        <p class="eyebrow">Contact</p>
        <ul>
          ${C.brand.phones.map((p) => `<li>${esc(p.label)}: <a href="tel:${p.number.replace(/[^0-9+]/g, '')}">${esc(p.number)}</a></li>`).join('')}
          <li><a href="mailto:${C.brand.email}">${esc(C.brand.email)}</a></li>
        </ul>
        <p class="eyebrow mt">${esc(C.brand.apps.heading)}</p>
        ${S.appBadges()}
      </div>
    </div>
    <div class="foot-bottom">
      <p>${esc(C.brand.copyright)}</p>
      <p>Demo build · app screens from MechanicDesk tutorials · workshop photography: Pexels</p>
    </div>
  </div>
</footer>`;

module.exports = () => `<!DOCTYPE html>
<html lang="en">
<head>
${S.head({ fontLinks: FONTS, css: 'styles.css', concept: 'Graphite', conceptName: 'dark precision industrial — redesign demo of mechanicdesk.com.au' })}
<style>${STARS.css}</style>
</head>
<body class="v2">
${S.watermark()}
${S.chrome()}
${navBar()}
<main>
${hero()}
${pillars()}
${orbit()}
${bay()}
${proven()}
${features()}
${pricing()}
${blog()}
${support()}
${ctaBand()}
${contact()}
</main>
${footer()}
${S.pricingDataScript()}
<script src="script.js"></script>
</body>
</html>`;
