'use client';

import { useEffect, useRef } from 'react';

/**
 * The single reveal primitive used across the site.
 *
 * One motion vocabulary — a short rise and fade — applied consistently is what
 * makes the page feel composed. Anything that needs to appear on scroll uses
 * this, so nothing ever animates in a way the rest of the page doesn't.
 */
export function useInView({ threshold = 0.15, once = true, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          if (once) io.unobserve(el);
        } else if (!once) {
          el.classList.remove('is-in');
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, rootMargin]);

  return ref;
}

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  y,
  className = '',
  children,
  ...rest
}) {
  const ref = useInView();

  const style = { '--reveal-delay': `${delay}ms`, ...(rest.style || {}) };
  if (y != null) style['--reveal-y'] = `${y}px`;

  return (
    <Tag ref={ref} data-reveal className={className} {...rest} style={style}>
      {children}
    </Tag>
  );
}

/** A hairline that draws itself in from the left when it enters view. */
export function DrawRule({ delay = 0, className = '' }) {
  const ref = useInView();
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`draw-rule ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    />
  );
}
