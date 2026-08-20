/* Normalises every product-tour screenshot in images/app to one canvas so the
   browser mock never letterboxes or crops a slide.
   - width is resized to 1400
   - taller-than-target images are cut at the bottom (page continues below)
   - shorter images are extended at the bottom with their own bottom-edge colour
     (the app pages are white there, so the fill is invisible)
   Run from the MechanicDesk folder:  node build/normalize-slides.cjs        */
const fs = require('fs');
const path = require('path');
const sharp = require(path.resolve(__dirname, '..', '..', 'node_modules', 'sharp'));

const W = 1400;
const H = 743;                       // 1640x870 crop of a 1080p capture
const DIR = path.resolve(__dirname, '..', 'images', 'app');

(async () => {
  const files = fs.readdirSync(DIR).filter((f) => /\.png$/i.test(f)).sort();
  for (const f of files) {
    const p = path.join(DIR, f);
    const base = await sharp(p).resize({ width: W }).png().toBuffer();
    const meta = await sharp(base).metadata();
    if (meta.height === H) { console.log(f.padEnd(24), 'already ' + W + 'x' + H); continue; }
    let out;
    if (meta.height > H) {
      out = await sharp(base).extract({ left: 0, top: 0, width: W, height: H })
        .png({ compressionLevel: 9 }).toBuffer();
    } else {
      const { data, info } = await sharp(base).raw().toBuffer({ resolveWithObject: true });
      const i = ((info.height - 2) * info.width + Math.round(info.width / 2)) * info.channels;
      const bg = { r: data[i], g: data[i + 1], b: data[i + 2] };
      out = await sharp(base).extend({ bottom: H - meta.height, background: bg })
        .png({ compressionLevel: 9 }).toBuffer();
    }
    fs.writeFileSync(p, out);
    const after = await sharp(p).metadata();
    console.log(f.padEnd(24), meta.height + ' -> ' + after.height, (out.length / 1024).toFixed(0) + 'KB');
  }
})();
