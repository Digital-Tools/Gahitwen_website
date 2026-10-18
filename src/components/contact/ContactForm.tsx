import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, Loader2, ShieldAlert } from "lucide-react";
import TurnstileWidget from "../ui/TurnstileWidget";
import Button from "../ui/Button";
import { trackEvent } from "../../lib/analytics";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

// Links elsewhere on the site preselect one of these via ?subject=.
const SUBJECTS = [
  "General Inquiry",
  "DataOps Drive pilot",
  "Product Information",
  "Service Request",
  "Security Consultation",
  "Partnership Opportunity",
  "Careers",
  "Other",
];

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const presetSubject = searchParams.get("subject") ?? "";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // Ignore unknown values so the select never holds a value it can't show.
    subject: SUBJECTS.includes(presetSubject) ? presetSubject : "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [formStartedAt] = useState(() => Date.now());

  const onVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setIsSubmitting(false);
      setSubmitError("Please complete the verification challenge");
      return;
    }

    try {
      // Sent via our function so the Turnstile token is verified server-side.
      const res = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
          formStartedAt,
          companyWebsite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data?.error || "Failed to send message. Please try again later.",
        );
      }

      setSubmitSuccess(true);
      if (formData.subject === "DataOps Drive pilot") {
        trackEvent("pilot_submitted");
      }
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later.",
      );
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
      // Tokens are single-use: reset Turnstile after every attempt
      setTurnstileToken("");
      setTurnstileKey((prev) => prev + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-brown-800"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full rounded-xl border border-brown-900/15 bg-white px-4 py-3 text-brown-950 placeholder:text-brown-400 transition-shadow focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-brown-800"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full rounded-xl border border-brown-900/15 bg-white px-4 py-3 text-brown-950 placeholder:text-brown-400 transition-shadow focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-medium text-brown-800"
        >
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="block w-full rounded-xl border border-brown-900/15 bg-white px-4 py-3 text-brown-950 placeholder:text-brown-400 transition-shadow focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20"
        >
          <option value="">Select a subject</option>
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-brown-800"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="block w-full rounded-xl border border-brown-900/15 bg-white px-4 py-3 text-brown-950 placeholder:text-brown-400 transition-shadow focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20"
        ></textarea>
      </div>

      {/* Honeypot — hidden from humans, often filled by bots */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
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

      {TURNSTILE_SITE_KEY ? (
        <TurnstileWidget
          resetKey={turnstileKey}
          sitekey={TURNSTILE_SITE_KEY}
          onVerify={onVerify}
          theme="light"
        />
      ) : (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm flex items-center gap-2">
          <ShieldAlert size={16} />
          Verification is not configured. Set VITE_TURNSTILE_SITE_KEY in your
          environment.
        </div>
      )}

      <div>
        <Button
          type="submit"
          disabled={isSubmitting || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
          className="w-full flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={20} />
              Send Message
            </>
          )}
        </Button>
      </div>

      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {submitError}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
