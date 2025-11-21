import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Download,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  Github,
  Linkedin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Expandable Section Component
const ExpandableSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
      layout
    >
      <motion.button
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Experience Item Component
const ExperienceItem = ({ title, company, duration, description, technologies }) => (
  <motion.div
    className="border-l-2 border-blue-500 pl-4 pb-6"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <h4 className="text-white font-semibold">{title}</h4>
    <p className="text-blue-400 text-sm">{company}</p>
    <p className="text-gray-400 text-xs mb-2">{duration}</p>
    <p className="text-gray-300 text-sm mb-3">{description}</p>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
        >
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
);

// Skill Bar Component
const SkillBar = ({ skill, level, delay = 0 }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-gray-300 text-sm">{skill}</span>
      <span className="text-white text-sm font-medium">{level}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ delay, duration: 0.8 }}
      />
    </div>
  </div>
);

const InteractiveResume = () => {
  const [activeView, setActiveView] = useState('overview');

  const personalInfo = {
    name: 'Ray Chen',
    title: 'Senior Frontend Architect & Three.js Specialist',
    email: 'ray.chen@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://raychen.dev',
    github: 'https://github.com/raychen',
    linkedin: 'https://linkedin.com/in/raychen'
  };

  const experiences = [
    {
      title: 'Senior Frontend Architect',
      company: 'TechCorp Inc.',
      duration: '2022 - Present',
      description: 'Leading frontend architecture for AI-powered applications, specializing in Three.js and WebGL implementations.',
      technologies: ['React', 'Three.js', 'TypeScript', 'WebGL', 'Node.js']
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      duration: '2020 - 2022',
      description: 'Developed scalable web applications with modern tech stack, focusing on performance optimization.',
      technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Docker', 'AWS']
    },
    {
      title: 'Frontend Developer',
      company: 'DesignStudio',
      duration: '2018 - 2020',
      description: 'Created interactive websites and digital experiences for creative agencies and brands.',
      technologies: ['JavaScript', 'GSAP', 'SCSS', 'WebGL', 'Canvas']
    }
  ];

  const skills = [
    { skill: 'React/Next.js', level: 95 },
    { skill: 'Three.js/WebGL', level: 90 },
    { skill: 'TypeScript', level: 88 },
    { skill: 'Node.js', level: 85 },
    { skill: 'Python', level: 80 },
    { skill: 'UI/UX Design', level: 75 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Photo and Contact */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Photo */}
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <User className="w-16 h-16 text-white" />
            </motion.div>

            {/* Contact Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{personalInfo.name}</h1>
              <p className="text-blue-400 text-lg mb-4">{personalInfo.title}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{personalInfo.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{personalInfo.website}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <motion.button
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </motion.button>
              
              <div className="flex space-x-2">
                <motion.a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resume Sections */}
        <div className="space-y-6">
          {/* Experience Section */}
          <ExpandableSection title="Professional Experience" icon={Briefcase} defaultOpen={true}>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <ExperienceItem key={index} {...exp} />
              ))}
            </div>
          </ExpandableSection>

          {/* Skills Section */}
          <ExpandableSection title="Technical Skills" icon={Code} defaultOpen={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <SkillBar key={skill.skill} {...skill} delay={index * 0.1} />
              ))}
            </div>
          </ExpandableSection>

          {/* Education Section */}
          <ExpandableSection title="Education & Certifications" icon={GraduationCap}>
            <div className="space-y-4">
              <motion.div
                className="border-l-2 border-green-500 pl-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h4 className="text-white font-semibold">Master of Computer Science</h4>
                <p className="text-green-400 text-sm">Stanford University</p>
                <p className="text-gray-400 text-xs">2016 - 2018</p>
              </motion.div>
              
              <motion.div
                className="border-l-2 border-purple-500 pl-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-white font-semibold">AWS Solutions Architect</h4>
                <p className="text-purple-400 text-sm">Amazon Web Services</p>
                <p className="text-gray-400 text-xs">2021</p>
              </motion.div>
            </div>
          </ExpandableSection>

          {/* Awards Section */}
          <ExpandableSection title="Awards & Recognition" icon={Award}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Best Frontend Innovation', org: 'TechCorp Awards 2023' },
                { title: 'WebGL Excellence Award', org: 'Three.js Community 2022' },
                { title: 'Open Source Contributor', org: 'GitHub Stars 2021' },
                { title: 'UI/UX Design Excellence', org: 'Design Awards 2020' },
              ].map((award, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="text-white font-medium text-sm">{award.title}</h4>
                  <p className="text-yellow-400 text-xs">{award.org}</p>
                </motion.div>
              ))}
            </div>
          </ExpandableSection>
        </div>
      </div>
    </div>
  );
};

export default InteractiveResume;