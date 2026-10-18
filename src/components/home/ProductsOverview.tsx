import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Laptop, Server, Search, Plug, Sparkles } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import Button from "../ui/Button";
import { productSummaries, type ProductSummary } from "../../lib/products";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (index: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: index * 0.06, ease },
});

const pipeline = [
  { label: "Capture", icon: Laptop },
  { label: "Store", icon: Server },
  { label: "Index", icon: Search },
  { label: "Connect", icon: Plug },
  { label: "Act", icon: Sparkles },
];

// Decorative route network for the logistics card.
const RouteVisual = () => (
  <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true">
    <defs>
      <pattern id="route-dots" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.2" fill="rgb(59 39 31 / 0.14)" />
      </pattern>
      <linearGradient id="route-line" x1="0" x2="1">
        <stop offset="0" stopColor="#ffc200" stopOpacity="0.2" />
        <stop offset="0.5" stopColor="#ffc200" />
        <stop offset="1" stopColor="#ffc200" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <rect width="320" height="200" fill="url(#route-dots)" />
    <path
      id="route-path"
      d="M24 156 C 80 150, 92 70, 150 78 S 230 150, 296 44"
      fill="none"
      stroke="url(#route-line)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="6 8"
    >
      <animate attributeName="stroke-dashoffset" from="0" to="-56" dur="2.4s" repeatCount="indefinite" />
    </path>
    {[
      [24, 156],
      [150, 78],
      [296, 44],
    ].map(([cx, cy]) => (
      <g key={`${cx}-${cy}`}>
        <circle cx={cx} cy={cy} r="11" fill="#ffc200" fillOpacity="0.18" />
        <circle cx={cx} cy={cy} r="5" fill="#3b271f" />
      </g>
    ))}
    <circle r="6" fill="#ffc200" stroke="#3b271f" strokeWidth="2">
      <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
        <mpath href="#route-path" />
      </animateMotion>
    </circle>
  </svg>
);

const ProductCardBody = ({ product }: { product: ProductSummary }) => (
  <>
    <div className="flex items-center justify-between gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brown-900/10 bg-sand-50 text-brown-800 transition-colors duration-300 group-hover/spot:border-yellow-500/50 group-hover/spot:bg-yellow-500 group-hover/spot:text-brown-950">
        <product.icon size={20} />
      </span>
      <span className="rounded-full border border-brown-900/10 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-brown-500">
        {product.builtFor}
      </span>
    </div>
    <h3 className="mt-6 text-xl text-brown-950 sm:text-2xl">{product.name}</h3>
    <p className="mt-2 leading-relaxed text-brown-600">{product.description}</p>
    <Link
      to={product.to}
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brown-950 after:absolute after:inset-0 after:content-['']"
    >
      See how
      <ArrowRight size={15} className="transition-transform duration-300 group-hover/spot:translate-x-1" />
    </Link>
  </>
);

const ProductsOverview = () => {
  const [logistics, ...rest] = productSummaries.filter((p) => p.id !== "dataops-drive");
  const dataops = productSummaries.find((p) => p.id === "dataops-drive");

  return (
    <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Products"
            title={
              <>
                What we've <span className="accent">shipped</span>
              </>
            }
            subtitle="Live products, real users, meaningful complexity — built by a team you can actually talk to."
            className="!mb-0"
          />
          <Button to="/products" variant="outline" className="self-start md:self-auto">
            View all products
            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-6">
          {/* Feature card */}
          <motion.div {...reveal(0)} className="md:col-span-2 lg:col-span-4">
            <SpotlightCard className="grid h-full grid-cols-1 sm:grid-cols-5">
              <div className="flex flex-col p-7 sm:col-span-3 sm:p-8">
                <ProductCardBody product={logistics} />
              </div>
              <div className="relative min-h-[180px] border-t border-brown-900/10 bg-sand-50/60 sm:col-span-2 sm:border-l sm:border-t-0">
                <RouteVisual />
              </div>
            </SpotlightCard>
          </motion.div>

          {rest.map((product, index) => (
            <motion.div key={product.id} {...reveal(index + 1)} className="lg:col-span-2">
              <SpotlightCard className="flex h-full flex-col p-7 sm:p-8">
                <ProductCardBody product={product} />
              </SpotlightCard>
            </motion.div>
          ))}

          {/* DataOps Drive — dark feature */}
          {dataops && (
            <motion.div {...reveal(5)} className="md:col-span-2 lg:col-span-6">
              <SpotlightCard dark className="!bg-brown-950 grid grid-cols-1 gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:items-center">
                <div
                  className="absolute -right-24 -top-24 -z-20 h-72 w-72 rounded-full bg-yellow-500/25 blur-[90px]"
                  aria-hidden="true"
                />
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-yellow-400">
                    <dataops.icon size={13} />
                    {dataops.builtFor}
                  </span>
                  <h3 className="mt-6 text-2xl text-white sm:text-3xl">
                    {dataops.name}: <span className="accent text-yellow-400">your documents, your AI.</span>
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-white/60">{dataops.description}</p>
                  <Link
                    to={dataops.to}
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-white after:absolute after:inset-0 after:content-['']"
                  >
                    Explore DataOps Drive
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover/spot:translate-x-1" />
                  </Link>
                </div>

                <ol className="relative grid grid-cols-5 gap-2" aria-label="DataOps Drive pipeline">
                  <span
                    className="absolute left-[10%] right-[10%] top-6 h-px bg-gradient-to-r from-yellow-500/10 via-yellow-500/70 to-yellow-500/10"
                    aria-hidden="true"
                  />
                  {pipeline.map((stage, index) => (
                    <li key={stage.label} className="relative flex flex-col items-center gap-3 text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-brown-900 text-yellow-400 shadow-[0_0_0_6px_var(--color-brown-950)]">
                        <stage.icon size={20} />
                      </span>
                      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-white/50">
                        <span className="text-white/30">0{index + 1}</span>
                        <br />
                        {stage.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </SpotlightCard>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsOverview;
