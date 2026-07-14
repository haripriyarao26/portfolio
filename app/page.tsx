'use client';

import Link from 'next/link';

import { motion, useScroll, useSpring } from 'framer-motion';
import Section3D from '@/components/Section3D';
import MouseSpotlight from '@/components/MouseSpotlight';
import StoryCanvasSequence from '@/components/StoryCanvasSequence';
import StoryProjectGrid from '@/components/StoryProjectGrid';
import StoryTimeline from '@/components/StoryTimeline';
import { projects } from '@/data/projects';
import { resumeData } from '@/data/resume';

import ParticleNetwork from '@/components/ParticleNetwork';


const githubProfile = 'https://github.com/haripriyarao26';

const coreStack = ['LangGraph', 'TypeScript', 'Next.js', 'Python', 'Supabase', 'ClickHouse'];

const skillGroups = [
  {
    title: 'Infrastructure',
    icon: '🗄️',
    items: ['AWS', 'CircleCI', 'Vercel', 'Render', 'Redis', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Core Engine',
    icon: '</>',
    items: ['JavaScript', 'Node.js', 'Flask', 'Django', 'Express'],
  },
  {
    title: 'Frontend Systems',
    icon: '🧱',
    items: ['React', 'Chakra UI', 'Bootstrap', 'HTML', 'CSS', 'GraphQL'],
  },
];

const specialties = ['Agentic Orchestration', 'AST Manipulation', 'Production Observability'];

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

      {/* Scroll progress — thin chartreuse (accent use #1) */}
      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left progress-bar"
      />

      {/* ── Navigation ── */}
      <header className="glass-nav fixed top-4 left-1/2 z-50 w-[min(92vw,900px)] -translate-x-1/2 rounded-full px-6 py-3">
        <nav className="flex items-center justify-between text-xs text-[var(--text-muted)] sm:text-sm">
          <div>
            <span className="font-display font-semibold text-[var(--text-primary)] tracking-tight">
              {resumeData.name}
            </span>
            <span className="ml-2 hidden text-[10px] tracking-[0.14em] text-[var(--text-muted)] sm:inline mono-accent">
              AI &amp; Full-Stack Engineer
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#impact"            className="nav-link transition-colors">Impact</a>
            <a href="#timeline-momentum" className="nav-link transition-colors">Experience</a>
            <a href="#projects"          className="nav-link transition-colors">Projects</a>
            <a href="#contact"           className="nav-link transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <StoryCanvasSequence
        name={resumeData.name}
        tagline="Software Engineer building AI systems with product intuition, delivery speed, and trust-by-design."
      />

      {/* ── Impact ── */}
      <Section3D id="impact" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={spring}
          className="mb-12"
        >
          <p className="mono-accent text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase mb-3">
            Six-second recruiter signal
          </p>
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl max-w-3xl">
            Revenue-grade outcomes. Scalable architecture.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
            I build production AI and full-stack platforms that ship quickly, stay reliable, and feel intuitive. Every
            decision ties engineering depth to business impact.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={githubProfile}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-primary)] transition hover:border-white/20 hover:bg-[var(--bg-card)]"
            >
              GitHub
            </Link>
            <Link
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-primary)] transition hover:border-white/20 hover:bg-[var(--bg-card)]"
            >
              LinkedIn
            </Link>
          </div>
        </motion.div>

        {/* Impact bento */}
        <motion.div
          className="grid gap-4 md:grid-cols-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Large metric */}
          <motion.article
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={spring}
            className="card md:col-span-8 p-8 sm:p-12 will-change-transform"
          >
            <p className="font-display font-bold leading-none text-[var(--accent)] text-7xl sm:text-9xl mb-4">
              96%
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-primary)] uppercase tracking-wide">
              Token Cost Cut
            </h3>
            <p className="mt-4 max-w-xl text-sm text-[var(--text-muted)] leading-relaxed">
              Onetera multi-agent workflow optimization. Restructured orchestration layers to cache and route deeply nested state trees efficiently.
            </p>
          </motion.article>

          {/* Side metrics */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <motion.article
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={spring}
              className="card flex-1 p-8 will-change-transform flex flex-col justify-center"
            >
              <p className="font-display font-bold leading-none text-[var(--text-primary)] text-5xl mb-2">22</p>
              <h3 className="mono-accent text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase">State Nodes</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                State-machine architecture powering production orchestration.
              </p>
            </motion.article>

            <motion.article
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={spring}
              className="card flex-1 p-8 will-change-transform flex flex-col justify-center"
            >
              <p className="font-display font-bold leading-none text-[var(--text-primary)] text-5xl mb-2">40%</p>
              <h3 className="mono-accent text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase">Latency Reduction</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                Measured in production after asynchronous execution redesign.
              </p>
            </motion.article>
          </div>
        </motion.div>
      </Section3D>

      {/* ── Story / About ── */}
      <Section3D className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={spring}
            className="flex items-start justify-center"
          >
            <div className="h-36 w-36 rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center">
              <span className="font-display text-4xl font-bold text-[var(--text-primary)]">HR</span>
            </div>
          </motion.div>

          {/* Story blocks */}
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.article
              variants={staggerItem}
              className="card p-7"
            >
              <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-4">My Story</h3>
              <p className="text-base leading-relaxed text-[var(--text-muted)]">
                USC CS grad (distributed systems + AI/ML) turned production engineer. Most recently at Onetera, where I scaled civic AI infrastructure from seed-stage architecture to investor diligence-ready systems.
              </p>
            </motion.article>

            <motion.article
              variants={staggerItem}
              className="card p-7"
            >
              <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-4">My Philosophy</h3>
              <p className="text-base leading-relaxed text-[var(--text-muted)]">
                I engineer systems that empower teams to ship faster—making observability the default and reliability under load a guarantee. My focus centers on distributed AI infrastructure, advanced backend patterns, and robust system observability. I believe elite engineering is measured by two things: systemic resilience and accelerated business velocity.
              </p>
            </motion.article>
          </motion.div>
        </div>
      </Section3D>

      {/* ── Timeline ── */}
      <StoryTimeline sectionId="timeline-momentum" items={timelineExperience} />

      {/* ── Projects ── */}
      <Section3D id="projects" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <motion.div
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <div>
            <p className="mono-accent text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase mb-3">Build portfolio</p>
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl">
              Selected systems and shipped work
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--text-muted)]">
            AI engineering, secure architecture, and product-led execution across enterprise, civic tech, and developer tooling.
          </p>
        </motion.div>
        <StoryProjectGrid projects={projects} />
      </Section3D>

      {/* ── Skills ── */}
      <Section3D className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">Technical Skills</h2>
          <div className="mx-auto mt-3 h-[1px] w-16 bg-[var(--border)]" />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {specialties.map(item => (
              <span
                key={item}
                className="mono-accent rounded-full border border-[var(--border)] px-3 py-1 text-[11px] tracking-[0.12em] text-[var(--text-muted)] uppercase"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Core Stack — 6 defining technologies */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mb-8"
        >
          <p className="mono-accent text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-4 text-center">Core Stack</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {coreStack.map(skill => (
              <span
                key={skill}
                className="mono-accent rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/5 px-4 py-1.5 text-sm font-semibold text-[var(--accent)] tracking-wide"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Also proficient in — collapsible */}
        <details className="group">
          <summary className="flex items-center justify-center gap-2 text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase cursor-pointer select-none hover:text-[var(--text-primary)] transition-colors mb-6">
            <svg
              className="h-3 w-3 transition-transform group-open:rotate-90"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Also proficient in…
          </summary>
          <motion.div
            className="grid gap-4 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skillGroups.map(group => (
              <motion.article
                key={group.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={spring}
                className="card p-6 will-change-transform"
              >
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  <span className="mr-2">{group.icon}</span>
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map(skill => (
                    <span
                      key={`${group.title}-${skill}`}
                      className="mono-accent rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)] hover:border-white/20 hover:text-[var(--text-primary)] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </details>
      </Section3D>

      {/* ── Contact ── */}
      <Section3D id="contact" className="relative overflow-hidden px-6 pt-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mx-auto max-w-3xl card p-10 sm:p-14 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl mb-4">
            I&apos;m available now.<br />Let&apos;s build something.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href={`mailto:${resumeData.email}`}
              className="btn-primary"
            >
              Email me
            </a>
            <Link
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              LinkedIn
            </Link>
          </div>
          <p className="mono-accent text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase mt-2">
            Open to SDE &amp; AI roles · H1-B cap-exempt
          </p>
        </motion.div>
      </Section3D>
    </main>
  );
}
