import React, { useCallback, useMemo, useState } from 'react';
import { 
  ReactFlow, 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  addEdge,
  Panel
} from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  MessageSquare, 
  Cpu, 
  Database, 
  Code, 
  Zap,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download
} from 'lucide-react';
import 'reactflow/dist/style.css';

// Custom Node Components
const AINode = ({ data, selected }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className={`px-4 py-3 shadow-lg rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 border-2 min-w-[150px] ${
      selected ? 'border-white' : 'border-purple-300'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-center space-x-2">
      <Brain className="w-5 h-5 text-white" />
      <div className="text-white">
        <div className="text-sm font-bold">{data.label}</div>
        <div className="text-xs opacity-80">{data.type}</div>
      </div>
    </div>
  </motion.div>
);

const ProcessNode = ({ data, selected }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className={`px-4 py-3 shadow-lg rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 border-2 min-w-[150px] ${
      selected ? 'border-white' : 'border-blue-300'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-center space-x-2">
      <Cpu className="w-5 h-5 text-white" />
      <div className="text-white">
        <div className="text-sm font-bold">{data.label}</div>
        <div className="text-xs opacity-80">{data.description}</div>
      </div>
    </div>
  </motion.div>
);

const DataNode = ({ data, selected }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className={`px-4 py-3 shadow-lg rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 border-2 min-w-[150px] ${
      selected ? 'border-white' : 'border-green-300'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-center space-x-2">
      <Database className="w-5 h-5 text-white" />
      <div className="text-white">
        <div className="text-sm font-bold">{data.label}</div>
        <div className="text-xs opacity-80">{data.size}</div>
      </div>
    </div>
  </motion.div>
);

const OutputNode = ({ data, selected }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className={`px-4 py-3 shadow-lg rounded-lg bg-gradient-to-r from-orange-500 to-red-500 border-2 min-w-[150px] ${
      selected ? 'border-white' : 'border-orange-300'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-center space-x-2">
      <Code className="w-5 h-5 text-white" />
      <div className="text-white">
        <div className="text-sm font-bold">{data.label}</div>
        <div className="text-xs opacity-80">{data.format}</div>
      </div>
    </div>
  </motion.div>
);

// Node Types
const nodeTypes = {
  aiNode: AINode,
  processNode: ProcessNode,
  dataNode: DataNode,
  outputNode: OutputNode,
};

// Initial nodes and edges
const initialNodes = [
  {
    id: '1',
    type: 'dataNode',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Input Data', 
      size: '2.5MB',
      description: 'Raw user input and context'
    },
  },
  {
    id: '2',
    type: 'aiNode',
    position: { x: 300, y: 50 },
    data: { 
      label: 'GPT-4', 
      type: 'Language Model',
      description: 'Primary reasoning engine'
    },
  },
  {
    id: '3',
    type: 'processNode',
    position: { x: 300, y: 150 },
    data: { 
      label: 'Tokenizer', 
      description: 'Text processing',
      performance: '99.8% accuracy'
    },
  },
  {
    id: '4',
    type: 'aiNode',
    position: { x: 500, y: 100 },
    data: { 
      label: 'Claude-3', 
      type: 'Assistant Model',
      description: 'Secondary analysis'
    },
  },
  {
    id: '5',
    type: 'processNode',
    position: { x: 700, y: 50 },
    data: { 
      label: 'Synthesis', 
      description: 'Result merging',
      status: 'Active'
    },
  },
  {
    id: '6',
    type: 'outputNode',
    position: { x: 700, y: 150 },
    data: { 
      label: 'Final Output', 
      format: 'JSON/Text',
      confidence: '94.2%'
    },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#8b5cf6' },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#3b82f6' },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#8b5cf6' },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#3b82f6' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10b981' },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f59e0b' },
  },
];

// Flow templates
const flowTemplates = [
  {
    name: 'AI Code Review',
    description: 'Automated code analysis workflow',
    nodes: 8,
    complexity: 'Medium'
  },
  {
    name: 'Multi-Agent Chat',
    description: 'Collaborative AI conversation',
    nodes: 12,
    complexity: 'High'
  },
  {
    name: 'Data Processing',
    description: 'ETL pipeline with AI enhancement',
    nodes: 6,
    complexity: 'Low'
  }
];

const AIFlowGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      animated: true,
      type: 'smoothstep',
      style: { stroke: '#6366f1' }
    }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    console.log('Node clicked:', node);
  }, []);

  const resetFlow = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setIsPlaying(false);
  }, [setNodes, setEdges]);

  const exportFlow = useCallback(() => {
    const flowData = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(flowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-flow-graph.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const simulateFlow = useCallback(() => {
    setIsPlaying(!isPlaying);
    // Here you could add logic to animate the flow execution
  }, [isPlaying]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
        className="bg-transparent"
      >
        <Controls 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg"
        />
        <MiniMap 
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg"
          nodeColor={(node) => {
            switch (node.type) {
              case 'aiNode': return '#8b5cf6';
              case 'processNode': return '#3b82f6';
              case 'dataNode': return '#10b981';
              case 'outputNode': return '#f59e0b';
              default: return '#6b7280';
            }
          }}
        />
        <Background 
          variant="dots" 
          gap={20} 
          size={1} 
          color="#ffffff20"
        />

        {/* Control Panel */}
        <Panel position="top-left" className="m-4">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 min-w-[280px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI Flow Control
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={simulateFlow}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isPlaying 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Simulate
                  </>
                )}
              </button>

              <button
                onClick={resetFlow}
                className="flex items-center px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>

              <button
                onClick={exportFlow}
                className="flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Nodes:</span>
                <span className="text-white font-medium">{nodes.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Connections:</span>
                <span className="text-white font-medium">{edges.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Status:</span>
                <span className={`font-medium ${isPlaying ? 'text-green-400' : 'text-gray-400'}`}>
                  {isPlaying ? 'Running' : 'Idle'}
                </span>
              </div>
            </div>
          </motion.div>
        </Panel>

        {/* Templates Panel */}
        <Panel position="top-right" className="m-4">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 min-w-[250px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Templates
              </h3>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Zap className="w-5 h-5" />
              </button>
            </div>
            
            <AnimatePresence>
              {showTemplates && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  {flowTemplates.map((template, index) => (
                    <motion.div
                      key={template.name}
                      className="p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="text-white font-medium text-sm">{template.name}</div>
                      <div className="text-gray-300 text-xs mt-1">{template.description}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">{template.nodes} nodes</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          template.complexity === 'High' ? 'bg-red-500/20 text-red-300' :
                          template.complexity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {template.complexity}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Panel>

        {/* Legend */}
        <Panel position="bottom-left" className="m-4">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-white font-medium text-sm mb-3">Node Types</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                <span className="text-gray-300">AI Model</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
                <span className="text-gray-300">Process</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
                <span className="text-gray-300">Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
                <span className="text-gray-300">Output</span>
              </div>
            </div>
          </motion.div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default AIFlowGraph;