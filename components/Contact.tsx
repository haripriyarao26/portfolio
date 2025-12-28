'use client';

import { resumeData } from '@/data/resume';
import { Linkedin, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section id="contact" className="py-20 px-4">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="section-header">
          <h2 className="text-4xl font-bold text-center">
            <span className="gradient-text">Get In Touch</span>
          </h2>
        </div>

        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <p className="text-slate-300 text-center mb-8 text-lg">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-slate-700 rounded-lg hover:bg-indigo-600 transition-all duration-300 group card-hover"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="text-indigo-400 group-hover:text-white mb-3 transition-colors" size={32} />
              <span className="text-white font-semibold mb-2">LinkedIn</span>
              <span className="text-slate-400 text-sm text-center group-hover:text-white transition-colors">
                Connect with me
              </span>
            </a>

            <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
              <MapPin className="text-indigo-400 mb-3" size={32} />
              <span className="text-white font-semibold mb-2">Location</span>
              <span className="text-slate-400 text-sm text-center">{resumeData.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

