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

  $$('.card, .bay-type, .blog-card, .feat-tile').forEach(function (el) { track(el); });
})();
