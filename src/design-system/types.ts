// Design System Type Definitions
export interface Theme {
  colors: {
    primary: ColorPalette;
    secondary: ColorPalette;
    accent: ColorPalette;
    neutral: ColorPalette;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontFamily: {
      sans: string[];
      display: string[];
      mono: string[];
    };
    fontSize: Record<string, [string, { lineHeight: string }]>;
    fontWeight: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: {
    glow: string;
    glowCyan: string;
    glowGreen: string;
    glowOrange: string;
  };
  animations: {
    durations: Record<string, string>;
    easings: Record<string, string>;
  };
}

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ComponentVariant {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  ghost: string;
  outline: string;
}

export interface ComponentSize {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface AnimationConfig {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
  whileHover?: Record<string, any>;
  whileTap?: Record<string, any>;
  whileInView?: Record<string, any>;
}

export interface MotionVariants {
  [key: string]: AnimationConfig;
}

// Component Props Interfaces
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseProps {
  variant?: keyof ComponentVariant;
  size?: keyof ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseProps {
  variant?: 'default' | 'glass' | 'holographic';
  padding?: keyof ComponentSize;
  hover?: boolean;
  glow?: boolean;
}

export interface InputProps extends BaseProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface BadgeProps extends BaseProps {
  variant?: keyof ComponentVariant;
  size?: keyof ComponentSize;
  pulse?: boolean;
}

export interface ProgressProps extends BaseProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showValue?: boolean;
}

export interface SpinnerProps extends BaseProps {
  size?: keyof ComponentSize;
  variant?: 'primary' | 'accent' | 'white';
  quantum?: boolean;
}

// Layout Props
export interface LayoutProps extends BaseProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface GridProps extends BaseProps {
  cols?: number;
  gap?: keyof ComponentSize;
  responsive?: boolean;
}

export interface FlexProps extends BaseProps {
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: keyof ComponentSize;
}

// Animation Presets
export interface AnimationPresets {
  fadeIn: MotionVariants;
  slideUp: MotionVariants;
  slideDown: MotionVariants;
  slideLeft: MotionVariants;
  slideRight: MotionVariants;
  scaleIn: MotionVariants;
  scaleOut: MotionVariants;
  rotateIn: MotionVariants;
  cyber: MotionVariants;
  quantum: MotionVariants;
  hologram: MotionVariants;
  float: MotionVariants;
  glowPulse: MotionVariants;
}

// Utility Types
export type ResponsiveValue<T> = T | { xs?: T; sm?: T; md?: T; lg?: T; xl?: T };
export type ColorValue = keyof Theme['colors'] | string;
export type SpacingValue = keyof Theme['spacing'] | string;
export type ShadowValue = keyof Theme['shadows'] | string;

// Design Tokens
export interface DesignTokens {
  colors: Theme['colors'];
  typography: Theme['typography'];
  spacing: Theme['spacing'];
  borderRadius: Theme['borderRadius'];
  shadows: Theme['shadows'];
  animations: Theme['animations'];
}

// Theme Context
export interface ThemeContextValue {
  theme: Theme;
  toggleTheme?: () => void;
  isDarkMode?: boolean;
}

// Component Registry for Dynamic Loading
export interface ComponentRegistry {
  Button: React.ComponentType<ButtonProps>;
  Card: React.ComponentType<CardProps>;
  Input: React.ComponentType<InputProps>;
  Badge: React.ComponentType<BadgeProps>;
  Progress: React.ComponentType<ProgressProps>;
  Spinner: React.ComponentType<SpinnerProps>;
}

export type { Theme as default };