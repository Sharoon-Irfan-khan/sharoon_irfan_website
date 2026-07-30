'use client';

import { useInView } from './Reveal';

/**
 * Word-level reveal. Sibling to Lines, one register finer.
 *
 * Lines masks whole authored lines; this masks each word, so a sentence
 * assembles rather than arrives. That is a heavier effect than it looks —
 * reserve it for statements the page is built around. On body copy it turns
 * reading into waiting.
 *
 * `text` takes a string, or an array of strings to break where the writing
 * breaks — same rule as Lines, so a sentence never starts halfway along a
 * line nobody chose. Each entry becomes its own block; the words inside still
 * wrap if the measure is narrower than the line.
 */
export default function Words({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 46,
}) {
  const ref = useInView({ threshold: 0.2 });
  const authored = Array.isArray(text) ? text : [text];

  // The stagger runs across the whole statement, not per line — restarting it
  // at each break would read as two separate arrivals.
  let n = 0;

  return (
    <Tag ref={ref} className={`words ${className}`}>
      {authored.map((line, li) => {
        const words = String(line).split(/\s+/).filter(Boolean);
        return (
          <span className="words__line" key={li}>
            {words.map((word, i) => {
              const step = n++;
              return (
                // The space lives outside the mask. Inside an overflow:hidden
                // inline-block it collapses and the sentence loses its word
                // spacing.
                <span key={`${word}-${i}`}>
                  <span className="words__w">
                    <span
                      className="words__inner"
                      style={{ '--word-delay': `${delay + step * stagger}ms` }}
                    >
                      {word}
                    </span>
                  </span>
                  {i < words.length - 1 ? ' ' : ''}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
