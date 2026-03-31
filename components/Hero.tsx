'use client';

import { resumeData } from '@/data/resume';
import { Linkedin, MapPin, Github } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gradients } from '@/constants/colors';
import CountUpMetric from './CountUpMetric';
import HeroTerminal from './HeroTerminal';

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
    { name: 'Next.js', color: gradients.background, delay: '0s' },
    { name: 'TypeScript', color: 'from-[#1a1a1a]/30 to-black/30', delay: '0.2s' },
    { name: 'React', color: gradients.primaryLight, delay: '0.4s' },
    { name: 'Python', color: 'from-[#1a1a1a]/25 to-black/25', delay: '0.6s' },
    { name: 'AI/ML', color: 'from-[#1a1a1a]/30 to-black/30', delay: '0.8s' },
    { name: 'AWS', color: 'from-[#1a1a1a]/25 to-black/25', delay: '1s' },
    { name: 'Node.js', color: gradients.primaryLight, delay: '1.2s' },
    { name: 'PostgreSQL', color: 'from-[#1a1a1a]/30 to-black/30', delay: '1.4s' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 px-4 overflow-hidden">
      {/* Animated Background Cards */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {techCards.map((card, index) => (
          <div
            key={index}
            className={`floating-card absolute bg-gradient-to-br ${card.color} rounded-xl p-4 opacity-40 blur-sm border border-[#525252]/20`}
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
            <div className="text-[#111827] text-xs font-semibold text-center flex items-center justify-center h-full">
              {card.name}
            </div>
          </div>
        ))}
        
        {/* Additional floating elements */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`extra-${i}`}
            className="absolute bg-gradient-to-br from-[#1a1a1a]/20 to-black/20 rounded-full blur-xl"
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
            <span className="text-2xl md:text-3xl mono-accent">Hey 👋, I&apos;m</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">{resumeData.name}</span>
          </h1>

          <HeroTerminal />

          <p className="text-base md:text-lg text-[#525252] max-w-2xl mx-auto mb-4 mt-2">
            Software Engineer specialized in distributed AI infrastructure and high-performance full-stack systems.
            At Onetera through March 2026, I architected agentic workflows and observability suites at scale.
            I&apos;m actively looking for new opportunities in software engineering (SDE) and AI.
          </p>

          <noscript>
            <p className="text-sm text-[#525252] text-center max-w-lg mx-auto mb-4">
              Key metrics: 96% token cost cut, 22-node orchestration graph, 40% orchestrator latency reduction.
            </p>
          </noscript>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <CountUpMetric value={96} suffix="%" label="Token Cost Cut" />
            <CountUpMetric value={22} label="State Nodes" />
            <CountUpMetric value={40} suffix="%" label="Latency Reduction" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-[#525252]">
          <a
            href={`https://${resumeData.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#1a1a1a] transition-all duration-300 hover:scale-110 group"
          >
            <Linkedin size={18} className="group-hover:scale-125 transition-transform" />
            <span>LinkedIn</span>
          </a>
          <span className="hidden sm:inline text-[#525252]">•</span>
          <a
            href="https://github.com/haripriyarao26"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#1a1a1a] transition-all duration-300 hover:scale-110 group"
          >
            <Github size={18} className="group-hover:scale-125 transition-transform" />
            <span>GitHub</span>
          </a>
          <span className="hidden sm:inline text-[#525252]">•</span>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{resumeData.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#experience"
            className="px-6 py-3 bg-[#1a1a1a] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#1a1a1a]/50 hover:bg-black transition-all duration-300 hover:scale-105 transform"
          >
            View Experience
          </a>
          <a
            href="#projects"
            className="px-6 py-3 bg-[#1a1a1a] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#1a1a1a]/50 hover:bg-black transition-all duration-300 hover:scale-105 transform"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border-2 border-[#1a1a1a] text-[#1a1a1a] rounded-lg font-semibold hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 hover:scale-105 transform"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#525252] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#525252] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

