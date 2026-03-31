'use client';

import { useState, memo, useEffect } from 'react';
import { Code2, Github, Globe, ArrowRight, FileText } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';
import { projects } from '@/data/projects';
import CaseStudyModal from './CaseStudyModal';
import LazyImage from './LazyImage';
import { preloadImages } from '@/utils/imageCache';

function Projects() {
  const { ref, isVisible } = useScrollAnimation();
  const { getItemRef, isVisible: isCardVisible } = useStaggeredAnimation(200);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Preload first project image when component mounts
  useEffect(() => {
    if (projects.length > 0 && projects[0].images && projects[0].images[0]) {
      preloadImages([projects[0].images[0].src]);
    }
  }, []);
  
  return (
    <section id="projects" className="py-20 px-4 bg-[#fcfcf9]/50">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="section-header">
          <h2 className="text-4xl font-bold text-center">
            <span className="gradient-text">Featured Projects</span>
          </h2>
        </div>

        <div className={`grid gap-6 ${
          projects.length === 1 
            ? 'grid-cols-1 max-w-4xl mx-auto' 
            : projects.length === 2 
              ? 'grid-cols-1 md:grid-cols-2' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={getItemRef(index)}
              className={`bg-white rounded-xl overflow-hidden border border-[#e5e5e5] flex flex-col card-hover transition-all duration-700 cursor-pointer ${
                isCardVisible(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-10 scale-95'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => setSelectedProjectId(project.id)}
            >
              {/* Project Image */}
              {project.images && project.images[0] && (
                <div className="relative w-full h-48 overflow-hidden bg-[#f5f5f3]">
                  <LazyImage
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcf9]/80 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-2 py-1 bg-[#1a1a1a]/80 text-[#111827] rounded-full backdrop-blur-sm">
                      {project.images.length} {project.images.length === 1 ? 'image' : 'images'}
                    </span>
                  </div>
                </div>
              )}

              {/* Project Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <Code2 className="text-[#111827]" size={24} />
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#111827] hover:text-[#1a1a1a] transition-colors"
                        title="View on GitHub"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#111827] hover:text-[#1a1a1a] transition-colors"
                        title="View Live Demo"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#111827] mb-2">{project.title}</h3>
                <p className="text-[#525252] text-sm mb-4 flex-grow line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-[#f5f5f3] text-[#111827] rounded border border-[#e5e5e5]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-[#f5f5f3] text-[#525252] rounded">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {(project.links ?? []).length > 0 && (
                  <div
                    className="flex flex-col gap-2 mb-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#1a1a1a] hover:underline font-medium w-fit"
                      >
                        GitHub repository →
                      </a>
                    )}
                    {(project.links ?? []).map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#1a1a1a] hover:underline font-medium w-fit"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}

                {/* Technical Deep Dive CTA */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProjectId(project.id);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#1a1a1a] hover:bg-black text-white rounded-lg font-semibold transition-all duration-300 group"
                >
                  <FileText size={18} />
                  <span>Technical Deep Dive</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal 
        projectId={selectedProjectId} 
        onClose={() => setSelectedProjectId(null)} 
      />
    </section>
  );
}

export default memo(Projects);
