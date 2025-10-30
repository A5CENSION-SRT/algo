'use client';

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-8" style={{ animation: 'fadeIn 1s ease-out' }}>
        <h1 
          className="text-7xl md:text-9xl font-bold tracking-wider mb-4"
          style={{
            fontFamily: 'monospace',
            textShadow: '3px 3px 0px rgba(0, 255, 255, 0.5), 6px 6px 0px rgba(255, 0, 255, 0.3), -2px -2px 0px rgba(255, 255, 0, 0.2)',
            color: '#fff',
          }}
        >
          Re:ZERO
        </h1>
        
        <div className="space-y-4">
          <p className="text-2xl md:text-3xl text-cyan-300 font-mono tracking-wide">
            Starting Life in Another World
          </p>
          
          <p className="text-lg md:text-xl text-purple-300 font-mono animate-pulse">
            Press START to begin your adventure
          </p>
        </div>

        <button
          onClick={onStart}
          className="group relative mt-12 px-16 py-6 text-2xl font-bold font-mono tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all duration-300 transform hover:scale-110 hover:rotate-1 border-4 border-white shadow-2xl active:scale-95"
          style={{
            clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
          }}
        >
          <span className="relative z-10 drop-shadow-lg">START</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
        </button>

        <div className="flex justify-center gap-4 mt-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-cyan-400 animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
