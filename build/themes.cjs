/* =========================================================================
   TONES — two more colour tones for each design, generated from one file.

   Both designs are token-driven, so a tone is mostly a new :root. What it is
   not only a new :root is the handful of places where a dark page was assumed:
   white hairlines, white glows, a white outline behind near-black logos, images
   dimmed to sit on black, translucent white surface tints. Those are listed
   explicitly below, per design, so nothing is left half-converted.

     mid    — lifted graphite. Still a dark page, but a lit room rather than a
              black one. Everything dark-page still holds, so this is almost
              purely a palette swap.
     light  — a proper light page: near-white paper, graphite ink, and the amber
              darkened to #d97a06 so it can carry text and small marks on white.
     duo    — warm daylight paper for everything that has to be READ, and two
              full-bleed dark bands for the things that have to IMPRESS: the
              hero with the live app in it, and the integration board. Both are
              light-on-dark by nature and go flat on white. The dark bands are
              token islands, so every rule inside them behaves like the dark
              design again — including the board's white traces and the white
              outline behind near-black logos.
     cool   — fresh without touching the brand: cool ice-blue paper, deep navy
              ink, and the amber left exactly where it was. Blue is amber's
              opposite on the wheel, so the orange reads brighter here than it
              does on grey. The only amber that moves is amber used as small
              TEXT, which measures about 2:1 on this ground — eyebrows, arrow
              links, module IDs and the little + markers take --accent-ink
              instead. Buttons, icon plates, icon glyphs, the logo tint, the
              status lights and the light on the board are untouched.

   Usage:  themes(design, tone)  →  CSS appended after the design's stylesheet.
           design: 'graphite' (the main page) | 'deck' (V3)
           tone:   'mid' | 'light' | 'cool' | 'duo'
   ========================================================================= */

/* ---------------------------------------------------------------- tokens -- */
const TOKENS = {
  mid: `
  --bg: #1b2028;
  --bg-2: #222933;
  --surface: #29313c;
  --card: #303a46;
  --line: rgba(255, 255, 255, 0.10);
  --line-2: rgba(255, 255, 255, 0.18);
  --line-3: rgba(255, 255, 255, 0.28);
  --text: #f4f7fa;
  --text-2: #c6cfda;
  --muted: #909cab;`,

  light: `
  --bg: #f5f7f9;
  --bg-2: #eceff4;
  --surface: #e4e9ef;
  --card: #ffffff;
  --line: rgba(18, 24, 33, 0.10);
  --line-2: rgba(18, 24, 33, 0.18);
  --line-3: rgba(18, 24, 33, 0.28);
  --text: #111721;
  --text-2: #46515f;
  --muted: #6d7885;

  /* amber has to carry text and 1px marks on white, so it comes down a stop.
     The brand orange stays for fills, where it has enough area to read. */
  --accent: #d97a06;
  --accent-2: #ffb43a;
  --accent-ink: #a85c04;
  --accent-glow: rgba(217, 122, 6, 0.20);
  --redline: #d43a1c;`,

  cool: `
  --bg: #f1f5fb;                 /* cool ice paper */
  --bg-2: #e7eef8;
  --surface: #dce7f4;
  --card: #ffffff;
  --line: rgba(14, 24, 38, 0.10);
  --line-2: rgba(14, 24, 38, 0.18);
  --line-3: rgba(14, 24, 38, 0.28);
  --text: #0e1826;               /* deep navy ink */
  --text-2: #41506a;
  --muted: #6a7893;

  /* the brand amber does not move: buttons, icon plates, icon glyphs, the logo
     tint, the status lights and the light on the board all stay #fca311. Blue
     is amber's opposite, so it reads brighter here than it did on grey. */
  --accent: #fca311;
  --accent-2: #ff8a00;
  --accent-glow: rgba(252, 163, 17, 0.24);
  /* amber used as small TEXT measures about 2:1 on this ground, so type takes a
     darker one from the same family — see the overrides below */
  --accent-ink: #a35c04;
  --redline: #e0492a;`,

  duo: `
  --bg: #faf8f4;                 /* warm daylight paper */
  --bg-2: #f3f0ea;
  --surface: #eae5dc;
  --card: #ffffff;
  --line: rgba(26, 23, 19, 0.10);
  --line-2: rgba(26, 23, 19, 0.18);
  --line-3: rgba(26, 23, 19, 0.28);
  --text: #191612;
  --text-2: #4b453c;
  --muted: #7a7265;

  /* the brand amber is untouched; only amber-as-small-text steps down */
  --accent: #fca311;
  --accent-2: #ff8a00;
  --accent-glow: rgba(252, 163, 17, 0.24);
  --accent-ink: #9a5804;
  --redline: #d8462a;`
};

/* The two dark bands. Re-declaring the palette on a section turns every rule
   inside it back into the dark design — including the board's white traces and
   the white outline behind near-black logos, which is why the island has to
   carry --lift as well. */
const DARK_ISLAND = `
  --bg: #101418; --bg-2: #14181d; --surface: #171c22; --card: #1b2129;
  --line: rgba(255, 255, 255, .08); --line-2: rgba(255, 255, 255, .15); --line-3: rgba(255, 255, 255, .24);
  --text: #f2f5f7; --text-2: #b3bcc6; --muted: #7d8794;
  --accent-ink: #ffb43a;
  --lift: brightness(1.16) drop-shadow(0 0 1px rgba(255,255,255,.98)) drop-shadow(0 0 1px rgba(255,255,255,.92))
    drop-shadow(0 0 2px rgba(255,255,255,.6)) drop-shadow(0 1px 3px rgba(0,0,0,.85));
  --lift-on: brightness(1.2) drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff)
    drop-shadow(0 0 3px rgba(255,255,255,.8)) drop-shadow(0 0 12px rgba(252,163,17,.45));
  background: #101418; color: var(--text-2);`;

const DARK_BOARD = `
.bus { stroke: rgba(255, 255, 255, .14); }
.spoke { stroke: rgba(255, 255, 255, .13); }
.via { stroke: rgba(255, 255, 255, .17); }
.p-in, .p-out, .p-spoke, .p-via { stroke: #fff; filter: drop-shadow(0 0 7px rgba(255, 255, 255, .85)); }
.brd-node .mk { filter: brightness(1.14) saturate(1.05) drop-shadow(0 0 9px #101418) drop-shadow(0 0 5px #101418) drop-shadow(0 8px 16px rgba(0, 0, 0, .65)); }
.brd-chip { background: linear-gradient(160deg, #1f262f, #0e1216); box-shadow: 0 0 0 1px rgba(255,255,255,.14), 0 18px 40px rgba(0,0,0,.6); }
.brd-chip-label { background: rgba(16, 20, 24, .75); color: var(--text); }
.brd-dots { background-image: radial-gradient(circle, rgba(255, 255, 255, .115) 1px, transparent 1.4px); }
.brd-node.active .mk { filter: brightness(1.32) saturate(1.14) drop-shadow(0 0 9px #101418) drop-shadow(0 0 12px rgba(252,163,17,.5)) !important; }`;

/* --------------------------------------------------- the board, both tones -- */
/* The circuit board is the same module on every page, and it is drawn in white:
   hairlines, running light, the halo behind each mark. On a light page every one
   of those has to turn over. */
const BOARD = {
  mid: `
/* the board only needs its hairlines a touch stronger against a lifted ground */
.bus { stroke: rgba(255, 255, 255, 0.16); }
.spoke { stroke: rgba(255, 255, 255, 0.15); }
.via { stroke: rgba(255, 255, 255, 0.20); }
.brd-node .mk { filter: brightness(1.14) saturate(1.05) drop-shadow(0 0 9px #1b2028) drop-shadow(0 0 5px #1b2028) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.55)); }`,

  light: `
/* on paper the traces are ink, the light running them is amber, and the marks
   need a light halo instead of a dark one */
.bus { stroke: rgba(18, 24, 33, 0.16); }
.spoke { stroke: rgba(18, 24, 33, 0.15); }
.via { stroke: rgba(18, 24, 33, 0.18); }
.p-in, .p-out, .p-spoke, .p-via { stroke: var(--accent); filter: drop-shadow(0 0 6px rgba(217, 122, 6, 0.55)); }
.brd-node .mk { filter: drop-shadow(0 0 8px #fff) drop-shadow(0 0 4px #fff) drop-shadow(0 6px 12px rgba(18, 24, 33, 0.18)); }
/* the white outline that rescued near-black logos on a dark page would ruin
   them here — on paper their own ink is the contrast */
.node .mk.lift, .node:hover .mk.lift, .node.active .mk.lift {
  filter: drop-shadow(0 0 8px #fff) drop-shadow(0 6px 12px rgba(18, 24, 33, 0.18));
}
.brd-chip {
  background: #fff;
  box-shadow: 0 0 0 1px rgba(18, 24, 33, 0.12), 0 18px 40px -18px rgba(18, 24, 33, 0.35);
}
.brd-chip-label { background: rgba(255, 255, 255, 0.85); color: var(--text); }
.brd-halo { opacity: .5; }
.brd-ping { border-color: rgba(217, 122, 6, 0.45); }
.brd-dots { background-image: radial-gradient(circle, rgba(18, 24, 33, 0.14) 1px, transparent 1.4px); }
.brd-node.active .mk {
  filter: brightness(1.02) drop-shadow(0 0 8px #fff) drop-shadow(0 0 14px rgba(217, 122, 6, 0.45)) !important;
}`,

  cool: `
/* the board keeps its amber light — only the ink of the traces changes */
.bus { stroke: rgba(14, 24, 38, 0.16); }
.spoke { stroke: rgba(14, 24, 38, 0.15); }
.via { stroke: rgba(14, 24, 38, 0.18); }
.p-in, .p-out, .p-spoke, .p-via { stroke: var(--accent); filter: drop-shadow(0 0 7px rgba(252, 163, 17, 0.75)); }
.brd-node .mk { filter: drop-shadow(0 0 8px #fff) drop-shadow(0 0 4px #fff) drop-shadow(0 6px 12px rgba(14, 24, 38, 0.16)); }
.node .mk.lift, .node:hover .mk.lift, .node.active .mk.lift {
  filter: drop-shadow(0 0 8px #fff) drop-shadow(0 6px 12px rgba(14, 24, 38, 0.16));
}
.brd-chip { background: #fff; box-shadow: 0 0 0 1px rgba(14, 24, 38, 0.12), 0 18px 40px -18px rgba(14, 24, 38, 0.3); }
.brd-chip-label { background: rgba(255, 255, 255, 0.85); color: var(--text); }
.brd-halo { opacity: .55; }
.brd-dots { background-image: radial-gradient(circle, rgba(14, 24, 38, 0.13) 1px, transparent 1.4px); }
.brd-node.active .mk {
  filter: brightness(1.02) drop-shadow(0 0 8px #fff) drop-shadow(0 0 14px rgba(252, 163, 17, 0.5)) !important;
}`,

  /* the board sits inside a dark band, so it keeps the dark design's drawing */
  duo: ''
};

const GRAPHITE_FIX = {
  mid: `
/* the hazard tape's dark stripe follows the ground up */
:root { --tape-bg: repeating-linear-gradient(-45deg, var(--accent) 0 6px, #202730 6px 12px); }
.nav-inner { background: rgba(27, 32, 40, 0.84) !important; }
.drawer { background: rgba(27, 32, 40, 0.97); }
.footer { background: #151a21; }
.bay-type-img { background: #232933; }`,

  light: `
/* ---- surfaces that were translucent white on a dark page ---------------- */
.nav-inner { background: rgba(245, 247, 249, 0.86) !important; box-shadow: 0 10px 30px rgba(18, 24, 33, 0.10) !important; }
.drawer { background: rgba(245, 247, 249, 0.98); }
.cf { background: rgba(18, 24, 33, 0.03); }
.segmented { background: rgba(18, 24, 33, 0.04); }
/* ---- boxes get to be boxes ---------------------------------------------- */
/* The dark design is borderless on purpose; on paper the same text blocks want
   a card around them, and a card needs padding or the shadow hugs the words. */
.card, .quote, .info-card {
  background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
  padding: clamp(1.15rem, 1.8vw, 1.6rem);
  box-shadow: 0 14px 34px -26px rgba(18, 24, 33, 0.45);
}
.quote { padding-top: clamp(1.5rem, 2.2vw, 2rem); }     /* room for the “ mark */
.quote-mark { top: 0.2rem; left: 0.9rem; }
.blog-card {
  background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
  overflow: hidden; gap: 0;
  box-shadow: 0 14px 34px -26px rgba(18, 24, 33, 0.45);
}
.blog-img { border-radius: 0; }
.blog-body { padding: clamp(1.15rem, 1.8vw, 1.6rem); }
.info-card .disc:last-child .disc-body > :last-child { padding-bottom: 0; }

/* the map is not in dark mode any more */
.map iframe { filter: none; }

/* ---- the line above the footer: amber and paper, not amber and navy ------ */
:root { --tape-bg: repeating-linear-gradient(-45deg, var(--accent) 0 6px, #ffffff 6px 12px); }
/* .footer > .tape carries its own opacity, so it needs matching specificity —
   at 0.55 an amber-and-white tape washes out to nothing on paper */
.tape, .footer > .tape { opacity: 1; }
.bay-type-img { background: var(--surface); }
.footer { background: var(--bg-2); border-top: 1px solid var(--line); }
.footer::before { opacity: .06; }              /* the tyre tread, barely there */

/* ---- ink where there was light ----------------------------------------- */
:root {
  --carbon: repeating-linear-gradient(45deg, rgba(18,24,33,.03) 0 1px, transparent 1px 3px),
            repeating-linear-gradient(-45deg, rgba(18,24,33,.022) 0 1px, transparent 1px 3px);
  --brushed: repeating-linear-gradient(90deg, rgba(18,24,33,.05) 0 1px, transparent 1px 4px);
  --dash: repeating-linear-gradient(90deg, rgba(18,24,33,.22) 0 3px, transparent 3px 7px);
}
.hero-grid-lines { background-image: linear-gradient(90deg, rgba(18, 24, 33, 0.06) 1px, transparent 1px); }
.hero-glow { background: radial-gradient(circle, rgba(217, 122, 6, 0.10) 0%, rgba(217, 122, 6, 0.03) 40%, transparent 68%); }
.feat-plate-bolt { color: rgba(18, 24, 33, 0.18); }
.demo-watermark { color: var(--accent); opacity: 0.10; }
.pop-scroll { scrollbar-color: rgba(18, 24, 33, 0.25) transparent; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(18, 24, 33, 0.22); }
.pop::backdrop { background: rgba(18, 24, 33, 0.45); }

/* ---- photography no longer has to sit on black -------------------------- */
.bay-type-img img { filter: none; }
.blog-img img { filter: none; }

/* ---- the amber button needs white type at this darkness ----------------- */
.btn-primary, .seg.active, .badge, .social:hover, .mb-play { color: #fff !important; }
.cta-box { background: linear-gradient(120deg, #d97a06 0%, #ff8a00 100%); color: #fff; }
.cta-box h2, .cta-box p { color: #fff; }
.cta-box .btn-primary { background: #12181f; color: #ffb43a; }
.btn-ghost { border-color: rgba(255, 255, 255, 0.5); color: #fff; }

.mock-browser { box-shadow: 0 30px 70px -32px rgba(18, 24, 33, 0.45); }

/* The product tour is a dark device on a light page — a photograph of the app,
   in effect. It keeps a dark island of tokens so its own chrome (the URL, the
   caption, the slide counter) stays legible inside it. */
.mock {
  --text: #eef1f3; --text-2: #c9d1d7; --muted: #8b959e; --accent: #ffb43a;
  --line: rgba(255, 255, 255, .08); --line-2: rgba(255, 255, 255, .14);
}`,

  cool: `
/* ---- the same structural turns as the light tone, in cool ink ----------- */
.nav-inner { background: rgba(241, 245, 251, 0.86) !important; box-shadow: 0 10px 30px rgba(14, 24, 38, 0.10) !important; }
.drawer { background: rgba(241, 245, 251, 0.98); }
.cf { background: rgba(14, 24, 38, 0.03); }
.segmented { background: rgba(14, 24, 38, 0.04); }
/* ---- boxes get to be boxes ---------------------------------------------- */
/* The dark design is borderless on purpose; on paper the same text blocks want
   a card around them, and a card needs padding or the shadow hugs the words. */
.card, .quote, .info-card {
  background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
  padding: clamp(1.15rem, 1.8vw, 1.6rem);
  box-shadow: 0 14px 34px -26px rgba(14, 24, 38, 0.45);
}
.quote { padding-top: clamp(1.5rem, 2.2vw, 2rem); }     /* room for the “ mark */
.quote-mark { top: 0.2rem; left: 0.9rem; }
.blog-card {
  background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
  overflow: hidden; gap: 0;
  box-shadow: 0 14px 34px -26px rgba(14, 24, 38, 0.45);
}
.blog-img { border-radius: 0; }
.blog-body { padding: clamp(1.15rem, 1.8vw, 1.6rem); }
.info-card .disc:last-child .disc-body > :last-child { padding-bottom: 0; }

/* the map is not in dark mode any more */
.map iframe { filter: none; }

/* ---- the line above the footer: amber and paper, not amber and navy ------ */
:root { --tape-bg: repeating-linear-gradient(-45deg, var(--accent) 0 6px, #ffffff 6px 12px); }
/* .footer > .tape carries its own opacity, so it needs matching specificity —
   at 0.55 an amber-and-white tape washes out to nothing on paper */
.tape, .footer > .tape { opacity: 1; }
.bay-type-img { background: var(--surface); }
.footer { background: var(--bg-2); border-top: 1px solid var(--line); }
.footer::before { opacity: .05; }
:root {
  --carbon: repeating-linear-gradient(45deg, rgba(14,24,38,.03) 0 1px, transparent 1px 3px),
            repeating-linear-gradient(-45deg, rgba(14,24,38,.022) 0 1px, transparent 1px 3px);
  --brushed: repeating-linear-gradient(90deg, rgba(14,24,38,.05) 0 1px, transparent 1px 4px);
  --dash: repeating-linear-gradient(90deg, rgba(14,24,38,.22) 0 3px, transparent 3px 7px);
}
.hero-grid-lines { background-image: linear-gradient(90deg, rgba(14, 24, 38, 0.06) 1px, transparent 1px); }
.hero-glow { background: radial-gradient(circle, rgba(252, 163, 17, 0.13) 0%, rgba(252, 163, 17, 0.04) 40%, transparent 68%); }
.feat-plate-bolt { color: rgba(14, 24, 38, 0.18); }
.demo-watermark { opacity: 0.12; }
.pop-scroll { scrollbar-color: rgba(14, 24, 38, 0.25) transparent; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(14, 24, 38, 0.22); }
.pop::backdrop { background: rgba(14, 24, 38, 0.45); }
.bay-type-img img, .blog-img img { filter: none; }

/* ---- amber as small type only ------------------------------------------ */
/* Buttons, icon plates, icon glyphs, the logo tint and the board's light are
   left alone; these are the places amber was doing the work of ink. */
.eyebrow, .link-arrow, .sec-head .link-arrow { color: var(--accent-ink); }
.au-tile:hover .au-plus, .disc.open .disc-plus { color: var(--accent-ink); }
.brand em { color: var(--accent-ink); }
.quote-mark { color: rgba(163, 92, 4, 0.28); }

/* the tour keeps a dark island so its own chrome stays legible */
.mock {
  --text: #eef1f3; --text-2: #c9d1d7; --muted: #8b959e;
  --line: rgba(255, 255, 255, .08); --line-2: rgba(255, 255, 255, .14);
}
.mock-browser { box-shadow: 0 30px 70px -32px rgba(14, 24, 38, 0.42); }`,

  duo: `
/* ---- the light page ------------------------------------------------------ */
.nav-inner { background: rgba(250, 248, 244, 0.86) !important; box-shadow: 0 10px 30px rgba(26, 23, 19, 0.10) !important; }
/* the nav pill is paper from the first pixel: it sits over the dark hero band,
   and a transparent pill there would put dark ink on a dark ground */
.nav-inner { background: rgba(250, 248, 244, 0.92) !important; }
.drawer { background: rgba(250, 248, 244, 0.98); }
.cf { background: rgba(26, 23, 19, 0.03); }
.segmented { background: rgba(26, 23, 19, 0.04); }
/* ---- boxes get to be boxes ---------------------------------------------- */
/* The dark design is borderless on purpose; on paper the same text blocks want
   a card around them, and a card needs padding or the shadow hugs the words. */
.card, .quote, .info-card {
  background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
  padding: clamp(1.15rem, 1.8vw, 1.6rem);
  box-shadow: 0 14px 34px -26px rgba(26, 23, 19, 0.45);
}
.quote { padding-top: clamp(1.5rem, 2.2vw, 2rem); }     /* room for the “ mark */
.quote-mark { top: 0.2rem; left: 0.9rem; }
.blog-card {
  background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
  overflow: hidden; gap: 0;
  box-shadow: 0 14px 34px -26px rgba(26, 23, 19, 0.45);
}
.blog-img { border-radius: 0; }
.blog-body { padding: clamp(1.15rem, 1.8vw, 1.6rem); }
.info-card .disc:last-child .disc-body > :last-child { padding-bottom: 0; }

/* the map is not in dark mode any more */
.map iframe { filter: none; }

/* ---- the line above the footer: amber and paper, not amber and navy ------ */
:root { --tape-bg: repeating-linear-gradient(-45deg, var(--accent) 0 6px, #ffffff 6px 12px); }
/* .footer > .tape carries its own opacity, so it needs matching specificity —
   at 0.55 an amber-and-white tape washes out to nothing on paper */
.tape, .footer > .tape { opacity: 1; }
.bay-type-img { background: var(--surface); }
.bay-type-img img, .blog-img img { filter: none; }
:root {
  --carbon: repeating-linear-gradient(45deg, rgba(26,23,19,.03) 0 1px, transparent 1px 3px),
            repeating-linear-gradient(-45deg, rgba(26,23,19,.022) 0 1px, transparent 1px 3px);
  --brushed: repeating-linear-gradient(90deg, rgba(26,23,19,.05) 0 1px, transparent 1px 4px);
  --dash: repeating-linear-gradient(90deg, rgba(26,23,19,.22) 0 3px, transparent 3px 7px);
}
.eyebrow, .link-arrow { color: var(--accent-ink); }
.au-tile:hover .au-plus, .disc.open .disc-plus { color: var(--accent-ink); }
.brand em { color: var(--accent-ink); }
.quote-mark { color: rgba(154, 88, 4, .26); }
.feat-plate-bolt { color: rgba(26, 23, 19, .18); }
.pop-scroll { scrollbar-color: rgba(26, 23, 19, .25) transparent; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(26, 23, 19, .22); }
.pop::backdrop { background: rgba(26, 23, 19, .45); }
.demo-watermark { opacity: .12; }

/* ---- the two dark bands ------------------------------------------------- */
.hero, .sec-integrations { ${DARK_ISLAND} }
.hero { padding-bottom: clamp(2rem, 4vw, 3.5rem); }
.sec-integrations { margin-top: 0; }
.hero .eyebrow, .sec-integrations .eyebrow,
.hero .link-arrow, .sec-integrations .link-arrow { color: var(--accent); }
.hero-grid-lines { background-image: linear-gradient(90deg, rgba(255, 255, 255, .07) 1px, transparent 1px); }
.hero-glow { background: radial-gradient(circle, rgba(252, 163, 17, .16) 0%, rgba(252, 163, 17, .04) 40%, transparent 68%); }
.sec-integrations .int-hint { color: var(--muted); }
${DARK_BOARD}
/* the tape between the bands and the paper reads as the seam of the two */
.sec-bay .tape, .tape { opacity: 1; }`
};

/* --------------------------------------------------------- deck (V3) ------- */
const DECK_FIX = {
  mid: `
body {
  background:
    radial-gradient(120% 62% at 50% -12%, #2b3442 0%, rgba(43, 52, 66, 0) 62%),
    radial-gradient(70% 40% at 88% 8%, rgba(252, 163, 17, .08), transparent 60%),
    var(--bg);
}
.nav.scrolled { background: rgba(27, 32, 40, 0.82); }
.drawer { background: rgba(27, 32, 40, 0.97); }
.pop::backdrop { background: rgba(12, 16, 21, .78); }`,

  light: `
/* ---- the ground: paper lit from above ---------------------------------- */
body {
  background:
    radial-gradient(120% 62% at 50% -12%, #ffffff 0%, rgba(255, 255, 255, 0) 62%),
    radial-gradient(70% 40% at 88% 6%, rgba(217, 122, 6, .07), transparent 60%),
    var(--bg);
}
:root {
  /* the rim was light catching a machined edge on a dark panel; on paper the
     same edge is a shadow */
  --rim: linear-gradient(135deg, rgba(18, 24, 33, .22), rgba(18, 24, 33, .06) 40%, rgba(217, 122, 6, .18) 78%, rgba(18, 24, 33, .04));
  --sheen: inset 0 1px 0 rgba(255, 255, 255, .9);
}
.bezel { box-shadow: var(--sheen), 0 20px 50px -34px rgba(18, 24, 33, .45); }
.nav.scrolled { background: rgba(245, 247, 249, 0.84); box-shadow: 0 8px 26px rgba(18, 24, 33, 0.08); }
.drawer { background: rgba(245, 247, 249, 0.97); }
.deck-grid { background-image: repeating-linear-gradient(90deg, rgba(18, 24, 33, .07) 0 1px, transparent 1px 25%); }
.deck-glow { background: radial-gradient(ellipse at 50% 50%, rgba(217, 122, 6, .12), transparent 62%); }

/* ---- brushed chrome becomes brushed graphite ---------------------------- */
.chrome { background-image: linear-gradient(176deg, #39434f 2%, #161d27 28%, #55616f 52%, #10161e 70%, #39434f 98%); }
.chrome.gold { background-image: linear-gradient(176deg, #b8690a 2%, #d97a06 28%, #ffb43a 52%, #a85c04 74%, #c26f08 98%); }
.chrome::after { background: linear-gradient(105deg, transparent 38%, rgba(255, 255, 255, .55) 48%, transparent 58%); }
/* the cursor light was a white soft-light wash: on paper it does nothing but
   grey the type, so it stays out */
.glimmer { display: none; }

/* ---- surfaces, inputs, scrollbars -------------------------------------- */
.channels li { background: transparent; }
.cf input, .cf textarea { background: #fff; }
.cf input:focus, .cf textarea:focus { background: #fff; }
.slot { background: var(--card); }
.slot:hover { background: var(--bg-2); }
.bay, .film, .posts { background: var(--line); }
.post, .frame { background: var(--card); }
.tx { background: linear-gradient(180deg, rgba(18, 24, 33, .03), rgba(18, 24, 33, .01)) padding-box,
      linear-gradient(135deg, rgba(18, 24, 33, .16), rgba(18, 24, 33, .04) 46%, transparent) border-box; }
.pop-in { background: linear-gradient(180deg, #fff, var(--card)) padding-box, var(--rim) border-box; }
.pop-x { background: rgba(255, 255, 255, .9); }
.pop::backdrop { background: rgba(18, 24, 33, .45); }
.pop-scroll { scrollbar-color: rgba(18, 24, 33, .25) transparent; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(18, 24, 33, .22); }
.pop-bolt { color: rgba(18, 24, 33, .2); }
.demo-watermark { opacity: .1; }

/* ---- photography and the amber button ---------------------------------- */
.frame img, .post-img img { filter: none; }
.btn-key { color: #fff; background: linear-gradient(180deg, #f09318, #d97a06 42%, #b3620a); }
.mb-play { color: #fff; }
.foot { background: var(--bg-2); border-top: 1px solid var(--line-2); }
.mock-browser { box-shadow: 0 30px 70px -32px rgba(18, 24, 33, .45); }

/* The product tour is a dark device on a light page — a photograph of the app,
   in effect. It keeps a dark island of tokens so its own chrome (the URL, the
   caption, the slide counter) stays legible inside it. */
.mock {
  --text: #eef1f3; --text-2: #c9d1d7; --muted: #8b959e; --accent: #ffb43a;
  --line: rgba(255, 255, 255, .08); --line-2: rgba(255, 255, 255, .14);
}`,

  cool: `
/* ---- the ground: ice paper, lit from above ------------------------------ */
body {
  background:
    radial-gradient(120% 62% at 50% -12%, #ffffff 0%, rgba(255, 255, 255, 0) 62%),
    radial-gradient(70% 40% at 88% 6%, rgba(252, 163, 17, .09), transparent 60%),
    var(--bg);
}
:root {
  --rim: linear-gradient(135deg, rgba(14, 24, 38, .2), rgba(14, 24, 38, .05) 40%, rgba(252, 163, 17, .24) 78%, rgba(14, 24, 38, .04));
  --sheen: inset 0 1px 0 rgba(255, 255, 255, .9);
}
.bezel { box-shadow: var(--sheen), 0 20px 50px -34px rgba(14, 24, 38, .4); }
.nav.scrolled { background: rgba(241, 245, 251, 0.84); box-shadow: 0 8px 26px rgba(14, 24, 38, 0.08); }
.drawer { background: rgba(241, 245, 251, 0.97); }
.deck-grid { background-image: repeating-linear-gradient(90deg, rgba(14, 24, 38, .07) 0 1px, transparent 1px 25%); }
.deck-glow { background: radial-gradient(ellipse at 50% 50%, rgba(252, 163, 17, .14), transparent 62%); }

/* ---- brushed metal in cool steel, the accent word still amber ---------- */
.chrome { background-image: linear-gradient(176deg, #2b3a51 2%, #0e1826 28%, #4d5f7c 52%, #0b1420 70%, #2b3a51 98%); }
.chrome.gold { background-image: linear-gradient(176deg, #d68a12 2%, #fca311 26%, #ffbe52 52%, #b06a06 74%, #e59a17 98%); }
.chrome::after { background: linear-gradient(105deg, transparent 38%, rgba(255, 255, 255, .55) 48%, transparent 58%); }
.glimmer { display: none; }

/* ---- surfaces, inputs, scrollbars -------------------------------------- */
.channels li { background: transparent; }
.cf input, .cf textarea, .cf input:focus, .cf textarea:focus { background: #fff; }
.slot { background: var(--card); }
.slot:hover { background: var(--bg-2); }
.bay, .film, .posts { background: var(--line); }
.post, .frame { background: var(--card); }
.tx { background: linear-gradient(180deg, rgba(14, 24, 38, .03), rgba(14, 24, 38, .01)) padding-box,
      linear-gradient(135deg, rgba(14, 24, 38, .15), rgba(14, 24, 38, .04) 46%, transparent) border-box; }
.pop-in { background: linear-gradient(180deg, #fff, var(--card)) padding-box, var(--rim) border-box; }
.pop-x { background: rgba(255, 255, 255, .9); }
.pop::backdrop { background: rgba(14, 24, 38, .45); }
.pop-scroll { scrollbar-color: rgba(14, 24, 38, .25) transparent; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(14, 24, 38, .22); }
.pop-bolt { color: rgba(14, 24, 38, .2); }
.demo-watermark { opacity: .12; }
.sheet .pick { background: rgba(252, 163, 17, .06); }
.frame img, .post-img img { filter: none; }

/* ---- amber as small type only ------------------------------------------ */
.mod-id, .lnk, .rail-stop.on .rail-no, .slot:hover .slot-plus, .disc.open .disc-plus,
.pick-tag, .bd-cat, .mono-label { color: var(--accent-ink); }
.brand em { color: var(--accent-ink); }
.tick::before, .tick::after { background: var(--accent-ink); }
.foot { background: var(--bg-2); border-top: 1px solid var(--line-2); }

/* the tour keeps a dark island so its own chrome stays legible */
.mock {
  --text: #eef1f3; --text-2: #c9d1d7; --muted: #8b959e;
  --line: rgba(255, 255, 255, .08); --line-2: rgba(255, 255, 255, .14);
}
.mock-browser { box-shadow: 0 30px 70px -32px rgba(14, 24, 38, .42); }`,

  duo: `
/* ---- the light page ------------------------------------------------------ */
body {
  background:
    radial-gradient(120% 62% at 50% -12%, #ffffff 0%, rgba(255, 255, 255, 0) 62%),
    radial-gradient(70% 40% at 88% 6%, rgba(252, 163, 17, .08), transparent 60%),
    var(--bg);
}
:root {
  --rim: linear-gradient(135deg, rgba(26, 23, 19, .2), rgba(26, 23, 19, .05) 40%, rgba(252, 163, 17, .24) 78%, rgba(26, 23, 19, .04));
  --sheen: inset 0 1px 0 rgba(255, 255, 255, .9);
}
.bezel { box-shadow: var(--sheen), 0 20px 50px -34px rgba(26, 23, 19, .4); }
.nav.scrolled { background: rgba(250, 248, 244, .84); box-shadow: 0 8px 26px rgba(26, 23, 19, .08); }
.drawer { background: rgba(250, 248, 244, .97); }
.glimmer { display: none; }
.channels li { background: transparent; }
.cf input, .cf textarea, .cf input:focus, .cf textarea:focus { background: #fff; }
.slot { background: var(--card); }
.slot:hover { background: var(--bg-2); }
.bay, .film, .posts { background: var(--line); }
.post, .frame { background: var(--card); }
.tx { background: linear-gradient(180deg, rgba(26, 23, 19, .03), rgba(26, 23, 19, .01)) padding-box,
      linear-gradient(135deg, rgba(26, 23, 19, .15), rgba(26, 23, 19, .04) 46%, transparent) border-box; }
.pop-in { background: linear-gradient(180deg, #fff, var(--card)) padding-box, var(--rim) border-box; }
.pop-x { background: rgba(255, 255, 255, .9); }
.pop::backdrop { background: rgba(26, 23, 19, .45); }
.pop-scroll { scrollbar-color: rgba(26, 23, 19, .25) transparent; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(26, 23, 19, .22); }
.pop-bolt { color: rgba(26, 23, 19, .2); }
.sheet .pick { background: rgba(252, 163, 17, .07); }
.frame img, .post-img img { filter: none; }
.foot { background: #101418; border-top: 0; color: #b3bcc6; }
.foot .brand { color: #f2f5f7; }
.foot .mono-label { color: #7d8794; }
.demo-watermark { opacity: .12; }

/* amber as small type steps down on paper */
.mod-id, .lnk, .rail-stop.on .rail-no, .slot:hover .slot-plus, .disc.open .disc-plus,
.pick-tag, .bd-cat { color: var(--accent-ink); }
.brand em { color: var(--accent-ink); }
.tick::before, .tick::after { background: var(--accent-ink); }
.chrome { background-image: linear-gradient(176deg, #3a352d 2%, #17140f 28%, #5d564a 52%, #12100c 70%, #3a352d 98%); }
.chrome.gold { background-image: linear-gradient(176deg, #d68a12 2%, #fca311 26%, #ffbe52 52%, #b06a06 74%, #e59a17 98%); }

/* ---- the two dark bands ------------------------------------------------- */
.deck, #integrations { ${DARK_ISLAND} }
.deck { background: linear-gradient(180deg, #101418, #14181d); }
#integrations .mod-id, #integrations .lnk { color: var(--accent); }
#integrations .bezel { box-shadow: inset 0 1px 0 rgba(255,255,255,.1), 0 30px 70px -40px #000; }
#integrations { --rim: linear-gradient(135deg, rgba(255,255,255,.3), rgba(255,255,255,.06) 38%, rgba(252,163,17,.16) 78%, rgba(255,255,255,.04)); }
.deck-grid { background-image: repeating-linear-gradient(90deg, rgba(255, 255, 255, .06) 0 1px, transparent 1px 25%); }
.deck-glow { background: radial-gradient(ellipse at 50% 50%, rgba(252, 163, 17, .15), transparent 62%); }
${DARK_BOARD}`
};

const FIX = { graphite: GRAPHITE_FIX, deck: DECK_FIX };

module.exports = (design, tone) => {
  const name = { light: 'LIGHT', mid: 'MID', cool: 'COOL', duo: 'DUO' }[tone] || tone.toUpperCase();
  const label = design === 'deck' ? 'V3 "Flight deck"' : 'the main design';
  return `
/* =========================================================================
   TONE: ${name} — ${label}
   Generated by build/themes.cjs and appended after the design's own
   stylesheet, so the design is unchanged and only the palette moves. Anything
   below the tokens is a place where a dark page had been assumed.
   ========================================================================= */
:root {${TOKENS[tone]}
}
${FIX[design][tone]}
${BOARD[tone]}
`;
};
