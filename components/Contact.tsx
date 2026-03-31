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

        <div className="bg-white rounded-xl p-8 border border-[#e5e5e5]">
          <p className="text-[#525252] text-center mb-8 text-lg">
            I&apos;m actively looking for new opportunities in software engineering and AI. Always happy to discuss roles, interesting projects, or a chat about technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-[#f5f5f3] rounded-lg hover:bg-[#1a1a1a] transition-all duration-300 group card-hover"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="text-[#1a1a1a] group-hover:text-white mb-3 transition-colors" size={32} />
              <span className="text-[#111827] group-hover:text-white font-semibold mb-2 transition-colors">LinkedIn</span>
              <span className="text-[#525252] text-sm text-center group-hover:text-white transition-colors">
                Connect with me
              </span>
            </a>

            <div className="flex flex-col items-center p-6 bg-[#f5f5f3] rounded-lg">
              <MapPin className="text-[#1a1a1a] mb-3" size={32} />
              <span className="text-[#111827] font-semibold mb-2">Location</span>
              <span className="text-[#525252] text-sm text-center">{resumeData.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

