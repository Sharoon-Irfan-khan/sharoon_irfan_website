'use client';

import { useId, useState } from 'react';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const btnId = `${base}-btn-${i}`;

        return (
          <div className={`acc__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={btnId}
                className="acc__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.q}
                <span className="acc__sign" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="acc__panel"
              id={panelId}
              role="region"
              aria-labelledby={btnId}
            >
              <div>
                <p className="acc__answer">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
