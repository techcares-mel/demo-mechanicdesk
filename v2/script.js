/* =========================================================================
   MechanicDesk redesign — shared runtime (identical in all three concepts).
   Pure vanilla JS, no dependencies. Every block guards for its own markup,
   so the same file works across the three different layouts.
   ========================================================================= */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* --- 1. Nav: solid background after 50px --------------------------------- */
  var nav = $('[data-nav]');
  var onScrollNav = function () {
    if (!nav) return;
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };

  /* --- 2. Scroll progress bar -------------------------------------------- */
  var progress = $('#scrollProgress');
  var onScrollProgress = function () {
    if (!progress) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };

  /* --- 3. Back to top ---------------------------------------------------- */
  var toTop = $('#backToTop');
  var onScrollTop = function () {
    if (!toTop) return;
    if (window.scrollY > 300) toTop.classList.add('visible');
    else toTop.classList.remove('visible');
  };
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', function () {
    onScrollNav();
    onScrollProgress();
    onScrollTop();
  }, { passive: true });
  onScrollNav(); onScrollProgress(); onScrollTop();

  /* --- 4. Mobile navigation --------------------------------------------- */
  var burger = $('[data-menu-open]');
  var drawer = $('[data-menu]');
  var closeBtn = $('[data-menu-close]');
  var setMenu = function (open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (burger) burger.addEventListener('click', function () { setMenu(!drawer.classList.contains('open')); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (drawer) $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* --- 5. Scroll reveal -------------------------------------------------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- 6. Stat count-up -------------------------------------------------- */
  var countUp = function (el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1500, t0 = null;
    var ease = function (t) { return t * (2 - t); };
    var fmt = function (n) { return Math.round(n).toLocaleString('en-AU'); };
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = fmt(target * ease(p)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  var stats = $$('[data-target]');
  if ('IntersectionObserver' in window && stats.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); so.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    stats.forEach(function (el) { so.observe(el); });
  }

  /* --- 7. Active nav link ----------------------------------------------- */
  var sections = $$('section[id]');
  var navLinks = $$('[data-navlink]');
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var ao = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.getAttribute('id');
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { ao.observe(s); });
  }

  /* --- 8. Feature explorer (tab rail + panels) -------------------------- */
  var tabs = $$('[data-feature-tab]');
  var panels = $$('[data-feature-panel]');
  if (tabs.length && panels.length) {
    var select = function (key) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-feature-tab') === key;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        p.classList.toggle('active', p.getAttribute('data-feature-panel') === key);
      });
    };
    tabs.forEach(function (t) {
      t.addEventListener('click', function () { select(t.getAttribute('data-feature-tab')); });
      t.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();
        var i = tabs.indexOf(t) + (e.key === 'ArrowDown' ? 1 : -1);
        var n = tabs[(i + tabs.length) % tabs.length];
        n.focus(); select(n.getAttribute('data-feature-tab'));
      });
    });
  }

  /* --- 8b. Integration cluster: tap a bubble, open its detail ----------- */
  var hiveTabs = $$('[data-hive-tab]');
  var hivePanels = $$('[data-hive-panel]');
  if (hiveTabs.length && hivePanels.length) {
    var pickInt = function (key) {
      hiveTabs.forEach(function (t) { t.classList.toggle('active', t.getAttribute('data-hive-tab') === key); });
      hivePanels.forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-hive-panel') === key); });
    };
    hiveTabs.forEach(function (t) {
      t.addEventListener('click', function () { pickInt(t.getAttribute('data-hive-tab')); });
    });
    hiveTabs[0].classList.add('active');
  }

  /* --- 8c. Circuit board: tap a mark, read it, light its own family ----- */
  var brdNodes = $$('[data-brd-node]');
  var brdPanels = $$('[data-brd-panel]');
  if (brdNodes.length && brdPanels.length) {
    var chords = $$('[data-chord]');
    var pickBrd = function (n) {
      var key = n.getAttribute('data-brd-node');
      var cat = n.getAttribute('data-cat');
      brdNodes.forEach(function (o) { o.classList.toggle('active', o === n); });
      brdPanels.forEach(function (pn) { pn.classList.toggle('active', pn.getAttribute('data-brd-panel') === key); });
      chords.forEach(function (c) { c.classList.toggle('lit', !!cat && c.getAttribute('data-chord') === cat); });
    };
    brdNodes.forEach(function (n) { n.addEventListener('click', function () { pickBrd(n); }); });
    pickBrd(brdNodes[0]);
  }

  /* --- 9. Accordion (mobile features / v3 cards) ------------------------ */
  $$('[data-acc-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('[data-acc]');
      if (!item) return;
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* --- 10. Integration category filter --------------------------------- */
  var catBtns = $$('[data-cat]');
  var catGroups = $$('[data-cat-group]');
  if (catBtns.length && catGroups.length) {
    catBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-cat');
        catBtns.forEach(function (x) { x.classList.toggle('active', x === b); });
        catGroups.forEach(function (g) {
          var show = key === 'all' || g.getAttribute('data-cat-group') === key;
          g.hidden = !show;
        });
      });
    });
  }

  /* --- 11. Pricing region switcher ------------------------------------- */
  var dataEl = $('#pricing-data');
  var regionBtns = $$('[data-region]');
  if (dataEl && regionBtns.length) {
    var PLANS = {};
    try { PLANS = JSON.parse(dataEl.textContent); } catch (e) { PLANS = {}; }
    var apply = function (region) {
      var set = PLANS[region];
      if (!set) return;
      $$('[data-price-cell]').forEach(function (cell) {
        var plan = cell.getAttribute('data-plan');
        var field = cell.getAttribute('data-field');
        if (set[plan] && set[plan][field] != null) {
          cell.classList.add('is-updating');
          cell.textContent = set[plan][field];
          setTimeout(function () { cell.classList.remove('is-updating'); }, 260);
        }
      });
      $$('[data-month-unit]').forEach(function (el) { el.textContent = set.monthUnit || ''; });
      $$('[data-region-name]').forEach(function (el) { el.textContent = set.name || ''; });
      regionBtns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-region') === region); });
      var sel = $('#regionSelect');
      if (sel && sel.value !== region) sel.value = region;
    };
    regionBtns.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-region')); });
    });
    var sel = $('#regionSelect');
    if (sel) sel.addEventListener('change', function () { apply(sel.value); });
  }

  /* --- 12. Contact form (no backend — demo confirmation) ---------------- */
  var form = $('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var thanks = document.createElement('div');
      thanks.className = 'form-thanks';
      thanks.innerHTML = '<h3>Thank you!</h3><p>We have received your message and will be in touch shortly.</p>';
      form.style.transition = 'opacity .3s ease';
      form.style.opacity = '0';
      setTimeout(function () {
        form.style.display = 'none';
        form.parentNode.appendChild(thanks);
        requestAnimationFrame(function () { thanks.classList.add('visible'); });
      }, 300);
    });
  }

  /* --- 13. Product tour: 10 app screens played like a video ------------- */
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tour = $('[data-tour]');
  if (tour) {
    var tSlides = $$('.mb-slide', tour);
    var tBar = $('[data-tour-bar]', tour);
    var tCap = $('[data-tour-caption]', tour);
    var tTab = $('[data-tour-tab]', tour);
    var tIdx = $('[data-tour-index]', tour);
    var tBtn = $('[data-tour-toggle]', tour);
    var HOLD = 2600;           // ms each screen stays up
    var cur = 0, elapsed = 0, last = 0, playing = !reduced, raf = null, hovering = false;

    var paint = function (i) {
      tSlides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
      var s = tSlides[i];
      if (tCap) tCap.textContent = s.getAttribute('data-caption') || '';
      if (tTab) tTab.textContent = s.getAttribute('data-tab') || '';
      if (tIdx) tIdx.textContent = ('0' + (i + 1)).slice(-2);
    };
    var step = function (ts) {
      if (!last) last = ts;
      var dt = ts - last; last = ts;
      if (playing && !hovering) elapsed += dt;
      var p = Math.min(elapsed / HOLD, 1);
      if (tBar) tBar.style.width = (p * 100) + '%';
      if (p >= 1) { elapsed = 0; cur = (cur + 1) % tSlides.length; paint(cur); }
      raf = requestAnimationFrame(step);
    };
    var setPlaying = function (on) {
      playing = on;
      tour.classList.toggle('is-paused', !on);
      if (tBtn) tBtn.setAttribute('aria-label', on ? 'Pause the product tour' : 'Play the product tour');
    };
    if (tBtn) tBtn.addEventListener('click', function () { setPlaying(!playing); });
    tour.addEventListener('mouseenter', function () { hovering = true; });
    tour.addEventListener('mouseleave', function () { hovering = false; });
    setPlaying(playing);
    if (tSlides.length > 1) {
      // Only run the clock while the mock is on screen.
      if ('IntersectionObserver' in window) {
        var tio = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting && !raf) { last = 0; raf = requestAnimationFrame(step); }
            else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
          });
        }, { threshold: 0.15 });
        tio.observe(tour);
      } else {
        raf = requestAnimationFrame(step);
      }
    }
  }

  /* --- 13b. Phone screens cycle on their own, offset from the browser --- */
  var phone = $('[data-phone]');
  if (phone) {
    var pSlides = $$('.mp-slide', phone);
    if (pSlides.length > 1 && !reduced) {
      var pi = 0;
      setInterval(function () {
        pi = (pi + 1) % pSlides.length;
        pSlides.forEach(function (s, n) { s.classList.toggle('is-active', n === pi); });
      }, 3800);
    }
  }

  /* --- 14. Smooth anchor scrolling with nav offset --------------------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      var t = document.getElementById(id.slice(1));
      if (!t) return;
      e.preventDefault();
      var offset = nav ? nav.offsetHeight + 12 : 0;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* --- 15. Current year in footers ------------------------------------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
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

  $$('.card, .bay-type, .blog-card, .cust-card, .feat-plate').forEach(function (el) { track(el); });
})();
