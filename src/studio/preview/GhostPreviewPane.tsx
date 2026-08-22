import React from 'react';
import { useEditorStore } from '@/state/editorStore';
import { useAstHistory } from '@/state/astHistory';
import { GhostPreviewStalenessIndicator } from './GhostPreviewStalenessIndicator';
import { ExternalLink, Loader2 } from 'lucide-react';

export const GhostPreviewPane: React.FC = () => {
  const { ghostPreviewStatus, ghostPreviewUrl, ghostPreviewError, setGhostPreviewState, breakpoint } = useEditorStore();
  const ast = useAstHistory(state => state.present);

  const triggerPreview = async () => {
    setGhostPreviewState('compiling');
    try {
      const res = await fetch('/api/preview/ghost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ast)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setGhostPreviewState('error', null, data.error || 'Unknown compilation error');
        return;
      }

      setGhostPreviewState('ready', data.url);
    } catch (err: any) {
      setGhostPreviewState('error', null, err.message);
    }
  };

  // If we haven't started yet, auto-trigger
  React.useEffect(() => {
    if (ghostPreviewStatus === 'idle') {
      triggerPreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWidth = () => {
    switch (breakpoint) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div style={{ flex: 1, backgroundColor: '#f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', position: 'relative', overflowY: 'auto' }}>
      
      <GhostPreviewStalenessIndicator onRefresh={triggerPreview} />

      <div style={{ 
        width: getWidth(),
        maxWidth: '100%',
        backgroundColor: 'white',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: 'width 0.3s ease-in-out',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        
        {/* URL Bar & New Tab fallback */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ghostPreviewStatus === 'ready' ? '#10b981' : '#f59e0b' }} />
            {ghostPreviewUrl ? new URL(ghostPreviewUrl).host : 'Ghost Preview'}
          </div>
          {ghostPreviewUrl && (
            <a href={ghostPreviewUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>
              Open in new tab <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, position: 'relative' }}>
          {ghostPreviewStatus === 'error' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', padding: '32px', textAlign: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0' }}>Preview Failed</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>{ghostPreviewError}</p>
                <button onClick={triggerPreview} style={{ marginTop: '16px', padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Retry</button>
              </div>
            </div>
          )}

          {ghostPreviewStatus === 'compiling' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', background: 'white' }}>
              <Loader2 className="animate-spin" size={32} color="#4f46e5" />
              <div style={{ color: '#4f46e5', fontWeight: 500 }}>Compiling theme...</div>
            </div>
          )}
          
          {ghostPreviewStatus === 'starting' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', background: 'white' }}>
              <Loader2 className="animate-spin" size={32} color="#4f46e5" />
              <div style={{ color: '#4f46e5', fontWeight: 500 }}>Starting Ghost instance...</div>
            </div>
          )}
          
          {ghostPreviewStatus === 'installing' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', background: 'white' }}>
              <Loader2 className="animate-spin" size={32} color="#4f46e5" />
              <div style={{ color: '#4f46e5', fontWeight: 500 }}>Installing theme...</div>
            </div>
          )}

          {ghostPreviewStatus === 'ready' && ghostPreviewUrl && (
            <iframe 
              src={ghostPreviewUrl} 
              style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
              title="Ghost Preview"
            />
          )}
        </div>
      </div>
    </div>
  );
};
