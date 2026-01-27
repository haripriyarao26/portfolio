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

        <div className="bg-[#1e293b] rounded-xl p-8 border border-[#334155]">
          <p className="text-[#94a3b8] text-center mb-8 text-lg">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-[#334155] rounded-lg hover:bg-[#f59e0b] transition-all duration-300 group card-hover"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="text-[#f59e0b] group-hover:text-[#f8fafc] mb-3 transition-colors" size={32} />
              <span className="text-[#f8fafc] font-semibold mb-2">LinkedIn</span>
              <span className="text-[#94a3b8] text-sm text-center group-hover:text-[#f8fafc] transition-colors">
                Connect with me
              </span>
            </a>

            <div className="flex flex-col items-center p-6 bg-[#334155] rounded-lg">
              <MapPin className="text-[#f59e0b] mb-3" size={32} />
              <span className="text-[#f8fafc] font-semibold mb-2">Location</span>
              <span className="text-[#94a3b8] text-sm text-center">{resumeData.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

