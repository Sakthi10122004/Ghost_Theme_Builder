import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Section } from '../../ast/types';
import { useEditorStore } from '../../state/editorStore';

interface Props {
  section: Section;
  templateId: string;
}

export const SectionRow: React.FC<Props> = ({ section, templateId }) => {
  const { selectedSectionId, setSelection } = useEditorStore();
  const isSelected = selectedSectionId === section.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      onClick={() => setSelection(templateId, section.id)}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        backgroundColor: isSelected ? '#e0e7ff' : 'white',
        border: `1px solid ${isSelected ? '#818cf8' : '#e2e8f0'}`,
        borderRadius: '6px',
        marginBottom: '8px',
        cursor: 'pointer',
        boxShadow: isSelected ? '0 0 0 1px #818cf8' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        color: isSelected ? '#3730a3' : '#334155'
      }}>
        
        {/* Drag Handle */}
        <div 
          {...attributes} 
          {...listeners}
          style={{ 
            cursor: 'grab', 
            color: '#94a3b8', 
            marginRight: '8px',
            display: 'flex', 
            alignItems: 'center'
          }}
        >
          <GripVertical size={16} />
        </div>
        
        {/* Section Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {section.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: isSelected ? '#6366f1' : '#94a3b8' }}>
            {section.type}
          </div>
        </div>

      </div>
    </div>
  );
};
