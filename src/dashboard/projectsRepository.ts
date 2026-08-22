import { ThemeProject } from '../ast/types';
import { defaultDesignTokens } from '../designSystem/defaultTokens';

export interface ProjectRecord {
  id: string;
  name: string;
  status: 'draft' | 'published';
  updatedAt: string;
  createdAt: string;
  ast: ThemeProject;
}

// In-memory fallback if localStorage isn't available
let memoryStore: Record<string, ProjectRecord> = {};

const STORAGE_KEY = 'ghost_builder_projects';

function loadStore(): Record<string, ProjectRecord> {
  if (typeof window === 'undefined') return memoryStore;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return {};
    const parsed = JSON.parse(data) as Record<string, ProjectRecord>;
    
    // Migrate Phase 1-5 projects to Phase 6
    for (const key in parsed) {
      if (!parsed[key].ast.designTokens) {
        parsed[key].ast.designTokens = { ...defaultDesignTokens };
      }
      if (!parsed[key].ast.slug) {
        parsed[key].ast.slug = parsed[key].ast.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      if (!parsed[key].ast.layouts) parsed[key].ast.layouts = [];
      if (!parsed[key].ast.assets) parsed[key].ast.assets = [];

      // Migrate for Phase 7 (AST Validator requires default and index templates)
      const templates = parsed[key].ast.templates || [];
      if (!templates.some(t => t.type === 'default')) {
        templates.unshift({ id: `tpl-default-${Date.now()}`, type: 'default', sections: [] });
      }
      if (!templates.some(t => t.type === 'index')) {
        templates.push({ id: `tpl-index-${Date.now()}`, type: 'index', sections: [] });
      }
      if (!templates.some(t => t.type === 'post')) {
        templates.push({ id: `tpl-post-${Date.now()}`, type: 'post', sections: [] });
      }
      if (!templates.some(t => t.type === 'page')) {
        templates.push({ id: `tpl-page-${Date.now()}`, type: 'page', sections: [] });
      }
      if (!templates.some(t => t.type === 'tag')) {
        templates.push({ id: `tpl-tag-${Date.now()}`, type: 'tag', sections: [] });
      }
      if (!templates.some(t => t.type === 'author')) {
        templates.push({ id: `tpl-author-${Date.now()}`, type: 'author', sections: [] });
      }
      if (!templates.some(t => t.type === 'error')) {
        templates.push({ id: `tpl-error-${Date.now()}`, type: 'error', sections: [] });
      }
      parsed[key].ast.templates = templates;
    }
    return parsed;
  } catch (e) {
    console.warn("Failed to load from localStorage", e);
    return memoryStore;
  }
}

function saveStore(store: Record<string, ProjectRecord>) {
  memoryStore = store;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      console.warn("Failed to save to localStorage", e);
    }
  }
}

/**
 * Stub persistence layer for Phase 1.
 * Provides a real interface for the dashboard to code against,
 * backed by localStorage for development convenience.
 */
export const projectsRepository = {
  list(): ProjectRecord[] {
    const store = loadStore();
    return Object.values(store).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  get(id: string): ProjectRecord | null {
    const store = loadStore();
    return store[id] || null;
  },

  create(name: string, ast: ThemeProject): ProjectRecord {
    const store = loadStore();
    
    // Ensure the AST has the correct ID and name to match the wrapper
    const newAst = structuredClone(ast);
    newAst.id = ast.id || `proj-${Date.now()}`;
    newAst.name = name;
    newAst.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const record: ProjectRecord = {
      id: newAst.id,
      name,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ast: newAst
    };
    
    store[record.id] = record;
    saveStore(store);
    return record;
  },

  update(id: string, updates: Partial<ProjectRecord>): ProjectRecord {
    const store = loadStore();
    const existing = store[id];
    if (!existing) throw new Error(`Project ${id} not found`);
    
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Keep AST name in sync if wrapper name changes
    if (updates.name && updated.ast.name !== updates.name) {
      updated.ast.name = updates.name;
    }
    
    store[id] = updated;
    saveStore(store);
    return updated;
  },

  duplicate(id: string): ProjectRecord {
    const store = loadStore();
    const existing = store[id];
    if (!existing) throw new Error(`Project ${id} not found`);
    
    const newId = `proj-${Date.now()}`;
    const newName = `Copy of ${existing.name}`;
    
    const clonedAst = structuredClone(existing.ast);
    clonedAst.id = newId;
    clonedAst.name = newName;
    
    const newRecord: ProjectRecord = {
      ...existing,
      id: newId,
      name: newName,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ast: clonedAst
    };
    
    store[newId] = newRecord;
    saveStore(store);
    return newRecord;
  },

  delete(id: string): void {
    const store = loadStore();
    if (store[id]) {
      delete store[id];
      saveStore(store);
    }
  }
};
