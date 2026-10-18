import Marquee from "../ui/Marquee";
import NumberTicker from "../ui/NumberTicker";
import { clientSystems } from "../../lib/systems";

// One entry per client, in first-seen order.
const clients = clientSystems
  .map((system) => system.client)
  .filter((client, index, all) => all.findIndex((c) => c.name === client.name) === index);

const stats = [
  { value: 5, suffix: "", label: "Live products in production" },
  { value: 3, suffix: "", label: "Countries with active logistics customers" },
  { value: 10, suffix: "", label: "Client & capability systems shipped" },
  { value: 63000, prefix: "~", suffix: "", label: "Documents indexed by DataOps Drive" },
];

const LogoCloud = () => {
  return (
    <section className="px-4 pt-24 pb-8 sm:px-6 md:pt-32 lg:px-8">
      <div className="container mx-auto">
        <p className="text-center font-mono text-xs uppercase tracking-[0.16em] text-brown-500">
          Systems built for teams at
        </p>

        <Marquee className="mt-8" duration={30}>
          {[...clients, ...clients].map((client, index) => (
            <a
              key={`${client.name}-${index}`}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <img
                src={client.logo}
                alt=""
                className="h-9 w-auto max-w-[120px] object-contain"
                loading="lazy"
              />
              <span className="whitespace-nowrap text-lg font-semibold tracking-tight text-brown-900">
                {client.name}
              </span>
            </a>
          ))}
        </Marquee>

        <dl className="mt-20 grid grid-cols-2 overflow-hidden rounded-3xl border border-brown-900/10 bg-white/60 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse p-5 sm:p-8 ${index % 2 === 1 ? "border-l border-brown-900/10" : ""} ${
                index > 1 ? "border-t border-brown-900/10 lg:border-t-0" : ""
              } ${index === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="mt-2 text-sm leading-snug text-brown-600">{stat.label}</dt>
              <dd className="text-3xl font-semibold tracking-[-0.04em] text-brown-950 sm:text-5xl">
                <NumberTicker value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default LogoCloud;
