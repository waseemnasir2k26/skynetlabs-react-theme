import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useAnimation } from '../../context/AnimationContext';

function Orb({ position, color, speed = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
  });

  return (
    <Sphere ref={mesh} args={[1, 64, 64]} position={position}>
      <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0} metalness={0.2} />
    </Sphere>
  );
}

export default function GradientOrbs({ className = '' }) {
  const { reducedMotion } = useAnimation();

  if (reducedMotion) {
    return null;
  }

  return (
    <div className={`gradient-orbs ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Orb position={[-3, 0, 0]} color="#13b973" speed={0.8} />
        <Orb position={[3, 1, -2]} color="#00D4FF" speed={1.2} />
        <Orb position={[0, -2, -3]} color="#7B61FF" speed={1} />
      </Canvas>
      <style>{`
        .gradient-orbs {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
}
