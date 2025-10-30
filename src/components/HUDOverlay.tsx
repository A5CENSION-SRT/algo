'use client';

export function HUDOverlay() {
  return (
    <>
      {/* Top Left HUD */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <div 
          className="bg-black/50 backdrop-blur-sm border-2 border-cyan-400 px-6 py-3 pointer-events-auto"
          style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)' }}
        >
          <h2 className="text-2xl font-mono font-bold text-cyan-300 tracking-wider">
            ALGO VISUALIZER
          </h2>
          <p className="text-sm text-purple-300 font-mono mt-1">
            Running Algorithm: Loop Iteration ∞
          </p>
        </div>
      </div>

      {/* Top Right Speed Indicator (below minimap area) */}
      <div className="absolute top-[280px] right-6 z-20 pointer-events-none">
        <div 
          className="bg-black/50 backdrop-blur-sm border-2 border-pink-400 px-6 py-3 pointer-events-auto"
          style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)' }}
        >
          <p className="text-lg font-mono text-pink-300 tracking-wider">
            Speed: ⚡⚡⚡⚡⚡
          </p>
        </div>
      </div>
    </>
  );
}
