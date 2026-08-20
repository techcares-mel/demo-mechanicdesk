/* Shared HTML fragment helpers used by the three concept templates. */
const { icons } = require('./icons.cjs');
const C = require('./content.cjs');

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

module.exports = { esc, slug, ico, icons, mapsIframe, watermark, chrome, contactForm, pricingDataScript, phoneRows, appBadges, socialLinks, head, conceptSwitch, C };
