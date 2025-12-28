'use client';

import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SectionSeparator from '@/components/SectionSeparator';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import Awards from '@/components/Awards';
import Contact from '@/components/Contact';

export default function Home() {
  useEffect(() => {
    // Handle hash navigation on page load
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # symbol
        const sectionId = hash.substring(1);
        // Wait for the page to fully render
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            // Get the navigation bar height (64px = h-16)
            const navHeight = 64;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Run on initial load
    handleHashNavigation();

    // Also handle hash changes (when clicking links after page load)
    const handleHashChange = () => {
      handleHashNavigation();
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <SectionSeparator />
      <About />
      <SectionSeparator />
      <Experience />
      <SectionSeparator />
      <Skills />
      <SectionSeparator />
      <Projects />
      <SectionSeparator />
      <Education />
      <SectionSeparator />
      <Certifications />
      <SectionSeparator />
      <Awards />
      <SectionSeparator />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© {new Date().getFullYear()} Haripriya Rao. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </main>
  );
}
