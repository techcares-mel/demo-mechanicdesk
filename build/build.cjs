/* Renders the three concept pages from the shared content model.
   Run from the MechanicDesk folder:  node build/build.cjs            */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const runtime = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

const concepts = [
  { dir: 'v1', tpl: './v1.cjs' },
  { dir: 'v2', tpl: './v2.cjs' },
  { dir: 'v3', tpl: './v3.cjs' }
];

concepts.forEach(({ dir, tpl }) => {
  const tplPath = path.join(__dirname, tpl.replace('./', ''));
  if (!fs.existsSync(tplPath)) { console.log('skip ' + dir + ' (no template yet)'); return; }
  const render = require(tpl);
  const out = path.join(root, dir);
  fs.mkdirSync(out, { recursive: true });
  const html = render();
  fs.writeFileSync(path.join(out, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(out, 'script.js'), runtime, 'utf8');
  const css = path.join(__dirname, dir + '.css');
  if (fs.existsSync(css)) fs.copyFileSync(css, path.join(out, 'styles.css'));
  console.log(dir + '/index.html  ' + (html.length / 1024).toFixed(1) + ' KB' + (fs.existsSync(css) ? '  + styles.css' : '  (no css yet)'));
});

if (fs.existsSync(path.join(__dirname, 'landing.cjs'))) {
  const landing = require('./landing.cjs');
  fs.writeFileSync(path.join(root, 'index.html'), landing(), 'utf8');
  console.log('index.html (concept chooser)');
}
