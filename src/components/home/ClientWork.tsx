import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import SystemsGrid from "../systems/SystemsGrid";

const ClientWork = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <SectionHeading
          title="Private Systems. Real Proof of What We Build."
          eyebrow="Selected Client Work"
          subtitle="A selection of production systems we designed and shipped for our clients."
          centered
        />

        <SystemsGrid />

        <div className="mt-12 text-center">
          <Button to="/systems" variant="secondary">
            View All Systems
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClientWork;
