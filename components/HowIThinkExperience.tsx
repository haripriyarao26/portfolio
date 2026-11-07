'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

/* ── TAB 1: 5 BEATS SPECIFICATION ("HOW I THINK") ── */
const HOW_I_THINK_BEATS = [
  {
    step: '01',
    title: 'Assume it will fail',
    desc: 'The request enters wobbly and unpredictable. We map failure modes before writing happy paths.',
    color: '#818cf8', // Electric Periwinkle
    tag: 'Unpredictable AI Input',
    action: 'Simulate Chaos',
  },
  {
    step: '02',
    title: 'Wrap it in checks',
    desc: 'An amber glass guardrail intercepts the input. Malformed schemas bounce off with strict schema gates.',
    color: '#f59e0b', // Amber Gold
    tag: 'Deterministic Guardrails',
    action: 'Deploy Amber Gate',
  },
  {
    step: '03',
    title: 'Test against real cases',
    desc: 'Passes 100+ messy golden-dataset edge cases, null fields, and adversarial inputs in CI/CD.',
    color: '#38bdf8', // Cyan
    tag: 'Reality Evals',
    action: 'Run Gauntlet',
  },
  {
    step: '04',
    title: 'Ship without drama',
    desc: 'The payload turns teal, verified and deterministic. Deploys with zero state desyncs.',
    color: '#2dd4bf', // Neon Teal
    tag: 'Verified Production',
    action: 'Verify & Ship',
  },
  {
    step: '05',
    title: 'Build it with the people who use it',
    desc: 'Human nodes connect directly into the system loop. Real user trust gets built together, not just coded.',
    color: '#00f0ff', // Vivid Sky Cyan
    tag: 'Human in the Loop',
    action: 'Connect Humans',
  },
];

/* ── TAB 2: 5 BEATS SPECIFICATION ("HOW I USE AI DAILY") ── */
const DAILY_AI_BEATS = [
  {
    step: '01',
    title: 'Context Sandboxing & MCP',
    desc: 'Never dump full repos into prompts. I use Model Context Protocol (MCP) and AST parsers to slice only the relevant 5% of code.',
    color: '#818cf8',
    tag: 'MCP & AST Slicing',
    action: 'Filter AST Slice',
  },
  {
    step: '02',
    title: 'Dual-Model Routing Split',
    desc: 'Frontier models (Claude 3.7 / Opus) define schemas and system invariants; sub-second models (Haiku / Flash) write boilerplate.',
    color: '#c084fc',
    tag: 'Tiered Intelligence',
    action: 'Route Models',
  },
  {
    step: '03',
    title: 'Autonomous Red-Teaming',
    desc: 'An adversarial LLM agent actively attacks my PR with type coercion, malformed payloads, and edge cases before human review.',
    color: '#f59e0b',
    tag: 'Adversarial Fuzzing',
    action: 'Run Red Team',
  },
  {
    step: '04',
    title: 'Self-Healing Test Cycles',
    desc: 'Automated test generation runs in feedback loops, mutating Jest and PyTest fixtures until 95%+ coverage is verified.',
    color: '#2dd4bf',
    tag: 'Self-Healing Evals',
    action: 'Heal Test Loop',
  },
  {
    step: '05',
    title: 'Human Architectural Control',
    desc: 'AI acts as a tireless junior team proposing 3 options; I own the architecture, regulatory trade-offs, and final merge decisions.',
    color: '#00f0ff',
    tag: 'Architectural Ownership',
    action: 'Human Sign-off',
  },
];

/* ── STEP-SPECIFIC 3D INTERACTIVE VISUALIZATIONS ── */
function StepAnimationView({ tab, stepIndex }: { tab: 'how-i-think' | 'daily-ai'; stepIndex: number }) {
  if (tab === 'how-i-think') {
    switch (stepIndex) {
      case 0:
        // Beat 1: Assume it will fail - Unpredictable chaotic request
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#080f24] via-[#0b1430] to-[#040816] rounded-2xl border border-indigo-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(99,102,241,0.2)]">
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8] animate-ping" />
              <span className="text-xs font-mono text-indigo-300 font-bold uppercase tracking-wider">
                Beat 01 // Unpredictable Request Enters
              </span>
            </div>

            {/* Chaotic drifting 3D wave */}
            <svg className="w-full h-32 overflow-visible" viewBox="0 0 400 100">
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
              {/* Wobbling Main Dot */}
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
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </svg>

            <div className="text-center text-xs font-mono text-indigo-200 mt-2">
              <span className="text-[#818cf8] font-bold">Chaos Mode:</span> Stochastic generation with high entropy · Zero guardrails yet
            </div>
          </div>
        );

      case 1:
        // Beat 2: Wrap it in checks - Amber Glass Guardrail
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1a1104] via-[#241706] to-[#0a0702] rounded-2xl border border-amber-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(245,158,11,0.2)]">
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-ping" />
              <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                Beat 02 // Amber Guardrail Intercept
              </span>
            </div>

            <div className="flex items-center justify-center gap-10 my-auto w-full max-w-md">
              {/* Bad request bounces */}
              <motion.div
                animate={{ x: [-20, 10, -20], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <div className="w-6 h-6 rounded-full bg-rose-500/80 border border-rose-400 flex items-center justify-center text-white text-[11px] font-bold shadow-[0_0_12px_rgba(244,63,94,0.7)]">
                  ✕
                </div>
                <span className="text-[10px] font-mono text-rose-300 mt-1 font-semibold">Bad Schema</span>
              </motion.div>

              {/* 3D Glass Amber Gate */}
              <div className="relative w-12 h-28 rounded-xl bg-gradient-to-b from-amber-400/40 via-amber-500/20 to-amber-600/40 border-2 border-amber-400/90 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                <div className="w-1.5 h-16 bg-amber-300/80 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]" />
                <span className="text-[9px] font-mono text-amber-200 mt-1 rotate-90 uppercase tracking-widest font-bold">
                  AST GATE
                </span>
              </div>

              {/* Clean request allowed */}
              <motion.div
                animate={{ x: [0, 25, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <div className="w-6 h-6 rounded-full bg-teal-400/80 border border-teal-300 flex items-center justify-center text-slate-950 text-[11px] font-bold shadow-[0_0_12px_rgba(45,212,191,0.7)]">
                  ✓
                </div>
                <span className="text-[10px] font-mono text-teal-300 mt-1 font-semibold">Sanitized</span>
              </motion.div>
            </div>

            <div className="text-center text-xs font-mono text-amber-200 mt-2">
              <span className="text-[#f59e0b] font-bold">AST Defense:</span> Strict Pydantic / TypeScript contracts bounce malformed JSON
            </div>
          </div>
        );

      case 2:
        // Beat 3: Test against real cases - Golden Evals Matrix
        return (
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
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-2.5 rounded-xl bg-white/[0.06] border border-cyan-400/30 flex flex-col items-center text-center shadow-lg"
                >
                  <span className="text-[10px] font-mono text-slate-300 font-medium">{c.name}</span>
                  <span className="text-xs font-mono text-cyan-300 font-bold mt-1">{c.status}</span>
                  <span className="text-[9px] font-mono text-teal-400 mt-0.5">{c.ms}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-cyan-200 mt-2">
              <span className="text-[#38bdf8] font-bold">100+ Reality Evals:</span> Tested against enterprise edge cases before merge
            </div>
          </div>
        );

      case 3:
        // Beat 4: Ship without drama - Steady Teal Rail
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#041a16] via-[#07241e] to-[#020d0b] rounded-2xl border border-teal-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(45,212,191,0.2)]">
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] animate-ping" />
              <span className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider">
                Beat 04 // Ship Calmly & Deterministically
              </span>
            </div>

            <div className="relative w-full max-w-md h-12 flex items-center justify-between my-auto px-4">
              {/* Rail Line */}
              <div className="absolute left-4 right-4 h-1.5 bg-teal-500/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_0_12px_#2dd4bf]"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Gliding Dot */}
              <motion.div
                animate={{ x: [0, 280, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-7 h-7 rounded-full bg-[#2dd4bf] border-2 border-white flex items-center justify-center text-slate-950 font-bold text-xs shadow-[0_0_20px_#2dd4bf]"
              >
                ✓
              </motion.div>
              
              <div className="relative z-10 text-[11px] font-mono text-teal-200 bg-slate-950/80 px-2 py-1 rounded border border-teal-500/40 font-bold">
                0 State Desyncs
              </div>
            </div>

            <div className="text-center text-xs font-mono text-teal-200 mt-2">
              <span className="text-[#2dd4bf] font-bold">Deterministic Velocity:</span> High reliability · Zero production regressions
            </div>
          </div>
        );

      case 4:
        // Beat 5: Build with the team - Human in the loop network
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#061824] via-[#092233] to-[#030c12] rounded-2xl border border-cyan-400/40 overflow-hidden shadow-[inset_0_0_30px_rgba(0,240,255,0.2)]">
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                Beat 05 // Build With The People Who Use It
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-8 my-auto">
              {[
                { label: 'Haripriya (Lead)', icon: '👩‍💻', role: 'Architect' },
                { label: 'Eng Leaders', icon: '⚡', role: 'Feedback' },
                { label: 'Domain Users', icon: '🤝', role: 'Validation' },
              ].map((node, i) => (
                <motion.div
                  key={node.label}
                  animate={{ y: [0, -6, 0] }}
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
        );

      default:
        return null;
    }
  }

  // TAB 2: DAILY AI WORKFLOW
  switch (stepIndex) {
    case 0:
      // Daily Step 1: Context Sandboxing & MCP
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#080f24] via-[#0b1430] to-[#040816] rounded-2xl border border-indigo-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(99,102,241,0.2)]">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8] animate-ping" />
            <span className="text-xs font-mono text-indigo-300 font-bold uppercase tracking-wider">
              Daily AI 01 // MCP AST Slicing (Context Shield)
            </span>
          </div>

          <div className="flex items-center justify-center gap-6 my-auto">
            <div className="text-center p-3 rounded-xl bg-white/[0.05] border border-white/10">
              <div className="text-xs font-mono text-rose-400 font-bold">Raw Monorepo</div>
              <div className="text-lg font-mono text-slate-300 font-bold line-through">200 MB</div>
              <div className="text-[10px] text-slate-400">Causes context amnesia</div>
            </div>

            <motion.div
              animate={{ x: [-4, 4, -4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-indigo-400 font-mono text-sm font-bold"
            >
              AST Filter →
            </motion.div>

            <div className="text-center p-3 rounded-xl bg-indigo-950/80 border-2 border-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.4)]">
              <div className="text-xs font-mono text-indigo-300 font-bold">MCP Token Slice</div>
              <div className="text-xl font-mono text-[#818cf8] font-bold">4 KB</div>
              <div className="text-[10px] text-teal-300">Exact function bounds</div>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-indigo-200 mt-2">
            <span className="text-[#818cf8] font-bold">96% Token Cut:</span> AST tree-sitter passes only what the model needs to see
          </div>
        </div>
      );

    case 1:
      // Daily Step 2: Dual-Model Routing Split
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#180a24] via-[#220d33] to-[#0c0412] rounded-2xl border border-purple-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(192,132,252,0.2)]">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c084fc] animate-ping" />
            <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
              Daily AI 02 // Tiered Routing Engine
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 my-auto w-full max-w-md">
            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-400/50 text-center shadow-lg">
              <span className="text-[10px] font-mono text-purple-300 font-bold uppercase">Frontier Reasoning</span>
              <div className="text-sm font-bold text-white mt-1">Claude 3.7 / Opus</div>
              <div className="text-[10px] font-mono text-purple-200 mt-1">Invariants · Schemas · Security</div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-400/50 text-center shadow-lg">
              <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">Sub-Second Execution</span>
              <div className="text-sm font-bold text-white mt-1">Haiku / Gemini Flash</div>
              <div className="text-[10px] font-mono text-cyan-200 mt-1">Boilerplate · Regex · CSS</div>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-purple-200 mt-2">
            <span className="text-[#c084fc] font-bold">Cost-Optimal Routing:</span> Never burn 200k frontier tokens on trivial code tasks
          </div>
        </div>
      );

    case 2:
      // Daily Step 3: Autonomous Red-Teaming
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1a1104] via-[#241706] to-[#0a0702] rounded-2xl border border-amber-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(245,158,11,0.2)]">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-ping" />
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
              Daily AI 03 // Autonomous Red-Team Agent
            </span>
          </div>

          <div className="flex items-center justify-between w-full max-w-md px-4 my-auto">
            <div className="text-center">
              <span className="text-2xl">🤖</span>
              <div className="text-xs font-mono text-amber-300 mt-1 font-bold">Red-Team LLM</div>
              <div className="text-[10px] text-rose-400">Injects edge cases</div>
            </div>

            <motion.div
              animate={{ x: [-8, 8, -8] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-amber-400 font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
            >
              Fuzzing Schema ⚡
            </motion.div>

            <div className="text-center">
              <span className="text-2xl">🛡️</span>
              <div className="text-xs font-mono text-emerald-400 mt-1 font-bold">Pydantic / TS</div>
              <div className="text-[10px] text-emerald-300">Catches 100% bugs</div>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-amber-200 mt-2">
            <span className="text-[#f59e0b] font-bold">Adversarial Testing:</span> AI aggressively stress-tests code before human PR review
          </div>
        </div>
      );

    case 3:
      // Daily Step 4: Self-Healing Test Cycles
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#041a14] via-[#08261e] to-[#020d0a] rounded-2xl border border-teal-500/40 overflow-hidden shadow-[inset_0_0_30px_rgba(45,212,191,0.2)]">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] animate-ping" />
            <span className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider">
              Daily AI 04 // Self-Healing Test Loops
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 my-auto">
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-slate-300">
              Run Test Suite →
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              className="w-11 h-11 rounded-full border-2 border-dashed border-teal-400 flex items-center justify-center text-teal-300 text-sm font-bold shadow-[0_0_15px_#2dd4bf]"
            >
              ↻
            </motion.div>
            <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-400 text-xs font-mono text-teal-300 font-bold shadow-lg">
              95%+ Coverage Reached
            </div>
          </div>

          <div className="text-center text-xs font-mono text-teal-200 mt-2">
            <span className="text-[#2dd4bf] font-bold">Automated Reliability:</span> Tests self-mutate fixtures until all edge cases pass
          </div>
        </div>
      );

    case 4:
      // Daily Step 5: Human Architectural Control
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#061824] via-[#092233] to-[#030c12] rounded-2xl border border-cyan-400/40 overflow-hidden shadow-[inset_0_0_30px_rgba(0,240,255,0.2)]">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
              Daily AI 05 // Human Architectural Sign-Off
            </span>
          </div>

          <div className="flex items-center justify-between w-full max-w-md px-2 my-auto">
            <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
              3 AI Architectures
            </div>
            <span className="text-cyan-400 font-bold text-lg">→</span>
            <div className="p-3 rounded-xl bg-cyan-950/90 border-2 border-[#00f0ff] text-xs font-mono text-cyan-200 font-bold shadow-[0_0_20px_rgba(0,240,255,0.5)] text-center">
              <div>Haripriya Review</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Approved &amp; Merged</div>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-cyan-200 mt-2">
            <span className="text-[#00f0ff] font-bold">3x Engineering Leverage:</span> Speed of AI execution combined with human judgment
          </div>
        </div>
      );

    default:
      return null;
  }
}

/* ── MAIN COMPONENT WITH PARALLAX SCROLLING & 3D MOTIONS ── */
export default function HowIThinkExperience({
  onNavActivate,
}: {
  onNavActivate?: (active: boolean) => void;
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<'how-i-think' | 'daily-ai'>('how-i-think');
  const [selectedStep, setSelectedStep] = useState(0);

  // Mouse 3D Tilt State
  const [mouseTilt, setMouseTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({
      rotateX: -y * 8, // subtle 3D tilt
      rotateY: x * 8,
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
  const stageParallaxY = useTransform(smoothProgress, [0, 1], [25, -25]);

  const beats = activeTab === 'how-i-think' ? HOW_I_THINK_BEATS : DAILY_AI_BEATS;

  // Reset to first step when tab toggles
  useEffect(() => {
    setSelectedStep(0);
  }, [activeTab]);

  return (
    <section
      ref={containerRef}
      id="how-i-think"
      className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-12 scroll-mt-20 overflow-hidden"
    >
      {/* ── HIGH-CONTRAST DARK OBSIDIAN STUDIO CARD (NEVER COVERED BY BG) ── */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1200,
        }}
        className="max-w-5xl mx-auto"
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

          {/* ── TOP HEADER & INTERACTIVE TAB SWITCHER ── */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-white/10 pb-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 border border-cyan-500/40 px-3.5 py-1 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <span className="h-2 w-2 rounded-full bg-[#00f0ff] animate-ping" />
                <span className="font-mono text-xs font-bold tracking-wider text-cyan-300 uppercase">
                  WHY ENGINEERING LEADERS HIRE ME
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
                {activeTab === 'how-i-think' ? (
                  <>
                    I like building things people can{' '}
                    <span className="text-[#2dd4bf] drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]">
                      actually rely on.
                    </span>
                  </>
                ) : (
                  <>
                    AI is my tireless junior team.{' '}
                    <span className="text-[#2dd4bf] drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]">
                      I own the architecture.
                    </span>
                  </>
                )}
              </h2>
            </div>

            {/* Interactive Dual-Tab Switcher */}
            <div className="inline-flex items-center p-1 rounded-full bg-slate-900 border border-cyan-500/30 self-start sm:self-auto shrink-0 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('how-i-think')}
                className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeTab === 'how-i-think' ? 'text-white' : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                {activeTab === 'how-i-think' && (
                  <motion.div
                    layoutId="activeDarkPillTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>✦</span>
                  <span>How I Think</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('daily-ai')}
                className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeTab === 'daily-ai' ? 'text-white' : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                {activeTab === 'daily-ai' && (
                  <motion.div
                    layoutId="activeDarkPillTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-[#00f0ff]">⚡</span>
                  <span>How I Use AI Daily</span>
                </span>
              </button>
            </div>
          </div>

          {/* ── 5-STEP INTERACTIVE PROCESS PILLS (CLICK TO SWITCH ANIMATION) ── */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-7">
            {beats.map((beat, idx) => {
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

          {/* ── DEDICATED 3D PARALLAX STEP ANIMATION STAGE ── */}
          <motion.div style={{ y: stageParallaxY }} className="relative z-10 h-60 sm:h-72 w-full mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${selectedStep}`}
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full"
              >
                <StepAnimationView tab={activeTab} stepIndex={selectedStep} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── HIGH-CONTRAST EDITORIAL NARRATIVE (100% VISIBLE PURE SLATE-100 & WHITE) ── */}
          <div className="relative z-10 border-t border-white/10 pt-6">
            <AnimatePresence mode="wait">
              {activeTab === 'how-i-think' ? (
                <motion.div
                  key="narrative-how-i-think"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
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
                </motion.div>
              ) : (
                <motion.div
                  key="narrative-daily-ai"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal">
                    On a daily basis, I don&rsquo;t treat AI as an autocomplete toy or an unchecked oracle. I use it as an{' '}
                    <span className="text-[#2dd4bf] font-bold">
                      adversarial junior team
                    </span>
                    . I use frontier models for invariant design and AST schema contracts, lightweight models for repetitive plumbing, and an{' '}
                    <strong className="font-bold text-white border-b-2 border-amber-400/80 pb-0.5">
                      adversarial red-team agent
                    </strong>{' '}
                    to stress-test code before human review. This unlocks{' '}
                    <span className="text-[#2dd4bf] font-bold underline decoration-[#2dd4bf]/40 underline-offset-4">
                      3x engineering leverage
                    </span>{' '}
                    while preserving complete architectural ownership.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
