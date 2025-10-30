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
  onNodesUpdate?: (nodes: Node[], currentNode: string, edges: Edge[], visitedNodes: Set<string>) => void;
}

export function DijkstraVisualization({ onLoseLife, onReachTarget, isActive, onNodesUpdate }: DijkstraVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [currentNode, setCurrentNode] = useState<string>('Arlam');
  const [algorithmStep, setAlgorithmStep] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());

  // Initialize graph structure with Re:Zero locations
  useEffect(() => {
    const initialNodes: Node[] = [
      { id: 'Arlam', position: [-8, 0, 0], distance: 0, visited: false, isStart: true, isTarget: false },
      { id: 'Earlham', position: [-4, 0, -3], distance: Infinity, visited: false, isStart: false, isTarget: false },
      { id: 'Flanders', position: [0, 0, -2], distance: Infinity, visited: false, isStart: false, isTarget: false },
      { id: 'Costuul', position: [-2, 0, -7], distance: Infinity, visited: false, isStart: false, isTarget: false },
      { id: 'Priestella', position: [4, 0, -4], distance: Infinity, visited: false, isStart: false, isTarget: false },
      { id: 'Ganaks', position: [2, 0, -8], distance: Infinity, visited: false, isStart: false, isTarget: false },
      { id: 'Lugnica', position: [8, 0, -6], distance: Infinity, visited: false, isStart: false, isTarget: true },
    ];

    const initialEdges: Edge[] = [
      { from: 'Arlam', to: 'Earlham', weight: 4 },
      { from: 'Arlam', to: 'Costuul', weight: 8 },
      { from: 'Earlham', to: 'Flanders', weight: 3 },
      { from: 'Earlham', to: 'Costuul', weight: 5 },
      { from: 'Flanders', to: 'Priestella', weight: 2 },
      { from: 'Flanders', to: 'Ganaks', weight: 6 },
      { from: 'Costuul', to: 'Ganaks', weight: 2 },
      { from: 'Priestella', to: 'Lugnica', weight: 3 },
      { from: 'Ganaks', to: 'Lugnica', weight: 7 },
    ];

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  // Run Dijkstra's algorithm step by step
  useEffect(() => {
    if (!isActive || nodes.length === 0) return;

    const interval = setInterval(() => {
      setNodes((prevNodes) => {
        const unvisited = prevNodes.filter(n => !n.visited);
        if (unvisited.length === 0) return prevNodes;

        // Find node with minimum distance
        const minNode = unvisited.reduce((min, node) => 
          node.distance < min.distance ? node : min
        );

        if (minNode.distance === Infinity) return prevNodes;

        // Mark as visited
        const updatedNodes = prevNodes.map(node => 
          node.id === minNode.id ? { ...node, visited: true } : node
        );

        setCurrentNode(minNode.id);
        setVisitedNodes(prev => new Set([...prev, minNode.id]));

        // Check if reached target
        if (minNode.isTarget) {
          onReachTarget();
          return updatedNodes;
        }

        // Update distances of neighbors
        const neighbors = edges.filter(e => e.from === minNode.id);
        
        return updatedNodes.map(node => {
          const edge = neighbors.find(e => e.to === node.id);
          if (edge && !node.visited) {
            const newDistance = minNode.distance + edge.weight;
            if (newDistance < node.distance) {
              return { ...node, distance: newDistance };
            }
          }
          return node;
        });
      });

      setAlgorithmStep(prev => prev + 1);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isActive, nodes.length, edges, onReachTarget]);

  // Notify parent component of updates for minimap
  useEffect(() => {
    if (onNodesUpdate) {
      onNodesUpdate(nodes, currentNode, edges, visitedNodes);
    }
  }, [nodes, currentNode, edges, visitedNodes, onNodesUpdate]);

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
          
          {/* Glow effect for current node */}
          {currentNode === node.id && (
            <pointLight
              position={[0, 2, 0]}
              color="#00ffff"
              intensity={2}
              distance={5}
            />
          )}

          {/* Distance indicator */}
          {node.distance !== Infinity && (
            <Text
              position={[0, -1.2, 0]}
              fontSize={0.3}
              color="#ffff00"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {node.distance} km
            </Text>
          )}

          {/* Visited checkmark */}
          {node.visited && (
            <Text
              position={[0, 2.5, 0]}
              fontSize={0.4}
              color="#00ff00"
              anchorX="center"
              anchorY="middle"
            >
              ✓
            </Text>
          )}
        </group>
      ))}

      {/* Render Edges */}
      {edges.map((edge, idx) => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        
        if (!fromNode || !toNode) return null;

        const isVisitedEdge = visitedNodes.has(edge.from) && visitedNodes.has(edge.to);
        
        return (
          <EdgeLine
            key={idx}
            from={fromNode.position}
            to={toNode.position}
            weight={edge.weight}
            isVisited={isVisitedEdge}
          />
        );
      })}

      {/* Path Preview Panel */}
      {nodes.length > 0 && (
        <PathPreview
          currentNode={currentNode}
          availablePaths={getAvailablePaths()}
          position={[0, 3, -8]}
        />
      )}
    </group>
  );
}

function EdgeLine({ 
  from, 
  to, 
  weight, 
  isVisited 
}: { 
  from: [number, number, number]; 
  to: [number, number, number]; 
  weight: number;
  isVisited: boolean;
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

  return (
    <group>
      <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
        color: isVisited ? '#00ff00' : '#ffffff',
        linewidth: isVisited ? 3 : 1,
        opacity: isVisited ? 1 : 0.3,
        transparent: true
      }))} />
      
      {/* Weight Label */}
      <Text
        position={[midpoint.x, midpoint.y + 0.3, midpoint.z]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {weight}
      </Text>
    </group>
  );
}
