import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const headerClasses = "fixed w-full z-50 transition-all duration-300 py-3 bg-white shadow-md";

  const linkClasses = ({ isActive }: { isActive: boolean }) => `
    relative font-medium text-base transition-colors duration-200
    ${isActive 
      ? 'text-brown-900 after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-yellow-500' 
      : 'text-brown-800 hover:text-brown-900'}
  `;

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
            <NavLink to="/" className={linkClasses}>Home</NavLink>
            <NavLink to="/products" className={linkClasses}>Products</NavLink>
            <NavLink to="/services" className={linkClasses}>Services</NavLink>
            {/*<NavLink to="/team" className={linkClasses}>Team</NavLink>*/}
            <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
            <Link
              to="/quote"
              className="inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 bg-yellow-500 text-brown-900 hover:bg-yellow-600 text-sm px-4 py-2"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-brown-800 hover:text-brown-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div 
        id="mobile-nav"
        className={`
          md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ top: '60px' }}
      >
        <div className="flex flex-col space-y-6 p-6 pt-8">
          <NavLink 
            to="/" 
            className="text-brown-800 hover:text-brown-900 font-medium text-lg" 
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className="text-brown-800 hover:text-brown-900 font-medium text-lg" 
            onClick={closeMenu}
          >
            Products
          </NavLink>
          <NavLink 
            to="/services" 
            className="text-brown-800 hover:text-brown-900 font-medium text-lg" 
            onClick={closeMenu}
          >
            Services
          </NavLink>
          {/*<NavLink */}
          {/*  to="/team" */}
          {/*  className="text-brown-800 hover:text-brown-900 font-medium text-lg" */}
          {/*  onClick={closeMenu}*/}
          {/*>*/}
          {/*  Team*/}
          {/*</NavLink>*/}
          <NavLink 
            to="/contact" 
            className="text-brown-800 hover:text-brown-900 font-medium text-lg" 
            onClick={closeMenu}
          >
            Contact
          </NavLink>
          <Link
            to="/quote"
            onClick={closeMenu}
            className="inline-flex items-center justify-center font-medium rounded-md bg-yellow-500 text-brown-900 hover:bg-yellow-600 text-lg px-6 py-3 mt-2"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;