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
//        - Email via Mailgun (team notification + customer auto-reply)
//        - And/or a generic webhook (Zapier / Make / Chatwoot / HubSpot / etc.)
//   7. Return the reference to the client (never the rates).
//
// Email goes through Mailgun (set MAILGUN_*). Ticketing is pluggable: set
// HELPDESK_WEBHOOK_URL to forward every quote into a help desk later without
// touching this code.

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

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

// Send email via the Mailgun HTTP API.
// Requires MAILGUN_API_KEY, MAILGUN_DOMAIN, and QUOTE_FROM_EMAIL.
// Set MAILGUN_REGION=eu for EU-hosted Mailgun domains.
const sendEmail = async (params: EmailParams): Promise<boolean> => {
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

// Default chain of free OpenRouter models, tried in order until one succeeds.
// Override (or reorder) via OPENROUTER_MODEL as a comma-separated list.
const DEFAULT_OPENROUTER_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'deepseek/deepseek-chat-v3-0324:free',
  'google/gemini-2.0-flash-exp:free',
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
  if (!apiKey) return null;
  for (const model of getModelChain()) {
    const body = await callOpenRouterModel(apiKey, model, systemPrompt, userPrompt);
    if (body) return body;
  }
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
  estimateText: string | null; // null when pricing must be withheld
}): Promise<string | null> => {
  const c = params.contact;

  const systemPrompt =
    'You write concise, friendly B2B customer-service emails for The Gahitwen LLC, a software and cybersecurity firm. Never fabricate prices or commitments.';

  const pricingRule = params.estimateText
    ? `Mention this exact indicative estimate verbatim and call it non-binding: "${params.estimateText}". Make clear a tailored quote follows within 1–2 business days.`
    : `Do NOT mention any prices, rates, currencies, or numeric estimates. Say the team will review the full scope and send a tailored quote within 1–2 business days.`;

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

  // Human-intervention switch: when QUOTE_SEND_ESTIMATE_TO_CUSTOMER=false, the
  // customer only gets an acknowledgement and a person sends pricing manually
  // (the team email always includes the estimate either way). Defaults to
  // sending the indicative estimate to the customer.
  const sendEstimateToCustomer =
    env.QUOTE_SEND_ESTIMATE_TO_CUSTOMER !== 'false';
  const customerEstimateText = sendEstimateToCustomer
    ? formatEstimateRange(primary)
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
    estimateText: customerEstimateText,
  });

  const estimateBlock = customerEstimateText
    ? `Indicative estimate: ${customerEstimateText}\n` +
      `This is a non-binding estimate. Our team will review the full scope of ` +
      `your project and follow up with a tailored quote within 1–2 business days.\n\n`
    : `Our team will review the full scope of your project and follow up with a ` +
      `tailored quote within 1–2 business days.\n\n`;

  const customerBody =
    aiBody ??
    `Hi ${contact.name},\n\n` +
      `Thanks for reaching out to The Gahitwen LLC — we've received your quote request.\n\n` +
      `Your reference number is ${ticketRef}.\n\n` +
      estimateBlock +
      `— The Gahitwen Team\ninfo@gahitwen.com`;

  // Team email: raw structured data, optionally with an AI "suggested reply /
  // next steps" block appended (internal only). Toggle with
  // QUOTE_TEAM_AI_SUGGESTIONS=false. The raw summary is always preserved.
  let teamText = summary;
  if (env.QUOTE_TEAM_AI_SUGGESTIONS !== 'false') {
    const suggestions = await generateAiTeamSuggestions({
      contact,
      serviceName: primary.serviceName,
      scopeLabel: scope?.label ?? payload.scopeId ?? '-',
      regionName: region?.name ?? '-',
      estimateLineText: estimateLine(primary),
    });
    if (suggestions) {
      teamText =
        `${summary}\n\n` +
        `== AI suggestions (internal — review before sending) ==\n` +
        suggestions;
    }
  }

  // --- Deliver (best-effort across configured channels) ---
  const teamEmail = env.QUOTE_TEAM_EMAIL || env.QUOTE_FROM_EMAIL;
  const results = await Promise.all([
    teamEmail
      ? sendEmail({
          to: teamEmail,
          subject: `New quote request ${ticketRef} — ${primary.serviceName}`,
          text: teamText,
          replyTo: contact.email,
        })
      : Promise.resolve(false),
    sendEmail({
      to: contact.email!,
      subject: `We received your quote request (${ticketRef})`,
      text: customerBody,
    }),
    postWebhook(ticket),
  ]);

  const delivered = results.some(Boolean);
  if (!delivered) {
    console.warn(
      `[submit-quote] ${ticketRef} captured but no delivery channel is configured ` +
        `(set MAILGUN_API_KEY + MAILGUN_DOMAIN + QUOTE_FROM_EMAIL, and/or HELPDESK_WEBHOOK_URL).`
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
