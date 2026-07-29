// Single source of truth for contact details, nav, and metadata.
// Edit here and it updates everywhere on the site.

export const site = {
  name: 'Sharoon Irfan',
  domain: 'sharoon.ae',
  url: 'https://sharoon.ae',
  role: 'Founder-led marketing systems',
  location: 'Dubai, UAE',
  tagline: 'Marketing systems that turn spend into revenue.',
  description:
    'Founder-led marketing systems for growth-stage brands in Dubai. Strategy, performance, SEO, websites and CRM run as one engine, held accountable to revenue.',
  email: 'hello@sharoon.ae',
  phone: '+971 56 121 7647',
  phoneHref: '+971561217647',
  linkedin: 'https://linkedin.com/in/sharoonirfan',
  linkedinLabel: 'linkedin.com/in/sharoonirfan',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Results', href: '/results' },
  { label: 'Contact', href: '/contact' },
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
  { label: 'SEO & Content', service: 'SEO and Content Ecosystems' },
  { label: 'Website', service: 'Websites and Conversion' },
  { label: 'CRM', service: 'CRM and Attribution' },
].map((part) => ({ ...part, href: `/services#${slugify(part.service)}` }));
