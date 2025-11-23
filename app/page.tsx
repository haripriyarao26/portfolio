'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
// import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import Awards from '@/components/Awards';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      {/* <Projects /> */}
      <Education />
      <Certifications />
      <Awards />
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
