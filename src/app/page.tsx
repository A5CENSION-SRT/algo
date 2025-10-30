'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Dither from '@/components/Dither';
import { MiniMapView } from '@/components/MiniMapView';
import BlurText from '@/components/BlurText';
import CountUp from '@/components/CountUp';
import SplitText from '@/components/SplitText';

export default function Home() {
  const router = useRouter();
  const [transitions] = useState([
    { source: 'Mansion', target: 'Village' },
    { source: 'Village', target: 'Forest' },
    { source: 'Forest', target: 'Capital' },
    { source: 'Capital', target: 'Sanctuary' },
    { source: 'Village', target: 'LootHouse' },
    { source: 'LootHouse', target: 'WitchCult' },
  ]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dither background with purple color */}
      <div className="absolute inset-0 z-0">
        <Dither
          waveSpeed={0.08}
          waveFrequency={2.5}
          waveAmplitude={0.4}
          waveColor={[0.6, 0.3, 0.9]} // Purple color (RGB values 0-1)
          colorNum={6}
          pixelSize={3}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={1.2}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header/Navbar */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div
              className="bg-black/40 backdrop-blur-md border-2 border-red-400 px-6 py-3"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
              }}
            >
              <h1 className="text-2xl font-mono font-bold text-red-300 tracking-wider">
                <SplitText
                  text="RE:ZERO PATHFINDER"
                  className="text-2xl font-mono font-bold text-red-300 tracking-wider"
                  delay={0.5}
                  duration={1}
                  ease="power2.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 20 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h1>
            </div>

            <nav className="flex gap-4">
              <a
                href="/experience"
                className="bg-black/40 backdrop-blur-md border-2 border-red-400 px-5 py-2 font-mono text-red-300 hover:bg-red-500/20 transition-colors"
                style={{
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                }}
              >
                🔄 Return by Death
              </a>
              <a
                href="#about"
                className="bg-black/40 backdrop-blur-md border-2 border-purple-400 px-5 py-2 font-mono text-purple-300 hover:bg-purple-500/20 transition-colors"
                style={{
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                }}
              >
                About
              </a>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Hero content */}
            <div className="space-y-6">
              <div
                className="bg-black/40 backdrop-blur-md border-2 border-red-400 p-8"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                }}
              >
                <h2 className="text-5xl md:text-6xl font-mono font-bold text-white mb-4 leading-tight">
                  <SplitText
                    text="Return"
                    className="text-5xl md:text-6xl font-mono font-bold text-red-300 leading-tight"
                    delay={1}
                    duration={1.2}
                    ease="power2.out"
                    splitType="chars"
                    from={{ opacity: 0, x: -50 }}
                    to={{ opacity: 1, x: 0 }}
                  />
                  <br />
                  <span className="text-white">by </span>
                  <span>
                    <SplitText
                      text="Death"
                      className="text-5xl md:text-6xl font-mono font-bold text-red-400 leading-tight"
                      delay={1.5}
                      duration={1.2}
                      ease="power2.out"
                      splitType="chars"
                      from={{ opacity: 0, x: 50 }}
                      to={{ opacity: 1, x: 0 }}
                    />
                  </span>
                </h2>
                <BlurText
                  text="Experience Subaru's cursed ability through Dijkstra's Algorithm. Navigate branching timelines, find optimal paths, and witness dramatic deaths as shorter routes emerge."
                  className="text-lg text-gray-300 font-mono leading-relaxed"
                  delay={2}
                  animateBy="words"
                  direction="top"
                  threshold={0.1}
                  animationFrom={{ opacity: 0, filter: 'blur(10px)' }}
                  animationTo={[{ opacity: 1, filter: 'blur(0px)' }]}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => router.push('/experience')}
                  className="group relative px-8 py-4 text-lg font-bold font-mono tracking-wider bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white transition-all duration-300 transform hover:scale-105 border-2 border-white/50 shadow-lg active:scale-95"
                  style={{
                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  }}
                >
                  🔄 Start Journey
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>

                <button
                  onClick={() => router.push('/experience')}
                  className="px-8 py-4 text-lg font-mono bg-black/40 backdrop-blur-md border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20 transition-all duration-300"
                  style={{
                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  }}
                >
                  Watch Demo
                </button>
              </div>

              {/* Feature badges */}
              <div className="flex gap-3 flex-wrap">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-red-400/50 font-mono text-xs text-red-300">
                  [DIJKSTRA'S ALGORITHM]
                </div>
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-purple-400/50 font-mono text-xs text-purple-300">
                  [MULTIPLE TIMELINES]
                </div>
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-pink-400/50 font-mono text-xs text-pink-300">
                  [VOXEL 3D]
                </div>
              </div>
            </div>

            {/* Right side - MiniMapView showcase */}
            <div className="space-y-4">
              <div
                className="bg-black/60 backdrop-blur-md border-2 border-purple-400 p-3"
                style={{
                  clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                }}
              >
                <p className="font-mono text-purple-300 text-xs mb-2 text-center">
                  TIMELINE GRAPH
                </p>
                <MiniMapView
                  transitions={transitions}
                  startNode="Mansion"
                  goalNode="WitchCult"
                />
              </div>

              <div
                className="bg-black/40 backdrop-blur-md border-2 border-yellow-400 p-4"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)',
                }}
              >
                <p className="font-mono text-yellow-300 text-sm">
                  <span className="text-red-400">💀</span> Each edge represents deaths required. 
                  Characters spawn, explore paths, and die dramatically when shorter routes are discovered.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div
                  className="bg-black/40 backdrop-blur-md border border-red-400 p-3 text-center"
                  style={{
                    clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
                  }}
                >
                  <div className="text-2xl font-mono font-bold text-red-400">
                    <CountUp
                      to={7}
                      duration={2}
                      delay={2.5}
                      separator=""
                      className="text-2xl font-mono font-bold text-red-400"
                    />
                  </div>
                  <div className="text-xs font-mono text-red-300/70">Villages</div>
                </div>
                <div
                  className="bg-black/40 backdrop-blur-md border border-purple-400 p-3 text-center"
                  style={{
                    clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
                  }}
                >
                  <div className="text-2xl font-mono font-bold text-purple-400">
                    <SplitText
                      text="∞"
                      className="text-2xl font-mono font-bold text-purple-400"
                      delay={3}
                      duration={1}
                      ease="power2.out"
                      splitType="chars"
                      from={{ opacity: 0, scale: 0.5 }}
                      to={{ opacity: 1, scale: 1 }}
                    />
                  </div>
                  <div className="text-xs font-mono text-purple-300/70">Deaths</div>
                </div>
                <div
                  className="bg-black/40 backdrop-blur-md border border-green-400 p-3 text-center"
                  style={{
                    clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
                  }}
                >
                  <div className="text-2xl font-mono font-bold text-green-400">
                    <SplitText
                      text="1"
                      className="text-2xl font-mono font-bold text-green-400"
                      delay={3.5}
                      duration={1}
                      ease="power2.out"
                      splitType="chars"
                      from={{ opacity: 0, rotate: -180 }}
                      to={{ opacity: 1, rotate: 0 }}
                    />
                  </div>
                  <div className="text-xs font-mono text-green-300/70">Optimal Path</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Ambient glow effects - Re:Zero red/purple theme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Background music */}
      <audio
        autoPlay
        loop
        muted
        className="hidden"
      >
        <source src="/Sounds/Animation Musicals Network.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
