import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { productSummaries } from "../../lib/products";

const navLinks = [
  { to: "/systems", label: "Systems" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setProductsOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape closes menus
  useEffect(() => {
    if (!isOpen && !productsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setProductsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, productsOpen]);

  const openProducts = () => {
    window.clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };

  const scheduleCloseProducts = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProductsOpen(false), 120);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const productsActive = location.pathname.startsWith("/products");

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3.5 py-1.5 text-[0.9375rem] transition-colors duration-200 ${
      isActive
        ? "bg-brown-900/[0.06] text-brown-950"
        : "text-brown-700 hover:text-brown-950 hover:bg-brown-900/[0.04]"
    }`;

  const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between border-b border-brown-900/10 py-4 text-2xl tracking-tight ${
      isActive ? "text-brown-950" : "text-brown-700"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pl-4 pr-2 transition-all duration-300 sm:pl-5 ${
          scrolled || isOpen
            ? "border-brown-900/10 bg-white/75 shadow-card backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <NavLink to="/" onClick={closeMenu} aria-label="The Gahitwen LLC — home">
          <Logo />
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <div
            className="relative"
            onPointerEnter={openProducts}
            onPointerLeave={scheduleCloseProducts}
          >
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              aria-expanded={productsOpen}
              aria-controls="products-menu"
              className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[0.9375rem] transition-colors duration-200 ${
                productsActive || productsOpen
                  ? "bg-brown-900/[0.06] text-brown-950"
                  : "text-brown-700 hover:text-brown-950 hover:bg-brown-900/[0.04]"
              }`}
            >
              Products
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  id="products-menu"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-3xl border border-brown-900/10 bg-white/95 p-2 shadow-lift backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-1">
                      {productSummaries.map((product) => (
                        <Link
                          key={product.id}
                          to={product.to}
                          className="group flex gap-3 rounded-2xl p-3 transition-colors hover:bg-sand-100"
                        >
                          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brown-900/10 bg-sand-50 text-brown-800 transition-colors group-hover:border-yellow-500/50 group-hover:bg-yellow-500 group-hover:text-brown-950">
                            <product.icon size={18} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-brown-950">
                              {product.name}
                            </span>
                            <span className="mt-0.5 block text-[0.8125rem] leading-snug text-brown-600 line-clamp-2">
                              {product.description}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/products"
                      className="mt-1 flex items-center justify-between rounded-2xl bg-sand-100 px-4 py-3 text-sm font-medium text-brown-900 transition-colors hover:bg-sand-200"
                    >
                      <span>All products — live, in production</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/quote" size="sm" variant="secondary">
            Get a Quote
            <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-brown-900 hover:bg-brown-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 bottom-3 top-[4.75rem] z-40 flex flex-col overflow-y-auto rounded-3xl border border-brown-900/10 bg-white/95 shadow-lift backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-grow flex-col px-6 pt-2" aria-label="Mobile">
              <NavLink to="/" className={mobileLinkClasses} end onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink to="/products" className={mobileLinkClasses} onClick={closeMenu}>
                Products
              </NavLink>
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={mobileLinkClasses} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="p-6">
              <Button to="/quote" size="lg" className="w-full" onClick={closeMenu}>
                Get a Quote
                <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
