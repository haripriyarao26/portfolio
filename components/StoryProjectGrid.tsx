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
  const [activeGaugeGif, setActiveGaugeGif] = useState<'router' | 'rag'>('router');
  const [drawerMediaTab, setDrawerMediaTab] = useState<'router' | 'rag'>('router');
  const [showMoreProjects, setShowMoreProjects] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTaskIndex(prev => (prev + 1) % GAUGE_TASKS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const agentGauge = projects.find(p => p.id === 'agent-gauge') || projects[0];
  const gemini = projects.find(p => p.id === 'gemini-cookbook');
  const restProjects = projects.filter(
    p => p.id !== 'agent-gauge' && p.id !== 'gemini-cookbook'
  );
  const selectedTask = GAUGE_TASKS[activeTaskIndex] || GAUGE_TASKS[0];

  const renderCard = (project: Project) => {
    const simple = SIMPLE_COPY[project.id] || {
      title: project.title,
      badge: project.category,
      summary: project.description,
    };

    const previewImage = project.images && project.images[0];
    const logoImage = project.images && project.images.find(img => img.src.endsWith('.svg'));

    return (
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
    );
  };

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

                  {/* Right (5 Cols): Dual GIF Demo with Interactive Switcher */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    {/* GIF Switcher Controls */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 border border-slate-200/70">
                        <button
                          type="button"
                          onClick={() => setActiveGaugeGif('router')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                            activeGaugeGif === 'router'
                              ? 'bg-white text-[#0b1d3a] shadow-sm'
                              : 'text-[#64748B] hover:text-[#0b1d3a]'
                          }`}
                        >
                          ⚡ 3D Router
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveGaugeGif('rag')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                            activeGaugeGif === 'rag'
                              ? 'bg-white text-[#0b1d3a] shadow-sm'
                              : 'text-[#64748B] hover:text-[#0b1d3a]'
                          }`}
                        >
                          💡 RAG CLI
                        </button>
                      </div>
                      <span className="mono-accent text-[11px] font-semibold text-[#5b7cf0]">
                        {activeGaugeGif === 'router' ? '<15ms Web UI' : '<2ms Pre-Flight'}
                      </span>
                    </div>

                    <div className="relative w-full rounded-2xl overflow-hidden border border-[#0b1d3a]/12 bg-[#060813] shadow-inner flex items-center justify-center p-1">
                      <img
                        key={activeGaugeGif}
                        src={getAssetUrl(
                          activeGaugeGif === 'router'
                            ? '/projects/agent-gauge-demo.gif'
                            : '/projects/rag-example.gif'
                        )}
                        alt={
                          activeGaugeGif === 'router'
                            ? 'AgentGauge Live Telemetry & 4-Dimension Task Router'
                            : 'AgentGauge Company Policy RAG Pre-Flight Router & Escalation'
                        }
                        className="w-full h-auto max-h-[260px] object-contain rounded-xl"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (!img.dataset.tried) {
                            img.dataset.tried = 'true';
                            const targetPath =
                              activeGaugeGif === 'router'
                                ? '/projects/agent-gauge-demo.gif'
                                : '/projects/rag-example.gif';
                            if (img.src.includes('/portfolio/')) {
                              img.src = img.src.replace('/portfolio/', '/');
                            } else {
                              try {
                                const u = new URL(img.src);
                                img.src = `${u.origin}/portfolio${u.pathname}`;
                              } catch {
                                img.src = `/portfolio${targetPath}`;
                              }
                            }
                          }
                        }}
                      />
                    </div>

                    {/* Clean caption bar below image */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-2 px-1">
                      <span>
                        {activeGaugeGif === 'router'
                          ? 'skills.sh · MCP · VS Code · Next.js'
                          : 'RAG Pipeline: 99% quota saved · 4k shield'}
                      </span>
                      <span className="text-[#5b7cf0] font-semibold">5 Channels</span>
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

      {/* ── SECOND FEATURED PROJECT: GOOGLE GEMINI COOKBOOK (MERGED PR #1088) ── */}
      {gemini && (
        <HaldenFadeUp delay={0.08}>
          <div className="w-full">
            {renderCard(gemini)}
          </div>
        </HaldenFadeUp>
      )}

      {/* ── INTERACTIVE TOGGLE: "CLICK TO SEE MORE PROJECTS" ── */}
      {restProjects.length > 0 && (
        <div className="flex justify-center pt-2 pb-2">
          <button
            type="button"
            onClick={() => setShowMoreProjects(!showMoreProjects)}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/90 hover:bg-white border border-[#0b1d3a]/15 text-[#0b1d3a] shadow-sm hover:shadow-md transition-all font-display text-sm font-semibold active:scale-95"
          >
            <span>
              {showMoreProjects
                ? 'Show Fewer Projects'
                : `Click to See More Projects (${restProjects.length} More)`}
            </span>
            <motion.span
              animate={{ rotate: showMoreProjects ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-[#5b7cf0] font-bold text-base"
            >
              ↓
            </motion.span>
          </button>
        </div>
      )}

      {/* ── REST OF PROJECTS WITH 3D MOTIONS UPON APPEARANCE ── */}
      <AnimatePresence>
        {showMoreProjects && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              style={{ perspective: 1100 }}
              className="grid gap-5 md:grid-cols-2 pt-2"
            >
              {restProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35, rotateX: 18, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 25, rotateX: -15, scale: 0.94 }}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 22,
                    delay: idx * 0.08,
                  }}
                  className="h-full"
                >
                  {renderCard(project)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

              {/* Media Preview Container with Switcher for AgentGauge */}
              {drawerProject.id === 'agent-gauge' ? (
                <div className="rounded-2xl overflow-hidden border border-[#0b1d3a]/15 bg-[#070913] shadow-xl mb-6">
                  {/* Tab Bar Switcher for AgentGauge */}
                  <div className="px-4 py-2.5 bg-[#0a0d1a] border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/10 border border-white/10">
                      <button
                        type="button"
                        onClick={() => setDrawerMediaTab('router')}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                          drawerMediaTab === 'router'
                            ? 'bg-[#5b7cf0] text-white shadow-sm'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        ⚡ 3D Model Router (Web)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDrawerMediaTab('rag')}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                          drawerMediaTab === 'rag'
                            ? 'bg-[#5b7cf0] text-white shadow-sm'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        💡 Company Policy RAG (&lt;2ms CLI)
                      </button>
                    </div>
                    <span className="mono-accent text-[11px] text-[#2fe0d0]">
                      {drawerMediaTab === 'router'
                        ? '<15ms Web SLA · VS Code Status Pill'
                        : '<2ms Pre-Flight · 99% Quota Saved'}
                    </span>
                  </div>

                  {/* Clean Animated Demo Container */}
                  <div className="relative w-full aspect-[16/9] bg-[#070913] flex items-center justify-center overflow-hidden">
                    <img
                      key={drawerMediaTab}
                      src={getAssetUrl(
                        drawerMediaTab === 'router'
                          ? '/projects/agent-gauge-demo.gif'
                          : '/projects/rag-example.gif'
                      )}
                      alt={
                        drawerMediaTab === 'router'
                          ? 'AgentGauge Interactive 3D Model Router Demo'
                          : 'AgentGauge Company Policy RAG Pre-Flight Router Demo'
                      }
                      className="w-full h-full object-contain block"
                    />
                  </div>

                  {/* Interactive Caption Bar */}
                  <div className="px-4 py-3 bg-[#0a0d1a] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                      <span>
                        {drawerMediaTab === 'router'
                          ? 'Watching <15ms 4-dimension scoring flip from Haiku Low (Score 14) to Sonnet Med (Score 48) to Opus High (Score 92).'
                          : 'Pre-flight RAG task scoring in <2ms, 99% quota saved ($0.004 vs $0.73 on Opus High), 4k context shield, and auto-escalation on deadlock.'}
                      </span>
                    </span>
                    <a
                      href="https://agent-gauge.github.io/agent-gauge/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00F0FF] hover:underline font-semibold flex items-center gap-1 ml-auto"
                    >
                      <span>Open Live Demo</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              ) : drawerProject.images && drawerProject.images[0] ? (
                <div className="rounded-2xl overflow-hidden border border-[#0b1d3a]/15 bg-[#070913] shadow-xl mb-6">
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
              ) : null}

              <p className="text-sm text-[#3e4d68] leading-relaxed mb-6">
                {drawerProject.description}
              </p>

              {/* Special Walkthrough Section for AgentGauge: Company Policy RAG Case Study */}
              {drawerProject.id === 'agent-gauge' && (
                <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0b1d3a] border border-[#5b7cf0]/30 text-white shadow-lg space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="mono-accent text-xs font-semibold text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
                      <span>💡 Real-World Walkthrough: Company Policy RAG</span>
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#10F5A0] border border-emerald-500/40">
                      99% Quota Saved
                    </span>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="font-mono text-[#10F5A0] font-semibold">1. &lt;2ms Pre-Flight Score (0 Tokens)</div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        Intent (10/35) + Blast (4/30) + Struct (4/20) + Risk (1/15) = <strong>Score 19/100</strong> → Routes to <strong>FAST Tier (Flash / Haiku)</strong>.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="font-mono text-[#00F0FF] font-semibold">2. 99% AI Quota Saved</div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        Routed at <strong>$0.0040</strong> vs <strong>$0.7320</strong> on Opus High (23.8x faster) for chunker &amp; vector scaffolding.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="font-mono text-[#c4b5fd] font-semibold">3. Context Window Blast Shield</div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        Enforces a strict 4,000-token prompt budget &amp; &le;2 files, blocking agents from dumping 85,000 unneeded tokens.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="font-mono text-[#FF9E2C] font-semibold">4. Auto-Escalation on Deadlocks</div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        Triage for pgvector memory leaks jumps to <strong>86/100</strong> → Auto-escalates to <strong>DEEP Tier (Opus High · Plan-First)</strong>.
                      </p>
                    </div>
                  </div>

                  {/* 5 Channels Quick-Copy Command Badges */}
                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                    <span className="text-slate-400">Install via:</span>
                    <code className="px-2 py-0.5 rounded bg-black/40 text-[#00F0FF] border border-white/10">
                      npx skills add Agent-Gauge/agent-gauge
                    </code>
                    <code className="px-2 py-0.5 rounded bg-black/40 text-[#c4b5fd] border border-white/10">
                      npx agent-gauge pr-audit
                    </code>
                  </div>
                </div>
              )}

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
