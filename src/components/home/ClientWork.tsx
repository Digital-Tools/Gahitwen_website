import { ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import SystemsGrid from "../systems/SystemsGrid";

const ClientWork = () => {
  return (
    <section className="px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title={
              <>
                Private systems. <span className="accent">Real proof</span> of what we build.
              </>
            }
            eyebrow="Selected client work"
            subtitle="A selection of production systems we designed and shipped for our clients."
            className="!mb-0"
          />
          <Button to="/systems" variant="outline" className="self-start md:self-auto">
            View all systems
            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-12 md:mt-16">
          <SystemsGrid />
        </div>
      </div>
    </section>
  );
};

export default ClientWork;
