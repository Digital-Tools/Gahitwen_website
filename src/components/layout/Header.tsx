import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

  const headerClasses = "fixed w-full z-50 transition-all duration-300 py-4 bg-white shadow-md py-2";

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
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" className={linkClasses}>Home</NavLink>
            <NavLink to="/products" className={linkClasses}>Products</NavLink>
            <NavLink to="/services" className={linkClasses}>Services</NavLink>
            {/*<NavLink to="/team" className={linkClasses}>Team</NavLink>*/}
            <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-brown-800 hover:text-brown-900 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div 
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
          <NavLink 
            to="/team" 
            className="text-brown-800 hover:text-brown-900 font-medium text-lg" 
            onClick={closeMenu}
          >
            Team
          </NavLink>
          <NavLink 
            to="/contact" 
            className="text-brown-800 hover:text-brown-900 font-medium text-lg" 
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;