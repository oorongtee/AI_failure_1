import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Clock,
  Activity,
  FileText,
  Users,
  TrendingUp,
  TrendingDown,
  Zap
} from 'lucide-react';

const KPICard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue', delay = 0 }) => {
  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-green-400';
    if (trend < 0) return 'text-red-400';
    return 'text-gray-400';
  };
  
  const getTrendIcon = (trend) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-${color}-500/20 rounded-lg group-hover:bg-${color}-500/30 transition-colors`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        
        {trend !== undefined && (
          <div className={`flex items-center gap-1 ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
            <span className="text-sm font-medium">
              {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-sm text-white/60">{title}</p>
        {subtitle && (
          <p className="text-xs text-white/40">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

const ToolUsageCard = ({ tools, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 col-span-2"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-purple-400" />
        AI Tools Usage
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.slice(0, 8).map((tool, index) => (
          <div key={tool.name} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{tool.name}</p>
              <p className="text-xs text-white/60">{tool.count} uses</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const KPICards = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-slate-700/50 rounded-lg"></div>
              <div className="w-16 h-4 bg-slate-700/50 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-20 h-8 bg-slate-700/50 rounded"></div>
              <div className="w-32 h-4 bg-slate-700/50 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (!data?.kpis) return null;
  
  const { kpis, toolUsage } = data;
  
  return (
    <div className="space-y-6">
      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="AI Tools Used"
          value={kpis.aiToolsUsed}
          subtitle="Different tools"
          icon={Brain}
          color="purple"
          delay={0.1}
        />
        
        <KPICard
          title="Avg Time Saved"
          value={`${kpis.averageTimeSaved}m`}
          subtitle="Per session"
          icon={Clock}
          trend={12}
          color="green"
          delay={0.2}
        />
        
        <KPICard
          title="Weekly Usage"
          value={kpis.weeklyUsage}
          subtitle="This week"
          icon={Activity}
          trend={8}
          color="blue"
          delay={0.3}
        />
        
        <KPICard
          title="Active Prompts"
          value={kpis.activePrompts}
          subtitle="In library"
          icon={FileText}
          trend={5}
          color="yellow"
          delay={0.4}
        />
      </div>
      
      {/* Secondary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Sessions"
          value={kpis.totalSessions}
          subtitle="All time"
          icon={Users}
          color="indigo"
          delay={0.5}
        />
        
        <KPICard
          title="Success Rate"
          value={`${kpis.successRate}%`}
          subtitle="Task completion"
          icon={TrendingUp}
          trend={2}
          color="emerald"
          delay={0.6}
        />
        
        {/* Tool Usage Overview */}
        <ToolUsageCard tools={toolUsage} delay={0.7} />
      </div>
    </div>
  );
};

export default KPICards;