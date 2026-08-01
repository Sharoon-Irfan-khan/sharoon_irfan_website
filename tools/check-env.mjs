#!/usr/bin/env node
/**
 * ENV SAFETY CHECK  —  `npm run check:env`
 *
 * Written after an app password was pasted into .env.example, which was tracked
 * by git. It was caught before the commit, but only because someone happened to
 * look.
 *
 * The layout has since been collapsed to a single gitignored .env (1 August
 * 2026), which removes that particular trap and replaces it with a sharper one:
 * every secret the project has now sits in one file, and the ONLY thing keeping
 * it out of the repository is the `.env` line in .gitignore. Delete that line
 * and the next commit publishes everything. So the first check below is no
 * longer "is a secret in the wrong file" but "is the right file still ignored".
 *
 * This script never prints a secret — findings are reported by file, line and
 * key, and values are masked.
 *
 * Exit 1 on an error, 0 on warnings alone. Warnings are for things that work
 * but are fragile; errors are for things that leak or are already broken.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Keys whose value is a credential. NEXT_PUBLIC_* is exempt: it is compiled
// into the browser bundle by design, so it is not a secret and pretending
// otherwise trains people to ignore this script.
const SECRET_KEY = /(PASS|PASSWORD|SECRET|TOKEN|CREDENTIAL|PRIVATE|API_KEY)/i;
const PUBLIC_PREFIX = /^NEXT_PUBLIC_/;

// A Google app password: 16 lowercase letters, shown as four groups of four.
// Matched on the value regardless of key name, because the next one to leak
// will be under a key nobody thought to pattern-match.
const APP_PASSWORD = /^[a-z]{4}[ -]?[a-z]{4}[ -]?[a-z]{4}[ -]?[a-z]{4}$/;

// Keys that are legitimately blank.
// CONTACT_FROM   — defaults to SMTP_USER, and Gmail rejects any other sender.
// SANITY_*_TOKEN — only needed for private datasets or draft previews.
const OPTIONAL = new Set(['CONTACT_FROM', 'SANITY_API_READ_TOKEN']);

const errors = [];
const warnings = [];
const err = (file, line, msg) => errors.push({ file, line, msg });
const warn = (file, line, msg) => warnings.push({ file, line, msg });

const mask = (v) =>
  v.length <= 4 ? '*'.repeat(v.length) : `${v.slice(0, 2)}${'*'.repeat(v.length - 4)}${v.slice(-2)}`;

/** Parse KEY=value lines, keeping line numbers for reporting. */
function parseEnv(text) {
  const out = [];
  text.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trim();
    if (!line || line.startsWith('#')) return;
    const m = line.replace(/^export\s+/, '').match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) return;
    const value = m[2].trim().replace(/^(['"])(.*)\1$/, '$2');
    out.push({ key: m[1], value, line: i + 1 });
  });
  return out;
}

function tracked(pattern) {
  try {
    return execFileSync('git', ['ls-files', '-z', '--', pattern], { cwd: ROOT, encoding: 'utf8' })
      .split('\0')
      .filter(Boolean);
  } catch {
    // No git, or not a repo. The .env checks below still apply.
    warn('git', 0, 'could not list tracked files — skipping the leak check');
    return [];
  }
}

// ---------------------------------------------------------------------------
// 1. No credential may sit in a tracked env file.
// ---------------------------------------------------------------------------
const trackedEnv = tracked('.env*');

for (const file of trackedEnv) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) continue;

  for (const { key, value, line } of parseEnv(fs.readFileSync(full, 'utf8'))) {
    if (!value) continue;

    if (SECRET_KEY.test(key) && !PUBLIC_PREFIX.test(key)) {
      err(file, line, `${key} has a value (${mask(value)}). Tracked by git — this would be published. Blank it here; the real value belongs in .env.`);
    } else if (APP_PASSWORD.test(value)) {
      err(file, line, `${key} looks like a Google app password (${mask(value)}). Tracked by git.`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. The file holding the real values must be ignored by git.
//
// This is the load-bearing check. `git check-ignore` is asked directly rather
// than pattern-matching .gitignore, because it accounts for negations, nested
// .gitignore files and global excludes — all of which can re-expose a file that
// a naive text search would call safe.
// ---------------------------------------------------------------------------
const ENV_FILE = '.env';
const envPath = path.join(ROOT, ENV_FILE);

function ignoredByGit(file) {
  try {
    execFileSync('git', ['check-ignore', '-q', '--', file], { cwd: ROOT, stdio: 'ignore' });
    return true;
  } catch (e) {
    return e.status === 1 ? false : null; // 1 = not ignored; anything else = git unavailable
  }
}

if (fs.existsSync(envPath)) {
  const state = ignoredByGit(ENV_FILE);
  if (state === false) {
    err(ENV_FILE, 0, 'NOT ignored by git. Every secret in it would be published on the next commit. Restore the ".env" line in .gitignore.');
  } else if (state === null) {
    warn(ENV_FILE, 0, 'could not confirm git ignores this file');
  }

  // Belt and braces: even ignored, it must not already be in the index.
  try {
    const staged = execFileSync('git', ['ls-files', '--', ENV_FILE], { cwd: ROOT, encoding: 'utf8' }).trim();
    if (staged) err(ENV_FILE, 0, 'is TRACKED by git despite being ignored. Run: git rm --cached .env');
  } catch { /* git unavailable — reported above */ }
}

// ---------------------------------------------------------------------------
// 3. .env must be complete and well-formed.
// ---------------------------------------------------------------------------
// Keys the app genuinely needs. There is no .env.example to compare against any
// more, so the contract lives here instead — which is the honest place for it,
// since a template file only documents what someone remembered to add.
const REQUIRED = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_TO',
];

if (!fs.existsSync(envPath)) {
  warn(ENV_FILE, 0, 'not present — the site runs, but the contact form will refuse to send');
} else {
  const byKey = new Map(parseEnv(fs.readFileSync(envPath, 'utf8')).map((e) => [e.key, e]));

  for (const key of REQUIRED) {
    if (OPTIONAL.has(key)) continue;
    const got = byKey.get(key);
    if (!got) warn(ENV_FILE, 0, `${key} is missing`);
    else if (!got.value) warn(ENV_FILE, got.line, `${key} is empty`);
  }

  // Gmail accepts the app password with the spaces it displays, but a value
  // with spaces survives a paste into a dashboard field only by luck — and a
  // trailing one is invisible in every UI that matters.
  const pass = byKey.get('SMTP_PASS');
  if (pass?.value) {
    const stripped = pass.value.replace(/\s+/g, '');
    if (/\s/.test(pass.value)) {
      warn(ENV_FILE, pass.line, `SMTP_PASS contains spaces. Works, but store it as the ${stripped.length} unbroken characters.`);
    }
    if (!/^[a-z]{16}$/.test(stripped)) {
      warn(ENV_FILE, pass.line, `SMTP_PASS is ${stripped.length} chars once spaces are removed; a Google app password is 16 lowercase letters.`);
    }
  }

  // SMTP is all-or-nothing: the route falls back to "not configured" and tells
  // visitors to phone instead, which looks like a working form that silently is
  // not one.
  const smtp = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
  const set = smtp.filter((k) => byKey.get(k)?.value);
  if (set.length > 0 && set.length < smtp.length) {
    warn(ENV_FILE, 0, `SMTP is half-configured (${set.join(', ')} set) — the contact form will refuse to send.`);
  }

  // CONTACT_FROM defaults to SMTP_USER. Anything else needs a verified alias at
  // the provider, and without one the send is rejected outright.
  const from = byKey.get('CONTACT_FROM');
  const user = byKey.get('SMTP_USER')?.value;
  if (from?.value && user && !from.value.includes(user)) {
    warn(ENV_FILE, from.line, `CONTACT_FROM does not use SMTP_USER (${user}). Gmail rejects sends from an unverified alias — leave it blank unless the alias is verified.`);
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const show = (list, label) => {
  if (!list.length) return;
  console.log(`\n${label}`);
  for (const { file, line, msg } of list) {
    console.log(`  ${file}${line ? `:${line}` : ''}\n    ${msg}`);
  }
};

show(errors, `ERROR  (${errors.length})`);
show(warnings, `WARN   (${warnings.length})`);

if (errors.length) {
  console.log(`\nFailed: ${errors.length} error${errors.length > 1 ? 's' : ''}. Nothing was changed.`);
  process.exit(1);
}
console.log(warnings.length ? '\nNo leaks. Warnings above are safe to ship.' : '\nEnv OK.');
