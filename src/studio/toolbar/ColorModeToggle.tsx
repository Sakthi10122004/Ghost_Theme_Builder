import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useEditorStore } from '../../state/editorStore';

export const ColorModeToggle: React.FC = () => {
  const mode = useEditorStore((state) => state.previewMode);
  const setMode = useEditorStore((state) => state.setPreviewMode);
  const activePreviewMode = useEditorStore((state) => state.activePreviewMode);

  return (
    <div 
      style={{ 
        display: 'flex', 
        backgroundColor: '#f1f5f9', 
        padding: '4px', 
        borderRadius: '8px', 
        opacity: activePreviewMode === 'ghost' ? 0.5 : 1, 
        pointerEvents: activePreviewMode === 'ghost' ? 'none' : 'auto' 
      }} 
      title={activePreviewMode === 'ghost' ? 'Color mode applies to Design Preview only' : ''}
    >
      <button 
        onClick={() => setMode('light')}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px',
          border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s',
          backgroundColor: mode === 'light' ? 'white' : 'transparent',
          color: mode === 'light' ? '#0f172a' : '#64748b',
          boxShadow: mode === 'light' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <Sun size={16} />
      </button>
      <button 
        onClick={() => setMode('dark')}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px',
          border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s',
          backgroundColor: mode === 'dark' ? 'white' : 'transparent',
          color: mode === 'dark' ? '#0f172a' : '#64748b',
          boxShadow: mode === 'dark' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <Moon size={16} />
      </button>
    </div>
  );
};
