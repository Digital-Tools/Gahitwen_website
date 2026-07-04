import { useMemo, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, Send, CheckCircle2, Copy } from 'lucide-react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import Button from '../ui/Button';
import {
  SERVICES,
  REGIONS,
  DEFAULT_REGION_ID,
  scopesForBilling,
  getService,
} from '../../lib/quote';
import { COUNTRIES, PRIORITY_COUNTRIES } from '../../lib/countries';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface SuccessPayload {
  ticketRef: string;
}

const inputClasses =
  'block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500';
const labelClasses = 'block text-sm font-medium text-gray-700 mb-1';

const QuoteFormInner = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formStartedAt = useRef(Date.now());
  const [searchParams] = useSearchParams();
  const presetService = searchParams.get('service') ?? '';

  const initialServiceId = useMemo(() => {
    if (presetService && getService(presetService)) return presetService;
    return SERVICES[0].id;
  }, [presetService]);

  const [serviceId, setServiceId] = useState(initialServiceId);
  const [scopeId, setScopeId] = useState('');
  const [regionId, setRegionId] = useState(DEFAULT_REGION_ID);
  const [additionalServiceIds, setAdditionalServiceIds] = useState<string[]>([]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    timeline: '',
    budget: '',
    message: '',
  });

  const [companyWebsite, setCompanyWebsite] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState<SuccessPayload | null>(null);
  const [copied, setCopied] = useState(false);

  const service = getService(serviceId);
  const scopes = useMemo(
    () => scopesForBilling(service?.billing ?? 'project'),
    [service?.billing]
  );

  // Derive the effective scope during render (no setState-in-effect): if the
  // user's chosen scope isn't valid for the current service's scope set
  // (e.g. they switched between a project and a retainer service), fall back to
  // a sensible default rather than mutating state.
  const activeScopeId = useMemo(
    () =>
      scopes.some((s) => s.id === scopeId)
        ? scopeId
        : scopes[1]?.id ?? scopes[0]?.id ?? '',
    [scopes, scopeId]
  );

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAdditional = (id: string) => {
    setAdditionalServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const copyRef = async () => {
    if (!success?.ticketRef) return;
    try {
      await navigator.clipboard.writeText(success.ticketRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!executeRecaptcha) {
      setErrorMsg('Please wait a moment for verification to complete, then try again.');
      return;
    }

    setSubmitState('submitting');

    try {
      const recaptchaToken = await executeRecaptcha('submit_quote');
      if (!recaptchaToken) {
        throw new Error('Verification failed. Please try again.');
      }

      const res = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          scopeId: activeScopeId,
          regionId,
          additionalServiceIds,
          contact,
          recaptchaToken,
          formStartedAt: formStartedAt.current,
          companyWebsite,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || 'Request failed. Please try again.');
      }

      setSuccess({
        ticketRef: data.ticketRef,
      });
      setSubmitState('success');
    } catch (err) {
      setSubmitState('idle');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email info@gahitwen.com.'
      );
    }
  };

  if (submitState === 'success' && success) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="text-2xl font-bold text-brown-900 mb-3">Quote request received</h2>
        <p className="text-gray-600 mb-6">
          Thank you! We&apos;ve emailed a confirmation with your reference number.
          Our team will review the full scope of your project and follow up with a
          tailored quote within 1–2 business days. Please keep your reference
          number for any follow-up.
        </p>
        <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 mb-6">
          <span className="text-sm text-gray-500">Reference</span>
          <span className="font-mono font-semibold text-brown-900">
            {success.ticketRef}
          </span>
          <button
            type="button"
            onClick={copyRef}
            className="text-brown-700 hover:text-brown-900"
            aria-label="Copy reference number"
          >
            <Copy size={16} />
          </button>
          {copied && <span className="text-xs text-green-600">Copied</span>}
        </div>
        <Button to="/" variant="outline">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
          {/* Service & scope */}
          <fieldset className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
            <legend className="text-lg font-bold text-brown-900 px-2">
              1. What do you need?
            </legend>

            <div className="space-y-5 mt-4">
              <div>
                <label htmlFor="service" className={labelClasses}>
                  Primary service
                </label>
                <select
                  id="service"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className={inputClasses}
                >
                  <optgroup label="Technology">
                    {SERVICES.filter((s) => s.category === 'technology').map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cybersecurity">
                    {SERVICES.filter((s) => s.category === 'cybersecurity').map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {service && (
                  <p className="text-sm text-gray-500 mt-1">{service.blurb}</p>
                )}
              </div>

              <div>
                <span className={labelClasses}>Engagement size</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scopes.map((s) => (
                    <label
                      key={s.id}
                      className={`cursor-pointer rounded-md border p-4 transition-colors ${
                        activeScopeId === s.id
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="scope"
                        value={s.id}
                        checked={activeScopeId === s.id}
                        onChange={() => setScopeId(s.id)}
                        className="sr-only"
                      />
                      <span className="block font-medium text-brown-900">
                        {s.label}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {s.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          {/* Region */}
          <fieldset className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
            <legend className="text-lg font-bold text-brown-900 px-2">
              2. Where are you located?
            </legend>
            <p className="text-sm text-gray-500 mt-2 mb-4">
              We tailor rates to your region and show estimates in your local currency.
            </p>
            <select
              id="region"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              className={inputClasses}
            >
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.currency})
                </option>
              ))}
            </select>
          </fieldset>

          {/* Additional services */}
          <fieldset className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
            <legend className="text-lg font-bold text-brown-900 px-2">
              3. Anything else? <span className="font-normal text-gray-400">(optional)</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {SERVICES.filter((s) => s.id !== serviceId).map((s) => (
                <label key={s.id} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={additionalServiceIds.includes(s.id)}
                    onChange={() => toggleAdditional(s.id)}
                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  {s.name}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Contact & details */}
          <fieldset className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
            <legend className="text-lg font-bold text-brown-900 px-2">
              4. Your details
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
              <div>
                <label htmlFor="name" className={labelClasses}>Name *</label>
                <input id="name" name="name" required value={contact.name} onChange={handleContactChange} className={inputClasses} />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>Email *</label>
                <input id="email" name="email" type="email" required value={contact.email} onChange={handleContactChange} className={inputClasses} />
              </div>
              <div>
                <label htmlFor="company" className={labelClasses}>Company</label>
                <input id="company" name="company" value={contact.company} onChange={handleContactChange} className={inputClasses} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>Phone</label>
                <input id="phone" name="phone" type="tel" value={contact.phone} onChange={handleContactChange} className={inputClasses} />
              </div>
              <div>
                <label htmlFor="country" className={labelClasses}>Country</label>
                <select id="country" name="country" value={contact.country} onChange={handleContactChange} className={inputClasses}>
                  <option value="">Select your country</option>
                  <optgroup label="Frequently selected">
                    {PRIORITY_COUNTRIES.map((c) => (
                      <option key={`p-${c}`} value={c}>{c}</option>
                    ))}
                  </optgroup>
                  <optgroup label="All countries">
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className={labelClasses}>Desired timeline</label>
                <select id="timeline" name="timeline" value={contact.timeline} onChange={handleContactChange} className={inputClasses}>
                  <option value="">No preference</option>
                  <option value="ASAP">ASAP / Urgent</option>
                  <option value="1-3 months">1–3 months</option>
                  <option value="3-6 months">3–6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="budget" className={labelClasses}>Budget (optional)</label>
                <input id="budget" name="budget" value={contact.budget} onChange={handleContactChange} placeholder="e.g. $10,000 or flexible" className={inputClasses} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClasses}>Project details *</label>
                <textarea id="message" name="message" required rows={5} value={contact.message} onChange={handleContactChange} placeholder="Tell us about your goals, scope, and any specific requirements." className={inputClasses} />
              </div>
            </div>

            {/* Honeypot — hidden from humans, often filled by bots */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="companyWebsite">Company website</label>
              <input
                id="companyWebsite"
                name="companyWebsite"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <Button type="submit" disabled={submitState === 'submitting'} className="w-full flex items-center justify-center">
                {submitState === 'submitting' ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" /> Sending request...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" /> Request My Quote
                  </>
                )}
              </Button>
            </div>

            {errorMsg && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {errorMsg}
              </div>
            )}
          </fieldset>

          <p className="text-sm text-gray-500 text-center">
            Our team reviews the full scope of your request and emails you a
            tailored estimate — no automated pricing is shown here.
          </p>
      </form>
    </div>
  );
};

const QuoteForm = () => (
  <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
    <QuoteFormInner />
  </GoogleReCaptchaProvider>
);

export default QuoteForm;
