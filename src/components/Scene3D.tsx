'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { SubaruCharacter } from './SubaruCharacter';
import { RoadSystem } from './RoadSystem';
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
      >
        <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={65} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#88ccff" />
        <pointLight position={[5, 3, 5]} intensity={0.4} color="#ff88cc" />
        
        {/* Rim light from behind */}
        <pointLight position={[0, 4, -8]} intensity={0.8} color="#8888ff" />
        
        <Suspense fallback={null}>
          <RoadSystem />
          <SubaruCharacter isRunning={true} />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={6}
          maxDistance={20}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0, 0]}
        />
        
        {/* Background gradient plane */}
        <mesh position={[0, 0, -50]} rotation={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial color="#0a0a1a" />
        </mesh>
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0f0f1e', 10, 50]} />
      </Canvas>
    </div>
  );
}
