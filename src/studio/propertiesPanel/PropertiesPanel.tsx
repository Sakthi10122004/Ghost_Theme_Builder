import React, { useMemo } from 'react';
import { useEditorStore } from '../../state/editorStore';
import { useAstHistory } from '../../state/astHistory';
import { Section } from '../../ast/types';
import { PanelHeader } from './PanelHeader';
import { AccordionGroup } from './AccordionGroup';

import { GeneralGroup } from './groups/GeneralGroup';
import { GhostDynamicGroup } from './groups/GhostDynamicGroup';
import { ColorsGroup } from './groups/ColorsGroup';
import { LayoutGroup } from './groups/LayoutGroup';
import { SpacingGroup } from './groups/SpacingGroup';
import { AdvancedGroup } from './groups/AdvancedGroup';

export const PropertiesPanel: React.FC = () => {
  const selectedTemplateId = useEditorStore(state => state.selectedTemplateId);
  const selectedSectionId = useEditorStore(state => state.selectedSectionId);
  const present = useAstHistory(state => state.present);

  // Derive active section
  const activeSection = useMemo(() => {
    if (!selectedTemplateId || !selectedSectionId) return null;
    const template = present.templates.find(t => t.id === selectedTemplateId);
    if (!template) return null;
    
    let section = template.sections.find(s => s.id === selectedSectionId);
    
    if (!section && template.layoutId) {
      const layout = present.layouts.find(l => l.id === template.layoutId);
      if (layout) {
        section = layout.header.find(s => s.id === selectedSectionId) || layout.footer.find(s => s.id === selectedSectionId);
      }
    }
    
    return section || null;
  }, [present, selectedTemplateId, selectedSectionId]);

  if (!activeSection) {
    return (
      <div style={{ flex: 1, backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
        <div style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--text-sm-lh)' }}>Select a section to edit its properties</div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <PanelHeader section={activeSection} />
      
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <AccordionGroup id="general" title="General">
          <GeneralGroup section={activeSection} />
        </AccordionGroup>

        {activeSection.ghostDynamic && (
          <AccordionGroup id="ghostDynamic" title="Content Query">
            <GhostDynamicGroup section={activeSection} />
          </AccordionGroup>
        )}

        <AccordionGroup id="colors" title="Colors">
          <ColorsGroup section={activeSection} />
        </AccordionGroup>

        <AccordionGroup id="layout" title="Layout">
          <LayoutGroup section={activeSection} />
        </AccordionGroup>

        <AccordionGroup id="spacing" title="Spacing">
          <SpacingGroup section={activeSection} />
        </AccordionGroup>

        <AccordionGroup id="advanced" title="Advanced">
          <AdvancedGroup section={activeSection} />
        </AccordionGroup>
      </div>
    </div>
  );
};
