import React from 'react';
import { useEditorStore } from '@/state/editorStore';

export const PreviewModeToggle: React.FC = () => {
  const mode = useEditorStore(state => state.activePreviewMode);
  const setMode = useEditorStore(state => state.setActivePreviewMode);

  return (
    <div style={{
      display: 'flex',
      background: '#2d2d2d',
      padding: '4px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 500,
      marginRight: '16px'
    }}>
      <button
        onClick={() => setMode('design')}
        style={{
          background: mode === 'design' ? '#4f46e5' : 'transparent',
          color: mode === 'design' ? '#fff' : '#a0a0a0',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        Design Preview
      </button>
      <button
        onClick={() => setMode('ghost')}
        style={{
          background: mode === 'ghost' ? '#4f46e5' : 'transparent',
          color: mode === 'ghost' ? '#fff' : '#a0a0a0',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        Ghost Preview
      </button>
    </div>
  );
};
