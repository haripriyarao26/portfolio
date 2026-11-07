'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import StoryCanvasSequence from '@/components/StoryCanvasSequence';
import StoryProjectGrid from '@/components/StoryProjectGrid';
import StoryTimeline from '@/components/StoryTimeline';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import Education from '@/components/Education';
import MotionFooter from '@/components/MotionFooter';
import HowIThinkExperience from '@/components/HowIThinkExperience';
import HowIUseAIDaily from '@/components/HowIUseAIDaily';
import { TiltCard3D } from '@/components/ReactBits3D';
import {
  HaldenButton,
  HaldenFadeUp,
  HaldenLetterReveal,
} from '@/components/HaldenMotion';
import { projects } from '@/data/projects';
import { resumeData } from '@/data/resume';

const Global3DScene = dynamic(() => import('@/components/Global3DScene'), {
  ssr: false,
});

const githubProfile = `https://${resumeData.github}`;

const depthStack = [
  {
    category: 'AI Agents & Models',
    badge: 'Orchestration',
    headline: 'Building multi-step AI assistants that use tools safely and reliably.',
    pills: ['LangGraph', 'Anthropic Claude SDK', 'Google Gemini API', 'OpenAI API', 'MCP', 'LangChain'],
    tech: [
      { name: 'LangGraph', role: '22-node cyclic state machines, conditional routing, checkpoint persistence' },
      { name: 'Anthropic API / Claude SDK', role: 'Tool-use agents, structured JSON parsing, prompt guardrails' },
      { name: 'Google Gemini API', role: 'Multimodal analysis, official Cookbook contributor (PR #1088)' },
      { name: 'Model Context Protocol (MCP)', role: 'Standardized server and client tool invocation protocols' },
    ],
  },
  {
    category: 'AI Testing & Accuracy',
    badge: 'Quality & Speed',
    headline: 'Automated testing pipelines that guarantee 95%+ accuracy and fast responses.',
    pills: ['Golden Dataset Evals', 'A/B Testing', 'Token Compression (-96%)', 'Schema Validation'],
    tech: [
      { name: 'Golden Dataset Evals', role: '100+ annotated ground-truth test suites for LLM extraction' },
      { name: 'A/B Regression Gating', role: 'Statistical field-agreement scoring (>95% threshold)' },
      { name: 'AST & Regex Parsers', role: 'Deterministic AST salvage layer for guaranteed JSON schema recovery' },
    ],
  },
  {
    category: 'Full-Stack & Cloud',
    badge: 'Production Infra',
    headline: 'Fast web apps, real-time dashboards, and cloud infrastructure with sub-second telemetry.',
    pills: ['Python', 'TypeScript', 'React & Next.js', 'PostgreSQL', 'Redis', 'ClickHouse', 'AWS'],
    tech: [
      { name: 'Python & TypeScript', role: 'AsyncIO concurrency (asyncio.gather), Next.js App Router, Node.js' },
      { name: 'ClickHouse & Redis', role: 'Sub-second real-time telemetry, distributed locks, rate limiting' },
      { name: 'Supabase, PostgreSQL & AWS', role: 'Row-level security, pgvector search, ECS, S3, CI/CD pipelines' },
    ],
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.22 });
  const timelineExperience = resumeData.experience;

  const [navActive, setNavActive] = useState(false);
  const [copiedFooterEmail, setCopiedFooterEmail] = useState(false);
  const [stackDrawerOpen, setStackDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const stackDrawerRef = useRef<HTMLDivElement | null>(null);
  const previousStackFocusRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll, handle Esc, and trap focus while drawer is open
  useEffect(() => {
    if (stackDrawerOpen) {
      previousStackFocusRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setStackDrawerOpen(false);
          return;
        }

        if (e.key === 'Tab' && stackDrawerRef.current) {
          const focusables = stackDrawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusables.length) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              last.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      const timer = setTimeout(() => {
        const closeBtn = stackDrawerRef.current?.querySelector<HTMLElement>(
          'button[aria-label="Close drawer"], button, [href]'
        );
        closeBtn?.focus();
      }, 50);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
        clearTimeout(timer);
        previousStackFocusRef.current?.focus();
      };
    }
  }, [stackDrawerOpen]);

  const handleCopyFooterEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopiedFooterEmail(true);
    setTimeout(() => setCopiedFooterEmail(false), 2500);
  };

  return (
    <main className="relative text-[#0b1d3a] min-h-screen">
      {/* Halden 96x60 Bilinear Sky-Cyan Bowl Glow + Subtle 3D Camera Flythrough */}
      <Global3DScene scrollYProgress={scrollYProgress} />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left progress-bar"
      />

      {/* Exact Halden Floating White Pill Navbar (#nav) with Morphing Scroll CTA (.halden-nav-cta) */}
      <header id="nav" className={`halden-nav ${navActive ? 'on' : ''}`}>
        {/* Brand (Left): 22px #5b7cf0 circle with two white wavy strokes */}
        <a
          href="#story"
          className="flex items-center gap-[9px] text-[17px] font-medium tracking-[-0.02em] text-[#0b1d3a]"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="11" fill="#5b7cf0" />
            <path
              d="M5 9.2c2.3-1.6 4.7-1.6 7 0s4.7 1.6 7 0"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M5 13.2c2.3-1.6 4.7-1.6 7 0s4.7 1.6 7 0"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span>{resumeData.name}</span>
        </a>

        {/* Centered Links */}
        <nav className="hidden lg:flex items-center gap-[28px] absolute left-1/2 -translate-x-1/2">
          <a href="#how-i-think" className="nav-link">How I Think</a>
          <a href="#case-studies" className="nav-link">Case Studies</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#daily-ai" className="nav-link">Daily AI</a>
          <a href="#timeline-momentum" className="nav-link">Experience</a>
          <a href="#stack" className="nav-link">Skills</a>
        </nav>

        {/* Right: Resume + Morphing .halden-nav-cta Pill */}
        <div className="flex items-center">
          <a
            href="/Haripriya_Rao_Resume.pdf"
            download="Haripriya_Rao_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className={`text-[14px] font-medium text-[#0b1d3a] hover:opacity-55 transition-all duration-300 ${
              navActive ? 'px-2' : 'px-3.5'
            }`}
          >
            Resume (PDF)
          </a>

          <div className="halden-nav-cta">
            <HaldenButton
              href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
              className="w-[170px]"
            >
              Email Haripriya
            </HaldenButton>
          </div>
        </div>
      </header>

      {/* ── Foreground Scroll Stack ── */}
      <div className="relative z-10">
        {/* ── 1. Hero (Synchronized Bowl Glow + Per-Character Letter Reveal + Staggered Fade-Ups) ── */}
        <StoryCanvasSequence
          name={resumeData.name}
          tagline="Customer conversations, architecture, full-stack code, production support, and the AI where it helps."
        />

        {/* ── 2. How I Think & Why Engineering Leaders Hire Me (5-Beat Request Journey + Color Meaning) ── */}
        <HowIThinkExperience onNavActivate={setNavActive} />

        {/* ── 3. Flagship Case Studies ── */}
        <CaseStudiesSection />

        {/* ── 4. Projects & Open Source ── */}
        <section id="projects" className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24">
          <div className="space-y-10">
            <HaldenFadeUp>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#0b1d3a]/10 px-4 py-1.5 mb-4 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
                <span className="mono-accent text-xs tracking-[0.16em] text-[#1d2f4f] uppercase font-semibold">
                  FEATURED PROJECTS &amp; OPEN SOURCE
                </span>
              </div>

              <HaldenLetterReveal
                as="h2"
                mode="scroll"
                spread={0.32}
                segments={[
                  { text: 'What I have', highlight: false },
                  { text: 'built and shipped.', highlight: true },
                ]}
                className="font-display text-3xl sm:text-5xl font-normal text-[#0b1d3a] tracking-[-0.03em]"
              />

              <p className="mt-3 text-base text-[#3e4d68]">
                Production AI architectures and official contributions for Google Gemini (Merged PR #1088) and OpenAI Cookbook (PR #2568).
              </p>
            </HaldenFadeUp>

            <StoryProjectGrid projects={projects} />
          </div>
        </section>

        {/* ── 5. Career Timeline ── */}
        <StoryTimeline sectionId="timeline-momentum" items={timelineExperience} />

        {/* ── 6. How I Use AI Daily: A Real Production Session ── */}
        <HowIUseAIDaily />

        {/* ── 7. Clean, Scannable Core Skills ── */}
        <section id="stack" className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24">
          <div className="space-y-10">
            <HaldenFadeUp className="flex flex-wrap items-end justify-between gap-4">
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

              <HaldenButton onClick={() => setStackDrawerOpen(true)}>
                Full Architectural Breakdown
              </HaldenButton>
            </HaldenFadeUp>

            <div className="grid gap-5 md:grid-cols-3">
              {depthStack.map((category, idx) => (
                <HaldenFadeUp key={category.category} delay={idx * 0.08}>
                  <TiltCard3D
                    glareColor="rgba(143, 213, 241, 0.35)"
                    className="spatial-glass rounded-3xl p-6 h-full"
                  >
                    <div>
                      <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase tracking-wider">
                        {category.badge}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-[#0b1d3a] mt-1 mb-2">
                        {category.category}
                      </h3>
                      <p className="text-sm text-[#3e4d68] mb-5 leading-relaxed">
                        {category.headline}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#0b1d3a]/8">
                      {category.pills.map(pill => (
                        <span
                          key={pill}
                          className="rounded-full border border-[#0b1d3a]/10 bg-white/80 px-3 py-1 text-xs font-medium text-[#0b1d3a]"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </TiltCard3D>
                </HaldenFadeUp>
              ))}
            </div>
          </div>

          {mounted &&
            createPortal(
              <AnimatePresence>
                {stackDrawerOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-end bg-[#0b1d3a]/75 backdrop-blur-md"
                    onClick={() => setStackDrawerOpen(false)}
                  >
                    <motion.div
                      ref={stackDrawerRef}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="stack-drawer-title"
                      initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.1 }
                          : { duration: 0.35, ease: [0.22, 0.7, 0.2, 1] }
                      }
                      onClick={e => e.stopPropagation()}
                      className="relative h-full w-full sm:max-w-3xl overflow-y-auto bg-white p-5 sm:p-10 shadow-2xl space-y-6 text-[#0b1d3a] flex flex-col pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
                    >
                      {/* Sticky Top Header with Clean Close Button */}
                      <div className="sticky -top-[max(1.5rem,env(safe-area-inset-top))] -mx-5 sm:-mx-10 px-5 sm:px-10 py-4 sm:py-5 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between gap-4 z-20 shadow-sm">
                        <div className="min-w-0">
                          <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase tracking-wider block truncate">
                            Architectural Specification
                          </span>
                          <h3
                            id="stack-drawer-title"
                            className="font-display text-xl sm:text-2xl font-semibold text-[#0b1d3a] mt-1 leading-snug truncate"
                          >
                            Production Stack &amp; System Responsibilities
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStackDrawerOpen(false)}
                          aria-label="Close drawer"
                          className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-[#0b1d3a] hover:bg-slate-100 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b7cf0]"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M4 4l8 8M12 4l-8 8" />
                          </svg>
                        </button>
                      </div>

                      <div className="grid gap-6 md:grid-cols-3">
                        {depthStack.map(cat => (
                          <div key={cat.category} className="space-y-3">
                            <h4 className="font-display text-sm font-semibold text-[#5b7cf0]">
                              {cat.category}
                            </h4>
                            {cat.tech.map(item => (
                              <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-3.5">
                                <div className="text-xs font-semibold text-[#0b1d3a]">{item.name}</div>
                                <div className="text-xs text-[#3e4d68] mt-1">{item.role}</div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body
            )}
        </section>

        {/* ── 8. Academic Foundation & Curtain Reveal Edge ── */}
        <div className="relative z-20 bg-gradient-to-b from-transparent via-[#f8fafc]/90 to-white pb-14 sm:pb-20 rounded-b-[36px] sm:rounded-b-[56px] shadow-[0_45px_100px_-20px_rgba(11,29,58,0.22)] border-b border-slate-200/80 overflow-hidden">
          <Education />
        </div>

        {/* ── 10. Cinematic Motion Footer (Curtain Reveal + Aurora Glow + Magnetic Buttons) ── */}
        <MotionFooter />
      </div>
    </main>
  );
}
