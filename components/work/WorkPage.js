'use client';

import Image from 'next/image';
import { useReveal } from './useReveal';
import { workAsset } from '@/lib/work-assets';
import { seoCases } from '@/lib/work-data';
import WebsiteProjects from './WebsiteProjects';
import SocialAccounts from './SocialAccounts';
import Brochures from './Brochures';
import GraphicDesign from './GraphicDesign';
import DesignShowcase from './DesignShowcase';

const TRUSTED_BRANDS_IMG = 'uploads/sharoon website cover (6).png';
const TRUSTED_BRANDS_W = 2560;
const TRUSTED_BRANDS_H = 1440;

export default function WorkPage() {
  const heroRef = useReveal();
  const brandsRef = useReveal();
  const seoRef = useReveal();
  const ctaRef = useReveal();

  return (
    <div className="wp-page">
      <header ref={heroRef} className="page-hero tone-dark" data-screen-label="Portfolio Hero">
        <div className="wrap">
          <span className="label reveal">Portfolio</span>
          <h1 className="reveal d1">
            Selected <em>Portfolio.</em>
          </h1>
          <p className="page-sub reveal d2">
            A collection of brands, businesses, and projects I have helped shape through
            strategy, design, branding, web development, SEO, and digital marketing.
          </p>
        </div>
      </header>

      <section
        ref={brandsRef}
        className="trusted-brands-section tone-light"
        id="trusted-brands"
        data-screen-label="Trusted By Brands"
      >
        <div className="wrap">
          <div className="section-header">
            <span className="label reveal">01 — Trusted By Brands</span>
            <h2 className="section-title reveal">
              Brands & <span className="accent">Businesses.</span>
            </h2>
            <p className="section-subtitle reveal">
              A selection of brands, businesses, and organizations I have partnered with
              across real estate, hospitality, technology, retail, professional services, and
              luxury sectors.
            </p>
          </div>

          <div className="trusted-brands-artwork">
            <Image
              src={workAsset(TRUSTED_BRANDS_IMG)}
              alt="Portfolio of trusted brands and client logos"
              className="brands-image reveal"
              width={TRUSTED_BRANDS_W}
              height={TRUSTED_BRANDS_H}
              sizes="(max-width: 1000px) 100vw, 1000px"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <WebsiteProjects />

      <section
        ref={seoRef}
        className="seo-results-section"
        id="seo-results"
        data-screen-label="SEO Results"
      >
        <div className="wrap">
          <div className="section-header">
            <span className="section-label">03 · SEO Results</span>
            <h2 className="section-title reveal">
              Real Rankings.
              <br />
              Real Traffic.
              <br />
              Real Growth.
            </h2>
            <p className="section-subtitle reveal">
              Data-driven SEO case studies across e-commerce, content, real estate, and B2B
              niches.
            </p>
          </div>

          <div className="seo-case-studies">
            {seoCases.map((c, i) => (
              <div className={`case-study case-0${i + 1}`} data-case={`0${i + 1}`} key={c.title}>
                <div className="case-inner">
                  <div className="case-image-wrapper">
                    <Image
                      src={workAsset(c.img)}
                      alt={c.alt}
                      className="case-image"
                      width={c.imgW}
                      height={c.imgH}
                      sizes="(max-width: 900px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="case-content">
                    <span className="case-badge">{c.badge}</span>
                    <h3 className="case-title">{c.title}</h3>
                    <p className="case-description">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SocialAccounts />
      <Brochures />
      <GraphicDesign />
      <DesignShowcase />

      <section ref={ctaRef} className="cta tone-dark" id="contact" data-screen-label="Contact">
        <div className="wrap cta__inner">
          <h2 className="reveal">
            Have a Project in <span className="accent">Mind?</span>
          </h2>
          <p className="reveal d1">
            Available for senior engagements, fractional leadership, consulting, and strategic
            conversations — across any industry.
          </p>
          <div className="cta__actions reveal d2">
            <a
              href="https://wa.me/971561217647?text=Hi%20Sharoon,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Start a Conversation
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
