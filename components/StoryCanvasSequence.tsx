'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const labels = [
  { title: 'AI Systems', tone: 'from-cyan-300/30 to-indigo-300/10' },
  { title: 'Product Velocity', tone: 'from-indigo-300/30 to-violet-300/10' },
  { title: 'Human-centered UX', tone: 'from-sky-300/30 to-cyan-300/10' },
  { title: 'Production Reliability', tone: 'from-emerald-300/25 to-cyan-300/10' },
];

type Props = { name: string; tagline: string };

export default function StoryCanvasSequence({ name, tagline }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end 45%'],
  });

  const layerOneY = useTransform(scrollYProgress, [0, 0.45, 1], ['0%', '-34%', '-48%']);
  const layerTwoY = useTransform(scrollYProgress, [0, 0.45, 1], ['0%', '-52%', '-72%']);
  const layerThreeY = useTransform(scrollYProgress, [0, 0.45, 1], ['0%', '-70%', '-90%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.94, 0.88]);
  const titleRotateX = useTransform(scrollYProgress, [0, 0.45, 1], [0, 14, 20]);
  const titleScale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.92, 0.85]);
  const chipsRotateX = useTransform(scrollYProgress, [0, 0.45, 1], [0, -10, -16]);
  const chipsScale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.92, 0.86]);

  return (
    <section ref={sectionRef} id="story" className="relative h-[108vh] sm:h-[112vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* We keep the transparent gradients to blend the hero title with the new Global3DScene underneath */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.72)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0),rgba(2,6,23,0.16)_26%,rgba(2,6,23,0.75))]" />
        </div>

        <motion.div style={{ opacity: titleOpacity }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 pointer-events-none">
          <motion.div
            style={{ y: layerOneY, rotateX: titleRotateX, scale: titleScale }}
            className="pt-28 will-change-transform [transform-style:preserve-3d] sm:pt-36 pointer-events-auto"
          >
            <p className="tracking-[0.26em] text-indigo-200/80 uppercase text-xs sm:text-sm">
              Design x Engineering Narrative
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              {name}
              <span className="mt-8 block text-white/85">Ship products that feel inevitable.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base text-slate-100/85 sm:text-lg">{tagline}</p>
          </motion.div>

          <motion.div
            style={{ y: layerTwoY, rotateX: chipsRotateX, scale: chipsScale }}
            className="relative mt-auto mb-16 grid grid-cols-2 gap-3 will-change-transform [transform-style:preserve-3d] sm:mb-20 sm:grid-cols-4 pointer-events-auto"
          >
            <div className="pointer-events-none absolute inset-x-8 -bottom-4 h-8 rounded-full bg-cyan-300/25 blur-2xl" />
            {labels.map((label, index) => (
              <motion.div
                key={label.title}
                whileHover={{ y: -6, rotateX: 8, rotateY: index % 2 === 0 ? -8 : 8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="glass-premium group relative overflow-hidden rounded-2xl px-4 py-3 text-center text-xs text-slate-100 [transform-style:preserve-3d] sm:text-sm"
                style={{ perspective: 1200 }}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${label.tone} opacity-30`} />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-white/30" />
                <div className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.28)_50%,transparent_75%)] transition-transform duration-700 group-hover:translate-x-[130%]" />
                <span className="relative tracking-[0.08em]">{label.title}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            style={{ y: layerThreeY }}
            className="absolute right-6 bottom-8 text-xs tracking-[0.35em] text-white/70 uppercase sm:right-10 pointer-events-auto"
          >
            Scroll to enter the story
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
