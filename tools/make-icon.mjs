#!/usr/bin/env node
/**
 * THE SITE MARK  —  `node tools/make-icon.mjs`
 *
 * Writes app/icon.png, app/apple-icon.png and app/favicon.ico: the S that
 * browsers show in the tab, the bookmark bar and on an iOS home screen. Until
 * this existed the site had none of the three, so sharoon.ae came up in the
 * address bar under Chrome's grey globe.
 *
 * THE MARK. The wordmark's own S, set in the display face, ivory on the
 * brand's rich black. It is the wordmark reduced rather than a new drawing —
 * at 16px a tab gives you one letterform and nothing else, so the only honest
 * options are a letter from the type system or a symbol, and this brand's
 * identity is its typography. The ground is dark because a tab strip is light
 * in one theme and dark in the other, and ivory-on-ink is the pair that holds
 * in both; champagne ground disappears into Chrome's light chrome.
 *
 * Full bleed, no rounded corners. iOS and Android mask the icon themselves, so
 * rounding it here would round it twice.
 *
 * FONTS. Same story as the share card — the display face is loaded by
 * next/font at build time and there is no copy of it in the repository, so
 * this reuses the cache tools/make-og.mjs fills and the fontconfig file it
 * writes. Run either script first and the other finds the fonts already there.
 *
 * Re-run after changing the palette, or after dropping the real The Seasons
 * files into public/fonts — this renders the stand-in, Cormorant Garamond, and
 * will not pick the licensed face up on its own. Nothing runs it
 * automatically; the output is committed.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'node_modules/.cache/og-fonts');
const APP = path.join(ROOT, 'app');

// From tokens.css, same two the share card uses.
const INK = '#050805';
const IVORY = '#f8f7f3';

const GLYPH = 'S';

// The master. Everything else is a downscale of this, so the hairlines in the
// didone resample once from something big rather than being drawn small.
const MASTER = 512;

/*
  How much of the square the letter fills, measured on its ink rather than its
  em box.

  0.52 is the number that makes a 16px tab read. Lower and the S is a speck in
  a black chip; higher and the didone's thin strokes run into the edges, where
  the resampler blends them with the ground and the letter loses its waist.
*/
const FILL = 0.52;

const APPLE = 180; // What iOS asks for.
const ICO = [16, 32, 48]; // The three an .ico is expected to carry.

const FONTS = [
  {
    file: 'CormorantGaramond-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf',
  },
];

const exists = (p) =>
  access(p).then(
    () => true,
    () => false
  );

async function fonts() {
  await mkdir(CACHE, { recursive: true });

  for (const f of FONTS) {
    const dst = path.join(CACHE, f.file);
    if (await exists(dst)) continue;

    const res = await fetch(f.url, {
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    });
    if (!res.ok) throw new Error(`${f.file}: ${res.status} ${res.statusText}`);
    await writeFile(dst, Buffer.from(await res.arrayBuffer()));
    console.log(`fetched ${f.file}`);
  }

  const conf = path.join(CACHE, 'fonts.conf');
  await writeFile(
    conf,
    `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${CACHE.replace(/\\/g, '/')}</dir>
  <cachedir>${CACHE.replace(/\\/g, '/')}/cache</cachedir>
</fontconfig>
`
  );
  process.env.FONTCONFIG_FILE = conf;
}

await fonts();

// Only now, with FONTCONFIG_FILE set — fontconfig reads its environment once.
const { default: sharp } = await import('sharp');

/*
  Centre the letter on its ink, not on its baseline.

  A cap-height constant would put the S near the middle, but only near: the S
  is a round letter, so it overshoots the cap line at the top and the baseline
  at the bottom, and by different amounts. Rendering it loose, trimming to the
  ink and centring what is left is exact, and it stays exact if the face is
  ever swapped for the licensed one — which is the whole reason this is a
  script and not a PNG someone drew once.
*/
const loose = await sharp(
  Buffer.from(`<svg width="${MASTER * 2}" height="${MASTER * 2}" xmlns="http://www.w3.org/2000/svg">
  <text x="${MASTER}" y="${MASTER * 1.35}" font-family="Cormorant Garamond"
        font-size="${MASTER}" fill="${IVORY}" text-anchor="middle">${GLYPH}</text>
</svg>`)
)
  .png()
  .toBuffer();

const { data: inked, info: inkInfo } = await sharp(loose)
  .trim({ threshold: 1 })
  .toBuffer({ resolveWithObject: true });

// Scale the trimmed glyph so its taller axis lands on the fill target, then
// drop it dead centre.
const target = Math.round(MASTER * FILL);
const scale = target / Math.max(inkInfo.width, inkInfo.height);
const gw = Math.round(inkInfo.width * scale);
const gh = Math.round(inkInfo.height * scale);

const glyph = await sharp(inked).resize(gw, gh).toBuffer();

const master = await sharp({
  create: { width: MASTER, height: MASTER, channels: 4, background: INK },
})
  .composite([
    {
      input: glyph,
      left: Math.round((MASTER - gw) / 2),
      top: Math.round((MASTER - gh) / 2),
    },
  ])
  .png()
  .toBuffer();

const at = (size) => sharp(master).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/*
  The .ico container.

  sharp does not write ICO, and the format is small enough to assemble by hand:
  a six-byte header, then one sixteen-byte directory entry per size, then the
  images. The images are stored as PNG rather than as the old BMP-with-mask —
  legal since Vista and read by every browser, and it means the same buffers
  that go to disk as icon.png go in here untouched.
*/
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  const dir = Buffer.alloc(16 * images.length);
  let offset = header.length + dir.length;

  images.forEach(({ size, data }, i) => {
    const e = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, e + 0); // 0 means 256
    dir.writeUInt8(size >= 256 ? 0 : size, e + 1);
    dir.writeUInt8(0, e + 2); // palette size, 0 for truecolour
    dir.writeUInt8(0, e + 3); // reserved
    dir.writeUInt16LE(1, e + 4); // colour planes
    dir.writeUInt16LE(32, e + 6); // bits per pixel
    dir.writeUInt32LE(data.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });

  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}

await mkdir(APP, { recursive: true });

/*
  Three files, because they answer three different askers.

  icon.png and apple-icon.png are Next's file conventions — put them in app/
  and it emits the <link rel> tags itself, at the root segment so every route
  and both route groups inherit them.

  favicon.ico is there for everything that never reads the HTML: crawlers, feed
  readers, and the browser's own bare request for /favicon.ico when a tab opens
  before the document has parsed.
*/
const icon = await at(MASTER);
await writeFile(path.join(APP, 'icon.png'), icon);

const apple = await at(APPLE);
await writeFile(path.join(APP, 'apple-icon.png'), apple);

const icoData = await Promise.all(
  ICO.map(async (size) => ({ size, data: await at(size) }))
);
const icoBuf = ico(icoData);
await writeFile(path.join(APP, 'favicon.ico'), icoBuf);

const kb = (b) => `${(b.length / 1024).toFixed(1)}KB`;
console.log(`app/icon.png        ${MASTER}x${MASTER}  ${kb(icon)}`);
console.log(`app/apple-icon.png  ${APPLE}x${APPLE}  ${kb(apple)}`);
console.log(`app/favicon.ico     ${ICO.join('/')}  ${kb(icoBuf)}`);
