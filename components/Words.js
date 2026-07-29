'use client';

import { useInView } from './Reveal';

/**
 * Word-level reveal. Sibling to Lines, one register finer.
 *
 * Lines masks whole authored lines; this masks each word, so a sentence
 * assembles rather than arrives. That is a heavier effect than it looks —
 * reserve it for statements the page is built around. On body copy it turns
 * reading into waiting.
 */
export default function Words({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 46,
}) {
  const ref = useInView({ threshold: 0.2 });
  const words = String(text).split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref} className={`words ${className}`}>
      {words.map((word, i) => (
        // The space lives outside the mask. Inside an overflow:hidden
        // inline-block it collapses and the sentence loses its word spacing.
        <span key={`${word}-${i}`}>
          <span className="words__w">
            <span
              className="words__inner"
              style={{ '--word-delay': `${delay + i * stagger}ms` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
