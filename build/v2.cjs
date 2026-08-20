/* =========================================================================
   CONCEPT 2 — "GRAPHITE"
   Dark, precision-engineered. Graphite surfaces, orange as a signal light,
   hazard tape and tyre-tread details, and a workshop photo band.
   Minimalist by disclosure: long copy lives behind click-to-open blocks.
   ========================================================================= */
const S = require('./shared.cjs');
const { esc, ico, icons, C, slug } = S;

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

/* ---------------------------------------------------------------- nav ---- */
const navBar = () => `
<header class="nav" data-nav>
  <div class="nav-inner">
    <a class="brand" href="#home">
      <img src="../images/logo.png" alt="MechanicDesk logo" width="34" height="35">
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
      <span class="pill reveal">${icons.star}<span>${esc(C.proven.sub)}</span></span>
      <h1 class="reveal d1">Workshop <em>Management</em> Software</h1>
      <p class="hero-sub reveal d2">${esc(C.brand.heroSub)}</p>
      <div class="hero-cta reveal d3">
        <a class="btn btn-primary btn-lg" href="${C.brand.signup.url}">${esc(C.brand.cta)}</a>
        <a class="btn btn-outline btn-lg" href="#support">Book a demo</a>
      </div>
      <ul class="facts reveal d4">
        ${[C.trustStrip[0], C.trustStrip[2], C.trustStrip[3]].map((t) => `<li>${icons.check}${esc(t)}</li>`).join('')}
      </ul>
    </div>
    <div class="hero-art reveal d2">
      ${S.productMock({})}
    </div>
  </div>
  <div class="marquee" aria-label="Integration partners">
    <div class="marquee-track">
      ${[0, 1].map(() => C.integrations.logos.map((l) =>
        `<span class="mq-item"><img src="../images/logos/${l.file}" alt="${esc(l.name)}" loading="lazy"></span>`).join('')).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ pillars ---- */
const pillars = () => `
<section id="why" class="sec">
  <div class="wrap">
    ${secHead(C.pillars.eyebrow, esc(C.pillars.heading), C.pillars.sub, null, 'centered')}
    <div class="card-grid cols-3">
      ${C.pillars.items.map((p, i) => `
      <article class="card reveal d${i + 1}">
        <div class="card-ico">${ico(p.icon, 'ico')}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
        <span class="card-num">${n2(i)}</span>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ features --- */
const features = () => `
<section id="features" class="sec sec-features">
  <div class="wrap">
    ${secHead(C.features.eyebrow, esc(C.features.heading), 'Pick a module to see exactly what it does.', null, 'centered')}
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

/* ------------------------------------------------- workshop photo band --- */
/* Merges "Suitable for" and the stats strip into one automotive band. */
const bay = () => `
<section id="suitable" class="sec-bay">
  <div class="bay-media" aria-hidden="true">
    <img src="../images/pexels/auto-workshop-wide.jpg" alt="" loading="lazy">
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
        <div class="bay-type-img"><img src="../images/pexels/${s.file}" alt="${esc(s.title)}" loading="lazy"></div>
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

/* ------------------------------------------------------- integrations ---- */
const integrations = () => `
<section id="integrations" class="sec sec-integrations">
  <div class="wrap">
    ${secHead(C.integrations.eyebrow, esc(C.integrations.heading), C.integrations.sub,
      `<a class="link-arrow" href="${C.integrations.moreUrl}" target="_blank" rel="noopener">${esc(C.integrations.moreLabel)}${icons.arrow}</a>`, 'centered')}
    <div class="plate-grid reveal">
      ${C.integrations.logos.map((l) => `
      <div class="plate" title="${esc(l.name)}"><img src="../images/logos/${l.file}" alt="${esc(l.name)} integration" loading="lazy"></div>`).join('')}
    </div>
    ${S.disclose({
      mod: 'intx-all reveal',
      icon: 'obd',
      label: 'Browse all ' + C.integrations.categories.reduce((n, g) => n + g.items.length, 0) + ' integrations',
      meta: C.integrations.categories.length + ' categories',
      body: `<p class="intx-intro">${esc(C.integrations.intro)}</p>
        <div class="cat-bar">
          <button class="chip-btn active" data-cat="all">All</button>
          ${C.integrations.categories.map((g) => `<button class="chip-btn" data-cat="${slug(g.name)}">${esc(g.name)}</button>`).join('')}
        </div>
        ${S.integrationList()}`
    })}
  </div>
</section>`;

/* -------------------------------------------------------------- proven --- */
const proven = () => `
<section id="proven" class="sec sec-proven">
  <div class="wrap">
    ${secHead(C.proven.eyebrow, esc(C.proven.heading), C.proven.note,
      `<a class="link-arrow" href="${C.proven.moreUrl}" target="_blank" rel="noopener">${esc(C.proven.moreLabel)}${icons.arrow}</a>`, 'centered')}
    <div class="card-grid cols-3">
      ${C.proven.customers.map((c, i) => `
      <figure class="cust-card reveal d${i + 1}">
        <div class="plate plate-photo"><img src="../images/proven/${c.file}" alt="${esc(c.name)}" loading="lazy"></div>
        <figcaption>${esc(c.name)}</figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------- pricing --- */
const pricing = () => {
  const P = C.pricing;
  const au = P.data.australia;
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
    <div class="plan-grid">
      ${P.plans.map((p, i) => `
      <article class="plan${p.featured ? ' featured' : ''} reveal d${i + 1}">
        ${p.featured ? '<span class="plan-badge">Most popular</span>' : ''}
        <h3>${esc(p.name)}</h3>
        <p class="plan-price"><span data-price-cell data-plan="${p.key}" data-field="cost">${esc(au[p.key].cost)}</span></p>
        <p class="plan-unit" data-month-unit>${esc(P.regions[0].monthUnit)}</p>
        <p class="plan-users">${icons.users}${esc(p.users)}</p>
        <a class="btn ${p.featured ? 'btn-primary' : 'btn-outline'}" href="${P.signupUrl}">${esc(P.signupLabel)}</a>
        ${S.planIncludes(p)}
      </article>`).join('')}
    </div>
    ${S.disclose({
      mod: 'addons reveal',
      icon: 'plus',
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
    ${secHead(C.support.eyebrow, esc(C.support.heading), C.support.sub, null, 'centered')}
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
    <p class="support-note reveal">${esc(C.support.tutorialsNote)}</p>
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
        <a class="blog-img" href="${p.url}" target="_blank" rel="noopener"><img src="../images/pexels/${p.file}" alt="${esc(p.title)}" loading="lazy"></a>
        <div class="blog-body">
          <h3><a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
          <p>${esc(p.excerpt)}</p>
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
    ${secHead(C.contact.eyebrow, esc(C.contact.heading), C.contact.sub, null, 'centered')}
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
          <img src="../images/logo.png" alt="MechanicDesk logo" width="38" height="39">
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
      <p>Concept 2 “Graphite” · demo build · app screens from MechanicDesk tutorials · workshop photography: Pexels</p>
    </div>
  </div>
</footer>`;

module.exports = () => `<!DOCTYPE html>
<html lang="en">
<head>
${S.head({ fontLinks: FONTS, css: 'styles.css', concept: '2', conceptName: 'Graphite — dark precision industrial' })}
</head>
<body class="v2">
${S.watermark()}
${S.chrome()}
${S.conceptSwitch('v2')}
${navBar()}
<main>
${hero()}
${pillars()}
${features()}
${bay()}
${integrations()}
${proven()}
${pricing()}
${support()}
${blog()}
${ctaBand()}
${contact()}
</main>
${footer()}
${S.pricingDataScript()}
<script src="script.js"></script>
</body>
</html>`;
