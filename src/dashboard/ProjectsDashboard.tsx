import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectRecord, projectsRepository } from './projectsRepository';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from './EmptyState';
import { QuotaIndicator, MAX_PROJECTS } from './QuotaIndicator';
import { TemplateGallery } from './TemplateGallery';
import { ThemeProject } from '../ast/types';
import { Plus } from 'lucide-react';

export const ProjectsDashboard: React.FC = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshProjects = () => {
    setProjects(projectsRepository.list());
  };

  useEffect(() => {
    refreshProjects();
    setIsLoaded(true);
  }, []);

  const handleDuplicate = (id: string) => {
    projectsRepository.duplicate(id);
    refreshProjects();
  };

  const handleDelete = (id: string) => {
    projectsRepository.delete(id);
    refreshProjects();
  };

  const handleCreate = (name: string, ast: ThemeProject) => {
    const newProject = projectsRepository.create(name, ast);
    refreshProjects();
    setShowGallery(false);
    router.push(`/editor/${newProject.id}`);
  };

  if (!isLoaded) return null; // Avoid hydration mismatch for localStorage data

  const isAtLimit = projects.length >= MAX_PROJECTS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh', backgroundColor: 'var(--paper)' }}>
      
      {/* Top Bar */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 'var(--space-24) var(--space-48)',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--line)'
      }}>
        <div>
          <h1 className="heading-display" style={{ margin: '0 0 var(--space-8) 0', fontSize: 'var(--text-xl)', lineHeight: 'var(--text-xl-lh)', color: 'var(--ink)' }}>Projects</h1>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'var(--text-base)', lineHeight: 'var(--text-base-lh)' }}>Manage your Ghost CMS theme projects</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}>
        
          <QuotaIndicator currentCount={projects.length} />
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowGallery(true)}
              disabled={isAtLimit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-8)',
                padding: 'var(--space-8) var(--space-16)',
                backgroundColor: isAtLimit ? 'var(--line)' : 'var(--accent)',
                color: isAtLimit ? 'var(--muted)' : 'white',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 500,
                fontSize: 'var(--text-base)',
                cursor: isAtLimit ? 'not-allowed' : 'pointer'
              }}
            >
              <Plus size={18} />
              New Theme
            </button>
            {isAtLimit && (
              <span style={{ position: 'absolute', top: '100%', right: 0, marginTop: 'var(--space-8)', fontSize: 'var(--text-xs)', color: 'var(--danger)', whiteSpace: 'nowrap' }}>
                Project limit reached.
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {projects.length === 0 ? (
          <EmptyState onCreate={() => setShowGallery(true)} />
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Overlays */}
      {showGallery && (
        <TemplateGallery 
          onClose={() => setShowGallery(false)}
          onSelect={handleCreate}
        />
      )}

    </div>
  );
};
