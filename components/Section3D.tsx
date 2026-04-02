'use client';

import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Section3DProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

const spring = { type: 'spring' as const, stiffness: 100, damping: 30, mass: 0.8 };

export default function Section3D({ children, id, className = '' }: Section3DProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 20%'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const z = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  return (
    <section id={id} ref={ref} className={`will-change-transform ${className}`} style={{ perspective: 1200 }}>
      <motion.div style={{ scale, opacity, y, rotateX, z, transformStyle: 'preserve-3d' }} transition={spring}>
        {children}
      </motion.div>
    </section>
  );
}
