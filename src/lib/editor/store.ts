import { create } from 'zustand';

// ===== Ghost-specific types =====

export interface GhostThemeMeta {
  postsPerPage: number;
  imageSizes: Record<string, { width: number }>;
}

export interface CustomThemeSetting {
  key: string;                              // snake_case
  type: 'select' | 'boolean' | 'color' | 'image' | 'text';
  default: string | boolean;
  options?: string[];                       // for select type
  group?: 'homepage' | 'post' | '';         // '' = site-wide
  description?: string;
}

export interface GhostBinding {
  resource: 'posts' | 'tags' | 'authors' | 'pages';
  filter?: {
    tag?: string[];
    featured?: boolean;
    author?: string;
    excludeId?: boolean;
  };
  limit?: number;
  include?: ('authors' | 'tags')[];
  order?: string;
}

export interface RouteCollection {
  path: string;
  permalink: string;
  template: string;
  filter?: string;
  order?: number;
}

export interface RoutingConfig {
  collections: RouteCollection[];
  taxonomies: { tag: string; author: string };
}

// ===== Core data types =====

export interface DesignSystem {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    h1Size: string;
    h2Size: string;
    h3Size: string;
    h4Size: string;
    bodySize: string;
    smallSize: string;
  };
  spacing: {
    sectionPadding: string;
    containerMaxWidth: string;
  };
  borderRadius: string;
  // Track which tokens are "editable in Ghost Admin after publish"
  editableTokens?: string[];   // e.g. ["colors.primary", "colors.accent"]
}

export interface NavItem {
  label: string;
  url: string;
}

export interface PageData {
  id: string;
  name: string;
  slug: string;
  type: string;
  isHomepage: boolean;
  sortOrder: number;
  content: Record<string, unknown>;
  metadata: Record<string, unknown>;
  isCollection: boolean;
  collectionFilter: string;
}

export interface ProjectData {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  themeSettings: Record<string, unknown>;
  designSystem: DesignSystem;
  navigation: NavItem[];
  pages: PageData[];
  customSettings: CustomThemeSetting[];
  routing: RoutingConfig;
}

interface EditorState {
  // Project data
  project: ProjectData | null;
  currentPageId: string | null;
  
  // UI state
  isSaving: boolean;
  lastSaved: Date | null;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  leftPanelTab: 'components' | 'pages' | 'layers';
  rightPanelTab: 'properties' | 'design' | 'settings';
  
  // Actions
  setProject: (project: ProjectData) => void;
  setCurrentPage: (pageId: string) => void;
  updatePageContent: (pageId: string, content: Record<string, unknown>) => void;
  updateDesignSystem: (designSystem: DesignSystem) => void;
  updateNavigation: (navigation: NavItem[]) => void;
  updateCustomSettings: (settings: CustomThemeSetting[]) => void;
  updateRouting: (routing: RoutingConfig) => void;
  toggleDesignTokenEditable: (tokenPath: string) => void;
  updatePageCollectionConfig: (pageId: string, isCollection: boolean, filter?: string) => void;
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  setLeftPanelTab: (tab: 'components' | 'pages' | 'layers') => void;
  setRightPanelTab: (tab: 'properties' | 'design' | 'settings') => void;
  setSaving: (saving: boolean) => void;
  addPage: (page: PageData) => void;
  removePage: (pageId: string) => void;
  renamePage: (pageId: string, name: string) => void;
  
  // Computed
  getCurrentPage: () => PageData | null;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  project: null,
  currentPageId: null,
  isSaving: false,
  lastSaved: null,
  previewDevice: 'desktop',
  leftPanelTab: 'components',
  rightPanelTab: 'properties',

  setProject: (project) => {
    const homepage = project.pages.find((p) => p.isHomepage) || project.pages[0];
    set({ project, currentPageId: homepage?.id || null });
  },

  setCurrentPage: (pageId) => set({ currentPageId: pageId }),

  updatePageContent: (pageId, content) =>
    set((state) => {
      if (!state.project) return state;
      return {
        project: {
          ...state.project,
          pages: state.project.pages.map((p) =>
            p.id === pageId ? { ...p, content } : p
          ),
        },
      };
    }),

  updateDesignSystem: (designSystem) =>
    set((state) => {
      if (!state.project) return state;
      return { project: { ...state.project, designSystem } };
    }),

  updateNavigation: (navigation) =>
    set((state) => {
      if (!state.project) return state;
      return { project: { ...state.project, navigation } };
    }),

  updateCustomSettings: (customSettings) =>
    set((state) => {
      if (!state.project) return state;
      return { project: { ...state.project, customSettings } };
    }),

  updateRouting: (routing) =>
    set((state) => {
      if (!state.project) return state;
      return { project: { ...state.project, routing } };
    }),

  toggleDesignTokenEditable: (tokenPath) =>
    set((state) => {
      if (!state.project) return state;
      const ds = { ...state.project.designSystem };
      const editable = new Set(ds.editableTokens || []);
      if (editable.has(tokenPath)) {
        editable.delete(tokenPath);
      } else {
        editable.add(tokenPath);
      }
      ds.editableTokens = Array.from(editable);
      return { project: { ...state.project, designSystem: ds } };
    }),

  updatePageCollectionConfig: (pageId, isCollection, filter) =>
    set((state) => {
      if (!state.project) return state;
      return {
        project: {
          ...state.project,
          pages: state.project.pages.map((p) =>
            p.id === pageId
              ? { ...p, isCollection, collectionFilter: filter || '' }
              : p
          ),
        },
      };
    }),

  setPreviewDevice: (previewDevice) => set({ previewDevice }),
  setLeftPanelTab: (leftPanelTab) => set({ leftPanelTab }),
  setRightPanelTab: (rightPanelTab) => set({ rightPanelTab }),
  setSaving: (isSaving) =>
    set({ isSaving, lastSaved: isSaving ? get().lastSaved : new Date() }),

  addPage: (page) =>
    set((state) => {
      if (!state.project) return state;
      return {
        project: {
          ...state.project,
          pages: [...state.project.pages, page],
        },
      };
    }),

  removePage: (pageId) =>
    set((state) => {
      if (!state.project) return state;
      const pages = state.project.pages.filter((p) => p.id !== pageId);
      return {
        project: { ...state.project, pages },
        currentPageId:
          state.currentPageId === pageId
            ? pages[0]?.id || null
            : state.currentPageId,
      };
    }),

  renamePage: (pageId, name) =>
    set((state) => {
      if (!state.project) return state;
      return {
        project: {
          ...state.project,
          pages: state.project.pages.map((p) =>
            p.id === pageId ? { ...p, name } : p
          ),
        },
      };
    }),

  getCurrentPage: () => {
    const state = get();
    if (!state.project || !state.currentPageId) return null;
    return state.project.pages.find((p) => p.id === state.currentPageId) || null;
  },
}));
