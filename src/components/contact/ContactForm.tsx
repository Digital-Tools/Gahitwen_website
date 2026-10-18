import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, Loader2, ShieldAlert } from "lucide-react";
import TurnstileWidget from "../ui/TurnstileWidget";
import Button from "../ui/Button";
import emailjs from "emailjs-com";
import { trackEvent } from "../../lib/analytics";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: searchParams.get("subject") ?? "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setIsSubmitting(false);
      setSubmitError("Please complete the verification challenge");
      return;
    }

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          application: "The Gahitwen LLC",
          "cf-turnstile-response": turnstileToken,
        },
        import.meta.env.VITE_EMAILJS_USER_ID,
      )
      .then(() => {
        setIsSubmitting(false);
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

        // Reset Turnstile widget
        setTurnstileToken("");
        setTurnstileKey((prev) => prev + 1);
      })
      .catch((error: unknown) => {
        setIsSubmitting(false);
        setSubmitError("Failed to send message. Please try again later.");
        console.error("EmailJS Error:", error);
      });
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
          <option value="General Inquiry">General Inquiry</option>
          <option value="DataOps Drive pilot">DataOps Drive pilot</option>
          <option value="Product Information">Product Information</option>
          <option value="Service Request">Service Request</option>
          <option value="Partnership Opportunity">
            Partnership Opportunity
          </option>
          <option value="Other">Other</option>
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
