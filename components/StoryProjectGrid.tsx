'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

type StoryProjectGridProps = {
  projects: Project[];
};

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };

export default function StoryProjectGrid({ projects }: StoryProjectGridProps) {
  const procureLoop = projects.find(p => p.id === 'procure-loop');
  const ossProjects = projects.filter(
    p => p.id === 'gemini-cookbook' || p.id === 'openai-cookbook-langchain-rwmh'
  );
  const toolProjects = projects.filter(
    p => p.id === 'auto-unit-agent' || p.id === 'dev-log-architect'
  );

  return (
    <div className="space-y-12">
      {/* Tier 1: Flagship Swarm & Verified Open Source Contributions */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E07A5F]" />
          <h3 className="mono-accent text-xs font-bold text-[#FAF6F0] uppercase tracking-wider">
            Flagship Autonomous Swarm &amp; Verified OSS Contributions
          </h3>
        </div>

        {/* Procure-Loop Hero Card */}
        {procureLoop && (
          <motion.article
            key={procureLoop.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="card p-7 sm:p-9 border border-[#E07A5F]/40 bg-gradient-to-br from-[#E07A5F]/[0.05] via-[#131217] to-[#131217] rounded-3xl flex flex-col justify-between hover:border-[#E07A5F]/70 transition-all hover:shadow-[0_20px_60px_rgba(224,122,95,0.18)]"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="mono-accent text-[11px] font-bold text-[#E07A5F] tracking-wider uppercase">
                    {procureLoop.category}
                  </span>
                  <span className="text-white/20">&middot;</span>
                  <span className="mono-accent text-[11px] text-[#F4A261] font-semibold">
                    System Design &amp; Live UI
                  </span>
                </div>
                <span className="mono-accent inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E07A5F]/40 bg-[#E07A5F]/15 text-[11px] font-bold text-[#F4A261]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E07A5F] animate-pulse" />
                  {procureLoop.status}
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6F0] leading-snug mb-3">
                {procureLoop.title}
              </h4>

              <p className="text-sm sm:text-base leading-relaxed text-[#A69F94] mb-6 max-w-4xl">
                {procureLoop.description}
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {procureLoop.tech.map(tech => (
                  <span
                    key={`${procureLoop.id}-${tech}`}
                    className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#FAF6F0]/90 font-medium"
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
                    <span className="text-xs sm:text-sm text-[#A69F94] leading-relaxed">{feature}</span>
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
                  className="inline-flex items-center gap-2 rounded-full border border-[#E07A5F]/50 bg-[#E07A5F]/20 px-5 py-2.5 text-xs font-bold text-[#F4A261] hover:bg-[#E07A5F]/30 transition-all shadow-[0_0_20px_rgba(224,122,95,0.2)]"
                >
                  <span>Explore Repository &amp; Architecture</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </motion.article>
        )}

        {/* 2 Official OSS PRs */}
        <div className="grid gap-6 md:grid-cols-2">
          {ossProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring}
              className="card p-7 sm:p-8 border border-white/15 bg-[#131217] rounded-3xl flex flex-col justify-between hover:border-[#E07A5F]/50 transition-all"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="mono-accent text-[11px] font-bold text-[#E07A5F] tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="mono-accent inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold text-[#FAF6F0]">
                    {project.status}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-[#FAF6F0] leading-snug mb-3">
                  {project.title}
                </h4>

                <p className="text-sm leading-relaxed text-[#A69F94] mb-5">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(tech => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[#FAF6F0]/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Points */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#A69F94] mb-6">
                  {project.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#E07A5F] flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
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
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-[#FAF6F0] hover:border-[#E07A5F]/40 hover:text-[#F4A261] transition-all"
                  >
                    <span>View Pull Request</span>
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
          <span className="h-1.5 w-1.5 rounded-full bg-[#A69F94]" />
          <h3 className="mono-accent text-xs font-bold text-[#FAF6F0] uppercase tracking-wider">
            Developer Tooling &amp; Agent Frameworks
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {toolProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring}
              className="card p-6 sm:p-7 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="mono-accent text-[10px] text-[#A69F94] uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold text-[#FAF6F0] mb-2 leading-snug">
                  {project.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#A69F94] leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map(tech => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="mono-accent rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] text-[#A69F94]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#FAF6F0]/90 hover:text-[#E07A5F] transition-colors"
                  >
                    <span>GitHub</span>
                    <span>↗</span>
                  </a>
                )}
                {project.links?.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#FAF6F0]/90 hover:text-[#E07A5F] transition-colors"
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
