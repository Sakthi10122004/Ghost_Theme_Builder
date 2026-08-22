import React from 'react';
import { Section } from '../../../ast/types';
import { useAstHistory } from '../../../state/astHistory';
import { useEditorStore } from '../../../state/editorStore';

interface Props {
  section: Section;
}

export const AdvancedGroup: React.FC<Props> = ({ section }) => {
  const updateSection = useAstHistory(state => state.updateSection);
  const selectedTemplateId = useEditorStore(state => state.selectedTemplateId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTemplateId) return;
    updateSection(selectedTemplateId, section.id, (draft) => {
      draft.htmlAnchor = e.target.value;
    });
  };

  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
        HTML Anchor
      </label>
      <input 
        type="text" 
        value={section.htmlAnchor || ''} 
        onChange={handleChange}
        placeholder="e.g. section-features"
        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
      />
      <p style={{ margin: '6px 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>
        Set a unique ID to link directly to this section (e.g. <code>#section-features</code>).
      </p>
    </div>
  );
};
