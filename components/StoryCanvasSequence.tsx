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
            {/* Eyebrow — role only, no visa status */}
            <p className="mono-accent text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase mb-6">
              AI &amp; Full-Stack Engineer&nbsp;·&nbsp;AI Systems&nbsp;·&nbsp;USC CS Graduate
            </p>

            {/* Name + Role headline */}
            <h1 className="font-display font-bold leading-[1.05] text-[var(--text-primary)]">
              <span className="block text-5xl sm:text-7xl lg:text-8xl">{name}</span>
              <span className="mt-3 block text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]/80 font-semibold">
                AI &amp; Full-Stack Engineer
              </span>
            </h1>

            {/* One-liner tagline */}
            <p className="mt-5 max-w-xl text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              I turn AI complexity into products teams can actually ship — fast.
            </p>

            {/* Metrics row */}
            <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
              {metrics.map((m) => (
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

            {/* Primary CTAs — visually prominent */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#projects" id="hero-cta-work" className="btn-primary">
                View my work →
              </a>
              <a href="#contact" id="hero-cta-contact" className="btn-secondary" style={{ borderColor: 'rgba(201,245,101,0.5)', color: 'var(--accent)' }}>
                Let&apos;s talk →
              </a>
            </div>

            {/* Secondary links — de-prioritised */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link
                href="https://github.com/haripriyarao26"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
              >
                GitHub
              </Link>
              <Link
                href="https://linkedin.com/in/haripriya-rao"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
              >
                LinkedIn
              </Link>
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
