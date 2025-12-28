'use client';

import { resumeData } from '@/data/resume';
import Timeline from './Timeline';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section id="experience" className="py-20 px-0 md:px-4 bg-slate-900/50">
      <div ref={ref} className={`max-w-6xl mx-auto px-4 md:px-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Professional Experience</span>
        </h2>

        <Timeline items={resumeData.experience} />
      </div>
    </section>
  );
}

