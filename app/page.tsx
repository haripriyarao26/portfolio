'use client';

import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import Section3D from '@/components/Section3D';
import MouseSpotlight from '@/components/MouseSpotlight';
import StoryCanvasSequence from '@/components/StoryCanvasSequence';
import StoryProjectGrid from '@/components/StoryProjectGrid';
import StoryTimeline from '@/components/StoryTimeline';
import TokenOptimizationCaseStudy from '@/components/TokenOptimizationCaseStudy';
import Education from '@/components/Education';
import { projects } from '@/data/projects';
import { resumeData } from '@/data/resume';
import ParticleNetwork from '@/components/ParticleNetwork';

const githubProfile = `https://${resumeData.github}`;

const coreStack = [
  'LangGraph',
  'Claude SDK / Anthropic API',
  'Model Context Protocol (MCP)',
  'Python',
  'TypeScript',
  'Next.js',
  'ClickHouse',
  'Supabase',
  'PostgreSQL',
  'Redis'
];

const skillGroups = [
  {
    title: 'Frontier AI & Orchestration',
    icon: '⚡',
    items: [
      'AI Agents',
      'Agentic Workflows',
      'LangGraph',
      'LangChain',
      'Multi-Agent Systems',
      'RAG Pipelines',
      'Tool Use',
      'Prompt Guardrails',
      'AI Evaluation Frameworks'
    ],
  },
  {
    title: 'Frontier Models & SDKs',
    icon: '🧠',
    items: [
      'Claude 3.5 / 3.7',
      'GPT-5.5 / GPT-4o',
      'Anthropic API',
      'Model Context Protocol (MCP)',
      'Google Gemini API'
    ],
  },
  {
    title: 'Data, Cloud & Reliability',
    icon: '🗄️',
    items: [
      'PostgreSQL',
      'Supabase',
      'Redis Distributed Locks',
      'ClickHouse Telemetry',
      'AWS',
      'Vercel',
      'Render',
      'CI/CD Canary Pipelines'
    ],
  },
];

const specialties = [
  'Multi-Agent Orchestration',
  'Token-Cost Optimization',
  'AST Manipulation & Code Gen',
  'Production Observability & Evals'
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
      <header className="glass-nav fixed top-4 left-1/2 z-50 w-[min(94vw,980px)] -translate-x-1/2 rounded-full px-5 py-2.5">
        <nav className="flex items-center justify-between text-xs sm:text-sm">
          <div className="shrink-0 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#E07A5F] shadow-[0_0_10px_rgba(224,122,95,0.8)]" />
            <span className="font-bold text-sm sm:text-base text-[#FAF6F0] tracking-tight">
              {resumeData.name}
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 text-[#A69F94]">
            <a href="#case-study" className="nav-link transition-colors hover:text-[#FAF6F0]">Deep Dive</a>
            <a href="#timeline-momentum" className="nav-link transition-colors hover:text-[#FAF6F0]">Experience</a>
            <a href="#projects" className="nav-link transition-colors hover:text-[#FAF6F0]">Projects</a>
            <a href="#education" className="nav-link transition-colors hover:text-[#FAF6F0]">Education</a>
            <a href="#certifications" className="nav-link transition-colors hover:text-[#FAF6F0]">Certs</a>
            <a
              href="/resume.pdf"
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

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="/resume.pdf"
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

      {/* ── Impact & Stakeholder Outcomes ── */}
      <Section3D id="impact" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={spring}
          className="mb-10"
        >
          <p className="mono-accent text-xs tracking-[0.22em] text-[var(--accent)] uppercase mb-2">Production Velocity</p>
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl">
            Outcomes at scale
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] sm:text-base text-[var(--text-muted)] leading-relaxed">
            I partner directly with cross-functional stakeholders — from <strong>NVIDIA engineers</strong> to <strong>city officials across 6 roadmap phases</strong> — translating complex operational requirements into deterministic, high-throughput AI pipelines. By owning the complete lifecycle from multi-agent orchestration and AST parsers to real-time ClickHouse telemetry, I ensure systems maintain strict data consistency and sub-second execution under peak production load.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
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

        {/* Impact Row */}
        <motion.div
          className="grid gap-4 grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Card 1 */}
          <motion.article
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={spring}
            className="card p-5 sm:p-7 will-change-transform flex flex-col justify-between"
          >
            <div>
              <p className="font-display font-bold leading-none text-[var(--accent)] text-4xl sm:text-5xl mb-3">
                96%
              </p>
              <h3 className="font-display text-xs sm:text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide mb-2">
                Token Cost Cut
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed hidden sm:block">
                Slashed payload from 200KB to 8KB per call, unlocking 255+ agentic program steps.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[var(--accent)]">
              200KB → 8KB / call
            </div>
          </motion.article>

          {/* Card 2 */}
          <motion.article
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={spring}
            className="card p-5 sm:p-7 will-change-transform flex flex-col justify-between"
          >
            <div>
              <p className="font-display font-bold leading-none text-[var(--accent)] text-4xl sm:text-5xl mb-3">
                40%
              </p>
              <h3 className="font-display text-xs sm:text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide mb-2">
                Latency Drop
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed hidden sm:block">
                Measured in production via a 22-node asynchronous state machine with parallel scheduling.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[var(--accent)]">
              22-node async DAG
            </div>
          </motion.article>

          {/* Card 3 */}
          <motion.article
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={spring}
            className="card p-5 sm:p-7 will-change-transform flex flex-col justify-between"
          >
            <div>
              <p className="font-display font-bold leading-none text-[var(--accent)] text-4xl sm:text-5xl mb-3">
                52%
              </p>
              <h3 className="font-display text-xs sm:text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide mb-2">
                Extraction Speedup
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed hidden sm:block">
                Accelerated LLM extraction (40.8s to 19.6s) at 95% field agreement via golden dataset evals.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[var(--accent)]">
              40.8s → 19.6s (95% agree)
            </div>
          </motion.article>

          {/* Card 4 */}
          <motion.article
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={spring}
            className="card p-5 sm:p-7 will-change-transform flex flex-col justify-between"
          >
            <div>
              <p className="font-display font-bold leading-none text-[var(--accent)] text-4xl sm:text-5xl mb-3">
                99.98%
              </p>
              <h3 className="font-display text-xs sm:text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide mb-2">
                Platform Uptime
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed hidden sm:block">
                Delivered multi-tenant platform with zero scope creep across 6 roadmap phases.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[var(--accent)]">
              ClickHouse telemetry
            </div>
          </motion.article>
        </motion.div>
      </Section3D>

      {/* ── Deep Dive Case Study ── */}
      <TokenOptimizationCaseStudy />

      {/* ── Career Timeline ── */}
      <StoryTimeline sectionId="timeline-momentum" items={timelineExperience} />

      {/* ── Projects & Open Source ── */}
      <Section3D id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-28">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <p className="mono-accent text-xs tracking-[0.22em] text-[var(--accent)] uppercase mb-2">Code &amp; Contributions</p>
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl">
            Projects &amp; Open Source Contributions
          </h2>
          <p className="mt-3 text-base text-[var(--text-muted)] max-w-2xl">
            Official contributions to frontier model cookbooks, LangChain security mitigations, and autonomous agent swarms.
          </p>
        </motion.div>
        <StoryProjectGrid projects={projects} />
      </Section3D>

      {/* ── Skills & Frontier Stack ── */}
      <Section3D className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Core Focus & Tech */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="space-y-8"
          >
            <div>
              <p className="mono-accent text-xs tracking-[0.22em] text-[var(--accent)] uppercase mb-2">Technical focus</p>
              <h2 className="font-display text-3xl font-extrabold text-[var(--text-primary)] sm:text-5xl">
                Engineering Stack
              </h2>
              <p className="mt-4 text-[15px] text-[var(--text-muted)] leading-relaxed max-w-md">
                Focused on low-latency multi-agent orchestration, evaluation harnesses, and deterministic production AI infrastructure.
              </p>
            </div>

            {/* Specialties */}
            <div>
              <p className="mono-accent text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-3">Core Specialties</p>
              <div className="flex flex-wrap gap-2">
                {specialties.map(item => (
                  <span
                    key={item}
                    className="mono-accent rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[var(--text-primary)] uppercase tracking-wider"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Stack */}
            <div>
              <p className="mono-accent text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-3">Primary Tech</p>
              <div className="flex flex-wrap gap-2.5">
                {coreStack.map(skill => (
                  <span
                    key={skill}
                    className="mono-accent rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[var(--accent)] tracking-wide hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Frontier Skill Groups */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="space-y-6"
          >
            <p className="mono-accent text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2">Domain Competencies</p>

            <div className="space-y-4">
              {skillGroups.map(group => (
                <motion.article
                  key={group.title}
                  whileHover={{ x: 4 }}
                  transition={spring}
                  className="card p-5 border border-white/10 bg-[#131316] flex flex-col justify-center"
                >
                  <h3 className="font-display text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-lg">{group.icon}</span>
                    {group.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map(skill => (
                      <span
                        key={`${group.title}-${skill}`}
                        className="mono-accent rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-[var(--text-muted)] hover:border-white/20 hover:text-[var(--text-primary)] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
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
              href="/resume.pdf"
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
