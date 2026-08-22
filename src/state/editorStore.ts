import { create } from 'zustand';

interface EditorState {
  selectedTemplateId: string | null;
  selectedSectionId: string | null;
  selectedLayoutId: string | null;
  activeTab: 'templates' | 'layouts';
  hoverId: string | null;
  clipboard: string | null;
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  previewMode: 'light' | 'dark';
  isAddSectionModalOpen: boolean;
  accordionState: Record<string, boolean>;
  activeRightTab: 'section' | 'theme';
  activePreviewMode: 'design' | 'ghost';
  ghostPreviewUrl: string | null;
  ghostPreviewStatus: 'idle' | 'compiling' | 'starting' | 'installing' | 'ready' | 'error';
  ghostPreviewError: string | null;

  setSelection: (templateId: string | null, sectionId: string | null) => void;
  setSelectedLayout: (layoutId: string | null) => void;
  setActiveTab: (tab: 'templates' | 'layouts') => void;
  setHover: (id: string | null) => void;
  setClipboard: (data: string | null) => void;
  setBreakpoint: (bp: 'desktop' | 'tablet' | 'mobile') => void;
  setPreviewMode: (mode: 'light' | 'dark') => void;
  setIsAddSectionModalOpen: (isOpen: boolean) => void;
  setAccordionOpen: (group: string, isOpen: boolean) => void;
  setActiveRightTab: (tab: 'section' | 'theme') => void;
  setActivePreviewMode: (mode: 'design' | 'ghost') => void;
  setGhostPreviewState: (status: EditorState['ghostPreviewStatus'], url?: string | null, error?: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedTemplateId: null,
  selectedSectionId: null,
  selectedLayoutId: null,
  activeTab: 'templates',
  hoverId: null,
  clipboard: null,
  breakpoint: 'desktop',
  previewMode: 'light',
  isAddSectionModalOpen: false,
  accordionState: {
    general: true,
    ghostDynamic: true,
    colors: false,
    layout: false,
    spacing: false,
    advanced: false,
  },
  activeRightTab: 'section',
  activePreviewMode: 'design',
  ghostPreviewUrl: null,
  ghostPreviewStatus: 'idle',
  ghostPreviewError: null,

  setSelection: (templateId, sectionId) => set({ 
    selectedTemplateId: templateId, 
    selectedSectionId: sectionId,
    ...(sectionId ? { activeRightTab: 'section' } : {})
  }),
  setSelectedLayout: (layoutId) => set({ selectedLayoutId: layoutId }),
  setActiveTab: (tab) => set({ activeTab: tab, selectedSectionId: null }), // Clear section on tab change
  setHover: (id) => set({ hoverId: id }),
  setClipboard: (data) => set({ clipboard: data }),
  setBreakpoint: (bp) => set({ breakpoint: bp }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setIsAddSectionModalOpen: (isOpen) => set({ isAddSectionModalOpen: isOpen }),
  setAccordionOpen: (group, isOpen) => set((state) => ({
    accordionState: { ...state.accordionState, [group]: isOpen }
  })),
  setActiveRightTab: (tab) => set({ activeRightTab: tab }),
  setActivePreviewMode: (mode) => set({ activePreviewMode: mode }),
  setGhostPreviewState: (status, url, error) => set((state) => ({
    ghostPreviewStatus: status,
    ...(url !== undefined && { ghostPreviewUrl: url }),
    ...(error !== undefined && { ghostPreviewError: error })
  }))
}));
