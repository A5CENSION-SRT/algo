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
      {/* Village base platform */}
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.8, 0.3, 8]} />
        <meshStandardMaterial 
          color={isStart ? '#2d5016' : isTarget ? '#5c1616' : '#3d3d3d'}
          roughness={0.8}
        />
      </mesh>

      {/* Main building */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8b7355" roughness={0.9} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <coneGeometry args={[0.8, 0.6, 4]} />
        <meshStandardMaterial color="#a52a2a" />
      </mesh>

      {/* Windows */}
      <mesh position={[0.51, 0.6, 0]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial 
          color="#ffeb3b" 
          emissive="#ffeb3b"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[-0.51, 0.6, 0]}>
        <planeGeometry args={[0.2, 0.2]} />
        <meshStandardMaterial 
          color="#ffeb3b" 
          emissive="#ffeb3b"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.2, 0.51]}>
        <planeGeometry args={[0.3, 0.5]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Trees around village */}
      {isStart && (
        <>
          <group position={[-1.2, 0, -1.2]}>
            <mesh position={[0, 0.3, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.15, 0.6, 6]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[0, 0.8, 0]} castShadow>
              <coneGeometry args={[0.4, 0.8, 6]} />
              <meshStandardMaterial color="#228b22" />
            </mesh>
          </group>
          <group position={[1.2, 0, -1.2]}>
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

      {/* Castle towers for capital */}
      {isTarget && (
        <>
          <mesh position={[-0.6, 1.5, -0.6]} castShadow>
            <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
            <meshStandardMaterial color="#808080" />
          </mesh>
          <mesh position={[-0.6, 2.1, -0.6]} castShadow>
            <coneGeometry args={[0.3, 0.4, 8]} />
            <meshStandardMaterial color="#4169e1" />
          </mesh>
          <mesh position={[0.6, 1.5, -0.6]} castShadow>
            <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
            <meshStandardMaterial color="#808080" />
          </mesh>
          <mesh position={[0.6, 2.1, -0.6]} castShadow>
            <coneGeometry args={[0.3, 0.4, 8]} />
            <meshStandardMaterial color="#4169e1" />
          </mesh>
        </>
      )}

      {/* Flags */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      <mesh position={[0.2, 1.9, 0]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial 
          color={isStart ? '#00ff00' : isTarget ? '#ff0000' : '#4169e1'}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
