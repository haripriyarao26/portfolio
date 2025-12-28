'use client';

import { Github, Globe, Code2, Lightbulb, Target, CheckCircle, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';
import { useState } from 'react';
import { getProjectById } from '@/data/projects';

interface MoodBiteCaseStudyProps {
  projectId?: string;
}

export default function MoodBiteCaseStudy({ projectId = 'moodbite' }: MoodBiteCaseStudyProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { getItemRef, isVisible: isCardVisible } = useStaggeredAnimation(200);
  const project = getProjectById(projectId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <section id="projects" className="py-20 px-4 bg-slate-900/50">
      <div ref={ref} className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 rounded-full mb-6">
            <Code2 className="text-indigo-400" size={18} />
            <span className="text-indigo-400 text-sm font-medium">Case Study</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">{project.title}</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {project.description}
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Github size={18} />
                <span>View Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                <Globe size={18} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Images Gallery */}
        <div className="mb-16">
          {/* Main Image Display */}
          <div 
            ref={getItemRef(0)}
            className={`mb-6 rounded-xl overflow-hidden border border-slate-700 transition-all duration-1000 ${
              isCardVisible(0) 
                ? 'opacity-100 scale-100 rotate-0' 
                : 'opacity-0 scale-95 rotate-2'
            }`}
          >
            <div className="relative group">
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="text-white" size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="text-white" size={24} />
                  </button>
                </>
              )}
              <img
                src={project.images[selectedImageIndex].src}
                alt={project.images[selectedImageIndex].alt}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              {project.images[selectedImageIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                  <p className="text-white text-sm font-medium">{project.images[selectedImageIndex].caption}</p>
                </div>
              )}
              {project.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-slate-900/80 px-3 py-1 rounded-full">
                  <span className="text-white text-sm">
                    {selectedImageIndex + 1} / {project.images.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {project.images.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImageIndex === index
                      ? 'border-indigo-500 scale-105'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-32 object-cover"
                  />
                  {selectedImageIndex === index && (
                    <div className="absolute inset-0 bg-indigo-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Problem */}
        <div 
          ref={getItemRef(1)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(1) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Lightbulb className="text-red-400" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white">The Problem</h3>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 card-hover">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Choosing what to eat can be overwhelming, especially when you're tired, stressed, or just not in the mood to decide. 
              Traditional food apps require you to know what you want, but sometimes you just need a recommendation based on how you're feeling.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              The challenge was to create an intelligent system that understands context—mood, time of day, energy level, and dietary preferences—to provide personalized food recommendations without requiring API keys or paid services.
            </p>
          </div>
        </div>

        {/* Process */}
        <div 
          ref={getItemRef(2)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Target className="text-blue-400" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white">My Process</h3>
          </div>
          
          <div className="space-y-6">
            <div 
              ref={getItemRef(3)}
              className={`bg-slate-800/50 rounded-xl p-6 border border-slate-700 card-hover transition-all duration-700 ${
                isCardVisible(3) ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-5 scale-95'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <h4 className="text-xl font-semibold text-white mb-3">1. Research & Planning</h4>
              <p className="text-slate-300">
                Researched free AI models available through Hugging Face Inference API. Explored mood analysis techniques and food recommendation algorithms. 
                Designed the user flow to capture mood, time, energy level, and dietary preferences.
              </p>
            </div>

            <div 
              ref={getItemRef(4)}
              className={`bg-slate-800/50 rounded-xl p-6 border border-slate-700 card-hover transition-all duration-700 ${
                isCardVisible(4) ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-5 scale-95'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <h4 className="text-xl font-semibold text-white mb-3">2. Design & Prototyping</h4>
              <p className="text-slate-300 mb-3">
                Created a clean, intuitive interface using Ant Design components. Focused on simplicity—users describe their mood in natural language, 
                and the system handles the rest. Designed for mobile-first experience with responsive layouts.
              </p>
              <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">Design Principles:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                  <li>Minimal cognitive load - simple form inputs</li>
                  <li>Natural language input for mood description</li>
                  <li>Visual feedback for recommendations</li>
                  <li>Accessible color contrast and typography</li>
                </ul>
              </div>
            </div>

            <div 
              ref={getItemRef(5)}
              className={`bg-slate-800/50 rounded-xl p-6 border border-slate-700 card-hover transition-all duration-700 ${
                isCardVisible(5) ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-5 scale-95'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <h4 className="text-xl font-semibold text-white mb-3">3. Development</h4>
              <p className="text-slate-300 mb-3">
                Built with Next.js 14 and TypeScript for type safety. Integrated Hugging Face Inference API for AI-powered recommendations. 
                Implemented preference memory using localStorage for personalized experiences.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Next.js 14', 'TypeScript', 'Ant Design', 'Hugging Face AI', 'GitHub Pages'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div 
          ref={getItemRef(6)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="text-green-400" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white">The Solution</h3>
          </div>
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl p-8 border border-indigo-500/30 card-hover">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              MoodBite is a fully functional web application that provides personalized food recommendations based on:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Mood Analysis - Natural language understanding of user emotions',
                'Time-Aware Recommendations - Contextual suggestions based on time of day',
                'Energy Level Consideration - Matches food to current energy state',
                'Dietary Preferences - Supports vegetarian, vegan, and cultural preferences',
                'Memory System - Remembers preferences for better future recommendations',
                'Zero API Costs - Uses free Hugging Face models, no API keys needed'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Role & Contributions */}
        <div 
          ref={getItemRef(7)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(7) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
          style={{ transitionDelay: '1400ms' }}
        >
          <h3 className="text-3xl font-bold text-white mb-6">My Role & Contributions</h3>
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 card-hover">
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Full-Stack Development</h4>
                <p className="text-slate-300">
                  Designed and implemented the entire application from frontend UI to AI integration. 
                  Created a seamless user experience with intuitive form inputs and real-time recommendations.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">AI Integration</h4>
                <p className="text-slate-300">
                  Researched and integrated Hugging Face Inference API, implementing prompt engineering techniques 
                  to generate contextual food recommendations based on multiple input factors.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">UX/UI Design</h4>
                <p className="text-slate-300">
                  Designed a clean, accessible interface using Ant Design. Focused on reducing friction—users can 
                  describe their mood naturally without complex forms or multiple steps.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Deployment & Optimization</h4>
                <p className="text-slate-300">
                  Deployed to GitHub Pages with optimized build configuration. Ensured fast load times and 
                  responsive design across all devices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Outcomes */}
        <div 
          ref={getItemRef(8)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1600ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp className="text-purple-400" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white">Outcomes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center card-hover">
              <div className="text-3xl font-bold text-indigo-400 mb-2">100%</div>
              <p className="text-slate-300">Free to Use</p>
              <p className="text-sm text-slate-500 mt-1">No API keys or paid services required</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center card-hover">
              <div className="text-3xl font-bold text-indigo-400 mb-2">5</div>
              <p className="text-slate-300">Key Features</p>
              <p className="text-sm text-slate-500 mt-1">Mood, time, energy, preferences, memory</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center card-hover">
              <div className="text-3xl font-bold text-indigo-400 mb-2">0</div>
              <p className="text-slate-300">Setup Time</p>
              <p className="text-sm text-slate-500 mt-1">Works immediately, no configuration needed</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div 
          ref={getItemRef(9)}
          className={`bg-slate-800/50 rounded-xl p-8 border border-slate-700 card-hover transition-all duration-700 ${
            isCardVisible(9) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '1800ms' }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Next.js 14', category: 'Framework' },
              { name: 'TypeScript', category: 'Language' },
              { name: 'Ant Design', category: 'UI Library' },
              { name: 'Hugging Face', category: 'AI/ML' },
              { name: 'GitHub Pages', category: 'Hosting' },
              { name: 'Tailwind CSS', category: 'Styling' },
              { name: 'React Hooks', category: 'State' },
              { name: 'localStorage', category: 'Storage' }
            ].map((tech) => (
              <div key={tech.name} className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="font-semibold text-white mb-1">{tech.name}</div>
                <div className="text-xs text-slate-500">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
