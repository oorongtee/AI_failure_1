import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, Search, Filter, GitBranch, Zap, Users, Target } from 'lucide-react';
import useSkillTreeData from '../../hooks/useSkillTreeData';

// Individual Skill Node Component
const SkillNode = ({ skill, isSelected, onSelect, connections, position }) => {
  const { prerequisites, dependents } = connections;
  
  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      frontend: 'blue',
      backend: 'green', 
      devops: 'yellow',
      ai: 'purple',
      design: 'pink'
    };
    return colors[category] || 'gray';
  };

  const color = getCategoryColor(skill.category);
  const levelPercentage = skill.level;

  return (
    <motion.div
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? `border-${color}-400 bg-${color}-500/20 shadow-lg` 
          : `border-${color}-500/30 bg-slate-800/50 hover:border-${color}-400 hover:bg-${color}-500/10`
      }`}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(skill.id)}
    >
      {/* Skill Icon and Name */}
      <div className="flex items-center space-x-3 mb-2">
        <div className={`w-8 h-8 rounded-lg bg-${color}-500/20 flex items-center justify-center`}>
          <span className="text-lg">{skill.category === 'frontend' ? '🎨' : skill.category === 'backend' ? '⚙️' : skill.category === 'devops' ? '🚀' : skill.category === 'ai' ? '🤖' : '✨'}</span>
        </div>
        <div>
          <h3 className="font-semibold text-white text-sm">{skill.name}</h3>
          <p className="text-xs text-slate-400">{skill.category}</p>
        </div>
      </div>

      {/* Skill Level Bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-400">Proficiency</span>
          <span className="text-xs font-medium text-white">{skill.level}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-1.5">
          <motion.div
            className={`h-1.5 rounded-full bg-${color}-400`}
            initial={{ width: 0 }}
            animate={{ width: `${levelPercentage}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-300 mb-3 line-clamp-2">{skill.description}</p>

      {/* Prerequisites and Dependents */}
      <div className="flex flex-wrap gap-1 text-xs">
        {prerequisites.length > 0 && (
          <div className={`px-2 py-1 rounded bg-${color}-500/20 text-${color}-300 border border-${color}-500/30`}>
            ↑ {prerequisites.length} deps
          </div>
        )}
        {dependents.length > 0 && (
          <div className={`px-2 py-1 rounded bg-${color}-500/20 text-${color}-300 border border-${color}-500/30`}>
            ↓ {dependents.length} leads
          </div>
        )}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-${color}-400 flex items-center justify-center`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <Zap className="w-2 h-2 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Skill Tree Component
const SkillTreeMain = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    minLevel: 0,
    search: ''
  });

  const {
    skills,
    categories,
    selectedSkills,
    isLoading,
    toggleSkillSelection,
    getSkillConnections,
    getSkillStats,
    clearSelection
  } = useSkillTreeData(filters);

  const stats = getSkillStats();

  // Generate positions for skills in a tree-like layout
  const getSkillPosition = (skill, index) => {
    const categoryCounts = {
      frontend: 0, backend: 0, devops: 0, ai: 0, design: 0
    };
    
    // Count skills per category up to current index
    skills.slice(0, index + 1).forEach(s => {
      if (categoryCounts[s.category] !== undefined) {
        categoryCounts[s.category]++;
      }
    });

    // Calculate position based on category
    const categoryPositions = {
      frontend: { baseX: 20, baseY: 20 },
      backend: { baseX: 50, baseY: 30 },
      devops: { baseX: 80, baseY: 20 },
      ai: { baseX: 35, baseY: 70 },
      design: { baseX: 65, baseY: 70 }
    };

    const base = categoryPositions[skill.category] || { baseX: 50, baseY: 50 };
    const offset = categoryCounts[skill.category] - 1;
    
    return {
      x: base.baseX + (offset % 3) * 15 - 15,
      y: base.baseY + Math.floor(offset / 3) * 20
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading skill tree...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <GitBranch className="w-8 h-8 text-green-400" />
            Skill Tree
          </h1>
          <p className="text-slate-400 mt-2">Interactive technology skill mapping and dependencies</p>
        </div>
        
        {/* Stats */}
        <div className="flex gap-4">
          <div className="bg-slate-800/50 rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-slate-400">Total Skills</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.averageLevel}%</div>
            <div className="text-xs text-slate-400">Avg Level</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold text-blue-400">{selectedSkills.size}</div>
            <div className="text-xs text-slate-400">Selected</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/30 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {Object.entries(categories).map(([key, category]) => (
              <option key={key} value={key}>{category.name}</option>
            ))}
          </select>

          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={filters.minLevel}
              onChange={(e) => setFilters(prev => ({ ...prev, minLevel: parseInt(e.target.value) }))}
              className="flex-1"
            />
            <span className="text-sm text-slate-400 min-w-[3rem]">{filters.minLevel}%+</span>
          </div>
        </div>

        {/* Clear Selection */}
        {selectedSkills.size > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              {selectedSkills.size} skill{selectedSkills.size !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={clearSelection}
              className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Skill Tree Visualization */}
      <div className="bg-slate-800/30 rounded-lg p-6">
        <div className="relative w-full h-[600px] overflow-hidden">
          {skills.map((skill, index) => {
            const position = getSkillPosition(skill, index);
            const connections = getSkillConnections(skill.id);
            const isSelected = selectedSkills.has(skill.id);

            return (
              <SkillNode
                key={skill.id}
                skill={skill}
                isSelected={isSelected}
                onSelect={toggleSkillSelection}
                connections={connections}
                position={position}
              />
            );
          })}

          {/* Empty State */}
          {skills.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-slate-400">
                <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No skills match your current filters</p>
                <button
                  onClick={() => setFilters({ category: 'all', minLevel: 0, search: '' })}
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillTreeMain;