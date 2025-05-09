import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Code, 
  Cloud, 
  Smartphone, 
  BarChart3,
  Database,
  ShieldCheck
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const services = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description: 'We design and build custom software solutions tailored to your specific business needs. From web applications to enterprise systems, our team delivers scalable, maintainable code that drives your business forward.',
    icon: Code,
    color: 'text-blue-500',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Solutions',
    description: 'Optimize your infrastructure with our cloud expertise and DevOps practices. We help you migrate to the cloud, implement CI/CD pipelines, and ensure your systems are scalable, reliable, and secure.',
    icon: Cloud,
    color: 'text-indigo-500',
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Design & Integration',
    description: 'From concept to launch, we develop intuitive mobile applications that engage users and integrate seamlessly with your existing systems. Our cross-platform expertise ensures your app works flawlessly on all devices.',
    icon: Smartphone,
    color: 'text-green-500',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & AI Consulting',
    description: 'Transform your data into actionable insights. Our data analytics and AI services help you identify patterns, predict trends, and make data-driven decisions that give your business a competitive edge.',
    icon: BarChart3,
    color: 'text-yellow-500',
  },
  {
    id: 'database-management',
    title: 'Database Management & Optimization',
    description: 'Ensure your data is structured, secure, and performing optimally. We design, implement, and optimize database solutions that scale with your business and provide reliable access to your critical information.',
    icon: Database,
    color: 'text-red-500',
  },
  {
    id: 'security-solutions',
    title: 'Security Solutions & Compliance',
    description: 'Protect your digital assets with our comprehensive security services. We help you identify vulnerabilities, implement robust security measures, and ensure compliance with relevant regulations and standards.',
    icon: ShieldCheck,
    color: 'text-purple-500',
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | The Gahitwen LLC</title>
        <meta name="description" content="Explore the comprehensive technology services offered by The Gahitwen LLC, from custom software development to data analytics and AI consulting." />
      </Helmet>
      
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brown-900 to-brown-800 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300">
              We provide comprehensive technology solutions to help businesses 
              innovate, grow, and stay ahead of the competition.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col p-8">
                  <div className={`${service.color} mb-6`}>
                    <service.icon size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-brown-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  <Button to="/contact" variant="text" className="self-start">
                    Learn More →
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-3xl">
              <h2 className="text-3xl font-bold text-brown-900 mb-4">Ready to transform your business?</h2>
              <p className="text-lg text-gray-600 mb-6 lg:mb-0">
                Contact us today to discuss how our services can help you achieve your technology goals.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button to="/contact" size="lg">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;