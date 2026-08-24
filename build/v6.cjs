/* =========================================================================
   MECHANICDESK — V3 "FLIGHT DECK"   → rendered to v3/index.html

   The brief: same content, same graphite-and-amber tone, but it has to read as
   futuristic and expensive rather than "dark theme with a glow".

   The idea comes from the subject rather than from a trend: a workshop is a
   room full of instruments. So the page is an instrument cluster. Every module
   sits in a machined bezel with an ID and a status light, numbers are set in
   tabular monospace like a readout, a rail down the left edge tracks where you
   are the way a gauge needle does, and the whole thing powers up once on load.

   What makes it feel expensive is restraint, not effects:
     · amber appears only on things that are live — the needle, the status
       lights, the active rail stop, the one primary button. Everything else is
       graphite and hairlines.
     · type is wide and confident (Archivo at 112% width) against a calm
       geometric body face (Sora) and a monospace instrument voice.
     · alignment is visible on purpose: the page draws its own column rules.

   Structure and behaviour are shared with the main page: build/content.cjs is
   still the only place words live, build/app.js still runs the popup, the
   disclosures, the product tour and the pricing switcher, and the integrations
   board still comes from build/lab2-board.cjs. This file is the frame around
   them, plus build/v6.css and build/v6.js.
   ========================================================================= */
const S = require('./shared.cjs');
const board = require('./lab2-board.cjs');
const { esc, slug, ico, icons, C } = S;

const n2 = (i) => String(i + 1).padStart(2, '0');

/* The stops on the left rail, in page order. Short labels: this is a gauge,
   not a menu. */
const STOPS = [
  { id: 'home', label: 'Deck' },
  { id: 'why', label: 'Why' },
  { id: 'integrations', label: 'Links' },
  { id: 'suitable', label: 'Fits' },
  { id: 'proven', label: 'Field' },
  { id: 'features', label: 'Modules' },
  { id: 'pricing', label: 'Plans' },
  { id: 'contact', label: 'Contact' }
];

/* --------------------------------------------------------------- fragments -- */
/* Every block on the page is a module in a bezel: an ID, a title, a status
   light, and the content inside. The bezel is what makes it look machined. */
const module_ = (o) => `
<section class="mod${o.mod ? ' ' + o.mod : ''}" id="${o.id}">
  <div class="wrap">
    <header class="mod-bar reveal">
      <span class="mod-id">${o.n}</span>
      <span class="mod-name">${esc(o.name)}</span>
      <span class="mod-rule" aria-hidden="true"></span>
      ${o.meta ? `<span class="mod-meta">${esc(o.meta)}</span>` : ''}
      <span class="led" aria-hidden="true"></span>
    </header>
    ${o.body}
  </div>
</section>`;

/* A heading + optional line, used inside a module. */
const head = (title, sub, extra) => `
<div class="mod-head reveal">
  <h2>${title}</h2>
  ${sub ? `<p class="mod-sub">${esc(sub)}</p>` : ''}
  ${extra || ''}
</div>`;

const arrowLink = (label, url, cls) =>
  `<a class="lnk${cls ? ' ' + cls : ''}" href="${url}" target="_blank" rel="noopener">${label}${icons.arrow}</a>`;

/* --------------------------------------------------------------------- nav -- */
const navBar = () => `
<header class="nav" data-nav>
  <div class="wrap nav-in">
    <a class="brand" href="#home">
      <img src="images/logo.png" alt="" width="30" height="31">
      <span>Mechanic<em>Desk</em></span>
    </a>

    <!-- the status line: mono, tiny, and the only place the word "online"
         appears. It is what tells you this is an instrument, not a brochure. -->
    <p class="nav-status" aria-hidden="true">
      <span class="led"></span><span data-boot-line>SYSTEM READY · 20,000+ WORKSHOPS</span>
    </p>

    <nav class="nav-links" aria-label="Sections">
      ${C.nav.map((n) => `<a data-navlink href="${n.href}">${esc(n.label)}</a>`).join('')}
    </nav>

    <div class="nav-acts">
      <a class="ghost" href="${C.brand.login.url}" target="_blank" rel="noopener">${esc(C.brand.login.label)}</a>
      <a class="btn btn-key" href="${C.brand.signup.url}" target="_blank" rel="noopener">${esc(C.brand.ctaShort)}</a>
      <button class="burger" data-menu-open aria-expanded="false" aria-label="Open menu"><i></i><i></i><i></i></button>
    </div>
  </div>
</header>

<div class="drawer" data-menu>
  <button class="drawer-x" data-menu-close aria-label="Close menu">&times;</button>
  ${C.nav.map((n, i) => `<a href="${n.href}"><span>${n2(i)}</span>${esc(n.label)}</a>`).join('')}
  <a class="btn btn-key" href="${C.brand.signup.url}" target="_blank" rel="noopener">${esc(C.brand.ctaShort)}</a>
</div>`;

/* -------------------------------------------------------------------- rail -- */
/* The gauge down the left edge. The needle position is a single custom
   property written by v6.js on scroll, so the browser only animates transform. */
const rail = () => `
<aside class="rail" aria-hidden="true">
  <span class="rail-track"></span>
  <span class="rail-needle" data-needle></span>
  <ol class="rail-stops">
    ${STOPS.map((s, i) => `
    <li class="rail-stop" data-stop="${s.id}">
      <span class="rail-tick"></span>
      <span class="rail-no">${n2(i)}</span>
      <span class="rail-label">${esc(s.label)}</span>
    </li>`).join('')}
  </ol>
</aside>`;

/* -------------------------------------------------------------------- hero -- */
const hero = () => `
<section class="deck" id="home">
  <!-- corner ticks draw themselves in during the boot sequence -->
  <i class="tick tl" aria-hidden="true"></i><i class="tick tr" aria-hidden="true"></i>
  <i class="tick bl" aria-hidden="true"></i><i class="tick br" aria-hidden="true"></i>
  <i class="deck-grid" aria-hidden="true"></i>
  <i class="deck-glow" aria-hidden="true"></i>

  <div class="wrap deck-cols">
    <div class="deck-copy">
      <p class="deck-eyebrow boot-1">
        <span>${esc(C.brand.product)}</span>
        <span class="sep" aria-hidden="true"></span>
        <span>AU · NZ · UK · Global</span>
      </p>

      <h1 class="deck-h1">
        <span class="line boot-2"><b class="chrome">Workshop</b></span>
        <span class="line boot-3"><b class="chrome gold">Management</b></span>
        <span class="line boot-4"><b class="chrome">Software</b></span>
      </h1>

      <p class="deck-sub boot-5">${esc(C.brand.heroSub)}</p>

      <div class="deck-cta boot-6">
        <a class="btn btn-key btn-lg" href="${C.brand.signup.url}" target="_blank" rel="noopener">${esc(C.brand.cta)}</a>
        <a class="btn btn-line btn-lg" href="#contact">Book a demo</a>
      </div>
    </div>

    <!-- the product tour, in a bezel with its own readout -->
    <div class="deck-art boot-7">
      <div class="scope">
        <div class="scope-bar">
          <span class="scope-id">LIVE VIEW</span>
          <span class="scope-rule" aria-hidden="true"></span>
          <span class="scope-meta">${esc(C.productTour.url)}</span>
          <span class="led" aria-hidden="true"></span>
        </div>
        <div class="scope-body">
          ${S.productMock({ badge: false })}
        </div>
      </div>
    </div>
  </div>
</section>`;

/* --------------------------------------------------------------------- why -- */
const why = () => module_({
  id: 'why', n: '01', name: C.pillars.eyebrow, meta: 'three reasons',
  body: `
    ${head(`Intuitive. <em>Comprehensive.</em> Too&nbsp;Easy.`)}
    <div class="reasons">
      ${C.pillars.items.map((p, i) => `
      <article class="reason reveal d${i + 1}">
        <span class="reason-no">${n2(i)}</span>
        <div class="reason-ico">${ico(p.icon, 'ico')}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.text)}</p>
      </article>`).join('')}
    </div>

    <!-- the four things the live site puts in its trust strip, as a readout -->
    <ul class="strip reveal">
      ${C.trustStrip.map((t) => `<li>${icons.check}${esc(t)}</li>`).join('')}
    </ul>`
});

/* ------------------------------------------------------------ integrations -- */
const integrations = () => {
  const items = [];
  C.integrations.categories.forEach((g) => g.items.forEach((it) => items.push({ ...it, cat: g.name })));
  const mark = (it, cls, area) => it.file
    ? `<img class="${cls}" src="${S.alphaLogo(it.file)}" alt="" loading="lazy"
        style="--h:${S.markSize(it.file, area, 20, 72).h}px">`
    : `<em class="${cls} is-text">${esc(it.name.split(' ')[0])}</em>`;

  return module_({
    id: 'integrations', n: '02', name: C.integrations.eyebrow, meta: items.length + ' linked',
    body: `
    ${head(esc(C.integrations.heading), C.integrations.sub,
      `<p class="mod-out">${arrowLink(esc(C.integrations.moreLabel), C.integrations.moreUrl)}</p>`)}

    <div class="bezel reveal">
      <div class="bezel-bar">
        <span class="bezel-id">PARTNER NETWORK</span>
        <span class="bezel-rule" aria-hidden="true"></span>
        <span class="bezel-meta">tap a mark to read it</span>
        <span class="led" aria-hidden="true"></span>
      </div>
      ${board.html({ prefix: '', attr: 'data-brd-node' })}
    </div>

    <div class="pop-well" hidden>
      ${items.map((it) => `
      <div data-pop-body="int-${slug(it.name)}"><div class="pop-int">
        <div class="pop-head">
          ${mark(it, 'pop-mark', 1900)}
          <span><span class="mono-label">${esc(it.cat)}</span><h3>${esc(it.name)}</h3></span>
        </div>
        ${it.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
        ${it.url ? arrowLink(esc(it.url.replace(/^https?:\/\//, '').replace(/\/$/, '')), it.url, 'sm') : ''}
      </div></div>`).join('')}
    </div>`
  });
};

/* ---------------------------------------------------------------- suitable -- */
const suitable = () => module_({
  id: 'suitable', n: '03', name: C.suitable.eyebrow, meta: C.suitable.items.length + ' types',
  body: `
    ${head(esc(C.suitable.heading))}
    <div class="film reveal">
      ${C.suitable.items.map((s, i) => `
      <figure class="frame">
        <span class="frame-no">${n2(i)}</span>
        <img src="images/pexels/${s.file}" alt="${esc(s.title)}" loading="lazy" width="400" height="300">
        <figcaption>${esc(s.title)}</figcaption>
      </figure>`).join('')}
    </div>`
});

/* ------------------------------------------------------------------ proven -- */
const proven = () => {
  const R = C.proven.reviews;
  const quote = (r, i) => `
    <figure class="tx reveal">
      <header><span class="tx-id">MSG ${n2(i)}</span><span class="tx-rule" aria-hidden="true"></span></header>
      <blockquote>${esc(r.text)}</blockquote>
      <figcaption><strong>${esc(r.person)}</strong><span>${esc(r.company)}${r.address ? ' · ' + esc(r.address) : ''}</span></figcaption>
    </figure>`;

  return module_({
    id: 'proven', n: '04', name: C.proven.eyebrow, meta: 'from the field',
    body: `
    ${head(esc(C.proven.heading), C.proven.sub)}
    <div class="tx-grid">${R.slice(0, 3).map(quote).join('')}</div>
    ${S.disclose({
      mod: 'more reveal',
      label: 'Read more reviews',
      body: `<div class="tx-grid">${R.slice(3).map((r, i) => quote(r, i + 3)).join('')}</div>
        <p class="mod-out">${arrowLink(esc(C.proven.moreLabel), C.proven.reviewsUrl, 'sm')}</p>`
    })}`
  });
};

/* ---------------------------------------------------------------- features -- */
/* The module bay: twelve slots in a machined grid. Hovering one runs a scan
   line across it; clicking opens its full detail in the shared popup. */
const features = () => module_({
  id: 'features', n: '05', name: C.features.eyebrow, meta: C.features.items.length + ' modules',
  body: `
    ${head(esc(C.features.heading))}
    <div class="bay reveal">
      ${C.features.items.map((f, i) => `
      <button class="slot" data-pop="feat-${slug(f.name)}"
              aria-haspopup="dialog" aria-label="${esc(f.name)} — read what it covers">
        <span class="slot-scan" aria-hidden="true"></span>
        <span class="slot-top"><span class="slot-no">${n2(i)}</span><span class="slot-plus">${icons.plus}</span></span>
        <span class="slot-ico">${ico(f.icon, 'ico')}</span>
        <span class="slot-name">${esc(f.name)}</span>
      </button>`).join('')}
    </div>

    <div class="pop-well" hidden>
      ${C.features.items.map((f, i) => `
      <div data-pop-body="feat-${slug(f.name)}"><div class="pop-feat">
        <div class="pop-plate"><span>MODULE ${n2(i)}/12</span><span class="pop-bolt">${icons.bolt}</span></div>
        <div class="pop-head">
          <span class="pop-ico">${ico(f.icon, 'ico')}</span>
          <span><span class="mono-label">${esc(C.features.eyebrow)}</span><h3>${esc(f.name)}</h3></span>
        </div>
        <p class="pop-blurb">${esc(f.blurb)}</p>
        <ul class="pop-list">${f.bullets.map((b) => `<li>${icons.check}<span>${esc(b)}</span></li>`).join('')}</ul>
        ${f.highlight ? `<div class="pop-hl"><span class="mono-label">Highlight</span><p>${esc(f.highlight)}</p></div>` : ''}
        ${arrowLink(esc(f.link.label), f.link.url)}
      </div></div>`).join('')}
    </div>`
});

/* ----------------------------------------------------------------- pricing -- */
const pricing = () => {
  const P = C.pricing;
  const au = P.data.australia;
  const rows = [
    { label: 'Monthly', field: 'cost', big: true },
    { label: 'Users included', field: 'users' },
    { label: 'Extra user / month', field: 'costPerExtraUser' },
    { label: 'Per SMS', field: 'costPerSms' },
    { label: 'Stock items', field: 'stockCountLimit' }
  ];

  return module_({
    id: 'pricing', n: '06', name: P.eyebrow, meta: P.regions.length + ' regions',
    body: `
    ${head(esc(P.heading), null, `
      <div class="regions">
        ${P.regions.map((r, i) => `<button class="chip${i === 0 ? ' active' : ''}" data-region="${r.key}">${esc(r.name)}</button>`).join('')}
        <select id="regionSelect" class="chip-select" aria-label="Select region">
          ${P.regions.map((r) => `<option value="${r.key}">${esc(r.name)}</option>`).join('')}
        </select>
      </div>`)}

    <div class="sheet-scroll reveal">
      <table class="sheet">
        <thead>
          <tr>
            <th><span class="mono-label">Plan · <span data-region-name>Australia</span></span></th>
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
          <tr class="row-go">
            <th scope="row"></th>
            ${P.plans.map((p) => `<td class="${p.featured ? 'pick' : ''}">
              <a class="btn ${p.featured ? 'btn-key' : 'btn-line'} btn-sm" href="${P.signupUrl}" target="_blank" rel="noopener">${esc(P.signupLabel)}</a></td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>

    ${S.disclose({
      mod: 'more reveal',
      label: esc(P.addons.heading),
      meta: P.addons.items.length + ' available',
      body: `<div class="addons">
        ${P.addons.items.map((a) => `<article class="addon"><h3>${esc(a.name)}</h3><p>${esc(a.text)}</p></article>`).join('')}
      </div><p class="fine">${esc(P.addons.note)}</p>`
    })}`
  });
};

/* -------------------------------------------------------------------- blog -- */
const blog = () => module_({
  id: 'blog', n: '07', name: C.blog.eyebrow, meta: C.blog.posts.length + ' posts',
  body: `
    ${head(esc(C.blog.heading), null, `<p class="mod-out">${arrowLink(esc(C.blog.moreLabel), C.brand.blogUrl, 'sm')}</p>`)}
    <div class="posts">
      ${C.blog.posts.map((p, i) => `
      <a class="post reveal d${i + 1}" href="${p.url}" target="_blank" rel="noopener">
        <span class="post-img"><img src="images/pexels/${p.file}" alt="" loading="lazy" width="400" height="260"></span>
        <span class="post-body">
          <span class="post-no">${n2(i)}</span>
          <strong>${esc(p.title)}</strong>
          <em>${esc(p.excerpt)}</em>
          <span class="post-go">${icons.arrow}</span>
        </span>
      </a>`).join('')}
    </div>`
});

/* ----------------------------------------------------------------- console -- */
/* Support, the closing call to action and contact in one console, because by
   this point the reader wants one thing: how to start and who to ask. */
/* ----------------------------------------------------------------- console -- */
/* Support, the closing call to action and contact in one console. The layout is
   the point: a header across the top, two bezels of equal width side by side so
   their bars and their first lines align, and the map full width underneath. */
const console_ = () => module_({
  id: 'contact', n: '08', name: C.contact.eyebrow, meta: 'open a channel', mod: 'mod-console',
  body: `
    <div class="console">
      <header class="console-head reveal">
        <h2>Start your <em>${esc(C.pricing.trial)}</em></h2>
        <p class="mod-sub">${esc(C.support.sub)}</p>
        <p class="mod-out">
          <a class="btn btn-key btn-lg" href="${C.brand.signup.url}" target="_blank" rel="noopener">${esc(C.brand.cta)}</a>
        </p>
      </header>

      <div class="bezel console-ch reveal">
        <div class="bezel-bar">
          <span class="bezel-id">Channels</span>
          <span class="bezel-rule" aria-hidden="true"></span>
          <span class="bezel-meta">${C.support.items.length} ways in</span>
          <span class="led" aria-hidden="true"></span>
        </div>
        <div class="bezel-body">
          <ul class="channels">
            ${C.support.items.map((s2, i) => `
            <li>
              <span class="ch-no">${n2(i)}</span>
              <span class="ch-ico">${ico(s2.icon, 'ico')}</span>
              <span class="ch-txt">
                <strong>${esc(s2.title)}</strong>
                <span>${esc(s2.text)}</span>
                ${s2.action ? `<a class="lnk sm" href="${s2.action.url}"${s2.action.url.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(s2.action.label)}${icons.arrow}</a>` : ''}
              </span>
            </li>`).join('')}
          </ul>

          ${S.phoneDisclosure()}

          <dl class="det">
            <dt>Email</dt><dd><a href="mailto:${C.brand.email}">${esc(C.brand.email)}</a></dd>
            <dt>Support</dt><dd><a href="mailto:${C.brand.supportEmail}">${esc(C.brand.supportEmail)}</a></dd>
            <dt>Office</dt><dd>${esc(C.brand.address.line1)}, ${esc(C.brand.address.line2)} ${esc(C.brand.address.line3)}</dd>
          </dl>
        </div>
      </div>

      <div class="bezel console-form reveal">
        <div class="bezel-bar">
          <span class="bezel-id">${esc(C.contact.sub)}</span>
          <span class="bezel-rule" aria-hidden="true"></span>
          <span class="bezel-meta">we reply in 10–15 min</span>
          <span class="led" aria-hidden="true"></span>
        </div>
        <div class="bezel-body">${S.contactForm()}</div>
      </div>

      <div class="bezel console-map reveal">
        <div class="bezel-bar">
          <span class="bezel-id">Head office</span>
          <span class="bezel-rule" aria-hidden="true"></span>
          <span class="bezel-meta">${esc(C.brand.address.oneLine)}</span>
          <span class="led" aria-hidden="true"></span>
        </div>
        <div class="map">${S.mapsIframe(320)}</div>
      </div>
    </div>`
});

/* ------------------------------------------------------------------ footer -- */
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
        <p class="mono-label">${esc(g.label)}</p>
        ${g.children.map((c) => `<a href="${c.href}" target="_blank" rel="noopener">${esc(c.label)}</a>`).join('')}
      </nav>`).join('')}
    </div>
    ${S.disclose({ mod: 'more', label: esc(C.brand.about.heading), body: `<p class="foot-about">${esc(C.brand.about.body)}</p>` })}
    <p class="foot-end">
      <span>${esc(C.brand.copyright).replace(/(\d{4})(?=\.)/, '<span data-year>$1</span>')}</span>
      <span class="mono-label">V3 · Flight deck · design demo</span>
    </p>
  </div>
</footer>`;

/* -------------------------------------------------------------------- page -- */
const pop = () => `
<dialog class="pop" id="pop" aria-label="Details">
  <div class="pop-in">
    <button class="pop-x" data-pop-close aria-label="Close">&times;</button>
    <div class="pop-scroll" data-pop-slot></div>
  </div>
</dialog>`;

const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,500;112,600;112,700&family=Sora:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">';

module.exports = () => {
  const html = `<!DOCTYPE html>
<html lang="en" class="v3 booting">
<head>
<!--
  MechanicDesk — V3 "Flight deck". A third design direction: same content, same
  graphite-and-amber tone, framed as an instrument cluster.
  Generated from build/v6.cjs + build/v6.css + build/v6.js. The main page at /
  is a different design and is not affected by anything in here.
-->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(C.brand.title)} · V3</title>
<meta name="description" content="${esc(C.brand.metaDescription)}">
<meta name="robots" content="noindex">
<link rel="icon" type="image/png" href="images/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${FONTS}
<link rel="stylesheet" href="styles.css">
<!-- The deck boots by removing .booting from <html>. If JavaScript never runs,
     this makes sure the hero is visible anyway. -->
<noscript><style>html.booting [class*="boot-"] { opacity: 1 !important; transform: none !important; }</style></noscript>
</head>
<body>
<!-- one big soft light that follows the cursor: it only shows where there is
     an edge or a pane of glass to catch it (see .glimmer in styles.css) -->
<div class="glimmer" aria-hidden="true"></div>
${S.watermark()}
${S.chrome()}
${navBar()}
${rail()}
<main>
${hero()}
${why()}
${integrations()}
${suitable()}
${proven()}
${features()}
${pricing()}
${blog()}
${console_()}
${pop()}
</main>
${footer()}
${S.pricingDataScript()}
<script src="script.js"></script>
</body>
</html>`;

  /* the page sits one level down, so every asset reference climbs out of it */
  return html.replace(/(["'(])images\//g, '$1../images/');
};
