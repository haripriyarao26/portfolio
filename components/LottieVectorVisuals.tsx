'use client';

import { motion } from 'framer-motion';

/* ── 1. Onetera: Luminous Studio 200KB -> 8KB Funnel Compression Visual ── */
export function OneteraCompressionLottie() {
  return (
    <div className="relative h-32 w-full rounded-2xl border border-white/90 bg-white/55 p-4 flex items-center justify-between overflow-hidden shadow-inner">
      {/* Left: Bulky 200KB Stack */}
      <div className="relative z-10 flex flex-col items-center gap-1 w-20">
        <motion.div
          animate={{ scale: [1, 0.95, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 rounded-xl border border-rose-300 bg-rose-50 p-2 space-y-1"
        >
          <div className="h-1.5 w-full rounded bg-rose-400" />
          <div className="h-1.5 w-4/5 rounded bg-rose-300" />
          <div className="h-1.5 w-full rounded bg-rose-400" />
        </motion.div>
        <span className="mono-accent text-xs font-semibold text-rose-600">200 KB</span>
      </div>

      {/* Center: Animated Golden Fiber Filter Stream */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-2">
        <svg className="w-full h-14 overflow-visible" viewBox="0 0 180 60" fill="none">
          <path
            d="M 10 14 C 65 14, 75 26, 170 30"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 10 46 C 65 46, 75 34, 170 30"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path d="M 10 30 L 170 30" stroke="#F59E0B" strokeWidth="2" />

          <motion.circle
            r="4.5"
            fill="#D97706"
            animate={{ cx: [15, 90, 165], cy: [14, 28, 30], scale: [1.1, 0.9, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            r="4.5"
            fill="#0F141C"
            animate={{ cx: [15, 90, 165], cy: [46, 32, 30], scale: [1.1, 0.9, 0.7] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <circle cx="90" cy="30" r="14" fill="#0F141C" />
          <text x="90" y="33" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">
            -96%
          </text>
        </svg>
        <span className="mono-accent text-xs text-[#64748B]">Smart Filter</span>
      </div>

      {/* Right: Sleek 8KB Capsule */}
      <div className="relative z-10 flex flex-col items-center gap-1 w-20">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="px-3 py-1.5 rounded-full border border-emerald-400 bg-emerald-50 flex items-center gap-1.5 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="mono-accent text-xs font-semibold text-emerald-800">8 KB</span>
        </motion.div>
        <span className="mono-accent text-xs font-semibold text-emerald-700">Instant</span>
      </div>
    </div>
  );
}

/* ── 2. Onetera: Parallel 22-Node State Machine & Concurrency Visual ── */
export function OneteraParallelEngineLottie() {
  return (
    <div className="relative h-32 w-full rounded-2xl border border-white/90 bg-white/55 p-4 flex items-center justify-between overflow-hidden shadow-inner">
      {/* Left: Input Payload & DAG Root */}
      <div className="relative z-10 flex flex-col items-center gap-1 w-20">
        <div className="w-14 rounded-xl border border-slate-200 bg-white p-2 text-center shadow-sm">
          <span className="mono-accent text-[10px] text-[#5b7cf0] font-bold block">255+</span>
          <span className="text-[9px] text-[#3e4d68] block">Steps</span>
        </div>
        <span className="mono-accent text-[10px] text-[#5b7cf0] font-semibold">Workflow</span>
      </div>

      {/* Center: 3 Concurrent Async Pipelines */}
      <div className="relative z-10 flex-1 flex flex-col gap-2 px-3">
        {[
          { label: 'asyncio.gather', color: '#5b7cf0', speed: 1.6 },
          { label: 'Redis Locks', color: '#2fe0d0', speed: 1.3 },
          { label: 'ClickHouse', color: '#0b1d3a', speed: 1.9 },
        ].map((lane, idx) => (
          <div key={lane.label} className="flex items-center gap-2">
            <span className="mono-accent text-[9px] text-[#3e4d68] w-20 shrink-0 truncate">
              {lane.label}
            </span>
            <div className="h-2 flex-1 rounded-full bg-slate-200/80 overflow-hidden relative">
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: lane.speed,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.2,
                }}
                className="h-full w-1/2 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${lane.color})`,
                }}
              />
            </div>
          </div>
        ))}
        <div className="text-center mt-0.5">
          <span className="mono-accent text-[10px] text-[#2fe0d0] font-bold uppercase tracking-wider">
            Zero Round-Trip Wait (-40%)
          </span>
        </div>
      </div>

      {/* Right: Live Telemetry SLA */}
      <div className="relative z-10 flex flex-col items-center gap-1 w-20">
        <div className="px-2.5 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 text-center shadow-sm">
          <span className="mono-accent text-[11px] font-bold text-emerald-800 block">99.98%</span>
        </div>
        <span className="mono-accent text-[10px] font-semibold text-emerald-700">Uptime</span>
      </div>
    </div>
  );
}

/* ── 3. How I Work Micro-Visuals ── */
export function PrincipleMicroLottie({ type }: { type: 'shield' | 'parallel' | 'check' }) {
  if (type === 'shield') {
    return (
      <div className="h-20 w-full rounded-xl border border-white/90 bg-white/55 flex items-center justify-center overflow-hidden mb-4">
        <svg className="w-36 h-16" viewBox="0 0 160 70" fill="none">
          <motion.circle
            r="4"
            fill="#F43F5E"
            animate={{ cx: [15, 62, 15], opacity: [1, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }}
            cy="35"
          />
          <motion.path
            d="M80 12 L98 20 V35 C98 48 80 58 80 58 C80 58 62 48 62 35 V20 L80 12 Z"
            fill="rgba(217, 119, 6, 0.14)"
            stroke="#0F141C"
            strokeWidth="2"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            r="4"
            fill="#10B981"
            animate={{ cx: [98, 145], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            cy="35"
          />
        </svg>
      </div>
    );
  }

  if (type === 'parallel') {
    return (
      <div className="h-20 w-full rounded-xl border border-white/90 bg-white/55 flex items-center justify-center overflow-hidden mb-4 px-5">
        <div className="w-full space-y-2">
          {[0, 1, 2].map(lane => (
            <div key={lane} className="h-2 w-full rounded-full bg-slate-200 overflow-hidden relative">
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: lane * 0.08 }}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-[#D97706] to-[#0F141C]"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-20 w-full rounded-xl border border-white/90 bg-white/55 flex items-center justify-center overflow-hidden mb-4">
      <div className="flex items-center gap-3">
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 8 }).map((_, idx) => (
            <motion.span
              key={idx}
              animate={{ backgroundColor: ['#E2E8F0', '#10B981', '#10B981'] }}
              transition={{ duration: 2, delay: idx * 0.1, repeat: Infinity }}
              className="h-3 w-3 rounded-sm"
            />
          ))}
        </div>
        <div className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 font-mono text-xs text-emerald-800 font-semibold">
          100/100 PASS
        </div>
      </div>
    </div>
  );
}
