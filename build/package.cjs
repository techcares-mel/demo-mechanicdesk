/* =========================================================================
   PACKAGE — builds the client's zip.

       node build/package.cjs

   Writes dist/mechanicdesk-website.zip containing the site, its images, the
   generator and README.md — and nothing else. Working files (research.json,
   colors.json, CLAUDE.md, .git, .vercel) stay behind.

   Several other designs and colour tones were built while this one was being
   chosen. They are all deleted, and this script's job is to make sure they
   stay deleted: it rebuilds the page first, then refuses to write the zip if
   any text file in it still mentions another style, still carries a dark-page
   colour, or if a folder from one of them has come back. It checks the same
   way for demo markers — the watermark, robots:noindex, demo wording — because
   this is a production build. A silent leftover is exactly the kind of thing
   that would ship otherwise.

   The zip is written with Node's own zlib — no dependency to install.
   ========================================================================= */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'dist');
const outFile = path.join(outDir, 'mechanicdesk-website.zip');

/* ---------------------------------------------------------------- 1. build */
/* Package what the sources say, not whatever happened to be left on disk. */
require('./build.cjs');

/* ------------------------------------------------------- 2. the file list */
const INCLUDE_FILES = ['index.html', 'styles.css', 'script.js', 'vercel.json', 'README.md'];
const INCLUDE_DIRS = ['images', 'build'];
/* generator files the client has no use for: our QA harness is welcome, but
   this script and the scratch output are not */
const SKIP = new Set(['package.cjs']);

const walk = (dir, base) => {
  const out = [];
  for (const name of fs.readdirSync(dir).sort()) {
    if (name.startsWith('.') || SKIP.has(name)) continue;
    const full = path.join(dir, name);
    const rel = base ? base + '/' + name : name;
    if (fs.statSync(full).isDirectory()) out.push(...walk(full, rel));
    else out.push({ full, rel });
  }
  return out;
};

const files = [
  ...INCLUDE_FILES.filter((f) => fs.existsSync(path.join(root, f)))
    .map((f) => ({ full: path.join(root, f), rel: f })),
  ...INCLUDE_DIRS.flatMap((d) => walk(path.join(root, d), d))
];

/* --------------------------------------------------------- 3. the guard */
/* Names of the directions that were dropped. Word-boundary patterns, because
   "v2" must not match a hash in a filename and "light" is a normal English
   word — only the paths and the file names are forbidden. */
const FORBIDDEN = [
  [/\blab[234]\.cjs\b/, 'a deleted idea lab'],
  [/\bthemes\.cjs\b/, 'the deleted theme generator'],
  [/\bv[56]\.(cjs|css|js)\b/, 'a deleted alternative design'],
  [/\blab2-board\.cjs\b/, 'the board module under its old name'],
  [/href="(\.\.\/)?(v2|v3|v3-mid|v3-light|v3-cool|v3-duo|mid|light|cool|duo|features|integrations|integrations2)\//, 'a link to a deleted page'],
  [/Flight deck/, 'the V3 design'],
  [/Aurora glass/, 'a deleted features treatment'],
  [/#0b0d0f|#151a1f|#12161a|#0e1114/, 'a colour from the dark palette'],
  [/rgba\(252, ?163, ?17/, 'the brand amber mixed by hand instead of a token'],
  /* this is a production build: no demo markers may come back */
  [/demo-watermark/, 'the DEMO watermark'],
  [/content="noindex"/, 'robots:noindex, which would keep Google out'],
  [/Demo build|Demo form/i, 'demo wording in the page']
];
const FORBIDDEN_DIRS = ['v2', 'v3', 'v3-mid', 'v3-light', 'v3-cool', 'v3-duo',
  'mid', 'light', 'cool', 'duo', 'features', 'integrations', 'integrations2'];

const problems = [];
FORBIDDEN_DIRS.forEach((d) => {
  if (fs.existsSync(path.join(root, d))) problems.push(`the folder ${d}/ is back — delete it`);
});
const TEXT = /\.(html|css|js|cjs|json|md|txt|svg)$/i;
files.filter((f) => TEXT.test(f.rel)).forEach((f) => {
  const body = fs.readFileSync(f.full, 'utf8');
  FORBIDDEN.forEach(([re, why]) => {
    const hit = body.match(re);
    if (hit) problems.push(`${f.rel} mentions "${hit[0]}" — ${why}`);
  });
});

if (problems.length) {
  console.error('\nNOT PACKAGED. Fix these first:\n');
  problems.forEach((p) => console.error('  · ' + p));
  process.exit(1);
}

/* ------------------------------------------------------------ 4. the zip */
const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return (buf) => {
    let c = -1;
    for (let i = 0; i < buf.length; i += 1) c = t[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
})();

/* one timestamp for the whole archive, in DOS date/time form */
const stamp = (() => {
  const d = new Date(fs.statSync(path.join(root, 'index.html')).mtime);
  return {
    time: ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() / 2)) & 0xffff,
    date: (((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xffff
  };
})();

const chunks = [];
const central = [];
let offset = 0;

files.forEach((f) => {
  const name = Buffer.from(f.rel, 'utf8');
  const raw = fs.readFileSync(f.full);
  const deflated = zlib.deflateRawSync(raw, { level: 9 });
  /* if compression makes it bigger (it can, on JPEGs), store it flat */
  const store = deflated.length >= raw.length;
  const body = store ? raw : deflated;
  const crc = CRC(raw);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);                 /* version needed */
  local.writeUInt16LE(0, 6);                  /* flags */
  local.writeUInt16LE(store ? 0 : 8, 8);      /* 0 = store, 8 = deflate */
  local.writeUInt16LE(stamp.time, 10);
  local.writeUInt16LE(stamp.date, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18);
  local.writeUInt32LE(raw.length, 22);
  local.writeUInt16LE(name.length, 26);
  local.writeUInt16LE(0, 28);

  const dir = Buffer.alloc(46);
  dir.writeUInt32LE(0x02014b50, 0);
  dir.writeUInt16LE(20, 4);                   /* version made by */
  dir.writeUInt16LE(20, 6);
  dir.writeUInt16LE(0, 8);
  dir.writeUInt16LE(store ? 0 : 8, 10);
  dir.writeUInt16LE(stamp.time, 12);
  dir.writeUInt16LE(stamp.date, 14);
  dir.writeUInt32LE(crc, 16);
  dir.writeUInt32LE(body.length, 20);
  dir.writeUInt32LE(raw.length, 24);
  dir.writeUInt16LE(name.length, 28);
  dir.writeUInt32LE(0, 38);                   /* external attributes */
  dir.writeUInt32LE(offset, 42);

  chunks.push(local, name, body);
  central.push(dir, name);
  offset += local.length + name.length + body.length;
});

const cd = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(cd.length, 12);
end.writeUInt32LE(offset, 16);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, Buffer.concat([...chunks, cd, end]));

const kb = (n) => (n / 1024).toFixed(0) + ' KB';
console.log(`\n${files.length} files, ${kb(fs.statSync(outFile).size)}  ->  dist/${path.basename(outFile)}`);
console.log('checks passed: one design, no demo markers, nothing else in the package.');
