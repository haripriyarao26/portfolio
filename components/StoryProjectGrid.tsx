'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

type StoryProjectGridProps = {
  projects: Project[];
};

const gradients = [
  'from-cyan-500/10 via-transparent to-transparent',
  'from-teal-500/10 via-transparent to-transparent',
  'from-sky-500/10 via-transparent to-transparent',
  'from-emerald-500/10 via-transparent to-transparent',
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 30 };
const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const gridItem = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring },
};
const featureStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const featureItem = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: spring },
};

export default function StoryProjectGrid({ projects }: StoryProjectGridProps) {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense"
      variants={staggerGrid}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {projects.map((project, index) => {
        const isFeatured = project.id === 'gemini-cookbook' || project.id === 'openai-cookbook-langchain-rwmh' || project.id === 'procure-loop';

        return (
          <motion.div
            key={project.id}
            variants={gridItem}
            className={`card-3d-wrap ${isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}`}
          >
            <motion.article
              whileHover={{
                y: -6,
                scale: 1.01,
                boxShadow: isFeatured 
                  ? '0 30px 80px rgba(0, 229, 204, 0.18)' 
                  : '0 30px 80px rgba(0, 229, 204, 0.08)',
              }}
              transition={spring}
              className="card-3d-surface glass-premium group relative h-full min-h-[460px] overflow-hidden rounded-3xl p-7 sm:p-8 flex flex-col justify-between"
              style={{
                borderColor: isFeatured ? 'rgba(0, 229, 204, 0.35)' : 'var(--border)',
                borderWidth: isFeatured ? '1.5px' : '1px',
              }}
            >
              {/* Header Badges */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="mono-accent text-[11px] font-bold text-[var(--accent)] tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="mono-accent inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[11px] font-semibold text-[var(--accent)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {project.status}
                  </span>
                </div>

                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-50 transition-opacity duration-300 group-hover:opacity-100`}
                />
                
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug">
                  {project.title}
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights List */}
                <motion.ul
                  className="mt-6 space-y-2.5 text-sm text-[var(--text-muted)]"
                  variants={featureStagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {project.features.map(feature => (
                    <motion.li
                      key={`${project.id}-${feature}`}
                      variants={featureItem}
                      className="flex gap-2.5 items-start"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-5 text-sm border-t border-white/10">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all hover:bg-white/10 hover:border-white/20"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub PR / Repo ↗
                  </a>
                ) : null}
                {project.links?.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all hover:bg-white/10 hover:border-white/20"
                  >
                    {link.label} ↗
                  </a>
                ))}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-2 text-xs font-semibold text-[var(--accent)] transition-all hover:bg-[var(--accent)]/20"
                  >
                    Live Demo ↗
                  </a>
                ) : null}
              </div>
            </motion.article>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
