
import React from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  isMenuOpen: boolean;
  isScrolled: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  isMenuOpen,
  isScrolled,
  setIsMenuOpen,
  scrollToSection,
}) => {
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900/90 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-white">
          Pragyensh<span className="text-cyan-400">.</span>
        </a>

        <nav className={`hidden md:flex space-x-8`}>
          {["Home", "About", "Experience", "Projects", "Services", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`relative font-medium transition-colors duration-300 hover:text-cyan-400 ${
                activeSection === item.toLowerCase() ? "text-cyan-400" : "text-gray-300"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                  activeSection === item.toLowerCase() ? "w-full" : "w-0"
                }`}
              ></span>
            </button>
          ))}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-800/95 backdrop-blur-md transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center py-8 space-y-4">
          {["Home", "About", "Experience", "Projects", "Services", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
