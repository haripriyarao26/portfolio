'use client';

import { Github, Code2, Lightbulb, Target, CheckCircle, TrendingUp, ChevronLeft, ChevronRight, Shield, Zap, Award } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';
import { useState, memo } from 'react';
import { getProjectById } from '@/data/projects';
import LazyImage from './LazyImage';
import MermaidPreview from './MermaidPreview';

interface GeminiCaseStudyProps {
  projectId?: string;
}

function GeminiCaseStudy({ projectId = 'gemini-cookbook' }: GeminiCaseStudyProps) {
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
    <section id="projects" className="py-20 px-4 bg-[#fcfcf9]/50">
      <div ref={ref} className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a]/20 rounded-full mb-6">
            <Code2 className="text-[#1a1a1a]" size={18} />
            <span className="text-[#1a1a1a] text-sm font-medium">Case Study</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">
            <span className="gradient-text">{project.title}</span>
          </h2>
          <p className="text-xl text-[#525252] max-w-2xl mx-auto mb-2">
            {project.description}
          </p>
        
          <div className="flex items-center justify-center gap-4 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#f5f5f3] rounded-lg transition-colors"
              >
                <Github size={18} />
                <span>View Pull Request</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Images Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mb-16">
            {/* Main Image Display */}
            <div 
              ref={getItemRef(0)}
              className={`mb-6 rounded-xl overflow-hidden border border-[#e5e5e5] transition-all duration-1000 ${
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#fcfcf9]/80 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="text-[#111827]" size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#fcfcf9]/80 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="text-[#111827]" size={24} />
                    </button>
                  </>
                )}
                <LazyImage
                  src={project.images[selectedImageIndex].src}
                  alt={project.images[selectedImageIndex].alt}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  priority={selectedImageIndex === 0}
                />
                {project.images[selectedImageIndex].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#fcfcf9]/90 to-transparent p-6">
                    <p className="text-[#111827] text-sm font-medium">{project.images[selectedImageIndex].caption}</p>
                  </div>
                )}
                {project.images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-[#fcfcf9]/80 px-3 py-1 rounded-full">
                    <span className="text-[#111827] text-sm">
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
                        ? 'border-[#1a1a1a] scale-105'
                        : 'border-[#e5e5e5] hover:border-[#d4d4d4]'
                    }`}
                  >
                    <LazyImage
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-32 object-cover"
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-[#1a1a1a]/20"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Problem */}
        <div 
          ref={getItemRef(1)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(1) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <Lightbulb className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#111827]">The Challenge</h3>
          </div>
          <div className="bg-white/50 rounded-xl p-8 border border-[#e5e5e5] card-hover">
            <p className="text-[#525252] text-lg leading-relaxed mb-4">
              As LLM applications scale, monitoring costs and API health becomes critical. The Google Gemini Cookbook needed a reusable utility to track real-time USD costs and monitor API health for Gemini 2.0/3.0 models, with robust error handling for rate limits and automated token-to-cost normalization.
            </p>
            <p className="text-[#525252] text-lg leading-relaxed">
              The challenge was to build a production-ready observability tool that adheres to Google's strict engineering standards while providing developers with actionable insights into their LLM usage.
            </p>
          </div>
        </div>

        {/* Technical Impact */}
        <div 
          ref={getItemRef(1)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <Zap className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#111827]">Technical Impact</h3>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a1a]/20 to-black/20 rounded-xl p-8 border border-[#1a1a1a]/30 card-hover">
            <p className="text-[#525252] text-lg leading-relaxed mb-6">
              Implemented real-time USD cost tracking and API health monitoring for Gemini 2.0/3.0 models, enabling developers to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Real-time USD Cost Tracking - Monitor spending across Gemini models',
                'API Health Monitoring - Track API status and performance metrics',
                'Rate Limit Handling - Resilient error handling for 429 Resource Exhausted errors',
                'Token-to-Cost Normalization - Automated conversion for accurate cost calculations'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-[#1a1a1a] mt-1 flex-shrink-0" size={18} />
                  <span className="text-[#525252]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reliability */}
        <div 
          ref={getItemRef(2)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <Shield className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#111827]">Reliability & Resilience</h3>
          </div>
          <div className="bg-white/50 rounded-xl p-8 border border-[#e5e5e5] card-hover">
            <p className="text-[#525252] text-lg leading-relaxed mb-4">
              Built resilient error handling specifically for "429 Resource Exhausted" rate limits, ensuring the utility gracefully handles API throttling scenarios. Implemented automated token-to-cost normalization to provide accurate cost calculations across different Gemini model versions.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-[#111827] mb-2">Error Handling</h4>
                <p className="text-[#525252]">
                  Comprehensive exception handling for rate limit scenarios, with automatic retry logic and clear error messaging for developers.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#111827] mb-2">Cost Normalization</h4>
                <p className="text-[#525252]">
                  Automated conversion system that normalizes token usage to USD costs, accounting for different pricing tiers across Gemini 2.0 and 3.0 models.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Standards */}
        <div 
          ref={getItemRef(3)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <Award className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#111827]">Quality & Engineering Standards</h3>
          </div>
          <div className="bg-white/50 rounded-xl p-8 border border-[#e5e5e5] card-hover">
            <p className="text-[#525252] text-lg leading-relaxed mb-6">
              Adhered to strict Google engineering standards throughout the development process:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-[#fcfcf9]/50 rounded-lg">
                <div className="text-2xl font-bold text-[#1a1a1a] mb-2">Python</div>
                <p className="text-[#525252] text-sm">Type-hinting throughout</p>
                <p className="text-[#525252] text-xs mt-1">Full type annotations</p>
              </div>
              <div className="text-center p-6 bg-[#fcfcf9]/50 rounded-lg">
                <div className="text-2xl font-bold text-[#1a1a1a] mb-2">Exceptions</div>
                <p className="text-[#525252] text-sm">Specific handling</p>
                <p className="text-[#525252] text-xs mt-1">Targeted error management</p>
              </div>
              <div className="text-center p-6 bg-[#fcfcf9]/50 rounded-lg">
                <div className="text-2xl font-bold text-[#1a1a1a] mb-2">CI/CD</div>
                <p className="text-[#525252] text-sm">Validation pipeline</p>
                <p className="text-[#525252] text-xs mt-1">Automated testing</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-[#1a1a1a]/10 rounded-lg border border-[#1a1a1a]/30">
              <p className="text-[#525252] text-sm">
                <strong className="text-[#1a1a1a]">Code Quality:</strong> All code follows Google's Python style guide with comprehensive type hints, specific exception handling for different error scenarios, and full CI/CD validation to ensure reliability and maintainability.
              </p>
            </div>
          </div>
        </div>

        {/* My Role & Contributions */}
        <div 
          ref={getItemRef(4)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(4) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <h3 className="text-3xl font-bold text-[#111827] mb-6">My Role & Contributions</h3>
          <div className="bg-white/50 rounded-xl p-8 border border-[#e5e5e5] card-hover">
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-[#111827] mb-2">LLM Observability Development</h4>
                <p className="text-[#525252]">
                  Designed and implemented a reusable observability utility for the Google Gemini Cookbook repository. 
                  Created real-time cost tracking and health monitoring capabilities that integrate seamlessly with Gemini 2.0/3.0 models.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#111827] mb-2">Error Handling & Resilience</h4>
                <p className="text-[#525252]">
                  Built comprehensive error handling for rate limit scenarios (429 Resource Exhausted), implementing retry logic 
                  and graceful degradation to ensure the utility remains functional under high-load conditions.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#111827] mb-2">Cost Normalization System</h4>
                <p className="text-[#525252]">
                  Developed automated token-to-cost normalization algorithms that accurately convert token usage to USD costs, 
                  accounting for different pricing models across Gemini versions.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#111827] mb-2">Code Quality & Standards</h4>
                <p className="text-[#525252]">
                  Ensured all code adheres to Google's engineering standards, including comprehensive Python type-hinting, 
                  specific exception handling, and full CI/CD validation. The pull request was accepted into the official repository.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Outcomes */}
        <div 
          ref={getItemRef(5)}
          className={`mb-16 transition-all duration-700 ${
            isCardVisible(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1a1a1a]/20 rounded-lg">
              <TrendingUp className="text-[#1a1a1a]" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#111827]">Impact & Outcomes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/50 rounded-xl p-6 border border-[#e5e5e5] text-center card-hover">
              <div className="text-3xl font-bold text-[#1a1a1a] mb-2">Official</div>
              <p className="text-[#525252]">Google Repository</p>
              <p className="text-sm text-[#525252] mt-1">Accepted into cookbook</p>
            </div>
            <div className="bg-white/50 rounded-xl p-6 border border-[#e5e5e5] text-center card-hover">
              <div className="text-3xl font-bold text-[#1a1a1a] mb-2">Real-time</div>
              <p className="text-[#525252]">Cost Tracking</p>
              <p className="text-sm text-[#525252] mt-1">USD monitoring for Gemini</p>
            </div>
            <div className="bg-white/50 rounded-xl p-6 border border-[#e5e5e5] text-center card-hover">
              <div className="text-3xl font-bold text-[#1a1a1a] mb-2">Production</div>
              <p className="text-[#525252]">Ready Utility</p>
              <p className="text-sm text-[#525252] mt-1">Reusable observability tool</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div 
          ref={getItemRef(6)}
          className={`bg-white/50 rounded-xl p-8 border border-[#e5e5e5] card-hover transition-all duration-700 ${
            isCardVisible(6) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <h3 className="text-2xl font-bold text-[#111827] mb-6">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Python', category: 'Language' },
              { name: 'Google Gemini API', category: 'LLM Platform' },
              { name: 'Type Hints', category: 'Type Safety' },
              { name: 'CI/CD', category: 'DevOps' },
              { name: 'Error Handling', category: 'Reliability' },
              { name: 'Cost Tracking', category: 'Observability' },
              { name: 'API Monitoring', category: 'Health Checks' },
              { name: 'Git/GitHub', category: 'Version Control' }
            ].map((tech) => (
              <div key={tech.name} className="text-center p-4 bg-[#fcfcf9]/50 rounded-lg">
                <div className="font-semibold text-[#111827] mb-1">{tech.name}</div>
                <div className="text-xs text-[#525252]">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>

        {project.mermaidDiagram?.trim() && (
          <div className="mt-10 px-1 sm:px-0">
            <MermaidPreview title="Architecture (Mermaid)" chart={project.mermaidDiagram.trim()} />
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(GeminiCaseStudy);

