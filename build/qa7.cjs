/* Shots of one treatment on features/index.html: node build/qa7.cjs au:900 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';
const src = path.join(__dirname, '..', 'features', 'index.html');
const base = fs.readFileSync(src, 'utf8');
for (const spec of process.argv.slice(2)) {
  const [id, hh, ww] = spec.split(':');
  const height = hh || 900, width = ww || 1440;
  const css = '<style>header.top{display:none!important}'
    + (id === 'all' ? '' : '.variant:not(#' + id + '){display:none!important}') + '</style>';
  const qa = path.join(__dirname, '..', 'features', '_qa.html');
  fs.writeFileSync(qa, base.replace('</head>', css + '</head>'), 'utf8');
  const out = SP + '/f-' + id + (ww ? '-w' + ww : '') + '.png';
  execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox', '--user-data-dir=' + SP + '/chrome-profile',
    '--hide-scrollbars', '--virtual-time-budget=6000', '--window-size=' + width + ',' + height,
    '--screenshot=' + out, 'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')], { stdio: 'ignore' });
  console.log('shot ' + id + '  ' + (fs.statSync(out).size / 1024).toFixed(0) + 'KB  ' + out);
  fs.unlinkSync(qa);
}
