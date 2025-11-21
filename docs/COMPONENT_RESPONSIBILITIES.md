/*
═══════════════════════════════════════════════════════════════
📋 COMPONENT RESPONSIBILITY MATRIX
每個元件的職責說明與 Props 定義（不含實作程式碼）
═══════════════════════════════════════════════════════════════
*/

// ==========================================
// 🔄 WORKFLOW TIMELINE MODULE
// ==========================================

Timeline.tsx
- 職責：工作流程時間軸的主要容器元件
- Props: { workflows: WorkflowTimeline[], selectedId?: string }
- 功能：管理整個時間軸的狀態，包含選中項目、滾動位置
- 未來加入：左右滑動手勢、鍵盤導航、自動播放
- 子元件：TimelineScroller, WorkflowCard

TimelineScroller.tsx
- 職責：處理橫向滑動的容器與滾動邏輯
- Props: { children: ReactNode, onScroll?: (position) => void }
- 功能：虛擬化滾動、滑動慣性、滾動指示器
- 未來加入：觸控手勢支援、滾動吸附、效能優化
- 整合：Framer Motion 滑動動畫

WorkflowCard.tsx
- 職責：渲染單一工作流程步驟的 3D 卡片
- Props: { step: WorkflowStep, isActive: boolean, onClick: () => void }
- 功能：3D 翻轉動畫、hover 效果、狀態指示
- 未來加入：3D Transform、發光效果、連接線動畫
- 整合：React Three Fiber 或 CSS 3D Transform

StepDetail.tsx
- 職責：顯示步驟詳細資訊的彈窗或側邊欄
- Props: { step: WorkflowStep, isOpen: boolean, onClose: () => void }
- 功能：展示 prompt、AI 回應、人工修改內容
- 未來加入：程式碼高亮、差異比較、複製功能
- 整合：Monaco Editor for code display

StepIcon.tsx
- 職責：渲染步驟類型對應的圖示與狀態
- Props: { type: StepType, status: StepStatus, size?: 'sm' | 'md' | 'lg' }
- 功能：動態圖示、狀態顏色、載入動畫
- 未來加入：SVG 動畫、狀態過場效果

ProgressBar.tsx
- 職責：顯示整體工作流程的進度
- Props: { steps: WorkflowStep[], currentStep: number }
- 功能：進度計算、動畫效果、里程碑標記
- 未來加入：非線性進度、分支路徑支援

// ==========================================
// 🔍 PROMPT EXPLORER MODULE
// ==========================================

Explorer.tsx
- 職責：Prompt 資料庫的主要介面容器
- Props: { initialCategory?: string }
- 功能：狀態管理、搜尋結果、分類切換
- 未來加入：智慧搜尋、標籤過濾、收藏功能
- 佈局：左側分類 + 右側內容（Notion 風格）

CategoryList.tsx
- 職責：左側分類導航列表
- Props: { categories: Category[], selectedId?: string, onSelect: (id) => void }
- 功能：分類樹狀結構、摺疊展開、計數顯示
- 未來加入：拖拽排序、自定義分類、搜尋分類

CategoryItem.tsx
- 職責：單一分類項目的渲染
- Props: { category: Category, isSelected: boolean, level: number }
- 功能：巢狀層級顯示、圖示、計數徽章
- 未來加入：右鍵選單、編輯模式

PromptList.tsx
- 職責：右側 Prompt 列表容器
- Props: { prompts: Prompt[], loading?: boolean }
- 功能：虛擬化清單、載入更多、排序
- 未來加入：無限滾動、快速預覽、批次操作

PromptItem.tsx
- 職責：單一 Prompt 項目卡片
- Props: { prompt: Prompt, onClick: () => void, showPreview?: boolean }
- 功能：標題、預覽、標籤、統計資訊
- 未來加入：hover 預覽、快速動作按鈕

PromptDetail.tsx
- 職責：Prompt 詳細內容展示
- Props: { prompt: Prompt, aiResponse?: string, humanFix?: string }
- 功能：完整內容顯示、AI 回應、人工修改對比
- 未來加入：版本歷史、分享功能、評分系統
- 整合：Monaco Editor + Diff Viewer

SearchBar.tsx
- 職責：智慧搜尋輸入框
- Props: { onSearch: (query) => void, placeholder?: string }
- 功能：即時搜尋、搜尋建議、歷史記錄
- 未來加入：語音輸入、AI 搜尋建議

FilterPanel.tsx
- 職責：進階過濾選項面板
- Props: { filters: FilterOptions, onChange: (filters) => void }
- 功能：標籤過濾、日期範圍、評分過濾
- 未來加入：自定義過濾器、儲存過濾器

// ==========================================
// 📝 DIFF VIEWER MODULE
// ==========================================

DiffEditor.tsx
- 職責：Monaco Editor 的程式碼比較介面
- Props: { original: string, modified: string, language: string }
- 功能：並排比較、差異高亮、編輯功能
- 未來加入：迷你地圖、搜尋替換、主題切換
- 整合：Monaco Editor + react-diff-viewer

CodeComparison.tsx
- 職責：程式碼比較的主要容器
- Props: { versions: CodeVersion[], selectedVersions: [string, string] }
- 功能：版本選擇、比較模式切換、統計資訊
- 未來加入：三向比較、衝突解決

VersionHistory.tsx
- 職責：程式碼版本歷史時間軸
- Props: { versions: CodeVersion[], onSelect: (version) => void }
- 功能：時間軸展示、版本資訊、分支視覺化
- 未來加入：Git 整合、標籤管理

FileTree.tsx
- 職責：檔案樹狀結構導航
- Props: { files: FileNode[], onSelect: (file) => void }
- 功能：摺疊展開、檔案類型圖示、搜尋
- 未來加入：拖拽操作、右鍵選單

DiffStats.tsx
- 職責：差異統計資訊展示
- Props: { stats: DiffStatistics }
- 功能：新增/刪除/修改行數、變更文件數
- 未來加入：圖表展示、詳細分析

// ==========================================
// 🌐 AI FLOW GRAPH MODULE
// ==========================================

FlowCanvas.tsx
- 職責：React Flow 主要畫布容器
- Props: { nodes: FlowNode[], edges: FlowEdge[], onNodesChange, onEdgesChange }
- 功能：節點拖拽、連線建立、畫布操控
- 未來加入：自動佈局、群組功能、縮放限制
- 整合：React Flow + 自定義節點類型

PromptNode.tsx
- 職責：Prompt 輸入節點
- Props: { data: PromptData, selected?: boolean }
- 功能：多行文字輸入、格式化顯示、連接點
- 未來加入：語法高亮、模板選擇、驗證

AINode.tsx
- 職責：AI 處理節點
- Props: { data: AINodeData, status: ProcessingStatus }
- 功能：AI 模型選擇、處理狀態、輸出預覽
- 未來加入：模型切換、即時處理、錯誤處理

CodeNode.tsx
- 職責：程式碼輸出節點
- Props: { data: CodeData, language: string }
- 功能：程式碼顯示、語法高亮、複製功能
- 未來加入：即時預覽、執行功能、格式化

ReviewNode.tsx
- 職責：人工審查節點
- Props: { data: ReviewData, reviewStatus: ReviewStatus }
- 功能：審查表單、註解功能、狀態管理
- 未來加入：協作審查、版本控制

CommitNode.tsx
- 職責：提交/部署節點
- Props: { data: CommitData, deployStatus: DeployStatus }
- 功能：提交資訊、部署狀態、回滾功能
- 未來加入：CI/CD 整合、自動部署

DataEdge.tsx / ProcessEdge.tsx
- 職責：自定義連線樣式
- Props: { data: EdgeData, animated?: boolean }
- 功能：數據流向指示、動畫效果、條件邏輯
- 未來加入：數據預覽、條件分支

ZoomControls.tsx / MiniMap.tsx / NodePanel.tsx / Toolbar.tsx
- 職責：流程圖操作工具
- 功能：縮放控制、迷你地圖、節點屬性、工具列
- 未來加入：快捷鍵、自定義工具、插件系統

// ==========================================
// 📊 AI DASHBOARD MODULE
// ==========================================

Dashboard.tsx
- 職責：AI 工具使用儀表板主容器
- Props: { timeRange?: DateRange, refreshInterval?: number }
- 功能：佈局管理、數據刷新、響應式排版
- 未來加入：自定義佈局、小工具拖拽、即時更新

UsageCard.tsx / ToolsCard.tsx / TimeCard.tsx / TrendsCard.tsx
- 職責：統計資訊卡片元件
- Props: { data: StatData, loading?: boolean, variant?: CardVariant }
- 功能：數據展示、載入狀態、動畫效果
- 未來加入：鑽取功能、自定義指標、匯出數據

UsageChart.tsx / ToolsChart.tsx / TimelineChart.tsx / HeatmapChart.tsx
- 職責：各種圖表元件
- Props: { data: ChartData, config: ChartConfig, interactive?: boolean }
- 功能：數據視覺化、互動式圖表、工具提示
- 未來加入：實時更新、動畫過場、自定義主題
- 整合：D3.js / Visx / Chart.js

QuickStats.tsx / RecentActivity.tsx / AIToolsList.tsx
- 職責：儀表板小工具
- 功能：快速統計、活動紀錄、工具列表
- 未來加入：可配置顯示、快速動作

// ==========================================
// 📄 INTERACTIVE RESUME MODULE
// ==========================================

Resume.tsx
- 職責：互動履歷主容器
- Props: { resumeData: ResumeData, viewMode?: ViewMode }
- 功能：視圖模式切換、列印功能、分享功能
- 未來加入：PDF 匯出、多語言支援、主題切換

ResumeTimeline.tsx
- 職責：履歷時間軸主體
- Props: { experiences: Experience[], education: Education[] }
- 功能：橫向滾動時間軸、SVG Path 動畫
- 未來加入：互動式時間軸、篩選功能
- 整合：SVG + Framer Motion

TimelineItem.tsx / TimelineMarker.tsx
- 職責：時間軸項目與標記
- Props: { item: TimelineItem, position: Position, isActive?: boolean }
- 功能：項目展示、hover 效果、展開收合
- 未來加入：詳細彈窗、成就動畫

ExperienceCard.tsx / JobDescription.tsx / Achievement.tsx
- 職責：工作經歷相關元件
- Props: { experience: Experience, expandable?: boolean }
- 功能：職位資訊、工作描述、成就列表
- 未來加入：技能標籤、專案連結

EducationCard.tsx / Certificate.tsx
- 職責：教育背景與證書
- Props: { education: Education, certificates: Certificate[] }
- 功能：學歷展示、證書驗證、技能關聯
- 未來加入：證書圖片、驗證連結

ContactInfo.tsx / SocialLinks.tsx
- 職責：聯絡資訊與社群連結
- Props: { contact: ContactData, social: SocialLink[] }
- 功能：聯絡方式、社群平台連結、QR Code
- 未來加入：vCard 下載、即時狀態

// ==========================================
// 🌳 SKILL TREE MODULE
// ==========================================

SkillTree.tsx
- 職責：遊戲風格技能樹主容器
- Props: { skills: SkillNode[], layout?: TreeLayout }
- 功能：樹狀佈局、縮放控制、技能解鎖邏輯
- 未來加入：動畫效果、成就系統、進度儲存
- 整合：Konva.js 或 React Flow

TreeCanvas.tsx / TreeRenderer.tsx
- 職責：Canvas 渲染與樹狀結構繪製
- Props: { nodes: SkillNode[], connections: Connection[] }
- 功能：高效能渲染、互動偵測、動畫系統
- 未來加入：WebGL 加速、粒子效果

SkillNode.tsx / CategoryNode.tsx / ConnectionLine.tsx
- 職責：技能節點與連接線
- Props: { skill: Skill, unlocked?: boolean, level: number }
- 功能：節點外觀、解鎖狀態、升級動畫
- 未來加入：技能效果、解鎖條件顯示

FrontendSkills.tsx / BackendSkills.tsx / AISkills.tsx / DesignSkills.tsx / SoftSkills.tsx
- 職責：各技能分類的數據與配置
- 功能：技能樹數據、依賴關係、升級路徑
- 未來加入：動態技能樹、個人化推薦

ZoomControl.tsx / CategoryFilter.tsx / SkillSearch.tsx
- 職責：技能樹操作控制項
- 功能：縮放、過濾、搜尋、導航
- 未來加入：快速定位、路徑規劃

// ==========================================
// 📡 TECH RADAR MODULE
// ==========================================

Radar.tsx
- 職責：D3.js 技術雷達圖主體
- Props: { technologies: TechItem[], quadrants: Quadrant[] }
- 功能：雷達圖繪製、象限劃分、互動功能
- 未來加入：動畫過場、時間軸播放、自定義象限
- 整合：D3.js + SVG

AdoptQuadrant.tsx / TrialQuadrant.tsx / AssessQuadrant.tsx / HoldQuadrant.tsx
- 職責：四個象限的數據與渲染
- Props: { technologies: TechItem[], quadrant: QuadrantType }
- 功能：象限內技術點、顏色編碼、密度控制
- 未來加入：象限自定義、技術軌跡

RadarPoint.tsx / TechBubble.tsx
- 職責：雷達圖上的技術點
- Props: { tech: Technology, position: Position, size: number }
- 功能：技術點渲染、hover 效果、詳情彈窗
- 未來加入：動態大小、趨勢指示

Legend.tsx / CategoryLegend.tsx
- 職責：圖例與說明
- Props: { categories: Category[], colors: ColorScheme }
- 功能：分類說明、顏色對照、互動過濾
- 未來加入：智慧圖例、動態更新

RadarFilter.tsx / TimelineSlider.tsx
- 職責：雷達圖控制項
- Props: { filters: FilterOptions, onFilterChange: () => void }
- 功能：技術過濾、時間軸控制、視圖切換
- 未來加入：複雜查詢、預設視圖

// ==========================================
// 🔥 SKILL HEATMAP MODULE
// ==========================================

Heatmap.tsx
- 職責：GitHub 風格技能熱力圖主體
- Props: { data: ActivityData[], year: number }
- 功能：熱力圖渲染、數據聚合、顏色映射
- 未來加入：多年對比、技能分類、自定義顏色
- 整合：D3.js 或純 CSS Grid

HeatmapGrid.tsx / Cell.tsx / MonthLabel.tsx
- 職責：網格佈局與單元格
- Props: { date: Date, value: number, onClick?: () => void }
- 功能：日期網格、活動強度、hover 效果
- 未來加入：週/月視圖、自定義週期

YearView.tsx / MonthView.tsx
- 職責：不同時間粒度的視圖
- Props: { data: ActivityData[], period: TimePeriod }
- 功能：視圖切換、數據聚合、縮放功能
- 未來加入：季度視圖、自定義範圍

Tooltip.tsx / ActivityDetail.tsx
- 職責：活動詳情提示框
- Props: { activity: Activity, position: Position }
- 功能：詳細資訊、相關技能、學習記錄
- 未來加入：快速動作、關聯推薦

YearSelector.tsx / SkillFilter.tsx
- 職責：時間與技能過濾控制
- Props: { availableYears: number[], selectedSkills: string[] }
- 功能：年份切換、技能篩選、統計摘要
- 未來加入：範圍選擇、批次操作

// ==========================================
// 🎯 3D SCENE MODULE
// ==========================================

HeroScene.tsx
- 職責：Landing Page 主要 3D 場景
- Props: { mousePosition: Vector2, scrollY: number }
- 功能：場景管理、相機控制、光源設定
- 未來加入：動態環境、後製效果、效能優化
- 整合：React Three Fiber + Drei

SkillOrbs.tsx / SkillOrb.tsx
- 職責：3D 技能球體系統
- Props: { skills: SkillData[], interactive?: boolean }
- 功能：球體動畫、滑鼠互動、物理效果
- 未來加入：引力系統、碰撞偵測、粒子效果

FloatingCards.tsx / FloatingCard.tsx
- 職責：3D 浮動卡片群組
- Props: { cards: CardData[], animationSpeed?: number }
- 功能：卡片浮動、旋轉動畫、深度層次
- 未來加入：視差效果、動態內容

ParticleSystem.tsx
- 職責：背景粒子系統
- Props: { count: number, speed: number, mouseInfluence?: boolean }
- 功能：粒子渲染、動態效果、互動響應
- 未來加入：GPU 粒子、複雜行為、WebGL Shader

PostProcessing.tsx / Bloom.tsx / Distortion.tsx
- 職責：後製效果與視覺增強
- Props: { intensity: number, enabled?: boolean }
- 功能：光暈效果、扭曲效果、色彩調整
- 未來加入：自定義 Shader、效能控制

MouseInteraction.tsx / CameraControls.tsx
- 職責：3D 場景互動控制
- Props: { sensitivity: number, bounds?: Bounds }
- 功能：滑鼠追蹤、攝影機跟隨、平滑過渡
- 未來加入：觸控支援、手勢識別

/*
═══════════════════════════════════════════════════════════════
📝 開發優先順序建議：

1. 🎯 Landing Page 3D Scene（視覺震撼）
   - HeroScene.tsx
   - SkillOrbs.tsx
   - ParticleSystem.tsx
   - MouseInteraction.tsx

2. 🔄 Workflow Timeline（核心功能）
   - Timeline.tsx
   - WorkflowCard.tsx
   - StepDetail.tsx

3. 📊 AI Dashboard（專業展示）
   - Dashboard.tsx
   - StatsCards 系列
   - Charts 系列

4. 🌳 Skill Tree（互動體驗）
   - SkillTree.tsx
   - TreeCanvas.tsx
   - SkillNode.tsx

5. 其他模組依需求優先順序開發...
═══════════════════════════════════════════════════════════════
*/