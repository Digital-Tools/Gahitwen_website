import { motion } from 'framer-motion';
import { 
  Code, 
  Cloud, 
  Smartphone, 
  BarChart3 
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    id: 'custom-software',
    name: 'Custom Software Development',
    description: 'Tailored software solutions designed to address your specific business challenges and opportunities.',
    icon: Code,
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps Solutions',
    description: 'Optimize your infrastructure with our cloud expertise and streamlined DevOps practices.',
    icon: Cloud,
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Design & Integration',
    description: 'Create seamless mobile experiences that connect with your existing systems and delight your users.',
    icon: Smartphone,
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics & AI Consulting',
    description: 'Harness the power of your data with advanced analytics and artificial intelligence solutions.',
    icon: BarChart3,
  }
];

const ServicesOverview = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <SectionHeading
          title="Our Services"
          subtitle="We provide comprehensive technology solutions to help businesses innovate and grow."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mt-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                  <service.icon size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brown-900 mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;