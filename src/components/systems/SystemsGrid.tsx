import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Card from "../ui/Card";
import { systems } from "../../lib/systems";

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

const SystemsGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {systems.map((system) => (
        <motion.div key={system.id} variants={item}>
          <Card className="h-full flex flex-col">
            <div className="p-6 flex flex-col flex-grow">
              <a
                href={system.client.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${system.client.name}`}
                className="inline-flex items-center h-12 w-fit mb-5"
              >
                <img
                  src={system.client.logo}
                  alt={`${system.client.name} logo`}
                  className="max-h-12 max-w-[160px] object-contain"
                  loading="lazy"
                />
              </a>

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brown-500 mb-1">
                {system.client.name}
              </p>
              <h3 className="text-xl font-bold text-brown-900 mb-2">
                {system.title}
              </h3>
              <span className="inline-block self-start bg-yellow-500/10 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                {system.capability}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {system.description}
              </p>

              <ul className="space-y-2 mt-auto">
                {system.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-yellow-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SystemsGrid;
