'use client';

export function BottomUIOverlay() {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6 z-20 pointer-events-none">
      <div 
        className="bg-black/60 backdrop-blur-sm border-2 border-green-400 p-4 pointer-events-auto"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}
      >
        <p className="font-mono text-green-300 text-lg leading-relaxed mb-2">
          <span className="text-yellow-300">▶</span> Algorithm Visualization Mode Active!
        </p>
        <p className="font-mono text-cyan-300 text-sm leading-relaxed">
          Subaru is running on an infinite road - simulating continuous iteration through data structures. 
          The scrolling road represents traversing through arrays, linked lists, or graph paths.
        </p>
        <div className="flex gap-4 mt-3 justify-center flex-wrap">
          <div className="px-4 py-2 bg-blue-600/50 border border-blue-400 font-mono text-sm cursor-pointer hover:bg-blue-600/70 transition-colors">
            [ARRAY TRAVERSAL]
          </div>
          <div className="px-4 py-2 bg-purple-600/50 border border-purple-400 font-mono text-sm cursor-pointer hover:bg-purple-600/70 transition-colors">
            [GRAPH SEARCH]
          </div>
          <div className="px-4 py-2 bg-red-600/50 border border-red-400 font-mono text-sm cursor-pointer hover:bg-red-600/70 transition-colors">
            [PATH FINDING]
          </div>
        </div>
      </div>
    </div>
  );
}
