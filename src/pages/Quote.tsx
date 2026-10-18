import { useLocation } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import QuoteForm from '../components/quote/QuoteForm';
import { organizationSchema } from '../lib/structuredData';

const Quote = () => {
  const { search } = useLocation();

  return (
    <>
      <Seo
        title="Get a Quote"
        description="Request a tailored quote from The Gahitwen LLC for custom software, cloud & DevOps, data & AI, and cybersecurity services. We review your scope and follow up within 1–2 business days."
        path="/quote"
        keywords={[
          'get a quote',
          'software development quote',
          'cybersecurity quote',
          'international rates',
          'project estimate',
          'The Gahitwen LLC',
        ]}
        jsonLd={[organizationSchema]}
      />

      <PageHero
        eyebrow="Reply within 1–2 business days"
        title={
          <>
            Get a <span className="accent">quote</span>
          </>
        }
        subtitle="Tell us what you need. We'll review the full scope of your project and follow up with a tailored quote within 1–2 business days."
      />

      <section className="px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Remount when ?service= changes so the preset applies. */}
          <QuoteForm key={search} />
        </div>
      </section>
    </>
  );
};

export default Quote;
