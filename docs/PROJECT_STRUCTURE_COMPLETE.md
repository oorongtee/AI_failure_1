src/
├── pages/
│   ├── Landing.tsx                    # 首頁
│   ├── Dashboard.tsx                  # AI Demo Dashboard 主頁
│   ├── workflow/
│   │   ├── WorkflowPage.tsx          # Workflow Timeline 主頁
│   │   └── StepDetailPage.tsx        # 步驟詳情頁面
│   ├── prompt-explorer/
│   │   ├── PromptExplorerPage.tsx    # Prompt 資料庫主頁
│   │   ├── CategoryPage.tsx          # 分類頁面
│   │   └── PromptDetailPage.tsx      # Prompt 詳情頁
│   ├── diff-viewer/
│   │   ├── DiffViewerPage.tsx        # 程式碼比較主頁
│   │   └── VersionHistoryPage.tsx    # 版本歷史頁
│   ├── ai-flow/
│   │   └── AIFlowPage.tsx            # AI Flow Graph 主頁
│   ├── about/
│   │   ├── AboutPage.tsx             # 關於我主頁
│   │   ├── ResumePage.tsx            # 互動履歷頁
│   │   └── SkillTreePage.tsx         # 技能樹頁面
│   └── portfolio/
│       ├── PortfolioPage.tsx         # 作品集主頁
│       └── ProjectDetailPage.tsx     # 專案詳情頁
│
├── components/
│   ├── 3D/
│   │   ├── Scene/
│   │   │   ├── HeroScene.tsx         # 主要 3D 場景
│   │   │   ├── Camera.tsx            # 攝影機控制
│   │   │   ├── Lights.tsx            # 燈光設定
│   │   │   └── Environment.tsx       # 環境設定
│   │   ├── Models/
│   │   │   ├── SkillOrbs.tsx         # 技能球體群組
│   │   │   ├── SkillOrb.tsx          # 單個技能球體
│   │   │   ├── FloatingCards.tsx     # 浮動卡片群組
│   │   │   ├── FloatingCard.tsx      # 單個浮動卡片
│   │   │   └── ParticleSystem.tsx    # 粒子系統
│   │   ├── Effects/
│   │   │   ├── PostProcessing.tsx    # 後製效果
│   │   │   ├── Bloom.tsx             # 光暈效果
│   │   │   └── Distortion.tsx        # 扭曲效果
│   │   └── Controls/
│   │       ├── MouseInteraction.tsx  # 滑鼠互動
│   │       └── CameraControls.tsx    # 攝影機控制
│   │
│   ├── UI/
│   │   ├── Common/
│   │   │   ├── Button.tsx            # ✅ 已完成
│   │   │   ├── Card.tsx              # ✅ 已完成
│   │   │   ├── Loader.tsx            # ✅ 已完成
│   │   │   ├── Modal.tsx             # 彈窗元件
│   │   │   ├── Tooltip.tsx           # 提示框
│   │   │   ├── Badge.tsx             # 標籤
│   │   │   ├── Input.tsx             # 輸入框
│   │   │   ├── Select.tsx            # 下拉選單
│   │   │   └── Switch.tsx            # 開關
│   │   ├── Layout/
│   │   │   ├── Layout.tsx            # ✅ 已完成
│   │   │   ├── Container.tsx         # 容器元件
│   │   │   ├── Grid.tsx              # 網格系統
│   │   │   ├── Section.tsx           # 區塊元件
│   │   │   └── Sidebar.tsx           # 側邊欄
│   │   ├── Navigation/
│   │   │   ├── Navbar.tsx            # 頂部導航
│   │   │   ├── NavItem.tsx           # 導航項目
│   │   │   ├── BreadcrumbNav.tsx     # 麵包屑導航
│   │   │   ├── FloatingMenu.tsx      # 浮動選單
│   │   │   └── MobileMenu.tsx        # 手機版選單
│   │   └── Animation/
│   │       ├── FadeIn.tsx            # 淡入動畫
│   │       ├── SlideIn.tsx           # 滑入動畫
│   │       ├── ScaleIn.tsx           # 縮放動畫
│   │       ├── Parallax.tsx          # 視差效果
│   │       └── PageTransition.tsx    # 頁面轉換
│   │
│   ├── Modules/
│   │   ├── WorkflowTimeline/
│   │   │   ├── Timeline.tsx          # 時間軸主體
│   │   │   ├── TimelineScroller.tsx  # 橫向滑動容器
│   │   │   ├── WorkflowCard.tsx      # 流程卡片
│   │   │   ├── StepDetail.tsx        # 步驟詳情
│   │   │   ├── StepIcon.tsx          # 步驟圖標
│   │   │   └── ProgressBar.tsx       # 進度條
│   │   ├── PromptExplorer/
│   │   │   ├── Explorer.tsx          # 主要介面
│   │   │   ├── CategoryList.tsx      # 分類列表
│   │   │   ├── CategoryItem.tsx      # 分類項目
│   │   │   ├── PromptList.tsx        # Prompt 列表
│   │   │   ├── PromptItem.tsx        # Prompt 項目
│   │   │   ├── PromptDetail.tsx      # Prompt 詳情
│   │   │   ├── SearchBar.tsx         # 搜尋列
│   │   │   └── FilterPanel.tsx       # 過濾面板
│   │   ├── DiffViewer/
│   │   │   ├── DiffEditor.tsx        # Monaco 編輯器
│   │   │   ├── CodeComparison.tsx    # 程式碼比較
│   │   │   ├── VersionHistory.tsx    # 版本歷史
│   │   │   ├── FileTree.tsx          # 檔案樹
│   │   │   └── DiffStats.tsx         # 差異統計
│   │   ├── AIFlowGraph/
│   │   │   ├── FlowCanvas.tsx        # React Flow 畫布
│   │   │   ├── NodeTypes/
│   │   │   │   ├── PromptNode.tsx    # Prompt 節點
│   │   │   │   ├── AINode.tsx        # AI 節點
│   │   │   │   ├── CodeNode.tsx      # 程式碼節點
│   │   │   │   ├── ReviewNode.tsx    # 審查節點
│   │   │   │   └── CommitNode.tsx    # 提交節點
│   │   │   ├── EdgeTypes/
│   │   │   │   ├── DataEdge.tsx      # 資料流邊線
│   │   │   │   └── ProcessEdge.tsx   # 流程邊線
│   │   │   ├── Controls/
│   │   │   │   ├── ZoomControls.tsx  # 縮放控制
│   │   │   │   ├── MiniMap.tsx       # 迷你地圖
│   │   │   │   └── NodePanel.tsx     # 節點面板
│   │   │   └── Toolbar.tsx           # 工具列
│   │   ├── AIDashboard/
│   │   │   ├── Dashboard.tsx         # 主要儀表板
│   │   │   ├── StatsCards/
│   │   │   │   ├── UsageCard.tsx     # 使用量卡片
│   │   │   │   ├── ToolsCard.tsx     # 工具卡片
│   │   │   │   ├── TimeCard.tsx      # 時間節省卡片
│   │   │   │   └── TrendsCard.tsx    # 趨勢卡片
│   │   │   ├── Charts/
│   │   │   │   ├── UsageChart.tsx    # 使用量圖表
│   │   │   │   ├── ToolsChart.tsx    # 工具分佈圖
│   │   │   │   ├── TimelineChart.tsx # 時間軸圖表
│   │   │   │   └── HeatmapChart.tsx  # 熱力圖
│   │   │   └── Widgets/
│   │   │       ├── QuickStats.tsx    # 快速統計
│   │   │       ├── RecentActivity.tsx# 最近活動
│   │   │       └── AIToolsList.tsx   # AI 工具列表
│   │   ├── InteractiveResume/
│   │   │   ├── Resume.tsx            # 履歷主體
│   │   │   ├── Timeline/
│   │   │   │   ├── ResumeTimeline.tsx# 履歷時間軸
│   │   │   │   ├── TimelineItem.tsx  # 時間軸項目
│   │   │   │   └── TimelineMarker.tsx# 時間標記
│   │   │   ├── Experience/
│   │   │   │   ├── ExperienceCard.tsx# 經歷卡片
│   │   │   │   ├── JobDescription.tsx# 工作描述
│   │   │   │   └── Achievement.tsx   # 成就項目
│   │   │   ├── Education/
│   │   │   │   ├── EducationCard.tsx # 教育卡片
│   │   │   │   └── Certificate.tsx   # 證書
│   │   │   └── Contact/
│   │   │       ├── ContactInfo.tsx   # 聯絡資訊
│   │   │       └── SocialLinks.tsx   # 社群連結
│   │   ├── SkillTree/
│   │   │   ├── SkillTree.tsx         # 技能樹主體
│   │   │   ├── Canvas/
│   │   │   │   ├── TreeCanvas.tsx    # Konva 畫布
│   │   │   │   └── TreeRenderer.tsx  # 樹狀渲染器
│   │   │   ├── Nodes/
│   │   │   │   ├── SkillNode.tsx     # 技能節點
│   │   │   │   ├── CategoryNode.tsx  # 分類節點
│   │   │   │   └── ConnectionLine.tsx# 連接線
│   │   │   ├── Categories/
│   │   │   │   ├── FrontendSkills.tsx# 前端技能
│   │   │   │   ├── BackendSkills.tsx # 後端技能
│   │   │   │   ├── AISkills.tsx      # AI 技能
│   │   │   │   ├── DesignSkills.tsx  # 設計技能
│   │   │   │   └── SoftSkills.tsx    # 軟技能
│   │   │   └── Controls/
│   │   │       ├── ZoomControl.tsx   # 縮放控制
│   │   │       ├── CategoryFilter.tsx# 分類過濾
│   │   │       └── SkillSearch.tsx   # 技能搜尋
│   │   ├── TechRadar/
│   │   │   ├── Radar.tsx             # D3.js 雷達圖主體
│   │   │   ├── Quadrants/
│   │   │   │   ├── AdoptQuadrant.tsx # Adopt 象限
│   │   │   │   ├── TrialQuadrant.tsx # Trial 象限
│   │   │   │   ├── AssessQuadrant.tsx# Assess 象限
│   │   │   │   └── HoldQuadrant.tsx  # Hold 象限
│   │   │   ├── Points/
│   │   │   │   ├── RadarPoint.tsx    # 雷達點
│   │   │   │   └── TechBubble.tsx    # 技術氣泡
│   │   │   ├── Legend/
│   │   │   │   ├── Legend.tsx        # 圖例
│   │   │   │   └── CategoryLegend.tsx# 分類圖例
│   │   │   └── Controls/
│   │   │       ├── RadarFilter.tsx   # 雷達過濾
│   │   │       └── TimelineSlider.tsx# 時間軸滑桿
│   │   └── SkillHeatmap/
│   │       ├── Heatmap.tsx           # 熱力圖主體
│   │       ├── Grid/
│   │       │   ├── HeatmapGrid.tsx   # 網格容器
│   │       │   ├── Cell.tsx          # 單元格
│   │       │   └── MonthLabel.tsx    # 月份標籤
│   │       ├── Calendar/
│   │       │   ├── YearView.tsx      # 年份視圖
│   │       │   └── MonthView.tsx     # 月份視圖
│   │       ├── Tooltip/
│   │       │   ├── Tooltip.tsx       # 提示框
│   │       │   └── ActivityDetail.tsx# 活動詳情
│   │       └── Controls/
│   │           ├── YearSelector.tsx  # 年份選擇器
│   │           └── SkillFilter.tsx   # 技能過濾器
│   │
│   └── Portfolio/
│       ├── ProjectGallery.tsx        # 專案畫廊
│       ├── ProjectCard.tsx           # 專案卡片
│       ├── ProjectDetail.tsx         # 專案詳情
│       ├── TechStack.tsx             # 技術堆疊
│       ├── Screenshots.tsx           # 截圖輪播
│       └── DemoLinks.tsx             # 展示連結
│
├── hooks/
│   ├── use3D.ts                      # 3D 相關邏輯
│   ├── useAnimation.ts               # 動畫控制
│   ├── useResponsive.ts              # 響應式設計
│   ├── useScroll.ts                  # 滾動監聽
│   ├── useMousePosition.ts           # 滑鼠位置
│   ├── useIntersectionObserver.ts    # 視窗交集觀察
│   ├── useLocalStorage.ts            # 本地儲存
│   ├── useTheme.ts                   # 主題切換
│   ├── useKeyboard.ts                # 鍵盤快捷鍵
│   └── useWebGL.ts                   # WebGL 檢測
│
├── utils/
│   ├── three/
│   │   ├── materials.ts              # 材質工具
│   │   ├── geometries.ts             # 幾何體工具
│   │   ├── animations.ts             # 3D 動畫工具
│   │   └── helpers.ts                # Three.js 輔助工具
│   ├── animation/
│   │   ├── easing.ts                 # 緩動函數
│   │   ├── transitions.ts            # 過場動畫
│   │   └── keyframes.ts              # 關鍵幀
│   ├── math/
│   │   ├── vector.ts                 # 向量計算
│   │   ├── matrix.ts                 # 矩陣計算
│   │   ├── interpolation.ts          # 插值計算
│   │   └── physics.ts                # 物理計算
│   ├── format/
│   │   ├── date.ts                   # 日期格式化
│   │   ├── number.ts                 # 數字格式化
│   │   └── text.ts                   # 文字格式化
│   ├── validation/
│   │   ├── schema.ts                 # 驗證規則
│   │   └── validators.ts             # 驗證器
│   ├── constants.ts                  # 常數定義
│   ├── config.ts                     # 配置管理
│   └── api.ts                        # API 工具
│
├── data/
│   ├── projects.ts                   # 專案資料
│   ├── skills.ts                     # 技能資料
│   ├── experience.ts                 # 經歷資料
│   ├── education.ts                  # 教育資料
│   ├── workflow.ts                   # 工作流程資料
│   ├── prompts.ts                    # Prompt 資料庫
│   ├── aiTools.ts                    # AI 工具資料
│   ├── techRadar.ts                  # 技術雷達資料
│   ├── landingPage.ts                # ✅ 已完成
│   └── navigation.ts                 # 導航資料
│
├── types/
│   ├── global.ts                     # ✅ 已完成
│   ├── workflow.ts                   # 工作流程類型
│   ├── skills.ts                     # 技能類型
│   ├── projects.ts                   # 專案類型
│   ├── ai.ts                         # AI 相關類型
│   ├── charts.ts                     # 圖表類型
│   └── api.ts                        # API 類型
│
├── stores/
│   ├── appStore.ts                   # ✅ 已完成
│   ├── themeStore.ts                 # 主題狀態
│   ├── workflowStore.ts              # 工作流程狀態
│   ├── skillsStore.ts                # 技能狀態
│   ├── projectsStore.ts              # 專案狀態
│   └── uiStore.ts                    # UI 狀態
│
└── styles/
    ├── globals.css                   # 全域樣式
    ├── animations.css                # 動畫樣式
    ├── components.css                # 元件樣式
    └── themes.css                    # 主題樣式