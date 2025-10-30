'use client';

import { MainScene } from '@/components/MainScene';
import { MinimapOverlay } from '@/components/MinimapOverlay';
import { HUDOverlay } from '@/components/HUDOverlay';
import { BottomUIOverlay } from '@/components/BottomUIOverlay';
import { StartScreen } from '@/components/StartScreen';
import { useState, useEffect } from 'react';

export default function ExperiencePage() {
    const [started, setStarted] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#0f0f1e] via-[#1a1a2e] to-[#16213e]">
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

            {!started ? (
                <StartScreen onStart={() => setStarted(true)} />
            ) : (
                <>
                    {/* FULL SCREEN 3D SCENE */}
                    <div className="absolute inset-0 w-full h-full">
                        <MainScene />
                    </div>

                    {/* OVERLAYS - All positioned absolutely on top of 3D scene */}
                    <HUDOverlay />
                    <MinimapOverlay />
                    <BottomUIOverlay />

                    {/* Center status text overlay */}
                    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm border-2 border-white px-8 py-2 font-mono text-white text-lg tracking-wider pointer-events-none">
                        RUNNING ON PATH...
                    </div>
                </>
            )}
        </div>
    );
}
