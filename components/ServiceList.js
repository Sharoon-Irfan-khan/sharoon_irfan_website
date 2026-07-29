'use client';

import Reveal from './Reveal';
import useParallax from './useParallax';
import { byId, workSrc } from '@/lib/media';
import { slugify } from '@/lib/site';

/**
 * THE SERVICES.
 *
 * Six of them, each with its own photograph, alternating side to side so the
 * eye crosses the page rather than running down one column. One image per
 * service was the brief, and it is also the only honest way to use this set:
 * a moodboard against strategy, swatches against positioning, a stack of
 * printed matter against content. Each picture is doing a job.
 *
 * The image drifts against the scroll while its row is on screen — the same
 * parallax the rest of the site uses, not a new idea introduced here.
 */

function Service({ service, index }) {
  const { outer, inner } = useParallax(0.14);
  const clip = service.image ? byId(service.image) : null;

  return (
    <article
      className={`svc svc--${index % 2 ? 'right' : 'left'}`}
      id={slugify(service.name)}
    >
      {clip && (
        <Reveal className="svc__media" delay={60}>
          <div className="svc__frame" ref={outer}>
            <div className="svc__inner" ref={inner}>
              <img
                className="svc__img"
                src={workSrc(clip.id)}
                alt={clip.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Reveal>
      )}

      <div className="svc__body">
        <Reveal as="span" className="label svc__index" delay={40}>
          {String(index + 1).padStart(2, '0')}
        </Reveal>

        <Reveal delay={90}>
          <h3 className="display display--m svc__name">{service.name}</h3>
          {service.qualifier && (
            <span className="label svc__qualifier">{service.qualifier}</span>
          )}
        </Reveal>

        <Reveal as="p" className="lede svc__summary" delay={140}>
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
  return (
    <div className="svcs">
      {items.map((service, i) => (
        <Service service={service} index={i} key={service.name} />
      ))}
    </div>
  );
}
