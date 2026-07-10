import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape closes menu
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const headerClasses = `
    fixed w-full z-50 transition-all duration-300 py-3 bg-white
    ${scrolled || isOpen ? "shadow-sm border-b border-brown-100" : "border-b border-transparent"}
  `;

  const linkClasses = ({ isActive }: { isActive: boolean }) => `
    relative font-medium text-base transition-colors duration-200
    ${
      isActive
        ? 'text-brown-900 after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-yellow-500'
        : "text-brown-800 hover:text-brown-900"
    }
  `;

  const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-medium text-lg py-1 ${
      isActive ? "text-brown-900" : "text-brown-800 hover:text-brown-900"
    }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <NavLink to="/" onClick={closeMenu}>
              <Logo />
            </NavLink>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={linkClasses} end>
              Home
            </NavLink>
            <NavLink to="/products" className={linkClasses}>
              Products
            </NavLink>
            <NavLink to="/services" className={linkClasses}>
              Services
            </NavLink>
            {/*<NavLink to="/team" className={linkClasses}>Team</NavLink>*/}
            <NavLink to="/contact" className={linkClasses}>
              Contact
            </NavLink>
            <Link
              to="/quote"
              className="inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 bg-yellow-500 text-brown-900 hover:bg-yellow-600 text-sm px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-brown-800 hover:text-brown-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={`
          md:hidden fixed inset-x-0 bottom-0 z-40 bg-white transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ top: "60px" }}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          <nav className="flex flex-col gap-5 p-6 pt-8 flex-grow">
            <NavLink to="/" className={mobileLinkClasses} end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={mobileLinkClasses}
              onClick={closeMenu}
            >
              Products
            </NavLink>
            <NavLink
              to="/services"
              className={mobileLinkClasses}
              onClick={closeMenu}
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className={mobileLinkClasses}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </nav>

          <div className="p-6 border-t border-brown-100 pb-8">
            <Button to="/quote" size="lg" className="w-full" onClick={closeMenu}>
              Get a Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
