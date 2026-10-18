import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import { capabilitySystems } from "../../lib/systems";

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

const CapabilitySystemsGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {capabilitySystems.map((system, index) => (
        <motion.div key={system.id} variants={item}>
          <SpotlightCard dark className="flex h-full flex-col p-7">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-yellow-400">
                {system.category}
              </span>
              <span className="font-mono text-xs text-white/30">0{index + 1}</span>
            </div>
            <h3 className="mt-6 text-xl text-white">{system.title}</h3>
            <p className="mt-1 text-sm font-medium text-yellow-400/80">{system.capability}</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/55 mb-6">
              {system.description}
            </p>

            <ul className="mt-auto space-y-2.5 border-t border-white/10 pt-5">
              {system.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-white/70">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-400">
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

export default CapabilitySystemsGrid;
