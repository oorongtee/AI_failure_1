import React from 'react';
import { motion } from 'framer-motion';
import SkillHeatmap from '../../components/Modules/SkillHeatmap/SkillHeatmap';

const SkillHeatmapPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SkillHeatmap />
    </motion.div>
  );
};

export default SkillHeatmapPage;