import CTASection from "../ui/CTASection";

const CallToAction = () => {
  return (
    <CTASection
      title={
        <>
          Small team. Production-grade complexity.{" "}
          <span className="accent text-yellow-400">Real users, right now.</span>
        </>
      }
      subtitle="We're not a studio that ships prototypes — every product we build is live, handling real transactions, for real people, today. Let's talk about what we can build for you."
    />
  );
};

export default CallToAction;
