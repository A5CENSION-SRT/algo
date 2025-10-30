'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei';
import { Suspense, useState, useCallback, useEffect } from 'react';
import { DijkstraVisualization } from './DijkstraVisualization';
import { CharacterWithMovement } from './CharacterWithMovement';
import { AudioManager } from './AudioManager';
import { DijkstraMinimap } from './DijkstraMinimap';

interface Node {
  id: string;
  position: [number, number, number];
  distance: number;
  visited: boolean;
  isTarget: boolean;
  isStart: boolean;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface DijkstraSceneProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  isRunning?: boolean;
}

export function DijkstraScene({ initialNodes = [], initialEdges = [], isRunning = false }: DijkstraSceneProps) {
  const [lives, setLives] = useState(3);
  const [isDead, setIsDead] = useState(false);
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>([-10, 0, 2]);
  const [isAlgorithmActive, setIsAlgorithmActive] = useState(isRunning);
  const [characterSpeed, setCharacterSpeed] = useState(0.07);
  
  // Sync with external isRunning prop
  useEffect(() => {
    setIsAlgorithmActive(isRunning);
  }, [isRunning]);
  
  // Minimap data
  const [minimapNodes, setMinimapNodes] = useState<any[]>([]);
  const [minimapEdges, setMinimapEdges] = useState<any[]>([]);
  const [minimapCurrentNode, setMinimapCurrentNode] = useState<string>('Arlam');
  const [minimapShortestPath, setMinimapShortestPath] = useState<string[]>([]);

  const handleLoseLife = useCallback(() => {
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setIsDead(true);
      }
      return newLives;
    });
  }, []);

  const handleReachTarget = useCallback(() => {
    console.log('Target reached!');
    // You can add victory logic here
  }, []);

  const handleWrongPath = useCallback(() => {
    handleLoseLife();
  }, [handleLoseLife]);

  const handleResetAfterDeath = useCallback(() => {
    setIsDead(false);
    setLives(3);
    setTargetPosition([-10, 0, 2]);
    setIsAlgorithmActive(true);
  }, []);

  const handleNodeReached = useCallback(() => {
    console.log('Node reached');
  }, []);

  const handleNodesUpdate = useCallback((nodes: Node[], currentNode: string, edges: Edge[], visitedNodes: Set<string>, shortestPath: string[]) => {
    // Convert 3D positions to 2D for minimap
    const minimapNodesData = nodes.map(node => ({
      id: node.id,
      x: node.position[0],
      y: node.position[2],
      visited: node.visited,
      isStart: node.isStart,
      isTarget: node.isTarget,
      isCurrent: node.id === currentNode
    }));

    const minimapEdgesData = edges.map(edge => ({
      from: edge.from,
      to: edge.to,
      isVisited: visitedNodes.has(edge.from) && visitedNodes.has(edge.to)
    }));

    setMinimapNodes(minimapNodesData);
    setMinimapEdges(minimapEdgesData);
    setMinimapCurrentNode(currentNode);
    setMinimapShortestPath(shortestPath);
    
    // Update character target position to current node
    const currentNodeData = nodes.find(n => n.id === currentNode);
    if (currentNodeData) {
      setTargetPosition(currentNodeData.position);
    }
  }, []);

  return (
    <>
      <AudioManager 
        isPlaying={isAlgorithmActive} 
        onDeath={isDead}
        onReset={handleResetAfterDeath}
      />
      
      <Canvas
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 12, 12]} fov={60} />
        
        {/* Sky background */}
        <Sky
          distance={450000}
          sunPosition={[100, 20, 100]}
          inclination={0.49}
          azimuth={0.25}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <hemisphereLight
          color="#87CEEB"
          groundColor="#5d4e37"
          intensity={0.6}
        />
        <pointLight position={[-10, 8, -10]} intensity={0.4} color="#ffeeaa" />
        <pointLight position={[10, 8, -10]} intensity={0.4} color="#aaeeff" />
        
        <Suspense fallback={null}>
          {/* Dijkstra Graph Visualization */}
          <DijkstraVisualization 
            onLoseLife={handleLoseLife}
            onReachTarget={handleReachTarget}
            isActive={isAlgorithmActive}
            onNodesUpdate={handleNodesUpdate}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
          />
          
          {/* Character that moves between nodes */}
          <CharacterWithMovement 
            isRunning={true}
            targetPosition={targetPosition}
            onReachTarget={handleNodeReached}
            onWrongPath={handleWrongPath}
            speed={characterSpeed}
          />

          {/* Ground plane - grass/forest floor */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -2.5, -3]} 
            receiveShadow
          >
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial 
              color="#4a6741" 
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>

          {/* Forest trees in background */}
          {[...Array(20)].map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const radius = 15 + Math.random() * 5;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const height = 3 + Math.random() * 2;
            
            return (
              <group key={i} position={[x, -2.5, z]}>
                {/* Tree trunk */}
                <mesh castShadow>
                  <cylinderGeometry args={[0.3, 0.4, height, 8]} />
                  <meshStandardMaterial color="#4a3829" />
                </mesh>
                {/* Tree foliage */}
                <mesh position={[0, height / 2 + 1, 0]} castShadow>
                  <coneGeometry args={[1.5, 3, 8]} />
                  <meshStandardMaterial color="#2d5016" />
                </mesh>
              </group>
            );
          })}

          {/* Grid helper for spatial awareness (subtle) */}
          <gridHelper 
            args={[40, 40, '#6b8e63', '#4a6741']} 
            position={[0, -2.4, -3]} 
          />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={10}
          maxDistance={30}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          target={[0, 0, -3]}
        />
        
        {/* Atmospheric fog */}
        <fog attach="fog" args={['#d4e4f7', 20, 70]} />
      </Canvas>

      {/* Minimap */}
      <div className="absolute top-6 right-6 z-20 pointer-events-none">
        <div 
          className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400 p-2"
          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
        >
          <DijkstraMinimap 
            nodes={minimapNodes}
            edges={minimapEdges}
            currentNode={minimapCurrentNode}
            shortestPath={minimapShortestPath}
          />
          <p className="text-xs text-cyan-300 font-mono mt-2 text-center">
            MAP OF LUGNICA
          </p>
        </div>
      </div>

      {/* Character Speed Control */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">git
        <div className="bg-black/80 backdrop-blur-sm border-2 border-cyan-400 p-3 rounded-md shadow-lg">
          <p className="text-cyan-300 text-sm font-mono mb-2">Character Speed</p>
          <input
            type="range"
            min={0.02}
            max={0.25}
            step={0.01}
            value={characterSpeed}
            onChange={(e) => setCharacterSpeed(parseFloat(e.target.value))}
            className="w-64 accent-cyan-400"
          />
          <div className="text-xs text-white font-mono mt-1">{characterSpeed.toFixed(2)}</div>
        </div>
      </div>

      {/* Death Overlay */}
      {isDead && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-red-500 font-mono animate-pulse">
              RETURN BY DEATH
            </h1>
            <p className="text-2xl text-white font-mono">
              Resetting timeline...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
