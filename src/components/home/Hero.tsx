import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white z-0"></div>
      <div className="absolute right-0 top-1/3 w-1/2 h-1/2 bg-yellow-100 rounded-full filter blur-3xl opacity-30 z-0"></div>
      <div className="absolute left-10 bottom-20 w-1/3 h-1/3 bg-brown-100 rounded-full filter blur-3xl opacity-30 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-brown-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Gahitwen LLC – Enabling Smarter Tech Solutions
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From cutting-edge software to logistics and waste-management apps.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button to="/products" size="lg">
              Explore Our Products
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;