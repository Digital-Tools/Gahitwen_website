import Seo from '../components/ui/Seo';
import Hero from '../components/home/Hero';
import ProductsOverview from '../components/home/ProductsOverview';
import ServicesOverview from '../components/home/ServicesOverview';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <>
      <Seo
        title="Enabling Smarter Tech Solutions"
        description="From cutting-edge software to logistics and waste-management apps, The Gahitwen LLC delivers innovative tech solutions."
        path="/"
      />
      
      <Hero />
      <ProductsOverview />
      <ServicesOverview />
      <CallToAction />
    </>
  );
};

export default Home;