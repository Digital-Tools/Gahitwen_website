import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import ProductsOverview from '../components/home/ProductsOverview';
import ServicesOverview from '../components/home/ServicesOverview';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Gahitwen LLC – Enabling Smarter Tech Solutions</title>
        <meta name="description" content="From cutting-edge software to logistics and waste-management apps, Gahitwen LLC delivers innovative tech solutions." />
      </Helmet>
      
      <Hero />
      <ProductsOverview />
      <ServicesOverview />
      <CallToAction />
    </>
  );
};

export default Home;