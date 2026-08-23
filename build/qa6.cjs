/* One shot with the shared popup open.
   node build/qa6.cjs feat:0:900   |   node build/qa6.cjs int:2:620 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';
const [kind = 'feat', idx = '0', h = '900'] = (process.argv[2] || '').split(':');
const sel = kind === 'int' ? '[data-brd-node]' : '.feat-tile';
const src = path.join(__dirname, '..', 'index.html');
const inject = '<style>.reveal{opacity:1!important;transform:none!important}</style>'
  + '<script>addEventListener("load",function(){setTimeout(function(){'
  + 'document.querySelectorAll("' + sel + '")[' + idx + '].click();},300);});<\/script>';
const qa = path.join(__dirname, '..', '_qa.html');
fs.writeFileSync(qa, fs.readFileSync(src, 'utf8').replace('</head>', inject + '</head>'), 'utf8');
const out = SP + '/md-pop-' + kind + idx + '-h' + h + '.png';
execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox', '--user-data-dir=' + SP + '/chrome-profile',
  '--virtual-time-budget=6000', '--window-size=1440,' + h, '--screenshot=' + out,
  'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')], { stdio: 'ignore' });
console.log('shot  ' + (fs.statSync(out).size / 1024).toFixed(0) + 'KB  ' + out);
fs.unlinkSync(qa);
