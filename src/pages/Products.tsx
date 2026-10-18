import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/ui/Seo";
import { ArrowRight } from "lucide-react";
import ProductDetail from "../components/products/ProductDetail";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";

const products = [
  {
    id: "gahitwen-logistics",
    title: "Gahitwen Logistics",
    capability: "Real-time marketplace + trust & payments across borders",
    tagline: "Move Anything, Anytime.",
    summary:
      "A two-sided marketplace matching cargo owners with truckers across 7 vehicle classes — live in Cameroon, Chad and Tanzania, with escrow payments, real-time GPS tracking, and KYC-style driver verification.",
    pitch:
      "Freight matching looks simple until you have to make it safe. Gahitwen Logistics is a two-sided marketplace connecting cargo owners with truckers — across 7 vehicle classes, from a 0.2-tonne pikipiki to a 40-tonne semi-trailer — with active customers in Cameroon, Chad and Tanzania. Every driver and fleet owner goes through an admin-verification workflow before they can touch the platform. Every payment sits in escrow until delivery is confirmed. Every shipment is tracked in real time, end to end.",
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
  {
    id: "dataops-drive",
    title: "DataOps Drive",
    capability: "Private AI over your whole document archive",
    tagline: "Your documents. Your AI. One private archive.",
    summary:
      "Connects the ChatGPT, Claude or Grok your team already uses to every document you have ever filed — including scanned paper — on your own infrastructure.",
    pitch:
      "Most firms already pay for a frontier AI and still cannot find the file. DataOps Drive bridges the two: a small agent syncs the folders each laptop already works in, everything lands in your own private storage, and a single secure connector (MCP) lets ChatGPT, Claude or Grok read the archive as the signed-in person — and nobody else's files. Scanned paper is recognised into text, so the documents that block every other tool become searchable and citable. Already proven in production against an archive of ~63,000 documents at a tax advisory practice.",
    provesWeCanBuild: [
      "Private document infrastructure that runs on the client's own servers",
      "Secure, per-person AI connectors built on an open standard (MCP)",
      "Recognition that turns scanned paper into searchable, citable text",
      "Role- and department-scoped access, revocable at the source",
    ],
    salesLine:
      "Your AI is only as good as what it can see. DataOps Drive lets it see everything you have filed — without your documents leaving your infrastructure.",
    builtFor: "private document AI",
    icon: "database" as const,
    pageUrl: "/products/dataops-drive",
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
        description="Evidence of what we can build: real-time logistics, multi-agent AI, compliance-grade document pipelines, fintech and private document AI — all live, in production, built by a lean team."
        path="/products"
        keywords={[
          "engineering capabilities",
          "custom software",
          "AI pipeline",
          "logistics platform",
          "fintech",
          "two-sided marketplace",
          "RAG",
          "private document AI",
          "The Gahitwen LLC",
        ]}
      />

      <PageHero
        eyebrow="Built by a small team. Running at real scale."
        title={
          <>
            Built. Live. <span className="accent">Running.</span>
          </>
        }
        subtitle="Real customer experience starts here. Every product below is in production — and each one is proof of what we can build for you."
      >
        <Button to="/quote" size="lg">
          Get a Quote
          <ArrowRight size={18} />
        </Button>
        <Button to="/contact" variant="outline" size="lg">
          Talk to the Team
        </Button>
      </PageHero>

      {/* Product index */}
      <nav
        aria-label="Products on this page"
        className="sticky top-[4.75rem] z-30 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto">
          <div className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-brown-900/10 bg-white/80 p-1 shadow-card backdrop-blur-xl [scrollbar-width:none]">
            {products.map((product) => (
              <a
                key={product.id}
                href={`#${product.id}`}
                className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm text-brown-700 transition-colors hover:bg-sand-100 hover:text-brown-950"
              >
                {product.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="px-4 pt-10 pb-8 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {products.map((product, index) => (
            <ProductDetail key={product.id} index={index} {...product} />
          ))}
        </div>
      </section>

      <CTASection
        title={
          <>
            Small team. Production-grade complexity.{" "}
            <span className="accent text-yellow-400">Real users, right now.</span>
          </>
        }
        subtitle="We're not a studio that ships prototypes — every product above is live, handling real transactions, for real people, today. The same rigor we bring to client work."
      />
    </>
  );
};

export default Products;
