'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, ContactShadows, SpotLight } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  scrollYProgress: any;
};

const materialProps = {
  thickness: 0.2,
  roughness: 0.1,
  transmission: 1,
  ior: 1.2,
  chromaticAberration: 0.1,
  backside: true,
  samples: 4, // Drastically reduces render cost
  resolution: 512, // Lower res for transmission buffer
};

function CameraController({ scrollYProgress }: { scrollYProgress: any }) {
  useFrame((state) => {
    // We fly through the z-axis and slightly pan down based on scroll
    const scrollOffset = scrollYProgress.get();
    
    // As we scroll from 0 to 1, we move the camera from z=10 to z=4
    const targetZ = THREE.MathUtils.lerp(10, 4, scrollOffset);
    // Pan the camera slightly down to give a sensation of descending
    const targetY = THREE.MathUtils.lerp(0, -5, scrollOffset);
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    
    // Add subtle parallax pointer movement mapped to the camera instead of the objects
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.5, 0.05);
    
    state.camera.lookAt(0, targetY, 0);
  });
  return null;
}

function FloatingShapes({ scrollYProgress }: { scrollYProgress: any }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const scrollOffset = scrollYProgress.get();
    // Softly rotate the entire cluster to prevent extreme orbit paths
    group.current.rotation.y = scrollOffset * 0.4 + state.clock.elapsedTime * 0.1;
    group.current.rotation.x = -scrollOffset * 0.2;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3, 1, -2]} scale={1.5}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <MeshTransmissionMaterial {...materialProps} color="#4f46e5" />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[4, -1, 0]} scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial {...materialProps} color="#0ea5e9" />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={3}>
        {/* Scale reduced from 2 to 1.2 and pushed deeper to z: -6 to prevent blocking viewport */}
        <mesh position={[2, -4, -6]} scale={1.2}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshTransmissionMaterial {...materialProps} color="#38bdf8" />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2.5}>
        {/* We push this octahedron down the Y axis so it comes into view deeper in the scroll (like the Experience timeline) */}
        <mesh position={[-4, -6, -3]} scale={1.2}>
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial {...materialProps} color="#818cf8" />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1.8} floatIntensity={2}>
        {/* Pushed further down for Projects section */}
        <mesh position={[3, -10, -5]} scale={1.8}>
          <torusGeometry args={[1.5, 0.4, 16, 32]} />
          <MeshTransmissionMaterial {...materialProps} color="#2dd4bf" />
        </mesh>
      </Float>
    </group>
  );
}

function Starfield() {
  const points = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
       // Scatter points wide on X and globally across Y and Z
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  return (
    <points geometry={points}>
      <pointsMaterial size={0.05} color="#e2e8f0" transparent opacity={0.6} sizeAttenuation={true} />
    </points>
  );
}

export default function Global3DScene({ scrollYProgress }: Props) {
  // We use dpr={[1, 1.5]} to prevent performance drops on super high DPI mobile displays, enforcing a crisp but performant canvas.
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 10], fov: 45 }} 
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
         {/* Scene Components */}
         <color attach="background" args={['#020617']} />
         <ambientLight intensity={0.5} />
         <SpotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} color="#6366f1" />
         <SpotLight position={[-10, 0, -10]} angle={0.2} penumbra={1} intensity={2} color="#22d3ee" />
         
         <FloatingShapes scrollYProgress={scrollYProgress} />
         <Starfield />
         <CameraController scrollYProgress={scrollYProgress} />
         
         <Environment preset="city" />
      </Canvas>
      {/* Blend over Canvas to match page mood gradient slightly */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.1),rgba(2,6,23,0.16)_26%,rgba(2,6,23,0.95))]" />
    </div>
  );
}
