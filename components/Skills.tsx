'use client';

import { resumeData } from '@/data/resume';
import { Code, Database, Layers, Wrench } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      icon: Code,
      title: 'Languages',
      skills: resumeData.skills.languages,
      color: 'text-blue-400',
    },
    {
      icon: Layers,
      title: 'Frameworks & Tools',
      skills: resumeData.skills.frameworks,
      color: 'text-purple-400',
    },
    {
      icon: Wrench,
      title: 'Libraries',
      skills: resumeData.skills.libraries,
      color: 'text-pink-400',
    },
    {
      icon: Database,
      title: 'Databases',
      skills: resumeData.skills.databases,
      color: 'text-green-400',
    },
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Technical Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 card-hover border border-slate-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={category.color} size={24} />
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm hover:bg-indigo-600 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

