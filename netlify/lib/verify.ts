// Shared bot checks for the form-handling Netlify functions.
// Lives outside netlify/functions so Netlify doesn't deploy it as a function.

// Read env without requiring @types/node in the editor.
export const env: Record<string, string | undefined> =
  (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env ?? {};

export const isProduction =
  env.CONTEXT === 'production' || env.NODE_ENV === 'production';

export const verifyTurnstile = async (
  token: string | undefined,
  tag: string
): Promise<boolean> => {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (isProduction) {
      console.error(
        `[${tag}] TURNSTILE_SECRET_KEY not set in production — rejecting submission.`
      );
      return false;
    }
    console.warn(`[${tag}] TURNSTILE_SECRET_KEY not set — skipping verification.`);
    return true;
  }
  if (!token) return false;

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const data = (await res.json()) as {
      success?: boolean;
      hostname?: string;
      'error-codes'?: string[];
    };
    if (!data.success) {
      console.warn(`[${tag}] Turnstile rejected:`, data['error-codes']);
      return false;
    }
    if (
      data.hostname &&
      !data.hostname.endsWith('gahitwen.com') &&
      data.hostname !== 'localhost'
    ) {
      console.warn(`[${tag}] Turnstile hostname mismatch:`, data.hostname);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[${tag}] Turnstile verification failed:`, err);
    return false;
  }
};

const MIN_FORM_SECONDS = 4;

export const isTooFast = (formStartedAt: number | undefined): boolean => {
  if (!formStartedAt || !Number.isFinite(formStartedAt)) return true;
  const elapsedMs = Date.now() - formStartedAt;
  return elapsedMs < MIN_FORM_SECONDS * 1000;
};
