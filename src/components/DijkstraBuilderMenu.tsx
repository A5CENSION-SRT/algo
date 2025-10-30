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
  const [activeTab, setActiveTab] = useState<'nodes' | 'edges' | 'control'>('nodes');
  
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

  const hasStartNode = nodes.some(n => n.isStart);
  const hasTargetNode = nodes.some(n => n.isTarget);
  const canRunAlgorithm = nodes.length > 0 && hasStartNode && hasTargetNode && edges.length > 0;

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
    <div className="absolute left-6 top-6 bottom-6 z-20 w-96 bg-[#0a1929]/95 backdrop-blur-lg border-2 border-cyan-400 overflow-hidden flex flex-col shadow-2xl"
         style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-900/40 to-teal-900/40 border-b border-cyan-400/50 px-5 py-4 flex justify-between items-center">
        <h2 className="text-xl font-sans font-bold text-cyan-300 tracking-wider">
          DIJKSTRA BUILDER
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-cyan-300 hover:text-white transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-cyan-400/30 bg-black/20">
        <button
          onClick={() => setActiveTab('nodes')}
          className={`flex-1 py-3 px-4 font-mono text-sm transition-all ${
            activeTab === 'nodes'
              ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
              : 'text-gray-500 hover:text-cyan-300 hover:bg-cyan-900/10'
          }`}
        >
          VILLAGES ({nodes.length})
        </button>
        <button
          onClick={() => setActiveTab('edges')}
          className={`flex-1 py-3 px-4 font-mono text-sm transition-all ${
            activeTab === 'edges'
              ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
              : 'text-gray-500 hover:text-cyan-300 hover:bg-cyan-900/10'
          }`}
        >
          ROADS ({edges.length})
        </button>
      </div>

      {/* Content Area - Hidden Scrollbar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {activeTab === 'nodes' ? (
          <>
            {/* Add Node Form */}
            <div className="bg-black/30 border border-cyan-400/30 p-4 space-y-3">
              
              <div>
                <input
                  type="text"
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                  className="w-full bg-black/60 border border-cyan-400/40 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Village name..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNode()}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={nodeX}
                  onChange={(e) => setNodeX(e.target.value)}
                  className="w-full bg-black/60 border border-cyan-400/40 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="X"
                />
                <input
                  type="number"
                  value={nodeZ}
                  onChange={(e) => setNodeZ(e.target.value)}
                  className="w-full bg-black/60 border border-cyan-400/40 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Z"
                />
              </div>

              <div className="flex gap-2">
                <label className="flex items-center space-x-2 text-xs text-gray-400 font-mono cursor-pointer hover:text-cyan-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={nodeIsStart}
                    onChange={(e) => setNodeIsStart(e.target.checked)}
                    disabled={hasStartNode && !nodeIsStart}
                    className="w-3.5 h-3.5"
                  />
                  <span>🏁 Set as Start Village</span>
                </label>
                <label className="flex items-center space-x-2 text-xs text-gray-400 font-mono cursor-pointer hover:text-cyan-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={nodeIsTarget}
                    onChange={(e) => setNodeIsTarget(e.target.checked)}
                    disabled={hasTargetNode && !nodeIsTarget}
                    className="w-3.5 h-3.5"
                  />
                  <span>🎯 Set as Target Village</span>
                </label>
              </div>

              <button
                onClick={handleAddNode}
                disabled={!nodeName.trim()}
                className="w-full bg-cyan-600/80 hover:bg-cyan-500 text-white font-mono text-sm py-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                + ADD VILLAGE
              </button>
            </div>

            {/* Node List */}
            <div className="space-y-2">
              <h3 className="text-cyan-300/80 font-mono text-xs font-bold uppercase tracking-wider">EXISTING VILLAGES</h3>
              {nodes.length === 0 ? (
                <p className="text-gray-600 font-mono text-xs text-center py-4">No villages added yet</p>
              ) : (
                nodes.map((node) => (
                  <div
                    key={node.id}
                    className="bg-black/40 border border-cyan-400/30 p-3 flex justify-between items-center hover:border-cyan-400/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="text-white font-mono text-sm font-medium flex items-center gap-2">
                        {node.id}
                        {node.isStart && <span className="text-xs">🏁</span>}
                        {node.isTarget && <span className="text-xs">🎯</span>}
                      </div>
                      <div className="text-gray-500 font-mono text-xs mt-0.5">
                        Position: ({node.position[0].toFixed(1)}, {node.position[2].toFixed(1)})
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveNode(node.id)}
                      className="text-red-500/70 hover:text-red-400 text-lg ml-2 transition-colors"
                      aria-label="Delete"
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
            <div className="bg-black/30 border border-cyan-400/30 p-4 space-y-3">
              
              <select
                value={edgeFrom}
                onChange={(e) => setEdgeFrom(e.target.value)}
                disabled={nodes.length < 2}
                className="w-full bg-black/60 border border-cyan-400/40 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
              >
                <option value="">From...</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>{node.id}</option>
                ))}
              </select>

              <select
                value={edgeTo}
                onChange={(e) => setEdgeTo(e.target.value)}
                disabled={nodes.length < 2}
                className="w-full bg-black/60 border border-cyan-400/40 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
              >
                <option value="">To...</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>{node.id}</option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={edgeWeight}
                onChange={(e) => setEdgeWeight(e.target.value)}
                disabled={nodes.length < 2}
                className="w-full bg-black/60 border border-cyan-400/40 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                placeholder="Distance (km)..."
              />

              <button
                onClick={handleAddEdge}
                disabled={nodes.length < 2 || !edgeFrom || !edgeTo}
                className="w-full bg-cyan-600/80 hover:bg-cyan-500 text-white font-mono text-sm py-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                + ADD ROAD
              </button>
            </div>

            {/* Edge List */}
            <div className="space-y-2">
              <h3 className="text-cyan-300/80 font-mono text-xs font-bold uppercase tracking-wider">EXISTING ROADS</h3>
              {edges.length === 0 ? (
                <p className="text-gray-600 font-mono text-xs text-center py-4">No roads added yet</p>
              ) : (
                edges.map((edge, idx) => (
                  <div
                    key={idx}
                    className="bg-black/40 border border-cyan-400/30 p-3 flex justify-between items-center hover:border-cyan-400/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="text-white font-mono text-sm font-medium">
                        {edge.from} → {edge.to}
                      </div>
                      <div className="text-gray-500 font-mono text-xs mt-0.5">
                        Distance: {edge.weight} km
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveEdge(edge.from, edge.to)}
                      className="text-red-500/70 hover:text-red-400 text-lg ml-2 transition-colors"
                      aria-label="Delete"
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
      <div className="border-t border-cyan-400/40 p-4 space-y-2.5 bg-black/40">
        {/* Status Indicator */}
        {!canRunAlgorithm && (
          <div className="bg-yellow-900/20 border border-yellow-600/40 px-3 py-2 text-xs font-mono text-yellow-300/90">
            <p className="font-semibold mb-1">⚠️ Requirements:</p>
            {!hasStartNode && <p className="text-xs opacity-80">• Add a Start node 🏁</p>}
            {!hasTargetNode && <p className="text-xs opacity-80">• Add a Target node 🎯</p>}
            {edges.length === 0 && <p className="text-xs opacity-80">• Add at least one edge</p>}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onRunAlgorithm}
            disabled={isRunning || !canRunAlgorithm}
            title={!canRunAlgorithm ? 'Complete setup requirements first' : 'Start algorithm'}
            className="bg-green-600/90 hover:bg-green-500 text-white font-mono font-semibold text-sm py-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ▶ RUN
          </button>
          <button
            onClick={onPauseAlgorithm}
            disabled={!isRunning}
            className="bg-orange-600/90 hover:bg-orange-500 text-white font-mono font-semibold text-sm py-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ⏸ PAUSE
          </button>
        </div>
        <button
          onClick={onReset}
          className="w-full bg-red-600/90 hover:bg-red-500 text-white font-mono font-semibold text-sm py-2.5 transition-all"
        >
          🔄 RESET ALL
        </button>
      </div>
    </div>
  );
}
