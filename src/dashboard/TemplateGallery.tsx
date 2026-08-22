import React from 'react';
import { ThemeProject } from '../ast/types';
import { sampleAst } from '../ast/sampleAst';
import { defaultDesignTokens } from '../designSystem/defaultTokens';
import { LayoutTemplate, MonitorPlay, X } from 'lucide-react';

interface Props {
  onSelect: (name: string, ast: ThemeProject) => void;
  onClose: () => void;
}

// A minimal empty AST for "Start from scratch"
const emptyAst: ThemeProject = {
  id: '',
  name: '',
  slug: 'new-blank-theme',
  settings: {},
  designTokens: defaultDesignTokens,
  assets: [],
  layouts: [],
  templates: [
    {
      id: 'tpl-default',
      type: 'default',
      sections: []
    },
    {
      id: 'tpl-index',
      type: 'index',
      sections: []
    },
    {
      id: 'tpl-post',
      type: 'post',
      sections: []
    },
    {
      id: 'tpl-page',
      type: 'page',
      sections: []
    },
    {
      id: 'tpl-tag',
      type: 'tag',
      sections: []
    },
    {
      id: 'tpl-author',
      type: 'author',
      sections: []
    },
    {
      id: 'tpl-error',
      type: 'error',
      sections: []
    }
  ]
};

export const TemplateGallery: React.FC<Props> = ({ onSelect, onClose }) => {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a', margin: '0 0 4px 0' }}>Create New Theme</h2>
            <p style={{ margin: 0, color: '#64748b' }}>Select a starting point for your project.</p>
          </div>
          <button 
            onClick={onClose}
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: '8px' }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            
            {/* Start from Scratch Tile */}
            <TemplateTile 
              title="Start from scratch"
              description="A blank canvas. Build exactly what you need."
              icon={LayoutTemplate}
              onClick={() => onSelect("New Blank Theme", emptyAst)}
            />
            
            {/* Sample Template Tile */}
            <TemplateTile 
              title="Sample Theme"
              description="A pre-built sample featuring a Hero section and Ghost bindings."
              icon={MonitorPlay}
              onClick={() => onSelect("Sample Theme", sampleAst)}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateTile = ({ title, description, icon: Icon, onClick }: any) => (
  <div 
    onClick={onClick}
    style={{
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '24px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.borderColor = '#4f46e5';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.borderColor = '#e2e8f0';
      e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }}
  >
    <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={24} />
    </div>
    <div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.125rem', fontWeight: 600, color: '#1e293b' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>{description}</p>
    </div>
  </div>
);
