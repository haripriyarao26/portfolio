'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── 5 BEATS SPECIFICATION ── */
const BEATS = [
  {
    step: '01',
    title: 'Assume it will fail',
    desc: 'The request enters wobbly and unpredictable. We map failure modes before writing happy paths.',
    color: '#818cf8', // Periwinkle
    tag: 'Unpredictable AI Input',
  },
  {
    step: '02',
    title: 'Wrap it in checks',
    desc: 'An amber glass guardrail intercepts the input. Malformed schemas bounce off with strict schema gates.',
    color: '#f59e0b', // Warm Amber
    tag: 'Deterministic Guardrails',
  },
  {
    step: '03',
    title: 'Test against real cases',
    desc: 'Passes 100+ messy golden-dataset edge cases, null fields, and adversarial inputs in CI/CD.',
    color: '#3b82f6', // Cobalt
    tag: 'Reality Evals',
  },
  {
    step: '04',
    title: 'Ship without drama',
    desc: 'The payload turns teal, verified and deterministic. Deploys with zero state desyncs.',
    color: '#14b8a6', // Teal
    tag: 'Verified Production',
  },
  {
    step: '05',
    title: 'Build it with the people who use it',
    desc: 'Human nodes connect directly into the system loop. Real user trust gets built together, not just coded.',
    color: '#0d9488', // Deep Teal
    tag: 'Human in the Loop',
  },
];

/* ── THREE.JS 3D HOW I THINK SCENE ── */
function DotJourney3D({ progress }: { progress: number }) {
  const dotRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);
  const gateRef = useRef<THREE.Mesh>(null);
  const humanGroupRef = useRef<THREE.Group>(null);

  // Spline path for the dot through the 5 beats
  const spline = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.2, 2.2, 0),      // Beat 1: Enter wobbly
      new THREE.Vector3(-1.4, 1.1, -0.6),   // Beat 2: Amber gate
      new THREE.Vector3(0.2, 0.0, 0.4),     // Beat 3: Evals row
      new THREE.Vector3(1.8, -1.0, -0.3),   // Beat 4: Ship teal
      new THREE.Vector3(3.2, -2.1, 0.2),    // Beat 5: Human nodes
    ]);
  }, []);

  const pathPoints = useMemo(() => {
    const pts = spline.getPoints(80);
    const coords = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      coords[i * 3] = p.x;
      coords[i * 3 + 1] = p.y;
      coords[i * 3 + 2] = p.z;
    });
    return coords;
  }, [spline]);

  // Trail buffer
  const trailCount = 36;
  const trailPositions = useMemo(() => new Float32Array(trailCount * 3), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = Math.max(0, Math.min(1, progress));

    // Get current position on spline
    const pos = spline.getPointAt(p);

    // Beat 1: Wobble if in first phase
    if (p < 0.25) {
      const wobbleAmp = (1 - p / 0.25) * 0.25;
      pos.x += Math.sin(t * 12) * wobbleAmp;
      pos.y += Math.cos(t * 14) * wobbleAmp;
    }

    if (dotRef.current) {
      dotRef.current.position.copy(pos);

      // Color transition: Periwinkle (#818cf8) -> Amber (#f59e0b) -> Teal (#14b8a6)
      const mat = dotRef.current.material as THREE.MeshBasicMaterial;
      if (p < 0.25) {
        mat.color.set('#818cf8'); // Periwinkle
      } else if (p < 0.55) {
        mat.color.set('#f59e0b'); // Amber
      } else {
        mat.color.set('#14b8a6'); // Teal
      }
    }

    // Gate reaction in Beat 2
    if (gateRef.current) {
      const gateMat = gateRef.current.material as THREE.MeshPhysicalMaterial;
      if (p > 0.2 && p < 0.45) {
        gateMat.opacity = 0.85;
        gateRef.current.scale.set(1.05, 1.05, 1);
      } else {
        gateMat.opacity = 0.35;
        gateRef.current.scale.set(1, 1, 1);
      }
    }

    // Human nodes pulse in Beat 5
    if (humanGroupRef.current) {
      const humanVis = Math.max(0, Math.min(1, (p - 0.7) / 0.25));
      humanGroupRef.current.scale.setScalar(humanVis);
      humanGroupRef.current.rotation.z = t * 0.2;
    }

    // Update trail
    if (trailRef.current) {
      const attr = trailRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      // Shift trail back
      for (let i = trailCount - 1; i > 0; i--) {
        arr[i * 3] = arr[(i - 1) * 3];
        arr[i * 3 + 1] = arr[(i - 1) * 3 + 1];
        arr[i * 3 + 2] = arr[(i - 1) * 3 + 2];
      }
      arr[0] = pos.x;
      arr[1] = pos.y;
      arr[2] = pos.z;
      attr.needsUpdate = true;
    }

    // Smooth camera track
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pos.x * 0.45, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pos.y * 0.45, 0.05);
  });

  return (
    <group>
      {/* Flight Path Guideline */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pathPoints.length / 3}
            array={pathPoints}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#cbd5e1" transparent opacity={0.35} />
      </line>

      {/* Beat 2: Glass Amber Gate Panel */}
      <mesh ref={gateRef} position={[-1.4, 1.1, -0.6]}>
        <boxGeometry args={[0.08, 1.4, 1.1]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          transparent
          opacity={0.35}
          roughness={0.15}
          transmission={0.7}
          thickness={0.5}
        />
      </mesh>

      {/* Beat 3: Real-World Case Sensor Grid */}
      <group position={[0.2, 0.0, 0.4]}>
        {[-0.4, -0.2, 0, 0.2, 0.4].map((offset, i) => (
          <mesh key={i} position={[offset * 0.8, (i % 2 === 0 ? 0.25 : -0.25), 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      {/* Beat 5: Human Nodes Connecting around Path */}
      <group ref={humanGroupRef} position={[3.2, -2.1, 0.2]}>
        {[0, 1, 2, 3].map((idx) => {
          const angle = (idx / 4) * Math.PI * 2;
          const r = 0.75;
          return (
            <group key={idx} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}>
              <mesh>
                <sphereGeometry args={[0.065, 14, 14]} />
                <meshBasicMaterial color="#0d9488" />
              </mesh>
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([0, 0, 0, -Math.cos(angle) * r, -Math.sin(angle) * r, 0])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#14b8a6" transparent opacity={0.4} />
              </line>
            </group>
          );
        })}
      </group>

      {/* Main Request Glowing Dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshBasicMaterial color="#818cf8" />
      </mesh>

      {/* Glowing Trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={trailCount}
            array={trailPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.09} color="#818cf8" transparent opacity={0.45} depthWrite={false} />
      </points>
    </group>
  );
}

/* ── MAIN COMPONENT: WHY ENG HIRE ME & HOW I THINK ── */
export default function HowIThinkExperience({
  onNavActivate,
}: {
  onNavActivate?: (active: boolean) => void;
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeBeat, setActiveBeat] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const total = Math.max(1, rect.height - vh);
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / total));
        setProgress(p);

        // Active beat (0 to 4)
        const beat = Math.min(4, Math.floor(p * 5));
        setActiveBeat(beat);

        if (onNavActivate) {
          onNavActivate(p > 0.15 || rect.top < 0);
        }
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onNavActivate, isReducedMotion]);

  // Words for the headline word-by-word ink fill
  const headlineWords = [
    'I', 'like', 'building', 'things', 'people', 'can', 'actually', 'rely', 'on.'
  ];

  // Underline draw percentage based on scroll progress (hits 100% in middle of section)
  const underlineProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.45));

  // Background tint deepening as section pins
  const bgOpacity = Math.max(0, Math.min(1, Math.sin(progress * Math.PI))) * 0.045;

  return (
    <section
      ref={containerRef}
      id="how-i-think"
      className="relative min-h-[260vh] select-none transition-colors duration-500"
      style={{
        backgroundColor: `rgba(15, 23, 42, ${bgOpacity.toFixed(3)})`,
      }}
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-20 overflow-hidden">
        
        {/* Top Header & Badge */}
        <div className="max-w-4xl mx-auto w-full text-center space-y-4 z-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-[#0b1d3a]/12 px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span className="font-sans text-xs font-semibold tracking-wider text-[#0b1d3a] uppercase">
              Why Engineering Leaders Hire Me
            </span>
          </div>

          {/* Headline with word-by-word scroll ink fill */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.03em] leading-[1.12]">
            {headlineWords.map((word, idx) => {
              const wordThreshold = (idx + 0.5) / headlineWords.length * 0.45;
              const isFilled = progress >= wordThreshold || isReducedMotion;
              const isTeal = word === 'actually' || word === 'rely' || word === 'on.';

              return (
                <span
                  key={idx}
                  className={`inline-block mr-2.5 transition-colors duration-200 ${
                    isFilled
                      ? isTeal
                        ? 'text-[#0d9488] font-medium'
                        : 'text-[#0b1d3a] font-normal'
                      : 'text-slate-300'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </h2>
        </div>

        {/* Center: The Animated 3D "How I Think" Journey + Mobile 2D Fallback */}
        <div className="relative w-full max-w-5xl mx-auto h-[260px] sm:h-[320px] my-auto flex items-center justify-center z-10">
          
          {/* Desktop 3D Canvas */}
          <div className="hidden sm:block absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 46 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.8} />
              <pointLight position={[5, 5, 5]} intensity={1.2} />
              <DotJourney3D progress={progress} />
            </Canvas>
          </div>

          {/* Mobile 2D Visual Flow with same 5 beats */}
          <div className="sm:hidden w-full flex flex-col gap-2 p-4 rounded-2xl bg-white/95 border border-slate-200/80 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-semibold text-[#0b1d3a]">HOW I THINK // 5 BEATS</span>
              <span className="text-xs font-mono font-bold" style={{ color: BEATS[activeBeat].color }}>
                {BEATS[activeBeat].step} / 05
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <div
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm animate-pulse"
                style={{ backgroundColor: BEATS[activeBeat].color }}
              />
              <div>
                <div className="text-sm font-semibold text-[#0b1d3a]">
                  {BEATS[activeBeat].title}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {BEATS[activeBeat].desc}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Beat Badges overlay (Desktop) */}
          <div className="hidden sm:flex absolute -bottom-4 inset-x-0 justify-between items-center px-4">
            {BEATS.map((beat, idx) => {
              const isActive = activeBeat === idx;
              return (
                <div
                  key={beat.step}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isActive ? 'scale-105 opacity-100' : 'opacity-40 scale-95'
                  }`}
                >
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: beat.color }}
                    />
                    <span className="text-[11px] font-sans font-semibold text-[#0b1d3a]">
                      {beat.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">
                    {beat.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Editorial Narrative Paragraph with Color Meaning Tokens */}
        <div className="max-w-3xl mx-auto w-full z-20 pt-4">
          <p className="text-base sm:text-lg text-[#1e293b] leading-relaxed font-normal text-center sm:text-left transition-opacity duration-700">
            I like building things people can{' '}
            <span className="text-[#0d9488] font-semibold underline decoration-[#14b8a6]/40 underline-offset-4">
              actually rely on
            </span>
            . Anyone can make a{' '}
            <span className="text-[#6366f1] font-semibold">model</span> look impressive in a demo.
            The harder and more interesting work starts when it meets real users, messy data and real consequences.
            So I begin with how a system{' '}
            <span className="text-[#f59e0b] font-semibold">might fail</span>, build the{' '}
            <span className="relative inline-block font-semibold text-[#0b1d3a]">
              checks and fallbacks first
              {/* Self-drawing warm amber underline */}
              <svg
                className="absolute -bottom-1 left-0 w-full h-1.5 overflow-visible"
                viewBox="0 0 100 6"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 3 Q 50 6 100 3"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="100"
                  strokeDashoffset={isReducedMotion ? 0 : 100 * (1 - underlineProgress)}
                  className="transition-all duration-300"
                />
              </svg>
            </span>
            , and only then make the{' '}
            <span className="text-[#6366f1] font-semibold">clever part clever</span>.
            And I work closely with the people who’ll use it, because{' '}
            <span className="text-[#0d9488] font-semibold">
              trust gets built together
            </span>
            , not just coded.
          </p>

          {/* Color Meaning Legend Pill Ribbon */}
          <div className="mt-4 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
              <span>Periwinkle: AI &amp; Unpredictability</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              <span>Warm Amber: Guardrails &amp; Checks</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
              <span>Teal: Verified &amp; Trusted</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

