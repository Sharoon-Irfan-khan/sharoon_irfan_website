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
  name: 'Sharoon Irfan Khan',
  role: 'Revenue Marketing Architect',
  standfirst:
    'I design marketing systems for founders and brands — where strategy, performance, and revenue connect from day one.',
  action: 'Book a 15-minute strategy call',
};

export const problem = {
  chapter: 'The problem',
  eyebrow: 'The problem',
  quote:
    'Most brands don’t have a marketing problem. They have a connection problem.',
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
  chapter: 'What I do',
  eyebrow: 'What I do',
  title: 'I connect the pieces — so every dirham traces back to a sale.',
};

export const services = {
  chapter: 'What I do',
  eyebrow: 'What I do',
  title: 'I connect the pieces — so every dirham traces back to a sale.',
  // Name, one line, one photograph. The deliverable lists and outcome
  // paragraphs that used to sit under each of these are gone.
  items: [
    {
      name: 'Go-to-Market Strategy',
      image: 'brand-moodboard',
      summary: 'Audience, positioning, and a launch plan tied to a revenue number.',
    },
    {
      name: 'Performance Marketing',
      image: 'phone-desk',
      summary:
        'Google & Meta campaigns built for qualified pipeline, not vanity clicks.',
    },
    {
      name: 'SEO & Content',
      image: 'magazine-stack',
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
      image: 'journal-desk',
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
      image: 'editorial-spread',
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
  headline: ['Ready when', 'you are.'],
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
