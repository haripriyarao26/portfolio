'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

type StoryProjectGridProps = {
  projects: Project[];
};

const gradients = [
  'from-violet-500/20 via-indigo-500/5 to-cyan-400/10',
  'from-emerald-500/20 via-lime-500/5 to-cyan-300/10',
  'from-fuchsia-500/20 via-purple-500/5 to-blue-400/10',
  'from-amber-400/20 via-orange-500/5 to-rose-400/10',
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
      className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      variants={staggerGrid}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {projects.map((project, index) => (
        <motion.div key={project.id} variants={gridItem} className="card-3d-wrap">
          <motion.article
            whileHover={{
              z: 40,
              rotateX: 12,
              rotateY: index % 2 === 0 ? -15 : 15,
              scale: 1.05,
              boxShadow: '0 30px 80px rgba(34,211,238,0.25)',
            }}
            transition={spring}
            className="card-3d-surface glass-premium group relative h-full min-h-[560px] overflow-hidden rounded-3xl p-6 will-change-transform"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="orbital-ring pointer-events-none absolute right-5 top-6 h-20 w-20 rounded-full border border-cyan-200/35" />
            <div className="orbital-ring orbital-ring-delay pointer-events-none absolute right-5 top-6 h-20 w-20 rounded-full border border-indigo-200/35" />

            <div className="relative z-10 flex h-full flex-col">
              <h3 className="translate-z-24 text-xl font-semibold text-slate-50 text-glow">{project.title}</h3>
              <p className="translate-z-16 mt-3 min-h-[88px] overflow-hidden text-sm leading-relaxed text-slate-50 text-glow [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
                {project.description}
              </p>

              <div className="translate-z-20 mt-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 5).map(tech => (
                  <motion.span
                    key={`${project.id}-${tech}`}
                    whileHover={{ scale: 1.1 }}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-200 transition-colors hover:border-cyan-300/30 hover:bg-cyan-400/10"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <motion.ul
                className="translate-z-14 mt-5 min-h-[132px] space-y-2 text-sm text-slate-100 drop-shadow-md"
                variants={featureStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {project.features.slice(0, 3).map(feature => (
                  <motion.li
                    key={`${project.id}-${feature}`}
                    variants={featureItem}
                    className="flex min-h-[40px] gap-2 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-300" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="translate-z-26 mt-auto flex flex-wrap gap-3 pt-6 text-sm">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-indigo-300/40 bg-indigo-500/10 px-4 py-2 text-indigo-100 transition hover:scale-105 hover:bg-indigo-500/20"
                  >
                    GitHub
                  </a>
                ) : null}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-cyan-100 transition hover:scale-105 hover:bg-cyan-500/20"
                  >
                    Live Demo
                  </a>
                ) : null}
              </div>
            </div>
          </motion.article>
        </motion.div>
      ))}
    </motion.div>
  );
}
