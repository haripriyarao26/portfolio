'use client';

import { Github, Code2, Lightbulb, CheckCircle, Shield, Zap, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';
import { memo } from 'react';
import { getProjectById } from '@/data/projects';

interface AutoUnitAgentCaseStudyProps {
  projectId?: string;
}

function AutoUnitAgentCaseStudy({ projectId = 'auto-unit-agent' }: AutoUnitAgentCaseStudyProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { getItemRef, isVisible: isCardVisible } = useStaggeredAnimation(200);
  const project = getProjectById(projectId);

  if (!project) return null;

  return (
    <section id="projects" className="py-20 px-4 bg-[#fcfcf9]/50">
      <div ref={ref} className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a]/20 rounded-full mb-6">
            <Code2 className="text-[#1a1a1a]" size={18} />
            <span className="text-[#1a1a1a] text-sm font-medium">Case Study</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">{project.title}</span>
          </h2>
          <p className="text-xl text-[#525252] max-w-3xl mx-auto mb-2">
            {project.description}
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#f5f5f3] rounded-lg transition-colors"
              >
                <Github size={18} />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Problem */}
        <div
          ref={getItemRef(0)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <Lightbulb className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#111827]">The Challenge</h3>
          </div>
          <div className="bg-white/50 rounded-xl p-8 border border-[#e5e5e5] card-hover">
            <p className="text-[#525252] text-lg leading-relaxed">
              Writing high-quality unit tests is time-consuming and error-prone—especially in TypeScript projects with mixed module systems.
              The goal was to build an automated agent that generates Jest tests from source, validates them by execution, and iteratively fixes failures
              without risking the developer’s working tree.
            </p>
          </div>
        </div>

        {/* Solution */}
        <div
          ref={getItemRef(1)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <CheckCircle className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#111827]">What I Built</h3>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a1a]/20 to-black/20 rounded-xl p-8 border border-[#1a1a1a]/30 card-hover">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Automated unit-test generation for TypeScript that produces Jest tests and validates them via execution',
                'LangGraph state machine (generate → execute → debug → retry) with conditional routing + iteration limits to converge on passing tests',
                'Sandboxed test execution using isolated temporary directories with deterministic cleanup and failure isolation'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-[#1a1a1a] mt-1 flex-shrink-0" size={18} />
                  <span className="text-[#525252]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reliability */}
        <div
          ref={getItemRef(2)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <Shield className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#111827]">Safety & Guardrails</h3>
          </div>
          <div className="bg-white/50 rounded-xl p-8 border border-[#e5e5e5] card-hover">
            <p className="text-[#525252] text-lg leading-relaxed">
              The agent runs generated tests in a sandboxed environment to avoid contaminating the main repo, and applies basic guardrails
              to model outputs (code extraction + sanity validation) to reduce malformed generations and speed up convergence.
            </p>
          </div>
        </div>

        {/* Outcomes */}
        <div
          ref={getItemRef(3)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <TrendingUp className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#111827]">Why It’s Interesting</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/50 rounded-xl p-6 border border-[#e5e5e5] text-center card-hover">
              <div className="text-3xl font-bold text-[#1a1a1a] mb-2">Agentic</div>
              <p className="text-[#525252]">Closed-loop testing</p>
              <p className="text-sm text-[#525252] mt-1">Execution-driven debugging</p>
            </div>
            <div className="bg-white/50 rounded-xl p-6 border border-[#e5e5e5] text-center card-hover">
              <div className="text-3xl font-bold text-[#1a1a1a] mb-2">Safe</div>
              <p className="text-[#525252]">Isolated sandbox</p>
              <p className="text-sm text-[#525252] mt-1">No repo pollution</p>
            </div>
            <div className="bg-white/50 rounded-xl p-6 border border-[#e5e5e5] text-center card-hover">
              <div className="text-3xl font-bold text-[#1a1a1a] mb-2">Practical</div>
              <p className="text-[#525252]">TypeScript + Jest</p>
              <p className="text-sm text-[#525252] mt-1">Real-world dev flow</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div
          ref={getItemRef(4)}
          className={`bg-white/50 rounded-xl p-8 border border-[#e5e5e5] card-hover transition-all duration-700 ${
            isCardVisible(4) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <Zap className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-[#111827]">Technology Stack</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'TypeScript', category: 'Language' },
              { name: 'Jest', category: 'Testing' },
              { name: 'LangGraph', category: 'Orchestration' },
              { name: 'Node.js', category: 'Runtime' },
              { name: 'Sandboxing', category: 'Safety' },
              { name: 'Child Processes', category: 'Execution' },
              { name: 'Parsing/Validation', category: 'Guardrails' },
              { name: 'GitHub', category: 'Collaboration' }
            ].map((tech) => (
              <div key={tech.name} className="text-center p-4 bg-[#fcfcf9]/50 rounded-lg">
                <div className="font-semibold text-[#111827] mb-1">{tech.name}</div>
                <div className="text-xs text-[#525252]">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AutoUnitAgentCaseStudy);

