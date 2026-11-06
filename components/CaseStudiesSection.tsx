'use client';

import { motion } from 'framer-motion';
import Section3D from '@/components/Section3D';

const spring = { type: 'spring' as const, stiffness: 120, damping: 26 };

export default function CaseStudiesSection() {
  return (
    <Section3D id="case-studies" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="mb-12"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="mono-accent text-xs tracking-widest text-[#E07A5F] uppercase font-semibold">
              Deep Dive Case Studies
            </span>
            <span className="text-white/20">/</span>
            <span className="mono-accent text-xs tracking-wider text-[#B8B0A4] uppercase">
              Production Architecture
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="#study-onetera"
              className="mono-accent rounded-full border border-white/15 bg-[#181818] hover:border-[#E07A5F]/50 px-3 py-1 text-xs font-medium text-[#FAF6F0] transition-colors duration-300"
            >
              01 Onetera (96% Token Cut)
            </a>
            <a
              href="#study-jpmc"
              className="mono-accent rounded-full border border-white/15 bg-[#181818] hover:border-[#E07A5F]/50 px-3 py-1 text-xs font-medium text-[#FAF6F0] transition-colors duration-300"
            >
              02 JPMorgan Chase (52% Latency Drop)
            </a>
          </div>
        </div>
        <h2
          className="font-display text-3xl sm:text-5xl font-semibold text-[#FAF6F0] tracking-tight max-w-[680px]"
          style={{ textWrap: 'balance' }}
        >
          System architecture and empirical production outcomes.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#B8B0A4] max-w-[680px]" style={{ textWrap: 'pretty' }}>
          Complete engineering breakdowns covering baseline bottlenecks, architectural trade offs, payload transformations, and verified production benchmarks.
        </p>
      </motion.div>

      <div className="space-y-16">
        {/* ── CASE STUDY 01: ONETERA (96% TOKEN CUT & 255+ STEPS) ── */}
        <motion.article
          id="study-onetera"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="rounded-3xl border border-white/15 bg-[#181818] p-6 sm:p-10 space-y-8"
        >
          {/* Study Header + Instant Impact Strip */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="mono-accent px-2.5 py-0.5 rounded-md bg-[#E07A5F] text-[#0E0D13] text-xs font-semibold">
                  CASE STUDY 01
                </span>
                <span className="mono-accent text-xs font-semibold text-[#F4A261] uppercase tracking-wider">
                  Onetera &middot; Multi Agent Orchestration
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#FAF6F0]">
                96% token cost reduction (200KB to 8KB) across 255+ agentic steps
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="rounded-xl border border-white/10 bg-[#1F1F1F] px-4 py-3">
                <div className="text-xl sm:text-2xl font-semibold text-[#F4A261] font-display">96%</div>
                <div className="text-xs text-[#B8B0A4]">Payload cut</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#1F1F1F] px-4 py-3">
                <div className="text-xl sm:text-2xl font-semibold text-[#F4A261] font-display">40%</div>
                <div className="text-xs text-[#B8B0A4]">Latency drop</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#1F1F1F] px-4 py-3">
                <div className="text-xl sm:text-2xl font-semibold text-[#F4A261] font-display">255+</div>
                <div className="text-xs text-[#B8B0A4]">Steps scaled</div>
              </div>
            </div>
          </div>

          {/* 3-Column Story: Bottleneck -> 3-Front Architecture -> Production Invariants */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Column 1: Bottleneck */}
            <div className="rounded-2xl p-6 border border-red-500/25 bg-[#1F1F1F] flex flex-col justify-between">
              <div>
                <span className="mono-accent text-xs font-semibold text-red-400 uppercase tracking-wider">
                  1. The Bottleneck
                </span>
                <h4 className="font-display text-lg font-semibold text-[#FAF6F0] mt-2 mb-3">
                  200KB monolithic JSON per turn
                </h4>
                <p className="text-sm text-[#B8B0A4] mb-4">
                  The legacy orchestrator passed the entire raw civic program configuration (every section, question, and UI metadata field) to the LLM on every step change.
                </p>
                <ul className="space-y-2 text-xs text-[#B8B0A4]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-semibold">✕</span>
                    <span>Context window exhaustion on 200+ step municipal workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-semibold">✕</span>
                    <span>Hundreds of dollars daily in redundant prompt token overhead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-semibold">✕</span>
                    <span>Model hallucinated and conflated deeply nested AND/OR logic branches</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-white/10 text-xs font-mono text-red-300">
                Baseline: ~200KB payload &middot; O(N) sequential scan
              </div>
            </div>

            {/* Column 2: 3-Front Architecture */}
            <div className="rounded-2xl p-6 border border-[#E07A5F]/35 bg-[#1F1F1F] flex flex-col justify-between">
              <div>
                <span className="mono-accent text-xs font-semibold text-[#E07A5F] uppercase tracking-wider">
                  2. The 3 Front System
                </span>
                <h4 className="font-display text-lg font-semibold text-[#FAF6F0] mt-2 mb-3">
                  Deterministic pre-pass + TOON compression
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl border border-white/10 bg-[#181818]">
                    <div className="text-xs font-semibold text-[#F4A261]">Front 1: Surgical Extraction</div>
                    <p className="text-xs text-[#B8B0A4] mt-1">
                      Python pre-pass isolates only the 10 to 20 steps with conditional rules; 95% of inert steps never touch the LLM.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-[#181818]">
                    <div className="text-xs font-semibold text-[#F4A261]">Front 2: TOON Serialization</div>
                    <p className="text-xs text-[#B8B0A4] mt-1">
                      Token Optimized Object Notation flattens uniform arrays into pipe delimited header rows, stripping 60% of syntax tokens.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-[#181818]">
                    <div className="text-xs font-semibold text-[#F4A261]">Front 3: Tiktoken Budget Guard</div>
                    <p className="text-xs text-[#B8B0A4] mt-1">
                      Pre-dispatch token checks trim low priority metadata, guaranteeing zero context overflow.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-white/10 text-xs font-mono text-[#F4A261]">
                Result: 8KB payload (-96%) &middot; Sub-second routing
              </div>
            </div>

            {/* Column 3: Deterministic Invariants */}
            <div className="rounded-2xl p-6 border border-white/10 bg-[#1F1F1F] flex flex-col justify-between">
              <div>
                <span className="mono-accent text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  3. Production Invariants
                </span>
                <h4 className="font-display text-lg font-semibold text-[#FAF6F0] mt-2 mb-3">
                  Zero-loss graph verification
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl border border-white/10 bg-[#181818]">
                    <div className="text-xs font-semibold text-[#FAF6F0]">O(1) Section Expansion</div>
                    <p className="text-xs text-[#B8B0A4] mt-1">
                      Single pre-pass builds bidirectional index maps, converting O(N) scans into constant-time dictionary lookups.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-[#181818]">
                    <div className="text-xs font-semibold text-[#FAF6F0]">DFS Cycle Detection</div>
                    <p className="text-xs text-[#B8B0A4] mt-1">
                      Three-color graph traversal runs over dependency graphs to catch recursive deadlocks before runtime dispatch.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-[#181818]">
                    <div className="text-xs font-semibold text-[#FAF6F0]">AST Salvage Layer</div>
                    <p className="text-xs text-[#B8B0A4] mt-1">
                      Audits 100% of LLM activation outputs against deterministic ground truth and repairs malformed branch rules.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-white/10 text-xs font-mono text-emerald-300">
                Uptime: 99.98% across 6 municipal roadmap phases
              </div>
            </div>
          </div>

          {/* Side-by-Side Payload Proof */}
          <div className="grid gap-6 md:grid-cols-2 pt-2">
            <div className="rounded-2xl border border-white/10 bg-[#000000] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="mono-accent text-xs text-red-400 font-semibold uppercase">Before: Verbose JSON Payload</span>
                <span className="mono-accent text-xs text-red-400">~200,000 bytes / call</span>
              </div>
              <pre className="font-mono text-xs text-[#B8B0A4] overflow-x-auto">{`[
  {
    "id": "step_001_applicant_residency",
    "section_title": "General Eligibility",
    "field_type": "single_select",
    "options": [
      { "label": "Resident", "triggers": ["s04", "s05"] },
      { "label": "Non-Resident", "triggers": ["s99"] }
    ],
    "validation_rules": { "required": true, "schema": "v2" },
    "ui_layout_tokens": { "grid": "col-12", "theme": "civic" }
  }
  // ... 254 more bloated steps sent on every turn
]`}</pre>
            </div>

            <div className="rounded-2xl border border-[#E07A5F]/40 bg-[#000000] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="mono-accent text-xs text-[#F4A261] font-semibold uppercase">After: TOON Compressed Array</span>
                <span className="mono-accent text-xs text-emerald-400">~8,000 bytes (-96%)</span>
              </div>
              <pre className="font-mono text-xs text-[#FAF6F0] overflow-x-auto">{`# TOON (Token-Optimized Object Notation)
# ID  | TYPE   | CONDITION_RULE             | ACTIVATE
s01   | SELECT | age >= 18                  | s04, s05
s02   | INCOME | annual_usd < 50000         | prog_grant
s08   | DOCS   | has_valid_permit == true   | bypass_s12

# Constrained Deterministic Output:
[{ "step": "s01", "activate": ["s04", "s05"] },
 { "step": "s02", "activate": ["prog_grant"] }]`}</pre>
            </div>
          </div>
        </motion.article>

        {/* ── CASE STUDY 02: JPMORGAN CHASE (52% LATENCY DROP & GOLDEN EVALS) ── */}
        <motion.article
          id="study-jpmc"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="rounded-3xl border border-white/15 bg-[#181818] p-6 sm:p-10 space-y-8"
        >
          {/* Study Header + Instant Impact Strip */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="mono-accent px-2.5 py-0.5 rounded-md bg-[#E07A5F] text-[#0E0D13] text-xs font-semibold">
                  CASE STUDY 02
                </span>
                <span className="mono-accent text-xs font-semibold text-[#F4A261] uppercase tracking-wider">
                  JPMorgan Chase &middot; Evaluation Harness &amp; Extraction
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#FAF6F0]">
                Golden-dataset evaluation harness and 52% extraction latency reduction
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="rounded-xl border border-white/10 bg-[#1F1F1F] px-4 py-3">
                <div className="text-xl sm:text-2xl font-semibold text-[#F4A261] font-display">52%</div>
                <div className="text-xs text-[#B8B0A4]">Faster (19.6s)</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#1F1F1F] px-4 py-3">
                <div className="text-xl sm:text-2xl font-semibold text-[#F4A261] font-display">95%</div>
                <div className="text-xs text-[#B8B0A4]">Field agreement</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#1F1F1F] px-4 py-3">
                <div className="text-xl sm:text-2xl font-semibold text-[#F4A261] font-display">8/8</div>
                <div className="text-xs text-[#B8B0A4]">Edge cases fixed</div>
              </div>
            </div>
          </div>

          {/* 3-Column Story: Challenge -> Solution Pillars -> Production Pipeline */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl p-6 border border-red-500/25 bg-[#1F1F1F] flex flex-col justify-between">
              <div>
                <span className="mono-accent text-xs font-semibold text-red-400 uppercase tracking-wider">
                  1. The Bottleneck
                </span>
                <h4 className="font-display text-lg font-semibold text-[#FAF6F0] mt-2 mb-3">
                  40.8s latency and nested thread errors
                </h4>
                <p className="text-sm text-[#B8B0A4] mb-4">
                  Regulated financial workflows required extracting structured entities across 5 to 6 level deep forwarded email and document chains.
                </p>
                <ul className="space-y-2 text-xs text-[#B8B0A4]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-semibold">✕</span>
                    <span>40.8s median turn latency blocked real-time advisor reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-semibold">✕</span>
                    <span>8/8 edge-case misclassifications on nested forward histories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-semibold">✕</span>
                    <span>Zero automated regression gating when updating prompt templates</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-white/10 text-xs font-mono text-red-300">
                Baseline: 40.8s median turn &middot; High fiduciary risk
              </div>
            </div>

            <div className="rounded-2xl p-6 border border-[#E07A5F]/35 bg-[#1F1F1F] flex flex-col justify-between">
              <div>
                <span className="mono-accent text-xs font-semibold text-[#E07A5F] uppercase tracking-wider">
                  2. Engineering Solution
                </span>
                <h4 className="font-display text-lg font-semibold text-[#FAF6F0] mt-2 mb-3">
                  Automated A/B Golden Eval Harness
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl border border-white/10 bg-[#181818]">
                    <div className="text-xs font-semibold text-[#F4A261]">Curated Ground Truth Suite</div>
                    <p className="text-xs text-[#B8B0A4] mt-1">
                      Built 100+ annotated financial benchmark datasets with multi-tiered ground truth field labels.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-[#181818]">
                    <div className="text-xs font-semibold text-[#F4A261]">Contextual Forward Isolation</div>
                    <p className="text-xs text-[#B8B0A4] mt-1">
                      Replaced brittle regex heuristics with targeted prompt overrides isolating the deepest authoritative thread branch.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-[#181818]">
                    <div className="text-xs font-semibold text-[#F4A261]">CI Regression Gate</div>
                    <p className="text-xs text-[#B8B0A4] mt-1">
                      Automated A/B comparison pipeline blocking any deployment below 95% field agreement or with &gt;0% false positives.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-white/10 text-xs font-mono text-[#F4A261]">
                Outcome: 19.6s turn latency (-52%) &middot; 0 false positives
              </div>
            </div>

            <div className="rounded-2xl p-6 border border-white/10 bg-[#1F1F1F] flex flex-col justify-between">
              <div>
                <span className="mono-accent text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  3. Adversarial Audit
                </span>
                <h4 className="font-display text-lg font-semibold text-[#FAF6F0] mt-2 mb-3">
                  100% edge-case resolution
                </h4>
                <div className="rounded-xl border border-white/10 bg-[#000000] p-4 font-mono text-xs text-[#FAF6F0] space-y-2">
                  <div className="text-[#F4A261] font-semibold"># Thread Audit (8/8 Cases)</div>
                  <div className="flex justify-between text-[#B8B0A4]">
                    <span>6-level inline client edits</span>
                    <span className="text-emerald-400">PASS</span>
                  </div>
                  <div className="flex justify-between text-[#B8B0A4]">
                    <span>Split signatory across 3 replies</span>
                    <span className="text-emerald-400">PASS</span>
                  </div>
                  <div className="flex justify-between text-[#B8B0A4]">
                    <span>Disclaimer header collision</span>
                    <span className="text-emerald-400">PASS</span>
                  </div>
                  <div className="flex justify-between text-[#B8B0A4]">
                    <span>Multi-fiduciary entity conflict</span>
                    <span className="text-emerald-400">PASS</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-emerald-300">
                    Agreement: 95.4% (Gate &gt;= 95.0%)
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-white/10 text-xs font-mono text-emerald-300">
                Production status: Verified across regulated workflows
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </Section3D>
  );
}
