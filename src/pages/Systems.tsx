import { motion } from "framer-motion";
import Seo from "../components/ui/Seo";
import Button from "../components/ui/Button";
import SystemsGrid from "../components/systems/SystemsGrid";

const Systems = () => {
  return (
    <>
      <Seo
        title="Systems"
        description="A selection of production systems we designed and shipped for our clients — from sales and membership platforms to AI-powered operations, compliance and evaluation tools."
        path="/systems"
        keywords={[
          "client systems",
          "custom software",
          "enterprise platform",
          "workflow software",
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
              Selected Client Work
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Systems We've Built for Clients
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              A selection of production systems we designed and shipped — from
              sales and membership platforms to AI-powered operations,
              compliance and evaluation tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Systems grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <SystemsGrid />
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
