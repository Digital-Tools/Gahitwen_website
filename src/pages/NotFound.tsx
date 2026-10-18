import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import PageHero from '../components/ui/PageHero';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | The Gahitwen LLC</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[70vh]">
        <PageHero
          eyebrow="404"
          title={
            <>
              Page <span className="accent">not found</span>
            </>
          }
          subtitle="The page you are looking for does not exist or may have been moved."
        >
          <Button to="/" size="lg">
            Go Home
            <ArrowRight size={18} />
          </Button>
          <Button to="/contact" variant="outline" size="lg">
            Contact Us
          </Button>
        </PageHero>
      </div>
    </>
  );
};

export default NotFound;
