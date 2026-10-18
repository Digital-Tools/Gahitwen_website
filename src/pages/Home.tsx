import Seo from "../components/ui/Seo";
import Hero from "../components/home/Hero";
import LogoCloud from "../components/home/LogoCloud";
import ProductsOverview from "../components/home/ProductsOverview";
import ServicesOverview from "../components/home/ServicesOverview";
import ClientWork from "../components/home/ClientWork";
import Process from "../components/home/Process";
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
      <LogoCloud />
      <ProductsOverview />
      <ServicesOverview />
      <ClientWork />
      <Process />
      <CallToAction />
    </>
  );
};

export default Home;
