import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResumeTimeline from '../../components/resume/ResumeTimeline';
import ResumeBlock from '../../components/resume/ResumeBlock';

// Sample resume data
const resumeData = [
  {
    id: 'education-start',
    title: 'Computer Science Degree',
    company: 'National University',
    period: '2018-2022',
    type: 'education',
    position: { x: 10, y: 100 },
    achievements: [
      { label: 'GPA', value: '3.8/4.0' },
      { label: 'Dean\'s List', value: '6 semesters' },
      { label: 'Relevant Coursework', value: 'AI, ML, Data Structures' }
    ],
    description: 'Bachelor of Science in Computer Science with focus on Artificial Intelligence and Machine Learning',
    technologies: ['Python', 'Java', 'C++', 'Mathematics', 'Statistics'],
    highlights: [
      'Graduated Magna Cum Laude',
      'Led 5 group projects with 95% success rate',
      'Published research paper on neural networks'
    ]
  },
  {
    id: 'internship-1',
    title: 'Software Engineering Intern',
    company: 'TechCorp Solutions',
    period: '2021 Summer',
    type: 'internship',
    position: { x: 30, y: 150 },
    achievements: [
      { label: 'Code Reviews', value: '150+' },
      { label: 'Bug Fixes', value: '45' },
      { label: 'Features Shipped', value: '8' }
    ],
    description: 'Developed web applications and collaborated with senior developers on enterprise solutions',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Git'],
    highlights: [
      'Reduced page load time by 40%',
      'Implemented responsive design for mobile users',
      'Mentored 2 new interns'
    ]
  },
  {
    id: 'job-1',
    title: 'Frontend Developer',
    company: 'StartupCo',
    period: '2022-2023',
    type: 'job',
    position: { x: 50, y: 80 },
    achievements: [
      { label: 'Projects Delivered', value: '12' },
      { label: 'User Satisfaction', value: '4.8/5' },
      { label: 'Performance Boost', value: '60%' }
    ],
    description: 'Built responsive web applications and improved user experience for 10,000+ daily users',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Jest'],
    highlights: [
      'Led frontend architecture redesign',
      'Increased conversion rate by 35%',
      'Established component library used company-wide'
    ]
  },
  {
    id: 'job-2',
    title: 'Senior Full-Stack Developer',
    company: 'InnovateTech',
    period: '2023-Present',
    type: 'job',
    position: { x: 80, y: 120 },
    achievements: [
      { label: 'Team Leadership', value: '5 developers' },
      { label: 'System Uptime', value: '99.9%' },
      { label: 'Cost Reduction', value: '30%' }
    ],
    description: 'Leading development of scalable applications and mentoring junior developers',
    technologies: ['React', 'Node.js', 'Python', 'Docker', 'Kubernetes', 'AWS'],
    highlights: [
      'Architected microservices handling 1M+ requests/day',
      'Reduced infrastructure costs by $50k annually',
      'Implemented CI/CD pipeline improving deployment speed by 80%'
    ]
  }
];

const ResumePage = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBlockSelect = (block) => {
    setSelectedBlock(block);
    const index = resumeData.findIndex(item => item.id === block.id);
    setCurrentIndex(index);
  };

  const navigateTimeline = (direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, resumeData.length - 1)
      : Math.max(currentIndex - 1, 0);
    
    setCurrentIndex(newIndex);
    setSelectedBlock(resumeData[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowRight') {
        navigateTimeline('next');
      } else if (event.key === 'ArrowLeft') {
        navigateTimeline('prev');
      } else if (event.key === 'Escape') {
        setSelectedBlock(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Interactive{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Resume
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-6">
            Journey through my professional timeline with interactive milestones and achievements
          </p>
          <p className="text-sm text-white/50">
            Use arrow keys to navigate • Click on timeline nodes for details
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          <ResumeTimeline 
            data={resumeData}
            onBlockSelect={handleBlockSelect}
            selectedBlock={selectedBlock}
            currentIndex={currentIndex}
          />
        </div>

        {/* Selected Block Detail */}
        {selectedBlock && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <ResumeBlock 
              block={selectedBlock}
              onClose={() => setSelectedBlock(null)}
              onNavigate={navigateTimeline}
              canNavigateNext={currentIndex < resumeData.length - 1}
              canNavigatePrev={currentIndex > 0}
            />
          </motion.div>
        )}

        {/* Navigation Instructions */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 inline-block">
            <h3 className="text-white font-medium mb-3">Navigation Guide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/70">
                <kbd className="px-2 py-1 bg-slate-700/50 rounded text-xs">←</kbd>
                <span>Previous</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <kbd className="px-2 py-1 bg-slate-700/50 rounded text-xs">→</kbd>
                <span>Next</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <kbd className="px-2 py-1 bg-slate-700/50 rounded text-xs">Click</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <kbd className="px-2 py-1 bg-slate-700/50 rounded text-xs">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePage;

// Data Integration Guide:
// Replace resumeData with API call:
//
// const fetchResumeData = async () => {
//   const response = await fetch('/api/resume');
//   return response.json();
// };
//
// Expected API Response Format:
// {
//   timeline: [{
//     id: string,
//     title: string,
//     company: string,
//     period: string,
//     type: 'education' | 'internship' | 'job' | 'project',
//     position: { x: number, y: number }, // SVG coordinates
//     achievements: [{ label: string, value: string }],
//     description: string,
//     technologies: string[],
//     highlights: string[]
//   }]
// }