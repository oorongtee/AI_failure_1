// 全域類型定義
export interface BaseComponent {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

// 3D 相關類型
export interface Vector3 {
  x: number;
  y: number; 
  z: number;
}

export interface SkillOrb {
  id: string;
  skill: string;
  color: string;
  position: Vector3;
  level: number;
  category: SkillCategory;
}

export type SkillCategory = 'frontend' | 'backend' | 'ai' | 'devops' | 'design' | 'soft';

// 工作流程類型
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'idea' | 'prompt' | 'ai-response' | 'human-fix' | 'commit' | 'deploy';
  timestamp: Date;
  status: 'pending' | 'in-progress' | 'completed';
  details?: {
    prompt?: string;
    aiResponse?: string;
    humanFix?: string;
    code?: string;
  };
}

export interface WorkflowTimeline {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
  createdAt: Date;
  updatedAt: Date;
}

// AI 工具類型
export interface AITool {
  id: string;
  name: string;
  category: string;
  usageCount: number;
  averageTimeSaved: number; // 分鐘
  lastUsed: Date;
  icon: string;
}

// 技能樹類型
export interface SkillNode {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  category: SkillCategory;
  dependencies: string[]; // 其他技能 ID
  position: { x: number; y: number };
  isUnlocked: boolean;
  experience: number;
}

// 專案類型
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  demo?: string;
  github?: string;
  featured: boolean;
  completedAt: Date;
}

// 經歷類型
export interface Experience {
  id: string;
  company: string;
  position: string;
  period: {
    start: Date;
    end?: Date; // 若為 undefined 表示目前職位
  };
  description: string;
  achievements: string[];
  technologies: string[];
}

// 動畫相關類型
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
  repeat?: number;
}

// 主題類型
export type Theme = 'dark' | 'light' | 'auto';

// 響應式斷點
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';