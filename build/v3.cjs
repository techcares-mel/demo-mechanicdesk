/* =========================================================================
   CONCEPT 3 — "TORQUE"
   Warm light, bold and friendly. Cream ground, Plus Jakarta display type,
   big soft shadows, orange panel behind the product tour, bento "why" grid,
   expandable feature cards, ink CTA block.
   Automotive dialect: WORKSHOP / TRADE — real photography does the work,
   plus a tread strip, one hazard chip, bolt-head bullets and tick rulers.
   Minimalist by disclosure: long copy sits behind click-to-open blocks.
   ========================================================================= */
const S = require('./shared.cjs');
const { esc, ico, icons, C, slug } = S;

const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">';

const n2 = (i) => String(i + 1).padStart(2, '0');
const INT_COUNT = C.integrations.categories.reduce((n, g) => n + g.items.length, 0);
const AU_PHONE = C.brand.phones[0].number;

const secHead = (label, title, sub, extra, mod) => `
<div class="sec-head${mod ? ' ' + mod : ''} reveal">
  <span class="tag">${esc(label)}</span>
  <h2>${title}</h2>
  ${sub ? `<p class="sec-sub">${esc(sub)}</p>` : ''}
  ${extra || ''}
</div>`;

/* Rounded hazard-tape chip — used twice on the page, never as a full band. */
const chip = () => '<span class="tape-chip" aria-hidden="true"></span>';

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
/* Wide composition: an editorial header band (headline left, deck right, then
   a full-width action bar) sits ABOVE the product tour, which runs the whole
   container width on the orange panel so the app capture is actually legible.
   Warm tag eyebrow, all-ink headline — no pill, no accent word. */
const hero = () => `
<section id="home" class="hero">
  <div class="wrap">
    <div class="hero-copy">
      <div class="hero-head">
        <span class="tag reveal">${esc(C.proven.sub)}</span>
        <h1 class="reveal d1">${esc(C.brand.product)}</h1>
      </div>
      <p class="hero-sub reveal d2">${esc(C.brand.heroSub)}</p>
      <div class="hero-bar reveal d3">
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="${C.brand.signup.url}">${esc(C.brand.cta)}</a>
          <a class="btn btn-soft btn-lg" href="#features">Explore features</a>
        </div>
        <ul class="hero-facts">
          ${[C.trustStrip[0], C.trustStrip[2], C.trustStrip[3]].map((t) => `<li>${icons.check}${esc(t)}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="hero-art reveal d2">
      <div class="hero-panel">
        ${S.productMock({ wide: true })}
        <span class="tread" aria-hidden="true"></span>
      </div>
    </div>
  </div>
</section>`;

/* --------------------------------------------------------- bento / why --- */
const bento = () => `
<section id="why" class="sec sec-why">
  <div class="wrap">
    ${secHead(C.pillars.eyebrow, esc(C.pillars.heading), C.pillars.sub)}
    <div class="bento">
      ${C.pillars.items.map((p, i) => `
      <article class="bento-card${i === 0 ? ' lead' : ''} reveal d${i + 1}">
        <div class="bento-ico">${ico(p.icon, 'ico')}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ features --- */
/* Expandable cards in a multi-column flow, so an expanded card pushes only
   its own column. <details name> keeps exactly ONE module open at a time;
   the bullet list inside sits behind a second expander. */
const features = () => `
<section id="features" class="sec sec-features">
  <div class="wrap">
    ${secHead(C.features.eyebrow, esc(C.features.heading), 'Open a module to see exactly what it does. One at a time, so the page stays quiet.')}
    <div class="fgrid">
      ${C.features.items.map((f, i) => `
      <details class="fcard reveal" name="mdmodule"${i === 0 ? ' open' : ''}>
        <summary class="fcard-head">
          <span class="fcard-ico">${ico(f.icon, 'ico')}</span>
          <span class="fcard-title"><em>${n2(i)}</em><strong>${esc(f.name)}</strong></span>
          <span class="fcard-plus">${icons.plus}</span>
        </summary>
        <div class="fcard-body">
          <p class="fcard-blurb">${esc(f.blurb)}</p>
          ${S.disclose({
            mod: 'fcard-more',
            label: 'Everything in ' + esc(f.name),
            meta: f.bullets.length + (f.bullets.length === 1 ? ' detail' : ' details'),
            body: `<ul class="bolt-list">${f.bullets.map((b) => `<li><i aria-hidden="true"></i><span>${esc(b)}</span></li>`).join('')}</ul>
              ${f.highlight ? `<div class="fcard-highlight"><span class="tag">Highlight</span><p>${esc(f.highlight)}</p></div>` : ''}`
          })}
          <a class="link-arrow sm" href="${f.link.url}" target="_blank" rel="noopener">${esc(f.link.label)}${icons.arrow}</a>
        </div>
      </details>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------- workshop band: suitable + stats --- */
/* One band, one photo: the five service-centre categories and the four
   numbers live together instead of stacking as two sections. */
const band = () => `
<section id="suitable" class="sec sec-band">
  <div class="wrap">
    <div class="band reveal">
      <div class="band-media" aria-hidden="true">
        <img src="../images/pexels/auto-workshop-wide.jpg" alt="" loading="lazy">
      </div>
      <div class="band-inner">
        <div class="band-head">
          ${chip()}
          <span class="tag">${esc(C.suitable.eyebrow)}</span>
          <h2>${esc(C.suitable.heading)}</h2>
        </div>
        <div class="band-types">
          ${C.suitable.items.map((s) => `
          <figure class="band-type">
            <div class="band-photo">
              <img src="../images/pexels/${s.file}" alt="${esc(s.title)}" loading="lazy">
              <figcaption>${esc(s.title)}</figcaption>
            </div>
          </figure>`).join('')}
        </div>
        <div class="band-stats">
          ${C.proven.stats.map((s) => `
          <div class="bstat">
            <strong data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</strong>
            <i class="stat-ruler" aria-hidden="true"></i>
            <span>${esc(s.label)}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------- integrations ---- */
/* Default view: the logo wall plus ONE expander. All 18 descriptions live in
   collapsed rows inside it. */
const integrations = () => `
<section id="integrations" class="sec sec-integrations">
  <div class="wrap">
    ${secHead(C.integrations.eyebrow, esc(C.integrations.heading), C.integrations.sub,
      `<a class="link-arrow" href="${C.integrations.moreUrl}" target="_blank" rel="noopener">${esc(C.integrations.moreLabel)}${icons.arrow}</a>`)}
    <div class="wall reveal">
      ${C.integrations.logos.map((l) => `
      <span class="wall-tile" title="${esc(l.name)}"><img src="../images/logos/${l.file}" alt="${esc(l.name)} integration" loading="lazy"></span>`).join('')}
    </div>
    ${S.disclose({
      mod: 'intx-all reveal',
      icon: 'obd',
      label: 'Browse all ' + INT_COUNT + ' integrations',
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
    <div class="cust-row">
      ${C.proven.customers.map((c, i) => `
      <figure class="cust-card reveal d${i + 1}">
        <div class="cust-photo"><img src="../images/proven/${c.file}" alt="${esc(c.name)}" loading="lazy"></div>
        <figcaption>${esc(c.name)}</figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------- pricing --- */
/* Card shows name, price, unit, included users, CTA. Everything else is
   behind "What's included"; both addons behind one expander. */
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
        <p class="plan-price"><span data-price-cell data-plan="${p.key}" data-field="cost">${esc(au[p.key].cost)}</span></p>
        <p class="plan-unit" data-month-unit>${esc(P.regions[0].monthUnit)}</p>
        <p class="plan-users">${ico('users', 'ico ico-sm')}<span>${esc(p.users)}</span></p>
        <a class="btn ${p.featured ? 'btn-white' : 'btn-soft'}" href="${P.signupUrl}">${esc(P.signupLabel)}</a>
        ${S.planIncludes(p)}
      </article>`).join('')}
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
    ${secHead(C.support.eyebrow, esc(C.support.heading), C.support.sub)}
    <div class="support-grid">
      ${C.support.items.map((s, i) => `
      <article class="support-card reveal d${i + 1}">
        <span class="support-num">${n2(i)}</span>
        <div class="support-ico">${ico(s.icon, 'ico')}</div>
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
<section id="blog" class="sec">
  <div class="wrap">
    ${secHead(C.blog.eyebrow, esc(C.blog.heading), null,
      `<a class="link-arrow" href="${C.brand.blogUrl}" target="_blank" rel="noopener">${esc(C.blog.moreLabel)}${icons.arrow}</a>`, 'link-beside')}
    <div class="blog-row">
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

/* ----------------------------------------------------------- cta block --- */
/* Ink block with the hands-on-engine photo — the second and last photo
   moment outside the category cards. */
const ctaBlock = () => `
<section id="cta" class="sec sec-cta">
  <div class="wrap">
    <div class="cta-ink reveal">
      <div class="cta-copy">
        ${chip()}
        <span class="tag">Get started</span>
        <h2>Set it up this morning.<br>Book jobs this afternoon.</h2>
        <p>${esc(C.pricing.trial)} · ${esc(C.trustStrip[0])} · ${esc(C.trustStrip[1])} · ${esc(C.pricing.support)}</p>
        <div class="cta-actions">
          <a class="btn btn-primary btn-lg" href="${C.brand.signup.url}">${esc(C.brand.cta)}</a>
          <a class="btn btn-outline btn-lg" href="tel:${AU_PHONE.replace(/[^0-9+]/g, '')}">${icons.phone}${esc(AU_PHONE)}</a>
        </div>
      </div>
      <div class="cta-photo"><img src="../images/pexels/auto-hands-wrench.jpg" alt="Mechanic at work in the workshop" loading="lazy"></div>
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
          ${S.phoneDisclosure()}
        </div>
        <div class="map">${S.mapsIframe(240)}</div>
      </div>
    </div>
  </div>
</section>`;

/* -------------------------------------------------------------- footer --- */
/* About us behind an expander; the address / phone block is not repeated
   here — the contact section above carries it. */
const footer = () => `
<footer class="footer">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="#home">
          <img src="../images/logo.png" alt="MechanicDesk logo" width="38" height="39">
          <span class="brand-name">Mechanic<em>Desk</em></span>
        </a>
        <p class="foot-line">${esc(C.brand.legal)}</p>
        ${S.socialLinks()}
        ${S.disclose({ mod: 'foot-about', label: esc(C.brand.about.heading), body: `<p>${esc(C.brand.about.body)}</p>` })}
      </div>
      ${C.navFull.map((g) => `
      <div class="foot-col">
        <p class="tag">${esc(g.label)}</p>
        <ul>${g.children.map((c) => `<li><a href="${c.href}"${c.href.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(c.label)}</a></li>`).join('')}</ul>
      </div>`).join('')}
      <div class="foot-col">
        <p class="tag">${esc(C.brand.apps.heading)}</p>
        ${S.appBadges()}
      </div>
    </div>
    <div class="foot-bottom">
      <p>${esc(C.brand.copyright)}</p>
      <p>Concept 3 “Torque” · demo build · app screens from MechanicDesk tutorials · workshop photography: Pexels</p>
    </div>
  </div>
</footer>`;

module.exports = () => `<!DOCTYPE html>
<html lang="en">
<head>
${S.head({ fontLinks: FONTS, css: 'styles.css', concept: '3', conceptName: 'Torque — warm light, bold workshop' })}
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
${band()}
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
