import { motion } from 'framer-motion';
import {
  ScanBarcodeIcon,
  Trash2Icon,
  TruckIcon,
  LocateFixedIcon
} from 'lucide-react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const products = [
  {
    id: 'risiti',
    name: 'Risiti',
    description: 'Scan, organize & archive receipts powered by Risiti AI.',
    icon: ScanBarcodeIcon,
    color: 'bg-purple-500',
  },
  {
    id: 'smart-taka',
    name: 'Smart-Taka',
    description: 'Revolutionizing waste management apps for aggregators & collectors.',
    icon: Trash2Icon,
    color: 'bg-green-500',
  },
  {
    id: 'gahitwen-logistics',
    name: 'Gahitwen Logistics',
    description: 'Connecting cargo owners and truckers of all sizes.',
    icon: TruckIcon,
    color: 'bg-orange-500',
  },
  {
    id: 'gfleet',
    name: 'GFleet',
    description: 'Web dashboard for fleet owners monitor vehicles & integrate with Gahitwen.',
    icon: LocateFixedIcon,
    color: 'bg-blue-500',
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ProductsOverview = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <SectionHeading
          title="Our Products"
          subtitle="Discover our innovative tech solutions designed to solve real-world problems."
          centered
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div className={`w-12 h-12 ${product.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                    <product.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brown-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                </div>
                <div className="px-6 pb-6">
                  <Button to={`/products#${product.id}`} variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Button to="/products" variant="secondary">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsOverview;