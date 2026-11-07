'use client';

import { motion } from 'framer-motion';

/* ── 1. Onetera: Particle Stream Funnel Compression (200KB Bloat -> 8KB Pure) ── */
export function OneteraCompressionLottie() {
  // Dense stream of 16 bloated JSON particles converging into the filter
  const BLOATED_PARTICLES = [
    { id: 1, yStart: 12, yMid: 24, color: '#F43F5E', r: 3.5, delay: 0.0, dur: 1.8 },
    { id: 2, yStart: 18, yMid: 26, color: '#FB7185', r: 3.0, delay: 0.2, dur: 1.6 },
    { id: 3, yStart: 25, yMid: 28, color: '#FDA4AF', r: 4.0, delay: 0.45, dur: 1.9 },
    { id: 4, yStart: 32, yMid: 31, color: '#94A3B8', r: 2.8, delay: 0.1, dur: 1.7 },
    { id: 5, yStart: 39, yMid: 34, color: '#E11D48', r: 3.6, delay: 0.35, dur: 1.85 },
    { id: 6, yStart: 46, yMid: 37, color: '#FB7185', r: 3.2, delay: 0.6, dur: 1.65 },
    { id: 7, yStart: 52, yMid: 39, color: '#CBD5E1', r: 2.5, delay: 0.8, dur: 1.75 },
    { id: 8, yStart: 15, yMid: 25, color: '#FDA4AF', r: 3.2, delay: 0.95, dur: 1.8 },
    { id: 9, yStart: 22, yMid: 27, color: '#F43F5E', r: 3.8, delay: 1.15, dur: 1.7 },
    { id: 10, yStart: 30, yMid: 30, color: '#94A3B8', r: 2.6, delay: 0.3, dur: 1.9 },
    { id: 11, yStart: 37, yMid: 33, color: '#FB7185', r: 3.4, delay: 0.7, dur: 1.6 },
    { id: 12, yStart: 44, yMid: 36, color: '#E11D48', r: 3.0, delay: 1.25, dur: 1.8 },
    { id: 13, yStart: 49, yMid: 38, color: '#FDA4AF', r: 2.7, delay: 0.5, dur: 1.75 },
    { id: 14, yStart: 14, yMid: 24, color: '#CBD5E1', r: 3.5, delay: 1.4, dur: 1.65 },
    { id: 15, yStart: 28, yMid: 29, color: '#F43F5E', r: 4.0, delay: 1.55, dur: 1.85 },
    { id: 16, yStart: 42, yMid: 35, color: '#FB7185', r: 3.1, delay: 0.85, dur: 1.7 },
  ];

  // Only 2 stream particles survive the -96% filter
  const FILTERED_SURVIVORS = [
    { id: 101, y: 30, color: '#10B981', r: 3.6, delay: 0.7, dur: 1.6 },
    { id: 102, y: 34, color: '#2fe0d0', r: 3.6, delay: 1.5, dur: 1.6 },
  ];

  return (
    <div className="relative h-36 w-full rounded-2xl border border-white/90 bg-white/60 p-4 flex items-center justify-between overflow-hidden shadow-inner">
      {/* Left: Bulky 200KB Input Stack */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 w-20 shrink-0">
        <motion.div
          animate={{ scale: [1, 0.96, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 rounded-xl border border-rose-300 bg-rose-50/90 p-2 space-y-1 shadow-sm"
        >
          <div className="h-1.5 w-full rounded bg-rose-400" />
          <div className="h-1.5 w-4/5 rounded bg-rose-300" />
          <div className="h-1.5 w-full rounded bg-rose-400" />
        </motion.div>
        <span className="mono-accent text-xs font-bold text-rose-600">200 KB</span>
        <span className="mono-accent text-[9px] text-[#3e4d68] -mt-1 font-medium">Bloated JSON</span>
      </div>

      {/* Center: Particle Funnel Simulation (Many In -> 95% Dissolved -> Few Out) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-1">
        <svg className="w-full h-16 overflow-visible" viewBox="0 0 180 64" fill="none">
          {/* Funnel Guide Rails Converging */}
          <path
            d="M 12 10 C 50 10, 72 23, 88 23"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <path
            d="M 12 54 C 50 54, 72 41, 88 41"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Narrow Clean Laser Exit Rail */}
          <path
            d="M 92 32 L 168 32"
            stroke="#2fe0d0"
            strokeWidth="2"
            strokeDasharray="2 3"
            strokeOpacity="0.8"
          />

          {/* 16 Bloated Incoming Particles Converging & Dissolving at Filter (x=88) */}
          {BLOATED_PARTICLES.map(p => (
            <motion.circle
              key={p.id}
              r={p.r}
              fill={p.color}
              initial={{ cx: 12, cy: p.yStart, opacity: 0 }}
              animate={{
                cx: [12, 50, 86],
                cy: [p.yStart, p.yMid, 32],
                opacity: [0, 0.9, 0],
                scale: [0.7, 1, 0.2],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Center Vertical Mesh Filter Barrier */}
          <rect x="87" y="16" width="6" height="32" rx="3" fill="#0b1d3a" />
          <line x1="90" y1="18" x2="90" y2="46" stroke="#2fe0d0" strokeWidth="2" strokeDasharray="2 2" />

          {/* Filter Pulse Ring */}
          <motion.circle
            cx="90"
            cy="32"
            r="16"
            stroke="#2fe0d0"
            strokeWidth="1.5"
            fill="none"
            animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.6, 0.1, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* -96% Center Label Badge */}
          <circle cx="90" cy="32" r="12" fill="#0b1d3a" stroke="#2fe0d0" strokeWidth="1" />
          <text
            x="90"
            y="35"
            textAnchor="middle"
            fill="#2fe0d0"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
          >
            -96%
          </text>

          {/* Only 2 Compressed Pure Particles Emerge & Stream to the Right (x=92 -> 168) */}
          {FILTERED_SURVIVORS.map(p => (
            <motion.circle
              key={p.id}
              r={p.r}
              fill={p.color}
              initial={{ cx: 92, cy: p.y, opacity: 0 }}
              animate={{
                cx: [92, 130, 168],
                cy: [p.y, 32, 32],
                opacity: [0, 1, 1],
                scale: [0.6, 1.1, 1],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </svg>

        <span className="mono-accent text-[10px] text-[#5b7cf0] font-semibold mt-0.5 tracking-wider uppercase">
          TOON Particle Filter
        </span>
      </div>

      {/* Right: Sleek 8KB Output Capsule */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 w-20 shrink-0">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="px-3.5 py-2 rounded-xl border border-emerald-400 bg-emerald-50/90 flex items-center gap-1.5 shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span className="mono-accent text-xs font-bold text-emerald-800">8 KB</span>
        </motion.div>
        <span className="mono-accent text-xs font-bold text-emerald-700">Instant</span>
        <span className="mono-accent text-[9px] text-emerald-600 -mt-1 font-medium">AST Salvaged</span>
      </div>
    </div>
  );
}

/* ── 2. Onetera: 0-to-1 Founding Engineering, City Meetings & NVIDIA Collab Visual ── */
export function OneteraFoundingEcosystemLottie() {
  return (
    <div className="relative h-32 w-full rounded-2xl border border-white/90 bg-white/55 p-3 sm:p-4 flex items-center justify-between overflow-hidden shadow-inner">
      {/* Left: City Meetings & Public Sector Alignment */}
      <div className="relative z-10 flex flex-col items-center gap-1 w-24 shrink-0">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full rounded-xl border border-blue-200 bg-blue-50/80 px-2 py-1.5 text-center shadow-sm"
        >
          <span className="mono-accent text-[9px] text-[#0b1d3a] font-bold block uppercase tracking-tight">City Meetings</span>
          <span className="text-[8px] text-[#5b7cf0] font-semibold block">Civic Alignment</span>
        </motion.div>
        <span className="mono-accent text-[9px] text-[#3e4d68] font-semibold">0 → 1 Product</span>
      </div>

      {/* Center: Collaborative Pipeline connecting City -> Ingestion -> NVIDIA -> Prod */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-2">
        <svg className="w-full h-14 overflow-visible" viewBox="0 0 160 50" fill="none">
          <path d="M 5 25 L 155 25" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
          <motion.circle
            r="4.5"
            fill="#5b7cf0"
            animate={{ cx: [5, 80, 155] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            r="3.5"
            fill="#2fe0d0"
            animate={{ cx: [155, 80, 5] }}
            transition={{ duration: 2.8, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Center NVIDIA & 6-Phase Pill */}
          <rect x="36" y="10" width="88" height="30" rx="8" fill="#0b1d3a" />
          <text x="80" y="23" textAnchor="middle" fill="#2fe0d0" fontSize="8" fontWeight="bold" fontFamily="monospace">
            NVIDIA
          </text>
          <text x="80" y="33" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="sans-serif">
            6 Roadmap Phases
          </text>
        </svg>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2fe0d0] animate-ping" />
          <span className="mono-accent text-[9px] text-[#0b1d3a] font-semibold tracking-wide">
            Live Civic Deployment
          </span>
        </div>
      </div>

      {/* Right: Production SLA & Enterprise Scale */}
      <div className="relative z-10 flex flex-col items-center gap-1 w-20 shrink-0">
        <div className="px-2.5 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 text-center shadow-sm">
          <span className="mono-accent text-[11px] font-bold text-emerald-800 block">&lt;15ms</span>
        </div>
        <span className="mono-accent text-[9px] font-semibold text-emerald-700">Routing SLA</span>
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
