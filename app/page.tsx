'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import Section3D from '@/components/Section3D';
import MouseSpotlight from '@/components/MouseSpotlight';
import StoryCanvasSequence from '@/components/StoryCanvasSequence';
import StoryProjectGrid from '@/components/StoryProjectGrid';
import StoryTimeline from '@/components/StoryTimeline';
import { projects } from '@/data/projects';
import { resumeData } from '@/data/resume';

const topMetrics = [
  { label: 'Token cost cut', value: '96%' },
  { label: 'State nodes', value: '22' },
  { label: 'Latency reduction', value: '40%' },
];

const githubProfile = 'https://github.com/haripriyarao26';

const skillGroups = [
  {
    title: 'Infrastructure',
    icon: '🗄️',
    items: ['AWS', 'CircleCI', 'Vercel', 'Render', 'Supabase', 'ClickHouse', 'Redis', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Core Engine',
    icon: '</>',
    items: ['Python', 'TypeScript', 'JavaScript', 'Node.js', 'LangGraph', 'Flask', 'Django', 'Express'],
  },
  {
    title: 'Frontend Systems',
    icon: '🧱',
    items: ['Next.js', 'React', 'Chakra UI', 'Bootstrap', 'HTML', 'CSS', 'GraphQL'],
  },
];

const specialties = ['Agentic Orchestration', 'AST Manipulation', 'Production Observability'];

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.22 });
  const timelineExperience = resumeData.experience;
  const [pulseToken, setPulseToken] = useState(0);

  useEffect(() => {
    const sectionIds = ['impact', 'timeline-momentum'];
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).id;
          if (!id || seen.has(id)) return;
          seen.add(id);
          setPulseToken(prev => prev + 1);
        });
      },
      { threshold: 0.42 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-slate-950 text-slate-100">
      <MouseSpotlight />

      <motion.div
        key={`lightning-${pulseToken}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.86, 0.18, 0.95, 0] }}
        transition={{ duration: 0.48, ease: 'easeInOut' }}
        className="pointer-events-none fixed inset-0 z-[55] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.95)_0%,rgba(186,230,253,0.45)_16%,rgba(56,189,248,0.2)_36%,rgba(2,6,23,0)_65%)] mix-blend-screen"
      />
      <motion.div
        key={`lightning-strike-${pulseToken}`}
        initial={{ opacity: 0, scaleY: 0.65 }}
        animate={{ opacity: [0, 1, 0.2, 0.72, 0], scaleY: [0.6, 1.08, 0.96, 1.02, 0.92] }}
        transition={{ duration: 0.52, ease: 'easeOut' }}
        className="pointer-events-none fixed left-1/2 top-0 z-[56] h-[68vh] w-[2px] -translate-x-1/2 bg-gradient-to-b from-white via-cyan-200 to-transparent blur-[0.6px]"
      />

      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ x: ['-10%', '8%', '-10%'], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="space-beam absolute -top-28 left-[-20%] h-[42rem] w-[34rem] rotate-[24deg]"
        />
        <motion.div
          animate={{ x: ['5%', '-12%', '5%'], opacity: [0.09, 0.2, 0.09] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="space-beam absolute -top-14 right-[-18%] h-[32rem] w-[28rem] -rotate-[18deg]"
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={`star-${i}`}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -10, 0] }}
            transition={{ duration: 2.6 + (i % 4), repeat: Infinity, delay: i * 0.13 }}
            className="star-dot absolute"
            style={{ left: `${8 + ((i * 17) % 84)}%`, top: `${6 + ((i * 11) % 86)}%` }}
          />
        ))}
      </div>

      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300"
      />

      <header className="glass-nav fixed top-4 left-1/2 z-50 w-[min(92vw,960px)] -translate-x-1/2 rounded-full border border-white/20 bg-slate-950/60 px-6 py-3">
        <nav className="flex items-center justify-between text-xs text-slate-200 sm:text-sm">
          <span className="tracking-[0.2em] uppercase">
            {resumeData.name}
            <span className="ml-2 hidden text-[10px] tracking-[0.14em] text-cyan-200/80 sm:inline">
              LA | Open to Relocation
            </span>
          </span>
          <div className="flex items-center gap-4">
            <a href="#impact" className="nav-link transition-colors hover:text-white">Impact</a>
            <a href="#timeline-momentum" className="nav-link transition-colors hover:text-white">Experience</a>
            <a href="#projects" className="nav-link transition-colors hover:text-white">Projects</a>
            <a href="#contact" className="nav-link transition-colors hover:text-white">Contact</a>
          </div>
        </nav>
      </header>

      <StoryCanvasSequence
        name={resumeData.name}
        tagline="Software Engineer building AI systems with product intuition, delivery speed, and trust-by-design."
      />

      <Section3D id="impact" className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(79,70,229,0.2),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.15),transparent_35%)]" />
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={spring}
        >
          <p className="text-xs tracking-[0.26em] text-cyan-200 uppercase">Six-second recruiter signal</p>
          <h2 className="mt-4 max-w-4xl text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Revenue-grade outcomes. Scalable architecture. Premium product craft.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200/90 sm:text-lg">
            I build production AI and full-stack platforms that ship quickly, stay reliable, and feel intuitive. Every
            decision ties engineering depth to business impact, so teams move faster and users trust the product.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={githubProfile}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300/35 bg-white/10 px-5 py-2.5 text-sm text-slate-100 transition hover:scale-105 hover:bg-white/20"
            >
              GitHub
            </Link>
            <Link
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-indigo-300/45 bg-indigo-500/15 px-5 py-2.5 text-sm text-indigo-100 transition hover:scale-105 hover:bg-indigo-500/25"
            >
              LinkedIn
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {topMetrics.map((metric, idx) => (
            <motion.article
              key={metric.label}
              variants={staggerItem}
              whileHover={{ y: -8, rotateX: 8, rotateY: -8, scale: 1.03, boxShadow: '0 0 32px rgba(34,211,238,0.2)' }}
              transition={spring}
              className="group relative overflow-hidden rounded-3xl border border-cyan-200/20 bg-slate-900/70 p-6 shadow-[0_22px_60px_rgba(2,6,23,0.45)] will-change-transform [transform-style:preserve-3d] backdrop-blur-md"
              style={{ perspective: 1200 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(56,189,248,0.12),transparent_40%,rgba(99,102,241,0.14))]" />
              <div className="pointer-events-none absolute right-4 top-4 h-10 w-10 rounded-full bg-cyan-300/20 blur-xl" />
              <motion.p
                className="float-pill text-3xl font-semibold text-white"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {metric.value}
              </motion.p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">{metric.label}</p>
              <p className="mt-3 text-xs text-slate-400">
                {idx === 0
                  ? 'Directly tied to Onetera multi-agent workflow optimization.'
                  : idx === 1
                    ? 'State-machine architecture powering production orchestration.'
                    : 'Measured in production after asynchronous execution redesign.'}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="mt-8 rounded-3xl border border-white/10 bg-slate-900/75 p-6 sm:p-8"
        >
          <p className="text-sm text-slate-300">
            Based in {resumeData.location}, currently on H-1B, and open to relocation for Software Engineer and
            AI opportunities where trusted AI, product momentum, and reliable delivery are mission-critical.
          </p>
        </motion.div>
      </Section3D>

      <Section3D className="mx-auto max-w-7xl px-6 py-8 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={spring}
            className="relative flex items-start justify-center"
          >
            <div className="relative h-44 w-44 rounded-full border-4 border-cyan-100/85 bg-slate-950/80 shadow-[0_16px_60px_rgba(34,211,238,0.25)]">
              <div className="flex h-full items-center justify-center text-5xl font-semibold text-white">HR</div>
            </div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-3 bottom-5 rounded-full border border-yellow-300/35 bg-slate-900/90 px-3 py-2 shadow-lg"
            >
              <span className="text-lg">👋</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.article
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 0 40px rgba(34,211,238,0.12)' }}
              transition={spring}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/70 p-7 shadow-[0_20px_60px_rgba(2,6,23,0.45)] will-change-transform backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(56,189,248,0.12),transparent_35%,rgba(129,140,248,0.12))]" />
              <h3 className="relative text-2xl font-semibold text-white">My Story</h3>
              <p className="relative mt-4 text-lg leading-relaxed text-slate-200/95">
                My journey from a Computer Science student in India to a technical leader in Los Angeles has taught me
                to build systems that are not only functional, but resilient and observable at scale.
              </p>
              <p className="relative mt-4 text-lg leading-relaxed text-slate-200/95">
                As a <strong>Software Engineer 2</strong> at Onetera (through March 2026), I architected distributed AI
                infrastructure and high-performance systems for production workloads. I hold a{' '}
                <strong>Master of Science in Computer Science</strong> from the University of Southern California, where
                I specialized in AI/ML and distributed systems.
              </p>
            </motion.article>

            <motion.article
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 0 40px rgba(99,102,241,0.12)' }}
              transition={spring}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/70 p-7 shadow-[0_20px_60px_rgba(2,6,23,0.45)] will-change-transform backdrop-blur-md"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(250deg,rgba(34,211,238,0.1),transparent_35%,rgba(99,102,241,0.1))]" />
              <h3 className="relative text-2xl font-semibold text-white">My Philosophy</h3>
              <p className="relative mt-4 text-lg leading-relaxed text-slate-200/95">
                <strong>Systems over features.</strong> The best engineering decisions account for long-term performance,
                observability, and reliability, not just immediate delivery.
              </p>
              <p className="relative mt-4 text-lg leading-relaxed text-slate-200/95">
                I focus on <strong>distributed AI infrastructure</strong>, <strong>observability systems</strong>, and{' '}
                <strong>high-performance engineering</strong> that creates measurable business outcomes.
              </p>
            </motion.article>
          </motion.div>
        </div>
      </Section3D>

      <StoryTimeline sectionId="timeline-momentum" items={timelineExperience} />

      <Section3D id="projects" className="mx-auto max-w-7xl px-6 py-24 sm:py-28">
        <motion.div
          className="mb-8 flex flex-wrap items-end justify-between gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <div>
            <p className="text-xs tracking-[0.26em] text-cyan-200 uppercase">Build portfolio</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">Selected systems and shipped work</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base">
            Modern AI engineering, secure architecture, and product-led execution across enterprise, civic tech, and
            developer tooling.
          </p>
        </motion.div>
        <StoryProjectGrid projects={projects} />
      </Section3D>

      <Section3D className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="text-3xl font-semibold text-white sm:text-4xl"
          >
            Technical Skills
          </motion.h2>
          <div className="mx-auto mt-3 h-[2px] w-20 bg-gradient-to-r from-cyan-300 via-indigo-300 to-cyan-300" />
          <motion.div
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {specialties.map(item => (
              <motion.span
                key={item}
                variants={staggerItem}
                className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-[11px] tracking-[0.12em] text-cyan-100 uppercase"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillGroups.map(group => (
            <motion.article
              key={group.title}
              variants={staggerItem}
              whileHover={{ y: -6, rotateX: 6, rotateY: -6, boxShadow: '0 0 36px rgba(34,211,238,0.14)' }}
              transition={spring}
              className="card-3d-surface rounded-3xl border border-white/12 bg-slate-900/80 p-6 shadow-[0_22px_60px_rgba(2,6,23,0.45)] will-change-transform backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold text-white">
                <span className="mr-2">{group.icon}</span>
                {group.title}
              </h3>
              <motion.div
                className="mt-4 flex flex-wrap gap-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.items.map(skill => (
                  <motion.span
                    key={`${group.title}-${skill}`}
                    variants={staggerItem}
                    whileHover={{ scale: 1.08 }}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-200 transition-colors hover:border-cyan-300/30 hover:bg-cyan-400/10"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </Section3D>

      <Section3D id="contact" className="relative overflow-hidden px-6 pt-6 pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.28),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={spring}
          className="mx-auto max-w-5xl rounded-[2rem] border border-white/15 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-950 p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.45)] will-change-transform sm:p-14"
        >
          <p className="text-xs tracking-[0.22em] text-indigo-100 uppercase">Let us build your next win</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold text-white sm:text-5xl">
            Need an engineer who can design, ship, and scale AI products?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-200/90">
            Reach out and I can walk you through architecture, delivery strategy, and product outcomes from day one.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${resumeData.email}`}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:scale-105 hover:bg-slate-100"
            >
              {resumeData.email}
            </a>
            <Link
              href={`https://${resumeData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm text-white transition hover:scale-105 hover:bg-white/20"
            >
              LinkedIn
            </Link>
          </div>
        </motion.div>
      </Section3D>
    </main>
  );
}
