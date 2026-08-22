import { SectionPreset } from '../types';

export const footerPresets: SectionPreset[] = [
  {
    id: 'footer-standard',
    category: 'footer',
    variantName: 'Standard',
    keywords: ['bottom', 'links', 'copyright'],
    thumbnailPath: '/preset-thumbnails/footer-standard.png',
    buildSection: () => ({
      id: `sec-${Date.now()}`,
      type: 'footer',
      name: 'Standard Footer',
      props: {
        title: { kind: 'binding', source: 'site', field: 'title' },
        navigation: { kind: 'binding', source: 'site', field: 'navigation' },
        copyright: { kind: 'static', value: '© 2026 All Rights Reserved.' }
      },
      styles: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '48px 64px',
        backgroundColor: '#0f172a',
        color: '#f8fafc'
      },
      responsiveStyles: {
        mobile: { flexDirection: 'column', padding: '32px 24px', gap: '24px', textAlign: 'center' }
      }
    })
  }
];
