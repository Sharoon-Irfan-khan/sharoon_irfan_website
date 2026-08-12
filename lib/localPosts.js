// THE THOUGHT ROOM — pieces written straight into the repo.
//
// Every other post is a Sanity document. This file exists for the pieces
// published before there is a Studio to hold them: the site has no
// NEXT_PUBLIC_SANITY_PROJECT_ID set today, and a Thought Room that cannot
// carry a single article until that is wired up is not one worth having.
//
// Same shape the Sanity queries in lib/thoughtRoom.js return — title, slug,
// category, excerpt, publishedAt, coverImage, body as Portable Text — so
// every page that already renders a Sanity post renders one of these without
// a special case in the template. `body` is written by hand in Portable
// Text's own block/span shape rather than Markdown, because that is what
// `@portabletext/react` expects and it does not care where the JSON came
// from.
//
// The day the Studio is connected, a post published there simply outranks
// nothing here — see mergePosts() in lib/thoughtRoom.js. Nothing about this
// file needs to change.

let keyCounter = 0;
const key = () => `local-${keyCounter++}`;

/** A block of text, optionally split into linked and plain runs. */
function richBlock(style, segments, extra = {}) {
  const markDefs = [];
  const children = segments.map((seg) => {
    const marks = [];
    if (seg.href) {
      const k = key();
      markDefs.push({ _key: k, _type: 'link', href: seg.href });
      marks.push(k);
    }
    if (seg.strong) marks.push('strong');
    return { _type: 'span', _key: key(), text: seg.text, marks };
  });
  return { _type: 'block', _key: key(), style, markDefs, children, ...extra };
}

const p = (text) => richBlock('normal', [{ text }]);
const rich = (segments) => richBlock('normal', segments);
const h2 = (text) => richBlock('h2', [{ text }]);
const h3 = (text) => richBlock('h3', [{ text }]);
const quote = (text) => richBlock('blockquote', [{ text }]);
const bullet = (segments) =>
  richBlock('normal', segments, { listItem: 'bullet', level: 1 });

export const LOCAL_POSTS = [
  {
    _id: 'local-real-estate-marketing-revenue-system',
    title: 'Why Real Estate Marketing Needs a Revenue System, Not More Leads',
    slug: 'real-estate-marketing-revenue-system',
    category: 'insight',
    excerpt:
      'Lead volume is not revenue. On why real estate marketing in Dubai has to be designed as one connected system, from positioning through to attribution, rather than judged campaign by campaign.',
    seoTitle: 'Real Estate Marketing Needs a Revenue System | Sharoon Irfan',
    metaDescription:
      'Why real estate marketing in Dubai needs a revenue system, not more leads. A strategist’s breakdown of positioning, qualification, CRM and attribution.',
    publishedAt: '2026-08-13T09:00:00.000Z',
    modifiedAt: '2026-08-13T09:00:00.000Z',
    featured: true,
    readTimeOverride: 8,
    coverImage: {
      isLocal: true,
      src: '/images/work/dark-desk.jpg',
      alt: 'A laptop, printed cards and headphones on a dark desk',
      width: 1400,
      height: 933,
    },
    body: [
      h2('More Leads Is Not a Strategy'),
      p(
        'Nearly every developer launch report I’ve sat through leads with the same kind of number. A big lead count. A cost per lead that beat last quarter’s. It reads as proof the marketing worked. Most of the time it’s proof of something narrower: a machine that’s good at generating attention, with no reliable way of turning that attention into a signed unit.'
      ),
      p(
        'The pattern repeats often enough to notice. Marketing’s report is a victory lap. Sales’ report, a few slides later, raises a question nobody wants to ask directly: why didn’t most of those leads ever take a call?'
      ),
      rich([
        {
          text: 'The honest answer is rarely that the campaign was wrong. It’s usually that positioning, demand generation, qualification, CRM and sales follow-up were never built as ',
        },
        { text: 'one working system', href: '/#system' },
        {
          text: ', only as five separate jobs reporting to five separate people.',
        },
      ]),

      h2('Why "More Leads" Is Often the Wrong Objective'),
      p(
        'Lead volume is the easiest number in real estate marketing to move, which is exactly why it gets rewarded. Loosen the qualifying questions on a form, widen the audience, soften the offer threshold, and volume climbs within a week. None of that requires a better product, a sharper price, or a clearer answer to why a buyer should choose this launch over the one next door.'
      ),
      p(
        'Treating volume as the objective quietly changes the campaign’s job. It stops selling the property and starts selling the click. Cheap clicks are easy to manufacture. Buyers who are actually ready to transact are not, and a campaign optimised for the wrong one will hit its target while the business misses its own.'
      ),
      p(
        'This tends to look like success on a dashboard for months before it shows up as a problem anywhere that matters. CPL falls, lead count climbs, the update call goes well. What the dashboard doesn’t show is the sales team quietly learning which leads aren’t worth calling first.'
      ),

      h2('Lead Generation Is Not Revenue Generation'),
      p('These are two different jobs wearing the same job title.'),
      p(
        'Lead generation asks how many people can be persuaded to raise a hand. Revenue generation asks a harder question: of the people who did, how many can be walked to a signed contract, and what does the version of the campaign that does that consistently actually look like?'
      ),
      p(
        'A system built only to answer the first question keeps producing more of what it’s measured on, because that’s the only feedback it receives. It never learns what separates a buyer who books a viewing within the week from one who downloaded a brochure out of curiosity and never opened the follow-up. That data exists somewhere in the CRM. It’s rarely fed back to the campaign that generated it.'
      ),
      p(
        'Revenue-focused marketing treats the sale, not the enquiry, as the unit of success, and works backward from there. That single shift changes what a good campaign is allowed to mean.'
      ),

      h2('Positioning Decides Who Shows Up'),
      rich([
        {
          text: 'Lead quality isn’t a targeting setting. It’s a downstream effect of how a property is ',
        },
        { text: 'positioned', href: '/#brand-positioning' },
        { text: ' before a single ad runs.' },
      ]),
      p(
        'A launch pitched as an investment opportunity attracts exactly the audience that phrase describes: yield-focused, comparing several projects at once, loyal to whichever developer answers fastest with a better number. A launch pitched around who actually lives there, what the building solves for them, and why this location and this developer specifically, attracts people evaluating a home or an asset on its own terms rather than against a spreadsheet of comparables.'
      ),
      p(
        'Both campaigns can land the same cost per lead. They will not land the same conversion rate, because they were never talking to the same person. Sharpen the positioning and the lead-quality problem often resolves itself before the media plan is touched. No bigger budget. No new audience segment. Just a clearer answer to why this, why now, why this developer.'
      ),

      h2('Cost Per Lead Cannot Be the Verdict'),
      p(
        'CPL measures how efficiently the top of the funnel was filled. It says nothing about what happened to what was poured in.'
      ),
      p(
        'Take two hypothetical campaigns filling the same funnel. One brings in leads cheaply but converts a small fraction of them. The other costs more per lead but converts several times as many. The second campaign is the cheaper one per sale, often by a wide margin, and a media plan that stops its analysis at CPL will keep choosing the first. The metric isn’t dishonest. It’s simply answering a smaller question than the one the business is actually asking, and it gets promoted to the answer because it’s the easiest number to report on a Monday.'
      ),
      p(
        'Cost per qualified opportunity, and eventually cost per sale, are harder to calculate and slower to arrive at. They’re also the only numbers that tell you whether the spend is actually working.'
      ),

      quote(
        'A revenue system doesn’t ask how cheap the lead was. It asks how much it cost to reach the buyer who actually signs, and keeps asking until the answer improves.'
      ),

      h2('Qualification Protects the System, It Doesn’t Slow It Down'),
      p(
        'Sales teams that receive unqualified leads at volume tend to develop the same coping mechanism. They stop trusting the source. Once that happens, even the genuinely warm leads in the batch get worked with less urgency, because nobody has time to guess which ones are real.'
      ),
      p(
        'Qualification is what restores that trust: a working definition, agreed before the campaign launches, of what separates a real prospect from a name on a spreadsheet. Budget realism, timeline, decision authority, genuine intent rather than idle curiosity. Built into the funnel rather than left to a sales rep’s judgement on the first call, it does something CPL never can. It protects the credibility of every lead that follows it.'
      ),

      h2('CRM Is Marketing Architecture, Not a Filing Cabinet'),
      rich([
        { text: 'Most organisations treat the ' },
        { text: 'CRM', href: '/#crm-attribution' },
        {
          text: ' as the point where marketing’s job ends and sales’ job begins. A handover, not a shared instrument.',
        },
      ]),
      p(
        'That framing throws away the CRM’s most valuable function. It’s the one place in the business where campaign source, lead behaviour, sales activity and deal outcome live against the same record. Read properly, it can show which channel, which creative, which offer and which landing page produced the buyers who actually closed, not just the ones who filled a form.'
      ),
      p(
        'When the CRM sits inside marketing’s field of view rather than outside it, targeting, messaging and budget allocation start being informed by what closed last quarter instead of what got clicked last week. That’s a materially different, and more defensible, basis for a media plan.'
      ),

      h2('Marketing and Sales Need the Same Definition of "Qualified"'),
      p(
        'A remarkable amount of friction between marketing and sales teams traces back to one conversation nobody had. What does qualified actually mean, here, on this launch?'
      ),
      p(
        'If marketing counts a qualified lead as anyone who filled a form with a real phone number, and sales counts one as someone with confirmed budget who is ready to view a unit this month, both teams are reporting on different funnels while believing they share one. Every complaint that the leads are junk, and every complaint that sales isn’t following up properly, downstream of that gap is really an argument about a definition nobody wrote down.'
      ),
      p(
        'Agreeing on that definition in writing, before the campaign launches, is one of the highest-leverage conversations a marketing function can have. It costs a meeting rather than a media budget.'
      ),

      h2('Why Attribution Matters More Than Almost Anything Else'),
      p(
        'Without attribution, every marketing decision is a guess dressed up as a strategy. Budget gets reallocated toward whichever channel reported the highest lead count last review, not the one that actually contributed to a signed deal.'
      ),
      p(
        'Attribution is what lets a business trace a closed sale back through the touchpoints that led to it: the ad, the landing page, the follow-up sequence, the sales conversation, and use that trail to decide where the next dirham of spend goes. It’s slower to set up than a lead-count dashboard, and considerably more useful, because it’s the only version of what’s working that includes the part of the funnel where the money actually changes hands.'
      ),

      h2('What a Revenue-Focused Real Estate Marketing System Looks Like'),
      p(
        'Put the pieces above together and a different picture of marketing emerges. Not a campaign that stops at the enquiry, but a system that stays engaged through the entire journey.'
      ),
      h3('The line, stage by stage'),
      bullet([
        { text: 'Positioning', strong: true },
        { text: ': defines who the campaign should attract, before a single ad runs.' },
      ]),
      bullet([
        { text: 'Demand generation', strong: true },
        { text: ': earns that person’s attention on the terms positioning set.' },
      ]),
      bullet([
        { text: 'Lead capture', strong: true },
        { text: ': collects enough to act on, not just enough to hit a form-fill target.' },
      ]),
      bullet([
        { text: 'Qualification', strong: true },
        { text: ': filters intent from curiosity before sales spends time on it.' },
      ]),
      bullet([
        { text: 'CRM', strong: true },
        {
          text: ': holds the full record, keeping source, behaviour, activity and outcome against the same name.',
        },
      ]),
      bullet([
        { text: 'Sales follow-up', strong: true },
        { text: ': runs on a shared definition of qualified, not an assumption.' },
      ]),
      bullet([
        { text: 'Conversion', strong: true },
        { text: ': is measured against the sale, not the click.' },
      ]),
      bullet([
        { text: 'Attribution', strong: true },
        { text: ': feeds every one of those stages back into the next campaign.' },
      ]),
      p(
        'Each stage exists to serve the one after it. A developer with excellent demand generation and a broken handover to sales has, in practical terms, built an expensive way of generating noise.'
      ),

      h2('A Practical Framework: Where Is Your Funnel Leaking?'),
      p(
        'Most teams already have the data to answer this. They rarely look at it as one connected line. Walk the funnel stage by stage and ask, honestly, where the numbers stop making sense.'
      ),
      bullet([
        { text: 'Enquiry to contact.', strong: true },
        {
          text: ' If a large share of leads are never successfully reached, the problem is speed or data quality, not marketing spend.',
        },
      ]),
      bullet([
        { text: 'Contact to qualified.', strong: true },
        {
          text: ' If contact rates are healthy but few convert to qualified opportunities, the leak is upstream, in positioning or targeting, not in follow-up.',
        },
      ]),
      bullet([
        { text: 'Qualified to viewing.', strong: true },
        {
          text: ' A steep drop here usually means friction in the offer or in the process between interest and the physical viewing.',
        },
      ]),
      bullet([
        { text: 'Viewing to close.', strong: true },
        {
          text: ' If qualified, viewed prospects still aren’t closing, the conversation happening at that stage deserves the scrutiny, not the marketing before it.',
        },
      ]),
      bullet([
        { text: 'Source to sale.', strong: true },
        {
          text: ' If this can’t be answered at all, attribution isn’t running yet, and every decision above it is being made on partial information.',
        },
      ]),
      p(
        'The stage with the sharpest drop is rarely the one getting the most attention in the weekly report. That mismatch is usually the whole diagnosis.'
      ),

      h2('The Real Objective'),
      rich([
        {
          text: 'Lead volume will keep getting celebrated because it’s immediate, legible and easy to put on a slide. Revenue takes longer to show up, and so do ',
        },
        { text: 'results', href: '/#results' },
        {
          text: ' worth reporting, which is exactly why most organisations default to optimising for the metric that arrives first rather than the one that matters.',
        },
      ]),
      p(
        'The work worth doing is building the system in between: the one connecting positioning to demand, demand to qualification, qualification to CRM, CRM to sales, and sales back to attribution, so that a bigger lead number and a bigger revenue number are finally allowed to mean the same thing.'
      ),
      rich([
        {
          text: 'That connective work, more than any single campaign, is what produces the kind of ',
        },
        { text: 'case studies', href: '/thought-room/case-studies' },
        { text: ' worth writing, and it’s what a marketing function is actually for.' },
      ]),
      rich([
        {
          text: 'If part of that line is leaking and you can’t yet see where, that’s usually a conversation worth having before it’s a campaign worth running. ',
        },
        { text: 'Get in touch', href: '/#contact' },
        {
          text: ' and we can talk it through, or read more working notes like this in the ',
        },
        { text: 'Thought Room', href: '/thought-room' },
        { text: '.' },
      ]),

      rich([
        { text: 'Sharoon Irfan is a ' },
        { text: 'Revenue Marketing Architect', href: '/#about' },
        {
          text: ' working across Dubai’s real estate and performance marketing landscape.',
        },
      ]),
    ],
  },

  {
    _id: 'local-real-estate-launch-revenue-system',
    title: 'From Launch Strategy to Revenue',
    slug: 'real-estate-launch-revenue-system',
    category: 'case-study',
    excerpt:
      'Building a connected marketing system for a Dubai real estate launch.',
    seoTitle: 'Real Estate Marketing Dubai: From Launch to Revenue | Sharoon Irfan',
    metaDescription:
      'An inside look at how Sharoon Irfan approaches Dubai real estate marketing through positioning, performance, CRM, sales alignment and revenue attribution.',
    publishedAt: '2026-08-13T10:00:00.000Z',
    modifiedAt: '2026-08-13T10:00:00.000Z',
    featured: true,
    readTimeOverride: 4,
    coverImage: {
      isLocal: true,
      src: '/images/work/phone-desk.jpg',
      alt: 'A desk with a phone, keyboard and printed campaign reference photographs',
      width: 1400,
      height: 933,
    },
    body: [
      h2('01 — The Challenge'),
      p(
        'Most Dubai real estate developers I meet do not have a demand problem. They have a connection problem. The brand deck, the media plan, the CRM and the sales script are usually built by different people, at different times, answering different questions, and none of those documents were ever asked to agree with each other.'
      ),
      p(
        'Branding sits with one team, and it earns attention. Performance marketing sits with another, and it buys attention at the lowest cost per lead it can find. CRM sits with a third, mostly used to log what sales has already done rather than to inform what marketing should do next. Sales receives whatever arrives, with little say in how it was qualified before it reached them.'
      ),
      p(
        'The result is a launch that can look busy and still underperform. Marketing reports a strong cost per lead. Sales reports that most of what arrived was not ready to buy. Both reports can be accurate, and the business is still no closer to understanding what actually produced revenue.'
      ),

      h2('02 — The Approach'),
      rich([
        {
          text: 'I treat a launch as one connected ',
        },
        { text: 'system', href: '/#system' },
        {
          text: ' rather than a set of workstreams that happen to share a budget. Each stage exists to hand something usable to the one after it.',
        },
      ]),
      bullet([
        { text: 'Positioning', strong: true },
        { text: ': what the project is, honestly, before it is what the brochure calls it.' },
      ]),
      bullet([
        { text: 'Market understanding', strong: true },
        { text: ': where this project actually sits against what is already selling nearby.' },
      ]),
      bullet([
        { text: 'Audience definition', strong: true },
        { text: ': who this is genuinely built for, not who would technically qualify for it.' },
      ]),
      bullet([
        { text: 'Go-to-market strategy', strong: true },
        { text: ': the sequence launch moves happen in, and why that order.' },
      ]),
      bullet([
        { text: 'Creative direction', strong: true },
        { text: ': the visual and written language that carries the positioning through every channel.' },
      ]),
      bullet([
        { text: 'Performance campaigns', strong: true },
        { text: ': demand generation built to the audience definition, not a generic Dubai investor profile.' },
      ]),
      bullet([
        { text: 'Lead capture', strong: true },
        { text: ': collecting enough to act on, not just enough to hit a form-fill target.' },
      ]),
      bullet([
        { text: 'CRM', strong: true },
        { text: ': the record that holds source, behaviour and outcome against the same name.' },
      ]),
      bullet([
        { text: 'Lead qualification', strong: true },
        { text: ': separating budget-ready intent from early curiosity before sales spends time on it.' },
      ]),
      bullet([
        { text: 'Sales follow-up', strong: true },
        { text: ': working from a shared definition of what qualified actually means.' },
      ]),
      bullet([
        { text: 'Revenue attribution', strong: true },
        { text: ': tracing a signed unit back to what actually produced it.' },
      ]),
      p(
        'Skip a link in that chain and the ones after it inherit the gap. A strong campaign feeding an unqualified pipeline produces exactly the kind of lead count that looks good in a monthly report and says nothing about revenue.'
      ),

      h2('03 — The System'),
      p('Underneath the sequence is a simpler way of thinking about what each part is actually for.'),
      p(
        'Brand creates the reason to care, before a buyer has any reason to compare a price. Performance creates demand on the terms the brand set, and captures intent from it. CRM creates visibility into what happens to that intent after the form is submitted. Sales converts the opportunity CRM has kept visible. Data closes the loop, feeding what actually closed back into the next round of positioning and targeting.'
      ),
      rich([
        {
          text: 'The point of the loop is that marketing stops learning from vanity metrics and starts learning from revenue. I’ve written more on why that distinction matters in ',
        },
        {
          text: 'why real estate marketing needs a revenue system',
          href: '/thought-room/insights/real-estate-marketing-revenue-system',
        },
        { text: '.' },
      ]),

      h2('04 — What Changed'),
      p(
        'Rebuilding a launch as one system rather than five disconnected functions changes what the team can see and agree on, stage by stage.'
      ),
      bullet([
        { text: 'Clearer positioning', strong: true },
        { text: ': the project’s reason to matter, held to one line and used consistently from ad copy to sales script.' },
      ]),
      bullet([
        { text: 'Stronger campaign alignment', strong: true },
        { text: ': performance media speaking to the audience positioning actually defined, not a generic investor profile.' },
      ]),
      bullet([
        { text: 'Better lead quality', strong: true },
        { text: ': qualification criteria agreed before launch, not improvised by sales on the first call.' },
      ]),
      bullet([
        { text: 'Clearer funnel visibility', strong: true },
        { text: ': one record showing where a lead came from and what happened to it, rather than two teams keeping separate, disagreeing counts.' },
      ]),
      bullet([
        { text: 'Stronger marketing/sales coordination', strong: true },
        { text: ': both sides working from the same definition of qualified, which removes most of the argument about whose numbers are right.' },
      ]),
      bullet([
        { text: 'Better attribution', strong: true },
        { text: ': enough visibility to trace which stage of the funnel a result actually came from, instead of crediting whichever channel reported it last.' },
      ]),
      bullet([
        { text: 'More informed decision-making', strong: true },
        { text: ': budget and creative decisions made against what the CRM shows closed, not against which channel had the cheapest lead that month.' },
      ]),
      p(
        'None of that shows up as a single dramatic number on a slide. It shows up as a marketing function that can answer a harder question honestly: not how many leads, but which of this actually became revenue, and why.'
      ),

      h2('05 — The Principle'),
      quote(
        'The goal of marketing is not to generate the most activity. It is to build a system where the right activity can be connected to a commercial outcome.'
      ),
      p(
        'A launch with a strong project and fragmented marketing will still generate leads. It will also keep generating the same argument between marketing and sales about whose numbers are correct, because there was never one system for either of them to agree on. The work worth doing is building that system first, so the activity that follows has somewhere real to lead.'
      ),
      rich([
        {
          text: 'This is the system I build for real estate developers launching into Dubai’s market: positioning, performance, CRM and sales working from the same definition of success. See the full range of ',
        },
        { text: 'Services', href: '/#services' },
        { text: ', or ' },
        { text: 'get in touch', href: '/#contact' },
        { text: ' to talk about a launch.' },
      ]),
    ],
  },

  {
    _id: 'local-the-lead-is-not-the-result',
    title: 'The Lead Is Not the Result',
    slug: 'the-lead-is-not-the-result',
    category: 'article',
    excerpt:
      'Why marketing teams need to stop celebrating activity and start measuring what actually moves the business.',
    seoTitle: 'The Lead Is Not the Result | Revenue Marketing | Sharoon Irfan',
    metaDescription:
      'Why leads, clicks and CPL are not enough. Sharoon Irfan explains how marketing teams can connect lead generation, CRM, attribution and performance to real revenue.',
    publishedAt: '2026-08-13T11:00:00.000Z',
    modifiedAt: '2026-08-13T11:00:00.000Z',
    featured: true,
    readTimeOverride: 5,
    coverImage: {
      isLocal: true,
      src: '/images/work/white-desk.jpg',
      alt: 'A minimal pale desk with a magazine and a glass of water',
      width: 1400,
      height: 933,
    },
    body: [
      h2('01 — The Metric We Celebrate'),
      p(
        'Ask a marketing team how a campaign performed and the first number back is almost always a lead count, followed closely by cost per lead. Both are easy to pull from a dashboard the moment a campaign ends, which is exactly why they get reported first. Not because they are the most important number, but because they are the fastest one to have an answer for.'
      ),
      p(
        'A lead is not a result. It is an input. It is the point where someone raised a hand, not the point where the business became better off for having spent the money. Reporting leads and CPL as if they were the outcome is close to a sales team celebrating the number of meetings booked and stopping there.'
      ),
      p(
        'Easier metrics get celebrated because they arrive early and require nothing from anyone else in the business. Revenue requires sales, CRM, follow-up and time, none of which marketing controls alone, so measurement quietly retreats to the one number marketing can report by itself.'
      ),

      h2('02 — A Cheap Lead Can Be an Expensive Lead'),
      p(
        'Cost per lead measures how efficiently a form was filled. It says nothing about who filled it. A campaign that drops CPL by widening the audience, loosening the offer or simplifying the form will show a better number and a worse pipeline in the same report.'
      ),
      p(
        'Intent is not evenly distributed across a lower CPL. A lead who entered a competition for a voucher and a lead who spent a month comparing three developments look identical on a spend report and are not remotely the same lead. Send both into the same sales process and the second gets buried under the volume of the first.'
      ),
      p(
        'Sales capacity is finite. Every hour spent working a lead that was never going to convert is an hour not spent on one that might have. A cheap lead that quietly consumes a sales team’s time without producing a qualified conversation was never actually cheap. It was underpriced.'
      ),

      h2('03 — Marketing Does Not End at the Form'),
      p(
        'Most marketing reporting treats the form submission as the finish line. It is closer to the starting line. What happens after determines whether any of the spend before it mattered.'
      ),
      bullet([{ text: 'Lead', strong: true }, { text: ': the raised hand, nothing more yet.' }]),
      bullet([
        { text: 'Qualification', strong: true },
        { text: ': separating real intent from curiosity.' },
      ]),
      bullet([
        { text: 'CRM', strong: true },
        { text: ': the record that should carry the lead’s whole story, not just its arrival.' },
      ]),
      bullet([
        { text: 'Sales', strong: true },
        { text: ': the conversation that tests whether the intent is real.' },
      ]),
      bullet([
        { text: 'Follow-up', strong: true },
        { text: ': the difference between a lead that goes cold and one that gets worked.' },
      ]),
      bullet([
        { text: 'Opportunity', strong: true },
        { text: ': a qualified lead with a live reason to buy.' },
      ]),
      bullet([{ text: 'Conversion', strong: true }, { text: ': the opportunity closes.' }]),
      bullet([
        { text: 'Revenue', strong: true },
        { text: ': the number the business actually cares about.' },
      ]),
      p(
        'A campaign judged only on what happens before "Lead" is judged on roughly a third of its own journey. The rest of it, arguably the part with the most at stake, sits in someone else’s report, if it is measured at all.'
      ),

      h2('04 — The CRM Is Part of the Marketing System'),
      rich([
        { text: 'Most organisations treat the ' },
        { text: 'CRM', href: '/#crm-attribution' },
        {
          text: ' as sales software that marketing occasionally exports a report from. That framing throws away the only place in the business where source, behaviour, sales activity and outcome sit against the same name.',
        },
      ]),
      p(
        'Read properly, the CRM should be able to answer which channel, which campaign, which message and which audience produced the leads that became real opportunities, not just the leads that were cheapest to acquire. Without that visibility, budget decisions get made on the metric available, which is CPL, rather than the metric that matters, which is what closed.'
      ),
      rich([
        { text: 'I’ve made the same case in more detail elsewhere: on ' },
        {
          text: 'why real estate marketing needs a revenue system',
          href: '/thought-room/insights/real-estate-marketing-revenue-system',
        },
        { text: ', and in ' },
        {
          text: 'a working example of what that system looks like end to end',
          href: '/thought-room/case-studies/real-estate-launch-revenue-system',
        },
        { text: '.' },
      ]),

      h2('05 — What I Would Measure Instead'),
      p(
        'If lead count and CPL are the wrong finish line, the fix is not to ignore them. It is to keep measuring past them. A hierarchy that goes deeper produces more useful information at every stage, even if it takes longer to fill in.'
      ),
      bullet([{ text: 'Reach', strong: true }, { text: ': how many people saw it.' }]),
      bullet([{ text: 'Engagement', strong: true }, { text: ': how many people did something with it.' }]),
      bullet([{ text: 'Leads', strong: true }, { text: ': how many people asked for more.' }]),
      bullet([
        { text: 'Qualified leads', strong: true },
        { text: ': how many actually match who this was built for.' },
      ]),
      bullet([
        { text: 'Opportunities', strong: true },
        { text: ': how many are in a live sales conversation.' },
      ]),
      bullet([{ text: 'Conversions', strong: true }, { text: ': how many of those became a sale.' }]),
      bullet([
        { text: 'Revenue', strong: true },
        { text: ': what the business actually has to show for the spend.' },
      ]),
      p(
        'Each level down answers a slightly harder question and tells you something the level above it could not. Reach tells you if anyone noticed. Revenue tells you if any of it mattered.'
      ),

      h2('06 — The Real Question'),
      p(
        'The question most marketing reports answer is how many leads marketing generated. It is the easiest question to answer and the least useful one to ask.'
      ),
      p(
        'The better question is what marketing helped the business move closer to: a qualified pipeline, a shorter sales cycle, a clearer sense of which audience is worth paying to reach again. Answering that honestly sometimes means reporting a lower lead count next to a stronger business result, and defending that trade in the same room as the CPL slide.'
      ),
      quote(
        'A lead is not the result. It is the first evidence that the system might be working. What proves it is what happens after.'
      ),
      rich([
        {
          text: 'This is the standard I hold my own work to as a Revenue Marketing Architect: judging a ',
        },
        { text: 'system', href: '/#system' },
        { text: ' and its ' },
        { text: 'services', href: '/#services' },
        {
          text: ' by what they move a business toward, not by what they generate. If your reporting stops at the lead, ',
        },
        { text: 'get in touch', href: '/#contact' },
        { text: ' and we can talk about extending it.' },
      ]),
    ],
  },
];

export function getLocalPost(slug) {
  return LOCAL_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getLocalPostsByCategory(id) {
  return LOCAL_POSTS.filter((post) => post.category === id);
}

/** Category id → number of local pieces filed under it, for the hub's counts. */
export function localPostCounts() {
  return LOCAL_POSTS.reduce((counts, post) => {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
    return counts;
  }, {});
}
