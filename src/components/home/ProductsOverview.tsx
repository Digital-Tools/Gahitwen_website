import { motion } from "framer-motion";
import { Truck, Scale, ScanBarcode, Recycle, Handshake } from "lucide-react";
import Card from "../ui/Card";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

const products = [
  {
    id: "gahitwen-logistics",
    name: "Gahitwen Logistics",
    description:
      "Two-sided marketplace connecting cargo owners & truckers across 54+ countries.",
    icon: Truck,
    color: "bg-amber-500",
    builtFor: "marketplaces at scale",
  },
  {
    id: "lawcap",
    name: "LawCap",
    description:
      "Multi-agent AI that reads legal documents and answers with verifiable citations.",
    icon: Scale,
    color: "bg-indigo-500",
    builtFor: "verifiable AI",
  },
  {
    id: "risiti",
    name: "Risiti",
    description:
      "Compliance-grade receipt scanner built around tax authority requirements.",
    icon: ScanBarcode,
    color: "bg-purple-500",
    builtFor: "compliance AI",
  },
  {
    id: "smart-taka",
    name: "Smart-Taka",
    description:
      "B2B platform turning informal waste collection into a coordinated supply chain.",
    icon: Recycle,
    color: "bg-green-500",
    builtFor: "informal industries",
  },
  {
    id: "watheq",
    name: "Watheq",
    description:
      "Peer-to-peer loan contracts with legal witnessing and multi-currency support.",
    icon: Handshake,
    color: "bg-emerald-500",
    builtFor: "peer-to-peer fintech",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ProductsOverview = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <SectionHeading
          title="What We've Shipped"
          subtitle="Live products, real users, meaningful complexity — built by a team you can actually talk to."
          centered
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div
                    className={`w-12 h-12 ${product.color} rounded-lg flex items-center justify-center text-white mb-4`}
                  >
                    <product.icon size={24} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-brown-900">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <span className="inline-block bg-yellow-500/10 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {product.builtFor}
                  </span>
                </div>
                <div className="px-6 pb-6">
                  <Button
                    to={`/products#${product.id}`}
                    variant="outline"
                    size="sm"
                  >
                    See how →
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button to="/products" variant="secondary">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsOverview;
