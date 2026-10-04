'use client';

import { motion } from 'framer-motion';
import Section3D from '@/components/Section3D';

const spring = { type: 'spring' as const, stiffness: 100, damping: 28 };

const notes = [
  {
    number: '01',
    title: 'Deterministic Guardrails Wrap Stochastic Models',
    subtitle: 'System Invariants & Schema Safety',
    content:
      'Prompt engineering alone cannot guarantee 100% schema correctness in production. Rather than hoping temperature=0 eliminates hallucinations, I architect deterministic pre- and post-processing layers — AST validation, regex salvage parsers, and graph coloring cycle detectors — to guarantee structural safety before any database write.',
    tag: 'LLM Reliability',
  },
  {
    number: '02',
    title: 'Async DAG Scheduling Over Linear Chains',
    subtitle: 'Eliminating Compounding Latency',
    content:
      'Sequential tool-calling chains compound round-trip latencies into 20–40s turn delays. Rebuilding orchestrators as 22-node LangGraph state machines with asyncio.gather parallel batching converts blocking sequential round trips into a single unified fetch, cutting per-turn orchestrator latency by 40%.',
    tag: 'Distributed Orchestration',
  },
  {
    number: '03',
    title: 'Golden Datasets Beat Generic Benchmarks',
    subtitle: 'Domain Evals & Adversarial Gating',
    content:
      'Public benchmarks offer zero visibility into domain-specific edge cases like 5–6 level nested forward chains. Curating internal golden datasets with adversarial test fixtures allows continuous A/B regression scoring, catching field mismatches and eliminating false positives before deployment.',
    tag: 'Evaluation Frameworks',
  },
];

export default function EngineeringNotes() {
  return (
    <Section3D id="notes" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="mb-10"
      >
        <p className="mono-accent text-xs tracking-[0.22em] text-[#E07A5F] uppercase mb-2">
          Architecture Principles
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#FAF6F0] tracking-tight">
          How I Think About Systems
        </h2>
        <p className="mt-3 text-base text-[#A69F94] max-w-2xl">
          Core architectural heuristics and lessons learned from scaling production multi-agent systems and enterprise LLM pipelines.
        </p>
      </motion.div>

      {/* 3 Notes Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {notes.map((note, idx) => (
          <motion.article
            key={note.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: idx * 0.1 }}
            className="card p-6 sm:p-7 border border-white/10 hover:border-[#E07A5F]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-bold text-[#E07A5F]">
                  {note.number}
                </span>
                <span className="mono-accent text-[10px] px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[#A69F94] uppercase tracking-wider">
                  {note.tag}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#FAF6F0] leading-snug mb-2">
                {note.title}
              </h3>
              <p className="text-xs font-semibold text-[#F4A261] mb-3">
                {note.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-[#A69F94] leading-relaxed">
                {note.content}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section3D>
  );
}
