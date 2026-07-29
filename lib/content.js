// All page copy lives here so it can be edited without touching layout code.
//
// The site is a single page. What were five routes — home, about, services,
// results, contact — are now sections of one document, in the order a reader
// needs them: the claim, the problem, the system, the services, the proof,
// the person, the ask.
//
// `image` on a section names a file in public/images/work. Sections without
// one are carried by type, by the drawn diagram, or by the number. That is a
// deliberate choice, not an omission — see the note on `about`.

export const hero = {
  chapter: 'Home',
  kicker: 'Dubai · United Arab Emirates',
  // Each array item is one rendered line. Line breaks are deliberate.
  headline: ['Marketing systems', 'that turn spend', 'into revenue.'],
  standfirst:
    'Marketing that drives revenue is what I build for growth-stage brands here in Dubai.',
};

export const thesis = {
  chapter: 'The thesis',
  quote: 'Most brands have a connection problem rather than a marketing problem.',
  body: [
    'Growth-stage brands come to me to replace scattered, disconnected marketing with one system that produces qualified pipeline and measurable revenue. Strategy, performance, content, and creative run as a single engine, held accountable to sales.',
    'Strategy sits in one place, performance lives in another, and revenue becomes an afterthought. My work closes that gap. Every brand gets a system where each part reinforces the next, from the first strategic decision through to the closed sale.',
  ],
};

export const problem = {
  chapter: 'The problem',
  eyebrow: 'The problem this solves',
  title: 'Marketing usually stumbles because the pieces were built in isolation.',
  image: 'dark-desk',
  columns: [
    {
      label: 'How it usually goes',
      tone: 'before',
      items: [
        'Campaigns run ahead of strategy.',
        'Traffic lands on pages designed to look good rather than convert.',
        'Leads enter a CRM and quietly fade.',
        'Budgets get spent, reports get sent, and the revenue stays a mystery.',
      ],
    },
    {
      label: 'How it runs here',
      tone: 'after',
      items: [
        'Strategy sets the direction.',
        'Performance drives qualified demand.',
        'Your website turns attention into action.',
        'Your CRM ties every lead to a real outcome.',
      ],
    },
  ],
  close:
    'Once those pieces move together, marketing becomes a growth engine instead of a line item.',
};

export const system = {
  chapter: 'The system',
  eyebrow: 'What you get',
  title: 'Five parts, wired to one number.',
  items: [
    {
      name: 'Go-to-market strategy',
      detail:
        'For product and project launches, built around a clear revenue goal and the buyers most likely to convert.',
    },
    {
      name: 'Performance marketing',
      detail:
        'Across Google and Meta, engineered for qualified pipeline rather than vanity clicks, with budgets managed for efficient cost per lead.',
    },
    {
      name: 'SEO and content ecosystems',
      detail:
        'That rank, earn authority, and compound into organic growth that keeps paying long after the work ships.',
    },
    {
      name: 'CRM-integrated lead systems',
      detail:
        'Capture, scoring, and follow-up wired to attribution, so every sale traces back to the marketing that produced it.',
    },
    {
      name: 'Brand positioning',
      detail:
        'That makes a premium brand feel premium and win preference before the first conversation.',
    },
  ],
};

export const services = {
  chapter: 'Services',
  eyebrow: 'Services',
  title: 'Full-funnel marketing, built and owned by a founder.',
  intro:
    'The complete marketing system a growing brand needs to generate demand and turn it into revenue sits here, ready to engage as a single area or the entire funnel. Every service is delivered to a founder’s standard and measured against the outcome that matters to your business.',
  items: [
    {
      name: 'Go-to-Market Strategy',
      image: 'brand-moodboard',
      summary:
        'The strategic foundation for a launch or a growth push. Audience, positioning, channels, and revenue goal get defined, then mapped into a plan that connects them.',
      deliverables: [
        'Audience and market research',
        'Positioning and messaging framework',
        'Channel and budget strategy',
        'Launch roadmap tied to revenue targets',
      ],
      outcome:
        'A clear, revenue-focused plan every other piece of marketing can execute against.',
    },
    {
      name: 'Performance Marketing',
      qualifier: 'Google and Meta',
      image: 'phone-desk',
      summary:
        'Paid media built for qualified pipeline. Campaigns across search and social get designed, launched, and managed to bring the right buyers in at an efficient cost per lead.',
      deliverables: [
        'Campaign strategy and account structure',
        'Creative and copy direction',
        'Budget management and bid strategy',
        'Continuous testing and optimization',
      ],
      outcome:
        'Qualified leads at a cost that makes the math work, with spend tied directly to pipeline.',
    },
    {
      name: 'SEO and Content Ecosystems',
      image: 'magazine-stack',
      summary:
        'Organic growth that compounds. The technical foundation and content system get built to earn rankings, authority, and traffic that keeps paying long after publication.',
      deliverables: [
        'Technical SEO and site health',
        'Keyword and content strategy',
        'Content clusters and on-page optimization',
        'Authority building over time',
      ],
      outcome:
        'A growing stream of qualified organic traffic that eases dependence on paid media.',
    },
    {
      name: 'Websites and Conversion',
      image: 'design-desk',
      summary:
        'A website built to convert. Search-ready sites and landing pages get designed around your sales process and wired into your CRM.',
      deliverables: [
        'Conversion-focused site and landing page design',
        'Search-ready architecture',
        'CRM and lead-capture integration',
        'Ongoing conversion rate optimization',
      ],
      outcome: 'More traffic becomes leads, and more leads become conversations.',
    },
    {
      name: 'CRM and Attribution',
      image: 'journal-desk',
      summary:
        'The connective tissue between marketing and revenue. Capture, scoring, and follow-up get set up and wired to attribution, so every lead stays measured.',
      deliverables: [
        'CRM setup and pipeline design',
        'Lead scoring and routing',
        'Attribution and reporting',
        'Automation for follow-up',
      ],
      outcome:
        'Every lead captured and measured, with a clear line from marketing to each sale.',
    },
    {
      name: 'Brand Positioning',
      image: 'swatches',
      summary:
        'The message and market position that make a brand feel premium and win preference early. Positioning gets crafted to set you apart before the first conversation.',
      deliverables: [
        'Positioning and value proposition',
        'Messaging and narrative',
        'Brand voice and perception strategy',
      ],
      outcome:
        'A brand that commands premium perception and stands out in a crowded market.',
    },
  ],
  close: 'Share your goal and the fastest path to it becomes clear.',
};

export const results = {
  chapter: 'Results',
  eyebrow: 'Results measured in revenue',
  title: 'One standard guides the work: the revenue it produces.',
  intro:
    'Every system gets designed to move that number, and the results follow from a method that holds steady across brands.',
  figure: {
    value: 35,
    unit: 'AED',
    suffix: 'M+',
    label: 'in attributed revenue',
    note: 'Built through precision targeting and full-funnel systems rather than raw spend.',
  },
  items: [
    {
      name: 'Predictable pipeline',
      detail:
        'Created by connecting strategy, performance, and CRM into one framework a founder can rely on.',
    },
    {
      name: 'Efficient cost per lead',
      detail: 'Sustained across search and social in competitive markets.',
    },
    {
      name: 'Organic authority',
      detail:
        'Built through SEO and content that compound month after month and ease dependence on paid media.',
    },
    {
      name: 'Premium brand perception',
      detail: 'Earned through positioning that stands out in crowded categories.',
    },
  ],
};

export const method = {
  chapter: 'The method',
  eyebrow: 'The method behind the numbers',
  title: 'Results come from a repeatable process rather than luck.',
  image: 'moodboard-floor',
  steps: [
    {
      name: 'Start with the numbers',
      detail:
        'Cost per lead, close rate, revenue per channel, and the real economics of your business come before any spend.',
    },
    {
      name: 'Build the system',
      detail:
        'Strategy, ads, SEO, website, content, and CRM designed to reinforce each other rather than compete for credit.',
    },
    {
      name: 'Track everything',
      detail: 'Attribution on every campaign shows exactly what your budget produced.',
    },
    {
      name: 'Optimize relentlessly',
      detail:
        'Weekly gains against the metrics that move money keep the system sharpening over time.',
    },
  ],
  repeat: {
    eyebrow: 'Why it repeats',
    quote: 'A system produces results you can predict, explain, and repeat.',
    body: 'Most marketing wins arrive as one-offs: a viral post, a lucky campaign, a strong quarter that fades. That is the whole point of building a system, and it is why the outcomes hold up over time.',
  },
};

export const about = {
  chapter: 'About',
  eyebrow: 'About',
  title: 'A founder who has carried a revenue number.',
  // NOTE: no image. This section wants a photograph of Sharoon, and until one
  // exists it runs on type alone rather than a stock picture of a stranger.
  // A founder-led claim illustrated by someone else undoes the claim.
  image: null,
  body: [
    'Years spent on the results side of marketing shaped one belief: marketing earns its budget when it produces revenue. Impressions, reach, and polished reports mean little on their own. Revenue is the point.',
    'That belief is why sharoon.ae exists, to give ambitious brands marketing that stays senior-led, fully owned, and accountable from day one.',
  ],
  howItWorks: {
    eyebrow: 'How marketing should work',
    body: [
      'Marketing systems win when strategy, performance, and revenue connect from the start. Most waste traces back to disconnection: a strong campaign aimed at the wrong audience, a beautiful website built to impress rather than convert, a great month of leads that faded before becoming sales.',
      'My work runs differently. Marketing becomes one system with one job, to produce revenue you can predict and repeat. Every part earns its place by moving you closer to that goal.',
    ],
  },
  founderLed: {
    eyebrow: 'Why founder-led',
    title: 'You work with the person who builds and runs your marketing.',
    body: 'Senior thinking shapes every decision, and a direct line to the founder keeps ownership clear and accountability real. Your goals and the work stay tightly connected, start to finish.',
    items: [
      'Direct partnership with the founder, from strategy through execution.',
      'Every decision mapped to revenue, so budget compounds into growth.',
      'Brand, traffic, conversion, and CRM handled as one connected system.',
      'Senior ownership on every campaign, with one person accountable for the outcome.',
    ],
  },
  drive: {
    eyebrow: 'What drives me',
    quote: 'Turning a budget that felt like a gamble into a system a founder can trust.',
    body: 'Building marketing that earns premium perception and predictable pipeline is the work worth doing. Once the machine runs right, growth becomes a process you can repeat. That standard is worth building together.',
  },
};

export const audience = {
  chapter: 'Who it is for',
  eyebrow: 'Where the work lands',
  title:
    'Founders and growth-stage brands who want marketing measured in revenue rather than activity.',
  image: 'fashion-spread',
  sectors: ['Real estate', 'B2B', 'Premium services'],
  note: 'Dubai and the wider UAE.',
};

export const contact = {
  chapter: 'Contact',
  eyebrow: 'Contact',
  headline: ['Let’s build', 'something that pays.'],
  standfirst:
    'Launching, scaling, or ready to make marketing work harder, the first step stays the same: a simple conversation about your goals and your numbers.',
  callTitle: ['Book a', 'strategy call'],
  callBody:
    'Fifteen minutes reveals where your marketing can win more revenue and how to unlock it. Free, focused, and specific to your business. You leave with a clearer view of your highest-leverage opportunities, whatever you decide next.',
  forEyebrow: 'Who this is for',
  forItems: [
    'Founders and growth-stage brands in Dubai and the UAE',
    'Teams that want marketing measured in revenue rather than activity',
    'Businesses in real estate, B2B, and premium services ready to build a system that scales',
  ],
  nextEyebrow: 'What happens next',
  nextItems: [
    'A short call maps your goals and current numbers.',
    'Your funnel gets reviewed for the highest-leverage wins.',
    'A clear plan follows, with scope, timeline, and expected outcomes.',
  ],
  faqEyebrow: 'Common questions',
  faq: [
    {
      q: 'Brands outside real estate?',
      a: 'Absolutely. The system works across B2B and premium services. Real estate runs deep in my experience, and the same principles apply anywhere revenue is the goal.',
    },
    {
      q: 'Single services or full engagements?',
      a: 'Both. Start with one area, like performance marketing or SEO, or bring me in to own the full funnel.',
    },
    {
      q: 'How soon can things start?',
      a: 'After the first call and a short scoping step, most engagements begin quickly, with a clear timeline in the plan.',
    },
  ],
};

/** The anchors the nav scrolls to, in document order. */
export const sections = [
  { id: 'system', label: 'System' },
  { id: 'services', label: 'Services' },
  { id: 'results', label: 'Results' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

/** Kept so the shared CTA band still resolves while the page is rebuilt. */
export const cta = {
  eyebrow: 'Next step',
  title: 'Let’s build something that pays.',
  body: 'A simple conversation about your goals and your numbers.',
  action: 'Book a strategy call',
};
