import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function createNetwork() {
  const nodes = [
    [-2.8, 1.5, -1], [-1.6, 0.2, 0.4], [-0.5, 1.4, -0.4], [0.7, 0.5, 0.8],
    [1.8, 1.6, -0.7], [2.9, 0.3, 0.2], [-2.2, -1.1, 0.7], [-0.8, -1.6, -0.5],
    [0.5, -0.9, 0.2], [1.8, -1.5, -0.8], [3, -1, 0.5],
  ];
  const links = [[0, 1], [1, 2], [1, 6], [2, 3], [2, 4], [3, 7], [3, 8], [4, 5], [4, 9], [5, 10], [6, 7], [7, 8], [8, 9], [9, 10]];
  const linePositions = new Float32Array(links.flatMap(([from, to]) => [...nodes[from], ...nodes[to]]));
  return { nodes, linePositions };
}

export default function NeuralField() {
  const groupRef = useRef(null);
  const network = useMemo(createNetwork, []);
  const nodePositions = useMemo(() => new Float32Array(network.nodes.flat()), [network.nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.045 + state.pointer.x * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.08 + state.pointer.y * 0.04;
  });

  return (
    <group ref={groupRef} position={[0.8, 0, -1.2]} scale={0.9}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={network.linePositions.length / 3} array={network.linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.24} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={network.nodes.length} array={nodePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#38bdf8" size={0.08} transparent opacity={0.85} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </group>
  );
}
