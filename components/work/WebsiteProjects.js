'use client';

import Image from 'next/image';
import { useReveal, useLoadMoreRows } from './useReveal';
import { workAsset } from '@/lib/work-assets';
import { featuredProjects, projectGrid } from '@/lib/work-data';

function BrowserCard({ project, as: Tag = 'h4' }) {
  return (
    <div className="project-card reveal-stagger">
      <div className="card-wrapper">
        <div className="browser-frame">
          <div className="browser-header">
            <div className="browser-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="browser-url">{project.url}</div>
          </div>
          <div className="browser-content">
            <Image
              src={workAsset(project.img)}
              alt={project.alt}
              width={project.imgW}
              height={project.imgH}
              sizes="(max-width: 900px) 100vw, 25vw"
              loading="lazy"
            />
          </div>
        </div>
        <div className="card-info">
          <Tag className="project-title">{project.title}</Tag>
          <div className="tag-group">
            {project.tags.map((t) => (
              <span className={`tag${t.accent ? ' accent-tag' : ''}`} key={t.text}>
                {t.text}
              </span>
            ))}
          </div>
          <p className="project-description">{project.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function WebsiteProjects() {
  const ref = useReveal();
  const { gridRef, wrapRef } = useLoadMoreRows(projectGrid.length, 1);

  return (
    <section
      ref={ref}
      className="website-projects-section"
      id="website-projects"
      data-screen-label="Website Projects"
    >
      <div className="wrap">
        <div className="section-header">
          <span className="label reveal">02 — Website Projects</span>
          <h2 className="section-title reveal">
            Website <span className="accent">Projects.</span>
          </h2>
          <p className="section-subtitle reveal">
            A selection of websites designed, developed, and optimized across multiple
            industries.
          </p>
        </div>

        <div className="featured-projects">
          {featuredProjects.map((p) => (
            <BrowserCard project={p} as="h3" key={p.url} />
          ))}
        </div>

        <div className="all-projects">
          <h3 className="projects-grid-title">All Projects</h3>
          <div className="projects-grid" ref={gridRef}>
            {projectGrid.map((p) => (
              <BrowserCard project={p} key={p.url} />
            ))}
          </div>
          <div className="load-more-wrap" ref={wrapRef}>
            <button type="button" className="load-more-btn">
              Load More Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
