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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      
      {/* Top Bar */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '24px 40px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>Projects</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Manage your Ghost CMS theme projects</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <QuotaIndicator currentCount={projects.length} />
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowGallery(true)}
              disabled={isAtLimit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: isAtLimit ? '#cbd5e1' : '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 500,
                cursor: isAtLimit ? 'not-allowed' : 'pointer'
              }}
            >
              <Plus size={18} />
              New Theme
            </button>
            {isAtLimit && (
              <span style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', fontSize: '0.75rem', color: '#ef4444', whiteSpace: 'nowrap' }}>
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
