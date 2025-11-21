import React from 'react';
import { motion } from 'framer-motion';
import SkillTreeMain from '../../components/Modules/SkillTree/SkillTreeMain';

const SkillTreePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SkillTreeMain />
    </motion.div>
  );
};

export default SkillTreePage;