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
            className={`bg-slate-800 rounded-xl p-6 card-hover border border-slate-700 transition-all duration-700 ${
              isCardVisible(0) ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 -translate-x-10 rotate-3'
            }`}
          >
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-lg w-fit mb-4">
              <User className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Full-Stack Engineer</h3>
            <p className="text-slate-300">
              Passionate about building scalable applications from frontend to backend.
            </p>
          </div>

          <div 
            ref={getItemRef(1)}
            className={`bg-slate-800 rounded-xl p-6 card-hover border border-slate-700 transition-all duration-700 ${
              isCardVisible(1) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-lg w-fit mb-4">
              <Rocket className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI</h3>
            <p className="text-slate-300">
              Experienced in AI/ML integration, LangGraph, GPT-4, and building intelligent systems that solve complex problems.
            </p>
          </div>

          <div 
            ref={getItemRef(2)}
            className={`bg-slate-800 rounded-xl p-6 card-hover border border-slate-700 transition-all duration-700 ${
              isCardVisible(2) ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-10 -rotate-3'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-3 rounded-lg w-fit mb-4">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">0 → 1 Builder</h3>
            <p className="text-slate-300">
              Specialized in taking products from concept to launch, building foundational architecture and scalable systems from scratch.
            </p>
          </div>

          <div 
            ref={getItemRef(3)}
            className={`bg-slate-800 rounded-xl p-6 card-hover border border-slate-700 transition-all duration-700 ${
              isCardVisible(3) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-lg w-fit mb-4">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Product-Focused</h3>
            <p className="text-slate-300">
              Create impact by focusing on the overall product needs, working directly with stakeholders to understand business objectives and translate them into technical solutions that drive measurable results.
            </p>
          </div>
        </div>

        {/* Personal Story & Philosophy */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Profile Image Placeholder */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-6xl font-bold text-indigo-400">HR</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                <span className="text-2xl">👋</span>
              </div>
            </div>
          </div>

          {/* Story & Philosophy */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-8 border border-indigo-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                As a <strong className="text-white">Software Engineer 2/Technical Lead</strong> at Onetera, I've had the privilege of building products from 0 to 1, 
                contributing to a $3M seed raise, and working directly with city stakeholders to solve real-world problems. 
                My journey from a Computer Science student in India to a technical leader in Los Angeles has taught me the value of 
                <strong className="text-white"> building with purpose</strong>.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                I hold a <strong className="text-white">Master of Science in Computer Science</strong> from the University of Southern California, 
                where I deepened my understanding of AI/ML and full-stack development. My approach combines technical excellence with 
                product thinking—I don't just write code, I solve problems that matter.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4">My Philosophy</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                <strong className="text-white">Build, don't just code.</strong> I believe the best engineers are those who understand 
                the "why" behind the "what". Every line of code should serve a purpose, every feature should solve a real problem, 
                and every system should be built to scale.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm passionate about <strong className="text-white">AI-powered solutions</strong> that make people's lives easier, 
                <strong className="text-white"> scalable architectures</strong> that grow with the business, and 
                <strong className="text-white"> collaborative teams</strong> that ship impactful products.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4">What I'm Looking For</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm seeking opportunities as a <strong className="text-white">Senior Software Engineer</strong> or 
                <strong className="text-white"> Technical Lead</strong> where I can:
              </p>
              <ul className="mt-4 space-y-2 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">▹</span>
                  <span>Build AI-powered products that solve complex problems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">▹</span>
                  <span>Lead technical initiatives and mentor engineers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">▹</span>
                  <span>Work with cross-functional teams to ship impactful features</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">▹</span>
                  <span>Contribute to product strategy and technical architecture decisions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

