'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function RoadSystem() {
  const roadRef = useRef<THREE.Group>(null);
  
  // Animate road scrolling
  useFrame((state) => {
    if (roadRef.current) {
      // Move road backwards to simulate forward motion
      roadRef.current.position.z = (state.clock.elapsedTime * 3) % 20 - 10;
    }
  });

  return (
    <group>
      {/* Main road segments that loop */}
      {[0, 1, 2, 3].map((index) => (
        <group key={index} ref={index === 0 ? roadRef : undefined}>
          <RoadSegment position={[0, -2.3, index * 20 - 30]} />
        </group>
      ))}
      
      {/* Side buildings/obstacles for depth */}
      {[-1, 1].map((side) => (
        <group key={side}>
          {[...Array(8)].map((_, i) => (
            <mesh
              key={i}
              position={[side * 4, -1, i * 15 - 40]}
              castShadow
            >
              <boxGeometry args={[1.5, Math.random() * 2 + 1, 2]} />
              <meshStandardMaterial 
                color={Math.random() > 0.5 ? '#2a4a6a' : '#3a2a4a'} 
                emissive={Math.random() > 0.7 ? '#4a6a8a' : '#000000'}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function RoadSegment({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Road base */}
      <mesh receiveShadow>
        <boxGeometry args={[6, 0.2, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Road lanes - center dashed lines */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, 0.11, i * 2.5 - 8.75]}>
          <boxGeometry args={[0.2, 0.01, 1.5]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {/* Side lanes */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 2.9, 0.11, 0]}>
          <boxGeometry args={[0.15, 0.01, 20]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
      ))}
      
      {/* Pixel grid on road */}
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 20, 12, 40]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}
