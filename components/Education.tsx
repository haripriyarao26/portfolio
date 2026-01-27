'use client';

import { resumeData } from '@/data/resume';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';

export default function Education() {
  const { ref, isVisible } = useScrollAnimation();
  const { getItemRef, isVisible: isCardVisible } = useStaggeredAnimation(200);
  
  return (
    <section id="education" className="py-20 px-4">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="section-header">
          <h2 className="text-4xl font-bold text-center">
            <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.education.map((edu, index) => (
            <div
              key={index}
              ref={getItemRef(index)}
              className={`bg-[#1e293b] rounded-xl p-6 card-hover border border-[#334155] transition-all duration-700 ${
                isCardVisible(index) 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : index % 2 === 0 
                    ? 'opacity-0 -translate-x-10 scale-95' 
                    : 'opacity-0 translate-x-10 scale-95'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-3 rounded-lg">
                  <GraduationCap className="text-[#f8fafc]" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#f8fafc] mb-2">{edu.degree}</h3>
                  <p className="text-[#f59e0b] font-semibold mb-3">{edu.institution}</p>
                  <div className="space-y-2 text-sm text-[#94a3b8]">
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


