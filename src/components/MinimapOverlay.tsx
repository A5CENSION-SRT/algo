'use client';

import { useEffect, useRef } from 'react';

export function MinimapOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.05;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw road
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(60, 0, 80, canvas.height);

      // Road edges
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 0);
      ctx.lineTo(60, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(140, 0);
      ctx.lineTo(140, canvas.height);
      ctx.stroke();

      // Center dashed lines (animated)
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.lineDashOffset = -time * 20;
      ctx.beginPath();
      ctx.moveTo(100, 0);
      ctx.lineTo(100, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Side buildings/obstacles (moving)
      const buildingOffset = (time * 20) % 40;
      for (let i = 0; i < 8; i++) {
        const y = (i * 40 - buildingOffset + canvas.height) % canvas.height;
        
        // Left buildings
        ctx.fillStyle = '#2a4a6a';
        ctx.fillRect(10, y - 15, 20, 25);
        ctx.strokeStyle = '#4a6a8a';
        ctx.lineWidth = 1;
        ctx.strokeRect(10, y - 15, 20, 25);
        
        // Right buildings
        ctx.fillStyle = '#3a2a4a';
        ctx.fillRect(170, y - 15, 20, 25);
        ctx.strokeStyle = '#5a4a6a';
        ctx.strokeRect(170, y - 15, 20, 25);
      }

      // Draw Subaru (player position - centered, stationary)
      const playerY = canvas.height / 2;
      const playerX = 100;

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(playerX, playerY + 20, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Character body
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(playerX - 10, playerY - 5, 20, 15);

      // Head
      ctx.fillStyle = '#ffdfc4';
      ctx.fillRect(playerX - 8, playerY - 20, 16, 15);

      // Hair
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(playerX - 10, playerY - 25, 20, 8);

      // Eyes (simple dots)
      ctx.fillStyle = '#3d2614';
      ctx.fillRect(playerX - 5, playerY - 15, 3, 3);
      ctx.fillRect(playerX + 2, playerY - 15, 3, 3);

      // Running animation indicator (bobbing)
      const bob = Math.sin(time * 8) * 2;
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.arc(playerX - 15, playerY + bob, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(playerX + 15, playerY + bob, 3, 0, Math.PI * 2);
      ctx.fill();

      // Grid overlay
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="absolute top-6 right-6 z-30 pointer-events-none">
      <div className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400 p-2 rounded-lg pointer-events-auto">
        <div className="text-xs font-mono text-cyan-300 mb-1 text-center">
          TOP-DOWN VIEW
        </div>
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="border border-cyan-500/50"
        />
        <div className="text-xs font-mono text-green-400 mt-1 text-center">
          ⚡ RUNNING
        </div>
      </div>
    </div>
  );
}
