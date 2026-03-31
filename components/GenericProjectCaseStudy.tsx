'use client';

import { Github, Code2, CheckCircle, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { memo } from 'react';
import { getProjectById } from '@/data/projects';

interface GenericProjectCaseStudyProps {
  projectId: string;
}

function GenericProjectCaseStudy({ projectId }: GenericProjectCaseStudyProps) {
  const { ref, isVisible } = useScrollAnimation();
  const project = getProjectById(projectId);

  if (!project) return null;

  const isPullRequest = Boolean(project.github?.includes('/pull/'));
  const badgeLabel = isPullRequest ? 'Open Source Contribution' : 'Case Study';
  const linkLabel = isPullRequest ? 'View pull request on GitHub' : 'View on GitHub';

  return (
    <section id="projects" className="py-12 px-4 bg-[#fcfcf9]/50">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a]/20 rounded-full mb-6">
            <Code2 className="text-[#1a1a1a]" size={18} />
            <span className="text-[#1a1a1a] text-sm font-medium">{badgeLabel}</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">{project.title}</span>
          </h2>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto mb-6">{project.description}</p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-black text-white rounded-lg transition-colors"
              >
                <Github size={18} />
                <span>{linkLabel}</span>
                <ExternalLink size={16} className="opacity-80" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#f5f5f3] border border-[#e5e5e5] rounded-lg transition-colors text-[#111827]"
              >
                <span>Live demo</span>
                <ExternalLink size={16} className="opacity-70" />
              </a>
            )}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-[#111827] mb-3">Tech stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-sm px-3 py-1 bg-[#f5f5f3] text-[#111827] rounded-full border border-[#e5e5e5]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#111827] mb-3">Highlights</h3>
          <ul className="space-y-3">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[#525252]">
                <CheckCircle className="text-[#1a1a1a] mt-0.5 flex-shrink-0" size={18} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default memo(GenericProjectCaseStudy);
