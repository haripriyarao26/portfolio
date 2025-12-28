'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

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

export default function Navigation() {
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
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
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
            <div className="flex items-center space-x-4 border-r border-slate-700 pr-6">
              <a
                href="#home"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'home' ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Home
              </a>
              <a
                href="#about"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'about' ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                About
              </a>
            </div>
            <div className="flex items-center space-x-4 border-r border-slate-700 pr-6">
              <a
                href="#experience"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'experience' ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Experience
              </a>
              <a
                href="#skills"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'skills' ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Skills
              </a>
              <a
                href="#projects"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'projects' ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Projects
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#contact"
                className={`transition-colors duration-200 font-medium ${
                  activeSection === 'contact' ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Contact
              </a>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors text-white font-medium"
              >
                <Download size={16} />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

