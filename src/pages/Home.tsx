import Seo from "../components/ui/Seo";
import Hero from "../components/home/Hero";
import TrustStrip from "../components/home/TrustStrip";
import ProductsOverview from "../components/home/ProductsOverview";
import ServicesOverview from "../components/home/ServicesOverview";
import ClientWork from "../components/home/ClientWork";
import CallToAction from "../components/home/CallToAction";
import { organizationSchema } from "../lib/structuredData";

const Home = () => {
  return (
    <>
      <Seo
        title="Enabling Smarter Tech Solutions"
        description="From cutting-edge software to logistics and waste-management apps, The Gahitwen LLC delivers innovative tech solutions and cybersecurity services."
        path="/"
        keywords={[
          "tech solutions",
          "custom software",
          "cybersecurity",
          "cloud security",
          "logistics software",
          "client software development",
          "custom enterprise systems",
          "The Gahitwen LLC",
        ]}
        jsonLd={organizationSchema}
      />

      <Hero />
      <TrustStrip />
      <ProductsOverview />
      <ClientWork />
      <ServicesOverview />
      <CallToAction />
    </>
  );
};

export default Home;
