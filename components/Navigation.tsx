'use client';

import { useState, useEffect, memo } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home', group: 'main' },
  { name: 'About', href: '#about', group: 'main' },
  { name: 'Experience', href: '#experience', group: 'work' },
  { name: 'Skills', href: '#skills', group: 'work' },
  { name: 'Projects', href: '#projects', group: 'work' },
  { name: 'Education', href: '#education', group: 'about' },
  { name: 'Certifications', href: '#certifications', group: 'about' },
  { name: 'Awards', href: '#awards', group: 'about' },
  { name: 'Contact', href: '#contact', group: 'main' },
];

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f172a]/95 backdrop-blur-md shadow-lg border-b border-[#1e293b]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-xl font-bold gradient-text">
            Haripriya Rao
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 border-r border-[#334155] pr-6">
              <a
                href="#home"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'home' ? 'text-[#f8fafc]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                Home
              </a>
              <a
                href="#about"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'about' ? 'text-[#f8fafc]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                About
              </a>
            </div>
            <div className="flex items-center space-x-4 border-r border-[#334155] pr-6">
              <a
                href="#experience"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'experience' ? 'text-[#f8fafc]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                Experience
              </a>
              <a
                href="#skills"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'skills' ? 'text-[#f8fafc]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                Skills
              </a>
              <a
                href="#projects"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'projects' ? 'text-[#f8fafc]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                Projects
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#contact"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'contact' ? 'text-[#f8fafc]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                Contact
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#94a3b8] hover:text-[#f8fafc]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a
              href="#home"
              className="block px-4 py-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="block px-4 py-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#experience"
              className="block px-4 py-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Experience
            </a>
            <a
              href="#skills"
              className="block px-4 py-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#projects"
              className="block px-4 py-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default memo(Navigation);

