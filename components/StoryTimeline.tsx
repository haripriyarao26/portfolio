'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Section3D from '@/components/Section3D';
import type { Experience } from '@/data/resume';

type StoryTimelineProps = {
  items: Experience[];
  sectionId?: string;
};

type RoleMeta = {
  milestone: string;
  narrative: string;          // ONE sentence
  impactTags: string[];
  scope: string;
  productDecision: string;
  stackGroups: Array<{ label: string; values: string[] }>;
};

const roleMeta: Record<string, RoleMeta> = {
  'Onetera Technologies|Software Engineer 2': {
    milestone: 'Post-Seed Scale-up · Civic AI Architecture',
    narrative:
      'Scaled civic AI platform from seed-stage prototype to investor diligence-ready production, cutting ops costs 60–70% and resolving incidents 40% faster.',
    impactTags: ['60–70% Ops Cost Cut', '40% MTTR Reduction', 'Support Requests −60%'],
    scope:
      'Owned reliability, deployment velocity, and production observability while partnering directly with city stakeholders and internal PM teams.',
    productDecision:
      'Prioritized no-code program controls (Onetera Studio) so non-engineers could ship updates safely without engineering bottlenecks.',
    stackGroups: [
      { label: 'Infra', values: ['ClickHouse', 'BetterStack', 'Vercel', 'Render'] },
      { label: 'Logic', values: ['LangGraph', 'Agent Workflows', 'TypeScript', '.cursorrules'] },
      { label: 'UX',    values: ['Next.js', 'Operator Console', 'Self-Serve Flows'] },
    ],
  },
  'Onetera Technologies|Software Engineer 1 (Founding)': {
    milestone: '0-to-1 Foundation · Activation Engine',
    narrative:
      'Took platform from zero to production with a 22-node LangGraph state machine, $1,800/mo cloud savings, and 52% latency reduction — all as founding engineer.',
    impactTags: ['$1,800/mo Saved', '52% Latency Drop', '22-node State Machine', '99.98% Uptime'],
    scope:
      'Built system abstractions, migration strategy, CI/CD, and developer workflows in close loop with founder, design, and early users.',
    productDecision:
      'Moved from Neptune to Supabase to reduce cloud spend and simplify frontend state complexity while keeping enterprise reliability.',
    stackGroups: [
      { label: 'Infra', values: ['Supabase', 'CI/CD', 'Docker', 'PostgreSQL'] },
      { label: 'Logic', values: ['LangGraph', 'Async State Machine', 'TypeScript', 'Python'] },
      { label: 'UX',    values: ['Next.js', 'Chakra UI', 'Figma-to-React DFS Engine'] },
    ],
  },
  'Provenir|Full Stack Engineering Intern': {
    milestone: 'Enterprise Credit Platform · Reliability',
    narrative:
      'Delivered full-stack credit decisioning modules with 95% on-time deployments and 98% test pass rate across regulated enterprise workflows.',
    impactTags: ['95% On-time Deployments', '98% Test Pass Rate'],
    scope:
      'Worked across UI, backend, and QA loops to stabilize high-risk release paths and reduce deployment regressions.',
    productDecision:
      'Resolved UI race conditions via RxJS event control to prioritize deterministic outcomes in financial user journeys.',
    stackGroups: [
      { label: 'Infra',  values: ['CI Pipelines', 'Enterprise QA'] },
      { label: 'Logic',  values: ['Spring Boot', 'Java', 'REST APIs'] },
      { label: 'UX',     values: ['Angular', 'RxJS', 'Form Reliability'] },
    ],
  },
  'Hashedin by Deloitte (Deloitte USI)|Software Engineer 1': {
    milestone: 'Unified Hiring Data Layer · 4K+ Users',
    narrative:
      'Built hiring platform modules and analytics for 4,000+ internal users, cutting query latency from 2s to 400ms across 15+ data sources.',
    impactTags: ['4,000+ Users', '15+ Data Sources', '2s → 400ms Latency'],
    scope:
      'Owned cross-module delivery for hiring and candidate experiences, plus analytics used by leadership to improve hiring visibility.',
    productDecision:
      'Invested in a unified API contract first so analytics, workflow automation, and candidate UI could ship in parallel.',
    stackGroups: [
      { label: 'Infra',  values: ['PostgreSQL Indexing', 'Unified API Layer'] },
      { label: 'Logic',  values: ['Data Aggregation', 'Recruitment Workflows'] },
      { label: 'UX',     values: ['React', 'ANT Design', 'Analytics Dashboard'] },
    ],
  },
};

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };

export default function StoryTimeline({ items, sectionId = 'timeline' }: StoryTimelineProps) {
  const timelineRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 35%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 130, damping: 25, mass: 0.35 });

  return (
    <Section3D id={sectionId} className="relative mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <section ref={timelineRef}>
        {/* Section header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <p className="mono-accent text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase mb-3">
            Career momentum
          </p>
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-4xl">
            Timeline of impact
          </h2>
        </motion.div>

        {/* Timeline spine */}
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-[1px] overflow-hidden bg-[var(--border)] sm:left-0">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-[var(--accent)]"
            />
          </div>

          <div className="space-y-8 pl-10 sm:pl-8">
            {items.map((entry, idx) => {
              const roleKey = `${entry.company}|${entry.position}`;
              const meta = roleMeta[roleKey] ?? {
                milestone: `${entry.company}`,
                narrative: entry.achievements[0],
                impactTags: ['Production Delivery'],
                scope: entry.achievements[1] ?? '',
                productDecision: '',
                stackGroups: [{ label: 'Stack', values: ['TypeScript', 'Python'] }],
              };

              return (
                <motion.div
                  key={`${entry.company}-${entry.period}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ ...spring, delay: idx * 0.07 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-10 top-5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--bg-dark)] border border-[var(--accent)] sm:-left-8" />

                  {/* Card */}
                  <div className="card p-6">
                    {/* Period */}
                    <p className="mono-accent text-[11px] tracking-[0.18em] text-[var(--text-muted)] uppercase mb-2">
                      {entry.period} · {entry.company}
                    </p>

                    {/* Milestone headline */}
                    <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] sm:text-xl mb-1">
                      {meta.milestone}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-4">
                      {entry.position}
                    </p>

                    {/* Impact badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {meta.impactTags.map(tag => (
                        <span
                          key={tag}
                          className="mono-accent rounded-full border border-[var(--border)] bg-[var(--bg-dark)] px-2.5 py-0.5 text-[11px] text-[var(--text-primary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* ONE sentence narrative */}
                    <p className="text-sm leading-relaxed text-[var(--text-primary)]/85">
                      {meta.narrative}
                    </p>

                    {/* Collapsible details */}
                    <details className="mt-4 group">
                      <summary className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase cursor-pointer select-none hover:text-[var(--text-primary)] transition-colors">
                        <svg
                          className="h-3 w-3 transition-transform group-open:rotate-90"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        Details
                      </summary>

                      <div className="mt-4 space-y-4 border-t border-[var(--border)] pt-4">
                        {/* Scope */}
                        <div>
                          <p className="mono-accent text-[10px] tracking-[0.16em] text-[var(--text-muted)] uppercase mb-1">Scope</p>
                          <p className="text-sm leading-relaxed text-[var(--text-primary)]/80">{meta.scope}</p>
                        </div>

                        {/* Product Decision */}
                        {meta.productDecision && (
                          <div>
                            <p className="mono-accent text-[10px] tracking-[0.16em] text-[var(--text-muted)] uppercase mb-1">Product Decision</p>
                            <p className="text-sm leading-relaxed text-[var(--text-primary)]/80">{meta.productDecision}</p>
                          </div>
                        )}

                        {/* Stack */}
                        <div>
                          <p className="mono-accent text-[10px] tracking-[0.16em] text-[var(--text-muted)] uppercase mb-2">Stack</p>
                          <div className="space-y-2">
                            {meta.stackGroups.map(group => (
                              <div key={group.label} className="flex flex-wrap items-center gap-1.5">
                                <span className="mono-accent text-[9px] tracking-[0.1em] text-[var(--text-muted)] uppercase w-8">{group.label}</span>
                                {group.values.map(val => (
                                  <span
                                    key={val}
                                    className="mono-accent rounded border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--text-primary)]/70"
                                  >
                                    {val}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Section3D>
  );
}
