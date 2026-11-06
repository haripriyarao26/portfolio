'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type RGB = [number, number, number];

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixRGB(c1: RGB, c2: RGB, t: number): string {
  const r = Math.round(lerp(c1[0], c2[0], t));
  const g = Math.round(lerp(c1[1], c2[1], t));
  const b = Math.round(lerp(c1[2], c2[2], t));
  return `rgb(${r}, ${g}, ${b})`;
}

export type WordSegment = {
  text: string;
  highlight?: boolean;
  lineBreakAfter?: boolean;
};

/**
 * Exact Halden Per-Character Blur + Color Reveal:
 * - t = 0: opacity 0, color = ghost, blur(8px)
 * - t 0 -> 0.35: opacity 0 -> 1, color = ghost, blur(8px -> 1.5px)
 * - t 0.35 -> 0.70: opacity 1, color = ghost -> accent, blur(1.5px -> 0px)
 * - t 0.70 -> 1.0: opacity 1, color = accent -> final (or highlightColor for flagged words), blur(0px)
 */
export function HaldenLetterReveal({
  segments,
  mode = 'scroll',
  durationMs = 1250,
  delayMs = 180,
  spread = 0.35,
  theme = 'light',
  progressOverride,
  className = '',
  as: Tag = 'h2',
}: {
  segments: WordSegment[];
  mode?: 'load' | 'scroll' | 'external';
  durationMs?: number;
  delayMs?: number;
  spread?: number;
  theme?: 'light' | 'dark';
  progressOverride?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const charRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const charFlags = useRef<boolean[]>([]);

  // Flatten segments into words & characters so lines never break mid-word
  const parsedWords = React.useMemo(() => {
    const words: Array<{
      chars: Array<{ ch: string; highlight: boolean; globalIdx: number }>;
      lineBreakAfter?: boolean;
    }> = [];
    let counter = 0;

    segments.forEach(seg => {
      const rawWords = seg.text.split(' ');
      rawWords.forEach((w, wIdx) => {
        if (!w) return;
        const chars = w.split('').map(ch => {
          const item = { ch, highlight: Boolean(seg.highlight), globalIdx: counter };
          counter += 1;
          return item;
        });
        words.push({
          chars,
          lineBreakAfter: seg.lineBreakAfter && wIdx === rawWords.length - 1,
        });
      });
    });

    return { words, totalChars: Math.max(1, counter) };
  }, [segments]);

  useEffect(() => {
    charFlags.current = [];
    parsedWords.words.forEach(w => {
      w.chars.forEach(c => {
        charFlags.current[c.globalIdx] = c.highlight;
      });
    });
  }, [parsedWords]);

  const paint = React.useCallback(
    (p: number) => {
      const n = parsedWords.totalChars;
      const ghost: RGB = theme === 'dark' ? [92, 111, 146] : [255, 255, 255];
      const accent: RGB = theme === 'dark' ? [143, 230, 244] : [63, 124, 255];
      const finalMain: RGB = theme === 'dark' ? [255, 255, 255] : [11, 29, 58];
      const finalHl: RGB = theme === 'dark' ? [143, 230, 244] : [91, 124, 240];

      for (let i = 0; i < n; i++) {
        const el = charRefs.current[i];
        if (!el) continue;
        const isHl = charFlags.current[i];
        const t = clamp((p * (1 + spread) - i / n) / spread, 0, 1);

        let opacity = 0;
        let color = `rgb(${ghost[0]}, ${ghost[1]}, ${ghost[2]})`;
        let blur = 8;

        if (t <= 0) {
          opacity = 0;
          blur = 8;
        } else if (t < 0.35) {
          const u = t / 0.35;
          opacity = u;
          blur = lerp(8, 1.5, u);
          color = `rgb(${ghost[0]}, ${ghost[1]}, ${ghost[2]})`;
        } else if (t < 0.7) {
          const u = (t - 0.35) / 0.35;
          opacity = 1;
          blur = lerp(1.5, 0, u);
          color = mixRGB(ghost, accent, u);
        } else {
          const u = (t - 0.7) / 0.3;
          opacity = 1;
          blur = 0;
          color = mixRGB(accent, isHl ? finalHl : finalMain, u);
        }

        el.style.opacity = opacity.toFixed(3);
        el.style.color = color;
        el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none';
      }
    },
    [parsedWords.totalChars, spread, theme]
  );

  // External progress mode (used by Pinned Statement)
  useEffect(() => {
    if (mode !== 'external' || typeof progressOverride !== 'number') return;
    paint(progressOverride);
  }, [mode, progressOverride, paint]);

  // Time-based load reveal (used by Hero Headline #h1)
  useEffect(() => {
    if (mode !== 'load') return;
    paint(0);
    let raf = 0;
    const start = performance.now() + delayMs;

    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - start;
      const p = clamp(elapsed / durationMs, 0, 1);
      paint(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, durationMs, delayMs, paint]);

  // Scroll-based reveal (used by Section Headings & Dark Split Headline)
  useEffect(() => {
    if (mode !== 'scroll') return;
    paint(0);
    let raf = 0;

    const updateOnScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = clamp((vh * 0.88 - rect.top) / (vh * 0.52), 0, 1);
      paint(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateOnScroll);
    };

    updateOnScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [mode, paint]);

  return (
    <Tag ref={containerRef as any} className={className}>
      {parsedWords.words.map((word, wIdx) => (
        <React.Fragment key={wIdx}>
          <span className="inline-block whitespace-nowrap">
            {word.chars.map(c => (
              <span
                key={c.globalIdx}
                ref={el => {
                  charRefs.current[c.globalIdx] = el;
                }}
                style={{ opacity: 0, filter: 'blur(8px)', willChange: 'opacity, filter, color' }}
              >
                {c.ch}
              </span>
            ))}
          </span>
          {word.lineBreakAfter ? <br className="hidden sm:inline" /> : null}{' '}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/**
 * Exact Halden Button (.btn & .btn.lg):
 * Navy pill button with a glowing cyan dot (#2fe0d0) that expands on hover
 * into a cyan circle holding a navy chevron.
 */
export function HaldenButton({
  href,
  onClick,
  children,
  size = 'md',
  variant = 'navy',
  download,
  target,
  rel,
  className = '',
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  size?: 'md' | 'lg';
  variant?: 'navy' | 'ghost';
  download?: string;
  target?: string;
  rel?: string;
  className?: string;
}) {
  if (variant === 'ghost') {
    const ghostCls = `inline-flex items-center justify-center rounded-full border border-[#0b1d3a]/15 bg-white/80 hover:bg-white text-[#0b1d3a] font-medium transition-all duration-300 ${
      size === 'lg' ? 'h-[56px] px-7 text-[15px]' : 'h-[42px] px-5 text-[13.5px]'
    } ${className}`;
    if (href) {
      return (
        <a href={href} download={download} target={target} rel={rel} className={ghostCls}>
          {children}
        </a>
      );
    }
    return (
      <button type="button" onClick={onClick} className={ghostCls}>
        {children}
      </button>
    );
  }

  const baseCls = `halden-btn ${size === 'lg' ? 'halden-btn-lg' : ''} ${className}`;

  const inner = (
    <>
      <span className="halden-btn-label">{children}</span>
      <span className="halden-btn-dot" aria-hidden="true">
        <svg viewBox="0 0 12 12" fill="none">
          <path
            d="M4.5 2.5 8 6l-3.5 3.5"
            stroke="#0b1d3a"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} download={download} target={target} rel={rel} className={baseCls}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseCls}>
      {inner}
    </button>
  );
}

/**
 * Exact Halden Pinned Scroll Statement Section:
 * Rises from below as the sky-cyan bowl floods the viewport, revealing letter by letter
 * from blurred white -> electric blue (#3f7cff) -> deep navy (#0b1d3a).
 */
export function HaldenPinnedStatement({
  onNavActivate,
}: {
  onNavActivate?: (active: boolean) => void;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  const statementSegments: WordSegment[] = [
    { text: 'Haripriya builds', highlight: false },
    { text: 'production AI systems', highlight: true, lineBreakAfter: true },
    { text: 'that slash token costs 96%, cut latency in half,', lineBreakAfter: true },
    { text: 'enforce deterministic AST guardrails, and scale', lineBreakAfter: true },
    { text: 'multi-agent workflows at 99.98% uptime.', highlight: false },
  ];

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const scrolled = -rect.top;
      const totalScrollable = Math.max(1, rect.height - vh);
      const p = clamp(scrolled / totalScrollable, 0, 1);
      const s = clamp(p * 1.35, 0, 1);

      if (textWrapRef.current) {
        const yOffset = 0.18 * Math.pow(1 - s, 2) * vh;
        textWrapRef.current.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
      }

      setRevealProgress(p);
      if (onNavActivate) {
        onNavActivate(p > 0.25 || rect.top < 0);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onNavActivate]);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative h-[210vh] -mt-[14vh] pointer-events-none select-none"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 sm:px-12">
        <div
          ref={textWrapRef}
          className="max-w-5xl text-center will-change-transform"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-[#0b1d3a]/10 px-4 py-1.5 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2fe0d0]" />
            <span className="mono-accent text-xs font-semibold uppercase tracking-[0.16em] text-[#1d2f4f]">
              WHY ENGINEERING LEADERS HIRE ME
            </span>
          </div>

          <HaldenLetterReveal
            as="p"
            mode="external"
            progressOverride={revealProgress}
            spread={0.18}
            segments={statementSegments}
            className="font-display text-[clamp(24px,3.1vw,46px)] font-normal leading-[1.18] tracking-[-0.03em] text-[#0b1d3a]"
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Scroll-Choreographed Motion Wrapper for Cards & Paragraphs
 * (Replaces static cards with smooth Halden cubic-bezier(.22,.7,.2,1) entrance + blur-to-crisp motion).
 */
export function HaldenFadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, margin: '-8% 0px -8% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 18, filter: 'blur(4px)' }
      }
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 0.7, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
