import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import { clientSystems } from "../../lib/systems";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const SystemsGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {clientSystems.map((system) => (
        <motion.div key={system.id} variants={item}>
          <SpotlightCard className="flex h-full flex-col p-7">
            <div className="flex items-start justify-between gap-4">
              <a
                href={system.client.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${system.client.name}`}
                className="group/logo flex items-center gap-3"
              >
                <span className="flex h-12 min-w-12 max-w-[148px] items-center justify-center rounded-xl border border-brown-900/10 bg-white px-2">
                  <img
                    src={system.client.logo}
                    alt={`${system.client.name} logo`}
                    className="max-h-8 max-w-full object-contain"
                    loading="lazy"
                  />
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-brown-300 transition-colors group-hover/logo:text-brown-900"
                />
              </a>
            </div>

            <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brown-500">
              {system.client.name}
            </p>
            <h3 className="mt-1.5 text-xl text-brown-950">{system.title}</h3>
            <p className="mt-1 text-sm font-medium text-yellow-800">{system.capability}</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-brown-600 mb-6">
              {system.description}
            </p>

            <ul className="mt-auto space-y-2.5 border-t border-brown-900/10 pt-5">
              {system.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-brown-700">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-800">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SystemsGrid;
