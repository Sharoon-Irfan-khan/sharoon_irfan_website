// Single source of truth for contact details, nav, and metadata.
// Edit here and it updates everywhere on the site.

export const site = {
  name: 'Sharoon Irfan',
  domain: 'sharoon.ae',
  url: 'https://sharoon.ae',
  role: 'Revenue Marketing Architect',
  location: 'Dubai, UAE',
  // Footer credential line. Deliberately "trained in" rather than "certified":
  // the courses are done, the exams and the certificates are not, and a badge
  // claim a prospect can check and disprove costs more than it earns. When the
  // certificates land, this becomes "Google Ads & Meta Blueprint certified"
  // and the official badge art can replace the line entirely.
  credentials: 'Trained in Google Ads & Meta Blueprint.',
  tagline: 'Marketing systems that turn spend into revenue.',
  description:
    'I design marketing systems for founders and brands — where strategy, performance, and revenue connect from day one.',
  email: 'info@sharoon.ae',
  phone: '+971 56 121 7647',
  phoneHref: '+971561217647',
  linkedin: 'https://linkedin.com/in/sharoonirfan',
  linkedinLabel: 'linkedin.com/in/sharoonirfan',
};

// One page, so the nav scrolls rather than navigates.
export const nav = [
  { label: 'System', href: '#system' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#results' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// The five parts of the system. Used in the hero rail and the left spine.
export const systemParts = [
  'Strategy',
  'Performance',
  'SEO & Content',
  'Website',
  'CRM',
];

/** Anchor ids on /services are derived from the service name, in one place. */
export const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * The five parts again, each pointing at the service that delivers it.
 * Kept separate from `systemParts` so the hero rail and spine — which want
 * plain strings — are unaffected.
 */
export const systemMap = [
  { label: 'Strategy', service: 'Go-to-Market Strategy' },
  { label: 'Performance', service: 'Performance Marketing' },
  { label: 'SEO & Content', service: 'SEO & Content' },
  { label: 'Website', service: 'Websites & Landing Pages' },
  { label: 'CRM', service: 'CRM & Attribution' },
].map((part) => ({ ...part, href: `#${slugify(part.service)}` }));
