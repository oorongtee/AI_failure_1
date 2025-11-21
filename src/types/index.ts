// Global Application Types
export interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  loading: boolean;
  error: string | null;
}

// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  animations: boolean;
  autoSave: boolean;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  browser: boolean;
  sound: boolean;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
  children?: NavigationItem[];
  isActive?: boolean;
  disabled?: boolean;
  badge?: string | number;
}

// Workflow Timeline Types
export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  type: 'milestone' | 'task' | 'review' | 'deployment';
  startDate: Date;
  endDate?: Date;
  duration: number; // in hours
  assignee?: User;
  tags: string[];
  dependencies: string[];
  metadata: TimelineMetadata;
}

export interface TimelineMetadata {
  priority: 'low' | 'medium' | 'high' | 'critical';
  complexity: number; // 1-10 scale
  progress: number; // 0-100 percentage
  notes?: string;
  attachments?: Attachment[];
}

export interface TimelineFilter {
  status?: TimelineStep['status'][];
  type?: TimelineStep['type'][];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  assignee?: string[];
}

// AI Flow Graph Types
export interface FlowNode {
  id: string;
  type: 'aiNode' | 'processNode' | 'dataNode' | 'outputNode';
  position: Position;
  data: FlowNodeData;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
}

export interface FlowNodeData {
  label: string;
  description?: string;
  type?: string;
  size?: string;
  format?: string;
  performance?: string;
  status?: string;
  confidence?: string;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type?: 'smoothstep' | 'straight' | 'step';
  animated?: boolean;
  style?: React.CSSProperties;
  label?: string;
}

export interface FlowTemplate {
  name: string;
  description: string;
  nodeCount: number;
  complexity: 'Low' | 'Medium' | 'High';
  nodes: FlowNode[];
  edges: FlowEdge[];
}

// Prompt Explorer Types
export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  usage: PromptUsage;
  rating: number;
  isFavorite: boolean;
  isPublic: boolean;
  variables?: PromptVariable[];
}

export interface PromptCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  parentId?: string;
  children?: PromptCategory[];
}

export interface PromptVariable {
  name: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  required: boolean;
  defaultValue?: any;
  options?: string[];
  description?: string;
}

export interface PromptUsage {
  count: number;
  lastUsed: Date;
  successRate: number;
}

// Diff Viewer Types
export interface DiffFile {
  id: string;
  name: string;
  path: string;
  language: string;
  original: string;
  modified: string;
  status: 'added' | 'modified' | 'deleted' | 'renamed';
  additions: number;
  deletions: number;
}

export interface DiffSession {
  id: string;
  title: string;
  description?: string;
  files: DiffFile[];
  createdAt: Date;
  author: User;
  tags: string[];
}

// Interactive Resume Types
export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: ResumeSkill[];
  projects: Project[];
  awards: Award[];
  certifications: Certification[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  avatar?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: Date;
  endDate: Date;
  gpa?: number;
  honors?: string[];
  coursework?: string[];
}

export interface ResumeSkill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-5 or 1-100
  years: number;
  keywords?: string[];
}

// Skill Tree Types
export interface SkillTreeNode {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 1-5
  completed: boolean;
  unlocked: boolean;
  progress: number; // 0-100
  description: string;
  prerequisites: string[];
  resources: string[];
  position: Position;
  xp: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface SkillProgress {
  totalXP: number;
  completedSkills: number;
  currentLevel: number;
  nextLevelXP: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Tech Radar Types
export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  ring: TechRing;
  angle: number; // 0-360 degrees
  description: string;
  trend: 'growing' | 'stable' | 'declining' | 'emerging' | 'obsolete';
  maturity: number; // 0-100
  adoptionLevel: number; // 0-100
  lastAssessed: Date;
  notes?: string;
}

export type TechCategory = 'Frameworks' | 'Languages' | 'Platforms' | 'Tools' | 'Techniques';
export type TechRing = 'adopt' | 'trial' | 'assess' | 'hold';

export interface TechRadarConfig {
  rings: TechRingConfig[];
  categories: TechCategoryConfig[];
  colors: Record<TechRing, string>;
}

export interface TechRingConfig {
  id: TechRing;
  name: string;
  description: string;
  color: string;
  radius: number;
}

export interface TechCategoryConfig {
  id: TechCategory;
  name: string;
  startAngle: number;
  endAngle: number;
}

// Skill Heatmap Types
export interface SkillHeatmapData {
  name: string;
  category: string;
  level: number; // 0-100
  growth: number; // percentage change
  lastUpdated: string;
  x: number;
  y: number;
  trend: 'up' | 'down' | 'stable';
  priority: 'low' | 'medium' | 'high';
}

export interface HeatmapFilter {
  categories: string[];
  levelRange: [number, number];
  growthRange: [number, number];
  timeRange: {
    start: Date;
    end: Date;
  };
}

// Dashboard Types
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedTasks: number;
  skillsLearned: number;
  growthRate: number;
}

export interface ActivityItem {
  id: string;
  type: 'skill_update' | 'project_complete' | 'achievement' | 'learning';
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
  metadata?: Record<string, any>;
}

export interface PerformanceMetric {
  label: string;
  value: number; // 0-100
  change: number; // percentage change
  trend: 'up' | 'down' | 'stable';
  target?: number;
}

// 3D Scene Types
export interface Scene3DConfig {
  camera: CameraConfig;
  lighting: LightingConfig;
  environment: EnvironmentConfig;
  performance: PerformanceConfig;
}

export interface EnvironmentConfig {
  background: string;
  fog?: FogConfig;
  skybox?: string;
}

export interface PerformanceConfig {
  shadows: boolean;
  antialias: boolean;
  pixelRatio: number;
  maxLights: number;
}

export interface FogConfig {
  color: string;
  near: number;
  far: number;
}

export interface CameraConfig {
  position: Vector3;
  target: Vector3;
  fov: number;
  near: number;
  far: number;
}

export interface LightingConfig {
  ambient: AmbientLightConfig;
  directional: DirectionalLightConfig[];
  point: PointLightConfig[];
}

export interface AmbientLightConfig {
  color: string;
  intensity: number;
}

export interface DirectionalLightConfig {
  color: string;
  intensity: number;
  position: Vector3;
  target: Vector3;
  castShadow: boolean;
}

export interface PointLightConfig {
  color: string;
  intensity: number;
  position: Vector3;
  distance: number;
  decay: number;
}

export interface Model3D {
  id: string;
  name: string;
  path: string;
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  animations?: Animation3D[];
}

export interface Animation3D {
  name: string;
  duration: number;
  loop: boolean;
  autoplay: boolean;
}

// Utility Types
export interface Position {
  x: number;
  y: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  technologies: string[];
  repository?: string;
  liveUrl?: string;
  images: string[];
  team: User[];
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: Date;
  description: string;
  category: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  verificationUrl?: string;
}

// Animation Types
export interface AnimationVariant {
  hidden: any;
  visible: any;
  exit?: any;
}

export interface TransitionConfig {
  duration: number;
  ease: string | number[];
  delay?: number;
  stagger?: number;
}

// API Types
export interface APIResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface APIError {
  code: string;
  message: string;
  details?: any;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio';
  required: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[];
  placeholder?: string;
  helpText?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Theme Types
export interface ThemeConfig {
  colors: ColorPalette;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  breakpoints: BreakpointConfig;
  animations: AnimationConfig;
}

export interface ColorPalette {
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface TypographyConfig {
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  fontSize: Record<string, [string, string]>;
  fontWeight: Record<string, number>;
  lineHeight: Record<string, string>;
}

export interface SpacingConfig {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  56: string;
  64: string;
}

export interface BreakpointConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface AnimationConfig {
  duration: Record<string, string>;
  easing: Record<string, string>;
  delay: Record<string, string>;
}

// Event Types
export interface CustomEvent<T = any> {
  type: string;
  payload: T;
  timestamp: Date;
  source: string;
}