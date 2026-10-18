import { ArrowRight } from "lucide-react";
import Seo from "../components/ui/Seo";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import CTASection from "../components/ui/CTASection";
import SystemsGrid from "../components/systems/SystemsGrid";
import CapabilitySystemsGrid from "../components/systems/CapabilitySystemsGrid";

const Systems = () => {
  return (
    <>
      <Seo
        title="Systems"
        description="Production systems and AI capabilities we designed and shipped — from client platforms spanning sales, membership, operations and compliance to standalone AI and data systems."
        path="/systems"
        keywords={[
          "client systems",
          "custom software",
          "enterprise platform",
          "workflow software",
          "AI systems",
          "document AI",
          "The Gahitwen LLC",
        ]}
      />

      <PageHero
        eyebrow="What we build"
        title={
          <>
            Systems we've <span className="accent">built</span>
          </>
        }
        subtitle="Production platforms and AI systems we designed and shipped — from client platforms to standalone engineering builds."
      >
        <Button to="/quote" size="lg">
          Get a Quote
          <ArrowRight size={18} />
        </Button>
        <Button href="#capabilities" variant="outline" size="lg">
          AI & data systems
        </Button>
      </PageHero>

      {/* Client systems */}
      <section className="px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
        <div className="container mx-auto">
          <SectionHeading
            eyebrow="Client systems"
            title="Platforms built for clients"
            subtitle="Production software we designed and shipped for our clients."
          />
          <SystemsGrid />
        </div>
      </section>

      {/* Capability systems */}
      <section
        id="capabilities"
        className="relative isolate scroll-mt-24 overflow-hidden bg-brown-950 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
      >
        <div className="absolute inset-0 -z-10 bg-grid-dark mask-fade-radial" aria-hidden="true" />
        <div className="container mx-auto">
          <SectionHeading
            dark
            eyebrow="Capability showcase"
            title={
              <>
                AI & data systems <span className="accent text-yellow-400">we've engineered</span>
              </>
            }
            subtitle="Standalone systems we've built to solve specific, technical problems."
          />
          <CapabilitySystemsGrid />
        </div>
      </section>

      <CTASection
        title={
          <>
            Have a system like this <span className="accent text-yellow-400">in mind?</span>
          </>
        }
        subtitle="These are systems we built for other teams. Tell us what you need and we'll design and ship it with the same rigor."
      />
    </>
  );
};

export default Systems;
