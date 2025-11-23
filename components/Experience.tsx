'use client';

import { resumeData } from '@/data/resume';
import Timeline from './Timeline';

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-0 md:px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Professional Experience</span>
        </h2>

        <Timeline items={resumeData.experience} />
      </div>
    </section>
  );
}

