'use client';

import Link from 'next/link';
import Reveal from './Reveal';
import SwitchFrame from './SwitchFrame';
import { hero } from '@/lib/content';

/**
 * THE OPENING — light, name first, photographs tucked under the type.
 *
 * This is the reference's composition and, more to the point, it is the one
 * that matches the brand. The palette here is warm neutrals and a didone; the
 * previous dark hero was fighting both. Cream ground, the name set enormous in
 * the display face, and the photographs overlapping its lower half so the type
 * sits behind the pictures rather than on top of them.
 *
 * It also solves the image problem. These flatlays are light, warm and
 * editorial — exactly what this treatment wants, and exactly what a full-bleed
 * dark hero made look muddy.
 *
 * Still missing: a photograph of Sharoon. In the reference the three images
 * are all of the person whose name is set above them. Here they are objects.
 */

/*
  Three frames, each cycling its own set of photographs on its own timer. No
  picture appears in two lists, so two frames can never show the same thing at
  once, and the offsets keep them from changing on the same beat.

  All six of the new homepage photographs sit in frames A and B, because C is
  hidden below 900px — putting any of them there would have meant a phone never
  saw them. C carries stock from the older set instead.

  The branded one leads frame A: it is the only photograph in the whole library
  with Sharoon's mark in it, so it earns the first slot users look at.
*/
const FRAMES = [
  {
    className: 'hframe--a',
    offset: 0,
    items: ['home-branded', 'magazine-hands', 'home-reading', 'home-gallery'],
  },
  {
    className: 'hframe--b',
    offset: 2000,
    items: ['coffee-magazine', 'home-table', 'home-stack', 'home-light'],
  },
  {
    className: 'hframe--c',
    offset: 4000,
    items: ['editorial-spread', 'magazine-open', 'journal-desk'],
  },
];

export default function Hero() {
  return (
    <section
      className="hero surface-champagne"
      id="top"
      data-chapter={hero.chapter}
      data-tone="light"
    >
      <div className="shell hero__inner">
        {/* The name is the headline. Everything else on this screen supports
            it, which is what makes it a portfolio rather than a brochure. */}
        <Reveal as="h1" className="hero__name" delay={200}>
          {hero.name}
        </Reveal>

        {/* The role sits under the name, not above it: you read who, then
            what. It was a location kicker before, which answered neither. */}
        <Reveal as="p" className="hero__role" delay={300}>
          {hero.role}
        </Reveal>

        <div className="hero__stage">
          {/* 260ms apart rather than the 130 used elsewhere: at the shorter
              spacing the three frames read as one block arriving, and the
              point here is that they arrive one at a time. */}
          {FRAMES.map((f, i) => (
            <Reveal
              className={`hframe ${f.className}`}
              key={f.className}
              delay={420 + i * 260}
            >
              <SwitchFrame items={f.items} offset={f.offset} />
            </Reveal>
          ))}

          {/* One sentence and one button. The claim line that sat above the
              standfirst said the same thing twice, and the email/LinkedIn/
              phone row duplicated the contact section three screens down. */}
          <div className="hero__copy">
            <Reveal as="p" className="hero__standfirst" delay={620}>
              {hero.standfirst}
            </Reveal>
            <Reveal className="hero__actions" delay={720}>
              <Link className="ghost" href="#contact">
                {hero.action}
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
