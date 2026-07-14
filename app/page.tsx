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

      <header className="glass-nav fixed top-4 left-1/2 z-50 w-[min(92vw,900px)] -translate-x-1/2 rounded-full px-6 py-3">
        <nav className="flex items-center justify-between text-xs text-[var(--text-muted)] sm:text-sm">
          <div>
            <span className="font-display font-semibold text-[var(--text-primary)] tracking-tight">
              {resumeData.name}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#impact" className="nav-link transition-colors">Impact</a>
            <a href="#timeline-momentum" className="nav-link transition-colors">Experience</a>
            <a href="#projects" className="nav-link transition-colors">Projects</a>
            <a href="#contact" className="nav-link transition-colors">Contact</a>
            <a href="#contact" className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold rounded-full bg-[var(--accent)] text-[#0F0E0D] hover:bg-[#d8ff6e] transition-colors">
              Hire me
            </a>
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
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-5xl">
            Outcomes at scale
          </h2>

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

        {/* Impact Row */}
        <motion.div
          className="grid gap-6 md:grid-cols-3"
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
            className="card p-8 sm:p-10 will-change-transform flex flex-col justify-between"
          >
            <div>
              <p className="font-display font-bold leading-none text-[var(--accent)] text-6xl sm:text-7xl mb-4">
                96%
              </p>
              <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] uppercase tracking-wide">
                Token Cost Cut
              </h3>
              <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">
                Onetera multi-agent workflow optimization. Restructured orchestration layers to cache and route deeply nested state trees efficiently.
              </p>
            </div>
          </motion.article>

          {/* Card 2 */}
          <motion.article
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={spring}
            className="card p-8 sm:p-10 will-change-transform flex flex-col justify-between"
          >
            <div>
              <p className="font-display font-bold leading-none text-[var(--accent)] text-6xl sm:text-7xl mb-4">
                22
              </p>
              <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] uppercase tracking-wide">
                State Nodes
              </h3>
              <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">
                State-machine architecture powering production orchestration and agentic workflow execution.
              </p>
            </div>
          </motion.article>

          {/* Card 3 */}
          <motion.article
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={spring}
            className="card p-8 sm:p-10 will-change-transform flex flex-col justify-between"
          >
            <div>
              <p className="font-display font-bold leading-none text-[var(--accent)] text-6xl sm:text-7xl mb-4">
                40%
              </p>
              <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] uppercase tracking-wide">
                Latency Drop
              </h3>
              <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">
                Measured in production after asynchronous execution redesign and model endpoint load-balancing.
              </p>
            </div>
          </motion.article>
        </motion.div>
      </Section3D>

      {/* ── Story / About ── */}
      <Section3D className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
        <div className="max-w-[720px] mx-auto">
          <motion.article
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card p-8 sm:p-10 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-24 w-24 bg-[var(--accent)]/5 blur-2xl rounded-full" />
            <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              My Story
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--text-primary)]/90 font-light">
              Originally from Bangalore, India, and now based in the United States, I am a USC CS Master&apos;s graduate specializing in high-performance distributed systems. 
              At Onetera, I scaled civic AI infrastructure from a founding 0-to-1 prototype to investor diligence-ready production systems, cutting operational costs by 60% and latency by 40%. 
              I am now looking for my next challenge building resilient, high-throughput backends and production AI workflows.
            </p>
          </motion.article>
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
              Selected systems
            </h2>
          </div>
          <p className="max-w-[680px] text-sm text-[var(--text-muted)]">
            AI engineering, secure architecture, and product-led execution across enterprise, civic tech, and developer tooling.
          </p>
        </motion.div>
        <StoryProjectGrid projects={projects} />
      </Section3D>

      {/* ── Skills ── */}
      <Section3D className="mx-auto max-w-6xl px-6 pb-20">
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
                Specialized in building low-latency distributed systems, agentic AI architectures, and resilient developer infrastructure.
              </p>
            </div>

            {/* Specialties */}
            <div>
              <p className="mono-accent text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-3">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {specialties.map(item => (
                  <span
                    key={item}
                    className="mono-accent rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-[var(--text-primary)] uppercase tracking-wider"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Stack */}
            <div>
              <p className="mono-accent text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-3">Core Stack</p>
              <div className="flex flex-wrap gap-2.5">
                {coreStack.map(skill => (
                  <span
                    key={skill}
                    className="mono-accent rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4.5 py-2 text-sm font-semibold text-[var(--accent)] tracking-wide hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Skill Groups / Proficiencies */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="space-y-6"
          >
            <p className="mono-accent text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2">Also proficient in</p>
            
            <div className="space-y-4">
              {skillGroups.map(group => (
                <motion.article
                  key={group.title}
                  whileHover={{ x: 4 }}
                  transition={spring}
                  className="card p-5 border border-white/5 bg-[#131316] flex flex-col justify-center"
                >
                  <h3 className="font-display text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-lg">{group.icon}</span>
                    {group.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map(skill => (
                      <span
                        key={`${group.title}-${skill}`}
                        className="mono-accent rounded border border-white/5 bg-white/[0.02] px-2.5 py-1 text-xs text-[var(--text-muted)] hover:border-white/10 hover:text-[var(--text-primary)] transition-colors"
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
            Let&apos;s build together
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
          <p className="mono-accent text-[11px] tracking-[0.14em] text-[var(--text-primary)] uppercase mt-2">
            Open to SDE &amp; AI roles · H1-B cap-exempt
          </p>
        </motion.div>
      </Section3D>
    </main>
  );
}
