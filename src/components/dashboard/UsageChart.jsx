import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md border border-slate-600/50 rounded-lg p-4 shadow-xl">
        <p className="text-white/70 text-sm mb-2">{`Date: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-white text-sm">
            <span style={{ color: entry.color }}>●</span>
            {` ${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartHeader = ({ title, subtitle, onViewChange, currentView }) => {
  const viewOptions = [
    { key: 'area', label: 'Area', icon: TrendingUp },
    { key: 'bar', label: 'Bar', icon: BarChart3 },
    { key: 'line', label: 'Line', icon: TrendingUp }
  ];
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-white/60 text-sm">{subtitle}</p>
      </div>
      
      <div className="flex gap-2">
        {viewOptions.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onViewChange(key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              currentView === key
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700/50 text-white/70 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

const UsageAreaChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
        </linearGradient>
        <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis 
        dataKey="date" 
        stroke="#9ca3af"
        fontSize={12}
        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      />
      <YAxis stroke="#9ca3af" fontSize={12} />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="usage"
        stroke="#8b5cf6"
        fillOpacity={1}
        fill="url(#colorUsage)"
        strokeWidth={2}
      />
      <Area
        type="monotone"
        dataKey="aiCalls"
        stroke="#06b6d4"
        fillOpacity={1}
        fill="url(#colorCalls)"
        strokeWidth={2}
      />
    </AreaChart>
  </ResponsiveContainer>
);

const UsageBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis 
        dataKey="date" 
        stroke="#9ca3af"
        fontSize={12}
        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      />
      <YAxis stroke="#9ca3af" fontSize={12} />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="usage" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
      <Bar dataKey="aiCalls" fill="#06b6d4" radius={[2, 2, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

const UsageLineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis 
        dataKey="date" 
        stroke="#9ca3af"
        fontSize={12}
        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      />
      <YAxis stroke="#9ca3af" fontSize={12} />
      <Tooltip content={<CustomTooltip />} />
      <Line 
        type="monotone" 
        dataKey="usage" 
        stroke="#8b5cf6" 
        strokeWidth={3}
        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
        activeDot={{ r: 6, fill: '#8b5cf6' }}
      />
      <Line 
        type="monotone" 
        dataKey="aiCalls" 
        stroke="#06b6d4" 
        strokeWidth={3}
        dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
        activeDot={{ r: 6, fill: '#06b6d4' }}
      />
    </LineChart>
  </ResponsiveContainer>
);

const UsageChart = ({ data, isLoading }) => {
  const [viewType, setViewType] = useState('area');
  const [timeRange, setTimeRange] = useState('30d');
  
  if (isLoading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="h-6 bg-slate-700/50 rounded w-48 mb-2"></div>
              <div className="h-4 bg-slate-700/50 rounded w-64"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-slate-700/50 rounded w-20"></div>
              <div className="h-10 bg-slate-700/50 rounded w-20"></div>
              <div className="h-10 bg-slate-700/50 rounded w-20"></div>
            </div>
          </div>
          <div className="h-80 bg-slate-700/30 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (!data?.usageChart) return null;
  
  const renderChart = () => {
    const chartData = data.usageChart;
    
    switch (viewType) {
      case 'bar':
        return <UsageBarChart data={chartData} />;
      case 'line':
        return <UsageLineChart data={chartData} />;
      default:
        return <UsageAreaChart data={chartData} />;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6"
    >
      <ChartHeader
        title="Usage Analytics"
        subtitle="Daily AI tool usage and API calls over time"
        onViewChange={setViewType}
        currentView={viewType}
      />
      
      {/* Time Range Selector */}
      <div className="flex gap-2 mb-6">
        {[
          { key: '7d', label: '7 days' },
          { key: '30d', label: '30 days' },
          { key: '90d', label: '90 days' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTimeRange(key)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              timeRange === key
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                : 'bg-slate-700/30 text-white/60 hover:text-white border border-slate-600/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      
      {/* Chart Container */}
      <div className="w-full">
        {renderChart()}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-700/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-sm text-white/70">Usage Count</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
          <span className="text-sm text-white/70">AI Calls</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UsageChart;