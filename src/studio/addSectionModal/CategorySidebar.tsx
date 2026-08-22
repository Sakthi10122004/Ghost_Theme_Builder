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
                  padding: 'var(--space-8) var(--space-12)',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--paper)' : 'transparent',
                  color: isActive ? 'var(--ink)' : 'var(--muted)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--text-sm-lh)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.1s'
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--paper)';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>{cat.label}</span>
                <span className="font-mono" style={{ 
                  fontSize: 'var(--text-xs)', 
                  color: isActive ? 'var(--muted)' : 'var(--muted)',
                  backgroundColor: isActive ? 'var(--line)' : 'transparent',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)'
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
