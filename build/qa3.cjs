/* Runs a probe script inside integrations/index.html and prints what it found.
   node build/qa3.cjs <probe.js>
   The probe writes its result with  report(obj)  — the page is then dumped and
   the line pulled back out. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';

const probe = fs.readFileSync(process.argv[2], 'utf8')
  .replace(/console\.log\('PROBE ' \+ ([^)]+)\)/, "document.title = 'PROBE:' + $1");

const src = path.join(__dirname, '..', 'integrations', 'index.html');
const qa = path.join(__dirname, '..', 'integrations', '_probe.html');
fs.writeFileSync(qa, fs.readFileSync(src, 'utf8')
  .replace('</body>', '<script>setTimeout(function(){' + probe + '}, 400);</script></body>'), 'utf8');

const dom = execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox',
  '--user-data-dir=' + SP + '/chrome-profile', '--virtual-time-budget=5000', '--window-size=1440,1000',
  '--dump-dom', 'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')],
  { encoding: 'utf8', maxBuffer: 1 << 26 });

const m = dom.match(/<title>PROBE:([^<]*)<\/title>/);
console.log(m ? m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&') : 'no result — probe did not run');
fs.unlinkSync(qa);
