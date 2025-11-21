import { useState, useEffect, useMemo } from 'react';

// Mock skill tree data with categories and connections
const generateSkillTreeData = () => {
  const skills = [
    // Frontend Skills
    { id: 'html', name: 'HTML5', level: 95, category: 'frontend', description: 'Semantic markup and modern HTML features', prerequisites: [] },
    { id: 'css', name: 'CSS3', level: 90, category: 'frontend', description: 'Advanced styling, flexbox, grid, animations', prerequisites: ['html'] },
    { id: 'javascript', name: 'JavaScript', level: 92, category: 'frontend', description: 'ES6+, async/await, closures, prototypes', prerequisites: ['html'] },
    { id: 'react', name: 'React', level: 88, category: 'frontend', description: 'Hooks, context, performance optimization', prerequisites: ['javascript'] },
    { id: 'nextjs', name: 'Next.js', level: 85, category: 'frontend', description: 'SSR, SSG, API routes, deployment', prerequisites: ['react'] },
    { id: 'typescript', name: 'TypeScript', level: 87, category: 'frontend', description: 'Type safety, interfaces, generics', prerequisites: ['javascript'] },
    
    // Backend Skills
    { id: 'nodejs', name: 'Node.js', level: 85, category: 'backend', description: 'Server-side JavaScript, npm ecosystem', prerequisites: ['javascript'] },
    { id: 'express', name: 'Express.js', level: 82, category: 'backend', description: 'RESTful APIs, middleware, routing', prerequisites: ['nodejs'] },
    { id: 'python', name: 'Python', level: 88, category: 'backend', description: 'Data structures, OOP, functional programming', prerequisites: [] },
    { id: 'django', name: 'Django', level: 78, category: 'backend', description: 'MVC, ORM, authentication, admin', prerequisites: ['python'] },
    { id: 'postgresql', name: 'PostgreSQL', level: 80, category: 'backend', description: 'Complex queries, indexing, performance tuning', prerequisites: [] },
    
    // DevOps Skills
    { id: 'docker', name: 'Docker', level: 83, category: 'devops', description: 'Containerization, multi-stage builds', prerequisites: [] },
    { id: 'kubernetes', name: 'Kubernetes', level: 75, category: 'devops', description: 'Container orchestration, scaling', prerequisites: ['docker'] },
    { id: 'aws', name: 'AWS', level: 79, category: 'devops', description: 'EC2, S3, Lambda, RDS, CloudFormation', prerequisites: [] },
    { id: 'cicd', name: 'CI/CD', level: 81, category: 'devops', description: 'GitHub Actions, Jenkins, automated testing', prerequisites: [] },
    
    // AI/ML Skills
    { id: 'machinelearning', name: 'Machine Learning', level: 76, category: 'ai', description: 'Supervised/unsupervised learning, model evaluation', prerequisites: ['python'] },
    { id: 'tensorflow', name: 'TensorFlow', level: 72, category: 'ai', description: 'Neural networks, deep learning models', prerequisites: ['machinelearning'] },
    { id: 'nlp', name: 'NLP', level: 74, category: 'ai', description: 'Text processing, sentiment analysis, transformers', prerequisites: ['machinelearning'] },
    { id: 'opencv', name: 'OpenCV', level: 68, category: 'ai', description: 'Computer vision, image processing', prerequisites: ['python'] },
    
    // Design Skills
    { id: 'figma', name: 'Figma', level: 82, category: 'design', description: 'UI/UX design, prototyping, design systems', prerequisites: [] },
    { id: 'photoshop', name: 'Photoshop', level: 75, category: 'design', description: 'Image editing, digital art, web graphics', prerequisites: [] },
    { id: 'uxdesign', name: 'UX Design', level: 78, category: 'design', description: 'User research, wireframing, usability testing', prerequisites: ['figma'] }
  ];

  const categories = {
    frontend: { name: 'Frontend', color: '#3b82f6', icon: '🎨' },
    backend: { name: 'Backend', color: '#10b981', icon: '⚙️' },
    devops: { name: 'DevOps', color: '#f59e0b', icon: '🚀' },
    ai: { name: 'AI/ML', color: '#8b5cf6', icon: '🤖' },
    design: { name: 'Design', color: '#ec4899', icon: '✨' }
  };

  return { skills, categories };
};

const useSkillTreeData = (filters = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState(new Set());
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { skills, categories } = generateSkillTreeData();
      setData({ skills, categories });
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  const filteredSkills = useMemo(() => {
    if (!data?.skills) return [];
    
    let filtered = data.skills;
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(skill => skill.category === filters.category);
    }
    
    if (filters.minLevel) {
      filtered = filtered.filter(skill => skill.level >= filters.minLevel);
    }
    
    if (filters.search) {
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        skill.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    return filtered;
  }, [data, filters]);
  
  const toggleSkillSelection = (skillId) => {
    setSelectedSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      return newSet;
    });
  };
  
  const getSkillConnections = (skillId) => {
    if (!data?.skills) return { prerequisites: [], dependents: [] };
    
    const skill = data.skills.find(s => s.id === skillId);
    const prerequisites = skill?.prerequisites || [];
    const dependents = data.skills
      .filter(s => s.prerequisites.includes(skillId))
      .map(s => s.id);
    
    return { prerequisites, dependents };
  };
  
  const getSkillStats = () => {
    if (!data?.skills) return { total: 0, byCategory: {}, averageLevel: 0 };
    
    const byCategory = {};
    let totalLevel = 0;
    
    data.skills.forEach(skill => {
      if (!byCategory[skill.category]) {
        byCategory[skill.category] = 0;
      }
      byCategory[skill.category]++;
      totalLevel += skill.level;
    });
    
    return {
      total: data.skills.length,
      byCategory,
      averageLevel: Math.round(totalLevel / data.skills.length)
    };
  };
  
  return {
    data,
    skills: filteredSkills,
    categories: data?.categories || {},
    selectedSkills,
    isLoading,
    toggleSkillSelection,
    getSkillConnections,
    getSkillStats,
    clearSelection: () => setSelectedSkills(new Set())
  };
};

export default useSkillTreeData;

// API Integration Guide:
// Replace generateSkillTreeData with real API call:
//
// const fetchSkillTreeData = async () => {
//   const response = await fetch('/api/skills');
//   return response.json();
// };
//
// Expected API Response Format:
// {
//   skills: [{
//     id: string,
//     name: string,
//     level: number (0-100),
//     category: string,
//     description: string,
//     prerequisites: string[], // array of skill IDs
//     certifications?: string[],
//     projects?: string[],
//     lastUsed?: string (ISO date)
//   }],
//   categories: {
//     [categoryId]: {
//       name: string,
//       color: string (hex),
//       icon: string (emoji or icon name)
//     }
//   }
// }