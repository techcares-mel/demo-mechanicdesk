/* Strips the flat background out of the partner logos so they can float with
   no plate behind them, and reports how each one will read on a dark ground.

   Run from the MechanicDesk folder:  node build/logos-alpha.cjs
   Writes images/logos-alpha/<name>.png and images/logos-alpha/manifest.json

   How it works: the background is flood-filled from the image edges, so only
   background that is CONNECTED to the border is removed — white inside a mark
   (white text on a coloured block, for example) survives. Logos whose border
   colour is not near-white are left alone: for those the coloured block IS
   the logo.                                                                   */
const fs = require('fs');
const path = require('path');
const sharp = require(path.resolve(__dirname, '..', '..', 'node_modules', 'sharp'));

const SRC = path.resolve(__dirname, '..', 'images', 'logos');
const OUT = path.resolve(__dirname, '..', 'images', 'logos-alpha');

const T_IN = 16;    // below this colour distance: fully transparent
const T_OUT = 60;   // above this: fully opaque (between the two: feathered)

const dist = (r, g, b, br, bg, bb) =>
  Math.sqrt((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const files = fs.readdirSync(SRC).filter((f) => /\.(png|jpe?g)$/i.test(f));
  const manifest = [];

  for (const f of files) {
    const name = f.replace(/\.(png|jpe?g)$/i, '') + '.png';
    const { data, info } = await sharp(path.join(SRC, f))
      .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, C = info.channels;
    const at = (x, y) => (y * W + x) * C;

    /* background colour = median of the four corners */
    const corners = [[0, 0], [W - 1, 0], [0, H - 1], [W - 1, H - 1]].map(([x, y]) => {
      const i = at(x, y); return [data[i], data[i + 1], data[i + 2], data[i + 3]];
    });
    const med = (k) => corners.map((c) => c[k]).sort((a, b) => a - b)[1];
    const bg = [med(0), med(1), med(2)];
    /* a majority is enough: one stray dark corner pixel should not veto the strip */
    const agree = corners.filter((c) => dist(c[0], c[1], c[2], bg[0], bg[1], bg[2]) < 26).length;
    const cornersAgree = agree >= 3;
    const nearWhite = bg[0] > 200 && bg[1] > 200 && bg[2] > 200;
    const alreadyAlpha = corners.every((c) => c[3] < 12);

    let removed = 0;
    let action = 'kept as-is (coloured block or already transparent)';

    if (!alreadyAlpha && cornersAgree && nearWhite) {
      /* flood fill from every border pixel */
      const seen = new Uint8Array(W * H);
      const stack = [];
      for (let x = 0; x < W; x++) { stack.push(x, 0); stack.push(x, H - 1); }
      for (let y = 0; y < H; y++) { stack.push(0, y); stack.push(W - 1, y); }
      while (stack.length) {
        const y = stack.pop(), x = stack.pop();
        if (x < 0 || y < 0 || x >= W || y >= H) continue;
        const p = y * W + x;
        if (seen[p]) continue;
        const i = at(x, y);
        const d = dist(data[i], data[i + 1], data[i + 2], bg[0], bg[1], bg[2]);
        if (d > T_OUT) continue;                 // real artwork: stop here
        seen[p] = 1;
        data[i + 3] = d <= T_IN ? 0 : Math.round(((d - T_IN) / (T_OUT - T_IN)) * 255);
        if (data[i + 3] === 0) removed++;
        stack.push(x + 1, y); stack.push(x - 1, y); stack.push(x, y + 1); stack.push(x, y - 1);
      }
      action = 'background removed (' + ((removed / (W * H)) * 100).toFixed(0) + '% of pixels)';
    }

    /* measure how the visible ink will read on a dark ground */
    let lum = 0, n = 0;
    for (let p = 0; p < W * H; p++) {
      const i = p * C;
      if (data[i + 3] < 128) continue;
      lum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      n++;
    }
    const mean = n ? lum / n : 255;

    await sharp(data, { raw: { width: W, height: H, channels: C } })
      .trim({ threshold: 1 })                     // drop the now-transparent margin
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, name));

    const out = await sharp(path.join(OUT, name)).metadata();
    manifest.push({
      file: name, source: f, action,
      size: out.width + 'x' + out.height,
      meanInkLuminance: Math.round(mean),
      needsLift: mean < 118            // dark ink: will need a brightness lift on a dark ground
    });
    console.log(name.padEnd(26), (out.width + 'x' + out.height).padEnd(11), 'ink ' + Math.round(mean).toString().padStart(3),
      mean < 118 ? 'LIFT' : '    ', action);
  }

  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('\n' + manifest.length + ' logos -> images/logos-alpha/ (' +
    manifest.filter((m) => m.needsLift).length + ' need a brightness lift)');
})();
