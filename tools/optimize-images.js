// Resizes and recompresses images in assets/ in place (same path, same format), so no HTML changes are needed.
// JPEGs: max 1200px wide, progressive mozjpeg q76. PNGs: max 512px, palette-compressed. Files are only replaced when smaller.
// Usage: node tools/optimize-images.js [--dry]
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry');
const MAX_JPEG_WIDTH = 1200;
const MAX_PNG_WIDTH = 512;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

(async () => {
  let before = 0;
  let after = 0;
  let changed = 0;
  for (const file of walk(path.join(ROOT, 'assets'))) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    const input = fs.readFileSync(file);
    const meta = await sharp(input).metadata();
    let pipeline = sharp(input).rotate();
    let out;
    if (ext === '.png') {
      if (meta.width > MAX_PNG_WIDTH) pipeline = pipeline.resize({ width: MAX_PNG_WIDTH });
      out = await pipeline.png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 }).toBuffer();
    } else {
      if (meta.width > MAX_JPEG_WIDTH) pipeline = pipeline.resize({ width: MAX_JPEG_WIDTH });
      out = await pipeline.jpeg({ quality: 76, progressive: true, mozjpeg: true }).toBuffer();
    }
    before += input.length;
    if (out.length < input.length * 0.95) {
      after += out.length;
      changed++;
      if (!DRY) fs.writeFileSync(file, out);
    } else {
      after += input.length;
    }
  }
  const mb = (n) => (n / 1048576).toFixed(1) + 'MB';
  console.log(`${changed} files ${DRY ? 'would be ' : ''}optimised: ${mb(before)} -> ${mb(after)}`);
})();
