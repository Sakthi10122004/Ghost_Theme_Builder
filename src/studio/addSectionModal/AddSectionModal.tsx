import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { useEditorStore } from '../../state/editorStore';
import { useAstHistory } from '../../state/astHistory';
import { PresetCategory, SectionPreset } from '../../presetLibrary/types';
import { getPresetsByCategory, searchPresets } from '../../presetLibrary';
import { SearchInput } from './SearchInput';
import { CategorySidebar } from './CategorySidebar';
import { PresetGrid } from './PresetGrid';

export const AddSectionModal: React.FC = () => {
  const isOpen = useEditorStore((state) => state.isAddSectionModalOpen);
  const setIsOpen = useEditorStore((state) => state.setIsAddSectionModalOpen);
  const selectedTemplateId = useEditorStore((state) => state.selectedTemplateId);
  const selectedSectionId = useEditorStore((state) => state.selectedSectionId);
  const insertSection = useAstHistory((state) => state.insertSection);
  const setSelection = useEditorStore((state) => state.setSelection);
  
  const [activeCategory, setActiveCategory] = useState<PresetCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Derived state: filter by category, then search
  const visiblePresets = useMemo(() => {
    const byCategory = getPresetsByCategory(activeCategory);
    return searchPresets(byCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: SectionPreset) => {
    if (!selectedTemplateId) return; // Should not happen, button is in template tab

    // Build the new section
    const newSection = preset.buildSection();

    // Insert it into AST
    insertSection(selectedTemplateId, newSection, preset.category, selectedSectionId);

    // Sync selection so it highlights immediately
    setSelection(selectedTemplateId, newSection.id);

    // Close modal
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      backgroundColor: 'rgba(28, 27, 31, 0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        width: '90vw', maxWidth: '1200px', height: '85vh',
        backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-modal)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-16) var(--space-24)', borderBottom: '1px solid var(--line)' }}>
          <h2 className="heading-display" style={{ margin: 0, fontSize: 'var(--text-xl)', lineHeight: 'var(--text-xl-lh)', fontWeight: 600, color: 'var(--ink)' }}>Section Library</h2>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 'var(--space-4)' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          <div style={{ padding: '24px', display: 'flex', flex: 1 }}>
            <CategorySidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
            
            <div style={{ flex: 1, paddingLeft: '32px', display: 'flex', flexDirection: 'column' }}>
              <SearchInput value={searchQuery} onChange={setSearchQuery} />
              
              <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
                <PresetGrid presets={visiblePresets} onSelect={handleSelectPreset} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
