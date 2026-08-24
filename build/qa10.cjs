/* Shots of one treatment on integrations2: node build/qa10.cjs led:600 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';
const src = path.join(__dirname, '..', 'integrations2', 'index.html');
const base = fs.readFileSync(src, 'utf8');
for (const spec of process.argv.slice(2)) {
  const [id, hh, ww] = spec.split(':');
  const css = '<style>header.top{display:none!important}'
    + (id === 'all' ? '' : '.variant:not(#' + id + '){display:none!important}') + '</style>';
  const qa = path.join(__dirname, '..', 'integrations2', '_qa.html');
  fs.writeFileSync(qa, base.replace('</head>', css + '</head>'), 'utf8');
  const out = SP + '/i2-' + id + '.png';
  execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox', '--user-data-dir=' + SP + '/chrome-profile',
    '--hide-scrollbars', '--virtual-time-budget=6000', '--window-size=' + (ww || 1440) + ',' + (hh || 700),
    '--screenshot=' + out, 'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')], { stdio: 'ignore' });
  console.log('shot ' + id + '  ' + (fs.statSync(out).size / 1024).toFixed(0) + 'KB');
  fs.unlinkSync(qa);
}
