'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

type StoryProjectGridProps = {
  projects: Project[];
};

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };

export default function StoryProjectGrid({ projects }: StoryProjectGridProps) {
  const ossProjects = projects.filter(
    p => p.id === 'gemini-cookbook' || p.id === 'openai-cookbook-langchain-rwmh'
  );
  const sideProjects = projects.filter(
    p => p.id !== 'gemini-cookbook' && p.id !== 'openai-cookbook-langchain-rwmh'
  );

  return (
    <div className="space-y-12">
      {/* Tier 1: Featured Open Source Contributions */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E07A5F]" />
          <h3 className="mono-accent text-xs font-bold text-[#FAF6F0] uppercase tracking-wider">
            Featured Open Source Contributions &amp; Security Mitigations
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {ossProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring}
              className="card p-7 sm:p-8 border border-[#E07A5F]/35 bg-[#E07A5F]/[0.02] rounded-3xl flex flex-col justify-between hover:border-[#E07A5F]/60 transition-all hover:shadow-[0_20px_60px_rgba(224,122,95,0.15)]"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="mono-accent text-[11px] font-bold text-[#E07A5F] tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="mono-accent inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#E07A5F]/40 bg-[#E07A5F]/15 text-[11px] font-bold text-[#F4A261]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E07A5F] animate-pulse" />
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
                    className="inline-flex items-center gap-2 rounded-full border border-[#E07A5F]/40 bg-[#E07A5F]/15 px-4 py-2 text-xs font-bold text-[#F4A261] hover:bg-[#E07A5F]/25 transition-all"
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

      {/* Tier 2: Prototypes & Developer Tooling */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A69F94]" />
          <h3 className="mono-accent text-xs font-bold text-[#FAF6F0] uppercase tracking-wider">
            Agentic Prototypes &amp; Developer Tools
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {sideProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={spring}
              className="card p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="mono-accent text-[10px] text-[#A69F94] uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-[#FAF6F0] mb-2 leading-snug">
                  {project.title}
                </h4>
                <p className="text-xs text-[#A69F94] leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map(tech => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="mono-accent rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] text-[#A69F94]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
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
