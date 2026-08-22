import React from 'react';
import { useAstHistory } from '../../state/astHistory';
import { useEditorStore } from '../../state/editorStore';
import { Layers } from 'lucide-react';

export const LayoutsTab: React.FC = () => {
  const present = useAstHistory((state) => state.present);
  const selectedLayoutId = useEditorStore((state) => state.selectedLayoutId);
  const setSelectedLayout = useEditorStore((state) => state.setSelectedLayout);

  const layouts = present.layouts || [];

  return (
    <div style={{ padding: '16px 8px' }}>
      <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '12px', padding: '0 8px' }}>
        Shared Layouts
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 8px' }}>
        <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '0 0 8px 0', lineHeight: 1.5 }}>
          Layouts contain shared Headers and Footers used across multiple templates.
        </p>

        {layouts.length === 0 ? (
          <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
            No shared layouts defined.
          </div>
        ) : (
          layouts.map(layout => {
            const isSelected = selectedLayoutId === layout.id;
            return (
              <button
                key={layout.id}
                onClick={() => setSelectedLayout(layout.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  width: '100%', padding: '12px',
                  backgroundColor: isSelected ? '#f0fdf4' : 'white',
                  border: `1px solid ${isSelected ? '#22c55e' : '#e2e8f0'}`,
                  color: isSelected ? '#15803d' : '#334155',
                  borderRadius: '6px', cursor: 'pointer',
                  textAlign: 'left', transition: 'all 0.1s',
                  boxShadow: isSelected ? '0 0 0 1px #22c55e' : '0 1px 2px 0 rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ backgroundColor: isSelected ? '#dcfce7' : '#f1f5f9', padding: '6px', borderRadius: '4px' }}>
                  <Layers size={18} color={isSelected ? '#16a34a' : '#64748b'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{layout.name}</div>
                  <div style={{ fontSize: '0.75rem', color: isSelected ? '#16a34a' : '#94a3b8' }}>
                    {layout.header.length + layout.footer.length} sections
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
