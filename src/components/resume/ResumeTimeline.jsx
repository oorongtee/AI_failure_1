import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Trophy, Calendar } from 'lucide-react';

const ResumeTimeline = ({ data, selectedBlock, onBlockSelect, currentIndex = 0 }) => {
  const svgRef = useRef(null);

  // Get appropriate icon for timeline block type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'education':
        return GraduationCap;
      case 'work':
        return Briefcase;
      case 'achievement':
        return Award;
      case 'leadership':
        return Trophy;
      default:
        return Briefcase;
    }
  };

  // Get color theme for timeline block type
  const getTypeColor = (type) => {
    switch (type) {
      case 'education':
        return 'blue';
      case 'work':
        return 'green';
      case 'achievement':
        return 'purple';
      case 'leadership':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  // Generate smooth SVG path for timeline
  const generatePath = (points) => {
    if (points.length < 2) return '';

    const svgWidth = 100;
    const svgHeight = 100;
    
    // Convert percentage positions to SVG coordinates
    const svgPoints = points.map(point => ({
      x: (point.position.x / 100) * svgWidth,
      y: (point.position.y / svgHeight) * 100
    }));
    
    // Create smooth curve path
    let path = `M ${svgPoints[0].x} ${svgPoints[0].y}`;
    
    for (let i = 1; i < svgPoints.length; i++) {
      const prev = svgPoints[i - 1];
      const curr = svgPoints[i];
      const next = svgPoints[i + 1];
      
      // Control points for smooth curve
      const cp1x = prev.x + (curr.x - prev.x) * 0.5;
      const cp1y = prev.y;
      const cp2x = curr.x - (next ? (next.x - curr.x) * 0.3 : 0);
      const cp2y = curr.y;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  const pathString = generatePath(data);

  return (
    <div className="relative w-full h-96 mb-8">
      {/* SVG Timeline Path */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="25%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="75%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
        
        {/* Animated Path */}
        <motion.path
          d={pathString}
          fill="none"
          stroke="url(#timelineGradient)"
          strokeWidth="0.5"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ 
            duration: 2, 
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Background path for glow effect */}
        <motion.path
          d={pathString}
          fill="none"
          stroke="url(#timelineGradient)"
          strokeWidth="1.5"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 2, 
            ease: "easeInOut",
            delay: 0.3
          }}
        />
      </svg>

      {/* Timeline Nodes */}
      {data.map((block, index) => {
        const Icon = getTypeIcon(block.type);
        const color = getTypeColor(block.type);
        const isSelected = selectedBlock?.id === block.id;
        const isCurrent = currentIndex === index;
        
        return (
          <motion.div
            key={block.id}
            className="absolute cursor-pointer group"
            style={{
              left: `${block.position.x}%`,
              top: `${(block.position.y / 300) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => onBlockSelect(block)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isSelected || isCurrent ? 1.2 : 1, 
              opacity: 1 
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.2 + 0.8,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Node Circle */}
            <div className={`
              relative w-16 h-16 rounded-full border-4 
              ${isSelected 
                ? `border-${color}-400 bg-${color}-500/30 shadow-lg shadow-${color}-500/30` 
                : `border-${color}-500/50 bg-slate-800/80 hover:border-${color}-400`
              }
              backdrop-blur-md transition-all duration-300
              flex items-center justify-center
            `}>
              <Icon className={`w-6 h-6 text-${color}-400`} />
              
              {/* Pulse animation for current */}
              {isCurrent && (
                <div className={`absolute inset-0 rounded-full border-2 border-${color}-400 animate-ping`} />
              )}
              
              {/* Selection indicator */}
              {isSelected && (
                <div className={`absolute -inset-1 rounded-full border-2 border-${color}-300 animate-pulse`} />
              )}
            </div>

            {/* Node Label */}
            <motion.div
              className={`
                absolute top-20 left-1/2 transform -translate-x-1/2
                bg-slate-800/90 backdrop-blur-md border border-slate-700/50
                rounded-lg px-4 py-2 min-w-48 text-center
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                pointer-events-none z-10
              `}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <h4 className="text-white font-medium text-sm mb-1">{block.title}</h4>
              <p className="text-white/70 text-xs mb-1">{block.company}</p>
              <div className="flex items-center justify-center gap-1 text-white/50">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">{block.period}</span>
              </div>
              
              {/* Type badge */}
              <div className={`
                inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs
                bg-${color}-500/20 text-${color}-300 border border-${color}-500/30
              `}>
                <Icon className="w-3 h-3" />
                {block.type}
              </div>
            </motion.div>

            {/* Connection indicator */}
            {index < data.length - 1 && (
              <motion.div
                className={`absolute w-1 h-8 bg-gradient-to-b from-${color}-500 to-transparent`}
                style={{
                  left: '50%',
                  top: '100%',
                  transform: 'translateX(-50%)'
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 32, opacity: 0.6 }}
                transition={{ delay: index * 0.2 + 1.2, duration: 0.5 }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {data.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index <= currentIndex ? 'bg-purple-400' : 'bg-slate-600'
            }`}
          />
        ))}
      </motion.div>

      {/* Timeline Labels */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-white/40">
        <span>Education</span>
        <span>Experience</span>
        <span>Leadership</span>
        <span>Current</span>
      </div>
    </div>
  );
};

export default ResumeTimeline;