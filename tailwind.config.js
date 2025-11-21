/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cosmic Purple (Primary)
        primary: {
          50: 'rgb(243 241 255)',
          100: 'rgb(235 229 255)',
          200: 'rgb(217 206 255)',
          300: 'rgb(190 166 255)',
          400: 'rgb(159 117 255)',
          500: 'rgb(132 61 255)',
          600: 'rgb(121 22 255)',
          700: 'rgb(107 4 253)',
          800: 'rgb(90 3 212)',
          900: 'rgb(75 5 173)',
          950: 'rgb(44 0 118)',
        },
        // Cyber Blue (Secondary)
        secondary: {
          50: 'rgb(239 246 255)',
          100: 'rgb(219 234 254)',
          200: 'rgb(191 219 254)',
          300: 'rgb(147 197 253)',
          400: 'rgb(96 165 250)',
          500: 'rgb(59 130 246)',
          600: 'rgb(37 99 235)',
          700: 'rgb(29 78 216)',
          800: 'rgb(30 64 175)',
          900: 'rgb(30 58 138)',
          950: 'rgb(23 37 84)',
        },
        // Neon Cyan (Accent)
        accent: {
          50: 'rgb(236 254 255)',
          100: 'rgb(207 250 254)',
          200: 'rgb(165 243 252)',
          300: 'rgb(103 232 249)',
          400: 'rgb(34 211 238)',
          500: 'rgb(6 182 212)',
          600: 'rgb(8 145 178)',
          700: 'rgb(14 116 144)',
          800: 'rgb(21 94 117)',
          900: 'rgb(22 78 99)',
          950: 'rgb(8 51 68)',
        },
        // Space Grays (Neutral)
        neutral: {
          0: 'rgb(255 255 255)',
          50: 'rgb(248 250 252)',
          100: 'rgb(241 245 249)',
          200: 'rgb(226 232 240)',
          300: 'rgb(203 213 225)',
          400: 'rgb(148 163 184)',
          500: 'rgb(100 116 139)',
          600: 'rgb(71 85 105)',
          700: 'rgb(51 65 85)',
          800: 'rgb(30 41 59)',
          900: 'rgb(15 23 42)',
          950: 'rgb(2 6 23)',
        },
        // Status Colors
        success: 'rgb(34 197 94)',
        warning: 'rgb(249 115 22)',
        error: 'rgb(239 68 68)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgb(132 61 255 / 0.5)',
        'glow-cyan': '0 0 20px rgb(34 211 238 / 0.5)',
        'glow-green': '0 0 20px rgb(34 197 94 / 0.5)',
        'glow-orange': '0 0 20px rgb(249 115 22 / 0.5)',
        'inner-glow': 'inset 0 0 20px rgb(132 61 255 / 0.2)',
      },
      animation: {
        'cyber': 'cyber 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
        'quantum': 'quantum 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'hologram': 'hologram 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 1s ease-in-out infinite',
      },
      keyframes: {
        cyber: {
          '0%, 100%': {
            transform: 'translateX(0)',
            filter: 'hue-rotate(0deg)',
          },
          '25%': {
            transform: 'translateX(-2px)',
            filter: 'hue-rotate(90deg)',
          },
          '50%': {
            transform: 'translateX(2px)',
            filter: 'hue-rotate(180deg)',
          },
          '75%': {
            transform: 'translateX(-1px)',
            filter: 'hue-rotate(270deg)',
          },
        },
        quantum: {
          '0%, 100%': {
            transform: 'scale(1) rotate(0deg)',
            opacity: '1',
          },
          '25%': {
            transform: 'scale(1.02) rotate(1deg)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'scale(0.98) rotate(-1deg)',
            opacity: '0.9',
          },
          '75%': {
            transform: 'scale(1.01) rotate(0.5deg)',
            opacity: '0.95',
          },
        },
        hologram: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'glow-pulse': {
          '0%': {
            'box-shadow': '0 0 5px rgb(132 61 255 / 0.5), 0 0 10px rgb(132 61 255 / 0.3), 0 0 15px rgb(132 61 255 / 0.2)',
          },
          '100%': {
            'box-shadow': '0 0 10px rgb(132 61 255 / 0.8), 0 0 20px rgb(132 61 255 / 0.5), 0 0 30px rgb(132 61 255 / 0.3)',
          },
        },
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, rgb(15 23 42) 0%, rgb(30 41 59) 25%, rgb(51 65 85) 50%, rgb(30 41 59) 75%, rgb(15 23 42) 100%)',
        'gradient-cyber': 'linear-gradient(45deg, rgb(132 61 255) 0%, rgb(59 130 246) 50%, rgb(34 211 238) 100%)',
        'gradient-holographic': 'linear-gradient(45deg, rgb(132 61 255 / 0.1), rgb(59 130 246 / 0.1), rgb(34 211 238 / 0.1), rgb(34 197 94 / 0.1), rgb(249 115 22 / 0.1))',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}