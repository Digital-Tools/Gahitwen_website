export type ClientSystem = {
  id: string;
  title: string;
  client: { name: string; logo: string; website: string };
  capability: string;
  description: string;
  points: string[];
};

export const systems: ClientSystem[] = [
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
