import { NavLink } from "react-router-dom";
import Logo from "../ui/Logo";
import Linkedin from "../icons/Linkedin";
import Instagram from "../icons/Instagram";
import XIcon from "../icons/XIcon";
import SquareArrowOutUpRight from "../icons/SquareArrowOutUpRight.tsx";
import { SOCIAL_LINKS } from "../../lib/social";
import { productSummaries } from "../../lib/products";

const companyLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/systems", label: "Systems" },
  { to: "/services", label: "Services" },
  { to: "/services#cybersecurity", label: "Cybersecurity" },
  { to: "/quote", label: "Get a Quote" },
  { to: "/contact", label: "Contact" },
];

const legalLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
];

const socials = [
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: Instagram },
  { href: SOCIAL_LINKS.x, label: "X", Icon: XIcon },
];

const linkClass = "text-[0.9375rem] text-white/55 transition-colors hover:text-white";
const headingClass = "mb-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-yellow-500";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-brown-950 text-white">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Logo invert />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/55">
              Small team. Production-grade systems. Real users, right now.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-yellow-500/60 hover:text-yellow-500"
                >
                  <Icon size={18} />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className={headingClass}>Products</h3>
            <ul className="space-y-3">
              {productSummaries.map((product) => (
                <li key={product.id}>
                  {product.externalUrl ? (
                    <a
                      href={product.externalUrl}
                      className={`${linkClass} inline-flex items-center gap-1.5`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.name}
                      <SquareArrowOutUpRight size={12} className="opacity-60" />
                    </a>
                  ) : (
                    <NavLink to={product.to} className={linkClass}>
                      {product.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className={headingClass}>Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={linkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h3 className={headingClass}>Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={linkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/40">
              Some processing may use secure external servers. We never share
              personal data.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse-dot" aria-hidden="true" />
              All products live
            </span>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} The Gahitwen LLC. All rights reserved.</p>
          <p>131 Continental Dr Ste 305, Newark, DE 19713, USA</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="-mb-[0.22em] text-center text-[22vw] font-semibold leading-none tracking-[-0.07em] text-transparent bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text">
          Gahitwen
        </p>
      </div>
    </footer>
  );
};

export default Footer;
