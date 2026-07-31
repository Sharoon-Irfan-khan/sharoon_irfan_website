import nodemailer from 'nodemailer';
import { site } from '@/lib/site';

/**
 * THE ENQUIRY ENDPOINT.
 *
 * Delivers over SMTP, straight to the inbox that already exists on the domain
 * — info@sharoon.ae. It used to go through Resend's HTTP API, which meant a
 * third-party account, a domain verification and a key to keep alive before the
 * form could send anything at all. None of that was ever completed, so every
 * enquiry since launch has hit the "not configured" branch and been told to go
 * and write an email instead. SMTP needs nothing but the mailbox's own
 * credentials.
 *
 * Node runtime, because SMTP is a raw TCP connection — it cannot run on an edge
 * runtime, and no amount of configuration will change that.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (v = '') =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/*
  A header cannot contain a newline. Anything the visitor types that reaches
  Subject, From or Reply-To is stripped of CR and LF first, because a submitted
  name of "Ali\nBcc: everyone@example.com" would otherwise become a real Bcc
  header — that is header injection, and the form is the one place on the site
  where a stranger writes into an email we send.
*/
const header = (v = '') => String(v).replace(/[\r\n]+/g, ' ').trim();

/*
  One transport for the life of the server process, not one per enquiry.

  Nodemailer pools connections, and building a fresh transport per request
  throws that away: every message would open a new TCP connection, do the TLS
  handshake and authenticate again. It is also where the config is validated,
  so a missing variable is caught once rather than on every submission.

  Cached on globalThis because Next reloads this module on every edit in dev,
  which would otherwise leak a pooled transport per save.
*/
function transport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  if (globalThis.__mailer) return globalThis.__mailer;

  // 465 is implicit TLS (the connection is encrypted from the first byte); 587
  // is STARTTLS (plaintext, then upgraded). Getting `secure` wrong for the port
  // is the single most common reason an otherwise correct SMTP setup hangs, so
  // it is derived from the port rather than configured separately.
  const port = Number(process.env.SMTP_PORT || 465);

  globalThis.__mailer = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    pool: true,
    maxConnections: 3,
    // A mailbox that does not answer should fail the request, not hold the
    // function open until the platform kills it.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return globalThis.__mailer;
}

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

  const mailer = transport();

  // Without SMTP configured, say so plainly rather than pretending the message
  // went somewhere.
  if (!mailer) {
    console.warn('[contact] SMTP is not configured — enquiry not delivered:', {
      name,
      email,
      service,
    });
    return Response.json(
      {
        error: `Email delivery is not configured on this site yet. ${site.fallbackContact} and it will reach me directly.`,
      },
      { status: 503 }
    );
  }

  // Where it lands, and who it is from. Two separate questions, and the whole
  // point of keeping them separate is that the mailbox doing the sending does
  // not have to be the mailbox doing the reading.
  //
  // CONTACT_TO takes a comma-separated list, so an enquiry can land in more
  // than one inbox at once — the address that is read day to day, plus the one
  // that is kept as the record.
  const to = (process.env.CONTACT_TO || site.email)
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean);

  // The From address is ours, never the visitor's. Sending as the visitor is
  // the intuitive thing to do and it is exactly what SPF and DMARC exist to
  // stop: the mailbox would be claiming to be gmail.com, and the message would
  // be junked or refused outright. Their address goes in Reply-To, so pressing
  // reply still writes to them.
  //
  // The default is SMTP_USER rather than site.email, and that matters when the
  // two differ. A mailbox may only send as itself unless the provider has been
  // told otherwise — Google Workspace and Microsoft 365 both require a verified
  // "send as" alias, and verifying it needs access to the address being claimed.
  // Defaulting to the authenticated account is the setting that always works.
  const from = process.env.CONTACT_FROM || `${site.name} Website <${process.env.SMTP_USER}>`;

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

  // A plain-text alternative, because a message with no text part scores worse
  // with every spam filter there is — and this one has to reach an inbox.
  const text = [
    ['Name', name],
    ['Company', company],
    ['Email', email],
    ['Phone', phone],
    ['Interested in', service],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .concat(['', String(message)])
    .join('\n');

  try {
    await mailer.sendMail({
      from,
      to,
      replyTo: header(`${name} <${email}>`),
      subject: header(`New enquiry — ${name}${company ? ` · ${company}` : ''}`),
      text,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    // The full error goes to the server log; the visitor gets an address that
    // works. Whatever went wrong — bad credentials, a refused relay, a mailbox
    // over quota — none of it is theirs to solve.
    console.error('[contact] SMTP send failed:', err);
    return Response.json(
      { error: `The message did not send. ${site.fallbackContact} and it will reach me directly.` },
      { status: 502 }
    );
  }
}
