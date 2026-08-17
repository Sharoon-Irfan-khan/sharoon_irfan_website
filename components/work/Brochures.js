'use client';

import { useEffect, useRef, useState } from 'react';
import { useReveal, useLoadMoreRows } from './useReveal';
import { workAsset } from '@/lib/work-assets';
import { brochures } from '@/lib/work-data';

const PDFJS_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER_SRC =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfjsLoadPromise = null;
/** Loads pdf.js from the same CDN build work.html used, once per page. */
function loadPdfJs() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfjsLoadPromise) return pdfjsLoadPromise;

  pdfjsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PDFJS_SRC;
    script.async = true;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
      resolve(window.pdfjsLib);
    };
    script.onerror = () => reject(new Error('pdf.js failed to load'));
    document.body.appendChild(script);
  });
  return pdfjsLoadPromise;
}

function BrochureCover({ brochure }) {
  const coverRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadPdfJs()
      .then((pdfjsLib) => pdfjsLib.getDocument(workAsset(brochure.pdf)).promise)
      .then((pdf) => pdf.getPage(1))
      .then((page) => {
        if (cancelled) return;
        const container = coverRef.current;
        if (!container) return;
        const vp = page.getViewport({ scale: 1 });
        const scale = container.clientWidth / vp.width || 1;
        const viewport = page.getViewport({ scale: Math.max(scale, 0.8) });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
        container.insertBefore(canvas, container.firstChild);
        page.render({ canvasContext: canvas.getContext('2d'), viewport });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [brochure.pdf]);

  return (
    <div className="brochure-cover" ref={coverRef}>
      <div className="brochure-cover-overlay">
        <span className="brochure-view-icon">&#8599;</span>
      </div>
      {failed && <div className="brochure-cover-placeholder">Preview unavailable</div>}
    </div>
  );
}

export default function Brochures() {
  const ref = useReveal();
  const { gridRef, wrapRef } = useLoadMoreRows(brochures.length, 1);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const bodyRef = useRef(null);

  const openPdf = (src, docTitle) => {
    setOpen(true);
    setTitle(docTitle);
    setLoading(true);
    document.body.style.overflow = 'hidden';
    const body = bodyRef.current;
    if (body) body.innerHTML = '';

    loadPdfJs()
      .then((pdfjsLib) => pdfjsLib.getDocument(workAsset(src)).promise)
      .then((pdf) => {
        const renders = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          renders.push(
            pdf.getPage(i).then((page) => {
              const viewport = page.getViewport({ scale: 1.8 });
              const canvas = document.createElement('canvas');
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              return page
                .render({ canvasContext: canvas.getContext('2d'), viewport })
                .promise.then(() => ({ canvas, pageNum: i }));
            })
          );
        }
        return Promise.all(renders);
      })
      .then((pages) => {
        setLoading(false);
        const body = bodyRef.current;
        if (!body) return;
        pages
          .sort((a, b) => a.pageNum - b.pageNum)
          .forEach(({ canvas }) => body.appendChild(canvas));
      })
      .catch(() => setLoading(false));
  };

  const closePdf = () => {
    setOpen(false);
    document.body.style.overflow = '';
    const body = bodyRef.current;
    if (body) body.innerHTML = '';
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && closePdf();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <section
      ref={ref}
      className="brochures-section"
      id="brochures"
      data-screen-label="Brochures & Presentations"
    >
      <div className="wrap">
        <div className="section-header">
          <span className="section-label reveal">05 · Brochures & Presentations</span>
          <h2 className="section-title reveal">
            Designed to Persuade.
            <br />
            Built to Leave an Impression.
          </h2>
          <p className="section-subtitle reveal">
            Presentation decks, company profiles, and marketing collateral created for clients
            across real estate and business sectors.
          </p>
        </div>
        <div className="brochures-grid" ref={gridRef}>
          {brochures.map((b) => (
            <div
              className="brochure-card reveal-stagger"
              key={b.pdf}
              onClick={() => openPdf(b.pdf, b.title)}
            >
              <BrochureCover brochure={b} />
              <div className="brochure-info">
                <span className="brochure-type">{b.type}</span>
                <div className="brochure-title">{b.titleText}</div>
                <div className="brochure-client">{b.client}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="load-more-wrap" ref={wrapRef}>
          <button type="button" className="load-more-btn">
            Load More Documents
          </button>
        </div>
      </div>

      <div
        className={`pdf-overlay${open ? ' active' : ''}`}
        onClick={(e) => e.target === e.currentTarget && closePdf()}
      >
        <div className="pdf-overlay-header">
          <span className="pdf-overlay-title">{title}</span>
          <button className="pdf-overlay-close" onClick={closePdf}>
            &#10005; Close
          </button>
        </div>
        <div className="pdf-overlay-body">
          {loading && <div className="pdf-loading">Loading document…</div>}
          {/* display:contents so canvases appended here still lay out as
              direct flex children of .pdf-overlay-body, while staying a DOM
              node React never renders into — the imperative pdf.js canvas
              inserts below can't collide with React's own reconciliation. */}
          <div ref={bodyRef} style={{ display: 'contents' }} />
        </div>
      </div>
    </section>
  );
}
