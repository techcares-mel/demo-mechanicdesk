/* Shots of one variant of integrations/index.html: node build/qa2.cjs brd 900 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';
const id = process.argv[2];
const height = process.argv[3] || 900;
const width = process.argv[4] || 1440;
const src = path.join(__dirname, '..', 'integrations', 'index.html');
const css = '<style>header.top{display:none!important}'
  + (id === 'all' ? '' : '.variant:not(#' + id + '){display:none!important}')
  + '</style>';
const qa = path.join(__dirname, '..', 'integrations', '_qa.html');
fs.writeFileSync(qa, fs.readFileSync(src, 'utf8').replace('</head>', css + '</head>'), 'utf8');
const out = SP + '/lab2-' + id + '.png';
execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox',
  '--user-data-dir=' + SP + '/chrome-profile', '--hide-scrollbars',
  '--virtual-time-budget=6000', '--window-size=' + width + ',' + height,
  '--screenshot=' + out, 'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')],
  { stdio: 'ignore' });
console.log('shot ' + id + '  ' + (fs.statSync(out).size / 1024).toFixed(0) + 'KB  ' + out);
fs.unlinkSync(qa);
