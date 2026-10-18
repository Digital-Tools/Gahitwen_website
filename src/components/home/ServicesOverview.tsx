import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code,
  Cloud,
  Smartphone,
  BarChart3,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

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
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Services',
    description: 'Penetration testing, managed security (SOC/MSSP), cloud security, and incident response to keep your business protected.',
    icon: ShieldCheck,
  }
];

const ServicesOverview = () => {
  return (
    <section className="relative isolate overflow-hidden bg-brown-950 px-4 py-24 text-white sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-grid-dark mask-fade-radial" aria-hidden="true" />

      <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              dark
              eyebrow="What we do"
              title={
                <>
                  Everything it takes to <span className="accent text-yellow-400">ship and secure</span> software
                </>
              }
              subtitle="We provide comprehensive technology solutions to help businesses innovate and grow — from the first line of code to the incident at 3 a.m."
              className="!mb-8"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/services" variant="primary">
                View all services
                <ArrowRight size={16} />
              </Button>
              <Button to="/services#cybersecurity" variant="outlineOnDark">
                Cybersecurity
              </Button>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-white/10 border-y border-white/10 lg:col-span-7">
          {services.map((service, index) => (
            <motion.li
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <Link
                to={`/services#${service.id}`}
                className="group relative flex items-start gap-5 py-7 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 sm:gap-6 sm:py-8"
              >
                <span className="pt-1 font-mono text-xs text-white/30">0{index + 1}</span>
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-yellow-400 transition-colors duration-300 group-hover:border-yellow-500/40 group-hover:bg-yellow-500 group-hover:text-brown-950">
                  <service.icon size={22} />
                </span>
                <span className="flex-1">
                  <span className="block text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                    {service.name}
                  </span>
                  <span className="mt-2 block leading-relaxed text-white/55">{service.description}</span>
                </span>
                <ArrowUpRight
                  size={20}
                  className="mt-1 hidden flex-shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-yellow-400 sm:block"
                />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServicesOverview;
