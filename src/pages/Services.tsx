import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import { motion } from 'framer-motion';
import {
  ArrowRight,
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
import Button from '../components/ui/Button';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import SpotlightCard from '../components/ui/SpotlightCard';
import CTASection from '../components/ui/CTASection';
import { organizationSchema, buildServicesSchema } from '../lib/structuredData';

const services = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description: 'We design and build custom software solutions tailored to your specific business needs. From web applications to enterprise systems, our team delivers scalable, maintainable code that drives your business forward.',
    icon: Code,
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Solutions',
    description: 'Optimize your infrastructure with our cloud expertise and DevOps practices. We help you migrate to the cloud, implement CI/CD pipelines, and ensure your systems are scalable, reliable, and secure.',
    icon: Cloud,
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Design & Integration',
    description: 'From concept to launch, we develop intuitive mobile applications that engage users and integrate seamlessly with your existing systems. Our cross-platform expertise ensures your app works flawlessly on all devices.',
    icon: Smartphone,
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & AI Consulting',
    description: 'Transform your data into actionable insights. Our data analytics and AI services help you identify patterns, predict trends, and make data-driven decisions that give your business a competitive edge.',
    icon: BarChart3,
  },
  {
    id: 'database-management',
    title: 'Database Management & Optimization',
    description: 'Ensure your data is structured, secure, and performing optimally. We design, implement, and optimize database solutions that scale with your business and provide reliable access to your critical information.',
    icon: Database,
  },
  {
    id: 'security-solutions',
    title: 'Security Solutions & Compliance',
    description: 'Protect your digital assets with our comprehensive security services. We help you identify vulnerabilities, implement robust security measures, and ensure compliance with relevant regulations and standards.',
    icon: ShieldCheck,
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
      
      <PageHero
        eyebrow="Services"
        title={
          <>
            Our <span className="accent">services</span>
          </>
        }
        subtitle="We provide comprehensive technology solutions to help businesses innovate, grow, and stay ahead of the competition."
      >
        <Button to="/quote" size="lg">
          Get a Quote
          <ArrowRight size={18} />
        </Button>
        <Button href="#cybersecurity" variant="outline" size="lg">
          <ShieldCheck size={18} />
          Cybersecurity
        </Button>
      </PageHero>

      <section className="px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                className="scroll-mt-28"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
              >
                <SpotlightCard className="flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brown-900/10 bg-sand-50 text-brown-800 transition-colors duration-300 group-hover/spot:border-yellow-500/50 group-hover/spot:bg-yellow-500 group-hover/spot:text-brown-950">
                      <service.icon size={22} />
                    </span>
                    <span className="font-mono text-xs text-brown-300">0{index + 1}</span>
                  </div>
                  <h2 className="mt-7 text-2xl text-brown-950">{service.title}</h2>
                  <p className="mt-3 flex-grow leading-relaxed text-brown-600">{service.description}</p>
                  {service.id === 'data-analytics' && (
                    <Link
                      to="/products/dataops-drive"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-yellow-800 hover:text-brown-950"
                    >
                      See DataOps Drive — private AI over your own archive →
                    </Link>
                  )}
                  <div className="mt-6 border-t border-brown-900/10 pt-5">
                    <Link
                      to={`/quote?service=${service.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brown-950"
                    >
                      Get a quote
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover/spot:translate-x-1" />
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cybersecurity"
        className="relative isolate scroll-mt-24 overflow-hidden bg-brown-950 px-4 py-24 text-white sm:px-6 md:py-32 lg:px-8"
      >
        <div className="absolute inset-0 -z-10 bg-grid-dark mask-fade-radial" aria-hidden="true" />
        <div className="container mx-auto">
          <SectionHeading
            dark
            centered
            eyebrow="Cybersecurity"
            title={
              <>
                Defend what <span className="accent text-yellow-400">you build</span>
              </>
            }
            subtitle="Comprehensive cybersecurity services to identify risks, defend against threats, and respond decisively when it matters most."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            {cybersecurityServices.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                className={`scroll-mt-24 ${index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
              >
                <SpotlightCard dark className="flex h-full flex-col p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-yellow-400">
                    <service.icon size={22} />
                  </span>
                  <h3 className="mt-7 text-2xl text-white">{service.title}</h3>
                  <p className="mt-3 flex-grow leading-relaxed text-white/55">{service.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/quote" size="lg">
              Get a Quote
              <ArrowRight size={18} />
            </Button>
            <Button to="/contact" size="lg" variant="outlineOnDark">
              Talk to a Security Expert
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title={
          <>
            Ready to transform <span className="accent text-yellow-400">your business?</span>
          </>
        }
        subtitle="Contact us today to discuss how our services can help you achieve your technology goals."
        secondary={{ label: 'Get in Touch', to: '/contact' }}
      />
    </>
  );
};

export default Services;
