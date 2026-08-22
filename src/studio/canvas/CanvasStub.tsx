import React from 'react';
import { useEditorStore } from '../../state/editorStore';
import { useAstHistory } from '../../state/astHistory';
import { PreviewRenderer } from '../../preview/PreviewRenderer';

export const CanvasStub: React.FC = () => {
  const present = useAstHistory((state) => state.present);
  const selectedTemplateId = useEditorStore((state) => state.selectedTemplateId);
  const selectedSectionId = useEditorStore((state) => state.selectedSectionId);
  const breakpoint = useEditorStore((state) => state.breakpoint);

  const activeTemplate = present.templates?.find(t => t.id === selectedTemplateId);

  if (!activeTemplate) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        Select a template from the left panel to preview.
      </div>
    );
  }

  // A very basic approximation of the device width based on breakpoint
  const getWidth = () => {
    switch (breakpoint) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div style={{ 
      flex: 1, 
      backgroundColor: '#f1f5f9', 
      overflowY: 'auto', 
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ 
        width: getWidth(),
        maxWidth: '100%',
        backgroundColor: 'white',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: 'width 0.3s ease-in-out',
        minHeight: '100%'
      }}>
        
        {/* We map over the sections to wrap them in a highlighting container */}
        {activeTemplate.sections.map((section) => {
          const isSelected = selectedSectionId === section.id;

          return (
            <div 
              key={section.id} 
              id={`canvas-section-${section.id}`} // Used for scrolling later if needed
              style={{
                position: 'relative',
                outline: isSelected ? '1px solid var(--accent)' : '1px solid transparent',
                outlineOffset: '-1px',
                transition: 'outline 0.2s',
                zIndex: isSelected ? 10 : 1
              }}
            >
              {/* Corner Tick Marks (Printer's crop marks) */}
              {isSelected && (
                <>
                  <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '8px', height: '8px', borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }} />
                  <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', borderTop: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }} />
                  <div style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '8px', height: '8px', borderBottom: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)' }} />
                  <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '8px', height: '8px', borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)' }} />
                </>
              )}

              {/* Active-section label: margin annotation style */}
              {isSelected && (
                <div className="font-mono" style={{
                  position: 'absolute', 
                  top: '-24px', 
                  left: 0,
                  color: 'var(--accent)',
                  fontSize: 'var(--text-xs)',
                  lineHeight: 'var(--text-xs-lh)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {section.name} (Active)
                </div>
              )}
              
              {/* We render a single-section template just to reuse PreviewRenderer logic */}
              <PreviewRenderer template={{ ...activeTemplate, sections: [section] }} designTokens={present.designTokens} />
            </div>
          );
        })}

        {activeTemplate.sections.length === 0 && (
          <div style={{ padding: '80px', textAlign: 'center', color: '#94a3b8' }}>
            Empty Canvas
          </div>
        )}

      </div>
    </div>
  );
};
