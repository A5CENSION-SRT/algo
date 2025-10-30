'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Dither from '@/components/Dither';
import { MiniMapView } from '@/components/MiniMapView';

export default function LandingPage() {
    const router = useRouter();
    const [transitions] = useState([
        { source: 'Start', target: 'Explore' },
        { source: 'Explore', target: 'Learn' },
        { source: 'Learn', target: 'Master' },
        { source: 'Start', target: 'Master' },
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
                            className="bg-black/40 backdrop-blur-md border-2 border-cyan-400 px-6 py-3"
                            style={{
                                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
                            }}
                        >
                            <h1 className="text-2xl font-mono font-bold text-cyan-300 tracking-wider">
                                ALGOVIBE
                            </h1>
                        </div>

                        <nav className="flex gap-4">
                            <a
                                href="/"
                                className="bg-black/40 backdrop-blur-md border-2 border-purple-400 px-5 py-2 font-mono text-purple-300 hover:bg-purple-500/20 transition-colors"
                                style={{
                                    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                                }}
                            >
                                Experience
                            </a>
                            <a
                                href="#learn"
                                className="bg-black/40 backdrop-blur-md border-2 border-pink-400 px-5 py-2 font-mono text-pink-300 hover:bg-pink-500/20 transition-colors"
                                style={{
                                    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                                }}
                            >
                                Learn
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
                                className="bg-black/40 backdrop-blur-md border-2 border-cyan-400 p-8"
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                                }}
                            >
                                <h2 className="text-5xl md:text-6xl font-mono font-bold text-white mb-4 leading-tight">
                                    Visualize
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                        Algorithms
                                    </span>
                                </h2>
                                <p className="text-lg text-gray-300 font-mono leading-relaxed">
                                    Transform complex DSA problems into stunning 3D interactive experiences.
                                    Learn by seeing, explore by doing.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => router.push('/')}
                                    className="group relative px-8 py-4 text-lg font-bold font-mono tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all duration-300 transform hover:scale-105 border-2 border-white/50 shadow-lg active:scale-95"
                                    style={{
                                        clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                                    }}
                                >
                                    Get Started
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                                </button>

                                <button
                                    onClick={() => router.push('/')}
                                    className="px-8 py-4 text-lg font-mono bg-black/40 backdrop-blur-md border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-500/20 transition-all duration-300"
                                    style={{
                                        clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                                    }}
                                >
                                    Explore
                                </button>
                            </div>

                            {/* Feature badges */}
                            <div className="flex gap-3 flex-wrap">
                                <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-cyan-400/50 font-mono text-xs text-cyan-300">
                                    [3D VISUALIZATION]
                                </div>
                                <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-purple-400/50 font-mono text-xs text-purple-300">
                                    [INTERACTIVE]
                                </div>
                                <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-pink-400/50 font-mono text-xs text-pink-300">
                                    [REAL-TIME]
                                </div>
                            </div>
                        </div>

                        {/* Right side - MiniMapView showcase */}
                        <div className="space-y-4">
                            <MiniMapView
                                transitions={transitions}
                                startNode="Start"
                                goalNode="Master"
                            />

                            <div
                                className="bg-black/40 backdrop-blur-md border-2 border-yellow-400 p-4"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)',
                                }}
                            >
                                <p className="font-mono text-yellow-300 text-sm">
                                    <span className="text-yellow-400">▶</span> Graph visualization updates in real-time as you define nodes and edges.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                <div
                                    className="bg-black/40 backdrop-blur-md border border-cyan-400 p-3 text-center"
                                    style={{
                                        clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
                                    }}
                                >
                                    <div className="text-2xl font-mono font-bold text-cyan-400">50+</div>
                                    <div className="text-xs font-mono text-cyan-300/70">Algorithms</div>
                                </div>
                                <div
                                    className="bg-black/40 backdrop-blur-md border border-purple-400 p-3 text-center"
                                    style={{
                                        clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
                                    }}
                                >
                                    <div className="text-2xl font-mono font-bold text-purple-400">3D</div>
                                    <div className="text-xs font-mono text-purple-300/70">Visualizations</div>
                                </div>
                                <div
                                    className="bg-black/40 backdrop-blur-md border border-pink-400 p-3 text-center"
                                    style={{
                                        clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
                                    }}
                                >
                                    <div className="text-2xl font-mono font-bold text-pink-400">∞</div>
                                    <div className="text-xs font-mono text-pink-300/70">Possibilities</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <div
                            className="bg-black/40 backdrop-blur-md border-2 border-purple-400/50 px-6 py-4 text-center"
                            style={{
                                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))',
                            }}
                        >
                            <p className="font-mono text-purple-300 text-sm">
                                Built for hackathons • Powered by Next.js + Three.js • Made with ❤️
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Ambient glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
        </div>
    );
}
