/* =========================================================================
   MECHANICDESK — behaviour  (rendered to script.js)

   Plain browser JavaScript. No framework, no dependencies, no build step for
   the browser: this file is served as-is. Everything is inside one IIFE, so
   nothing is added to the global scope.

   HOW IT IS ORGANISED
   Each numbered block below is self-contained and guards for its own markup:
   if the elements it looks for are not on the page, it quietly does nothing.
   So you can delete a whole section from index.html without editing this file,
   and you can delete a block from this file without breaking the rest.

     1   popup            any [data-pop] opens the matching [data-pop-body]
     2   page chrome      nav background, scroll progress bar, back-to-top
     3   mobile drawer    hamburger, close button, Escape, link click
     4   scroll reveal    adds .visible to every .reveal once, then stops
     5   count-up         any [data-target] counts up when it scrolls into view
     6   active nav link  highlights the section currently on screen
     7   disclosures      [data-acc-toggle] opens its [data-acc] parent
     8   circuit board    lights a partner, opens its popup
     9   pricing regions  swaps every [data-price-cell] from #pricing-data
     10  contact form     front end only: shows a thank-you, sends nothing
     11  product tour     plays images/app/*.png like a video
     12  phone screens    cycles images/app-mobile/*.png behind the tour
     13  smooth anchors   offset by the height of the fixed nav
     14  footer year      fills every [data-year]

   BROWSER BASELINE
   Written for browsers from 2020 on: const/let, arrow functions, template
   literals, optional chaining, IntersectionObserver, <dialog>, pointer events,
   CSS custom properties. No polyfills and none needed.

   Motion: blocks 11 and 12 respect prefers-reduced-motion.
   ========================================================================= */
(function () {
  'use strict';

  /* Two shorthands used throughout. $$ returns a real array, so .forEach,
     .map and .filter all work on it. */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  /* ── 1. The page's one popup ───────────────────────────────────────────
     There is a single <dialog id="pop"> for the whole page. Anything with
     data-pop="<key>" opens it and the block with data-pop-body="<key>" is
     cloned into it. That is how both the feature tiles and the partner marks
     on the circuit board show their detail.

     To add a new popup anywhere: give the trigger data-pop="my-key" and put
     <div data-pop-body="my-key">…</div> in a hidden container on the page. */
  const pop = $('#pop');
  const popSlot = pop && $('[data-pop-slot]', pop);
  let popOpener = null;

  const openPop = (key, trigger) => {
    if (!pop || !popSlot) return false;
    const source = $(`[data-pop-body="${key}"]`);
    if (!source) return false;
    popSlot.innerHTML = source.innerHTML;
    popSlot.scrollTop = 0;
    popOpener = trigger ?? null;
    if (pop.showModal) pop.showModal();
    else pop.setAttribute('open', '');       /* only for very old browsers */
    return true;
  };

  if (pop) {
    $$('[data-pop]').forEach((trigger) => {
      trigger.addEventListener('click', () => openPop(trigger.getAttribute('data-pop'), trigger));
    });
    $$('[data-pop-close]', pop).forEach((btn) => btn.addEventListener('click', () => pop.close()));
    /* A click that lands on the dialog element itself is a click on the
       backdrop — the panel inside it stops its own clicks. */
    pop.addEventListener('click', (e) => { if (e.target === pop) pop.close(); });
    /* Escape is handled by <dialog>; put focus back where it came from. */
    pop.addEventListener('close', () => popOpener?.focus());
  }

  /* ── 2. Page chrome ───────────────────────────────────────────────────
     One scroll listener for the three things that react to scrolling, so the
     browser only has one passive handler to run. */
  const nav = $('[data-nav]');
  const progressBar = $('#scrollProgress');
  const toTop = $('#backToTop');

  const onScroll = () => {
    /* nav gains a solid background once the hero starts moving away */
    nav?.classList.toggle('scrolled', window.scrollY > 50);

    /* the bar across the top of the window = how far down the page you are */
    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    }

    /* back-to-top appears after the first screenful */
    toTop?.classList.toggle('visible', window.scrollY > 300);
  };

  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();                                 /* set the initial state */

  /* ── 3. Mobile drawer ────────────────────────────────────────────────── */
  const burger = $('[data-menu-open]');
  const drawer = $('[data-menu]');
  const drawerClose = $('[data-menu-close]');

  const setMenu = (open) => {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    burger?.setAttribute('aria-expanded', String(open));
    /* stop the page behind the drawer from scrolling */
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger?.addEventListener('click', () => setMenu(!drawer.classList.contains('open')));
  drawerClose?.addEventListener('click', () => setMenu(false));
  if (drawer) $$('a', drawer).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ── 4. Scroll reveal ─────────────────────────────────────────────────
     .reveal starts faded and slightly low (see styles.css) and gets .visible
     the first time it appears. Each element is unobserved after that, so this
     costs nothing once you have scrolled past it.

     Add .reveal to anything new you want to fade in; add .d1 … .d4 to stagger
     several of them in a row. */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ── 5. Count-up ──────────────────────────────────────────────────────
     A utility with no user on the page at the moment: give any element
     data-target="20000" (and optionally data-suffix="+") and it will count up
     from zero the first time it scrolls into view. */
  const countUp = (el) => {
    const target = Number.parseFloat(el.getAttribute('data-target')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const easeOut = (t) => t * (2 - t);
    let startedAt = null;

    const frame = (now) => {
      startedAt ??= now;
      const progress = Math.min((now - startedAt) / duration, 1);
      el.textContent = Math.round(target * easeOut(progress)).toLocaleString('en-AU') + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const counters = $$('[data-target]');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ── 6. Active nav link ───────────────────────────────────────────────
     The rootMargin keeps only the section crossing the middle of the window
     "intersecting", so exactly one nav link is ever marked active. */
  const sections = $$('section[id]');
  const navLinks = $$('[data-navlink]');
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ── 7. Disclosures ───────────────────────────────────────────────────
     Every click-to-open block on the page — the long feature lists, the
     optional addons, the support phone numbers, "Read more reviews", the
     About us paragraph in the footer — is the same markup:

       <div data-acc>
         <button data-acc-toggle aria-expanded="false">…</button>
         <div class="disc-body">…</div>
       </div>

     Open is a class on the wrapper (.open), so the animation lives in CSS. */
  $$('[data-acc-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('[data-acc]');
      if (!item) return;
      btn.setAttribute('aria-expanded', String(item.classList.toggle('open')));
    });
  });

  /* ── 8. Circuit board (Integrations) ──────────────────────────────────
     Tapping a partner mark marks it active and opens that partner in the
     popup. The chord lighting below is inert on this page — the site asks the
     board for no chords — but it costs nothing and the idea lab still uses it.
     The first mark is selected on load for looks — quietly, without opening
     the popup at anyone. */
  const boardNodes = $$('[data-brd-node]');
  if (boardNodes.length) {
    const chords = $$('[data-chord]');
    let silent = false;

    const selectPartner = (node) => {
      const key = node.getAttribute('data-brd-node');
      const category = node.getAttribute('data-cat');
      boardNodes.forEach((other) => other.classList.toggle('active', other === node));
      chords.forEach((chord) => {
        chord.classList.toggle('lit', Boolean(category) && chord.getAttribute('data-chord') === category);
      });
      if (!silent) openPop(`int-${key}`, node);
    };

    boardNodes.forEach((node) => node.addEventListener('click', () => selectPartner(node)));
    silent = true;
    selectPartner(boardNodes[0]);
    silent = false;
  }

  /* ── 9. Pricing regions ──────────────────────────────────────────────
     The prices for all four regions are in the JSON at the bottom of
     index.html (<script id="pricing-data">). Clicking a region chip rewrites
     every cell that carries data-price-cell, matching on data-plan +
     data-field. To change a price, edit that JSON (or content.cjs and
     rebuild) — not the table, which only shows the default region. */
  const priceData = $('#pricing-data');
  const regionButtons = $$('[data-region]');
  const regionSelect = $('#regionSelect');       /* the same control, on mobile */

  if (priceData && regionButtons.length) {
    let plans = {};
    try {
      plans = JSON.parse(priceData.textContent);
    } catch (err) {
      console.warn('Pricing data could not be parsed, prices will not switch.', err);
    }

    const applyRegion = (region) => {
      const set = plans[region];
      if (!set) return;

      $$('[data-price-cell]').forEach((cell) => {
        const value = set[cell.getAttribute('data-plan')]?.[cell.getAttribute('data-field')];
        if (value == null) return;
        cell.classList.add('is-updating');       /* brief fade while it changes */
        cell.textContent = value;
        setTimeout(() => cell.classList.remove('is-updating'), 260);
      });

      $$('[data-month-unit]').forEach((el) => { el.textContent = set.monthUnit || ''; });
      $$('[data-region-name]').forEach((el) => { el.textContent = set.name || ''; });
      regionButtons.forEach((btn) => btn.classList.toggle('active', btn.getAttribute('data-region') === region));
      if (regionSelect && regionSelect.value !== region) regionSelect.value = region;
    };

    regionButtons.forEach((btn) => {
      btn.addEventListener('click', () => applyRegion(btn.getAttribute('data-region')));
    });
    regionSelect?.addEventListener('change', () => applyRegion(regionSelect.value));
  }

  /* ── 10. Contact form ─────────────────────────────────────────────────
     THERE IS NO BACKEND. The form validates in the browser and swaps itself
     for a thank-you note; nothing is sent anywhere. To make it real, point the
     form at your endpoint (or a service like Formspree) and remove this block.
     The thank-you wording comes from the form's own data attributes so all
     copy stays in one place. */
  const form = $('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const thanks = document.createElement('div');
      thanks.className = 'form-thanks';
      const title = document.createElement('h3');
      title.textContent = form.getAttribute('data-thanks-title') || 'Thank you!';
      const text = document.createElement('p');
      text.textContent = form.getAttribute('data-thanks-text') || 'We will be in touch shortly.';
      thanks.append(title, text);

      form.style.transition = 'opacity .3s ease';
      form.style.opacity = '0';
      setTimeout(() => {
        form.style.display = 'none';
        form.parentNode.appendChild(thanks);
        requestAnimationFrame(() => thanks.classList.add('visible'));
      }, 300);
    });
  }

  /* ── 11. Product tour ─────────────────────────────────────────────────
     The screens in images/app/ are stacked on top of each other and cross-fade
     in CSS; this only decides which one is active. One requestAnimationFrame
     loop drives the progress bar and the changeover, and it is stopped
     whenever the mock is off screen so an idle tab costs nothing.

     To change the pace, change HOLD_MS. To change the screens, replace the
     files and the <img> list in index.html (or content.cjs productTour). */
  const tour = $('[data-tour]');
  if (tour) {
    const slides = $$('.mb-slide', tour);
    const bar = $('[data-tour-bar]', tour);
    const caption = $('[data-tour-caption]', tour);
    const tabLabel = $('[data-tour-tab]', tour);
    const counter = $('[data-tour-index]', tour);
    const playButton = $('[data-tour-toggle]', tour);
    const HOLD_MS = 2600;                        /* how long each screen stays */

    let current = 0;
    let elapsed = 0;
    let lastFrame = 0;
    let playing = !reducedMotion;
    let rafId = null;
    let hovering = false;

    const paint = (index) => {
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      const slide = slides[index];
      if (caption) caption.textContent = slide.getAttribute('data-caption') || '';
      if (tabLabel) tabLabel.textContent = slide.getAttribute('data-tab') || '';
      if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    };

    const frame = (now) => {
      if (!lastFrame) lastFrame = now;
      const delta = now - lastFrame;
      lastFrame = now;
      /* pointing at the tour pauses it, so a screen can be read */
      if (playing && !hovering) elapsed += delta;
      const progress = Math.min(elapsed / HOLD_MS, 1);
      if (bar) bar.style.width = `${progress * 100}%`;
      if (progress >= 1) {
        elapsed = 0;
        current = (current + 1) % slides.length;
        paint(current);
      }
      rafId = requestAnimationFrame(frame);
    };

    const setPlaying = (on) => {
      playing = on;
      tour.classList.toggle('is-paused', !on);
      playButton?.setAttribute('aria-label', on ? 'Pause the product tour' : 'Play the product tour');
    };

    playButton?.addEventListener('click', () => setPlaying(!playing));
    tour.addEventListener('mouseenter', () => { hovering = true; });
    tour.addEventListener('mouseleave', () => { hovering = false; });
    setPlaying(playing);

    if (slides.length > 1) {
      if ('IntersectionObserver' in window) {
        const tourObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !rafId) {
              lastFrame = 0;
              rafId = requestAnimationFrame(frame);
            } else if (!entry.isIntersecting && rafId) {
              cancelAnimationFrame(rafId);
              rafId = null;
            }
          });
        }, { threshold: 0.15 });
        tourObserver.observe(tour);
      } else {
        rafId = requestAnimationFrame(frame);
      }
    }
  }

  /* ── 12. Phone screens ────────────────────────────────────────────────
     The phone in front of the browser window runs on its own slower clock, so
     the two are never in step — it looks alive rather than choreographed. */
  const phone = $('[data-phone]');
  if (phone) {
    const phoneSlides = $$('.mp-slide', phone);
    if (phoneSlides.length > 1 && !reducedMotion) {
      let index = 0;
      setInterval(() => {
        index = (index + 1) % phoneSlides.length;
        phoneSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      }, 3800);
    }
  }

  /* ── 13. Smooth anchors ───────────────────────────────────────────────
     Same-page links stop short of the target by the height of the fixed nav,
     otherwise the heading you clicked hides underneath it. */
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 12 : 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* ── 14. Footer year ──────────────────────────────────────────────────
     So the copyright line never goes stale. */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
/* =========================================================================
   /v2/ — 3D layer runtime. Appended after the shared app.js runtime.

   It writes exactly two things on an element: --mx and --my, the pointer's
   position inside that element as -0.5..0.5. v5.css decides what depth those
   two numbers buy for each component, so the maths lives in one place and the
   look lives in the stylesheet.
   ========================================================================= */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  /* --- 1. The toggle: one class on <html> turns the whole layer off ------- */
  var bar = document.createElement('div');
  bar.className = 'tdd';
  bar.innerHTML = '<button type="button" aria-pressed="true">3D <b>on</b></button>' +
    '<a href="../">flat version</a>';
  document.body.appendChild(bar);
  var btn = bar.querySelector('button');
  btn.addEventListener('click', function () {
    var flat = document.documentElement.classList.toggle('flat');
    btn.setAttribute('aria-pressed', flat ? 'false' : 'true');
    btn.innerHTML = '3D <b>' + (flat ? 'off' : 'on') + '</b>';
  });

  /* --- 2. Pointer tracking ----------------------------------------------- */
  /* One rAF-throttled handler per surface. `live` shortens the CSS transition
     while the pointer is on it, so it tracks; letting go eases back. */
  function track(el, opts) {
    if (!el || reduced || coarse) return;
    var o = opts || {};
    var target = o.target || el;
    var queued = false, mx = 0, my = 0;

    var write = function () {
      queued = false;
      target.style.setProperty('--mx', mx.toFixed(3));
      target.style.setProperty('--my', my.toFixed(3));
    };
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      if (!queued) { queued = true; requestAnimationFrame(write); }
    }, { passive: true });
    el.addEventListener('pointerenter', function () {
      target.classList.add('is-live');
      if (o.onEnter) o.onEnter();
    });
    el.addEventListener('pointerleave', function () {
      mx = 0; my = 0; write();
      target.classList.remove('is-live');
      if (o.onLeave) o.onLeave();
    });
  }

  /* --- 3. The board ------------------------------------------------------ */
  var brd = $('.brd');
  if (brd) {
    var live = false;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es, obs) {
        es.forEach(function (e) { if (e.isIntersecting) { brd.classList.add('is-in'); obs.disconnect(); } });
      }, { threshold: 0.15 });
      io.observe(brd);
    } else {
      brd.classList.add('is-in');
    }

    /* Until the pointer takes over, the board tips with the page: looking down
       on it as it comes up the screen, level in the middle, tipping away as it
       leaves. It means the depth is doing something before anyone touches it —
       and on a phone, where nothing ever will. */
    if (!reduced) {
      var queued = false;
      var apply = function () {
        queued = false;
        if (live) return;
        var r = brd.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        var centre = r.top + r.height / 2;
        var off = (centre - window.innerHeight / 2) / window.innerHeight;   // -1..1
        brd.style.setProperty('--my', Math.max(-0.5, Math.min(0.5, off * 0.62)).toFixed(3));
        brd.style.setProperty('--mx', (Math.sin(window.scrollY / 900) * 0.2).toFixed(3));
      };
      window.addEventListener('scroll', function () {
        if (!queued) { queued = true; requestAnimationFrame(apply); }
      }, { passive: true });
      apply();
    }

    track(brd.parentNode, {
      target: brd,
      onEnter: function () { live = true; },
      onLeave: function () { live = false; }
    });
  }

  /* --- 4. The hero mock and the cards ------------------------------------ */
  var mock = $('.hero-art .mock');
  if (mock) track(mock.parentNode, { target: mock });

  $$('.card, .bay-type, .blog-card, .cust-card, .feat-tile').forEach(function (el) { track(el); });
})();
