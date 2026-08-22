import React from 'react';
import { DesignTokens } from '../../ast/types';
import { useAstHistory } from '../../state/astHistory';
import { FONT_OPTIONS } from '../../designSystem/fontOptions';
import { SIZE_PRESETS } from '../../designSystem/sizePresets';

interface Props {
  tokens: DesignTokens;
}

export const TypographyGroup: React.FC<Props> = ({ tokens }) => {
  const updateThemeTokens = useAstHistory(state => state.updateThemeTokens);

  const handleUpdate = (updates: Partial<DesignTokens>) => {
    updateThemeTokens(draft => {
      Object.assign(draft, updates);
    });
  };

  const handleScaleUpdate = (key: keyof DesignTokens['typeScale'], value: string) => {
    updateThemeTokens(draft => {
      draft.typeScale[key] = value;
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Heading Font</label>
          <select 
            value={tokens.headingFont}
            onChange={(e) => handleUpdate({ headingFont: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
          >
            {FONT_OPTIONS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Body Font</label>
          <select 
            value={tokens.bodyFont}
            onChange={(e) => handleUpdate({ bodyFont: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
          >
            {FONT_OPTIONS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '16px', textTransform: 'uppercase' }}>
          Type Scale
        </label>
        
        {([
          { key: 'h1', label: 'Heading 1' },
          { key: 'h2', label: 'Heading 2' },
          { key: 'h3', label: 'Heading 3' },
          { key: 'h4', label: 'Heading 4' },
          { key: 'body', label: 'Body Base' },
          { key: 'small', label: 'Small Text' },
          { key: 'caption', label: 'Caption' }
        ] as const).map(({ key, label }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8125rem', color: '#0f172a' }}>{label}</span>
            <select 
              value={tokens.typeScale[key]}
              onChange={(e) => handleScaleUpdate(key, e.target.value)}
              style={{ width: '140px', padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '0.75rem' }}
            >
              {SIZE_PRESETS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
