import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '../design-system';
import { ArrowDown, Code, Zap, Palette, Brain, Globe, Sparkles } from 'lucide-react';

const Landing: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: "Modern Development",
      description: "React 19, TypeScript, and cutting-edge tools for exceptional user experiences."
    },
    {
      icon: Brain,
      title: "AI Integration", 
      description: "Intelligent features powered by advanced AI models and machine learning."
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Beautiful interfaces with 3D graphics and smooth animations."
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for speed with efficient rendering and smart caching."
    },
    {
      icon: Globe,
      title: "Global Ready",
      description: "Responsive design that works perfectly across all devices and platforms."
    },
    {
      icon: Sparkles,
      title: "Innovation Focus",
      description: "Exploring the latest technologies and pushing creative boundaries."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Avatar */}
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-cyber flex items-center justify-center text-6xl animate-float"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              👋
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-6xl lg:text-8xl font-display font-bold mb-6 animate-glow-pulse"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hello, I'm{' '}
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                Ray Chen
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-2xl lg:text-3xl text-neutral-300 mb-8 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              🎯 Senior Frontend Architect & 🤖 AI-Human Collaboration Expert
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { label: 'Experience', value: '5+ Years', icon: '💼' },
                { label: 'Projects', value: '50+', icon: '🚀' },
                { label: 'AI Prompts', value: '100+', icon: '🤖' },
                { label: 'Satisfaction', value: '95%', icon: '⭐' },
              ].map((stat, index) => (
                <Card key={index} className="p-6 text-center group hover:glow">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-primary-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400">{stat.label}</div>
                </Card>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button variant="primary" size="lg">
                🔍 Explore My Work
              </Button>
              <Button variant="secondary" size="lg">
                📄 Download CV
              </Button>
              <Button variant="accent" size="lg">
                🤝 Let's Connect
              </Button>
              <Button variant="outline" size="lg">
                📱 Follow Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center text-neutral-400"
            >
              <p className="text-sm mb-2">Scroll to explore</p>
              <ArrowDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-display font-bold mb-6">
              What Makes It{' '}
              <span className="bg-gradient-holographic bg-clip-text text-transparent animate-hologram">
                Special
              </span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Built with modern technologies and innovative approaches to deliver exceptional user experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card variant="glass" className="p-8 h-full group hover:glow-cyan">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-cyber rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} className="text-neutral-0" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-neutral-0 mb-4 group-hover:text-accent-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-holographic opacity-10 animate-hologram pointer-events-none" />
      </section>

      {/* Design System Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              Sci-Fi Universe{' '}
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                Design System
              </span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-12">
              Experience the future with our cosmic design system featuring holographic effects, cyber aesthetics, and quantum animations
            </p>
          </motion.div>

          {/* Button Variants Demo */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-semibold text-center mb-8">Interactive Components</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg">Primary Button</Button>
              <Button variant="secondary" size="lg">Secondary Button</Button>
              <Button variant="accent" size="lg">Accent Button</Button>
              <Button variant="ghost" size="lg">Ghost Button</Button>
              <Button variant="outline" size="lg">Outline Button</Button>
            </div>
          </motion.div>

          {/* Card Variants Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-display font-semibold text-center mb-8">Card Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card variant="default" className="p-8 text-center">
                <h4 className="text-xl font-semibold mb-4">Default Card</h4>
                <p className="text-neutral-300">Standard cosmic card with subtle glow effects</p>
              </Card>
              <Card variant="glass" className="p-8 text-center">
                <h4 className="text-xl font-semibold mb-4">Glass Card</h4>
                <p className="text-neutral-300">Glassmorphism effect with blur backdrop</p>
              </Card>
              <Card variant="holographic" className="p-8 text-center">
                <h4 className="text-xl font-semibold mb-4">Holographic Card</h4>
                <p className="text-neutral-300">Animated holographic background gradient</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;