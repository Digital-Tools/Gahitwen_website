import { motion } from 'framer-motion';
import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

const Contact = () => {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with The Gahitwen LLC. We're here to answer your questions and discuss how our technology solutions can help your business."
        path="/contact"
      />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's <span className="accent">talk</span>
          </>
        }
        subtitle="Have questions about our products or services? We're here to help. Reach out using the form below or through our contact information."
      />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="container mx-auto grid grid-cols-1 gap-4 lg:grid-cols-12">
          <motion.div
            className="rounded-3xl border border-brown-900/10 bg-white p-6 shadow-card md:p-10 lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="text-2xl text-brown-950">Send us a message</h2>
            <p className="mt-2 mb-8 text-brown-600">Tell us a little about what you need.</p>
            <ContactForm />
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </section>

      {/* Interactive Google Map */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="h-96 overflow-hidden rounded-3xl border border-brown-900/10 shadow-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.8574238542926!2d-75.73542992346684!3d39.662737871537436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c703f3d191b7c9%3A0x4c1f0c5e5f8b6c0f!2s131%20Continental%20Dr%2C%20Newark%2C%20DE%2019713%2C%20USA!5e0!3m2!1sen!2sus!4v1699000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Gahitwen LLC Location - 131 Continental Dr Ste 305, Newark, DE 19713"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
