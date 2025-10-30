'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { VillageNode } from './VillageNode';
import { PathPreview } from './PathPreview';

interface Node {
  id: string;
  position: [number, number, number];
  distance: number;
  visited: boolean;
  isTarget: boolean;
  isStart: boolean;
  previousNode?: string; // Track shortest path
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface DijkstraVisualizationProps {
  onLoseLife: () => void;
  onReachTarget: () => void;
  isActive: boolean;
  onNodesUpdate?: (nodes: Node[], currentNode: string, edges: Edge[], visitedNodes: Set<string>, shortestPath: string[]) => void;
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

export function DijkstraVisualization({ onLoseLife, onReachTarget, isActive, onNodesUpdate, initialNodes = [], initialEdges = [] }: DijkstraVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [currentNode, setCurrentNode] = useState<string>('Arlam');
  const [algorithmStep, setAlgorithmStep] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  const [shortestPath, setShortestPath] = useState<string[]>([]); // Current shortest path
  const [relaxingNeighborId, setRelaxingNeighborId] = useState<string | null>(null);

  // Initialize graph structure
  useEffect(() => {
    if (initialNodes.length > 0) {
      setNodes(initialNodes);
      setEdges(initialEdges);
      
      // Find start node for currentNode
      const startNode = initialNodes.find(n => n.isStart);
      if (startNode) {
        setCurrentNode(startNode.id);
      }
      
      // Reset algorithm state
      setVisitedNodes(new Set());
      setShortestPath([]);
      setAlgorithmStep(0);
    }
  }, [initialNodes, initialEdges]);

  // Run Dijkstra's algorithm step by step
  useEffect(() => {
    if (!isActive || nodes.length === 0) return;

    const interval = setInterval(() => {
      setNodes(prevNodes => {
        const unvisited = prevNodes.filter(n => !n.visited);
        if (unvisited.length === 0) return prevNodes;

        const minNode = unvisited.reduce((min, node) =>
          node.distance < min.distance ? node : min
        );

        if (minNode.distance === Infinity) return prevNodes;

        const updatedNodes = prevNodes.map(node =>
          node.id === minNode.id ? { ...node, visited: true } : node
        );

        setCurrentNode(minNode.id);
        setVisitedNodes(prev => new Set([...prev, minNode.id]));

        if (minNode.isTarget) {
          onReachTarget();
          return updatedNodes;
        }

        const neighbors = edges.filter(e => e.from === minNode.id);
        neighbors.forEach((edge, index) => {
          const delayMs = 500 * index;
          setTimeout(() => {
            setRelaxingNeighborId(edge.to);
            setNodes(pn => pn.map(node => {
              if (node.id !== edge.to || node.visited) return node;
              const newDistance = minNode.distance + edge.weight;
              if (newDistance < node.distance) {
                return { ...node, distance: newDistance, previousNode: minNode.id };
              }
              return node;
            }));
          }, delayMs);
        });

        if (neighbors.length > 0) {
          setTimeout(() => setRelaxingNeighborId(null), 500 * neighbors.length + 50);
        } else {
          setRelaxingNeighborId(null);
        }

        setAlgorithmStep(prev => prev + 1);
        return updatedNodes;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive, nodes.length, edges, onReachTarget]);

  // Calculate shortest path from start to current node
  useEffect(() => {
    const path: string[] = [];
    let current = currentNode;
    
    while (current) {
      path.unshift(current);
      const node = nodes.find(n => n.id === current);
      if (!node || !node.previousNode || node.isStart) break;
      current = node.previousNode;
    }
    
    setShortestPath(path);
  }, [nodes, currentNode]);

  // Notify parent component of updates for minimap
  useEffect(() => {
    if (onNodesUpdate) {
      onNodesUpdate(nodes, currentNode, edges, visitedNodes, shortestPath);
    }
  }, [nodes, currentNode, edges, visitedNodes, shortestPath, onNodesUpdate]);

  // Check if edge is part of current shortest path
  const isPathEdge = (from: string, to: string): boolean => {
    for (let i = 0; i < shortestPath.length - 1; i++) {
      if ((shortestPath[i] === from && shortestPath[i + 1] === to) ||
          (shortestPath[i] === to && shortestPath[i + 1] === from)) {
        return true;
      }
    }
    return false;
  };

  // Calculate available paths from current node
  const getAvailablePaths = () => {
    const currentNodeData = nodes.find(n => n.id === currentNode);
    if (!currentNodeData) return [];

    const availableEdges = edges.filter(e => e.from === currentNode);
    
    return availableEdges.map(edge => {
      const targetNode = nodes.find(n => n.id === edge.to);
      const totalDistance = currentNodeData.distance + edge.weight;
      const isOptimal = targetNode && totalDistance === targetNode.distance;
      
      return {
        destination: edge.to,
        distance: edge.weight,
        isOptimal: isOptimal || false
      };
    }).sort((a, b) => a.distance - b.distance);
  };

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      {/* Render Village Nodes */}
      {nodes.map((node) => (
        <group key={node.id} position={node.position}>
          <VillageNode
            position={[0, 0, 0]}
            name={node.id}
            isStart={node.isStart}
            isTarget={node.isTarget}
          />
          
          {/* Village name label above */}
          <Text
            position={[0, 2.6, 0]}
            fontSize={0.5}
            color={node.isStart ? '#00ff00' : node.isTarget ? '#ff0000' : '#ffffff'}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
          >
            {node.id.toUpperCase()}
          </Text>
          
          {/* Glow effect for current node */}
          {currentNode === node.id && (
            <>
              <pointLight
                position={[0, 1.5, 0]}
                color="#00ffff"
                intensity={3}
                distance={5}
              />
              {/* Pulsing ring */}
              <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.5, 1.8, 32]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
              </mesh>
            </>
          )}

          {/* Distance indicator - show ∞ initially and update as algorithm progresses */}
          <Text
            position={[0, 2.1, 0]}
            fontSize={0.4}
            color={node.distance === Infinity ? '#cccccc' : '#ffff00'}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Distance: {node.distance === Infinity ? '-∞' : `${node.distance}`} km
          </Text>

          {/* Visited checkmark */}
          {node.visited && (
            <Text
              position={[0, 3.2, 0]}
              fontSize={0.5}
              color="#00ff00"
              anchorX="center"
              anchorY="middle"
            >
              ✓
            </Text>
          )}

          {/* Highlight neighbor currently being relaxed */}
          {relaxingNeighborId === node.id && (
            <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.0, 1.25, 32]} />
              <meshBasicMaterial color="#ffff00" transparent opacity={0.7} />
            </mesh>
          )}
        </group>
      ))}

      {/* Render Edges */}
      {edges.map((edge, idx) => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        
        if (!fromNode || !toNode) return null;

        const isVisitedEdge = visitedNodes.has(edge.from) && visitedNodes.has(edge.to);
        const isInShortestPath = isPathEdge(edge.from, edge.to);
        
        return (
          <EdgeLine
            key={idx}
            from={fromNode.position}
            to={toNode.position}
            weight={edge.weight}
            isVisited={isVisitedEdge}
            isShortestPath={isInShortestPath}
          />
        );
      })}

      {/* Path Preview Panel */}
      {nodes.length > 0 && (
        <PathPreview
          currentNode={currentNode}
          availablePaths={getAvailablePaths()}
          position={[0, 4.5, -10]}
        />
      )}
    </group>
  );
}

function EdgeLine({ 
  from, 
  to, 
  weight, 
  isVisited,
  isShortestPath
}: { 
  from: [number, number, number]; 
  to: [number, number, number]; 
  weight: number;
  isVisited: boolean;
  isShortestPath: boolean;
}) {
  const points = [
    new THREE.Vector3(...from),
    new THREE.Vector3(...to),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  const midpoint = new THREE.Vector3(
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2
  );

  // Determine edge color and appearance based on state
  let edgeColor = '#aaaaaa';
  let emissiveColor = '#000000';
  let emissiveIntensity = 0;
  let opacity = 0.4;
  let thickness = 0.04;

  if (isShortestPath) {
    // Shortest path - bright cyan/yellow
    edgeColor = '#00ffff';
    emissiveColor = '#00ffff';
    emissiveIntensity = 0.8;
    opacity = 1;
    thickness = 0.12;
  } else if (isVisited) {
    // Visited but not on shortest path - green
    edgeColor = '#00ff00';
    emissiveColor = '#00ff00';
    emissiveIntensity = 0.3;
    opacity = 0.6;
    thickness = 0.06;
  }

  return (
    <group>
      {/* Use a tube geometry for thicker, more visible edges */}
      <mesh>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(points),
          20,
          thickness,
          8,
          false
        ]} />
        <meshStandardMaterial 
          color={edgeColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Animated glow for shortest path */}
      {isShortestPath && (
        <mesh>
          <tubeGeometry args={[
            new THREE.CatmullRomCurve3(points),
            20,
            thickness * 1.5,
            8,
            false
          ]} />
          <meshBasicMaterial 
            color="#ffff00"
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
      
      {/* Weight Label with background */}
      <group position={[midpoint.x, midpoint.y + 0.5, midpoint.z]}>
        {/* Label background */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[0.8, 0.4]} />
          <meshBasicMaterial 
            color="#000000" 
            transparent 
            opacity={0.7}
          />
        </mesh>
        <Text
          position={[0, 0, 0]}
          fontSize={0.3}
          color="#ffff00"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {weight} km
        </Text>
      </group>
    </group>
  );
}
