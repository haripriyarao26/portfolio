'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { TiltCard3D } from '@/components/ReactBits3D';
import { HaldenFadeUp, HaldenLetterReveal } from '@/components/HaldenMotion';
import type { Experience } from '@/data/resume';

type StoryTimelineProps = {
  items: Experience[];
  sectionId?: string;
};

interface RoleTimelineData {
  company: string;
  role: string;
  dates: string;
  location: string;
  impactSentence: string;
  chips: string[]; // max 3, sans font, format "value label"
  caseStudyId?: 'onetera-compression' | 'onetera-founding';
  highlights: string[];
  stack: string[];
  isCompact?: boolean;
}

const roleConfigs: Record<string, RoleTimelineData> = {
  'JPMorgan Chase & Co. (via Think41)|Senior AI Consultant': {
    company: 'JPMorgan Chase & Co.',
    role: 'Senior AI Consultant',
    dates: 'Jul 2026 – Present',
    location: 'Remote',
    impactSentence:
      'Engineered production AI document extraction pipelines for regulated fiduciary workflows and eliminated false positives on nested email threads.',
    chips: ['52% Faster', '95% Accuracy', '8 Edge cases'],
    highlights: [
      'Accelerated LLM extraction latency from 40.8s down to 19.6s using automated A/B golden-dataset regression testing.',
      'Resolved nested forwards across 5 to 6 level thread depth with zero classification errors.',
      'Engineered autonomous agentic AI workflows to automate multi-tiered document analysis, entity verification, and fiduciary compliance.',
    ],
    stack: ['Claude', 'GPT-5.5', 'Anthropic API', 'MCP', 'LangGraph', 'Python', 'A/B Regression'],
    isCompact: false,
  },
  'Onetera Technologies|Software Engineer 2 / Founding Engineer': {
    company: 'Onetera Technologies',
    role: 'Founding Engineer',
    dates: 'Jan 2024 – Apr 2026',
    location: 'Los Angeles, CA',
    impactSentence:
      'Led full-stack architecture from municipal requirements to enterprise production with zero state desyncs.',
    chips: ['0-to-1 Delivery', '6 Phases', '96% Cost cut'],
    caseStudyId: 'onetera-founding',
    highlights: [
      'Delivered an end-to-end multi-tenant platform on schedule with zero state desyncs, partnering with city officials and enterprise stakeholders.',
      'Slashed LLM inference costs from 200KB down to 8KB per call while scaling horizontally to 255+ agentic steps.',
      'Cut per-turn orchestrator latency via a 22-node asynchronous state machine using parallel scheduling.',
      'Decreased manual UI scaffolding time by 90% via recursive Figma design AST parsing into React components.',
    ],
    stack: ['LangGraph', '22-Node State Machine', 'Python', 'TypeScript', 'Next.js', 'ClickHouse', 'Supabase', 'Redis'],
    isCompact: false,
  },
  'Provenir|Full Stack Engineering Intern': {
    company: 'Provenir',
    role: 'Full Stack Engineering Intern',
    dates: 'May 2023 – Dec 2023',
    location: 'New Jersey, USA',
    impactSentence:
      'Stabilized credit-decision release cycles and sped up query evaluation under concurrent multi-user load.',
    chips: ['98% Pass rate', '40% Fewer defects', '50% Faster queries'],
    highlights: [
      'Achieved a 95% on-time release cadence across regulated credit-decision workflows with automated test suites.',
      'Developed incremental streaming query optimization for high-throughput decision pipelines.',
      'Supported 500+ concurrent users with sub-200ms latency.',
    ],
    stack: ['Spring Boot', 'Java', 'Angular', 'PostgreSQL', 'CI/CD Pipelines'],
    isCompact: true,
  },
  'Deloitte USI|Software Engineer 1': {
    company: 'Deloitte USI',
    role: 'Software Engineer 1',
    dates: 'Jun 2021 – Jul 2022',
    location: 'Bengaluru, India',
    impactSentence:
      'Consolidated legacy data pipelines into a unified data retrieval layer and delivered executive hiring dashboards.',
    chips: ['80% Faster', '4,000+ Users', '2022 Award'],
    highlights: [
      'Consolidated 15+ data sources into a unified GraphQL API, dropping retrieval latency from 2s to 400ms.',
      'Built executive analytics dashboards with PostgreSQL, winning the Excellency Award.',
      'Cut frontend dashboard load times by 50% via lazy-loaded modules and virtualized tables.',
    ],
    stack: ['GraphQL API', 'Node.js', 'React', 'Angular', 'PostgreSQL'],
    isCompact: true,
  },
};

function parseMetric(chip: string) {
  const [val, ...rest] = chip.split(' ');
  return { value: val, label: rest.join(' ') };
}

export default function StoryTimeline({ items, sectionId = 'timeline-momentum' }: StoryTimelineProps) {
  const timelineRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Timeline line draws with scroll progress
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 35%'],
  });

  const lineScale = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3,
  });

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const toggleExpanded = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCardActive = useCallback((index: number) => {
    setActiveCardIndex(index);
  }, []);

  return (
    <section id={sectionId} className="relative mx-auto max-w-6xl px-4 sm:px-10 py-16 sm:py-24 scroll-mt-24">
      <div ref={timelineRef as any}>
        <HaldenFadeUp className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span className="font-sans text-[13px] sm:text-[14px] font-medium text-[#5b7cf0] uppercase tracking-wider">
              Career Experience
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
          {/* Scroll-Driven Timeline Line */}
          <div className="absolute left-3.5 top-6 bottom-8 w-[2px] overflow-hidden bg-[#0b1d3a]/10 sm:left-4">
            <motion.div
              style={shouldReduceMotion ? { height: '100%' } : { scaleY: lineScale }}
              className="h-full w-full origin-top bg-[#5b7cf0]"
            />
          </div>

          {/* Timeline Cards Container with 3D Perspective */}
          <div
            className="space-y-6 pl-9 sm:pl-12"
            style={{ perspective: 1200 }}
          >
            {items.map((entry, idx) => {
              const roleKey = `${entry.company}|${entry.position}`;
              const config = roleConfigs[roleKey] ?? {
                company: entry.company,
                role: entry.position,
                dates: entry.period,
                location: entry.location,
                impactSentence: entry.achievements[0] ?? '',
                chips: ['100% Production'],
                highlights: entry.achievements,
                stack: ['TypeScript', 'Python'],
                isCompact: idx >= 2,
              };

              return (
                <TimelineCardItem
                  key={`${entry.company}-${entry.period}`}
                  idx={idx}
                  config={config}
                  isActive={activeCardIndex === idx}
                  isExpanded={Boolean(expandedCards[idx])}
                  onToggleExpand={() => toggleExpanded(idx)}
                  onMouseEnter={() => setActiveCardIndex(idx)}
                  onFocus={() => setActiveCardIndex(idx)}
                  onActive={handleCardActive}
                  shouldReduceMotion={Boolean(shouldReduceMotion)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineCardItemProps {
  idx: number;
  config: RoleTimelineData;
  isActive: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onMouseEnter: () => void;
  onFocus: () => void;
  onActive: (index: number) => void;
  shouldReduceMotion: boolean;
}

function TimelineCardItem({
  idx,
  config,
  isActive,
  isExpanded,
  onToggleExpand,
  onMouseEnter,
  onFocus,
  onActive,
  shouldReduceMotion,
}: TimelineCardItemProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Dot fills when reached by scroll
  const isReached = useInView(cardRef, { margin: '0px 0px -20% 0px', once: false });

  // Scroll tracking to bring active card forward and push inactive cards back
  const isScrollActive = useInView(cardRef, { margin: '-15% 0px -40% 0px', once: false });

  useEffect(() => {
    if (isScrollActive) {
      onActive(idx);
    }
  }, [isScrollActive, idx, onActive]);

  const isCurrentRole = idx === 0;
  const detailsId = `timeline-details-${idx}`;

  // Inactive cards sit slightly back (scale 0.98, translateZ), active comes forward
  const scaleVal = shouldReduceMotion ? 1 : isActive ? 1 : 0.98;
  const translateZVal = shouldReduceMotion ? '0px' : isActive ? '0px' : '-16px';
  const opacityVal = shouldReduceMotion ? 1 : isActive ? 1 : 0.92;

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      className="relative transition-all duration-300"
      style={{
        transform: `scale(${scaleVal}) translateZ(${translateZVal})`,
        opacity: opacityVal,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Timeline Dot Indicator: fills when reached */}
      <div
        className={`absolute -left-[30px] sm:-left-[39px] top-5 sm:top-6 h-3.5 w-3.5 -translate-x-1/2 rounded-full transition-colors duration-300 flex items-center justify-center border-2 ${
          isReached || shouldReduceMotion
            ? 'bg-[#2fe0d0] border-[#0b1d3a] shadow-sm'
            : 'bg-white border-[#5b7cf0]/40'
        }`}
      >
        {/* Current role dot pulses ONCE (no infinite loops) */}
        {isCurrentRole && !shouldReduceMotion && (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#2fe0d0]"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              repeat: 0,
              ease: 'easeOut',
            }}
          />
        )}
      </div>

      {config.isCompact ? (
        /* ── Compact Older Role Row (Provenir, Deloitte): role, company, dates, one line, expandable ── */
        <div className="spatial-glass rounded-2xl border border-[#0b1d3a]/8 bg-white/70 backdrop-blur-md p-4 sm:p-5 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              {/* Role · Company main heading (dark, regular weight, ~20-22px sans) */}
              <h3 className="font-sans text-[20px] sm:text-[22px] font-normal text-[#0b1d3a] tracking-tight leading-snug">
                {config.role} &middot; {config.company}
              </h3>
              {/* Dates and location on secondary line in normal sans (not mono caps), darker blue-grey */}
              <p className="font-sans text-xs sm:text-sm text-[#2b3a52] mt-0.5 normal-case">
                {config.dates} &middot; {config.location}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* "Show details" Button with aria-expanded, focus ring and hover state */}
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={detailsId}
                onClick={onToggleExpand}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b7cf0] hover:text-[#0b1d3a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b7cf0] rounded px-2.5 py-1"
              >
                <span>{isExpanded ? 'Hide details' : 'Show details'}</span>
                <svg
                  className={`h-3.5 w-3.5 text-[#5b7cf0] transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Animated Expandable Details */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id={detailsId}
                initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-[#0b1d3a]/8 space-y-3.5">
                  {/* ONE Impact Sentence (limited to ~65ch) */}
                  <p className="font-sans text-sm text-[#334155] leading-relaxed max-w-[65ch]">
                    {config.impactSentence}
                  </p>

                  {/* Chips: max 3 chips, sans font, format "value label" */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 my-2.5">
                    {config.chips.slice(0, 3).map((chip) => {
                      const { value, label } = parseMetric(chip);
                      return (
                        <span
                          key={chip}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0b1d3a]/[0.05] border border-[#0b1d3a]/8 text-xs sm:text-[13px] font-sans text-[#2b3a52]"
                        >
                          <strong className="font-semibold text-[#0b1d3a]">{value}</strong>
                          <span>{label}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Technical Engineering Highlights */}
                  {config.highlights && config.highlights.length > 0 && (
                    <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-[#3e4d68]">
                      {config.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2fe0d0] shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack: one muted text line separated by " · " */}
                  <div className="pt-2 text-xs font-sans text-[#475569] leading-relaxed border-t border-[#0b1d3a]/8">
                    <span className="font-semibold text-[#0b1d3a]">Stack: </span>
                    <span>{config.stack.join(' · ')}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* ── Flagship Role Card (JPMorgan Chase, Onetera) ── */
        <TiltCard3D
          intensity={3}
          glareColor="rgba(143, 213, 241, 0.35)"
          className="spatial-glass rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
        >
          <div>
            {/* Main Heading: "Role · Company" (dark, regular weight, ~20-22px sans) */}
            <h3 className="font-sans text-[20px] sm:text-[22px] font-normal text-[#0b1d3a] tracking-tight leading-snug">
              {config.role} &middot; {config.company}
            </h3>

            {/* Secondary Line: Dates and location in normal sans (not mono caps), darker blue-grey */}
            <p className="font-sans text-sm text-[#2b3a52] mt-1 normal-case">
              {config.dates} &middot; {config.location}
            </p>

            {/* ONE Impact Sentence (limited to ~65ch) */}
            <p className="font-sans text-sm sm:text-[15px] text-[#334155] leading-relaxed max-w-[65ch] mt-3">
              {config.impactSentence}
            </p>

            {/* Chips: max 3 chips, sans font, format "value label" */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 my-3.5">
              {config.chips.slice(0, 3).map((chip) => {
                const { value, label } = parseMetric(chip);
                return (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0b1d3a]/[0.05] border border-[#0b1d3a]/8 text-xs sm:text-[13px] font-sans text-[#2b3a52]"
                  >
                    <strong className="font-semibold text-[#0b1d3a]">{value}</strong>
                    <span>{label}</span>
                  </span>
                );
              })}
            </div>

            {/* Actions: Case Study Drawer Link (if applicable) & "Show details" Button */}
            <div className="mt-5 pt-4 border-t border-[#0b1d3a]/8 flex flex-wrap items-center justify-between gap-3">
              <div>
                {config.caseStudyId && (
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent('open-case-study', { detail: config.caseStudyId })
                      );
                      document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5b7cf0] hover:text-[#0b1d3a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b7cf0] rounded px-1 -ml-1 group"
                  >
                    <span>Read the case study</span>
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </button>
                )}
              </div>

              {/* Real button labeled "Show details" with aria-expanded, focus ring, hover state */}
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={detailsId}
                onClick={onToggleExpand}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b7cf0] hover:text-[#0b1d3a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b7cf0] rounded px-2.5 py-1"
              >
                <span>{isExpanded ? 'Hide details' : 'Show details'}</span>
                <svg
                  className={`h-3.5 w-3.5 text-[#5b7cf0] transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Animated Expandable Technical Engineering Details */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={detailsId}
                  initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-[#0b1d3a]/8 space-y-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#5b7cf0] block mb-2 font-mono">
                        Technical Engineering Details
                      </span>
                      {config.highlights && config.highlights.length > 0 && (
                        <ul className="space-y-2 text-xs sm:text-sm text-[#3e4d68]">
                          {config.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2fe0d0] shrink-0" />
                              <span className="leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Tech stack: one muted text line separated by " · " */}
                    <div className="pt-2 text-xs font-sans text-[#475569] leading-relaxed border-t border-[#0b1d3a]/8">
                      <span className="font-semibold text-[#0b1d3a]">Core Stack: </span>
                      <span>{config.stack.join(' · ')}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TiltCard3D>
      )}
    </div>
  );
}
