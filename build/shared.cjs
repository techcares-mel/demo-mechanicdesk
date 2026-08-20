/* Shared HTML fragment helpers used by the three concept templates. */
const fs = require('fs');
const path = require('path');
const { icons } = require('./icons.cjs');
const C = require('./content.cjs');

/* Assets live in MechanicDesk/images; concepts reference them as ../images/... */
const IMG_DIR = path.resolve(__dirname, '..', 'images');
const hasImage = (rel) => fs.existsSync(path.join(IMG_DIR, rel));

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const ico = (name, cls) => '<span class="' + (cls || 'ico') + '" aria-hidden="true">' + (icons[name] || '') + '</span>';

const mapsIframe = (h) => '<iframe title="MechanicDesk head office on Google Maps" src="https://maps.google.com/maps?q=' +
  encodeURIComponent(C.brand.address.oneLine) + '&output=embed" width="100%" height="' + (h || 300) +
  '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="border:0;"></iframe>';

const watermark = () => '<div class="demo-watermark" aria-hidden="true">DEMO</div>';

const chrome = () => [
  '<div id="scrollProgress" aria-hidden="true"></div>',
  '<button id="backToTop" aria-label="Back to top">' + icons.arrow + '</button>'
].join('\n');

/* Contact form — identical fields/labels in all concepts, styled per concept. */
const contactForm = () => `
<form class="cf" data-contact-form novalidate>
  <div class="cf-row">
    <label class="cf-field">
      <span class="cf-label">Name</span>
      <input type="text" name="name" autocomplete="name" placeholder="Your name">
    </label>
    <label class="cf-field">
      <span class="cf-label">Email <em>*</em></span>
      <input type="email" name="email" required autocomplete="email" placeholder="you@workshop.com.au">
    </label>
  </div>
  <label class="cf-field">
    <span class="cf-label">Phone</span>
    <input type="tel" name="phone" autocomplete="tel" placeholder="Phone number">
  </label>
  <label class="cf-field">
    <span class="cf-label">Message <em>*</em></span>
    <textarea name="message" rows="5" required placeholder="Tell us about your workshop"></textarea>
  </label>
  <button type="submit" class="btn btn-primary cf-submit">${esc(C.contact.submit)}</button>
  <p class="cf-note">Demo form — no message is actually sent.</p>
</form>`;

const pricingDataScript = () => {
  const out = {};
  C.pricing.regions.forEach((r) => {
    out[r.key] = Object.assign({ name: r.name, monthUnit: r.monthUnit }, C.pricing.data[r.key]);
  });
  return '<script type="application/json" id="pricing-data">' + JSON.stringify(out) + '<\/script>';
};

const phoneRows = (cls) => C.brand.phones.map((p) =>
  '<li class="' + (cls || 'phone-row') + '"><span>' + esc(p.label) + '</span><a href="tel:' +
  p.number.replace(/[^0-9+]/g, '') + '">' + esc(p.number) + '</a></li>').join('\n');

const appBadges = () => `
<div class="app-badges">
  <a class="app-badge" href="${C.brand.apps.ios.url}" target="_blank" rel="noopener">
    ${ico('apple', 'app-badge-ico')}
    <span><small>${esc(C.brand.apps.ios.top)}</small><strong>${esc(C.brand.apps.ios.name)}</strong></span>
  </a>
  <a class="app-badge" href="${C.brand.apps.android.url}" target="_blank" rel="noopener">
    ${ico('play', 'app-badge-ico')}
    <span><small>${esc(C.brand.apps.android.top)}</small><strong>${esc(C.brand.apps.android.name)}</strong></span>
  </a>
</div>`;

const socialLinks = () => '<div class="socials">' + C.brand.social.map((s) =>
  '<a class="social" href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + esc(s.name) + '">' +
  icons[s.icon] + '</a>').join('') + '</div>';

/* ---------------------------------------------------------------------------
   Product mock: a macOS-style browser window running a 10-frame slideshow of
   the real app, with an iPhone in front of it (scan2eat-style composition).
   Slides whose file is missing on disk are dropped, so a partial asset set
   still renders. Set opts.phone = false to leave the phone out.
   --------------------------------------------------------------------------- */
const productMock = (opts) => {
  const o = opts || {};
  const T = C.productTour;
  const slides = T.slides.filter((s) => hasImage('app/' + s.file));
  const phones = (o.phone === false ? [] : T.phone.filter((p) => hasImage('app-mobile/' + p.file)));
  if (!slides.length) return '';

  const n = String(slides.length).padStart(2, '0');

  const slideEls = slides.map((s, i) => `
      <img class="mb-slide${i === 0 ? ' is-active' : ''}" src="../images/app/${s.file}"
           alt="MechanicDesk — ${esc(s.caption)}" width="1400" height="743"
           data-caption="${esc(s.caption)}" data-tab="${esc(s.tab)}"
           ${i === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}>`).join('');

  const phoneEl = phones.length ? `
  <div class="mock-phone" data-phone>
    <div class="mp-body">
      <span class="mp-btn mp-silent"></span><span class="mp-btn mp-up"></span>
      <span class="mp-btn mp-down"></span><span class="mp-btn mp-power"></span>
      <div class="mp-screen">
        ${phones.map((p, i) => `<img class="mp-slide${i === 0 ? ' is-active' : ''}" src="../images/app-mobile/${p.file}" alt="${esc(p.caption)} app screen" loading="lazy">`).join('')}
        <span class="mp-island"></span>
      </div>
    </div>
  </div>` : '';

  const badgeEl = o.badge === false ? '' : `
  <div class="mock-badge">
    <span class="mba-ico">${icons.bell}</span>
    <span class="mba-txt"><strong>${esc(T.badge.title)}</strong><small>${esc(T.badge.text)}</small></span>
  </div>`;

  return `
<div class="mock${o.wide ? ' mock-wide' : ''}${o.mod ? ' ' + o.mod : ''}">
  <figure class="mock-browser" data-tour>
    <div class="mb-bar">
      <span class="mb-lights"><i></i><i></i><i></i></span>
      <span class="mb-url">${icons.lock}<span>${esc(T.url)}</span></span>
      <span class="mb-tab" data-tour-tab>${esc(slides[0].tab)}</span>
    </div>
    <div class="mb-screen">
      ${slideEls}
      <span class="mb-glare" aria-hidden="true"></span>
    </div>
    <figcaption class="mb-player">
      <button class="mb-play" data-tour-toggle aria-label="Pause the product tour">
        <span class="is-pause">${icons.pause}</span><span class="is-play">${icons.playtri}</span>
      </button>
      <span class="mb-track"><i data-tour-bar></i></span>
      <span class="mb-cap" data-tour-caption>${esc(slides[0].caption)}</span>
      <span class="mb-count"><b data-tour-index>01</b>/${n}</span>
    </figcaption>
  </figure>
  ${phoneEl}
  ${badgeEl}
</div>`;
};

/* ---------------------------------------------------------------------------
   Progressive disclosure. One mechanism (data-acc / data-acc-toggle, handled
   in app.js) used everywhere long copy would otherwise pile up. Each concept
   styles .disc* / .intx* / .plan-more in its own stylesheet.
   --------------------------------------------------------------------------- */
const disclose = (o) => `
<div class="disc${o.mod ? ' ' + o.mod : ''}${o.open ? ' open' : ''}" data-acc>
  <button class="disc-head" data-acc-toggle aria-expanded="${o.open ? 'true' : 'false'}">
    ${o.icon ? `<span class="disc-ico">${icons[o.icon] || ''}</span>` : ''}
    <span class="disc-label">${o.label}</span>
    ${o.meta ? `<span class="disc-meta">${esc(o.meta)}</span>` : ''}
    <span class="disc-plus">${icons.plus}</span>
  </button>
  <div class="disc-body">${o.body}</div>
</div>`;

/* The 18 partner integrations as collapsed rows instead of 18 paragraph cards. */
const integrationList = () => C.integrations.categories.map((g) => `
<div class="intx-group" data-cat-group="${slug(g.name)}">
  <p class="intx-cat">${esc(g.name)}<span>${g.items.length}</span></p>
  <div class="intx-rows">
    ${g.items.map((it) => `
    <div class="intx-row" data-acc>
      <button class="intx-head" data-acc-toggle aria-expanded="false">
        <span class="intx-logo">${it.file
          ? `<img src="../images/logos/${it.file}" alt="${esc(it.name)} logo" loading="lazy">`
          : `<em>${esc(it.name.split(' ')[0])}</em>`}</span>
        <span class="intx-name">${esc(it.name)}</span>
        <span class="intx-plus">${icons.plus}</span>
      </button>
      <div class="intx-body">
        ${it.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
        ${it.url ? `<a class="link-arrow sm" href="${it.url}" target="_blank" rel="noopener">${esc(it.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}${icons.arrow}</a>` : ''}
      </div>
    </div>`).join('')}
  </div>
</div>`).join('');

/* Plan inclusions, collapsed. Keeps the price card down to price + CTA. */
const planIncludes = (plan, region) => {
  const P = C.pricing;
  const d = P.data[region || 'australia'][plan.key];
  const rows = [
    ['Free trial', P.trial],
    ['Included users', plan.users],
    ['Extra user / month', d.costPerExtraUser, 'costPerExtraUser'],
    ['Per SMS', d.costPerSms, 'costPerSms'],
    ['Stock items', d.stockCountLimit, 'stockCountLimit'],
    ['Support', P.support]
  ];
  return disclose({
    mod: 'plan-more',
    label: "What's included",
    body: `<ul class="plan-list">${rows.map(([k, v, field]) => `
      <li><span>${esc(k)}</span><b${field ? ` data-price-cell data-plan="${plan.key}" data-field="${field}"` : ''}>${esc(v)}</b></li>`).join('')}</ul>`
  });
};

/* Support phone numbers, collapsed behind one line. */
const phoneDisclosure = () => disclose({
  mod: 'phones',
  icon: 'phone',
  label: 'Support line numbers',
  meta: C.brand.phones.length + ' regions',
  body: `<ul class="phone-list">${phoneRows()}</ul>`
});

/* Head block shared by the concepts (fonts differ, passed in). */
const head = ({ fontLinks, css, concept, conceptName }) => `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(C.brand.title)}</title>
<meta name="description" content="${esc(C.brand.metaDescription)}">
<meta name="robots" content="noindex">
<meta property="og:title" content="${esc(C.brand.name)} — ${esc(C.brand.product)}">
<meta property="og:description" content="${esc(C.brand.heroSub)}">
<link rel="icon" type="image/png" href="../images/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fontLinks}
<link rel="stylesheet" href="${css}">
<!-- Concept ${concept}: ${conceptName} — redesign demo of mechanicdesk.com.au. Content preserved verbatim. -->`;

const conceptSwitch = (active) => {
  const items = [
    { key: 'v1', label: 'Blueprint' },
    { key: 'v2', label: 'Graphite' },
    { key: 'v3', label: 'Torque' }
  ];
  return `<div class="concept-switch" aria-label="Switch design concept">
  <a class="cs-home" href="../index.html" title="All concepts">All concepts</a>
  ${items.map((i) => `<a class="cs-item${i.key === active ? ' active' : ''}" href="../${i.key}/index.html">${i.label}</a>`).join('')}
</div>`;
};

module.exports = { esc, slug, ico, icons, mapsIframe, watermark, chrome, contactForm, pricingDataScript, phoneRows, appBadges, socialLinks, head, conceptSwitch, productMock, hasImage, disclose, integrationList, planIncludes, phoneDisclosure, C };
