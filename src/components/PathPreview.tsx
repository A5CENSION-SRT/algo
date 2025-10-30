'use client';

import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface PathInfo {
  destination: string;
  distance: number;
  isOptimal: boolean;
}

interface PathPreviewProps {
  currentNode: string;
  availablePaths: PathInfo[];
  position: [number, number, number];
}

export function PathPreview({ currentNode, availablePaths, position }: PathPreviewProps) {
  return (
    <group position={position}>
      {/* Info panel background */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent 
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3.1, 2.1]} />
        <meshBasicMaterial 
          color="#00ffff" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.15}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        AVAILABLE PATHS FROM {currentNode}
      </Text>

      {/* Path options */}
      {availablePaths.slice(0, 3).map((path, index) => (
        <group key={index} position={[0, 0.4 - index * 0.4, 0.01]}>
          {/* Path background */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.8, 0.35]} />
            <meshBasicMaterial 
              color={path.isOptimal ? '#004400' : '#440000'} 
              transparent 
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Destination */}
          <Text
            position={[-1, 0.08, 0]}
            fontSize={0.12}
            color={path.isOptimal ? '#00ff00' : '#ffffff'}
            anchorX="left"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            → {path.destination}
          </Text>

          {/* Distance */}
          <Text
            position={[1, 0.08, 0]}
            fontSize={0.1}
            color={path.isOptimal ? '#ffff00' : '#aaaaaa'}
            anchorX="right"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            {path.distance} km
          </Text>

          {/* Optimal indicator */}
          {path.isOptimal && (
            <Text
              position={[0, -0.08, 0]}
              fontSize={0.08}
              color="#00ff00"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#000000"
            >
              ★ SHORTEST PATH ★
            </Text>
          )}
        </group>
      ))}
    </group>
  );
}
