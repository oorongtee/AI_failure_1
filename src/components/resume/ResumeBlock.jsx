import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Building,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Code,
  ExternalLink,
  Download
} from 'lucide-react';

const AchievementCard = ({ achievement, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30"
  >
    <div className="flex items-center justify-between">
      <span className="text-white/70 text-sm">{achievement.label}</span>
      <span className="text-white font-semibold">{achievement.value}</span>
    </div>
  </motion.div>
);

const TechnologyTag = ({ tech, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
  >
    <Code className="w-3 h-3 mr-1" />
    {tech}
  </motion.span>
);

const HighlightItem = ({ highlight, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-start gap-3 p-3 bg-slate-700/20 rounded-lg border border-slate-600/20 hover:border-slate-500/30 transition-colors"
  >
    <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
    <span className="text-white/80 text-sm">{highlight}</span>
  </motion.div>
);

const ResumeBlock = ({ 
  block, 
  onClose, 
  onNavigate, 
  canNavigateNext, 
  canNavigatePrev 
}) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'education': return Award;
      case 'internship': return Users;
      case 'job': return Building;
      default: return Award;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'education': return 'blue';
      case 'internship': return 'yellow';
      case 'job': return 'green';
      default: return 'purple';
    }
  };

  const Icon = getTypeIcon(block.type);
  const color = getTypeColor(block.type);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={block.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r from-${color}-600/20 to-${color}-500/10 border-b border-slate-700/50 p-6`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 bg-${color}-500/20 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${color}-400`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{block.title}</h2>
                  <div className="flex items-center gap-4 mt-1 text-white/70">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>{block.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{block.period}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-white/80 text-lg">{block.description}</p>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Key Metrics
                </h3>
                <div className="grid gap-3">
                  {block.achievements?.map((achievement, index) => (
                    <AchievementCard key={index} achievement={achievement} index={index} />
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {block.technologies?.map((tech, index) => (
                    <TechnologyTag key={tech} tech={tech} index={index} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Highlights */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Key Accomplishments
                </h3>
                <div className="space-y-3">
                  {block.highlights?.map((highlight, index) => (
                    <HighlightItem key={index} highlight={highlight} index={index} />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-300 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    View Details
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-green-300 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-slate-700/20 border-t border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('prev')}
              disabled={!canNavigatePrev}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                canNavigatePrev
                  ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white'
                  : 'bg-slate-800/50 text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2 text-white/60">
              <span className="text-sm">Navigate with arrow keys</span>
            </div>

            <button
              onClick={() => onNavigate('next')}
              disabled={!canNavigateNext}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                canNavigateNext
                  ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white'
                  : 'bg-slate-800/50 text-white/30 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeBlock;