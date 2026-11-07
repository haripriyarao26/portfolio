'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── TAB 1: 5 BEATS SPECIFICATION ("HOW I THINK") ── */
const HOW_I_THINK_BEATS = [
  {
    step: '01',
    title: 'Assume it will fail',
    desc: 'The request enters wobbly and unpredictable. We map failure modes before writing happy paths.',
    color: '#818cf8', // Periwinkle
    tag: 'Unpredictable AI Input',
    action: 'Simulate Chaos',
  },
  {
    step: '02',
    title: 'Wrap it in checks',
    desc: 'An amber glass guardrail intercepts the input. Malformed schemas bounce off with strict schema gates.',
    color: '#f59e0b', // Warm Amber
    tag: 'Deterministic Guardrails',
    action: 'Deploy Amber Gate',
  },
  {
    step: '03',
    title: 'Test against real cases',
    desc: 'Passes 100+ messy golden-dataset edge cases, null fields, and adversarial inputs in CI/CD.',
    color: '#3b82f6', // Cobalt
    tag: 'Reality Evals',
    action: 'Run Gauntlet',
  },
  {
    step: '04',
    title: 'Ship without drama',
    desc: 'The payload turns teal, verified and deterministic. Deploys with zero state desyncs.',
    color: '#14b8a6', // Teal
    tag: 'Verified Production',
    action: 'Verify & Ship',
  },
  {
    step: '05',
    title: 'Build it with the people who use it',
    desc: 'Human nodes connect directly into the system loop. Real user trust gets built together, not just coded.',
    color: '#0d9488', // Deep Teal
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
    color: '#5b7cf0', // Cobalt
    tag: 'MCP & AST Slicing',
    action: 'Filter AST Slice',
  },
  {
    step: '02',
    title: 'Dual-Model Routing Split',
    desc: 'Frontier models (Claude 3.7 / Opus) define schemas and system invariants; sub-second models (Haiku / Flash) write boilerplate.',
    color: '#a855f7', // Purple
    tag: 'Tiered Intelligence',
    action: 'Route Models',
  },
  {
    step: '03',
    title: 'Autonomous Red-Teaming',
    desc: 'An adversarial LLM agent actively attacks my PR with type coercion, malformed payloads, and edge cases before human review.',
    color: '#f59e0b', // Warm Amber
    tag: 'Adversarial Fuzzing',
    action: 'Run Red Team',
  },
  {
    step: '04',
    title: 'Self-Healing Test Cycles',
    desc: 'Automated test generation runs in feedback loops, mutating Jest and PyTest fixtures until 95%+ coverage is verified.',
    color: '#10b981', // Emerald
    tag: 'Self-Healing Evals',
    action: 'Heal Test Loop',
  },
  {
    step: '05',
    title: 'Human Architectural Control',
    desc: 'AI acts as a tireless junior team proposing 3 options; I own the architecture, regulatory trade-offs, and final merge decisions.',
    color: '#00f0ff', // Cyan
    tag: 'Architectural Ownership',
    action: 'Human Sign-off',
  },
];

/* ── STEP-SPECIFIC DYNAMIC ANIMATION VIEW ── */
function StepAnimationView({ tab, stepIndex }: { tab: 'how-i-think' | 'daily-ai'; stepIndex: number }) {
  if (tab === 'how-i-think') {
    switch (stepIndex) {
      case 0:
        // Beat 1: Assume it will fail - Unpredictable chaotic request
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#070b1a] to-[#0f172a] rounded-2xl border border-indigo-500/30 overflow-hidden shadow-inner">
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#818cf8] animate-ping" />
              <span className="text-xs font-mono text-indigo-300 font-semibold uppercase">
                Beat 01 // Unpredictable Request Enters
              </span>
            </div>
            
            {/* Chaotic drifting particle wave */}
            <svg className="w-full h-32 overflow-visible" viewBox="0 0 400 100">
              <path
                d="M 20 50 Q 80 15, 140 85 T 260 20 T 380 50"
                fill="none"
                stroke="#818cf8"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="opacity-40 animate-pulse"
              />
              {/* Wobbling Main Dot */}
              <motion.circle
                r="9"
                fill="#818cf8"
                animate={{
                  cx: [30, 110, 210, 310, 370, 30],
                  cy: [50, 20, 80, 25, 50, 50],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Drifting Ghost Duplicates */}
              {[-15, 15, -25].map((off, i) => (
                <motion.circle
                  key={i}
                  r="4"
                  fill="#c7d2fe"
                  opacity={0.5}
                  animate={{
                    cx: [30, 110, 210, 310, 370, 30],
                    cy: [50 + off, 20 + off, 80 + off, 25 + off, 50 + off, 50 + off],
                  }}
                  transition={{ duration: 4, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </svg>

            <div className="mt-2 text-center text-xs font-mono text-indigo-200">
              <span className="text-[#818cf8] font-bold">Chaos Mode:</span> Floating unconstrained · Raw prompt output contains 18 potential hallucinations
            </div>
          </div>
        );

      case 1:
        // Beat 2: Wrap it in checks - Amber glass firewall gate bounces bad schemas
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#130f05] to-[#1c1407] rounded-2xl border border-amber-500/40 overflow-hidden shadow-inner">
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
              <span className="text-xs font-mono text-amber-300 font-semibold uppercase">
                Beat 02 // Amber Guardrail Intercept
              </span>
            </div>

            <div className="flex items-center justify-between w-full max-w-md px-4 my-auto">
              {/* Input payloads arriving */}
              <div className="flex flex-col gap-2">
                <span className="px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/50 text-[11px] font-mono text-rose-300">
                  ✗ Malformed JSON
                </span>
                <span className="px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/50 text-[11px] font-mono text-rose-300">
                  ✗ Dropped Closing Brace
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/50 text-[11px] font-mono text-emerald-300 font-bold">
                  ✓ Valid AST Schema
                </span>
              </div>

              {/* Central Amber Glass Gate */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-28 rounded-xl bg-gradient-to-b from-amber-400/30 to-amber-600/30 border-2 border-amber-400 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_24px_rgba(245,158,11,0.4)]"
              >
                <span className="text-lg">🛡️</span>
                <span className="text-[9px] font-mono text-amber-200 font-bold mt-1 text-center leading-tight">
                  AST GATE
                </span>
              </motion.div>

              {/* Output filtered cleanly */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-400 text-xs font-mono text-emerald-300 font-bold shadow-md"
                >
                  0 Schema Breaks
                </motion.div>
                <span className="text-[10px] font-mono text-amber-400 mt-1">Malformed bounced</span>
              </div>
            </div>

            <div className="text-center text-xs font-mono text-amber-200">
              <span className="text-[#f59e0b] font-bold">Deterministic Salvage:</span> 100% of invalid JSON structures repaired before entering database
            </div>
          </div>
        );

      case 2:
        // Beat 3: Test against real cases - Gauntlet of 4 real-world test cases
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#061026] to-[#0b1d3a] rounded-2xl border border-blue-500/30 overflow-hidden shadow-inner">
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-ping" />
              <span className="text-xs font-mono text-blue-300 font-semibold uppercase">
                Beat 03 // 100+ Reality Evals
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg my-auto">
              {[
                { name: 'Null Values', status: 'PASS', score: '100%' },
                { name: 'Rate Spikes (429)', status: 'PASS', score: '30s Backoff' },
                { name: 'AST Recursion', status: 'PASS', score: '0 Cycles' },
                { name: 'Redis Mutex', status: 'PASS', score: '0 Races' },
              ].map((ev, i) => (
                <motion.div
                  key={ev.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 rounded-xl bg-white/[0.06] border border-blue-400/20 text-center"
                >
                  <div className="text-[11px] font-mono text-slate-300 truncate">{ev.name}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1">
                    <span>✓</span>
                    <span>{ev.status}</span>
                  </div>
                  <div className="text-[10px] font-mono text-blue-300 mt-0.5">{ev.score}</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-blue-200">
              <span className="text-[#3b82f6] font-bold">Golden Evals:</span> Verified against 100+ annotated ground-truth enterprise contracts
            </div>
          </div>
        );

      case 3:
        // Beat 4: Ship without drama - Teal dot glides steady and calm
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#04161a] to-[#072428] rounded-2xl border border-teal-500/40 overflow-hidden shadow-inner">
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-ping" />
              <span className="text-xs font-mono text-teal-300 font-semibold uppercase">
                Beat 04 // Ship Calmly & Deterministically
              </span>
            </div>

            <div className="relative w-full max-w-md h-20 flex items-center justify-center my-auto">
              {/* Perfectly Straight Railway Track */}
              <div className="w-full h-1 bg-gradient-to-r from-teal-800 via-teal-400 to-emerald-400 rounded-full" />
              
              {/* Steady Calm Teal Dot */}
              <motion.div
                animate={{ x: [-140, 140] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                className="absolute w-7 h-7 rounded-full bg-[#14b8a6] border-2 border-white shadow-[0_0_20px_#14b8a6] flex items-center justify-center text-[10px] font-bold text-white"
              >
                ✓
              </motion.div>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono text-teal-200">
              <span>SLA: <strong className="text-white">&lt;15ms</strong></span>
              <span>State Desyncs: <strong className="text-white">0</strong></span>
              <span>Production Regressions: <strong className="text-white">0</strong></span>
            </div>
          </div>
        );

      case 4:
        // Beat 5: Build with the people who use it - Human collaboration nodes
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#051c1c] to-[#0b2b2b] rounded-2xl border border-teal-600/40 overflow-hidden shadow-inner">
            <div className="absolute top-3 left-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-ping" />
              <span className="text-xs font-mono text-teal-300 font-semibold uppercase">
                Beat 05 // Human-in-the-Loop Collaboration
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6 my-auto">
              {[
                { role: 'Product Lead', icon: '👤', tag: 'Feedback' },
                { role: 'City Partner', icon: '🏛️', tag: 'Civic Policy' },
                { role: 'Haripriya', icon: '⚡', tag: 'AI Architecture', isMe: true },
                { role: 'End User', icon: '👥', tag: 'Real Workflow' },
              ].map((member, i) => (
                <div key={member.role} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-md border ${
                      member.isMe
                        ? 'bg-[#00f0ff] border-white text-[#0b1d3a] font-bold'
                        : 'bg-white/10 border-white/20 text-white'
                    }`}
                  >
                    {member.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-white mt-1.5 text-center">
                    {member.role}
                  </span>
                  <span className="text-[10px] font-mono text-teal-300">{member.tag}</span>
                </div>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-teal-200">
              <span className="text-[#2fe0d0] font-bold">Collaborative Trust:</span> Software is engineered with the stakeholders who live with the results
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  // TAB 2: "HOW I USE AI DAILY" ANIMATIONS
  switch (stepIndex) {
    case 0:
      // Daily Step 1: Context Sandboxing & MCP
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#070e24] to-[#0d1838] rounded-2xl border border-blue-500/30 overflow-hidden shadow-inner">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5b7cf0] animate-ping" />
            <span className="text-xs font-mono text-blue-300 font-semibold uppercase">
              Daily AI 01 // MCP &amp; Context Slicing
            </span>
          </div>

          <div className="flex items-center justify-between w-full max-w-md px-2 my-auto">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-400">
              <div>Entire Repo (200MB)</div>
              <div className="text-rose-400 mt-1 line-through">95% Inert UI Files</div>
            </div>

            <div className="text-blue-400 text-xl font-bold font-mono">→ [MCP Parser] →</div>

            <div className="p-3 rounded-xl bg-blue-950 border border-blue-400 text-xs font-mono text-blue-200 font-bold shadow-md">
              <div>Target AST Slice</div>
              <div className="text-emerald-400 mt-1">4KB Clean Payload</div>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-blue-200">
            <span className="text-[#5b7cf0] font-bold">Precision Ingestion:</span> Zero token bloat · Only relevant type signatures sent to model
          </div>
        </div>
      );

    case 1:
      // Daily Step 2: Dual-Model Routing Split
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#160a26] to-[#200e38] rounded-2xl border border-purple-500/40 overflow-hidden shadow-inner">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-ping" />
            <span className="text-xs font-mono text-purple-300 font-semibold uppercase">
              Daily AI 02 // Tiered Routing Split
            </span>
          </div>

          <div className="flex items-center justify-between w-full max-w-md gap-4 my-auto">
            <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-400/50 flex-1 text-center">
              <div className="text-xs font-bold text-white">Opus / Claude 3.7</div>
              <div className="text-[10px] font-mono text-purple-300 mt-1">High Cognition</div>
              <div className="text-[10px] text-slate-300 mt-1">System Invariants &amp; Schemas</div>
            </div>

            <span className="text-lg font-bold text-purple-400">+</span>

            <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-400/50 flex-1 text-center">
              <div className="text-xs font-bold text-white">Haiku / Flash</div>
              <div className="text-[10px] font-mono text-indigo-300 mt-1">&lt;15ms Latency</div>
              <div className="text-[10px] text-slate-300 mt-1">Localized Syntax &amp; Boilerplate</div>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-purple-200">
            <span className="text-[#a855f7] font-bold">Right Model for Right Task:</span> Cuts 96% of frontier token waste
          </div>
        </div>
      );

    case 2:
      // Daily Step 3: Autonomous Red-Teaming
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1c1106] to-[#261608] rounded-2xl border border-amber-500/40 overflow-hidden shadow-inner">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
            <span className="text-xs font-mono text-amber-300 font-semibold uppercase">
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
              className="text-amber-400 font-mono text-xs font-bold px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30"
            >
              Fuzzing Schema ⚡
            </motion.div>

            <div className="text-center">
              <span className="text-2xl">🛡️</span>
              <div className="text-xs font-mono text-emerald-400 mt-1 font-bold">Pydantic / TS</div>
              <div className="text-[10px] text-emerald-300">Catches 100% bugs</div>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-amber-200">
            <span className="text-[#f59e0b] font-bold">Adversarial Testing:</span> AI aggressively stress-tests code before any human PR review
          </div>
        </div>
      );

    case 3:
      // Daily Step 4: Self-Healing Test Cycles
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#061c14] to-[#0c291e] rounded-2xl border border-emerald-500/40 overflow-hidden shadow-inner">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span className="text-xs font-mono text-emerald-300 font-semibold uppercase">
              Daily AI 04 // Self-Healing Test Loops
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 my-auto">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
              Run Test Suite →
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center text-emerald-300 text-sm font-bold"
            >
              ↻
            </motion.div>
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-400 text-xs font-mono text-emerald-300 font-bold shadow-md">
              95%+ Coverage Reached
            </div>
          </div>

          <div className="text-center text-xs font-mono text-emerald-200">
            <span className="text-[#10b981] font-bold">Automated Reliability:</span> Tests self-mutate fixtures until all edge cases pass
          </div>
        </div>
      );

    case 4:
      // Daily Step 5: Human Architectural Control
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#061c24] to-[#0a2733] rounded-2xl border border-cyan-500/40 overflow-hidden shadow-inner">
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="text-xs font-mono text-cyan-300 font-semibold uppercase">
              Daily AI 05 // Human Architectural Sign-Off
            </span>
          </div>

          <div className="flex items-center justify-between w-full max-w-md px-2 my-auto">
            <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
              3 AI Architectures
            </div>
            <span className="text-cyan-400 font-bold">→</span>
            <div className="p-3 rounded-xl bg-cyan-950 border-2 border-[#00f0ff] text-xs font-mono text-cyan-200 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)] text-center">
              <div>Haripriya Review</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Approved &amp; Merged</div>
            </div>
          </div>

          <div className="text-center text-xs font-mono text-cyan-200">
            <span className="text-[#00f0ff] font-bold">3x Engineering Leverage:</span> Speed of AI execution combined with human judgment
          </div>
        </div>
      );

    default:
      return null;
  }
}

/* ── MAIN COMPONENT ── */
export default function HowIThinkExperience({
  onNavActivate,
}: {
  onNavActivate?: (active: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<'how-i-think' | 'daily-ai'>('how-i-think');
  const [selectedStep, setSelectedStep] = useState(0);

  const beats = activeTab === 'how-i-think' ? HOW_I_THINK_BEATS : DAILY_AI_BEATS;

  // Reset to first step when tab toggles
  useEffect(() => {
    setSelectedStep(0);
  }, [activeTab]);

  return (
    <section id="how-i-think" className="relative py-16 sm:py-24 px-6 sm:px-10 lg:px-14">
      {/* High-Contrast Frosted Glass Studio Card */}
      <div className="spatial-glass max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 border border-slate-200/90 bg-white/96 backdrop-blur-2xl shadow-2xl">
        
        {/* Top Header & Interactive Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
              <span className="font-sans text-xs font-semibold tracking-wider text-[#0b1d3a] uppercase">
                Why Engineering Leaders Hire Me
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold text-[#0b1d3a] tracking-tight">
              {activeTab === 'how-i-think' ? (
                <>
                  I like building things people can{' '}
                  <span className="text-[#0d9488]">actually rely on.</span>
                </>
              ) : (
                <>
                  AI is my tireless junior team.{' '}
                  <span className="text-[#0d9488]">I own the architecture.</span>
                </>
              )}
            </h2>
          </div>

          {/* Interactive Dual-Tab Switcher */}
          <div className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 self-start sm:self-auto shrink-0 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('how-i-think')}
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'how-i-think' ? 'text-white shadow-sm' : 'text-[#0b1d3a] hover:text-[#5b7cf0]'
              }`}
            >
              {activeTab === 'how-i-think' && (
                <motion.div
                  layoutId="activePillTab"
                  className="absolute inset-0 rounded-full bg-[#0b1d3a]"
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
              className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'daily-ai' ? 'text-white shadow-sm' : 'text-[#0b1d3a] hover:text-[#5b7cf0]'
              }`}
            >
              {activeTab === 'daily-ai' && (
                <motion.div
                  layoutId="activePillTab"
                  className="absolute inset-0 rounded-full bg-[#0b1d3a]"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="text-[#2fe0d0]">⚡</span>
                <span>How I Use AI Daily</span>
              </span>
            </button>
          </div>
        </div>

        {/* 5-Step Interactive Process Pills (Click to switch animation) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
          {beats.map((beat, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <button
                key={beat.step}
                type="button"
                onClick={() => setSelectedStep(idx)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md scale-[1.02]'
                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Step {beat.step}
                  </span>
                </div>
                <div
                  className={`text-xs font-semibold leading-tight line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-[#0b1d3a]'
                  }`}
                >
                  {beat.title}
                </div>
                <div
                  className={`text-[10px] font-mono mt-1 ${
                    isSelected ? 'text-teal-300' : 'text-slate-500'
                  }`}
                >
                  {beat.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dedicated Dynamic Step Animation Canvas */}
        <div className="h-56 sm:h-64 w-full mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${selectedStep}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full"
            >
              <StepAnimationView tab={activeTab} stepIndex={selectedStep} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* High-Contrast Editorial Narrative (Immediately Crisp Navy #0b1d3a) */}
        <div className="border-t border-slate-200 pt-6">
          <AnimatePresence mode="wait">
            {activeTab === 'how-i-think' ? (
              <motion.div
                key="narrative-how-i-think"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-base sm:text-lg text-[#0b1d3a] leading-relaxed font-normal">
                  I like building things people can{' '}
                  <span className="text-[#0d9488] font-semibold underline decoration-[#0d9488]/40 underline-offset-4">
                    actually rely on
                  </span>
                  . Anyone can make a model look impressive in a demo.
                  The harder and more interesting work starts when it meets real users, messy data and real consequences.
                  So I begin with how a system might fail, build the{' '}
                  <strong className="font-semibold text-[#0b1d3a]">checks and fallbacks first</strong>, and only then make the clever part clever.
                  And I work closely with the people who’ll use it, because{' '}
                  <span className="text-[#0d9488] font-semibold">
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
                <p className="text-base sm:text-lg text-[#0b1d3a] leading-relaxed font-normal">
                  On a daily basis, I don&rsquo;t treat AI as an autocomplete toy or an unchecked oracle. I use it as an{' '}
                  <span className="text-[#0d9488] font-semibold">
                    adversarial junior team
                  </span>
                  . I use frontier models for invariant design and AST schema contracts, lightweight models for repetitive plumbing, and an{' '}
                  <strong className="font-semibold text-[#0b1d3a]">adversarial red-team agent</strong>{' '}
                  to stress-test code before human review. This unlocks{' '}
                  <span className="text-[#0d9488] font-semibold underline decoration-[#0d9488]/40 underline-offset-4">
                    3x engineering leverage
                  </span>{' '}
                  while preserving complete architectural ownership.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
