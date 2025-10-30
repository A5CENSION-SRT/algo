'use client';

import { MainScene } from '@/components/MainScene';
import { DijkstraScene } from '@/components/DijkstraScene';
import { MinimapOverlay } from '@/components/MinimapOverlay';
import { HUDOverlay } from '@/components/HUDOverlay';
import { BottomUIOverlay } from '@/components/BottomUIOverlay';
import { useState, useEffect } from 'react';

export default function ExperiencePage() {
    const [isClient, setIsClient] = useState(false);
    const [mode, setMode] = useState<'infinite' | 'dijkstra'>('dijkstra');

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-linear-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#16213e]">
            {/* Pixel grid background effect */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
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

            {/* FULL SCREEN 3D SCENE */}
            <div className="absolute inset-0 w-full h-full">
                {mode === 'infinite' ? <MainScene /> : <DijkstraScene />}
            </div>

            {/* OVERLAYS - All positioned absolutely on top of 3D scene */}
            <HUDOverlay 
                algorithmName={mode === 'dijkstra' ? "Dijkstra's Algorithm" : "Loop Iteration ∞"}
                currentStep={mode === 'dijkstra' ? "Finding Shortest Path..." : "Running..."}
            />
            {mode === 'infinite' && <MinimapOverlay />}
            {mode === 'infinite' && <BottomUIOverlay />}

            {/* Mode Toggle */}
            <div className="absolute top-32 left-6 z-20">
                <div 
                    className="bg-black/50 backdrop-blur-sm border-2 border-yellow-400 px-4 py-2"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}
                >
                    <button
                        onClick={() => setMode(mode === 'infinite' ? 'dijkstra' : 'infinite')}
                        className="font-mono text-yellow-300 hover:text-yellow-100 transition-colors"
                    >
                        {mode === 'infinite' ? '🎯 Switch to Dijkstra' : '🏃 Switch to Infinite Run'}
                    </button>
                </div>
            </div>

            {/* Center status text overlay */}
            {mode === 'dijkstra' && (
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm border-2 border-white px-8 py-2 font-mono text-white text-lg tracking-wider pointer-events-none">
                    FINDING SHORTEST PATH...
                </div>
            )}

            {mode === 'infinite' && (
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm border-2 border-white px-8 py-2 font-mono text-white text-lg tracking-wider pointer-events-none">
                    RUNNING ON PATH...
                </div>
            )}
        </div>
    );
}
