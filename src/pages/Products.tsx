import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/ui/Seo";
import { motion } from "framer-motion";
import ProductDetail from "../components/products/ProductDetail";
import Button from "../components/ui/Button";

const products = [
  {
    id: "gahitwen-logistics",
    title: "Gahitwen Logistics",
    capability: "Real-time marketplace + trust & payments at continental scale",
    tagline: "Move Anything, Anytime.",
    summary:
      "A two-sided marketplace matching cargo owners with truckers across 7 vehicle classes and 54+ countries — with escrow payments, real-time GPS tracking, and KYC-style driver verification.",
    pitch:
      "Freight matching looks simple until you have to make it safe. Gahitwen Logistics is a two-sided marketplace connecting cargo owners with truckers — across 7 vehicle classes, from a 0.2-tonne pikipiki to a 40-tonne semi-trailer — seeded across 54+ countries. Every driver and fleet owner goes through an admin-verification workflow before they can touch the platform. Every payment sits in escrow until delivery is confirmed. Every shipment is tracked in real time, end to end.",
    provesWeCanBuild: [
      "Two-sided marketplace matching logic, not a form with a database behind it",
      "Trust & verification pipelines (KYC-style approval workflows) for real-world operators",
      "Escrow-based payment flows that hold funds until a physical condition is met",
      "Real-time GPS tracking at fleet scale",
      "A standalone product site, tracking portal, and pricing infrastructure — not a landing page",
    ],
    salesLine:
      "If we can build the trust layer for people moving 40-tonne trucks across borders, we can build the trust layer for your platform.",
    builtFor: "two-sided marketplaces at scale",
    icon: "truck" as const,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.gahitwen.gahitwen_logistics",
    appStoreUrl:
      "https://apps.apple.com/us/app/gahitwen-a-logistics-partner/id6766394750",
  },
  {
    id: "lawcap",
    title: "LawCap",
    capability: "Multi-agent AI over unstructured, high-stakes documents",
    tagline: "Ask your documents anything. Get an answer you can cite.",
    summary:
      "Multi-agent AI that ingests complex legal PDFs, extracts structure, validates its own output, and answers questions with page-level citations — no hallucinations you can't verify.",
    pitch:
      'Legal documents are long, dense, and unforgiving of mistakes. LawCap runs a multi-agent AI pipeline that ingests complex legal PDFs, extracts structure — tables of contents, definitions, clause boundaries — and validates its own output before it\'s trusted (self-healing validation, not "hope the model got it right"). On top of that sits hybrid semantic + keyword search and a chat interface that answers questions with page-level citations and visual snippets pulled straight from the source document.',
    provesWeCanBuild: [
      "Multi-agent AI systems, not a single prompt wrapped in a chat UI",
      "Retrieval-augmented generation (RAG) done properly — with verifiable, page-level source citations",
      "Self-validating extraction pipelines for messy, unstructured, high-stakes documents",
      "Usage-based billing infrastructure (credit system, five pricing tiers, no subscription lock-in)",
    ],
    salesLine:
      "This is what 'AI-powered' should mean: not a chatbot bolted onto your product, but an agent pipeline that verifies its own work and shows its receipts.",
    builtFor: "verifiable AI over documents",
    icon: "scale" as const,
    websiteUrl: "https://lawcap.gahitwen.com",
  },
  {
    id: "risiti",
    title: "Risiti",
    capability: "Compliance-grade document AI for a real regulatory authority",
    tagline: "Every receipt, scanned, verified, and audit-ready.",
    summary:
      "AI receipt scanner built around Tanzania Revenue Authority compliance — auto-archives verified receipts to Google Drive so an audit that meant a shoebox of paper now means opening a folder.",
    pitch:
      "Risiti isn't a generic receipt scanner — it's built around Tanzania Revenue Authority (TRA) compliance. Every scanned receipt is matched against its official TRA verification link and auto-archived into dated Google Drive folders, so an audit that used to mean digging through a shoebox of paper now means opening a folder. AI extraction handles everything from crisp retail receipts to faded, handwritten ones.",
    provesWeCanBuild: [
      "AI/OCR pipelines tuned to a specific regulatory framework, not a one-size-fits-all scanner",
      "Systems designed around audit and compliance requirements from day one",
      "Secure, GDPR-aware cloud storage with real accounting/document-platform integrations",
      "Frictionless auth (Apple/Google Sign-In) without sacrificing security",
    ],
    salesLine:
      "We built AI that a tax authority's audit trail can rely on — that's a much higher bar than 'looks impressive in a demo.'",
    builtFor: "compliance-grade document AI",
    icon: "scan" as const,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.rifazsolutions.receipt_scanner&pcampaignid=web_share",
    appStoreUrl: "https://apps.apple.com/us/app/risiti-ai/id6746781946",
  },
  {
    id: "smart-taka",
    title: "Smart-Taka",
    capability: "B2B logistics for a fragmented, informal industry",
    tagline:
      "Turning informal waste collection into a coordinated supply chain.",
    summary:
      "Connects local waste aggregators directly with recycling plants — structured pickup orders, real-time visibility, and payment coordination for an industry that had no digital infrastructure.",
    pitch:
      "Smart-Taka connects local waste aggregators directly with recycling plants in Tanzania — an industry that runs almost entirely on informal, manual coordination. The platform lets aggregators place structured pickup orders, gives recycling plants visibility into what's coming and when, and handles the payment coordination in between. It's infrastructure for an industry that didn't have any.",
    provesWeCanBuild: [
      "Ordering and scheduling systems for industries with no existing digital process to copy",
      "B2B coordination platforms between fragmented, non-technical operators",
      "Digitizing a supply chain from the ground up — no legacy system to integrate with, because there wasn't one",
    ],
    salesLine:
      "We don't just build software for industries that are ready for it — we build the first version of digital infrastructure for industries that aren't, yet.",
    builtFor: "digitizing informal industries",
    icon: "recycle" as const,
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.gahitwen.smart_taka&pcampaignid=web_share",
    appStoreUrl: "https://apps.apple.com/us/app/smart-taka/id6739852151",
  },
  {
    id: "watheq",
    title: "Watheq",
    capability: "Peer-to-peer financial contracts with legal-adjacent trust",
    tagline: "Every informal loan deserves a paper trail.",
    summary:
      "Turns handshake loans into structured, trackable agreements — with virtual witnessing, real-time settlement tracking, 7+ currencies, and bank-grade biometric locking.",
    pitch:
      "Watheq turns handshake loans into structured, trackable agreements — with virtual witnessing (up to 3 witnesses can review and attest without installing the app), real-time settlement tracking, flexible terms (extensions, forgiveness), and support for 7+ currencies including TZS, USD, SAR, and AED. Bank-grade biometric locking (Face ID / Touch ID) protects every contract.",
    provesWeCanBuild: [
      "Consumer fintech with legal-weight features (witnessing, settlement audit trail)",
      "Multi-currency financial logic done right",
      "Frictionless flows for non-app-users (witnesses don't need to install anything)",
    ],
    salesLine:
      "Trust between two people, with the rigor of a financial institution — built by a team that ships fintech, not just fintech-flavored UI.",
    builtFor: "peer-to-peer fintech",
    icon: "handshake" as const,
    websiteUrl: "https://watheq.net/",
  },
];

const Products = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <>
      <Seo
        title="Products"
        description="Evidence of what we can build: real-time logistics, multi-agent AI, compliance-grade document pipelines, and fintech — all live, in production, built by a lean team."
        path="/products"
        keywords={[
          "engineering capabilities",
          "custom software",
          "AI pipeline",
          "logistics platform",
          "fintech",
          "two-sided marketplace",
          "RAG",
          "The Gahitwen LLC",
        ]}
      />

      {/* Intro */}
      <section className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brown-900 to-brown-800 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="inline-block text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Built by a small team. Running at real scale.
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Built. Live. Running.
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Real customer experience starts here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <ProductDetail {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brown-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500 opacity-10 skew-x-12"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Small team. Production-grade complexity. Real users, right now.
            </h2>
            <p className="text-base text-gray-300 mb-6 leading-relaxed">
              We're not a studio that ships prototypes — every product above is
              live, handling real transactions, for real people, today. The same
              rigor we bring to client work.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button to="/quote" variant="primary" size="md">
                Get a Quote
              </Button>
              <Button to="/contact" variant="outlineOnDark" size="md">
                Talk to the Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Products;
