// Sci-Fi Universe Design System
// Complete design system export for cosmic/sci-fi themed portfolio

import { theme } from './theme';
import { 
  Button, 
  Card, 
  Input, 
  Badge, 
  Progress, 
  Spinner 
} from './components';

export { theme, Button, Card, Input, Badge, Progress, Spinner };
export type * from './types';

// Re-export theme utilities for easy access
export const { colors, typography, spacing, borderRadius, animation } = theme;

// Common utility functions
export const getColorValue = (color: string, shade?: number) => {
  if (shade && color in colors) {
    const colorPalette = colors[color as keyof typeof colors];
    if (typeof colorPalette === 'object' && shade in colorPalette) {
      return colorPalette[shade as keyof typeof colorPalette];
    }
  }
  return color;
};

export const getSpacingValue = (spacing: string | number) => {
  if (typeof spacing === 'number') return `${spacing}px`;
  if (typeof spacing === 'string' && spacing in theme.spacing) {
    return theme.spacing[spacing as keyof typeof theme.spacing];
  }
  return spacing;
};

export const getShadowValue = (shadow: string) => {
  const shadowMap = {
    glow: '0 0 20px rgb(132 61 255 / 0.5)',
    glowCyan: '0 0 20px rgb(34 211 238 / 0.5)',
    glowGreen: '0 0 20px rgb(34 197 94 / 0.5)',
    glowOrange: '0 0 20px rgb(249 115 22 / 0.5)'
  };
  return shadowMap[shadow as keyof typeof shadowMap] || shadow;
};

// Animation presets for common sci-fi effects
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: animation.easing.quantum }
  },
  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { duration: 0.5, ease: animation.easing.cyber }
  },
  slideDown: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
    transition: { duration: 0.5, ease: animation.easing.cyber }
  },
  slideLeft: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
    transition: { duration: 0.4, ease: animation.easing.warp }
  },
  slideRight: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.4, ease: animation.easing.warp }
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.3, ease: animation.easing.quantum }
  },
  scaleOut: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
    transition: { duration: 0.3, ease: animation.easing.quantum }
  },
  rotateIn: {
    initial: { rotate: -180, scale: 0.8, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: 180, scale: 0.8, opacity: 0 },
    transition: { duration: 0.6, ease: animation.easing.cyber }
  },
  cyber: {
    whileHover: {
      x: [0, -2, 2, -1, 0],
      filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(180deg)', 'hue-rotate(270deg)', 'hue-rotate(0deg)'],
      transition: { duration: 0.5, ease: animation.easing.cyber }
    }
  },
  quantum: {
    whileHover: {
      scale: [1, 1.02, 0.98, 1.01, 1],
      rotate: [0, 1, -1, 0.5, 0],
      transition: { duration: 0.8, ease: animation.easing.quantum }
    }
  },
  hologram: {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity
    }
  },
  float: {
    animate: {
      y: [0, -20, 0],
    },
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity
    }
  },
  glowPulse: {
    animate: {
      boxShadow: [
        '0 0 5px rgb(132 61 255 / 0.5), 0 0 10px rgb(132 61 255 / 0.3), 0 0 15px rgb(132 61 255 / 0.2)',
        '0 0 10px rgb(132 61 255 / 0.8), 0 0 20px rgb(132 61 255 / 0.5), 0 0 30px rgb(132 61 255 / 0.3)',
        '0 0 5px rgb(132 61 255 / 0.5), 0 0 10px rgb(132 61 255 / 0.3), 0 0 15px rgb(132 61 255 / 0.2)'
      ]
    },
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

// CSS class generators
export const generateGlowClass = (color: string = 'primary') => {
  const colorMap = {
    primary: 'shadow-glow',
    accent: 'shadow-glow-cyan',
    success: 'shadow-glow-green',
    warning: 'shadow-glow-orange'
  };
  return colorMap[color as keyof typeof colorMap] || 'shadow-glow';
};

export const generateGradientClass = (type: 'cosmic' | 'cyber' | 'holographic' = 'cosmic') => {
  const gradientMap = {
    cosmic: 'bg-gradient-cosmic',
    cyber: 'bg-gradient-cyber', 
    holographic: 'bg-gradient-holographic'
  };
  return gradientMap[type];
};

// Responsive breakpoints
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Design system version and metadata
export const designSystemInfo = {
  name: 'Sci-Fi Universe Design System',
  version: '1.0.0',
  theme: 'Cosmic/Space/Sci-Fi',
  author: 'Ray Portfolio 2.0',
  description: 'A comprehensive design system for creating futuristic, sci-fi themed user interfaces with cosmic aesthetics'
};

export default {
  theme,
  Button,
  Card,
  Input,
  Badge,
  Progress,
  Spinner,
  colors,
  typography,
  spacing,
  borderRadius,
  animation,
  animationPresets,
  getColorValue,
  getSpacingValue,
  getShadowValue,
  generateGlowClass,
  generateGradientClass,
  breakpoints,
  designSystemInfo
};