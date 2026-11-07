'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { TiltCard3D } from '@/components/ReactBits3D';
import { HaldenButton, HaldenFadeUp } from '@/components/HaldenMotion';

type StoryProjectGridProps = {
  projects: Project[];
};

export function getAssetUrl(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  const clean = src.startsWith('/') ? src : `/${src}`;

  // If in browser, detect whether GitHub Pages subpath (/portfolio) is active
  if (typeof window !== 'undefined') {
    const isGitHubPages =
      window.location.hostname.includes('github.io') ||
      window.location.pathname.startsWith('/portfolio');
    if (isGitHubPages) {
      return clean.startsWith('/portfolio') ? clean : `/portfolio${clean}`;
    }
    return clean.replace(/^\/portfolio/, '');
  }

  // Build time (Static HTML Export)
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && !clean.startsWith('/portfolio')) {
    return `/portfolio${clean}`;
  }
  return clean;
}

const GAUGE_TASKS = [
  {
    id: 'task-simple',
    name: '1. CSS & Copy Fix',
    desc: 'Minor modal styling adjustment',
    intent: 8,
    blast: 4,
    ast: 2,
    risk: 0,
    total: 14,
    tier: 'Fast Tier (Haiku 3.5 / Flash Low)',
    tierColor: '#10B981',
    metric: 'Score: 14 · -96% Cost',
    log: '[AgentGauge <15ms] Intent: 8 · Blast: 4 · AST: 2 · Risk: 0 → Score 14/100 → Routed to Fast Tier (Flash/Haiku Low). Instant latency.',
  },
  {
    id: 'task-medium',
    name: '2. API Auth Refactor',
    desc: 'Update token bucket & cache headers',
    intent: 22,
    blast: 14,
    ast: 10,
    risk: 2,
    total: 48,
    tier: 'Balanced Tier (Sonnet 3.7 / Argon Med)',
    tierColor: '#5b7cf0',
    metric: 'Score: 48 · 2x Speed',
    log: '[AgentGauge <15ms] Intent: 22 · Blast: 14 · AST: 10 · Risk: 2 → Score 48/100 → Routed to Balanced Tier (Sonnet Med). Standard verify.',
  },
  {
    id: 'task-complex',
    name: '3. Distributed State Mutex',
    desc: 'Resolve race conditions in 22-node DAG',
    intent: 35,
    blast: 28,
    ast: 18,
    risk: 11,
    total: 92,
    tier: 'Deep Tier (Opus 4 / Pro High · Plan-First)',
    tierColor: '#7C3AED',
    metric: 'Score: 92 · Deep Reasoning',
    log: '[AgentGauge <15ms] Intent: 35 · Blast: 28 · AST: 18 · Risk: 11 → Score 92/100 → Routed to Deep Tier (Opus High). Mandatory plan-first.',
  },
];

const SIMPLE_COPY: Record<string, { title: string; summary: string; badge: string }> = {
  'agent-gauge': {
    title: 'AgentGauge: <15ms Task Complexity & Cost Router',
    badge: 'Flagship Agent Infrastructure',
    summary:
      'Deterministic <15ms multi-agent router, MCP server, and VS Code extension that routes coding tasks across 4 dimensions to the optimal model tier and effort level (saving up to 96% on LLM inference) with git diff survival telemetry.',
  },
  'procure-loop': {
    title: 'Procure-Loop: AI Contract & License Savings Agent',
    badge: 'Multi-Agent Workflow',
    summary:
      'A 3-agent LangGraph system that audits enterprise software contracts, checks Okta seat utilization, and automatically drafts cancellation notices before auto-renewal.',
  },
  'gemini-cookbook': {
    title: 'Google Gemini Official Cookbook (Merged PR #1088)',
    badge: 'Merged by Google Maintainers',
    summary:
      'Reviewed and merged by Google engineers into the official Gemini repository. Adds automatic retry handling, rate-limit backoff, and real-time dollar cost tracking.',
  },
  'openai-cookbook-langchain-rwmh': {
    title: 'OpenAI Official Cookbook (PR #2568)',
    badge: 'OpenAI Ecosystem',
    summary:
      'Security and reliability contribution for production AI workflows, preventing chat history poisoning and hardening memory adapters.',
  },
  'auto-unit-agent': {
    title: 'Auto-Unit Agent: Self-Healing Test Generator',
    badge: 'Developer Tool',
    summary:
      'Autonomous agent with OS-level sandboxing that executes, validates, and self-repairs broken Jest test suites, reducing manual maintenance time by ~25%.',
  },
  'dev-log-architect': {
    title: 'Dev-Log Architect: Automated Release Notes',
    badge: 'Developer Tool',
    summary:
      'VS Code / Cursor extension that analyzes AST diffs and git commits to synthesize structured architecture case studies and Mermaid diagrams.',
  },
};

export default function StoryProjectGrid({ projects }: StoryProjectGridProps) {
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [drawerProject, setDrawerProject] = useState<Project | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTaskIndex(prev => (prev + 1) % GAUGE_TASKS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const agentGauge = projects.find(p => p.id === 'agent-gauge') || projects[0];
  const otherProjects = projects.filter(p => p.id !== 'agent-gauge');
  const selectedTask = GAUGE_TASKS[activeTaskIndex] || GAUGE_TASKS[0];

  return (
    <div className="space-y-6">
      {/* ── BIG FLAGSHIP PROJECT: AGENTGAUGE ── */}
      {agentGauge && (
        <HaldenFadeUp>
          <article id="project-flagship-agentgauge">
            <TiltCard3D
              intensity={4}
              glareColor="rgba(143, 213, 241, 0.35)"
              className="spatial-glass rounded-3xl p-6 sm:p-8"
            >
              <div>
                {/* Top Badge & Tech Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="mono-accent px-3 py-1 rounded-full bg-[#0b1d3a] text-[#FFFFFF] text-xs font-semibold">
                      {SIMPLE_COPY['agent-gauge'].badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-semibold mono-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      &lt;15ms Router SLA
                    </span>
                  </div>
                  <span className="mono-accent text-xs text-[#5b7cf0] font-semibold">
                    TypeScript &middot; MCP Server &middot; VS Code &middot; Next.js 15
                  </span>
                </div>

                {/* Headline & High-Signal Pitch */}
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0b1d3a] mb-2">
                  {SIMPLE_COPY['agent-gauge'].title}
                </h3>

                <p className="text-sm sm:text-base text-[#3e4d68] max-w-4xl mb-6 leading-relaxed">
                  {SIMPLE_COPY['agent-gauge'].summary}
                </p>

                {/* Two-Column Showcase: Interactive Scorer on Left + Live Demo Preview on Right */}
                <div className="grid lg:grid-cols-12 gap-6 mb-6">
                  {/* Left (7 Cols): Interactive 4-Dimension Task Scorer Simulator */}
                  <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-4 shadow-inner">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="mono-accent text-xs font-semibold text-[#0b1d3a] uppercase tracking-wide">
                          Live 4-Dimension Task Scorer (<span className="text-[#5b7cf0]">&lt;15ms SLA</span>)
                        </span>
                        <span
                          className="mono-accent text-xs font-semibold px-2.5 py-0.5 rounded-md"
                          style={{
                            color: selectedTask.tierColor,
                            backgroundColor: `${selectedTask.tierColor}15`,
                          }}
                        >
                          {selectedTask.tier}
                        </span>
                      </div>

                      {/* 3 Interactive Clickable Test Scenarios */}
                      <div className="grid gap-2 sm:grid-cols-3 mb-4">
                        {GAUGE_TASKS.map((task, index) => {
                          const isSelected = index === activeTaskIndex;
                          return (
                            <button
                              key={task.id}
                              type="button"
                              onClick={() => setActiveTaskIndex(index)}
                              className={`text-left rounded-xl p-3 border transition-all duration-300 ${
                                isSelected
                                  ? 'border-[#5b7cf0] bg-white shadow-sm ring-1 ring-[#5b7cf0]/20'
                                  : 'border-[#0b1d3a]/10 bg-white/50 hover:bg-white'
                              }`}
                            >
                              <div className="font-display text-xs font-semibold text-[#0b1d3a]">
                                {task.name}
                              </div>
                              <div className="text-[11px] text-[#3e4d68] mt-0.5 truncate">{task.desc}</div>
                              <div className="mt-2 text-[11px] font-mono text-[#5b7cf0] font-semibold">
                                {task.metric}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* 4 Dimension Breakdown Visual Meters */}
                      <div className="space-y-2 mb-3 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60 text-xs">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div>
                            <div className="flex justify-between text-[11px] mono-accent text-[#3e4d68]">
                              <span>Intent</span>
                              <span className="font-semibold text-[#0b1d3a]">{selectedTask.intent}/35</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-[#5b7cf0] rounded-full transition-all duration-500"
                                style={{ width: `${(selectedTask.intent / 35) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] mono-accent text-[#3e4d68]">
                              <span>Blast Radius</span>
                              <span className="font-semibold text-[#0b1d3a]">{selectedTask.blast}/30</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-[#2fe0d0] rounded-full transition-all duration-500"
                                style={{ width: `${(selectedTask.blast / 30) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] mono-accent text-[#3e4d68]">
                              <span>AST Struct</span>
                              <span className="font-semibold text-[#0b1d3a]">{selectedTask.ast}/20</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                style={{ width: `${(selectedTask.ast / 20) * 100}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] mono-accent text-[#3e4d68]">
                              <span>Repo Risk</span>
                              <span className="font-semibold text-[#0b1d3a]">{selectedTask.risk}/15</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-rose-500 rounded-full transition-all duration-500"
                                style={{ width: `${(selectedTask.risk / 15) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Monospace Telemetry Banner */}
                    <div className="rounded-xl bg-[#0b1d3a] px-3.5 py-2.5 font-mono text-xs text-[#2fe0d0] flex items-center justify-between overflow-x-auto">
                      <span className="truncate mr-2">{selectedTask.log}</span>
                      <span className="text-[#8fd5f1] shrink-0 text-[10px] uppercase font-semibold">
                        Real-time Telemetry
                      </span>
                    </div>
                  </div>

                  {/* Right (5 Cols): Visual Demo Screenshot / GIF with Live Demo Pill */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div className="relative w-full h-56 lg:h-full min-h-[220px] rounded-2xl overflow-hidden border border-[#0b1d3a]/12 bg-[#040509] group shadow-inner">
                      <img
                        src={getAssetUrl('/projects/agent-gauge-demo.gif')}
                        alt="AgentGauge Live Telemetry & 4-Dimension Task Router"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (!img.dataset.tried) {
                            img.dataset.tried = 'true';
                            if (img.src.includes('/portfolio/')) {
                              img.src = img.src.replace('/portfolio/', '/');
                            } else {
                              try {
                                const u = new URL(img.src);
                                img.src = `${u.origin}/portfolio${u.pathname}`;
                              } catch {
                                img.src = '/portfolio/projects/agent-gauge-demo.gif';
                              }
                            }
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040509]/80 via-transparent to-transparent pointer-events-none" />

                      {/* Live Demo floating button */}
                      <a
                        href="https://agent-gauge.github.io/agent-gauge/"
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#040509]/85 backdrop-blur-md border border-white/20 text-xs font-mono text-[#00F0FF] hover:bg-[#5b7cf0] hover:text-white transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2fe0d0] animate-pulse" />
                        <span>Live Demo ↗</span>
                      </a>

                      {/* Bottom caption overlay */}
                      <div className="absolute bottom-3 left-3 right-3 text-xs text-white/80 font-mono flex items-center justify-between">
                        <span>skills.sh &middot; MCP &middot; VS Code</span>
                        <span className="text-[#2fe0d0]">4 Distribution Channels</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#0b1d3a]/8">
                <div className="flex flex-wrap items-center gap-3">
                  <HaldenButton
                    href="https://agent-gauge.github.io/agent-gauge/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Launch Live Demo ↗
                  </HaldenButton>

                  <HaldenButton
                    href={agentGauge.github || 'https://github.com/Agent-Gauge/agent-gauge'}
                    target="_blank"
                    rel="noreferrer"
                    variant="ghost"
                  >
                    GitHub Repo ↗
                  </HaldenButton>

                  <a
                    href="https://github.com/Agent-Gauge/agent-gauge/releases"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#5b7cf0] hover:underline px-2"
                  >
                    <span>VS Code Extension (VSIX) ↗</span>
                  </a>
                </div>

                <HaldenButton
                  variant="ghost"
                  onClick={() => setDrawerProject(agentGauge)}
                >
                  Technical specs →
                </HaldenButton>
              </div>
            </TiltCard3D>
          </article>
        </HaldenFadeUp>
      )}

      {/* ── OTHER PROJECTS IN GRID (INCLUDING PROCURE-LOOP) ── */}
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
                          src={getAssetUrl(previewImage.src)}
                          alt={previewImage.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.src.includes('/portfolio/')) {
                              target.src = `/portfolio${previewImage.src.startsWith('/') ? previewImage.src : `/${previewImage.src}`}`;
                            }
                          }}
                        />
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#040509]/85 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#00F0FF] hover:bg-[#5b7cf0] hover:text-white transition-all shadow-md flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2fe0d0] animate-pulse" />
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
                        {project.tech.slice(0, 3).join(' · ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mb-2">
                      {logoImage && (
                        <img
                          src={getAssetUrl(logoImage.src)}
                          alt=""
                          className="w-7 h-7 rounded-lg shrink-0 object-contain shadow-sm"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.tried) {
                              target.dataset.tried = 'true';
                              if (target.src.includes('/portfolio/')) {
                                target.src = target.src.replace('/portfolio/', '/');
                              } else {
                                target.src = `/portfolio${logoImage.src.startsWith('/') ? logoImage.src : `/${logoImage.src}`}`;
                              }
                            } else {
                              target.style.display = 'none';
                            }
                          }}
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

      {/* ── TECHNICAL ARCHITECTURE DRAWER MODAL ── */}
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
                  {drawerProject.id === 'agent-gauge' ? (
                    <div className="w-10 h-10 rounded-xl bg-[#0b1d3a] border border-[#5b7cf0]/30 flex items-center justify-center shrink-0 shadow-sm text-[#2fe0d0]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                  ) : drawerProject.images && drawerProject.images.find(img => img.src.endsWith('.svg')) ? (
                    <img
                      src={getAssetUrl(drawerProject.images.find(img => img.src.endsWith('.svg'))!.src)}
                      alt="Logo"
                      className="w-10 h-10 rounded-xl shrink-0 object-contain shadow-sm"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                      }}
                    />
                  ) : null}
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
                <div className="rounded-2xl overflow-hidden border border-[#0b1d3a]/15 bg-[#070913] shadow-xl mb-6">
                  {/* Clean, Full-Width Animated Demo GIF */}
                  <div className="relative w-full aspect-[16/9] bg-[#070913] flex items-center justify-center overflow-hidden">
                    <img
                      src={getAssetUrl(drawerProject.images[0].src)}
                      alt={drawerProject.images[0].alt || drawerProject.title}
                      className="w-full h-full object-contain block"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.tried) {
                          img.dataset.tried = 'true';
                          if (img.src.includes('/portfolio/')) {
                            img.src = img.src.replace('/portfolio/', '/');
                          } else {
                            img.src = `/portfolio${drawerProject.images[0].src.startsWith('/') ? drawerProject.images[0].src : `/${drawerProject.images[0].src}`}`;
                          }
                        }
                      }}
                    />
                  </div>

                  {drawerProject.images[0].caption && (
                    <div className="px-4 py-3 bg-[#0a0d1a] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                        <span>{drawerProject.images[0].caption}</span>
                      </span>
                      {drawerProject.demo && (
                        <a
                          href={drawerProject.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#00F0FF] hover:underline font-semibold flex items-center gap-1 ml-auto"
                        >
                          <span>Open Live Demo</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}

              <p className="text-sm text-[#3e4d68] leading-relaxed mb-6">
                {drawerProject.description}
              </p>

              <div className="space-y-2 mb-6">
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

              <div className="flex flex-wrap gap-2 pt-2 mb-6">
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
