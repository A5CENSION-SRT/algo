'use client';

import { DijkstraScene } from '@/components/DijkstraScene';
import { HUDOverlay } from '@/components/HUDOverlay';
import { DijkstraBuilderMenu } from '@/components/DijkstraBuilderMenu';
import { useState, useEffect } from 'react';

interface Node {
  id: string;
  position: [number, number, number];
  distance: number;
  visited: boolean;
  isTarget: boolean;
  isStart: boolean;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

export default function ExperiencePage() {
    const [isClient, setIsClient] = useState(false);
    const [nodes, setNodes] = useState<Node[]>([
        { id: 'Arlam', position: [-10, 0, 2], distance: 0, visited: false, isStart: true, isTarget: false },
        { id: 'Earlham', position: [-5, 0, -2], distance: Infinity, visited: false, isStart: false, isTarget: false },
        { id: 'Flanders', position: [0, 0, 0], distance: Infinity, visited: false, isStart: false, isTarget: false },
        { id: 'Costuul', position: [-3, 0, -7], distance: Infinity, visited: false, isStart: false, isTarget: false },
        { id: 'Priestella', position: [5, 0, -3], distance: Infinity, visited: false, isStart: false, isTarget: false },
        { id: 'Ganaks', position: [2, 0, -9], distance: Infinity, visited: false, isStart: false, isTarget: false },
        { id: 'Lugnica', position: [10, 0, -5], distance: Infinity, visited: false, isStart: false, isTarget: true },
    ]);
    const [edges, setEdges] = useState<Edge[]>([
        { from: 'Arlam', to: 'Earlham', weight: 4 },
        { from: 'Arlam', to: 'Costuul', weight: 8 },
        { from: 'Earlham', to: 'Flanders', weight: 3 },
        { from: 'Earlham', to: 'Costuul', weight: 5 },
        { from: 'Flanders', to: 'Priestella', weight: 2 },
        { from: 'Flanders', to: 'Ganaks', weight: 6 },
        { from: 'Costuul', to: 'Ganaks', weight: 2 },
        { from: 'Priestella', to: 'Lugnica', weight: 3 },
        { from: 'Ganaks', to: 'Lugnica', weight: 7 },
    ]);
    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);
    const [algorithmKey, setAlgorithmKey] = useState(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleReset = () => {
        setNodes([]);
        setEdges([]);
        setIsAlgorithmRunning(false);
        setAlgorithmKey(prev => prev + 1);
    };

    const handleRunAlgorithm = () => {
        setIsAlgorithmRunning(true);
        setAlgorithmKey(prev => prev + 1);
    };

    const handlePauseAlgorithm = () => {
        setIsAlgorithmRunning(false);
    };

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
                <DijkstraScene 
                    key={algorithmKey}
                    initialNodes={nodes}
                    initialEdges={edges}
                    isRunning={isAlgorithmRunning}
                />
            </div>

            {/* OVERLAYS - All positioned absolutely on top of 3D scene */}
            <HUDOverlay
                algorithmName="Dijkstra's Algorithm"
                currentStep={isAlgorithmRunning ? "Finding Shortest Path..." : "Paused"}
            />

            {/* Builder Menu */}
            <DijkstraBuilderMenu
                nodes={nodes}
                edges={edges}
                onNodesChange={setNodes}
                onEdgesChange={setEdges}
                onReset={handleReset}
                onRunAlgorithm={handleRunAlgorithm}
                onPauseAlgorithm={handlePauseAlgorithm}
                isRunning={isAlgorithmRunning}
            />

            {/* Center status text overlay */}
            {isAlgorithmRunning && (
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm border-2 border-white px-8 py-2 font-mono text-white text-lg tracking-wider pointer-events-none">
                    FINDING SHORTEST PATH...
                </div>
            )}
        </div>
    );
}
