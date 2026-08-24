/* =========================================================================
   MECHANICDESK — V3 "FLIGHT DECK", the extra behaviour
   Appended after the shared runtime (build/app.js) into v3/script.js, so
   everything the main page does — popup, disclosures, product tour, pricing
   switcher, nav, reveals — already works. This file adds only what the flight
   deck itself needs:

     A  boot sequence   the deck powers up once, then the class comes off
     B  gauge rail      the needle follows the scroll, stops light as you pass
     C  status line     one short readout in the nav, typed out on load
     D  scan height     tells the CSS how far a slot's scan line should travel

   Written for the same browser baseline as the rest: const/let, arrows,
   IntersectionObserver. Every block guards for its own markup.
   ========================================================================= */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const root = document.documentElement;

  /* ── A. Boot sequence ─────────────────────────────────────────────────
     The deck starts with .booting on <html>, which holds the eyebrow, the
     three headline lines, the buttons, the live view and the telemetry out of
     position. Removing the class lets the staggered CSS transitions run, so
     the whole sequence is one class change and the timings live in the
     stylesheet where they can be tuned. */
  const boot = () => root.classList.remove('booting');
  if (reducedMotion) boot();
  else requestAnimationFrame(() => requestAnimationFrame(boot));

  /* ── B. The gauge rail ────────────────────────────────────────────────
     --p is scroll progress, 0..1, written on the rail; the needle's transform
     is the only thing that moves. The stops light from the same pass, using
     the position of each section rather than a second observer. */
  const rail = $('.rail');
  if (rail) {
    const needle = $('[data-needle]', rail);
    const stops = $$('.rail-stop', rail).map((el) => ({
      el,
      section: document.getElementById(el.getAttribute('data-stop'))
    })).filter((s) => s.section);

    let queued = false;

    const update = () => {
      queued = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      if (needle) rail.style.setProperty('--p', progress.toFixed(4));

      /* the stop we are in is the last one whose top has passed the middle */
      const line = window.scrollY + window.innerHeight * 0.42;
      let active = stops[0];
      stops.forEach((stop) => {
        if (stop.section.offsetTop <= line) active = stop;
      });
      stops.forEach((stop) => stop.el.classList.toggle('on', stop === active));
    };

    window.addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ── C. Status line ───────────────────────────────────────────────────
     One short readout, typed out once. It says something true and specific
     rather than decorative: how many workshops are on it. */
  const statusLine = $('[data-boot-line]');
  if (statusLine) {
    /* the text is already in the HTML, so it is there with or without this */
    const text = statusLine.textContent.trim();
    if (!reducedMotion) {
      statusLine.textContent = '';
      let i = 0;
      const type = () => {
        statusLine.textContent = text.slice(0, i += 1);
        if (i < text.length) setTimeout(type, 26);
      };
      setTimeout(type, 900);        /* after the headline has landed */
    }
  }

  /* ── D. Scan height ───────────────────────────────────────────────────
     The scan line on a module slot travels the height of that slot. The slots
     are square-ish and fluid, so the distance is measured rather than guessed,
     and re-measured if the window changes. */
  const slots = $$('.slot');
  if (slots.length && !reducedMotion) {
    const measure = () => {
      slots.forEach((slot) => slot.style.setProperty('--scan', `${slot.offsetHeight}px`));
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
  }
})();
