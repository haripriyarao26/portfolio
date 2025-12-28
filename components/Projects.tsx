'use client';

import { ExternalLink, Code2 } from 'lucide-react';

const projects = [
  {
    title: 'MoodBite',
    description: 'Mood-Driven Food Agent that provides personalized food recommendations based on your mood, time, and energy level. Uses free Hugging Face AI models with no API keys required.',
    tech: ['Next.js 14', 'TypeScript', 'Ant Design', 'Hugging Face AI', 'GitHub Pages'],
    highlight: 'AI-powered recommendations',
    image: '/projects/image.png',
    github: 'https://github.com/haripriyarao26/MoodBite',
    features: ['Mood Analysis', 'Time-Aware', 'Energy Level', 'Dietary Preferences', 'Memory'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Featured Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 card-hover border border-slate-700 flex flex-col overflow-hidden max-w-2xl mx-auto"
            >
              {project.image && (
                <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden -mx-6 -mt-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <Code2 className="text-indigo-400" size={24} />
                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-400 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  <span className="text-xs px-2 py-1 bg-indigo-600/20 text-indigo-400 rounded-full">
                    {project.highlight}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-4 flex-grow">{project.description}</p>
              {project.features && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

