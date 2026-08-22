import { SectionPreset } from '../types';

export const featuresPresets: SectionPreset[] = [
  {
    id: 'features-grid-4',
    category: 'features',
    variantName: '4-Column Icons',
    keywords: ['benefits', 'points', 'grid', 'icons'],
    thumbnailPath: '/preset-thumbnails/features-grid-4.png',
    buildSection: () => ({
      id: `sec-${Date.now()}`,
      type: 'features-grid',
      name: 'Features Grid',
      props: {
        title: { kind: 'static', value: 'Why choose our theme?' },
        subtitle: { kind: 'static', value: 'Everything you need to succeed online.' }
      },
      styles: {
        padding: '80px 64px',
        backgroundColor: '#ffffff',
        textAlign: 'center'
      },
      responsiveStyles: {
        mobile: { padding: '40px 24px' }
      }
    })
  }
];
