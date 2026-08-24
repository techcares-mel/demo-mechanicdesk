/* Renders the chosen design (Graphite) as the site root.
   Run from the MechanicDesk folder:  node build/build.cjs

   The two alternative concepts that were presented alongside it live in
   build/archive/ and are no longer rendered — the client picked Graphite. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const render = require('./v2.cjs');
const runtime = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

const html = render();
fs.writeFileSync(path.join(root, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(root, 'script.js'), runtime, 'utf8');
/* the circuit board ships its own CSS, appended to the stylesheet */
fs.writeFileSync(path.join(root, 'styles.css'),
  fs.readFileSync(path.join(__dirname, 'v2.css'), 'utf8') + require('./lab2-board.cjs').css, 'utf8');

/* /v2/ — the same page with the 3D layer on top, for comparison. The root
   render is untouched: v5.cjs re-renders v2.cjs and only lifts the asset
   paths, then the depth is appended to the stylesheet and the runtime. */
const d3Dir = path.join(root, 'v2');
fs.mkdirSync(d3Dir, { recursive: true });
const d3html = require('./v5.cjs')();
fs.writeFileSync(path.join(d3Dir, 'index.html'), d3html, 'utf8');
fs.writeFileSync(path.join(d3Dir, 'styles.css'),
  fs.readFileSync(path.join(root, 'styles.css'), 'utf8') +
  fs.readFileSync(path.join(__dirname, 'v5.css'), 'utf8'), 'utf8');
fs.writeFileSync(path.join(d3Dir, 'script.js'),
  runtime + fs.readFileSync(path.join(__dirname, 'v5.js'), 'utf8'), 'utf8');
console.log('v2/index.html  ' + (d3html.length / 1024).toFixed(1) + ' KB  (3D layer)');

/* V3 "Flight deck" — a third design direction at /v3/, its own template and
   stylesheet, sharing the runtime and the content with the main page. */
const v3Dir = path.join(root, 'v3');
fs.mkdirSync(v3Dir, { recursive: true });
const v3html = require('./v6.cjs')();
fs.writeFileSync(path.join(v3Dir, 'index.html'), v3html, 'utf8');
fs.writeFileSync(path.join(v3Dir, 'styles.css'),
  fs.readFileSync(path.join(__dirname, 'v6.css'), 'utf8') + require('./lab2-board.cjs').css, 'utf8');
fs.writeFileSync(path.join(v3Dir, 'script.js'),
  runtime + fs.readFileSync(path.join(__dirname, 'v6.js'), 'utf8'), 'utf8');
console.log('v3/index.html  ' + (v3html.length / 1024).toFixed(1) + ' KB  (Flight deck)');

/* Two more tones for each design, from build/themes.cjs: a mid (lifted
   graphite, still dark) and a light (paper). Each is the same markup with the
   tone appended to its stylesheet, in its own folder:
     /mid/  /light/  /cool/              the main design
     /v3-mid/  /v3-light/  /v3-cool/  V3 "Flight deck"                        */
const themes = require('./themes.cjs');
const boardCss = require('./lab2-board.cjs').css;
const baseCss = fs.readFileSync(path.join(__dirname, 'v2.css'), 'utf8') + boardCss;
const deckCss = fs.readFileSync(path.join(__dirname, 'v6.css'), 'utf8') + boardCss;
const deckJs = fs.readFileSync(path.join(__dirname, 'v6.js'), 'utf8');
/* the themed pages live one level down, so their asset paths climb out */
const lift = (h) => h.replace(/(["'(])images\//g, '$1../images/');
const tone = (h, name) => h.replace(/<title>([^<]*)<\/title>/, `<title>$1 · ${name}</title>`);

[['mid', 'Mid tone'], ['light', 'Light tone'], ['cool', 'Cool tone'], ['duo', 'Duo tone']].forEach(([key, name]) => {
  const a = path.join(root, key);
  fs.mkdirSync(a, { recursive: true });
  fs.writeFileSync(path.join(a, 'index.html'), tone(lift(html), name), 'utf8');
  fs.writeFileSync(path.join(a, 'styles.css'), baseCss + themes('graphite', key), 'utf8');
  fs.writeFileSync(path.join(a, 'script.js'), runtime, 'utf8');

  const b = path.join(root, 'v3-' + key);
  fs.mkdirSync(b, { recursive: true });
  fs.writeFileSync(path.join(b, 'index.html'), tone(v3html, name), 'utf8');
  fs.writeFileSync(path.join(b, 'styles.css'), deckCss + themes('deck', key), 'utf8');
  fs.writeFileSync(path.join(b, 'script.js'), runtime + deckJs, 'utf8');
  console.log(`${key}/ + v3-${key}/  (${name})`);
});

/* Comparison page for the features-block treatments (noindex). */
const featDir = path.join(root, 'features');
fs.mkdirSync(featDir, { recursive: true });
const featLab = require('./lab3.cjs')();
fs.writeFileSync(path.join(featDir, 'index.html'), featLab, 'utf8');
console.log('features/index.html  ' + (featLab.length / 1024).toFixed(1) + ' KB');

/* Comparison page for the integrations-section directions (noindex). */
const labDir = path.join(root, 'integrations');
fs.mkdirSync(labDir, { recursive: true });
const lab = require('./lab2.cjs')();
fs.writeFileSync(path.join(labDir, 'index.html'), lab, 'utf8');
console.log('integrations/index.html  ' + (lab.length / 1024).toFixed(1) + ' KB');

console.log('index.html  ' + (html.length / 1024).toFixed(1) + ' KB  + styles.css + script.js');
