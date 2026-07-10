const items = [
  "5 live products",
  "54+ countries",
  "App Store & Play",
];

const TrustStrip = () => {
  return (
    <section className="bg-white border-b border-brown-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-center text-sm sm:text-base text-brown-700 tracking-wide">
          {items.map((item, index) => (
            <span key={item}>
              {index > 0 && (
                <span className="mx-3 text-yellow-500" aria-hidden="true">
                  ·
                </span>
              )}
              {item}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default TrustStrip;
