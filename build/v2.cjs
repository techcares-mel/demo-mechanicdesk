/* =========================================================================
   MECHANICDESK — "GRAPHITE" (the chosen design, rendered as the site root)
   Dark, precision-engineered. Graphite surfaces, orange as a signal light.
   Automotive cues: hazard tape, carbon weave, tyre-tread edge, spec plates.
   Few borders, few boxes; long copy sits behind click-to-open blocks.
   ========================================================================= */
const S = require('./shared.cjs');
const board = require('./lab2-board.cjs');
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
      ${S.productMock({ badge: false })}
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
    <div class="bay-gap" aria-hidden="true"></div>
  </div>
</section>`;

/* ------------------------------------------------------------ features --- */
/* Twelve square tiles. The detail used to unfold in a panel under the grid,
   which pushed the page around; it now opens in a modal, so the grid stays put
   and the reading happens over the top of it. Bodies are rendered once into a
   hidden well and cloned in on click (app.js 9b). */
const features = () => `
<section id="features" class="sec sec-features">
  <div class="wrap">
    ${secHead(C.features.eyebrow, esc(C.features.heading), null, null, 'centered')}
    <div class="feat-grid">
      ${C.features.items.map((f, i) => `
      <button class="feat-tile reveal d${(i % 4) + 1}" data-feat-tile="${slug(f.name)}"
              aria-haspopup="dialog" aria-label="${esc(f.name)} — read what it covers">
        <span class="feat-tile-top">
          <span class="feat-tile-no">${n2(i)}</span>
          <span class="feat-tile-go">${icons.plus}</span>
        </span>
        <span class="feat-tile-ico">${ico(f.icon, 'ico')}</span>
        <span class="feat-tile-name">${esc(f.name)}</span>
      </button>`).join('')}
    </div>

    <div class="feat-bodies" hidden>
      ${C.features.items.map((f, i) => `
      <div data-feat-body="${slug(f.name)}">
        <div class="feat-plate">
          <span class="feat-plate-no">MODULE ${n2(i)}/12</span>
          <span class="feat-plate-bolt">${icons.bolt}</span>
        </div>
        <div class="feat-head">
          <div class="feat-head-ico">${ico(f.icon, 'ico')}</div>
          <h3>${esc(f.name)}</h3>
        </div>
        <p class="feat-blurb">${esc(f.blurb)}</p>
        <ul class="feat-list">${f.bullets.map((bl) => `<li>${icons.check}<span>${esc(bl)}</span></li>`).join('')}</ul>
        ${f.highlight ? `<div class="feat-highlight"><span class="eyebrow">Highlight</span><p>${esc(f.highlight)}</p></div>` : ''}
        <a class="link-arrow" href="${f.link.url}" target="_blank" rel="noopener">${esc(f.link.label)}${icons.arrow}</a>
      </div>`).join('')}
    </div>

    <dialog class="feat-modal" id="featModal" aria-label="Feature detail">
      <div class="feat-modal-in">
        <button class="feat-modal-x" data-feat-close aria-label="Close">&times;</button>
        <div data-feat-slot></div>
      </div>
    </dialog>
  </div>
</section>`;

/* ------------------------------------------------------- integrations ---- */
/* The circuit board: the eighteen partners wired to each other on two buses
   around the MechanicDesk chip, with light running the traces and a link
   between every partner in the same category. Geometry, layout solving and
   CSS all live in build/lab2-board.cjs (shared with the idea lab); this page
   asks for root-relative assets and the data-brd-* hook that app.js 8c uses
   to light a partner and its category when you tap it. No detail panel: the
   board is the whole point of the section. */
const circuit = () => {
  const items = [];
  C.integrations.categories.forEach((g) => g.items.forEach((it) => items.push({ ...it, cat: g.name })));
  const mark = (it, cls, area) => {
    if (!it.file) return `<em class="${cls} is-text">${esc(it.name.split(' ')[0])}</em>`;
    return `<img class="${cls}" src="${alphaLogo(it.file)}" alt="" loading="lazy"
      style="--h:${markSize(it.file, area, 20, 72).h}px">`;
  };

  return `
<section id="integrations" class="sec sec-integrations">
  <div class="wrap">
    ${secHead(C.integrations.eyebrow, esc(C.integrations.heading), null,
      `<p class="sec-sub">${esc(C.integrations.sub)}
        <a class="link-arrow sm" href="${C.integrations.moreUrl}" target="_blank" rel="noopener">${esc(C.integrations.moreLabel)}${icons.arrow}</a></p>`,
      'centered')}
    <div class="int-board reveal">
      <p class="int-hint">All ${items.length} partners</p>
      ${board.html({ prefix: '', attr: 'data-brd-node' })}
    </div>
  </div>
</section>`;
};

/* -------------------------------------------------------------- proven --- */
/* "Proven. Loved. Relied on." — the real reviews from their own testimonials
   carousel: three on the page, six more behind a button, and a link out to the
   full set. */
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
</head>
<body class="v2">
${S.watermark()}
${S.chrome()}
${navBar()}
<main>
${hero()}
${pillars()}
${circuit()}
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
