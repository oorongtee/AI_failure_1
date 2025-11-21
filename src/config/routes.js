// Navigation routes configuration with lazy loading
import { lazy } from 'react';

// Lazy load page components for better performance
const DashboardPage = lazy(() => import('../pages/ai-flow/DashboardPage.jsx'));
const ResumePage = lazy(() => import('../pages/resume/ResumePage.jsx'));
const SkillTreePage = lazy(() => import('../pages/skill-tree/SkillTreePage.jsx'));
const TechRadarPage = lazy(() => import('../pages/tech-radar/TechRadarPage.jsx'));
const SkillHeatmapPage = lazy(() => import('../pages/skill-heatmap/SkillHeatmapPage.jsx'));
const PromptExplorerPage = lazy(() => import('../pages/prompt-explorer/PromptExplorerPage.tsx'));
const DiffViewerPage = lazy(() => import('../pages/diff-viewer/DiffViewerPage.tsx'));
const AIFlowPage = lazy(() => import('../pages/ai-flow/AIFlowPage.jsx'));
const WorkflowPage = lazy(() => import('../pages/workflow/WorkflowPage.jsx'));
const About = lazy(() => import('../pages/About.tsx'));
const Landing = lazy(() => import('../pages/Landing.tsx'));

// Route configuration with metadata
export const routes = [
  {
    path: '/',
    element: Landing,
    name: 'Landing',
    description: 'Welcome page with portfolio overview',
    category: 'main',
    showInNav: true,
    icon: 'Home'
  },
  {
    path: '/about',
    element: About,
    name: 'About',
    description: 'Personal background and story',
    category: 'main',
    showInNav: true,
    icon: 'User'
  },

  {
    path: '/dashboard',
    element: DashboardPage,
    name: 'AI Dashboard',
    description: 'Analytics and KPI monitoring',
    category: 'ai',
    showInNav: true,
    icon: 'BarChart3'
  },
  {
    path: '/resume',
    element: ResumePage,
    name: 'Interactive Resume',
    description: 'Timeline-based professional journey',
    category: 'portfolio',
    showInNav: true,
    icon: 'FileText'
  },
  {
    path: '/skill-tree',
    element: SkillTreePage,
    name: 'Skill Tree',
    description: 'Interactive technology skill mapping',
    category: 'visualization',
    showInNav: true,
    icon: 'GitBranch'
  },
  {
    path: '/tech-radar',
    element: TechRadarPage,
    name: 'Tech Radar',
    description: 'Technology adoption and assessment',
    category: 'visualization',
    showInNav: true,
    icon: 'Radar'
  },
  {
    path: '/skill-heatmap',
    element: SkillHeatmapPage,
    name: 'Skill Heatmap',
    description: 'Daily skill usage patterns',
    category: 'visualization',
    showInNav: true,
    icon: 'Calendar'
  },
  {
    path: '/ai-flow',
    element: AIFlowPage,
    name: 'AI Flow',
    description: 'AI workflow visualization',
    category: 'ai',
    showInNav: true,
    icon: 'Workflow'
  },
  {
    path: '/prompt-explorer',
    element: PromptExplorerPage,
    name: 'Prompt Explorer',
    description: 'AI prompt engineering tool',
    category: 'ai',
    showInNav: false,
    icon: 'MessageSquare'
  },
  {
    path: '/diff-viewer',
    element: DiffViewerPage,
    name: 'Diff Viewer',
    description: 'Code difference visualization',
    category: 'tools',
    showInNav: false,
    icon: 'FileText'
  },
  {
    path: '/workflow',
    element: WorkflowPage,
    name: 'Workflow',
    description: 'Development process visualization',
    category: 'tools',
    showInNav: false,
    icon: 'Workflow'
  }
];

// Group routes by category for navigation
export const routesByCategory = routes.reduce((acc, route) => {
  if (!acc[route.category]) {
    acc[route.category] = [];
  }
  acc[route.category].push(route);
  return acc;
}, {});

// Get visible routes for main navigation
export const getMainNavRoutes = () => {
  return routes.filter(route => route.showInNav && route.category === 'main');
};

// Get routes for specific category
export const getRoutesByCategory = (category) => {
  return routes.filter(route => route.category === category);
};

// Find route by path
export const findRouteByPath = (path) => {
  return routes.find(route => route.path === path);
};