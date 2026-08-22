import React from 'react';
import { Section } from '../../../ast/types';
import { useAstHistory } from '../../../state/astHistory';
import { useEditorStore } from '../../../state/editorStore';
import { SpacingSlider } from '../fields/SpacingSlider';

interface Props {
  section: Section;
}

export const SpacingGroup: React.FC<Props> = ({ section }) => {
  const updateSection = useAstHistory(state => state.updateSection);
  const selectedTemplateId = useEditorStore(state => state.selectedTemplateId);
  const breakpoint = useEditorStore(state => state.breakpoint);

  // Parse current padding/margin from styles. 
  // Naive approach for Phase 4: we read string values like '24px' and parse the int.
  const getStyleNum = (obj: any, key: string, fallback: number) => {
    if (obj && typeof obj[key] === 'string') {
      const match = obj[key].match(/(\d+)/);
      if (match) return parseInt(match[0], 10);
    }
    return fallback;
  };

  const getStyleObj = () => {
    if (breakpoint === 'mobile') return section.responsiveStyles?.mobile || {};
    if (breakpoint === 'tablet') return section.responsiveStyles?.tablet || {};
    return section.styles || {};
  };

  const activeStyles = getStyleObj();
  
  // Padding
  const paddingTop = getStyleNum(activeStyles, 'paddingTop', 64);
  const paddingBottom = getStyleNum(activeStyles, 'paddingBottom', 64);
  
  // Margin
  const marginTop = getStyleNum(activeStyles, 'marginTop', 0);
  const marginBottom = getStyleNum(activeStyles, 'marginBottom', 0);

  const handleUpdate = (keyT: string, valT: number, keyB: string, valB: number) => {
    if (!selectedTemplateId) return;
    
    updateSection(selectedTemplateId, section.id, (draft) => {
      if (breakpoint === 'desktop') {
        if (!draft.styles) draft.styles = {};
        draft.styles[keyT] = `${valT}px`;
        draft.styles[keyB] = `${valB}px`;
      } else {
        if (!draft.responsiveStyles) draft.responsiveStyles = {};
        if (!draft.responsiveStyles[breakpoint]) draft.responsiveStyles[breakpoint] = {};
        
        draft.responsiveStyles[breakpoint]![keyT] = `${valT}px`;
        draft.responsiveStyles[breakpoint]![keyB] = `${valB}px`;
      }
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', fontSize: '0.75rem', color: '#64748b' }}>
        Editing spacing for: <strong>{breakpoint.toUpperCase()}</strong>
      </div>

      <SpacingSlider 
        label="Padding" 
        topValue={paddingTop} 
        bottomValue={paddingBottom}
        onChange={(t, b) => handleUpdate('paddingTop', t, 'paddingBottom', b)}
      />
      
      <SpacingSlider 
        label="Margin" 
        topValue={marginTop} 
        bottomValue={marginBottom}
        onChange={(t, b) => handleUpdate('marginTop', t, 'marginBottom', b)}
      />
    </div>
  );
};
