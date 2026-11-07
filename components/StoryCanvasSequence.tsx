'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TiltCard3D } from '@/components/ReactBits3D';
import { HaldenButton, HaldenLetterReveal, WordSegment } from '@/components/HaldenMotion';
import { resumeData } from '@/data/resume';

type Props = { name: string; tagline: string };

const HERO_HEADLINE_SEGMENTS: WordSegment[] = [
  { text: 'I don’t just build AI.', highlight: false, lineBreakAfter: true },
  { text: 'I build the whole product', highlight: true },
  { text: 'around the problem.', highlight: false },
];

const WHOLE_PRODUCT_STAGES = [
  {
    step: '01',
    phase: 'Listen',
    line: 'Talk to the people who’ll use it and watch where they struggle',
    tag: 'Real needs',
  },
  {
    step: '02',
    phase: 'Design',
    line: 'Write the plan and agree on it before any code',
    tag: 'Clear plan',
  },
  {
    step: '03',
    phase: 'Build',
    line: 'Backend, data, front end, and AI where it helps',
    tag: 'Full-stack',
  },
  {
    step: '04',
    phase: 'Run',
    line: 'Monitor it, fix fast, roll back safely, keep improving',
    tag: 'Reliable',
  },
];

const EMPLOYER_PROOF = [
  {
    name: 'JPMorgan Chase',
    role: 'Senior AI Consultant',
  },
  {
    name: 'Onetera Technologies',
    role: 'Founding Engineer · 0-to-1',
  },
  {
    name: 'Provenir',
    role: 'Full-Stack Intern · Credit SaaS',
  },
  {
    name: 'Deloitte',
    role: 'Software Engineer · Data & GraphQL',
  },
];

const OPEN_SOURCE_AND_CERTS = [
  {
    name: 'Gemini Cookbook (Merged PR #1088)',
    type: 'Google Open Source',
  },
  {
    name: 'OpenAI Cookbook (PR #2568)',
    type: 'OpenAI Open Source',
  },
  {
    name: 'Anthropic CCA-F Architect',
    type: 'Credly Verified',
  },
  {
    name: 'AWS AI Practitioner',
    type: 'Credly Verified',
  },
];

export default function StoryCanvasSequence({ name }: Props) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const userInteractedRef = useRef(false);

  // Hero Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothHeroProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.25 });
  const leftColY = useTransform(smoothHeroProgress, [0, 1], [0, -45]);
  const rightCardY = useTransform(smoothHeroProgress, [0, 1], [0, -85]);

  // Sync scroll to activeLayer (01 -> 02 -> 03 -> 04 as you scroll)
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const index = Math.min(
        Math.floor(latest * WHOLE_PRODUCT_STAGES.length),
        WHOLE_PRODUCT_STAGES.length - 1
      );
      setActiveLayer(index);
    });
  }, [scrollYProgress]);

  // Gentle auto-cycle when at the top and before scroll/hover
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollYProgress.get() === 0 && !userInteractedRef.current) {
        setActiveLayer(prev => (prev + 1) % WHOLE_PRODUCT_STAGES.length);
      }
    }, 2800);
    return () => clearInterval(timer);
  }, [scrollYProgress]);

  return (
    <section
      ref={heroRef}
      id="story"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-10 max-w-6xl mx-auto"
    >
      {/* ── HERO TOP ROW: Headline + Story Chips + CTAs + 3D Product Delivery Stack ── */}
      <div className="grid lg:grid-cols-12 gap-8 items-start pt-6 sm:pt-10">
        {/* Left 7 Columns: First-Person Headline, Subtitle, Story Points & CTAs */}
        <motion.div style={{ y: leftColY }} className="lg:col-span-7 space-y-6">
          <div
            className="fade-up flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-[#3e4d68]"
            style={{ ['--d' as any]: '0.2s' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span>Software Engineer &middot; Full-Stack &middot; AI</span>
          </div>

          {/* First-Person Headline */}
          <HaldenLetterReveal
            as="h1"
            mode="load"
            durationMs={1250}
            delayMs={180}
            spread={0.35}
            segments={HERO_HEADLINE_SEGMENTS}
            className="font-display text-[clamp(30px,3.8vw,56px)] font-normal leading-[1.08] tracking-[-0.03em] text-[#0b1d3a]"
          />

          <p
            className="fade-up text-base sm:text-lg text-[#1d2f4f]/85 max-w-xl leading-relaxed"
            style={{ ['--d' as any]: '0.85s' }}
          >
            Customer conversations, architecture, full-stack code, production support, with AI where it helps.
          </p>

          {/* Dual Action CTAs: Explore Work (Primary solid pill) + Direct Recruiter Email (Text link with arrow) */}
          <div className="fade-up flex flex-wrap items-center gap-4 sm:gap-6 pt-2" style={{ ['--d' as any]: '1.05s' }}>
            <HaldenButton size="lg" href="#case-studies">
              Explore Proven Work &darr;
            </HaldenButton>

            <a
              href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya`}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#5b7cf0] hover:text-[#0b1d3a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b7cf0] rounded"
            >
              <span>Email Haripriya</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </motion.div>

        {/* Right 5 Columns: Synchronized 3D Whole-Product Delivery Stack */}
        <motion.div
          style={{ y: rightCardY }}
          className="fade-up lg:col-span-5"
        >
          <TiltCard3D
            intensity={8}
            glareColor="rgba(143, 213, 241, 0.35)"
            className="spatial-glass rounded-3xl p-5 sm:p-6 w-full"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#0b1d3a]/8 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#2fe0d0] shadow-[0_0_8px_rgba(47,224,208,0.8)]" />
                  <span className="mono-accent text-xs font-semibold uppercase tracking-wider text-[#0b1d3a]">
                    Whole-Product Delivery
                  </span>
                </div>
                <span className="text-xs text-[#5b7cf0] font-semibold">
                  4 Stages
                </span>
              </div>

              <div className="space-y-2.5">
                {WHOLE_PRODUCT_STAGES.map((stage, idx) => {
                  const isActive = idx === activeLayer;
                  return (
                    <div
                      key={stage.step}
                      onMouseEnter={() => {
                        userInteractedRef.current = true;
                        setActiveLayer(idx);
                      }}
                      style={{
                        transform: isActive ? 'translateZ(18px) scale(1.02)' : 'translateZ(6px)',
                      }}
                      className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-300 ${
                        isActive
                          ? 'border-[#5b7cf0] bg-white shadow-md'
                          : 'border-[#0b1d3a]/8 bg-white/60 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`mono-accent text-xs font-bold px-2 py-0.5 rounded-md transition-colors ${
                              isActive
                                ? 'bg-[#0b1d3a] text-white'
                                : 'bg-slate-100 text-[#1d2f4f]'
                            }`}
                          >
                            {stage.step}
                          </span>
                          <div className="min-w-0">
                            <p className="font-display text-sm font-semibold text-[#0b1d3a] leading-snug">
                              {stage.phase}:{' '}
                              <span className="font-normal text-xs text-[#3e4d68]">
                                {stage.line}
                              </span>
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-medium shrink-0 transition-colors ${
                            isActive ? 'text-[#5b7cf0]' : 'text-[#3e4d68]'
                          }`}
                        >
                          {stage.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TiltCard3D>
        </motion.div>
      </div>

      {/* ── LOWER SECTION: Production Track Record & Verified Proof ── */}
      <div className="mt-14 pt-8 border-t border-[#0b1d3a]/8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="mono-accent text-xs font-semibold uppercase tracking-[0.16em] text-[#5b7cf0] block">
              PRODUCTION TRACK RECORD
            </span>
            <p className="mt-1 text-base sm:text-lg font-medium text-[#0b1d3a]">
              Where I’ve worked, and what I’ve shipped in the open.
            </p>
          </div>
        </div>

        {/* Two distinct, clearly-labeled rows */}
        <div className="space-y-3.5">
          {/* Row 1: Employers */}
          <div className="rounded-2xl border border-[#0b1d3a]/10 bg-white/60 backdrop-blur-md p-3.5 sm:p-4">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#3e4d68] mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5b7cf0]" />
              <span>Where I’ve Worked</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {EMPLOYER_PROOF.map((emp) => (
                <div
                  key={emp.name}
                  className="p-3 rounded-xl border border-[#0b1d3a]/8 bg-white/80 shadow-sm"
                >
                  <div className="font-display text-xs sm:text-sm font-bold text-[#0b1d3a] leading-tight">
                    {emp.name}
                  </div>
                  <div className="text-[11px] text-[#3e4d68] mt-1 font-mono leading-tight">
                    {emp.role}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Open Source & Credentials */}
          <div className="rounded-2xl border border-[#0b1d3a]/10 bg-white/60 backdrop-blur-md p-3.5 sm:p-4">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#3e4d68] mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2fe0d0]" />
              <span>Shipped In The Open &amp; Credentials</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {OPEN_SOURCE_AND_CERTS.map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl border border-[#0b1d3a]/8 bg-white/80 shadow-sm flex flex-col justify-between"
                >
                  <div className="font-display text-xs sm:text-sm font-bold text-[#0b1d3a] leading-snug">
                    {item.name}
                  </div>
                  <div className="text-[11px] font-mono text-[#0d9488] font-semibold mt-1.5">
                    {item.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
