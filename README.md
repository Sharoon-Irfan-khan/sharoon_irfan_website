   # sharoon.ae
hy   
Portfolio and consultancy site for **Sharoon Irfan** — founder-led marketing systems, Dubai.
 h
Next.js 16 (App Router) · React 19 · plain CSS · Lenis smooth scrolling.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## Where to change things

| What you want to change | File |
| --- | --- |
| Any words on any page | `lib/content.js` |
| Email, phone, LinkedIn, nav links | `lib/site.js` |
| Colours, type sizes, spacing, motion speed | `app/styles/tokens.css` |
| Which Dubai clip appears where | `lib/media.js` + the `clip=` props in each page |
| Page structure | `app/page.js`, `app/about/page.js`, `app/services/page.js`, `app/results/page.js`, `app/contact/page.js` |

**All the copy lives in `lib/content.js`.** Editing text never means touching layout code.

One thing to know about headlines: hero headlines are written as a list of lines, e.g.

```js
headline: ['Marketing systems', 'that turn spend', 'into revenue.'],
```

Each entry is one line that slides up on load. Change where the lines break by
moving words between the entries.

---

## The design

**Palette** — the brand's four colours, and nothing else. Every border, shadow and
muted tone in the site is derived from them in `app/styles/tokens.css`.

| | |
| --- | --- |
| Rich black | `#050805` |
| Sand | `#C2B1A8` |
| Champagne | `#EDE9E3` |
| Ivory | `#F8F7F3` |

**Type** — the three brand faces, each with one job:

| Role | Brand font | Currently rendering | Status |
| --- | --- | --- | --- |
| Display headlines | **The Seasons** | Cormorant Garamond | stand-in |
| Body copy | **Glacial Indifference** | Jost | stand-in |
| Labels, buttons, figures | **Poppins** | Poppins | exact |

Poppins is on Google Fonts and loads as specified. **The Seasons is a licensed
font and Glacial Indifference is not on Google Fonts**, so neither could be
bundled. Both are declared in `app/styles/brand-fonts.css` pointing at
`public/fonts/`, with free stand-ins chosen to hold the same shape and weight on
the page. Drop the real `.woff2` files in using the filenames listed in that file
and they take over — no code changes needed.

**The spine** — a single hairline runs down the left edge of every page, filling as
you scroll and naming the section you're in. The brief's central claim is that most
brands have a *connection* problem: strategy in one place, performance in another,
revenue nowhere. The spine is that argument drawn down the edge of the page.
Sections opt in with `data-chapter="…"` and `data-tone="light|dark"` — see
`components/Spine.js`.

**Motion** — one vocabulary, used everywhere: a short rise and fade on a slow
ease-out (`components/Reveal.js`). Headlines mask upward line by line
(`components/Lines.js`). Film bands wipe open and drift against the scroll
(`components/useParallax.js`). The revenue figure counts up once, when it enters
view. Everything respects `prefers-reduced-motion`.

---

## The Dubai film

Five clips and five matching stills live in `public/video` and `public/images`.
The home page opens on a **different one each visit**; the rest are placed per
section. All of it is defined in `lib/media.js`.

| Clip | Scene |
| --- | --- |
| `skyline` | Dubai Marina towers |
| `marina` | Bluewaters Island and Ain Dubai |
| `downtown` | Downtown Dubai and the Burj Lake |
| `desert` | Camel caravan on the dunes |
| `frame` | The Dubai Frame |

Clips are delivered in natural colour with a light cinematic grade: contrast and
saturation lifted slightly, highlights warmed toward the sand/champagne range so
the footage sits beside the ivory palette rather than clashing with it. Delivery
is 1920×1046 h264, roughly 1–3 MB per clip.

Text stays readable over colour via two scrims in `app/styles/media.css` — a
horizontal one that seats the text column on the left, and a vertical one that
darkens the floor. The right side of every hero keeps its full colour.

### The source footage needs replacing before launch

Two problems, both fixable by swapping in new footage:

**It is not 4K.** The file is named "Dubai 4K" but the actual video is **640×360**.
It has been denoised, upscaled with lanczos and sharpened, which holds up
reasonably — but it is not, and cannot be made into, real 4K. Genuinely
high-resolution source is the only fix.

**It is not licensed.** The source is a YouTube rip — it still carried the
channel's logo in the corner, which the crop removes. That is fine for reviewing
the design, but it should not go live on a commercial site.

Replace it with footage from a source that permits commercial use:

- Free: Pexels, Pixabay, Coverr
- Paid: Artgrid, Envato Elements, Storyblocks
- Best: Sharoon's own drone or phone footage

Then rerun `tools/make-media.sh` — change `SRC` to the new file and adjust the
timecodes in the `clip` calls at the bottom. If the new source is already high
resolution, drop the `hqdn3d` denoise and lower CRF to about 21. Everything else
in the site picks up the new files automatically.

Videos are muted, looping, and only load and play while on screen, so five clips
on one page cost roughly one clip's bandwidth on arrival.

---

## The contact form

The form posts to `/api/contact`, which sends the enquiry by email via
[Resend](https://resend.com).

**Until you set this up, the form tells visitors to email `hello@sharoon.ae`
directly** — it does not silently swallow messages.

To turn on delivery:

1. Create a Resend account and verify the `sharoon.ae` domain.
2. Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO=hello@sharoon.ae
CONTACT_FROM=Sharoon Irfan Website <website@sharoon.ae>
```

3. Restart the dev server, or add the same variables in your Vercel project
   settings for production.

`CONTACT_FROM` must be an address on a domain verified in Resend. Leave it unset to
use Resend's sandbox sender while testing.

The endpoint validates name, email and message, and drops bot submissions via a
hidden honeypot field.

---

## Deploying

The site is a standard Next.js app and deploys to Vercel with no configuration:

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Set `RESEND_API_KEY`, `CONTACT_TO` and `CONTACT_FROM` in the Vercel project's
environment variables, then point the `sharoon.ae` domain at the project.

Before going live, change `site.url` in `lib/site.js` if the final domain differs —
it drives the sitemap, robots.txt and social share metadata.

---

## Still to add

- **Licensed, high-resolution footage.** The current source is a 640×360 YouTube
  rip. This is the one thing that must change before launch — see the note above.
- **The licensed fonts.** The Seasons and Glacial Indifference are running on
  stand-ins. See `public/fonts/README.md` — it is a file drop, not a code change.
- **A portrait of Sharoon.** The About page is the obvious home for one, and the
  existing two-column layout takes an image without structural changes — reuse
  `<MediaPlate>` from `components/Media.js`.
- **Booking link.** Every call to action points at `/contact`. If there's a
  Calendly or Cal.com link, swap the `href` in `components/Sections.js` → `CtaBand`
  and the nav button in `components/Nav.js`.
- **Real client results.** The Results page currently carries the figures from the
  brief. Named case studies would strengthen it considerably.
