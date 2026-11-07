'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TiltCard3D } from '@/components/ReactBits3D';
import { HaldenFadeUp, HaldenLetterReveal } from '@/components/HaldenMotion';
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
    milestone: '2x Faster Financial Document Review at 95% Accuracy',
    narrative:
      'Cut AI document extraction wait times by 52% (from 40.8s down to 19.6s) and solved 100% of errors on long forwarded email chains.',
    impactTags: ['52% Faster (19.6s)', '95% Accuracy', '8/8 Edge Cases Solved'],
    scope:
      'Designed and deployed automated AI workflows for regulated financial document extraction, entity verification, and compliance.',
    productDecision:
      'Built an automated Golden-Dataset A/B testing pipeline that blocks any update scoring below 95% accuracy.',
    highlights: [
      'Accelerated LLM extraction latency by 52% (40.8s to 19.6s) at 95% field agreement using automated A/B golden-dataset regression testing.',
      'Resolved 100% of thread misclassifications (8/8) across 5 to 6 level nested forwards with zero false positives.',
      'Engineered autonomous agentic AI workflows to automate multi-tiered document analysis and fiduciary compliance.',
    ],
    stackGroups: [
      { label: 'Models', values: ['Claude', 'GPT-5.5', 'Anthropic API', 'MCP'] },
      { label: 'Orch', values: ['LangGraph', 'Agentic Workflows', 'Python', 'Eval Tooling'] },
      { label: 'Infra', values: ['Enterprise Cloud', 'Compliance Gateways', 'A/B Regression'] },
    ],
  },
  'Onetera Technologies|Software Engineer 2 / Founding Engineer': {
    milestone: 'Cut AI Cloud Costs 96% & Built 0-to-1 Civic Platform',
    narrative:
      'Partnered with enterprise AI stakeholders including NVIDIA and municipal officials across 6 roadmap phases, cutting AI token costs by 96% and response latency by 40%.',
    impactTags: ['96% Cost Cut', '40% Faster', '<15ms SLA', 'NVIDIA & Civic Partners'],
    scope:
      'Scaled multi-agent workflows to 255+ steps, built a Figma-to-React compiler (100+ components, -90% setup time), and owned real-time ClickHouse telemetry.',
    productDecision:
      'Replaced slow sequential chains with a 22-node parallel state machine (asyncio.gather) and shrank payloads from 200KB to 8KB.',
    highlights: [
      'Delivered an end-to-end multi-tenant platform on schedule across 6 roadmap phases with zero state desyncs.',
      'Slashed LLM inference costs by 96% (from 200KB to 8KB per call) while scaling horizontally to 255+ agentic steps.',
      'Cut per-turn orchestrator latency by 40% via a 22-node asynchronous state machine using parallel scheduling.',
      'Engineered a recursive DFS algorithm to generate 100+ React components from Figma trees, cutting UI setup time by 90%.',
    ],
    stackGroups: [
      { label: 'Infra', values: ['ClickHouse', 'Supabase', 'Redis', 'AWS', 'CI/CD'] },
      { label: 'Logic', values: ['LangGraph', '22-Node State Machine', 'Python', 'TypeScript'] },
      { label: 'UX', values: ['Next.js', 'Figma-to-React Engine', 'React'] },
    ],
  },
  'Provenir|Full Stack Engineering Intern': {
    milestone: '98% CI/CD Pass Rate & 50% Faster Credit Workflows',
    narrative:
      'Lowered release defects by 40% and sped up high-volume credit decision queries by 50% for 500+ concurrent users.',
    impactTags: ['98% Pass Rate', '40% Fewer Defects', '50% Faster Queries'],
    scope:
      'Stabilized high-risk credit-decision release paths across UI, backend APIs, and automated test suites.',
    productDecision:
      'Optimized backend state management with batched processing and priority queues to maintain sub-200ms latency.',
    highlights: [
      'Maintained 98% CI/CD pass rate and lowered credit risk SaaS regression defects by 40% with a 95% on-time release cadence.',
      'Developed query optimization algorithms for credit decision workflows, improving response times by 50% under load.',
      'Supported 500+ concurrent users with sub-200ms latency.',
    ],
    stackGroups: [
      { label: 'Infra', values: ['CI/CD Pipelines', 'Automated Testing'] },
      { label: 'Logic', values: ['Spring Boot', 'Java', 'REST APIs', 'PostgreSQL'] },
      { label: 'UX', values: ['Angular', 'RxJS', 'Dynamic Forms'] },
    ],
  },
  'Deloitte USI|Software Engineer 1': {
    milestone: '80% Faster Data Layer for 4,000+ Users · Excellency Award',
    narrative:
      'Unified 15+ data sources into a single GraphQL API for 4,000+ users, cutting load times from 2s to 400ms (80% faster) and winning the 2022 Excellency Award.',
    impactTags: ['80% Faster (400ms)', '4,000+ Users', '2022 Excellency Award'],
    scope:
      'Built executive analytics dashboards and candidate portals using React, Angular, Node.js, and PostgreSQL.',
    productDecision:
      'Consolidated 15 disparate legacy data pipelines into one unified GraphQL layer.',
    highlights: [
      'Consolidated 15+ data sources into a unified GraphQL API for 4,000+ users, dropping latency from 2s to 400ms (80% speedup).',
      'Built executive analytics dashboards with PostgreSQL, winning the 2022 Excellency Award.',
      'Cut frontend dashboard load times by 50% via lazy-loaded modules and virtualized tables.',
    ],
    stackGroups: [
      { label: 'Infra', values: ['PostgreSQL', 'GraphQL API'] },
      { label: 'Logic', values: ['Node.js', 'Data Aggregation'] },
      { label: 'UX', values: ['React', 'ANT Design', 'Dashboards'] },
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

  return (
    <section id={sectionId} className="relative mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24">
      <div ref={timelineRef as any}>
        <HaldenFadeUp className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#0b1d3a]/10 px-4 py-1.5 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span className="mono-accent text-xs tracking-[0.16em] text-[#1d2f4f] uppercase font-semibold">
              CAREER EXPERIENCE
            </span>
          </div>

          <HaldenLetterReveal
            as="h2"
            mode="scroll"
            spread={0.32}
            segments={[
              { text: 'Where I have', highlight: false },
              { text: 'delivered impact.', highlight: true },
            ]}
            className="font-display text-3xl sm:text-5xl font-normal text-[#0b1d3a] tracking-[-0.03em]"
          />
        </HaldenFadeUp>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-[2px] overflow-hidden bg-[#0b1d3a]/10 sm:left-0">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-[#5b7cf0]"
            />
          </div>

          <div className="space-y-6 pl-10 sm:pl-8">
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
                <HaldenFadeUp key={`${entry.company}-${entry.period}`} delay={idx * 0.06}>
                  <div className="relative">
                    <div className="absolute -left-10 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-[#2fe0d0] border-2 border-[#0b1d3a] sm:-left-8 shadow-sm" />

                    <TiltCard3D
                      intensity={3}
                      glareColor="rgba(143, 213, 241, 0.35)"
                      className="spatial-glass rounded-3xl p-6 sm:p-7"
                    >
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <p className="mono-accent text-xs tracking-wider text-[#5b7cf0] uppercase font-semibold">
                            {entry.period} &middot; {entry.company}
                          </p>
                          <span className="mono-accent text-xs text-[#3e4d68]">
                            {entry.location}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-semibold text-[#0b1d3a] sm:text-xl mb-1">
                          {meta.milestone}
                        </h3>
                        <p className="text-sm font-medium text-[#3e4d68] mb-4">
                          {entry.position}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {meta.impactTags.map(tag => (
                            <span
                              key={tag}
                              className="mono-accent rounded-full border border-[#0b1d3a]/10 bg-white/80 px-3 py-1 text-xs text-[#0b1d3a] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="text-sm sm:text-base text-[#3e4d68] leading-relaxed">
                          {meta.narrative}
                        </p>

                        <details className="mt-5 group">
                          <summary className="flex items-center gap-2 text-xs tracking-wider text-[#0b1d3a] uppercase cursor-pointer select-none hover:text-[#5b7cf0] transition-colors font-semibold">
                            <svg
                              className="h-3.5 w-3.5 transition-transform group-open:rotate-90 text-[#5b7cf0]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <span>Technical Engineering Details</span>
                          </summary>

                          <div className="mt-4 space-y-4 border-t border-[#0b1d3a]/8 pt-4">
                            {meta.highlights && meta.highlights.length > 0 && (
                              <ul className="space-y-2 text-xs sm:text-sm text-[#3e4d68]">
                                {meta.highlights.map((highlight, hIdx) => (
                                  <li key={hIdx} className="flex items-start gap-2.5">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2fe0d0] flex-shrink-0" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            <div className="flex flex-wrap gap-2 pt-2">
                              {meta.stackGroups.flatMap(g => g.values).map(val => (
                                <span
                                  key={val}
                                  className="mono-accent rounded-full border border-[#0b1d3a]/10 bg-white/80 px-2.5 py-1 text-xs text-[#0b1d3a]"
                                >
                                  {val}
                                </span>
                              ))}
                            </div>
                          </div>
                        </details>
                      </div>
                    </TiltCard3D>
                  </div>
                </HaldenFadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
