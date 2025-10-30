'use client';

import { useEffect, useRef } from 'react';

interface MinimapNode {
  id: string;
  x: number;
  y: number;
  visited: boolean;
  isStart: boolean;
  isTarget: boolean;
  isCurrent: boolean;
}

interface MinimapEdge {
  from: string;
  to: string;
  isVisited: boolean;
}

interface DijkstraMinimapProps {
  nodes: MinimapNode[];
  edges: MinimapEdge[];
  currentNode: string;
  shortestPath?: string[];
}

export function DijkstraMinimap({ nodes, edges, currentNode, shortestPath = [] }: DijkstraMinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(10, 10, 30, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (nodes.length === 0) return;

    // Calculate bounds for proper scaling
    const xCoords = nodes.map(n => n.x);
    const yCoords = nodes.map(n => n.y);
    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);
    
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    const maxRange = Math.max(rangeX, rangeY);
    
    // Scale to fit in canvas with padding
    const padding = 30;
    const scale = (Math.min(canvas.width, canvas.height) - padding * 2) / maxRange;
    const centerX = minX + rangeX / 2;
    const centerY = minY + rangeY / 2;
    const offsetX = canvas.width / 2;
    const offsetY = canvas.height / 2;

    // Helper function to check if edge is in shortest path
    const isInShortestPath = (from: string, to: string): boolean => {
      for (let i = 0; i < shortestPath.length - 1; i++) {
        if ((shortestPath[i] === from && shortestPath[i + 1] === to) ||
            (shortestPath[i] === to && shortestPath[i + 1] === from)) {
          return true;
        }
      }
      return false;
    };

    // Draw edges first (non-shortest path)
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (!fromNode || !toNode) return;
      if (isInShortestPath(edge.from, edge.to)) return; // Skip shortest path edges for now

      const x1 = (fromNode.x - centerX) * scale + offsetX;
      const y1 = (fromNode.y - centerY) * scale + offsetY;
      const x2 = (toNode.x - centerX) * scale + offsetX;
      const y2 = (toNode.y - centerY) * scale + offsetY;

      ctx.strokeStyle = edge.isVisited ? 'rgba(0, 255, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });

    // Draw shortest path edges with better highlighting
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (!fromNode || !toNode) return;
      if (!isInShortestPath(edge.from, edge.to)) return; // Only draw shortest path edges

      const x1 = (fromNode.x - centerX) * scale + offsetX;
      const y1 = (fromNode.y - centerY) * scale + offsetY;
      const x2 = (toNode.x - centerX) * scale + offsetX;
      const y2 = (toNode.y - centerY) * scale + offsetY;

      // Draw glow effect
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    });

    // Draw nodes
    nodes.forEach(node => {
      const x = (node.x - centerX) * scale + offsetX;
      const y = (node.y - centerY) * scale + offsetY;

      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, node.isCurrent ? 8 : 6, 0, Math.PI * 2);
      
      if (node.isStart) {
        ctx.fillStyle = '#00ff00';
      } else if (node.isTarget) {
        ctx.fillStyle = '#ff0000';
      } else if (node.visited) {
        ctx.fillStyle = '#ffaa00';
      } else if (node.isCurrent) {
        ctx.fillStyle = '#00ffff';
      } else {
        ctx.fillStyle = '#4a6a8a';
      }
      
      ctx.fill();
      
      // Node outline
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = node.isCurrent ? 2 : 1;
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(node.id.substring(0, 4), x, y + 10);
    });

    // Draw character position at current node
    const currentNodeData = nodes.find(n => n.id === currentNode);
    if (currentNodeData) {
      const x = (currentNodeData.x - centerX) * scale + offsetX;
      const y = (currentNodeData.y - centerY) * scale + offsetY;

      // Character indicator
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(x, y - 12);
      ctx.lineTo(x - 4, y - 18);
      ctx.lineTo(x + 4, y - 18);
      ctx.closePath();
      ctx.fill();
    }

  }, [nodes, edges, currentNode, shortestPath]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className="w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
