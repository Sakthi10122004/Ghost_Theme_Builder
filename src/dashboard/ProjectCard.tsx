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
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-modal)';
        e.currentTarget.style.borderColor = 'var(--line)'; // Keep it static, editorial feel
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--line)';
      }}
    >
      
      {/* Thumbnail Area */}
      <div style={{ height: '180px', position: 'relative', borderBottom: '1px solid var(--line)' }}>
        <ProjectThumbnail project={project} />
        
        {/* Status Badge */}
        {project.status === 'draft' && (
          <div className="font-mono" style={{
            position: 'absolute',
            top: 'var(--space-12)',
            right: 'var(--space-12)',
            backgroundColor: 'rgba(184, 117, 46, 0.1)', // pale warning tint
            color: 'var(--warning)',
            padding: 'var(--space-4) var(--space-8)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-xs)',
            lineHeight: 'var(--text-xs-lh)',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(4px)'
          }}>
            Draft
          </div>
        )}
      </div>

      {/* Body Area */}
      <div style={{ padding: 'var(--space-16)' }}>
        <h3 className="heading-display" style={{ margin: '0 0 var(--space-4) 0', fontSize: 'var(--text-lg)', lineHeight: 'var(--text-lg-lh)', color: 'var(--ink)' }}>
          {project.name}
        </h3>
        <p 
          title={new Date(project.updatedAt).toLocaleString()}
          style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--text-sm-lh)', color: 'var(--muted)' }}
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
