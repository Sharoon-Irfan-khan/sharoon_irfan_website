'use client';

import Image from 'next/image';
import Reveal from './Reveal';
import useParallax from './useParallax';
import { byId, workSrc } from '@/lib/media';
import { slugify } from '@/lib/site';

/**
 * THE SERVICES.
 *
 * Seven of them, four to a row, each a card of one photograph and two lines.
 *
 * They were seven full-width rows with the image and copy alternating side to
 * side. At one service per screen that is seven screens to read a list, and
 * the alternation — which works over three or four rows — had become a
 * metronome by the seventh. A grid states the same thing as a set, which is
 * what it is: seven things of equal weight, not a sequence.
 *
 * Four columns, so the last row carries the remaining three and the row above
 * stays full. One image per service was the brief and still is: a moodboard
 * against strategy, swatches against positioning, printed matter against
 * content. Each picture is doing a job.
 *
 * The image drifts against the scroll while its card is on screen — the same
 * parallax the rest of the site uses, not a new idea introduced here.
 */

function Service({ service, index }) {
  const { outer, inner } = useParallax(0.14);
  const clip = service.image ? byId(service.image) : null;

  // Cards arrive across the row rather than all at once. Keyed to the column,
  // not the index, so every row starts its sweep from the left edge again.
  const step = (index % 4) * 70;

  return (
    <article className="svc" id={slugify(service.name)}>
      {clip && (
        <Reveal className="svc__media" delay={step}>
          <div className="svc__frame" ref={outer}>
            <div className="svc__inner" ref={inner}>
              {/* Matches the grid: one card wide below 620px, two to 1099,
                  four above it. The parallax box it fills is inset -10% top
                  and bottom, so the image is taller than the frame — `fill`
                  keeps that behaviour rather than the file's own ratio. */}
              <Image
                className="svc__img"
                src={workSrc(clip.id)}
                alt={clip.alt}
                fill
                sizes="(max-width: 619px) 88vw, (max-width: 1099px) 44vw, 23vw"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      )}

      <div className="svc__body">
        <Reveal as="span" className="label svc__index" delay={step + 40}>
          {String(index + 1).padStart(2, '0')}
        </Reveal>

        <Reveal delay={step + 80}>
          <h3 className="display svc__name">{service.name}</h3>
          {service.qualifier && (
            <span className="label svc__qualifier">{service.qualifier}</span>
          )}
        </Reveal>

        <Reveal as="p" className="svc__summary" delay={step + 120}>
          {service.summary}
        </Reveal>

        {/* Optional, and currently unused. Each service is a name, a line and
            a photograph; the deliverable list and outcome paragraph that used
            to sit here turned seven services into seven pages of reading. */}
        {service.deliverables?.length > 0 && (
          <Reveal className="svc__deliverables" delay={190}>
            <ul>
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        )}

        {service.outcome && (
          <Reveal className="svc__outcome" delay={240}>
            <span className="label">Outcome</span>
            <p>{service.outcome}</p>
          </Reveal>
        )}
      </div>
    </article>
  );
}

export default function ServiceList({ items = [] }) {
  // The shell moved here from the individual rows. Each row used to carry its
  // own max-width and gutters because each was a full-width band; the grid is
  // one container, so the measure belongs to it.
  return (
    <div className="svcs shell">
      {items.map((service, i) => (
        <Service service={service} index={i} key={service.name} />
      ))}
    </div>
  );
}
