/* =========================================================================
   MechanicDesk redesign — v2 direction: "JOB CARD"
   Rendered to  v2/index.html  (the chosen Graphite design stays at the root).

   The idea: a workshop still runs on the job card. Triplicate paper, a printed
   header strip, field names down the left, a rubber stamp for anything urgent.
   So the page IS a job card — cool docket paper, mono field labels in the
   gutter, perforated tear rules between fields, and one loud moment: the dark
   wiring board under the Integrations field.

   Palette   sheet #f5f7f8 · carbon #f0e8d2 · ink #15191e · pencil #626d78
             rule #ccd3d9 · stamp #fca311 (brand) / #b96b06 at text contrast
   Type      Bricolage Grotesque (display) · IBM Plex Sans (body)
             IBM Plex Mono (field labels, data, prices)
   Signature the job card itself, stamped on load
   ========================================================================= */
const S = require('./shared.cjs');
const board = require('./lab2-board.cjs');
const { esc, slug, icons, C } = S;

const ITEMS = [];
C.integrations.categories.forEach((g) => g.items.forEach((it) => ITEMS.push({
  key: slug(it.name), name: it.name, cat: g.name, lines: it.lines, url: it.url
})));

const host = (u) => esc(String(u).replace(/^https?:\/\//, '').replace(/\/$/, ''));
const linkOut = (label, url, cls) =>
  `<a class="lnk${cls ? ' ' + cls : ''}" href="${url}" target="_blank" rel="noopener">${label}${icons.arrow}</a>`;

/* Every field on the card: a mono label in the gutter, the content beside it. */
const field = (id, label, body, mod) => `
<section class="sec${mod ? ' ' + mod : ''}"${id ? ` id="${id}"` : ''}>
  <div class="wrap row">
    <p class="fld reveal">${esc(label)}</p>
    <div class="row-body">${body}</div>
  </div>
</section>`;

const perf = () => '<hr class="perf" aria-hidden="true">';

/* ------------------------------------------------------------------- nav -- */
const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#proven' },
  { label: 'Contact', href: '#contact' }
];

const nav = () => `
<header class="nav" data-nav>
  <div class="wrap nav-in">
    <a class="brand" href="#home">
      <img src="images/logo.png" alt="" width="30" height="31">
      <span>Mechanic<em>Desk</em></span>
    </a>
    <nav class="nav-links" aria-label="Sections">
      ${NAV.map((n) => `<a data-navlink href="${n.href}">${esc(n.label)}</a>`).join('')}
    </nav>
    <div class="nav-acts">
      <a class="lnk-quiet" href="${C.brand.login.url}" target="_blank" rel="noopener">${esc(C.brand.login.label)}</a>
      <a class="btn btn-ink sm" href="${C.brand.signup.url}" target="_blank" rel="noopener">${esc(C.brand.ctaShort)}</a>
      <button class="burger" data-menu-open aria-expanded="false" aria-label="Open menu"><i></i><i></i></button>
    </div>
  </div>
</header>
<div class="drawer" data-menu>
  <button class="drawer-x" data-menu-close aria-label="Close menu">&times;</button>
  ${NAV.map((n) => `<a href="${n.href}">${esc(n.label)}</a>`).join('')}
  <a class="btn btn-ink" href="${C.brand.signup.url}" target="_blank" rel="noopener">${esc(C.brand.ctaShort)}</a>
</div>`;

/* ------------------------------------------------------------------ hero -- */
const hero = () => `
<section class="hero" id="home">
  <div class="wrap">
    <article class="card">
      <header class="card-head">
        <span>Job card</span>
        <span>Workshop management software</span>
        <span class="card-head-end">${esc(C.brand.address.line2)} · AU / NZ / UK</span>
      </header>

      <div class="card-grid">
        <div class="card-lead">
          <p class="fld">Work required</p>
          <h1>Intuitive. <em>Comprehensive.</em><br>Too&nbsp;Easy.</h1>
          <p class="lead">${esc(C.brand.heroSub)}</p>
          <div class="acts">
            <a class="btn btn-ink" href="${C.brand.signup.url}" target="_blank" rel="noopener">${esc(C.brand.cta)}</a>
            <a class="btn btn-quiet" href="${C.brand.login.url}" target="_blank" rel="noopener">${esc(C.brand.login.label)}</a>
          </div>
          <p class="fine">No installation. No manual data backup. Any device, anywhere.</p>
          <span class="stamp" aria-hidden="true"><b>14 days</b><i>free trial</i></span>
        </div>

        <div class="card-art">
          <p class="fld">Attached</p>
          ${S.productMock({ badge: false })}
        </div>
      </div>

      <footer class="card-foot">
        ${C.proven.stats.map((s) => `
        <div class="dat">
          <b class="dat-n" data-target="${s.value}" data-suffix="${s.suffix}">0${esc(s.suffix)}</b>
          <span>${esc(s.label)}</span>
        </div>`).join('')}
      </footer>
    </article>
  </div>
</section>`;

/* ------------------------------------------------------------------- why -- */
/* The site's own 'Why' heading is the same sentence as the hero headline, and
   its sub is the same sentence as the hero lead — printing them twice reads as
   a mistake. So this field leads on the strongest of the three pillars in the
   pillar's own words, and the three notes carry the rest verbatim. */
const why = () => field('why', 'Why', `
  <h2 class="reveal">Nothing to install. <em>Nothing to back up.</em></h2>
  <div class="notes">
    ${C.pillars.items.map((p, i) => `
    <div class="note reveal d${i + 1}">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.text)}</p>
    </div>`).join('')}
  </div>`);

/* ---------------------------------------------------------- integrations -- */
const integrations = () => field('integrations', 'Connects to', `
  <h2 class="reveal">${esc(C.integrations.heading)}</h2>
  <p class="sub reveal">${esc(C.integrations.sub)}</p>

  <div class="island reveal">
    <p class="island-note">All ${ITEMS.length} partners. Tap a logo to read what it does.</p>
    ${board.html({ prefix: '', attr: 'data-brd-node' })}
    <div class="bd-panels">
      ${ITEMS.map((it, i) => `
      <article class="bd-panel${i === 0 ? ' active' : ''}" data-brd-panel="${it.key}">
        <p class="bd-cat">${esc(it.cat)}</p>
        <h3>${esc(it.name)}</h3>
        ${it.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
        ${it.url ? linkOut(host(it.url), it.url, 'on-dark') : ''}
      </article>`).join('')}
    </div>
  </div>

  ${S.disclose({
    mod: 'plain reveal',
    label: 'Why we build integrations',
    body: `<p>${esc(C.integrations.intro)}</p>`
  })}
  <p class="row-out">${linkOut(esc(C.integrations.moreLabel), C.integrations.moreUrl)}</p>`);

/* -------------------------------------------------------------- suitable -- */
const suitable = () => field('suitable', 'Suits', `
  <h2 class="reveal">${esc(C.suitable.heading)}</h2>
  <ul class="types">
    ${C.suitable.items.filter((t) => S.hasImage('pexels/' + t.file)).map((t, i) => `
    <li class="type reveal d${(i % 4) + 1}">
      <img src="images/pexels/${t.file}" alt="${esc(t.title)}" loading="lazy" width="400" height="300">
      <span>${esc(t.title)}</span>
    </li>`).join('')}
  </ul>`, 'sec-carbon');

/* ---------------------------------------------------------------- proven -- */
const proven = () => {
  const R = C.proven.reviews || [];
  const quote = (r) => `
    <figure class="quote reveal">
      <blockquote>${esc(r.text)}</blockquote>
      <figcaption><b>${esc(r.person)}</b><span>${esc(r.company)}${r.address ? ' · ' + esc(r.address) : ''}</span></figcaption>
    </figure>`;
  return field('proven', 'Reviews', `
  <h2 class="reveal">${esc(C.proven.heading)}</h2>
  <p class="sub reveal">${esc(C.proven.note)}</p>
  <div class="quotes">${R.slice(0, 3).map(quote).join('')}</div>
  ${R.length > 3 ? S.disclose({
    mod: 'plain reveal',
    label: 'Read more reviews',
    body: `<div class="quotes">${R.slice(3).map(quote).join('')}</div>
      <p class="row-out">${linkOut(esc(C.proven.moreLabel), C.proven.reviewsUrl)}</p>`
  }) : ''}
  <ul class="custs reveal">
    ${C.proven.customers.filter((c) => S.hasImage('proven/' + c.file)).map((c) => `
    <li><img src="images/proven/${c.file}" alt="" loading="lazy" width="60" height="60">
      <span>${esc(c.name)}</span></li>`).join('')}
  </ul>`);
};

/* -------------------------------------------------------------- features -- */
const features = () => field('features', 'Features', `
  <h2 class="reveal">${esc(C.features.heading)}</h2>
  <p class="sub reveal">Twelve modules, one screen. Open any of them to see what it covers.</p>
  <div class="feats">
    ${C.features.items.map((f) => S.disclose({
      mod: 'feat reveal',
      label: `<b>${esc(f.name)}</b><span>${esc(f.blurb)}</span>`,
      body: `<ul class="ticks">${f.bullets.map((b) => `<li>${icons.check}<span>${esc(b)}</span></li>`).join('')}</ul>
        ${f.highlight ? `<p class="hl"><span>Highlight</span>${esc(f.highlight)}</p>` : ''}
        ${f.link ? `<p class="row-out">${linkOut(esc(f.link.label), f.link.url)}</p>` : ''}`
    })).join('')}
  </div>`);

/* --------------------------------------------------------------- pricing -- */
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
  return field('pricing', 'Price', `
  <h2 class="reveal">${esc(P.heading)}</h2>
  <div class="regions reveal">
    <div class="chips">
      ${P.regions.map((r, i) => `<button class="chip${i === 0 ? ' active' : ''}" data-region="${r.key}">${esc(r.name)}</button>`).join('')}
    </div>
    <select id="regionSelect" class="chip-select" aria-label="Select region">
      ${P.regions.map((r) => `<option value="${r.key}">${esc(r.name)}</option>`).join('')}
    </select>
  </div>
  <div class="table-scroll reveal">
    <table class="spec">
      <thead>
        <tr>
          <th><span class="fld">Plan · <span data-region-name>Australia</span></span></th>
          ${P.plans.map((p) => `<th class="${p.featured ? 'pick' : ''}">
            ${p.featured ? '<span class="pick-tag">Most popular</span>' : ''}
            <span class="plan">${esc(p.name)}</span></th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.map((r) => `
        <tr>
          <th scope="row">${esc(r.label)}</th>
          ${P.plans.map((p) => {
            const val = r.field === 'users' ? p.users : au[p.key][r.field];
            const attrs = r.field === 'users' ? '' : ` data-price-cell data-plan="${p.key}" data-field="${r.field}"`;
            return `<td class="${p.featured ? 'pick' : ''}${r.big ? ' big' : ''}">
              <span${attrs}>${esc(val)}</span>${r.big ? `<em data-month-unit>${esc(P.regions[0].monthUnit)}</em>` : ''}
            </td>`;
          }).join('')}
        </tr>`).join('')}
        <tr>
          <th scope="row">Free trial</th>
          ${P.plans.map((p) => `<td class="${p.featured ? 'pick' : ''}">${esc(P.trial)}</td>`).join('')}
        </tr>
        <tr>
          <th scope="row">Support</th>
          ${P.plans.map((p) => `<td class="${p.featured ? 'pick' : ''}">${esc(P.support)}</td>`).join('')}
        </tr>
        <tr class="row-cta">
          <th scope="row"></th>
          ${P.plans.map((p) => `<td class="${p.featured ? 'pick' : ''}">
            <a class="btn ${p.featured ? 'btn-ink' : 'btn-quiet'} sm" href="${P.signupUrl}" target="_blank" rel="noopener">${esc(P.signupLabel)}</a></td>`).join('')}
        </tr>
      </tbody>
    </table>
  </div>
  ${S.disclose({
    mod: 'plain reveal',
    label: esc(P.addons.heading),
    body: `<ul class="addons">${P.addons.items.map((a) => `<li><b>${esc(a.name)}</b><span>${esc(a.text)}</span></li>`).join('')}</ul>
      <p class="fine">${esc(P.addons.note)}</p>`
  })}
  ${S.pricingDataScript()}`);
};

/* ------------------------------------------------------------------ blog -- */
const blog = () => field(null, 'Notes', `
  <h2 class="reveal">${esc(C.blog.heading)}</h2>
  <ul class="posts">
    ${C.blog.posts.filter((p) => S.hasImage('pexels/' + p.file)).map((p, i) => `
    <li class="post reveal d${i + 1}">
      <a href="${p.url}" target="_blank" rel="noopener">
        <img src="images/pexels/${p.file}" alt="" loading="lazy" width="400" height="260">
        <span><b>${esc(p.title)}</b><em>${esc(p.excerpt)}</em></span>
      </a>
    </li>`).join('')}
  </ul>
  <p class="row-out">${linkOut(esc(C.blog.moreLabel), C.brand.blogUrl)}</p>`);

/* ----------------------------------------------------- start / contact ---- */
const start = () => field('contact', 'Start', `
  <div class="close-grid">
    <div class="close-left">
      <h2 class="reveal">Start your ${esc(C.pricing.trial)}</h2>
      <p class="sub reveal">${esc(C.support.sub)}</p>
      <p class="acts reveal">
        <a class="btn btn-ink" href="${C.brand.signup.url}" target="_blank" rel="noopener">${esc(C.brand.cta)}</a>
      </p>

      <dl class="det reveal">
        <dt>Email</dt><dd><a href="mailto:${C.brand.email}">${esc(C.brand.email)}</a></dd>
        <dt>Support</dt><dd><a href="mailto:${C.brand.supportEmail}">${esc(C.brand.supportEmail)}</a></dd>
        <dt>Office</dt><dd>${esc(C.brand.address.line1)}<br>${esc(C.brand.address.line2)} ${esc(C.brand.address.line3)}</dd>
        <dt>Manual</dt><dd>${linkOut('Online manual', C.support.items[0].action.url)}</dd>
        <dt>Demo</dt><dd>${esc(C.support.items[2].text)}</dd>
      </dl>
      ${S.phoneDisclosure()}
      <div class="map reveal">${S.mapsIframe(240)}</div>
    </div>

    <div class="close-right reveal">
      <p class="fld">${esc(C.contact.sub)}</p>
      ${S.contactForm()}
    </div>
  </div>`, 'sec-carbon');

/* ---------------------------------------------------------------- footer -- */
const footer = () => `
<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="#home"><img src="images/logo.png" alt="" width="28" height="29"><span>Mechanic<em>Desk</em></span></a>
        <p>${esc(C.brand.product)} · ${esc(C.brand.legal)}</p>
        ${S.appBadges()}
        ${S.socialLinks()}
      </div>
      ${C.navFull.map((g) => `
      <nav class="foot-col" aria-label="${esc(g.label)}">
        <p class="fld">${esc(g.label)}</p>
        ${g.children.map((c) => `<a href="${c.href}" target="_blank" rel="noopener">${esc(c.label)}</a>`).join('')}
      </nav>`).join('')}
    </div>
    ${S.disclose({ mod: 'plain', label: esc(C.brand.about.heading), body: `<p>${esc(C.brand.about.body)}</p>` })}
    <p class="foot-end"><span>&copy; <span data-year>2026</span> ${esc(C.brand.legal)}</span><span>Design demo · not the live site</span></p>
  </div>
</footer>`;

/* ------------------------------------------------------------------ page -- */
module.exports = () => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${S.head({
    fontLinks: '<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">',
    css: 'styles.css',
    concept: 'v2',
    conceptName: 'Job card'
  })}
</head>
<body class="v2">
${S.watermark()}
${S.chrome()}
${nav()}
<main>
${hero()}
${perf()}
${why()}
${perf()}
${integrations()}
${suitable()}
${perf()}
${proven()}
${perf()}
${features()}
${perf()}
${pricing()}
${perf()}
${blog()}
${start()}
</main>
${footer()}
<script src="script.js"></script>
</body>
</html>`;

  /* the page lives one level down, so every asset reference climbs out of it */
  return html.replace(/(["'(])images\//g, '$1../images/');
};
