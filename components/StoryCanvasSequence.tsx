'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';

const FRAME_COUNT = 72;

function drawGeneratedFrame(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: number
) {
  const t = frame / (FRAME_COUNT - 1);

  const baseGradient = context.createLinearGradient(0, 0, width, height);
  baseGradient.addColorStop(0, `hsl(${220 - t * 40} 60% 10%)`);
  baseGradient.addColorStop(0.6, `hsl(${250 - t * 30} 50% 8%)`);
  baseGradient.addColorStop(1, `hsl(${280 - t * 35} 45% 6%)`);
  context.fillStyle = baseGradient;
  context.fillRect(0, 0, width, height);

  const glowA = context.createRadialGradient(
    width * (0.28 + t * 0.06),
    height * (0.18 + t * 0.08),
    0,
    width * (0.28 + t * 0.06),
    height * (0.18 + t * 0.08),
    width * 0.45
  );
  glowA.addColorStop(0, 'rgba(99, 102, 241, 0.65)');
  glowA.addColorStop(1, 'rgba(99, 102, 241, 0)');
  context.fillStyle = glowA;
  context.fillRect(0, 0, width, height);

  const glowB = context.createRadialGradient(
    width * (0.78 - t * 0.08),
    height * (0.76 - t * 0.04),
    0,
    width * (0.78 - t * 0.08),
    height * (0.76 - t * 0.04),
    width * 0.42
  );
  glowB.addColorStop(0, 'rgba(16, 185, 129, 0.30)');
  glowB.addColorStop(1, 'rgba(16, 185, 129, 0)');
  context.fillStyle = glowB;
  context.fillRect(0, 0, width, height);

  context.save();
  context.translate(width / 2, height * 0.62);
  context.scale(1, 0.38);

  for (let i = 0; i < 18; i += 1) {
    const ringSize = width * (0.12 + i * 0.023 + t * 0.008);
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = `hsla(${230 + i * 4}, 80%, 70%, ${0.2 - i * 0.009})`;
    context.arc(0, 0, ringSize, 0, Math.PI * 2);
    context.stroke();
  }
  context.restore();

  const cardCount = 9;
  for (let i = 0; i < cardCount; i += 1) {
    const depth = i / cardCount;
    const cardW = width * (0.74 - depth * 0.5);
    const cardH = height * (0.50 - depth * 0.34);
    const x = (width - cardW) / 2 + Math.sin(t * Math.PI * 2 + i * 0.44) * 28;
    const y = height * 0.18 + depth * height * 0.36 + Math.cos(t * Math.PI + i * 0.32) * 20;

    context.fillStyle = `hsla(${225 + i * 5}, 70%, ${16 + i * 1.8}%, ${0.14 + depth * 0.08})`;
    context.strokeStyle = `hsla(${230 + i * 4}, 75%, 72%, ${0.15 + depth * 0.16})`;
    context.lineWidth = 1.3;
    context.fillRect(x, y, cardW, cardH);
    context.strokeRect(x, y, cardW, cardH);
  }

  context.strokeStyle = 'rgba(255,255,255,0.12)';
  context.lineWidth = 1;
  const horizon = height * (0.72 - t * 0.07);
  for (let i = 0; i < 16; i += 1) {
    const yy = horizon + i * 22;
    context.beginPath();
    context.moveTo(width * 0.12, yy);
    context.lineTo(width * 0.88, yy);
    context.stroke();
  }
}

type StoryCanvasSequenceProps = {
  name: string;
  tagline: string;
};

export default function StoryCanvasSequence({ name, tagline }: StoryCanvasSequenceProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const generatedFramesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const logicalFrameSizeRef = useRef({ width: 960, height: 540 });

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
  const shootingStars = useMemo(() => Array.from({ length: 8 }), []);

  useEffect(() => {
    const generateSequence = () => {
      const maxWidth = Math.min(1180, Math.max(860, window.innerWidth));
      const logicalWidth = Math.round(maxWidth * 0.88);
      const logicalHeight = Math.round((logicalWidth / 16) * 9);

      logicalFrameSizeRef.current = { width: logicalWidth, height: logicalHeight };

      const nextFrames: HTMLImageElement[] = [];
      for (let i = 0; i < FRAME_COUNT; i += 1) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = logicalWidth;
        tempCanvas.height = logicalHeight;
        const tempContext = tempCanvas.getContext('2d');
        if (!tempContext) {
          continue;
        }

        drawGeneratedFrame(tempContext, logicalWidth, logicalHeight, i);

        const image = new Image();
        image.src = tempCanvas.toDataURL('image/webp', 0.9);
        nextFrames.push(image);
      }
      generatedFramesRef.current = nextFrames;
    };

    const paintCurrentFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const viewWidth = window.innerWidth;
      const viewHeight = window.innerHeight;
      canvas.width = Math.floor(viewWidth * dpr);
      canvas.height = Math.floor(viewHeight * dpr);
      canvas.style.width = `${viewWidth}px`;
      canvas.style.height = `${viewHeight}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, viewWidth, viewHeight);

      const frameImage = generatedFramesRef.current[index];
      const { width: logicalWidth, height: logicalHeight } = logicalFrameSizeRef.current;

      const containScale = Math.min(viewWidth / logicalWidth, viewHeight / logicalHeight) * 1.12;
      const renderWidth = logicalWidth * containScale;
      const renderHeight = logicalHeight * containScale;
      const x = (viewWidth - renderWidth) / 2;
      const y = (viewHeight - renderHeight) / 2;

      if (frameImage && frameImage.complete) {
        context.drawImage(frameImage, x, y, renderWidth, renderHeight);
      } else {
        drawGeneratedFrame(context, viewWidth, viewHeight, index);
      }
    };

    generateSequence();
    paintCurrentFrame(frameIndexRef.current);

    const onResize = () => {
      generateSequence();
      paintCurrentFrame(frameIndexRef.current);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const nextIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest * (FRAME_COUNT - 1))));
    if (nextIndex === frameIndexRef.current) {
      return;
    }
    frameIndexRef.current = nextIndex;
    requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const viewWidth = window.innerWidth;
      const viewHeight = window.innerHeight;
      canvas.width = Math.floor(viewWidth * dpr);
      canvas.height = Math.floor(viewHeight * dpr);
      canvas.style.width = `${viewWidth}px`;
      canvas.style.height = `${viewHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, viewWidth, viewHeight);

      const frameImage = generatedFramesRef.current[nextIndex];
      const { width: logicalWidth, height: logicalHeight } = logicalFrameSizeRef.current;
      const containScale = Math.min(viewWidth / logicalWidth, viewHeight / logicalHeight) * 1.12;
      const renderWidth = logicalWidth * containScale;
      const renderHeight = logicalHeight * containScale;
      const x = (viewWidth - renderWidth) / 2;
      const y = (viewHeight - renderHeight) / 2;

      if (frameImage && frameImage.complete) {
        context.drawImage(frameImage, x, y, renderWidth, renderHeight);
      } else {
        drawGeneratedFrame(context, viewWidth, viewHeight, nextIndex);
      }
    });
  });

  return (
    <section ref={sectionRef} id="story" className="relative h-[108vh] sm:h-[112vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />

        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ opacity: [0.38, 0.62, 0.38], scale: [0.95, 1.08, 0.95] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="hero-aurora absolute -left-32 -top-24 h-[26rem] w-[30rem]"
          />
          <motion.div
            animate={{ opacity: [0.28, 0.54, 0.28], scale: [1, 1.12, 1] }}
            transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="hero-aurora hero-aurora-cyan absolute -right-28 top-6 h-[24rem] w-[28rem]"
          />
          <motion.div
            animate={{ x: ['-10%', '8%', '-10%'], opacity: [0.12, 0.26, 0.12] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="hero-light-beam absolute -top-28 left-[6%] h-[30rem] w-[20rem] rotate-[24deg]"
          />
          <motion.div
            animate={{ x: ['6%', '-14%', '6%'], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="hero-light-beam hero-light-beam-alt absolute -top-10 right-[10%] h-[26rem] w-[16rem] -rotate-[18deg]"
          />

          {shootingStars.map((_, i) => (
            <motion.span
              key={`shooting-star-${i}`}
              className="shooting-star"
              style={{
                top: `${8 + i * 10}%`,
                left: `${5 + ((i * 11) % 70)}%`,
                animationDelay: `${i * 1.4}s`,
                animationDuration: `${3.8 + (i % 3) * 0.7}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.66),rgba(2,6,23,0.16)_26%,rgba(2,6,23,0.68))]" />

        <motion.div style={{ opacity: titleOpacity }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6">
          <motion.div
            style={{ y: layerOneY, rotateX: titleRotateX, scale: titleScale }}
            className="pt-28 [transform-style:preserve-3d] sm:pt-36"
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
            className="relative mt-auto mb-16 grid grid-cols-2 gap-3 [transform-style:preserve-3d] sm:mb-20 sm:grid-cols-4"
          >
            <div className="pointer-events-none absolute inset-x-8 -bottom-4 h-8 rounded-full bg-cyan-300/25 blur-2xl" />
            {labels.map((label, index) => (
              <motion.div
                key={label.title}
                whileHover={{ y: -6, rotateX: 8, rotateY: index % 2 === 0 ? -8 : 8, scale: 1.03 }}
                transition={{ duration: 0.24 }}
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
