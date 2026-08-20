/* Headless-Chrome QA helper.
   node build/qa.cjs v1 top:1000 features:1500 pricing:1600 foot:900
   Renders a temporary copy with reveal animations disabled and every section
   except the requested one hidden, so each shot starts at the top of frame. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';

const dir = process.argv[2] || 'v1';
const shots = process.argv.slice(3);
const src = path.join(__dirname, '..', dir, 'index.html');
const base0 = fs.readFileSync(src, 'utf8');

const toUrl = (p) => 'file:///' + p.split(String.fromCharCode(92)).join('/').split(' ').join('%20');

for (const spec of shots) {
  const [name, hh, ww] = spec.split(':');
  const height = hh || 1200;
  const width = ww || 1440;
  let hide = '';
  if (name === 'foot') hide = 'main{display:none!important}';
  else if (name !== 'all' && name !== 'top') hide = 'section:not(#' + name + '){display:none!important}footer{display:none!important}';
  else if (name === 'top') hide = 'section:not(#home){display:none!important}footer{display:none!important}';

  const css = '<style>.reveal{opacity:1!important;transform:none!important}html{scroll-behavior:auto!important}'
    + '.concept-switch{display:none!important}' + hide + '</style>';
  const html = base0.replace('</head>', css + '</head>');
  const qa = path.join(__dirname, '..', dir, '_qa.html');
  fs.writeFileSync(qa, html, 'utf8');
  const out = SP + '/' + dir + '-' + name + (ww ? '-w' + ww : '') + '.png';
  try {
    execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox',
      '--user-data-dir=' + SP + '/chrome-profile', '--hide-scrollbars',
      '--virtual-time-budget=7000', '--window-size=' + width + ',' + height,
      '--screenshot=' + out, toUrl(qa)], { stdio: 'ignore' });
    console.log('shot ' + name + '  ' + (fs.statSync(out).size / 1024).toFixed(0) + 'KB  ' + out);
  } catch (e) {
    console.log('fail ' + name + ' ' + e.message);
  }
  fs.unlinkSync(qa);
}
