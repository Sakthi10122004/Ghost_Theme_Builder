import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { useEditorStore } from '../../state/editorStore';

export const DeviceSwitcher: React.FC = () => {
  const breakpoint = useEditorStore((state) => state.breakpoint);
  const setBreakpoint = useEditorStore((state) => state.setBreakpoint);

  const getStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    backgroundColor: isActive ? '#e2e8f0' : 'transparent',
    color: isActive ? '#0f172a' : '#64748b',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '6px' }}>
      <button 
        onClick={() => setBreakpoint('desktop')} 
        style={getStyle(breakpoint === 'desktop')}
        title="Desktop"
      >
        <Monitor size={16} />
      </button>
      <button 
        onClick={() => setBreakpoint('tablet')} 
        style={getStyle(breakpoint === 'tablet')}
        title="Tablet"
      >
        <Tablet size={16} />
      </button>
      <button 
        onClick={() => setBreakpoint('mobile')} 
        style={getStyle(breakpoint === 'mobile')}
        title="Mobile"
      >
        <Smartphone size={16} />
      </button>
    </div>
  );
};
