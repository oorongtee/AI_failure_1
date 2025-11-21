/*
═══════════════════════════════════════════════════════════════
🔧 TECHNOLOGY STACK DECISIONS - 3D Interactive Portfolio
═══════════════════════════════════════════════════════════════

📊 技術選擇分析與建議：

┌─────────────────────────────────────────────────────────────┐
│ 🎯 React Three Fiber (R3F) - 主要選擇                      │
│ ✅ 用於：Landing Page 3D 場景、浮動卡片、技能球體          │
│ 原因：                                                       │
│ • 與 React 生態完美整合                                     │
│ • 聲明式 3D 程式設計                                        │
│ • 豐富的生態系統 (@react-three/drei)                       │
│ • 效能優化 (useFrame, 自動記憶體管理)                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🎮 原生 Three.js                                           │
│ ✅ 用於：複雜粒子系統、自定義 Shader 效果                  │
│ 原因：                                                       │
│ • 更精細的控制                                              │
│ • 自定義材質和幾何體                                        │
│ • WebGL Shader 程式設計                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🎨 HTML5 Canvas + Konva.js                                 │
│ ✅ 用於：Skill Tree、Tech Radar、Flow Graph               │
│ 原因：                                                       │
│ • 2D 圖形更適合                                             │
│ • 更好的互動性 (拖拽、縮放)                                │
│ • 較低的效能開銷                                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 📊 D3.js + SVG                                             │
│ ✅ 用於：Tech Radar、Skill Heatmap、資料視覺化             │
│ 原因：                                                       │
│ • 專業資料視覺化                                            │
│ • 豐富的圖表類型                                            │
│ • 優秀的動畫支援                                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ⚡ React Flow                                               │
│ ✅ 用於：AI Flow Graph、工作流程圖                         │
│ 原因：                                                       │
│ • 專為流程圖設計                                            │
│ • 內建拖拽功能                                              │
│ • 豐富的節點類型                                            │
└─────────────────────────────────────────────────────────────┘
*/

// 具體模組技術分配
export const TECH_STACK_MAP = {
  // 3D 場景 - React Three Fiber
  '3D_SCENES': {
    tech: 'React Three Fiber',
    components: ['Landing 3D Scene', 'Floating Cards', 'Skill Orbs'],
    reason: 'React 整合性佳，聲明式 3D 程式設計'
  },

  // 視覺化圖表 - D3.js + SVG  
  'DATA_VISUALIZATION': {
    tech: 'D3.js + SVG',
    components: ['Tech Radar', 'Skill Heatmap', 'Statistics Charts'],
    reason: '專業資料視覺化，豐富動畫支援'
  },

  // 流程圖 - React Flow
  'FLOW_DIAGRAMS': {
    tech: 'React Flow',
    components: ['AI Flow Graph', 'Workflow Timeline'],
    reason: '專為流程圖設計，內建互動功能'
  },

  // 2D 互動圖形 - Canvas + Konva
  'INTERACTIVE_2D': {
    tech: 'Canvas + Konva.js',
    components: ['Skill Tree', 'Interactive Resume Timeline'],
    reason: '優秀的 2D 互動性，效能佳'
  },

  // 程式碼編輯 - Monaco Editor
  'CODE_EDITING': {
    tech: 'Monaco Editor',
    components: ['Diff Viewer', 'Code Editor'],
    reason: 'VS Code 同款編輯器，功能完整'
  },

  // 動畫 - Framer Motion
  'ANIMATIONS': {
    tech: 'Framer Motion',
    components: ['Page Transitions', 'UI Animations', 'Scroll Animations'],
    reason: 'React 生態最佳動畫庫'
  }
};