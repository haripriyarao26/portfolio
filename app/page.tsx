'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import StoryCanvasSequence from '@/components/StoryCanvasSequence';
import StoryProjectGrid from '@/components/StoryProjectGrid';
import StoryTimeline from '@/components/StoryTimeline';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import EngineeringNotes from '@/components/EngineeringNotes';
import Education from '@/components/Education';
import { TiltCard3D } from '@/components/ReactBits3D';
import {
  HaldenButton,
  HaldenFadeUp,
  HaldenLetterReveal,
  HaldenPinnedStatement,
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
    headline: 'Fast web apps, real-time dashboards, and cloud infrastructure at 99.98% uptime.',
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

  const splitRef = useRef<HTMLElement | null>(null);
  const visualScaleRef = useRef<HTMLDivElement | null>(null);
  const [splitRowVisible, setSplitRowVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!splitRef.current) return;
        const rect = splitRef.current.getBoundingClientRect();
        const vh = Math.max(1, window.innerHeight || 800);
        const p2 = Math.max(0, Math.min(1, (0.8 - rect.top / vh) / 0.65));
        setSplitRowVisible(p2 > 0.75);

        if (visualScaleRef.current) {
          const s = 1.08 - 0.08 * Math.max(0, Math.min(1, 1 - rect.top / vh));
          visualScaleRef.current.style.transform = `scale(${s.toFixed(4)})`;
        }
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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
        <nav className="hidden lg:flex items-center gap-[31px] absolute left-1/2 -translate-x-1/2">
          <a href="#case-studies" className="nav-link">Case Studies</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#timeline-momentum" className="nav-link">Experience</a>
          <a href="#notes" className="nav-link">How I Work</a>
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
          tagline="I cut LLM inference costs 96% and orchestration latency 40% in production agent systems."
        />

        {/* ── 2. Pinned Scroll Statement (Rises & reveals letter-by-letter as bowl floods cyan) ── */}
        <HaldenPinnedStatement onNavActivate={setNavActive} />

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
                Live AI apps and official contributions merged by Google and OpenAI maintainers.
              </p>
            </HaldenFadeUp>

            <StoryProjectGrid projects={projects} />
          </div>
        </section>

        {/* ── 5. Career Timeline ── */}
        <StoryTimeline sectionId="timeline-momentum" items={timelineExperience} />

        {/* ── 6. How I Work ── */}
        <EngineeringNotes />

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

          <AnimatePresence>
            {stackDrawerOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-end bg-[#0b1d3a]/60 backdrop-blur-md"
                onClick={() => setStackDrawerOpen(false)}
              >
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.35, ease: [0.22, 0.7, 0.2, 1] }}
                  onClick={e => e.stopPropagation()}
                  className="relative h-full w-full max-w-3xl overflow-y-auto bg-white p-6 sm:p-10 shadow-2xl space-y-6 text-[#0b1d3a] flex flex-col"
                >
                  {/* Sticky Top Header with Clean Close Button */}
                  <div className="sticky -top-6 sm:-top-10 -mx-6 sm:-mx-10 px-6 sm:px-10 py-5 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between gap-4 z-10">
                    <div>
                      <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase tracking-wider">
                        Architectural Specification
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0b1d3a] mt-1 leading-snug">
                        Production Stack &amp; System Responsibilities
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStackDrawerOpen(false)}
                      aria-label="Close drawer"
                      className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-[#0b1d3a] hover:bg-slate-100 transition-all shadow-sm"
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
          </AnimatePresence>
        </section>

        {/* ── 8. Education ── */}
        <Education />

        {/* ── 9. Exact Halden Dark Navy Split Section (#split / #contact: 58.3% Left / 41.7% Right) ── */}
        <section
          ref={splitRef}
          id="contact"
          className="relative z-20 mt-12 bg-[#0e1f3d] text-white min-h-[88vh] grid lg:grid-cols-[58.3%_41.7%]"
        >
          {/* Left 58.3%: Guide Line + Dark Letter-Reveal Headline + Ruled Fade-Up Row */}
          <div className="relative pl-[var(--gut)] flex flex-col justify-between py-20 lg:py-28">
            {/* 1px Vertical Guide Line */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-[var(--gut)] w-px bg-white/12" />

            <div className="lg:pl-[5vw] pr-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 mb-6">
                <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
                <span className="mono-accent text-xs uppercase tracking-[0.16em] text-[#8fe6f4]">
                  DIRECT CONTACT &middot; REPLIES WITHIN 24 HOURS
                </span>
              </div>

              <HaldenLetterReveal
                as="h2"
                mode="scroll"
                theme="dark"
                spread={0.35}
                segments={[
                  { text: 'AI systems that operate', highlight: false, lineBreakAfter: true },
                  { text: 'like your best team.', highlight: true },
                ]}
                className="font-display text-[clamp(32px,3.4vw,52px)] font-normal leading-[1.08] tracking-[-0.03em] text-white"
              />
            </div>

            {/* Ruled Row (#row) that fades up when p2 > 0.75 */}
            <div
              className={`mt-12 border-t border-white/12 pt-8 lg:pl-[5vw] pr-6 sm:pr-12 transition-all duration-900 ease-[cubic-bezier(0.22,0.7,0.2,1)] ${
                splitRowVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="grid sm:grid-cols-[1fr_1.35fr] gap-6 mb-8">
                <div>
                  <h3 className="font-display text-[clamp(18px,1.4vw,22px)] font-normal text-white">
                    Hiring Managers &amp; Founders
                  </h3>
                  <p className="mono-accent text-xs text-[#2fe0d0] mt-2 uppercase tracking-wider">
                    USA &middot; Cap-Counted H-1B Ready
                  </p>
                </div>

                <p className="text-[clamp(14px,1.1vw,16px)] leading-[1.6] text-white/70 max-w-lg">
                  <strong className="text-white font-medium block mb-1">
                    Cut cloud costs 96%. Review 2x faster. Stop firefighting hallucinations.
                  </strong>
                  I partner with product, risk, and engineering teams to turn generative models into resilient production systems — scaling multi-agent orchestration and deterministic evaluation harnesses to 99.98% uptime.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
                  className="inline-flex items-center gap-3 rounded-full bg-[#2fe0d0] hover:bg-[#8fe6f4] text-[#0b1d3a] px-6 py-3.5 text-sm font-semibold transition-all"
                >
                  <span>Email {resumeData.email}</span>
                  <span>→</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyFooterEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 px-5 py-3.5 text-sm font-medium text-white transition-all"
                >
                  {copiedFooterEmail ? (
                    <span className="text-[#2fe0d0]">✓ Copied to clipboard!</span>
                  ) : (
                    <span>Copy Email Address</span>
                  )}
                </button>

                <a
                  href="/Haripriya_Rao_Resume.pdf"
                  download="Haripriya_Rao_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 px-5 py-3.5 text-sm font-medium text-white transition-all"
                >
                  <span>Resume (PDF)</span>
                </a>

                <Link
                  href={`https://${resumeData.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 px-4 py-3.5 text-sm font-medium text-white transition-all"
                >
                  <span>LinkedIn</span>
                  <span>↗</span>
                </Link>

                <Link
                  href={githubProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 px-4 py-3.5 text-sm font-medium text-white transition-all"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right 41.7%: Scroll-Zooming Visual Panel (1.08 -> 1.00 scale) */}
          <div className="relative overflow-hidden min-h-[420px] bg-[#08152c] border-l border-white/10">
            <div
              ref={visualScaleRef}
              style={{ transformOrigin: '50% 60%', transform: 'scale(1.08)' }}
              className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12 bg-[radial-gradient(circle_at_50%_30%,rgba(91,124,240,0.32),rgba(47,224,208,0.14)_45%,rgba(8,21,44,0.95)_85%)]"
            >
              <div className="flex items-center justify-between border-b border-white/12 pb-4">
                <span className="mono-accent text-xs uppercase tracking-[0.16em] text-[#8fe6f4]">
                  PRODUCTION TELEMETRY // VERIFIED
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#2fe0d0] shadow-[0_0_12px_#2fe0d0]" />
              </div>

              <div className="my-auto space-y-4">
                {[
                  { value: '-96%', label: 'LLM Token Payload Reduction', sub: '200 KB → 8 KB via TOON' },
                  { value: '19.6s', label: 'Financial Document Extraction', sub: 'Down from 40.8s (-52%)' },
                  { value: '99.98%', label: 'Multi-Tenant Platform Uptime', sub: '22-Node LangGraph DAG' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-md p-5"
                  >
                    <div className="font-display text-3xl font-semibold text-[#2fe0d0]">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-white mt-1">{stat.label}</div>
                    <div className="mono-accent text-xs text-white/55 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/12 pt-4 flex items-center justify-between text-xs text-white/50 mono-accent">
                <span>HARIPRIYA RAO</span>
                <span>ANTHROPIC CCA-F &middot; AWS AI</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
