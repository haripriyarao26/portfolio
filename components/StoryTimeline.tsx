'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Section3D from '@/components/Section3D';
import type { Experience } from '@/data/resume';

type StoryTimelineProps = {
  items: Experience[];
  sectionId?: string;
};

type RoleMeta = {
  milestone: string;
  narrative: string;
  impactTags: string[];
  scope: string;
  productDecision: string;
  highlights: string[];
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
    highlights: [
      'Accelerated LLM extraction latency by 52% (40.8s to 19.6s) at 95% field agreement by deploying GPT-5.5 with automated A/B golden-dataset regression comparison tooling.',
      'Resolved 100% of thread misclassifications (8/8) across 5–6 level nested forwards with zero false positives via targeted prompt overrides and adversarial test suites.',
      'Engineered autonomous agentic AI workflows to automate multi-tiered document analysis, entity verification, and fiduciary compliance.'
    ],
    stackGroups: [
      { label: 'Models', values: ['Claude', 'GPT-5.5', 'Anthropic API', 'MCP'] },
      { label: 'Orch',   values: ['LangGraph', 'Agentic Workflows', 'Python', 'Eval Tooling'] },
      { label: 'Infra',  values: ['Enterprise Cloud', 'Compliance Gateways', 'A/B Regression'] },
    ],
  },
  'Onetera Technologies|Software Engineer 2 / Founding Engineer': {
    milestone: '0-to-1 Foundation & Scale · Multi-Tenant Civic AI',
    narrative:
      'Delivered an end-to-end multi-tenant platform on schedule across 6 roadmap phases with 99.98% platform uptime, partnering with NVIDIA stakeholders and city officials.',
    impactTags: ['96% Token Cost Cut (200KB → 8KB)', '40% Latency Drop', '22-Node State Machine', '99.98% Uptime', 'NVIDIA & Cities'],
    scope:
      'Engineered recursive DFS Figma-to-React engine (100+ components, -90% scaffolding time), slashed LLM inference costs 96% for 255+ steps, and sustained 99.98% uptime with ClickHouse telemetry.',
    productDecision:
      'Cut per-turn orchestrator latency by 40% via a 22-node asynchronous state machine using asyncio.gather parallel scheduling to eliminate serial round-trips.',
    highlights: [
      'Delivered an end-to-end multi-tenant platform on schedule across 6 roadmap phases with 99.98% platform uptime, partnering with NVIDIA stakeholders and city officials.',
      'Slashed LLM inference costs by 96% (from 200KB to 8KB/call) by redesigning the transformation pipeline to scale horizontally to 255+ agentic steps.',
      'Cut per-turn orchestrator latency by 40% via a 22-node asynchronous state machine using asyncio.gather parallel scheduling.',
      'Engineered a recursive DFS algorithm to extract 100+ React components from Figma design trees, decreasing manual UI scaffolding time by 90%.',
      'Lifted relevant-result rate 20% and halved malformed responses (50%) using grounded citations and safe JSON parsing recovery.',
      'Engineered concurrent request-collapsing middleware and Redis distributed locks, eliminating 100% of double-charge race conditions.',
      'Reduced MTTR by 40% and sustained 99.98% uptime by owning on-call incident response and ClickHouse real-time telemetry dashboards.',
      'Built autonomous self-healing Jest test generation agent using LLM feedback loops, reducing manual maintenance overhead by ~25%.'
    ],
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
    highlights: [
      'Maintained 98% CI/CD pass rate and lowered credit risk SaaS regression defects by 40% while achieving a 95% on-time release cadence.',
      'Developed query optimization algorithms and incremental streaming evaluation for high-throughput credit decision workflows, improving response times by 50% under concurrent load.',
      'Applied data-structure optimizations (hash maps, priority queues, batched processing) for backend state management, supporting 500+ concurrent users with sub-200ms latency.'
    ],
    stackGroups: [
      { label: 'Infra',  values: ['CI/CD Pipelines', 'Automated Testing', 'Quality Engineering'] },
      { label: 'Logic',  values: ['Spring Boot', 'Java', 'REST APIs', 'PostgreSQL'] },
      { label: 'UX',     values: ['Angular', 'RxJS', 'Dynamic Forms'] },
    ],
  },
  'Deloitte USI|Software Engineer 1': {
    milestone: 'Unified Hiring Data Layer · 4K+ Users',
    narrative:
      'Consolidated 15+ data sources into a unified GraphQL API for 4,000+ users, dropping latency by 80% (2s to 400ms) and earning the 2022 Excellency Award.',
    impactTags: ['80% Latency Cut (2s → 400ms)', '4,000+ Users', 'Excellency Award 2022', '15+ Data Sources'],
    scope:
      'Built hiring flow modules, candidate portals, and executive analytics dashboards with ANT Design and PostgreSQL.',
    productDecision:
      'Consolidated disparate legacy data pipelines into a single GraphQL contract, reducing latency by 80% and earning the 2022 Excellency Award.',
    highlights: [
      'Consolidated 15+ data sources into a unified GraphQL API for 4,000+ users, dropping latency from 2s to 400ms (80% speedup).',
      'Built executive analytics dashboards with ANT Design and PostgreSQL, reducing data aggregation times by 80% and winning the 2022 Excellency Award.',
      'Implemented frontend performance optimizations in Angular (lazy-loaded modules, virtualized tables, memoized pipes), cutting dashboard load times by 50%.'
    ],
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
    <Section3D id={sectionId} className="relative mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
      <section ref={timelineRef}>
        {/* Section header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <p className="mono-accent text-xs tracking-[0.22em] text-[#E07A5F] uppercase mb-2">
            Career momentum
          </p>
          <h2 className="font-display text-2xl font-bold text-[#FAF6F0] sm:text-4xl">
            Timeline of impact
          </h2>
        </motion.div>

        {/* Timeline spine */}
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-[1px] overflow-hidden bg-[var(--border)] sm:left-0">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-[#E07A5F]"
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
                highlights: entry.achievements,
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
                  <div className="absolute -left-10 top-5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--bg-dark)] border border-[#E07A5F] sm:-left-8 shadow-[0_0_8px_rgba(224,122,95,0.8)]" />

                  {/* Card */}
                  <div className="card p-6 sm:p-7 border border-white/10 hover:border-[#E07A5F]/30 transition-colors">
                    {/* Period */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <p className="mono-accent text-[11px] tracking-[0.16em] text-[#F4A261] uppercase font-semibold">
                        {entry.period} &middot; {entry.company}
                      </p>
                      <span className="mono-accent text-[10px] text-[#A69F94]">
                        {entry.location}
                      </span>
                    </div>

                    {/* Milestone headline */}
                    <h3 className="font-display text-lg font-bold text-[#FAF6F0] sm:text-xl mb-1">
                      {meta.milestone}
                    </h3>
                    <p className="text-sm font-medium text-[#A69F94] mb-4">
                      {entry.position}
                    </p>

                    {/* Impact badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {meta.impactTags.map(tag => (
                        <span
                          key={tag}
                          className="mono-accent rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-[#FAF6F0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* ONE sentence narrative */}
                    <p className="text-sm leading-relaxed text-[#FAF6F0]/90">
                      {meta.narrative}
                    </p>

                    {/* Collapsible details */}
                    <details className="mt-5 group">
                      <summary className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-[#F4A261] uppercase cursor-pointer select-none hover:text-[#FAF6F0] transition-colors font-semibold">
                        <svg
                          className="h-3.5 w-3.5 transition-transform group-open:rotate-90 text-[#E07A5F]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        Detailed Engineering Highlights &amp; Architecture
                      </summary>

                      <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
                        {/* Highlights List */}
                        {meta.highlights && meta.highlights.length > 0 && (
                          <div>
                            <p className="mono-accent text-[10px] tracking-[0.16em] text-[#A69F94] uppercase mb-2">Key Outcomes</p>
                            <ul className="space-y-2 text-xs sm:text-sm text-[#FAF6F0]/85">
                              {meta.highlights.map((highlight, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2.5">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#E07A5F] flex-shrink-0" />
                                  <span className="leading-relaxed">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Scope */}
                        <div>
                          <p className="mono-accent text-[10px] tracking-[0.16em] text-[#A69F94] uppercase mb-1">Architecture Scope</p>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#FAF6F0]/80">{meta.scope}</p>
                        </div>

                        {/* Product Decision */}
                        {meta.productDecision && (
                          <div>
                            <p className="mono-accent text-[10px] tracking-[0.16em] text-[#A69F94] uppercase mb-1">Core Product Decision</p>
                            <p className="text-xs sm:text-sm leading-relaxed text-[#FAF6F0]/80">{meta.productDecision}</p>
                          </div>
                        )}

                        {/* Stack */}
                        <div>
                          <p className="mono-accent text-[10px] tracking-[0.16em] text-[#A69F94] uppercase mb-2">Tech Stack</p>
                          <div className="space-y-2">
                            {meta.stackGroups.map(group => (
                              <div key={group.label} className="flex flex-wrap items-center gap-1.5">
                                <span className="mono-accent text-[9px] tracking-[0.1em] text-[#A69F94] uppercase w-12">{group.label}</span>
                                {group.values.map(val => (
                                  <span
                                    key={val}
                                    className="mono-accent rounded border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] text-[#FAF6F0]/80"
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
