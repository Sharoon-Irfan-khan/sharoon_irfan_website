// Photography and ambient overlays.
//
// Stills are 2560x1440 Unsplash originals — see public/images/CREDITS.md.
// They replaced frames pulled from a 640x360 video, which is why the site got
// visibly sharper: the pixels are real rather than upscaled.

export const clips = [
  {
    id: 'sand',
    alt: 'Sand falling in a stream against a desert sunset',
    caption: 'The Empty Quarter',
  },
  {
    id: 'skyline',
    alt: 'Downtown Dubai from above at golden hour, with the Burj Khalifa',
    caption: 'Downtown Dubai',
  },
  {
    id: 'downtown',
    alt: 'The Dubai skyline at night, reflected across the water',
    caption: 'Business Bay',
  },
  {
    id: 'marina',
    alt: 'Sheikh Zayed Road at night, traffic drawing light trails between the towers',
    caption: 'Sheikh Zayed Road',
  },
  {
    id: 'dusk',
    alt: 'The Dubai skyline in silhouette at sunset, seen across the water',
    caption: 'Dubai at dusk',
  },
  {
    id: 'desert',
    alt: 'A single sand dune against a clear sky',
    caption: 'The Empty Quarter',
  },
  {
    id: 'tower',
    alt: 'The Burj Khalifa and neighbouring towers at dusk',
    caption: 'Downtown Dubai',
  },
  {
    id: 'figure',
    alt: 'A person on the waterfront looking out across the Dubai Marina skyline',
    caption: 'Dubai Marina',
  },

  // ---- The work ----
  // The eight above are atmosphere: Dubai, weather, distance. These four are
  // about the job itself, which is why they carry the collage rather than the
  // heroes. Captions name the part of the system each one stands for, so the
  // section reads as the method rather than as a mood board.
  {
    id: 'strategy',
    work: true,
    alt: 'A printed marketing strategy document resting on a desk beside a book',
    caption: 'Strategy',
  },
  {
    id: 'analytics',
    work: true,
    alt: 'A search performance dashboard showing clicks, impressions and click-through rate over six months',
    caption: 'Attribution',
  },
  {
    id: 'desk',
    work: true,
    alt: 'An open laptop, a cup of coffee, pencils and a notepad on a pale wooden desk, seen from above',
    caption: 'The work',
  },
  {
    id: 'handshake',
    work: true,
    alt: 'Two people shaking hands across a table at the end of a meeting',
    caption: 'The engagement',
  },

  // ---- The reel set ----
  // Portrait, and used only by the scrolling work sequence. Landscape crops
  // fought that layout: a card that grows and then travels across the screen
  // reads as a held object, and a held object is upright.
  {
    id: 'work-planning',
    work: true,
    alt: 'A laptop and a phone side by side on a table, both showing a content grid',
    caption: 'Strategy',
  },
  {
    id: 'work-social',
    work: true,
    alt: 'A phone showing a brand profile, held in front of a laptop showing the same brand site',
    caption: 'Performance',
  },
  {
    id: 'work-notes',
    work: true,
    alt: 'Sticky notes on a whiteboard reading how-to and social media marketing',
    caption: 'Content',
  },
  {
    id: 'work-workshop',
    work: true,
    alt: 'Two people presenting charts to each other beside a flip chart of growth curves',
    caption: 'Positioning',
  },
  {
    id: 'work-focus',
    work: true,
    alt: 'A person working at a keyboard, lit against a black background',
    caption: 'Execution',
  },
  {
    id: 'work-deal',
    work: true,
    alt: 'Two people shaking hands over a table covered in printed performance charts',
    caption: 'The engagement',
  },
  {
    // NOTE: AI-generated (the source came from ChatGPT). A picture of nobody.
    // Fine as texture; do not let it drift into a slot that implies it is
    // Sharoon or a client — the founder section still wants a real photograph.
    id: 'work-portrait',
    work: true,
    alt: 'A portrait of a person seated at a table',
    caption: 'Founder-led',
  },
  {
    id: 'work-numbers',
    work: true,
    alt: 'Two people working through printed figures with a calculator',
    caption: 'The economics',
  },
  {
    id: 'work-growth',
    work: true,
    alt: 'Two people at a flip chart marked with a rising growth curve',
    caption: 'The plan',
  },
  {
    id: 'work-team',
    work: true,
    alt: 'A group around a table watching a growth chart being presented',
    caption: 'The room',
  },
  {
    id: 'work-review',
    work: true,
    alt: 'Three colleagues reviewing a laptop beside a window',
    caption: 'The review',
  },
  {
    id: 'work-boardroom',
    work: true,
    alt: 'Three people talking across a boardroom table',
    caption: 'The decision',
  },
  {
    id: 'work-tower',
    work: true,
    alt: 'A person on the steps below a glass tower, seen from below',
    caption: 'The market',
  },
  {
    // NOTE: AI-generated, same caution as work-portrait above.
    id: 'work-cafe',
    work: true,
    alt: 'A person working on a laptop at a cafe table',
    caption: 'The everyday',
  },
];

/**
 * Ambient overlays. Both are shot on pure black and composited with
 * `mix-blend-mode: screen`, so the black drops out and only the light carries
 * through — they read as atmosphere over a section, not as a video in a box.
 * Graded to the champagne-sand range in tools/make-ambient.sh.
 */
export const ambient = {
  butterflies: '/video/ambient-butterflies.mp4',
  galaxy: '/video/ambient-galaxy.mp4',
};

/**
 * The home hero's film now lives in components/HeroReel.js, which serves the
 * licensed reel-* clips in both orientations.
 *
 * The old `heroVideo` export pointed at hero-sand.mp4, cut from unlicensed
 * footage credited to ANDRAS.RA. It was deleted along with tools/
 * make-hero-video.sh's output. Do not reinstate it without clearing the
 * source.
 */

export const byId = (id) => clips.find((c) => c.id === id) || clips[0];

export const stillSrc = (id) => `/images/${id}.jpg`;

/**
 * What the home page may open on. Cityscapes only — `figure` puts a person in
 * the frame, which competes with the headline and reads as the brand's main
 * image rather than as atmosphere. It earns its place further down the page.
 */
export const heroClips = clips.filter((c) => !c.work && c.id !== 'figure');

/** The four that are about the job rather than the place. Used by the collage. */
export const workClips = clips.filter((c) => c.work);

/** A hero index that is stable on the server and varies per visit on the client. */
export const pickIndex = (seed) => {
  const i = Math.floor(Math.random() * heroClips.length);
  return i === seed ? (i + 1) % heroClips.length : i;
};
