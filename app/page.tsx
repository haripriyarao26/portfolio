'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import Section3D from '@/components/Section3D';
import MouseSpotlight from '@/components/MouseSpotlight';
import StoryCanvasSequence from '@/components/StoryCanvasSequence';
import StoryProjectGrid from '@/components/StoryProjectGrid';
import StoryTimeline from '@/components/StoryTimeline';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import EngineeringNotes from '@/components/EngineeringNotes';
import Education from '@/components/Education';
import { projects } from '@/data/projects';
import { resumeData } from '@/data/resume';
import ParticleNetwork from '@/components/ParticleNetwork';

const githubProfile = `https://${resumeData.github}`;

const depthStack = [
  {
    category: 'Multi Agent Orchestration & Core Frameworks',
    badge: 'State Machines & Tool Use',
    headline: 'Deterministic state machine workflows, cyclic graph resolution, and tool routing.',
    tech: [
      { name: 'LangGraph', role: '22 node cyclic state machines, conditional routing, checkpoint persistence' },
      { name: 'LangChain', role: 'Open source security hardening (PR #2568), runnables, memory adapters' },
      { name: 'Anthropic API / Claude SDK', role: 'Tool use agents, structured JSON parsing, prompt guardrails' },
      { name: 'Model Context Protocol (MCP)', role: 'Standardized server and client tool invocation protocols' },
      { name: 'Google Gemini API', role: 'Multimodal analysis, official Cookbook contributor (PR #1088)' },
    ],
  },
  {
    category: 'Evaluation Harnesses & AI Reliability',
    badge: 'Empirical Evals & Gating',
    headline: 'Empirical regression testing, golden datasets, and latency optimization.',
    tech: [
      { name: 'Golden Dataset Evals', role: '100+ annotated ground truth test suites for LLM extraction' },
      { name: 'A/B Regression Gating', role: 'Statistical field agreement scoring (>95% threshold)' },
      { name: 'AST & Regex Parsers', role: 'Deterministic AST salvage layer for guaranteed JSON schema recovery' },
      { name: 'Adversarial Test Fixtures', role: 'Stress testing nested forward chains and circular references' },
    ],
  },
  {
    category: 'Distributed Systems, Cloud & Observability',
    badge: 'Telemetry & Distributed State',
    headline: 'High throughput telemetry, real time sync, and distributed state coordination.',
    tech: [
      { name: 'ClickHouse', role: 'Sub second real time LLM telemetry and agent execution analytics' },
      { name: 'Redis', role: 'Distributed locks, rate limiting, and short term state caching' },
      { name: 'Supabase & PostgreSQL', role: 'Row level security, pgvector semantic search, transactional storage' },
      { name: 'Python & TypeScript', role: 'AsyncIO concurrency (asyncio.gather), Next.js App Router, Node.js' },
      { name: 'AWS & CI/CD Pipelines', role: 'ECS, S3, IAM, GitHub Actions canary deployments (98% pass rate)' },
    ],
  },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };

const TAGLINE_WORDS =
  'Bridging complex multi agent orchestration with deterministic production reliability across every token and state transition.'.split(
    ' '
  );

function TaglineRevealSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCount, setActiveCount] = useState<number>(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setActiveCount(TAGLINE_WORDS.length);
      return;
    }

    let rafId = 0;
    const updateWords = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setActiveCount(Math.round(progress * TAGLINE_WORDS.length));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateWords);
    };

    updateWords();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <Section3D id="impact" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20">
      <div
        ref={containerRef}
        className="rounded-3xl p-8 sm:p-12 border border-white/10 bg-[#181818]"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="mono-accent text-xs tracking-widest text-[#E07A5F] uppercase font-semibold">
            Production Philosophy
          </span>
          <span className="text-white/20">&middot;</span>
          <span className="mono-accent text-xs tracking-wider text-[#B8B0A4] uppercase">
            End to End Ownership
          </span>
        </div>

        <h2
          className="font-display text-2xl sm:text-4xl font-semibold leading-tight max-w-[680px]"
          style={{ textWrap: 'balance' }}
        >
          {TAGLINE_WORDS.map((word, idx) => {
            const isRevealed = idx < activeCount;
            return (
              <span
                key={`${word}-${idx}`}
                className={`inline-block mr-2 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isRevealed ? 'text-[#FAF6F0] opacity-100' : 'text-[#FAF6F0] opacity-30'
                }`}
              >
                {word}
              </span>
            );
          })}
        </h2>

        <p
          className="mt-6 max-w-[680px] text-base text-[#B8B0A4]"
          style={{ textWrap: 'pretty' }}
        >
          I partner directly with cross functional stakeholders, from{' '}
          <strong className="text-[#FAF6F0] font-semibold">NVIDIA engineers</strong> to{' '}
          <strong className="text-[#FAF6F0] font-semibold">city officials across 6 roadmap phases</strong>, translating high stakes requirements into deterministic, low latency AI pipelines.
        </p>
      </div>
    </Section3D>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.22 });
  const timelineExperience = resumeData.experience;
  const [copiedFooterEmail, setCopiedFooterEmail] = useState(false);

  const handleCopyFooterEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopiedFooterEmail(true);
    setTimeout(() => setCopiedFooterEmail(false), 2500);
  };

  return (
    <main className="relative text-[var(--text-primary)]" style={{ background: 'var(--bg-dark)' }}>
      <ParticleNetwork />
      <MouseSpotlight />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left progress-bar"
      />

      {/* Condensed Glass Navigation */}
      <header className="glass-nav fixed top-4 left-1/2 z-50 w-[min(96vw,960px)] -translate-x-1/2 rounded-full px-5 py-2.5">
        <nav className="flex items-center justify-between text-xs sm:text-sm">
          <a href="#story" className="shrink-0 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#E07A5F]" />
            <span className="font-semibold text-sm sm:text-base text-[#FAF6F0] tracking-tight">
              {resumeData.name}
            </span>
          </a>

          {/* Desktop nav: 4 clean links + Resume + Direct Contact CTA */}
          <div className="hidden md:flex items-center gap-6 text-[#B8B0A4]">
            <a href="#case-studies" className="nav-link transition-colors duration-300 hover:text-[#FAF6F0]">
              Case Studies
            </a>
            <a href="#projects" className="nav-link transition-colors duration-300 hover:text-[#FAF6F0]">
              Projects &amp; PRs
            </a>
            <a href="#timeline-momentum" className="nav-link transition-colors duration-300 hover:text-[#FAF6F0]">
              Experience
            </a>
            <a href="#stack" className="nav-link transition-colors duration-300 hover:text-[#FAF6F0]">
              Stack
            </a>
            <a
              href="/Haripriya_Rao_Resume.pdf"
              download="Haripriya_Rao_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-white/15 bg-[#181818] hover:border-[#E07A5F]/50 hover:text-[#F4A261] text-[#FAF6F0] transition-colors duration-300"
            >
              <span>Resume (PDF)</span>
            </a>
            <a
              href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
              className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-full bg-[#E07A5F] text-[#0E0D13] hover:bg-[#E8886E] transition-colors duration-300"
            >
              Email Me
            </a>
          </div>

          {/* Mobile / Tablet nav */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="/Haripriya_Rao_Resume.pdf"
              download="Haripriya_Rao_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full border border-white/20 bg-[#181818] text-[#FAF6F0]"
            >
              Resume
            </a>
            <a
              href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold rounded-full bg-[#E07A5F] text-[#0E0D13]"
            >
              Email Me
            </a>
          </div>
        </nav>
      </header>

      {/* ── 1. Hero ── */}
      <StoryCanvasSequence
        name={resumeData.name}
        tagline="I cut LLM inference costs 96% and orchestration latency 40% in production agent systems."
      />

      {/* ── 2. Flagship Case Studies (Onetera & JPMorgan Immediately Visible) ── */}
      <CaseStudiesSection />

      {/* ── 3. Tagline Reveal Section (B11) ── */}
      <TaglineRevealSection />

      {/* ── 4. Projects & Open Source (Interactive Procure-Loop DAG + Merged Google/OpenAI PRs) ── */}
      <Section3D id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="mono-accent text-xs tracking-widest text-[#E07A5F] uppercase font-semibold">
              Code &amp; Contributions
            </span>
            <span className="text-white/20">&middot;</span>
            <span className="mono-accent text-xs tracking-wider text-[#B8B0A4] uppercase">
              Tiered Portfolio
            </span>
          </div>
          <h2
            className="font-display text-3xl font-semibold text-[#FAF6F0] sm:text-5xl max-w-[680px]"
            style={{ textWrap: 'balance' }}
          >
            Open source pull requests and autonomous agent systems.
          </h2>
          <p className="mt-3 text-base text-[#B8B0A4] max-w-[680px]" style={{ textWrap: 'pretty' }}>
            Merged contributions to official Google and OpenAI ecosystem repositories, alongside live multi-agent orchestration swarms.
          </p>
        </motion.div>
        <StoryProjectGrid projects={projects} />
      </Section3D>

      {/* ── 5. Career Timeline ── */}
      <StoryTimeline sectionId="timeline-momentum" items={timelineExperience} />

      {/* ── 6. Engineering Notes: How I Think About Systems ── */}
      <EngineeringNotes />

      {/* ── 7. Engineering Stack & Production Depth ── */}
      <Section3D id="stack" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="mono-accent text-xs tracking-widest text-[#E07A5F] uppercase font-semibold">
              Technical Mastery
            </span>
            <span className="text-white/20">&middot;</span>
            <span className="mono-accent text-xs tracking-wider text-[#B8B0A4] uppercase">
              Production Depth
            </span>
          </div>
          <h2
            className="font-display text-3xl sm:text-5xl font-semibold text-[#FAF6F0] tracking-tight max-w-[680px]"
            style={{ textWrap: 'balance' }}
          >
            Engineering stack and production context.
          </h2>
          <p className="mt-3 text-base text-[#B8B0A4] max-w-[680px]">
            Architectural depth, domain competencies, and real world system responsibilities across every layer of the stack.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {depthStack.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: idx * 0.1 }}
              className="rounded-2xl p-6 sm:p-7 border border-white/10 bg-[#181818] flex flex-col justify-between hover:border-[#E07A5F]/40 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="mono-accent text-xs font-semibold text-[#E07A5F] uppercase tracking-wider">
                    {category.badge}
                  </span>
                  <span className="mono-accent text-xs text-[#B8B0A4] font-mono">0{idx + 1}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#FAF6F0] mb-2">
                  {category.category}
                </h3>
                <p className="text-xs text-[#B8B0A4] mb-6">
                  {category.headline}
                </p>

                <div className="space-y-4 border-t border-white/10 pt-5">
                  {category.tech.map(item => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E07A5F]" />
                        <span className="font-display text-xs font-semibold text-[#FAF6F0]">{item.name}</span>
                      </div>
                      <p className="text-xs text-[#B8B0A4] pl-3.5">
                        {item.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section3D>

      {/* ── 8. Education ── */}
      <Education />

      {/* ── 9. High-Conversion Contact Box ── */}
      <Section3D id="contact" className="relative overflow-hidden px-4 sm:px-6 pt-8 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mx-auto max-w-3xl rounded-3xl p-8 sm:p-14 text-center border border-white/15 bg-[#181818]"
        >
          <span className="mono-accent inline-block text-xs tracking-widest text-[#F4A261] uppercase font-semibold mb-3">
            Direct Contact &middot; Replies Within 24 Hours
          </span>
          <h2
            className="font-display text-3xl font-semibold text-[#FAF6F0] sm:text-5xl mb-4"
            style={{ textWrap: 'balance' }}
          >
            Ready to ship production AI systems together?
          </h2>
          <p className="text-sm sm:text-base text-[#B8B0A4] max-w-xl mx-auto mb-8" style={{ textWrap: 'pretty' }}>
            Available for Senior AI Engineer, Founding Engineer, and Applied AI roles across the USA. Reach out directly via email or LinkedIn.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E07A5F] hover:bg-[#E8886E] px-6 py-3 text-base font-semibold text-[#0E0D13] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_24px_rgba(224,122,95,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email {resumeData.email}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyFooterEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#1F1F1F] hover:bg-[#272727] px-5 py-3 text-sm font-semibold text-[#FAF6F0] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
            >
              {copiedFooterEmail ? (
                <span className="text-emerald-300">Copied to clipboard!</span>
              ) : (
                <span>Copy Email Address</span>
              )}
            </button>

            <a
              href="/Haripriya_Rao_Resume.pdf"
              download="Haripriya_Rao_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E07A5F]/40 bg-[#1F1F1F] px-5 py-3 text-sm font-semibold text-[#F4A261] hover:bg-[#272727] transition-all duration-300"
            >
              <span>Download Resume (PDF)</span>
            </a>

            <Link
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#1F1F1F] px-5 py-3 text-sm font-semibold text-[#FAF6F0] hover:border-white/30 transition-all duration-300"
            >
              <span>LinkedIn</span>
              <span>↗</span>
            </Link>

            <Link
              href={githubProfile}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#1F1F1F] px-5 py-3 text-sm font-semibold text-[#FAF6F0] hover:border-white/30 transition-all duration-300"
            >
              <span>GitHub</span>
              <span>↗</span>
            </Link>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="mono-accent text-xs tracking-wider text-[#F4A261] uppercase font-semibold">
              USA &middot; Cap Counted H1B (Eligible for Immediate Transfer)
            </p>
          </div>
        </motion.div>
      </Section3D>
    </main>
  );
}
