'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section3D from '@/components/Section3D';

const spring = { type: 'spring' as const, stiffness: 120, damping: 26 };

export default function CaseStudiesSection() {
  const [activeStudy, setActiveStudy] = useState<'jpmc' | 'onetera'>('jpmc');
  const [activeTab, setActiveTab] = useState<'problem' | 'system' | 'impact'>('problem');

  return (
    <Section3D id="case-studies" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="mono-accent text-xs tracking-[0.22em] text-[#E07A5F] uppercase font-semibold">
              Deep Dive Case Studies
            </span>
            <span className="text-white/20">/</span>
            <span className="mono-accent text-xs tracking-[0.16em] text-[#A69F94] uppercase">
              Production Architecture
            </span>
          </div>
          <span className="mono-accent inline-flex items-center gap-1.5 rounded-full border border-[#E07A5F]/40 bg-[#E07A5F]/10 px-3.5 py-1 text-xs font-bold text-[#F4A261]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E07A5F] animate-pulse" />
            2 Flagship Production Studies
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#FAF6F0] tracking-tight">
          System Architecture &amp; Empirical Outcomes
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#A69F94] max-w-3xl leading-relaxed">
          Detailed engineering breakdowns covering problem formulation, algorithmic approaches, trade-offs, and verified production benchmarks.
        </p>
      </motion.div>

      {/* Case Study Switcher Pills */}
      <div className="flex flex-wrap items-center gap-3 mb-8 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 w-fit">
        <button
          onClick={() => {
            setActiveStudy('jpmc');
            setActiveTab('problem');
          }}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeStudy === 'jpmc'
              ? 'bg-[#E07A5F] text-[#0E0D13] shadow-[0_0_20px_rgba(224,122,95,0.4)]'
              : 'text-[#A69F94] hover:text-[#FAF6F0]'
          }`}
        >
          <span className="font-mono text-xs">01</span>
          <span>JPMorgan Chase: Golden-Dataset Evals &amp; 52% Latency Drop</span>
        </button>

        <button
          onClick={() => {
            setActiveStudy('onetera');
            setActiveTab('problem');
          }}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeStudy === 'onetera'
              ? 'bg-[#E07A5F] text-[#0E0D13] shadow-[0_0_20px_rgba(224,122,95,0.4)]'
              : 'text-[#A69F94] hover:text-[#FAF6F0]'
          }`}
        >
          <span className="font-mono text-xs">02</span>
          <span>Onetera: 96% Token Cost Cut (200KB &rarr; 8KB) &amp; 255+ Steps</span>
        </button>
      </div>

      {/* Study 1: JPMorgan Chase Golden-Dataset Eval Harness */}
      {activeStudy === 'jpmc' && (
        <motion.div
          key="jpmc-study"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="space-y-6"
        >
          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {[
              { id: 'problem', label: '1. The Bottleneck (40.8s Latency & Nested Thread Failures)' },
              { id: 'system', label: '2. Golden-Dataset Harness & GPT-5.5 Deployment' },
              { id: 'impact', label: '3. Verified Results (52% Speedup & 100% Resolution)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`mono-accent px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#E07A5F] text-[#0E0D13] shadow-[0_4px_16px_rgba(224,122,95,0.35)]'
                    : 'border border-white/10 bg-white/5 text-[#A69F94] hover:text-[#FAF6F0] hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'problem' && (
              <motion.div
                key="jpmc-prob"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={spring}
                className="grid gap-6 lg:grid-cols-3"
              >
                <div className="card p-6 sm:p-7 border border-red-500/25 bg-red-950/15 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="mono-accent text-[11px] font-bold text-red-400 uppercase tracking-wider">The Challenge</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#FAF6F0] mb-3">
                      40.8s Latency &amp; Fragile Heuristics
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A69F94] leading-relaxed">
                      Regulated financial document workflows required extracting entity structures across 5–6 level deep forwarded email and document chains. Legacy extraction pipelines averaged <strong>40.8s per turn</strong> with recurring classification errors.
                    </p>
                    <ul className="mt-4 space-y-2 text-xs text-[#A69F94]">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">✕</span>
                        <span>Multi-turn latency ceiling preventing real-time advisor reviews</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">✕</span>
                        <span>8/8 edge-case failures on deeply nested forward histories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">✕</span>
                        <span>Lack of automated regression gating when tweaking prompts</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-red-500/20 text-[11px] font-mono text-red-300">
                    Baseline: 40.8s Median Latency &middot; Fiduciary Risk
                  </div>
                </div>

                <div className="card p-6 sm:p-7 border border-[#E07A5F]/30 bg-[#E07A5F]/[0.03] lg:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="mono-accent text-[11px] font-bold text-[#E07A5F] uppercase tracking-wider">The Solution Framework</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#FAF6F0] mb-3">
                      Automated A/B Golden Evals + Model Deployment
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3 mt-4">
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="mono-accent text-xs font-bold text-[#F4A261] mb-1">Pillar 1</div>
                        <div className="font-semibold text-sm text-[#FAF6F0] mb-1">Golden Dataset Harness</div>
                        <p className="text-xs text-[#A69F94] leading-relaxed">
                          Constructed curated gold-standard benchmark datasets with multi-tiered ground truth field labels.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="mono-accent text-xs font-bold text-[#F4A261] mb-1">Pillar 2</div>
                        <div className="font-semibold text-sm text-[#FAF6F0] mb-1">Targeted Overrides</div>
                        <p className="text-xs text-[#A69F94] leading-relaxed">
                          Replaced brittle regex parsing with contextual prompt overrides isolating deepest forward branches.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="mono-accent text-xs font-bold text-[#F4A261] mb-1">Pillar 3</div>
                        <div className="font-semibold text-sm text-[#FAF6F0] mb-1">Adversarial Test Suites</div>
                        <p className="text-xs text-[#A69F94] leading-relaxed">
                          Automated CI regression comparison gating that blocks prompt changes causing false positives.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E07A5F]/20 flex items-center justify-between text-xs font-mono text-[#F4A261]">
                    <span>Outcome: 52% Latency Drop (19.6s)</span>
                    <span>95% Agreement &middot; Zero False Positives</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'system' && (
              <motion.div
                key="jpmc-sys"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={spring}
                className="card p-6 sm:p-8 border border-white/10 space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#FAF6F0] mb-2">Automated A/B Evaluation Flow</h4>
                    <p className="text-xs sm:text-sm text-[#A69F94] leading-relaxed mb-4">
                      Every prompt change or model configuration is evaluated across golden dataset benchmarks with strict schema verification and accuracy scoring before deployment.
                    </p>
                    <div className="rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-[#F4A261] overflow-x-auto">
                      <pre>{`# Golden Dataset A/B Evaluator Pipeline
Input: Regulated Financial Threads (5-6 levels)
├── Step 1: Thread History Normalizer & Header Extractor
├── Step 2: Parallel Model Execution (GPT-5.5 / Claude)
├── Step 3: Exact-Match & Semantic Field Agreement Audit
│   ├── Target Agreement Gate: >= 95%
│   └── False-Positive Threshold: 0.0%
└── Step 4: Latency Benchmark Telemetry (p50 / p95)`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-[#FAF6F0] mb-2">Adversarial Thread Handling</h4>
                    <p className="text-xs sm:text-sm text-[#A69F94] leading-relaxed mb-4">
                      Synthetic adversarial threads with deceptive forward headers and mixed entity names are continuously tested to ensure zero classification drift.
                    </p>
                    <div className="rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-[#FAF6F0]/90 overflow-x-auto">
                      <pre>{`# Thread Misclassification Audit (8/8 Cases)
Case 1: 6-level forward with inline client edits -> RESOLVED (100%)
Case 2: Split signatory across 3 replies       -> RESOLVED (100%)
Case 3: Nested disclaimer header confusion     -> RESOLVED (100%)
Case 4: Multi-fiduciary entity conflict        -> RESOLVED (100%)

Total Regression Score: 100% Pass (0 False Positives)`}</pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'impact' && (
              <motion.div
                key="jpmc-imp"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={spring}
                className="card p-6 sm:p-8 border border-white/10"
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="text-3xl font-extrabold text-[#F4A261] font-display">52%</div>
                    <div className="font-semibold text-sm text-[#FAF6F0] mt-1">Extraction Latency Drop</div>
                    <p className="text-xs text-[#A69F94] mt-2 leading-relaxed">
                      Cut extraction turn times from 40.8s down to 19.6s while preserving full fiduciary compliance.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="text-3xl font-extrabold text-[#F4A261] font-display">95%</div>
                    <div className="font-semibold text-sm text-[#FAF6F0] mt-1">Field Agreement</div>
                    <p className="text-xs text-[#A69F94] mt-2 leading-relaxed">
                      Achieved 95% agreement across gold-standard financial entity and rule verification schemas.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="text-3xl font-extrabold text-[#F4A261] font-display">8/8 (100%)</div>
                    <div className="font-semibold text-sm text-[#FAF6F0] mt-1">Edge Cases Resolved</div>
                    <p className="text-xs text-[#A69F94] mt-2 leading-relaxed">
                      Eliminated 100% of nested forward thread misclassifications with zero observed false positives.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Study 2: Onetera 96% Token Cost Cut & 255+ Steps */}
      {activeStudy === 'onetera' && (
        <motion.div
          key="onetera-study"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="space-y-6"
        >
          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {[
              { id: 'problem', label: '1. The Bottleneck & 3-Front Approach' },
              { id: 'system', label: '2. Payload & TOON Compression' },
              { id: 'impact', label: '3. Invariants & Zero-Loss Scaling' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`mono-accent px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#E07A5F] text-[#0E0D13] shadow-[0_4px_16px_rgba(224,122,95,0.35)]'
                    : 'border border-white/10 bg-white/5 text-[#A69F94] hover:text-[#FAF6F0] hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'problem' && (
              <motion.div
                key="onetera-prob"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={spring}
                className="grid gap-6 lg:grid-cols-3"
              >
                <div className="card p-6 sm:p-7 border border-red-500/25 bg-red-950/15 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="mono-accent text-[11px] font-bold text-red-400 uppercase tracking-wider">The Bottleneck</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#FAF6F0] mb-3">
                      200KB Naive Monolithic JSON
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A69F94] leading-relaxed">
                      The legacy orchestrator passed the entire raw program configuration (every section, question, UI meta) to the LLM on every step change, causing severe context exhaustion.
                    </p>
                    <ul className="mt-4 space-y-2 text-xs text-[#A69F94]">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">✕</span>
                        <span>Context limit failures on 200+ step civic programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">✕</span>
                        <span>$100s/day in redundant prompt token overhead</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">✕</span>
                        <span>Model conflated AND/OR logic branches</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-red-500/20 text-[11px] font-mono text-red-300">
                    Payload: ~200KB &middot; High Latency &middot; O(N) Scan
                  </div>
                </div>

                <div className="card p-6 sm:p-7 border border-[#E07A5F]/30 bg-[#E07A5F]/[0.03] lg:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="mono-accent text-[11px] font-bold text-[#E07A5F] uppercase tracking-wider">The 3-Front System</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#FAF6F0] mb-3">
                      Hybrid Deterministic + Constrained LLM Pipeline
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3 mt-4">
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="mono-accent text-xs font-bold text-[#F4A261] mb-1">Front 1</div>
                        <div className="font-semibold text-sm text-[#FAF6F0] mb-1">Surgical Extraction</div>
                        <p className="text-xs text-[#A69F94] leading-relaxed">
                          Python pre-pass isolates only the 10–20 steps with conditional rules. 95% of inert steps never hit the LLM.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="mono-accent text-xs font-bold text-[#F4A261] mb-1">Front 2</div>
                        <div className="font-semibold text-sm text-[#FAF6F0] mb-1">TOON Serialization</div>
                        <p className="text-xs text-[#A69F94] leading-relaxed">
                          Token-Optimized Object Notation flattens uniform arrays into header rows, stripping 30–60% of syntax tokens.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                        <div className="mono-accent text-xs font-bold text-[#F4A261] mb-1">Front 3</div>
                        <div className="font-semibold text-sm text-[#FAF6F0] mb-1">Tiktoken Budget Guard</div>
                        <p className="text-xs text-[#A69F94] leading-relaxed">
                          Token-budget checks prior to dispatch trim lowest-priority metadata, guaranteeing zero context overflow.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E07A5F]/20 flex items-center justify-between text-xs font-mono text-[#F4A261]">
                    <span>Result: 8KB Payload (96% Reduction)</span>
                    <span>Scaled to 255+ Agentic Steps</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'system' && (
              <motion.div
                key="onetera-sys"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={spring}
                className="card p-6 sm:p-8 border border-white/10"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="mono-accent text-xs text-red-400 font-semibold uppercase">Before: Verbose JSON Payload</span>
                      <span className="mono-accent text-xs text-red-400">~200,000 bytes</span>
                    </div>
                    <div className="rounded-xl border border-red-500/20 bg-black/60 p-4 font-mono text-xs text-red-200/80 overflow-x-auto h-64">
                      <pre>{`[
  {
    "id": "step_001_applicant_residency",
    "section_title": "General Eligibility",
    "field_type": "single_select",
    "description": "Please declare residency...",
    "options": [
      { "label": "Resident", "triggers": [...] },
      { "label": "Non-Resident", "triggers": [...] }
    ],
    "validation_rules": { ... 12 lines of meta ... },
    "ui_layout_tokens": { ... 18 lines of style ... }
  },
  // ... 254 more bloated steps repeated every turn ...
]`}</pre>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="mono-accent text-xs text-[#E07A5F] font-semibold uppercase">After: TOON Compressed Array</span>
                      <span className="mono-accent text-xs text-[#F4A261]">~8,000 bytes (-96%)</span>
                    </div>
                    <div className="rounded-xl border border-[#E07A5F]/30 bg-black/60 p-4 font-mono text-xs text-amber-200/90 overflow-x-auto h-64">
                      <pre>{`# TOON (Token-Optimized Object Notation)
# ID | TYPE | CONDITION_RULE | TARGET_SECTION
s01 | SELECT | age >= 18 -> show(s04, s05)
s02 | INCOME | val < 50k -> activate(prog_grant)
s08 | DOCS   | has_permit == true -> bypass(s12)

# Constrained Model Output:
[{ "po_step": "s01", "activate": ["s04", "s05"] },
 { "po_step": "s02", "activate": ["prog_grant"] }]`}</pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'impact' && (
              <motion.div
                key="onetera-imp"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={spring}
                className="card p-6 sm:p-8 border border-white/10"
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="mono-accent text-xs font-bold text-[#F4A261] mb-1">O(1) Section Expansion</div>
                    <p className="text-xs text-[#A69F94] leading-relaxed">
                      Single pre-pass builds bidirectional index maps, converting O(N) sequential scans into constant-time dual dictionary lookups.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="mono-accent text-xs font-bold text-[#F4A261] mb-1">DFS Cycle Detection</div>
                    <p className="text-xs text-[#A69F94] leading-relaxed">
                      White/gray/black graph coloring runs over conditional dependency graphs to catch recursive loop deadlocks before runtime dispatch.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="mono-accent text-xs font-bold text-[#F4A261] mb-1">Zero-Loss Verification</div>
                    <p className="text-xs text-[#A69F94] leading-relaxed">
                      Audits 100% of LLM-generated activation rules against deterministic ground truth, automatically correcting malformed branch assignments.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </Section3D>
  );
}
