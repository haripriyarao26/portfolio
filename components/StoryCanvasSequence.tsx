'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = { name: string; tagline: string };

export default function StoryCanvasSequence({ name }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const email = 'haripriyaraov@gmail.com';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end 45%'],
  });

  const layerOneY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section ref={sectionRef} id="story" className="relative min-h-[92vh] flex items-center pt-28 sm:pt-24 pb-16">
      <div className="relative w-full overflow-hidden">
        <motion.div
          style={{ opacity: titleOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 sm:px-8"
        >
          <motion.div
            style={{ y: layerOneY }}
            className="will-change-transform pointer-events-auto"
          >
            {/* Status Tag */}
            <div className="flex items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E07A5F]/30 bg-[#181818] text-xs font-medium text-[#F4A261]">
                <span className="h-2 w-2 rounded-full bg-[#E07A5F] animate-pulse" />
                <span>Available for Senior AI &amp; Founding Engineer Roles &middot; USA &middot; Cap Counted H1B</span>
              </div>
            </div>

            {/* Hero Heading (B5: left-to-right text gradient, max-w-[680px], meaningful breaks, no ultra-bold) */}
            <h1
              className="font-display font-semibold tracking-tight text-4xl sm:text-6xl max-w-[680px] bg-gradient-to-r from-[#FFFFFF] via-[#FAF6F0] to-[#9B9B9B] bg-clip-text text-transparent"
              style={{ textWrap: 'balance' }}
            >
              Building high throughput autonomous agents and production AI systems.
            </h1>

            {/* Subheadline (max-w-[680px], text-wrap: pretty) */}
            <p
              className="mt-6 text-base sm:text-xl text-[#B8B0A4] max-w-[680px] font-normal"
              style={{ textWrap: 'pretty' }}
            >
              {name} is an Applied AI and Founding Engineer with 4+ years building multi agent orchestration, evaluation harnesses, and full stack systems. Scaled workflows to{' '}
              <strong className="text-[#FAF6F0] font-semibold">255+ agentic steps</strong>, slashed inference costs{' '}
              <strong className="text-[#FAF6F0] font-semibold">96%</strong>, and cut per turn latency{' '}
              <strong className="text-[#FAF6F0] font-semibold">40%</strong>.
            </p>

            {/* Primary Action Buttons: Direct Email First for Hiring Managers */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}?subject=Engineering%20Opportunity%20for%20Haripriya%20Rao`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E07A5F] hover:bg-[#E8886E] px-6 py-3 text-base font-semibold text-[#0E0D13] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_24px_rgba(224,122,95,0.35)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email Haripriya</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#181818] hover:bg-[#272727] hover:border-[#E07A5F]/40 px-4 py-3 text-sm font-semibold text-[#FAF6F0] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4A261]"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-300">Copied {email}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-[#F4A261]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy email</span>
                  </>
                )}
              </button>

              <a
                href="/Haripriya_Rao_Resume.pdf"
                download="Haripriya_Rao_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#181818] hover:bg-[#272727] px-5 py-3 text-sm font-semibold text-[#FAF6F0] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
              >
                <svg className="w-4 h-4 text-[#E07A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Resume (PDF)</span>
              </a>

              <a
                href="#case-studies"
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium text-[#B8B0A4] hover:text-[#FAF6F0] transition-colors duration-300"
              >
                <span>Inspect case studies</span>
                <span className="text-[#F4A261]">↓</span>
              </a>
            </div>

            {/* 4 Key Production Metrics */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
              <div className="rounded-2xl p-5 border border-white/10 bg-[#181818]">
                <p className="text-3xl font-semibold text-[#F4A261] font-display">96%</p>
                <p className="text-sm font-semibold text-[#FAF6F0] mt-1">Token cost cut</p>
                <p className="text-xs text-[#B8B0A4] mt-1">200KB to 8KB per call</p>
              </div>

              <div className="rounded-2xl p-5 border border-white/10 bg-[#181818]">
                <p className="text-3xl font-semibold text-[#F4A261] font-display">52%</p>
                <p className="text-sm font-semibold text-[#FAF6F0] mt-1">Eval latency drop</p>
                <p className="text-xs text-[#B8B0A4] mt-1">40.8s to 19.6s at JPMorgan</p>
              </div>

              <div className="rounded-2xl p-5 border border-white/10 bg-[#181818]">
                <p className="text-3xl font-semibold text-[#F4A261] font-display">255+</p>
                <p className="text-sm font-semibold text-[#FAF6F0] mt-1">Agentic steps</p>
                <p className="text-xs text-[#B8B0A4] mt-1">Zero context overflow in prod</p>
              </div>

              <div className="rounded-2xl p-5 border border-white/10 bg-[#181818]">
                <p className="text-3xl font-semibold text-[#F4A261] font-display">99.98%</p>
                <p className="text-sm font-semibold text-[#FAF6F0] mt-1">Platform uptime</p>
                <p className="text-xs text-[#B8B0A4] mt-1">NVIDIA and city partners</p>
              </div>
            </div>

            {/* Single-Line Social Proof Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs text-[#B8B0A4] max-w-4xl">
              <span className="font-semibold text-[#FAF6F0] uppercase tracking-wider">Verified signals:</span>
              <a
                href="https://www.credly.com/badges/f6636497-b9bf-4e6b-b553-4ae5b59858f7/linked_in_profile"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E07A5F]/40 bg-[#181818] hover:border-[#E07A5F] text-[#F4A261] font-medium transition-colors duration-300"
              >
                <span>Anthropic Claude Certified Architect (CCA-F)</span>
                <span>↗</span>
              </a>
              <a
                href="https://github.com/google-gemini/cookbook/pull/1088"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[#181818] hover:border-white/25 text-[#FAF6F0] font-medium transition-colors duration-300"
              >
                <span>Google Gemini Cookbook PR #1088 (Merged)</span>
                <span className="text-[#B8B0A4]">↗</span>
              </a>
              <a
                href="https://github.com/openai/openai-cookbook/pull/2568"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[#181818] hover:border-white/25 text-[#FAF6F0] font-medium transition-colors duration-300"
              >
                <span>OpenAI Cookbook PR #2568</span>
                <span className="text-[#B8B0A4]">↗</span>
              </a>
              <a
                href="https://www.credly.com/badges/898b89f1-5512-4d4a-8ba6-6a1597c7c510/public_url"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[#181818] hover:border-white/25 text-[#FAF6F0] font-medium transition-colors duration-300"
              >
                <span>AWS Certified AI Practitioner</span>
                <span className="text-[#B8B0A4]">↗</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
