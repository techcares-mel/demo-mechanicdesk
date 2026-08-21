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

console.log('index.html  ' + (html.length / 1024).toFixed(1) + ' KB  + styles.css + script.js');

/* Design-lab pages: alternative treatments for one section, kept off the main
   page so the client can compare them at their own URL. */
const lab = require('./lab.cjs')();
fs.mkdirSync(path.join(root, 'integrations'), { recursive: true });
fs.writeFileSync(path.join(root, 'integrations', 'index.html'), lab, 'utf8');
console.log('integrations/index.html  ' + (lab.length / 1024).toFixed(1) + ' KB  (4 design directions)');
