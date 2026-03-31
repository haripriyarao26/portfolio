'use client';

import { Activity } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function OpenSourceImpact() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="open-source" className="py-20 px-4 bg-[#fcfcf9]/50">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="section-header">
          <h2 className="text-4xl font-bold text-center">
            <span className="gradient-text">Open Source Impact</span>
          </h2>
          <p className="text-center text-[#525252] mt-3 max-w-3xl mx-auto">
            Public GitHub activity—contribution history at a glance.
          </p>
        </div>

        <div className="glass-card rounded-xl border border-[#1a1a1a]/20 p-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={18} className="text-[#1a1a1a]" />
            <h3 className="text-lg font-semibold text-[#111827] mono-accent">Contribution Graph</h3>
          </div>
          <p className="text-sm text-[#525252] mb-4">
            Click through to the full profile on GitHub.
          </p>
          <a
            href="https://github.com/haripriyarao26"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="https://ghchart.rshah.org/haripriyarao26"
              alt="GitHub contribution graph for haripriyarao26"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
