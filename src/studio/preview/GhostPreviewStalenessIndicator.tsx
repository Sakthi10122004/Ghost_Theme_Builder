import React, { useEffect, useState } from 'react';
import { useEditorStore } from '@/state/editorStore';
import { useAstHistory } from '@/state/astHistory';

interface Props {
  onRefresh: () => void;
}

export const GhostPreviewStalenessIndicator: React.FC<Props> = ({ onRefresh }) => {
  const ast = useAstHistory(state => state.present);
  const ghostPreviewStatus = useEditorStore(state => state.ghostPreviewStatus);
  const [lastCompiledAst, setLastCompiledAst] = useState<string | null>(null);

  useEffect(() => {
    if (ghostPreviewStatus === 'ready') {
      setLastCompiledAst(JSON.stringify(ast));
    }
  }, [ghostPreviewStatus, ast]);

  const isStale = lastCompiledAst !== null && lastCompiledAst !== JSON.stringify(ast) && ghostPreviewStatus === 'ready';

  if (!isStale) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#fbbf24', // Yellow
      color: '#000',
      padding: '8px 16px',
      borderRadius: '24px',
      fontSize: '13px',
      fontWeight: 600,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 50
    }}>
      <span>Preview out of date</span>
      <button 
        onClick={onRefresh}
        style={{
          background: 'rgba(0,0,0,0.1)',
          border: 'none',
          padding: '4px 12px',
          borderRadius: '16px',
          cursor: 'pointer',
          fontWeight: 600,
          color: '#000'
        }}
      >
        Refresh
      </button>
    </div>
  );
};
