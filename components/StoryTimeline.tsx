'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import type { Experience } from '@/data/resume';

type StoryTimelineProps = {
  items: Experience[];
  sectionId?: string;
};

type RoleMeta = {
  milestone: string;
  impactSummary: string;
  impactTags: string[];
  scope: string;
  productDecision: string;
  stackGroups: Array<{ label: string; values: string[] }>;
};

const roleMeta: Record<string, RoleMeta> = {
  'Onetera Technologies|Software Engineer 2': {
    milestone: 'Post-Seed Scale-up and Civic AI Architecture',
    impactSummary:
      'Scaled production civic AI systems post-seed with architecture that passed investor diligence and improved operational resilience.',
    impactTags: ['60-70% Ops Cost Cut', '40% MTTR Reduction', 'Support Requests -60%'],
    scope:
      'Owned reliability, deployment velocity, and production observability while partnering directly with city stakeholders and internal PM teams.',
    productDecision:
      'Prioritized no-code program controls (Onetera Studio) so non-engineers could ship updates safely without engineering bottlenecks.',
    stackGroups: [
      { label: 'Infra', values: ['ClickHouse', 'BetterStack', 'Vercel', 'Render'] },
      { label: 'Logic', values: ['LangGraph', 'Agent Workflows', 'TypeScript', 'Cursor', '.cursorrules'] },
      { label: 'UX', values: ['Next.js', 'Operator Console', 'Self-Serve Flows'] },
    ],
  },
  'Onetera Technologies|Software Engineer 1 (Founding)': {
    milestone: '0-to-1 Foundation and Activation Engine',
    impactSummary:
      'Took platform from initial architecture to production readiness with measurable speed, reliability, and onboarding improvements.',
    impactTags: ['$1,800/mo Saved', '2x Query Performance', '99.98% Uptime', '52% Latency Drop', '22-node State Machine'],
    scope:
      'Built system abstractions, migration strategy, CI/CD, and developer workflows in close loop with founder, design, and early users.',
    productDecision:
      'Moved from Neptune to Supabase to reduce cloud spend and simplify frontend state complexity while keeping enterprise reliability.',
    stackGroups: [
      { label: 'Infra', values: ['Supabase', 'CI/CD', 'Docker', 'PostgreSQL'] },
      { label: 'Logic', values: ['LangGraph', 'Async State Machine', 'TypeScript', 'Python', 'Cursor', '.cursorrules'] },
      { label: 'UX', values: ['Next.js', 'Chakra UI', 'Figma-to-React DFS Engine'] },
    ],
  },
  'Provenir|Full Stack Engineering Intern': {
    milestone: 'Enterprise Credit Platform Reliability',
    impactSummary:
      'Delivered full-stack credit decisioning modules with strong release quality for regulated enterprise workflows.',
    impactTags: ['95% On-time Deployments', '98% Test Pass Rate'],
    scope:
      'Worked across UI, backend, and QA loops to stabilize high-risk release paths and reduce deployment regressions.',
    productDecision:
      'Resolved UI race conditions via RxJS event control to prioritize deterministic outcomes in financial user journeys.',
    stackGroups: [
      { label: 'Infra', values: ['CI Pipelines', 'Enterprise QA'] },
      { label: 'Logic', values: ['Spring Boot', 'Java', 'REST APIs'] },
      { label: 'UX', values: ['Angular', 'RxJS', 'Form Reliability'] },
    ],
  },
  'Hashedin by Deloitte (Deloitte USI)|Software Engineer 1': {
    milestone: 'Unified Hiring Data Layer at Scale',
    impactSummary:
      'Built platform modules and analytics for 4,000+ internal users by consolidating fragmented hiring data into one fast API layer.',
    impactTags: ['4,000+ Users', '15+ Data Sources', '2s -> 400ms Latency'],
    scope:
      'Owned cross-module delivery for hiring and candidate experiences, plus analytics used by leadership to improve hiring visibility.',
    productDecision:
      'Invested in a unified API contract first so analytics, workflow automation, and candidate UI could ship in parallel.',
    stackGroups: [
      { label: 'Infra', values: ['PostgreSQL Indexing', 'Unified API Layer'] },
      { label: 'Logic', values: ['Data Aggregation', 'Recruitment Workflows'] },
      { label: 'UX', values: ['React', 'ANT Design', 'Analytics Dashboard'] },
    ],
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
              milestone: `${entry.company} Engineering Milestone`,
              impactSummary: entry.achievements[0],
              impactTags: ['Production Delivery'],
              scope: entry.achievements[1] ?? 'Owned delivery across product and engineering milestones with measurable outcomes.',
              productDecision: 'Balanced reliability and product velocity to keep user-facing systems stable while shipping quickly.',
              stackGroups: [
                { label: 'Infra', values: ['Cloud', 'CI/CD'] },
                { label: 'Logic', values: ['TypeScript', 'Python'] },
                { label: 'UX', values: ['React', 'System Design'] },
              ],
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
                  <p className="translate-z-16 relative text-sm font-semibold tracking-[0.12em] text-cyan-100 uppercase">
                    {entry.period}
                  </p>
                  <h3 className="translate-z-24 relative mt-2 text-xl font-semibold text-white sm:text-2xl">
                    {meta.milestone}
                  </h3>
                  <p className="translate-z-14 relative mt-1 text-sm text-slate-400">
                    {entry.position} - {entry.company}
                  </p>
                  <div className="translate-z-20 relative mt-3 flex flex-wrap gap-2">
                    {meta.impactTags.map(tag => (
                      <span
                        key={`${roleKey}-${tag}`}
                        className="rounded-full border border-emerald-300/35 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-100"
                      >
                        [{tag}]
                      </span>
                    ))}
                  </div>
                  <ul className="translate-z-12 relative mt-4 space-y-3 text-sm text-slate-300">
                    <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-[11px] tracking-[0.16em] text-cyan-200 uppercase">Impact</span>
                      <p className="mt-1 leading-relaxed">{meta.impactSummary}</p>
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-[11px] tracking-[0.16em] text-cyan-200 uppercase">Scope</span>
                      <p className="mt-1 leading-relaxed">{meta.scope}</p>
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-[11px] tracking-[0.16em] text-cyan-200 uppercase">Product Decision</span>
                      <p className="mt-1 leading-relaxed">{meta.productDecision}</p>
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-[11px] tracking-[0.16em] text-cyan-200 uppercase">Stack</span>
                      <div className="mt-2 space-y-2">
                        {meta.stackGroups.map(group => (
                          <p key={`${roleKey}-${group.label}`} className="text-xs leading-relaxed text-slate-300">
                            <span className="font-semibold text-cyan-100">{group.label}:</span> {group.values.join(', ')}
                          </p>
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
