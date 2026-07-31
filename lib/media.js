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

  // ---- The problem row ----
  // Supplied 31 July for the pinned four-across in the problem section, which
  // until now ran on library filler — a moodboard, a fashion spread, a bed and
  // a magazine stack, none of which said anything about the argument above
  // them. These four do: position, system, work, number, in that order.
  //
  // All portrait, 0.67-0.75 against the frame's 3:4, so cover trims a little
  // top and bottom on three of them and nothing on the puzzle.
  {
    id: 'strategy-chess',
    alt: 'A black king standing among blurred pawns on a chessboard',
    caption: 'Position',
  },
  {
    id: 'crm-puzzle',
    alt: 'Interlocking white puzzle pieces and gears, one lettered CRM',
    caption: 'Systems',
  },
  {
    id: 'build-desk',
    alt: 'A laptop, handwritten notebook and coffee on a desk under a lamp',
    caption: 'The work',
  },
  {
    id: 'numbers-table',
    alt: 'A calculator and printed figures on a marble table',
    caption: 'Numbers',
  },

  // ---- The services grid ----
  // Supplied 31 July for four of the seven cards, which until now ran on the
  // same editorial flatlays as everything else — a moodboard for strategy, a
  // desk for performance, a magazine stack for SEO. These name the service
  // instead of decorating it. Cards 04, 06 and 07 keep their originals.
  //
  // The frame is 4:5, so the square and the landscape crop at the sides and
  // the two portraits crop top and bottom.
  {
    id: 'gtm-chess',
    alt: 'A white chess king striking and shattering a black king',
    caption: 'Go to market',
  },
  {
    id: 'performance-target',
    alt: 'A hand placing a dart in a target at the centre of a network of figures',
    caption: 'Performance',
  },
  {
    id: 'seo-magnifier',
    alt: 'A magnifying glass over a rising bar chart labelled SEO',
    caption: 'Search',
  },
  {
    id: 'crm-attribution',
    alt: 'A white jigsaw with one piece lifted to reveal CRM lettered in red',
    caption: 'Attribution',
  },
  // Card 07. Arrived as a 1152x2048 PNG with a 101px grey letterbox band across
  // the top; that band is cropped off and the file converted to JPEG, because
  // workSrc() builds every path as .jpg. What is left is 1152x1947 — still far
  // taller than the 4:5 frame, so the crop keeps the figure and the near arc of
  // type and loses the top of the spiral.
  {
    id: 'devex-code',
    alt: 'A figure with a laptop encircled by a glowing spiral of code',
    caption: 'Build',
  },
];

export const workSrc = (id) => `/images/work/${id}.jpg`;

export const byId = (id) => work.find((w) => w.id === id) || work[0];
