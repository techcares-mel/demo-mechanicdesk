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
     cool   — the first tone that moves the HUE: mint paper, teal accent. Every
              hard-coded amber has to turn over with it. The one place amber
              stays is inside the product tour: those are real screenshots of an
              amber-branded app and cannot be recoloured.

   Usage:  themes(design, tone)  →  CSS appended after the design's stylesheet.
           design: 'graphite' (the main page) | 'deck' (V3)
           tone:   'mid' | 'light' | 'cool'
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
  --bg: #f1f7f5;                 /* mint paper */
  --bg-2: #e6f0ed;
  --surface: #dbeae5;
  --card: #ffffff;
  --line: rgba(11, 40, 34, 0.10);
  --line-2: rgba(11, 40, 34, 0.18);
  --line-3: rgba(11, 40, 34, 0.28);
  --text: #0c1f1b;               /* deep green-black */
  --text-2: #3d544d;
  --muted: #68807a;

  /* two greens: the darker one carries text and 1px marks, the brighter one is
     for fills, glows and anything with area */
  --accent: #0e8f78;
  --accent-2: #22c3a6;
  --accent-ink: #0a6b5a;
  --accent-glow: rgba(34, 195, 166, 0.22);
  --redline: #d9534f;`
};

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
/* same as the light tone, with the light running the traces in teal */
.bus { stroke: rgba(11, 40, 34, 0.16); }
.spoke { stroke: rgba(11, 40, 34, 0.15); }
.via { stroke: rgba(11, 40, 34, 0.18); }
.p-in, .p-out, .p-spoke, .p-via { stroke: var(--accent-2); filter: drop-shadow(0 0 7px rgba(34, 195, 166, 0.7)); }
.brd-node .mk { filter: drop-shadow(0 0 8px #fff) drop-shadow(0 0 4px #fff) drop-shadow(0 6px 12px rgba(11, 40, 34, 0.16)); }
.node .mk.lift, .node:hover .mk.lift, .node.active .mk.lift {
  filter: drop-shadow(0 0 8px #fff) drop-shadow(0 6px 12px rgba(11, 40, 34, 0.16));
}
.brd-chip { background: #fff; box-shadow: 0 0 0 1px rgba(11, 40, 34, 0.12), 0 18px 40px -18px rgba(11, 40, 34, 0.3); }
.brd-chip-label { background: rgba(255, 255, 255, 0.85); color: var(--text); }
.brd-halo { background: conic-gradient(from 0deg, transparent 0 62%, rgba(34, 195, 166, .5) 78%, transparent 88%); opacity: .6; }
.brd-ping { border-color: rgba(34, 195, 166, 0.5); }
.brd-dots { background-image: radial-gradient(circle, rgba(11, 40, 34, 0.13) 1px, transparent 1.4px); }
.brd-node.active .mk {
  filter: brightness(1.02) drop-shadow(0 0 8px #fff) drop-shadow(0 0 14px rgba(34, 195, 166, 0.5)) !important;
}`
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
.card, .quote, .blog-card, .info-card { box-shadow: 0 12px 30px -22px rgba(18, 24, 33, 0.4); }
.bay-type-img { background: var(--surface); }
.footer { background: var(--bg-2); border-top: 1px solid var(--line); }
.footer::before { opacity: .06; }              /* the tyre tread, barely there */

/* ---- ink where there was light ----------------------------------------- */
:root {
  --carbon: repeating-linear-gradient(45deg, rgba(18,24,33,.03) 0 1px, transparent 1px 3px),
            repeating-linear-gradient(-45deg, rgba(18,24,33,.022) 0 1px, transparent 1px 3px);
  --brushed: repeating-linear-gradient(90deg, rgba(18,24,33,.05) 0 1px, transparent 1px 4px);
  --tape-bg: repeating-linear-gradient(-45deg, var(--accent) 0 6px, #12181f 6px 12px);
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
/* ---- everything the light tone turns over, in mint ---------------------- */
.nav-inner { background: rgba(241, 247, 245, 0.86) !important; box-shadow: 0 10px 30px rgba(11, 40, 34, 0.09) !important; }
.drawer { background: rgba(241, 247, 245, 0.98); }
.cf { background: rgba(11, 40, 34, 0.03); }
.segmented { background: rgba(11, 40, 34, 0.04); }
.card, .quote, .blog-card, .info-card { box-shadow: 0 12px 30px -22px rgba(11, 40, 34, 0.34); }
.bay-type-img { background: var(--surface); }
.footer { background: var(--bg-2); border-top: 1px solid var(--line); }
.footer::before { opacity: .05; }
:root {
  --carbon: repeating-linear-gradient(45deg, rgba(11,40,34,.03) 0 1px, transparent 1px 3px),
            repeating-linear-gradient(-45deg, rgba(11,40,34,.022) 0 1px, transparent 1px 3px);
  --brushed: repeating-linear-gradient(90deg, rgba(11,40,34,.05) 0 1px, transparent 1px 4px);
  --tape-bg: repeating-linear-gradient(-45deg, var(--accent-2) 0 6px, #0c1f1b 6px 12px);
  --dash: repeating-linear-gradient(90deg, rgba(11,40,34,.22) 0 3px, transparent 3px 7px);
}
.hero-grid-lines { background-image: linear-gradient(90deg, rgba(11, 40, 34, 0.06) 1px, transparent 1px); }
.hero-glow { background: radial-gradient(circle, rgba(34, 195, 166, 0.16) 0%, rgba(34, 195, 166, 0.05) 40%, transparent 68%); }
.feat-plate-bolt { color: rgba(11, 40, 34, 0.18); }
.demo-watermark { color: var(--accent-2); opacity: 0.12; }
.pop-scroll { scrollbar-color: rgba(11, 40, 34, 0.25) transparent; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(11, 40, 34, 0.22); }
.pop::backdrop { background: rgba(11, 40, 34, 0.45); }
.bay-type-img img, .blog-img img { filter: none; }

/* ---- every hard-coded amber turns teal ---------------------------------- */
#backToTop { background: var(--accent); }
#backToTop:hover { background: var(--accent-2); }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: var(--accent-2); color: #04231d; }
.seg.active, .badge { background: var(--accent); color: #fff; }
.social:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
.au-wipe { background: linear-gradient(90deg, rgba(34, 195, 166, .26), rgba(34, 195, 166, .06) 58%, transparent); }
.au-ico { background: rgba(14, 143, 120, .10); }
.au-tile:hover .au-ico { background: rgba(14, 143, 120, .20); }
.feat-head-ico, .card-ico { background: rgba(14, 143, 120, .10); }
.cta-box { background: linear-gradient(120deg, #0e8f78 0%, #22c3a6 100%); color: #04231d; }
.cta-box h2 { color: #04231d; }
.cta-box .btn-primary { background: #04231d; color: #7ff0d8; }
.btn-ghost { border-color: rgba(4, 35, 29, 0.4); color: #04231d; }
.price-table .featured, .cell-price .featured { background: rgba(34, 195, 166, .05); }

/* the tour keeps its own dark, amber-branded island: those are real
   screenshots of the app and cannot be recoloured */
.mock {
  --text: #eef1f3; --text-2: #c9d1d7; --muted: #8b959e; --accent: #ffb43a;
  --line: rgba(255, 255, 255, .08); --line-2: rgba(255, 255, 255, .14);
}
.mock-browser { box-shadow: 0 30px 70px -32px rgba(11, 40, 34, 0.4); }`
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
/* ---- the ground: mint paper, lit from above ----------------------------- */
body {
  background:
    radial-gradient(120% 62% at 50% -12%, #ffffff 0%, rgba(255, 255, 255, 0) 62%),
    radial-gradient(70% 40% at 88% 6%, rgba(34, 195, 166, .10), transparent 60%),
    var(--bg);
}
:root {
  --rim: linear-gradient(135deg, rgba(11, 40, 34, .2), rgba(11, 40, 34, .05) 40%, rgba(34, 195, 166, .22) 78%, rgba(11, 40, 34, .04));
  --sheen: inset 0 1px 0 rgba(255, 255, 255, .9);
}
.bezel { box-shadow: var(--sheen), 0 20px 50px -34px rgba(11, 40, 34, .4); }
.nav.scrolled { background: rgba(241, 247, 245, 0.84); box-shadow: 0 8px 26px rgba(11, 40, 34, 0.07); }
.drawer { background: rgba(241, 247, 245, 0.97); }
.deck-grid { background-image: repeating-linear-gradient(90deg, rgba(11, 40, 34, .07) 0 1px, transparent 1px 25%); }
.deck-glow { background: radial-gradient(ellipse at 50% 50%, rgba(34, 195, 166, .16), transparent 62%); }

/* ---- brushed metal, cooled ---------------------------------------------- */
.chrome { background-image: linear-gradient(176deg, #2d4a44 2%, #0f2b26 28%, #4f7d74 52%, #0b241f 70%, #2d4a44 98%); }
.chrome.gold { background-image: linear-gradient(176deg, #0a6b5a 2%, #0e8f78 26%, #22c3a6 52%, #0a6b5a 74%, #14b39a 98%); }
.chrome::after { background: linear-gradient(105deg, transparent 38%, rgba(255, 255, 255, .55) 48%, transparent 58%); }
.glimmer { display: none; }

/* ---- surfaces, inputs, scrollbars -------------------------------------- */
.channels li { background: transparent; }
.cf input, .cf textarea, .cf input:focus, .cf textarea:focus { background: #fff; }
.slot { background: var(--card); }
.slot:hover { background: var(--bg-2); }
.slot-wipe { background: linear-gradient(90deg, rgba(34, 195, 166, .26), rgba(34, 195, 166, .06) 58%, transparent); }
.bay, .film, .posts { background: var(--line); }
.post, .frame { background: var(--card); }
.tx { background: linear-gradient(180deg, rgba(11, 40, 34, .03), rgba(11, 40, 34, .01)) padding-box,
      linear-gradient(135deg, rgba(11, 40, 34, .15), rgba(11, 40, 34, .04) 46%, transparent) border-box; }
.pop-in { background: linear-gradient(180deg, #fff, var(--card)) padding-box, var(--rim) border-box; }
.pop-x { background: rgba(255, 255, 255, .9); }
.pop::backdrop { background: rgba(11, 40, 34, .45); }
.pop-scroll { scrollbar-color: rgba(11, 40, 34, .25) transparent; }
.pop-scroll::-webkit-scrollbar-thumb { background: rgba(11, 40, 34, .22); }
.pop-bolt { color: rgba(11, 40, 34, .2); }
.demo-watermark { color: var(--accent-2); opacity: .12; }
.mod-rule::after { background: linear-gradient(90deg, var(--accent-2), rgba(34, 195, 166, .1) 70%, transparent); }
.sheet .pick { background: rgba(34, 195, 166, .06); }
.frame img, .post-img img { filter: none; }

/* ---- the amber button becomes a teal one ------------------------------- */
.btn-key { color: #fff; background: linear-gradient(180deg, #16a98e, #0e8f78 42%, #0a6b5a); }
.btn-key:hover { box-shadow: inset 0 1px 0 rgba(255, 255, 255, .5), 0 16px 34px -12px var(--accent-glow); }
.mb-play { color: #17130a; }
.foot { background: var(--bg-2); border-top: 1px solid var(--line-2); }

/* the tour keeps its own dark, amber-branded island */
.mock {
  --text: #eef1f3; --text-2: #c9d1d7; --muted: #8b959e; --accent: #ffb43a;
  --line: rgba(255, 255, 255, .08); --line-2: rgba(255, 255, 255, .14);
}
.mock-browser { box-shadow: 0 30px 70px -32px rgba(11, 40, 34, .4); }`
};

const FIX = { graphite: GRAPHITE_FIX, deck: DECK_FIX };

module.exports = (design, tone) => {
  const name = { light: 'LIGHT', mid: 'MID', cool: 'COOL' }[tone] || tone.toUpperCase();
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
