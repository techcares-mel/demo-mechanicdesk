/* Runs a probe script inside the built page and prints what it found.
   node build/probe.cjs <probe.js>
   The probe writes its result with  report(obj)  — the page is then dumped and
   the line pulled back out. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const os = require('os');

/* Set CHROME to your browser if it is not in the usual place, and OUT_DIR to
   where the screenshots should land. */
const CH = process.env.CHROME || (process.platform === 'win32'
  ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  : process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : 'google-chrome');
const SP = process.env.OUT_DIR || path.join(os.tmpdir(), 'mechanicdesk-qa');
fs.mkdirSync(SP, { recursive: true });

const probe = fs.readFileSync(process.argv[2], 'utf8')
  .replace(/console\.log\('PROBE ' \+ ([^)]+)\)/, "document.title = 'PROBE:' + $1");

const dir = process.argv[3] || '.';
const src = path.join(__dirname, '..', dir, 'index.html');
const qa = path.join(__dirname, '..', dir, '_probe.html');
/* The replacement has to go in through a function: a probe that uses a $$
   helper would otherwise have every $$ collapsed to a single $ by
   String.replace's dollar-sign syntax, which breaks the script silently. */
fs.writeFileSync(qa, fs.readFileSync(src, 'utf8')
  .replace('</body>', () => '<script>setTimeout(function(){' + probe + '}, 400);<\/script></body>'), 'utf8');

const dom = execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox',
  '--user-data-dir=' + SP + '/chrome-profile', '--virtual-time-budget=9000', '--window-size=1440,1000',
  '--dump-dom', 'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')],
  { encoding: 'utf8', maxBuffer: 1 << 26 });

const m = dom.match(/<title>PROBE:([^<]*)<\/title>/);
console.log(m ? m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&') : 'no result — probe did not run');
fs.unlinkSync(qa);
