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

  /* --- 13. Smooth anchor scrolling with nav offset --------------------- */
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

  /* --- 14. Current year in footers ------------------------------------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
