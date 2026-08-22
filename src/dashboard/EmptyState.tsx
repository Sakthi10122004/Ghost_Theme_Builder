import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onCreate: () => void;
}

export const EmptyState: React.FC<Props> = ({ onCreate }) => {
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '80px 24px', 
      textAlign: 'center', 
      flex: 1,
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px dashed #cbd5e1'
    }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 600, 
        marginBottom: '24px', 
        color: '#1e293b' 
      }}>
        Welcome to your Ghost Theme Builder
      </h2>
      
      <button 
        onClick={onCreate}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4338ca')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
      >
        <Plus size={20} />
        Create your first theme
      </button>
    </div>
  );
};
