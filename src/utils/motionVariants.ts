import type { Variants } from 'framer-motion';

// Animation Tokens - Design System Constants
export const animationTokens = {
  // Duration tokens
  duration: {
    instant: 0,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
    slowest: 1.2,
  },
  
  // Easing tokens
  easing: {
    linear: [0, 0, 1, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.25, 0.46, 0.45, 0.94],
    spring: [0.25, 1, 0.5, 1],
  },
  
  // Delay tokens
  delay: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.3,
    extraLong: 0.5,
  },
  
  // Stagger tokens
  stagger: {
    children: 0.1,
    items: 0.05,
    fast: 0.03,
    slow: 0.15,
  },
  
  // Transform tokens
  transform: {
    slideDistance: 30,
    scaleSize: 0.95,
    rotateAngle: 5,
    blurAmount: 4,
  },
} as const;

// Entrance Animation Variants
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: animationTokens.transform.slideDistance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -animationTokens.transform.slideDistance,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

export const slideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -animationTokens.transform.slideDistance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: animationTokens.transform.slideDistance,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: animationTokens.transform.slideDistance,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: -animationTokens.transform.slideDistance,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -animationTokens.transform.slideDistance,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: animationTokens.transform.slideDistance,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: animationTokens.transform.scaleSize,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: animationTokens.transform.scaleSize,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

export const bounceInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationTokens.duration.slow,
      ease: animationTokens.easing.bounce,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

export const rotateInVariants: Variants = {
  hidden: {
    opacity: 0,
    rotate: -animationTokens.transform.rotateAngle,
    scale: animationTokens.transform.scaleSize,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    rotate: animationTokens.transform.rotateAngle,
    scale: animationTokens.transform.scaleSize,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

// Page Transition Variants
export const pageTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: animationTokens.duration.slow,
      ease: animationTokens.easing.easeOut,
      when: 'beforeChildren',
      staggerChildren: animationTokens.stagger.children,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeIn,
    },
  },
};

// Modal Animation Variants
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: animationTokens.duration.fast,
      ease: animationTokens.easing.easeIn,
    },
  },
};

export const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: animationTokens.duration.normal,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

// Stagger Container Variants
export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: animationTokens.stagger.children,
      delayChildren: animationTokens.delay.short,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: animationTokens.stagger.fast,
      staggerDirection: -1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

// Card Hover Variants
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: {
      duration: animationTokens.duration.fast,
      ease: animationTokens.easing.easeOut,
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      duration: animationTokens.duration.fast,
      ease: animationTokens.easing.easeOut,
    },
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: animationTokens.duration.instant,
    },
  },
};

// Button Animation Variants
export const buttonVariants: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: animationTokens.duration.fast,
      ease: animationTokens.easing.easeOut,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: animationTokens.duration.fast,
      ease: animationTokens.easing.easeOut,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: animationTokens.duration.instant,
    },
  },
};

// Loading Animation Variants
export const spinVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: animationTokens.easing.easeInOut,
    },
  },
};

export const bounceVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: animationTokens.easing.easeInOut,
    },
  },
};

// Navigation Animation Variants
export const navItemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
};

export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeInOut,
      when: 'afterChildren',
      staggerChildren: animationTokens.stagger.fast,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeInOut,
      when: 'beforeChildren',
      staggerChildren: animationTokens.stagger.children,
    },
  },
};

// Notification Variants
export const notificationVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 300,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: 300,
    scale: 0.9,
    transition: {
      duration: animationTokens.duration.fast,
      ease: animationTokens.easing.easeIn,
    },
  },
};

// Form Animation Variants
export const formFieldVariants: Variants = {
  focused: {
    scale: 1.02,
    borderColor: '#3B82F6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
  unfocused: {
    scale: 1,
    borderColor: '#D1D5DB',
    boxShadow: '0 0 0 0px rgba(59, 130, 246, 0)',
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
  error: {
    borderColor: '#EF4444',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: animationTokens.duration.normal,
    },
  },
};

// Progress Animation Variants
export const progressBarVariants: Variants = {
  initial: {
    scaleX: 0,
    transformOrigin: 'left',
  },
  animate: (progress: number) => ({
    scaleX: progress / 100,
    transition: {
      duration: animationTokens.duration.slow,
      ease: animationTokens.easing.easeOut,
    },
  }),
};

// 3D Animation Variants
export const float3DVariants: Variants = {
  animate: {
    y: [0, -5, 0],
    rotateY: [0, 5, 0, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: animationTokens.easing.easeInOut,
    },
  },
};

export const rotate3DVariants: Variants = {
  animate: {
    rotateY: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Gesture Animation Variants
export const dragVariants: Variants = {
  drag: {
    scale: 1.05,
    zIndex: 10,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
  rest: {
    scale: 1,
    zIndex: 1,
    transition: {
      duration: animationTokens.duration.fast,
    },
  },
};

// Text Animation Variants
export const typewriterVariants: Variants = {
  hidden: {
    width: 0,
    opacity: 0,
  },
  visible: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: animationTokens.duration.slower,
      ease: animationTokens.easing.easeOut,
    },
  },
};

export const slideInTextVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: animationTokens.duration.normal,
      ease: animationTokens.easing.easeOut,
    },
  }),
};

// Skeleton Loading Variants
export const skeletonVariants: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Export all variants for easy access
export const motionVariants = {
  // Basic entrance
  fadeIn: fadeInVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  scale: scaleVariants,
  bounceIn: bounceInVariants,
  rotateIn: rotateInVariants,
  
  // Page transitions
  pageTransition: pageTransitionVariants,
  
  // Modal/overlay
  modal: modalVariants,
  overlay: overlayVariants,
  
  // Stagger animations
  staggerContainer: staggerContainerVariants,
  staggerItem: staggerItemVariants,
  
  // Interactive elements
  cardHover: cardHoverVariants,
  button: buttonVariants,
  
  // Loading states
  spin: spinVariants,
  pulse: pulseVariants,
  bounce: bounceVariants,
  
  // Navigation
  navItem: navItemVariants,
  mobileMenu: mobileMenuVariants,
  
  // Notifications
  notification: notificationVariants,
  
  // Forms
  formField: formFieldVariants,
  
  // Progress
  progressBar: progressBarVariants,
  
  // 3D animations
  float3D: float3DVariants,
  rotate3D: rotate3DVariants,
  
  // Gestures
  drag: dragVariants,
  
  // Text animations
  typewriter: typewriterVariants,
  slideInText: slideInTextVariants,
  
  // Loading effects
  skeleton: skeletonVariants,
} as const;

export default motionVariants;