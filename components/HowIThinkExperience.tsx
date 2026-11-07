'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

/* ── 5 BEATS SPECIFICATION ("HOW I THINK") ── */
const HOW_I_THINK_BEATS = [
  {
    step: '01',
    title: 'Assume it will fail',
    desc: 'The input enters wobbly and unpredictable. We map failure paths before writing happy paths.',
    color: '#818cf8',
    tag: 'Unchecked Input',
  },
  {
    step: '02',
    title: 'Wrap it in checks',
    desc: 'Clear schema boundaries catch and reject bad shapes before they hit state or database.',
    color: '#f59e0b',
    tag: 'Guardrails First',
  },
  {
    step: '03',
    title: 'Test real cases',
    desc: 'Checked against messy real-world cases and edge cases, not just clean happy paths.',
    color: '#38bdf8',
    tag: 'Real-World Data',
  },
  {
    step: '04',
    title: 'Ship calmly',
    desc: 'Predictable execution with zero state corruption. Deploys quietly without drama.',
    color: '#2dd4bf',
    tag: 'Predictable Deploy',
  },
  {
    step: '05',
    title: 'Build with users',
    desc: 'Real user trust gets built together with the people using the tool, not just coded.',
    color: '#00f0ff',
    tag: 'Human in the Loop',
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

  return (
    <section
      ref={containerRef}
      id="how-i-think"
      className="relative py-16 sm:py-24 px-6 sm:px-10 scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-10">
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
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 border border-cyan-500/30 px-3 py-0.5 mb-3 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] text-cyan-300 uppercase">
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
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.35)] scale-[1.02]'
                        : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-cyan-500/40 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                          isSelected
                            ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                            : 'bg-white/[0.08] text-slate-300'
                        }`}
                      >
                        Step {beat.step}
                      </span>
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-bold leading-tight ${
                        isSelected ? 'text-white' : 'text-slate-100'
                      }`}
                    >
                      {beat.title}
                    </div>
                    <div
                      className={`text-xs font-mono mt-1 ${
                        isSelected ? 'text-cyan-200 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {beat.tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step-Specific Visual Stage */}
            <motion.div style={{ y: stageParallaxY }} className="relative z-10 h-64 sm:h-68 w-full mb-8">
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
                    <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#080f24] via-[#0b1430] to-[#040816] rounded-2xl border border-indigo-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(99,102,241,0.2)]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8] animate-ping" />
                        <span className="text-xs font-mono text-indigo-300 font-bold uppercase tracking-wider">
                          Beat 01 · Unchecked Input
                        </span>
                      </div>
                      
                      {/* Generous centered SVG stage with no clipping */}
                      <div className="w-full flex-1 flex items-center justify-center my-1">
                        <svg className="w-full max-w-lg h-24 overflow-visible" viewBox="0 0 400 90">
                          <motion.path
                            d="M 20 45 Q 85 24, 150 66 T 280 26 T 380 45"
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
                            r="10"
                            fill="#818cf8"
                            className="drop-shadow-[0_0_18px_#818cf8]"
                            animate={{
                              cx: [50, 150, 250, 340, 50],
                              cy: [40, 64, 28, 52, 40],
                              scale: [1, 1.2, 0.9, 1.15, 1],
                            }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </svg>
                      </div>

                      <div className="text-center text-xs font-mono text-indigo-200">
                        <span className="text-[#818cf8] font-bold">Assume It Breaks:</span> Raw model outputs drift and wobble · We map failure paths first
                      </div>
                    </div>
                  )}

                  {selectedStep === 1 && (
                    <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#1a1104] via-[#241706] to-[#0a0702] rounded-2xl border border-amber-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(245,158,11,0.2)]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-ping" />
                        <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                          Beat 02 · Safety Checks &amp; Gates
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-8 my-auto w-full max-w-md mx-auto">
                        <motion.div
                          animate={{ x: [-20, 8, -20], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-7 h-7 rounded-full bg-rose-500/80 border border-rose-400 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_12px_rgba(244,63,94,0.7)]">
                            ✕
                          </div>
                          <span className="text-xs font-mono text-rose-300 mt-1 font-semibold">Bad Input</span>
                        </motion.div>

                        <div className="relative w-14 h-24 rounded-xl bg-gradient-to-b from-amber-400/40 via-amber-500/20 to-amber-600/40 border-2 border-amber-400/90 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                          <div className="w-1.5 h-12 bg-amber-300/80 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
                          <span className="text-[10px] font-mono text-amber-200 mt-1 rotate-90 uppercase tracking-widest font-bold">
                            SCHEMA
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
                          <span className="text-xs font-mono text-teal-300 mt-1 font-semibold">Sanitized</span>
                        </motion.div>
                      </div>
                      <div className="text-center text-xs font-mono text-amber-200">
                        <span className="text-[#f59e0b] font-bold">Wrap In Checks:</span> Clear schema boundaries catch and reject bad inputs before state writes
                      </div>
                    </div>
                  )}

                  {selectedStep === 2 && (
                    <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#061426] via-[#0a1e38] to-[#030a14] rounded-2xl border border-cyan-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(56,189,248,0.2)]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-ping" />
                        <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                          Beat 03 · Real-World Testing
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto w-full max-w-lg mx-auto">
                        {[
                          { name: 'Empty Fields', status: 'Passed', ms: '12ms' },
                          { name: 'Bad Injection', status: 'Blocked', ms: '8ms' },
                          { name: 'Messy Format', status: 'Parsed', ms: '18ms' },
                          { name: 'Edge Cases', status: '99.4%', ms: '24ms' },
                        ].map((c) => (
                          <div
                            key={c.name}
                            className="p-2.5 rounded-xl bg-white/[0.08] border border-cyan-400/30 flex flex-col items-center text-center shadow-lg"
                          >
                            <span className="text-xs font-mono text-slate-200 font-medium">{c.name}</span>
                            <span className="text-xs font-mono text-cyan-300 font-bold mt-1">{c.status}</span>
                            <span className="text-[10px] font-mono text-teal-300 mt-0.5">{c.ms}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-xs font-mono text-cyan-200">
                        <span className="text-[#38bdf8] font-bold">Test Against Reality:</span> Checked against messy production cases and bad user inputs before merge
                      </div>
                    </div>
                  )}

                  {selectedStep === 3 && (
                    <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#041a16] via-[#07241e] to-[#020d0b] rounded-2xl border border-teal-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(45,212,191,0.2)]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] animate-ping" />
                        <span className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider">
                          Beat 04 · Ship Calmly
                        </span>
                      </div>
                      <div className="relative w-full max-w-md h-12 flex items-center justify-between my-auto px-4 mx-auto">
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
                        <div className="relative z-10 text-xs font-mono text-teal-200 bg-slate-950/80 px-2.5 py-1 rounded border border-teal-500/40 font-bold">
                          Zero Drift
                        </div>
                      </div>
                      <div className="text-center text-xs font-mono text-teal-200">
                        <span className="text-[#2dd4bf] font-bold">Ship Calmly:</span> Predictable execution with zero state corruption
                      </div>
                    </div>
                  )}

                  {selectedStep === 4 && (
                    <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#061824] via-[#092233] to-[#030c12] rounded-2xl border border-cyan-400/40 overflow-hidden shadow-[inset_0_0_30px_rgba(0,240,255,0.2)]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
                        <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                          Beat 05 · Build With Users
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-6 sm:gap-10 my-auto">
                        {[
                          { label: 'Haripriya', icon: '👩‍💻', role: 'Architect' },
                          { label: 'Engineering', icon: '⚡', role: 'Code & Infra' },
                          { label: 'Domain Users', icon: '🤝', role: 'Real Usage' },
                        ].map((node, i) => (
                          <motion.div
                            key={node.label}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
                            className="flex flex-col items-center p-3.5 rounded-2xl bg-white/[0.08] border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.25)] text-center min-w-[100px]"
                          >
                            <span className="text-2xl">{node.icon}</span>
                            <span className="text-xs font-mono text-white font-bold mt-1">{node.label}</span>
                            <span className="text-xs font-mono text-cyan-200">{node.role}</span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-center text-xs font-mono text-cyan-200">
                        <span className="text-[#00f0ff] font-bold">Shared Ownership:</span> Trust gets built together with the people using the tool, not just coded
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
      </div>
    </section>
  );
}
