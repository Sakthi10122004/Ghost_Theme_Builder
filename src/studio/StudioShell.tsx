import React, { useEffect } from 'react';
import { StudioToolbar } from './toolbar/StudioToolbar';
import { LeftPanel } from './leftPanel/LeftPanel';
import { CanvasStub } from './canvas/CanvasStub';
import { RightPanel } from './rightPanel/RightPanel';
import { AddSectionModal } from './addSectionModal/AddSectionModal';
import { useEditorStore } from '../state/editorStore';
import { GhostPreviewPane } from './preview/GhostPreviewPane';

export const StudioShell: React.FC = () => {
  const colorMode = useEditorStore((state) => state.previewMode);
  const previewMode = useEditorStore((state) => state.activePreviewMode);

  // Apply a basic theme class to the wrapper for demonstration
  const themeClass = colorMode === 'dark' ? 'dark-mode' : 'light-mode';

  return (
    <div 
      className={themeClass}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
        // In a real implementation with Tailwind, this would use the `dark:` prefix classes.
        // For Phase 2, we just ensure the state is synced.
        backgroundColor: colorMode === 'dark' ? '#1e293b' : '#f8fafc',
        color: colorMode === 'dark' ? '#f8fafc' : '#0f172a'
      }}
    >
      <StudioToolbar />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <LeftPanel />
        {previewMode === 'design' ? <CanvasStub /> : <GhostPreviewPane />}
        <RightPanel />
      </div>

      <AddSectionModal />
    </div>
  );
};
