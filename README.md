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

The form posts to `/api/contact`, which emails the enquiry to `info@sharoon.ae`
over SMTP — using that mailbox's own credentials, so there is no third-party
mail service to sign up for or keep alive.

**Until you set this up, the form tells visitors to email `info@sharoon.ae`
directly** — it does not silently swallow messages.

To turn on delivery:

It currently sends through the Gmail account `sharoonirfan.ae@gmail.com`. Every
value but the password is already in `.env.local`; only the password is missing,
because a password is not something that belongs in a repository or in anyone
else's hands.

1. Turn on **2-Step Verification** on that Google account. Google will not offer
   app passwords without it: <https://myaccount.google.com/security>
2. Generate an **app password** at <https://myaccount.google.com/apppasswords> —
   name it something like "sharoon.ae website". Google shows a 16-character
   value once.
3. Paste it into `SMTP_PASS` in `.env.local`. Spaces in it are fine.
4. Restart the dev server, then add the same six variables to the Vercel project
   settings for production.

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=sharoonirfan.ae@gmail.com
SMTP_PASS=································   # the app password
CONTACT_TO=sharoonirfan.ae@gmail.com
CONTACT_FROM=
```

The normal Gmail login password will **not** work here — Google stopped
accepting those from third-party apps in 2022. If authentication fails, that is
almost always why.

Other providers, if this ever moves off Gmail:

| Provider | Host | Port |
| --- | --- | --- |
| Google / Gmail | `smtp.gmail.com` | 465 |
| Microsoft 365 | `smtp.office365.com` | 587 |
| Zoho Mail | `smtp.zoho.com` | 465 |
| cPanel / shared hosting | `mail.sharoon.ae` | 465 |

### Sending and receiving are two different mailboxes

This trips people up, so it is worth being explicit. The mailbox that **sends**
and the mailbox that **reads** are unrelated settings:

| Variable | Role | Must you have the password? |
| --- | --- | --- |
| `SMTP_USER` / `SMTP_PASS` | the account that hands the mail to the server | **Yes** |
| `CONTACT_TO` | where the enquiry is delivered | No — any address at all |
| `CONTACT_FROM` | the `From:` header | Leave blank |

That is why a Gmail account can carry the form for a domain it has nothing to do
with: it is only the postman. `CONTACT_TO` takes a comma-separated list, so the
day `info@sharoon.ae` becomes available, add it and enquiries land in both:

```
SMTP_USER=sharoonirfan.ae@gmail.com
CONTACT_TO=sharoonirfan.ae@gmail.com, info@sharoon.ae
```

No code change and no redeploy of anything but the environment variable.

Leave `CONTACT_FROM` blank and it defaults to `SMTP_USER`, which is the value
guaranteed to work. A mailbox may only send **as itself** unless the provider has
been told otherwise, and setting up a "send as" alias on Google Workspace or
Microsoft 365 requires access to the address being claimed — the thing you do not
have. Point `CONTACT_FROM` at `info@sharoon.ae` while authenticating as
`sharoon@sharoon.ae` and the provider will simply refuse the send.

### Two things that catch people out

`SMTP_PASS` is **not** the mailbox's normal login password if the account has
two-factor authentication. Google and Microsoft both reject that outright and
require an app-specific password generated in the account's security settings.

Port 465 is implicit TLS and 587 is STARTTLS. The route derives the right mode
from the port, so set the port your provider documents and leave the rest alone —
a mismatch here is the usual reason an otherwise correct setup just hangs.

The `From` address is deliberately never the visitor's: sending as them would
fail SPF and DMARC and land the enquiry in spam. Their address goes in
`Reply-To`, so pressing reply still writes back to them.

The endpoint validates name, email and message, strips newlines out of anything
that reaches a mail header, and drops bot submissions via a hidden honeypot
field.

---

## Deploying

The site is a standard Next.js app and deploys to Vercel with no configuration:

```bash
npx vercel          # preview
npx vercel --prod   # production
```

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO` and
`CONTACT_FROM` in the Vercel project's environment variables, then point the
`sharoon.ae` domain at the project.

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
