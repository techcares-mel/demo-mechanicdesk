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
