// All page copy lives here so it can be edited without touching layout code.
//
// The site is a single page: the name, the problem, what I do, the proof, the
// person, the ask. Six beats, nothing else.
//
// COPY BUDGET — this file is deliberately short. The page was carrying long
// essays in every section and reading as a brochure rather than a portfolio.
// Everything here is the approved homepage copy and nothing beyond it. If a
// section needs more words to make sense, the section is the problem.
//
// `image` on a service names a file in public/images/work.

export const hero = {
  chapter: 'Home',
  name: 'Sharoon Irfan',
  role: 'Revenue Marketing Architect',
  standfirst:
    'I design marketing systems for founders and brands — where strategy, performance, and revenue connect from day one.',
  action: 'Book a 15-minute strategy call',
};

export const problem = {
  chapter: 'The problem',
  eyebrow: 'The problem',
  // One line per sentence, authored rather than wrapped — set as a single run
  // it broke wherever the measure fell and stranded "They" on the end of the
  // line above, which reads as the first sentence continuing.
  //
  // Two lines rather than three because the sentences are much closer in
  // length whole (17.69em and 12.79em, a 28% spread) than any three-way split
  // of them could be (35% at best). The size in sections.css is set to fit the
  // longer of these two, so the pair sits level.
  quote: [
    'Most brands don’t have a marketing problem.',
    'They have a connection problem.',
  ],
  // One sentence per line. They are written as fragments and they land as a
  // list — running them together as a paragraph blunts every one of them.
  items: [
    'Campaigns run without strategy.',
    'Websites look good but don’t convert.',
    'Leads enter a CRM and disappear.',
    'Budget gets spent. Revenue stays a mystery.',
  ],
};

export const system = {
  // The chapter and the eyebrow both read "The system" — the name the nav and
  // the spine already use for this section. They said "What I do", which is
  // also what the services section immediately below says, so the page ran two
  // consecutive sections under the same label and neither one told you which
  // of the two you were standing in.
  chapter: 'The system',
  eyebrow: 'The system',
  // Two authored lines. It ran to three against a 20ch measure, breaking after
  // "dirham" — mid-clause, in the middle of the thought the dash sets up. The
  // dash is the sentence's own hinge, so the line ends there: the claim first,
  // then what it buys you.
  title: ['I connect the pieces —', 'so every dirham traces back to a sale.'],
};

export const services = {
  chapter: 'Services',
  eyebrow: 'Services',
  // The heading this section spent its whole life without. It was written here
  // and never rendered — ServiceList drew the grid and nothing above it — so
  // the page went from a photograph straight into seven numbered cards with no
  // line telling the reader what they were looking at.
  //
  // It is not the system section's headline repeated, which is what used to sit
  // in this field. That sentence is the argument; this one names the set, and
  // ties it back to the diagram directly above it.
  title: 'Seven services. One system.',
  // Name, one line, one photograph. The deliverable lists and outcome
  // paragraphs that used to sit under each of these are gone.
  items: [
    {
      name: 'Go-to-Market Strategy',
      image: 'gtm-chess',
      summary: 'Audience, positioning, and a launch plan tied to a revenue number.',
    },
    {
      name: 'Performance Marketing',
      image: 'performance-target',
      summary:
        'Google & Meta campaigns built for qualified pipeline, not vanity clicks.',
    },
    {
      name: 'SEO & Content',
      image: 'seo-magnifier',
      summary:
        'Organic systems that compound and reduce paid dependence over time.',
    },
    {
      name: 'Websites & Landing Pages',
      image: 'design-desk',
      summary: 'Conversion-focused, CRM-wired, search-ready.',
    },
    {
      name: 'CRM & Attribution',
      image: 'crm-attribution',
      summary: 'Every lead captured, scored, and tracked to a closed deal.',
    },
    {
      name: 'Brand Positioning',
      image: 'swatches',
      summary:
        'Messaging and identity that commands premium perception before the first conversation.',
    },
    {
      name: 'Developer Experience',
      image: 'devex-code',
      summary:
        'Web builds delivered with clean architecture, fast load, and conversion logic baked in from the start.',
    },
  ],
};

export const results = {
  chapter: 'Results',
  eyebrow: 'Results',
  figure: {
    value: 80,
    unit: 'AED',
    suffix: 'M+',
    label: 'in attributed revenue',
  },
  // Each bullet split at its natural hinge so the component can set the claim
  // and its qualifier apart. The words are unchanged.
  items: [
    {
      name: 'Predictable pipeline',
      detail: 'Across real estate, B2B, and premium services.',
    },
    {
      name: 'Efficient CPL',
      detail: 'Sustained in competitive UAE markets.',
    },
    {
      name: 'Organic authority',
      detail: 'Built to outlast any single campaign.',
    },
    {
      name: 'Premium brands',
      detail: 'Repositioned and launched in crowded markets.',
    },
  ],
};

export const about = {
  chapter: 'About',
  eyebrow: 'Why founder-led',
  title:
    'You work directly with me — no account managers, no juniors inheriting your brief.',
  body: 'Every decision is senior, every outcome is mine to own.',
};

export const contact = {
  chapter: 'Contact',
  eyebrow: 'Contact',
  // Closes the argument the page opened with. The problem section names the
  // fault as a connection problem and the system section answers "I connect
  // the pieces"; the last headline finishes that sentence rather than starting
  // a new thought. It replaced "Ready when you are.", which was the one
  // headline on the page that asserted nothing — a stock sign-off that waits
  // for the reader instead of asking them for anything.
  headline: ['Let’s connect', 'the pieces.'],
  callBody:
    'Book a call — 15 minutes, no pitch, just clarity on where your marketing can win.',
};

/** The anchors the nav scrolls to, in document order. */
export const sections = [
  { id: 'system', label: 'System' },
  { id: 'services', label: 'Services' },
  { id: 'results', label: 'Results' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
