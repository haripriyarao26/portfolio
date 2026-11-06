'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Section3D from '@/components/Section3D';
import StoryCanvasSequence from '@/components/StoryCanvasSequence';
import StoryProjectGrid from '@/components/StoryProjectGrid';
import StoryTimeline from '@/components/StoryTimeline';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import EngineeringNotes from '@/components/EngineeringNotes';
import Education from '@/components/Education';
import { MagneticButton, TiltCard3D } from '@/components/ReactBits3D';
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

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };

const TAGLINE_WORDS =
  'Unifying multi-agent intelligence with deterministic safety — cutting AI cloud costs 96% and review times in half.'.split(
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
    <Section3D id="impact" className="mx-auto max-w-6xl px-6 sm:px-10 py-10 sm:py-16 scroll-mt-24">
      <div>
        <TiltCard3D
          intensity={3}
          glareColor="rgba(255, 255, 255, 0.75)"
          className="spatial-glass rounded-3xl p-8 sm:p-10"
        >
          <div ref={containerRef}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white/60 border border-white/90 mb-4">
              <span className="h-3 w-[2px] bg-[#0F141C]" />
              <span className="mono-accent text-xs tracking-[0.18em] text-[#475569] uppercase font-semibold">
                WHY TEAMS HIRE ME
              </span>
            </div>

            <h2
              className="font-display text-2xl sm:text-4xl font-semibold leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {TAGLINE_WORDS.map((word, idx) => {
                const isRevealed = idx < activeCount;
                return (
                  <span
                    key={`${word}-${idx}`}
                    className={`inline-block mr-2 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isRevealed ? 'text-[#0F141C]' : 'text-[#94A3B8]'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </h2>

            <p className="mt-4 text-base text-[#475569]" style={{ textWrap: 'pretty' }}>
              Trusted by cross-functional teams — from <strong className="text-[#0F141C] font-semibold">JPMorgan Chase</strong> and <strong className="text-[#0F141C] font-semibold">NVIDIA engineers</strong> to <strong className="text-[#0F141C] font-semibold">city officials</strong> — to take AI products from zero to production.
            </p>
          </div>
        </TiltCard3D>
      </div>
    </Section3D>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.22 });
  const timelineExperience = resumeData.experience;
  const [copiedFooterEmail, setCopiedFooterEmail] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdCopied, setCmdCopied] = useState(false);
  const [stackDrawerOpen, setStackDrawerOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
        setStackDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleCopyFooterEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopiedFooterEmail(true);
    setTimeout(() => setCopiedFooterEmail(false), 2500);
  };

  const handleCmdCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCmdCopied(true);
    setTimeout(() => {
      setCmdCopied(false);
      setCmdOpen(false);
    }, 1200);
  };

  return (
    <main
      className="relative text-[#0F141C] min-h-screen"
      style={{
        background: 'linear-gradient(165deg, #CEDCEB 0%, #DFEAEF 38%, #EEF2F6 75%, #F4F6F9 100%)',
      }}
    >
      {/* Studio Daylight 3D Fiber-Optic & Prismatic Iridescent Glass Sculpture */}
      <Global3DScene scrollYProgress={scrollYProgress} />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left progress-bar"
      />

      {/* NeuralKinetics-Style Minimalist Top Navigation Bar */}
      <header className="fixed top-5 left-0 right-0 z-50 mx-auto max-w-6xl px-6 sm:px-10 flex items-center justify-between pointer-events-none">
        {/* Left: Brand + Pill Menu */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href="#story"
            className="glass-nav rounded-full px-4 py-2 flex items-center gap-2 text-sm font-semibold text-[#0F141C]"
          >
            <span className="h-2 w-2 rounded-full bg-[#D97706]" />
            <span>{resumeData.name}</span>
          </a>

          <button
            type="button"
            onClick={() => setCmdOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#0F141C] hover:bg-[#1E293B] text-white px-4 py-2 text-xs font-semibold shadow-sm transition-all"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#0F141C] font-bold">
              +
            </span>
            <span>Menu</span>
          </button>

          <div className="hidden lg:flex items-center gap-5 glass-nav rounded-full px-5 py-2 text-xs font-medium">
            <a href="#case-studies" className="nav-link">Case Studies</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#timeline-momentum" className="nav-link">Experience</a>
            <a href="#stack" className="nav-link">Skills</a>
          </div>
        </div>

        {/* Right: Resume + Direct Contact Pill (matching "+ Adaptive Systems" in reference) */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <a
            href="/Haripriya_Rao_Resume.pdf"
            download="Haripriya_Rao_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="glass-nav rounded-full px-4 py-2 text-xs font-semibold text-[#0F141C] hover:bg-white transition-all"
          >
            Resume (PDF)
          </a>

          <a
            href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-[#0F141C] text-[#0F141C] hover:text-white border border-black/10 px-4 py-2 text-xs font-semibold shadow-sm transition-all"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#0F141C] text-white text-[10px]">
              +
            </span>
            <span>Email Haripriya</span>
          </a>
        </div>
      </header>

      {/* ⌘K / + Menu Quick Actions Modal */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-900/40 backdrop-blur-sm pt-24 px-4"
            onClick={() => setCmdOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-white bg-[#F8FAFC] p-5 shadow-2xl text-[#0F141C]"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#D97706]" />
                  <span className="mono-accent text-xs font-semibold text-[#0F141C] uppercase tracking-wider">
                    Quick Navigation &amp; Actions
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCmdOpen(false)}
                  className="mono-accent text-xs text-[#64748B] hover:text-[#0F141C] px-2.5 py-0.5 rounded-full border border-slate-200 bg-white"
                >
                  ESC
                </button>
              </div>

              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={handleCmdCopyEmail}
                  className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#0F141C] bg-white hover:border-[#0F141C] border border-slate-200 transition-colors"
                >
                  <span>{cmdCopied ? '✓ Copied haripriyaraov@gmail.com!' : 'Copy Email (haripriyaraov@gmail.com)'}</span>
                  <span className="mono-accent text-xs text-[#D97706]">Copy</span>
                </button>

                <a
                  href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
                  onClick={() => setCmdOpen(false)}
                  className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[#0F141C] hover:bg-white transition-colors"
                >
                  <span>Send Direct Email to Haripriya</span>
                  <span className="mono-accent text-xs text-[#D97706]">mailto ↗</span>
                </a>

                <a
                  href="/Haripriya_Rao_Resume.pdf"
                  download="Haripriya_Rao_Resume.pdf"
                  onClick={() => setCmdOpen(false)}
                  className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[#0F141C] hover:bg-white transition-colors"
                >
                  <span>Download Resume (PDF)</span>
                  <span className="mono-accent text-xs text-[#64748B]">PDF ↓</span>
                </a>

                <a
                  href="#study-onetera"
                  onClick={() => setCmdOpen(false)}
                  className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[#0F141C] hover:bg-white transition-colors"
                >
                  <span>Onetera: 96% AI Cost Reduction</span>
                  <span className="mono-accent text-xs text-[#64748B]">Jump →</span>
                </a>

                <a
                  href="#study-jpmc"
                  onClick={() => setCmdOpen(false)}
                  className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[#0F141C] hover:bg-white transition-colors"
                >
                  <span>JPMorgan Chase: 2x Faster Document Review</span>
                  <span className="mono-accent text-xs text-[#64748B]">Jump →</span>
                </a>

                <a
                  href="#projects"
                  onClick={() => setCmdOpen(false)}
                  className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[#0F141C] hover:bg-white transition-colors"
                >
                  <span>Projects &amp; Google / OpenAI Merged PRs</span>
                  <span className="mono-accent text-xs text-[#64748B]">Jump →</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Spatial Foreground Layer ── */}
      <div className="relative z-10">
        {/* ── 1. Hero (Sculpture on Center-Right, Headline Bottom-Left, Contact Card Bottom-Right) ── */}
        <StoryCanvasSequence
          name={resumeData.name}
          tagline="I cut LLM inference costs 96% and orchestration latency 40% in production agent systems."
        />

        {/* ── 2. Flagship Case Studies (Cards on Right 64%, 3D Sculpture on Left 36%) ── */}
        <CaseStudiesSection />

        {/* ── 3. Tagline Reveal Section (Left 64%, 3D Sculpture on Right 36%) ── */}
        <TaglineRevealSection />

        {/* ── 4. Projects & Open Source ── */}
        <Section3D id="projects" className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring}
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white/60 border border-white/90 mb-3">
                <span className="h-3 w-[2px] bg-[#0F141C]" />
                <span className="mono-accent text-xs tracking-[0.18em] text-[#475569] uppercase font-semibold">
                  FEATURED PROJECTS &amp; OPEN SOURCE
                </span>
              </div>
              <h2
                className="font-display text-3xl font-semibold text-[#0F141C] sm:text-5xl"
                style={{ textWrap: 'balance' }}
              >
                What I have{' '}
                <span className="text-[#7D8998] font-normal">built and shipped.</span>
              </h2>
              <p className="mt-2 text-base text-[#475569]">
                Live AI apps and official contributions merged by Google and OpenAI maintainers.
              </p>
            </motion.div>
            <StoryProjectGrid projects={projects} />
          </div>
        </Section3D>

        {/* ── 5. Career Timeline ── */}
        <StoryTimeline sectionId="timeline-momentum" items={timelineExperience} />

        {/* ── 6. How I Work ── */}
        <EngineeringNotes />

        {/* ── 7. Clean, Scannable Core Skills ── */}
        <Section3D id="stack" className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-20 scroll-mt-24">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring}
              className="flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white/60 border border-white/90 mb-3">
                  <span className="h-3 w-[2px] bg-[#0F141C]" />
                  <span className="mono-accent text-xs tracking-[0.18em] text-[#475569] uppercase font-semibold">
                    SKILLS &amp; TOOLKIT
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#0F141C] tracking-tight">
                  Core{' '}
                  <span className="text-[#7D8998] font-normal">technologies.</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setStackDrawerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#0F141C] hover:bg-[#1E293B] px-4 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                <span>Full Architectural Breakdown</span>
                <span>→</span>
              </button>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {depthStack.map((category, idx) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: idx * 0.08 }}
                >
                  <TiltCard3D
                    glareColor="rgba(255, 255, 255, 0.75)"
                    className="spatial-glass rounded-3xl p-6"
                  >
                    <div>
                      <span className="mono-accent text-xs font-semibold text-[#D97706] uppercase tracking-wider">
                        {category.badge}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-[#0F141C] mt-1 mb-2">
                        {category.category}
                      </h3>
                      <p className="text-sm text-[#475569] mb-5">
                        {category.headline}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-black/5">
                      {category.pills.map(pill => (
                        <span
                          key={pill}
                          className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-[#0F141C]"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </TiltCard3D>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Optional Deep Stack Drawer for Engineers */}
          <AnimatePresence>
            {stackDrawerOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
                onClick={() => setStackDrawerOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  onClick={e => e.stopPropagation()}
                  className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white bg-[#F8FAFC] p-6 sm:p-8 shadow-2xl space-y-6 text-[#0F141C]"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h3 className="font-display text-xl font-semibold text-[#0F141C]">
                      Production Stack &amp; System Responsibilities
                    </h3>
                    <button
                      type="button"
                      onClick={() => setStackDrawerOpen(false)}
                      className="mono-accent rounded-full border border-slate-300 bg-white px-3.5 py-1 text-xs font-semibold text-[#0F141C] hover:bg-slate-100"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {depthStack.map(cat => (
                      <div key={cat.category} className="space-y-3">
                        <h4 className="font-display text-sm font-semibold text-[#D97706]">
                          {cat.category}
                        </h4>
                        {cat.tech.map(item => (
                          <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-3.5">
                            <div className="text-xs font-semibold text-[#0F141C]">{item.name}</div>
                            <div className="text-xs text-[#475569] mt-1">{item.role}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Section3D>

        {/* ── 8. Education ── */}
        <Education />

        {/* ── 9. High-Conversion Frosted Glass Contact Box ── */}
        <Section3D id="contact" className="relative overflow-hidden px-6 sm:px-10 pt-8 pb-28 max-w-6xl mx-auto scroll-mt-24">
          <div>
            <TiltCard3D
              intensity={4}
              glareColor="rgba(255, 255, 255, 0.75)"
              className="spatial-glass rounded-3xl p-8 sm:p-12"
            >
              <div>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white/60 border border-white/90 mb-4">
                  <span className="h-3 w-[2px] bg-[#0F141C]" />
                  <span className="mono-accent text-xs tracking-[0.18em] text-[#475569] uppercase font-semibold">
                    DIRECT CONTACT &middot; REPLIES WITHIN 24 HOURS
                  </span>
                </div>

                <h2
                  className="font-display text-3xl font-semibold text-[#0F141C] sm:text-5xl mb-3"
                  style={{ textWrap: 'balance' }}
                >
                  Ready to build{' '}
                  <span className="text-[#7D8998] font-normal">together?</span>
                </h2>
                <p className="text-sm sm:text-base text-[#475569] max-w-xl mb-8">
                  Available for Senior AI Engineer, Founding Engineer, and Applied AI roles across the USA.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <MagneticButton>
                    <a
                      href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0F141C] hover:bg-[#1E293B] px-6 py-3 text-sm font-semibold text-white transition-all shadow-md"
                    >
                      <span>Email {resumeData.email}</span>
                    </a>
                  </MagneticButton>

                  <MagneticButton>
                    <button
                      type="button"
                      onClick={handleCopyFooterEmail}
                      className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 hover:bg-white px-5 py-3 text-sm font-semibold text-[#0F141C] transition-all"
                    >
                      {copiedFooterEmail ? (
                        <span className="text-emerald-700">✓ Copied to clipboard!</span>
                      ) : (
                        <span>Copy Email Address</span>
                      )}
                    </button>
                  </MagneticButton>

                  <MagneticButton>
                    <a
                      href="/Haripriya_Rao_Resume.pdf"
                      download="Haripriya_Rao_Resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 hover:bg-white px-5 py-3 text-sm font-semibold text-[#0F141C] transition-all"
                    >
                      <span>Download Resume (PDF)</span>
                    </a>
                  </MagneticButton>

                  <Link
                    href={`https://${resumeData.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 hover:bg-white px-5 py-3 text-sm font-semibold text-[#0F141C] transition-all"
                  >
                    <span>LinkedIn</span>
                    <span>↗</span>
                  </Link>

                  <Link
                    href={githubProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 hover:bg-white px-5 py-3 text-sm font-semibold text-[#0F141C] transition-all"
                  >
                    <span>GitHub</span>
                    <span>↗</span>
                  </Link>
                </div>

                <div className="border-t border-black/5 pt-5">
                  <p className="mono-accent text-xs tracking-wider text-[#D97706] uppercase font-semibold">
                    USA &middot; Cap Counted H1B (Eligible for Immediate Transfer)
                  </p>
                </div>
              </div>
            </TiltCard3D>
          </div>
        </Section3D>
      </div>
    </main>
  );
}
