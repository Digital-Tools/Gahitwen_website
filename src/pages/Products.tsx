import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import ProductDetail from '../components/products/ProductDetail';

const products = [
  {
    id: 'risiti',
    title: 'Risiti',
    tagline: 'Scan, organize & archive receipts powered by Risiti AI.',
    description: 'Risiti transforms how businesses and individuals handle receipts. Our powerful AI scanning technology accurately extracts and categorizes information from any receipt, creating a searchable digital archive that integrates with your accounting software.',
    features: [
      'Instant receipt scanning with AI-powered data extraction',
      'Automatic categorization and organization',
      'Secure cloud storage with bank-level encryption',
      'Integration with major accounting platforms',
      'Expense reports and analytics',
    ],
    playStoreUrl: '#',
    appStoreUrl: '#',
  },
  {
    id: 'smart-taka',
    title: 'Smart-Taka',
    tagline: 'Revolutionizing waste management apps for aggregators & collectors.',
    description: 'Smart-Taka is a comprehensive waste management platform that connects waste producers, collectors, and processing facilities. Our suite of applications streamlines the entire waste management process, from collection scheduling to recycling verification.',
    features: [
      'Real-time waste collection tracking',
      'Route optimization for collectors',
      'Analytics dashboard for waste producers',
      'Digital payment processing',
      'Environmental impact reporting',
    ],
    playStoreUrl: '#',
    appStoreUrl: '#',
  },
  {
    id: 'gahitwen-logistics',
    title: 'Gahitwen Logistics',
    tagline: 'Connecting cargo owners and truckers of all sizes.',
    description: 'Gahitwen Logistics is a powerful platform that brings efficiency to the transportation industry. Our application connects cargo owners directly with truckers, eliminating middlemen and optimizing the logistics process through smart matching algorithms.',
    features: [
      'Real-time cargo tracking',
      'Smart matching of cargo to available carriers',
      'Secure digital documentation',
      'In-app communication tools',
      'Automated payment processing',
    ],
    playStoreUrl: '#',
    appStoreUrl: '#',
  },
  {
    id: 'gfleet',
    title: 'GFleet',
    tagline: 'Web dashboard for fleet owners monitor vehicles & integrate with Gahitwen.',
    description: 'GFleet provides fleet owners with a comprehensive web dashboard to monitor and manage their entire vehicle fleet. From maintenance scheduling to driver performance, GFleet delivers the insights needed to optimize operations and reduce costs.',
    features: [
      'Real-time vehicle tracking and monitoring',
      'Maintenance scheduling and alerts',
      'Driver performance analytics',
      'Fuel consumption optimization',
      'Seamless integration with Gahitwen Logistics',
    ],
    isWebApp: true,
    ctaUrl: 'https://gfleet.gahitwen.com',
  },
];

const Products = () => {
  return (
    <>
      <Helmet>
        <title>Products | The Gahitwen LLC</title>
        <meta name="description" content="Explore The Gahitwen LLC's innovative product suite including Risiti, Smart-Taka, Gahitwen Logistics, and GFleet." />
      </Helmet>
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title="Our Products"
              subtitle="Discover The Gahitwen LLC's innovative technology solutions designed to transform industries and improve efficiency."
              centered
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ProductDetail {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;