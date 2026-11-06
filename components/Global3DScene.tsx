'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  scrollYProgress: any;
};

/**
 * Generates a soft circular radial texture so all 3D particles render as smooth,
 * glowing optical orbs (never square pixels, never chunky plastic geometry).
 */
function useGlowCircleTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* ============================================================================
 * ZONE 1 (HERO @ [0, 0, 0]): 22-NODE MULTI-AGENT CONSTELLATION
 * ============================================================================ */
function HeroConstellationZone({ circleTex }: { circleTex: THREE.Texture | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Points>(null);

  const { nodes, lineCoords, pulsePairs } = useMemo(() => {
    const rand = (seed: number) => {
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const pts: THREE.Vector3[] = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const x = (rand(i * 3) - 0.35) * 7.5;
      const y = (rand(i * 3 + 1) - 0.5) * 4.4;
      const z = (rand(i * 3 + 2) - 0.5) * 3.2;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const lines: number[] = [];
    const pairs: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.5) {
          lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          pairs.push([pts[i], pts[j]]);
        }
      }
    }

    return {
      nodes: pts,
      lineCoords: new Float32Array(lines),
      pulsePairs: pairs.slice(0, 18),
    };
  }, []);

  const pulsePositions = useMemo(() => new Float32Array(pulsePairs.length * 3), [pulsePairs]);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.12 + state.pointer.x * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.14) * 0.08 - state.pointer.y * 0.1;
    }

    if (pulseRef.current) {
      const attr = pulseRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < pulsePairs.length; i++) {
        const [a, b] = pulsePairs[i];
        const alpha = (t * 0.45 + i * 0.17) % 1;
        arr[i * 3] = THREE.MathUtils.lerp(a.x, b.x, alpha);
        arr[i * 3 + 1] = THREE.MathUtils.lerp(a.y, b.y, alpha);
        arr[i * 3 + 2] = THREE.MathUtils.lerp(a.z, b.z, alpha);
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Synaptic Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCoords.length / 3}
            array={lineCoords}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#64748B" transparent opacity={0.22} />
      </lineSegments>

      {/* Constellation Nodes */}
      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[idx % 4 === 0 ? 0.055 : 0.032, 14, 14]} />
          <meshBasicMaterial
            color={idx % 4 === 0 ? '#D97706' : '#0F141C'}
            transparent
            opacity={idx % 4 === 0 ? 0.8 : 0.45}
          />
        </mesh>
      ))}

      {/* Traveling Data Packets Along Edges */}
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
          size={0.14}
          color="#D97706"
          transparent
          opacity={0.9}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/* ============================================================================
 * ZONE 2 (IMPACT / CASE STUDIES @ [6, -7, -10]): 3D COMPRESSION FUNNEL (200KB -> 8KB)
 * ============================================================================ */
function ImpactFunnelZone({ circleTex }: { circleTex: THREE.Texture | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const streamRef = useRef<THREE.Points>(null);

  const particleCount = 220;
  const { seeds, positions } = useMemo(() => {
    const s = new Float32Array(particleCount * 3);
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      s[i * 3] = (i / particleCount) * Math.PI * 2 * 7; // angle
      s[i * 3 + 1] = i / particleCount; // normalized progress 0..1
      s[i * 3 + 2] = 0.6 + (i % 7) * 0.08; // speed factor
    }
    return { seeds: s, positions: p };
  }, []);

  // Funnel architectural guide rings (wide input -> narrow compressed output)
  const guideRings = useMemo(() => {
    return [
      { x: -2.4, radius: 1.75, color: '#94A3B8', opacity: 0.25 },
      { x: -1.2, radius: 1.15, color: '#64748B', opacity: 0.3 },
      { x: 0.0, radius: 0.55, color: '#D97706', opacity: 0.55 },
      { x: 1.2, radius: 0.22, color: '#10B981', opacity: 0.65 },
      { x: 2.4, radius: 0.14, color: '#10B981', opacity: 0.8 },
    ];
  }, []);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = state.pointer.x * 0.15;
      groupRef.current.rotation.z = state.pointer.y * 0.08;
    }

    if (streamRef.current) {
      const attr = streamRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const baseAngle = seeds[i * 3];
        const offset = seeds[i * 3 + 1];
        const speed = seeds[i * 3 + 2];

        // Progress from left (-2.8 = 200KB noisy cloud) to right (+2.8 = 8KB tight beam)
        const prog = (offset + t * 0.18 * speed) % 1;
        const x = THREE.MathUtils.lerp(-2.8, 2.8, prog);

        // Funnel radius narrows exponentially from 1.85 down to 0.08 (-96% compression)
        const funnelRadius = Math.pow(1 - prog, 1.85) * 1.8 + 0.06;
        const spin = baseAngle + t * 2.2 + prog * 8.0;

        arr[i * 3] = x;
        arr[i * 3 + 1] = Math.cos(spin) * funnelRadius;
        arr[i * 3 + 2] = Math.sin(spin) * funnelRadius;
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[6, -7, -10]}>
      {/* Concentric Wireframe Funnel Rings */}
      {guideRings.map((ring, idx) => (
        <mesh key={idx} position={[ring.x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[ring.radius, ring.radius + 0.025, 64]} />
          <meshBasicMaterial
            color={ring.color}
            side={THREE.DoubleSide}
            transparent
            opacity={ring.opacity}
          />
        </mesh>
      ))}

      {/* Spiraling Compression Particles */}
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
          size={0.13}
          color="#D97706"
          transparent
          opacity={0.78}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/* ============================================================================
 * ZONE 3 (TIMELINE @ [-5, -15, -18]): 3D EXPERIENCE PATH & MILESTONE BEACONS
 * ============================================================================ */
function TimelinePathZone({ circleTex }: { circleTex: THREE.Texture | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Points>(null);

  const { curve, linePoints, milestones } = useMemo(() => {
    const waypoints = [
      new THREE.Vector3(-1.6, 2.4, 0.8),  // JPMorgan Chase (2026)
      new THREE.Vector3(0.9, 0.8, -0.4),  // Onetera (2024-2026)
      new THREE.Vector3(-0.9, -0.8, 0.5), // Provenir (2023)
      new THREE.Vector3(1.2, -2.4, -0.6), // Deloitte (2022)
    ];
    const spline = new THREE.CatmullRomCurve3(waypoints);
    const sampled = spline.getPoints(120);
    const coords = new Float32Array(sampled.length * 3);
    sampled.forEach((p, i) => {
      coords[i * 3] = p.x;
      coords[i * 3 + 1] = p.y;
      coords[i * 3 + 2] = p.z;
    });
    return { curve: spline, linePoints: coords, milestones: waypoints };
  }, []);

  const travelerCoords = useMemo(() => new Float32Array(24 * 3), []);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.14 + state.pointer.x * 0.15;
    }

    if (pulseRef.current) {
      const attr = pulseRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < 24; i++) {
        const u = (i / 24 + t * 0.12) % 1;
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
      {/* Continuous 3D Career Spine */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePoints.length / 3}
            array={linePoints}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#475569" transparent opacity={0.4} />
      </line>

      {/* 4 Career Milestone Beacons */}
      {milestones.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh>
            <sphereGeometry args={[0.09, 20, 20]} />
            <meshBasicMaterial color="#D97706" />
          </mesh>
          <mesh rotation={[Math.PI / 3, idx * 0.6, 0]}>
            <ringGeometry args={[0.24, 0.265, 48]} />
            <meshBasicMaterial
              color="#0F141C"
              side={THREE.DoubleSide}
              transparent
              opacity={0.45}
            />
          </mesh>
        </group>
      ))}

      {/* Flowing Momentum Particles Along the Timeline Spine */}
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
          size={0.15}
          color="#D97706"
          transparent
          opacity={0.85}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/* ============================================================================
 * ZONE 4 (SKILLS @ [0, -23, -26]): 3D ORBITING SKILLS ASTROLABE
 * ============================================================================ */
function SkillsOrbitZone({ circleTex }: { circleTex: THREE.Texture | null }) {
  const groupRef = useRef<THREE.Group>(null);

  const orbitParticles = useMemo(() => {
    const count = 90;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const ring = i % 3;
      const radius = ring === 0 ? 1.15 : ring === 1 ? 1.75 : 2.35;
      const angle = (i / count) * Math.PI * 2 * 3;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius * (ring === 1 ? 0.5 : 0.8);
      arr[i * 3 + 2] = Math.sin(angle * 2) * 0.45;
    }
    return arr;
  }, []);

  useFrame(state => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.28 + state.pointer.x * 0.25;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.22 - state.pointer.y * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -23, -26]}>
      {/* 3 Tilted Architectural Skill Orbit Tracks (Agents, Evals, Cloud Infra) */}
      {[
        { radius: 1.15, rot: [0.5, 0.2, 0] as [number, number, number], color: '#D97706' },
        { radius: 1.75, rot: [-0.4, 0.6, 0.3] as [number, number, number], color: '#0F141C' },
        { radius: 2.35, rot: [0.25, -0.5, -0.2] as [number, number, number], color: '#64748B' },
      ].map((orb, idx) => (
        <mesh key={idx} rotation={orb.rot}>
          <ringGeometry args={[orb.radius, orb.radius + 0.02, 80]} />
          <meshBasicMaterial
            color={orb.color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}

      {/* Orbiting Skill Nodes */}
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
          size={0.14}
          color="#D97706"
          transparent
          opacity={0.85}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/* ============================================================================
 * SCROLL-DRIVEN CAMERA RIG: FLIES THROUGH ALL 4 ZONES IN ONE SCENE
 * ============================================================================ */
function ScrollCameraRig({ scrollYProgress }: { scrollYProgress: any }) {
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Smooth camera flight spline connecting all 4 zones
  const { camCurve, targetCurve } = useMemo(() => {
    const camSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 5.6),       // 0.00: Hero Constellation
      new THREE.Vector3(6, -7, -4.4),     // 0.33: Impact Compression Funnel
      new THREE.Vector3(-5, -15, -12.2),  // 0.66: Experience Timeline Spine
      new THREE.Vector3(0, -23, -20.2),   // 1.00: Orbiting Skills Cluster
    ]);

    const lookSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),         // Look at Hero Constellation
      new THREE.Vector3(6, -7, -10),      // Look at Impact Compression Funnel
      new THREE.Vector3(-5, -15, -18),    // Look at Timeline Spine
      new THREE.Vector3(0, -23, -26),     // Look at Skills Orbit
    ]);

    return { camCurve: camSpline, targetCurve: lookSpline };
  }, []);

  useFrame(state => {
    const rawS = typeof scrollYProgress?.get === 'function' ? scrollYProgress.get() : 0;
    const s = THREE.MathUtils.clamp(rawS, 0, 1);
    const t = state.clock.elapsedTime;

    const desiredCamPos = camCurve.getPointAt(s);
    const desiredLookAt = targetCurve.getPointAt(s);

    // At the end of the page (s > 0.78), add a smooth orbital sweep around the Skills zone
    const orbitWeight = THREE.MathUtils.smoothstep(s, 0.75, 1.0);
    desiredCamPos.x += Math.sin(t * 0.45) * 1.1 * orbitWeight + state.pointer.x * 0.35;
    desiredCamPos.y += Math.cos(t * 0.35) * 0.45 * orbitWeight + state.pointer.y * 0.25;

    state.camera.position.lerp(desiredCamPos, 0.06);
    lookAtTarget.current.lerp(desiredLookAt, 0.06);
    state.camera.lookAt(lookAtTarget.current);
  });

  return null;
}

export default function Global3DScene({ scrollYProgress }: Props) {
  const circleTex = useGlowCircleTexture();
  const [stageLabel, setStageLabel] = useState('01 · AGENT CONSTELLATION');

  useEffect(() => {
    if (!scrollYProgress?.on) return;
    const unsub = scrollYProgress.on('change', (s: number) => {
      if (s < 0.22) setStageLabel('01 · AGENT CONSTELLATION');
      else if (s < 0.52) setStageLabel('02 · 96% COMPRESSION FUNNEL');
      else if (s < 0.78) setStageLabel('03 · CAREER TIMELINE SPINE');
      else setStageLabel('04 · SKILLS ORBITAL CLUSTER');
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Subtle Optical Iridescent Studio Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-[540px] rounded-full opacity-75"
        style={{
          background:
            'conic-gradient(from 210deg at 50% 50%, rgba(56, 189, 248, 0.28) 0deg, rgba(251, 146, 60, 0.24) 110deg, rgba(52, 211, 153, 0.22) 220deg, rgba(96, 165, 250, 0.28) 360deg)',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 42%, black 58%, black 66%, transparent 78%)',
          maskImage:
            'radial-gradient(circle, transparent 42%, black 58%, black 66%, transparent 78%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Single Unified 3D World Canvas */}
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

      {/* Subtle Bottom-Left 3D Camera Stage Indicator */}
      <div className="hidden sm:flex fixed bottom-5 left-6 z-20 items-center gap-2 rounded-full bg-white/65 backdrop-blur-md border border-white/90 px-3.5 py-1.5 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#D97706] animate-pulse" />
        <span className="mono-accent text-[10px] font-semibold tracking-[0.14em] text-[#475569] uppercase">
          3D CAM // {stageLabel}
        </span>
      </div>
    </div>
  );
}
