import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEditorStore } from '../../state/editorStore';

interface Props {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const AccordionGroup: React.FC<Props> = ({ id, title, children }) => {
  const isOpen = useEditorStore((state) => state.accordionState[id] ?? false);
  const setAccordionOpen = useEditorStore((state) => state.setAccordionOpen);

  return (
    <div style={{ borderBottom: '1px solid #e2e8f0' }}>
      <button
        onClick={() => setAccordionOpen(id, !isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>{title}</span>
        {isOpen ? (
          <ChevronDown size={18} color="#64748b" />
        ) : (
          <ChevronRight size={18} color="#64748b" />
        )}
      </button>
      
      {isOpen && (
        <div style={{ padding: '0 16px 24px 16px' }}>
          {children}
        </div>
      )}
    </div>
  );
};
