// Netlify serverless function: handle "Get a Quote" submissions.
//
// Responsibilities:
//   1. Validate the incoming request.
//   2. Verify the reCAPTCHA v3 token server-side (if configured).
//   3. Recompute the AUTHORITATIVE estimate using the shared rate engine
//      (clients can tamper with their copy — the server is the source of truth).
//   4. Generate a ticket reference.
//   5. Draft the customer reply with AI (OpenRouter, free models) when
//      configured — otherwise fall back to a built-in template.
//   6. Deliver the ticket to whichever channel is configured:
//        - Email via Resend OR Mailgun (team notification + customer auto-reply)
//        - And/or a generic webhook (Zapier / Make / Chatwoot / HubSpot / etc.)
//   7. Return the reference to the client (never the rates).
//
// Email is provider-agnostic: set RESEND_API_KEY (preferred) or MAILGUN_*.
// Ticketing is pluggable: set HELPDESK_WEBHOOK_URL to forward every quote into
// a help desk later without touching this code.

import {
  computeEstimate,
  formatEstimateRange,
  formatMoney,
  getService,
  getRegion,
  getScope,
  type Estimate,
} from '../../src/lib/quote';

// Read env without requiring @types/node in the editor.
const env: Record<string, string | undefined> =
  (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env ?? {};

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  country?: string;
  timeline?: string;
  budget?: string;
  message?: string;
}

interface QuotePayload {
  serviceId?: string;
  scopeId?: string;
  regionId?: string;
  additionalServiceIds?: string[];
  contact?: ContactPayload;
  recaptchaToken?: string;
}

const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const makeTicketRef = (): string => {
  const now = new Date();
  const ymd = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GHT-${ymd}-${rand}`;
};

const verifyRecaptcha = async (token: string | undefined): Promise<boolean> => {
  const secret = env.RECAPTCHA_SECRET;
  // If no secret is configured, skip verification (e.g. local dev) but warn.
  if (!secret) {
    console.warn('[submit-quote] RECAPTCHA_SECRET not set — skipping verification.');
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    const data = (await res.json()) as { success?: boolean; score?: number };
    if (!data.success) return false;
    // v3 returns a score; treat >= 0.5 as human.
    if (typeof data.score === 'number') return data.score >= 0.5;
    return true;
  } catch (err) {
    console.error('[submit-quote] reCAPTCHA verification failed:', err);
    return false;
  }
};

const estimateLine = (e: Estimate): string => {
  const usd =
    e.currency === 'USD'
      ? ''
      : ` (${formatMoney(e.minUsd, 'USD')} – ${formatMoney(e.maxUsd, 'USD')} USD)`;
  return `${e.serviceName}: ${formatEstimateRange(e)}${usd}`;
};

// Round down to ~2 significant figures so a soft "starting from" anchor reads
// like a clean ballpark (e.g. 31,460,000 -> 31,000,000; 12,100 -> 12,000).
const roundSoftDown = (n: number): number => {
  if (!Number.isFinite(n) || n <= 0) return 0;
  const magnitude = Math.pow(10, Math.floor(Math.log10(n)));
  const step = magnitude / 10;
  return Math.floor(n / step) * step;
};

// Soft, single-figure starting anchor in the customer's local currency.
const softFromText = (e: Estimate): string =>
  `from around ${formatMoney(roundSoftDown(e.minLocal), e.currency)}`;

// How pricing is presented to the CUSTOMER (the team email always keeps the
// full range internally):
//   'soft'  (default) — one gentle "starts around X" ballpark, framed as guidance
//   'exact'           — the full indicative range
//   'none'            — no pricing; a human follows up with a tailored quote
// Back-compat: QUOTE_SEND_ESTIMATE_TO_CUSTOMER=false forces 'none'.
type PricingMode = 'soft' | 'exact' | 'none';
const getCustomerPricingMode = (): PricingMode => {
  if (env.QUOTE_SEND_ESTIMATE_TO_CUSTOMER === 'false') return 'none';
  const m = (env.QUOTE_CUSTOMER_PRICING || 'soft').toLowerCase();
  return m === 'exact' || m === 'none' ? m : 'soft';
};

const buildSummary = (
  ref: string,
  payload: QuotePayload,
  primary: Estimate,
  additional: Estimate[]
): string => {
  const c = payload.contact ?? {};
  const region = getRegion(payload.regionId ?? '');
  const scope = getScope(getService(payload.serviceId ?? '')?.billing ?? 'project', payload.scopeId ?? '');

  const lines = [
    `New quote request — ${ref}`,
    '',
    '== Estimate (indicative, non-binding) ==',
    estimateLine(primary),
    ...additional.map((e) => `  + ${estimateLine(e)}`),
    '',
    '== Engagement ==',
    `Primary service: ${primary.serviceName}`,
    `Engagement size: ${scope?.label ?? payload.scopeId ?? '-'}`,
    `Region: ${region?.name ?? payload.regionId ?? '-'} (${primary.currency})`,
    '',
    '== Contact ==',
    `Name: ${c.name ?? '-'}`,
    `Email: ${c.email ?? '-'}`,
    `Company: ${c.company || '-'}`,
    `Phone: ${c.phone || '-'}`,
    `Country: ${c.country || '-'}`,
    `Timeline: ${c.timeline || '-'}`,
    `Budget: ${c.budget || '-'}`,
    '',
    '== Project details ==',
    c.message || '-',
  ];
  return lines.join('\n');
};

// ---------------------------------------------------------------------------
// HTML email rendering (branded, responsive, inline-styled for email clients).
// Plain text is always sent alongside as a fallback.
// ---------------------------------------------------------------------------

const BRAND = {
  brown: '#3B271F', // header banner background only (white text on top)
  yellow: '#FFC200',
  pageBg: '#f6f6f4',
  card: '#ffffff',
  footerBg: '#faf8f7',
  border: '#ece4e0',
  heading: '#5a4a42', // titles — softened from the near-black brand brown
  text: '#5f5048', // body copy — warm medium brown, easy on the eyes
  muted: '#8a7268', // labels / secondary text
};

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Convert plain text into HTML paragraphs (blank line = new paragraph,
// single newline = <br>). Input is escaped first.
const textToHtml = (s: string): string =>
  s
    .trim()
    .split(/\n{2,}/)
    .map(
      (para) =>
        `<p style="margin:0 0 16px;">${escapeHtml(para).replace(/\n/g, '<br>')}</p>`
    )
    .join('');

// Full HTML document wrapper with branded header/footer.
const renderEmailShell = (opts: {
  preheader: string;
  headerTag: string;
  contentHtml: string;
}): string => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
</head>
<body style="margin:0;padding:0;background:${BRAND.pageBg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.pageBg};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:${BRAND.card};border-radius:12px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
<tr><td style="background:${BRAND.brown};padding:22px 32px;">
<table role="presentation" width="100%"><tr>
<td style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.2px;">The Gahitwen <span style="color:${BRAND.yellow};">LLC</span></td>
<td align="right" style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#c8b2aa;">${escapeHtml(opts.headerTag)}</td>
</tr></table>
</td></tr>
<tr><td style="height:4px;background:${BRAND.yellow};font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:32px;color:${BRAND.text};font-size:15px;line-height:1.6;">${opts.contentHtml}</td></tr>
<tr><td style="padding:20px 32px;background:${BRAND.footerBg};border-top:1px solid ${BRAND.border};font-size:12px;color:${BRAND.muted};line-height:1.6;">
<strong style="color:${BRAND.heading};">The Gahitwen LLC</strong> · Software &amp; Cybersecurity<br>
<a href="mailto:info@gahitwen.com" style="color:${BRAND.muted};text-decoration:none;">info@gahitwen.com</a> &nbsp;·&nbsp; <a href="https://gahitwen.com" style="color:${BRAND.muted};text-decoration:none;">gahitwen.com</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

// A small pill showing the ticket reference.
const refBadge = (ref: string): string =>
  `<div style="display:inline-block;background:${BRAND.brown};color:#ffffff;font-size:12px;font-weight:600;letter-spacing:0.5px;padding:6px 12px;border-radius:999px;margin-bottom:20px;">Ref ${escapeHtml(
    ref
  )}</div>`;

// Render a definition-style table of label/value rows.
const kvTable = (rows: [string, string][]): string =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 8px;">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:7px 0;width:130px;vertical-align:top;color:${BRAND.muted};font-size:13px;">${escapeHtml(
          k
        )}</td><td style="padding:7px 0;vertical-align:top;color:${BRAND.text};font-size:14px;">${escapeHtml(
          v || '—'
        )}</td></tr>`
    )
    .join('')}</table>`;

const sectionHeading = (label: string): string =>
  `<h2 style="margin:28px 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:${BRAND.yellow};border-bottom:1px solid ${BRAND.border};padding-bottom:6px;">${escapeHtml(
    label
  )}</h2>`;

// Customer acknowledgement email (wraps the AI/template body).
const renderCustomerHtml = (opts: {
  ticketRef: string;
  bodyText: string;
}): string =>
  renderEmailShell({
    preheader: `Thanks for your request — your reference is ${opts.ticketRef}.`,
    headerTag: 'Quote Request',
    contentHtml: `${refBadge(opts.ticketRef)}${textToHtml(opts.bodyText)}`,
  });

// Internal team notification email with structured ticket data.
const renderTeamHtml = (opts: {
  ticketRef: string;
  primary: Estimate;
  additional: Estimate[];
  scopeLabel: string;
  regionName: string;
  contact: ContactPayload;
  suggestionsText: string | null;
}): string => {
  const c = opts.contact;
  const estimateRows: [string, string][] = [
    [opts.primary.serviceName, estimateLine(opts.primary).replace(`${opts.primary.serviceName}: `, '')],
    ...opts.additional.map(
      (e): [string, string] => [`+ ${e.serviceName}`, estimateLine(e).replace(`${e.serviceName}: `, '')]
    ),
  ];

  const messageHtml = `<div style="background:${BRAND.footerBg};border:1px solid ${BRAND.border};border-radius:8px;padding:14px 16px;font-size:14px;color:${BRAND.text};line-height:1.6;white-space:pre-wrap;">${escapeHtml(
    c.message || '—'
  )}</div>`;

  const suggestionsBlock = opts.suggestionsText
    ? `${sectionHeading('AI suggestions (internal — review before sending)')}<div style="background:#fffbeb;border:1px solid #ffe685;border-radius:8px;padding:14px 16px;font-size:14px;color:${BRAND.text};line-height:1.6;">${textToHtml(
        opts.suggestionsText
      )}</div>`
    : '';

  const content = `
${refBadge(opts.ticketRef)}
<h1 style="margin:0 0 4px;font-size:22px;color:${BRAND.heading};">New quote request</h1>
<p style="margin:0 0 8px;color:${BRAND.muted};font-size:14px;">A prospective client just submitted the form. Reply directly to reach them.</p>
${sectionHeading('Estimate (indicative, non-binding)')}
${kvTable(estimateRows)}
${sectionHeading('Engagement')}
${kvTable([
    ['Primary service', opts.primary.serviceName],
    ['Engagement size', opts.scopeLabel],
    ['Region', `${opts.regionName} (${opts.primary.currency})`],
  ])}
${sectionHeading('Contact')}
${kvTable([
    ['Name', c.name || '—'],
    ['Email', c.email || '—'],
    ['Company', c.company || '—'],
    ['Phone', c.phone || '—'],
    ['Country', c.country || '—'],
    ['Timeline', c.timeline || '—'],
    ['Budget', c.budget || '—'],
  ])}
${sectionHeading('Project details')}
${messageHtml}
${suggestionsBlock}`;

  return renderEmailShell({
    preheader: `${opts.primary.serviceName} · ${opts.scopeLabel} · ${opts.regionName}`,
    headerTag: 'Internal Ticket',
    contentHtml: content,
  });
};

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

// Send via Resend's HTTP API. Requires RESEND_API_KEY and QUOTE_FROM_EMAIL.
const sendViaResend = async (params: EmailParams): Promise<boolean> => {
  const apiKey = env.RESEND_API_KEY;
  const from = env.QUOTE_FROM_EMAIL;
  if (!apiKey || !from) return false;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: params.to,
        subject: params.subject,
        text: params.text,
        ...(params.html ? { html: params.html } : {}),
        ...(params.replyTo ? { reply_to: params.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error('[submit-quote] Resend error:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[submit-quote] Resend request failed:', err);
    return false;
  }
};

// Send via the Mailgun HTTP API. Requires MAILGUN_API_KEY, MAILGUN_DOMAIN, and
// QUOTE_FROM_EMAIL. Set MAILGUN_REGION=eu for EU-hosted Mailgun domains.
const sendViaMailgun = async (params: EmailParams): Promise<boolean> => {
  const apiKey = env.MAILGUN_API_KEY;
  const domain = env.MAILGUN_DOMAIN;
  const from = env.QUOTE_FROM_EMAIL;
  if (!apiKey || !domain || !from) return false;

  const base =
    env.MAILGUN_REGION === 'eu'
      ? 'https://api.eu.mailgun.net'
      : 'https://api.mailgun.net';

  const form = new URLSearchParams({
    from,
    to: params.to,
    subject: params.subject,
    text: params.text,
  });
  if (params.html) form.set('html', params.html);
  if (params.replyTo) form.set('h:Reply-To', params.replyTo);

  try {
    const res = await fetch(`${base}/v3/${domain}/messages`, {
      method: 'POST',
      headers: {
        // Mailgun uses HTTP Basic auth: username "api", password = API key.
        Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    });
    if (!res.ok) {
      console.error('[submit-quote] Mailgun error:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[submit-quote] Mailgun request failed:', err);
    return false;
  }
};

// Provider-agnostic sender: use Resend if configured, else Mailgun.
const sendEmail = async (params: EmailParams): Promise<boolean> => {
  if (env.RESEND_API_KEY) return sendViaResend(params);
  if (env.MAILGUN_API_KEY) return sendViaMailgun(params);
  return false;
};

// Default chain of free OpenRouter models, tried in order until one succeeds.
// Override (or reorder) via OPENROUTER_MODEL as a comma-separated list.
// NOTE: OpenRouter retires free models over time. Verify IDs are still live at
// https://openrouter.ai/api/v1/models (filter for ":free") if AI drafting stops
// working. Listing several gives resilience against per-model rate limits.
const DEFAULT_OPENROUTER_MODELS = [
  'openai/gpt-oss-120b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'google/gemma-4-31b-it:free',
];

// Single attempt against one model. Returns the email body, or null on any
// failure (HTTP error, rate limit, empty content) so the caller can try the
// next model in the chain.
const callOpenRouterModel = async (
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string | null> => {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://gahitwen.com',
        'X-Title': 'Gahitwen Quote Assistant',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 400,
      }),
    });
    if (!res.ok) {
      console.error(
        `[submit-quote] OpenRouter model "${model}" error:`,
        res.status,
        await res.text()
      );
      return null;
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    return content && content.length > 0 ? content : null;
  } catch (err) {
    console.error(`[submit-quote] OpenRouter model "${model}" failed:`, err);
    return null;
  }
};

// Resolve the model chain: OPENROUTER_MODEL (comma-separated) overrides the
// default free-model chain.
const getModelChain = (): string[] => {
  const models = (env.OPENROUTER_MODEL || '')
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean);
  return models.length > 0 ? models : DEFAULT_OPENROUTER_MODELS;
};

// Run a prompt through the model chain, returning the first non-empty result
// (or null if OpenRouter isn't configured / every model fails).
const runAiChain = async (
  systemPrompt: string,
  userPrompt: string
): Promise<string | null> => {
  const apiKey = env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.warn('[submit-quote] OPENROUTER_API_KEY not set — using template fallback.');
    return null;
  }
  const chain = getModelChain();
  console.log(`[submit-quote] OpenRouter: trying ${chain.length} model(s):`, chain.join(', '));
  for (const model of chain) {
    const body = await callOpenRouterModel(apiKey, model, systemPrompt, userPrompt);
    if (body) {
      console.log(`[submit-quote] OpenRouter: success with "${model}".`);
      return body;
    }
  }
  console.warn('[submit-quote] OpenRouter: all models failed — using template fallback.');
  return null;
};

// Draft the CUSTOMER reply with AI. Falls back to a template when null. We
// hard-constrain the model to ONLY use the provided estimate text and never
// invent prices.
const generateAiCustomerEmail = async (params: {
  contact: ContactPayload;
  ticketRef: string;
  serviceName: string;
  regionName: string;
  scopeLabel: string;
  pricingMode: PricingMode;
  estimateText: string | null; // null when pricing must be withheld
}): Promise<string | null> => {
  const c = params.contact;

  const systemPrompt =
    'You write concise, friendly B2B customer-service emails for The Gahitwen LLC, a software and cybersecurity firm. Never fabricate prices or commitments.';

  let pricingRule: string;
  if (params.pricingMode === 'exact' && params.estimateText) {
    pricingRule = `Mention this exact indicative estimate verbatim and call it non-binding: "${params.estimateText}". Make clear a tailored quote follows within 1–2 business days.`;
  } else if (params.pricingMode === 'soft' && params.estimateText) {
    pricingRule = `You may share ONE soft, ballpark starting figure exactly as written — "${params.estimateText}" — and frame it clearly as a rough starting point that depends on final scope, NOT a quote. Do not mention any other numbers, ranges, or an upper bound. Make clear a tailored quote follows within 1–2 business days.`;
  } else {
    pricingRule = `Do NOT mention any prices, rates, currencies, or numeric estimates. Say the team will review the full scope and send a tailored quote within 1–2 business days.`;
  }

  const userPrompt = [
    `Write the BODY of a short, warm, professional acknowledgement email to a prospective client who just requested a quote.`,
    ``,
    `Client name: ${c.name || 'there'}`,
    `Company: ${c.company || '(not provided)'}`,
    `Primary service requested: ${params.serviceName}`,
    `Region: ${params.regionName}`,
    `Engagement size: ${params.scopeLabel}`,
    `Desired timeline: ${c.timeline || '(not specified)'}`,
    `Their message: ${c.message || '(none)'}`,
    `Reference number (include it): ${params.ticketRef}`,
    ``,
    `Rules:`,
    `- ${pricingRule}`,
    `- Reference their stated needs briefly so it feels personal; do not invent facts.`,
    `- Keep it under 160 words. No subject line. Plain text only.`,
    `- Sign off exactly as:\n— The Gahitwen Team\ninfo@gahitwen.com`,
  ].join('\n');

  return runAiChain(systemPrompt, userPrompt);
};

// Draft INTERNAL triage notes for the TEAM email (a suggested reply + next
// steps). Returns null on failure; the team email always keeps the raw data.
const generateAiTeamSuggestions = async (params: {
  contact: ContactPayload;
  serviceName: string;
  scopeLabel: string;
  regionName: string;
  estimateLineText: string; // internal: may include USD
}): Promise<string | null> => {
  const c = params.contact;

  const systemPrompt =
    'You are an internal sales/solutions assistant for The Gahitwen LLC (software & cybersecurity). You help the team triage inbound quote requests quickly. Be concise and practical, and never commit to firm prices.';

  const userPrompt = [
    `A new quote request just arrived. Draft INTERNAL triage notes for our team (not sent to the client).`,
    ``,
    `Service: ${params.serviceName}`,
    `Engagement size: ${params.scopeLabel}`,
    `Region: ${params.regionName}`,
    `Indicative estimate (internal reference): ${params.estimateLineText}`,
    `Client name: ${c.name || '-'}`,
    `Company: ${c.company || '-'}`,
    `Timeline: ${c.timeline || '-'}`,
    `Budget: ${c.budget || '-'}`,
    `Message: ${c.message || '-'}`,
    ``,
    `Produce exactly two short plain-text sections:`,
    `1) "Suggested reply to client:" — a friendly draft under 120 words the team can edit and send.`,
    `2) "Recommended next steps:" — 3 to 5 bullet points: clarifying questions to ask, risks/flags, and suggested follow-up.`,
    `Do not invent facts or firm prices. No preamble.`,
  ].join('\n');

  return runAiChain(systemPrompt, userPrompt);
};

const postWebhook = async (ticket: unknown): Promise<boolean> => {
  const url = env.HELPDESK_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });
    return res.ok;
  } catch (err) {
    console.error('[submit-quote] Webhook post failed:', err);
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

  let payload: QuotePayload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const contact = payload.contact ?? {};

  // --- Validation ---
  if (!contact.name || !contact.name.trim()) {
    return json(400, { error: 'Name is required.' });
  }
  if (!contact.email || !EMAIL_RE.test(contact.email)) {
    return json(400, { error: 'A valid email is required.' });
  }
  if (!contact.message || !contact.message.trim()) {
    return json(400, { error: 'Project details are required.' });
  }
  if (!getService(payload.serviceId ?? '')) {
    return json(400, { error: 'Invalid service selected.' });
  }
  if (!getRegion(payload.regionId ?? '')) {
    return json(400, { error: 'Invalid region selected.' });
  }

  // --- reCAPTCHA ---
  const human = await verifyRecaptcha(payload.recaptchaToken);
  if (!human) {
    return json(403, { error: 'Verification failed. Please try again.' });
  }

  // --- Authoritative estimate (server-side, ignores any client figures) ---
  const primary = computeEstimate({
    serviceId: payload.serviceId!,
    scopeId: payload.scopeId ?? '',
    regionId: payload.regionId!,
  });
  if (!primary) {
    return json(400, { error: 'Could not compute an estimate for that selection.' });
  }

  const additionalIds = Array.isArray(payload.additionalServiceIds)
    ? payload.additionalServiceIds.slice(0, 10)
    : [];
  const additional = additionalIds
    .map((id) =>
      computeEstimate({
        serviceId: id,
        // Reuse the same scope id when valid for that service; falls back inside compute.
        scopeId: payload.scopeId ?? '',
        regionId: payload.regionId!,
      })
    )
    .filter((e): e is Estimate => e !== null);

  // --- Build the ticket ---
  const ticketRef = makeTicketRef();
  const summary = buildSummary(ticketRef, payload, primary, additional);

  const ticket = {
    ref: ticketRef,
    createdAt: new Date().toISOString(),
    type: 'quote_request',
    contact,
    selection: {
      serviceId: payload.serviceId,
      scopeId: payload.scopeId,
      regionId: payload.regionId,
      additionalServiceIds: additionalIds,
    },
    estimate: {
      primary,
      additional,
    },
    summary,
  };

  // How pricing is shown to the customer (soft ballpark by default). The team
  // email always carries the full internal estimate regardless of this setting.
  const pricingMode = getCustomerPricingMode();
  const customerEstimateText =
    pricingMode === 'exact'
      ? formatEstimateRange(primary)
      : pricingMode === 'soft'
        ? softFromText(primary)
        : null;

  const region = getRegion(payload.regionId ?? '');
  const scope = getScope(primary.billing, payload.scopeId ?? '');

  // Try AI-drafted reply first; fall back to a deterministic template.
  const aiBody = await generateAiCustomerEmail({
    contact,
    ticketRef,
    serviceName: primary.serviceName,
    regionName: region?.name ?? '-',
    scopeLabel: scope?.label ?? payload.scopeId ?? '-',
    pricingMode,
    estimateText: customerEstimateText,
  });

  let estimateBlock: string;
  if (pricingMode === 'exact' && customerEstimateText) {
    estimateBlock =
      `Indicative estimate: ${customerEstimateText}\n` +
      `This is a non-binding estimate. Our team will review the full scope of ` +
      `your project and follow up with a tailored quote within 1–2 business days.\n\n`;
  } else if (pricingMode === 'soft' && customerEstimateText) {
    estimateBlock =
      `As a rough starting point, projects like this typically begin ${customerEstimateText}. ` +
      `That's only a ballpark that varies with scope — not a quote. Our team will review ` +
      `the full scope of your project and follow up with a tailored quote within 1–2 business days.\n\n`;
  } else {
    estimateBlock =
      `Our team will review the full scope of your project and follow up with a ` +
      `tailored quote within 1–2 business days.\n\n`;
  }

  const customerBody =
    aiBody ??
    `Hi ${contact.name},\n\n` +
      `Thanks for reaching out to The Gahitwen LLC — we've received your quote request.\n\n` +
      `Your reference number is ${ticketRef}.\n\n` +
      estimateBlock +
      `— The Gahitwen Team\ninfo@gahitwen.com`;

  const customerHtml = renderCustomerHtml({ ticketRef, bodyText: customerBody });

  // Team email: raw structured data, optionally with an AI "suggested reply /
  // next steps" block appended (internal only). Toggle with
  // QUOTE_TEAM_AI_SUGGESTIONS=false. The raw summary is always preserved.
  let teamText = summary;
  let teamSuggestions: string | null = null;
  if (env.QUOTE_TEAM_AI_SUGGESTIONS !== 'false') {
    teamSuggestions = await generateAiTeamSuggestions({
      contact,
      serviceName: primary.serviceName,
      scopeLabel: scope?.label ?? payload.scopeId ?? '-',
      regionName: region?.name ?? '-',
      estimateLineText: estimateLine(primary),
    });
    if (teamSuggestions) {
      teamText =
        `${summary}\n\n` +
        `== AI suggestions (internal — review before sending) ==\n` +
        teamSuggestions;
    }
  }

  const teamHtml = renderTeamHtml({
    ticketRef,
    primary,
    additional,
    scopeLabel: scope?.label ?? payload.scopeId ?? '-',
    regionName: region?.name ?? '-',
    contact,
    suggestionsText: teamSuggestions,
  });

  // --- Deliver (best-effort across configured channels) ---
  const teamEmail = env.QUOTE_TEAM_EMAIL || env.QUOTE_FROM_EMAIL;
  const results = await Promise.all([
    teamEmail
      ? sendEmail({
          to: teamEmail,
          subject: `PENDING QUOTE — Action needed: ${primary.serviceName} (${ticketRef})`,
          text: teamText,
          html: teamHtml,
          replyTo: contact.email,
        })
      : Promise.resolve(false),
    sendEmail({
      to: contact.email!,
      subject: `We received your quote request (${ticketRef})`,
      text: customerBody,
      html: customerHtml,
    }),
    postWebhook(ticket),
  ]);

  const delivered = results.some(Boolean);
  if (!delivered) {
    console.warn(
      `[submit-quote] ${ticketRef} captured but no delivery channel is configured ` +
        `(set RESEND_API_KEY or MAILGUN_* + QUOTE_FROM_EMAIL, and/or HELPDESK_WEBHOOK_URL).`
    );
  }

  // NOTE: the estimate is intentionally NOT returned to the browser. Rates are
  // never exposed client-side — they are computed here and included only in the
  // email response after analyzing the full scope from the client's form.
  return json(200, {
    ok: true,
    ticketRef,
    delivered,
  });
};
