import React from 'react';
import { Section } from '../../../ast/types';
import { useAstHistory } from '../../../state/astHistory';
import { useEditorStore } from '../../../state/editorStore';
import { SegmentedPreset } from '../fields/SegmentedPreset';
import { CURATED_PALETTES, Palette } from '../../../designSystem/curatedPalettes';

interface Props {
  section: Section;
}

export const ColorsGroup: React.FC<Props> = ({ section }) => {
  const updateSection = useAstHistory(state => state.updateSection);
  const selectedTemplateId = useEditorStore(state => state.selectedTemplateId);

  const config = section.colorConfig || { mode: 'inherit', paletteId: 'default' };

  const handleChange = (updates: Partial<typeof config>) => {
    if (!selectedTemplateId) return;
    updateSection(selectedTemplateId, section.id, (draft) => {
      draft.colorConfig = { ...config, ...updates };
    });
  };

  const themed = CURATED_PALETTES;

  const renderSwatch = (id: string, name: string, colors: Palette['colors']) => {
    const isSelected = config.paletteId === id;
    return (
      <button
        key={id}
        onClick={() => handleChange({ paletteId: id })}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
          background: 'transparent', border: 'none', cursor: 'pointer'
        }}
      >
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          backgroundColor: colors.background,
          border: isSelected ? '2px solid #0284c7' : '1px solid #cbd5e1',
          position: 'relative', overflow: 'hidden',
          boxShadow: isSelected ? '0 0 0 2px #e0f2fe' : 'none'
        }}>
          {colors.primary && (
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '18px', height: '18px', backgroundColor: colors.primary }} />
          )}
        </div>
        <span style={{ fontSize: '0.6875rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? '#0f172a' : '#64748b' }}>
          {name}
        </span>
      </button>
    );
  };

  return (
    <div>
      <SegmentedPreset 
        label="Mode"
        value={config.mode}
        options={[{ label: 'Inherit', value: 'inherit' }, { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]}
        onChange={(val) => handleChange({ mode: val })}
      />

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
          Default
        </label>
        <div style={{ display: 'flex', gap: '16px' }}>
          {renderSwatch('default', 'Default', { background: '#ffffff', text: '#000000', primary: '#333333', muted: '#f1f5f9' })}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
          Neutral (Uses your accent)
        </label>
        <div style={{ display: 'flex', gap: '16px' }}>
          {renderSwatch('neutral-light', 'Light', { background: '#f8fafc', text: '#0f172a', primary: '#333333', muted: '#e2e8f0' })}
          {renderSwatch('neutral-dark', 'Dark', { background: '#0f172a', text: '#f8fafc', primary: '#333333', muted: '#334155' })}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
          Themed (Curated palettes)
        </label>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {themed.map(t => renderSwatch(t.id, t.name, t.colors))}
        </div>
      </div>
    </div>
  );
};
