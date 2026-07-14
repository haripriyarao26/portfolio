'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

type StoryProjectGridProps = {
  projects: Project[];
};

const gradients = [
  'from-cyan-500/5 via-transparent to-transparent',
  'from-cyan-500/5 via-transparent to-transparent',
  'from-cyan-500/5 via-transparent to-transparent',
  'from-cyan-500/5 via-transparent to-transparent',
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
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={staggerGrid}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {projects.map((project, index) => {
        const isFeatured = project.id === 'procure-loop' || project.id === 'openai-cookbook-langchain-rwmh' || project.id === 'gemini-cookbook';

        return (
          <motion.div
            key={project.id}
            variants={gridItem}
            className={`card-3d-wrap ${isFeatured ? 'md:col-span-2' : ''}`}
          >
            <motion.article
              whileHover={{
                z: 40,
                rotateX: isFeatured ? 6 : 12,
                rotateY: index % 2 === 0 ? -12 : 12,
                scale: 1.02,
                boxShadow: isFeatured 
                  ? '0 30px 80px rgba(0, 229, 204, 0.15)' 
                  : '0 30px 80px rgba(0, 229, 204, 0.05)',
              }}
              transition={spring}
              className={`card-3d-surface glass-premium group relative h-full min-h-[500px] overflow-hidden rounded-3xl p-8 will-change-transform`}
              style={{
                borderColor: isFeatured ? 'rgba(0, 229, 204, 0.35)' : 'var(--border)',
                borderWidth: isFeatured ? '1.5px' : '0.5px',
              }}
            >
              {/* Featured Badge */}
              {isFeatured && (
                <div className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)] text-[#0F0E0D] text-[10px] font-bold tracking-wider uppercase shadow-[0_4px_12px_rgba(0, 229, 204, 0.25)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0F0E0D] animate-pulse" />
                  Featured Contribution
                </div>
              )}

              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
              
              <div className="relative z-10 flex h-full flex-col pt-8">
                <h3 className="translate-z-24 text-xl sm:text-2xl font-semibold text-[var(--text-primary)] text-glow leading-snug">
                  {project.title}
                </h3>
                
                <p className="translate-z-16 mt-4 text-sm leading-relaxed text-[var(--text-muted)] max-w-[640px]">
                  {project.description}
                </p>

                {/* Tech Pills (tag cloud fixed with clear padding + margin separation) */}
                <div className="translate-z-20 mt-6 flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <motion.span
                      key={`${project.id}-${tech}`}
                      whileHover={{ scale: 1.05 }}
                      className="inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Highlights List */}
                <motion.ul
                  className="translate-z-14 mt-6 space-y-2 text-sm text-[var(--text-muted)] max-w-[640px]"
                  variants={featureStagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {project.features.slice(0, 3).map(feature => (
                    <motion.li
                      key={`${project.id}-${feature}`}
                      variants={featureItem}
                      className="flex gap-2.5 items-start"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Actions */}
                <div className="translate-z-26 mt-8 flex flex-wrap gap-3 pt-6 text-sm border-t border-white/5">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[var(--text-primary)] transition-all hover:scale-105 hover:bg-white/10 hover:border-white/20"
                    >
                      View on GitHub
                    </a>
                  ) : null}
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-2 text-[var(--accent)] transition-all hover:scale-105 hover:bg-[var(--accent)]/20"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

