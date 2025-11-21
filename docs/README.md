# 3D Interactive Portfolio Website 🌟

A modern, interactive portfolio website built with React, Three.js, and cutting-edge web technologies. Features immersive 3D graphics, AI-powered modules, and a comprehensive skill visualization system.

## ✨ Features

### 🎯 Core Modules
- **AI Flow Graph** - Interactive workflow visualization with React Flow
- **Workflow Timeline** - Horizontal scrolling timeline with drag interactions  
- **Prompt Explorer** - Notion-style prompt library management
- **Diff Viewer** - Monaco Editor-based code comparison tool
- **Interactive Resume** - Expandable sections with skill tracking
- **Skill Tree** - Gamified skill development progression
- **Tech Radar** - Technology adoption and assessment visualization
- **Skill Heatmap** - Visual proficiency and growth tracking
- **AI Dashboard** - Real-time analytics and project insights

### 🚀 Technology Stack
- **Frontend Framework**: React 19 + Vite
- **3D Graphics**: React Three Fiber + Three.js
- **Styling**: TailwindCSS + PostCSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Code Editor**: Monaco Editor
- **Data Visualization**: React Flow, D3.js, Visx
- **UI Components**: Lucide React Icons

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
