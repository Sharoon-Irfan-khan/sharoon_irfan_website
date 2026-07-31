// Photography and ambient overlays.
//
// The Dubai landscape set and every video cut from it are gone. They were
// stock: a skyline says where the work happens, not what it is, and a
// portfolio that opens on someone else's city is a brochure. What remains is
// the supplied set — desks, moodboards, swatches, printed matter — used
// against the section each one actually belongs to.
//
// Files live in public/images/work. Everything is 1400px on the long edge,
// which is the source resolution; they arrived through WhatsApp already
// compressed, so they are used at card scale rather than full bleed.

export const work = [
  {
    id: 'brand-moodboard',
    alt: 'A brand strategy moodboard laid out with printed swatches and Pantone chips',
    caption: 'Strategy',
  },
  {
    id: 'phone-desk',
    alt: 'A desk with a phone, keyboard and printed reference photographs',
    caption: 'Performance',
  },
  {
    id: 'magazine-stack',
    alt: 'A stack of printed magazines',
    caption: 'Content',
  },
  {
    id: 'design-desk',
    alt: 'A laptop beside an open design book',
    caption: 'Website',
  },
  {
    id: 'journal-desk',
    alt: 'A tablet, journal and pen arranged on a white desk',
    caption: 'CRM',
  },
  {
    id: 'swatches',
    alt: 'Colour swatch fans and brand materials on an orange surface',
    caption: 'Positioning',
  },
  {
    id: 'moodboard-floor',
    alt: 'Printed photographs being arranged into a moodboard on the floor',
    caption: 'The method',
  },
  {
    id: 'dark-desk',
    alt: 'A laptop, cards and headphones on a dark desk',
    caption: 'The problem',
  },
  {
    id: 'kinfolk-stack',
    alt: 'Editorial magazines stacked on a wooden stool',
    caption: 'Authority',
  },
  {
    id: 'fashion-spread',
    alt: 'An open editorial spread',
    caption: 'Premium',
  },
  {
    id: 'white-desk',
    alt: 'A pale desk with a magazine and a glass',
    caption: 'Clarity',
  },
  {
    id: 'editorial-spread',
    alt: 'An open book showing a sculpture photograph',
    caption: 'Craft',
  },
  {
    id: 'magazine-sofa',
    alt: 'An open magazine resting on a dark sofa',
    caption: 'Editorial',
  },
  {
    id: 'magazine-open',
    alt: 'An open magazine with pressed flowers',
    caption: 'Detail',
  },
  {
    id: 'sculpture',
    alt: 'A plaster bust resting on a book',
    caption: 'Form',
  },
  {
    id: 'coffee-magazine',
    alt: 'A coffee cup beside an open magazine',
    caption: 'Considered',
  },
  {
    id: 'magazine-hands',
    alt: 'Hands holding an open magazine',
    caption: 'Read',
  },
  {
    id: 'reading-bed',
    alt: 'A magazine and coffee on white linen',
    caption: 'Quiet',
  },

  // ---- The homepage set ----
  // Supplied 29 July. Shot 2:1, so they are cropped hard by the hero's 3:4
  // frames — the subject in each sits near the centre, which is the only
  // reason that survives.
  {
    id: 'home-branded',
    alt: 'A Sharoon.ae bookmark resting on linen beside tea and an open book',
    caption: 'The practice',
  },
  {
    id: 'home-reading',
    alt: 'Hands turning the pages of a printed magazine beside coffee',
    caption: 'Reading',
  },
  {
    id: 'home-gallery',
    alt: 'A framed gallery wall including a line drawing of the Burj Khalifa',
    caption: 'Dubai',
  },
  // Replaced 31 July: the tea-and-tulips still life went for a neoclassical
  // interior. The only portrait frame in the set — roughly 1:2.2 against the
  // hero's 3:4 — so cover crops it top and bottom, not at the sides. What
  // survives is the dome and cornice; the columns below sit outside the frame.
  {
    id: 'home-table',
    alt: 'Late sun crossing the carved dome and cornices of a neoclassical interior',
    caption: 'Structure',
  },
  // Replaced 31 July: the magazine stack went for a notebook reading "WHY NOT".
  // Portrait, roughly 1:1.8 against the hero's 3:4, so cover crops it top and
  // bottom — the cover and the hand holding it both survive; the bag above and
  // the sheet below do not. The only near-black frame in the hero set, which is
  // the point: it is the one photograph carrying a line of type.
  {
    id: 'home-stack',
    alt: 'A hand holding a matte black notebook lettered WHY NOT in gold',
    caption: 'Why not',
  },
  {
    id: 'home-light',
    alt: 'A hand holding an autumn leaf against soft bokeh light',
    caption: 'Light',
  },
];

export const workSrc = (id) => `/images/work/${id}.jpg`;

export const byId = (id) => work.find((w) => w.id === id) || work[0];
