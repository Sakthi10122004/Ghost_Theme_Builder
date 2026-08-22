import React from 'react';
import { Section, FilterRule } from '../../../ast/types';
import { useAstHistory } from '../../../state/astHistory';
import { useEditorStore } from '../../../state/editorStore';
import { FilterRuleBuilder } from '../fields/FilterRuleBuilder';

interface Props {
  section: Section;
}

export const GhostDynamicGroup: React.FC<Props> = ({ section }) => {
  const updateSection = useAstHistory(state => state.updateSection);
  const selectedTemplateId = useEditorStore(state => state.selectedTemplateId);

  if (!section.ghostDynamic) return null;
  const config = section.ghostDynamic;

  const handleChange = (updates: Partial<typeof config>) => {
    if (!selectedTemplateId) return;
    updateSection(selectedTemplateId, section.id, (draft) => {
      if (draft.ghostDynamic) {
        Object.assign(draft.ghostDynamic, updates);
      }
    });
  };

  const sourceOptions = ['routes', 'featured', 'related', 'custom'];
  const orderOptions = [
    { label: 'Newest First', value: 'published_at desc' },
    { label: 'Oldest First', value: 'published_at asc' },
    { label: 'Title A-Z', value: 'title asc' },
    { label: 'Title Z-A', value: 'title desc' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Source</label>
        <select 
          value={config.source || 'routes'}
          onChange={(e) => handleChange({ source: e.target.value as any })}
          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
        >
          {sourceOptions.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Limit</label>
          <input 
            type="number" min={1} max={100}
            value={config.limit || 6}
            onChange={(e) => handleChange({ limit: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
          />
        </div>
        <div style={{ flex: 2 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Order By</label>
          <select 
            value={config.order || 'published_at desc'}
            onChange={(e) => handleChange({ order: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
          >
            {orderOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Layout Style</label>
        <select 
          value={config.layoutStyle || 'grid'}
          onChange={(e) => handleChange({ layoutStyle: e.target.value })}
          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
        >
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>

      {config.source === 'custom' && (
        <FilterRuleBuilder 
          filterMode={config.filterMode || 'visual'}
          onFilterModeChange={(mode) => handleChange({ filterMode: mode })}
          rules={config.filterRules || []}
          onRulesChange={(rules) => handleChange({ filterRules: rules })}
          manualString={config.manualFilterString || ''}
          onManualStringChange={(str) => handleChange({ manualFilterString: str })}
        />
      )}
    </div>
  );
};
