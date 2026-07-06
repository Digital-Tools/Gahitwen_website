import { useState } from "react";
import {
  Truck,
  Scale,
  ScanBarcode,
  Recycle,
  Handshake,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Button from "../ui/Button";

type ProductDetailProps = {
  id: string;
  title: string;
  capability: string;
  tagline: string;
  summary: string;
  pitch: string;
  provesWeCanBuild: string[];
  salesLine: string;
  builtFor: string;
  icon: "truck" | "scale" | "scan" | "recycle" | "handshake";
  playStoreUrl?: string;
  appStoreUrl?: string;
  websiteUrl?: string;
};

const iconMap = {
  truck: Truck,
  scale: Scale,
  scan: ScanBarcode,
  recycle: Recycle,
  handshake: Handshake,
};

const iconColors = {
  truck: "bg-amber-500",
  scale: "bg-indigo-500",
  scan: "bg-purple-500",
  recycle: "bg-green-500",
  handshake: "bg-emerald-500",
};

const ProductDetail = ({
  id,
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
}: ProductDetailProps) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[icon];
  const iconColor = iconColors[icon];

  return (
    <div
      id={id}
      className="bg-white rounded-xl shadow-md border border-gray-100 h-full flex flex-col scroll-mt-32 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-5 flex flex-col flex-grow">
        {/* Icon + Title + Tagline */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`w-9 h-9 ${iconColor} rounded-lg flex items-center justify-center text-white flex-shrink-0`}
          >
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-brown-900 leading-tight">
              {title}
            </h3>
            <p className="text-yellow-600 font-medium text-sm mt-0.5">
              {tagline}
            </p>
          </div>
        </div>

        {/* Summary — always visible */}
        <p className="text-gray-600 text-sm leading-relaxed mb-3">{summary}</p>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm font-medium text-brown-700 hover:text-brown-900 transition-colors mb-3 self-start group"
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""} group-hover:translate-y-0.5`}
          />
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {pitch}
            </p>

            <h4 className="text-xs font-semibold text-brown-800 uppercase tracking-wide mb-2">
              Engineered for
            </h4>
            <ul className="space-y-1 mb-3">
              {provesWeCanBuild.map((point, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 flex items-start gap-2"
                >
                  <span className="text-yellow-500 mt-1 flex-shrink-0">▹</span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="border-l-2 border-yellow-500 pl-3">
              <p className="text-sm text-brown-700 italic leading-relaxed">
                "{salesLine}"
              </p>
            </div>
          </div>
        )}

        {/* CTA — pushed to bottom */}
        <div className="mt-auto pt-3">
          {playStoreUrl || appStoreUrl ? (
            <div className="flex items-center gap-2">
              {playStoreUrl && (
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="h-9"
                  />
                </a>
              )}
              {appStoreUrl && (
                <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                    alt="Download on the App Store"
                    className="h-7"
                  />
                </a>
              )}
            </div>
          ) : websiteUrl ? (
            <Button
              href={websiteUrl}
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5"
            >
              Visit Website <ExternalLink size={13} />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
