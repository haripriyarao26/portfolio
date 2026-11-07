'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TiltCard3D } from '@/components/ReactBits3D';
import { HaldenButton, HaldenLetterReveal, WordSegment } from '@/components/HaldenMotion';

type Props = { name: string; tagline: string };

const HERO_HEADLINE_SEGMENTS: WordSegment[] = [
  { text: 'I don’t just build AI.', highlight: false, lineBreakAfter: true },
  { text: 'I build the whole product', highlight: true },
  { text: 'around the problem.', highlight: false },
];

const LIVE_AGENT_LAYERS = [
  {
    step: '01',
    title: 'Deterministic Pre-Flight Router',
    detail: 'AST & regex triage in <15ms · 0 LLM cost',
    badge: '<15ms SLA',
  },
  {
    step: '02',
    title: 'AST Schema Recovery Layer',
    detail: 'Auto-repairs malformed JSON · 0 crashes',
    badge: 'AST Salvage',
  },
  {
    step: '03',
    title: 'Golden-Dataset Eval Harness',
    detail: 'Automated CI gates · 95%+ field agreement',
    badge: 'Reality Evals',
  },
];

const TRUST_GRID = [
  {
    name: 'JPMORGAN',
    delay: '1.25s',
    href: '#timeline-momentum',
  },
  {
    name: 'ONETERA',
    delay: '1.32s',
    href: '#case-studies',
  },
  {
    name: 'PROVENIR',
    delay: '1.39s',
    href: '#timeline-momentum',
  },
  {
    name: 'DELOITTE',
    delay: '1.46s',
    href: '#timeline-momentum',
  },
  {
    name: 'CCA-F ARCHITECT',
    delay: '1.42s',
    href: 'https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile',
    external: true,
  },
  {
    name: 'GEMINI PR #1088 (MERGED)',
    delay: '1.49s',
    href: 'https://github.com/google-gemini/cookbook/pull/1088',
    external: true,
  },
  {
    name: 'OPENAI PR #2568 (CONTRIBUTED)',
    delay: '1.56s',
    href: 'https://github.com/openai/openai-cookbook/pull/2568',
    external: true,
  },
  {
    name: 'AWS AI CERT',
    delay: '1.63s',
    href: 'https://www.credly.com/badges/898b89f1-5512-4d4a-8ba6-6a1597c7c510/public_url',
    external: true,
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
      setActiveLayer(prev => (prev + 1) % LIVE_AGENT_LAYERS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      id="story"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-10 max-w-6xl mx-auto"
    >
      {/* ── HERO TOP ROW: Headline + 3 Metrics + 1 CTA + 3D Agent Stack ── */}
      <div className="grid lg:grid-cols-12 gap-8 items-start pt-6 sm:pt-10">
        {/* Left 7 Columns: First-Person Headline, Subtitle, 3 Metrics & 1 CTA */}
        <motion.div style={{ y: leftColY }} className="lg:col-span-7 space-y-6">
          <div
            className="fade-up inline-flex items-center gap-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#0b1d3a]/10 px-4 py-1.5 shadow-sm"
            style={{ ['--d' as any]: '0.2s' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span className="mono-accent text-xs font-semibold tracking-[0.16em] uppercase text-[#1d2f4f]">
              APPLIED AI &amp; FOUNDING ENGINEER
            </span>
          </div>

          {/* First-Person Headline (Using "I" instead of third person) */}
          <HaldenLetterReveal
            as="h1"
            mode="load"
            durationMs={1250}
            delayMs={180}
            spread={0.35}
            segments={HERO_HEADLINE_SEGMENTS}
            className="font-display text-[clamp(36px,4.65vw,68px)] font-normal leading-[1.04] tracking-[-0.035em] text-[#0b1d3a]"
          />

          <p
            className="fade-up text-base sm:text-lg text-[#1d2f4f]/85 max-w-xl leading-relaxed"
            style={{ ['--d' as any]: '0.85s' }}
          >
            Customer conversations, architecture, full-stack code, production support, and the AI where it helps.
          </p>

          {/* Single Focused Primary CTA */}
          <div className="fade-up pt-2" style={{ ['--d' as any]: '1.0s' }}>
            <HaldenButton size="lg" href="#case-studies">
              Explore Proven Work &darr;
            </HaldenButton>
          </div>
        </motion.div>

        {/* Right 5 Columns: Synchronized 3D Live Agent Stack Card with Parallax Elevation */}
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
                    Live 3D Agent Stack
                  </span>
                </div>
                <span className="mono-accent text-[11px] text-[#5b7cf0] font-semibold">
                  &lt;15ms SLA
                </span>
              </div>

              <div className="space-y-2.5">
                {LIVE_AGENT_LAYERS.map((layer, idx) => {
                  const isActive = idx === activeLayer;
                  return (
                    <div
                      key={layer.step}
                      onMouseEnter={() => setActiveLayer(idx)}
                      style={{
                        transform: isActive ? 'translateZ(22px) scale(1.02)' : 'translateZ(6px)',
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
                            {layer.step}
                          </span>
                          <div>
                            <p className="font-display text-sm font-semibold text-[#0b1d3a]">
                              {layer.title}
                            </p>
                            <p className="text-xs text-[#3e4d68]">{layer.detail}</p>
                          </div>
                        </div>
                        <span className="mono-accent text-xs font-semibold text-[#5b7cf0] shrink-0">
                          {layer.badge}
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

      {/* ── LOWER SECTION: Verified Footprint & 8 Credential Chips Moved Below ── */}
      <div className="mt-14 pt-8 border-t border-[#0b1d3a]/8 grid lg:grid-cols-12 gap-8 items-center">
        {/* Left 5 Columns: Production Trust Line */}
        <div className="lg:col-span-5 space-y-2">
          <span className="mono-accent text-xs font-semibold uppercase tracking-[0.16em] text-[#5b7cf0] block">
            VERIFIED PRODUCTION FOOTPRINT
          </span>
          <p
            className="fade-up text-[clamp(14px,1.15vw,16px)] tracking-[-0.015em] text-[#1d2f4f] font-medium leading-relaxed"
            style={{ ['--d' as any]: '1.15s' }}
          >
            Architectures, evaluations, and official contributions trusted across enterprise and open-source ecosystems.
          </p>
        </div>

        {/* Right 7 Columns: Clean 4x2 Hairline Grid with Unified Typography */}
        <div className="lg:col-span-7 w-full overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#0b1d3a]/[0.06] lg:border-t-0">
            {TRUST_GRID.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                style={{ ['--d' as any]: item.delay }}
                className={`fade-up group flex items-center justify-center py-4 sm:py-5 px-2 sm:px-3 text-[#3e4d68] hover:text-[#0b1d3a] transition-colors border-l border-[#0b1d3a]/[0.08] ${
                  idx >= 2 ? 'border-t sm:border-t-0' : ''
                } ${idx >= 4 ? 'sm:border-t sm:border-t-[#0b1d3a]/[0.06]' : ''}`}
              >
                <span className="font-display text-[11px] sm:text-[12px] font-semibold tracking-[0.04em] sm:tracking-[0.06em] text-center truncate px-1">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
