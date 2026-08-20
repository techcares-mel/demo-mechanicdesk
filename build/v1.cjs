/* =========================================================================
   CONCEPT 1 — "BLUEPRINT"
   Light, technical, editorial. Hairline grid, mono spec labels, numbered
   sections, table-based pricing, sticky feature index. Minimal use of orange.
   ========================================================================= */
const S = require('./shared.cjs');
const { esc, ico, icons, C, slug } = S;

const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">';

const n2 = (i) => String(i + 1).padStart(2, '0');

const secHead = (num, label, title, sub, extra) => `
<div class="sec-head reveal">
  <div class="sec-label"><span class="num">${num}</span><span>${esc(label)}</span></div>
  <div class="sec-intro">
    <h2>${title}</h2>
    ${sub ? `<p>${esc(sub)}</p>` : ''}
    ${extra || ''}
  </div>
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
      <button class="burger" data-menu-open aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
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
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="mono-label reveal">${esc(C.brand.name)} <span class="dot"></span> Melbourne, Australia</p>
      <h1 class="reveal d1">${esc(C.brand.product)}</h1>
      <p class="hero-lead reveal d2">${esc(C.brand.heroLead)}</p>
      <p class="hero-sub reveal d3">${esc(C.brand.heroSub)}</p>
      <div class="hero-cta reveal d4">
        <a class="btn btn-primary" href="${C.brand.signup.url}">${esc(C.brand.cta)}</a>
        <a class="btn btn-ghost" href="#support">Support &amp; demo</a>
      </div>
      <ul class="spec-strip reveal d4">
        ${C.trustStrip.map((t) => `<li>${icons.check}${esc(t)}</li>`).join('')}
      </ul>
    </div>
    <figure class="hero-figure reveal d2">
      <div class="frame">
        <span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span>
        <img src="../images/app-presentation.png" alt="MechanicDesk workshop management software on desktop and mobile" loading="eager">
      </div>
      <figcaption class="mono-label">Fig. 01 — Job list, unpaid invoices &amp; mobile diary</figcaption>
    </figure>
  </div>
</section>`;

/* ------------------------------------------------------------ pillars ---- */
const pillars = () => `
<section id="why" class="sec sec-pillars">
  <div class="wrap">
    ${secHead('01', C.pillars.eyebrow, esc(C.pillars.heading), C.pillars.sub)}
    <div class="pillars">
      ${C.pillars.items.map((p, i) => `
      <article class="pillar reveal d${i + 1}">
        <div class="pillar-top"><span class="mono-label">${n2(i)}</span>${ico(p.icon, 'ico ico-accent')}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------- integrations ---- */
const integrations = () => `
<section id="integrations" class="sec sec-integrations">
  <div class="wrap">
    ${secHead('02', C.integrations.eyebrow, esc(C.integrations.heading), C.integrations.sub,
      `<p class="sec-body">${esc(C.integrations.intro)}</p>
       <a class="link-arrow" href="${C.integrations.moreUrl}" target="_blank" rel="noopener">${esc(C.integrations.moreLabel)}${icons.arrow}</a>`)}
    <div class="logo-grid reveal">
      ${C.integrations.logos.map((l) => `
      <div class="logo-cell" title="${esc(l.name)}">
        <img src="../images/logos/${l.file}" alt="${esc(l.name)} integration" loading="lazy">
      </div>`).join('')}
    </div>
    <div class="cat-bar reveal">
      <button class="chip active" data-cat="all">All</button>
      ${C.integrations.categories.map((g) => `<button class="chip" data-cat="${slug(g.name)}">${esc(g.name)}</button>`).join('')}
    </div>
    <div class="int-groups">
      ${C.integrations.categories.map((g) => `
      <div class="int-group" data-cat-group="${slug(g.name)}">
        <p class="mono-label group-label">${esc(g.name)}</p>
        <div class="int-rows">
          ${g.items.map((it) => `
          <article class="int-row reveal">
            <div class="int-logo">${it.file ? `<img src="../images/logos/${it.file}" alt="${esc(it.name)} logo" loading="lazy">` : `<span class="int-logo-text">${esc(it.name.split(' ')[0])}</span>`}</div>
            <div class="int-body">
              <h4>${esc(it.name)}</h4>
              ${it.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
            </div>
            <div class="int-link">${it.url ? `<a href="${it.url}" target="_blank" rel="noopener">${esc(it.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}${icons.arrow}</a>` : ''}</div>
          </article>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ suitable --- */
const suitable = () => `
<section id="suitable" class="sec sec-suitable">
  <div class="wrap">
    ${secHead('03', C.suitable.eyebrow, esc(C.suitable.heading))}
    <div class="suit-grid">
      ${C.suitable.items.map((s, i) => `
      <article class="suit-cell reveal d${(i % 4) + 1}">
        <span class="mono-label">${n2(i)}</span>
        <div class="suit-img"><img src="../images/suitable/${s.file}" alt="${esc(s.title)}" loading="lazy"></div>
        <h3>${esc(s.title)}</h3>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* -------------------------------------------------------------- proven --- */
const proven = () => `
<section id="proven" class="sec sec-proven">
  <div class="wrap">
    ${secHead('04', C.proven.eyebrow, esc(C.proven.heading), C.proven.sub,
      `<p class="sec-body">${esc(C.proven.note)}</p>
       <a class="link-arrow" href="${C.proven.moreUrl}" target="_blank" rel="noopener">${esc(C.proven.moreLabel)}${icons.arrow}</a>`)}
    <div class="stat-row reveal">
      ${C.proven.stats.map((s) => `
      <div class="stat">
        <strong data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</strong>
        <span>${esc(s.label)}</span>
      </div>`).join('')}
    </div>
    <div class="cust-grid">
      ${C.proven.customers.map((c, i) => `
      <figure class="cust-cell reveal d${i + 1}">
        <img src="../images/proven/${c.file}" alt="${esc(c.name)}" loading="lazy">
        <figcaption>${esc(c.name)}</figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ features --- */
const features = () => `
<section id="features" class="sec sec-features">
  <div class="wrap">
    ${secHead('05', C.features.eyebrow, esc(C.features.heading))}
    <div class="feat-wrap reveal">
      <div class="feat-index" role="tablist" aria-label="Features">
        ${C.features.items.map((f, i) => `
        <button class="feat-tab${i === 0 ? ' active' : ''}" role="tab" data-feature-tab="${slug(f.name)}"
                aria-selected="${i === 0 ? 'true' : 'false'}">
          <span class="mono-label">${n2(i)}</span>
          <span class="feat-tab-name">${esc(f.name)}</span>
          ${icons.arrow}
        </button>`).join('')}
      </div>
      <div class="feat-panels">
        ${C.features.items.map((f, i) => `
        <article class="feat-panel${i === 0 ? ' active' : ''}" data-feature-panel="${slug(f.name)}" role="tabpanel">
          <div class="feat-panel-head">
            ${ico(f.icon, 'ico ico-accent ico-lg')}
            <div>
              <p class="mono-label">Feature ${n2(i)} / 12</p>
              <h3>${esc(f.name)}</h3>
            </div>
          </div>
          <p class="feat-blurb">${esc(f.blurb)}</p>
          <ul class="feat-list">
            ${f.bullets.map((b) => `<li>${icons.check}<span>${esc(b)}</span></li>`).join('')}
          </ul>
          ${f.highlight ? `<div class="feat-highlight"><span class="mono-label">Highlight</span><p>${esc(f.highlight)}</p></div>` : ''}
          <a class="link-arrow" href="${f.link.url}" target="_blank" rel="noopener">${esc(f.link.label)}${icons.arrow}</a>
        </article>`).join('')}
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------- pricing --- */
const pricing = () => {
  const P = C.pricing;
  const au = P.data.australia;
  const rows = [
    { label: 'Monthly price', field: 'cost', big: true },
    { label: 'Included users', field: 'users' },
    { label: 'Extra user / month', field: 'costPerExtraUser' },
    { label: 'SMS', field: 'costPerSms' },
    { label: 'Stock items', field: 'stockCountLimit' }
  ];
  return `
<section id="pricing" class="sec sec-pricing">
  <div class="wrap">
    ${secHead('06', P.eyebrow, esc(P.heading), null,
      `<div class="region-bar">
        ${P.regions.map((r, i) => `<button class="chip${i === 0 ? ' active' : ''}" data-region="${r.key}">${esc(r.name)}</button>`).join('')}
        <select id="regionSelect" class="region-select" aria-label="Select region">
          ${P.regions.map((r) => `<option value="${r.key}">${esc(r.name)}</option>`).join('')}
        </select>
      </div>`)}
    <div class="table-scroll reveal">
      <table class="price-table">
        <thead>
          <tr>
            <th><span class="mono-label nowrap">Plan <span data-region-name>Australia</span></span></th>
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
              <a class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'} btn-sm" href="${P.signupUrl}">${esc(P.signupLabel)}</a>
            </td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>
    <div class="addons reveal">
      <div class="addons-head">
        <h3>${esc(P.addons.heading)}</h3>
        <p class="mono-label">${esc(P.addons.note)}</p>
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
    ${secHead('07', C.support.eyebrow, esc(C.support.heading), C.support.sub,
      `<p class="sec-body">${esc(C.support.tutorialsNote)}</p>`)}
    <div class="support-grid">
      ${C.support.items.map((s, i) => `
      <article class="support-cell reveal d${i + 1}">
        <div class="support-top"><span class="mono-label">${n2(i)}</span>${ico(s.icon, 'ico ico-accent')}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        ${s.phones ? `<ul class="phone-list">${S.phoneRows()}</ul>` : ''}
        ${s.action ? `<a class="link-arrow" href="${s.action.url}"${s.action.url.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(s.action.label)}${icons.arrow}</a>` : ''}
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ---------------------------------------------------------------- blog --- */
const blog = () => `
<section id="blog" class="sec sec-blog">
  <div class="wrap">
    ${secHead('08', C.blog.eyebrow, esc(C.blog.heading))}
    <div class="blog-grid">
      ${C.blog.posts.map((p, i) => `
      <article class="blog-cell reveal d${i + 1}">
        <a class="blog-img" href="${p.url}" target="_blank" rel="noopener">
          <img src="../images/blog/${p.file}" alt="${esc(p.title)}" loading="lazy">
        </a>
        <div class="blog-body">
          <h3><a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
          <p>${esc(p.excerpt)}</p>
          <a class="link-arrow" href="${p.url}" target="_blank" rel="noopener">${esc(C.blog.moreLabel)}${icons.arrow}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------- contact --- */
const contact = () => `
<section id="contact" class="sec sec-contact">
  <div class="wrap">
    ${secHead('09', C.contact.eyebrow, esc(C.contact.heading), C.contact.sub)}
    <div class="contact-grid">
      <div class="contact-info reveal">
        <div class="info-block">
          <p class="mono-label">${esc(C.contact.reachHeading)}</p>
          <p class="info-strong">${esc(C.brand.legal)}</p>
          <p>${esc(C.brand.address.line1)}<br>${esc(C.brand.address.line2)}<br>${esc(C.brand.address.line3)}</p>
        </div>
        <div class="info-block">
          <p class="mono-label">${esc(C.contact.callHeading)}</p>
          <ul class="phone-list">${S.phoneRows()}</ul>
        </div>
        <div class="info-block">
          <p class="mono-label">Email</p>
          <p><a href="mailto:${C.brand.email}">${esc(C.brand.email)}</a><br>
             <a href="mailto:${C.brand.supportEmail}">${esc(C.brand.supportEmail)}</a></p>
        </div>
        <div class="map">${S.mapsIframe(280)}</div>
      </div>
      <div class="contact-form reveal d2">${S.contactForm()}</div>
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
          <img src="../images/logo.png" alt="MechanicDesk logo" width="40" height="41">
          <span class="brand-name">Mechanic<em>Desk</em></span>
        </a>
        <p class="foot-about"><strong>${esc(C.brand.about.heading)}</strong><br>${esc(C.brand.about.body)}</p>
        ${S.socialLinks()}
      </div>
      ${C.navFull.map((g) => `
      <div class="foot-col">
        <p class="mono-label">${esc(g.label)}</p>
        <ul>${g.children.map((c) => `<li><a href="${c.href}"${c.href.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(c.label)}</a></li>`).join('')}</ul>
      </div>`).join('')}
      <div class="foot-col">
        <p class="mono-label">Contact</p>
        <ul>
          <li>${esc(C.brand.legal)}</li>
          <li>${esc(C.brand.address.oneLine)}</li>
          ${C.brand.phones.map((p) => `<li>${esc(p.label)}: <a href="tel:${p.number.replace(/[^0-9+]/g, '')}">${esc(p.number)}</a></li>`).join('')}
          <li><a href="mailto:${C.brand.email}">${esc(C.brand.email)}</a></li>
        </ul>
        <p class="mono-label mt">${esc(C.brand.apps.heading)}</p>
        ${S.appBadges()}
      </div>
    </div>
    <div class="foot-bottom">
      <p>${esc(C.brand.copyright)}</p>
      <p class="foot-demo">Redesign concept 1 — “Blueprint” · demo build for review</p>
    </div>
  </div>
</footer>`;

module.exports = () => `<!DOCTYPE html>
<html lang="en">
<head>
${S.head({ fontLinks: FONTS, css: 'styles.css', concept: '1', conceptName: 'Blueprint — light technical editorial' })}
</head>
<body class="v1">
${S.watermark()}
${S.chrome()}
${S.conceptSwitch('v1')}
${navBar()}
<main>
${hero()}
${pillars()}
${integrations()}
${suitable()}
${proven()}
${features()}
${pricing()}
${support()}
${blog()}
${contact()}
</main>
${footer()}
${S.pricingDataScript()}
<script src="script.js"></script>
</body>
</html>`;
