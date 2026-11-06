'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DecryptedMetric, TiltCard3D } from '@/components/ReactBits3D';
import { OneteraCompressionLottie, OneteraParallelEngineLottie } from '@/components/LottieVectorVisuals';
import { HaldenButton, HaldenFadeUp, HaldenLetterReveal } from '@/components/HaldenMotion';

export default function CaseStudiesSection() {
  const [openDrawer, setOpenDrawer] = useState<'onetera-compression' | 'onetera-orchestration' | null>(null);

  return (
    <section id="case-studies" className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24">
      <div className="space-y-10">
        <HaldenFadeUp>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#0b1d3a]/10 px-4 py-1.5 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span className="mono-accent text-xs tracking-[0.16em] text-[#1d2f4f] uppercase font-semibold">
              PROVEN PRODUCTION IMPACT
            </span>
          </div>

          <HaldenLetterReveal
            as="h2"
            mode="scroll"
            spread={0.32}
            segments={[
              { text: 'Real business results', highlight: false },
              { text: 'at enterprise scale.', highlight: true },
            ]}
            className="font-display text-3xl sm:text-5xl font-normal text-[#0b1d3a] tracking-[-0.03em]"
          />

          <p className="mt-3 text-base text-[#3e4d68]">
            Two core architectures engineered at Onetera Technologies. Click either card to inspect technical specifications.
          </p>
        </HaldenFadeUp>

        <div className="grid gap-6 md:grid-cols-2">
          {/* ── CARD 01: ONETERA TOKEN COMPRESSION & AST SALVAGE ── */}
          <HaldenFadeUp delay={0.05}>
            <article id="study-onetera-compression" className="h-full">
              <TiltCard3D
                intensity={5}
                glareColor="rgba(143, 213, 241, 0.35)"
                className="spatial-glass rounded-3xl p-6 sm:p-8 h-full"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono-accent px-3 py-1 rounded-full bg-[#0b1d3a] text-[#FFFFFF] text-xs font-semibold">
                      ONETERA &middot; EFFICIENCY
                    </span>
                    <span className="mono-accent text-xs text-[#5b7cf0] font-semibold">
                      Founding AI Engineer
                    </span>
                  </div>

                  <OneteraCompressionLottie />

                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0b1d3a] mb-2">
                      Cut AI cloud costs by 96% across 255+ workflow steps
                    </h3>
                    <p className="text-sm text-[#3e4d68] leading-relaxed">
                      Filtered out 95% of inert payload data and flattened schema arrays from 200KB down to 8KB — slashing cloud bills 96% while preventing model hallucinations with deterministic AST salvage.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="96%" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Cost cut</div>
                    </div>
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="200KB" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">→ 8KB payload</div>
                    </div>
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="0" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Schema breaks</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0b1d3a]/8 flex items-center justify-between">
                  <span className="text-xs text-[#3e4d68]">NVIDIA &amp; city partners</span>
                  <HaldenButton onClick={() => setOpenDrawer('onetera-compression')}>
                    Tech Architecture
                  </HaldenButton>
                </div>
              </TiltCard3D>
            </article>
          </HaldenFadeUp>

          {/* ── CARD 02: ONETERA DISTRIBUTED ORCHESTRATION & TELEMETRY ── */}
          <HaldenFadeUp delay={0.14}>
            <article id="study-onetera-orchestration" className="h-full">
              <TiltCard3D
                intensity={5}
                glareColor="rgba(143, 213, 241, 0.35)"
                className="spatial-glass rounded-3xl p-6 sm:p-8 h-full"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono-accent px-3 py-1 rounded-full bg-[#0b1d3a] text-[#FFFFFF] text-xs font-semibold">
                      ONETERA &middot; PLATFORM
                    </span>
                    <span className="mono-accent text-xs text-[#5b7cf0] font-semibold">
                      Founding AI Engineer
                    </span>
                  </div>

                  <OneteraParallelEngineLottie />

                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0b1d3a] mb-2">
                      Cut turn latency 40% &amp; sustained 99.98% uptime
                    </h3>
                    <p className="text-sm text-[#3e4d68] leading-relaxed">
                      Replaced blocking sequential tool loops with a 22-node cyclic state machine, Redis distributed locks to prevent race conditions, and real-time ClickHouse telemetry across 6 roadmap phases.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="40%" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Latency drop</div>
                    </div>
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="99.98%" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">SLA uptime</div>
                    </div>
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="0" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Double-charges</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0b1d3a]/8 flex items-center justify-between">
                  <span className="text-xs text-[#3e4d68]">Civic &amp; enterprise scale</span>
                  <HaldenButton onClick={() => setOpenDrawer('onetera-orchestration')}>
                    Tech Architecture
                  </HaldenButton>
                </div>
              </TiltCard3D>
            </article>
          </HaldenFadeUp>
        </div>
      </div>

      {/* ── SLIDE-OVER DRAWER FOR TECHNICAL ARCHITECTS & ENGINEERS ── */}
      <AnimatePresence>
        {openDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-end bg-[#0b1d3a]/60 backdrop-blur-md"
            onClick={() => setOpenDrawer(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 0.7, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative h-full w-full max-w-2xl overflow-y-auto bg-white p-6 sm:p-10 shadow-2xl text-[#0b1d3a] flex flex-col"
            >
              {/* Sticky Top Header with Clean Close Button */}
              <div className="sticky -top-6 sm:-top-10 -mx-6 sm:-mx-10 px-6 sm:px-10 py-5 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-start justify-between gap-4 z-10 mb-6">
                <div>
                  <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase tracking-wider">
                    Engineering Deep Dive &middot; Onetera Technologies
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0b1d3a] mt-1 leading-snug">
                    {openDrawer === 'onetera-compression'
                      ? 'Onetera: 96% Token Compression, TOON & AST Schema Salvage'
                      : 'Onetera: 22-Node Asynchronous LangGraph State Machine & Distributed Locks'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenDrawer(null)}
                  aria-label="Close drawer"
                  className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-[#0b1d3a] hover:bg-slate-100 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>

              {openDrawer === 'onetera-compression' ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-display text-base font-semibold text-[#0b1d3a]">
                      How the 3-Front Compression Pipeline Works
                    </h4>
                    <ul className="space-y-2.5 text-sm text-[#3e4d68]">
                      <li>
                        <strong className="text-[#0b1d3a]">1. Surgical Pre-Pass (Python):</strong> Isolates only the 10 to 20 steps with active conditional rules; 95% of inert UI steps are stripped before the LLM call.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">2. TOON Serialization:</strong> Flattens uniform JSON arrays into pipe-delimited header rows, removing 60% of repetitive JSON keys and brackets.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">3. O(1) Index Maps &amp; DFS Cycle Detection:</strong> Pre-computes bidirectional lookup maps and runs 3-color graph traversal to prevent recursive loops across 255+ steps.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="mono-accent text-xs text-rose-600 uppercase font-semibold">
                      Before: Verbose JSON (~200,000 bytes / turn)
                    </div>
                    <pre className="rounded-2xl border border-slate-200 bg-[#0b1d3a] p-4 font-mono text-xs text-slate-300 overflow-x-auto">{`[
  {
    "id": "step_001_applicant_residency",
    "section_title": "General Eligibility",
    "options": [{ "label": "Resident", "triggers": ["s04", "s05"] }],
    "ui_layout_tokens": { "grid": "col-12", "theme": "civic" }
  }
  // ... 254 more steps sent on every turn
]`}</pre>

                    <div className="mono-accent text-xs text-emerald-700 uppercase font-semibold pt-2">
                      After: TOON Compressed Table (~8,000 bytes / turn · -96%)
                    </div>
                    <pre className="rounded-2xl border border-emerald-500/40 bg-[#0b1d3a] p-4 font-mono text-xs text-[#2fe0d0] overflow-x-auto">{`# ID  | TYPE   | CONDITION_RULE             | ACTIVATE
s01   | SELECT | age >= 18                  | s04, s05
s02   | INCOME | annual_usd < 50000         | prog_grant

# Constrained Model Output:
[{ "step": "s01", "activate": ["s04", "s05"] }]`}</pre>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-display text-base font-semibold text-[#0b1d3a]">
                      How the 22-Node Asynchronous Orchestrator Works
                    </h4>
                    <ul className="space-y-2.5 text-sm text-[#3e4d68]">
                      <li>
                        <strong className="text-[#0b1d3a]">1. Async DAG Scheduling Over Linear Chains:</strong> Replaced blocking sequential tool loops with a 22-node cyclic LangGraph state machine. Independent tool and I/O branches resolve concurrently using <code>asyncio.gather</code>, cutting turn delays from 31.3s down to 18.8s (-40%).
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">2. Distributed Concurrency &amp; Race Condition Prevention:</strong> Implemented request-collapsing middleware and Redis distributed locks, eliminating 100% of duplicate task mutations and double-charge edge cases under spike loads.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">3. Real-Time Telemetry &amp; 99.98% SLA:</strong> Streamed sub-second execution traces into ClickHouse, giving instant visibility into bottleneck nodes and enabling 40% faster MTTR across 6 production roadmap phases.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-[#0b1d3a] p-5 font-mono text-xs text-slate-200 space-y-2">
                    <div className="text-[#2fe0d0] font-semibold"># Orchestrator Benchmark &amp; Telemetry Summary</div>
                    <div className="flex justify-between">
                      <span>Concurrent Async Gather Node Resolution</span>
                      <span className="text-[#2fe0d0]">40% FASTER</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Redis Lock Distributed Mutex</span>
                      <span className="text-[#2fe0d0]">0 RACE CONDITIONS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ClickHouse Sub-Second Event Traces</span>
                      <span className="text-[#2fe0d0]">ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Multi-Tenant Production SLA (6 Roadmap Phases)</span>
                      <span className="text-[#2fe0d0]">99.98% UPTIME</span>
                    </div>
                    <div className="pt-3 border-t border-white/10 text-[#8fd5f1]">
                      Orchestrator Latency: 31.3s → 18.8s (-40%) · Platform Uptime: 99.98%
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
