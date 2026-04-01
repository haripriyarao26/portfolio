'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { Experience } from '@/data/resume';

type StoryTimelineProps = {
  items: Experience[];
  sectionId?: string;
};

const roleMeta: Record<string, { scope: string; stack: string[] }> = {
  'Onetera Technologies|Software Engineer 2': {
    scope: 'Owned architecture, reliability, and delivery loops for production civic AI systems after seed-stage scale-up.',
    stack: ['TypeScript', 'Next.js', 'CircleCI', 'Vercel', 'Render', 'ClickHouse', 'BetterStack', 'AI Agents'],
  },
  'Onetera Technologies|Software Engineer 1 (Founding)': {
    scope: 'Built 0->1 platform foundations with product, design, and leadership to establish scale-ready engineering practices.',
    stack: ['TypeScript', 'Next.js', 'Chakra UI', 'CI/CD', 'System Design', 'Documentation'],
  },
  'Provenir|Full Stack Engineering Intern': {
    scope: 'Delivered enterprise features across the full SDLC for a credit risk SaaS platform with strong release discipline.',
    stack: ['Angular', 'Spring Boot', 'Java', 'REST APIs', 'QA', 'Code Review'],
  },
  'Hashedin by Deloitte (Deloitte USI)|Software Engineer 1': {
    scope: 'Shipped enterprise recruiting platform modules and analytics used by leadership for decision-making at scale.',
    stack: ['JavaScript', 'React', 'ANT Design', 'Data Visualization', 'Full-stack Engineering'],
  },
};

export default function StoryTimeline({ items, sectionId = 'timeline' }: StoryTimelineProps) {
  const timelineRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 35%'],
  });

  const lineScale = useSpring(scrollYProgress, { stiffness: 130, damping: 25, mass: 0.35 });
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section id={sectionId} ref={timelineRef} className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20">
      <div className="mb-8">
        <p className="text-xs tracking-[0.26em] text-indigo-200 uppercase">Career momentum</p>
        <h2 className="mt-3 text-2xl font-semibold text-white sm:text-4xl">
          Timeline of impact as systems scale
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-[2px] overflow-hidden rounded-full bg-white/12 sm:left-1/2 sm:-translate-x-1/2">
          <motion.div
            style={{ scaleY: lineScale, opacity: glowOpacity }}
            className="h-full w-full origin-top bg-gradient-to-b from-cyan-300 via-indigo-400 to-emerald-300 shadow-[0_0_24px_rgba(99,102,241,0.8)]"
          />
        </div>

        <div className="space-y-8 sm:space-y-12">
          {items.map((entry, idx) => {
            const isRight = idx % 2 === 1;
            const roleKey = `${entry.company}|${entry.position}`;
            const meta = roleMeta[roleKey] ?? {
              scope: entry.achievements[1] ?? 'Owned delivery across product and engineering milestones with measurable outcomes.',
              stack: ['TypeScript', 'React', 'System Design', 'Cloud', 'Observability'],
            };

            return (
              <div key={`${entry.company}-${entry.period}`} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  whileHover={{ y: -8, rotateX: 8, rotateY: isRight ? 6 : -6, scale: 1.01 }}
                  className={`card-3d-surface ml-12 rounded-3xl border border-white/14 bg-slate-900/75 p-6 shadow-[0_28px_80px_rgba(2,6,23,0.5)] backdrop-blur-md [transform-style:preserve-3d] sm:ml-0 sm:w-[46%] ${
                    isRight ? 'sm:ml-auto' : ''
                  }`}
                  style={{ perspective: 1400 }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(110deg,rgba(56,189,248,0.1),transparent_35%,rgba(99,102,241,0.12))]" />
                  <div className="orbital-ring pointer-events-none absolute right-5 top-5 h-16 w-16 rounded-full border border-cyan-200/30" />
                  <div className="orbital-ring orbital-ring-delay pointer-events-none absolute right-5 top-5 h-16 w-16 rounded-full border border-indigo-200/35" />
                  <p className="translate-z-16 relative text-xs tracking-[0.2em] text-cyan-200 uppercase">{entry.period}</p>
                  <h3 className="translate-z-24 relative mt-2 text-xl font-semibold text-white">
                    {entry.position} - {entry.company}
                  </h3>
                  <ul className="translate-z-12 relative mt-4 space-y-3 text-sm text-slate-300">
                    <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-[11px] tracking-[0.16em] text-cyan-200 uppercase">Impact</span>
                      <p className="mt-1 leading-relaxed">{entry.achievements[0]}</p>
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-[11px] tracking-[0.16em] text-cyan-200 uppercase">Scope</span>
                      <p className="mt-1 leading-relaxed">{meta.scope}</p>
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-[11px] tracking-[0.16em] text-cyan-200 uppercase">Stack</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {meta.stack.map(tech => (
                          <span
                            key={`${roleKey}-${tech}`}
                            className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-2.5 py-1 text-[11px] text-cyan-100"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.07 }}
                  className="absolute left-4 top-7 h-4 w-4 -translate-x-1/2 rounded-full border border-cyan-200/70 bg-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.9)] sm:left-1/2"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
