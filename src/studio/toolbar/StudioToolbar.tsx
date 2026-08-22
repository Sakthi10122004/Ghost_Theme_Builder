import React from 'react';
import { DeviceSwitcher } from './DeviceSwitcher';
import { Download, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAstHistory } from '../../state/astHistory';
import { ContinuousIssuesIndicator } from '../exportFlow/ContinuousIssuesIndicator';
import { ExportPanel } from '../exportFlow/ExportPanel';
import { DataSourceToggle } from '../preview/DataSourceToggle';
import { PreviewModeToggle } from '../preview/PreviewModeToggle';
import { ColorModeToggle } from './ColorModeToggle';

export const StudioToolbar: React.FC = () => {
  const [showExportPanel, setShowExportPanel] = React.useState(false);
  const router = useRouter();
  const present = useAstHistory((state) => state.present);
  const undo = useAstHistory((state) => state.undo);
  const redo = useAstHistory((state) => state.redo);
  const past = useAstHistory((state) => state.past);
  const future = useAstHistory((state) => state.future);

  const handleDownload = () => {
    alert(`Mock Download: Compiling AST for "${present.name}" and generating ZIP... (Phase 2 Stub)`);
  };

  return (
    <header style={{
      height: '56px',
      borderBottom: '1px solid var(--line)',
      backgroundColor: 'var(--surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-16)',
      position: 'relative',
      zIndex: 50 // Keep toolbar on top of everything
    }}>
      
      {/* Left Area: Navigation & Project Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}>
        <button 
          onClick={() => router.push('/dashboard')}
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
            backgroundColor: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer',
            fontSize: 'var(--text-sm)', fontWeight: 500
          }}
        >
          <ChevronLeft size={16} />
          Dashboard
        </button>
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--line)' }} />
        <span style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 'var(--text-base)' }}>
          {present.name || 'Untitled Theme'}
        </span>
      </div>

      {/* Center Area: Undo/Redo & Devices */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-24)' }}>
        
        {/* Minimal Undo/Redo integration */}
        <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
          <button 
            onClick={undo} disabled={past.length === 0}
            style={{ border: 'none', background: 'transparent', cursor: past.length ? 'pointer' : 'not-allowed', opacity: past.length ? 1 : 0.4, fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--ink)' }}
          >
            Undo
          </button>
          <button 
            onClick={redo} disabled={future.length === 0}
            style={{ border: 'none', background: 'transparent', cursor: future.length ? 'pointer' : 'not-allowed', opacity: future.length ? 1 : 0.4, fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--ink)' }}
          >
            Redo
          </button>
        </div>

        <DeviceSwitcher />
      </div>

      {/* Right Area: Preview Toggle & Primary Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)' }}>
        <ContinuousIssuesIndicator onClick={() => setShowExportPanel(true)} />
        <ColorModeToggle />
        <DataSourceToggle />
        <PreviewModeToggle />
        
        <button 
          onClick={() => setShowExportPanel(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-8)',
            backgroundColor: 'var(--accent)', color: 'white', border: 'none',
            padding: 'var(--space-8) var(--space-16)', borderRadius: 'var(--radius-sm)', fontWeight: 500,
            cursor: 'pointer', fontSize: 'var(--text-sm)'
          }}
        >
          <Download size={16} />
          Export Theme
        </button>
      </div>
      
      {showExportPanel && (
        <ExportPanel onClose={() => setShowExportPanel(false)} />
      )}
    </header>
  );
};
