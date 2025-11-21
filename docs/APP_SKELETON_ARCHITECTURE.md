/*
═══════════════════════════════════════════════════════════════
🏗️ APP SKELETON ARCHITECTURE
App.tsx 與 Layout.tsx 的語意架構設計（純架構，不含 UI）
═══════════════════════════════════════════════════════════════
*/

// ==========================================
// 📱 App.tsx 骨架架構
// ==========================================

App.tsx 職責：
- 🔧 全域狀態初始化 (Zustand Stores)
- 🌐 路由系統配置 (React Router)  
- 🎨 主題系統提供 (Theme Provider)
- 📡 全域錯誤邊界 (Error Boundary)
- 🔄 頁面切換動畫 (AnimatePresence)
- ⚡ 效能監控 (Performance Tracking)

架構層次：
```
App
├── ErrorBoundary
├── ThemeProvider  
├── GlobalStoreProvider
├── BrowserRouter
│   ├── AnimatePresence
│   │   ├── Routes
│   │   │   ├── Route (/)
│   │   │   ├── Route (/dashboard)
│   │   │   ├── Route (/workflow/*)
│   │   │   ├── Route (/prompts/*)
│   │   │   ├── Route (/about/*)
│   │   │   └── Route (*)
│   │   └── GlobalComponents
│   │       ├── ScrollProgressBar
│   │       ├── LoadingOverlay
│   │       └── DevTools (dev mode)
└── GlobalEventListeners
```

App.tsx 狀態管理：
- 📊 全域載入狀態
- 🎯 路由切換狀態
- 🚨 全域錯誤狀態  
- 📱 設備檢測狀態
- 🔋 效能監控狀態

// ==========================================
// 🏠 Layout.tsx 骨架架構  
// ==========================================

Layout.tsx 職責：
- 📐 頁面整體版面配置
- 🧭 導航系統管理 (Navbar, Sidebar)
- 📱 響應式佈局適配
- 🎯 滾動行為控制
- 🖱️ 全域互動監聽 (滑鼠、鍵盤)
- 🔄 頁面轉換動畫容器

佈局層次：
```
Layout
├── GlobalEventHandlers (滑鼠、滾動、鍵盤)
├── NavigationSystem
│   ├── PrimaryNavbar (頂部固定導航)
│   ├── SecondaryNavbar (模組內導航)
│   ├── Sidebar (側邊欄，可選)
│   └── MobileMenu (手機版選單)
├── MainContentArea
│   ├── PageHeader (麵包屑、頁面標題)
│   ├── ContentContainer (主要內容區域)
│   │   └── [Children] (各頁面元件插入點)
│   └── PageFooter (頁面底部，可選)
├── FloatingElements
│   ├── ScrollToTop (回到頂部按鈕)
│   ├── FloatingActionButtons (快速動作)
│   └── NotificationCenter (通知系統)
└── ModalSystem
    ├── GlobalModals (全域彈窗)
    ├── Tooltips (工具提示)
    └── ContextMenus (右鍵選單)
```

Layout.tsx 響應式策略：
- 🖥️ Desktop (>= 1024px): 完整佈局，側邊欄展開
- 📱 Tablet (768px - 1023px): 緊湊佈局，側邊欄可摺疊
- 📱 Mobile (< 768px): 堆疊佈局，漢堡選單

// ==========================================
// 🎯 各模組插入位置設計
// ==========================================

1. 🏠 Landing Page 模組插入：
```
Layout
└── MainContentArea
    └── ContentContainer (fullscreen mode)
        └── LandingPage
            ├── HeroSection (3D Scene + Info Panel)
            ├── NavigationHub (功能卡片)
            └── FooterSection (可選)
```
Layout 特殊處理：
- 隱藏頂部導航 (或透明化)
- 全螢幕模式
- 滾動視差效果

2. 📊 Dashboard 模組插入：
```
Layout
├── PrimaryNavbar (顯示)
└── MainContentArea  
    ├── PageHeader ("AI Dashboard")
    └── ContentContainer
        └── DashboardPage
            ├── StatsCardsGrid
            ├── ChartsSection
            └── WidgetsSection
```
Layout 特殊處理：
- 保持導航可見
- 內容區域 padding
- 響應式網格系統

3. 🔄 Workflow 模組插入：
```
Layout
├── PrimaryNavbar (顯示)
├── SecondaryNavbar (Workflow 子導航)
└── MainContentArea
    ├── PageHeader (麵包屑導航)
    └── ContentContainer
        └── WorkflowPage
            ├── TimelineContainer (橫向滾動)
            ├── DetailPanel (側邊或彈窗)
            └── ControlsPanel
```
Layout 特殊處理：
- 啟用二級導航
- 橫向滾動容器
- 動態側邊面板

4. 🔍 Prompt Explorer 模組插入：
```
Layout
├── PrimaryNavbar (顯示)
└── MainContentArea (雙欄佈局)
    ├── Sidebar (分類導航)
    └── ContentContainer
        └── PromptExplorerPage
            ├── SearchHeader
            ├── ContentArea (列表或詳情)
            └── FilterPanel
```
Layout 特殊處理：
- 強制顯示側邊欄
- 雙欄響應式佈局
- 搜尋列整合

5. 📝 Diff Viewer 模組插入：
```
Layout
├── PrimaryNavbar (顯示)
└── MainContentArea (全寬度)
    ├── Toolbar (編輯器工具列)
    └── ContentContainer (無 padding)
        └── DiffViewerPage
            ├── FileTree (可摺疊側邊欄)
            ├── EditorArea (主要區域)
            └── VersionHistory (底部或側邊)
```
Layout 特殊處理：
- 編輯器全寬度模式
- 自定義工具列
- 可摺疊面板系統

6. 🌐 AI Flow Graph 模組插入：
```
Layout
├── PrimaryNavbar (顯示)
└── MainContentArea (全螢幕畫布)
    ├── FloatingToolbar (浮動工具列)
    └── ContentContainer (無邊距)
        └── AIFlowPage
            ├── FlowCanvas (主要畫布)
            ├── NodePanel (浮動面板)
            └── MiniMap (迷你地圖)
```
Layout 特殊處理：
- 畫布全螢幕模式
- 浮動 UI 元素
- 縮放與平移支援

7. 👤 About 系列模組插入：
```
Layout
├── PrimaryNavbar (顯示)
├── SecondaryNavbar (About 子導航)
└── MainContentArea
    ├── PageHeader (個人資訊摘要)
    └── ContentContainer
        └── AboutPage / ResumePage / SkillsPage
            ├── [模組特定內容]
            └── [互動元素]
```
Layout 特殊處理：
- Tab 式二級導航
- 個人資訊頭部
- 互動元素支援

8. 💼 Portfolio 模組插入：
```
Layout
├── PrimaryNavbar (顯示)
└── MainContentArea
    ├── PageHeader (作品集導航)
    └── ContentContainer
        └── PortfolioPage
            ├── ProjectsGrid (作品網格)
            ├── FilterControls (篩選控制)
            └── ProjectDetail (詳情頁)
```
Layout 特殊處理：
- 畫廊模式支援
- 圖片最佳化載入
- 全螢幕預覽模式

// ==========================================
// 🎮 互動系統架構
// ==========================================

GlobalEventHandlers (在 Layout.tsx 中)：

1. 🖱️ 滑鼠互動：
   - mousePosition: 3D 場景互動
   - hover states: UI 元素 hover 效果
   - click tracking: 分析用途

2. ⌨️ 鍵盤快捷鍵：
   - Navigation: 方向鍵、Tab 導航
   - Actions: Enter, Escape, Space
   - Shortcuts: Ctrl+K (搜尋), ? (說明)

3. 📱 觸控手勢：
   - Swipe: 頁面切換、時間軸滑動
   - Pinch: 縮放 (3D 場景、圖表)
   - Tap: 點擊互動
   - Long press: 右鍵選單

4. 📜 滾動行為：
   - scrollY position: 視差效果、導航狀態
   - scroll direction: 自動隱藏/顯示導航
   - intersection observer: 動畫觸發

// ==========================================
// 🔄 狀態流架構
// ==========================================

全域狀態流向：
```
App.tsx (Global State)
    ↓
Layout.tsx (UI State + Event Handlers)
    ↓
PageComponent (Page-specific State)
    ↓
ModuleComponents (Module-specific State)
    ↓
UIComponents (Local State)
```

狀態管理層級：
1. 🌐 App Level: 主題、語言、使用者偏好
2. 📐 Layout Level: 導航狀態、響應式狀態
3. 📄 Page Level: 頁面數據、載入狀態
4. 🧩 Module Level: 模組功能狀態
5. 🔧 Component Level: UI 互動狀態

// ==========================================
// ⚡ 效能優化架構
// ==========================================

1. 🔄 Lazy Loading 策略：
   - Route-based: 路由層級懶載入
   - Component-based: 重型元件懶載入
   - Data-based: 資料按需載入

2. 🎯 Memory Management：
   - Component cleanup: useEffect cleanup
   - Event listener cleanup: 自動移除監聽器  
   - 3D object disposal: Three.js 記憶體管理

3. 📊 Performance Monitoring：
   - Render time tracking: 元件渲染時間
   - User interaction metrics: 互動響應時間
   - Resource loading: 資源載入監控

4. 🚀 Preloading 策略：
   - Critical resources: 關鍵資源優先載入
   - Hover preloading: hover 時預載入
   - Predictive loading: 預測性載入

/*
═══════════════════════════════════════════════════════════════
🎯 開發實作順序建議：

Phase 1: 基礎骨架
✅ App.tsx 基礎架構
✅ Layout.tsx 基礎佈局
✅ 基礎路由系統

Phase 2: 導航系統  
🔄 Primary Navbar
🔄 Secondary Navigation
📱 Mobile Menu

Phase 3: 響應式系統
📱 Responsive Layout
🖱️ Event Handlers  
📜 Scroll Management

Phase 4: 進階功能
⚡ Performance Optimization
🎨 Animation System
🔧 Developer Tools

Phase 5: 模組整合
🏠 Landing Page Integration
📊 Dashboard Integration  
🔄 Workflow Integration
... (其他模組)
═══════════════════════════════════════════════════════════════
*/