export type ClientSystem = {
  id: string;
  title: string;
  client: { name: string; logo: string; website: string };
  capability: string;
  description: string;
  points: string[];
};

export type CapabilitySystem = {
  id: string;
  title: string;
  category: string;
  capability: string;
  description: string;
  points: string[];
};

export const clientSystems: ClientSystem[] = [
  {
    id: "isamu-sales-portal",
    title: "Isamu Sales Portal",
    client: {
      name: "Isamu Trading Company",
      logo: "/clients/isamu.png",
      website: "https://isamu.co.tz",
    },
    capability: "Sales order & inventory management",
    description:
      "An internal sales portal for a manufacturer — salesmen raise orders and stock requests while admins manage products, materials and warehouses from one dashboard.",
    points: [
      "Sales orders, stock requests and approvals in one place",
      "Products, materials, warehouses and stock levels managed centrally",
      "Role-based admin, audit logging and inventory analysis built in",
    ],
  },
  {
    id: "setta-foundation-portal",
    title: "Setta Foundation Portal",
    client: {
      name: "SETTA Foundation",
      logo: "/clients/setta.png",
      website: "https://www.settafoundation.or.tz",
    },
    capability: "Membership & alumni platform",
    description:
      "A complete membership and alumni platform — a public foundation site plus a secure member portal, all managed from one admin console.",
    points: [
      "Public site and gated member portal with role-based approvals",
      "Events with RSVP and QR check-in, ID cards, jobs and mentorship",
      "Admin console for approvals, SMS/email campaigns and payments",
    ],
  },
  {
    id: "oasis-workflow",
    title: "Oasis Workflow",
    client: {
      name: "Oasis Group",
      logo: "/clients/oasis.png",
      website: "https://oasisgroup.co.tz",
    },
    capability: "AI-powered operations workflow",
    description:
      "An AI-assisted workflow platform that runs tasks, documents and approvals end to end — with document editing, invoicing and access control built in.",
    points: [
      "Task, document and approval workflows with full action logging",
      "AI for metadata extraction, document generation and prioritisation",
      "Built-in document editor, invoicing and role-based access control",
    ],
  },
  {
    id: "tra-stamp-reconciliation",
    title: "TRA Stamp Reconciliation",
    client: {
      name: "Oasis Group",
      logo: "/clients/oasis.png",
      website: "https://oasisgroup.co.tz",
    },
    capability: "Compliance reconciliation app",
    description:
      "A standalone desktop application that reconciles revenue stamps against recorded entries — turning a manual compliance chore into a fast, auditable process.",
    points: [
      "CSV import and automated reconciliation of stamp records",
      "Dashboards, daily logs and reports built for audit trails",
      "Shipped as a signed desktop installer with licensed activation",
    ],
  },
  {
    id: "coachee-evaluation",
    title: "Coachee Evaluation",
    client: {
      name: "Watch Out",
      logo: "/clients/watchout.png",
      website: "https://watchout.co.tz",
    },
    capability: "AI coaching evaluation & reporting",
    description:
      "A structured coaching-evaluation system that captures daily assessments, synthesises them with AI, and generates the client's branded PDF report automatically.",
    points: [
      "Structured daily evaluation grids with typed or voice comments",
      "AI synthesis into a clear three-paragraph recommendation",
      "Branded PDF reports that match the client's exact template",
    ],
  },
];

export const capabilitySystems: CapabilitySystem[] = [
  {
    id: "semantic-video-search",
    title: "Semantic Video Search",
    category: "Video Technology",
    capability: "Searchable video content & transcripts",
    description:
      "A video indexing and search system that makes large video libraries searchable beyond titles and tags — letting users find relevant videos by searching for words and phrases spoken within the recordings.",
    points: [
      "Indexes video metadata — titles, tags, descriptions and creation dates",
      "Makes spoken words and phrases searchable within video content",
      "Combines metadata and transcript indexing to improve video discovery",
    ],
  },
  {
    id: "drawing-metadata-extractor",
    title: "Drawing Metadata Extractor",
    category: "Engineering & Construction",
    capability: "AI-powered document data extraction",
    description:
      "A desktop document-processing system that extracts title-block information from architectural and engineering drawings in PDF and image formats, then populates a cloud database automatically.",
    points: [
      "Detects title blocks across drawings with different layouts, positions and orientations",
      "Extracts drawing metadata — titles, authors, scales, versions and dates",
      "Automatically transfers extracted information into a centralized cloud database",
    ],
  },
  {
    id: "destination-discovery-engine",
    title: "Destination Discovery Engine",
    category: "Travel Technology",
    capability: "Location-based travel discovery",
    description:
      "A destination discovery platform that helps travellers explore places worth visiting in any searched location — collecting and organising destination information from across the web into a mobile-friendly experience.",
    points: [
      "Discovers attractions and destinations associated with a searched location",
      "Aggregates destination names, addresses, images, headings and descriptions",
      "Delivers rich destination listings to help travellers find places to visit",
    ],
  },
  {
    id: "support-knowledge-extractor",
    title: "Support Knowledge Extractor",
    category: "Human Resource",
    capability: "AI-powered support knowledge management",
    description:
      "An intelligent knowledge-extraction system that turns millions of customer-support email threads into a structured FAQ knowledge base — helping support teams capture recurring questions and publish clear answers.",
    points: [
      "Processes large volumes of email conversations to identify frequent questions",
      "Extracts and consolidates recurring questions from back-and-forth threads",
      "Produces structured FAQ content ready for publication on the website",
    ],
  },
  {
    id: "medical-claims-automation",
    title: "Intelligent Medical Claims Automation",
    category: "Healthcare Technology",
    capability: "AI-powered healthcare revenue cycle automation",
    description:
      "An automated medical claims pipeline that connects patient screening, medical coding, claim creation and claim submission into one coordinated workflow — reducing manual processing across the revenue cycle.",
    points: [
      "Automates patient screening and eligibility-related workflow steps",
      "Integrates medical coding and claim generation into the pipeline",
      "Coordinates claim submission through an end-to-end automated workflow",
    ],
  },
];
