'use client';

import { User, Target, Rocket, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';

export default function About() {
  const { ref, isVisible } = useScrollAnimation();
  const { getItemRef, isVisible: isCardVisible } = useStaggeredAnimation(100);
  
  return (
    <section id="about" className="py-20 px-4">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="section-header">
          <h2 className="text-4xl font-bold text-center">
            <span className="gradient-text">About Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            ref={getItemRef(0)}
            className={`bg-[#1e293b] rounded-xl p-6 card-hover border border-[#334155] transition-all duration-700 ${
              isCardVisible(0) ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 -translate-x-10 rotate-3'
            }`}
          >
            <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-3 rounded-lg w-fit mb-4">
              <User className="text-[#f8fafc]" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#f8fafc] mb-3">Full-Stack Engineer</h3>
            <p className="text-[#94a3b8]">
              Passionate about building scalable applications from frontend to backend.
            </p>
          </div>

          <div 
            ref={getItemRef(1)}
            className={`bg-[#1e293b] rounded-xl p-6 card-hover border border-[#334155] transition-all duration-700 ${
              isCardVisible(1) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-3 rounded-lg w-fit mb-4">
              <Rocket className="text-[#f8fafc]" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#f8fafc] mb-3">AI</h3>
            <p className="text-[#94a3b8]">
              Experienced in AI/ML integration, LangGraph, GPT-4, and building intelligent systems that solve complex problems.
            </p>
          </div>

          <div 
            ref={getItemRef(2)}
            className={`bg-[#1e293b] rounded-xl p-6 card-hover border border-[#334155] transition-all duration-700 ${
              isCardVisible(2) ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-10 -rotate-3'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-3 rounded-lg w-fit mb-4">
              <Sparkles className="text-[#f8fafc]" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#f8fafc] mb-3">Infrastructure</h3>
            <p className="text-[#94a3b8]">
              Architecting distributed systems, observability pipelines, and high-performance infrastructure that scales with business needs.
            </p>
          </div>

          <div 
            ref={getItemRef(3)}
            className={`bg-[#1e293b] rounded-xl p-6 card-hover border border-[#334155] transition-all duration-700 ${
              isCardVisible(3) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-3 rounded-lg w-fit mb-4">
              <Target className="text-[#f8fafc]" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#f8fafc] mb-3">Product-Focused</h3>
            <p className="text-[#94a3b8]">
              Create impact by focusing on the overall product needs, working directly with stakeholders to understand business objectives and translate them into technical solutions that drive measurable results.
            </p>
          </div>
        </div>

        {/* Personal Story & Philosophy */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Profile Image Placeholder */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-[#1e293b] flex items-center justify-center">
                  <span className="text-6xl font-bold text-[#f59e0b]">HR</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#f59e0b] rounded-full border-4 border-[#0f172a] flex items-center justify-center">
                <span className="text-2xl">👋</span>
              </div>
            </div>
          </div>

          {/* Story & Philosophy */}
          <div className="lg:col-span-2 space-y-6">
            <div 
              ref={getItemRef(4)}
              className={`bg-gradient-to-r from-[#f59e0b]/20 to-[#d97706]/20 rounded-xl p-8 border border-[#f59e0b]/30 transition-all duration-700 ${
                isCardVisible(4) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
            >
              <h3 className="text-2xl font-bold text-[#f8fafc] mb-4">My Story</h3>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-4">
                As a <strong className="text-[#f8fafc]">Software Engineer 2</strong> at Onetera, I architect distributed AI infrastructure and 
                high-performance systems that handle production-scale workloads. My focus is on building reliable, observable systems 
                using technologies like <strong className="text-[#f8fafc]">LangGraph, ClickHouse, and Redis</strong> to solve complex engineering challenges.
              </p>
              <p className="text-[#94a3b8] text-lg leading-relaxed">
                I hold a <strong className="text-[#f8fafc]">Master of Science in Computer Science</strong> from the University of Southern California, 
                where I specialized in AI/ML and distributed systems. My approach emphasizes <strong className="text-[#f8fafc]">performance, reliability, and scalability</strong>— 
                I build systems that work at scale, not just in demos.
              </p>
            </div>

            <div 
              ref={getItemRef(5)}
              className={`bg-[#1e293b]/50 rounded-xl p-8 border border-[#334155] transition-all duration-700 ${
                isCardVisible(5) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h3 className="text-2xl font-bold text-[#f8fafc] mb-4">My Philosophy</h3>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-4">
                <strong className="text-[#f8fafc]">Systems over features.</strong> I believe the best engineers understand how components 
                interact at scale. Every architecture decision should consider performance implications, every system should be observable, 
                and every deployment should be reliable.
              </p>
              <p className="text-[#94a3b8] text-lg leading-relaxed">
                I'm passionate about <strong className="text-[#f8fafc]">distributed AI infrastructure</strong> that handles production workloads, 
                <strong className="text-[#f8fafc]"> observability systems</strong> that provide actionable insights, and 
                <strong className="text-[#f8fafc]"> high-performance engineering</strong> that delivers measurable impact.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

