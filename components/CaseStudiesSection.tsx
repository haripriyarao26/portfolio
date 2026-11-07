'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DecryptedMetric, TiltCard3D } from '@/components/ReactBits3D';
import { OneteraCompressionLottie, OneteraFoundingEcosystemLottie } from '@/components/LottieVectorVisuals';
import { HaldenButton, HaldenFadeUp, HaldenLetterReveal } from '@/components/HaldenMotion';

export default function CaseStudiesSection() {
  const [openDrawer, setOpenDrawer] = useState<'onetera-compression' | 'onetera-founding' | null>(null);
  const [mounted, setMounted] = useState(false);

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll, handle Esc, and trap focus while drawer is open
  useEffect(() => {
    if (openDrawer) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpenDrawer(null);
          return;
        }

        if (e.key === 'Tab' && drawerRef.current) {
          const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusables.length) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              last.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      const timer = setTimeout(() => {
        const closeBtn = drawerRef.current?.querySelector<HTMLElement>(
          'button[aria-label="Close drawer"], button, [href]'
        );
        closeBtn?.focus();
      }, 50);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
        clearTimeout(timer);
        previousFocusRef.current?.focus();
      };
    }
  }, [openDrawer]);

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
                      Software Engineer 2 / Founding Engineer
                    </span>
                  </div>

                  <OneteraCompressionLottie />

                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0b1d3a] mb-2 leading-snug">
                      Cut AI cloud costs by 96% across 255+ workflow steps
                    </h3>
                    <p className="text-sm text-[#3e4d68] leading-relaxed">
                      Filtered out unreferenced fields via Task-Oriented Object Notation (TOON) — an AST-pruned schema stripping unneeded data before prompt serialization. Compressing payloads from 200KB to 8KB slashed input token volume with zero schema breaks in the first six months.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-2xl border border-[#0b1d3a]/8 bg-white/80 p-3">
                      <div className="text-xl font-semibold text-[#0b1d3a] font-display">
                        <DecryptedMetric value="96%" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Token cost cut</div>
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
                      <div className="text-xs text-[#3e4d68]">Breaks in 6 mos</div>
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
                className="spatial-glass rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono-accent px-3 py-1 rounded-full bg-[#0b1d3a] text-[#FFFFFF] text-xs font-semibold">
                      ONETERA
                    </span>
                    <span className="mono-accent text-xs text-[#5b7cf0] font-semibold">
                      Software Engineer 2 / Founding Engineer
                    </span>
                  </div>

                  <OneteraFoundingEcosystemLottie />

                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0b1d3a] mb-2 leading-snug">
                      Built 0-to-1 product: from city meetings to enterprise production
                    </h3>
                    <p className="text-sm text-[#3e4d68] leading-relaxed">
                      Started from vague requirements in city meetings and built the platform from scratch over six roadmap phases, working with city officials and NVIDIA engineers. I watched residents use it in person and changed the product based on what I saw.
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
                        <DecryptedMetric value="55+" />
                      </div>
                      <div className="text-xs text-[#3e4d68]">Routes monitored</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0b1d3a]/8 flex items-center justify-between">
                  <span className="text-xs text-[#3e4d68]">City officials &amp; NVIDIA engineers</span>
                  <HaldenButton onClick={() => setOpenDrawer('onetera-founding')}>
                    Tech Architecture
                  </HaldenButton>
                </div>
              </TiltCard3D>
            </article>
          </HaldenFadeUp>
        </div>
      </div>

      {/* ── SLIDE-OVER DRAWER FOR TECHNICAL ARCHITECTS & ENGINEERS (PORTALED TO BODY) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {openDrawer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.2 }}
                className="fixed inset-0 z-[9999] flex items-center justify-end bg-[#0b1d3a]/75 backdrop-blur-md"
                onClick={() => setOpenDrawer(null)}
              >
                <motion.div
                  ref={drawerRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="case-study-drawer-title"
                  initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.1 }
                      : { duration: 0.35, ease: [0.22, 0.7, 0.2, 1] }
                  }
                  onClick={e => e.stopPropagation()}
                  className="relative h-full w-full sm:max-w-2xl overflow-y-auto bg-white p-5 sm:p-10 shadow-2xl text-[#0b1d3a] flex flex-col pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
                >
                  {/* Sticky Top Header with Clean Close Button */}
                  <div className="sticky -top-[max(1.5rem,env(safe-area-inset-top))] -mx-5 sm:-mx-10 px-5 sm:px-10 py-4 sm:py-5 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-start justify-between gap-4 z-20 mb-6 shadow-sm">
                    <div className="min-w-0">
                      <span className="mono-accent text-xs font-semibold text-[#5b7cf0] uppercase tracking-wider block">
                        Engineering Deep Dive &middot; Onetera Technologies
                      </span>
                      <h3
                        id="case-study-drawer-title"
                        className="font-display text-xl sm:text-2xl font-semibold text-[#0b1d3a] mt-1 leading-snug"
                      >
                        {openDrawer === 'onetera-compression'
                          ? 'Onetera: Token Compression, TOON & AST Schema Salvage'
                          : 'Onetera: 0-to-1 Product Engineering, City Alignment & NVIDIA Scaling'}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenDrawer(null)}
                      aria-label="Close drawer"
                      className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-[#0b1d3a] hover:bg-slate-100 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b7cf0]"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M4 4l8 8M12 4l-8 8" />
                      </svg>
                    </button>
                  </div>

                  {openDrawer === 'onetera-compression' ? (
                    <div className="space-y-6">
                      {/* Plain-English Problem & Solution Summary */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-[#0b1d3a] leading-relaxed">
                        <span className="font-semibold block text-[#5b7cf0] text-xs uppercase tracking-wider mb-1 font-mono">
                          Plain-English Problem &amp; Solution
                        </span>
                        The model was being sent 200 KB of raw rules and catalog data on every turn. I built an AST-sliced schema (TOON) that sent only the 10–20 fields that mattered, cutting token costs by 96% with zero schema breaks in production.
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-display text-base font-semibold text-[#0b1d3a]">
                          How the 3-Front Compression Pipeline Works
                        </h4>
                        <ul className="space-y-3 text-sm text-[#3e4d68]">
                          <li>
                            <strong className="text-[#0b1d3a]">1. Surgical Pre-Pass (Python):</strong> Isolates only the 10 to 20 steps with active conditional rules; 95% of inert UI steps are stripped before the prompt is assembled.
                          </li>
                          <li>
                            <strong className="text-[#0b1d3a]">2. Task-Oriented Object Notation (TOON):</strong> A compact tabular serialization format that converts repetitive JSON object arrays into pipe-delimited header rows, stripping 60% of redundant brackets and keys before sending to the model.
                          </li>
                          <li>
                            <strong className="text-[#0b1d3a]">3. Deterministic AST Schema Salvage:</strong> An Abstract Syntax Tree (AST) recovery parser that intercepts malformed model outputs (dropped closing braces, trailing commas, truncated strings) and safely repairs them into valid JSON schemas with no unhandled parser crashes in production.
                          </li>
                          <li>
                            <strong className="text-[#0b1d3a]">4. O(1) Index Maps &amp; Cycle Detection:</strong> Pre-computes bidirectional lookup maps and runs 3-color graph traversal to prevent recursive infinite loops across 255+ conditional steps.
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

                      {/* Connection to How I Think */}
                      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#3e4d68]">
                        <span>Connects to How I Think: <strong>Step 02 (Wrap in checks) &amp; Step 04 (Ship calmly)</strong></span>
                        <a
                          href="#how-i-think"
                          onClick={() => setOpenDrawer(null)}
                          className="font-mono text-[#5b7cf0] font-semibold hover:underline"
                        >
                          View Thinking Model &rarr;
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Plain-English Problem & Solution Summary */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-[#0b1d3a] leading-relaxed">
                        <span className="font-semibold block text-[#5b7cf0] text-xs uppercase tracking-wider mb-1 font-mono">
                          Plain-English Problem &amp; Solution
                        </span>
                        Started from vague requirements in city agency meetings and built the platform from scratch over six roadmap phases, collaborating with city officials and NVIDIA engineers. I watched residents use it in person and changed the product based on what I saw.
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-display text-base font-semibold text-[#0b1d3a]">
                          0-to-1 Architecture &amp; Stakeholder Leadership
                        </h4>
                        <ul className="space-y-3 text-sm text-[#3e4d68]">
                          <li>
                            <strong className="text-[#0b1d3a]">1. Built the Entire Platform from Scratch:</strong> Architected the system from whiteboard prototype to multi-tenant production across 6 roadmap phases. Designed the multi-agent orchestration runtime, state management, and production APIs without legacy scaffolding.
                          </li>
                          <li>
                            <strong className="text-[#0b1d3a]">2. City Meetings &amp; Civic Agency Alignment:</strong> Attended and presented in live city agency meetings. Translated municipal regulations and non-technical stakeholder concerns into clear schema boundaries and automated fallback gates.
                          </li>
                          <li>
                            <strong className="text-[#0b1d3a]">3. NVIDIA Alignment &amp; Model Hosting:</strong> Partnered with NVIDIA engineers and city officials to validate GPU acceleration pipelines. Parallel DAG execution cut round-trip orchestration latency by 40% with 99.98% platform uptime.
                          </li>
                          <li>
                            <strong className="text-[#0b1d3a]">4. Concurrency Hardening (Redis Mutex):</strong> Integrated distributed locks granting millisecond-level exclusive execution locks across parallel agent workers, preventing duplicate execution and race conditions under spike traffic.
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-[#0b1d3a] p-5 font-mono text-xs text-slate-200 space-y-2.5">
                        <div className="text-[#2fe0d0] font-semibold flex items-center justify-between">
                          <span># Production Delivery &amp; Stakeholder Telemetry</span>
                          <span className="text-[#2fe0d0]">NVIDIA COLLABORATION</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-1.5">
                          <span>0 → 1 Architecture Delivery</span>
                          <span className="text-[#2fe0d0]">6 ROADMAP PHASES SHIPPED</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-1.5">
                          <span>City Agency Alignment</span>
                          <span className="text-[#2fe0d0]">REVIEWED WITH CITY STAFF</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-1.5">
                          <span>Parallel DAG Scheduling</span>
                          <span className="text-[#2fe0d0]">40% TURN LATENCY DROP</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-1.5">
                          <span>Concurrency Mutex (Redis)</span>
                          <span className="text-[#2fe0d0]">0 LOCK CONFLICTS</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Multi-Turn City Pilots</span>
                          <span className="text-[#2fe0d0]">0 STATE REGRESSIONS</span>
                        </div>
                      </div>

                      {/* Connection to How I Think */}
                      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#3e4d68]">
                        <span>Connects to How I Think: <strong>Step 01 (Assume it fails) &amp; Step 05 (Build with users)</strong></span>
                        <a
                          href="#how-i-think"
                          onClick={() => setOpenDrawer(null)}
                          className="font-mono text-[#5b7cf0] font-semibold hover:underline"
                        >
                          View Thinking Model &rarr;
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
