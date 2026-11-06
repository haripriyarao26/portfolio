'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

type StoryProjectGridProps = {
  projects: Project[];
};

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };

const SWARM_NODES = [
  {
    id: 'ingestion',
    step: '01',
    name: 'Ingestion Agent',
    role: 'Contract PDF Parser & Clause Extractor',
    metric: '142 contracts parsed',
    log: '[INGESTION] Extracted renewal window: 64 days remaining | ACV: $148,000 | Auto-renew clause detected.',
  },
  {
    id: 'scouter',
    step: '02',
    name: 'Scouter Agent',
    role: 'Okta Seat Utilization Auditor',
    metric: '64.2% seat utilization (<85%)',
    log: '[SCOUTER] Audited 250 provisioned seats via Okta API -> 161 active / 89 dormant (64.2% < 85% threshold).',
  },
  {
    id: 'drafting',
    step: '03',
    name: 'Drafting Agent',
    role: 'Intervention & Notice Generator',
    metric: 'Non-renewal notice drafted',
    log: '[DRAFTING] Renewal < 90d AND utilization < 85% -> Generated vendor downgrade & non-renewal legal notice.',
  },
];

export default function StoryProjectGrid({ projects }: StoryProjectGridProps) {
  const [activeNode, setActiveNode] = useState<string>('scouter');
  const procureLoop = projects.find(p => p.id === 'procure-loop');
  const ossProjects = projects.filter(
    p => p.id === 'gemini-cookbook' || p.id === 'openai-cookbook-langchain-rwmh'
  );
  const toolProjects = projects.filter(
    p => p.id === 'auto-unit-agent' || p.id === 'dev-log-architect'
  );

  const selectedSwarmNode = SWARM_NODES.find(n => n.id === activeNode) || SWARM_NODES[1];

  return (
    <div className="space-y-12">
      {/* Tier 1: Flagship Swarm & Verified Open Source Contributions */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#E07A5F]" />
          <h3 className="mono-accent text-xs font-semibold text-[#FAF6F0] uppercase tracking-wider">
            Flagship Autonomous Swarm &amp; Verified OSS Contributions
          </h3>
        </div>

        {/* Procure-Loop Hero Card with Interactive LangGraph State Preview */}
        {procureLoop && (
          <motion.article
            key={procureLoop.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="rounded-3xl p-6 sm:p-10 border border-[#E07A5F]/40 bg-[#181818] flex flex-col justify-between transition-colors duration-300"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="mono-accent text-xs font-semibold text-[#E07A5F] tracking-wider uppercase">
                    {procureLoop.category}
                  </span>
                  <span className="text-white/20">&middot;</span>
                  <span className="mono-accent text-xs text-[#F4A261] font-medium">
                    LangGraph Directed State Machine
                  </span>
                </div>
                <span className="mono-accent inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E07A5F]/40 bg-[#1F1F1F] text-xs font-semibold text-[#F4A261]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E07A5F] animate-pulse" />
                  {procureLoop.status}
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-semibold text-[#FAF6F0] mb-3">
                {procureLoop.title}
              </h4>

              <p className="text-sm sm:text-base text-[#B8B0A4] mb-6 max-w-4xl" style={{ textWrap: 'pretty' }}>
                {procureLoop.description}
              </p>

              {/* Interactive Visual Architecture & Live State Machine Preview */}
              <div className="mb-8 rounded-2xl border border-white/10 bg-[#000000] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="mono-accent text-xs font-semibold text-[#FAF6F0] uppercase tracking-wider">
                      Interactive LangGraph State DAG (Click node to inspect state)
                    </span>
                  </div>
                  <span className="mono-accent text-xs text-[#F4A261]">
                    Rule: Renewal &lt; 90d &amp; Seat Use &lt; 85% &rarr; Auto-Draft Notice
                  </span>
                </div>

                {/* 3-Node Visual Graph */}
                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  {SWARM_NODES.map((node, index) => {
                    const isSelected = node.id === activeNode;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setActiveNode(node.id)}
                        className={`text-left rounded-xl p-4 border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isSelected
                            ? 'border-[#E07A5F] bg-[#1F1F1F] shadow-[0_0_20px_rgba(224,122,95,0.2)]'
                            : 'border-white/10 bg-[#181818] hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="mono-accent text-xs font-semibold text-[#E07A5F]">
                            NODE {node.step}
                          </span>
                          <span className="text-xs font-mono text-[#B8B0A4]">
                            {index < 2 ? '→ next' : '✓ terminal'}
                          </span>
                        </div>
                        <div className="font-display text-base font-semibold text-[#FAF6F0]">
                          {node.name}
                        </div>
                        <div className="text-xs text-[#B8B0A4] mt-1">{node.role}</div>
                        <div className="mt-3 pt-2 border-t border-white/10 text-xs font-mono text-[#F4A261]">
                          {node.metric}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Synchronized Monospace Telemetry Stream */}
                <div className="rounded-xl border border-white/10 bg-[#181818] px-4 py-3 font-mono text-xs text-emerald-300 flex items-center justify-between gap-4 overflow-x-auto">
                  <span>{selectedSwarmNode.log}</span>
                  <span className="shrink-0 text-[#B8B0A4]">status: 200 OK</span>
                </div>
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {procureLoop.tech.map(tech => (
                  <span
                    key={`${procureLoop.id}-${tech}`}
                    className="inline-block rounded-full border border-white/15 bg-[#1F1F1F] px-3 py-1 text-xs text-[#FAF6F0] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Key Architecture Features */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6 pt-5 border-t border-white/10">
                {procureLoop.features.map(feature => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#E07A5F] flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-[#B8B0A4]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
              {procureLoop.github && (
                <a
                  href={procureLoop.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E07A5F] hover:bg-[#E8886E] px-5 py-2.5 text-sm font-semibold text-[#0E0D13] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
                >
                  <span>Inspect Procure-Loop Repository</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </motion.article>
        )}

        {/* 2 Official OSS PRs */}
        <div className="grid gap-6 md:grid-cols-2">
          {ossProjects.map(project => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring}
              className="rounded-3xl p-6 sm:p-8 border border-white/15 bg-[#181818] flex flex-col justify-between hover:border-[#E07A5F]/50 transition-colors duration-300"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="mono-accent text-xs font-semibold text-[#E07A5F] tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="mono-accent inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-[#1F1F1F] text-xs font-semibold text-[#FAF6F0]">
                    {project.status}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-semibold text-[#FAF6F0] mb-3">
                  {project.title}
                </h4>

                <p className="text-sm text-[#B8B0A4] mb-5">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(tech => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="inline-block rounded-full border border-white/10 bg-[#1F1F1F] px-3 py-1 text-xs text-[#FAF6F0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Points */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#B8B0A4] mb-6">
                  {project.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#E07A5F] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Links */}
              <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#1F1F1F] px-4 py-2 text-xs font-semibold text-[#FAF6F0] hover:border-[#E07A5F]/50 hover:text-[#F4A261] transition-colors duration-300"
                  >
                    <span>View Pull Request on GitHub</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Tier 2: Developer Tools & Extensions */}
      <div className="pt-8 border-t border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-[#B8B0A4]" />
          <h3 className="mono-accent text-xs font-semibold text-[#FAF6F0] uppercase tracking-wider">
            Developer Tooling &amp; Agent Frameworks
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {toolProjects.map(project => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring}
              className="rounded-2xl p-6 sm:p-7 border border-white/10 bg-[#181818] hover:border-white/20 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="mono-accent text-xs text-[#B8B0A4] uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                </div>
                <h4 className="font-display text-lg font-semibold text-[#FAF6F0] mb-2">
                  {project.title}
                </h4>
                <p className="text-sm text-[#B8B0A4] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="mono-accent rounded-md bg-[#1F1F1F] border border-white/10 px-2.5 py-1 text-xs text-[#B8B0A4]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#FAF6F0] hover:text-[#F4A261] transition-colors duration-300"
                  >
                    <span>GitHub Repository</span>
                    <span>↗</span>
                  </a>
                )}
                {project.links?.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#FAF6F0] hover:text-[#F4A261] transition-colors duration-300"
                  >
                    <span>{link.label}</span>
                    <span>↗</span>
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
