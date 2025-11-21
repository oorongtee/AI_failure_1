import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar,
  TrendingUp,
  Filter,
  RotateCcw,
  Download,
  Info,
  Star,
  ChevronUp,
  ChevronDown,
  Eye
} from 'lucide-react';

// Technology radar data
const techData = [
  // Adopt (Inner ring - established technologies)
  { name: 'React', category: 'Frameworks', ring: 'adopt', angle: 0, description: 'Primary frontend framework', trend: 'stable', maturity: 95 },
  { name: 'TypeScript', category: 'Languages', ring: 'adopt', angle: 45, description: 'Type-safe JavaScript', trend: 'growing', maturity: 90 },
  { name: 'Node.js', category: 'Platforms', ring: 'adopt', angle: 90, description: 'JavaScript runtime', trend: 'stable', maturity: 88 },
  { name: 'PostgreSQL', category: 'Tools', ring: 'adopt', angle: 135, description: 'Relational database', trend: 'stable', maturity: 92 },
  { name: 'Docker', category: 'Tools', ring: 'adopt', angle: 180, description: 'Containerization platform', trend: 'stable', maturity: 85 },
  { name: 'Jest', category: 'Tools', ring: 'adopt', angle: 225, description: 'JavaScript testing framework', trend: 'stable', maturity: 80 },
  
  // Trial (Second ring - promising technologies)
  { name: 'Three.js', category: 'Frameworks', ring: 'trial', angle: 15, description: 'WebGL 3D graphics', trend: 'growing', maturity: 75 },
  { name: 'Next.js', category: 'Frameworks', ring: 'trial', angle: 60, description: 'React metaframework', trend: 'growing', maturity: 70 },
  { name: 'Rust', category: 'Languages', ring: 'trial', angle: 105, description: 'Systems programming', trend: 'growing', maturity: 45 },
  { name: 'GraphQL', category: 'Tools', ring: 'trial', angle: 150, description: 'Query language for APIs', trend: 'growing', maturity: 65 },
  { name: 'Kubernetes', category: 'Platforms', ring: 'trial', angle: 195, description: 'Container orchestration', trend: 'growing', maturity: 55 },
  { name: 'WebAssembly', category: 'Platforms', ring: 'trial', angle: 240, description: 'Binary instruction format', trend: 'growing', maturity: 40 },
  
  // Assess (Third ring - emerging technologies)
  { name: 'Svelte', category: 'Frameworks', ring: 'assess', angle: 30, description: 'Compile-time framework', trend: 'growing', maturity: 35 },
  { name: 'Deno', category: 'Platforms', ring: 'assess', angle: 75, description: 'Secure JavaScript runtime', trend: 'growing', maturity: 30 },
  { name: 'Quantum Computing', category: 'Techniques', ring: 'assess', angle: 120, description: 'Quantum algorithms', trend: 'emerging', maturity: 15 },
  { name: 'Edge Computing', category: 'Techniques', ring: 'assess', angle: 165, description: 'Distributed computing', trend: 'growing', maturity: 25 },
  { name: 'WebXR', category: 'Platforms', ring: 'assess', angle: 210, description: 'VR/AR for web', trend: 'emerging', maturity: 20 },
  
  // Hold (Outer ring - technologies to avoid/reconsider)
  { name: 'jQuery', category: 'Frameworks', ring: 'hold', angle: 45, description: 'Legacy DOM manipulation', trend: 'declining', maturity: 95 },
  { name: 'PHP', category: 'Languages', ring: 'hold', angle: 90, description: 'Server-side scripting', trend: 'declining', maturity: 85 },
  { name: 'Angular.js', category: 'Frameworks', ring: 'hold', angle: 135, description: 'Legacy Angular version', trend: 'declining', maturity: 90 },
  { name: 'Flash', category: 'Platforms', ring: 'hold', angle: 180, description: 'Deprecated multimedia platform', trend: 'obsolete', maturity: 100 },
];

const categories = ['Frameworks', 'Languages', 'Platforms', 'Tools', 'Techniques'];
const rings = ['adopt', 'trial', 'assess', 'hold'];

const ringColors = {
  adopt: '#10b981', // green
  trial: '#3b82f6', // blue
  assess: '#f59e0b', // amber
  hold: '#ef4444'   // red
};

const ringLabels = {
  adopt: 'ADOPT',
  trial: 'TRIAL',
  assess: 'ASSESS',
  hold: 'HOLD'
};

// Radar component
const RadarVisualization = ({ data, selectedCategory, onTechSelect }) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const size = Math.min(rect.width, 600);
        setDimensions({ width: size, height: size });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const maxRadius = Math.min(dimensions.width, dimensions.height) / 2 - 40;

  const getRingRadius = (ring) => {
    const ringIndex = rings.indexOf(ring);
    return (maxRadius / rings.length) * (ringIndex + 1);
  };

  const getPosition = (tech) => {
    const radius = getRingRadius(tech.ring) - 20;
    const angleRad = (tech.angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad)
    };
  };

  const filteredData = selectedCategory === 'All' 
    ? data 
    : data.filter(tech => tech.category === selectedCategory);

  return (
    <div className="w-full aspect-square max-w-2xl mx-auto">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="bg-slate-800/50 rounded-xl"
      >
        {/* Grid circles */}
        {rings.map((ring, index) => (
          <circle
            key={ring}
            cx={centerX}
            cy={centerY}
            r={getRingRadius(ring)}
            fill="none"
            stroke={ringColors[ring]}
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="4 4"
          />
        ))}

        {/* Grid lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1={centerX}
            y1={centerY}
            x2={centerX + maxRadius * Math.cos((angle * Math.PI) / 180)}
            y2={centerY + maxRadius * Math.sin((angle * Math.PI) / 180)}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Ring labels */}
        {rings.map((ring, index) => (
          <text
            key={ring}
            x={centerX + getRingRadius(ring) - 30}
            y={centerY - 5}
            fill={ringColors[ring]}
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
          >
            {ringLabels[ring]}
          </text>
        ))}

        {/* Technology dots */}
        <AnimatePresence>
          {filteredData.map((tech, index) => {
            const pos = getPosition(tech);
            return (
              <motion.g
                key={tech.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="6"
                  fill={ringColors[tech.ring]}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.5 }}
                  onClick={() => onTechSelect(tech)}
                />
                <text
                  x={pos.x}
                  y={pos.y + 20}
                  fill="white"
                  fontSize="10"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  {tech.name}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
};

// Technology detail panel
const TechDetailPanel = ({ tech, isOpen, onClose }) => {
  if (!tech) return null;

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'growing': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'stable': return <ChevronUp className="w-4 h-4 text-blue-400" />;
      case 'declining': return <ChevronDown className="w-4 h-4 text-red-400" />;
      case 'emerging': return <Star className="w-4 h-4 text-yellow-400" />;
      default: return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-800 border border-white/10 rounded-xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{tech.name}</h3>
              <div className={`px-3 py-1 rounded-full text-xs font-medium`} style={{ 
                backgroundColor: `${ringColors[tech.ring]}20`, 
                color: ringColors[tech.ring] 
              }}>
                {ringLabels[tech.ring]}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Category</p>
                <p className="text-white">{tech.category}</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-1">Description</p>
                <p className="text-gray-300 text-sm">{tech.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Trend</p>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(tech.trend)}
                    <span className="text-white text-sm capitalize">{tech.trend}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm mb-1">Maturity</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${tech.maturity}%`,
                          backgroundColor: ringColors[tech.ring]
                        }}
                      />
                    </div>
                    <span className="text-white text-sm">{tech.maturity}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TechRadar = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState(null);
  const [showLegend, setShowLegend] = useState(true);

  const exportRadar = () => {
    const dataStr = JSON.stringify(techData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tech-radar-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetView = () => {
    setSelectedCategory('All');
    setSelectedTech(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
            <Radar className="w-8 h-8 mr-3" />
            Technology Radar
          </h1>
          <p className="text-gray-400 mb-6">Navigate the technology landscape and adoption strategy</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              <Eye className="w-4 h-4 mr-2" />
              Legend
            </button>
            <button
              onClick={resetView}
              className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
            <button
              onClick={exportRadar}
              className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Radar Visualization */}
          <motion.div
            className="lg:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <RadarVisualization
              data={techData}
              selectedCategory={selectedCategory}
              onTechSelect={setSelectedTech}
            />
          </motion.div>

          {/* Legend and Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Legend */}
            {showLegend && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Rings
                </h3>
                <div className="space-y-3">
                  {rings.map((ring) => (
                    <div key={ring} className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: ringColors[ring] }}
                      />
                      <div>
                        <div className="text-white font-medium text-sm">{ringLabels[ring]}</div>
                        <div className="text-gray-400 text-xs">
                          {ring === 'adopt' && 'Proven and mature'}
                          {ring === 'trial' && 'Worth pursuing'}
                          {ring === 'assess' && 'Worth exploring'}
                          {ring === 'hold' && 'Proceed with caution'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-bold text-lg mb-4">Category Overview</h3>
              <div className="space-y-3">
                {categories.map((category) => {
                  const count = techData.filter(tech => tech.category === category).length;
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{category}</span>
                      <span className="text-white font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-bold text-lg mb-4">Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Technologies:</span>
                  <span className="text-white font-medium">{techData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Growing Trends:</span>
                  <span className="text-green-400 font-medium">
                    {techData.filter(t => t.trend === 'growing').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Stable:</span>
                  <span className="text-blue-400 font-medium">
                    {techData.filter(t => t.trend === 'stable').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Declining:</span>
                  <span className="text-red-400 font-medium">
                    {techData.filter(t => t.trend === 'declining').length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technology Detail Modal */}
        <TechDetailPanel
          tech={selectedTech}
          isOpen={!!selectedTech}
          onClose={() => setSelectedTech(null)}
        />
      </div>
    </div>
  );
};

export default TechRadar;