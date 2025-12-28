'use client';

import { resumeData } from '@/data/resume';
import { Linkedin, MapPin, Code, Github } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll('.floating-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techCards = [
    { name: 'Next.js', color: 'from-black to-gray-800', delay: '0s' },
    { name: 'TypeScript', color: 'from-blue-600 to-blue-800', delay: '0.2s' },
    { name: 'React', color: 'from-cyan-500 to-blue-600', delay: '0.4s' },
    { name: 'Python', color: 'from-yellow-500 to-yellow-600', delay: '0.6s' },
    { name: 'AI/ML', color: 'from-purple-600 to-pink-600', delay: '0.8s' },
    { name: 'AWS', color: 'from-orange-500 to-orange-600', delay: '1s' },
    { name: 'Node.js', color: 'from-green-600 to-green-700', delay: '1.2s' },
    { name: 'PostgreSQL', color: 'from-blue-700 to-blue-800', delay: '1.4s' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 px-4 overflow-hidden">
      {/* Animated Background Cards */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {techCards.map((card, index) => (
          <div
            key={index}
            className={`floating-card absolute bg-gradient-to-br ${card.color} rounded-xl p-4 opacity-20 blur-sm border border-white/10`}
            style={{
              top: `${15 + (index * 12)}%`,
              left: `${10 + (index * 11)}%`,
              width: '120px',
              height: '80px',
              animation: `float ${6 + index}s ease-in-out infinite`,
              animationDelay: card.delay,
              transform: 'translateZ(0)',
            }}
          >
            <div className="text-white text-xs font-semibold text-center flex items-center justify-center h-full">
              {card.name}
            </div>
          </div>
        ))}
        
        {/* Additional floating elements */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`extra-${i}`}
            className="absolute bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              top: `${20 + i * 15}%`,
              right: `${10 + i * 10}%`,
              animation: `pulse ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
        <div className="mb-6">
          <div className="inline-block mb-4">
            <span className="text-2xl md:text-3xl">Hey 👋, I'm</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">{resumeData.name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-300 mb-2">
            <span className="block md:inline">I'm a Problem Solver</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-2">
            You've stumbled upon my little heaven on the web; Welcome and feel at home!
          </p>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-8 mt-4">
            Building scalable platforms, AI-powered solutions, and engineering systems
            that drive business growth. Passionate about full-stack development
            and leveraging AI to solve complex problems and create meaningful impact.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-slate-300">
          <a
            href={`https://${resumeData.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-400 transition-all duration-300 hover:scale-110 group"
          >
            <Linkedin size={18} className="group-hover:scale-125 transition-transform" />
            <span>LinkedIn</span>
          </a>
          <span className="hidden sm:inline text-slate-600">•</span>
          <a
            href="https://leetcode.com/u/haripriyarao/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-orange-400 transition-all duration-300 hover:scale-110 group"
          >
            <Code size={18} className="group-hover:scale-125 transition-transform" />
            <span>LeetCode</span>
          </a>
          <span className="hidden sm:inline text-slate-600">•</span>
          <a
            href="https://github.com/haripriyarao26"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-110 group"
          >
            <Github size={18} className="group-hover:scale-125 transition-transform" />
            <span>GitHub</span>
          </a>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{resumeData.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#experience"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 transform"
          >
            View Experience
          </a>
          <a
            href="#projects"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 transform"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border-2 border-indigo-600 text-indigo-400 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-105 transform"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

