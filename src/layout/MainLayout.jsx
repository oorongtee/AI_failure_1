import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigation from './TopNavigation';
import SideNavigation from './SideNavigation';
import Footer from './Footer';
import { animationPresets } from '../design-system';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Enhanced page transition variants with sci-fi effects
  const pageVariants = {
    initial: { opacity: 0, x: -50, scale: 0.95 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: 50, scale: 0.95 }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 0.8
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic text-neutral-0">
      {/* Enhanced Cosmic Background */}
      <div className="fixed inset-0 z-0">
        {/* Cosmic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-holographic opacity-30 animate-hologram" />
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-20" />
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-secondary-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Navigation */}
      <TopNavigation 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex relative z-10">
        {/* Side Navigation */}
        <SideNavigation 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main Content Area */}
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          } pt-16`}
        >
          {/* Page Content with Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-[calc(100vh-4rem)]"
            >
              <div className="container mx-auto px-4 py-8">
                <Outlet />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;