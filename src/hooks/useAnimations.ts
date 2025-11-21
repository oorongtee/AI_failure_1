import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useEffect, useCallback, useRef } from 'react';

// Hook for smooth mouse follow animations
export const useMouseFollow = (strength: number = 0.1) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set((clientX - innerWidth / 2) * strength);
      mouseY.set((clientY - innerHeight / 2) * strength);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, strength]);
  
  return { x, y };
};

// Hook for scroll-triggered animations
export const useScrollAnimation = () => {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      scrollY.set(scrollTop);
      scrollYProgress.set(scrollTop / (scrollHeight - clientHeight));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize values
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, scrollYProgress]);
  
  return { scrollY, scrollYProgress };
};

// Hook for parallax effects
export const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

// Hook for rotation based on scroll
export const useScrollRotation = (value: MotionValue<number>, rotation: number = 360) => {
  return useTransform(value, [0, 1], [0, rotation]);
};

// Hook for scale based on scroll
export const useScrollScale = (value: MotionValue<number>, minScale: number = 0.8, maxScale: number = 1.2) => {
  return useTransform(value, [0, 0.5, 1], [minScale, 1, maxScale]);
};

// Hook for opacity based on scroll
export const useScrollOpacity = (value: MotionValue<number>, fadeStart: number = 0, fadeEnd: number = 0.3) => {
  return useTransform(value, [fadeStart, fadeEnd], [1, 0]);
};

// Hook for element visibility based on intersection
export const useIntersectionAnimation = (threshold: number = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useMotionValue(0);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.set(entry.isIntersecting ? 1 : 0);
      },
      { threshold }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, isInView]);
  
  return { ref, isInView };
};

// Hook for typewriter effect
export const useTypewriter = (text: string, speed: number = 50) => {
  const displayText = useMotionValue('');
  const isComplete = useMotionValue(false);
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        displayText.set(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        isComplete.set(true);
        clearInterval(interval);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, displayText, isComplete]);
  
  return { displayText, isComplete };
};

// Hook for animated counter
export const useAnimatedCounter = (target: number, duration: number = 1000) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  useEffect(() => {
    const animation = count.set(target);
    return () => animation;
  }, [count, target, duration]);
  
  return rounded;
};

// Hook for morphing between values
export const useMorphValue = (values: number[], duration: number = 2000) => {
  const currentValue = useMotionValue(values[0]);
  const currentIndex = useRef(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % values.length;
      currentValue.set(values[currentIndex.current]);
    }, duration);
    
    return () => clearInterval(interval);
  }, [values, duration, currentValue]);
  
  return currentValue;
};

// Hook for spring physics
export const useSpringValue = (initialValue: number = 0, config = { stiffness: 300, damping: 30 }) => {
  const motionValue = useMotionValue(initialValue);
  const springValue = useSpring(motionValue, config);
  
  const setValue = useCallback((newValue: number) => {
    motionValue.set(newValue);
  }, [motionValue]);
  
  return { value: springValue, setValue };
};

// Hook for gesture-based animations
export const useGesture = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  
  const dragX = useSpring(x, { stiffness: 500, damping: 50 });
  const dragY = useSpring(y, { stiffness: 500, damping: 50 });
  
  const resetPosition = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
    rotate.set(0);
  }, [x, y, scale, rotate]);
  
  return {
    x: dragX,
    y: dragY,
    scale,
    rotate,
    rawX: x,
    rawY: y,
    resetPosition,
  };
};

// Hook for 3D transforms
export const use3DTransform = () => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);
  
  const transform = useTransform(
    [rotateX, rotateY, rotateZ],
    ([x, y, z]) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`
  );
  
  const setRotation = useCallback((x: number, y: number, z: number = 0) => {
    rotateX.set(x);
    rotateY.set(y);
    rotateZ.set(z);
  }, [rotateX, rotateY, rotateZ]);
  
  return { transform, setRotation, rotateX, rotateY, rotateZ };
};

// Hook for page transition state
export const usePageTransition = () => {
  const isTransitioning = useMotionValue(false);
  const progress = useMotionValue(0);
  
  const startTransition = useCallback(async (duration: number = 500) => {
    isTransitioning.set(true);
    progress.set(1);
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        progress.set(0);
        isTransitioning.set(false);
        resolve();
      }, duration);
    });
  }, [isTransitioning, progress]);
  
  return { isTransitioning, progress, startTransition };
};

// Hook for color morphing
export const useColorMorph = (colors: string[], duration: number = 3000) => {
  const colorIndex = useMotionValue(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      colorIndex.set((colorIndex.get() + 1) % colors.length);
    }, duration);
    
    return () => clearInterval(interval);
  }, [colors, duration, colorIndex]);
  
  const currentColor = useTransform(colorIndex, (index) => colors[Math.floor(index)]);
  
  return currentColor;
};

// Hook for device-based animations
export const useDeviceMotion = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const z = useMotionValue(0);
  
  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (event.accelerationIncludingGravity) {
        x.set(event.accelerationIncludingGravity.x || 0);
        y.set(event.accelerationIncludingGravity.y || 0);
        z.set(event.accelerationIncludingGravity.z || 0);
      }
    };
    
    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  }, [x, y, z]);
  
  return { x, y, z };
};

// Export all animation hooks
export const animationHooks = {
  useMouseFollow,
  useScrollAnimation,
  useParallax,
  useScrollRotation,
  useScrollScale,
  useScrollOpacity,
  useIntersectionAnimation,
  useTypewriter,
  useAnimatedCounter,
  useMorphValue,
  useSpringValue,
  useGesture,
  use3DTransform,
  usePageTransition,
  useColorMorph,
  useDeviceMotion,
} as const;

export default animationHooks;