import { motion } from 'framer-motion';
import Seo from '../components/ui/Seo';
import QuoteForm from '../components/quote/QuoteForm';
import { organizationSchema } from '../lib/structuredData';

const Quote = () => {
  return (
    <>
      <Seo
        title="Get a Quote"
        description="Request a tailored quote from The Gahitwen LLC for custom software, cloud & DevOps, data & AI, and cybersecurity services. We review your scope and follow up within 1–2 business days."
        path="/quote"
        keywords={[
          'get a quote',
          'software development quote',
          'cybersecurity quote',
          'international rates',
          'project estimate',
          'The Gahitwen LLC',
        ]}
        jsonLd={[organizationSchema]}
      />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brown-900 to-brown-800 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get a Quote</h1>
            <p className="text-xl text-gray-300">
              Tell us what you need. We&apos;ll review the full scope of your project
              and follow up with a tailored quote within 1–2 business days.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <QuoteForm />
        </div>
      </section>
    </>
  );
};

export default Quote;
