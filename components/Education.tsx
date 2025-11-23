'use client';

import { resumeData } from '@/data/resume';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Education</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.education.map((edu, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 card-hover border border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-lg">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{edu.degree}</h3>
                  <p className="text-indigo-400 font-semibold mb-3">{edu.institution}</p>
                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{edu.period}</span>
                    </div>
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

