import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

// Footer Props Interface
interface FooterProps {
  className?: string;
}

// Social Links Data
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: Github,
    color: 'hover:text-gray-300'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: Linkedin,
    color: 'hover:text-blue-400'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: Twitter,
    color: 'hover:text-blue-300'
  },
  {
    name: 'Email',
    url: 'mailto:contact@example.com',
    icon: Mail,
    color: 'hover:text-green-400'
  }
];

// Quick Links Data
const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Workflow', href: '/workflow' }
];

// Project Links Data
const projectLinks = [
  { name: 'AI Flow Graph', href: '/ai-flow' },
  { name: 'Prompt Explorer', href: '/prompt-explorer' },
  { name: 'Diff Viewer', href: '/diff-viewer' },
  { name: 'Tech Radar', href: '/dashboard' }
];

// Footer Animation Variants
const footerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={`relative bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50 ${className}`}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-purple-900/30 via-slate-900/20 to-blue-900/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              Portfolio 2.0
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              An interactive 3D portfolio showcasing modern web development, 
              AI integration, and creative coding solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={`Visit ${social.name}`}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Project Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">
              Projects
            </h4>
            <nav className="space-y-2">
              {projectLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 text-sm group"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.name}
                  <ExternalLink 
                    size={12} 
                    className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact & Tech Stack */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">
              Tech Stack
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>React 19 + TypeScript</p>
              <p>Three.js + React Three Fiber</p>
              <p>Framer Motion</p>
              <p>TailwindCSS</p>
              <p>Vite + ESLint</p>
            </div>
            
            <div className="mt-6">
              <motion.button
                className="inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
                <Mail size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center text-gray-400 text-sm">
            <span>© {currentYear} Portfolio 2.0. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
              className="mx-1"
            >
              <Heart size={14} className="text-red-400" fill="currentColor" />
            </motion.div>
            <span>and lots of coffee</span>
          </div>

          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <motion.a 
              href="#privacy" 
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ y: -1 }}
            >
              Privacy Policy
            </motion.a>
            <span>•</span>
            <motion.a 
              href="#terms" 
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ y: -1 }}
            >
              Terms of Use
            </motion.a>
            <span>•</span>
            <motion.span
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              whileHover={{ y: -1 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top ↑
            </motion.span>
          </div>
        </motion.div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                bottom: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;