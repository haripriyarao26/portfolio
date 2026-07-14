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
            className={`bg-white rounded-xl p-6 card-hover border border-[#e5e5e5] transition-all duration-700 ${isCardVisible(0) ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 -translate-x-10 rotate-3'
              }`}
          >
            <div className="bg-gradient-to-br from-[#1a1a1a] to-black p-3 rounded-lg w-fit mb-4">
              <User className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#111827] mb-3">Full-Stack Engineer</h3>
            <p className="text-[#525252]">
              Passionate about building scalable applications from frontend to backend.
            </p>
          </div>

          <div
            ref={getItemRef(1)}
            className={`bg-white rounded-xl p-6 card-hover border border-[#e5e5e5] transition-all duration-700 ${isCardVisible(1) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="bg-gradient-to-br from-[#1a1a1a] to-black p-3 rounded-lg w-fit mb-4">
              <Rocket className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#111827] mb-3">AI</h3>
            <p className="text-[#525252]">
              Experienced in AI/ML integration, LangGraph, GPT-4, and building intelligent systems that solve complex problems.
            </p>
          </div>

          <div
            ref={getItemRef(2)}
            className={`bg-white rounded-xl p-6 card-hover border border-[#e5e5e5] transition-all duration-700 ${isCardVisible(2) ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-10 -rotate-3'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="bg-gradient-to-br from-[#1a1a1a] to-black p-3 rounded-lg w-fit mb-4">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#111827] mb-3">Infrastructure</h3>
            <p className="text-[#525252]">
              Architecting distributed systems, observability pipelines, and high-performance infrastructure that scales with business needs.
            </p>
          </div>

          <div
            ref={getItemRef(3)}
            className={`bg-white rounded-xl p-6 card-hover border border-[#e5e5e5] transition-all duration-700 ${isCardVisible(3) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-gradient-to-br from-[#1a1a1a] to-black p-3 rounded-lg w-fit mb-4">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-[#111827] mb-3">Product-Focused</h3>
            <p className="text-[#525252]">
              Create impact by focusing on the overall product needs, working directly with stakeholders to understand business objectives and translate them into technical solutions that drive measurable results.
            </p>
          </div>
        </div>

        {/* Personal Story & Philosophy */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Profile Image Placeholder */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#1a1a1a] to-black p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-6xl font-bold text-[#1a1a1a]">HR</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#1a1a1a] rounded-full border-4 border-white flex items-center justify-center">
                <span className="text-2xl">👋</span>
              </div>
            </div>
          </div>

          {/* Story & Philosophy */}
          <div className="lg:col-span-2 space-y-6">
            <div
              ref={getItemRef(4)}
              className={`bg-gradient-to-r from-[#1a1a1a]/20 to-black/20 rounded-xl p-8 border border-[#1a1a1a]/30 transition-all duration-700 ${isCardVisible(4) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                }`}
            >
              <h3 className="text-2xl font-bold text-[#111827] mb-4">My Story</h3>
              <p className="text-[#525252] text-lg leading-relaxed mb-4">
                My journey from a Computer Science student in India to an <strong className="text-[#111827]">engineering leader</strong> in Los Angeles has shaped my core approach to software: systems must not only function, they must be resilient, highly observable, and explicitly built for scale.
              </p>
              <p className="text-[#525252] text-lg leading-relaxed">
                Most recently, as a <strong className="text-[#111827]">Software Engineer II</strong> at Onetera, I architected distributed AI infrastructure and high-performance backend systems for demanding production workloads. Holding a <strong className="text-[#111827]">Master&apos;s in Computer Science</strong> from USC with a focus on distributed systems and AI/ML, I excel at transforming complex architectural concepts into production-grade reality. Following a recent company restructuring at Onetera, I am actively looking for my next challenge building high-throughput infrastructure.
              </p>
            </div>

            <div
              ref={getItemRef(5)}
              className={`bg-white/50 rounded-xl p-8 border border-[#e5e5e5] transition-all duration-700 ${isCardVisible(5) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h3 className="text-2xl font-bold text-[#111827] mb-4">My Philosophy</h3>
              <p className="text-[#525252] text-lg leading-relaxed mb-4">
                I engineer systems that empower teams to <strong className="text-[#111827]">ship faster</strong>—making observability the default and reliability under load a guarantee.
              </p>
              <p className="text-[#525252] text-lg leading-relaxed">
                My focus centers on <strong className="text-[#111827]">distributed AI infrastructure</strong>, <strong className="text-[#111827]">advanced backend patterns</strong>, and <strong className="text-[#111827]">robust system observability</strong>. I believe elite engineering is measured by two things: systemic resilience and accelerated business velocity.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

