import Seo from '../components/ui/Seo';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import Linkedin from '../components/icons/Linkedin';
import Instagram from '../components/icons/Instagram';
import XIcon from '../components/icons/XIcon';
import { SOCIAL_LINKS } from '../lib/social';

const Contact = () => {
  return (
      <>
        <Seo
          title="Contact Us"
          description="Get in touch with The Gahitwen LLC. We're here to answer your questions and discuss how our technology solutions can help your business."
          path="/contact"
        />

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
              <SectionHeading
                  title="Contact Us"
                  subtitle="Have questions about our products or services? We're here to help. Reach out to us using the form below or through our contact information."
                  centered
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ContactForm />
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ContactInfo />

                <div className="mt-10 bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-brown-900 mb-2">Connect With Us</h3>
                  <p className="text-gray-600 mb-4">
                    Follow us for the latest news, product updates, and insights.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 hover:text-brown-900 transition-colors"
                    >
                      <Linkedin size={24} />
                      <span className="ml-2 font-medium">LinkedIn</span>
                    </a>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 hover:text-brown-900 transition-colors"
                    >
                      <Instagram size={24} />
                      <span className="ml-2 font-medium">Instagram</span>
                    </a>
                    <a
                      href={SOCIAL_LINKS.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 hover:text-brown-900 transition-colors"
                    >
                      <XIcon size={24} />
                      <span className="ml-2 font-medium">X</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Google Map */}
        <div className="h-96 w-full border-t">
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
      </>
  );
};

export default Contact;