'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

type DailyPractice = {
  id: string;
  time: string;
  phase: string;
  title: string;
  workflow: string;
  whereItFailed: string;
  codeSnippet: string;
  tag: string;
};

const DAILY_PRACTICES: DailyPractice[] = [
  {
    id: 'ownership',
    time: 'Rule 01',
    phase: 'Human Ownership',
    title: 'I Make the Architecture Decisions, AI Drafts',
    workflow:
      'AI generates alternatives, drafts repetitive boilerplate, and suggests implementations. I write the system invariants, evaluate operational trade-offs, and make the authoritative commit decision.',
    whereItFailed:
      'An agent quietly replaced a custom exponential backoff retry handler with a naive setInterval loop that stalled under rate limits. Caught in my manual diff review before merge.',
    codeSnippet: `// Human Gate: Review Invariants First
export async function approveMerge(pr: PullRequest) {
  // Never delegate schema migrations or auth boundaries
  const isHighRisk = pr.files.some(f => 
    f.startsWith('auth/') || f.startsWith('migrations/')
  );
  if (isHighRisk) {
    return requireSeniorEngineerSignoff(pr);
  }
  return runStrictTestSuite(pr);
}`,
    tag: 'Rule 01 · Review First',
  },
  {
    id: 'context',
    time: 'Practice 02',
    phase: 'Context Slicing',
    title: 'Slicing Context: Senders, Receivers & Types Only',
    workflow:
      'Instead of pasting several whole files into a chat window, I send only the target function I’m changing, its immediate imports, and its callers. The model focuses on the exact blast radius without "lost in the middle" attention drift.',
    whereItFailed:
      'Pasting several full files once led the model to miss a subtle null-coercion bug 300 lines down. Restricting input to the target symbol interface eliminated the hallucinations.',
    codeSnippet: `// Slicing: target interface & immediate callers
const slice = await astContext.sliceSymbol({
  target: 'validateTransactionGraph',
  includeTypes: true,
  callerDepth: 1, // immediate callers only
});
// 3 files reduced to 42 lines of type interfaces`,
    tag: 'Practice 02 · Target Blast Radius',
  },
  {
    id: 'routing',
    time: 'Practice 03',
    phase: 'Model Routing',
    title: 'Matching the Model to the Complexity',
    workflow:
      'I use lightweight, sub-second models for regex, CSS tweaks, repetitive unit mocks, and docstrings. Frontier reasoning models are reserved strictly for cyclic state machines, schema migrations, and security boundaries.',
    whereItFailed:
      'I tasked a lightweight model with refactoring a multi-step billing state transition. It invented non-existent intermediate states; I had to escalate to a reasoning model with an explicit planning pass.',
    codeSnippet: `// Triage based on blast radius & state depth
function selectModel(task: EngineeringTask): ModelTier {
  if (task.touchesStateMachines || task.isSecurityBoundary) {
    return 'frontier_reasoning_model'; // Deep validation
  }
  return 'fast_subsecond_model'; // Quick drafts
}`,
    tag: 'Practice 03 · Right Tool, Right Job',
  },
  {
    id: 'redteam',
    time: 'Practice 04',
    phase: 'Red-Teaming',
    title: 'Using AI to Break My Own Assumptions',
    workflow:
      'Engineers naturally write unit tests that confirm what they already built. Before opening a PR, I prompt an adversarial agent specifically to generate nasty payloads: null fields, Unicode boundary cases, and out-of-order webhooks.',
    whereItFailed:
      'The model generated "tests" that passed by mutating assertions to match its own faulty output. I now treat assertion contracts as immutable and only let the model generate input payloads.',
    codeSnippet: `// Adversarial Input Fuzzing
for (const attack of fuzzer.generateEdgeCases(schema)) {
  const result = await endpoint.handle(attack.payload);
  // Boundary check: must fail gracefully with 422, never 500
  expect(result.status).not.toBe(500);
}`,
    tag: 'Practice 04 · Adversarial Stress Test',
  },
  {
    id: 'tests',
    time: 'Practice 05',
    phase: 'Continuous Tests',
    title: 'Closed-Loop Test Fixture Updates',
    workflow:
      'When core API contracts evolve, dozens of legacy test mocks break simultaneously. I run a loop where the test runner feeds failing mock diffs to a model to update the fixtures, while keeping assertions strictly locked.',
    whereItFailed:
      'A model once "fixed" a failing test by commenting out the assertion rather than repairing the mock fixture. I now run CI checks that fail if assertions are modified in automated passes.',
    codeSnippet: `// Auto-Repair Mock Fixtures, Lock Assertions
while (!testSuite.passed() && attempts < 3) {
  const diff = testSuite.getMockMismatch();
  await fixtureRepair.updateMocksOnly(diff); // assertions locked
  testSuite.rerun();
}`,
    tag: 'Practice 05 · Fixture Repair',
  },
];

export default function HowIUseAIDaily() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = DAILY_PRACTICES[activeStepIndex];

  // Scroll Parallax Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.25 });
  const bgGridY = useTransform(smoothProgress, [0, 1], [-80, 80]);

  return (
    <section
      ref={sectionRef}
      id="daily-ai"
      className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24 relative"
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#5b7cf0]" />
            <span className="font-sans text-[13px] sm:text-[14px] font-medium text-[#5b7cf0] uppercase tracking-wider">
              Daily Engineering Practice
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#0b1d3a] tracking-tight">
            How I use AI day to day.
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#3e4d68] max-w-2xl leading-relaxed">
            I treat AI like a fast junior engineer: it drafts, I review. Here’s a normal day, including where it gets things wrong.
          </p>
        </div>

        {/* Distinct Light/Frosted Card Layout */}
        <div className="rounded-3xl bg-white/90 border border-slate-200/90 p-6 sm:p-10 shadow-[0_20px_50px_rgba(11,29,58,0.06)] relative overflow-hidden backdrop-blur-md">
          {/* Subtle Parallax Background Grid */}
          <motion.div
            style={{ y: bgGridY }}
            className="pointer-events-none absolute -inset-10 opacity-30 bg-[linear-gradient(to_right,#5b7cf015_1px,transparent_1px),linear-gradient(to_bottom,#5b7cf015_1px,transparent_1px)] bg-[size:36px_36px]"
          />

          {/* Step Timeline Navigation Pills */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1">
            {DAILY_PRACTICES.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#0b1d3a] border-[#0b1d3a] text-white shadow-md scale-[1.02]'
                      : 'bg-white/80 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-white/15 text-[#2fe0d0]' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {step.time}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold leading-tight line-clamp-1 mt-1">
                    {step.phase}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 grid gap-8 lg:grid-cols-12 items-start"
            >
              {/* Left Column (7 Cols): The Practice & The Failure Story */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#5b7cf0]/10 text-[#5b7cf0] border border-[#5b7cf0]/20 font-bold">
                    {activeStep.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0b1d3a] leading-snug">
                  {activeStep.title}
                </h3>

                {/* How I use it */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-[#1d2f4f] space-y-1">
                  <span className="font-mono font-bold text-[#0b1d3a] uppercase text-xs block">
                    How I execute day to day
                  </span>
                  <p className="leading-relaxed text-[#3e4d68]">{activeStep.workflow}</p>
                </div>

                {/* Where it went wrong (Honest Engineering Judgment) */}
                <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/30 text-sm text-slate-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-amber-800 uppercase text-xs">
                    <span>⚠️</span>
                    <span>Where AI got it wrong &amp; how I caught it</span>
                  </div>
                  <p className="leading-relaxed text-slate-700 text-xs sm:text-sm font-medium">
                    {activeStep.whereItFailed}
                  </p>
                </div>
              </div>

              {/* Right Column (5 Cols): Real Grounded Code Pattern */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-600 px-1 font-semibold">
                  <span>Actual Production Pattern</span>
                  <span className="text-[#5b7cf0]">TypeScript / Python</span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#060c18] p-4 font-mono text-xs text-[#2fe0d0] overflow-x-auto shadow-lg leading-relaxed max-w-full">
                  <pre className="whitespace-pre overflow-x-auto">{activeStep.codeSnippet}</pre>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
