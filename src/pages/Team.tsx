import Seo from '../components/ui/Seo';
import { motion } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import CTASection from '../components/ui/CTASection';
import TeamMember from '../components/team/TeamMember';

const teamMembers = [
  {
    id: 1,
    name: 'Shamim Wasii',
    title: 'Chief Executive Officer',
    bio: '10+ years in logistics software with expertise in building scalable platforms for transportation and supply chain management.',
    imageUrl: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 2,
    name: 'Tatiana Wandar',
    title: 'Chief Operations Officer',
    bio: 'Expert in IoT & operations with a proven track record in optimizing business processes and implementing technological solutions.',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: '#',
  },
  {
    id: 3,
    name: 'Ridhiwan Mseya',
    title: 'Chief Technology Officer',
    bio: 'Architect of quantized AI pipelines with extensive experience in machine learning and software engineering leadership.',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 4,
    name: 'Sarah Chen',
    title: 'Head of Product Development',
    bio: 'Passionate about creating user-centric products with a background in UX design and product management.',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: '#',
  },
  {
    id: 5,
    name: 'Michael Oduor',
    title: 'Lead Software Architect',
    bio: 'Expert in designing scalable software systems with a focus on performance, security, and maintainability.',
    imageUrl: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: '#',
  },
  {
    id: 6,
    name: 'Elena Rodriguez',
    title: 'Data Science Director',
    bio: 'Leading our data science initiatives with expertise in big data analytics, machine learning, and AI implementation.',
    imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkedin: '#',
    twitter: '#',
  },
];

const Team = () => {
  return (
    <>
      <Seo
        title="Our Team"
        description="Meet the talented team behind The Gahitwen LLC's innovative technology solutions and services."
        path="/team"
      />
      
      <PageHero
        eyebrow="Team"
        title={
          <>
            Our <span className="accent">team</span>
          </>
        }
        subtitle="Meet the talented individuals who make The Gahitwen LLC's vision a reality. Our diverse team brings together expertise in technology, business, and product development."
      />

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TeamMember {...member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <CTASection
        title={
          <>
            Join <span className="accent text-yellow-400">our team</span>
          </>
        }
        subtitle="We're always looking for talented individuals to join our growing team. If you're passionate about technology and innovation, we'd love to hear from you."
        primary={{ label: 'View Open Positions', to: '/contact' }}
      />
    </>
  );
};

export default Team;