'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { resumeData } from '@/data/resume';

/* ── Physics-Based Magnetic Button Primitive ── */
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}

export function MagneticButton({ children, className = '', onClick, href, external }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 14, mass: 0.18 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block transition-transform duration-150 active:scale-95 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className="inline-block">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}

export default function MotionFooter() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="motion-footer"
      className="relative w-full h-[720px] sm:h-[640px] lg:h-[580px] overflow-hidden"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* ── Fixed Curtain Reveal Layer ── */}
      <div className="fixed bottom-0 left-0 w-full h-[720px] sm:h-[640px] lg:h-[580px] z-0 bg-[#060c18] text-white flex flex-col justify-between overflow-hidden select-none">
        
        {/* ── Background Glows ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#2fe0d0] blur-[120px]"
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.12, 0.22, 0.12],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-28 -right-28 w-[520px] h-[520px] rounded-full bg-[#5b7cf0] blur-[140px]"
          />

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* ── Watermark: Properly Constrained & Unclipped ── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-12 flex justify-center items-center overflow-hidden px-4">
          <span className="font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold tracking-tight uppercase text-white/[0.035] whitespace-nowrap leading-none select-none">
            HARIPRIYA RAO
          </span>
        </div>

        {/* ── Main Content Container ── */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 sm:px-10 py-8 sm:py-10 flex-1 flex flex-col justify-between">
          
          {/* Header Block: Status Pill & Credible Action Statement */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.08] border border-white/15 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2fe0d0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2fe0d0]" />
              </span>
              <span className="text-xs sm:text-sm font-sans font-medium text-slate-200">
                Available for Founding &amp; Senior AI Roles &middot; Authorized to work in the US (H-1B)
              </span>
            </div>

            <div className="max-w-3xl">
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.03em] leading-[1.12]">
                Let&rsquo;s build production AI systems{' '}
                <span className="text-[#2fe0d0]">that fail safely.</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Specialized in multi-agent orchestration, deterministic evaluation harnesses, and sub-second task routing.
              </p>
            </div>
          </div>

          {/* Unified Contact Block (Single Location with High Contrast) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <MagneticButton>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group relative inline-flex items-center gap-3 h-12 px-6 rounded-full bg-white text-[#0b1d3a] hover:bg-[#8fe6f4] transition-all shadow-lg"
              >
                <span className="h-2 w-2 rounded-full bg-[#0d9488]" />
                <span className="font-display text-sm font-bold tracking-tight">
                  {copiedEmail ? 'Email Copied!' : 'haripriyaraov@gmail.com'}
                </span>
                <span className="text-xs font-mono text-slate-500 group-hover:text-[#0b1d3a] transition-colors">
                  {copiedEmail ? '✓ Copied' : 'Copy'}
                </span>
              </button>
            </MagneticButton>

            <MagneticButton href="/Haripriya_Rao_Resume.pdf" external>
              <span className="inline-flex items-center gap-2 h-12 px-5 rounded-full border border-white/20 bg-white/[0.08] hover:bg-white/[0.15] text-white backdrop-blur-md transition-all font-display text-sm font-semibold">
                <svg className="w-4 h-4 text-[#2fe0d0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume (PDF)
              </span>
            </MagneticButton>

            <MagneticButton href={`https://${resumeData.github}`} external>
              <span className="inline-flex items-center gap-1.5 h-12 px-4 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] text-slate-200 hover:text-white transition-all text-xs font-mono font-medium">
                GitHub ↗
              </span>
            </MagneticButton>

            <MagneticButton href={`https://${resumeData.linkedin}`} external>
              <span className="inline-flex items-center gap-1.5 h-12 px-4 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] text-slate-200 hover:text-white transition-all text-xs font-mono font-medium">
                LinkedIn ↗
              </span>
            </MagneticButton>
          </div>

          {/* Clean, Non-Repetitive Sitemap Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs sm:text-sm">
            <div>
              <div className="text-xs font-mono text-[#2fe0d0] font-bold uppercase tracking-wider mb-2.5">
                Architecture
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li><a href="#how-i-think" className="hover:text-white transition-colors">How I Think</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">Onetera Case Study</a></li>
                <li><a href="#daily-ai" className="hover:text-white transition-colors">Daily AI Production</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono text-[#2fe0d0] font-bold uppercase tracking-wider mb-2.5">
                Open Source
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li><a href="https://github.com/google-gemini/cookbook/pull/1088" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Gemini PR #1088 (Merged)</a></li>
                <li><a href="https://github.com/openai/openai-cookbook/pull/2568" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">OpenAI PR #2568 (Contributed)</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">AgentGauge &middot; Procure-Loop</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono text-[#2fe0d0] font-bold uppercase tracking-wider mb-2.5">
                Core Stack
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>LangGraph &middot; Claude SDK</li>
                <li>Redis Mutex &middot; ClickHouse</li>
                <li>Python &middot; TypeScript &middot; Next.js</li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono text-[#2fe0d0] font-bold uppercase tracking-wider mb-2.5">
                Credentials
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>Anthropic CCA-F Architect</li>
                <li>AWS AI Practitioner</li>
                <li>USC &middot; MS in Computer Science</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom Baseline: Clean Copyright & Back-to-Top Button ── */}
        <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-md px-6 sm:px-10 py-3.5 flex items-center justify-between text-xs text-slate-400">
          <div>
            &copy; 2026 {resumeData.name} &middot; Built with Next.js &amp; React Three Fiber
          </div>

          <MagneticButton onClick={scrollToTop}>
            <button
              type="button"
              aria-label="Back to top"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/20 text-slate-200 hover:text-white transition-all text-xs font-medium"
            >
              <span>Back to top</span>
              <span className="transform group-hover:-translate-y-0.5 transition-transform text-[#2fe0d0]">↑</span>
            </button>
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
}
