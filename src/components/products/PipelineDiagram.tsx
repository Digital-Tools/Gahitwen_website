import { motion } from "framer-motion";
import { Laptop, Server, Search, Plug, Sparkles } from "lucide-react";

const stages = [
  {
    title: "Capture",
    caption:
      "A small agent runs on each laptop and syncs the folders your team already works in. Nothing to migrate, nothing to change.",
    icon: Laptop,
  },
  {
    title: "Store",
    caption:
      "Files land in your own private storage, on your infrastructure, scoped by role and department.",
    icon: Server,
  },
  {
    title: "Index",
    caption:
      "Every folder is catalogued and kept current. Scanned paper is recognised into text, so it stops being invisible.",
    icon: Search,
  },
  {
    title: "Connect",
    caption:
      "One secure connector — open standard (MCP) — lets ChatGPT, Claude or Grok read the archive as the signed-in person, and no one else's files.",
    icon: Plug,
  },
  {
    title: "Act",
    caption:
      "Agents research, draft, review and act across your systems. This is the Agent Harness, priced separately.",
    icon: Sparkles,
  },
];

type PipelineDiagramProps = {
  caption?: string;
};

const PipelineDiagram = ({
  caption = "Five stages. Your team touches none of them.",
}: PipelineDiagramProps) => {
  return (
    <div>
      <div className="relative">
        {/* Connector — horizontal on desktop, vertical on mobile */}
        <div
          className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-yellow-500/20 via-yellow-500 to-yellow-500/20"
          aria-hidden="true"
        />
        <div
          className="lg:hidden absolute left-7 top-10 bottom-10 w-0.5 bg-gradient-to-b from-yellow-500/20 via-yellow-500 to-yellow-500/20"
          aria-hidden="true"
        />

        <ol className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
          {stages.map((stage, index) => (
            <motion.li
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
            >
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-brown-950 text-yellow-400 flex items-center justify-center flex-shrink-0 ring-8 ring-sand-50">
                <stage.icon size={24} />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-500 text-brown-900 text-xs font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <div className="lg:mt-5">
                <h3 className="text-lg font-semibold text-brown-900 mb-1">
                  {stage.title}
                </h3>
                <p className="text-sm text-brown-600 leading-relaxed">
                  {stage.caption}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      {caption && (
        <p className="text-center text-sm font-medium text-brown-700 mt-10">
          {caption}
        </p>
      )}
    </div>
  );
};

export default PipelineDiagram;
