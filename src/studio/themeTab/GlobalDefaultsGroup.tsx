import React from 'react';
import { DesignTokens } from '../../ast/types';
import { useAstHistory } from '../../state/astHistory';
import { SegmentedPreset } from '../propertiesPanel/fields/SegmentedPreset';

interface Props {
  tokens: DesignTokens;
}

export const GlobalDefaultsGroup: React.FC<Props> = ({ tokens }) => {
  const updateThemeTokens = useAstHistory(state => state.updateThemeTokens);

  const handleUpdate = (updates: Partial<DesignTokens>) => {
    updateThemeTokens(draft => {
      Object.assign(draft, updates);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
          Default Posts Per Page
        </label>
        <input 
          type="number" min={1} max={100}
          value={tokens.postsPerPage}
          onChange={(e) => handleUpdate({ postsPerPage: Number(e.target.value) })}
          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
        />
        <p style={{ margin: '6px 0 0 0', fontSize: '0.6875rem', color: '#94a3b8' }}>
          Sections set to 'theme-default' limit will use this number.
        </p>
      </div>

      <SegmentedPreset 
        label="Default Container Width"
        value={tokens.containerWidth}
        options={[
          { label: 'Full', value: 'full' },
          { label: 'Wide', value: 'wide' },
          { label: 'Standard', value: 'standard' },
          { label: 'Narrow', value: 'narrow' }
        ]}
        onChange={(val) => handleUpdate({ containerWidth: val })}
      />
      <p style={{ margin: '-8px 0 24px 0', fontSize: '0.6875rem', color: '#94a3b8' }}>
        Applied automatically when adding new sections.
      </p>

      <SegmentedPreset 
        label="Global Spacing Scale"
        value={tokens.spacingScale}
        options={[
          { label: 'Compact', value: 'compact' },
          { label: 'Standard', value: 'standard' },
          { label: 'Relaxed', value: 'relaxed' }
        ]}
        onChange={(val) => handleUpdate({ spacingScale: val })}
      />
    </div>
  );
};
