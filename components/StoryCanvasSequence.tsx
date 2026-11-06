'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DecryptedMetric, MagneticButton, TiltCard3D } from '@/components/ReactBits3D';

type Props = { name: string; tagline: string };

/**
 * High-craft SVG Radial Fiber-Optic Iris Emblem matching the circular emblem
 * in the reference contact card.
 */
function RadialFiberEmblem() {
  const spokes = Array.from({ length: 32 }, (_, i) => (i * 360) / 32);
  return (
    <div className="relative h-16 w-16 shrink-0 rounded-full bg-gradient-to-br from-white/95 via-[#F1F5F9] to-[#CBD5E1] border border-white shadow-md flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-1.5 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.95) 0%, rgba(251, 191, 36, 0.55) 36%, rgba(255, 255, 255, 0.9) 72%, rgba(226, 232, 240, 1) 100%)',
        }}
      />
      <svg className="relative z-10 h-full w-full p-1" viewBox="0 0 100 100" fill="none">
        {spokes.map((deg, idx) => (
          <g key={deg} transform={`rotate(${deg} 50 50)`}>
            <line
              x1="50"
              y1="22"
              x2="50"
              y2={idx % 2 === 0 ? '6' : '11'}
              stroke="#FFFFFF"
              strokeWidth={idx % 2 === 0 ? '2.2' : '1.5'}
              strokeLinecap="round"
            />
            <line
              x1="50"
              y1="34"
              x2="50"
              y2="22"
              stroke="#D97706"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="50" cy="35" r="1.4" fill="#FEF3C7" />
          </g>
        ))}
        <circle cx="50" cy="50" r="11" fill="#F59E0B" fillOpacity="0.35" />
        <circle cx="50" cy="50" r="5.5" fill="#FFFBEB" />
      </svg>
    </div>
  );
}

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

export default function StoryCanvasSequence({ name }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeLayer, setActiveLayer] = useState(0);
  const email = 'haripriyaraov@gmail.com';

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % LIVE_AGENT_LAYERS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end 45%'],
  });

  const layerOneY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-10 px-6 sm:px-10 max-w-6xl mx-auto"
    >
      <motion.div
        style={{ opacity: titleOpacity, y: layerOneY }}
        className="grid lg:grid-cols-12 gap-8 items-center my-auto py-6"
      >
        {/* Left 7 Columns: Editorial Typography & Impact Pills */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-white/55 backdrop-blur-md border border-white/85 shadow-sm">
            <span className="h-3.5 w-[2px] bg-[#0F141C]" />
            <span className="mono-accent text-xs tracking-[0.18em] uppercase font-semibold text-[#1E293B]">
              PRODUCTION AI &middot; JPMORGAN &middot; ONETERA &middot; DELOITTE
            </span>
          </div>

          <h1
            className="font-display text-5xl sm:text-7xl lg:text-[5.2rem] font-semibold tracking-tight leading-[1.03] text-[#0F141C]"
            style={{ textWrap: 'balance' }}
          >
            Clear. Precise.
            <br />
            <span className="text-[#475569] font-normal">Autonomous.</span>
          </h1>

          <p
            className="text-base sm:text-lg text-[#334155] max-w-xl font-normal leading-relaxed"
            style={{ textWrap: 'pretty' }}
          >
            Hi, I&apos;m <strong className="text-[#0F141C] font-semibold">{name}</strong> — Senior AI &amp; Founding Engineer unifying multi-agent intelligence with deterministic safety to cut AI cloud costs{' '}
            <strong className="text-[#0F141C] font-semibold">96%</strong> and review times in{' '}
            <strong className="text-[#0F141C] font-semibold">half</strong>.
          </p>

          {/* Compact Frosted Pill Metrics */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {[
              { metric: '96%', label: 'AI Cost Cut' },
              { metric: '2x', label: 'Faster Review' },
              { metric: '99.98%', label: 'Uptime' },
              { metric: '2 PRs', label: 'Merged by Google & OpenAI' },
            ].map(item => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/95 px-4 py-2 shadow-sm"
              >
                <span className="font-display text-sm font-bold text-[#0F141C]">
                  <DecryptedMetric value={item.metric} />
                </span>
                <span className="text-xs font-medium text-[#475569]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns (Option 3): Interactive 3D-Tilting Multi-Agent Stack Card + Quick Contact Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* 1. Interactive 3D Multi-Agent Pipeline Card */}
          <TiltCard3D
            intensity={8}
            glareColor="rgba(255, 255, 255, 0.9)"
            className="spatial-glass rounded-3xl p-5 sm:p-6 w-full"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="mono-accent text-xs font-semibold uppercase tracking-wider text-[#0F141C]">
                    Live 3D Agent Stack
                  </span>
                </div>
                <span className="mono-accent text-[11px] text-[#64748B]">
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
                          ? 'border-[#0F141C] bg-white shadow-md'
                          : 'border-white/80 bg-white/55 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`mono-accent text-xs font-bold px-2 py-0.5 rounded-md ${
                              isActive
                                ? 'bg-[#0F141C] text-white'
                                : 'bg-slate-200/70 text-[#475569]'
                            }`}
                          >
                            {layer.step}
                          </span>
                          <div>
                            <p className="font-display text-sm font-semibold text-[#0F141C]">
                              {layer.title}
                            </p>
                            <p className="text-xs text-[#64748B]">{layer.detail}</p>
                          </div>
                        </div>
                        <span className="mono-accent text-xs font-semibold text-[#D97706] shrink-0">
                          {layer.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TiltCard3D>

          {/* 2. Floating Frosted Glass Contact Card ("Talk with Haripriya") */}
          <TiltCard3D
            intensity={5}
            glareColor="rgba(255, 255, 255, 0.85)"
            className="spatial-glass rounded-3xl p-5 w-full"
          >
            <div className="flex items-center gap-4">
              <RadialFiberEmblem />

              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-semibold text-[#0F141C] leading-snug">
                  Talk with Haripriya
                </p>
                <p className="mono-accent text-[11px] uppercase tracking-[0.14em] text-[#64748B] mt-0.5">
                  SENIOR AI &amp; FOUNDING ENGINEER
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <MagneticButton>
                    <a
                      href={`mailto:${email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
                      className="inline-flex items-center justify-center rounded-full bg-[#0F141C] hover:bg-[#1E293B] text-[#FFFFFF] shadow-sm px-4 py-2 text-xs font-semibold transition-all duration-300"
                    >
                      Email Haripriya
                    </a>
                  </MagneticButton>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center rounded-full bg-white/75 hover:bg-white border border-black/10 px-3.5 py-2 text-xs font-semibold text-[#0F141C] transition-all duration-300"
                  >
                    {copied ? (
                      <span className="text-emerald-700">✓ Copied</span>
                    ) : (
                      <span>Copy email</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </TiltCard3D>
        </div>
      </motion.div>

      {/* Bottom Corner Strip */}
      <div className="mt-8 pt-5 border-t border-slate-300/50 flex flex-wrap items-center justify-between gap-4 text-xs text-[#475569]">
        <p className="max-w-md">
          <strong className="text-[#0F141C] font-semibold">Autonomous Dynamics</strong> — Scroll to fly through the 3D Agent Constellation, 96% Compression Funnel, Career Spine, and Skills Orbit.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/70 border border-white/90 hover:border-[#0F141C] px-3.5 py-1.5 text-xs font-medium text-[#0F141C] shadow-sm transition-all"
          >
            Anthropic CCA-F ↗
          </a>
          <a
            href="https://github.com/google-gemini/cookbook/pull/1088"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/70 border border-white/90 hover:border-[#0F141C] px-3.5 py-1.5 text-xs font-medium text-[#0F141C] shadow-sm transition-all"
          >
            Google Gemini PR #1088 ↗
          </a>
          <a
            href="https://github.com/openai/openai-cookbook/pull/2568"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/70 border border-white/90 hover:border-[#0F141C] px-3.5 py-1.5 text-xs font-medium text-[#0F141C] shadow-sm transition-all"
          >
            OpenAI Cookbook PR #2568 ↗
          </a>
          <a
            href="https://www.credly.com/badges/898b89f1-5512-4d4a-8ba6-6a1597c7c510/public_url"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/70 border border-white/90 hover:border-[#0F141C] px-3.5 py-1.5 text-xs font-medium text-[#0F141C] shadow-sm transition-all"
          >
            AWS AI Practitioner ↗
          </a>
        </div>
      </div>
    </section>
  );
}
