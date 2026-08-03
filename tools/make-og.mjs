#!/usr/bin/env node
/**
 * THE SHARE CARD  —  `node tools/make-og.mjs`
 *
 * Writes public/og.jpg, the 1200x630 image WhatsApp, LinkedIn, Slack and X
 * show when the link is pasted. Until this existed the site had og:title and
 * og:description and no og:image, so a shared link came out as two lines of
 * grey text — which is what it looked like in the client's WhatsApp.
 *
 * The card is the hero, recomposed for a 1.91:1 box: the name in the display
 * face over champagne, the role in italic under it, and the three photographs
 * along the bottom edge the way they sit beneath the type on the page. It is
 * built rather than screenshotted so it does not have to be retaken every time
 * the hero's spacing changes, and so it can be sized and compressed for the
 * scrapers, which is the part a screenshot always gets wrong.
 *
 * WHY IT IS NOT A NEXT ROUTE. `opengraph-image.js` + ImageResponse would render
 * this at build time, but it only emits PNG — this card is a photograph-heavy
 * 1200x630, which lands around a megabyte, and WhatsApp gives up on large
 * images and falls back to no preview at all. A JPEG at quality 84 is ~150KB.
 *
 * FONTS. The site's display face is Cormorant Garamond, loaded by next/font at
 * build time, so there is no copy of it in the repository to point a renderer
 * at. This fetches the same two files Google serves and caches them under
 * node_modules/.cache, then tells fontconfig where to look. That has to happen
 * before sharp is loaded — fontconfig reads its environment once, at init —
 * which is why sharp is imported dynamically further down.
 *
 * Re-run it after changing the hero's wording, the palette, or the lead
 * photographs. Nothing runs it automatically; the output is committed.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'node_modules/.cache/og-fonts');
const OUT = path.join(ROOT, 'public/og.jpg');

// Straight from tokens.css. Duplicated rather than parsed: three values, and a
// CSS parser here would be more code than the card.
const CHAMPAGNE = '#ede9e3';
const INK = '#050805';
const INK_52 = 'rgba(5,8,5,0.52)';

const W = 1200;
const H = 630;

// The two faces the hero uses, at the URLs Google serves for a desktop browser
// — ask as anything else and you get woff2, which fontconfig will not read.
const FONTS = [
  {
    file: 'CormorantGaramond-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf',
  },
  {
    file: 'CormorantGaramond-Italic.ttf',
    url: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jDOjw.ttf',
  },
];

/*
  The three photographs of the card, left to right.

  These are picked by hand rather than taken as "the lead frame of each hero
  column", which is what they were. The hero cycles a dozen pictures and the
  first of each column is an accident of that list; the card is seen once, in a
  thumbnail, by someone who has never been to the site — so it gets the three
  that carry the brand.

  home-branded leads because it is the only photograph in the library with the
  sharoon.ae mark in it. home-stack is the one dark frame, and sitting in the
  middle of a champagne card it stops the band reading as one beige smear.
  magazine-hands puts a person in the picture, which none of the flatlays do.

  All three are in the hero's frames A and B, so the card and the phone's first
  screen show the same photographs.
*/
const PHOTOS = ['home-branded', 'home-stack', 'magazine-hands'];

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

  // fontconfig will not take a bare directory from the environment, only a
  // config file, so write the smallest one that names it.
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

// Only now, with FONTCONFIG_FILE set.
const { default: sharp } = await import('sharp');

/*
  The type, as one overlay.

  Sizing is the hero's arithmetic: "SHAROON IRFAN" sets about 7.97em wide in
  this face at the hero's tracking, so 122px puts it near 970px — comfortable
  inside 1200 with the margin a scaled-down preview needs. Tracking and word
  gap are the hero's own values converted from em to px at that size.
*/
const NAME_SIZE = 122;
const text = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="${W / 2}" y="222"
        font-family="Cormorant Garamond" font-size="${NAME_SIZE}"
        letter-spacing="${-0.02 * NAME_SIZE}" word-spacing="${0.24 * NAME_SIZE}"
        fill="${INK}" text-anchor="middle">SHAROON IRFAN</text>
  <text x="${W / 2}" y="292"
        font-family="Cormorant Garamond" font-style="italic" font-size="42"
        fill="${INK_52}" text-anchor="middle">Revenue Marketing Architect</text>
</svg>`;

/*
  The photographs, run to the bottom edge rather than floated above it — on the
  page they are cropped by the fold, and a band that touches the edge reads as
  a composition where three floating cards read as thumbnails.
*/
const TOP = 352;
const MARGIN = 40;
const GAP = 24;
const PW = Math.round((W - MARGIN * 2 - GAP * 2) / PHOTOS.length);
const PH = H - TOP;

const frames = await Promise.all(
  PHOTOS.map(async (id, i) => ({
    input: await sharp(path.join(ROOT, 'public/images/work', `${id}.jpg`))
      .resize(PW, PH, { fit: 'cover', position: 'attention' })
      .toBuffer(),
    left: MARGIN + i * (PW + GAP),
    top: TOP,
  }))
);

const info = await sharp({
  create: { width: W, height: H, channels: 3, background: CHAMPAGNE },
})
  .composite([...frames, { input: Buffer.from(text), top: 0, left: 0 }])
  .jpeg({ quality: 84, chromaSubsampling: '4:4:4', mozjpeg: true })
  .toFile(OUT);

console.log(
  `public/og.jpg  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)}KB`
);
