'use client';

import { resumeData } from '@/data/resume';
import { Mail, Linkedin, MapPin, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">{resumeData.name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-300 mb-6">
            Lead Software Engineer
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Building scalable platforms, AI-powered solutions, and engineering systems
            that drive business growth. Passionate about full-stack development,
            DevOps, and emerging technologies.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-slate-300">
          <a
            href={`mailto:${resumeData.email}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={18} />
            <span>{resumeData.email}</span>
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href={`https://${resumeData.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{resumeData.location}</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <a
            href="#experience"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
          >
            View Experience
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border-2 border-indigo-600 text-indigo-400 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

