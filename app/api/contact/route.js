import { Resend } from 'resend';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (v = '') =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Could not read that request.' }, { status: 400 });
  }

  const { name, company, email, phone, service, message, website } = body || {};

  // Honeypot filled means a bot. Return success so it learns nothing.
  if (website) return Response.json({ ok: true });

  if (!name || !String(name).trim()) {
    return Response.json({ error: 'Add your name so I know who I am replying to.' }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(String(email))) {
    return Response.json({ error: 'That email address does not look right.' }, { status: 400 });
  }
  if (!message || String(message).trim().length < 10) {
    return Response.json(
      { error: 'Add a line or two about your goal so the first reply is useful.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.CONTACT_FROM || 'Website <onboarding@resend.dev>';

  // Without a mail provider configured, say so plainly rather than pretending
  // the message went somewhere.
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY is not set — enquiry not delivered:', {
      name,
      email,
      service,
    });
    return Response.json(
      {
        error: `Email delivery is not configured on this site yet. Send your message to ${site.email} and it will reach me directly.`,
      },
      { status: 503 }
    );
  }

  const rows = [
    ['Name', name],
    ['Company', company],
    ['Email', email],
    ['Phone', phone],
    ['Interested in', service],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 18px 6px 0;color:#7a7a74;font:12px ui-monospace,monospace;text-transform:uppercase;letter-spacing:.12em;vertical-align:top">${esc(
          k
        )}</td><td style="padding:6px 0;color:#050805;font:15px/1.5 system-ui">${esc(v)}</td></tr>`
    )
    .join('');

  const html = `
    <div style="background:#f8f7f3;padding:32px">
      <div style="max-width:600px;margin:0 auto;background:#fff;padding:32px;border:1px solid #ede9e3">
        <p style="margin:0 0 24px;font:12px ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase;color:#c2b1a8">New enquiry — sharoon.ae</p>
        <table style="border-collapse:collapse;width:100%">${rows}</table>
        <p style="margin:24px 0 8px;font:12px ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#7a7a74">Message</p>
        <p style="margin:0;white-space:pre-wrap;color:#050805;font:15px/1.65 system-ui">${esc(message)}</p>
      </div>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: String(email),
      subject: `New enquiry — ${name}${company ? ` · ${company}` : ''}`,
      html,
    });

    if (error) {
      console.error('[contact] Resend rejected the message:', error);
      return Response.json(
        { error: `The message did not send. Email ${site.email} and it will reach me directly.` },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return Response.json(
      { error: `The message did not send. Email ${site.email} and it will reach me directly.` },
      { status: 500 }
    );
  }
}
