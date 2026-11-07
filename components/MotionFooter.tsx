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

  // Physics spring for silky overshoot
  const springConfig = { stiffness: 220, damping: 14, mass: 0.18 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Magnetic pull distance
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

/* ── Marquee Items ── */
const MARQUEE_ITEMS = [
  'SENIOR AI & FOUNDING ENGINEER',
  'MULTI-AGENT ORCHESTRATION',
  '22-NODE CYCLIC LANGGRAPH DAG',
  'DETERMINISTIC EVALUATION HARNESSES',
  'AST SCHEMA RECOVERY LAYERS',
  'PROVENIR & CIVIC COLLABORATIONS',
  'GOOGLE GEMINI PR #1088 (MERGED)',
  'OPENAI COOKBOOK PR #2568 (CONTRIBUTED)',
  'AVAILABLE ACROSS THE UNITED STATES',
];

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
      className="relative w-full h-[760px] sm:h-[680px] lg:h-[620px] overflow-hidden"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      {/* ── Fixed Curtain Reveal Layer ── */}
      <div className="fixed bottom-0 left-0 w-full h-[760px] sm:h-[680px] lg:h-[620px] z-0 bg-[#060e1d] text-white flex flex-col justify-between overflow-hidden select-none">
        
        {/* ── Layer 1: Animated Aurora Glows ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top-Left Sky Cyan Bloom */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.18, 0.28, 0.18],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#2fe0d0] blur-[110px]"
          />

          {/* Bottom-Right Periwinkle Accent Bloom */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.24, 0.15],
              x: [0, -25, 0],
              y: [0, 15, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-28 -right-28 w-[520px] h-[520px] rounded-full bg-[#5b7cf0] blur-[130px]"
          />

          {/* Center Subtle Sky Bowl Bloom */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] rounded-full bg-[#8fd5f1] opacity-[0.06] blur-[120px]" />

          {/* ── Layer 2: Dynamic Engineering Dot Grid ── */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        {/* ── Layer 3: Giant Masked Background Typography ── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-12 sm:bottom-14 flex justify-center overflow-hidden">
          <span className="font-display text-[15vw] font-black tracking-[-0.05em] uppercase text-white/[0.03] whitespace-nowrap leading-none select-none">
            HARIPRIYA RAO
          </span>
        </div>

        {/* ── Top Ribbon: Infinite Cinematic Scrolling Marquee ── */}
        <div className="relative z-10 w-full border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-md py-3 overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#8fe6f4]/90 mono-accent">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="hover:text-white transition-colors cursor-default whitespace-nowrap">
                  {item}
                </span>
                <span className="text-[#2fe0d0] opacity-60">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Middle: Main Content Grid & Interactive Magnetic Pills ── */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 sm:px-10 py-6 sm:py-8 flex-1 flex flex-col justify-between">
          
          {/* Header Row: Status Indicator & Giant Action Statement */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] border border-white/12 px-3.5 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2fe0d0] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2fe0d0]" />
              </span>
              <span className="mono-accent text-[11px] uppercase tracking-[0.14em] text-[#8fe6f4]">
                AVAILABLE FOR FOUNDING AI &amp; SENIOR ROLES &middot; CAP-COUNTED H-1B READY &middot; UNITED STATES (REMOTE &amp; RELOCATION)
              </span>
            </div>

            <div className="max-w-3xl">
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-[-0.03em] leading-[1.12]">
                Let&rsquo;s build production AI systems{' '}
                <span className="text-[#8fe6f4]">that don&rsquo;t hallucinate.</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
                Specialized in multi-agent orchestration, deterministic evaluation harnesses, and sub-second task routing.
              </p>
            </div>
          </div>

          {/* Interactive CTAs with Physics-Based Magnetic Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {/* Magnetic Email CTA with Glowing Dot */}
            <MagneticButton>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group relative inline-flex items-center gap-3 h-12 px-6 rounded-full bg-white text-[#0b1d3a] hover:bg-[#8fe6f4] transition-all shadow-[0_10px_25px_-8px_rgba(47,224,208,0.4)]"
              >
                <span className="h-2 w-2 rounded-full bg-[#2fe0d0] shadow-[0_0_8px_#2fe0d0]" />
                <span className="font-display text-sm font-semibold tracking-tight">
                  {copiedEmail ? 'Email Copied to Clipboard!' : `Email ${resumeData.name}`}
                </span>
                <span className="mono-accent text-xs text-slate-500 group-hover:text-[#0b1d3a] transition-colors">
                  {copiedEmail ? '✓ Ready' : 'haripriyaraov@gmail.com'}
                </span>
              </button>
            </MagneticButton>

            {/* Magnetic Resume PDF CTA */}
            <MagneticButton href="/Haripriya_Rao_Resume.pdf" external>
              <span className="inline-flex items-center gap-2 h-12 px-5 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] text-white backdrop-blur-md transition-all font-display text-sm font-medium">
                <svg className="w-4 h-4 text-[#8fe6f4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume (PDF)
              </span>
            </MagneticButton>

            {/* Magnetic External Links: GitHub & LinkedIn */}
            <MagneticButton href={`https://${resumeData.github}`} external>
              <span className="inline-flex items-center gap-1.5 h-12 px-4 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-white/80 hover:text-white transition-all text-xs mono-accent">
                GitHub ↗
              </span>
            </MagneticButton>

            <MagneticButton href={`https://${resumeData.linkedin}`} external>
              <span className="inline-flex items-center gap-1.5 h-12 px-4 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-white/80 hover:text-white transition-all text-xs mono-accent">
                LinkedIn ↗
              </span>
            </MagneticButton>

            <MagneticButton href="https://github.com/google-gemini/cookbook/pull/1088" external>
              <span className="hidden sm:inline-flex items-center gap-1.5 h-12 px-4 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-[#8fe6f4] hover:text-white transition-all text-xs mono-accent">
                Gemini PR #1088 ↗
              </span>
            </MagneticButton>
          </div>

          {/* Quick Technical Architecture Sitemap */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08] text-xs">
            <div>
              <div className="mono-accent text-[11px] text-[#8fe6f4] font-semibold uppercase tracking-wider mb-2">
                Proven Impact
              </div>
              <ul className="space-y-1 text-white/60">
                <li><a href="#case-studies" className="hover:text-white transition-colors">96% Token Cut (TOON)</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">0-to-1 Founding &amp; Provenir</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">40% Turn Latency Drop</a></li>
              </ul>
            </div>

            <div>
              <div className="mono-accent text-[11px] text-[#8fe6f4] font-semibold uppercase tracking-wider mb-2">
                Open Source &amp; Code
              </div>
              <ul className="space-y-1 text-white/60">
                <li><a href="https://github.com/openai/openai-cookbook/pull/2568" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">OpenAI PR #2568</a></li>
                <li><a href="https://github.com/google-gemini/cookbook/pull/1088" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Gemini PR #1088</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">AgentGauge &middot; Procure-Loop</a></li>
              </ul>
            </div>

            <div>
              <div className="mono-accent text-[11px] text-[#8fe6f4] font-semibold uppercase tracking-wider mb-2">
                Core Stack
              </div>
              <ul className="space-y-1 text-white/60">
                <li>LangGraph &middot; Claude SDK</li>
                <li>Redis Mutex &middot; ClickHouse</li>
                <li>Python &middot; TypeScript &middot; Next.js</li>
              </ul>
            </div>

            <div>
              <div className="mono-accent text-[11px] text-[#8fe6f4] font-semibold uppercase tracking-wider mb-2">
                Credentials
              </div>
              <ul className="space-y-1 text-white/60">
                <li>Anthropic CCA-F Certified</li>
                <li>AWS AI Practitioner</li>
                <li>USC &middot; MS in Computer Science</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom Baseline: Copyright & Magnetic Back-to-Top Button ── */}
        <div className="relative z-10 w-full border-t border-white/[0.08] bg-black/30 backdrop-blur-md px-6 sm:px-10 py-4 flex items-center justify-between text-xs text-white/50 mono-accent">
          <div>
            &copy; 2026 {resumeData.name} &middot; Designed &amp; Built by Haripriya Rao &middot; Built with Next.js &amp; React Three Fiber
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-white/40">Available across the United States</span>
            <MagneticButton onClick={scrollToTop}>
              <button
                type="button"
                aria-label="Back to top"
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/15 text-white transition-all text-xs"
              >
                <span>Back to top</span>
                <span className="transform group-hover:-translate-y-0.5 transition-transform text-[#2fe0d0]">↑</span>
              </button>
            </MagneticButton>
          </div>
        </div>

      </div>
    </footer>
  );
}

