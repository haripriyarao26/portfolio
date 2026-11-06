'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DecryptedMetric, TiltCard3D } from '@/components/ReactBits3D';
import { JpmcSpeedupLottie, OneteraCompressionLottie } from '@/components/LottieVectorVisuals';
import { HaldenButton, HaldenFadeUp, HaldenLetterReveal } from '@/components/HaldenMotion';

export default function CaseStudiesSection() {
  const [openDrawer, setOpenDrawer] = useState<'onetera' | 'jpmc' | null>(null);

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
          {/* ── CARD 01: ONETERA ── */}
          <HaldenFadeUp delay={0.05}>
            <article id="study-onetera" className="h-full">
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
                      Filtered out 95% of unused data and compressed payloads from 200KB down to 8KB — slashing cloud bills by 96% and making replies 40% faster.
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
                        <DecryptedMetric value="40%" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Faster</div>
                    </div>
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="99.98%" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Uptime</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0b1d3a]/8 flex items-center justify-between">
                  <span className="text-xs text-[#3e4d68]">NVIDIA &amp; city partners</span>
                  <HaldenButton onClick={() => setOpenDrawer('onetera')}>
                    Tech Architecture
                  </HaldenButton>
                </div>
              </TiltCard3D>
            </article>
          </HaldenFadeUp>

          {/* ── CARD 02: JPMORGAN CHASE ── */}
          <HaldenFadeUp delay={0.14}>
            <article id="study-jpmc" className="h-full">
              <TiltCard3D
                intensity={5}
                glareColor="rgba(143, 213, 241, 0.35)"
                className="spatial-glass rounded-3xl p-6 sm:p-8 h-full"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono-accent px-3 py-1 rounded-full bg-[#0b1d3a] text-[#FFFFFF] text-xs font-semibold">
                      JPMORGAN CHASE
                    </span>
                    <span className="mono-accent text-xs text-[#5b7cf0] font-semibold">
                      Senior AI Consultant
                    </span>
                  </div>

                  <JpmcSpeedupLottie />

                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0b1d3a] mb-2">
                      Made financial document review 2x faster at 95% accuracy
                    </h3>
                    <p className="text-sm text-[#3e4d68] leading-relaxed">
                      Built an automated testing harness and upgraded extraction rules, cutting advisor wait time from 40.8s down to 19.6s with zero errors on nested email threads.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="52%" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Faster</div>
                    </div>
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="95%" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Accuracy</div>
                    </div>
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="100%" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Threads fixed</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0b1d3a]/8 flex items-center justify-between">
                  <span className="text-xs text-[#3e4d68]">Regulated workflows</span>
                  <HaldenButton onClick={() => setOpenDrawer('jpmc')}>
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
            className="fixed inset-0 z-[80] flex items-center justify-end bg-[#0b1d3a]/40 backdrop-blur-sm"
            onClick={() => setOpenDrawer(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 0.7, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
              className="h-full w-full max-w-2xl overflow-y-auto border-l border-white bg-[#F8FAFC] p-6 sm:p-10 shadow-2xl space-y-6 text-[#0b1d3a]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase tracking-wider">
                    Engineering Deep Dive Drawer
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#0b1d3a] mt-1">
                    {openDrawer === 'onetera'
                      ? 'Onetera: 96% Token Compression & 22-Node LangGraph DAG'
                      : 'JPMorgan Chase: Golden-Dataset A/B Harness & Thread Isolation'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenDrawer(null)}
                  className="mono-accent shrink-0 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0b1d3a] hover:bg-slate-100"
                >
                  Close ✕
                </button>
              </div>

              {openDrawer === 'onetera' ? (
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
                      How the Golden-Dataset Eval Harness Works
                    </h4>
                    <ul className="space-y-2.5 text-sm text-[#3e4d68]">
                      <li>
                        <strong className="text-[#0b1d3a]">1. 100+ Ground-Truth Financial Threads:</strong> Curated multi-tiered benchmark datasets covering 5 to 6 level nested email forward chains.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">2. Contextual Branch Isolation:</strong> Replaced brittle regex heuristics with targeted prompt overrides that isolate the deepest authoritative message envelope.
                      </li>
                      <li>
                        <strong className="text-[#0b1d3a]">3. Automated CI Regression Gate:</strong> Blocks any prompt or model change scoring below 95% field agreement or producing &gt;0% false positives.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-[#0b1d3a] p-5 font-mono text-xs text-slate-200 space-y-2">
                    <div className="text-[#2fe0d0] font-semibold"># Adversarial Thread Audit (8/8 Resolved)</div>
                    <div className="flex justify-between">
                      <span>Case 1: 6-level inline client edits</span>
                      <span className="text-[#2fe0d0]">PASS (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Case 2: Split signatory across 3 replies</span>
                      <span className="text-[#2fe0d0]">PASS (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Case 3: Legal disclaimer header collision</span>
                      <span className="text-[#2fe0d0]">PASS (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Case 4: Multi-fiduciary entity conflict</span>
                      <span className="text-[#2fe0d0]">PASS (100%)</span>
                    </div>
                    <div className="pt-3 border-t border-white/10 text-[#8fd5f1]">
                      Median Latency: 40.8s → 19.6s (-52%) · Agreement: 95.4%
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
