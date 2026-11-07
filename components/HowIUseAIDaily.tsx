'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

type DailySessionStep = {
  time: string;
  phase: string;
  title: string;
  action: string;
  problem: string;
  workflow: string;
  provableMetric: string;
  badge: string;
  codeSnippet: string;
};

const DAILY_SESSION: DailySessionStep[] = [
  {
    time: '09:15 AM',
    phase: 'Context Slicing',
    title: 'AST Context Sandboxing & MCP Slicing',
    action: 'Filter Raw Monorepo to Target AST Bounds',
    problem:
      'Dumping entire unindexed repositories into prompts causes "lost-in-the-middle" attention degradation, context amnesia, and runaway token bills.',
    workflow:
      'I use tree-sitter AST parsers and Model Context Protocol (MCP) servers to extract only the target function signature, immediate imports, and type definitions. Instead of flooding the model with 200MB of repository noise, the prompt receives a precise 4KB context slice.',
    provableMetric: '200MB Repo → 4KB AST Slice (96% Token Cut)',
    badge: 'AST Sandboxing',
    codeSnippet: `// tree-sitter AST Context Slicer
const astNode = await mcpServer.sliceTargetContext({
  repoRoot: '/apps/engine',
  targetSymbol: 'validateRiskGraph',
  includeCallGraphDepth: 1, // only immediate callers
});
// Payload: 4,120 bytes (down from 204 MB)`,
  },
  {
    time: '11:30 AM',
    phase: 'Model Routing',
    title: 'Tiered Intelligence Routing (Fast Model vs Frontier Model)',
    action: 'Deterministic <15ms Pre-Flight Task Triage',
    problem:
      'Over-provisioning frontier reasoning models on boilerplate and unit tests burns quota; using lightweight models for complex state machines causes silent logic bugs.',
    workflow:
      'A deterministic pre-flight engine (<15ms) inspects the task intent, blast radius, and AST depth. Simple scaffolding, CSS, and regex are routed to a fast sub-second model. Deep invariant architecture, security boundaries, and state machines are reserved strictly for a frontier reasoning model.',
    provableMetric: '<15ms Pre-Flight SLA · 0 Triage Token Cost',
    badge: 'Tiered Routing',
    codeSnippet: `// Deterministic Pre-Flight Scorer (<15ms)
const score = preFlightScorer.evaluate({
  intent: task.intent,       // 0-35
  blastRadius: diff.files,   // 0-30
  astComplexity: node.depth, // 0-20
});
const tier = score > 65 ? 'frontier_reasoning_model' : 'fast_subsecond_model';`,
  },
  {
    time: '02:45 PM',
    phase: 'Adversarial Fuzzing',
    title: 'Autonomous Red-Teaming (The Adversarial Junior)',
    action: 'Aggressive Edge-Case Stress Testing Before Review',
    problem:
      'Engineers naturally write tests that confirm their own assumptions, leaving edge cases and type coercions undetected until staging.',
    workflow:
      'Before opening a PR, an autonomous adversarial agent attacks the implementation. It injects null values, Unicode boundary edge cases, malformed schemas, and adversarial payloads to verify that Pydantic/TypeScript contracts fail gracefully rather than crashing.',
    provableMetric: 'Zero Unhandled Parser Crashes in CI',
    badge: 'Adversarial Sentry',
    codeSnippet: `// Adversarial Red-Team Fuzzing Suite
for (const attack of adversarialSuite.generateVariants(schema)) {
  const result = await guardrailPipeline.test(attack.payload);
  assert(result.isHandled, \`Unhandled crash on: \${attack.name}\`);
}`,
  },
  {
    time: '04:10 PM',
    phase: 'Automated Evals',
    title: 'Self-Healing Test Cycles & Fixture Repair',
    action: 'Continuous Feedback Loops Mutating Test Fixtures',
    problem:
      'Refactoring core schema types manually breaks dozens of legacy test mocks and fixtures, stalling velocity.',
    workflow:
      'A continuous test runner feeds failing assertions back to a fast model in a closed loop. The model mutates fixtures and mocks to match the new schema contracts without altering the underlying assertions until the test suite passes with 95%+ coverage.',
    provableMetric: 'Automated Fixture Repair · 0 Manual Mock Drift',
    badge: 'Self-Healing Evals',
    codeSnippet: `// Closed-Loop Test Fixture Repair
while (!testSuite.passed() && attempts < 3) {
  const failure = testSuite.getFailureTelemetry();
  await testFixer.mutateFixture(failure.file, failure.diff);
  testSuite.rerun();
}`,
  },
  {
    time: '05:30 PM',
    phase: 'Human Ownership',
    title: 'Architectural Control & Final Sign-Off',
    action: 'Evaluating Trade-Offs & Signing Off on the Merge',
    problem:
      'Unchecked agent autonomy leads to architectural drift, bloated dependencies, and subtle regulatory compliance violations.',
    workflow:
      'AI acts as a tireless junior team producing 3 concrete architectural options with pros and cons. As the lead engineer, I evaluate the operational trade-offs, verify latency and regulatory invariants, and make the authoritative merge decision.',
    provableMetric: '0 State Desyncs · Full Human Ownership',
    badge: 'Human in the Loop',
    codeSnippet: `// Final Merge Gate & Invariant Check
const architecturalReview = await signoffGate.verify({
  author: 'Haripriya Rao',
  compliancePassed: true,
  zeroStateDesyncVerified: true,
});
await git.merge(prNumber, { mode: 'squash' });`,
  },
];

export default function HowIUseAIDaily() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = DAILY_SESSION[activeStepIndex];

  // Scroll Parallax Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.25 });
  const bgGridY = useTransform(smoothProgress, [0, 1], [-120, 120]);
  const codeEditorParallaxY = useTransform(smoothProgress, [0, 1], [30, -30]);
  const floatPillY = useTransform(smoothProgress, [0, 1], [-60, 60]);

  return (
    <section
      ref={sectionRef}
      id="daily-ai"
      className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-24 scroll-mt-24 relative"
    >
      {/* Floating Parallax Depth Pill */}
      <motion.div
        style={{ y: floatPillY }}
        className="hidden xl:flex absolute -right-4 top-36 z-20 items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#091224]/90 border border-teal-400/40 shadow-[0_0_20px_rgba(45,212,191,0.25)] backdrop-blur-md text-xs font-mono text-teal-300 pointer-events-none"
      >
        <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-ping" />
        <span>Production AI Harness</span>
      </motion.div>

      <div className="space-y-10">
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-cyan-500/40 px-4 py-1.5 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2dd4bf] animate-ping" />
            <span className="font-mono text-xs tracking-[0.16em] text-cyan-300 uppercase font-semibold">
              DAILY PRODUCTION WORKFLOW
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0b1d3a] tracking-tight">
            How I use AI daily:{' '}
            <span className="text-[#0d9488]">A real engineering session.</span>
          </h2>

          <p className="mt-3 text-base text-[#3e4d68] max-w-3xl leading-relaxed">
            I don’t treat AI as an autocomplete toy or an unchecked oracle. I use it as an adversarial junior team with strict architectural boundaries. Here is what an actual production engineering session looks like from morning context slicing to evening sign-off.
          </p>
        </div>

        {/* Interactive Session Timeline Card */}
        <div className="rounded-3xl bg-[#060c18] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl text-white relative overflow-hidden">
          {/* Parallax Moving Background Grid */}
          <motion.div
            style={{ y: bgGridY }}
            className="pointer-events-none absolute -inset-20 opacity-25 bg-[linear-gradient(to_right,#38bdf825_1px,transparent_1px),linear-gradient(to_bottom,#38bdf825_1px,transparent_1px)] bg-[size:48px_48px]"
          />

          {/* Step Timeline Navigation Pills */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
            {DAILY_SESSION.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={step.time}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.35)] scale-[1.02]'
                      : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-cyan-500/40 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-cyan-500/30 text-cyan-200' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {step.time}
                    </span>
                  </div>
                  <div className="text-xs font-bold leading-tight line-clamp-1 mt-1">
                    {step.phase}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-300 mt-1 truncate">
                    {step.badge}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.time}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 grid gap-8 lg:grid-cols-12 items-start"
            >
              {/* Left Column (7 Cols): Narrative & Workflow */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold">
                    {activeStep.time} &middot; {activeStep.phase}
                  </span>
                  <span className="font-mono text-xs text-teal-300 font-semibold">
                    {activeStep.provableMetric}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                  {activeStep.title}
                </h3>

                {/* Problem Statement */}
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs text-slate-200 space-y-1">
                  <span className="font-mono font-bold text-rose-300 uppercase text-[10px]">
                    The Engineering Challenge
                  </span>
                  <p className="leading-relaxed">{activeStep.problem}</p>
                </div>

                {/* Production Workflow */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 space-y-1">
                  <span className="font-mono font-bold text-teal-300 uppercase text-[10px]">
                    How I Execute In Production
                  </span>
                  <p className="leading-relaxed text-slate-300">{activeStep.workflow}</p>
                </div>
              </div>

              {/* Right Column (5 Cols): Live Production Code Pattern with Parallax Elevation */}
              <motion.div style={{ y: codeEditorParallaxY }} className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <span>Production Code Pattern</span>
                  <span className="text-cyan-300">TypeScript / Python</span>
                </div>

                <div className="rounded-2xl border border-white/15 bg-black/80 p-4 font-mono text-xs text-cyan-200 overflow-x-auto shadow-inner leading-relaxed">
                  <pre>{activeStep.codeSnippet}</pre>
                </div>

                <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Verifiable Spec:</span>
                  <span className="text-teal-300 font-bold">{activeStep.provableMetric}</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

