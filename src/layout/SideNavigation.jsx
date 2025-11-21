import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, User, Briefcase, BarChart3, FileText, GitBranch, Calendar, Workflow } from 'lucide-react';
import { routes, routesByCategory } from '../config/routes';

const SideNavigation = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Get icon component by name
  const getIcon = (iconName) => {
    const icons = {
      Home, User, Briefcase, BarChart3, FileText, GitBranch, Calendar, Workflow,
      Radar: () => <span className="text-lg">📡</span>,
      MessageSquare: () => <span className="text-lg">💬</span>
    };
    const Icon = icons[iconName] || Home;
    return typeof Icon === 'function' ? <Icon /> : <Icon className="w-5 h-5" />;
  };

  // Sidebar animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 }
  };

  // Category configurations
  const categoryConfig = {
    main: { name: 'Main', color: 'blue' },
    ai: { name: 'AI Tools', color: 'purple' },
    visualization: { name: 'Visualizations', color: 'green' },
    portfolio: { name: 'Portfolio', color: 'pink' },
    tools: { name: 'Tools', color: 'yellow' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          className="fixed left-0 top-16 bottom-0 w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-800 z-40 overflow-y-auto"
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">Navigation</h2>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="p-4 space-y-6">
            {Object.entries(routesByCategory).map(([category, categoryRoutes]) => {
              const config = categoryConfig[category];
              if (!config) return null;

              return (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className="space-y-2"
                >
                  {/* Category Header */}
                  <h3 className={`text-sm font-medium text-${config.color}-400 uppercase tracking-wide mb-3`}>
                    {config.name}
                  </h3>

                  {/* Category Routes */}
                  {categoryRoutes.map((route) => {
                    const isActive = location.pathname === route.path;
                    
                    return (
                      <Link
                        key={route.path}
                        to={route.path}
                        onClick={onClose}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all group ${
                          isActive
                            ? `bg-${config.color}-600 text-white shadow-lg`
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <div className={`flex-shrink-0 ${
                          isActive ? 'text-white' : `text-${config.color}-400 group-hover:text-${config.color}-300`
                        }`}>
                          {getIcon(route.icon)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{route.name}</div>
                          {route.description && (
                            <div className={`text-xs truncate ${
                              isActive ? 'text-white/70' : 'text-slate-400'
                            }`}>
                              {route.description}
                            </div>
                          )}
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <div className={`w-2 h-2 rounded-full bg-${config.color}-300`} />
                        )}
                      </Link>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="text-xs text-slate-400 text-center">
              <p>Ray Chen Portfolio</p>
              <p className="text-slate-500">v2.0 • 2024</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideNavigation;