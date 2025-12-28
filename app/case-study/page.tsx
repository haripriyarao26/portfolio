'use client';

import Navigation from '@/components/Navigation';
import MoodBiteCaseStudy from '@/components/MoodBiteCaseStudy';
import SectionSeparator from '@/components/SectionSeparator';
import Contact from '@/components/Contact';

export default function CaseStudyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <MoodBiteCaseStudy projectId="moodbite" />
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
