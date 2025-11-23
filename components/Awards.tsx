'use client';

import { resumeData } from '@/data/resume';
import { Award } from 'lucide-react';

export default function Awards() {
  return (
    <section id="awards" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Awards & Recognition</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.honors.map((honor, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 card-hover border border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-lg">
                  <Award className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{honor.title}</h3>
                  <p className="text-indigo-400 font-semibold mb-2">{honor.organization}</p>
                  <p className="text-slate-300 mb-2">{honor.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>{honor.location}</span>
                    <span>•</span>
                    <span>{honor.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

