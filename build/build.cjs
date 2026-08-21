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
fs.copyFileSync(path.join(__dirname, 'v2.css'), path.join(root, 'styles.css'));

/* Comparison page for the integrations-section directions (noindex). */
const labDir = path.join(root, 'integrations');
fs.mkdirSync(labDir, { recursive: true });
const lab = require('./lab2.cjs')();
fs.writeFileSync(path.join(labDir, 'index.html'), lab, 'utf8');
console.log('integrations/index.html  ' + (lab.length / 1024).toFixed(1) + ' KB');

console.log('index.html  ' + (html.length / 1024).toFixed(1) + ' KB  + styles.css + script.js');
