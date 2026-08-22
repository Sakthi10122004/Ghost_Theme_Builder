import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { SectionRow } from './SectionRow';
import { useAstHistory } from '../../state/astHistory';
import { useEditorStore } from '../../state/editorStore';
import { Template } from '../../ast/types';

interface Props {
  template: Template;
}

export const SectionsList: React.FC<Props> = ({ template }) => {
  const reorderSection = useAstHistory((state) => state.reorderSection);
  const setIsAddSectionModalOpen = useEditorStore((state) => state.setIsAddSectionModalOpen);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = template.sections.findIndex(s => s.id === active.id);
      const newIndex = template.sections.findIndex(s => s.id === over.id);
      reorderSection(template.id, oldIndex, newIndex);
    }
  };

  const handleAddSection = () => {
    setIsAddSectionModalOpen(true);
  };

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 8px' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', margin: 0 }}>
          Sections
        </h3>
        <button 
          onClick={handleAddSection}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '24px', height: '24px', borderRadius: '4px',
            backgroundColor: '#f1f5f9', border: 'none', color: '#4f46e5',
            cursor: 'pointer'
          }}
          title="Add Section"
        >
          <Plus size={16} />
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={template.sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <div style={{ padding: '0 8px' }}>
            {template.sections.map((section) => (
              <SectionRow key={section.id} section={section} templateId={template.id} />
            ))}
            {template.sections.length === 0 && (
              <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
                No sections yet.
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
