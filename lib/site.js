// Single source of truth for contact details, nav, and metadata.
// Edit here and it updates everywhere on the site.

export const site = {
  name: 'Sharoon Irfan',
  domain: 'sharoon.ae',
  url: 'https://sharoon.ae',
  role: 'Revenue Marketing Architect',
  location: 'Dubai, UAE',
  // Supplied 1 August for the footer, then struck from it on review the same
  // day — the footer now runs name, role, city and stops. Kept because the
  // line is his own words and nothing else on the site says it this plainly;
  // print it again by adding it back to Footer.js. Nothing reads it today.
  practice:
    'Building marketing systems that turn attention into measurable revenue',
  // Heading over the badge row, supplied with it. It was a sentence —
  // "Trained in Google Ads & Meta Blueprint." — set below the marks; as a
  // label above them it does the same job in three words, and the marks
  // themselves name the programmes.
  credentials: 'Certified & Trained In',

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
  //
  // Replaced 1 August from the supplied brand PDF. The first set arrived as
  // JPEGs on a flat white card and was keyed by hand: alpha was cut but the
  // colour underneath was not, so every antialiased pixel still held the white
  // it had been sitting on, and the marks carried a light halo on this footer's
  // black. The PDF stores each logo as an image with its own soft mask — an
  // actual cutout, not an approximation of one — so these are extracted from it
  // rather than re-keyed. Trimmed to the ink and scaled to 120px tall, which is
  // where the footer's clamp tops out at 34px, so roughly 3.5x.
  //
  // No `href` on either: a badge should link to the page that verifies it, and
  // neither of these arrived with one. Add it when there is something real to
  // point at.
  badges: [
    {
      src: '/images/badges/google-partner.png',
      alt: 'Google',
      width: 118,
      height: 120,
    },
    {
      src: '/images/badges/google-ads.png',
      alt: 'Google Ads',
      width: 131,
      height: 120,
    },
    {
      src: '/images/badges/meta.png',
      alt: 'Meta',
      width: 180,
      height: 120,
    },
    // Last, and alt-less: this one is decoration rather than a credential, so
    // it closes the row and says nothing to a screen reader.
    {
      src: '/images/badges/mark-star.png',
      alt: '',
      width: 120,
      height: 120,
    },
  ],
  tagline: 'Marketing systems that turn spend into revenue.',
  description:
    'I design marketing systems for founders and brands — where strategy, performance, and revenue connect from day one.',
  email: 'info@sharoon.ae',
  phone: '+971 56 121 7647',
  phoneHref: '+971561217647',

  // What the form tells a visitor when it cannot send.
  //
  // Deliberately NOT `email`. sharoon.ae has no MX records, so nothing is
  // listening at info@ and mail sent there bounces — telling someone whose
  // enquiry just failed to use a second dead channel loses them twice. The
  // phone is answered today, so that is what the fallback names.
  //
  // When the mailbox on the domain exists, change this one line back to
  // `Email ${site.email}` and every message follows.
  fallbackContact: 'WhatsApp or call +971 56 121 7647',
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
  // Named for the room, not for the activity. "Writing" described what is in
  // there; this is what the page is actually called, so the nav and the
  // heading agree. The article is dropped only because nav labels do not carry
  // one — the page itself is still The Thought Room.
  { label: 'Thought Room', href: '/thought-room' },
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
  // Rooted at "/" for the same reason the nav's anchors are — see the note
  // above. The diagram only renders on the homepage today, but a bare hash
  // would break silently the day it is reused anywhere else.
].map((part) => ({ ...part, href: `/#${slugify(part.service)}` }));
