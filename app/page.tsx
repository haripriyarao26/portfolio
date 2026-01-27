'use client';

import { useEffect, Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SectionSeparator from '@/components/SectionSeparator';

// Lazy load components that are below the fold
const Experience = lazy(() => import('@/components/Experience'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Education = lazy(() => import('@/components/Education'));
const Certifications = lazy(() => import('@/components/Certifications'));
const Awards = lazy(() => import('@/components/Awards'));
const Contact = lazy(() => import('@/components/Contact'));

// Loading fallback component
const SectionLoader = () => (
  <div className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="animate-pulse">
        <div className="h-8 bg-slate-800 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-slate-800 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

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
      <Suspense fallback={<SectionLoader />}>
        <Experience />
      </Suspense>
      <SectionSeparator />
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      <SectionSeparator />
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      <SectionSeparator />
      <Suspense fallback={<SectionLoader />}>
        <Education />
      </Suspense>
      <SectionSeparator />
      <Suspense fallback={<SectionLoader />}>
        <Certifications />
      </Suspense>
      <SectionSeparator />
      <Suspense fallback={<SectionLoader />}>
        <Awards />
      </Suspense>
      <SectionSeparator />
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      
      {/* Footer */}
      <footer className="bg-[#0f172a] border-t border-[#1e293b] py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© {new Date().getFullYear()} Haripriya Rao. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </main>
  );
}
