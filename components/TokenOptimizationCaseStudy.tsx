'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section3D from '@/components/Section3D';

const spring = { type: 'spring' as const, stiffness: 120, damping: 26 };

export default function TokenOptimizationCaseStudy() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'comparison' | 'resilience'>('architecture');

  return (
    <Section3D id="case-study" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
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
            <span className="mono-accent text-xs tracking-[0.22em] text-[var(--accent)] uppercase font-semibold">
              Deep Dive Case Study
            </span>
            <span className="text-[var(--border)]">/</span>
            <span className="mono-accent text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase">
              Production Architecture
            </span>
          </div>
          <span className="mono-accent inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-bold text-[var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            96% Cost Cut (200KB → 8KB)
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Scaling Multi-Agent Orchestration to 255+ Steps
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">
          How redesigning a naively serialized LLM transformation pipeline through surgical extraction, TOON compression, and deterministic graph validation cut token consumption by 96% while eliminating hallucinations.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
        {[
          { id: 'architecture', label: '1. Problem & 3-Front Approach' },
          { id: 'comparison', label: '2. Payload & TOON Compression' },
          { id: 'resilience', label: '3. Invariants & Zero-Loss Validation' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`mono-accent px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === tab.id
                ? 'bg-[#E07A5F] text-[#0E0D13] shadow-[0_4px_16px_rgba(224,122,95,0.35)]'
                : 'border border-white/10 bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'architecture' && (
          <motion.div
            key="architecture"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={spring}
            className="grid gap-6 lg:grid-cols-3"
          >
            {/* The Problem Card */}
            <div className="card p-6 sm:p-7 border border-red-500/20 bg-red-950/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="mono-accent text-[11px] font-bold text-red-400 uppercase tracking-wider">The Bottleneck</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                  200KB Naive Monolithic JSON
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed space-y-2">
                  The legacy orchestrator passed the entire raw program configuration (every section, question, UI meta) to the LLM on every step change.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-[var(--text-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Context limit failures on 200+ step civic programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>$100s/day in redundant prompt tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Model conflated AND/OR logic branches</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-red-500/20 text-[11px] font-mono text-red-300">
                Payload: ~200KB · High Latency · O(N) Scan
              </div>
            </div>

            {/* The Solution */}
            <div className="card p-6 sm:p-7 border border-[var(--accent)]/30 bg-[var(--accent)]/[0.02] lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="mono-accent text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider">The 3-Front System</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                  Hybrid Deterministic + Constrained LLM Pipeline
                </h3>
                <div className="grid gap-4 sm:grid-cols-3 mt-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="mono-accent text-xs font-bold text-[var(--accent)] mb-1">Front 1</div>
                    <div className="font-semibold text-sm text-[var(--text-primary)] mb-1">Surgical Extraction</div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Python pre-pass isolates only the 10–20 steps with conditional rules. 95% of inert steps never hit the LLM.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="mono-accent text-xs font-bold text-[var(--accent)] mb-1">Front 2</div>
                    <div className="font-semibold text-sm text-[var(--text-primary)] mb-1">TOON Serialization</div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Token-Optimized Object Notation flattens uniform arrays into header rows, stripping 30–60% of syntax tokens.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="mono-accent text-xs font-bold text-[var(--accent)] mb-1">Front 3</div>
                    <div className="font-semibold text-sm text-[var(--text-primary)] mb-1">Tiktoken Budget Guard</div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Token-budget checks prior to dispatch trim lowest-priority metadata, guaranteeing zero context overflow.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--accent)]/20 flex items-center justify-between text-xs font-mono text-[var(--accent)]">
                <span>Result: 8KB Payload (96% Reduction)</span>
                <span>Scaled to 255+ Agentic Steps</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'comparison' && (
          <motion.div
            key="comparison"
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
    "description": "Please declare if you are a resident...",
    "options": [
      { "label": "San Francisco Resident", "value": "sf_res", "triggers": [...] },
      { "label": "Non-Resident", "value": "non_res", "triggers": [...] }
    ],
    "validation_rules": { ... 12 lines of metadata ... },
    "ui_layout_tokens": { ... 18 lines of style info ... }
  },
  // ... 254 more bloated steps repeated every turn ...
]`}</pre>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="mono-accent text-xs text-[var(--accent)] font-semibold uppercase">After: TOON Compressed Array</span>
                  <span className="mono-accent text-xs text-[var(--accent)]">~8,000 bytes (-96%)</span>
                </div>
                <div className="rounded-xl border border-[var(--accent)]/30 bg-black/60 p-4 font-mono text-xs text-amber-200/90 overflow-x-auto h-64">
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

        {activeTab === 'resilience' && (
          <motion.div
            key="resilience"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={spring}
            className="card p-6 sm:p-8 border border-white/10"
          >
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-4">
              Deterministic Safety Invariants &amp; Automated Verification
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="mono-accent text-xs font-bold text-[var(--accent)] mb-1">O(1) Section Expansion</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Single pre-pass builds bidirectional index maps, converting O(N) sequential scans into constant-time dual dictionary lookups.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="mono-accent text-xs font-bold text-[var(--accent)] mb-1">DFS Cycle Detection</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  White/gray/black graph coloring runs over conditional dependency graphs to catch recursive loop deadlocks before runtime dispatch.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="mono-accent text-xs font-bold text-[var(--accent)] mb-1">Zero-Loss Verification</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Audits 100% of LLM-generated activation rules against deterministic ground truth, automatically correcting malformed branch assignments.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section3D>
  );
}
