import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import StarField from './StarField';
import NeuralField from './NeuralField';

function ScrollCamera({ scrollY }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.y = -scrollY * 0.005;
  });
  return null;
}

export default function Scene3D({ scrollY }) {
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const lowPowerQuery = window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce), (max-width: 767px)');
    const updatePowerMode = () => setIsLowPower(lowPowerQuery.matches);
    updatePowerMode();
    lowPowerQuery.addEventListener('change', updatePowerMode);
    return () => lowPowerQuery.removeEventListener('change', updatePowerMode);
  }, []);

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={isLowPower ? 1 : [1, 1.25]}
        frameloop={isDocumentVisible ? 'always' : 'never'}
      >
        {/* Dynamic ambient lighting for the cosmic indigo/cyan palette */}
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={2.4} color="#6366F1" />
        <pointLight position={[-5, -5, 5]} intensity={1.8} color="#06B6D4" />
        
        <StarField count={isLowPower ? 180 : 500} />
        {!isLowPower ? <NeuralField /> : null}
        <ScrollCamera scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
