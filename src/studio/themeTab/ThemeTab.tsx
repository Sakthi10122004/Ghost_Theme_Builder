import React from 'react';
import { useEditorStore } from '../../state/editorStore';
import { useAstHistory } from '../../state/astHistory';
import { AccordionGroup } from '../propertiesPanel/AccordionGroup';
import { AccentColorControl } from './AccentColorControl';
import { TypographyGroup } from './TypographyGroup';
import { GlobalDefaultsGroup } from './GlobalDefaultsGroup';
import { ThemedPaletteReference } from './ThemedPaletteReference';

export const ThemeTab: React.FC = () => {
  const present = useAstHistory(state => state.present);
  const designTokens = present.designTokens;

  return (
    <div style={{ width: '320px', borderLeft: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '24px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
        <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
          Theme Settings
        </h2>
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>
          Global design system and defaults.
        </p>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <AccordionGroup id="theme-colors" title="Brand Colors">
          <AccentColorControl tokens={designTokens} />
          <div style={{ marginTop: '24px' }}>
            <ThemedPaletteReference />
          </div>
        </AccordionGroup>

        <AccordionGroup id="theme-typography" title="Typography">
          <TypographyGroup tokens={designTokens} />
        </AccordionGroup>

        <AccordionGroup id="theme-defaults" title="Global Defaults">
          <GlobalDefaultsGroup tokens={designTokens} />
        </AccordionGroup>
      </div>
    </div>
  );
};
