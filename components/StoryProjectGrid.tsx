'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { TiltCard3D } from '@/components/ReactBits3D';
import { HaldenButton, HaldenFadeUp } from '@/components/HaldenMotion';

type StoryProjectGridProps = {
  projects: Project[];
};

const SWARM_NODES = [
  {
    id: 'ingestion',
    step: '01',
    name: '1. Read Contract',
    role: 'Finds renewal dates & pricing',
    metric: '64 days until renewal',
    log: '[AGENT 1] Found $148,000 contract renewing in 64 days.',
  },
  {
    id: 'scouter',
    step: '02',
    name: '2. Check Seat Usage',
    role: 'Checks how many licenses are unused',
    metric: '89 unused seats found',
    log: '[AGENT 2] Only 64% of paid seats are active (below 85% target).',
  },
  {
    id: 'drafting',
    step: '03',
    name: '3. Draft Cancellation',
    role: 'Writes vendor savings notice',
    metric: 'Notice ready for approval',
    log: '[AGENT 3] Auto-drafted non-renewal notice to save unused seat costs.',
  },
];

const SIMPLE_COPY: Record<string, { title: string; summary: string; badge: string }> = {
  'procure-loop': {
    title: 'Procure-Loop: AI Contract & License Savings Agent',
    badge: 'Flagship 3-Agent App',
    summary:
      'A 3-agent system that reads company software contracts, checks Okta to see if employees actually use their licenses, and automatically writes cancellation notices before auto-renewal.',
  },
  'gemini-cookbook': {
    title: 'Google Gemini Official Cookbook (Merged PR #1088)',
    badge: 'Merged by Google',
    summary:
      'Reviewed and merged by Google engineers into the official Gemini repository. Adds automatic retry handling and real-time dollar cost tracking for production AI apps.',
  },
  'openai-cookbook-langchain-rwmh': {
    title: 'OpenAI Official Cookbook (PR #2568)',
    badge: 'OpenAI Ecosystem',
    summary:
      'Security and reliability contribution for production AI workflows, preventing malformed tool calls and hardening memory adapters.',
  },
  'auto-unit-agent': {
    title: 'Auto-Unit Agent: Self-Healing Test Generator',
    badge: 'Developer Tool',
    summary:
      'Automatically writes and fixes unit tests when code changes, cutting manual QA maintenance time by 25%.',
  },
  'dev-log-architect': {
    title: 'Dev-Log Architect: Automated Release Notes',
    badge: 'Developer Tool',
    summary:
      'Turns raw Git commits and pull requests into clean, human-readable changelogs and architecture summaries.',
  },
};

export default function StoryProjectGrid({ projects }: StoryProjectGridProps) {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [drawerProject, setDrawerProject] = useState<Project | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodeIndex(prev => (prev + 1) % SWARM_NODES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const procureLoop = projects.find(p => p.id === 'procure-loop');
  const otherProjects = projects.filter(p => p.id !== 'procure-loop');
  const selectedSwarmNode = SWARM_NODES[activeNodeIndex] || SWARM_NODES[0];

  return (
    <div className="space-y-6">
      {procureLoop && (
        <HaldenFadeUp>
          <article>
            <TiltCard3D
              intensity={4}
              glareColor="rgba(143, 213, 241, 0.35)"
              className="spatial-glass rounded-3xl p-6 sm:p-8"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="mono-accent px-3 py-1 rounded-full bg-[#0b1d3a] text-[#FFFFFF] text-xs font-semibold">
                    {SIMPLE_COPY['procure-loop'].badge}
                  </span>
                  <span className="mono-accent text-xs text-[#5b7cf0] font-semibold">
                    Python &middot; LangGraph &middot; React
                  </span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-[#0b1d3a] mb-2">
                  {SIMPLE_COPY['procure-loop'].title}
                </h3>

                <p className="text-sm sm:text-base text-[#3e4d68] max-w-3xl mb-6 leading-relaxed">
                  {SIMPLE_COPY['procure-loop'].summary}
                </p>

                <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-4 mb-6 shadow-inner">
                  <div className="grid gap-3 md:grid-cols-3 mb-3">
                    {SWARM_NODES.map((node, index) => {
                      const isSelected = index === activeNodeIndex;
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => setActiveNodeIndex(index)}
                          className={`text-left rounded-xl p-3.5 border transition-all duration-300 ${
                            isSelected
                              ? 'border-[#5b7cf0] bg-white shadow-sm'
                              : 'border-[#0b1d3a]/10 bg-white/50 hover:bg-white'
                          }`}
                        >
                          <div className="font-display text-sm font-semibold text-[#0b1d3a]">
                            {node.name}
                          </div>
                          <div className="text-xs text-[#3e4d68] mt-0.5">{node.role}</div>
                          <div className="mt-2 text-xs font-mono text-[#5b7cf0] font-semibold">
                            {node.metric}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="rounded-xl bg-[#0b1d3a] px-4 py-2.5 font-mono text-xs text-[#2fe0d0] flex items-center justify-between">
                    <span>{selectedSwarmNode.log}</span>
                    <span className="text-[#8fd5f1] hidden sm:inline">Live Agent Flow</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#0b1d3a]/8">
                <div className="flex flex-wrap items-center gap-3">
                  {procureLoop.github && (
                    <HaldenButton
                      href={procureLoop.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub Repo
                    </HaldenButton>
                  )}
                  <HaldenButton
                    variant="ghost"
                    onClick={() => setDrawerProject(procureLoop)}
                  >
                    Technical specs →
                  </HaldenButton>
                </div>
              </div>
            </TiltCard3D>
          </article>
        </HaldenFadeUp>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {otherProjects.map((project, idx) => {
          const simple = SIMPLE_COPY[project.id] || {
            title: project.title,
            badge: project.category,
            summary: project.description,
          };

          return (
            <HaldenFadeUp key={project.id} delay={idx * 0.08}>
              <article className="h-full">
                <TiltCard3D
                  glareColor="rgba(143, 213, 241, 0.35)"
                  className="spatial-glass rounded-3xl p-6 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase">
                        {simple.badge}
                      </span>
                      <span className="mono-accent text-xs text-[#3e4d68]">
                        {project.tech.slice(0, 2).join(' · ')}
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-semibold text-[#0b1d3a] mb-2">
                      {simple.title}
                    </h4>

                    <p className="text-sm text-[#3e4d68] mb-5 leading-relaxed">
                      {simple.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#0b1d3a]/8 flex items-center justify-between gap-3">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0b1d3a] hover:text-[#5b7cf0] transition-colors"
                      >
                        <span>View on GitHub</span>
                        <span>↗</span>
                      </a>
                    ) : (
                      <span />
                    )}

                    <HaldenButton onClick={() => setDrawerProject(project)}>
                      Tech specs
                    </HaldenButton>
                  </div>
                </TiltCard3D>
              </article>
            </HaldenFadeUp>
          );
        })}
      </div>

      <AnimatePresence>
        {drawerProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b1d3a]/40 backdrop-blur-sm p-4"
            onClick={() => setDrawerProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 0.7, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl border border-white bg-[#F8FAFC] p-6 sm:p-8 shadow-2xl space-y-5 text-[#0b1d3a]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase">
                    Technical Architecture &amp; Specs
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0b1d3a] mt-1">
                    {drawerProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerProject(null)}
                  className="mono-accent rounded-full border border-slate-300 bg-white px-3.5 py-1 text-xs font-semibold text-[#0b1d3a] hover:bg-slate-100"
                >
                  Close ✕
                </button>
              </div>

              <p className="text-sm text-[#3e4d68]">
                {drawerProject.description}
              </p>

              <div className="space-y-2">
                <div className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase">
                  Engineering Highlights
                </div>
                <ul className="space-y-2 text-sm text-[#0b1d3a]">
                  {drawerProject.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2fe0d0] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {drawerProject.tech.map(t => (
                  <span
                    key={t}
                    className="mono-accent rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-[#3e4d68]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
