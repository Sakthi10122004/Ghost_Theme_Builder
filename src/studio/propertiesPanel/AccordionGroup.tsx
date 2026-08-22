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
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        onClick={() => setAccordionOpen(id, !isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-16)',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--text-sm-lh)', fontWeight: 600, color: 'var(--ink)' }}>{title}</span>
        {isOpen ? (
          <ChevronDown size={18} color="var(--muted)" />
        ) : (
          <ChevronRight size={18} color="var(--muted)" />
        )}
      </button>
      
      {isOpen && (
        <div style={{ padding: '0 var(--space-16) var(--space-24) var(--space-16)' }}>
          {children}
        </div>
      )}
    </div>
  );
};
