'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = { name: string; tagline: string };

const spring = { type: 'spring' as const, stiffness: 100, damping: 28 };

export default function StoryCanvasSequence({ name }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end 45%'],
  });

  const layerOneY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

  return (
    <section ref={sectionRef} id="story" className="relative min-h-[95vh] flex items-center pt-28 sm:pt-24 pb-16">
      <div className="relative w-full overflow-hidden">
        <motion.div
          style={{ opacity: titleOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 sm:px-8"
        >
          <motion.div
            style={{ y: layerOneY }}
            className="will-change-transform pointer-events-auto"
          >
            {/* Elegant Single Status Tag */}
            <div className="flex items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E07A5F]/30 bg-[#E07A5F]/10 text-xs font-medium text-[#F4A261] backdrop-blur-md shadow-[0_0_20px_rgba(224,122,95,0.15)]">
                <span className="h-2 w-2 rounded-full bg-[#E07A5F] animate-pulse" />
                <span>Available for Founding &amp; Staff AI Roles &middot; SF Bay Area &middot; Cap-Exempt H-1B</span>
              </div>
            </div>

            {/* Clean, Commanding Main Headline */}
            <h1 className="font-display font-bold tracking-tight text-[#FAF6F0] text-4xl sm:text-6xl lg:text-[68px] leading-[1.12] max-w-4xl">
              Architecting high-scale{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4A261] via-[#E07A5F] to-[#FAF6F0]">
                autonomous agents
              </span>{' '}
              &amp; distributed AI systems.
            </h1>

            {/* High-signal Subtitle */}
            <p className="mt-5 text-base sm:text-xl text-[#A69F94] max-w-3xl leading-relaxed font-normal">
              Applied AI &amp; Founding Engineer with 4.5+ years building multi-agent orchestration, evaluation harnesses, and full-stack systems. Scaled workflows to <strong className="text-[#FAF6F0] font-semibold">255+ agentic steps</strong>, slashed inference costs <strong className="text-[#FAF6F0] font-semibold">96%</strong>, and cut per-turn latency <strong className="text-[#FAF6F0] font-semibold">40%</strong>.
            </p>

            {/* Verified Badges Row */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-[#A69F94]">
              <span className="font-semibold text-[#8C857A] uppercase tracking-wider text-[11px]">Credentials:</span>
              <a
                href="https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#E07A5F]/40 bg-[#E07A5F]/15 hover:bg-[#E07A5F]/25 text-[#F4A261] font-medium transition-all"
              >
                <span>Claude Certified Architect (CCA-F) &middot; Anthropic</span>
                <span className="text-[#E07A5F]">↗</span>
              </a>
              <a
                href="https://www.credly.com/badges/898b89f1-5512-4d4a-8ba6-6a1597c7c510/public_url"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:border-white/20 text-[#FAF6F0] font-medium transition-all"
              >
                <span>AWS Certified AI Practitioner</span>
                <span className="text-[#A69F94]">↗</span>
              </a>
              <a
                href="https://github.com/google-gemini/cookbook/pull/1088"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:border-white/20 text-[#FAF6F0] font-medium transition-all"
              >
                <span>Gemini Cookbook PR #1088</span>
                <span className="text-[#A69F94]">↗</span>
              </a>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="/Haripriya_Rao_Resume.pdf"
                download="Haripriya_Rao_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E07A5F] hover:bg-[#E8886E] px-6 py-3 text-sm font-bold text-[#0E0D13] transition-all shadow-[0_0_24px_rgba(224,122,95,0.35)] hover:shadow-[0_0_32px_rgba(224,122,95,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Resume (PDF)</span>
              </a>

              <a
                href="#case-studies"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#E07A5F]/40 px-6 py-3 text-sm font-semibold text-[#FAF6F0] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Flagship Case Studies</span>
                <span className="text-[#F4A261]">→</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 rounded-xl border border-transparent hover:border-white/10 px-4 py-3 text-sm font-medium text-[#A69F94] hover:text-[#FAF6F0] transition-all"
              >
                <span>View Projects &amp; PRs</span>
              </a>
            </div>

            {/* Refined Metric Grid */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
              <div className="card p-4 sm:p-5 border border-white/10 bg-white/[0.02]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#F4A261] font-display">96%</p>
                <p className="text-xs font-semibold text-[#FAF6F0] mt-1">Token Cost Cut</p>
                <p className="text-[11px] text-[#A69F94] mt-0.5">200KB &rarr; 8KB / call</p>
              </div>

              <div className="card p-4 sm:p-5 border border-white/10 bg-white/[0.02]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#F4A261] font-display">40%</p>
                <p className="text-xs font-semibold text-[#FAF6F0] mt-1">Latency Drop</p>
                <p className="text-[11px] text-[#A69F94] mt-0.5">22-node async state machine</p>
              </div>

              <div className="card p-4 sm:p-5 border border-white/10 bg-white/[0.02]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#F4A261] font-display">255+</p>
                <p className="text-xs font-semibold text-[#FAF6F0] mt-1">Agentic Steps</p>
                <p className="text-[11px] text-[#A69F94] mt-0.5">Horizontal scaling in prod</p>
              </div>

              <div className="card p-4 sm:p-5 border border-white/10 bg-white/[0.02]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#F4A261] font-display">99.98%</p>
                <p className="text-xs font-semibold text-[#FAF6F0] mt-1">Platform Uptime</p>
                <p className="text-[11px] text-[#A69F94] mt-0.5">NVIDIA &amp; city partners</p>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
