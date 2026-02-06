import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimation } from '../../context/AnimationContext';

function Particles({ count = 500 }) {
  const mesh = useRef();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i].x;
      pos[i3 + 1] += velocities[i].y;
      pos[i3 + 2] += velocities[i].z;

      // Wrap around
      if (pos[i3] > 15) pos[i3] = -15;
      if (pos[i3] < -15) pos[i3] = 15;
      if (pos[i3 + 1] > 15) pos[i3 + 1] = -15;
      if (pos[i3 + 1] < -15) pos[i3 + 1] = 15;
      if (pos[i3 + 2] > 15) pos[i3 + 2] = -15;
      if (pos[i3 + 2] < -15) pos[i3 + 2] = 15;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.0005;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#13b973" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function ParticleField({ className = '' }) {
  const { reducedMotion } = useAnimation();

  if (reducedMotion) {
    return null;
  }

  return (
    <div className={`particle-field ${className}`}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.5]}>
        <Particles count={300} />
      </Canvas>
      <style>{`
        .particle-field {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
