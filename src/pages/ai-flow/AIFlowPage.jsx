import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import AIFlowGraph from '../components/Modules/AIFlowGraph/AIFlowGraph';
import Loader from '../components/UI/Common/Loader';

const AIFlowPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full"
    >
      <Suspense fallback={<Loader />}>
        <AIFlowGraph />
      </Suspense>
    </motion.div>
  );
};

export default AIFlowPage;