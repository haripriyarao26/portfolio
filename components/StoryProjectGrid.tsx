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
  'agent-gauge': {
    title: 'AgentGauge: <15ms Task Complexity & Cost Router',
    badge: 'Agent Skill & MCP Server',
    summary:
      'Deterministic <15ms multi-agent router, MCP server, and VS Code extension that routes coding tasks to the optimal model tier and effort level (saving up to 96% on LLM inference) and tracks git diff survival.',
  },
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

          const previewImage = project.images && project.images[0];
          const logoImage = project.images && project.images.find(img => img.src.endsWith('.svg'));

          return (
            <HaldenFadeUp key={project.id} delay={idx * 0.08}>
              <article className="h-full">
                <TiltCard3D
                  glareColor="rgba(143, 213, 241, 0.35)"
                  className="spatial-glass rounded-3xl p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    {previewImage && (
                      <div className="relative w-full h-44 mb-4 rounded-2xl overflow-hidden border border-[#0b1d3a]/10 bg-[#040509] group/img">
                        <img
                          src={previewImage.src}
                          alt={previewImage.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          loading="lazy"
                        />
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#040509]/85 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#00F0FF] hover:bg-[#7C5CFF] hover:text-white transition-all shadow-md flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10F5A0] animate-pulse" />
                            <span>Live Demo ↗</span>
                          </a>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase">
                        {simple.badge}
                      </span>
                      <span className="mono-accent text-xs text-[#3e4d68]">
                        {project.tech.slice(0, 2).join(' · ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mb-2">
                      {logoImage && (
                        <img
                          src={logoImage.src}
                          alt="Logo"
                          className="w-7 h-7 rounded-lg shrink-0 object-contain shadow-sm"
                        />
                      )}
                      <h4 className="font-display text-lg font-semibold text-[#0b1d3a]">
                        {simple.title}
                      </h4>
                    </div>

                    <p className="text-sm text-[#3e4d68] mb-5 leading-relaxed">
                      {simple.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#0b1d3a]/8 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0b1d3a] hover:text-[#5b7cf0] transition-colors"
                        >
                          <span>View on GitHub</span>
                          <span>↗</span>
                        </a>
                      )}
                      {project.demo && !previewImage && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2fe0d0] hover:text-[#5b7cf0] transition-colors"
                        >
                          <span>Live Demo</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>

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
            className="fixed inset-0 z-[100] flex items-center justify-end bg-[#0b1d3a]/60 backdrop-blur-md"
            onClick={() => setDrawerProject(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 0.7, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative h-full w-full max-w-2xl overflow-y-auto bg-white p-6 sm:p-10 shadow-2xl text-[#0b1d3a] flex flex-col"
            >
              {/* Sticky Top Header with Clean Close Button */}
              <div className="sticky -top-6 sm:-top-10 -mx-6 sm:-mx-10 px-6 sm:px-10 py-5 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-start justify-between gap-4 z-10 mb-6">
                <div className="flex items-center gap-3">
                  {drawerProject.images && drawerProject.images.find(img => img.src.endsWith('.svg')) && (
                    <img
                      src={drawerProject.images.find(img => img.src.endsWith('.svg'))!.src}
                      alt="Logo"
                      className="w-10 h-10 rounded-xl shrink-0 object-contain shadow-sm"
                    />
                  )}
                  <div>
                    <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase tracking-wider">
                      Technical Architecture &amp; Specs
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0b1d3a] mt-0.5 leading-snug">
                      {drawerProject.title}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerProject(null)}
                  aria-label="Close drawer"
                  className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-[#0b1d3a] hover:bg-slate-100 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>

              {drawerProject.images && drawerProject.images[0] && (
                <div className="rounded-2xl overflow-hidden border border-[#0b1d3a]/10 bg-[#040509] shadow-inner">
                  <img
                    src={drawerProject.images[0].src}
                    alt={drawerProject.images[0].alt}
                    className="w-full h-auto max-h-72 object-cover"
                  />
                  {drawerProject.images[0].caption && (
                    <div className="px-4 py-2 bg-[#060812] border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-300">
                      <span>{drawerProject.images[0].caption}</span>
                      {drawerProject.demo && (
                        <a
                          href={drawerProject.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#00F0FF] hover:underline flex items-center gap-1"
                        >
                          <span>Open Live Demo</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}

              <p className="text-sm text-[#3e4d68] leading-relaxed">
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

              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200">
                {drawerProject.github && (
                  <HaldenButton href={drawerProject.github} target="_blank" rel="noreferrer">
                    GitHub Repo ↗
                  </HaldenButton>
                )}
                {drawerProject.demo && (
                  <HaldenButton href={drawerProject.demo} target="_blank" rel="noreferrer" variant="ghost">
                    Launch Live Demo ↗
                  </HaldenButton>
                )}
                {(drawerProject.links ?? []).map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mono-accent text-xs font-semibold text-[#5b7cf0] hover:underline ml-2"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
