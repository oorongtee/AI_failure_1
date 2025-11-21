import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Zap, 
  Lock, 
  CheckCircle, 
  Circle,
  Star,
  Trophy,
  Target,
  Book,
  Code,
  Database,
  Palette,
  Cpu,
  Globe,
  Shield
} from 'lucide-react';

// Skill Node Component
const SkillNode = ({ skill, isUnlocked, isCompleted, onClick, position }) => {
  const getIcon = (category) => {
    const icons = {
      frontend: Code,
      backend: Database,
      design: Palette,
      devops: Cpu,
      web3: Shield,
      ai: Zap,
      mobile: Globe,
    };
    return icons[category] || Circle;
  };

  const Icon = getIcon(skill.category);

  return (
    <motion.div
      className={`absolute cursor-pointer select-none ${position}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: isUnlocked ? 1.1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(skill)}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center ${
        isCompleted 
          ? 'bg-green-500/20 border-green-400 shadow-green-400/50' 
          : isUnlocked 
            ? 'bg-blue-500/20 border-blue-400 shadow-blue-400/50' 
            : 'bg-gray-700/50 border-gray-600'
      } shadow-lg`}>
        <Icon className={`w-8 h-8 ${
          isCompleted 
            ? 'text-green-400' 
            : isUnlocked 
              ? 'text-blue-400' 
              : 'text-gray-500'
        }`} />
        
        {/* Completion indicator */}
        {isCompleted && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* Lock indicator */}
        {!isUnlocked && (
          <motion.div
            className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <Lock className="w-3 h-3 text-gray-300" />
          </motion.div>
        )}

        {/* Glow effect for unlocked skills */}
        {isUnlocked && !isCompleted && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400/20"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
      
      {/* Skill name */}
      <div className="mt-2 text-center">
        <p className={`text-xs font-medium ${
          isCompleted 
            ? 'text-green-400' 
            : isUnlocked 
              ? 'text-white' 
              : 'text-gray-500'
        }`}>
          {skill.name}
        </p>
      </div>
    </motion.div>
  );
};

// Connection Line Component
const ConnectionLine = ({ from, to, isActive }) => (
  <motion.svg
    className="absolute top-0 left-0 w-full h-full pointer-events-none"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: isActive ? 0.6 : 0.3 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <motion.path
      d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
      stroke={isActive ? "#60a5fa" : "#4b5563"}
      strokeWidth="2"
      strokeDasharray={isActive ? "none" : "4 4"}
      fill="none"
    />
  </motion.svg>
);

// Skill Detail Modal
const SkillDetailModal = ({ skill, isOpen, onClose, onToggleComplete }) => {
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
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white">{skill.level}/5</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Description</p>
                <p className="text-gray-300 text-sm">{skill.description}</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-2">Prerequisites</p>
                <div className="flex flex-wrap gap-2">
                  {skill.prerequisites.map((prereq) => (
                    <span
                      key={prereq}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                    >
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">Learning Resources</p>
                <ul className="space-y-1">
                  {skill.resources.map((resource, index) => (
                    <li key={index} className="text-blue-400 text-sm hover:underline cursor-pointer">
                      • {resource}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400">
                  Progress: {skill.progress}%
                </div>
                <button
                  onClick={() => onToggleComplete(skill.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    skill.completed
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {skill.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SkillTree = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: 'HTML/CSS',
      category: 'frontend',
      level: 5,
      completed: true,
      unlocked: true,
      progress: 100,
      description: 'Fundamental web markup and styling languages',
      prerequisites: [],
      resources: ['MDN Web Docs', 'CSS Tricks', 'Flexbox Froggy'],
      position: 'top-32 left-1/2 transform -translate-x-1/2'
    },
    {
      id: 2,
      name: 'JavaScript',
      category: 'frontend',
      level: 5,
      completed: true,
      unlocked: true,
      progress: 100,
      description: 'Dynamic programming language for web development',
      prerequisites: ['HTML/CSS'],
      resources: ['JavaScript.info', 'Eloquent JavaScript', 'You Don\'t Know JS'],
      position: 'top-48 left-1/4'
    },
    {
      id: 3,
      name: 'React',
      category: 'frontend',
      level: 4,
      completed: true,
      unlocked: true,
      progress: 90,
      description: 'Popular JavaScript library for building user interfaces',
      prerequisites: ['JavaScript'],
      resources: ['React Docs', 'React Tutorial', 'Create React App'],
      position: 'top-64 left-1/3'
    },
    {
      id: 4,
      name: 'Three.js',
      category: 'frontend',
      level: 4,
      completed: true,
      unlocked: true,
      progress: 85,
      description: '3D graphics library for creating WebGL applications',
      prerequisites: ['JavaScript', 'React'],
      resources: ['Three.js Docs', 'Three.js Journey', 'WebGL Fundamentals'],
      position: 'top-80 left-1/2 transform -translate-x-1/2'
    },
    {
      id: 5,
      name: 'Node.js',
      category: 'backend',
      level: 4,
      completed: true,
      unlocked: true,
      progress: 80,
      description: 'JavaScript runtime for server-side development',
      prerequisites: ['JavaScript'],
      resources: ['Node.js Docs', 'NodeSchool', 'Express.js Guide'],
      position: 'top-48 right-1/4'
    },
    {
      id: 6,
      name: 'Database Design',
      category: 'backend',
      level: 3,
      completed: false,
      unlocked: true,
      progress: 60,
      description: 'Designing efficient and scalable database schemas',
      prerequisites: ['Node.js'],
      resources: ['PostgreSQL Tutorial', 'MongoDB University', 'Database Design Course'],
      position: 'top-64 right-1/3'
    },
    {
      id: 7,
      name: 'UI/UX Design',
      category: 'design',
      level: 3,
      completed: false,
      unlocked: true,
      progress: 45,
      description: 'User interface and experience design principles',
      prerequisites: ['HTML/CSS'],
      resources: ['Figma Academy', 'Design Systems', 'UX Laws'],
      position: 'top-96 left-1/4'
    },
    {
      id: 8,
      name: 'DevOps',
      category: 'devops',
      level: 2,
      completed: false,
      unlocked: false,
      progress: 20,
      description: 'Development operations and deployment automation',
      prerequisites: ['Node.js', 'Database Design'],
      resources: ['Docker Docs', 'AWS Training', 'Kubernetes Tutorial'],
      position: 'top-96 right-1/4'
    },
    {
      id: 9,
      name: 'AI/ML',
      category: 'ai',
      level: 2,
      completed: false,
      unlocked: false,
      progress: 15,
      description: 'Artificial Intelligence and Machine Learning concepts',
      prerequisites: ['Database Design', 'DevOps'],
      resources: ['TensorFlow.js', 'ML Course', 'OpenAI API'],
      position: 'top-112 left-1/2 transform -translate-x-1/2'
    }
  ]);

  const handleSkillClick = useCallback((skill) => {
    if (skill.unlocked) {
      setSelectedSkill(skill);
    }
  }, []);

  const toggleSkillComplete = useCallback((skillId) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => {
        if (skill.id === skillId) {
          const newCompleted = !skill.completed;
          const newProgress = newCompleted ? 100 : skill.progress;
          
          // Update dependent skills unlock status
          const updatedSkills = prevSkills.map(s => {
            if (s.prerequisites.includes(skill.name)) {
              return { ...s, unlocked: newCompleted };
            }
            return s;
          });
          
          return { ...skill, completed: newCompleted, progress: newProgress };
        }
        return skill;
      })
    );
    setSelectedSkill(null);
  }, []);

  const completedSkills = skills.filter(skill => skill.completed).length;
  const totalSkills = skills.length;
  const overallProgress = (completedSkills / totalSkills) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
            <GitBranch className="w-8 h-8 mr-3" />
            Skill Development Tree
          </h1>
          <p className="text-gray-400 mb-6">Track your learning journey and unlock new abilities</p>
          
          {/* Progress Stats */}
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{completedSkills}/{totalSkills}</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{overallProgress.toFixed(0)}%</div>
              <div className="text-sm text-gray-400">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {skills.reduce((sum, skill) => sum + skill.level, 0)}
              </div>
              <div className="text-sm text-gray-400">Total XP</div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Skill Tree Visualization */}
        <motion.div
          className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 min-h-[600px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Connection lines would go here */}
          
          {/* Skill Nodes */}
          {skills.map((skill) => {
            const isUnlocked = skill.unlocked || skill.prerequisites.every(prereq =>
              skills.find(s => s.name === prereq)?.completed
            );
            
            return (
              <SkillNode
                key={skill.id}
                skill={skill}
                isUnlocked={isUnlocked}
                isCompleted={skill.completed}
                onClick={handleSkillClick}
                position={skill.position}
              />
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <h4 className="text-white font-medium text-sm mb-2">Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <span className="text-gray-300">Locked</span>
              </div>
            </div>
          </div>

          {/* Achievement Badge */}
          {completedSkills >= 5 && (
            <motion.div
              className="absolute top-4 right-4 bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-3"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Achiever!</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Skill Detail Modal */}
        <SkillDetailModal
          skill={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onToggleComplete={toggleSkillComplete}
        />
      </div>
    </div>
  );
};

export default SkillTree;