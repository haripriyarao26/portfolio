'use client';

import { resumeData } from '@/data/resume';
import { Code, Database, Layers, Wrench } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();
  const { getItemRef, isVisible: isCardVisible } = useStaggeredAnimation(150);
  
  const skillCategories = [
    {
      icon: Database,
      title: 'Infrastructure',
      skills: ['AWS', 'CircleCI', 'Vercel', 'Render', 'Supabase', 'ClickHouse', 'Redis', 'PostgreSQL', 'MongoDB'],
      color: 'text-[#1a1a1a]',
    },
    {
      icon: Code,
      title: 'Core Engine',
      skills: ['Python', 'TypeScript', 'JavaScript', 'Node.js', 'LangGraph', 'Flask', 'Django', 'Express'],
      color: 'text-[#1a1a1a]',
    },
    {
      icon: Layers,
      title: 'Frontend Systems',
      skills: ['Next.js', 'React', 'Chakra UI', 'Bootstrap', 'HTML', 'CSS', 'GraphQL'],
      color: 'text-[#1a1a1a]',
    },
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="section-header">
          <h2 className="text-4xl font-bold text-center">
            <span className="gradient-text">Technical Skills</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const cardVisible = isCardVisible(index);
            
            return (
              <div
                key={index}
                ref={getItemRef(index)}
                className={`bg-white rounded-xl p-6 card-hover border border-[#e5e5e5] transition-all duration-700 ${
                  cardVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-20 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`transition-all duration-700 ${
                      cardVisible ? 'rotate-0 scale-100' : 'rotate-12 scale-0'
                    }`}
                    style={{ transitionDelay: `${index * 150 + 200}ms` }}
                  >
                    <Icon className={category.color} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827]">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => {
                    const skillKey = `${index}-${idx}`;
                    return (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-[#f5f5f3] text-[#111827] rounded-full text-sm border border-[#e5e5e5] hover:bg-[#1a1a1a] hover:text-white transition-all duration-500 ${
                          cardVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-5'
                        }`}
                        style={{
                          transitionDelay: `${index * 150 + 300 + idx * 50}ms`,
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


