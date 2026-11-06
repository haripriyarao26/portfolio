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

/* ── 2. JPMorgan Chase: Luminous Studio 2x Speedup Visual ── */
export function JpmcSpeedupLottie() {
  return (
    <div className="relative h-32 w-full rounded-2xl border border-white/90 bg-white/55 p-4 flex items-center justify-between overflow-hidden shadow-inner">
      {/* Left: Stacked Email Thread */}
      <div className="relative z-10 w-24 rounded-xl border border-slate-200 bg-white p-2.5 overflow-hidden shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="h-1.5 w-6 rounded bg-[#D97706]" />
            <span className="mono-accent text-[10px] text-[#64748B]">6 emails</span>
          </div>
          <div className="h-1.5 w-full rounded bg-slate-200" />
          <div className="h-1.5 w-4/5 rounded bg-slate-200" />
        </div>
        <motion.div
          animate={{ y: [-4, 42, -4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0 right-0 top-0 h-0.5 bg-[#D97706]"
        />
      </div>

      {/* Center: Speed Gauge */}
      <div className="relative z-10 flex flex-col items-center">
        <svg className="w-24 h-14" viewBox="0 0 100 56" fill="none">
          <path
            d="M 16 48 A 34 34 0 0 1 84 48"
            stroke="#E2E8F0"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <motion.path
            d="M 16 48 A 34 34 0 0 1 84 48"
            stroke="#0F141C"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="108"
            animate={{ strokeDashoffset: [108, 48, 48] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <text x="50" y="45" textAnchor="middle" fill="#0F141C" fontSize="13" fontWeight="600">
            19.6s
          </text>
        </svg>
        <span className="mono-accent text-xs text-[#D97706] font-semibold">2x Faster</span>
      </div>

      {/* Right: Verified Checkmarks */}
      <div className="relative z-10 flex flex-col gap-1">
        {['Entities ✓', 'Amounts ✓', '95% Match ✓'].map((label, idx) => (
          <motion.div
            key={label}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: idx * 0.3, repeat: Infinity }}
            className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-mono text-emerald-800"
          >
            {label}
          </motion.div>
        ))}
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
