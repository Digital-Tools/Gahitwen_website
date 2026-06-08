import { Helmet } from 'react-helmet-async';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | The Gahitwen LLC</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center">
        <div className="container mx-auto text-center max-w-xl">
          <p className="text-yellow-600 font-semibold text-lg mb-2">404</p>
          <h1 className="text-4xl font-bold text-brown-900 mb-4">Page not found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/" size="lg">Go Home</Button>
            <Button to="/contact" variant="outline" size="lg">Contact Us</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
