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
  'JPMorgan Chase & Co. (via Think41)|Senior AI Consultant': {
    milestone: 'Regulated Financial AI Workflows · Golden Dataset Evals',
    narrative:
      'Accelerating LLM extraction latency by 52% (40.8s to 19.6s) at 95% field agreement by deploying GPT-5.5 and creating automated A/B golden-dataset regression comparison tooling.',
    impactTags: ['52% Latency Drop (40.8s → 19.6s)', '95% Field Agreement', '100% Thread Resolution (8/8)', 'GPT-5.5'],
    scope:
      'Designing and deploying autonomous agent architectures for regulated financial document extraction, entity verification, and fiduciary compliance.',
    productDecision:
      'Resolved 100% of thread misclassifications (8/8) across 5–6 level nested forwards with zero false positives via targeted prompt overrides and adversarial test suites.',
    stackGroups: [
      { label: 'Models', values: ['Claude', 'GPT-5.5', 'Anthropic API', 'MCP'] },
      { label: 'Orch',   values: ['LangGraph', 'Agentic Workflows', 'Python', 'Eval Tooling'] },
      { label: 'Infra',  values: ['Enterprise Cloud', 'Compliance Gateways', 'A/B Regression'] },
    ],
  },
  'Onetera Technologies|Software Engineer 2 / Founding Engineer': {
    milestone: '0-to-1 Foundation & Scale · Multi-Tenant Civic AI',
    narrative:
      'Delivered an end-to-end multi-tenant platform in 4 months with zero scope creep and 99.98% uptime, partnering with NVIDIA stakeholders and city officials across 6 roadmap phases.',
    impactTags: ['96% Token Cost Cut (200KB → 8KB)', '40% Latency Drop', '22-Node State Machine', '99.98% Uptime', 'NVIDIA & Cities'],
    scope:
      'Engineered recursive DFS Figma-to-React engine (100+ components, -90% scaffolding time), slashed LLM inference costs 96% for 255+ steps, and sustained 99.9% uptime with ClickHouse telemetry.',
    productDecision:
      'Cut per-turn orchestrator latency by 40% via a 22-node asynchronous state machine using asyncio.gather parallel scheduling to eliminate serial round-trips.',
    stackGroups: [
      { label: 'Infra',  values: ['ClickHouse', 'Supabase', 'Redis', 'BetterStack', 'AWS', 'CI/CD'] },
      { label: 'Logic',  values: ['LangGraph', '22-Node State Machine', 'Python', 'TypeScript'] },
      { label: 'UX',     values: ['Next.js', 'Figma DFS Engine (100+ Components)', 'Onetera Studio'] },
    ],
  },
  'Provenir|Full Stack Engineering Intern': {
    milestone: 'Enterprise Credit Platform · Reliability & QA',
    narrative:
      'Maintained 98% CI/CD pass rate and lowered credit risk SaaS regression defects by 40% while achieving a 95% on-time release cadence across regulated credit-decision workflows.',
    impactTags: ['98% CI/CD Pass Rate', '40% Defect Reduction', '95% On-Time Release'],
    scope:
      'Worked across UI, backend, and automated test suites to stabilize high-risk credit-decision release paths and eliminate pre-release regressions.',
    productDecision:
      'Executed comprehensive code reviews and handled large volumes of test cases, catching potential deployment issues prior to release.',
    stackGroups: [
      { label: 'Infra',  values: ['CI/CD Pipelines', 'Automated Testing', 'Quality Engineering'] },
      { label: 'Logic',  values: ['Spring Boot', 'Java', 'REST APIs', 'PostgreSQL'] },
      { label: 'UX',     values: ['Angular', 'RxJS', 'Dynamic Forms'] },
    ],
  },
  'Deloitte USI|Software Engineer 1': {
    milestone: 'Unified Hiring Data Layer · 4K+ Users',
    narrative:
      'Consolidated 15+ data sources into a GraphQL API for 4,000 users, dropping latency from 2s to 400ms.',
    impactTags: ['4,000+ Users', '15+ Data Sources', '2s → 400ms Latency', 'Excellency Award'],
    scope:
      'Built hiring flow modules, candidate portals, and executive analytics dashboards with ANT Design and PostgreSQL.',
    productDecision:
      'Consolidated disparate legacy data pipelines into a single GraphQL contract, reducing latency by 80% and earning the 2022 Excellency Award.',
    stackGroups: [
      { label: 'Infra',  values: ['PostgreSQL Indexing', 'GraphQL API Layer'] },
      { label: 'Logic',  values: ['Data Aggregation', 'Recruitment Workflows', 'Node.js'] },
      { label: 'UX',     values: ['React', 'ANT Design', 'Analytics Dashboards'] },
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
