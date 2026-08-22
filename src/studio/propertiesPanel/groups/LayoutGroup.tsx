import React from 'react';
import { Section } from '../../../ast/types';
import { useAstHistory } from '../../../state/astHistory';
import { useEditorStore } from '../../../state/editorStore';
import { SegmentedPreset } from '../fields/SegmentedPreset';
import { IconAlignButtons } from '../fields/IconAlignButtons';

interface Props {
  section: Section;
}

export const LayoutGroup: React.FC<Props> = ({ section }) => {
  const updateSection = useAstHistory(state => state.updateSection);
  const selectedTemplateId = useEditorStore(state => state.selectedTemplateId);

  const config = section.layoutConfig || {
    sectionWidth: 'standard',
    contentWidth: 'standard',
    minHeight: 'M',
    hAlign: 'center',
    vAlign: 'center'
  };

  const handleChange = (updates: Partial<typeof config>) => {
    if (!selectedTemplateId) return;
    updateSection(selectedTemplateId, section.id, (draft) => {
      draft.layoutConfig = { ...config, ...updates };
    });
  };

  return (
    <div>
      <SegmentedPreset 
        label="Section Width"
        value={config.sectionWidth}
        options={[
          { label: 'Full', value: 'full' },
          { label: 'Wide', value: 'wide' },
          { label: 'Standard', value: 'standard' },
          { label: 'Narrow', value: 'narrow' }
        ]}
        onChange={(val) => handleChange({ sectionWidth: val })}
      />
      
      <SegmentedPreset 
        label="Content Width"
        value={config.contentWidth}
        options={[
          { label: 'Full', value: 'full' },
          { label: 'Wide', value: 'wide' },
          { label: 'Standard', value: 'standard' },
          { label: 'Narrow', value: 'narrow' }
        ]}
        onChange={(val) => handleChange({ contentWidth: val })}
      />

      <SegmentedPreset 
        label="Minimum Height"
        value={config.minHeight}
        options={[
          { label: 'S', value: 'S' },
          { label: 'M', value: 'M' },
          { label: 'L', value: 'L' },
          { label: 'XL', value: 'XL' }
        ]}
        onChange={(val) => handleChange({ minHeight: val })}
      />

      <IconAlignButtons 
        hAlign={config.hAlign} 
        vAlign={config.vAlign}
        onHAlignChange={(val) => handleChange({ hAlign: val })}
        onVAlignChange={(val) => handleChange({ vAlign: val })}
      />
    </div>
  );
};
