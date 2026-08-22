import React from 'react';
import { useEditorStore } from '../../state/editorStore';
import { TemplatesTab } from './TemplatesTab';
import { LayoutsTab } from './LayoutsTab';

export const LeftPanel: React.FC = () => {
  const activeTab = useEditorStore((state) => state.activeTab);
  const setActiveTab = useEditorStore((state) => state.setActiveTab);

  return (
    <aside style={{
      width: '280px',
      height: '100%',
      backgroundColor: '#f8fafc',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0
    }}>
      
      {/* Tab Switcher */}
      <div style={{ display: 'flex', padding: '8px', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
        <button
          onClick={() => setActiveTab('templates')}
          style={{
            flex: 1, padding: '6px 12px', fontSize: '0.875rem', fontWeight: 600,
            border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
            color: activeTab === 'templates' ? '#4f46e5' : '#64748b',
            borderBottom: activeTab === 'templates' ? '2px solid #4f46e5' : '2px solid transparent',
            transition: 'color 0.2s, border-color 0.2s'
          }}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab('layouts')}
          style={{
            flex: 1, padding: '6px 12px', fontSize: '0.875rem', fontWeight: 600,
            border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
            color: activeTab === 'layouts' ? '#22c55e' : '#64748b',
            borderBottom: activeTab === 'layouts' ? '2px solid #22c55e' : '2px solid transparent',
            transition: 'color 0.2s, border-color 0.2s'
          }}
        >
          Layouts
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'templates' ? <TemplatesTab /> : <LayoutsTab />}
      </div>

    </aside>
  );
};
