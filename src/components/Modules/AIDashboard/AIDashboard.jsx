import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Code, 
  GitBranch, 
  Clock, 
  TrendingUp,
  Activity,
  Zap,
  Database,
  Cpu,
  Globe,
  ArrowUpRight
} from 'lucide-react';

// Quick Stats Component
const StatCard = ({ icon: Icon, title, value, change, color = 'blue' }) => (
  <motion.div
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    whileHover={{ scale: 1.02, y: -2 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {change && (
          <div className="flex items-center mt-2 text-sm">
            <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400">{change}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-500/20`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
    </div>
  </motion.div>
);

// Activity Feed Component
const ActivityItem = ({ action, time, status }) => (
  <motion.div
    className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <div className={`w-2 h-2 rounded-full ${
      status === 'success' ? 'bg-green-400' :
      status === 'warning' ? 'bg-yellow-400' :
      status === 'error' ? 'bg-red-400' : 'bg-blue-400'
    }`} />
    <div className="flex-1">
      <p className="text-white text-sm">{action}</p>
      <p className="text-gray-400 text-xs">{time}</p>
    </div>
  </motion.div>
);

// Performance Metrics Component
const PerformanceChart = () => {
  const [data] = useState([
    { label: 'React Components', value: 85 },
    { label: 'Three.js Performance', value: 92 },
    { label: 'Bundle Size', value: 78 },
    { label: 'Load Time', value: 89 },
  ]);

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.label} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">{item.label}</span>
            <span className="text-white font-medium">{item.value}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const AIDashboard = () => {
  const [activities] = useState([
    { action: 'AI Flow Graph updated', time: '2 minutes ago', status: 'success' },
    { action: 'New prompt template added', time: '15 minutes ago', status: 'success' },
    { action: 'Code review completed', time: '1 hour ago', status: 'success' },
    { action: 'Build deployment started', time: '2 hours ago', status: 'warning' },
    { action: 'Performance optimization', time: '3 hours ago', status: 'success' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">AI Dashboard</h1>
          <p className="text-gray-400">Real-time insights and project analytics</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Code}
            title="Active Projects"
            value="12"
            change="+3 this week"
            color="blue"
          />
          <StatCard
            icon={Users}
            title="AI Interactions"
            value="1.2K"
            change="+15% vs last month"
            color="green"
          />
          <StatCard
            icon={Cpu}
            title="Processing Time"
            value="1.2s"
            change="-0.3s improvement"
            color="purple"
          />
          <StatCard
            icon={Database}
            title="Data Processed"
            value="45GB"
            change="+12% this week"
            color="orange"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Metrics */}
          <motion.div
            className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Metrics
            </h3>
            <PerformanceChart />
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </h3>
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {activities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: GitBranch, label: 'New Flow', color: 'blue' },
              { icon: Code, label: 'Run Analysis', color: 'green' },
              { icon: Globe, label: 'Deploy Build', color: 'purple' },
              { icon: BarChart3, label: 'View Reports', color: 'orange' },
            ].map((action, index) => (
              <motion.button
                key={action.label}
                className={`p-4 bg-${action.color}-500/10 border border-${action.color}-500/20 rounded-lg hover:bg-${action.color}-500/20 transition-all text-left`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <action.icon className={`w-6 h-6 text-${action.color}-400 mb-2`} />
                <p className="text-white text-sm font-medium">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIDashboard;