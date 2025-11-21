import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Theme, SkillOrb, WorkflowTimeline, AITool } from '../types/global';

// 主要應用程式狀態
interface AppState {
  // 主題相關
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // 載入狀態
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // 當前頁面
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // 3D 場景相關
  skillOrbs: SkillOrb[];
  setSkillOrbs: (orbs: SkillOrb[]) => void;

  // 工作流程資料
  workflows: WorkflowTimeline[];
  setWorkflows: (workflows: WorkflowTimeline[]) => void;
  
  // AI 工具統計
  aiTools: AITool[];
  setAITools: (tools: AITool[]) => void;

  // 響應式狀態
  screenSize: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
  setScreenSize: (size: AppState['screenSize']) => void;

  // 滾動位置
  scrollY: number;
  setScrollY: (y: number) => void;

  // 滑鼠位置（用於 3D 互動）
  mousePosition: { x: number; y: number };
  setMousePosition: (pos: { x: number; y: number }) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // 初始狀態
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),

      currentPage: '/',
      setCurrentPage: (page) => set({ currentPage: page }),

      skillOrbs: [],
      setSkillOrbs: (orbs) => set({ skillOrbs: orbs }),

      workflows: [],
      setWorkflows: (workflows) => set({ workflows }),

      aiTools: [],
      setAITools: (tools) => set({ aiTools: tools }),

      screenSize: {
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      },
      setScreenSize: (size) => set({ screenSize: size }),

      scrollY: 0,
      setScrollY: (y) => set({ scrollY: y }),

      mousePosition: { x: 0, y: 0 },
      setMousePosition: (pos) => set({ mousePosition: pos }),
    }),
    {
      name: 'app-store', // DevTools 中的名稱
    }
  )
);