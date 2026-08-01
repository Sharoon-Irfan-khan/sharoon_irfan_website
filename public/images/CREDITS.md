# Photography

All images live in `public/images/work` and are listed in `lib/media.js` with
their alt text and caption. Filenames describe what is in the picture, so a
replacement is a drop-in: keep the filename, update the alt text.

Supplied by the client, 29 July 2026. They arrived via WhatsApp already
compressed to ~1600px on the long edge, so they are re-encoded to 1400px and
used at **card scale only** — never full bleed, where the source resolution
would show.

## Where each one is used

| File | Section |
| --- | --- |
| `brand-moodboard.jpg` | Services — Go-to-Market Strategy |
| `phone-desk.jpg` | Services — Performance Marketing |
| `magazine-stack.jpg` | Services — SEO and Content Ecosystems |
| `design-desk.jpg` | Services — Websites and Conversion |
| `journal-desk.jpg` | Services — CRM and Attribution |
| `swatches.jpg` | Services — Brand Positioning |
| `moodboard-floor.jpg` | The method |
| `fashion-spread.jpg` | Who it is for |
| `dark-desk.jpg` | The problem *(registered, not yet placed)* |

The remaining nine — `kinfolk-stack`, `white-desk`, `editorial-spread`,
`magazine-sofa`, `magazine-open`, `sculpture`, `coffee-magazine`,
`magazine-hands`, `reading-bed` — are registered in `lib/media.js` but not
placed. They are editorial and lifestyle rather than marketing work, and there
is no section they belong to without becoming decoration. Kept so they can be
used deliberately later.

Two supplied files were exact duplicates and were dropped.

## What is missing

**A photograph of Sharoon.** The About section deliberately runs on type alone
rather than a stock picture of a stranger: a founder-led claim illustrated by
somebody else undoes the claim. That one photograph is worth more than any
other image on this list.

**Anything showing the actual work.** Dashboards, campaign creative, a real
report, a client meeting. The supplied set is desks and printed matter, which
supports the copy but does not evidence it.

## Replaced

`crm-attribution.jpg` — 1 August 2026. The supplied jigsaw graphic was 235x146,
roughly a sixth of the 4:5 card frame, and visibly upscaled. Replaced with a CRM
contact record (Pexels 7709273, free licence, no attribution required),
downsampled from 2240x2800 to 1120x1400 at quality 88. Alt text in `lib/media.js`
updated with it.

## What was removed

The previous Dubai landscape set — eight stock skyline and desert photographs
— and every video cut from them. A skyline says where the work happens, not
what it is.

`hero-sand.mp4` went with them, and separately: it was cut from unlicensed
footage credited to ANDRAS.RA.

## Remaining video

`public/video` holds only the two ambient overlays, `ambient-butterflies.mp4`
and `ambient-galaxy.mp4`. Both are abstract light shot on black and composited
with `mix-blend-mode: screen`, so they read as atmosphere over a dark section
rather than as footage of a place. Built by `tools/make-ambient.sh`.

## Replacing an image

Keep the filename and drop the new file in. Export at 1600px or wider, JPEG
quality 82. Update the `alt` text in `lib/media.js` — it describes what is in
the picture, so it goes stale the moment the picture changes.
