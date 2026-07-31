'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

// Mirrors `services.items` in lib/content — if a service is added there, add
// it here or the enquiry cannot name it.
const SERVICES = [
  'Not sure yet — start with the call',
  'Go-to-Market Strategy',
  'Performance Marketing',
  'SEO & Content',
  'Websites & Landing Pages',
  'CRM & Attribution',
  'Brand Positioning',
  'Developer Experience',
  'The full funnel',
];

const IDLE = { state: 'idle', message: '' };

export default function ContactForm() {
  const [status, setStatus] = useState(IDLE);

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus({ state: 'sending', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          state: 'error',
          message:
            payload.error ||
            `Something went wrong on the way. ${site.fallbackContact} and it will reach me directly.`,
        });
        return;
      }

      form.reset();
      setStatus({
        state: 'sent',
        message: "Received. You'll hear back within one working day.",
      });
    } catch {
      setStatus({
        state: 'error',
        message: `The message didn't send. ${site.fallbackContact} and it will reach me directly.`,
      });
    }
  }

  const sending = status.state === 'sending';

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row form__row--2">
        <div className="field">
          <label className="label field__label" htmlFor="name">
            Name
          </label>
          <input
            className="field__input"
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
          />
        </div>

        <div className="field">
          <label className="label field__label" htmlFor="company">
            Company
          </label>
          <input
            className="field__input"
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Brand or company"
          />
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="field">
          <label className="label field__label" htmlFor="email">
            Email
          </label>
          <input
            className="field__input"
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>

        <div className="field">
          <label className="label field__label" htmlFor="phone">
            Phone
          </label>
          <input
            className="field__input"
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+971"
          />
        </div>
      </div>

      <div className="field">
        <label className="label field__label" htmlFor="service">
          What you need
        </label>
        <select className="field__select" id="service" name="service" defaultValue={SERVICES[0]}>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="label field__label" htmlFor="message">
          Your goal and your numbers
        </label>
        <textarea
          className="field__textarea"
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Where you are now, where you want to get to, and any figures worth knowing."
        />
      </div>

      {/* Honeypot. Hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status.message && (
        <p
          className={`form__status ${status.state === 'error' ? 'form__status--error' : ''}`}
          role="status"
        >
          {status.message}
        </p>
      )}

      <div className="form__foot">
        <button type="submit" className="btn" disabled={sending}>
          {sending ? 'Sending' : 'Send it over'}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </button>
        <span className="form__note">Replies within one working day</span>
      </div>
    </form>
  );
}
