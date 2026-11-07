'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TiltCard3D } from '@/components/ReactBits3D';
import { PrincipleMicroLottie } from '@/components/LottieVectorVisuals';
import { HaldenButton, HaldenFadeUp, HaldenLetterReveal } from '@/components/HaldenMotion';

type NoteItem = {
  number: string;
  lottieType: 'shield' | 'parallel' | 'check';
  tag: string;
  title: string;
  outcome: string;
  simpleSummary: string;
  techTitle: string;
  techDetails: string[];
  codeSnippet: string;
};

const notes: NoteItem[] = [
  {
    number: '01',
    lottieType: 'shield',
    tag: 'Zero Crashes',
    title: 'Strict safety checks around every AI step',
    outcome: 'Zero crashes across 255+ steps',
    simpleSummary:
      'AI models can be unpredictable. I wrap every AI response in automated validation rules so bad formatting never crashes the app or corrupts customer data.',
    techTitle: 'Deterministic Pre/Post Guards & AST Schema Salvage',
    techDetails: [
      'Deterministic AST and regex salvage layer automatically repairs malformed JSON outputs without costly LLM retries.',
      'Three-color DFS cycle detection validates dependency graphs prior to runtime execution.',
      'Strict Pydantic and TypeScript schema contracts enforce 100% type safety before database writes.',
    ],
    codeSnippet: `# Deterministic Guardrail Pipeline
raw_output = await llm.generate(prompt)
validated = ast_salvage_parser.repair_and_verify(raw_output, schema=ContractSchema)
assert graph_validator.has_no_cycles(validated.routing_rules)`,
  },
  {
    number: '02',
    lottieType: 'parallel',
    tag: '40% Faster',
    title: 'Running AI tasks in parallel instead of waiting in line',
    outcome: '40% faster response times',
    simpleSummary:
      'Running 20+ AI steps one after another makes users wait 40 seconds. I run independent steps at the same time so complex workflows finish in seconds.',
    techTitle: '22-Node Asynchronous LangGraph State Machine',
    techDetails: [
      'Replaced blocking sequential chains with a 22-node LangGraph StateGraph.',
      'Scheduled independent I/O and tool-use branches concurrently via Python asyncio.gather.',
      'Used Redis distributed locks and request-collapsing middleware to prevent race conditions under peak load.',
    ],
    codeSnippet: `# Parallel Node Execution (40% Latency Reduction)
results = await asyncio.gather(
    scouter_agent.audit_okta_seats(contract_id),
    ingestion_agent.extract_renewal_clauses(pdf_bytes),
    compliance_agent.verify_fiduciary_rules(entity_id),
)`,
  },
  {
    number: '03',
    lottieType: 'check',
    tag: '95%+ Accuracy',
    title: 'Testing updates against 100+ real examples before launch',
    outcome: 'Zero false positives in production',
    simpleSummary:
      'Before any AI update goes live to customers, my automated test suite grades it against 100+ real world edge cases to guarantee accuracy never drops.',
    techTitle: 'Golden-Dataset A/B Evaluation & Regression Gating',
    techDetails: [
      'Curated 100+ ground-truth financial and civic test suites covering 5 to 6 level nested email forwards.',
      'Automated CI regression gate blocks any prompt or model change scoring below 95% field agreement.',
      'Eliminated 100% of nested thread misclassifications (8/8 adversarial edge cases resolved).',
    ],
    codeSnippet: `# Automated CI Regression Gate
eval_report = golden_harness.run_ab_suite(candidate_model="gpt-5.5", dataset="jpmc_threads_v4")
assert eval_report.field_agreement >= 0.95
assert eval_report.false_positive_rate == 0.0`,
  },
];

export default function EngineeringNotes() {
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);

  return (
    <section id="notes" className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24">
      <div className="space-y-10">
        <HaldenFadeUp>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#0b1d3a]/10 px-4 py-1.5 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span className="mono-accent text-xs tracking-[0.16em] text-[#1d2f4f] uppercase font-semibold">
              HOW I WORK
            </span>
          </div>

          <HaldenLetterReveal
            as="h2"
            mode="scroll"
            spread={0.32}
            segments={[
              { text: 'How I make AI', highlight: false },
              { text: 'fast, safe, and reliable.', highlight: true },
            ]}
            className="font-display text-3xl sm:text-5xl font-normal text-[#0b1d3a] tracking-[-0.03em]"
          />

          <p className="mt-3 text-base text-[#3e4d68]">
            Simple principles backed by deep engineering. Click any card for technical specs.
          </p>
        </HaldenFadeUp>

        <div className="grid gap-6 md:grid-cols-3">
          {notes.map((note, idx) => (
            <HaldenFadeUp key={note.number} delay={idx * 0.1}>
              <article className="h-full">
                <TiltCard3D
                  glareColor="rgba(143, 213, 241, 0.35)"
                  className="spatial-glass rounded-3xl p-6 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-semibold text-[#0b1d3a]">
                        {note.number}
                      </span>
                      <span className="mono-accent text-xs px-3 py-1 rounded-full border border-[#0b1d3a]/10 bg-white/80 text-[#5b7cf0] font-semibold">
                        {note.tag}
                      </span>
                    </div>

                    <PrincipleMicroLottie type={note.lottieType} />

                    <h3 className="font-display text-base sm:text-lg font-semibold text-[#0b1d3a] mb-2">
                      {note.title}
                    </h3>

                    <p className="text-sm text-[#3e4d68] mb-5 leading-relaxed">
                      {note.simpleSummary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#0b1d3a]/8 flex items-center justify-between gap-2">
                    <span className="mono-accent text-xs text-emerald-700 font-semibold">
                      {note.outcome}
                    </span>
                    <HaldenButton onClick={() => setSelectedNote(note)}>
                      Specs
                    </HaldenButton>
                  </div>
                </TiltCard3D>
              </article>
            </HaldenFadeUp>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-end bg-[#0b1d3a]/60 backdrop-blur-md"
            onClick={() => setSelectedNote(null)}
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
                    Engineering Deep Dive &middot; Principle {selectedNote.number}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0b1d3a] mt-1 leading-snug">
                    {selectedNote.techTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNote(null)}
                  aria-label="Close drawer"
                  className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-[#0b1d3a] hover:bg-slate-100 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>

              <ul className="space-y-2.5 text-sm text-[#3e4d68]">
                {selectedNote.techDetails.map(detail => (
                  <li key={detail} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2fe0d0] shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-slate-200 bg-[#0b1d3a] p-4 font-mono text-xs text-[#8fe6f4] overflow-x-auto">
                <pre>{selectedNote.codeSnippet}</pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
