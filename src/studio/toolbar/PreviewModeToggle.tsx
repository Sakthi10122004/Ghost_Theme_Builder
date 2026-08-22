import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useEditorStore } from '../../state/editorStore';

export const PreviewModeToggle: React.FC = () => {
  const previewMode = useEditorStore((state) => state.previewMode);
  const setPreviewMode = useEditorStore((state) => state.setPreviewMode);

  return (
    <button 
      onClick={() => setPreviewMode(previewMode === 'light' ? 'dark' : 'light')}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        border: '1px solid #e2e8f0',
        backgroundColor: 'white',
        color: '#475569',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      title={`Switch to ${previewMode === 'light' ? 'dark' : 'light'} mode`}
    >
      {previewMode === 'light' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
