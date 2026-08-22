import React from 'react';
import { useEditorStore } from '../../state/editorStore';
import { useAstHistory } from '../../state/astHistory';
import { Code2 } from 'lucide-react';

export const PropertiesStub: React.FC = () => {
  const present = useAstHistory((state) => state.present);
  const selectedTemplateId = useEditorStore((state) => state.selectedTemplateId);
  const selectedSectionId = useEditorStore((state) => state.selectedSectionId);

  const activeTemplate = present.templates?.find(t => t.id === selectedTemplateId);
  const activeSection = activeTemplate?.sections.find(s => s.id === selectedSectionId);

  return (
    <aside style={{
      width: '320px',
      height: '100%',
      backgroundColor: 'white',
      borderLeft: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
        <h2 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
          Properties Panel
        </h2>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
          Phase 4 Field Editors Stub
        </p>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        {!activeSection ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem', marginTop: '40px' }}>
            Select a section to edit its properties.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px dashed #cbd5e1' }}>
              <div style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '8px', borderRadius: '6px' }}>
                <Code2 size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{activeSection.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Type: {activeSection.type}</div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                SECTION ID
              </label>
              <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', backgroundColor: '#f8fafc', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0', color: '#334155' }}>
                {activeSection.id}
              </div>
            </div>

            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '6px', marginTop: '24px' }}>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#b91c1c', lineHeight: 1.5 }}>
                <strong>TODO (Phase 4):</strong> Render dynamic form inputs based on the section's schema (e.g. text fields, color pickers, Ghost binding selectors).
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
