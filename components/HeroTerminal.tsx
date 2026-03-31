'use client';

import { useEffect, useRef, useState } from 'react';

const LINES = [
  '> system.status: operational',
  '> latency.delta: -40% (orchestrator)',
  '> graph.nodes: 22 (LangGraph-scale)',
  '> availability.target: 99.98%',
];

const TYPE_MS = 28;
const LINE_PAUSE_MS = 380;

export default function HeroTerminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setLineIdx(LINES.length);
      setCharIdx(0);
      setDone(true);
      return;
    }

    const line = LINES[lineIdx];
    if (!line) {
      setDone(true);
      return;
    }

    if (charIdx < line.length) {
      timerRef.current = setTimeout(() => setCharIdx((c) => c + 1), TYPE_MS);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    timerRef.current = setTimeout(() => {
      if (lineIdx < LINES.length - 1) {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      } else {
        setDone(true);
      }
    }, LINE_PAUSE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lineIdx, charIdx, reduceMotion]);

  const body =
    reduceMotion || done
      ? LINES.join('\n')
      : [
          ...LINES.slice(0, lineIdx),
          lineIdx < LINES.length ? LINES[lineIdx].slice(0, charIdx) : '',
        ]
          .filter(Boolean)
          .join('\n');

  return (
    <div
      className="w-full max-w-lg mx-auto mb-6 text-left glass-card rounded-lg border border-[#1a1a1a]/25 px-3 py-2.5 sm:px-4 sm:py-3 shadow-sm"
      role="status"
      aria-live="polite"
      aria-label="System status summary: operational, latency reduction, graph nodes, availability target"
    >
      <div className="flex items-center gap-2 mb-2 border-b border-[#e5e5e5] pb-2">
        <span className="mono-accent text-[10px] sm:text-xs uppercase tracking-widest text-[#525252]">
          portfolioctl
        </span>
        <span className="text-[10px] text-[#525252]">—</span>
        <span className="mono-accent text-[10px] sm:text-xs text-[#111827]">session.log</span>
      </div>
      <pre className="mono-accent text-[10px] sm:text-xs leading-relaxed text-[#111827] whitespace-pre-wrap break-words overflow-x-auto max-h-[9rem] sm:max-h-[12rem] overflow-y-auto touch-pan-y">
        {body}
        {!reduceMotion && !done ? <span className="inline-block w-2 animate-pulse">▍</span> : null}
      </pre>
    </div>
  );
}
