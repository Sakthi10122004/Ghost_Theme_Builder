import { create } from 'zustand';
import { ThemeProject, Section } from '../ast/types';
import { sampleAst } from '../ast/sampleAst';

interface AstHistoryState {
  past: ThemeProject[];
  present: ThemeProject;
  future: ThemeProject[];

  // Undo/Redo actions
  undo: () => void;
  redo: () => void;
  
  // Minimal mutation API for Phase 0 testing
  addSection: (templateId: string, section: Section) => void;
  removeSection: (templateId: string, sectionId: string) => void;
  reorderSection: (templateId: string, oldIndex: number, newIndex: number) => void;
  setProject: (project: ThemeProject) => void;
}

/**
 * Creates a structural clone of the AST to ensure immutability for the history stack.
 */
function cloneAst(ast: ThemeProject): ThemeProject {
  return structuredClone(ast);
}

/**
 * Zustand store specifically for AST state and history.
 * Completely separated from the editor UI state.
 */
export const useAstHistory = create<AstHistoryState>((set, get) => ({
  past: [],
  present: cloneAst(sampleAst), // Initialize with sample AST
  future: [],

  undo: () => {
    const { past, present, future } = get();
    if (past.length === 0) return;
    
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    set({
      past: newPast,
      present: previous,
      future: [present, ...future],
    });
  },

  redo: () => {
    const { past, present, future } = get();
    if (future.length === 0) return;
    
    const next = future[0];
    const newFuture = future.slice(1);
    
    set({
      past: [...past, present],
      present: next,
      future: newFuture,
    });
  },

  addSection: (templateId, section) => {
    const { past, present } = get();
    
    // Create new immutable snapshot
    const nextAst = cloneAst(present);
    
    const template = nextAst.templates.find(t => t.id === templateId);
    if (!template) return;
    
    template.sections.push(section);
    
    set({
      past: [...past, present],
      present: nextAst,
      future: [], // Clear future on new mutation
    });
  },

  removeSection: (templateId, sectionId) => {
    const { past, present } = get();
    
    // Create new immutable snapshot
    const nextAst = cloneAst(present);
    
    const template = nextAst.templates.find(t => t.id === templateId);
    if (!template) return;
    
    template.sections = template.sections.filter(s => s.id !== sectionId);
    
    set({
      past: [...past, present],
      present: nextAst,
      future: [], // Clear future on new mutation
    });
  },

  reorderSection: (templateId, oldIndex, newIndex) => {
    const { past, present } = get();
    const nextAst = cloneAst(present);
    const template = nextAst.templates.find(t => t.id === templateId);
    if (!template) return;

    const sections = Array.from(template.sections);
    const [moved] = sections.splice(oldIndex, 1);
    sections.splice(newIndex, 0, moved);
    template.sections = sections;

    set({
      past: [...past, present],
      present: nextAst,
      future: [],
    });
  },

  setProject: (project) => {
    set({
      past: [],
      present: cloneAst(project),
      future: [],
    });
  }
}));
