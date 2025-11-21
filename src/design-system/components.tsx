// Sci-Fi Design System Components
import React from 'react';
import { motion } from 'framer-motion';

// Button Component with Sci-Fi styling
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  glow?: boolean;
  cyber?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  glow = false,
  cyber = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = `
    relative overflow-hidden font-medium transition-all duration-300 ease-cyber
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed
    ${cyber ? 'font-mono uppercase tracking-wider' : ''}
    ${glow ? 'shadow-glow' : ''}
  `;

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-500 hover:to-primary-600 border border-primary-500',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-500 hover:to-secondary-600 border border-secondary-500',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-400 hover:to-accent-500 border border-accent-400',
    ghost: 'bg-transparent text-white hover:bg-white/10 border border-white/20',
    outline: 'bg-transparent text-primary-400 border border-primary-400 hover:bg-primary-400/10'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2.5 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl'
  };

  const { onDrag, onDragEnd, onDragStart, onAnimationStart, onAnimationEnd, onAnimationIteration, ...buttonProps } = props;
  
  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {/* Cyber grid overlay */}
      {cyber && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
      )}
      
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </motion.button>
  );
};

// Card Component with holographic effects
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'holographic' | 'glass' | 'neon';
  glow?: boolean;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  glow = false,
  interactive = false,
  className = '',
  ...props
}) => {
  const baseClasses = `
    relative overflow-hidden transition-all duration-300 ease-quantum
    ${glow ? 'shadow-glow' : ''}
    ${interactive ? 'cursor-pointer' : ''}
  `;

  const variantClasses = {
    default: 'bg-neutral-800/50 backdrop-blur-md border border-neutral-700/50 rounded-2xl',
    holographic: 'bg-gradient-to-br from-primary-900/20 via-secondary-900/20 to-accent-900/20 backdrop-blur-md border border-primary-500/30 rounded-2xl shadow-glow',
    glass: 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl',
    neon: 'bg-neutral-900/80 backdrop-blur-md border-2 border-accent-500/50 rounded-2xl shadow-glow-cyan'
  };

  const { onDrag, onDragEnd, onDragStart, onAnimationStart, onAnimationEnd, onAnimationIteration, ...cardProps } = props;
  
  if (interactive) {
    return (
      <motion.div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        {...cardProps}
      >
        {/* Holographic gradient overlay */}
        {variant === 'holographic' && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10 opacity-50" />
        )}
        
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...cardProps}
    >
      {/* Holographic gradient overlay */}
      {variant === 'holographic' && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10 opacity-50" />
      )}
      
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Input Component with cyber styling
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  cyber?: boolean;
  glow?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  cyber = false,
  glow = false,
  className = '',
  ...props
}) => {
  const baseClasses = `
    w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-md border rounded-lg
    text-white placeholder-neutral-400 transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    ${cyber ? 'font-mono' : ''}
    ${glow ? 'shadow-glow' : ''}
    ${error ? 'border-error-500 focus:ring-error-500' : 'border-neutral-600/50'}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className={`block text-sm font-medium text-white ${cyber ? 'font-mono uppercase tracking-wider' : ''}`}>
          {label}
        </label>
      )}
      
      <input
        className={`${baseClasses} ${className}`}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-error-400 flex items-center gap-2">
          <span className="w-1 h-1 bg-error-400 rounded-full animate-pulse" />
          {error}
        </p>
      )}
    </div>
  );
};

// Badge Component with glow effects
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  glow = false,
  pulse = false,
  className = '',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center font-medium rounded-full border
    ${glow ? 'shadow-glow' : ''}
    ${pulse ? 'animate-pulse' : ''}
  `;

  const variantClasses = {
    primary: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    secondary: 'bg-secondary-500/20 text-secondary-300 border-secondary-500/30',
    accent: 'bg-accent-500/20 text-accent-300 border-accent-500/30',
    success: 'bg-success-500/20 text-success-300 border-success-500/30',
    warning: 'bg-warning-500/20 text-warning-300 border-warning-500/30',
    error: 'bg-error-500/20 text-error-300 border-error-500/30'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Progress Bar with energy flow effect
export interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showValue?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  animated = false,
  showValue = false
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const baseClasses = 'w-full bg-neutral-800 rounded-full overflow-hidden';
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600',
    success: 'bg-gradient-to-r from-success-500 to-success-600',
    warning: 'bg-gradient-to-r from-warning-500 to-warning-600',
    error: 'bg-gradient-to-r from-error-500 to-error-600'
  };

  return (
    <div className="space-y-2">
      {showValue && (
        <div className="flex justify-between text-sm text-neutral-300">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div className={`${baseClasses} ${sizeClasses[size]}`}>
        <motion.div
          className={`h-full ${variantClasses[variant]} ${animated ? 'animate-pulse' : ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Spinner Component with quantum effects
export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'accent';
  type?: 'spin' | 'pulse' | 'quantum';
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  type = 'spin'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const variantClasses = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    accent: 'border-accent-500'
  };

  if (type === 'pulse') {
    return (
      <div className={`${sizeClasses[size]} ${variantClasses[variant].replace('border-', 'bg-')} rounded-full animate-pulse opacity-75`} />
    );
  }

  if (type === 'quantum') {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <div className={`absolute inset-0 ${variantClasses[variant].replace('border-', 'bg-')} rounded-full animate-ping opacity-20`} />
        <div className={`absolute inset-0 ${variantClasses[variant].replace('border-', 'bg-')} rounded-full animate-pulse`} />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} border-2 ${variantClasses[variant]} border-t-transparent rounded-full animate-spin`} />
  );
};