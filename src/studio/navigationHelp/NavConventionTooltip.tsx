import React from 'react';
import { HelpCircle } from 'lucide-react';

export const NavConventionTooltip: React.FC = () => {
  return (
    <div className="nav-tooltip-container" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '6px', position: 'relative', cursor: 'help' }}>
      <HelpCircle size={14} color="#94a3b8" />
      <div className="nav-tooltip-content" style={{
        position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px',
        width: '240px', padding: '8px 12px', backgroundColor: '#1e293b', color: '#f8fafc',
        fontSize: '0.75rem', borderRadius: '6px', opacity: 0, pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 100,
        lineHeight: 1.4
      }}>
        To create a dropdown, prefix a sub-item's label with a dash and space (e.g. '- About') and place it right after its parent in Ghost Admin's navigation settings.
      </div>
      <style>{`
        .nav-tooltip-container:hover .nav-tooltip-content {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};
