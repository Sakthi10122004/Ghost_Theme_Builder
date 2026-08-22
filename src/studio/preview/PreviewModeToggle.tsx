import React from 'react';
import { useEditorStore } from '@/state/editorStore';

export const PreviewModeToggle: React.FC = () => {
  const mode = useEditorStore(state => state.activePreviewMode);
  const setMode = useEditorStore(state => state.setActivePreviewMode);

  return (
    <div style={{
      display: 'flex',
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      padding: '4px',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      marginRight: 'var(--space-16)'
    }}>
      <button
        onClick={() => setMode('design')}
        style={{
          background: mode === 'design' ? 'var(--surface)' : 'transparent',
          color: mode === 'design' ? 'var(--accent)' : 'var(--muted)',
          border: mode === 'design' ? '1px solid var(--line)' : '1px solid transparent',
          padding: 'var(--space-4) var(--space-12)',
          borderRadius: 'calc(var(--radius-md) - 4px)',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        Design Preview
      </button>
      <button
        onClick={() => setMode('ghost')}
        style={{
          background: mode === 'ghost' ? 'var(--surface)' : 'transparent',
          color: mode === 'ghost' ? 'var(--accent)' : 'var(--muted)',
          border: mode === 'ghost' ? '1px solid var(--line)' : '1px solid transparent',
          padding: 'var(--space-4) var(--space-12)',
          borderRadius: 'calc(var(--radius-md) - 4px)',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        Ghost Preview
      </button>
    </div>
  );
};
