import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import { motion } from 'framer-motion';
import { 
  Code, 
  Cloud, 
  Smartphone, 
  BarChart3,
  Database,
  ShieldCheck,
  Bug,
  Radar,
  ServerCog,
  Siren,
  Compass
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { organizationSchema, buildServicesSchema } from '../lib/structuredData';

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

const cybersecurityServices = [
  {
    id: 'penetration-testing',
    title: 'Penetration Testing',
    description:
      'We simulate real-world attacks on your systems, networks, and applications to uncover vulnerabilities before malicious actors do — giving you a clear picture of your true security posture.',
    icon: Bug,
  },
  {
    id: 'managed-security',
    title: 'Managed Security (SOC/MSSP)',
    description:
      "24/7 threat monitoring, detection, and response from a dedicated security operations center. We keep watch so your team doesn't have to.",
    icon: Radar,
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    description:
      'Protect your cloud infrastructure, workloads, and data across AWS, Azure, and Google Cloud with continuous security assessments, configuration reviews, and policy enforcement.',
    icon: ServerCog,
  },
  {
    id: 'incident-response',
    title: 'Incident Response',
    description:
      'When a breach occurs, every minute counts. Our rapid response team contains threats, minimizes damage, and gets your business back online — with a full post-incident analysis to prevent recurrence.',
    icon: Siren,
  },
  {
    id: 'security-consulting',
    title: 'Security Consulting',
    description:
      'Strategic guidance tailored to your business. From building a security roadmap to evaluating your current defenses, our experts help you make smarter decisions at every stage of your security journey.',
    icon: Compass,
  },
];

const servicesSchema = buildServicesSchema([...services, ...cybersecurityServices]);

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return (
    <>
      <Seo
        title="Services"
        description="Explore the technology and cybersecurity services offered by The Gahitwen LLC — custom software, cloud & DevOps, data & AI, penetration testing, managed security (SOC/MSSP), incident response, and security consulting."
        path="/services"
        keywords={[
          'cybersecurity services',
          'penetration testing',
          'managed security',
          'SOC',
          'MSSP',
          'cloud security',
          'incident response',
          'security consulting',
          'custom software development',
          'cloud and devops',
          'The Gahitwen LLC',
        ]}
        jsonLd={[organizationSchema, servicesSchema]}
      />
      
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
                  <Button to={`/quote?service=${service.id}`} variant="text" className="self-start">
                    Get a Quote →
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section
        id="cybersecurity"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brown-900 to-brown-800 text-white scroll-mt-24"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 font-semibold text-sm mb-6">
              <ShieldCheck size={16} />
              Cybersecurity
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Defend What You Build</h2>
            <p className="text-xl text-gray-300">
              Comprehensive cybersecurity services to identify risks, defend against
              threats, and respond decisively when it matters most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cybersecurityServices.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-full flex flex-col p-8 rounded-lg bg-brown-800/60 border border-brown-700 hover:border-yellow-500/60 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-6">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-300 flex-grow">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <Button to="/quote" size="lg">
              Get a Quote
            </Button>
            <Button
              to="/contact"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brown-900"
            >
              Talk to a Security Expert
            </Button>
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
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <Button to="/quote" size="lg">
                Get a Quote
              </Button>
              <Button to="/contact" size="lg" variant="outline">
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