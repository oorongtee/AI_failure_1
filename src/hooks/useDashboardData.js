import { useState, useEffect, useMemo } from 'react';

// Mock API data generator
const generateUsageData = (days = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      usage: Math.floor(Math.random() * 50) + 10,
      aiCalls: Math.floor(Math.random() * 20) + 5,
      prompts: Math.floor(Math.random() * 15) + 3,
      timeSaved: Math.floor(Math.random() * 120) + 30
    });
  }
  
  return data;
};

const mockKPIs = {
  aiToolsUsed: 8,
  averageTimeSaved: 45.5, // minutes
  weeklyUsage: 127,
  activePrompts: 23,
  totalSessions: 456,
  successRate: 94.2
};

const mockToolUsage = [
  { name: 'GPT-4', count: 89, icon: 'brain', trend: 12 },
  { name: 'Claude-3', count: 67, icon: 'message-circle', trend: -3 },
  { name: 'Copilot', count: 134, icon: 'code', trend: 8 },
  { name: 'DALL-E', count: 23, icon: 'image', trend: 5 },
  { name: 'Midjourney', count: 45, icon: 'palette', trend: 15 },
  { name: 'Whisper', count: 12, icon: 'mic', trend: -1 },
  { name: 'Embeddings', count: 78, icon: 'layers', trend: 22 },
  { name: 'Function Calls', count: 156, icon: 'zap', trend: 18 }
];

const useDashboardData = (filters = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  // Simulate API call
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const usageData = generateUsageData(30);
        
        setData({
          kpis: mockKPIs,
          usageChart: usageData,
          toolUsage: mockToolUsage,
          lastUpdated: new Date().toISOString()
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);
  
  // Filter data based on selected tool
  const filteredData = useMemo(() => {
    if (!data || !filters.tool) return data;
    
    return {
      ...data,
      usageChart: data.usageChart.map(item => ({
        ...item,
        // Adjust usage based on tool filter
        usage: Math.floor(item.usage * (Math.random() * 0.5 + 0.5))
      })),
      toolUsage: data.toolUsage.filter(tool => 
        tool.name.toLowerCase().includes(filters.tool.toLowerCase())
      )
    };
  }, [data, filters]);
  
  return {
    data: filteredData,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      // Trigger re-fetch
      setTimeout(() => setIsLoading(false), 500);
    }
  };
};

export default useDashboardData;

// API Integration Guide:
// Replace the mock data with real API calls:
//
// const fetchDashboardData = async (filters) => {
//   const response = await fetch('/api/dashboard', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(filters)
//   });
//   return response.json();
// };
//
// Expected API Response Format:
// {
//   kpis: {
//     aiToolsUsed: number,
//     averageTimeSaved: number,
//     weeklyUsage: number,
//     activePrompts: number,
//     totalSessions: number,
//     successRate: number
//   },
//   usageChart: [{
//     date: string (YYYY-MM-DD),
//     usage: number,
//     aiCalls: number,
//     prompts: number,
//     timeSaved: number
//   }],
//   toolUsage: [{
//     name: string,
//     count: number,
//     icon: string,
//     trend: number (percentage)
//   }],
//   lastUpdated: string (ISO date)
// }