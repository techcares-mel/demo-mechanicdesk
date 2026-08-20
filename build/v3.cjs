/* =========================================================================
   CONCEPT 3 — "TORQUE"
   Warm light, bold and friendly. Big type, soft rounded cards, orange panels,
   bento "why" grid, expandable feature cards, ink CTA block.
   ========================================================================= */
const S = require('./shared.cjs');
const { esc, ico, icons, C, slug } = S;

const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">';

const n2 = (i) => String(i + 1).padStart(2, '0');

const secHead = (label, title, sub, extra, mod) => `
<div class="sec-head${mod ? ' ' + mod : ''} reveal">
  <span class="tag">${esc(label)}</span>
  <h2>${title}</h2>
  ${sub ? `<p class="sec-sub">${esc(sub)}</p>` : ''}
  ${extra || ''}
</div>`;

/* ---------------------------------------------------------------- nav ---- */
const navBar = () => `
<header class="nav" data-nav>
  <div class="nav-inner">
    <a class="brand" href="#home">
      <img src="../images/logo.png" alt="MechanicDesk logo" width="36" height="37">
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
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <span class="hero-pill reveal">${ico('pin', 'ico ico-sm')} Melbourne, Australia · Since 2014</span>
      <h1 class="reveal d1">Workshop <span class="hl">Management</span><br>Software</h1>
      <p class="hero-lead reveal d2">${esc(C.brand.heroLead)}</p>
      <p class="hero-sub reveal d2">${esc(C.brand.heroSub)}</p>
      <div class="hero-cta reveal d3">
        <a class="btn btn-primary btn-lg" href="${C.brand.signup.url}">${esc(C.brand.cta)}</a>
        <a class="btn btn-soft btn-lg" href="#features">Explore features</a>
      </div>
      <ul class="hero-facts reveal d4">
        ${C.trustStrip.map((t) => `<li>${icons.check}${esc(t)}</li>`).join('')}
      </ul>
    </div>
    <div class="hero-art reveal d2">
      <div class="hero-panel">
        <img src="../images/app-presentation.png" alt="MechanicDesk workshop management software on desktop and mobile" loading="eager">
      </div>
      <div class="float-card">
        <strong>20,000+</strong>
        <span>Mechanics love MechanicDesk</span>
      </div>
    </div>
  </div>
  <div class="wrap">
    <div class="logo-strip reveal">
      <p class="strip-label">Connected to the tools your workshop already uses</p>
      <div class="strip-logos">
        ${C.integrations.logos.slice(0, 10).map((l) => `<span><img src="../images/logos/${l.file}" alt="${esc(l.name)}" loading="lazy"></span>`).join('')}
      </div>
    </div>
  </div>
</section>`;

/* --------------------------------------------------------- bento / why --- */
const bento = () => `
<section id="why" class="sec">
  <div class="wrap">
    ${secHead(C.pillars.eyebrow, esc(C.pillars.heading), C.pillars.sub)}
    <div class="bento">
      ${C.pillars.items.map((p, i) => `
      <article class="bento-card reveal d${i + 1}">
        <div class="bento-ico">${ico(p.icon, 'ico')}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`).join('')}
      <div class="bento-stats reveal d4">
        ${C.proven.stats.map((s) => `
        <div class="bstat">
          <strong data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</strong>
          <span>${esc(s.label)}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ features --- */
const features = () => `
<section id="features" class="sec sec-features">
  <div class="wrap">
    ${secHead(C.features.eyebrow, esc(C.features.heading), null,
      `<p class="sec-sub">Tap any feature to see exactly what is included.</p>`)}
    <div class="acc-grid">
      ${C.features.items.map((f, i) => `
      <article class="acc-card${i === 0 ? ' open' : ''} reveal" data-acc>
        <button class="acc-head" data-acc-toggle aria-expanded="${i === 0 ? 'true' : 'false'}">
          <span class="acc-ico">${ico(f.icon, 'ico')}</span>
          <span class="acc-title">
            <em>${n2(i)}</em>
            <strong>${esc(f.name)}</strong>
          </span>
          <span class="acc-plus">${icons.plus}</span>
        </button>
        <div class="acc-body">
          <p class="acc-blurb">${esc(f.blurb)}</p>
          <ul class="acc-list">
            ${f.bullets.map((b) => `<li>${icons.check}<span>${esc(b)}</span></li>`).join('')}
          </ul>
          ${f.highlight ? `<div class="acc-highlight"><span class="tag">Highlight</span><p>${esc(f.highlight)}</p></div>` : ''}
          <a class="link-arrow" href="${f.link.url}" target="_blank" rel="noopener">${esc(f.link.label)}${icons.arrow}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ suitable --- */
const suitable = () => `
<section id="suitable" class="sec sec-suitable">
  <div class="wrap">
    ${secHead(C.suitable.eyebrow, esc(C.suitable.heading))}
    <div class="suit-row">
      ${C.suitable.items.map((s, i) => `
      <article class="suit-card reveal d${(i % 4) + 1}">
        <div class="suit-photo"><img src="../images/suitable/${s.file}" alt="${esc(s.title)}" loading="lazy"></div>
        <h3>${esc(s.title)}</h3>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------- integrations ---- */
const integrations = () => `
<section id="integrations" class="sec sec-integrations">
  <div class="wrap">
    ${secHead(C.integrations.eyebrow, esc(C.integrations.heading), C.integrations.sub,
      `<p class="sec-body">${esc(C.integrations.intro)}</p>
       <a class="link-arrow" href="${C.integrations.moreUrl}" target="_blank" rel="noopener">${esc(C.integrations.moreLabel)}${icons.arrow}</a>`)}
    <div class="cat-bar reveal">
      <button class="chip-btn active" data-cat="all">All</button>
      ${C.integrations.categories.map((g) => `<button class="chip-btn" data-cat="${slug(g.name)}">${esc(g.name)}</button>`).join('')}
    </div>
    ${C.integrations.categories.map((g) => `
    <div class="int-group" data-cat-group="${slug(g.name)}">
      <h3 class="int-cat">${esc(g.name)}<span>${g.items.length}</span></h3>
      <div class="int-grid">
        ${g.items.map((it) => `
        <article class="int-card reveal">
          <div class="int-top">
            <div class="int-logo">${it.file ? `<img src="../images/logos/${it.file}" alt="${esc(it.name)} logo" loading="lazy">` : `<span>${esc(it.name.split(' ')[0])}</span>`}</div>
            <h4>${esc(it.name)}</h4>
          </div>
          ${it.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
          ${it.url ? `<a class="link-arrow sm" href="${it.url}" target="_blank" rel="noopener">Visit site${icons.arrow}</a>` : ''}
        </article>`).join('')}
      </div>
    </div>`).join('')}
  </div>
</section>`;

/* -------------------------------------------------------------- proven --- */
const proven = () => `
<section id="proven" class="sec sec-proven">
  <div class="wrap">
    ${secHead(C.proven.eyebrow, esc(C.proven.heading), C.proven.sub,
      `<p class="sec-body">${esc(C.proven.note)}</p>
       <a class="link-arrow" href="${C.proven.moreUrl}" target="_blank" rel="noopener">${esc(C.proven.moreLabel)}${icons.arrow}</a>`)}
    <div class="cust-row">
      ${C.proven.customers.map((c, i) => `
      <figure class="cust-card reveal d${i + 1}">
        <div class="cust-photo"><img src="../images/proven/${c.file}" alt="${esc(c.name)}" loading="lazy"></div>
        <div class="stars">${icons.star.repeat(5)}</div>
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
      </select>`)}
    <div class="plan-row">
      ${P.plans.map((p, i) => `
      <article class="plan${p.featured ? ' featured' : ''} reveal d${i + 1}">
        ${p.featured ? '<span class="plan-badge">Most popular</span>' : ''}
        <h3>${esc(p.name)}</h3>
        <p class="plan-users">${esc(p.users)}</p>
        <p class="plan-price"><span data-price-cell data-plan="${p.key}" data-field="cost">${esc(au[p.key].cost)}</span></p>
        <p class="plan-unit" data-month-unit>${esc(P.regions[0].monthUnit)}</p>
        <a class="btn ${p.featured ? 'btn-ink' : 'btn-soft'}" href="${P.signupUrl}">${esc(P.signupLabel)}</a>
        <ul class="plan-list">
          <li>${icons.check}<span>${esc(P.trial)}</span></li>
          <li>${icons.check}<span><em data-price-cell data-plan="${p.key}" data-field="costPerExtraUser">${esc(au[p.key].costPerExtraUser)}</em> per extra user/employee</span></li>
          <li>${icons.check}<span><em data-price-cell data-plan="${p.key}" data-field="costPerSms">${esc(au[p.key].costPerSms)}</em> per SMS</span></li>
          <li>${icons.check}<span><em data-price-cell data-plan="${p.key}" data-field="stockCountLimit">${esc(au[p.key].stockCountLimit)}</em> stock items</span></li>
          <li>${icons.check}<span>${esc(P.support)}</span></li>
        </ul>
      </article>`).join('')}
    </div>
    <div class="addons reveal">
      <div class="addons-head">
        <h3>${esc(P.addons.heading)}</h3>
        <p class="addons-note">${esc(P.addons.note)}</p>
      </div>
      <div class="addon-grid">
        ${P.addons.items.map((a) => `
        <article class="addon">
          <h4>${esc(a.name)}</h4>
          <p>${esc(a.text)}</p>
        </article>`).join('')}
      </div>
    </div>
  </div>
</section>`;
};

/* ------------------------------------------------------------- support --- */
const support = () => `
<section id="support" class="sec sec-support">
  <div class="wrap">
    ${secHead(C.support.eyebrow, esc(C.support.heading), C.support.sub,
      `<p class="sec-body">${esc(C.support.tutorialsNote)}</p>`)}
    <div class="support-grid">
      ${C.support.items.map((s, i) => `
      <article class="support-card reveal d${i + 1}">
        <span class="support-num">${n2(i)}</span>
        <div class="support-ico">${ico(s.icon, 'ico')}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        ${s.phones ? `<ul class="phone-list">${S.phoneRows()}</ul>` : ''}
        ${s.action ? `<a class="link-arrow sm" href="${s.action.url}"${s.action.url.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(s.action.label)}${icons.arrow}</a>` : ''}
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ---------------------------------------------------------------- blog --- */
const blog = () => `
<section id="blog" class="sec">
  <div class="wrap">
    ${secHead(C.blog.eyebrow, esc(C.blog.heading))}
    <div class="blog-row">
      ${C.blog.posts.map((p, i) => `
      <article class="blog-card reveal d${i + 1}">
        <a class="blog-img" href="${p.url}" target="_blank" rel="noopener"><img src="../images/blog/${p.file}" alt="${esc(p.title)}" loading="lazy"></a>
        <div class="blog-body">
          <h3><a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
          <p>${esc(p.excerpt)}</p>
          <a class="link-arrow sm" href="${p.url}" target="_blank" rel="noopener">${esc(C.blog.moreLabel)}${icons.arrow}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ----------------------------------------------------------- cta block --- */
const ctaBlock = () => `
<section id="cta" class="sec sec-cta">
  <div class="wrap">
    <div class="cta-ink reveal">
      <span class="tag">Get started</span>
      <h2>Everything you need to run the workshop,<br>from booking to invoice.</h2>
      <p>${esc(C.pricing.trial)} · no installation · no manual data backup · full support on every plan.</p>
      <div class="cta-actions">
        <a class="btn btn-primary btn-lg" href="${C.brand.signup.url}">${esc(C.brand.cta)}</a>
        <a class="btn btn-outline btn-lg" href="tel:1300737100">Call 1300 737 100</a>
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------- contact --- */
const contact = () => `
<section id="contact" class="sec sec-contact">
  <div class="wrap">
    ${secHead(C.contact.eyebrow, esc(C.contact.heading), C.contact.sub)}
    <div class="contact-grid">
      <div class="contact-form reveal">${S.contactForm()}</div>
      <div class="contact-info reveal d2">
        <div class="info-card">
          <span class="tag">${esc(C.contact.reachHeading)}</span>
          <p class="info-strong">${esc(C.brand.legal)}</p>
          <p class="info-row">${ico('pin', 'ico ico-sm')}<span>${esc(C.brand.address.line1)}<br>${esc(C.brand.address.line2)}, ${esc(C.brand.address.line3)}</span></p>
          <p class="info-row">${ico('mail', 'ico ico-sm')}<span><a href="mailto:${C.brand.email}">${esc(C.brand.email)}</a><br><a href="mailto:${C.brand.supportEmail}">${esc(C.brand.supportEmail)}</a></span></p>
        </div>
        <div class="info-card">
          <span class="tag">${esc(C.contact.callHeading)}</span>
          <ul class="phone-list">${S.phoneRows()}</ul>
        </div>
        <div class="map">${S.mapsIframe(240)}</div>
      </div>
    </div>
  </div>
</section>`;

/* -------------------------------------------------------------- footer --- */
const footer = () => `
<footer class="footer">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="#home">
          <img src="../images/logo.png" alt="MechanicDesk logo" width="38" height="39">
          <span class="brand-name">Mechanic<em>Desk</em></span>
        </a>
        <p class="foot-about"><strong>${esc(C.brand.about.heading)}</strong><br>${esc(C.brand.about.body)}</p>
        ${S.socialLinks()}
      </div>
      ${C.navFull.map((g) => `
      <div class="foot-col">
        <p class="tag">${esc(g.label)}</p>
        <ul>${g.children.map((c) => `<li><a href="${c.href}"${c.href.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(c.label)}</a></li>`).join('')}</ul>
      </div>`).join('')}
      <div class="foot-col">
        <p class="tag">Contact</p>
        <ul>
          <li>${esc(C.brand.legal)}</li>
          <li>${esc(C.brand.address.oneLine)}</li>
          ${C.brand.phones.map((p) => `<li>${esc(p.label)}: <a href="tel:${p.number.replace(/[^0-9+]/g, '')}">${esc(p.number)}</a></li>`).join('')}
          <li><a href="mailto:${C.brand.email}">${esc(C.brand.email)}</a></li>
        </ul>
        <p class="tag mt">${esc(C.brand.apps.heading)}</p>
        ${S.appBadges()}
      </div>
    </div>
    <div class="foot-bottom">
      <p>${esc(C.brand.copyright)}</p>
      <p>Redesign concept 3 — “Torque” · demo build for review</p>
    </div>
  </div>
</footer>`;

module.exports = () => `<!DOCTYPE html>
<html lang="en">
<head>
${S.head({ fontLinks: FONTS, css: 'styles.css', concept: '3', conceptName: 'Torque — warm light, bold modern SaaS' })}
</head>
<body class="v3">
${S.watermark()}
${S.chrome()}
${S.conceptSwitch('v3')}
${navBar()}
<main>
${hero()}
${bento()}
${features()}
${suitable()}
${integrations()}
${proven()}
${pricing()}
${support()}
${blog()}
${ctaBlock()}
${contact()}
</main>
${footer()}
${S.pricingDataScript()}
<script src="script.js"></script>
</body>
</html>`;
