'use client';

import { useInView } from './Reveal';

/**
 * Headline reveal: each line is masked and slides up from its own baseline,
 * staggered. Line breaks are authored in content.js rather than measured, so
 * the typography never breaks in a place nobody chose.
 */
export default function Lines({
  lines = [],
  as: Tag = 'h1',
  className = '',
  delay = 0,
  stagger = 110,
}) {
  const ref = useInView({ threshold: 0.1 });

  return (
    <Tag ref={ref} className={`lines ${className}`}>
      {lines.map((line, i) => (
        <span className="lines__line" key={i}>
          <span
            className="lines__inner"
            style={{ '--line-delay': `${delay + i * stagger}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
