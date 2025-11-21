import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Thermometer, 
  TrendingUp, 
  Filter, 
  Calendar, 
  BarChart3,
  Settings,
  Eye,
  EyeOff,
  Maximize,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react';

// Skill heatmap data
const skillData = [
  // Frontend Skills
  { name: 'React', category: 'Frontend', level: 95, growth: 12, lastUpdated: '2024-01', x: 0, y: 0 },
  { name: 'Vue.js', category: 'Frontend', level: 75, growth: 8, lastUpdated: '2024-01', x: 1, y: 0 },
  { name: 'Angular', category: 'Frontend', level: 60, growth: -2, lastUpdated: '2023-12', x: 2, y: 0 },
  { name: 'Svelte', category: 'Frontend', level: 45, growth: 15, lastUpdated: '2024-01', x: 3, y: 0 },
  { name: 'Three.js', category: 'Frontend', level: 88, growth: 20, lastUpdated: '2024-01', x: 4, y: 0 },
  { name: 'D3.js', category: 'Frontend', level: 70, growth: 5, lastUpdated: '2023-11', x: 5, y: 0 },
  
  // Backend Skills  
  { name: 'Node.js', category: 'Backend', level: 90, growth: 8, lastUpdated: '2024-01', x: 0, y: 1 },
  { name: 'Python', category: 'Backend', level: 80, growth: 10, lastUpdated: '2024-01', x: 1, y: 1 },
  { name: 'Go', category: 'Backend', level: 55, growth: 18, lastUpdated: '2023-12', x: 2, y: 1 },
  { name: 'Rust', category: 'Backend', level: 40, growth: 25, lastUpdated: '2024-01', x: 3, y: 1 },
  { name: 'Java', category: 'Backend', level: 65, growth: -5, lastUpdated: '2023-10', x: 4, y: 1 },
  { name: 'C#', category: 'Backend', level: 50, growth: 3, lastUpdated: '2023-11', x: 5, y: 1 },
  
  // Database Skills
  { name: 'PostgreSQL', category: 'Database', level: 85, growth: 7, lastUpdated: '2024-01', x: 0, y: 2 },
  { name: 'MongoDB', category: 'Database', level: 75, growth: 10, lastUpdated: '2023-12', x: 1, y: 2 },
  { name: 'Redis', category: 'Database', level: 70, growth: 12, lastUpdated: '2024-01', x: 2, y: 2 },
  { name: 'MySQL', category: 'Database', level: 80, growth: 2, lastUpdated: '2023-11', x: 3, y: 2 },
  { name: 'GraphQL', category: 'Database', level: 65, growth: 15, lastUpdated: '2024-01', x: 4, y: 2 },
  { name: 'Supabase', category: 'Database', level: 60, growth: 20, lastUpdated: '2024-01', x: 5, y: 2 },
  
  // DevOps Skills
  { name: 'Docker', category: 'DevOps', level: 82, growth: 8, lastUpdated: '2024-01', x: 0, y: 3 },
  { name: 'Kubernetes', category: 'DevOps', level: 55, growth: 22, lastUpdated: '2023-12', x: 1, y: 3 },
  { name: 'AWS', category: 'DevOps', level: 75, growth: 12, lastUpdated: '2024-01', x: 2, y: 3 },
  { name: 'GitHub Actions', category: 'DevOps', level: 78, growth: 15, lastUpdated: '2024-01', x: 3, y: 3 },
  { name: 'Terraform', category: 'DevOps', level: 45, growth: 18, lastUpdated: '2023-12', x: 4, y: 3 },
  { name: 'Vercel', category: 'DevOps', level: 88, growth: 10, lastUpdated: '2024-01', x: 5, y: 3 },
  
  // AI/ML Skills
  { name: 'TensorFlow', category: 'AI/ML', level: 45, growth: 30, lastUpdated: '2024-01', x: 0, y: 4 },
  { name: 'PyTorch', category: 'AI/ML', level: 40, growth: 25, lastUpdated: '2023-12', x: 1, y: 4 },
  { name: 'OpenAI API', category: 'AI/ML', level: 75, growth: 35, lastUpdated: '2024-01', x: 2, y: 4 },
  { name: 'Hugging Face', category: 'AI/ML', level: 50, growth: 28, lastUpdated: '2024-01', x: 3, y: 4 },
  { name: 'LangChain', category: 'AI/ML', level: 65, growth: 40, lastUpdated: '2024-01', x: 4, y: 4 },
  { name: 'Vector DB', category: 'AI/ML', level: 55, growth: 32, lastUpdated: '2024-01', x: 5, y: 4 },
  
  // Design Skills
  { name: 'Figma', category: 'Design', level: 78, growth: 5, lastUpdated: '2024-01', x: 0, y: 5 },
  { name: 'Adobe XD', category: 'Design', level: 65, growth: -8, lastUpdated: '2023-10', x: 1, y: 5 },
  { name: 'Blender', category: 'Design', level: 60, growth: 15, lastUpdated: '2023-12', x: 2, y: 5 },
  { name: 'Framer Motion', category: 'Design', level: 85, growth: 18, lastUpdated: '2024-01', x: 3, y: 5 },
  { name: 'GSAP', category: 'Design', level: 72, growth: 8, lastUpdated: '2023-11', x: 4, y: 5 },
  { name: 'Tailwind CSS', category: 'Design', level: 92, growth: 10, lastUpdated: '2024-01', x: 5, y: 5 },
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'AI/ML', 'Design'];

// Heatmap cell component
const HeatmapCell = ({ skill, cellSize, onHover, onLeave, onClick, colorMode }) => {
  const getColor = () => {
    if (colorMode === 'level') {
      const intensity = skill.level / 100;
      return `rgba(59, 130, 246, ${intensity})`;
    } else {
      const growth = skill.growth;
      if (growth > 20) return 'rgba(34, 197, 94, 0.8)'; // High growth - green
      if (growth > 10) return 'rgba(59, 130, 246, 0.7)'; // Medium growth - blue
      if (growth > 0) return 'rgba(251, 191, 36, 0.6)'; // Low growth - yellow
      return 'rgba(239, 68, 68, 0.5)'; // Negative/no growth - red
    }
  };

  const getGrowthIcon = () => {
    if (skill.growth > 15) return '🔥';
    if (skill.growth > 5) return '📈';
    if (skill.growth > 0) return '➡️';
    return '📉';
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      style={{
        width: cellSize,
        height: cellSize,
        backgroundColor: getColor(),
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={onLeave}
      onClick={() => onClick(skill)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: (skill.x + skill.y) * 0.05 }}
    >
      {/* Border animation on hover */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent group-hover:border-white/50"
        animate={{ borderColor: 'transparent' }}
        whileHover={{ borderColor: 'rgba(255,255,255,0.5)' }}
      />
      
      {/* Growth indicator */}
      <div className="absolute top-1 right-1 text-xs opacity-70">
        {getGrowthIcon()}
      </div>
      
      {/* Skill level indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
        <motion.div
          className="h-full bg-white/60"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.8, delay: (skill.x + skill.y) * 0.05 }}
        />
      </div>
    </motion.div>
  );
};

// Tooltip component
const Tooltip = ({ skill, position, visible }) => {
  if (!visible || !skill) return null;

  return (
    <motion.div
      className="fixed bg-slate-900 border border-white/20 rounded-lg p-3 pointer-events-none z-50 min-w-[200px]"
      style={{
        left: position.x + 10,
        top: position.y - 80,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div className="text-white font-medium">{skill.name}</div>
      <div className="text-gray-400 text-sm">{skill.category}</div>
      <div className="flex items-center justify-between mt-2 text-sm">
        <span className="text-blue-400">Level: {skill.level}%</span>
        <span className={`${skill.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
          Growth: {skill.growth > 0 ? '+' : ''}{skill.growth}%
        </span>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Updated: {skill.lastUpdated}
      </div>
    </motion.div>
  );
};

// Skill detail modal
const SkillDetailModal = ({ skill, isOpen, onClose }) => {
  if (!skill) return null;

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
              <h3 className="text-xl font-bold text-white">{skill.name}</h3>
              <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                {skill.category}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Proficiency Level</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-white font-medium">{skill.level}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Growth Rate</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className={`w-4 h-4 ${skill.growth > 0 ? 'text-green-400' : 'text-red-400'}`} />
                  <span className={`font-medium ${skill.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {skill.growth > 0 ? '+' : ''}{skill.growth}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-white">{skill.lastUpdated}</span>
              </div>
              
              <div className="pt-2 border-t border-gray-700">
                <p className="text-gray-300 text-sm">
                  {skill.growth > 20 && "🔥 Rapidly growing skill with high learning momentum."}
                  {skill.growth > 10 && skill.growth <= 20 && "📈 Steadily improving with consistent practice."}
                  {skill.growth > 0 && skill.growth <= 10 && "➡️ Maintaining current proficiency level."}
                  {skill.growth <= 0 && "📉 May need attention or refreshing."}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SkillHeatmap = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [colorMode, setColorMode] = useState('level'); // 'level' or 'growth'
  const [tooltip, setTooltip] = useState({ skill: null, position: { x: 0, y: 0 }, visible: false });
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const filteredData = useMemo(() => {
    return selectedCategory === 'All' 
      ? skillData 
      : skillData.filter(skill => skill.category === selectedCategory);
  }, [selectedCategory]);

  const gridData = useMemo(() => {
    const grid = Array(6).fill().map(() => Array(6).fill(null));
    filteredData.forEach(skill => {
      if (skill.x < 6 && skill.y < 6) {
        grid[skill.y][skill.x] = skill;
      }
    });
    return grid;
  }, [filteredData]);

  const handleCellHover = (skill, event) => {
    setTooltip({
      skill,
      position: { x: event.clientX, y: event.clientY },
      visible: true
    });
  };

  const handleCellLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(skillData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'skill-heatmap-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const cellSize = isFullscreen ? 80 : 60;

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900' : ''} min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
            <Thermometer className="w-8 h-8 mr-3" />
            Skill Proficiency Heatmap
          </h1>
          <p className="text-gray-400 mb-6">Visual representation of skill levels and growth trends</p>
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
              className="bg-slate-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <div className="flex items-center space-x-2 ml-4">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              <button
                onClick={() => setColorMode('level')}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  colorMode === 'level' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Level
              </button>
              <button
                onClick={() => setColorMode('growth')}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  colorMode === 'growth' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Growth
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              <Maximize className="w-4 h-4 mr-2" />
              {isFullscreen ? 'Exit' : 'Fullscreen'}
            </button>
            <button
              onClick={exportData}
              className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Heatmap Grid */}
          <motion.div
            className="xl:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            ref={containerRef}
          >
            <div className="grid grid-cols-6 gap-2 max-w-fit mx-auto">
              {gridData.map((row, rowIndex) => 
                row.map((cell, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className="relative">
                    {cell ? (
                      <HeatmapCell
                        skill={cell}
                        cellSize={cellSize}
                        onHover={(skill) => handleCellHover(skill, event)}
                        onLeave={handleCellLeave}
                        onClick={setSelectedSkill}
                        colorMode={colorMode}
                      />
                    ) : (
                      <div
                        className="bg-gray-800/50 border border-gray-700"
                        style={{ width: cellSize, height: cellSize }}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
            
            {/* Category Labels */}
            <div className="mt-6 text-center">
              <div className="grid grid-cols-6 gap-2 max-w-fit mx-auto text-xs text-gray-400">
                <div>Frontend</div>
                <div>Backend</div>
                <div>Database</div>
                <div>DevOps</div>
                <div>AI/ML</div>
                <div>Design</div>
              </div>
            </div>
          </motion.div>

          {/* Legend and Stats */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Color Legend */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-bold text-lg mb-4">
                {colorMode === 'level' ? 'Proficiency Level' : 'Growth Rate'}
              </h3>
              <div className="space-y-3">
                {colorMode === 'level' ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-900"></div>
                      <span className="text-gray-300 text-sm">Beginner (0-30%)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4" style={{backgroundColor: 'rgba(59, 130, 246, 0.5)'}}></div>
                      <span className="text-gray-300 text-sm">Intermediate (30-70%)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4" style={{backgroundColor: 'rgba(59, 130, 246, 0.8)'}}></div>
                      <span className="text-gray-300 text-sm">Advanced (70-90%)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500"></div>
                      <span className="text-gray-300 text-sm">Expert (90%+)</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4" style={{backgroundColor: 'rgba(239, 68, 68, 0.5)'}}></div>
                      <span className="text-gray-300 text-sm">Declining (≤0%)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4" style={{backgroundColor: 'rgba(251, 191, 36, 0.6)'}}></div>
                      <span className="text-gray-300 text-sm">Slow Growth (1-10%)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4" style={{backgroundColor: 'rgba(59, 130, 246, 0.7)'}}></div>
                      <span className="text-gray-300 text-sm">Steady Growth (11-20%)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4" style={{backgroundColor: 'rgba(34, 197, 94, 0.8)'}}></div>
                      <span className="text-gray-300 text-sm">High Growth (20%+)</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Statistics
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Skills:</span>
                  <span className="text-white font-medium">{skillData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Expert Level (90%+):</span>
                  <span className="text-blue-400 font-medium">
                    {skillData.filter(s => s.level >= 90).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">High Growth (20%+):</span>
                  <span className="text-green-400 font-medium">
                    {skillData.filter(s => s.growth >= 20).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Average Level:</span>
                  <span className="text-white font-medium">
                    {Math.round(skillData.reduce((sum, s) => sum + s.level, 0) / skillData.length)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Top Skills */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Top Skills
              </h3>
              <div className="space-y-2">
                {skillData
                  .sort((a, b) => b.level - a.level)
                  .slice(0, 5)
                  .map((skill, index) => (
                    <div key={skill.name} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-blue-400 font-medium">{skill.level}%</span>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tooltip */}
        <Tooltip {...tooltip} />

        {/* Skill Detail Modal */}
        <SkillDetailModal
          skill={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      </div>
    </div>
  );
};

export default SkillHeatmap;