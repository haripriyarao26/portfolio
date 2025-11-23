'use client';

import { User, Target, Rocket, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">About Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 card-hover border border-slate-700">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-lg w-fit mb-4">
              <User className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Full-Stack Engineer</h3>
            <p className="text-slate-300">
              Passionate about building scalable applications from frontend to backend.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 card-hover border border-slate-700">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-lg w-fit mb-4">
              <Rocket className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI</h3>
            <p className="text-slate-300">
              Experienced in AI/ML integration, LangGraph, GPT-4, and building intelligent systems that solve complex problems.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 card-hover border border-slate-700">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-3 rounded-lg w-fit mb-4">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">0 → 1 Builder</h3>
            <p className="text-slate-300">
              Specialized in taking products from concept to launch, building foundational architecture and scalable systems from scratch.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 card-hover border border-slate-700">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-lg w-fit mb-4">
              <Target className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Product-Focused</h3>
            <p className="text-slate-300">
              Create impact by focusing on the overall product needs, working directly with stakeholders to understand business objectives and translate them into technical solutions that drive measurable results.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-8 border border-indigo-500/30">
          <p className="text-slate-300 text-lg leading-relaxed text-center">
            As a <strong className="text-white">Software Engineer 2/Technical Lead</strong> at Onetera, I contribute to the development of innovative SaaS solutions, leveraging my experience in technical leadership and MEAN Stack expertise. Collaborating with a versatile team, we focus on delivering impactful projects and driving success through efficient development practices.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed text-center mt-4">
            I hold a <strong className="text-white">Master of Science in Computer Science</strong> from the University of Southern California. My approach to technical leadership is rooted in fostering collaboration and leveraging cutting-edge technologies to accelerate organizational growth.
          </p>
        </div>
      </div>
    </section>
  );
}

