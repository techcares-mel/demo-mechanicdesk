/* Shots of the V3 flight deck: node build/qa8.cjs home:1100 features:900 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';
const src = path.join(__dirname, '..', 'v3', 'index.html');
const base = fs.readFileSync(src, 'utf8');
for (const spec of process.argv.slice(2)) {
  const [id, hh, ww] = spec.split(':');
  const height = hh || 1000, width = ww || 1440;
  let hide = '';
  if (id === 'foot') hide = 'main{display:none!important}';
  else if (id === 'home') hide = '.mod{display:none!important}.foot{display:none!important}';
  else if (id !== 'all') hide = '.mod:not(#' + id + '),.deck{display:none!important}.foot{display:none!important}';
  /* The boot sequence is a set of delayed CSS transitions; under Chrome's
     virtual time they freeze half-way, so a still frame has to be told to
     show the finished state. */
  const css = '<style>.reveal{opacity:1!important;transform:none!important}html{scroll-behavior:auto!important}'
    + '[class*="boot-"]{opacity:1!important;transform:none!important;transition:none!important}'
    + '.tick{opacity:.55!important}' + hide + '</style>';
  const qa = path.join(__dirname, '..', 'v3', '_qa.html');
  fs.writeFileSync(qa, base.replace('</head>', css + '</head>'), 'utf8');
  const out = SP + '/v3-' + id + (ww ? '-w' + ww : '') + '.png';
  try {
    execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox', '--user-data-dir=' + SP + '/chrome-profile',
      '--hide-scrollbars', '--virtual-time-budget=7000', '--window-size=' + width + ',' + height,
      '--screenshot=' + out, 'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')], { stdio: 'ignore' });
    console.log('shot ' + id + '  ' + (fs.statSync(out).size / 1024).toFixed(0) + 'KB  ' + out);
  } catch (e) { console.log('fail ' + id + ' ' + e.message); }
  fs.unlinkSync(qa);
}
