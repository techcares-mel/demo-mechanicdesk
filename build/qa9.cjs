/* Shots of a themed page: node build/qa9.cjs light:top:900 v3-mid:features:800 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';
for (const spec of process.argv.slice(2)) {
  const [dir, id, hh, ww] = spec.split(':');
  const height = hh || 900, width = ww || 1440;
  const deck = dir.startsWith('v3');
  let hide = '';
  if (id === 'all') hide = '';
  else if (deck) hide = id === 'home' ? '.mod{display:none!important}.foot{display:none!important}'
    : '.mod:not(#' + id + '),.deck{display:none!important}.foot{display:none!important}';
  else hide = id === 'top' ? 'section:not(#home){display:none!important}footer{display:none!important}'
    : 'section:not(#' + id + '){display:none!important}footer{display:none!important}';
  const css = '<style>.reveal{opacity:1!important;transform:none!important}html{scroll-behavior:auto!important}'
    + '[class*="boot-"]{opacity:1!important;transform:none!important;transition:none!important}.tick{opacity:.55!important}'
    + hide + '</style>';
  const qa = path.join(__dirname, '..', dir, '_qa.html');
  fs.writeFileSync(qa, fs.readFileSync(path.join(__dirname, '..', dir, 'index.html'), 'utf8').replace('</head>', css + '</head>'), 'utf8');
  const out = SP + '/t-' + dir + '-' + id + '.png';
  execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox', '--user-data-dir=' + SP + '/chrome-profile',
    '--hide-scrollbars', '--virtual-time-budget=7000', '--window-size=' + width + ',' + height,
    '--screenshot=' + out, 'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')], { stdio: 'ignore' });
  console.log('shot ' + dir + '/' + id + '  ' + (fs.statSync(out).size / 1024).toFixed(0) + 'KB');
  fs.unlinkSync(qa);
}
