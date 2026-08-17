'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useReveal } from './useReveal';
import { workAsset } from '@/lib/work-assets';
import { mockups } from '@/lib/work-data';

export default function GraphicDesign() {
  const ref = useReveal();
  const [revealedAll, setRevealedAll] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const hasHidden = mockups.some((m) => m.hidden);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setLightbox(null);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  return (
    <section
      ref={ref}
      className="graphic-design-section"
      id="graphic-design"
      data-screen-label="Brand Identity & Graphic Design"
    >
      <div className="wrap">
        <div className="section-header">
          <span className="section-label reveal">06 · Brand Identity & Graphic Design</span>
          <h2 className="section-title reveal">
            Designed to Be Remembered.
            <br />
            Built to Build Brands.
          </h2>
          <p className="section-subtitle reveal">
            Brand identity, mockups, business cards, and print design across real estate,
            retail, and professional services.
          </p>
        </div>

        <div className="gd-grid" id="gdMockupsGrid">
          {mockups.map((m) => (
            <div
              className={`gd-card reveal-stagger${m.hidden && !revealedAll ? ' gd-hidden' : ''}`}
              data-lightbox={m.lightbox}
              key={m.img}
              onClick={() => setLightbox(workAsset(m.lightbox))}
            >
              <div className="gd-img-wrap">
                <Image
                  src={workAsset(m.img)}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="gd-overlay">
                  <span className="gd-zoom">&#8599;</span>
                </div>
              </div>
              <div className="gd-meta">
                <span className="gd-tag">{m.tag}</span>
                <span className="gd-client">{m.client}</span>
              </div>
            </div>
          ))}
        </div>

        {hasHidden && !revealedAll && (
          <div className="load-more-wrap">
            <button type="button" className="load-more-btn" onClick={() => setRevealedAll(true)}>
              Load More Mockups
            </button>
          </div>
        )}
      </div>

      <div
        className={`gd-lightbox${lightbox ? ' active' : ''}`}
        onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
      >
        <button className="gd-lightbox-close" onClick={() => setLightbox(null)}>
          &#10005;
        </button>
        {lightbox && (
          <img className="gd-lightbox-img" src={lightbox} alt="" decoding="async" />
        )}
      </div>
    </section>
  );
}
