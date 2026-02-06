import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimation } from '../../context/AnimationContext';

function Nodes({ count = 100 }) {
  const mesh = useRef();
  const { mouse, viewport } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      temp.push({ position: [x, y, z], speed: Math.random() * 0.02 + 0.005 });
    }
    return temp;
  }, [count]);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPrimary = new THREE.Color('#13b973');
    const colorSecondary = new THREE.Color('#00D4FF');

    particles.forEach((p, i) => {
      pos[i * 3] = p.position[0];
      pos[i * 3 + 1] = p.position[1];
      pos[i * 3 + 2] = p.position[2];

      const color = Math.random() > 0.5 ? colorPrimary : colorSecondary;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    });

    return [pos, col];
  }, [particles, count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;

      // Mouse interaction
      const mouseX = (mouse.x * viewport.width) / 2;
      const mouseY = (mouse.y * viewport.height) / 2;
      const dx = positions[i3] - mouseX;
      const dy = positions[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) / 3;
        positions[i3] += (dx / dist) * force * 0.05;
        positions[i3 + 1] += (dy / dist) * force * 0.05;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function Lines({ count = 100 }) {
  const lineRef = useRef();

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.z += 0.0005;
    }
  });

  const linePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 50; i++) {
      const x1 = (Math.random() - 0.5) * 20;
      const y1 = (Math.random() - 0.5) * 20;
      const x2 = x1 + (Math.random() - 0.5) * 5;
      const y2 = y1 + (Math.random() - 0.5) * 5;
      positions.push(x1, y1, 0, x2, y2, 0);
    }
    return new Float32Array(positions);
  }, []);

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={100} array={linePositions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#13b973" transparent opacity={0.2} />
    </lineSegments>
  );
}

export default function NeuralNetworkCanvas({ className = '' }) {
  const { reducedMotion } = useAnimation();

  if (reducedMotion) {
    return <div className={`neural-canvas-placeholder ${className}`} />;
  }

  return (
    <div className={`neural-canvas ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <Nodes count={150} />
        <Lines />
      </Canvas>
      <style>{`
        .neural-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .neural-canvas-placeholder {
          position: absolute;
          inset: 0;
          background: var(--gradient-mesh);
        }
      `}</style>
    </div>
  );
}
