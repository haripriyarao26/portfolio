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
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} id="story" className="relative h-[95vh] flex items-center">
      <div className="relative w-full overflow-hidden">
        <motion.div
          style={{ opacity: titleOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 sm:px-10"
        >
          <motion.div
            style={{ y: layerOneY }}
            className="will-change-transform pointer-events-auto"
          >
            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="mono-accent rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 px-3.5 py-1 text-[11px] font-bold text-[var(--accent)] tracking-wider uppercase animate-pulse">
                Open to work
              </span>
              <span className="mono-accent rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-[11px] font-medium text-[var(--text-primary)]/80 tracking-wider uppercase">
                United States
              </span>
            </div>

            {/* Name + Title headline */}
            <h1 className="font-display font-extrabold leading-[1.1] text-[var(--text-primary)] text-4xl sm:text-6xl lg:text-[64px] max-w-4xl tracking-tight">
              AI Systems Engineer
              <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--accent)]">
                distributed backends, LangGraph, full-stack delivery
              </span>
            </h1>

            {/* Value Tagline */}
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-light">
              Ship products that feel inevitable.
            </p>

            {/* First Viewport Metrics */}
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl border-y border-white/10 py-6 my-2">
              <div>
                <p className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--accent)]">96%</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">Token Cost Cut</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--accent)]">40%</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">Latency Drop</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--accent)]">22</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-muted)] mt-1 font-medium">State Nodes</p>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn-primary">
                Hire me →
              </a>
              <a href="#projects" className="btn-secondary">
                View projects
              </a>
            </div>

            {/* Tech Stack Chips */}
            <div className="mt-10 pt-6 border-t border-white/5 max-w-xl">
              <p className="mono-accent text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-3">Core Stack</p>
              <div className="flex flex-wrap gap-2">
                {coreTech.map((tech) => (
                  <span
                    key={tech}
                    className="mono-accent rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--text-muted)] font-medium hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Secondary Social Links */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="https://github.com/haripriyarao26"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mono-accent"
              >
                GitHub →
              </Link>
              <Link
                href="https://linkedin.com/in/haripriya-rao"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mono-accent"
              >
                LinkedIn →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

