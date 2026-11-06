'use client';

import { useEffect, useState } from 'react';
import { DecryptedMetric, TiltCard3D } from '@/components/ReactBits3D';
import { HaldenButton, HaldenLetterReveal, WordSegment } from '@/components/HaldenMotion';

type Props = { name: string; tagline: string };

const HERO_HEADLINE_SEGMENTS: WordSegment[] = [
  { text: 'Meet', highlight: false },
  { text: 'Haripriya,', highlight: true },
  { text: 'your AI engineer', highlight: false, lineBreakAfter: true },
  { text: 'for production scale.', highlight: false },
];

const LIVE_AGENT_LAYERS = [
  {
    step: '01',
    title: '22-Node LangGraph Router',
    detail: 'Parallel async tool scheduling',
    badge: '-40% Latency',
  },
  {
    step: '02',
    title: 'TOON Payload Compression',
    detail: '200 KB verbose JSON → 8 KB table',
    badge: '-96% Cost',
  },
  {
    step: '03',
    title: 'Golden-Dataset Eval Gate',
    detail: '40.8s → 19.6s · 8/8 nested threads',
    badge: '95% Accuracy',
  },
];

const TRUST_GRID = [
  {
    name: 'JPMORGAN',
    delay: '1.25s',
    href: '#study-jpmc',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
        <path d="M3 7.5c2.2-1.6 4.6-1.6 6.8 0s4.6 1.6 6.8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 12.5c2.2-1.6 4.6-1.6 6.8 0s4.6 1.6 6.8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Onetera',
    delay: '1.32s',
    serif: true,
    href: '#study-onetera',
    icon: null,
  },
  {
    name: 'NVIDIA PARTNERS',
    delay: '1.39s',
    href: '#study-onetera',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <rect x="3" y="8" width="3" height="9" rx="1" />
        <rect x="8.5" y="3" width="3" height="14" rx="1" />
        <rect x="14" y="6" width="3" height="11" rx="1" />
      </svg>
    ),
  },
  {
    name: 'DELOITTE',
    delay: '1.46s',
    href: '#timeline-momentum',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
        <polygon points="10,3 17,16 3,16" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: 'CCA-F ARCHITECT',
    delay: '1.42s',
    boxed: true,
    href: 'https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile',
    external: true,
    icon: null,
  },
  {
    name: 'GEMINI PR #1088',
    delay: '1.49s',
    href: 'https://github.com/google-gemini/cookbook/pull/1088',
    external: true,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
        <path d="M5 4v12M15 4v12M5 10h10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'openai #2568',
    delay: '1.56s',
    lowercase: true,
    href: 'https://github.com/openai/openai-cookbook/pull/2568',
    external: true,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'AWS AI CERT',
    delay: '1.63s',
    href: 'https://www.credly.com/badges/898b89f1-5512-4d4a-8ba6-6a1597c7c510/public_url',
    external: true,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 15 7.5 6l4 6.5 2.5-3.5L18 15H2Z" />
      </svg>
    ),
  },
];

export default function StoryCanvasSequence({ name }: Props) {
  const [copied, setCopied] = useState(false);
  const [activeLayer, setActiveLayer] = useState(0);
  const email = 'haripriyaraov@gmail.com';

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % LIVE_AGENT_LAYERS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="story"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 max-w-6xl mx-auto"
    >
      {/* Top / Middle Row: Halden Per-Character Blur-to-Navy Headline + Option 3 Live 3D Agent Stack */}
      <div className="grid lg:grid-cols-12 gap-8 items-start pt-6 sm:pt-10">
        {/* Left 7 Columns: Per-Character Reveal Headline + Subtitle + Metric Pills */}
        <div className="lg:col-span-7 space-y-6">
          <div
            className="fade-up inline-flex items-center gap-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#0b1d3a]/10 px-4 py-1.5 shadow-sm"
            style={{ ['--d' as any]: '0.2s' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span className="mono-accent text-xs font-semibold tracking-[0.16em] uppercase text-[#1d2f4f]">
              SENIOR AI &amp; FOUNDING ENGINEER &middot; USA (H-1B)
            </span>
          </div>

          {/* Exact Halden Time-Based Per-Character Letter Reveal (#h1) */}
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
            I architect multi-agent workflows and deterministic safety layers — cutting AI cloud costs{' '}
            <strong className="text-[#0b1d3a] font-semibold">96%</strong> and financial document review wait times in{' '}
            <strong className="text-[#0b1d3a] font-semibold">half</strong>.
          </p>

          {/* Staggered Metric Pills */}
          <div
            className="fade-up flex flex-wrap items-center gap-2.5 pt-1"
            style={{ ['--d' as any]: '1.0s' }}
          >
            {[
              { metric: '96%', label: 'AI Cost Cut' },
              { metric: '2x', label: 'Faster Review' },
              { metric: '99.98%', label: 'Uptime' },
              { metric: '2 PRs', label: 'Google & OpenAI' },
            ].map(item => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md border border-[#0b1d3a]/10 px-4 py-2 shadow-sm"
              >
                <span className="font-display text-sm font-bold text-[#0b1d3a]">
                  <DecryptedMetric value={item.metric} />
                </span>
                <span className="text-xs font-medium text-[#3e4d68]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Synchronized Fade-Up 3D Live Agent Stack Card */}
        <div
          className="fade-up lg:col-span-5"
          style={{ ['--d' as any]: '0.95s' }}
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
                  99.98% Uptime
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
        </div>
      </div>

      {/* Bottom Row: Halden Trust Line + Large Cyan-Dot-to-Chevron CTA (Left) & 4x2 Hairline Credential Grid (Right) */}
      <div className="mt-12 grid lg:grid-cols-12 gap-8 items-end pt-6">
        {/* Left 6 Columns: Trust Line (.trust at 1.15s) + Large CTA (.btn.lg at 1.3s) */}
        <div className="lg:col-span-6 space-y-5">
          <p
            className="fade-up text-[clamp(15px,1.25vw,19px)] tracking-[-0.015em] text-[#1d2f4f] font-medium"
            style={{ ['--d' as any]: '1.15s' }}
          >
            Engineering leaders &amp; enterprise teams trust {name}
          </p>

          <div
            className="fade-up flex flex-wrap items-center gap-3"
            style={{ ['--d' as any]: '1.3s' }}
          >
            <HaldenButton
              size="lg"
              href={`mailto:${email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
            >
              Email Haripriya
            </HaldenButton>

            <HaldenButton size="lg" variant="ghost" onClick={handleCopyEmail}>
              {copied ? '✓ Copied Email' : 'Copy Email'}
            </HaldenButton>

            <HaldenButton
              size="lg"
              variant="ghost"
              href="/Haripriya_Rao_Resume.pdf"
              download="Haripriya_Rao_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume PDF
            </HaldenButton>
          </div>
        </div>

        {/* Right 6 Columns: Exact Halden 4x2 Hairline Wordmark Grid (.logos with 1.25s..1.63s staggered delays) */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#0b1d3a]/[0.06] lg:border-t-0">
            {TRUST_GRID.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                style={{ ['--d' as any]: item.delay }}
                className={`fade-up group flex items-center justify-center gap-2 py-5 px-3 text-[#3e4d68] hover:text-[#0b1d3a] transition-colors border-l border-[#0b1d3a]/[0.08] ${
                  idx >= 4 ? 'border-t border-t-[#0b1d3a]/[0.06]' : ''
                }`}
              >
                {item.icon}
                <span
                  className={
                    item.serif
                      ? 'font-serif italic font-bold text-[15px] tracking-[0.02em]'
                      : item.boxed
                      ? 'text-[11px] font-extrabold tracking-[-0.01em] border-2 border-current rounded px-1.5 py-0.5'
                      : item.lowercase
                      ? 'text-[14px] font-medium tracking-normal'
                      : 'text-[11px] font-semibold tracking-[0.08em]'
                  }
                >
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
