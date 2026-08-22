/* Shots of the /v2/ 3D page.  node build/qa5.cjs integrations:1250 [tilt]
   A third field "tilt" pins --mx/--my so a still frame shows the parallax the
   pointer would produce. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';
const src = path.join(__dirname, '..', 'v2', 'index.html');
const base = fs.readFileSync(src, 'utf8');
for (const spec of process.argv.slice(2)) {
  const [name, hh, ww, tilt] = spec.split(':');
  const height = hh || 1100, width = ww || 1440;
  let hide = '';
  if (name === 'foot') hide = 'main{display:none!important}';
  else if (name !== 'all') hide = 'section:not(#' + name + '){display:none!important}.footer{display:none!important}';
  const pin = tilt ? '.brd{--mx:.34!important;--my:-.3!important}.mock{--mx:.3!important;--my:-.22!important}' : '';
  const css = '<style>.reveal{opacity:1!important}html{scroll-behavior:auto!important}' + hide + pin + '</style>';
  const qa = path.join(__dirname, '..', 'v2', '_qa.html');
  fs.writeFileSync(qa, base.replace('</head>', css + '</head>'), 'utf8');
  const out = SP + '/v3d-' + name + (tilt ? '-tilt' : '') + (ww ? '-w' + ww : '') + '.png';
  try {
    execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox', '--user-data-dir=' + SP + '/chrome-profile',
      '--hide-scrollbars', '--virtual-time-budget=8000', '--window-size=' + width + ',' + height,
      '--screenshot=' + out, 'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')], { stdio: 'ignore' });
    console.log('shot ' + name + (tilt ? ' (tilted)' : '') + '  ' + (fs.statSync(out).size / 1024).toFixed(0) + 'KB  ' + out);
  } catch (e) { console.log('fail ' + name + ' ' + e.message); }
  fs.unlinkSync(qa);
}
