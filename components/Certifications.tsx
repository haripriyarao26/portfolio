'use client';

import { resumeData } from '@/data/resume';
import { Award } from 'lucide-react';

export default function Certifications() {
  if (!resumeData.certifications || resumeData.certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Certifications</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 card-hover border border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-lg">
                  <Award className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{cert.title}</h3>
                  <p className="text-indigo-400 font-semibold mb-2">{cert.issuer}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <span>Issued {cert.issueDate}</span>
                    {cert.credentialId && (
                      <>
                        <span>•</span>
                        <span>ID: {cert.credentialId}</span>
                      </>
                    )}
                  </div>
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-slate-300 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded"
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

