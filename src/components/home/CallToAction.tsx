import { motion } from "framer-motion";
import Button from "../ui/Button";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brown-900 to-brown-800 text-white relative overflow-hidden">
      {/* Thin gold accent */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-yellow-500" aria-hidden="true" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Small team. Production-grade complexity. Real users, right now.
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're not a studio that ships prototypes — every product we build is
            live, handling real transactions, for real people, today. Let's talk
            about what we can build for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button to="/quote" variant="primary" size="lg">
              Get a Quote
            </Button>
            <Button to="/contact" variant="outlineOnDark" size="lg">
              Talk to the Team
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
