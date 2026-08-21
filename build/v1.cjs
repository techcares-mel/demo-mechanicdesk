/* =========================================================================
   CONCEPT 1 — "BLUEPRINT"
   Light engineering document. Hairline rules, IBM Plex Mono spec labels,
   Archivo headings, sharp 3px corners, numbered sections 01-09.
   Automotive dialect: technical drawing — dimension lines with tick ends,
   hex-bolt corner marks, tyre-tread hairline dividers, gauge tick rulers.
   Hero: two columns — copy left, product tour on a drawing sheet right.
   Long reference copy (integrations, addons, phone lists) folds away.
   ========================================================================= */
const S = require('./shared.cjs');
const { esc, ico, icons, C, slug } = S;

const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">';

const n2 = (i) => String(i + 1).padStart(2, '0');
const intCount = C.integrations.categories.reduce((n, g) => n + g.items.length, 0);

/* automotive detailing ---------------------------------------------------- */
const tread = () => '<div class="tread" aria-hidden="true"></div>';
const bolts = () => ['tl', 'tr', 'bl', 'br']
  .map((p) => `<span class="bolt bolt-${p}" aria-hidden="true">${icons.bolt}</span>`).join('');
const dimX = (label) => `
<div class="dim dim-x" aria-hidden="true">
  <i class="dim-rule"></i><span class="dim-label">${esc(label)}</span><i class="dim-rule"></i>
</div>`;

/* section header — the editorial spine of this concept -------------------- */
const secHead = (num, label, title, sub, extra) => `
<div class="sec-head reveal">
  <div class="sec-label"><span class="num">${num}</span><span>${esc(label)}</span></div>
  <div class="sec-intro">
    <h2>${title}</h2>
    ${sub ? `<p class="sec-sub">${esc(sub)}</p>` : ''}
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
/* Two columns, vertically centred: the title block, one sub line, 2 CTAs and
   the four trust chips on the left; on the right the product tour on a drawing
   sheet that bleeds toward the viewport edge so the window stays as large as
   the composition allows. Phone hangs below the window, badge on the frame.  */
const hero = () => `
<section id="home" class="hero">
  <div class="grid-bg" aria-hidden="true"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="doc-tag reveal">${esc(C.brand.name)}<span class="dot"></span>${esc(C.brand.address.line2)}, Australia</p>
      <h1 class="reveal d1">${esc(C.brand.product)}</h1>
      <p class="hero-sub reveal d2">${esc(C.brand.heroSub)}</p>
      <div class="hero-cta reveal d3">
        <a class="btn btn-primary btn-lg" href="${C.brand.signup.url}">${esc(C.brand.cta)}</a>
        <a class="btn btn-ghost btn-lg" href="#support">${esc(C.support.items[2].action.label)}</a>
      </div>
      <ul class="spec-strip reveal d4">
        ${C.trustStrip.map((t) => `<li>${icons.check}<span>${esc(t)}</span></li>`).join('')}
      </ul>
    </div>
    <div class="hero-art reveal d2">
      <div class="art-sheet">
        ${bolts()}
        ${dimX('Product tour · ' + C.productTour.slides.length + ' app screens')}
        ${S.productMock({})}
        <p class="art-block"><span class="ab-no">Fig. 01</span><span class="ab-txt">Real screens from the MechanicDesk app</span></p>
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------ 01  pillars ------ */
const pillars = () => `
<section id="why" class="sec sec-pillars">
  <div class="wrap">
    ${secHead('01', C.pillars.eyebrow, esc(C.pillars.heading))}
    <div class="pillars">
      ${C.pillars.items.map((p, i) => `
      <article class="pillar reveal d${i + 1}">
        <div class="pillar-top">${ico(p.icon, 'ico ico-hair')}<span class="mono-label">${n2(i)}</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------ 02  features ---- */
/* Sticky index on the left; the open module on the right — mark, name, one
   blurb, the highlight, then the specification behind its own expander.   */
const features = () => `
<section id="features" class="sec sec-features">
  <div class="wrap">
    ${secHead('02', C.features.eyebrow, esc(C.features.heading))}
    <div class="feat-wrap reveal">
      <div class="feat-index" role="tablist" aria-label="Features">
        ${C.features.items.map((f, i) => `
        <button class="feat-tab${i === 0 ? ' active' : ''}" role="tab" data-feature-tab="${slug(f.name)}"
                aria-selected="${i === 0 ? 'true' : 'false'}">
          <span class="mono-label">${n2(i)}</span>
          ${ico(f.icon, 'ico ico-hair ico-sm')}
          <span class="feat-tab-name">${esc(f.name)}</span>
        </button>`).join('')}
      </div>
      <div class="feat-panels">
        ${C.features.items.map((f, i) => `
        <article class="feat-panel${i === 0 ? ' active' : ''}" data-feature-panel="${slug(f.name)}" role="tabpanel">
          <div class="plate">
            <span class="plate-no">Module ${n2(i)} <span class="sep">/</span> 12</span>
            <span class="plate-bolt">${icons.bolt}</span>
          </div>
          <div class="fp-body">
            <span class="fp-mark" aria-hidden="true">${icons[f.icon] || ''}</span>
            <h3>${esc(f.name)}</h3>
            <p class="feat-blurb">${esc(f.blurb)}</p>
            ${f.highlight ? `<div class="feat-highlight"><span class="mono-label">Highlight</span><p>${esc(f.highlight)}</p></div>` : ''}
            ${S.disclose({
              mod: 'fp-spec',
              label: 'Full specification',
              meta: f.bullets.length + ' spec points',
              body: `<ul class="feat-list">${f.bullets.map((b) => `<li>${icons.check}<span>${esc(b)}</span></li>`).join('')}</ul>`
            })}
            <a class="link-arrow" href="${f.link.url}" target="_blank" rel="noopener">${esc(f.link.label)}${icons.arrow}</a>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </div>
</section>`;

/* ---------------------------------------- 03  suitable for + the numbers - */
/* One band: the establishing workshop photograph, the five service-centre
   categories as hairline photo cards, and the four figures on a gauge scale. */
const bay = () => `
<section id="suitable" class="sec-bay">
  <div class="bay-grid" aria-hidden="true"></div>
  ${tread()}
  <div class="wrap bay-inner">
    <div class="sec-head reveal">
      <div class="sec-label"><span class="num">03</span><span>${esc(C.suitable.eyebrow)}</span></div>
      <div class="sec-intro"><h2>${esc(C.suitable.heading)}</h2></div>
    </div>
    <div class="bay-types">
      ${C.suitable.items.map((s, i) => `
      <article class="bay-type reveal d${(i % 4) + 1}">
        <div class="bay-type-img"><img src="../images/pexels/${s.file}" alt="${esc(s.title)}" loading="lazy"></div>
        <h3>${esc(s.title)}</h3>
        <span class="mono-label">${n2(i)}</span>
      </article>`).join('')}
    </div>
    <div class="bay-stats reveal">
      ${C.proven.stats.map((s) => `
      <div class="stat">
        <strong data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</strong>
        <i class="stat-ticks" aria-hidden="true"></i>
        <span>${esc(s.label)}</span>
      </div>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------- 04  integrations ----- */
/* Default view is the logo wall plus one expander. All 18 descriptions live
   inside collapsed rows behind it.                                         */
const integrations = () => `
<section id="integrations" class="sec sec-integrations">
  <div class="wrap">
    ${secHead('04', C.integrations.eyebrow, esc(C.integrations.heading), C.integrations.sub,
      `<a class="link-arrow" href="${C.integrations.moreUrl}" target="_blank" rel="noopener">${esc(C.integrations.moreLabel)}${icons.arrow}</a>`)}
    <div class="logo-wall reveal">
      ${C.integrations.logos.map((l) => `
      <div class="logo-cell" title="${esc(l.name)}">
        <img src="../images/logos/${l.file}" alt="${esc(l.name)} integration" loading="lazy">
      </div>`).join('')}
    </div>
    ${S.disclose({
      mod: 'intx-all reveal',
      icon: 'obd',
      label: 'Browse all ' + intCount + ' integrations',
      meta: C.integrations.categories.length + ' categories',
      body: `<p class="intx-intro">${esc(C.integrations.intro)}</p>
        <div class="cat-bar">
          <button class="chip active" data-cat="all">All</button>
          ${C.integrations.categories.map((g) => `<button class="chip" data-cat="${slug(g.name)}">${esc(g.name)}</button>`).join('')}
        </div>
        ${S.integrationList()}`
    })}
  </div>
</section>`;

/* ------------------------------------------------------- 05  proven ----- */
const proven = () => `
<section id="proven" class="sec sec-proven">
  <div class="wrap">
    ${secHead('05', C.proven.eyebrow, esc(C.proven.heading), null,
      `<a class="link-arrow" href="${C.proven.moreUrl}" target="_blank" rel="noopener">${esc(C.proven.moreLabel)}${icons.arrow}</a>`)}
    <div class="cust-grid">
      ${C.proven.customers.map((c, i) => `
      <figure class="cust-cell reveal d${i + 1}">
        <img src="../images/proven/${c.file}" alt="${esc(c.name)}" loading="lazy">
        <figcaption>${esc(c.name)}</figcaption>
      </figure>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------ 06  pricing ----- */
/* The one concept where a comparison table is the right answer. Rows that are
   identical for every plan (trial, support) are stated once underneath, and
   the addons fold away.                                                    */
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
            <th><span class="plate-no nowrap">PLAN <span class="sep">&middot;</span> <span data-region-name>Australia</span></span></th>
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
          <tr class="row-cta">
            <th scope="row"></th>
            ${P.plans.map((p) => `<td class="${p.featured ? 'featured' : ''}">
              <a class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'} btn-sm" href="${P.signupUrl}">${esc(P.signupLabel)}</a>
            </td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>
    <p class="price-foot reveal">${icons.check}<span>${esc(P.trial)} on every plan</span><span class="dash"></span><span>${esc(P.support)}</span></p>
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

/* ------------------------------------------------------ 07  support ----- */
const support = () => `
<section id="support" class="sec sec-support">
  <div class="wrap">
    ${secHead('07', C.support.eyebrow, esc(C.support.heading))}
    <div class="support-grid">
      ${C.support.items.map((s, i) => `
      <article class="support-cell reveal d${i + 1}">
        <div class="support-top">${ico(s.icon, 'ico ico-hair')}<span class="mono-label">${n2(i)}</span></div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        ${s.phones ? S.phoneDisclosure() : ''}
        ${s.action ? `<a class="link-arrow" href="${s.action.url}"${s.action.url.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(s.action.label)}${icons.arrow}</a>` : ''}
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* --------------------------------------------------------- 08  blog ----- */
const blog = () => `
<section id="blog" class="sec sec-blog">
  <div class="wrap">
    ${secHead('08', C.blog.eyebrow, esc(C.blog.heading))}
    <div class="blog-grid">
      ${C.blog.posts.map((p, i) => `
      <article class="blog-cell reveal d${i + 1}">
        <a class="blog-img" href="${p.url}" target="_blank" rel="noopener">
          <img src="../images/pexels/${p.file}" alt="${esc(p.title)}" loading="lazy">
        </a>
        <div class="blog-body">
          <h3><a href="${p.url}" target="_blank" rel="noopener">${esc(p.title)}</a></h3>
          <a class="link-arrow" href="${p.url}" target="_blank" rel="noopener">${esc(C.blog.moreLabel)}${icons.arrow}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------ cta band --- */
/* Title-block panel: the one place the trial offer is restated in full.   */
const ctaBand = () => {
  const au = C.brand.phones[0];
  return `
<section id="cta" class="sec sec-cta">
  <div class="wrap">
    <div class="cta-sheet reveal">
      ${bolts()}
      <div class="cta-copy">
        <p class="mono-label">Get started</p>
        <h2>${esc(C.brand.cta)}</h2>
        <ul class="cta-specs">
          <li>${icons.check}<span>${esc(C.pricing.trial)}</span></li>
          <li>${icons.check}<span>${esc(C.trustStrip[0])}</span></li>
          <li>${icons.check}<span>${esc(C.pricing.support)}</span></li>
        </ul>
      </div>
      <div class="cta-actions">
        <a class="btn btn-primary btn-lg" href="${C.brand.signup.url}">${esc(C.brand.signup.label)}</a>
        <a class="btn btn-ghost btn-lg" href="tel:${au.number.replace(/[^0-9+]/g, '')}">${icons.phone}Call ${esc(au.number)}</a>
      </div>
    </div>
  </div>
</section>`;
};

/* ------------------------------------------------------ 09  contact ----- */
const contact = () => `
<section id="contact" class="sec sec-contact">
  <div class="wrap">
    ${secHead('09', C.contact.eyebrow, esc(C.contact.heading))}
    <div class="contact-grid">
      <div class="contact-info reveal">
        <div class="info-block">
          <p class="mono-label">${esc(C.contact.reachHeading)}</p>
          <p class="info-strong">${esc(C.brand.legal)}</p>
          <p>${esc(C.brand.address.line1)}<br>${esc(C.brand.address.line2)}<br>${esc(C.brand.address.line3)}</p>
          <p class="info-mail"><a href="mailto:${C.brand.email}">${esc(C.brand.email)}</a><br>
             <a href="mailto:${C.brand.supportEmail}">${esc(C.brand.supportEmail)}</a></p>
        </div>
        ${S.phoneDisclosure()}
        <div class="map">${S.mapsIframe(260)}</div>
      </div>
      <div class="contact-form reveal d2">${S.contactForm()}</div>
    </div>
  </div>
</section>`;

/* -------------------------------------------------------------- footer --- */
const footer = () => `
<footer class="footer">
  ${tread()}
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="#home">
          <img src="../images/logo.png" alt="MechanicDesk logo" width="40" height="41">
          <span class="brand-name">Mechanic<em>Desk</em></span>
        </a>
        <p class="foot-line">${esc(C.brand.legal)}</p>
        ${S.socialLinks()}
        ${S.disclose({ mod: 'foot-about', label: esc(C.brand.about.heading), body: `<p>${esc(C.brand.about.body)}</p>` })}
      </div>
      ${C.navFull.map((g) => `
      <div class="foot-col">
        <p class="mono-label">${esc(g.label)}</p>
        <ul>${g.children.map((c) => `<li><a href="${c.href}"${c.href.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(c.label)}</a></li>`).join('')}</ul>
      </div>`).join('')}
      <div class="foot-col">
        <p class="mono-label">${esc(C.brand.apps.heading)}</p>
        ${S.appBadges()}
      </div>
    </div>
    <div class="foot-bottom">
      <p>${esc(C.brand.copyright)}</p>
      <p class="foot-demo">Concept 1 &ldquo;Blueprint&rdquo; &middot; demo build &middot; app screens from MechanicDesk tutorials &middot; workshop photography: Pexels</p>
    </div>
  </div>
</footer>`;

module.exports = () => `<!DOCTYPE html>
<html lang="en">
<head>
${S.head({ fontLinks: FONTS, css: 'styles.css', concept: '1', conceptName: 'Blueprint — light technical drawing' })}
</head>
<body class="v1">
${S.watermark()}
${S.chrome()}
${S.conceptSwitch('v1')}
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
