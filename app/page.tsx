'use client';

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
    category: 'Multi-Agent Orchestration & Core Frameworks',
    badge: 'State Machines & Tool Use',
    headline: 'Deterministic state-machine workflows, cyclic graph resolution, and tool routing.',
    tech: [
      { name: 'LangGraph', role: '22-node cyclic state machines, conditional routing, checkpoint persistence' },
      { name: 'LangChain', role: 'Open-source security hardening (PR #2568), runnables, memory adapters' },
      { name: 'Anthropic API / Claude SDK', role: 'Tool-use agents, structured JSON parsing, prompt guardrails' },
      { name: 'Model Context Protocol (MCP)', role: 'Standardized server/client tool invocation protocols' },
      { name: 'Google Gemini API', role: 'Multimodal analysis, Cookbooks contributor (PR #1088)' },
    ],
  },
  {
    category: 'Evaluation Harnesses & AI Reliability',
    badge: 'Empirical Evals & Gating',
    headline: 'Empirical regression testing, golden datasets, and latency optimization.',
    tech: [
      { name: 'Golden Dataset Evals', role: '100+ annotated ground-truth test suites for LLM extraction' },
      { name: 'A/B Regression Gating', role: 'Statistical field-agreement scoring (>95% threshold)' },
      { name: 'AST & Regex Parsers', role: 'Deterministic AST salvage layer for guaranteed JSON schema recovery' },
      { name: 'Adversarial Test Fixtures', role: 'Stress-testing nested forward chains and circular references' },
    ],
  },
  {
    category: 'Distributed Systems, Cloud & Observability',
    badge: 'Telemetry & Distributed State',
    headline: 'High-throughput telemetry, real-time sync, and distributed state coordination.',
    tech: [
      { name: 'ClickHouse', role: 'Sub-second real-time LLM telemetry and agent execution analytics' },
      { name: 'Redis', role: 'Distributed locks, rate-limiting, and short-term state caching' },
      { name: 'Supabase & PostgreSQL', role: 'Row-level security, pgvector semantic search, transactional storage' },
      { name: 'Python & TypeScript', role: 'AsyncIO concurrency (asyncio.gather), Next.js App Router, Node.js' },
      { name: 'AWS & CI/CD Pipelines', role: 'ECS, S3, IAM, GitHub Actions canary deployments (98% pass rate)' },
    ],
  },
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.22 });
  const timelineExperience = resumeData.experience;

  return (
    <main className="relative text-[var(--text-primary)]" style={{ background: 'var(--bg-dark)' }}>
      <ParticleNetwork />
      <MouseSpotlight />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left progress-bar"
      />

      {/* Glass navigation */}
      <header className="glass-nav fixed top-4 left-1/2 z-50 w-[min(96vw,1040px)] -translate-x-1/2 rounded-full px-5 py-2.5">
        <nav className="flex items-center justify-between text-xs sm:text-sm">
          <div className="shrink-0 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#E07A5F] shadow-[0_0_10px_rgba(224,122,95,0.8)]" />
            <span className="font-bold text-sm sm:text-base text-[#FAF6F0] tracking-tight">
              {resumeData.name}
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-4 text-[#A69F94]">
            <a href="#case-studies" className="nav-link transition-colors hover:text-[#FAF6F0]">Case Studies</a>
            <a href="#timeline-momentum" className="nav-link transition-colors hover:text-[#FAF6F0]">Experience</a>
            <a href="#projects" className="nav-link transition-colors hover:text-[#FAF6F0]">Projects</a>
            <a href="#notes" className="nav-link transition-colors hover:text-[#FAF6F0]">Notes</a>
            <a href="#stack" className="nav-link transition-colors hover:text-[#FAF6F0]">Stack</a>
            <a href="#education" className="nav-link transition-colors hover:text-[#FAF6F0]">Education</a>
            <a href="#certifications" className="nav-link transition-colors hover:text-[#FAF6F0]">Certs</a>
            <a
              href="/Haripriya_Rao_Resume.pdf"
              download="Haripriya_Rao_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border border-white/15 bg-white/5 hover:border-[#E07A5F]/40 hover:text-[#F4A261] text-[#FAF6F0] transition-all"
            >
              <svg className="w-3.5 h-3.5 text-[#E07A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume (PDF)
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold rounded-full bg-[#E07A5F] text-[#0E0D13] hover:bg-[#E8886E] transition-all shadow-[0_0_16px_rgba(224,122,95,0.3)]"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile / Tablet nav */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="/Haripriya_Rao_Resume.pdf"
              download="Haripriya_Rao_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full border border-white/20 bg-white/5 text-[#FAF6F0]"
            >
              Resume (PDF)
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-3 py-1 text-[11px] font-bold rounded-full bg-[#E07A5F] text-[#0E0D13]"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <StoryCanvasSequence
        name={resumeData.name}
        tagline="I cut LLM inference costs 96% and orchestration latency 40% in production agent systems."
      />

      {/* ── Executive Summary & Production Philosophy ── */}
      <Section3D id="impact" className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={spring}
          className="card p-8 sm:p-12 border border-white/10 bg-[#131217]"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="mono-accent text-xs tracking-[0.22em] text-[#E07A5F] uppercase font-semibold">Executive Summary</span>
            <span className="text-white/20">&middot;</span>
            <span className="mono-accent text-xs tracking-[0.16em] text-[#A69F94] uppercase">Production Engineering</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight">
            Bridging complex multi-agent orchestration with deterministic reliability.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] sm:text-base text-[var(--text-muted)] leading-relaxed">
            I partner directly with cross-functional stakeholders — from <strong>NVIDIA engineers</strong> to <strong>city officials across 6 roadmap phases</strong> — translating high-stakes business requirements into deterministic, low-latency AI pipelines. By owning the complete lifecycle from multi-agent orchestration and AST parsers to real-time ClickHouse telemetry, I ensure systems maintain strict data consistency and sub-second execution under peak production load.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/Haripriya_Rao_Resume.pdf"
              download="Haripriya_Rao_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-2.5 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)]/20"
            >
              Download Resume (PDF)
            </a>
            <Link
              href={githubProfile}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-primary)] transition hover:border-white/20 hover:bg-[var(--bg-card)]"
            >
              GitHub Profile
            </Link>
            <Link
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-primary)] transition hover:border-white/20 hover:bg-[var(--bg-card)]"
            >
              LinkedIn Profile
            </Link>
          </div>
        </motion.div>
      </Section3D>

      {/* ── 2 Flagship Case Studies (JPMorgan & Onetera) ── */}
      <CaseStudiesSection />

      {/* ── Career Timeline ── */}
      <StoryTimeline sectionId="timeline-momentum" items={timelineExperience} />

      {/* ── Projects & Open Source (2-Tier Layout) ── */}
      <Section3D id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-28">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="mono-accent text-xs tracking-[0.22em] text-[#E07A5F] uppercase font-semibold">Code &amp; Contributions</span>
            <span className="text-white/20">&middot;</span>
            <span className="mono-accent text-xs tracking-[0.16em] text-[#A69F94] uppercase">Tiered Portfolio</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl">
            Open Source PRs &amp; Agent Prototypes
          </h2>
          <p className="mt-3 text-base text-[var(--text-muted)] max-w-2xl">
            Merged contributions to official Google &amp; OpenAI ecosystem repositories, backed by autonomous developer agent swarms.
          </p>
        </motion.div>
        <StoryProjectGrid projects={projects} />
      </Section3D>

      {/* ── Engineering Notes: How I Think About Systems ── */}
      <EngineeringNotes />

      {/* ── Additive Engineering Stack & Production Depth ── */}
      <Section3D id="stack" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="mono-accent text-xs tracking-[0.22em] text-[#E07A5F] uppercase font-semibold">Technical Mastery</span>
            <span className="text-white/20">&middot;</span>
            <span className="mono-accent text-xs tracking-[0.16em] text-[#A69F94] uppercase">Production Depth</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#FAF6F0] tracking-tight">
            Engineering Stack &amp; Production Context
          </h2>
          <p className="mt-3 text-base text-[#A69F94] max-w-2xl">
            A granular breakdown of architectural depth, domain competencies, and real-world system responsibilities for each core technology.
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
              className="card p-6 sm:p-7 border border-white/10 bg-[#131217] flex flex-col justify-between hover:border-[#E07A5F]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="mono-accent text-[11px] font-bold text-[#E07A5F] uppercase tracking-wider">
                    {category.badge}
                  </span>
                  <span className="mono-accent text-[10px] text-white/30 font-mono">0{idx + 1}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#FAF6F0] mb-2 leading-snug">
                  {category.category}
                </h3>
                <p className="text-xs text-[#A69F94] mb-6 leading-relaxed">
                  {category.headline}
                </p>

                <div className="space-y-3.5 border-t border-white/5 pt-5">
                  {category.tech.map(item => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E07A5F]" />
                        <span className="font-display text-xs font-bold text-[#FAF6F0]">{item.name}</span>
                      </div>
                      <p className="text-[11px] text-[#8C857A] pl-3.5 leading-normal">
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

      {/* ── Education ── */}
      <Education />

      {/* ── Certifications ── */}
      <Section3D id="certifications" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mb-8"
        >
          <p className="mono-accent text-xs tracking-[0.22em] text-[var(--accent)] uppercase mb-2">Verified Badges</p>
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-4xl">
            Certifications
          </h2>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Card 1: CCA-F */}
          <motion.div
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card p-6 border border-[var(--accent)]/30 hover:border-[var(--accent)]/60 transition-colors flex flex-row items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <span className="mono-accent text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase font-bold">Anthropic</span>
              <h3 className="font-display text-sm sm:text-base font-bold text-[var(--text-primary)] mt-1 leading-tight">
                Claude Certified Architect – Foundations (CCA-F)
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">Agentic Workflows, Tool Use, Prompt Guardrails &amp; LLM Architecture</p>
            </div>
            <a
              href="https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile"
              target="_blank"
              rel="noreferrer"
              className="mono-accent shrink-0 rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 px-3 py-1.5 text-[11px] font-bold text-[var(--accent)] tracking-wide transition-colors whitespace-nowrap"
            >
              CCA-F ↗
            </a>
          </motion.div>

          {/* Card 2: AWS AI Practitioner */}
          <motion.div
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card p-6 border border-white/10 hover:border-[var(--accent)]/40 transition-colors flex flex-row items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <span className="mono-accent text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase font-semibold">Amazon Web Services</span>
              <h3 className="font-display text-sm sm:text-base font-bold text-[var(--text-primary)] mt-1 leading-tight">
                AWS Certified AI Practitioner
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">AI/ML Fundamentals, Generative AI Systems &amp; Responsible AI</p>
            </div>
            <a
              href="https://www.credly.com/badges/898b89f1-5512-4d4a-8ba6-6a1597c7c510/public_url"
              target="_blank"
              rel="noreferrer"
              className="mono-accent shrink-0 rounded-full border border-white/20 bg-white/5 hover:border-[var(--accent)]/40 px-3 py-1.5 text-[11px] font-semibold text-[var(--text-primary)]/90 tracking-wide transition-colors whitespace-nowrap"
            >
              AWS ↗
            </a>
          </motion.div>
        </div>
      </Section3D>

      {/* ── Contact ── */}
      <Section3D id="contact" className="relative overflow-hidden px-4 sm:px-6 pt-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mx-auto max-w-3xl card p-10 sm:p-14 text-center border border-white/10"
        >
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl mb-3">
            Let&apos;s build together
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto mb-8">
            Available for Senior AI Engineer, Founding Engineer, and Applied AI roles. Based in the San Francisco Bay Area.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href={`mailto:${resumeData.email}`}
              className="btn-primary"
            >
              Email ({resumeData.email})
            </a>
            <a
              href="/Haripriya_Rao_Resume.pdf"
              download="Haripriya_Rao_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-2.5 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume (PDF)
            </a>
            <Link
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              LinkedIn Profile
            </Link>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="mono-accent text-[11px] tracking-[0.14em] text-[var(--accent)] uppercase font-semibold">
              San Francisco Bay Area &middot; Cap-Exempt H-1B (Eligible for Immediate Transfer)
            </p>
          </div>
        </motion.div>
      </Section3D>
    </main>
  );
}
