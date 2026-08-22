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

  setSelection: (templateId: string | null, sectionId: string | null) => void;
  setSelectedLayout: (layoutId: string | null) => void;
  setActiveTab: (tab: 'templates' | 'layouts') => void;
  setHover: (id: string | null) => void;
  setClipboard: (data: string | null) => void;
  setBreakpoint: (bp: 'desktop' | 'tablet' | 'mobile') => void;
  setPreviewMode: (mode: 'light' | 'dark') => void;
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

  setSelection: (templateId, sectionId) => set({ selectedTemplateId: templateId, selectedSectionId: sectionId }),
  setSelectedLayout: (layoutId) => set({ selectedLayoutId: layoutId }),
  setActiveTab: (tab) => set({ activeTab: tab, selectedSectionId: null }), // Clear section on tab change
  setHover: (id) => set({ hoverId: id }),
  setClipboard: (data) => set({ clipboard: data }),
  setBreakpoint: (bp) => set({ breakpoint: bp }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
}));
