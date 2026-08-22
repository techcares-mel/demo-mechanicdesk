/* =========================================================================
   /v2/ — the same Graphite page with a 3D layer on top.

   This is deliberately not a second template: it renders build/v2.cjs, the
   exact markup the root serves, and only
     · points the asset paths one level up (the page lives in v2/)
     · marks the tab and the page comment so the two are tellable apart
   The depth itself is v5.css + v5.js, appended after the real stylesheet and
   runtime by build.cjs. Change the design in v2.cjs and this follows.
   ========================================================================= */
const render = require('./v2.cjs');

module.exports = () => render()
  .replace(/(["'(])images\//g, '$1../images/')
  .replace('<!-- Concept Graphite:', '<!-- /v2/ — the root page plus the 3D layer (v5.css / v5.js). Concept Graphite:')
  .replace(/<title>([^<]*)<\/title>/, '<title>$1 · 3D</title>');
