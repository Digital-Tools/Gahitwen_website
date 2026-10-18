import { Truck, Scale, ScanBarcode, Recycle, Handshake, Database, type LucideIcon } from "lucide-react";

// Short-form product catalogue shared by the header menu, home page and footer.
// The long-form pitch for each product lives on the Products page.
export type ProductSummary = {
  id: string;
  name: string;
  description: string;
  builtFor: string;
  platforms: string;
  icon: LucideIcon;
  to: string;
  externalUrl?: string;
};

export const productSummaries: ProductSummary[] = [
  {
    id: "gahitwen-logistics",
    name: "Gahitwen Logistics",
    description:
      "Two-sided marketplace connecting cargo owners & truckers in Cameroon, Chad and Tanzania.",
    builtFor: "Marketplaces at scale",
    platforms: "iOS · Android",
    icon: Truck,
    to: "/products#gahitwen-logistics",
    externalUrl: "https://logistics.gahitwen.com",
  },
  {
    id: "lawcap",
    name: "LawCap",
    description:
      "Multi-agent AI that reads legal documents and answers with verifiable citations.",
    builtFor: "Verifiable AI",
    platforms: "Web",
    icon: Scale,
    to: "/products#lawcap",
    externalUrl: "https://lawcap.gahitwen.com",
  },
  {
    id: "risiti",
    name: "Risiti",
    description:
      "Compliance-grade receipt scanner built around tax authority requirements.",
    builtFor: "Compliance AI",
    platforms: "iOS · Android",
    icon: ScanBarcode,
    to: "/products#risiti",
    externalUrl: "https://risiti.gahitwen.com",
  },
  {
    id: "smart-taka",
    name: "Smart-Taka",
    description:
      "B2B platform turning informal waste collection into a coordinated supply chain.",
    builtFor: "Informal industries",
    platforms: "iOS · Android",
    icon: Recycle,
    to: "/products#smart-taka",
    externalUrl: "https://smart-taka.gahitwen.com",
  },
  {
    id: "watheq",
    name: "Watheq",
    description:
      "Peer-to-peer loan contracts with legal witnessing and multi-currency support.",
    builtFor: "Peer-to-peer fintech",
    platforms: "Mobile",
    icon: Handshake,
    to: "/products#watheq",
    externalUrl: "https://watheq.net/",
  },
  {
    id: "dataops-drive",
    name: "DataOps Drive",
    description:
      "Private AI over your whole archive — ChatGPT, Claude or Grok reading every document you've filed, scans included.",
    builtFor: "Private document AI",
    platforms: "Your infrastructure",
    icon: Database,
    to: "/products/dataops-drive",
  },
];
