'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useReveal } from './useReveal';
import { workAsset } from '@/lib/work-assets';
import { designShowcaseFilters, designShowcaseItems } from '@/lib/work-data';

function getItemsPerRow() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth > 1200) return 3;
  if (window.innerWidth > 768) return 2;
  return 1;
}

export default function DesignShowcase() {
  const ref = useReveal();
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [initialCount, setInitialCount] = useState(6);

  useEffect(() => {
    const compute = () => setInitialCount(getItemsPerRow() * 2);
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Every item stays in the DOM — matching filters/limits are hidden with a
  // class rather than removed, same as work.html's own script, so the whole
  // gallery is still crawlable and nothing has to remount on filter change.
  let matchIndex = 0;
  const matchCount = designShowcaseItems.filter(
    (item) => filter === 'all' || item.filter === filter
  ).length;
  const hasMore = !showAll && matchCount > initialCount;

  return (
    <section
      ref={ref}
      className="design-showcase"
      id="design-showcase"
      data-screen-label="Design Showcase"
    >
      <div className="wrap">
        <div className="section-header">
          <span className="section-label reveal">07 · Design Showcase</span>
          <h2 className="section-title reveal">
            Graphic Design Portfolio.
            <br />
            Social Posts to Banners.
          </h2>
          <p className="section-subtitle reveal">
            Social media graphics, promotional banners, product photography, and design portfolio
            across real estate, fragrance, hospitality, and retail sectors.
          </p>
        </div>

        <div className="ds-filters reveal">
          {designShowcaseFilters.map((f) => (
            <button
              key={f.value}
              className={`ds-filter-btn${filter === f.value ? ' active' : ''}`}
              onClick={() => {
                setFilter(f.value);
                setShowAll(false);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="ds-masonry">
          {designShowcaseItems.map((item, i) => {
            const matches = filter === 'all' || item.filter === filter;
            let hidden = !matches;
            if (matches) {
              hidden = !showAll && matchIndex >= initialCount;
              matchIndex += 1;
            }
            return (
              <div
                className={`ds-item${hidden ? ' hidden' : ''}`}
                data-category={item.category}
                key={item.img + i}
              >
                <Image
                  src={workAsset(item.img)}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="ds-overlay">
                  <div className="ds-meta">
                    <span className="ds-cat">{item.cat}</span>
                    <span className="ds-title">{item.title}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {hasMore && (
        <div className="ds-load-more-wrap">
          <button type="button" className="load-more-btn" onClick={() => setShowAll(true)}>
            Load More Designs
          </button>
        </div>
      )}
    </section>
  );
}
