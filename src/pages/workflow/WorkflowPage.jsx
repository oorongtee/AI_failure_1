import React from 'react';
import WorkflowTimeline from '../../components/Modules/WorkflowTimeline/WorkflowTimeline';

const WorkflowPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Development Workflow
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore the complete development workflow and processes used in modern software development
          </p>
        </div>
        
        <WorkflowTimeline />
      </div>
    </div>
  );
};

export default WorkflowPage;