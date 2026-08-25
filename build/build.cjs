/* =========================================================================
   BUILD — renders the site.

   Run it from this folder (the one with index.html in it):

       node build/build.cjs

   It writes three files into that folder, overwriting whatever is there:

       index.html    the page
       styles.css    build/page.css  +  the circuit board's own CSS
       script.js     build/app.js, copied as-is

   So: edit build/content.cjs (words), build/page.cjs (markup) or build/page.css
   (design) and run this. Editing index.html / styles.css / script.js directly
   works too, but the next run of this command overwrites them.
   ========================================================================= */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = require('./page.cjs')();

fs.writeFileSync(path.join(root, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(root, 'script.js'),
  fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8'), 'utf8');
/* the circuit board ships its own CSS, appended to the stylesheet */
fs.writeFileSync(path.join(root, 'styles.css'),
  fs.readFileSync(path.join(__dirname, 'page.css'), 'utf8') +
  require('./board.cjs').css, 'utf8');

console.log('index.html  ' + (html.length / 1024).toFixed(1) + ' KB  + styles.css + script.js');
