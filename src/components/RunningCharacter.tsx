'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RunningCharacterProps {
  isRunning?: boolean;
}

export function RunningCharacter({ isRunning = true }: RunningCharacterProps) {
  const group = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      if (isRunning) {
        // Running animation - bob up and down
        group.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 8)) * 0.15 - 1;
        
        // Animate legs for running
        if (leftLegRef.current && rightLegRef.current) {
          const legSwing = Math.sin(state.clock.elapsedTime * 8) * 0.6;
          leftLegRef.current.rotation.x = legSwing;
          rightLegRef.current.rotation.x = -legSwing;
        }
        
        // Animate arms for running (opposite of legs)
        if (leftArmRef.current && rightArmRef.current) {
          const armSwing = Math.sin(state.clock.elapsedTime * 8) * 0.4;
          leftArmRef.current.rotation.x = -armSwing;
          rightArmRef.current.rotation.x = armSwing;
        }
        
        // Slight forward lean when running
        group.current.rotation.x = 0.1;
      }
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]} scale={1.2}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[0.8, 0.9, 0.8]} />
        <meshStandardMaterial color="#ffdfc4" />
      </mesh>
      
      {/* Hair (black) */}
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[1, 0.6, 1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Hair bangs */}
      <mesh position={[-0.3, 2.2, 0.3]}>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.3, 2.2, 0.3]}>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.2, 1.9, 0.35]}>
        <boxGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color="#3d2614" emissive="#3d2614" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 1.9, 0.35]}>
        <boxGeometry args={[0.15, 0.15, 0.1]} />
        <meshStandardMaterial color="#3d2614" emissive="#3d2614" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Eye highlights (anime style) */}
      <mesh position={[-0.15, 1.95, 0.4]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.25, 1.95, 0.4]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      
      {/* Body (white tracksuit jacket) */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[1.2, 1.4, 0.6]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Green stripe on jacket */}
      <mesh position={[0, 1.2, 0.31]}>
        <boxGeometry args={[0.8, 0.3, 0.05]} />
        <meshStandardMaterial color="#4a9d5f" />
      </mesh>
      
      {/* Arms */}
      <group>
        {/* Left arm */}
        <group ref={leftArmRef} position={[-0.7, 0.9, 0]}>
          <mesh rotation={[0, 0, Math.PI * 0.1]}>
            <boxGeometry args={[0.3, 1.2, 0.3]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          <mesh position={[-0.1, -0.7, 0]}>
            <boxGeometry args={[0.25, 0.6, 0.25]} />
            <meshStandardMaterial color="#ffdfc4" />
          </mesh>
        </group>
        
        {/* Right arm */}
        <group ref={rightArmRef} position={[0.7, 0.9, 0]}>
          <mesh rotation={[0, 0, -Math.PI * 0.1]}>
            <boxGeometry args={[0.3, 1.2, 0.3]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          <mesh position={[0.1, -0.7, 0]}>
            <boxGeometry args={[0.25, 0.6, 0.25]} />
            <meshStandardMaterial color="#ffdfc4" />
          </mesh>
        </group>
      </group>
      
      {/* Legs */}
      <group>
        {/* Left leg */}
        <group ref={leftLegRef} position={[-0.3, 0.4, 0]}>
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[0.4, 1.4, 0.4]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          <mesh position={[0, -1.6, 0]}>
            <boxGeometry args={[0.45, 0.3, 0.6]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
        
        {/* Right leg */}
        <group ref={rightLegRef} position={[0.3, 0.4, 0]}>
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[0.4, 1.4, 0.4]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          <mesh position={[0, -1.6, 0]}>
            <boxGeometry args={[0.45, 0.3, 0.6]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
      </group>
      
      {/* Shadow below */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color="#000000" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}
