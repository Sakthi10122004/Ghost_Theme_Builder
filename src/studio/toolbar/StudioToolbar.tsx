import React from 'react';
import { DeviceSwitcher } from './DeviceSwitcher';
import { PreviewModeToggle } from './PreviewModeToggle';
import { Download, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAstHistory } from '../../state/astHistory';

export const StudioToolbar: React.FC = () => {
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
      borderBottom: '1px solid #e2e8f0',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      zIndex: 50 // Keep toolbar on top of everything
    }}>
      
      {/* Left Area: Navigation & Project Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => router.push('/dashboard')}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            backgroundColor: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer',
            fontSize: '0.875rem', fontWeight: 500
          }}
        >
          <ChevronLeft size={16} />
          Dashboard
        </button>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }} />
        <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9375rem' }}>
          {present.name || 'Untitled Theme'}
        </span>
      </div>

      {/* Center Area: Undo/Redo & Devices */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        
        {/* Minimal Undo/Redo integration */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={undo} disabled={past.length === 0}
            style={{ border: 'none', background: 'transparent', cursor: past.length ? 'pointer' : 'not-allowed', opacity: past.length ? 1 : 0.4, fontSize: '0.875rem', fontWeight: 500 }}
          >
            Undo
          </button>
          <button 
            onClick={redo} disabled={future.length === 0}
            style={{ border: 'none', background: 'transparent', cursor: future.length ? 'pointer' : 'not-allowed', opacity: future.length ? 1 : 0.4, fontSize: '0.875rem', fontWeight: 500 }}
          >
            Redo
          </button>
        </div>

        <DeviceSwitcher />
      </div>

      {/* Right Area: Preview Toggle & Primary Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <PreviewModeToggle />
        
        <button 
          onClick={handleDownload}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#4f46e5', color: 'white', border: 'none',
            padding: '8px 16px', borderRadius: '6px', fontWeight: 500,
            cursor: 'pointer', fontSize: '0.875rem',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        >
          <Download size={16} />
          Download Theme
        </button>
      </div>

    </header>
  );
};
