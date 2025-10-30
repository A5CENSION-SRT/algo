'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { SubaruCharacter } from './SubaruCharacter';
import { Suspense } from 'react';

export function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        gl={{ 
          antialias: false,
          alpha: true,
        }}
        style={{ 
          imageRendering: 'pixelated',
          imageRendering: 'crisp-edges' as any,
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#88ccff" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#ff88cc" />
        
        <Suspense fallback={null}>
          <SubaruCharacter />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Pixel grid floor effect */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[20, 20, 20, 20]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
