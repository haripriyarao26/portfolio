'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

/* ── 1. React Bits: 3D Tilt + Cursor Spotlight Card ── */
type TiltCard3DProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glareColor?: string;
};

export function TiltCard3D({
  children,
  className = '',
  intensity = 6,
  glareColor = 'rgba(224, 122, 95, 0.16)',
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 160, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 160, damping: 22 });

  const [spotPos, setSpotPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -intensity;
    const rY = ((x - centerX) / centerX) * intensity;

    rotateX.set(rX);
    rotateY.set(rY);
    setSpotPos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setSpotPos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div style={{ perspective: '1100px' }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden transition-colors duration-300 ${className}`}
      >
        {/* Interactive Cursor Glare Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
          style={{
            opacity: spotPos.opacity,
            background: `radial-gradient(480px circle at ${spotPos.x}px ${spotPos.y}px, ${glareColor}, transparent 65%)`,
          }}
        />
        <div className="relative z-10 h-full flex flex-col justify-between" style={{ transform: 'translateZ(12px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* ── 2. React Bits: Magnetic Spring Button Wrapper ── */
type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticButton({ children, className = '', strength = 0.28 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── 3. React Bits: Decrypted / Scrambled Metric Reveal ── */
type DecryptedMetricProps = {
  value: string;
  className?: string;
};

const GLYPHS = '0123456789%X#Δ◊';

export function DecryptedMetric({ value, className = '' }: DecryptedMetricProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const totalFrames = 14;
    const interval = setInterval(() => {
      frame += 1;
      if (frame >= totalFrames) {
        setDisplay(value);
        clearInterval(interval);
        return;
      }
      const progress = frame / totalFrames;
      const lockedChars = Math.floor(progress * value.length);
      const nextStr = value
        .split('')
        .map((ch, idx) => {
          if (idx < lockedChars || ch === ' ') return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');
      setDisplay(nextStr);
    }, 32);

    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

