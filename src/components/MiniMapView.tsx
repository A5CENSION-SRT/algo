'use client';

import React, { useMemo } from 'react';

interface TransitionInput {
    source: string;
    target: string;
}

interface MiniMapViewProps {
    transitions: TransitionInput[];
    startNode: string;
    goalNode: string;
}

export const MiniMapView: React.FC<MiniMapViewProps> = ({
    transitions,
    startNode,
    goalNode,
}) => {
    // Extract all unique nodes from transitions, startNode, and goalNode
    const nodes = useMemo(() => {
        const nodeSet = new Set<string>();

        transitions.forEach(({ source, target }) => {
            nodeSet.add(source);
            nodeSet.add(target);
        });

        if (startNode) nodeSet.add(startNode);
        if (goalNode) nodeSet.add(goalNode);

        return Array.from(nodeSet);
    }, [transitions, startNode, goalNode]);

    // Calculate circular layout positions
    const nodePositions = useMemo(() => {
        if (nodes.length === 0) return {};

        const centerX = 125;
        const centerY = 90;
        const radius = 60;

        const positions: Record<string, { x: number; y: number }> = {};

        nodes.forEach((node, index) => {
            const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2;
            positions[node] = {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
            };
        });

        return positions;
    }, [nodes]);

    // If no nodes, show placeholder
    if (nodes.length === 0) {
        return (
            <div
                className="bg-black/50 backdrop-blur-sm border-2 border-cyan-400 p-4 flex items-center justify-center"
                style={{
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                    height: '200px',
                }}
            >
                <p className="font-mono text-cyan-300 text-sm tracking-wide text-center">
                    Define states to see the timeline
                </p>
            </div>
        );
    }

    return (
        <div
            className="bg-black/50 backdrop-blur-sm border-2 border-cyan-400 p-3"
            style={{
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
        >
            <div className="mb-2 border-b border-cyan-400/30 pb-2">
                <h3 className="font-mono text-cyan-300 text-xs tracking-wider uppercase">
                    Graph Timeline
                </h3>
            </div>

            <svg
                viewBox="0 0 250 180"
                className="w-full h-auto"
                style={{ maxHeight: '180px' }}
            >
                {/* Render edges (connections) */}
                {transitions.map(({ source, target }, index) => {
                    const sourcePos = nodePositions[source];
                    const targetPos = nodePositions[target];

                    if (!sourcePos || !targetPos) return null;

                    return (
                        <line
                            key={`edge-${index}-${source}-${target}`}
                            x1={sourcePos.x}
                            y1={sourcePos.y}
                            x2={targetPos.x}
                            y2={targetPos.y}
                            stroke="rgba(168, 85, 247, 0.4)"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Render nodes */}
                {nodes.map((node) => {
                    const pos = nodePositions[node];
                    if (!pos) return null;

                    // Determine styling based on node role
                    const isStart = node === startNode;
                    const isGoal = node === goalNode;

                    let fillColor = 'rgb(168, 85, 247)'; // purple (default)
                    let strokeColor = 'rgb(168, 85, 247)';

                    if (isStart) {
                        fillColor = 'white';
                        strokeColor = 'rgb(34, 211, 238)'; // cyan
                    } else if (isGoal) {
                        fillColor = 'rgb(250, 204, 21)'; // yellow
                        strokeColor = 'rgb(250, 204, 21)';
                    }

                    return (
                        <g key={`node-${node}`}>
                            {/* Node circle */}
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r="16"
                                fill={fillColor}
                                stroke={strokeColor}
                                strokeWidth="2"
                                opacity="0.9"
                            />

                            {/* Node label (first 3 characters, truncated) */}
                            <text
                                x={pos.x}
                                y={pos.y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill="white"
                                fontWeight="bold"
                                fontSize="11"
                                fontFamily="monospace"
                                stroke="black"
                                strokeWidth="3"
                                paintOrder="stroke"
                            >
                                {node.slice(0, 3)}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Legend */}
            <div className="mt-2 pt-2 border-t border-cyan-400/30 flex gap-3 justify-center flex-wrap text-xs font-mono">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-white border border-cyan-400" />
                    <span className="text-cyan-300">Start</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-400" />
                    <span className="text-yellow-300">Goal</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500 border border-purple-500" />
                    <span className="text-purple-300">State</span>
                </div>
            </div>
        </div>
    );
};
