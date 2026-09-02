'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const coreTech = ['LangGraph', 'TypeScript', 'Next.js', 'Python'];

type Props = { name: string; tagline: string };

export default function StoryCanvasSequence({ name, tagline }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end 45%'],
  });

  const layerOneY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

  return (
    <section ref={sectionRef} id="story" className="relative min-h-[100dvh] sm:h-[95vh] flex items-center pt-24 sm:pt-0">
      <div className="relative w-full overflow-hidden">
        <motion.div
          style={{ opacity: titleOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-10"
        >
          <motion.div
            style={{ y: layerOneY }}
            className="will-change-transform pointer-events-auto"
          >


            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="mono-accent rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 px-3.5 py-1 text-[11px] font-bold text-[var(--accent)] tracking-wider uppercase animate-pulse">
                Open to work
              </span>
              <span className="mono-accent rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-[11px] font-medium text-[var(--text-primary)]/80 tracking-wider uppercase">
                United States
              </span>
              <a
                href="https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile"
                target="_blank"
                rel="noreferrer"
                className="mono-accent rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 px-3.5 py-1 text-[11px] font-semibold text-[var(--accent)] tracking-wider uppercase transition-colors"
              >
                CCA-F · Anthropic ↗
              </a>
              <a
                href="https://www.credly.com/badges/898b89f1-5512-4d4a-8ba6-6a1597c7c510/public_url"
                target="_blank"
                rel="noreferrer"
                className="mono-accent rounded-full border border-white/20 bg-white/5 hover:border-[var(--accent)]/40 px-3.5 py-1 text-[11px] font-medium text-[var(--text-primary)]/80 tracking-wider uppercase transition-colors"
              >
                AWS AI Practitioner ↗
              </a>
            </div>

            {/* Title headline */}
            <h1 className="font-display font-extrabold leading-[1.05] text-[var(--text-primary)] text-4xl sm:text-6xl lg:text-[72px] max-w-4xl tracking-tight">
              Applied AI Product Engineer
              <span className="block mt-3 text-xl sm:text-3xl lg:text-4xl font-medium text-[var(--accent)]">
                Ship agents that feel inevitable.
              </span>
            </h1>

            {/* Value Tagline */}
            <p className="mt-5 max-w-3xl text-sm sm:text-base lg:text-[18px] text-[var(--text-muted)] leading-relaxed font-light">
              Building production-grade agentic systems, retrieval pipelines, and full-stack AI interfaces — from orchestration logic to user-facing product — for enterprise financial and civic infrastructure.
            </p>

            {/* First Viewport Metrics */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl border-y border-white/10 py-5 my-2">
              <div>
                <p className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--accent)]">96%</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">Token Cost Cut</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--accent)]">40%</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">Latency Drop</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--accent)]">22</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">State Nodes</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--accent)]">5K+</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">Concurrent Users</p>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                Start a Conversation →
              </a>
              <a href="#projects" className="btn-secondary">
                View projects
              </a>
            </div>

            {/* Spacing decluttering */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

