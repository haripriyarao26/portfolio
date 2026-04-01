'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseSpotlight() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 200, damping: 28 });
  const springY = useSpring(y, { stiffness: 200, damping: 28 });
  const visible = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    if (mq.matches) {
      visible.current = false;
      return;
    }

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[45] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18)_0%,rgba(34,211,238,0.08)_38%,transparent_65%)] mix-blend-screen will-change-transform md:block"
      style={{ left: springX, top: springY }}
    />
  );
}
