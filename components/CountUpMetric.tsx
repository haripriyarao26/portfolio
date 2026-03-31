'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpMetricProps {
  value: number;
  suffix?: string;
  label: string;
  durationMs?: number;
}

export default function CountUpMetric({
  value,
  suffix = '',
  label,
  durationMs = 1400,
}: CountUpMetricProps) {
  const [display, setDisplay] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = 0;
    let raf = 0;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / durationMs, 1);
      setDisplay(Math.round(value * progress));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, value, durationMs]);

  return (
    <div
      ref={ref}
      className="glass-card rounded-xl px-4 py-3 border border-[#1a1a1a]/20 min-w-[140px]"
    >
      <div className="text-2xl font-bold text-[#111827] font-mono">{display}{suffix}</div>
      <div className="text-xs uppercase tracking-[0.12em] text-[#525252] font-mono mt-1">
        {label}
      </div>
    </div>
  );
}
