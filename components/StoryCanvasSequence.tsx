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
    summary: 'City meetings, user interviews & watching people struggle',
    detail: 'Field research with actual users before writing a line of architecture.',
    badge: 'Civic Context',
  },
  {
    step: '02',
    phase: 'Design',
    summary: 'Specs before code, schema bounds & state contracts',
    detail: 'Mapping failure modes, fallback gates, and operational boundaries first.',
    badge: 'Architecture',
  },
  {
    step: '03',
    phase: 'Build',
    summary: 'Fast backend, data pipelines, front end & AI where it helps',
    detail: 'Full-stack shipping: robust APIs, real-time sync, and targeted AI.',
    badge: 'Full-Stack Code',
  },
  {
    step: '04',
    phase: 'Run',
    summary: 'Live telemetry, instant rollback & long-term production care',
    detail: 'Total system ownership: tracking regressions and maintaining high uptime.',
    badge: 'Production Care',
  },
];

const EMPLOYER_PROOF = [
  {
    name: 'JPMorgan Chase',
    role: 'Senior AI Consultant',
    href: '#timeline-momentum',
  },
  {
    name: 'Onetera Technologies',
    role: 'Founding Engineer · 0-to-1',
    href: '#case-studies',
  },
  {
    name: 'Provenir',
    role: 'Fintech Extraction Engine',
    href: '#timeline-momentum',
  },
  {
    name: 'Deloitte',
    role: 'Risk Architecture',
    href: '#timeline-momentum',
  },
];

const OPEN_SOURCE_AND_CERTS = [
  {
    name: 'Gemini Cookbook (Merged PR #1088)',
    href: 'https://github.com/google-gemini/cookbook/pull/1088',
    type: 'Google Open Source ↗',
  },
  {
    name: 'OpenAI Cookbook (PR #2568)',
    href: 'https://github.com/openai/openai-cookbook/pull/2568',
    type: 'OpenAI Open Source ↗',
  },
  {
    name: 'Anthropic CCA-F Architect',
    href: 'https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile',
    type: 'Credly Verified ↗',
  },
  {
    name: 'AWS AI Practitioner',
    href: 'https://www.credly.com/badges/898b89f1-5512-4d4a-8ba6-6a1597c7c510/public_url',
    type: 'Credly Verified ↗',
  },
];

export default function StoryCanvasSequence({ name }: Props) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeLayer, setActiveLayer] = useState(0);

  // Hero Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothHeroProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.25 });
  const leftColY = useTransform(smoothHeroProgress, [0, 1], [0, -45]);
  const rightCardY = useTransform(smoothHeroProgress, [0, 1], [0, -85]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % WHOLE_PRODUCT_STAGES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

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
            className="fade-up inline-flex items-center gap-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#0b1d3a]/10 px-4 py-1.5 shadow-sm"
            style={{ ['--d' as any]: '0.2s' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span className="mono-accent text-xs font-semibold tracking-[0.16em] uppercase text-[#1d2f4f]">
              FOUNDING &amp; FORWARD-DEPLOYED ENGINEER
            </span>
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

          {/* Grounded Story Points */}
          <div
            className="fade-up flex flex-wrap items-center gap-2.5 pt-1"
            style={{ ['--d' as any]: '0.95s' }}
          >
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-2 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#0b1d3a]/10 hover:border-[#5b7cf0]/30 px-3.5 py-1.5 shadow-sm transition-all text-xs font-medium text-[#1d2f4f]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#5b7cf0]" />
              <span className="font-semibold text-[#0b1d3a]">0-to-1 at Onetera:</span>
              <span className="text-[#3e4d68]">city meetings to production</span>
            </a>

            <a
              href="#stack"
              className="group inline-flex items-center gap-2 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#0b1d3a]/10 hover:border-[#2fe0d0]/40 px-3.5 py-1.5 shadow-sm transition-all text-xs font-medium text-[#1d2f4f]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2fe0d0]" />
              <span className="font-semibold text-[#0b1d3a]">Backend, data and front end</span>
            </a>

            <a
              href="https://github.com/google-gemini/cookbook/pull/1088"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#0b1d3a]/10 hover:border-[#5b7cf0]/30 px-3.5 py-1.5 shadow-sm transition-all text-xs font-medium text-[#1d2f4f]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#818cf8]" />
              <span className="font-semibold text-[#0b1d3a]">AI where it helps</span>
              <span className="text-[#3e4d68]">(merged Gemini PR #1088)</span>
              <span className="text-[10px] text-[#5b7cf0] font-bold">↗</span>
            </a>
          </div>

          {/* Dual Action CTAs: Explore Work + Direct Recruiter Email */}
          <div className="fade-up flex flex-wrap items-center gap-3 pt-2" style={{ ['--d' as any]: '1.05s' }}>
            <HaldenButton size="lg" href="#case-studies">
              Explore Proven Work &darr;
            </HaldenButton>

            <a
              href={`mailto:${resumeData.email}?subject=Engineering%20Opportunity%20for%20Haripriya`}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-[#0b1d3a]/15 bg-white/90 hover:bg-white text-[#0b1d3a] hover:border-[#5b7cf0]/40 shadow-sm hover:shadow transition-all font-display text-sm font-semibold active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-[#2fe0d0]" />
              <span>Email Haripriya</span>
              <span className="text-xs text-[#5b7cf0] font-bold">↗</span>
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
                <span className="mono-accent text-[11px] text-[#5b7cf0] font-semibold bg-[#5b7cf0]/10 px-2 py-0.5 rounded">
                  Onetera 0-to-1
                </span>
              </div>

              <div className="space-y-2.5">
                {WHOLE_PRODUCT_STAGES.map((stage, idx) => {
                  const isActive = idx === activeLayer;
                  return (
                    <div
                      key={stage.step}
                      onMouseEnter={() => setActiveLayer(idx)}
                      style={{
                        transform: isActive ? 'translateZ(20px) scale(1.02)' : 'translateZ(6px)',
                      }}
                      className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-300 ${
                        isActive
                          ? 'border-[#5b7cf0] bg-white shadow-md'
                          : 'border-[#0b1d3a]/8 bg-white/60 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`mono-accent text-xs font-bold px-2 py-0.5 rounded-md ${
                              isActive
                                ? 'bg-[#0b1d3a] text-white'
                                : 'bg-[#d2daff]/50 text-[#1d2f4f]'
                            }`}
                          >
                            {stage.step}
                          </span>
                          <div>
                            <p className="font-display text-sm font-semibold text-[#0b1d3a]">
                              {stage.phase}: <span className="font-normal text-xs text-[#3e4d68]">{stage.summary}</span>
                            </p>
                          </div>
                        </div>
                        <span className="mono-accent text-[10px] font-semibold text-[#5b7cf0] shrink-0 hidden sm:inline-block">
                          {stage.badge}
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
          <span className="text-xs font-mono text-[#3e4d68]">
            Click any item for verified proof &amp; case studies &rarr;
          </span>
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
                <a
                  key={emp.name}
                  href={emp.href}
                  className="group p-3 rounded-xl border border-[#0b1d3a]/8 bg-white/80 hover:bg-white hover:border-[#5b7cf0]/40 transition-all shadow-sm"
                >
                  <div className="font-display text-xs sm:text-sm font-bold text-[#0b1d3a] group-hover:text-[#5b7cf0] transition-colors leading-tight">
                    {emp.name}
                  </div>
                  <div className="text-[11px] text-[#3e4d68] mt-1 font-mono leading-tight">
                    {emp.role}
                  </div>
                </a>
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
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-3 rounded-xl border border-[#0b1d3a]/8 bg-white/80 hover:bg-white hover:border-[#2fe0d0]/50 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="font-display text-xs sm:text-sm font-bold text-[#0b1d3a] group-hover:text-[#0b1d3a] leading-snug">
                      {item.name}
                    </span>
                    <span className="text-[#5b7cf0] text-xs font-bold shrink-0">↗</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#0d9488] font-semibold mt-1.5">
                    {item.type}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
