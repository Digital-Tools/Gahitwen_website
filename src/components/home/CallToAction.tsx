import { motion } from 'framer-motion';
import Button from '../ui/Button';

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
            Ready to transform your business with cutting-edge technology?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get in touch with our team to discuss how Gahitwen's solutions can help you achieve your goals.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button to="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
            <Button to="/products" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brown-900">
              Explore Products
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;