'use client';

import { Scene3D } from '@/components/Scene3D';
import { Minimap } from '@/components/Minimap';
import { useState, useEffect } from 'react';

export default function ExperiencePage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#16213e] overflow-hidden">
            {/* Pixel grid background effect */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* HUD Header */}
                <div className="p-6 flex justify-between items-start flex-wrap gap-4">
                    <div
                        className="bg-black/50 backdrop-blur-sm border-2 border-cyan-400 px-6 py-3"
                        style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)' }}
                    >
                        <h2 className="text-2xl font-mono font-bold text-cyan-300 tracking-wider">
                            ALGO VISUALIZER
                        </h2>
                        <p className="text-sm text-purple-300 font-mono mt-1">
                            Running Algorithm: Loop Iteration ∞
                        </p>
                    </div>

                    {/* Minimap in top right */}
                    <div className="absolute top-6 right-6 z-20">
                        <Minimap />
                    </div>

                    <div
                        className="bg-black/50 backdrop-blur-sm border-2 border-pink-400 px-6 py-3"
                        style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)' }}
                    >
                        <p className="text-lg font-mono text-pink-300 tracking-wider">
                            Speed: ⚡⚡⚡⚡⚡
                        </p>
                    </div>
                </div>

                {/* 3D Character Scene - LARGER */}
                <div className="flex-1 relative min-h-[70vh]">
                    <Scene3D />

                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm border-2 border-white px-8 py-2 font-mono text-white text-lg tracking-wider">
                        RUNNING ON PATH...
                    </div>
                </div>

                <div className="p-6">
                    <div
                        className="bg-black/60 backdrop-blur-sm border-2 border-green-400 p-4 max-w-4xl mx-auto"
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
                            <div className="px-4 py-2 bg-blue-600/50 border border-blue-400 font-mono text-sm">
                                [ARRAY TRAVERSAL]
                            </div>
                            <div className="px-4 py-2 bg-purple-600/50 border border-purple-400 font-mono text-sm">
                                [GRAPH SEARCH]
                            </div>
                            <div className="px-4 py-2 bg-red-600/50 border border-red-400 font-mono text-sm">
                                [PATH FINDING]
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
