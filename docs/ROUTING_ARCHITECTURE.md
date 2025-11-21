/*
═══════════════════════════════════════════════════════════════
🌐 ROUTING ARCHITECTURE - React Router 完整規劃
═══════════════════════════════════════════════════════════════
*/

// ==========================================
// 📍 路由結構設計
// ==========================================

const ROUTES = {
  // 主要頁面
  HOME: '/',                                    // Landing Page
  DASHBOARD: '/dashboard',                      // AI Demo Dashboard
  
  // Workflow 相關路由
  WORKFLOW: '/workflow',                        // Workflow Timeline 主頁
  WORKFLOW_DETAIL: '/workflow/:id',             // 特定工作流程詳情
  WORKFLOW_STEP: '/workflow/:id/step/:stepId', // 步驟詳情頁面
  
  // Prompt Explorer 相關路由  
  PROMPTS: '/prompts',                          // Prompt 資料庫主頁
  PROMPTS_CATEGORY: '/prompts/category/:id',    // 分類頁面
  PROMPTS_DETAIL: '/prompts/:id',               // Prompt 詳情頁
  PROMPTS_SEARCH: '/prompts/search',            // 搜尋結果頁
  
  // Diff Viewer 相關路由
  DIFF: '/diff',                                // 程式碼比較主頁
  DIFF_COMPARE: '/diff/compare',                // 比較介面
  DIFF_HISTORY: '/diff/history/:fileId',        // 版本歷史
  
  // AI Flow Graph 相關路由
  AI_FLOW: '/ai-flow',                          // AI Flow 主頁
  AI_FLOW_EDITOR: '/ai-flow/editor',            // 流程編輯器
  AI_FLOW_VIEW: '/ai-flow/:id',                 // 檢視特定流程
  
  // About 相關路由
  ABOUT: '/about',                              // 關於我主頁
  RESUME: '/about/resume',                      // 互動履歷
  SKILLS: '/about/skills',                      // 技能樹
  SKILL_TREE: '/about/skills/tree',            // 技能樹視圖
  TECH_RADAR: '/about/skills/radar',           // 技術雷達
  SKILL_HEATMAP: '/about/skills/heatmap',      // 技能熱力圖
  
  // Portfolio 相關路由
  PORTFOLIO: '/portfolio',                      // 作品集主頁
  PROJECT_DETAIL: '/portfolio/:id',             // 專案詳情
  PROJECT_GALLERY: '/portfolio/gallery',       // 專案畫廊
  
  // 特殊路由
  NOT_FOUND: '*',                              // 404 頁面
  LOADING: '/loading',                         // 載入頁面
}

// ==========================================
// 🚀 Router 配置建議
// ==========================================

推薦使用：BrowserRouter + Lazy Loading + Code Splitting

理由：
✅ BrowserRouter: 
  - 乾淨的 URL 結構（無 # 符號）
  - 更好的 SEO 支援
  - 現代瀏覽器標準

✅ Lazy Loading:
  - 減少初始載入時間  
  - 按需載入模組
  - 更好的使用者體驗

✅ Code Splitting:
  - 分離各模組 bundle
  - 減少主要 bundle 大小
  - 提升載入效能

// ==========================================
// 📱 路由配置實作架構
// ==========================================

App.tsx 架構：
```typescript
<BrowserRouter>
  <Routes>
    {/* 主要頁面 */}
    <Route path="/" element={<Landing />} />
    <Route path="/dashboard" element={<Dashboard />} />
    
    {/* Workflow 路由群組 */}
    <Route path="/workflow" element={<WorkflowLayout />}>
      <Route index element={<WorkflowPage />} />
      <Route path=":id" element={<WorkflowDetailPage />} />
      <Route path=":id/step/:stepId" element={<StepDetailPage />} />
    </Route>
    
    {/* Prompts 路由群組 */}
    <Route path="/prompts" element={<PromptsLayout />}>
      <Route index element={<PromptExplorerPage />} />
      <Route path="category/:id" element={<CategoryPage />} />
      <Route path=":id" element={<PromptDetailPage />} />
      <Route path="search" element={<SearchResultsPage />} />
    </Route>
    
    {/* Diff Viewer 路由群組 */}
    <Route path="/diff" element={<DiffLayout />}>
      <Route index element={<DiffViewerPage />} />
      <Route path="compare" element={<DiffComparePage />} />
      <Route path="history/:fileId" element={<VersionHistoryPage />} />
    </Route>
    
    {/* AI Flow 路由群組 */}
    <Route path="/ai-flow" element={<AIFlowLayout />}>
      <Route index element={<AIFlowPage />} />
      <Route path="editor" element={<FlowEditorPage />} />
      <Route path=":id" element={<FlowViewPage />} />
    </Route>
    
    {/* About 路由群組 */}
    <Route path="/about" element={<AboutLayout />}>
      <Route index element={<AboutPage />} />
      <Route path="resume" element={<ResumePage />} />
      <Route path="skills" element={<SkillsLayout />}>
        <Route index element={<SkillsOverviewPage />} />
        <Route path="tree" element={<SkillTreePage />} />
        <Route path="radar" element={<TechRadarPage />} />
        <Route path="heatmap" element={<SkillHeatmapPage />} />
      </Route>
    </Route>
    
    {/* Portfolio 路由群組 */}
    <Route path="/portfolio" element={<PortfolioLayout />}>
      <Route index element={<PortfolioPage />} />
      <Route path="gallery" element={<ProjectGalleryPage />} />
      <Route path=":id" element={<ProjectDetailPage />} />
    </Route>
    
    {/* 404 頁面 */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</BrowserRouter>
```

// ==========================================
// 🎯 導航模式設計
// ==========================================

1. 📍 頂部主導航 (Primary Navigation)：
   - Home / Dashboard / Workflow / About / Portfolio
   - 固定顯示，全域可用

2. 📱 側邊次導航 (Secondary Navigation)：
   - 在各模組內部使用
   - 例：About 模組內的 Resume / Skills 切換

3. 🍞 麵包屑導航 (Breadcrumb Navigation)：
   - 深層頁面顯示路徑
   - 例：Home > Workflow > Project A > Step 3

4. 📋 Tab 導航 (Tab Navigation)：
   - 同級功能切換
   - 例：Skills 內的 Tree / Radar / Heatmap

// ==========================================
// ⚡ 效能優化策略
// ==========================================

1. 🔄 Route-based Code Splitting：
```typescript
const WorkflowPage = lazy(() => import('./pages/workflow/WorkflowPage'));
const PromptExplorerPage = lazy(() => import('./pages/prompt-explorer/PromptExplorerPage'));
```

2. 📦 Module Preloading：
```typescript
// 在 hover 時預載入模組
const handleNavHover = (routeName: string) => {
  import(`./pages/${routeName}/${routeName}Page`);
};
```

3. 🎯 Progressive Loading：
```typescript
// 優先載入關鍵路由，延後載入次要路由
const criticalRoutes = ['/', '/dashboard', '/workflow'];
const secondaryRoutes = ['/prompts', '/diff', '/ai-flow'];
```

4. 📱 Route Transition Animation：
```typescript
// 使用 Framer Motion 做路由切換動畫
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    {/* 路由配置 */}
  </Routes>
</AnimatePresence>
```

// ==========================================
// 🔗 Deep Linking 支援
// ==========================================

1. 🎯 URL 參數設計：
   - `/workflow/ai-coding?step=3&view=detail`
   - `/prompts/frontend?search=react&tag=hooks`
   - `/about/skills/tree?category=frontend&skill=react`

2. 📱 狀態同步：
   - URL 參數 ↔ 元件狀態
   - 瀏覽器前進/後退支援
   - 分享連結功能

3. 🔍 SEO 友善：
   - 語意化 URL 結構
   - Meta tags 動態更新
   - Open Graph 支援

// ==========================================
// 🛡️ 路由守衛 (Route Guards)
// ==========================================

1. 🔐 權限控制：
   - 某些進階功能可能需要認證
   - 開發模式 vs 正式模式切換

2. 📊 分析追蹤：
   - 頁面瀏覽統計
   - 使用者行為分析
   - 效能監控

3. 🚫 錯誤邊界：
   - 路由層級的錯誤處理
   - 降級顯示策略

// ==========================================
// 📱 響應式路由策略
// ==========================================

Desktop 路由：完整功能，所有模組可用
Tablet 路由：簡化某些 3D 效果，保持主要功能
Mobile 路由：優化觸控體驗，可能合併某些頁面

例：
- Desktop: /about/skills/tree (完整技能樹)
- Mobile: /about/skills (整合視圖，tab 切換)

// ==========================================
// 🎨 路由動畫設計
// ==========================================

1. 📄 頁面級動畫：
   - 淡入淡出
   - 滑動過場  
   - 縮放效果

2. 🔄 模組內導航動畫：
   - Tab 切換
   - 側邊欄滑動
   - 麵包屑更新

3. 🎯 3D 場景過場：
   - Landing Page 的 3D 場景
   - 與其他頁面的過場效果

/*
═══════════════════════════════════════════════════════════════
💡 開發建議：

1. 🚀 Phase 1: 建立基礎路由 (主要頁面)
2. 🔄 Phase 2: 加入嵌套路由 (模組內導航)  
3. ⚡ Phase 3: 效能優化 (Code Splitting + Preloading)
4. 🎨 Phase 4: 動畫與過場效果
5. 📱 Phase 5: 響應式優化與錯誤處理
═══════════════════════════════════════════════════════════════
*/