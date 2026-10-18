import { motion } from "framer-motion";
import {
  Truck,
  Scale,
  ScanBarcode,
  Recycle,
  Handshake,
  Database,
  ExternalLink,
  ArrowRight,
  Check,
} from "lucide-react";
import Button from "../ui/Button";

type ProductDetailProps = {
  id: string;
  index: number;
  title: string;
  capability: string;
  tagline: string;
  summary: string;
  pitch: string;
  provesWeCanBuild: string[];
  salesLine: string;
  builtFor: string;
  icon: "truck" | "scale" | "scan" | "recycle" | "handshake" | "database";
  playStoreUrl?: string;
  appStoreUrl?: string;
  websiteUrl?: string;
  pageUrl?: string;
};

const iconMap = {
  truck: Truck,
  scale: Scale,
  scan: ScanBarcode,
  recycle: Recycle,
  handshake: Handshake,
  database: Database,
};

// Case-study style row: identity + actions on the left, the full story on the right.
const ProductDetail = ({
  id,
  index,
  title,
  capability,
  tagline,
  summary,
  pitch,
  provesWeCanBuild,
  salesLine,
  builtFor,
  icon,
  playStoreUrl,
  appStoreUrl,
  websiteUrl,
  pageUrl,
}: ProductDetailProps) => {
  const Icon = iconMap[icon];

  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid scroll-mt-32 grid-cols-1 gap-10 border-t border-brown-900/10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16"
    >
      {/* Identity */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-40">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brown-950 text-yellow-400">
              <Icon size={22} />
            </span>
            <span className="font-mono text-xs text-brown-400">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h2 className="mt-6 text-3xl leading-[1.05] text-brown-950 sm:text-4xl">{title}</h2>
          <p className="accent mt-3 text-2xl leading-snug text-brown-700">{tagline}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-brown-900/10 bg-white px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-brown-600">
              {builtFor}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
              Live
            </span>
          </div>

          <div className="mt-8">
            {pageUrl ? (
              <Button to={pageUrl} variant="secondary">
                View product page <ArrowRight size={16} />
              </Button>
            ) : playStoreUrl || appStoreUrl ? (
              <div className="flex flex-wrap items-center gap-3">
                {playStoreUrl && (
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <img
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      alt="Get it on Google Play"
                      className="h-[3.25rem] -m-[0.4rem]"
                    />
                  </a>
                )}
                {appStoreUrl && (
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <img
                      src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                      alt="Download on the App Store"
                      className="h-10"
                    />
                  </a>
                )}
              </div>
            ) : websiteUrl ? (
              <Button href={websiteUrl} variant="secondary">
                Visit website <ExternalLink size={15} />
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="lg:col-span-7">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-yellow-800">
          {capability}
        </p>
        <p className="mt-4 text-xl leading-relaxed text-brown-950 sm:text-2xl sm:leading-relaxed tracking-[-0.015em]">
          {summary}
        </p>
        <p className="mt-6 leading-relaxed text-brown-600">{pitch}</p>

        <div className="mt-8 rounded-2xl border border-brown-900/10 bg-white p-6 shadow-card sm:p-7">
          <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-brown-500">
            Engineered for
          </h3>
          <ul className="mt-4 space-y-3">
            {provesWeCanBuild.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-brown-700">
                <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-800">
                  <Check size={11} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="mt-8 border-l-2 border-yellow-500 pl-5">
          <p className="accent text-xl leading-snug text-brown-800 sm:text-2xl">“{salesLine}”</p>
        </blockquote>
      </div>
    </motion.article>
  );
};

export default ProductDetail;
