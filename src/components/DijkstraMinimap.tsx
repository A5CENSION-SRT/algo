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
}

export function DijkstraMinimap({ nodes, edges, currentNode }: DijkstraMinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(10, 10, 30, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scale and offset for the graph
    const scaleX = 20;
    const scaleY = 20;
    const offsetX = canvas.width / 2;
    const offsetY = canvas.height / 2;

    // Draw edges first
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (!fromNode || !toNode) return;

      const x1 = fromNode.x * scaleX + offsetX;
      const y1 = fromNode.y * scaleY + offsetY;
      const x2 = toNode.x * scaleX + offsetX;
      const y2 = toNode.y * scaleY + offsetY;

      ctx.strokeStyle = edge.isVisited ? '#00ff00' : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = edge.isVisited ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(node => {
      const x = node.x * scaleX + offsetX;
      const y = node.y * scaleY + offsetY;

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
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(node.id.substring(0, 3), x, y + 10);
    });

    // Draw character position at current node
    const currentNodeData = nodes.find(n => n.id === currentNode);
    if (currentNodeData) {
      const x = currentNodeData.x * scaleX + offsetX;
      const y = currentNodeData.y * scaleY + offsetY;

      // Character indicator
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(x, y - 12);
      ctx.lineTo(x - 4, y - 18);
      ctx.lineTo(x + 4, y - 18);
      ctx.closePath();
      ctx.fill();
    }

  }, [nodes, edges, currentNode]);

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
