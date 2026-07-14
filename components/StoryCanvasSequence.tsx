'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const metrics = [
  { value: '96%',      label: 'Token cost reduction' },
  { value: '40%',      label: 'Latency cut' },
  { value: '$1,800/mo', label: 'Cloud cost saved' },
];

type Props = { name: string; tagline: string };

export default function StoryCanvasSequence({ name, tagline }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end 45%'],
  });

  const layerOneY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} id="story" className="relative h-[110vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: titleOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 sm:px-10"
        >
          <motion.div
            style={{ y: layerOneY }}
            className="will-change-transform pointer-events-auto"
          >
            {/* Eyebrow */}
            <p className="mono-accent text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase mb-6">
              Software Engineer&nbsp;·&nbsp;AI Systems&nbsp;·&nbsp;H1-B Cap-Exempt
            </p>

            {/* Name + Headline */}
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-[var(--text-primary)] sm:text-7xl lg:text-8xl">
              {name}
              <span className="mt-3 block text-[var(--text-primary)]/80 font-semibold text-4xl sm:text-5xl lg:text-6xl">
                Ship products that feel inevitable.
              </span>
            </h1>

            {/* Metrics row */}
            <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
              {metrics.map((m, i) => (
                <div key={m.label}>
                  <p className="font-display font-bold leading-none text-[var(--accent)] text-[3.5rem] sm:text-[5rem]">
                    {m.value}
                  </p>
                  <p className="mono-accent mt-1.5 text-[11px] tracking-[0.15em] text-[var(--text-muted)] uppercase">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="https://github.com/haripriyarao26"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-5 py-2.5 text-sm text-[var(--text-primary)] transition-colors hover:border-white/20 hover:bg-white/10"
              >
                GitHub
              </Link>
              <Link
                href="https://linkedin.com/in/haripriya-rao"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-5 py-2.5 text-sm text-[var(--text-primary)] transition-colors hover:border-white/20 hover:bg-white/10"
              >
                LinkedIn
              </Link>
              <a
                href="/resume.pdf"
                download
                className="rounded-full border border-[var(--accent)]/40 bg-transparent px-5 py-2.5 text-sm text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Scroll chevron */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <svg
              className="chevron-bob h-6 w-6 text-[var(--text-muted)]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
