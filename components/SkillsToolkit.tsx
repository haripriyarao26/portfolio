'use client';

import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HaldenButton, HaldenLetterReveal } from '@/components/HaldenMotion';

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="stack"
      className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24"
    >
      <div className="space-y-12">
        {/* ── Section Header ── */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
              <span className="font-sans text-[13px] sm:text-[14px] font-medium text-[#5b7cf0] uppercase tracking-wider">
                Skills &amp; Architecture Toolkit
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

        {/* ── Three Glass Cards with 3D Depth Entrance & Layer Parallax ── */}
        <div className="grid gap-6 md:grid-cols-3">
          {SKILL_CARDS.map((card, cardIdx) => (
            <CardWithDepth
              key={card.category}
              card={card}
              cardIdx={cardIdx}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Card Component with Pointer Tilt, Soft Glare, & Subtle Depth
   ───────────────────────────────────────────────────────────── */
interface CardProps {
  card: (typeof SKILL_CARDS)[0];
  cardIdx: number;
  shouldReduceMotion: boolean | null;
}

function CardWithDepth({
  card,
  cardIdx,
  shouldReduceMotion,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
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

  // Entrance animation: opacity 0->1, rotateX 20deg->0, translateZ -120px->0
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

        {/* Layer 3: Tech skills as clean text separated by " · " (no tooltips) */}
        <div
          className="relative z-20 pt-4 border-t border-[#0b1d3a]/8 text-xs sm:text-sm font-sans text-[#334155] leading-relaxed"
          style={{
            transform: shouldReduceMotion ? 'none' : 'translateZ(28px)',
          }}
        >
          <span className="font-semibold text-[#0b1d3a] block mb-2 text-xs uppercase tracking-wider font-mono">
            Key Technologies
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:text-sm font-sans text-[#334155]">
            {card.pills.map((pill, pillIdx) => (
              <React.Fragment key={pill}>
                <span className="font-medium text-[#1d2f4f]">{pill}</span>
                {pillIdx < card.pills.length - 1 && (
                  <span className="text-slate-400 select-none">&middot;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
