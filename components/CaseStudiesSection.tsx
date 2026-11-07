'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DecryptedMetric, TiltCard3D } from '@/components/ReactBits3D';
import { OneteraCompressionLottie, OneteraFoundingEcosystemLottie } from '@/components/LottieVectorVisuals';
import { HaldenButton, HaldenFadeUp, HaldenLetterReveal } from '@/components/HaldenMotion';

export default function CaseStudiesSection() {
  const [openDrawer, setOpenDrawer] = useState<'onetera-compression' | 'onetera-founding' | null>(null);

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
            Clear outcomes first. Click either card to open the technical architecture drawer.
          </p>
        </HaldenFadeUp>

        <div className="grid gap-6 md:grid-cols-2">
          {/* ── CARD 01: ONETERA TOKEN COMPRESSION & SMART FILTER ── */}
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
                      ONETERA
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
                      Filtered out unreferenced fields via Task-Oriented Object Notation (TOON) — an AST-pruned schema stripping unneeded data before prompt serialization. Compressing payloads from 200KB to 8KB cut input token volume by 96%, proportionally slashing inference costs by 96%.
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
                      <div className="text-xs text-[#3e4d68]">&rarr; 8KB payload</div>
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
                  <span className="text-xs text-[#3e4d68]">Municipal &amp; enterprise partners</span>
                  <HaldenButton onClick={() => setOpenDrawer('onetera-compression')}>
                    Tech Architecture
                  </HaldenButton>
                </div>
              </TiltCard3D>
            </article>
          </HaldenFadeUp>

          {/* ── CARD 02: ONETERA 0-TO-1 PRODUCT, CITY MEETINGS & INFRASTRUCTURE ── */}
          <HaldenFadeUp delay={0.14}>
            <article id="study-onetera-founding" className="h-full">
              <TiltCard3D
                intensity={5}
                glareColor="rgba(143, 213, 241, 0.35)"
                className="spatial-glass rounded-3xl p-6 sm:p-8 h-full"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono-accent px-3 py-1 rounded-full bg-[#0b1d3a] text-[#FFFFFF] text-xs font-semibold">
                      ONETERA
                    </span>
                    <span className="mono-accent text-xs text-[#5b7cf0] font-semibold">
                      Founding AI Engineer
                    </span>
                  </div>

                  <OneteraFoundingEcosystemLottie />

                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0b1d3a] mb-2">
                      Built 0-to-1 AI product: from city meetings to enterprise production
                    </h3>
                    <p className="text-sm text-[#3e4d68] leading-relaxed">
                      Built the platform from scratch across 6 roadmap phases — presenting in city agency meetings, aligning civic requirements, collaborating with enterprise infrastructure partners, and delivering sub-15ms task routing with zero state desyncs.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="0 → 1" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">From scratch</div>
                    </div>
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="6" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Roadmap phases</div>
                    </div>
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="<15ms" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Routing SLA</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0b1d3a]/8 flex items-center justify-between">
                  <span className="text-xs text-[#3e4d68]">City officials &amp; civic partners</span>
                  <HaldenButton onClick={() => setOpenDrawer('onetera-founding')}>
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
                      : 'Onetera: 0-to-1 Product Engineering, City Agency Alignment & Production Scaling'}
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
                    <ul className="space-y-3 text-sm text-[#3e4d68]">
                      <li>
                        <strong className="text-[#0b1d3a]">1. Surgical Pre-Pass (Python):</strong> Isolates only the 10 to 20 steps with active conditional rules; 95% of inert UI steps are stripped before the LLM prompt is assembled.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">2. TOON (Table-Oriented Object Notation) Serialization:</strong> A compact tabular serialization format that converts repetitive JSON object arrays into pipe-delimited header rows, stripping 60% of redundant brackets and keys before sending to the model.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">3. Deterministic AST Schema Salvage:</strong> An Abstract Syntax Tree (AST) recovery parser that intercepts malformed model outputs (dropped closing braces, trailing commas, truncated strings) and safely repairs them into valid JSON schemas with 0 crashes.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">4. O(1) Index Maps &amp; DFS Cycle Detection:</strong> Pre-computes bidirectional lookup maps and runs 3-color graph traversal to prevent recursive infinite loops across 255+ conditional steps.
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
                      0-to-1 Architecture &amp; Stakeholder Leadership
                    </h4>
                    <ul className="space-y-3 text-sm text-[#3e4d68]">
                      <li>
                        <strong className="text-[#0b1d3a]">1. Built the Entire Platform from Scratch:</strong> Architected the system from initial whiteboard prototype to multi-tenant production across 6 roadmap phases. Designed the multi-agent orchestration runtime, state management, and production APIs without legacy scaffolding.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">2. City Meetings &amp; Civic Agency Alignment:</strong> Attended and presented in live city agency &amp; municipal meetings. Translated nuanced public policies, municipal regulations, and non-technical stakeholder concerns into deterministic prompt boundaries, AST schemas, and strict compliance safeguards.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">3. Municipal Stakeholder Alignment &amp; Model Hosting:</strong> Partnered directly with municipal officials and infrastructure stakeholders to validate model hosting pipelines, cutting round-trip latency by 40% and delivering sub-15ms task routing across 6 roadmap phases.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">4. Production Hardening &amp; Redis Distributed Mutex:</strong> Integrated Redis distributed locks (mutexes) that grant millisecond-level exclusive execution locks across parallel agent workers, eliminating 100% of double-charge and race-condition edge cases under spike traffic.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-[#0b1d3a] p-5 font-mono text-xs text-slate-200 space-y-2.5">
                    <div className="text-[#2fe0d0] font-semibold flex items-center justify-between">
                      <span># Production Delivery &amp; Stakeholder Telemetry</span>
                      <span className="text-[#2fe0d0]">CIVIC &amp; ENTERPRISE VERIFIED</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <span>0 → 1 Architecture Delivery</span>
                      <span className="text-[#2fe0d0]">6 ROADMAP PHASES SHIPPED</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <span>City Agency &amp; Municipal Presentation</span>
                      <span className="text-[#2fe0d0]">100% REGULATORY COMPLIANCE</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <span>Enterprise Decisioning Pipeline</span>
                      <span className="text-[#2fe0d0]">40% TURN LATENCY DROP</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1.5">
                      <span>Concurrency Mutex (Redis)</span>
                      <span className="text-[#2fe0d0]">0 RACE CONDITIONS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Task Routing &amp; State Stability</span>
                      <span className="text-[#2fe0d0]">&lt;15MS SLA · 0 DESYNCS</span>
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
