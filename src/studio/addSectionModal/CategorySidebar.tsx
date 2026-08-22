import React from 'react';
import { PresetCategory } from '../../presetLibrary/types';
import { presetCounts } from '../../presetLibrary/index';

interface Props {
  activeCategory: PresetCategory | 'all';
  onSelectCategory: (category: PresetCategory | 'all') => void;
}

const CATEGORIES: { id: PresetCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Sections' },
  { id: 'header', label: 'Header' },
  { id: 'footer', label: 'Footer' },
  { id: 'hero', label: 'Hero' },
  { id: 'posts', label: 'Posts' },
  { id: 'features', label: 'Features' },
  { id: 'cta', label: 'CTA' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'authors', label: 'Authors' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'tags', label: 'Tags' },
  { id: 'products', label: 'Products' },
  { id: 'stats', label: 'Stats' },
  { id: 'faq', label: 'FAQ' },
  { id: 'logo-cloud', label: 'Logo Cloud' },
];

export const CategorySidebar: React.FC<Props> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div style={{ width: '220px', borderRight: '1px solid #e2e8f0', paddingRight: '16px', overflowY: 'auto' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {CATEGORIES.map(cat => {
          const count = presetCounts[cat.id] || 0;
          const isActive = activeCategory === cat.id;

          return (
            <li key={cat.id}>
              <button
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                  color: isActive ? '#0f172a' : '#475569',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.1s'
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>{cat.label}</span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: isActive ? '#64748b' : '#94a3b8',
                  backgroundColor: isActive ? '#e2e8f0' : 'transparent',
                  padding: '2px 6px',
                  borderRadius: '12px'
                }}>
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
