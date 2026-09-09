import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import StarField from './StarField';

function ScrollCamera({ scrollY }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.y = -scrollY * 0.005;
  });
  return null;
}

export default function Scene3D({ scrollY }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Dynamic ambient lighting for the cosmic indigo/cyan palette */}
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={2.4} color="#6366F1" />
        <pointLight position={[-5, -5, 5]} intensity={1.8} color="#06B6D4" />
        
        <StarField />
        <ScrollCamera scrollY={scrollY} />
        
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.9} intensity={0.3} />
          <Noise opacity={0.012} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
