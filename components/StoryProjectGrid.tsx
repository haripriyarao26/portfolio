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

export default function StoryProjectGrid({ projects }: StoryProjectGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <div key={project.id} className="card-3d-wrap">
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: index * 0.04 }}
            whileHover={{ y: -10, rotateX: 8, rotateY: index % 2 === 0 ? -10 : 10, scale: 1.015 }}
            className="card-3d-surface group relative h-full min-h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_24px_80px_rgba(2,6,23,0.45)]"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="orbital-ring pointer-events-none absolute right-5 top-6 h-20 w-20 rounded-full border border-cyan-200/35" />
            <div className="orbital-ring orbital-ring-delay pointer-events-none absolute right-5 top-6 h-20 w-20 rounded-full border border-indigo-200/35" />

            <div className="relative z-10 flex h-full flex-col">
              <h3 className="translate-z-24 text-xl font-semibold text-slate-50">{project.title}</h3>
              <p className="translate-z-16 mt-3 min-h-[88px] overflow-hidden text-sm leading-relaxed text-slate-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
                {project.description}
              </p>

              <div className="translate-z-20 mt-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 5).map(tech => (
                  <span
                    key={`${project.id}-${tech}`}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="translate-z-14 mt-5 min-h-[132px] space-y-2 text-sm text-slate-200/90">
                {project.features.slice(0, 3).map(feature => (
                  <li
                    key={`${project.id}-${feature}`}
                    className="flex min-h-[40px] gap-2 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="translate-z-26 mt-auto flex flex-wrap gap-3 pt-6 text-sm">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-indigo-300/40 bg-indigo-500/10 px-4 py-2 text-indigo-100 transition-colors hover:bg-indigo-500/20"
                  >
                    GitHub
                  </a>
                ) : null}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-cyan-100 transition-colors hover:bg-cyan-500/20"
                  >
                    Live Demo
                  </a>
                ) : null}
              </div>
            </div>
          </motion.article>
        </div>
      ))}
    </div>
  );
}
