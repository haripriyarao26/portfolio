'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

const FRAME_COUNT = 48;

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  frame: number
) {
  const t = frame / (FRAME_COUNT - 1);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, `hsl(${220 - t * 40} 60% 10%)`);
  bg.addColorStop(0.6, `hsl(${250 - t * 30} 50% 8%)`);
  bg.addColorStop(1, `hsl(${280 - t * 35} 45% 6%)`);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const gA = ctx.createRadialGradient(
    w * (0.28 + t * 0.06), h * (0.18 + t * 0.08), 0,
    w * (0.28 + t * 0.06), h * (0.18 + t * 0.08), w * 0.45
  );
  gA.addColorStop(0, 'rgba(99,102,241,0.65)');
  gA.addColorStop(1, 'rgba(99,102,241,0)');
  ctx.fillStyle = gA;
  ctx.fillRect(0, 0, w, h);

  const gB = ctx.createRadialGradient(
    w * (0.78 - t * 0.08), h * (0.76 - t * 0.04), 0,
    w * (0.78 - t * 0.08), h * (0.76 - t * 0.04), w * 0.42
  );
  gB.addColorStop(0, 'rgba(16,185,129,0.30)');
  gB.addColorStop(1, 'rgba(16,185,129,0)');
  ctx.fillStyle = gB;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(w / 2, h * 0.62);
  ctx.scale(1, 0.38);
  for (let i = 0; i < 14; i += 1) {
    const r = w * (0.12 + i * 0.025 + t * 0.008);
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = `hsla(${230 + i * 5},80%,70%,${0.18 - i * 0.011})`;
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  for (let i = 0; i < 7; i += 1) {
    const d = i / 7;
    const cw = w * (0.74 - d * 0.5);
    const ch = h * (0.50 - d * 0.34);
    const x = (w - cw) / 2 + Math.sin(t * Math.PI * 2 + i * 0.44) * 24;
    const y = h * 0.18 + d * h * 0.36 + Math.cos(t * Math.PI + i * 0.32) * 16;
    ctx.fillStyle = `hsla(${225 + i * 6},70%,${16 + i * 2}%,${0.14 + d * 0.08})`;
    ctx.strokeStyle = `hsla(${230 + i * 5},75%,72%,${0.15 + d * 0.16})`;
    ctx.lineWidth = 1;
    ctx.fillRect(x, y, cw, ch);
    ctx.strokeRect(x, y, cw, ch);
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.10)';
  ctx.lineWidth = 1;
  const horizon = h * (0.72 - t * 0.07);
  for (let i = 0; i < 12; i += 1) {
    const yy = horizon + i * 24;
    ctx.beginPath();
    ctx.moveTo(w * 0.14, yy);
    ctx.lineTo(w * 0.86, yy);
    ctx.stroke();
  }
}

type Props = { name: string; tagline: string };

export default function StoryCanvasSequence({ name, tagline }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

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

  const labels = useMemo(
    () => [
      { title: 'AI Systems', tone: 'from-cyan-300/30 to-indigo-300/10' },
      { title: 'Product Velocity', tone: 'from-indigo-300/30 to-violet-300/10' },
      { title: 'Human-centered UX', tone: 'from-sky-300/30 to-cyan-300/10' },
      { title: 'Production Reliability', tone: 'from-emerald-300/25 to-cyan-300/10' },
    ],
    []
  );

  const syncSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (sizeRef.current.w === w && sizeRef.current.h === h && sizeRef.current.dpr === dpr) return;
    sizeRef.current = { w, h, dpr };
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }, []);

  const paint = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    syncSize();
    const { w, h, dpr } = sizeRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    drawFrame(ctx, w, h, frame);
  }, [syncSize]);

  useEffect(() => {
    paint(0);
    const onResize = () => {
      sizeRef.current = { w: 0, h: 0, dpr: 1 };
      paint(frameRef.current);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [paint]);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const next = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest * (FRAME_COUNT - 1))));
    if (next === frameRef.current) return;
    frameRef.current = next;
    requestAnimationFrame(() => paint(next));
  });

  return (
    <section ref={sectionRef} id="story" className="relative h-[108vh] sm:h-[112vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />

        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="hero-aurora absolute -left-32 -top-24 h-[26rem] w-[30rem] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="hero-aurora hero-aurora-cyan absolute -right-28 top-6 h-[24rem] w-[28rem] animate-[pulse_9.5s_ease-in-out_infinite_0.8s]" />
          <div className="hero-light-beam absolute -top-28 left-[6%] h-[30rem] w-[20rem] rotate-[24deg] animate-[float_7s_ease-in-out_infinite]" />
          <div className="hero-light-beam hero-light-beam-alt absolute -top-10 right-[10%] h-[26rem] w-[16rem] -rotate-[18deg] animate-[float_8.8s_ease-in-out_infinite_0.5s]" />

          {[0, 1, 2, 3].map(i => (
            <span
              key={`shoot-${i}`}
              className="shooting-star"
              style={{
                top: `${10 + i * 20}%`,
                left: `${8 + ((i * 18) % 60)}%`,
                animationDelay: `${i * 2.2}s`,
                animationDuration: `${4 + (i % 3) * 0.8}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.66),rgba(2,6,23,0.16)_26%,rgba(2,6,23,0.68))]" />

        <motion.div style={{ opacity: titleOpacity }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6">
          <motion.div
            style={{ y: layerOneY, rotateX: titleRotateX, scale: titleScale }}
            className="pt-28 will-change-transform [transform-style:preserve-3d] sm:pt-36"
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
            className="relative mt-auto mb-16 grid grid-cols-2 gap-3 will-change-transform [transform-style:preserve-3d] sm:mb-20 sm:grid-cols-4"
          >
            <div className="pointer-events-none absolute inset-x-8 -bottom-4 h-8 rounded-full bg-cyan-300/25 blur-2xl" />
            {labels.map((label, index) => (
              <motion.div
                key={label.title}
                whileHover={{ y: -6, rotateX: 8, rotateY: index % 2 === 0 ? -8 : 8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-cyan-100/22 bg-slate-900/55 px-4 py-3 text-center text-xs text-slate-100 shadow-[0_18px_40px_rgba(0,0,0,0.45)] [transform-style:preserve-3d] backdrop-blur-xl sm:text-sm"
                style={{ perspective: 1200 }}
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${label.tone} opacity-60`} />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-white/45" />
                <div className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.28)_50%,transparent_75%)] transition-transform duration-700 group-hover:translate-x-[130%]" />
                <span className="relative tracking-[0.08em]">{label.title}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            style={{ y: layerThreeY }}
            className="absolute right-6 bottom-8 text-xs tracking-[0.35em] text-white/70 uppercase sm:right-10"
          >
            Scroll to enter the story
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
