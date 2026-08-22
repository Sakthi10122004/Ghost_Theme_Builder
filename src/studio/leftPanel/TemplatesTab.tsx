import React from 'react';
import { useAstHistory } from '../../state/astHistory';
import { useEditorStore } from '../../state/editorStore';
import { templateIcons } from './templateIcons';
import { SectionsList } from './SectionsList';

export const TemplatesTab: React.FC = () => {
  const present = useAstHistory((state) => state.present);
  const selectedTemplateId = useEditorStore((state) => state.selectedTemplateId);
  const setSelection = useEditorStore((state) => state.setSelection);

  // Core set of templates that are always shown if available
  const CORE_TEMPLATES = ['index', 'post', 'page', 'tag', 'author', 'error'];
  
  // Group templates: Core vs Custom/Error
  const templates = present.templates || [];
  
  // Sort them so core types appear first and in order
  const sortedTemplates = [...templates].sort((a, b) => {
    const aIndex = CORE_TEMPLATES.indexOf(a.type);
    const bIndex = CORE_TEMPLATES.indexOf(b.type);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.type.localeCompare(b.type);
  });

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  return (
    <div style={{ padding: '16px 8px' }}>
      <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '12px', padding: '0 8px' }}>
        Templates
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sortedTemplates.map(template => {
          const Icon = templateIcons[template.type] || templateIcons.default;
          const isSelected = selectedTemplateId === template.id;
          
          return (
            <button
              key={template.id}
              onClick={() => setSelection(template.id, null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '8px', border: 'none',
                backgroundColor: isSelected ? '#e0e7ff' : 'transparent',
                color: isSelected ? '#4f46e5' : '#334155',
                borderRadius: '6px', cursor: 'pointer',
                textAlign: 'left', transition: 'background-color 0.1s',
                fontWeight: isSelected ? 600 : 500,
                fontSize: '0.875rem'
              }}
              onMouseOver={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseOut={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon size={18} />
              <span style={{ textTransform: 'capitalize' }}>
                {template.type}
              </span>
            </button>
          );
        })}
      </div>

      {selectedTemplate && (
        <SectionsList template={selectedTemplate} />
      )}
    </div>
  );
};
