// Netlify serverless function: handle Contact form submissions.
//
// The browser used to call EmailJS directly, which meant the Turnstile token
// was never checked — anyone could post to the EmailJS API and skip the
// challenge. This function verifies Turnstile server-side, runs the same bot
// checks as the quote form, then sends through the EmailJS REST API with the
// account's PRIVATE key. With "Use Private Key" enabled in EmailJS, direct
// browser calls (which can't know that key) are rejected.
//
// Env (Netlify → Site configuration → Environment variables):
//   EMAILJS_SERVICE_ID / EMAILJS_TEMPLATE_ID / EMAILJS_PUBLIC_KEY
//     — fall back to the existing VITE_EMAILJS_* values if unset.
//   EMAILJS_PRIVATE_KEY — EmailJS → Account → API keys → Private Key.
//   TURNSTILE_SECRET_KEY — shared with submit-quote.

import { env, isTooFast, verifyTurnstile } from '../lib/verify';

interface ContactFormPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  turnstileToken?: string;
  /** Milliseconds since the form was first rendered (anti-bot timing). */
  formStartedAt?: number;
  /** Honeypot — must stay empty; bots often auto-fill hidden fields. */
  companyWebsite?: string;
}

const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /https?:\/\/|www\./gi;

const LIMITS = { name: 120, email: 200, subject: 120, message: 5000 };

const sendViaEmailJs = async (params: Record<string, string>): Promise<boolean> => {
  const serviceId = env.EMAILJS_SERVICE_ID || env.VITE_EMAILJS_SERVICE_ID;
  const templateId = env.EMAILJS_TEMPLATE_ID || env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = env.EMAILJS_PUBLIC_KEY || env.VITE_EMAILJS_USER_ID;
  const privateKey = env.EMAILJS_PRIVATE_KEY;
  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error('[submit-contact] EmailJS is not fully configured (service/template/public/private key).');
    return false;
  }

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: params,
      }),
    });
    if (!res.ok) {
      console.error('[submit-contact] EmailJS error:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[submit-contact] EmailJS request failed:', err);
    return false;
  }
};

export const handler = async (event: {
  httpMethod?: string;
  body?: string | null;
}) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let payload: ContactFormPayload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const name = (payload.name ?? '').trim();
  const email = (payload.email ?? '').trim();
  const subject = (payload.subject ?? '').trim();
  const message = (payload.message ?? '').trim();

  // --- Validation ---
  if (!name) return json(400, { error: 'Name is required.' });
  if (!EMAIL_RE.test(email)) return json(400, { error: 'A valid email is required.' });
  if (!subject) return json(400, { error: 'Please choose a subject.' });
  if (!message) return json(400, { error: 'Message is required.' });
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return json(400, { error: 'One of the fields is too long.' });
  }

  // --- Bot / spam checks ---
  if (payload.companyWebsite?.trim()) {
    console.warn('[submit-contact] Honeypot triggered');
    return json(403, { error: 'Verification failed. Please try again.' });
  }
  if (isTooFast(payload.formStartedAt)) {
    console.warn('[submit-contact] Form submitted too quickly');
    return json(403, { error: 'Verification failed. Please try again.' });
  }
  const urlMatches = message.match(URL_RE);
  if (urlMatches && urlMatches.length >= 3) {
    console.warn('[submit-contact] Spam heuristic: too many links');
    return json(403, { error: 'Verification failed. Please try again.' });
  }

  const human = await verifyTurnstile(payload.turnstileToken, 'submit-contact');
  if (!human) {
    return json(403, { error: 'Verification failed. Please try again.' });
  }

  // --- Deliver (same template params the browser used to send) ---
  const sent = await sendViaEmailJs({
    name,
    email,
    subject,
    message,
    application: 'The Gahitwen LLC',
  });
  if (!sent) {
    return json(502, {
      error: 'Failed to send message. Please try again later, or email info@gahitwen.com.',
    });
  }

  return json(200, { ok: true });
};
