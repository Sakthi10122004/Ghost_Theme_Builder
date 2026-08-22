import React from 'react';
import { CURATED_PALETTES } from '../../designSystem/curatedPalettes';

export const ThemedPaletteReference: React.FC = () => {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '12px' }}>
        Available Curated Palettes
      </label>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {CURATED_PALETTES.map(palette => (
          <div key={palette.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', backgroundColor: palette.colors.background, border: '1px solid #cbd5e1', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: palette.colors.text }}>{palette.name}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: palette.colors.text }} title="Text" />
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: palette.colors.primary }} title="Primary" />
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: palette.colors.muted }} title="Muted" />
            </div>
          </div>
        ))}
      </div>
      <p style={{ margin: '8px 0 0 0', fontSize: '0.6875rem', color: '#94a3b8' }}>
        These are read-only and provided by the system.
      </p>
    </div>
  );
};
