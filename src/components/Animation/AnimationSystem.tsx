import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { animationTokens } from '../../utils/motionVariants';

// Animation Context Types
interface AnimationConfig {
  reduceMotion: boolean;
  globalDuration: number;
  globalEasing: string;
  enablePageTransitions: boolean;
  enable3DEffects: boolean;
  enableParallax: boolean;
  enableGestures: boolean;
}

interface AnimationContextType {
  config: AnimationConfig;
  updateConfig: (newConfig: Partial<AnimationConfig>) => void;
  isAnimationEnabled: (type: keyof AnimationConfig) => boolean;
  getDuration: (key: keyof typeof animationTokens.duration) => number;
  getEasing: (key: keyof typeof animationTokens.easing) => readonly number[];
}

// Default animation configuration
const defaultConfig: AnimationConfig = {
  reduceMotion: false,
  globalDuration: 1,
  globalEasing: 'easeOut',
  enablePageTransitions: true,
  enable3DEffects: true,
  enableParallax: true,
  enableGestures: true,
};

// Create Animation Context
const AnimationContext = createContext<AnimationContextType | null>(null);

// Animation Provider Props
interface AnimationProviderProps {
  children: ReactNode;
  initialConfig?: Partial<AnimationConfig>;
}

// Animation Provider Component
export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
  initialConfig = {},
}) => {
  const [config, setConfig] = useState<AnimationConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  // Check user's motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({
        ...prev,
        reduceMotion: e.matches,
      }));
    };
    
    // Set initial value
    setConfig(prev => ({
      ...prev,
      reduceMotion: mediaQuery.matches,
    }));
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update configuration
  const updateConfig = (newConfig: Partial<AnimationConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig,
    }));
  };

  // Check if specific animation type is enabled
  const isAnimationEnabled = (type: keyof AnimationConfig): boolean => {
    if (config.reduceMotion) return false;
    return config[type] as boolean;
  };

  // Get duration with global multiplier
  const getDuration = (key: keyof typeof animationTokens.duration): number => {
    const baseDuration = animationTokens.duration[key];
    return config.reduceMotion ? 0 : baseDuration * config.globalDuration;
  };

  // Get easing configuration
  const getEasing = (key: keyof typeof animationTokens.easing): readonly number[] => {
    return animationTokens.easing[key];
  };

  const contextValue: AnimationContextType = {
    config,
    updateConfig,
    isAnimationEnabled,
    getDuration,
    getEasing,
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </AnimationContext.Provider>
  );
};

// Hook to use animation context
export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

// Higher-Order Component for animated components
export const withAnimation = <T extends object>(
  Component: React.ComponentType<T>,
  animationType: keyof AnimationConfig = 'enablePageTransitions'
) => {
  const WrappedComponent = React.forwardRef<any, T>((props, _ref) => {
    const { isAnimationEnabled } = useAnimation();
    
    if (!isAnimationEnabled(animationType)) {
      return React.createElement(Component, { ...props } as T);
    }
    
    return React.createElement(Component, { ...props } as T);
  });
  
  WrappedComponent.displayName = `withAnimation(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Animation Control Component
export const AnimationControls: React.FC = () => {
  const { config, updateConfig } = useAnimation();

  return (
    <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 z-50">
      <h3 className="text-white font-semibold mb-3">Animation Settings</h3>
      
      <div className="space-y-2 text-sm">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.reduceMotion}
            onChange={(e) => updateConfig({ reduceMotion: e.target.checked })}
            className="rounded"
          />
          <span className="text-white">Reduce Motion</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.enablePageTransitions}
            onChange={(e) => updateConfig({ enablePageTransitions: e.target.checked })}
            className="rounded"
          />
          <span className="text-white">Page Transitions</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.enable3DEffects}
            onChange={(e) => updateConfig({ enable3DEffects: e.target.checked })}
            className="rounded"
          />
          <span className="text-white">3D Effects</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.enableParallax}
            onChange={(e) => updateConfig({ enableParallax: e.target.checked })}
            className="rounded"
          />
          <span className="text-white">Parallax</span>
        </label>
        
        <div className="mt-3">
          <label className="block text-white text-xs mb-1">Duration Multiplier</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={config.globalDuration}
            onChange={(e) => updateConfig({ globalDuration: parseFloat(e.target.value) })}
            title={`Animation Duration Multiplier: ${config.globalDuration}x`}
            className="w-full"
          />
          <span className="text-xs text-gray-400">{config.globalDuration}x</span>
        </div>
      </div>
    </div>
  );
};

// Prefersced motion utility
export const shouldAnimate = (config: AnimationConfig): boolean => {
  return !config.reduceMotion;
};

// Animation debugging component
export const AnimationDebugger: React.FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  const { config } = useAnimation();
  
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      <div className="absolute top-0 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded">
        {label} - {config.reduceMotion ? 'Static' : 'Animated'}
      </div>
    </div>
  );
};

// Performance monitoring for animations
export const useAnimationPerformance = () => {
  const [fps, setFPS] = React.useState<number>(0);
  const [isHeavyAnimation, setIsHeavyAnimation] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const now = performance.now();
      
      if (now - lastTime >= 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (now - lastTime));
        setFPS(currentFPS);
        setIsHeavyAnimation(currentFPS < 30);
        
        frameCount = 0;
        lastTime = now;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    const rafId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(rafId);
  }, []);
  
  return { fps, isHeavyAnimation };
};

// Export animation system
export default {
  AnimationProvider,
  useAnimation,
  withAnimation,
  AnimationControls,
  AnimationDebugger,
  useAnimationPerformance,
  shouldAnimate,
};