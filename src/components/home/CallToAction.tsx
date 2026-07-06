import { motion } from "framer-motion";
import Button from "../ui/Button";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brown-900 text-white relative overflow-hidden">
      {/* Yellow accent shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500 opacity-10 skew-x-12"></div>

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
            <Button
              to="/contact"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brown-900"
            >
              Talk to the Team
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
