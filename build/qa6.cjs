/* One shot with the feature modal open: node build/qa6.cjs [tileIndex] */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SP = 'C:/Users/hueyn/AppData/Local/Temp/claude/c--Users-hueyn-Claude-Projects-Auto-Create-Demo-Websites/29e04439-e4e2-4391-a0f0-a406f1be1a6c/scratchpad';
const i = process.argv[2] || 0;
const src = path.join(__dirname, '..', 'index.html');
const inject = '<style>.reveal{opacity:1!important;transform:none!important}section:not(#features){display:none!important}'
  + 'footer,.demo-watermark{display:none!important}</style>'
  + '<script>addEventListener("load",function(){setTimeout(function(){'
  + 'document.querySelectorAll("[data-feat-tile]")[' + i + '].click();},250);});<\/script>';
const qa = path.join(__dirname, '..', '_qa.html');
fs.writeFileSync(qa, fs.readFileSync(src, 'utf8').replace('</head>', inject + '</head>'), 'utf8');
const out = SP + '/md-feat-modal.png';
execFileSync(CH, ['--headless=new', '--disable-gpu', '--no-sandbox', '--user-data-dir=' + SP + '/chrome-profile',
  '--hide-scrollbars', '--virtual-time-budget=6000', '--window-size=1440,900', '--screenshot=' + out,
  'file:///' + qa.split(String.fromCharCode(92)).join('/').split(' ').join('%20')], { stdio: 'ignore' });
console.log('shot  ' + (fs.statSync(out).size / 1024).toFixed(0) + 'KB  ' + out);
fs.unlinkSync(qa);
