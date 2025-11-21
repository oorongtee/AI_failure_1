import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen pt-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          About Me
        </h1>
        <p className="text-center text-white/60">
          Coming Soon - Interactive Resume & Skill Tree
        </p>
      </div>
    </motion.div>
  );
};

export default About;