# Photography credits

All photographs are from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license), which permits commercial use
without attribution. Attribution is not required, but it is good practice and
the photographers deserve it — so the sources are recorded here.

Each file is a 2560×1440 original, not an upscale.

| File | Unsplash photo ID |
| --- | --- |
| `sand.jpg` | `photo-1565201571293-33f5180b8e7d` |
| `skyline.jpg` | `photo-1512453979798-5ea266f8880c` |
| `downtown.jpg` | `photo-1462007895615-c8c073bebcd8` |
| `marina.jpg` | `photo-1526495124232-a04e1849168c` |
| `dusk.jpg` | `photo-1607414851776-f2fcc379fb48` |
| `desert.jpg` | `photo-1511860810434-a92f84c6f01e` |
| `tower.jpg` | `photo-1543579596-2c11997c7706` |
| `figure.jpg` | `photo-1726108954011-aa0aa69c79c4` |

## The work set

Four images about the job rather than the place, used by the collage on the
home page. Mixed sources, both licences permit commercial use.

| File | Source | Credit |
| --- | --- | --- |
| `strategy.jpg` | Pexels | Walls.io |
| `handshake.jpg` | Pexels | MART PRODUCTION |
| `desk.jpg` | Unsplash | Lauren Mancke (`aOC7TSLb1o8`) |
| `analytics.jpg` | Unsplash | Stephen Phillips / Hostreviews.co.uk (`shr_Xn8S8QU`) |

These four are flagged `work: true` in `lib/media.js`, which keeps them out of
`heroClips` — a laptop flat-lay must never win the home hero rotation.

Supplied as 6000×4000 originals up to 4.8MB. Re-encoded to 2560px wide,
JPEG quality 82, mozjpeg — 12.6MB down to 1.2MB across the four.

Any photo can be viewed at `https://unsplash.com/photos/<id>` — for example
<https://unsplash.com/photos/photo-1512453979798-5ea266f8880c>.

## Replacing an image

Keep the filename and drop the new file in. Nothing in the code refers to a
photo ID; it all runs off these seven filenames, which are listed in
`lib/media.js` along with their alt text and on-screen caption. Update the alt
text there when you swap an image — it describes what is in the picture.

Export at 2560px wide, JPEG quality 80, progressive.

## Where each image is used

| Page | Hero | Elsewhere |
| --- | --- | --- |
| Home | `hero-sand.mp4` (video) | `downtown`, `figure`, `desert` |
| About | `tower` | `skyline` |
| Services | `marina` | `dusk` |
| Results | `sand` | `downtown` |
| Contact | `skyline` | — |

Only `downtown` appears twice, and on different pages. If you add a photograph,
spread it so no page repeats an image within itself.

## The video

`public/video` holds three clips, none of them stills:

- **`hero-sand.mp4`** — the home hero. Cut from `Travel Edit.mp4` (the opening
  sand-at-sunset shot), 1920×844, seamlessly looped. Built by
  `tools/make-hero-video.sh`. **Not licensed** — the source is credited to
  ANDRAS.RA, so this must be replaced or cleared before launch.
- **`ambient-butterflies.mp4`** and **`ambient-galaxy.mp4`** — screen-blended
  light overlays, heavily blurred in use, so their 720p resolution is invisible.
  Built by `tools/make-ambient.sh`.

Earlier versions used clips cut from a 640×360 file. That footage was both low
resolution and unlicensed, so it was replaced with the photography above.
`tools/make-media.sh` still contains the pipeline for cutting and grading new
footage if licensed high-resolution Dubai video becomes available.
