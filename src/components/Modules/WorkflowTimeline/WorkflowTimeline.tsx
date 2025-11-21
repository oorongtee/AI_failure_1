import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code, 
  Palette, 
  TestTube, 
  Rocket, 
  CheckCircle,
  Clock,
  Users,
  Target,
  Layers,
  Settings
} from 'lucide-react';

// Workflow Data
interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'completed' | 'in-progress' | 'pending';
  duration: string;
  details: string[];
  technologies: string[];
  color: string;
  gradient: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'planning',
    title: 'Project Planning & Research',
    description: 'Strategic planning, requirement analysis, and technology research phase',
    icon: Target,
    status: 'completed',
    duration: '1-2 weeks',
    details: [
      'Stakeholder interviews and requirement gathering',
      'Market research and competitive analysis',
      'Technical feasibility assessment',
      'Project scope and timeline definition',
      'Risk assessment and mitigation strategies'
    ],
    technologies: ['Figma', 'Notion', 'Miro', 'Slack'],
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'design',
    title: 'UI/UX Design & Prototyping',
    description: 'Creating intuitive interfaces and engaging user experiences',
    icon: Palette,
    status: 'completed',
    duration: '2-3 weeks',
    details: [
      'User journey mapping and wireframing',
      'High-fidelity mockups and design systems',
      'Interactive prototypes and user testing',
      'Accessibility compliance and responsive design',
      'Design handoff and component documentation'
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Principle', 'InVision'],
    color: 'from-purple-500 to-pink-500',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'architecture',
    title: 'System Architecture & Planning',
    description: 'Designing scalable and maintainable system architecture',
    icon: Layers,
    status: 'completed',
    duration: '1 week',
    details: [
      'Database schema design and optimization',
      'API architecture and endpoint planning',
      'Security considerations and implementations',
      'Performance optimization strategies',
      'DevOps and deployment pipeline setup'
    ],
    technologies: ['AWS', 'Docker', 'PostgreSQL', 'Redis', 'Nginx'],
    color: 'from-green-500 to-emerald-500',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'development',
    title: 'Core Development & Implementation',
    description: 'Building robust features with modern technologies',
    icon: Code,
    status: 'in-progress',
    duration: '4-6 weeks',
    details: [
      'Frontend development with React and TypeScript',
      'Backend API development and integration',
      'Database implementation and optimization',
      'Third-party service integrations',
      'Code reviews and refactoring'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'MongoDB'],
    color: 'from-orange-500 to-red-500',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: 'testing',
    title: 'Quality Assurance & Testing',
    description: 'Comprehensive testing to ensure reliability and performance',
    icon: TestTube,
    status: 'pending',
    duration: '2 weeks',
    details: [
      'Unit testing and integration testing',
      'End-to-end testing automation',
      'Performance and load testing',
      'Security vulnerability assessments',
      'Cross-browser and device compatibility testing'
    ],
    technologies: ['Jest', 'Cypress', 'Playwright', 'Lighthouse', 'OWASP ZAP'],
    color: 'from-indigo-500 to-purple-500',
    gradient: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    id: 'deployment',
    title: 'Deployment & Launch',
    description: 'Seamless deployment and production launch with monitoring',
    icon: Rocket,
    status: 'pending',
    duration: '1 week',
    details: [
      'Production environment setup',
      'CI/CD pipeline configuration',
      'Performance monitoring and alerting',
      'User training and documentation',
      'Post-launch support and maintenance'
    ],
    technologies: ['Vercel', 'AWS', 'GitHub Actions', 'Sentry', 'Analytics'],
    color: 'from-teal-500 to-green-500',
    gradient: 'from-teal-500/20 to-green-500/20'
  }
];

// Status Icons
const statusIcons = {
  completed: CheckCircle,
  'in-progress': Clock,
  pending: Settings
};

// Timeline Step Component
interface TimelineStepProps {
  step: WorkflowStep;
  index: number;
  isLast: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, index, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const StatusIcon = statusIcons[step.status];
  const StepIcon = step.icon;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -100 : 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1
    }
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1
    }
  };

  const getStatusColor = () => {
    switch (step.status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-8 top-20 w-0.5 h-32 bg-gradient-to-b from-slate-600 via-slate-700 to-transparent" />
      )}

      <motion.div
        className="flex items-start gap-6 mb-12"
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Timeline Node */}
        <div className="relative flex-shrink-0">
          <motion.div 
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <StepIcon className="w-8 h-8 text-white" />
          </motion.div>
          
          {/* Status Indicator */}
          <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center ${getStatusColor()}`}>
            <StatusIcon className="w-3 h-3" />
          </div>
        </div>

        {/* Content Card */}
        <motion.div 
          className="flex-1 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
          whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
        >
          <div className={`h-1 bg-gradient-to-r ${step.color}`} />
          
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full bg-slate-700 ${getStatusColor()}`}>
                    {step.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-white/70 mb-3">{step.description}</p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {step.duration}
                  </span>
                </div>
              </div>
              
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm text-white/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? 'Less' : 'More'}
              </motion.button>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {step.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Expandable Details */}
            <motion.div
              variants={expandVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-slate-700/50">
                <h4 className="text-sm font-medium text-white/90 mb-3">Key Activities:</h4>
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-white/70"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Main Timeline Component
const WorkflowTimeline: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const headerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={containerRef}
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Development{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Workflow
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            A comprehensive overview of my development process, from initial planning to successful deployment
          </p>
          
          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">3</div>
              <div className="text-sm text-white/70">Completed</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-400 mb-1">1</div>
              <div className="text-sm text-white/70">In Progress</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-400 mb-1">2</div>
              <div className="text-sm text-white/70">Pending</div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {workflowSteps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === workflowSteps.length - 1}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-white/70 mb-6">
              Let's collaborate to bring your ideas to life with this proven development workflow.
            </p>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Let's Collaborate
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkflowTimeline;