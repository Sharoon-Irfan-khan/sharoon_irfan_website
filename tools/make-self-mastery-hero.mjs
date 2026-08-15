#!/usr/bin/env node
/**
 * THE ART OF SELF-MASTERY — hero artwork
 * `node tools/make-self-mastery-hero.mjs`
 *
 * A generated composition rather than a photograph: a single column of warm
 * light held in a dark field. It borrows the site's own visual vocabulary —
 * the ambient glow behind the homepage hero's name (.hero__light), the
 * hairline the whole design hangs off (--rule-dark / --rule-light) — and
 * carries it into a full dark register for the one piece on the site that
 * wanted a register of its own. Vector-rendered, so it stays crisp at any
 * size and there is nothing to license.
 *
 * Colours are the brand's own tokens (see app/styles/tokens.css), duplicated
 * here for the same reason tools/make-og.mjs duplicates them: three values,
 * and a CSS parser would be more code than the artwork.
 *
 * Writes:
 *   public/images/thought-room/self-mastery.jpg  — the master, used for the
 *     article's own hero band and its card in the hub/listing grids. Every
 *     context crops it with object-fit: cover, which is why the shaft sits
 *     dead centre rather than off to one side — it has to survive being cut
 *     to a tall phone crop and a wide desktop one from the same file.
 *   public/og-self-mastery.jpg — the 1200x630 share-card crop, built from
 *     the same source so the link preview and the page agree.
 *
 * Re-run by hand if the composition changes. Nothing runs it automatically.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { default: sharp } = await import('sharp');

const W = 2600;
const H = 1733;

const RICH_BLACK = '#050805';
const BLACK_LIFT = '#0b0f0b';
const SAND = '#c2b1a8';
const CHAMPAGNE = '#ede9e3';

const CX = W / 2;
const CY = H / 2;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${BLACK_LIFT}"/>
      <stop offset="55%" stop-color="${RICH_BLACK}"/>
      <stop offset="100%" stop-color="#020302"/>
    </linearGradient>

    <radialGradient id="ambient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${SAND}" stop-opacity="0.14"/>
      <stop offset="45%" stop-color="${SAND}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${SAND}" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${CHAMPAGNE}" stop-opacity="0"/>
      <stop offset="18%" stop-color="${CHAMPAGNE}" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="${CHAMPAGNE}" stop-opacity="0.88"/>
      <stop offset="82%" stop-color="${SAND}" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="${SAND}" stop-opacity="0"/>
    </linearGradient>

    <radialGradient id="shaftGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${CHAMPAGNE}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${CHAMPAGNE}" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="vignette" cx="50%" cy="50%" r="72%">
      <stop offset="58%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
    </radialGradient>

    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
    </filter>

    <filter id="blurSoft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="46"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#ground)"/>
  <rect width="${W}" height="${H}" fill="url(#ambient)" transform="translate(${W * 0.72},${H * -0.18})"/>

  <!-- soft glow seated behind the shaft -->
  <ellipse cx="${CX}" cy="${CY}" rx="220" ry="${H * 0.62}" fill="url(#shaftGlow)" filter="url(#blurSoft)"/>

  <!-- the shaft: one held line of light, centred so every crop keeps it -->
  <rect x="${CX - 9}" y="${H * 0.06}" width="18" height="${H * 0.88}" rx="9" fill="url(#shaft)"/>

  <!-- the node: a single quiet point, the same device the spine marks its own progress with -->
  <circle cx="${CX}" cy="${CY - H * 0.05}" r="5.5" fill="${CHAMPAGNE}" fill-opacity="0.95"/>
  <circle cx="${CX}" cy="${CY - H * 0.05}" r="17" fill="${CHAMPAGNE}" fill-opacity="0.16"/>

  <!-- horizon hairline -->
  <rect x="0" y="${H * 0.745}" width="${W}" height="1" fill="${SAND}" fill-opacity="0.14"/>

  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.035"/>
</svg>`;

await mkdir(path.join(ROOT, 'public/images/thought-room'), { recursive: true });

const masterOut = path.join(ROOT, 'public/images/thought-room/self-mastery.jpg');
const master = await sharp(Buffer.from(svg))
  .jpeg({ quality: 92, chromaSubsampling: '4:4:4', mozjpeg: true })
  .toFile(masterOut);
console.log(
  `self-mastery.jpg        ${master.width}x${master.height}  ${(master.size / 1024).toFixed(1)}KB`
);

const ogOut = path.join(ROOT, 'public/og-self-mastery.jpg');
const og = await sharp(Buffer.from(svg))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 87, chromaSubsampling: '4:4:4', mozjpeg: true })
  .toFile(ogOut);
console.log(`og-self-mastery.jpg     ${og.width}x${og.height}  ${(og.size / 1024).toFixed(1)}KB`);
