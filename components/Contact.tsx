'use client';

import { resumeData } from '@/data/resume';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Get In Touch</span>
        </h2>

        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <p className="text-slate-300 text-center mb-8 text-lg">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <a
              href={`mailto:${resumeData.email}`}
              className="flex flex-col items-center p-6 bg-slate-700 rounded-lg hover:bg-indigo-600 transition-all duration-300 group"
            >
              <Mail className="text-indigo-400 group-hover:text-white mb-3" size={32} />
              <span className="text-white font-semibold mb-2">Email</span>
              <span className="text-slate-400 text-sm text-center group-hover:text-white">
                {resumeData.email}
              </span>
            </a>

            <a
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-slate-700 rounded-lg hover:bg-indigo-600 transition-all duration-300 group"
            >
              <Linkedin className="text-indigo-400 group-hover:text-white mb-3" size={32} />
              <span className="text-white font-semibold mb-2">LinkedIn</span>
              <span className="text-slate-400 text-sm text-center group-hover:text-white">
                Connect with me
              </span>
            </a>

            <div className="flex flex-col items-center p-6 bg-slate-700 rounded-lg">
              <MapPin className="text-indigo-400 mb-3" size={32} />
              <span className="text-white font-semibold mb-2">Location</span>
              <span className="text-slate-400 text-sm text-center">{resumeData.location}</span>
            </div>
          </div>

          <div className="text-center">
            <a
              href={`mailto:${resumeData.email}?subject=Let's Connect`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
            >
              <Send size={18} />
              Send Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

