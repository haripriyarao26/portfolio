'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

/* ── 5 BEATS SPECIFICATION ("HOW I THINK") ── */
const HOW_I_THINK_BEATS = [
  {
    step: '01',
    title: 'Assume it will fail',
    desc: 'The request enters wobbly and unpredictable. We map failure modes before writing happy paths.',
    color: '#818cf8',
    tag: 'Unpredictable AI Input',
  },
  {
    step: '02',
    title: 'Wrap it in checks',
    desc: 'An amber glass guardrail intercepts the input. Malformed schemas bounce off with strict schema gates.',
    color: '#f59e0b',
    tag: 'Deterministic Guardrails',
  },
  {
    step: '03',
    title: 'Test against real cases',
    desc: 'Passes 100+ messy golden-dataset edge cases, null fields, and adversarial inputs in CI/CD.',
    color: '#38bdf8',
    tag: 'Reality Evals',
  },
  {
    step: '04',
    title: 'Ship without drama',
    desc: 'The payload turns teal, verified and deterministic. Deploys with zero state desyncs.',
    color: '#2dd4bf',
    tag: 'Verified Production',
  },
  {
    step: '05',
    title: 'Build it with the people who use it',
    desc: 'Human nodes connect directly into the system loop. Real user trust gets built together, not just coded.',
    color: '#00f0ff',
    tag: 'Human in the Loop',
  },
];

/* ── THREE THINGS I REFUSED TO DO ── */
const REFUSALS = [
  {
    number: '01',
    title: 'Unchecked Prompt-Based Routing',
    rejected: 'Letting an LLM decide in freeform text which downstream tool or model to call next.',
    why: 'Led to unbounded latency (>8s), non-deterministic execution loops, and a 12% hallucinated tool routing rate.',
    builtInstead: 'Built a deterministic AST & regex pre-flight scoring engine that routes requests in <15ms with 0 token overhead and zero routing hallucinations.',
    tag: '<15ms Pre-Flight SLA',
  },
  {
    number: '02',
    title: 'Silent Rate-Limit Model Downgrades',
    rejected: 'Silently falling back to a weak lightweight model on 429 rate limits without alerting users.',
    why: 'Silently degraded financial document extraction accuracy from 95.4% to 71.2%, corrupting production accounting data.',
    builtInstead: 'Built explicit Redis token-bucket queues, circuit breakers, and Dead Letter Queues (DLQ) with transparent telemetry rather than silent corruption.',
    tag: 'Zero Silent Drift',
  },
  {
    number: '03',
    title: 'Shoving Raw 200MB Repos into 1M Context Windows',
    rejected: 'Dumping entire unparsed git repositories into frontier context windows to avoid building indexing infrastructure.',
    why: 'Triggered "lost-in-the-middle" attention degradation, context amnesia, and runaway $700+ daily API bills for trivial edits.',
    builtInstead: 'Built tree-sitter AST slicing that extracts only the relevant 4KB function interfaces and call graphs (200MB to 4KB).',
    tag: '200MB → 4KB AST Slice',
  },
];

export default function HowIThinkExperience({
  onNavActivate,
}: {
  onNavActivate?: (active: boolean) => void;
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [selectedStep, setSelectedStep] = useState(0);

  // Mouse 3D Tilt State
  const [mouseTilt, setMouseTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({
      rotateX: -y * 6,
      rotateY: x * 6,
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ rotateX: 0, rotateY: 0 });
  };

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const bgGridY = useTransform(smoothProgress, [0, 1], [-40, 40]);
  const stageParallaxY = useTransform(smoothProgress, [0, 1], [20, -20]);

  // Subtle Parallax offsets for the 3 refusal cards
  const refusalCard1Y = useTransform(smoothProgress, [0, 1], [15, -15]);
  const refusalCard2Y = useTransform(smoothProgress, [0, 1], [0, 0]);
  const refusalCard3Y = useTransform(smoothProgress, [0, 1], [-15, 15]);

  return (
    <section
      ref={containerRef}
      id="how-i-think"
      className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-12 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ── 1. MAIN 3D ARCHITECTURAL THINKING CARD ── */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
        >
          <motion.div
            animate={{
              rotateX: mouseTilt.rotateX,
              rotateY: mouseTilt.rotateY,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="relative rounded-3xl p-6 sm:p-10 bg-[#060c18] border border-cyan-500/30 shadow-[0_0_80px_rgba(0,240,255,0.12),0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Parallax Background Grid Layer */}
            <motion.div
              style={{ y: bgGridY }}
              className="pointer-events-none absolute -inset-10 opacity-20 bg-[linear-gradient(to_right,#38bdf820_1px,transparent_1px),linear-gradient(to_bottom,#38bdf820_1px,transparent_1px)] bg-[size:44px_44px]"
            />

            {/* Top Ambient Cyber Bloom */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-gradient-to-b from-cyan-500/20 via-indigo-500/10 to-transparent blur-3xl" />

            {/* Top Header */}
            <div className="relative z-10 border-b border-white/10 pb-6 mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 border border-cyan-500/40 px-3.5 py-1 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="font-mono text-xs font-bold tracking-wider text-cyan-300 uppercase">
                  WHY ENGINEERING LEADERS HIRE ME // ARCHITECTURAL THINKING
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
                I like building things people can{' '}
                <span className="text-[#2dd4bf] drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]">
                  actually rely on.
                </span>
              </h2>
            </div>

            {/* 5-Step Process Pills */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-7">
              {HOW_I_THINK_BEATS.map((beat, idx) => {
                const isSelected = selectedStep === idx;
                return (
                  <button
                    key={beat.step}
                    type="button"
                    onClick={() => setSelectedStep(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.35)] scale-[1.02]'
                        : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-cyan-500/40 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                          isSelected
                            ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                            : 'bg-white/[0.08] text-slate-400'
                        }`}
                      >
                        Step {beat.step}
                      </span>
                    </div>
                    <div
                      className={`text-xs font-bold leading-tight line-clamp-1 ${
                        isSelected ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {beat.title}
                    </div>
                    <div
                      className={`text-[10px] font-mono mt-1 ${
                        isSelected ? 'text-cyan-300 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {beat.tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step-Specific Visual Stage */}
            <motion.div style={{ y: stageParallaxY }} className="relative z-10 h-60 sm:h-64 w-full mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`step-${selectedStep}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full"
                >
                  {selectedStep === 0 && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#080f24] via-[#0b1430] to-[#040816] rounded-2xl border border-indigo-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(99,102,241,0.2)]">
                      <div className="absolute top-3 left-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8] animate-ping" />
                        <span className="text-xs font-mono text-indigo-300 font-bold uppercase tracking-wider">
                          Beat 01 // Unpredictable Request Enters
                        </span>
                      </div>
                      <svg className="w-full h-28 overflow-visible" viewBox="0 0 400 100">
                        <motion.path
                          d="M 20 50 Q 80 10, 140 90 T 260 15 T 380 50"
                          fill="none"
                          stroke="#818cf8"
                          strokeWidth="2.5"
                          strokeDasharray="4 4"
                          className="opacity-60"
                          animate={{ strokeDashoffset: [0, -32] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.circle
                          cx="140"
                          cy="50"
                          r="11"
                          fill="#818cf8"
                          className="drop-shadow-[0_0_18px_#818cf8]"
                          animate={{
                            cx: [60, 160, 240, 320, 60],
                            cy: [30, 75, 20, 65, 30],
                            scale: [1, 1.25, 0.9, 1.2, 1],
                          }}
                          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </svg>
                      <div className="text-center text-xs font-mono text-indigo-200 mt-2">
                        <span className="text-[#818cf8] font-bold">Assume It Breaks:</span> Stochastic generation with high entropy · We map failure modes first
                      </div>
                    </div>
                  )}

                  {selectedStep === 1 && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1a1104] via-[#241706] to-[#0a0702] rounded-2xl border border-amber-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(245,158,11,0.2)]">
                      <div className="absolute top-3 left-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-ping" />
                        <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                          Beat 02 // Amber Guardrail Intercept
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-8 my-auto w-full max-w-md">
                        <motion.div
                          animate={{ x: [-20, 8, -20], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-7 h-7 rounded-full bg-rose-500/80 border border-rose-400 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_12px_rgba(244,63,94,0.7)]">
                            ✕
                          </div>
                          <span className="text-[10px] font-mono text-rose-300 mt-1 font-semibold">Bad Schema</span>
                        </motion.div>

                        <div className="relative w-12 h-24 rounded-xl bg-gradient-to-b from-amber-400/40 via-amber-500/20 to-amber-600/40 border-2 border-amber-400/90 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                          <div className="w-1.5 h-12 bg-amber-300/80 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
                          <span className="text-[9px] font-mono text-amber-200 mt-1 rotate-90 uppercase tracking-widest font-bold">
                            AST GATE
                          </span>
                        </div>

                        <motion.div
                          animate={{ x: [0, 25, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-7 h-7 rounded-full bg-teal-400/80 border border-teal-300 flex items-center justify-center text-slate-950 text-xs font-bold shadow-[0_0_12px_rgba(45,212,191,0.7)]">
                            ✓
                          </div>
                          <span className="text-[10px] font-mono text-teal-300 mt-1 font-semibold">Sanitized</span>
                        </motion.div>
                      </div>
                      <div className="text-center text-xs font-mono text-amber-200 mt-2">
                        <span className="text-[#f59e0b] font-bold">Wrap In Checks:</span> Strict Pydantic / TypeScript AST contracts bounce invalid outputs
                      </div>
                    </div>
                  )}

                  {selectedStep === 2 && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#061426] via-[#0a1e38] to-[#030a14] rounded-2xl border border-cyan-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(56,189,248,0.2)]">
                      <div className="absolute top-3 left-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-ping" />
                        <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                          Beat 03 // Reality Gauntlet Evals
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto w-full max-w-lg">
                        {[
                          { name: 'Null Values', status: 'Passed', ms: '12ms' },
                          { name: 'Injection Attack', status: 'Blocked', ms: '8ms' },
                          { name: 'Messy Data', status: 'Parsed', ms: '18ms' },
                          { name: 'Golden Set', status: '99.4%', ms: '24ms' },
                        ].map((c, i) => (
                          <div
                            key={c.name}
                            className="p-2.5 rounded-xl bg-white/[0.06] border border-cyan-400/30 flex flex-col items-center text-center shadow-lg"
                          >
                            <span className="text-[10px] font-mono text-slate-300 font-medium">{c.name}</span>
                            <span className="text-xs font-mono text-cyan-300 font-bold mt-1">{c.status}</span>
                            <span className="text-[9px] font-mono text-teal-400 mt-0.5">{c.ms}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-xs font-mono text-cyan-200 mt-2">
                        <span className="text-[#38bdf8] font-bold">Test Against Reality:</span> Tested across 100+ messy production cases before merge
                      </div>
                    </div>
                  )}

                  {selectedStep === 3 && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#041a16] via-[#07241e] to-[#020d0b] rounded-2xl border border-teal-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(45,212,191,0.2)]">
                      <div className="absolute top-3 left-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] animate-ping" />
                        <span className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider">
                          Beat 04 // Ship Calmly &amp; Deterministically
                        </span>
                      </div>
                      <div className="relative w-full max-w-md h-12 flex items-center justify-between my-auto px-4">
                        <div className="absolute left-4 right-4 h-1.5 bg-teal-500/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_0_12px_#2dd4bf]"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                          />
                        </div>
                        <motion.div
                          animate={{ x: [0, 260, 0] }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="relative z-10 w-7 h-7 rounded-full bg-[#2dd4bf] border-2 border-white flex items-center justify-center text-slate-950 font-bold text-xs shadow-[0_0_20px_#2dd4bf]"
                        >
                          ✓
                        </motion.div>
                        <div className="relative z-10 text-[11px] font-mono text-teal-200 bg-slate-950/80 px-2.5 py-1 rounded border border-teal-500/40 font-bold">
                          0 State Desyncs
                        </div>
                      </div>
                      <div className="text-center text-xs font-mono text-teal-200 mt-2">
                        <span className="text-[#2dd4bf] font-bold">Ship Without Drama:</span> Deterministic production execution · 0 state regressions
                      </div>
                    </div>
                  )}

                  {selectedStep === 4 && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#061824] via-[#092233] to-[#030c12] rounded-2xl border border-cyan-400/40 overflow-hidden shadow-[inset_0_0_30px_rgba(0,240,255,0.2)]">
                      <div className="absolute top-3 left-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
                        <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                          Beat 05 // Build With The People Who Use It
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-6 sm:gap-10 my-auto">
                        {[
                          { label: 'Haripriya', icon: '👩‍💻', role: 'Architect' },
                          { label: 'Eng Leaders', icon: '⚡', role: 'Feedback' },
                          { label: 'Domain Users', icon: '🤝', role: 'Validation' },
                        ].map((node, i) => (
                          <motion.div
                            key={node.label}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
                            className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.08] border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.25)] text-center"
                          >
                            <span className="text-2xl">{node.icon}</span>
                            <span className="text-xs font-mono text-white font-bold mt-1">{node.label}</span>
                            <span className="text-[10px] font-mono text-cyan-300">{node.role}</span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-center text-xs font-mono text-cyan-200 mt-2">
                        <span className="text-[#00f0ff] font-bold">Shared Ownership:</span> Trust gets built together through transparent feedback loops
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Editorial Narrative */}
            <div className="relative z-10 border-t border-white/10 pt-6">
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal">
                I like building things people can{' '}
                <span className="text-[#2dd4bf] font-bold underline decoration-[#2dd4bf]/40 underline-offset-4">
                  actually rely on
                </span>
                . Anyone can make a model look impressive in a demo.
                The harder and more interesting work starts when it meets real users, messy data and real consequences.
                So I begin with how a system might fail, build the{' '}
                <strong className="font-bold text-white border-b-2 border-amber-400/80 pb-0.5">
                  checks and fallbacks first
                </strong>
                , and only then make the clever part clever.
                And I work closely with the people who’ll use it, because{' '}
                <span className="text-[#2dd4bf] font-bold">
                  trust gets built together
                </span>
                , not just coded.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── 2. THE THREE THINGS I REFUSED TO DO ── */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
            <span className="font-mono text-xs font-bold tracking-wider text-amber-300 uppercase">
              OPERATING PRINCIPLES // THE THREE SHORTCUTS I REFUSED TO TAKE
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {REFUSALS.map((r, rIdx) => {
              const cardY = rIdx === 0 ? refusalCard1Y : rIdx === 1 ? refusalCard2Y : refusalCard3Y;
              return (
                <motion.div
                  key={r.number}
                  style={{ y: cardY }}
                  className="p-6 rounded-3xl bg-[#060c18] border border-white/10 hover:border-amber-500/40 transition-colors flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-slate-500 font-bold">Shortcut {r.number}</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                        Rejected
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold text-white mb-2">{r.title}</h4>

                    <div className="text-xs text-slate-400 mb-3 space-y-1">
                      <p><strong className="text-slate-300">Shortcut:</strong> {r.rejected}</p>
                      <p><strong className="text-rose-400">Why I refused:</strong> {r.why}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 mt-2">
                    <p className="text-xs text-slate-200 leading-relaxed">
                      <strong className="text-teal-300 font-mono">Built instead:</strong> {r.builtInstead}
                    </p>
                    <span className="inline-block mt-3 text-[10px] font-mono text-teal-400 bg-teal-950/60 border border-teal-500/30 px-2 py-0.5 rounded">
                      {r.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
