'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  scrollYProgress: any;
};

/* ============================================================================
 * 1. EXACT HALDEN 96x60 BILINEAR BOWL-GLOW CANVAS
 * - Starts pure white, then after 0.25s blooms from the top edge over 1.05s
 *   in exact choreography with the Hero headline and cards.
 * - Widens & deepens smoothly with scroll inertia (cur += (tgt - cur) * 0.12).
 * ============================================================================ */
const Q_KEYS = [0, 0.03, 0.08, 0.18, 0.4, 0.66, 0.87, 1.15, 1.43, 1.8];
const TIP_KEYS = [0.3, 0.45, 0.65, 0.8, 0.95, 1.05, 1.05, 1.1, 1.3, 2.4];
const HALF_KEYS = [0.34, 0.38, 0.38, 0.38, 0.38, 0.46, 0.66, 0.9, 1.6, 3.0];
const SOFT_KEYS = [0.22, 0.26, 0.22, 0.22, 0.19, 0.16, 0.13, 0.1, 0.1, 0.1];

function smoothstep01(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

function sampleTable(q: number, vals: number[]) {
  if (q <= Q_KEYS[0]) return vals[0];
  const last = Q_KEYS.length - 1;
  if (q >= Q_KEYS[last]) return vals[last];
  for (let i = 0; i < last; i++) {
    if (q >= Q_KEYS[i] && q <= Q_KEYS[i + 1]) {
      const t = (q - Q_KEYS[i]) / (Q_KEYS[i + 1] - Q_KEYS[i]);
      return vals[i] + (vals[i + 1] - vals[i]) * t;
    }
  }
  return vals[last];
}

function HaldenBowlGlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const W = 96;
    const H = 60;
    const imgData = ctx.createImageData(W, H);
    const data = imgData.data;

    let curTip = -0.3;
    let curHalf = 0.3;
    let curSoft = 0.1;

    let tgtTip = 0.3;
    let tgtHalf = 0.34;
    let tgtSoft = 0.22;

    const startTime = performance.now();
    let rafId = 0;

    const updateTargetsFromScroll = () => {
      const vh = Math.max(1, window.innerHeight || 800);
      const rawQ = window.scrollY / vh;
      // Gently breathe the bowl as the user scrolls past the statement into cards
      const effectiveQ = rawQ <= 1.8 ? rawQ : Math.max(0.22, 1.8 - (rawQ - 1.8) * 0.45);
      tgtTip = sampleTable(effectiveQ, TIP_KEYS);
      tgtHalf = sampleTable(effectiveQ, HALF_KEYS);
      tgtSoft = sampleTable(effectiveQ, SOFT_KEYS);
    };

    window.addEventListener('scroll', updateTargetsFromScroll, { passive: true });
    window.addEventListener('resize', updateTargetsFromScroll, { passive: true });
    updateTargetsFromScroll();

    const N_PTS = 48;
    const curveX = new Float32Array(N_PTS);
    const curveY = new Float32Array(N_PTS);

    const renderFrame = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;
      const aspect = (window.innerWidth || 1280) / Math.max(1, window.innerHeight || 800);

      // Choreographed Intro: 0..0.25s pure white, 0.25..1.30s smoothstep bloom from top edge
      if (elapsedSec < 0.25) {
        curTip = -0.3;
        curHalf = 0.3;
        curSoft = 0.1;
      } else if (elapsedSec < 1.3) {
        const u = smoothstep01((elapsedSec - 0.25) / 1.05);
        curTip = -0.3 + (tgtTip - -0.3) * u;
        curHalf = 0.3 + (tgtHalf - 0.3) * u;
        curSoft = 0.1 + (tgtSoft - 0.1) * u;
      } else {
        curTip += (tgtTip - curTip) * 0.12;
        curHalf += (tgtHalf - curHalf) * 0.12;
        curSoft += (tgtSoft - curSoft) * 0.12;
      }

      const liveTip = curTip + Math.sin(now * 0.00033 + 1.3) * 0.02;
      const liveHalf = curHalf + Math.sin(now * 0.0005) * 0.015;
      const liveSoft = Math.max(0.08, curSoft);

      // Build 48-point bowl polyline
      const safeTip = Math.max(0.05, liveTip);
      for (let i = 0; i < N_PTS; i++) {
        const yy = -0.3 + (i / (N_PTS - 1)) * (liveTip - -0.3);
        const ratio = Math.max(0, 1 - yy / safeTip);
        curveX[i] = liveHalf * aspect * Math.pow(ratio, 0.72);
        curveY[i] = yy;
      }

      const RND = 0.25;
      let ptr = 0;

      for (let y = 0; y < H; y++) {
        const py = (y + 0.5) / H;
        for (let x = 0; x < W; x++) {
          const px = Math.abs((x + 0.5) / W - 0.5) * aspect;

          // Exact distance to nearest polyline segment
          let minDistSq = 1e9;
          for (let i = 0; i < N_PTS - 1; i++) {
            const ax = curveX[i];
            const ay = curveY[i];
            const bx = curveX[i + 1];
            const by = curveY[i + 1];
            const dx = bx - ax;
            const dy = by - ay;
            const lenSq = dx * dx + dy * dy + 1e-12;
            const proj = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
            const cx = ax + proj * dx - px;
            const cy = ay + proj * dy - py;
            const dSq = cx * cx + cy * cy;
            if (dSq < minDistSq) minDistSq = dSq;
          }

          let dist = Math.sqrt(minDistSq);
          const insideRatio = py < liveTip ? Math.max(0, 1 - py / safeTip) : 0;
          const boundaryX = liveHalf * aspect * Math.pow(insideRatio, 0.72);
          if (py < liveTip && px < boundaryX) {
            dist = -dist;
          }

          const sd = dist - RND;
          // Subtle maximum intensity cap (0.68) so the glow is airy & never overpowers cards
          const g = (1 - smoothstep01((sd + liveSoft) / (2 * liveSoft))) * 0.68;

          // Outside (#ffffff) -> Rim (#d2daff: 210, 218, 255) -> Core (#8fd5f1: 143, 213, 241)
          let r = 255;
          let gr = 255;
          let b = 255;

          if (g > 0.001) {
            if (g < 0.38) {
              const m = smoothstep01(g / 0.38);
              r = Math.round(255 + (210 - 255) * m);
              gr = Math.round(255 + (218 - 255) * m);
              b = 255;
            } else {
              const m = smoothstep01((g - 0.38) / 0.62);
              r = Math.round(210 + (143 - 210) * m);
              gr = Math.round(218 + (213 - 218) * m);
              b = Math.round(255 + (241 - 255) * m);
            }
          }

          data[ptr] = r;
          data[ptr + 1] = gr;
          data[ptr + 2] = b;
          data[ptr + 3] = 255;
          ptr += 4;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateTargetsFromScroll);
      window.removeEventListener('resize', updateTargetsFromScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={96}
      height={60}
      className="absolute inset-0 h-full w-full block"
    />
  );
}

/* ============================================================================
 * 2. WHISPER-SUBTLE 3D CAMERA FLYTHROUGH SCENE
 * (Fades in gently after 0.35s alongside the Bowl Glow & Hero text, and keeps
 * particle/line opacities delicate so the background never feels heavy).
 * ============================================================================ */
function useGlowCircleTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.7)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function HeroConstellationZone({ circleTex }: { circleTex: THREE.Texture | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Points>(null);

  const { nodes, lineCoords, pulsePairs } = useMemo(() => {
    const rand = (seed: number) => {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const pts: THREE.Vector3[] = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      // Push constellation strictly to the right (+1.2 to +5.6) so it never sits on the hero headline
      const x = 1.2 + rand(i * 3) * 4.4;
      const y = (rand(i * 3 + 1) - 0.45) * 4.0;
      const z = (rand(i * 3 + 2) - 0.5) * 2.5;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const lines: number[] = [];
    const pairs: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.45) {
          lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          pairs.push([pts[i], pts[j]]);
        }
      }
    }

    return {
      nodes: pts,
      lineCoords: new Float32Array(lines),
      pulsePairs: pairs.slice(0, 12),
    };
  }, []);

  const pulsePositions = useMemo(() => new Float32Array(pulsePairs.length * 3), [pulsePairs]);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.16) * 0.08 + state.pointer.x * 0.1;
      groupRef.current.rotation.x = Math.cos(t * 0.12) * 0.05 - state.pointer.y * 0.06;
    }

    if (pulseRef.current) {
      const attr = pulseRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < pulsePairs.length; i++) {
        const [a, b] = pulsePairs[i];
        const alpha = (t * 0.4 + i * 0.19) % 1;
        arr[i * 3] = THREE.MathUtils.lerp(a.x, b.x, alpha);
        arr[i * 3 + 1] = THREE.MathUtils.lerp(a.y, b.y, alpha);
        arr[i * 3 + 2] = THREE.MathUtils.lerp(a.z, b.z, alpha);
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCoords.length / 3}
            array={lineCoords}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#5b7cf0" transparent opacity={0.16} />
      </lineSegments>

      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[idx % 4 === 0 ? 0.06 : 0.038, 16, 16]} />
          <meshBasicMaterial
            color={idx % 4 === 0 ? '#5b7cf0' : '#00f0ff'}
            transparent
            opacity={idx % 4 === 0 ? 0.4 : 0.25}
          />
        </mesh>
      ))}

      <points ref={pulseRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pulsePositions.length / 3}
            array={pulsePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={circleTex ?? undefined}
          size={0.18}
          color="#00f0ff"
          transparent
          opacity={0.45}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function ImpactFunnelZone({ circleTex }: { circleTex: THREE.Texture | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const streamRef = useRef<THREE.Points>(null);

  const particleCount = 160;
  const { seeds, positions } = useMemo(() => {
    const s = new Float32Array(particleCount * 3);
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      s[i * 3] = (i / particleCount) * Math.PI * 2 * 6;
      s[i * 3 + 1] = i / particleCount;
      s[i * 3 + 2] = 0.6 + (i % 7) * 0.08;
    }
    return { seeds: s, positions: p };
  }, []);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = state.pointer.x * 0.12;
      groupRef.current.rotation.z = state.pointer.y * 0.06;
    }

    if (streamRef.current) {
      const attr = streamRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const baseAngle = seeds[i * 3];
        const offset = seeds[i * 3 + 1];
        const speed = seeds[i * 3 + 2];
        const prog = (offset + t * 0.16 * speed) % 1;
        const x = THREE.MathUtils.lerp(-2.6, 2.6, prog);
        const funnelRadius = Math.pow(1 - prog, 1.85) * 1.65 + 0.06;
        const spin = baseAngle + t * 1.8 + prog * 7.0;

        arr[i * 3] = x;
        arr[i * 3 + 1] = Math.cos(spin) * funnelRadius;
        arr[i * 3 + 2] = Math.sin(spin) * funnelRadius;
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[6, -7, -10]}>
      <points ref={streamRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={circleTex ?? undefined}
          size={0.11}
          color="#5b7cf0"
          transparent
          opacity={0.42}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function TimelinePathZone({ circleTex }: { circleTex: THREE.Texture | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Points>(null);

  const { curve, linePoints, milestones } = useMemo(() => {
    const waypoints = [
      new THREE.Vector3(-1.5, 2.2, 0.6),
      new THREE.Vector3(0.8, 0.7, -0.3),
      new THREE.Vector3(-0.8, -0.7, 0.4),
      new THREE.Vector3(1.1, -2.2, -0.5),
    ];
    const spline = new THREE.CatmullRomCurve3(waypoints);
    const sampled = spline.getPoints(100);
    const coords = new Float32Array(sampled.length * 3);
    sampled.forEach((p, i) => {
      coords[i * 3] = p.x;
      coords[i * 3 + 1] = p.y;
      coords[i * 3 + 2] = p.z;
    });
    return { curve: spline, linePoints: coords, milestones: waypoints };
  }, []);

  const travelerCoords = useMemo(() => new Float32Array(20 * 3), []);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1 + state.pointer.x * 0.12;
    }

    if (pulseRef.current) {
      const attr = pulseRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < 20; i++) {
        const u = (i / 20 + t * 0.1) % 1;
        const pt = curve.getPointAt(u);
        arr[i * 3] = pt.x;
        arr[i * 3 + 1] = pt.y;
        arr[i * 3 + 2] = pt.z;
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[-5, -15, -18]}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePoints.length / 3}
            array={linePoints}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#5b7cf0" transparent opacity={0.22} />
      </line>

      {milestones.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#2fe0d0" transparent opacity={0.55} />
        </mesh>
      ))}

      <points ref={pulseRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={travelerCoords.length / 3}
            array={travelerCoords}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={circleTex ?? undefined}
          size={0.12}
          color="#5b7cf0"
          transparent
          opacity={0.45}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function SkillsOrbitZone({ circleTex }: { circleTex: THREE.Texture | null }) {
  const groupRef = useRef<THREE.Group>(null);

  const orbitParticles = useMemo(() => {
    const count = 72;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const ring = i % 3;
      const radius = ring === 0 ? 1.15 : ring === 1 ? 1.75 : 2.35;
      const angle = (i / count) * Math.PI * 2 * 3;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius * (ring === 1 ? 0.5 : 0.8);
      arr[i * 3 + 2] = Math.sin(angle * 2) * 0.4;
    }
    return arr;
  }, []);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.22 + state.pointer.x * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.18 - state.pointer.y * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -23, -26]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={orbitParticles.length / 3}
            array={orbitParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={circleTex ?? undefined}
          size={0.12}
          color="#5b7cf0"
          transparent
          opacity={0.42}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function ScrollCameraRig({ scrollYProgress }: { scrollYProgress: any }) {
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  const { camCurve, targetCurve } = useMemo(() => {
    const camSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 5.6),
      new THREE.Vector3(6, -7, -4.4),
      new THREE.Vector3(-5, -15, -12.2),
      new THREE.Vector3(0, -23, -20.2),
    ]);

    const lookSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(6, -7, -10),
      new THREE.Vector3(-5, -15, -18),
      new THREE.Vector3(0, -23, -26),
    ]);

    return { camCurve: camSpline, targetCurve: lookSpline };
  }, []);

  useFrame(state => {
    const rawS = typeof scrollYProgress?.get === 'function' ? scrollYProgress.get() : 0;
    const s = THREE.MathUtils.clamp(rawS, 0, 1);
    const t = state.clock.elapsedTime;

    const desiredCamPos = camCurve.getPointAt(s);
    const desiredLookAt = targetCurve.getPointAt(s);

    const orbitWeight = THREE.MathUtils.smoothstep(s, 0.75, 1.0);
    desiredCamPos.x += Math.sin(t * 0.4) * 0.9 * orbitWeight + state.pointer.x * 0.3;
    desiredCamPos.y += Math.cos(t * 0.3) * 0.4 * orbitWeight + state.pointer.y * 0.2;

    state.camera.position.lerp(desiredCamPos, 0.12);
    lookAtTarget.current.lerp(desiredLookAt, 0.12);
    state.camera.lookAt(lookAtTarget.current);
  });

  return null;
}

export default function Global3DScene({ scrollYProgress }: Props) {
  const circleTex = useGlowCircleTexture();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 220);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white" aria-hidden="true">
      {/* 1. Halden 96x60 Bilinear Sky-Cyan & Periwinkle Bowl Glow */}
      <HaldenBowlGlowCanvas />

      {/* 2. Synchronized Whisper-Soft 3D Camera Flythrough Layer */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.22,0.7,0.2,1)] ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 5.6], fov: 42, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ScrollCameraRig scrollYProgress={scrollYProgress} />
          <HeroConstellationZone circleTex={circleTex} />
          <ImpactFunnelZone circleTex={circleTex} />
          <TimelinePathZone circleTex={circleTex} />
          <SkillsOrbitZone circleTex={circleTex} />
        </Canvas>
      </div>
    </div>
  );
}
