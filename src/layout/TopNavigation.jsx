import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, BarChart3, Workflow } from 'lucide-react';
import { getMainNavRoutes, getRoutesByCategory } from '../config/routes';

const TopNavigation = ({ onMenuToggle, isSidebarOpen }) => {
  const location = useLocation();
  const mainRoutes = getMainNavRoutes();
  const aiRoutes = getRoutesByCategory('ai');
  const vizRoutes = getRoutesByCategory('visualization');

  // Get icon component by name
  const getIcon = (iconName) => {
    const icons = {
      Home, User, Briefcase, BarChart3, Workflow,
      FileText: () => <span>📄</span>,
      GitBranch: () => <span>🌳</span>,
      Radar: () => <span>📡</span>,
      Calendar: () => <span>📅</span>
    };
    const Icon = icons[iconName] || Home;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary-500/20 cyber-lines"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-xl font-display font-bold text-neutral-0 hover:text-accent-400 transition-colors group"
          >
            <motion.span 
              className="text-3xl filter drop-shadow-lg"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              ⚡
            </motion.span>
            <span className="bg-gradient-cyber bg-clip-text text-transparent group-hover:animate-glow-pulse">
              Ray Chen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Main Routes */}
            {mainRoutes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === route.path
                    ? 'bg-primary-600/80 text-neutral-0 glow border border-primary-400/30'
                    : 'text-neutral-300 hover:text-neutral-0 hover:bg-primary-500/20 hover:border hover:border-primary-400/20'
                }`}
              >
                {getIcon(route.icon)}
                <span>{route.name}</span>
              </Link>
            ))}

            {/* AI Tools Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 text-neutral-300 hover:text-neutral-0 hover:bg-primary-500/20 hover:border hover:border-primary-400/20 rounded-lg transition-all duration-300">
                <BarChart3 className="w-4 h-4" />
                <span>AI Tools</span>
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-48 glass-dark rounded-lg shadow-glow border border-primary-500/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {aiRoutes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="flex items-center space-x-2 px-4 py-3 text-neutral-300 hover:text-neutral-0 hover:bg-primary-500/20 first:rounded-t-lg last:rounded-b-lg transition-all duration-300"
                  >
                    {getIcon(route.icon)}
                    <div>
                      <div className="font-medium">{route.name}</div>
                      <div className="text-xs text-slate-400">{route.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Visualizations Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 text-neutral-300 hover:text-neutral-0 hover:bg-primary-500/20 hover:border hover:border-primary-400/20 rounded-lg transition-all duration-300">
                <span>📊</span>
                <span>Visualizations</span>
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-52 glass-dark rounded-lg shadow-glow border border-primary-500/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {vizRoutes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="flex items-center space-x-2 px-4 py-3 text-neutral-300 hover:text-neutral-0 hover:bg-primary-500/20 first:rounded-t-lg last:rounded-b-lg transition-all duration-300"
                  >
                    {getIcon(route.icon)}
                    <div>
                      <div className="font-medium">{route.name}</div>
                      <div className="text-xs text-slate-400">{route.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 text-neutral-300 hover:text-neutral-0 hover:bg-primary-500/20 rounded-lg transition-all duration-300 hover:glow-cyan"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default TopNavigation;