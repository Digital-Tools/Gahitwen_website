import { motion } from "framer-motion";
import Seo from "../components/ui/Seo";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import SystemsGrid from "../components/systems/SystemsGrid";
import CapabilitySystemsGrid from "../components/systems/CapabilitySystemsGrid";

const Systems = () => {
  return (
    <>
      <Seo
        title="Systems"
        description="Production systems and AI capabilities we designed and shipped — from client platforms spanning sales, membership, operations and compliance to standalone AI and data systems."
        path="/systems"
        keywords={[
          "client systems",
          "custom software",
          "enterprise platform",
          "workflow software",
          "AI systems",
          "document AI",
          "The Gahitwen LLC",
        ]}
      />

      {/* Intro */}
      <section className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brown-900 to-brown-800 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="inline-block text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              What We Build
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Systems We've Built
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Production platforms and AI systems we designed and shipped — from
              client platforms to standalone engineering builds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client systems */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeading
            eyebrow="Client Systems"
            title="Platforms Built for Clients"
            subtitle="Production software we designed and shipped for our clients."
            centered
          />
          <SystemsGrid />
        </div>
      </section>

      {/* Capability systems */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <SectionHeading
            eyebrow="Capability Showcase"
            title="AI & Data Systems We've Engineered"
            subtitle="Standalone systems we've built to solve specific, technical problems."
            centered
          />
          <CapabilitySystemsGrid />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brown-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500 opacity-10 skew-x-12"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Have a system like this in mind?
            </h2>
            <p className="text-base text-gray-300 mb-6 leading-relaxed">
              These are systems we built for other teams. Tell us what you need
              and we'll design and ship it with the same rigor.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button to="/quote" variant="primary" size="md">
                Get a Quote
              </Button>
              <Button to="/contact" variant="outlineOnDark" size="md">
                Talk to the Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Systems;
