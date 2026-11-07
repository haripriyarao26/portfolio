'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HaldenButton, HaldenLetterReveal } from '@/components/HaldenMotion';

export type StackLayerId = 'frontend' | 'api' | 'data' | 'ai' | 'infra';

export interface StackLayer {
  id: StackLayerId;
  name: string;
  tag: string;
  color: string;
  accentBg: string;
  borderColor: string;
  skills: string[];
}

export const STACK_LAYERS: StackLayer[] = [
  {
    id: 'frontend',
    name: 'Front end',
    tag: 'UI & State',
    color: '#0284c7', // Sky-600
    accentBg: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    skills: ['React & Next.js', 'React', 'Next.js', 'TypeScript'],
  },
  {
    id: 'api',
    name: 'API',
    tag: 'Backend & Services',
    color: '#6366f1', // Indigo-500
    accentBg: 'rgba(99, 102, 241, 0.12)',
    borderColor: 'rgba(99, 102, 241, 0.4)',
    skills: ['Python', 'TypeScript', 'Schema Validation'],
  },
  {
    id: 'data',
    name: 'Data',
    tag: 'Persistence & Cache',
    color: '#d97706', // Amber-600
    accentBg: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
    skills: ['PostgreSQL', 'Redis', 'ClickHouse', 'Supabase'],
  },
  {
    id: 'ai',
    name: 'AI',
    tag: 'Agents & Evals',
    color: '#0d9488', // Teal-600
    accentBg: 'rgba(45, 212, 191, 0.15)',
    borderColor: 'rgba(45, 212, 191, 0.45)',
    skills: [
      'LangGraph',
      'Anthropic Claude SDK',
      'Claude SDK',
      'Google Gemini API',
      'Gemini API',
      'OpenAI API',
      'MCP',
      'LangChain',
      'Golden Dataset Evals',
      'A/B Testing',
      'Token compression',
    ],
  },
  {
    id: 'infra',
    name: 'Infrastructure',
    tag: 'Cloud & Deployments',
    color: '#9333ea', // Purple-600
    accentBg: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.4)',
    skills: ['AWS', 'CI/CD'],
  },
];

export interface UsageEntry {
  note: string;
  href: string;
  layer: StackLayerId;
}

export const USAGE_DATA: Record<string, UsageEntry> = {
  'LangGraph': {
    note: 'Built 22-node cyclic state machines for Onetera civic planning pipelines.',
    href: '#case-studies',
    layer: 'ai',
  },
  'Anthropic Claude SDK': {
    note: 'Tool-use agents, structured JSON parsing, and deterministic prompt guardrails.',
    href: '#case-studies',
    layer: 'ai',
  },
  'Claude SDK': {
    note: 'Tool-use agents, structured JSON parsing, and deterministic prompt guardrails.',
    href: '#case-studies',
    layer: 'ai',
  },
  'Google Gemini API': {
    note: 'Multimodal analysis; official Google Gemini Cookbook contributor (PR #1088).',
    href: 'https://github.com/google-gemini/cookbook/pull/1088',
    layer: 'ai',
  },
  'Gemini API': {
    note: 'Multimodal analysis; official Google Gemini Cookbook contributor (PR #1088).',
    href: 'https://github.com/google-gemini/cookbook/pull/1088',
    layer: 'ai',
  },
  'OpenAI API': {
    note: 'Production AI workflows and memory adapter hardening in Cookbook PR #2568.',
    href: 'https://github.com/openai/openai-cookbook/pull/2568',
    layer: 'ai',
  },
  'MCP': {
    note: 'Standardized Model Context Protocol server & client tools for AgentGauge.',
    href: '#projects',
    layer: 'ai',
  },
  'LangChain': {
    note: 'Deterministic AST salvage layer and schema post-processing adapters.',
    href: '#projects',
    layer: 'ai',
  },
  'Golden Dataset Evals': {
    note: '100+ annotated ground-truth test suites preventing model regression drift.',
    href: '#daily-ai',
    layer: 'ai',
  },
  'A/B Testing': {
    note: 'Statistical field-agreement scoring gating production model updates in CI.',
    href: '#daily-ai',
    layer: 'ai',
  },
  'Token compression': {
    note: 'Onetera TOON format cutting token payloads by 96% (200KB → 8KB).',
    href: '#case-studies',
    layer: 'ai',
  },
  'Schema Validation': {
    note: 'Deterministic AST schema recovery layer eliminating unhandled parser crashes.',
    href: '#case-studies',
    layer: 'api',
  },
  'Python': {
    note: 'AsyncIO concurrency engine (asyncio.gather) at Onetera cutting latency by 40%.',
    href: '#case-studies',
    layer: 'api',
  },
  'TypeScript': {
    note: 'Strict end-to-end type invariants across Next.js frontend and MCP services.',
    href: '#projects',
    layer: 'frontend',
  },
  'React & Next.js': {
    note: 'High-performance App Router interfaces with spatial glass and sub-second updates.',
    href: '#projects',
    layer: 'frontend',
  },
  'React': {
    note: 'Interactive client-side interfaces and responsive component systems.',
    href: '#projects',
    layer: 'frontend',
  },
  'Next.js': {
    note: 'Server-side rendering, API routes, and static asset pipelines.',
    href: '#projects',
    layer: 'frontend',
  },
  'PostgreSQL': {
    note: 'Multi-tenant relational schemas with pgvector semantic similarity search.',
    href: '#case-studies',
    layer: 'data',
  },
  'Redis': {
    note: 'Distributed mutex locking and token-bucket queues handling traffic bursts.',
    href: '#case-studies',
    layer: 'data',
  },
  'ClickHouse': {
    note: 'Columnar telemetry store for sub-second audit queries and log indexing.',
    href: '#case-studies',
    layer: 'data',
  },
  'Supabase': {
    note: 'Row-level security policies, PostgreSQL extensions, and real-time events.',
    href: '#case-studies',
    layer: 'data',
  },
  'AWS': {
    note: 'Containerized deployments on ECS Fargate, S3 storage, and CloudWatch metrics.',
    href: '#timeline-momentum',
    layer: 'infra',
  },
  'CI/CD': {
    note: 'Automated GitHub Actions test suites gating PRs on eval thresholds.',
    href: '#timeline-momentum',
    layer: 'infra',
  },
};

export const SKILL_CARDS = [
  {
    category: 'AI Agents & Models',
    badge: 'Orchestration',
    headline: 'Building multi-step AI assistants that use tools safely and reliably.',
    pills: ['LangGraph', 'Anthropic Claude SDK', 'Google Gemini API', 'OpenAI API', 'MCP', 'LangChain'],
  },
  {
    category: 'AI Testing & Accuracy',
    badge: 'Quality & Speed',
    headline: 'Automated testing pipelines measured against a golden dataset and fast responses.',
    pills: ['Golden Dataset Evals', 'A/B Testing', 'Token compression', 'Schema Validation'],
  },
  {
    category: 'Full-Stack & Cloud',
    badge: 'Production Infra',
    headline: 'Fast web apps, real-time dashboards, and cloud infrastructure with sub-second telemetry.',
    pills: ['Python', 'TypeScript', 'React & Next.js', 'PostgreSQL', 'Redis', 'ClickHouse', 'AWS'],
  },
];

interface SkillsToolkitProps {
  onOpenDrawer?: () => void;
}

export default function SkillsToolkit({ onOpenDrawer }: SkillsToolkitProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Active highlighted chip and hovered layer
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [activeLayerId, setActiveLayerId] = useState<StackLayerId | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Parallax Scroll Tracking for stack separation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  const stackZSeparation = useTransform(smoothProgress, [0.1, 0.6], [8, 32]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouchDevice(isTouch);
    }
  }, []);

  const handleChipSelect = (chip: string) => {
    setActiveChip(chip);
    const entry = USAGE_DATA[chip];
    if (entry) {
      setActiveLayerId(entry.layer);
    }
  };

  const handleChipDeselect = () => {
    setActiveChip(null);
    setActiveLayerId(null);
  };

  return (
    <section
      ref={containerRef}
      id="stack"
      className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24"
    >
      <div className="space-y-12">
        {/* ── Section Header ── */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#0b1d3a]/10 px-4 py-1.5 mb-4 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
              <span className="mono-accent text-xs tracking-[0.16em] text-[#1d2f4f] uppercase font-semibold">
                SKILLS &amp; TOOLKIT
              </span>
            </div>

            <HaldenLetterReveal
              as="h2"
              mode="scroll"
              spread={0.32}
              segments={[
                { text: 'Core production', highlight: false },
                { text: 'technologies.', highlight: true },
              ]}
              className="font-display text-3xl sm:text-5xl font-normal text-[#0b1d3a] tracking-[-0.03em]"
            />
          </div>

          {onOpenDrawer && (
            <HaldenButton onClick={onOpenDrawer}>
              Full Architectural Breakdown
            </HaldenButton>
          )}
        </div>

        {/* ── 1. The Three Glass Cards with 3D Depth Entrance & Layer Parallax ── */}
        <div className="grid gap-6 md:grid-cols-3">
          {SKILL_CARDS.map((card, cardIdx) => (
            <CardWithDepth
              key={card.category}
              card={card}
              cardIdx={cardIdx}
              activeChip={activeChip}
              shouldReduceMotion={shouldReduceMotion}
              isTouchDevice={isTouchDevice}
              onChipSelect={handleChipSelect}
              onChipDeselect={handleChipDeselect}
            />
          ))}
        </div>

        {/* ── 2. Layered Product Stack Visualizer (3D Glass Planes / Responsive List) ── */}
        <ProductStackView
          activeLayerId={activeLayerId}
          stackZSeparation={stackZSeparation}
          shouldReduceMotion={shouldReduceMotion}
          activeChip={activeChip}
          onLayerHover={(id) => setActiveLayerId(id)}
        />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Card Component with Pointer Tilt, Soft Glare, & 3 Floating Layers
   ───────────────────────────────────────────────────────────── */
interface CardProps {
  card: (typeof SKILL_CARDS)[0];
  cardIdx: number;
  activeChip: string | null;
  shouldReduceMotion: boolean | null;
  isTouchDevice: boolean;
  onChipSelect: (chip: string) => void;
  onChipDeselect: () => void;
}

function CardWithDepth({
  card,
  cardIdx,
  activeChip,
  shouldReduceMotion,
  isTouchDevice,
  onChipSelect,
  onChipDeselect,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6; // max ~6 deg
    const rY = ((x - centerX) / centerX) * 6;

    setTilt({ rotateX: rX, rotateY: rY });
    setGlare({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  // 1. Entrance animation: opacity 0->1, rotateX 20deg->0, translateZ -120px->0
  const entranceVariants = {
    hidden: {
      opacity: 0,
      rotateX: shouldReduceMotion ? 0 : 20,
      z: shouldReduceMotion ? 0 : -120,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      z: 0,
      transition: {
        duration: 0.6,
        delay: cardIdx * 0.12,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <div style={{ perspective: '1100px' }} className="h-full">
      <motion.div
        ref={cardRef}
        variants={entranceVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
              }
        }
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="spatial-glass rounded-3xl p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-visible border border-slate-200/90 shadow-[0_15px_35px_rgba(11,29,58,0.06)]"
      >
        {/* Layer 1: Background Tint & Soft Glare Highlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0 overflow-hidden"
          style={{
            transform: 'translateZ(0px)',
            opacity: glare.opacity,
            background: `radial-gradient(420px circle at ${glare.x}px ${glare.y}px, rgba(143, 213, 241, 0.35), transparent 70%)`,
          }}
        />

        {/* Layer 2: Text on flat, high-contrast surface with parallax offset */}
        <div
          className="relative z-10"
          style={{
            transform: shouldReduceMotion ? 'none' : 'translateZ(14px)',
          }}
        >
          <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase tracking-wider block mb-1">
            {card.badge}
          </span>
          <h3 className="font-display text-lg sm:text-xl font-bold text-[#0b1d3a] mb-2 leading-snug">
            {card.category}
          </h3>
          <p className="text-sm text-[#3e4d68] mb-6 leading-relaxed">
            {card.headline}
          </p>
        </div>

        {/* Layer 3: Interactive Chips floating forward in Z with 30ms pop-in stagger */}
        <div
          className="relative z-20 pt-4 border-t border-[#0b1d3a]/8 flex flex-wrap gap-2"
          style={{
            transform: shouldReduceMotion ? 'none' : 'translateZ(28px)',
          }}
        >
          {card.pills.map((pill, pillIdx) => {
            const isChipActive = activeChip === pill;
            const usageInfo = USAGE_DATA[pill];

            return (
              <div key={pill} className="relative">
                <motion.button
                  type="button"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: cardIdx * 0.12 + 0.2 + pillIdx * 0.03,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  onMouseEnter={() => onChipSelect(pill)}
                  onMouseLeave={onChipDeselect}
                  onFocus={() => onChipSelect(pill)}
                  onBlur={onChipDeselect}
                  onClick={() => {
                    if (isTouchDevice) {
                      if (isChipActive) {
                        onChipDeselect();
                      } else {
                        onChipSelect(pill);
                      }
                    }
                  }}
                  className={`relative rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#5b7cf0] focus-visible:ring-offset-2 ${
                    isChipActive
                      ? 'bg-[#0b1d3a] text-white shadow-md scale-105 border border-[#0b1d3a]'
                      : 'bg-white/85 text-[#0b1d3a] border border-[#0b1d3a]/12 hover:bg-white hover:border-[#5b7cf0]/50 hover:shadow-sm'
                  }`}
                >
                  <span>{pill}</span>
                </motion.button>

                {/* Accessible Tooltip with One-Line Note & Link */}
                {isChipActive && usageInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-64 sm:w-72 p-3 rounded-2xl bg-[#0b1d3a] text-white text-xs shadow-xl border border-white/10 pointer-events-auto"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-[#2fe0d0]">
                        <span className="uppercase tracking-wider">{pill} in production</span>
                        <span className="text-slate-400">Where I used it</span>
                      </div>
                      <p className="text-slate-200 leading-snug font-normal text-xs">
                        {usageInfo.note}
                      </p>
                      <div className="pt-1.5 border-t border-white/10 flex justify-end">
                        <a
                          href={usageInfo.href}
                          target={usageInfo.href.startsWith('http') ? '_blank' : undefined}
                          rel={usageInfo.href.startsWith('http') ? 'noreferrer' : undefined}
                          className="inline-flex items-center gap-1 font-semibold text-[#2fe0d0] hover:text-white hover:underline text-[11px]"
                        >
                          <span>View verified proof</span>
                          <span>→</span>
                        </a>
                      </div>
                    </div>

                    {/* Tooltip Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#0b1d3a]" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Product Stack View: 3D Layered Glass Planes & Responsive Fallback
   ───────────────────────────────────────────────────────────── */
interface ProductStackViewProps {
  activeLayerId: StackLayerId | null;
  stackZSeparation: any;
  shouldReduceMotion: boolean | null;
  activeChip: string | null;
  onLayerHover: (id: StackLayerId | null) => void;
}

function ProductStackView({
  activeLayerId,
  stackZSeparation,
  shouldReduceMotion,
  activeChip,
  onLayerHover,
}: ProductStackViewProps) {
  // Pre-calculate z offsets for all 5 layers at top-level to obey React hook rules
  const z0 = useTransform(stackZSeparation, (s: number) => (shouldReduceMotion ? 0 : 4 * s));
  const z1 = useTransform(stackZSeparation, (s: number) => (shouldReduceMotion ? 0 : 3 * s));
  const z2 = useTransform(stackZSeparation, (s: number) => (shouldReduceMotion ? 0 : 2 * s));
  const z3 = useTransform(stackZSeparation, (s: number) => (shouldReduceMotion ? 0 : 1 * s));
  const z4 = useTransform(stackZSeparation, (s: number) => (shouldReduceMotion ? 0 : 0 * s));
  const zOffsets = [z0, z1, z2, z3, z4];

  return (
    <div className="rounded-3xl bg-white/80 border border-slate-200/90 p-6 sm:p-10 shadow-[0_20px_50px_rgba(11,29,58,0.05)] backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 border-b border-slate-200/80 pb-5">
        <div>
          <span className="mono-accent text-xs font-semibold uppercase tracking-wider text-[#5b7cf0] block">
            End-to-End Architecture
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0b1d3a] mt-0.5">
            The Full-Product Engineering Stack
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-500">
          Hover or tap any chip above to highlight its layer
        </div>
      </div>

      {/* ── Desktop & Tablet 3D Isometric Glass Plane Stack (md and up) ── */}
      <div className="hidden md:block">
        <div
          style={{ perspective: '1200px' }}
          className="relative min-h-[360px] flex items-center justify-center py-6"
        >
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: shouldReduceMotion
                ? 'none'
                : 'rotateX(52deg) rotateZ(-24deg)',
            }}
            className="relative w-full max-w-2xl h-64 flex items-center justify-center transition-transform duration-500"
          >
            {STACK_LAYERS.map((layer, index) => {
              const isLayerActive = activeLayerId === layer.id;

              return (
                <motion.div
                  key={layer.id}
                  onMouseEnter={() => onLayerHover(layer.id)}
                  onMouseLeave={() => onLayerHover(null)}
                  style={{
                    transformStyle: 'preserve-3d',
                    z: zOffsets[index],
                    borderColor: isLayerActive ? layer.color : undefined,
                    boxShadow: isLayerActive
                      ? `0 20px 40px ${layer.color}30, 0 0 20px ${layer.color}20`
                      : undefined,
                  }}
                  className={`absolute inset-x-0 h-28 rounded-2xl p-4 transition-all duration-300 flex items-center justify-between shadow-lg cursor-pointer ${
                    isLayerActive
                      ? 'bg-white border-2 shadow-[0_20px_40px_rgba(11,29,58,0.18)] scale-[1.03]'
                      : 'bg-white/75 border border-slate-200/90 hover:bg-white/95 hover:border-slate-300'
                  }`}
                >
                  {/* Left Label */}
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm transition-transform duration-200"
                      style={{
                        backgroundColor: layer.color,
                        transform: isLayerActive ? 'scale(1.3)' : 'scale(1)',
                      }}
                    />
                    <div>
                      <div className="font-display font-bold text-sm text-[#0b1d3a] flex items-center gap-2">
                        <span>{layer.name}</span>
                        <span
                          className="mono-accent text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${layer.color}18`,
                            color: layer.color,
                          }}
                        >
                          {layer.tag}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 font-mono">
                        Layer 0{5 - index} &middot; Production Interface
                      </div>
                    </div>
                  </div>

                  {/* Right: Skills in this layer */}
                  <div className="flex flex-wrap gap-1.5 max-w-sm justify-end">
                    {layer.skills.slice(0, 4).map((skill) => {
                      const isSpecificChip = activeChip === skill;
                      return (
                        <span
                          key={skill}
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-md border transition-all ${
                            isSpecificChip
                              ? 'bg-[#0b1d3a] text-white border-[#0b1d3a] shadow-sm font-semibold'
                              : isLayerActive
                              ? 'bg-slate-100 text-[#0b1d3a] border-slate-300 font-semibold'
                              : 'bg-white/80 text-slate-600 border-slate-200'
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile Fallback: Simple Vertical Flat List (< 768px, no 3D) ── */}
      <div className="block md:hidden space-y-3">
        {STACK_LAYERS.map((layer, index) => {
          const isLayerActive = activeLayerId === layer.id;

          return (
            <div
              key={layer.id}
              onClick={() => onLayerHover(isLayerActive ? null : layer.id)}
              className={`p-4 rounded-2xl border transition-all duration-200 ${
                isLayerActive
                  ? 'bg-white border-2 shadow-md'
                  : 'bg-white/70 border-slate-200'
              }`}
              style={{
                borderColor: isLayerActive ? layer.color : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <span className="font-display font-bold text-sm text-[#0b1d3a]">
                    {layer.name}
                  </span>
                </div>
                <span
                  className="mono-accent text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${layer.color}15`,
                    color: layer.color,
                  }}
                >
                  {layer.tag}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {layer.skills.map((skill) => {
                  const isSpecificChip = activeChip === skill;
                  return (
                    <span
                      key={skill}
                      className={`text-xs px-2 py-0.5 rounded-md border font-medium ${
                        isSpecificChip
                          ? 'bg-[#0b1d3a] text-white border-[#0b1d3a]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
