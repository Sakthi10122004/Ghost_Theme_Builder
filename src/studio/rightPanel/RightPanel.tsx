import React from 'react';
import { useEditorStore } from '../../state/editorStore';
import { PropertiesPanel } from '../propertiesPanel/PropertiesPanel';
import { ThemeTab } from '../themeTab/ThemeTab';
import { Settings, Layers } from 'lucide-react';

export const RightPanel: React.FC = () => {
  const activeRightTab = useEditorStore(state => state.activeRightTab);
  const setActiveRightTab = useEditorStore(state => state.setActiveRightTab);

  return (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #e2e8f0', backgroundColor: 'white' }}>
      
      {/* Tab Switcher */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
        <button
          onClick={() => setActiveRightTab('section')}
          style={{
            flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            backgroundColor: activeRightTab === 'section' ? 'white' : '#f8fafc',
            border: 'none', borderBottom: activeRightTab === 'section' ? '2px solid #0284c7' : '2px solid transparent',
            color: activeRightTab === 'section' ? '#0f172a' : '#64748b',
            fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer'
          }}
        >
          <Layers size={14} /> Section
        </button>
        <button
          onClick={() => setActiveRightTab('theme')}
          style={{
            flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            backgroundColor: activeRightTab === 'theme' ? 'white' : '#f8fafc',
            border: 'none', borderBottom: activeRightTab === 'theme' ? '2px solid #0284c7' : '2px solid transparent',
            color: activeRightTab === 'theme' ? '#0f172a' : '#64748b',
            fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer'
          }}
        >
          <Settings size={14} /> Theme
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {activeRightTab === 'section' ? <PropertiesPanel /> : <ThemeTab />}
      </div>

    </div>
  );
};
