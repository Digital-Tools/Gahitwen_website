import { NavLink } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Linkedin } from 'lucide-react';
import SquareArrowOutUpRight from "../icons/SquareArrowOutUpRight.tsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <div className="mb-4">
              <Logo invert />
            </div>
            <p className="text-gray-300 mb-4">
              Enabling smarter tech solutions through innovative software and platforms.
            </p>
            <div className="flex space-x-4">
              {/*<a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">*/}
              {/*  <Facebook size={20} />*/}
              {/*  <span className="sr-only">Facebook</span>*/}
              {/*</a>*/}
              {/*<a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">*/}
              {/*  <Twitter size={20} />*/}
              {/*  <span className="sr-only">Twitter</span>*/}
              {/*</a>*/}
              <a href="https://www.linkedin.com/in/gahitwen/" className="text-gray-300 hover:text-yellow-500 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              {/*<a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">*/}
              {/*  <Instagram size={20} />*/}
              {/*  <span className="sr-only">Instagram</span>*/}
              {/*</a>*/}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Products</h3>
            <ul className="space-y-2">
              <li>
                <a
                    href="https://risiti.gahitwen.com"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                    target="_blank" rel="noopener noreferrer"
                >
                  Risiti <SquareArrowOutUpRight size={14} className="ml-1 inline-block"/>
                </a>
              </li>
              <li>
                <a
                    href="https://smart-taka.gahitwen.com"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                    target="_blank" rel="noopener noreferrer"
                >
                  Smart-Taka <SquareArrowOutUpRight size={14} className="ml-1 inline-block"/>
                </a>
              </li>
              <li>
                <a
                    href="https://logistics.gahitwen.com"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                    target="_blank" rel="noopener noreferrer"
                >
                  Gahitwen Logistics <SquareArrowOutUpRight size={14} className="ml-1 inline-block"/>
                </a>
              </li>
              <li>
                <a
                    href="https://gfleet.gahitwen.com"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                    target="_blank" rel="noopener noreferrer"
                >
                  GFleet <SquareArrowOutUpRight size={14} className="ml-1 inline-block"/>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Company</h3>
            <ul className="space-y-2">
              <li><NavLink to="/" className="text-gray-300 hover:text-white transition-colors">Home</NavLink></li>
              <li><NavLink to="/services"
                           className="text-gray-300 hover:text-white transition-colors">Services</NavLink></li>
              {/*<li><NavLink to="/team" className="text-gray-300 hover:text-white transition-colors">Team</NavLink></li>*/}
              <li><NavLink to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Legal</h3>
            <ul className="space-y-2">
              <li><NavLink to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</NavLink></li>
            </ul>
            <p className="text-xs text-gray-400 mt-4">
              Some processing may use secure external servers. We never share personal data.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} The Gahitwen LLC. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            131 Continental Dr Ste 305, Newark, DE 19713, USA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;