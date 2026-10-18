import { motion } from "framer-motion";
import { ClipboardList, FileText, Rocket, ShieldCheck } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const steps = [
  {
    title: "Share your scope",
    body: "Tell us the service, engagement size and timeline through the quote form — or just talk to the team.",
    icon: ClipboardList,
  },
  {
    title: "Get a tailored quote",
    body: "We review the full scope of your project and follow up with a tailored quote within 1–2 business days.",
    icon: FileText,
  },
  {
    title: "Build & ship",
    body: "A small team designs and ships to production — the same rigor behind our own live products.",
    icon: Rocket,
  },
  {
    title: "Run & secure",
    body: "Cloud, DevOps and cybersecurity services keep what we built running and protected after launch.",
    icon: ShieldCheck,
  },
];

const Process = () => {
  return (
    <section className="border-y border-brown-900/10 bg-sand-100/70 px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="How we engage"
          title={
            <>
              From first message to <span className="accent">production</span>
            </>
          }
          subtitle="No bloated discovery phases. A clear path from your scope to software real users depend on."
          centered
        />

        <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-brown-900/10 bg-white p-7 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brown-950 text-yellow-400">
                  <step.icon size={20} />
                </span>
                <span className="font-mono text-sm text-brown-300">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-xl text-brown-950">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-brown-600">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
