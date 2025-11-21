import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  RefreshCcw, 
  Download, 
  Search,
  Calendar,
  Settings,
  TrendingUp,
  BarChart3,
  Activity
} from 'lucide-react';
import useDashboardData from '../../hooks/useDashboardData';
import KPICards from '../../components/dashboard/KPICards';
import UsageChart from '../../components/dashboard/UsageChart';

const DashboardPage = () => {
  const [filters, setFilters] = useState({
    tool: '',
    timeRange: '30d',
    metric: 'usage'
  });
  
  const { data, isLoading, error, refetch } = useDashboardData(filters);
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const exportData = () => {
    if (!data) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      filters,
      kpis: data.kpis,
      usageChart: data.usageChart,
      toolUsage: data.toolUsage
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Dashboard</h2>
            <p className="text-red-300/80 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            AI Demo{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Real-time analytics and insights for AI tool usage and productivity metrics
          </p>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Tool Filter */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Filter by tool..."
                  value={filters.tool}
                  onChange={(e) => handleFilterChange('tool', e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              {/* Time Range Filter */}
              <select
                value={filters.timeRange}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                title="Select time range"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>

              {/* Metric Filter */}
              <select
                value={filters.metric}
                onChange={(e) => handleFilterChange('metric', e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                title="Select metric type"
              >
                <option value="usage">Usage Count</option>
                <option value="aiCalls">AI Calls</option>
                <option value="timeSaved">Time Saved</option>
                <option value="prompts">Prompts</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={refetch}
                disabled={isLoading}
                className="p-2 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 text-white/70 hover:text-white rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={exportData}
                disabled={!data}
                className="p-2 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 text-white/70 hover:text-white rounded-lg transition-colors"
                title="Export data"
              >
                <Download className="w-4 h-4" />
              </button>

              <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 text-white/70 hover:text-white rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <KPICards data={data} isLoading={isLoading} />
        </motion.div>

        {/* Main Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Usage Chart - Takes up 2/3 of the space */}
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <UsageChart data={data} isLoading={isLoading} />
          </motion.div>

          {/* Additional Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Quick Stats
              </h3>
              
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="w-20 h-4 bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="w-12 h-4 bg-slate-700/50 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : data ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Last Updated</span>
                    <span className="text-white text-sm">
                      {new Date(data.lastUpdated).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Total Tools</span>
                    <span className="text-white text-sm">{data.toolUsage?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Data Points</span>
                    <span className="text-white text-sm">{data.usageChart?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Active Filter</span>
                    <span className="text-white text-sm">
                      {filters.tool || 'All Tools'}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Top Performing Tools */}
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Top Performers
              </h3>
              
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="w-16 h-4 bg-slate-700/50 rounded mb-1 animate-pulse"></div>
                        <div className="w-12 h-3 bg-slate-700/50 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : data?.toolUsage ? (
                <div className="space-y-3">
                  {data.toolUsage
                    .sort((a, b) => b.trend - a.trend)
                    .slice(0, 3)
                    .map((tool, index) => (
                      <div key={tool.name} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                          index === 1 ? 'bg-gray-500/20 text-gray-400' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          <Activity className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{tool.name}</p>
                          <p className="text-green-400 text-xs">+{tool.trend}% growth</p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center py-8 border-t border-slate-700/30"
        >
          <p className="text-white/50 text-sm">
            Dashboard last updated: {data ? new Date(data.lastUpdated).toLocaleString() : 'Loading...'}
          </p>
          <p className="text-white/40 text-xs mt-2">
            Data refreshes every 5 minutes • {filters.tool ? `Filtered by: ${filters.tool}` : 'Showing all tools'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;