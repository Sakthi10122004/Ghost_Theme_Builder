import React, { useState } from 'react';
import { ProjectRecord } from './projectsRepository';
import { Edit2, Eye, Copy, Download, Trash2, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  project: ProjectRecord;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProjectCardActions: React.FC<Props> = ({ project, onDuplicate, onDelete }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate into the theme editor (stub route for Phase 2+)
    router.push(`/editor/${project.id}`);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Stub Preview (real compiler not ready)
    alert("Preview coming soon! (Phase 1 Stub)");
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate(project.id);
    setShowMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
      onDelete(project.id);
    }
    setShowMenu(false);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Stub Download (shows what it will do)
    alert(`Mock Download: Compiling AST for "${project.name}" and generating ZIP... (Phase 1 Stub)`);
    setShowMenu(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
      
      {/* Primary Action: Edit */}
      <button 
        onClick={handleEdit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flex: 1,
          justifyContent: 'center',
          padding: '6px 12px',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '0.875rem',
          fontWeight: 500,
          cursor: 'pointer'
        }}
      >
        <Edit2 size={14} />
        Edit
      </button>
      
      {/* Secondary Actions (Overflow menu or quick icons) */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            backgroundColor: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#475569'
          }}
        >
          <MoreVertical size={16} />
        </button>

        {showMenu && (
          <>
            <div 
              style={{ position: 'fixed', inset: 0, zIndex: 10 }} 
              onClick={(e) => { e.stopPropagation(); setShowMenu(false); }} 
            />
            <div style={{
              position: 'absolute',
              bottom: '100%',
              right: 0,
              marginBottom: '8px',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              zIndex: 20,
              minWidth: '160px',
              padding: '4px'
            }}>
              <MenuButton icon={Eye} label="Preview" onClick={handlePreview} />
              <MenuButton icon={Copy} label="Duplicate" onClick={handleDuplicate} />
              <MenuButton icon={Download} label="Download" onClick={handleDownload} />
              <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />
              <MenuButton icon={Trash2} label="Delete" onClick={handleDelete} danger />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MenuButton = ({ icon: Icon, label, onClick, danger }: any) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      width: '100%',
      padding: '8px 12px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      color: danger ? '#ef4444' : '#334155',
      textAlign: 'left'
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = danger ? '#fef2f2' : '#f1f5f9')}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
  >
    <Icon size={14} />
    {label}
  </button>
);
