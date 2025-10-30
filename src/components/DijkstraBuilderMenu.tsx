'use client';

import { useState } from 'react';

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

interface DijkstraBuilderMenuProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (nodes: Node[]) => void;
  onEdgesChange: (edges: Edge[]) => void;
  onReset: () => void;
  onRunAlgorithm: () => void;
  onPauseAlgorithm: () => void;
  isRunning: boolean;
}

export function DijkstraBuilderMenu({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onReset,
  onRunAlgorithm,
  onPauseAlgorithm,
  isRunning
}: DijkstraBuilderMenuProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'nodes' | 'edges'>('nodes');
  
  // Node form state
  const [nodeName, setNodeName] = useState('');
  const [nodeX, setNodeX] = useState('0');
  const [nodeZ, setNodeZ] = useState('0');
  const [nodeIsStart, setNodeIsStart] = useState(false);
  const [nodeIsTarget, setNodeIsTarget] = useState(false);
  
  // Edge form state
  const [edgeFrom, setEdgeFrom] = useState('');
  const [edgeTo, setEdgeTo] = useState('');
  const [edgeWeight, setEdgeWeight] = useState('1');

  const handleAddNode = () => {
    if (!nodeName.trim()) {
      alert('Please enter a village name');
      return;
    }
    
    if (nodes.find(n => n.id === nodeName)) {
      alert('Village with this name already exists');
      return;
    }

    const newNode: Node = {
      id: nodeName,
      position: [parseFloat(nodeX), 0, parseFloat(nodeZ)],
      distance: nodeIsStart ? 0 : Infinity,
      visited: false,
      isStart: nodeIsStart,
      isTarget: nodeIsTarget
    };

    onNodesChange([...nodes, newNode]);
    
    // Reset form
    setNodeName('');
    setNodeX('0');
    setNodeZ('0');
    setNodeIsStart(false);
    setNodeIsTarget(false);
  };

  const handleRemoveNode = (nodeId: string) => {
    onNodesChange(nodes.filter(n => n.id !== nodeId));
    onEdgesChange(edges.filter(e => e.from !== nodeId && e.to !== nodeId));
  };

  const handleAddEdge = () => {
    if (!edgeFrom || !edgeTo) {
      alert('Please select both villages');
      return;
    }

    if (edgeFrom === edgeTo) {
      alert('Cannot connect a village to itself');
      return;
    }

    if (edges.find(e => e.from === edgeFrom && e.to === edgeTo)) {
      alert('This connection already exists');
      return;
    }

    const newEdge: Edge = {
      from: edgeFrom,
      to: edgeTo,
      weight: parseInt(edgeWeight)
    };

    onEdgesChange([...edges, newEdge]);
    
    // Reset form
    setEdgeFrom('');
    setEdgeTo('');
    setEdgeWeight('1');
  };

  const handleRemoveEdge = (from: string, to: string) => {
    onEdgesChange(edges.filter(e => !(e.from === from && e.to === to)));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/70 backdrop-blur-sm border-2 border-cyan-400 px-3 py-6 font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
      >
        <span className="writing-mode-vertical">OPEN BUILDER</span>
      </button>
    );
  }

  return (
    <div className="absolute left-6 top-6 bottom-6 z-20 w-96 bg-black/80 backdrop-blur-md border-2 border-cyan-400 overflow-hidden flex flex-col"
         style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}>
      
      {/* Header */}
      <div className="bg-cyan-900/50 border-b-2 border-cyan-400 px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-mono font-bold text-cyan-300">
          DIJKSTRA BUILDER
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-cyan-300 hover:text-white font-mono text-lg"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-cyan-400/50">
        <button
          onClick={() => setActiveTab('nodes')}
          className={`flex-1 py-2 px-4 font-mono text-sm transition-colors ${
            activeTab === 'nodes'
              ? 'bg-cyan-500/30 text-cyan-300 border-b-2 border-cyan-300'
              : 'text-gray-400 hover:text-cyan-300'
          }`}
        >
          VILLAGES ({nodes.length})
        </button>
        <button
          onClick={() => setActiveTab('edges')}
          className={`flex-1 py-2 px-4 font-mono text-sm transition-colors ${
            activeTab === 'edges'
              ? 'bg-cyan-500/30 text-cyan-300 border-b-2 border-cyan-300'
              : 'text-gray-400 hover:text-cyan-300'
          }`}
        >
          ROADS ({edges.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'nodes' ? (
          <>
            {/* Add Node Form */}
            <div className="bg-cyan-900/20 border border-cyan-400/50 p-3 space-y-3">
              <h3 className="text-cyan-300 font-mono text-sm font-bold">ADD NEW VILLAGE</h3>
              
              <div>
                <label className="text-xs text-gray-400 font-mono">Village Name</label>
                <input
                  type="text"
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                  className="w-full bg-black/50 border border-cyan-400/50 px-2 py-1 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                  placeholder="e.g., Arlam"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 font-mono">Position X</label>
                  <input
                    type="number"
                    value={nodeX}
                    onChange={(e) => setNodeX(e.target.value)}
                    className="w-full bg-black/50 border border-cyan-400/50 px-2 py-1 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-mono">Position Z</label>
                  <input
                    type="number"
                    value={nodeZ}
                    onChange={(e) => setNodeZ(e.target.value)}
                    className="w-full bg-black/50 border border-cyan-400/50 px-2 py-1 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="flex items-center space-x-2 text-sm text-white font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nodeIsStart}
                    onChange={(e) => setNodeIsStart(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>🏁 Set as Start Village</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-white font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nodeIsTarget}
                    onChange={(e) => setNodeIsTarget(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>🎯 Set as Target Village</span>
                </label>
              </div>

              <button
                onClick={handleAddNode}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-sm py-2 transition-all"
              >
                + ADD VILLAGE
              </button>
            </div>

            {/* Node List */}
            <div className="space-y-2">
              <h3 className="text-cyan-300 font-mono text-sm font-bold">EXISTING VILLAGES</h3>
              {nodes.length === 0 ? (
                <p className="text-gray-500 font-mono text-xs">No villages added yet</p>
              ) : (
                nodes.map((node) => (
                  <div
                    key={node.id}
                    className="bg-black/50 border border-cyan-400/50 p-2 flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <div className="text-white font-mono text-sm font-bold">
                        {node.id}
                        {node.isStart && <span className="ml-2 text-green-400">🏁</span>}
                        {node.isTarget && <span className="ml-2 text-red-400">🎯</span>}
                      </div>
                      <div className="text-gray-400 font-mono text-xs">
                        Position: ({node.position[0].toFixed(1)}, {node.position[2].toFixed(1)})
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveNode(node.id)}
                      className="text-red-400 hover:text-red-300 text-sm ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            {/* Add Edge Form */}
            <div className="bg-purple-900/20 border border-purple-400/50 p-3 space-y-3">
              <h3 className="text-purple-300 font-mono text-sm font-bold">ADD NEW ROAD</h3>
              
              <div>
                <label className="text-xs text-gray-400 font-mono">From Village</label>
                <select
                  value={edgeFrom}
                  onChange={(e) => setEdgeFrom(e.target.value)}
                  className="w-full bg-black/50 border border-purple-400/50 px-2 py-1 text-white font-mono text-sm focus:outline-none focus:border-purple-400"
                >
                  <option value="">Select...</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>{node.id}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-mono">To Village</label>
                <select
                  value={edgeTo}
                  onChange={(e) => setEdgeTo(e.target.value)}
                  className="w-full bg-black/50 border border-purple-400/50 px-2 py-1 text-white font-mono text-sm focus:outline-none focus:border-purple-400"
                >
                  <option value="">Select...</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>{node.id}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-mono">Distance (km)</label>
                <input
                  type="number"
                  min="1"
                  value={edgeWeight}
                  onChange={(e) => setEdgeWeight(e.target.value)}
                  className="w-full bg-black/50 border border-purple-400/50 px-2 py-1 text-white font-mono text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <button
                onClick={handleAddEdge}
                disabled={nodes.length < 2}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono text-sm py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + ADD ROAD
              </button>
            </div>

            {/* Edge List */}
            <div className="space-y-2">
              <h3 className="text-purple-300 font-mono text-sm font-bold">EXISTING ROADS</h3>
              {edges.length === 0 ? (
                <p className="text-gray-500 font-mono text-xs">No roads added yet</p>
              ) : (
                edges.map((edge, idx) => (
                  <div
                    key={idx}
                    className="bg-black/50 border border-purple-400/50 p-2 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <div className="text-white font-mono text-sm">
                        {edge.from} → {edge.to}
                      </div>
                      <div className="text-gray-400 font-mono text-xs">
                        Distance: {edge.weight} km
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveEdge(edge.from, edge.to)}
                      className="text-red-400 hover:text-red-300 text-sm ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer with Action Buttons */}
      <div className="border-t-2 border-cyan-400 p-4 space-y-2 bg-black/50">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onRunAlgorithm}
            disabled={isRunning || nodes.length === 0}
            className="bg-green-600 hover:bg-green-500 text-white font-mono text-sm py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ▶ RUN
          </button>
          <button
            onClick={onPauseAlgorithm}
            disabled={!isRunning}
            className="bg-yellow-600 hover:bg-yellow-500 text-white font-mono text-sm py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⏸ PAUSE
          </button>
        </div>
        <button
          onClick={onReset}
          className="w-full bg-red-600 hover:bg-red-500 text-white font-mono text-sm py-2 transition-all"
        >
          🔄 RESET ALL
        </button>
      </div>
    </div>
  );
}
