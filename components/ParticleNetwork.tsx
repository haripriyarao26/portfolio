'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT   = 90;
const CONNECTION_DIST  = 160;   // px — max distance to draw an edge
const SPEED            = 0.35;  // base drift speed
const MOUSE_RADIUS     = 120;   // px — influence radius around cursor
const MOUSE_FORCE      = 0.018; // how strongly particles are pulled toward mouse
const ACCENT_COLOR     = '#C9F565'; // chartreuse
const NODE_COLOR       = 'rgba(242, 237, 228, 0.7)'; // --text-primary at 70%
const LINE_COLOR_BASE  = 'rgba(242, 237, 228,'; // alpha appended per distance

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean; // chartreuse highlight node
};

function makeParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    r: Math.random() * 1.5 + 1,
    accent: i % 14 === 0, // ~7% are chartreuse accent nodes
  }));
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = makeParticles(canvas.width, canvas.height);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // ── Update positions ──────────────────────────────
      for (const p of particles) {
        // Gentle mouse attraction
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          p.vx += (dx / dist) * MOUSE_FORCE;
          p.vy += (dy / dist) * MOUSE_FORCE;
        }

        // Dampen so velocity doesn't accumulate forever
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      // ── Draw edges ────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d > CONNECTION_DIST) continue;

          const alpha = (1 - d / CONNECTION_DIST) * 0.35;

          // Accent edge when either node is highlighted
          if (a.accent || b.accent) {
            ctx.strokeStyle = `rgba(201, 245, 101, ${alpha * 0.7})`;
          } else {
            ctx.strokeStyle = `${LINE_COLOR_BASE} ${alpha})`;
          }

          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // ── Draw nodes ────────────────────────────────────
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        if (p.accent) {
          // Glow ring
          ctx.shadowBlur  = 10;
          ctx.shadowColor = ACCENT_COLOR;
          ctx.fillStyle   = ACCENT_COLOR;
        } else {
          ctx.shadowBlur  = 0;
          ctx.fillStyle   = NODE_COLOR;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize',     resize);
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.55 }}
    />
  );
}
