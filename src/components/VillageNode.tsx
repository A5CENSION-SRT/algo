'use client';

import { useRef } from 'react';
import * as THREE from 'three';

interface VillageNodeProps {
  position: [number, number, number];
  name: string;
  isStart?: boolean;
  isTarget?: boolean;
}

export function VillageNode({ position, name, isStart, isTarget }: VillageNodeProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={position}>
      {/* Village base platform - smaller */}
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.3, 8]} />
        <meshStandardMaterial 
          color={isStart ? '#2d5016' : isTarget ? '#5c1616' : '#3d3d3d'}
          roughness={0.8}
        />
      </mesh>

      {/* Main building - smaller */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#8b7355" roughness={0.9} />
      </mesh>

      {/* Roof - smaller */}
      <mesh position={[0, 1, 0]} castShadow>
        <coneGeometry args={[0.6, 0.5, 4]} />
        <meshStandardMaterial color="#a52a2a" />
      </mesh>

      {/* Windows - smaller */}
      <mesh position={[0.41, 0.5, 0]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial 
          color="#ffeb3b" 
          emissive="#ffeb3b"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={[-0.41, 0.5, 0]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial 
          color="#ffeb3b" 
          emissive="#ffeb3b"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Door - smaller */}
      <mesh position={[0, 0.2, 0.41]}>
        <planeGeometry args={[0.25, 0.4]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Trees around village */}
      {isStart && (
        <>
          <group position={[-1.8, 0, -1.8]}>
            <mesh position={[0, 0.3, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.15, 0.6, 6]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[0, 0.8, 0]} castShadow>
              <coneGeometry args={[0.4, 0.8, 6]} />
              <meshStandardMaterial color="#228b22" />
            </mesh>
          </group>
          <group position={[1.8, 0, -1.8]}>
            <mesh position={[0, 0.3, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.15, 0.6, 6]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[0, 0.8, 0]} castShadow>
              <coneGeometry args={[0.4, 0.8, 6]} />
              <meshStandardMaterial color="#228b22" />
            </mesh>
          </group>
        </>
      )}

      {/* Castle towers for capital - adjusted for smaller size */}
      {isTarget && (
        <>
          <mesh position={[-0.5, 1.2, -0.5]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
            <meshStandardMaterial color="#808080" />
          </mesh>
          <mesh position={[-0.5, 1.7, -0.5]} castShadow>
            <coneGeometry args={[0.25, 0.35, 8]} />
            <meshStandardMaterial color="#4169e1" />
          </mesh>
          <mesh position={[0.5, 1.2, -0.5]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
            <meshStandardMaterial color="#808080" />
          </mesh>
          <mesh position={[0.5, 1.7, -0.5]} castShadow>
            <coneGeometry args={[0.25, 0.35, 8]} />
            <meshStandardMaterial color="#4169e1" />
          </mesh>
        </>
      )}

      {/* Flags - adjusted */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      <mesh position={[0.15, 1.5, 0]}>
        <planeGeometry args={[0.25, 0.18]} />
        <meshStandardMaterial 
          color={isStart ? '#00ff00' : isTarget ? '#ff0000' : '#4169e1'}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
