'use client';

import { resumeData } from '@/data/resume';
import { Award } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';

export default function Certifications() {
  const { ref, isVisible } = useScrollAnimation();
  const { getItemRef, isVisible: isCardVisible } = useStaggeredAnimation(150);
  
  if (!resumeData.certifications || resumeData.certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-20 px-4 bg-[#fcfcf9]/50">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="section-header">
          <h2 className="text-4xl font-bold text-center">
            <span className="gradient-text">Certifications</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.certifications.map((cert, index) => (
            <div
              key={index}
              ref={getItemRef(index)}
              className={`bg-white rounded-xl p-6 card-hover border border-[#e5e5e5] transition-all duration-700 ${
                isCardVisible(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-10 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[#1a1a1a] to-black p-3 rounded-lg">
                  <Award className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#111827] mb-2">{cert.title}</h3>
                  <p className="text-[#1a1a1a] font-semibold mb-2">{cert.issuer}</p>
                  <div className="flex items-center gap-4 text-sm text-[#525252] mb-3">
                    <span>Issued {cert.issueDate}</span>
                    {cert.credentialId && (
                      <>
                        <span>•</span>
                        <span>ID: {cert.credentialId}</span>
                      </>
                    )}
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-sm font-semibold text-[#1a1a1a] hover:text-black transition-colors"
                      aria-label={`View credential for ${cert.title}`}
                    >
                      View credential
                    </a>
                  )}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-[#525252] mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-[#f5f5f3] text-[#525252] rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

