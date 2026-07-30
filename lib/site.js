// Single source of truth for contact details, nav, and metadata.
// Edit here and it updates everywhere on the site.

export const site = {
  name: 'Sharoon Irfan',
  domain: 'sharoon.ae',
  url: 'https://sharoon.ae',
  role: 'Revenue Marketing Architect',
  // What the footer calls the practice, as distinct from what the hero calls
  // him. `role` is the title on a business card and stays in the hero and the
  // page metadata; this is the plainer description of the work, which is what
  // reads better at the bottom of the page.
  practice: 'Founder-led marketing systems',
  location: 'Dubai, UAE',
  // Footer credential line. Deliberately "trained in" rather than "certified":
  // the courses are done, the exams and the certificates are not, and a badge
  // claim a prospect can check and disprove costs more than it earns. When the
  // certificates land, this becomes "Google Ads & Meta Blueprint certified"
  // and the official badge art can replace the line entirely.
  credentials: 'Trained in Google Ads & Meta Blueprint.',

  // Footer badges. Empty renders nothing, so the row simply does not exist
  // until there is something real to put in it.
  //
  // To add one: drop the official artwork in public/images/badges/ and add
  // { src, alt, width, height, href }. The art has to be the file the issuing
  // programme gives you — Google and Meta both ship their badges with usage
  // rules, and a redrawn approximation is a trademark problem as well as an
  // obvious one to spot.
  //
  // Get them from:
  //   Google  — partners.google.com  (Partner badge, company status)
  //             skillshop.exceedlms.com  (Ads certification, individual)
  //   Meta    — facebook.com/business/learn/certification  (Blueprint)
  //
  // `width`/`height` are the file's own pixel dimensions, needed so the
  // footer does not reflow while they load.
  badges: [],
  tagline: 'Marketing systems that turn spend into revenue.',
  description:
    'I design marketing systems for founders and brands — where strategy, performance, and revenue connect from day one.',
  email: 'info@sharoon.ae',
  phone: '+971 56 121 7647',
  phoneHref: '+971561217647',
  linkedin: 'https://linkedin.com/in/sharoonirfan',
  linkedinLabel: 'linkedin.com/in/sharoonirfan',
};

// Mostly one page, so most of the nav scrolls rather than navigates.
//
// The anchors are rooted at "/" rather than written bare. A bare "#system"
// resolves against whatever page the reader is on, so from /thought-room every
// one of these would have pointed at a section that is not there and done
// nothing at all. "/#system" goes home first and then scrolls.
export const nav = [
  { label: 'System', href: '/#system' },
  { label: 'Services', href: '/#services' },
  { label: 'Results', href: '/#results' },
  { label: 'About', href: '/#about' },
  { label: 'Writing', href: '/thought-room' },
  { label: 'Contact', href: '/#contact' },
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
