import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "../ui/Button";
import { productSummaries } from "../../lib/products";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 pt-32 sm:px-6 md:pt-40 lg:px-8">
      {/* Backdrop: engineering grid */}
      <div className="absolute inset-0 bg-grid mask-fade-radial" aria-hidden="true" />

      <div className="container relative mx-auto">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div {...fadeUp(0)}>
            <Link
              to="/products/dataops-drive"
              className="group inline-flex items-center gap-2 rounded-full border border-brown-900/10 bg-white/80 py-1 pl-1 pr-3 text-sm text-brown-700 shadow-card backdrop-blur transition-colors hover:border-brown-900/20"
            >
              <span className="rounded-full bg-brown-950 px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-yellow-400">
                New
              </span>
              <span>
                DataOps Drive<span className="hidden sm:inline"> — private AI over your archive</span>
              </span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-8 text-[2.75rem] leading-[0.98] text-brown-950 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Enabling <span className="accent text-brown-800">smarter</span>
            <br className="hidden sm:block" /> tech solutions
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-brown-700/80 sm:text-xl"
          >
            Real systems. Real users. Real customer experience. We design, ship
            and secure production software — marketplaces, multi-agent AI,
            fintech and compliance platforms — that people rely on today.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button to="/quote" size="lg">
              Get a Quote
              <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            <Button to="/products" variant="outline" size="lg">
              Explore Our Products
            </Button>
          </motion.div>
        </div>

        {/* Production status board */}
        <motion.div
          initial={{ opacity: 0, y: 48, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          style={{ transformPerspective: 1400 }}
          className="relative mx-auto mt-16 max-w-5xl md:mt-20"
        >
          <div className="relative rounded-[1.75rem] border border-brown-900/10 bg-white/60 p-2 shadow-lift backdrop-blur-xl">
            <div className="overflow-hidden rounded-[1.25rem] border border-brown-900/10 bg-white">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-brown-900/10 bg-sand-50 px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-brown-900/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brown-900/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brown-900/15" />
                </div>
                <p className="font-mono text-xs text-brown-500">gahitwen / production</p>
                <span className="flex items-center gap-2 font-mono text-xs text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse-dot" aria-hidden="true" />
                  <span className="hidden sm:inline">All systems live</span>
                </span>
              </div>

              <div className="hidden grid-cols-12 gap-4 border-b border-brown-900/5 px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-wider text-brown-400 md:grid">
                <span className="col-span-4">Product</span>
                <span className="col-span-4">Built for</span>
                <span className="col-span-2">Runs on</span>
                <span className="col-span-2 text-right">Status</span>
              </div>

              <ul className="divide-y divide-brown-900/5 text-left">
                {productSummaries.map((product, index) => (
                  <motion.li
                    key={product.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.07, ease }}
                  >
                    <Link
                      to={product.to}
                      className="group grid grid-cols-12 items-center gap-4 px-5 py-3.5 transition-colors hover:bg-sand-50"
                    >
                      <span className="col-span-9 flex min-w-0 items-center gap-3 md:col-span-4">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-brown-900/10 bg-sand-50 text-brown-800 transition-colors group-hover:bg-yellow-500 group-hover:text-brown-950">
                          <product.icon size={16} />
                        </span>
                        <span className="truncate text-[0.9375rem] font-medium text-brown-950">
                          {product.name}
                        </span>
                      </span>
                      <span className="col-span-4 hidden truncate text-sm text-brown-600 md:block">
                        {product.builtFor}
                      </span>
                      <span className="col-span-2 hidden truncate font-mono text-xs text-brown-500 md:block">
                        {product.platforms}
                      </span>
                      <span className="col-span-3 flex items-center justify-end gap-2 md:col-span-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-0.5 font-mono text-[0.6875rem] font-medium text-green-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
                          Live
                        </span>
                        <ArrowUpRight
                          size={15}
                          className="hidden text-brown-300 transition-colors group-hover:text-brown-900 sm:block"
                        />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
