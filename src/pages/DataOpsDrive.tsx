import { motion } from "framer-motion";
import {
  CheckCircle2,
  X,
  ChevronDown,
  ShieldCheck,
  Lock,
  ArrowRight,
} from "lucide-react";
import Seo from "../components/ui/Seo";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import PipelineDiagram from "../components/products/PipelineDiagram";
import Eyebrow from "../components/ui/Eyebrow";
import CTASection from "../components/ui/CTASection";
import { organizationSchema } from "../lib/structuredData";
import { trackEvent } from "../lib/analytics";

const PILOT = "/contact?subject=DataOps%20Drive%20pilot";

const trustStrip = [
  "~63,000 documents indexed",
  "Scans read into text",
  "ChatGPT · Claude · Grok",
  "Runs on your infrastructure",
];

const problems = [
  "Returns, objections, audits and correspondence are buried in folders you can only search by file name.",
  "A large share is scanned paper — invisible to every ordinary search tool.",
  "Analysts burn their time hunting files instead of advising clients.",
  "The obvious shortcut — uploading the archive to a public AI — leaks confidential data.",
  "Nothing is grounded: the same question each time gets an unverified answer.",
];

const shifts = [
  "Ask ChatGPT, Claude or Grok a question — it searches and reads your documents itself.",
  "It reads Word, Excel, PowerPoint, PDF, images — and scanned paper.",
  "It sees only what each person is already allowed to see; never another department's files.",
  "Every AI connection is a revocable grant an administrator can cut off at will.",
  "Answers come back with citations that open the exact source document.",
];

const capabilities: [string, string][] = [
  [
    "Private drive",
    "Your documents on your own infrastructure, with access by role and department.",
  ],
  [
    "Automatic ingestion",
    "Each laptop syncs its folders in the background. Nothing to migrate, nothing to change.",
  ],
  [
    "Living index",
    "Every folder is catalogued and kept current, so search is always fast and complete.",
  ],
  [
    "Search that finds it",
    "By name, owner, machine, folder and date — with duplicates collapsed.",
  ],
  [
    "AI connector",
    "ChatGPT, Claude and Grok read the archive as the signed-in person. No new app.",
  ],
  [
    "Scans, read",
    "Photographed and scanned documents are recognised into text — not handed back as a link.",
  ],
  [
    "Governance",
    "Roles, departments, access logs, and per-connection revocation.",
  ],
];

const whyUs = [
  "Inside the AI you already use — no new portal, no training curve, works on phone and desktop.",
  "Scans are first-class — the paper that blocks every other tool becomes searchable text.",
  "Permissions inherited, not re-invented — the AI reads exactly as the person, no more.",
  "You own it — runs on your servers; no per-query vendor tax as you grow.",
  "Open standard (MCP) — when the next AI app arrives, it plugs in with no rebuild.",
  "Automatic from your laptops — the archive builds itself; adoption costs your team nothing.",
];

const stats = [
  { value: "~63,000", label: "documents indexed and searchable" },
  { value: "~93%", label: "accuracy reading a scanned letter" },
  { value: "3 assistants", label: "one secure connector" },
  { value: "Revoked", label: "access cut at the source" },
];

const proofPoints = [
  "~63,000 documents indexed and searchable.",
  "A scanned paper letter was read back, in full, at ~93% accuracy — proof the paper is not a blocker.",
  "Live with ChatGPT, Claude and Grok through a single secure connector.",
  "Search answers in one request and downloads no files to find them — fast, and cheap at scale.",
  "Access is enforced at the source: removing a person ends their AI's access on the next call.",
];

const assistants = ["ChatGPT", "Claude", "Grok"];

type PricingOption = {
  id: string;
  name: string;
  price: string;
  unit: string;
  usd: string;
  note: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const pricing: PricingOption[] = [
  {
    id: "monthly",
    name: "DataOps Monthly",
    price: "TZS 2,900,000",
    unit: "/ month",
    usd: "~USD 1,074",
    note: "12-month minimum",
    features: [
      "Up to 15 users — start with 10",
      "Extra user: TZS 60,000 / month",
      "Setup, onboarding, training, infrastructure and support included",
      "Upgrades billed at the incremental difference only",
    ],
    cta: "Start monthly",
  },
  {
    id: "one-off",
    name: "DataOps One-off",
    price: "TZS 48,000,000",
    unit: "one-off",
    usd: "~USD 17,780",
    note: "You own it",
    features: [
      "Up to 15 users",
      "Extra user: TZS 700,000 one-off",
      "Instalments: 3 × 17M · 6 × 8.8M · 12 × 4.5M",
      "After: TZS 850,000 / month for infra + maintenance, or run it yourself",
    ],
    cta: "Get the proposal",
    featured: true,
  },
  {
    id: "harness",
    name: "Symbiote Agent Harness",
    price: "TZS 39,000,000",
    unit: "one-off add-on",
    usd: "~USD 14,440",
    note: "Perpetual, up to 25 users",
    features: [
      "Extra user: TZS 700,000 each",
      "Instalments: 3 × 14M · 6 × 7M · 12 × 3.7M",
      "Optional support: TZS 1,100,000 / month or TZS 12M / year",
      "AI usage metered, or bring your own key",
    ],
    cta: "Add the Harness",
  },
];

const included = [
  "Setup and deployment",
  "Data onboarding",
  "Staff training",
  "Infrastructure",
  "Support and updates",
];

const notIncluded = [
  "Your ChatGPT / Claude / Grok subscriptions",
  "Storage beyond the included tier",
  "Bespoke new integrations (quoted separately)",
];

const steps = [
  { title: "Selection", body: "You choose the option that fits — monthly or one-off." },
  {
    title: "Agreement",
    body: "First instalment (or 50%) on signing begins provisioning.",
  },
  {
    title: "Deployment",
    body: "We bring our prior work — harness, tax tools, connector — into your environment.",
  },
  {
    title: "Go-live",
    body: "Staff walkthrough and training; final payment on production delivery.",
  },
];

const faqs = [
  {
    q: "Does our data go to OpenAI or Anthropic?",
    a: "Documents are read only when the signed-in person asks a question that needs them, through a connector authenticated as that person. Access is per-person and can be revoked at any time, at the source.",
  },
  {
    q: "Do we need a new app?",
    a: "No. You keep using ChatGPT, Claude or Grok.",
  },
  {
    q: "What about our scanned paper?",
    a: "It is recognised into text, so it becomes searchable and citable instead of invisible.",
  },
  {
    q: "What if someone leaves?",
    a: "Their AI access ends on the next call — access is inherited from the person, not from a shared API key.",
  },
  {
    q: "Who owns it?",
    a: "On the one-off option, you do — you can run it yourself.",
  },
  {
    q: "Does it work on a phone?",
    a: "Yes — wherever the AI app works.",
  },
];

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DataOps Drive",
  description:
    "Private AI document archive: connect ChatGPT, Claude or Grok to every document your firm has filed, including scanned paper, on your own infrastructure.",
  brand: { "@type": "Brand", name: "The Gahitwen LLC" },
  category: "AI document search",
};

const DataOpsDrive = () => {
  const openWalkthrough = () => trackEvent("walkthrough_booked");
  const openProposal = () => trackEvent("proposal_request");

  return (
    <>
      <Seo
        title="DataOps Drive — AI search over your private document archive"
        description="Connect ChatGPT, Claude or Grok to every document your firm has filed — including scanned paper — privately, on your own infrastructure. ~63,000 documents already indexed."
        path="/products/dataops-drive"
        keywords={[
          "AI document search",
          "private document AI",
          "search scanned documents",
          "AI for tax and audit firms",
          "MCP connector",
          "secure AI document archive",
          "The Gahitwen LLC",
        ]}
        jsonLd={[organizationSchema, productSchema]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-36 pb-20 sm:px-6 md:pt-44 md:pb-28 lg:px-8">
        <div className="absolute inset-0 bg-grid mask-fade-radial" aria-hidden="true" />
        <div className="container relative mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            <Eyebrow className="mb-6">DataOps Drive</Eyebrow>
            <h1 className="text-4xl leading-[1.02] text-brown-950 sm:text-5xl md:text-7xl">
              Your documents. Your AI.{" "}
              <span className="accent text-brown-800">One private archive.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brown-700/80 sm:text-xl">
              Connect the ChatGPT, Claude or Grok your team already uses to
              everything you have ever filed — including the scanned paper.
            </p>
            <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Button to={PILOT} size="lg" onClick={openWalkthrough}>
                Book a walkthrough on your own archive
                <ArrowRight size={18} />
              </Button>
              <Button
                to={PILOT}
                size="lg"
                variant="outline"
                onClick={openProposal}
              >
                Get the proposal
              </Button>
            </div>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 overflow-hidden rounded-3xl border border-brown-900/10 bg-white/70 backdrop-blur md:grid-cols-4">
            {trustStrip.map((item, index) => (
              <div
                key={item}
                className={`flex items-center justify-center gap-2 px-4 py-5 text-center text-sm font-medium text-brown-800 ${
                  index % 2 === 1 ? "border-l border-brown-900/10" : ""
                } ${index > 1 ? "border-t border-brown-900/10 md:border-t-0" : ""} ${
                  index === 2 ? "md:border-l" : ""
                }`}
              >
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="The problem"
            title="The problem isn't the AI. It's that your AI cannot see your documents."
            subtitle="Your archive is decades of value, locked in a form no one can search."
            centered
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {problems.map((problem) => (
              <li
                key={problem}
                className="flex items-start gap-3 text-brown-600 leading-relaxed"
              >
                <X
                  size={18}
                  className="text-red-400 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The shift */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-sand-100/60 border-y border-brown-900/10">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="The shift"
            title="Your own AI, reading your own archive, safely."
            subtitle="We do not give you another app to learn. We connect the AI you already pay for."
            centered
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {shifts.map((shift) => (
              <li
                key={shift}
                className="flex items-start gap-3 text-brown-600 leading-relaxed"
              >
                <CheckCircle2
                  size={18}
                  className="text-yellow-500 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{shift}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <SectionHeading
            eyebrow="How it works"
            title="One pipeline, end to end."
            subtitle="From the laptops your team already uses to agents that act across your systems."
            centered
          />
          <PipelineDiagram />
        </div>
      </section>

      {/* What you get */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-sand-100/60 border-y border-brown-900/10">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="What you get"
            title="One system: your files, made answerable."
            centered
          />
          <div className="rounded-3xl border border-brown-900/10 bg-white shadow-card overflow-hidden">
            {capabilities.map(([capability, meaning], index) => (
              <div
                key={capability}
                className={`flex flex-col sm:flex-row gap-1 sm:gap-6 px-5 py-4 ${
                  index > 0 ? "border-t border-brown-900/10" : ""
                }`}
              >
                <span className="sm:w-56 flex-shrink-0 font-semibold text-brown-900">
                  {capability}
                </span>
                <span className="text-brown-600 leading-relaxed">{meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why only us */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Why only us"
            title="What you get from us that you cannot get anywhere else."
            subtitle="Not a feature list — a combination no off-the-shelf product offers."
            centered
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {whyUs.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-brown-700 leading-relaxed"
              >
                <CheckCircle2
                  size={18}
                  className="text-yellow-500 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      <section className="relative isolate overflow-hidden py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-brown-950 text-white">
        <div className="absolute inset-0 -z-10 bg-grid-dark mask-fade-radial" aria-hidden="true" />
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow dark className="mb-5">
              Proof
            </Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-5">
              It is not a concept. It already works.
            </h2>
            <p className="text-lg text-white/60">
              Built and running against a real archive at a tax advisory
              practice.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 text-center"
              >
                <p className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-yellow-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-white/70 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl mx-auto">
            {proofPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-white/65 leading-relaxed"
              >
                <CheckCircle2
                  size={18}
                  className="text-yellow-500 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="text-center text-sm text-brown-400 mt-10">
            No client is named. Proof is stated, not attributed.
          </p>
        </div>
      </section>

      {/* Works with */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Works with what you have"
            title="The AI you already pay for."
            centered
          />
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {assistants.map((assistant) => (
              <span
                key={assistant}
                className="px-5 py-2.5 rounded-full border border-brown-900/10 bg-white text-brown-900 font-semibold shadow-card"
              >
                {assistant}
              </span>
            ))}
          </div>
          <p className="text-brown-600 leading-relaxed">
            Built on MCP, the open connector standard — so the next assistant
            plugs in without a rebuild.
          </p>
          <p className="text-sm text-brown-700 font-medium mt-3">
            Your AI subscriptions stay yours.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-sand-100/60 border-y border-brown-900/10">
        <div className="container mx-auto">
          <SectionHeading
            eyebrow="Pricing"
            title="Published pricing. No surprises."
            subtitle="Two ways to run it, plus an optional agent layer priced separately."
            centered
          />

          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-700 font-semibold text-sm">
              <ShieldCheck size={16} />
              Pricing for Tanzania / East Africa
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {pricing.map((option) => (
              <Card
                key={option.id}
                className={`h-full flex flex-col ${
                  option.featured ? "ring-2 ring-yellow-500 shadow-glow" : ""
                }`}
              >
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-xl font-semibold text-brown-900">
                      {option.name}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-700 whitespace-nowrap">
                      {option.note}
                    </span>
                  </div>
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-brown-950 leading-none">
                    {option.price}
                  </p>
                  <p className="text-sm text-brown-500 mt-1">
                    {option.unit} · {option.usd}
                  </p>

                  <ul className="space-y-2 mt-5 mb-6">
                    {option.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-brown-600 flex items-start gap-2"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-yellow-500 mt-0.5 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      to={PILOT}
                      variant={option.featured ? "primary" : "outline"}
                      size="md"
                      className="w-full"
                      onClick={() =>
                        trackEvent("pricing_card_click", { option: option.id })
                      }
                    >
                      {option.cta}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-brown-950 text-white p-6 md:p-10 text-center">
            <p className="text-lg font-medium leading-relaxed max-w-3xl mx-auto">
              Take both: <span className="text-yellow-500">10% off</span> the
              combined one-off, or your{" "}
              <span className="text-yellow-500">first month free</span> with
              DataOps Monthly + Harness. Three-year price freeze on recurring
              fees. Founding-customer terms for the first practice to deploy.
            </p>
            <p className="text-sm text-brown-400 mt-4">
              Prices exclude VAT (18%). Full commercial terms are delivered with
              the proposal.
            </p>
          </div>
        </div>
      </section>

      {/* Included / not included */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Scope"
            title="What's included — and what isn't."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-brown-900/10 bg-white p-7 shadow-card">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-brown-900 mb-4">
                <CheckCircle2 size={20} className="text-yellow-500" />
                Included
              </h3>
              <ul className="space-y-2">
                {included.map((item) => (
                  <li key={item} className="text-brown-600 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-brown-900/10 bg-white p-7 shadow-card">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-brown-900 mb-4">
                <X size={20} className="text-brown-400" />
                Not included
              </h3>
              <ul className="space-y-2">
                {notIncluded.map((item) => (
                  <li key={item} className="text-brown-600 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How we get you live */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-sand-100/60 border-y border-brown-900/10">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Getting live"
            title="Four steps, no surprises."
            centered
          />
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="flex items-start gap-4 rounded-2xl border border-brown-900/10 bg-white p-6 shadow-card"
              >
                <span className="w-10 h-10 rounded-xl bg-brown-950 text-yellow-400 font-mono text-sm flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-brown-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-brown-600 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-center text-sm text-brown-700 font-medium mt-8">
            Future-proof: upgrades available at the incremental difference only.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Where the objections die."
            centered
          />
          <div className="divide-y divide-brown-900/10 border-y border-brown-900/10">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-medium tracking-tight text-brown-950">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className="text-yellow-600 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="text-brown-600 leading-relaxed mt-3 pr-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title={
          <>
            The archive is already there.{" "}
            <span className="accent text-yellow-400">Let it answer.</span>
          </>
        }
        subtitle="Send us 20 documents. We'll show you your own archive answering questions about them."
        primary={{ label: "Book a walkthrough on your own archive", to: PILOT, onClick: openWalkthrough }}
        secondary={{ label: "Get the proposal", to: PILOT, onClick: openProposal }}
        footnote={
          <>
            <Lock size={14} />
            Private by design — your documents stay on your infrastructure
          </>
        }
      />
    </>
  );
};

export default DataOpsDrive;
