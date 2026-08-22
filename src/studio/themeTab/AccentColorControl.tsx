import React from 'react';
import { DesignTokens } from '../../ast/types';
import { useAstHistory } from '../../state/astHistory';

interface Props {
  tokens: DesignTokens;
}

export const AccentColorControl: React.FC<Props> = ({ tokens }) => {
  const updateThemeTokens = useAstHistory(state => state.updateThemeTokens);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateThemeTokens(draft => {
      draft.accentColor = e.target.value;
    });
  };

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
        Accent Color
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input 
          type="color" 
          value={tokens.accentColor} 
          onChange={handleChange}
          style={{
            width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', overflow: 'hidden'
          }}
        />
        <input 
          type="text" 
          value={tokens.accentColor} 
          onChange={handleChange}
          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem', fontFamily: 'monospace' }}
        />
      </div>
      <p style={{ margin: '8px 0 0 0', fontSize: '0.6875rem', color: '#94a3b8' }}>
        This sets your site's core color — used automatically by any section set to Default or Neutral.
      </p>
    </div>
  );
};
