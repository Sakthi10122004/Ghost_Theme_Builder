import React from 'react';
import { ProjectRecord } from './projectsRepository';
import { ProjectThumbnail } from './thumbnails/ProjectThumbnail';
import { ProjectCardActions } from './ProjectCardActions';
import { useRouter } from 'next/navigation';

interface Props {
  project: ProjectRecord;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const ProjectCard: React.FC<Props> = ({ project, onDuplicate, onDelete }) => {
  const router = useRouter();
  
  return (
    <div 
      onClick={() => router.push(`/editor/${project.id}`)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
      }}
    >
      
      {/* Thumbnail Area */}
      <div style={{ height: '180px', position: 'relative', borderBottom: '1px solid #e2e8f0' }}>
        <ProjectThumbnail project={project} />
        
        {/* Status Badge */}
        {project.status === 'draft' && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(254, 243, 199, 0.9)',
            color: '#b45309',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(4px)'
          }}>
            Draft
          </div>
        )}
      </div>

      {/* Body Area */}
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.125rem', fontWeight: 600, color: '#1e293b' }}>
          {project.name}
        </h3>
        <p 
          title={new Date(project.updatedAt).toLocaleString()}
          style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}
        >
          Edited {timeAgo(project.updatedAt)}
        </p>
      </div>

      {/* Actions */}
      <ProjectCardActions 
        project={project} 
        onDuplicate={onDuplicate} 
        onDelete={onDelete} 
      />
      
    </div>
  );
};
