import { SectionPreset } from '../types';

export const headerPresets: SectionPreset[] = [
  {
    id: 'header-standard',
    category: 'header',
    variantName: 'Standard',
    keywords: ['nav', 'navigation', 'top', 'menu'],
    thumbnailPath: '/preset-thumbnails/header-standard.png',
    buildSection: () => ({
      id: `sec-${Date.now()}`,
      type: 'header',
      name: 'Standard Header',
      props: {
        logo: { kind: 'binding', source: 'site', field: 'logo' },
        navigation: { kind: 'binding', source: 'site', field: 'navigation' },
        showSubscribe: { kind: 'static', value: true }
      },
      styles: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 64px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0'
      },
      responsiveStyles: {
        mobile: { padding: '16px 24px' }
      }
    })
  },
  {
    id: 'header-centered',
    category: 'header',
    variantName: 'Centered Logo',
    keywords: ['nav', 'navigation', 'top', 'menu', 'center'],
    thumbnailPath: '/preset-thumbnails/header-centered.png',
    buildSection: () => ({
      id: `sec-${Date.now()}`,
      type: 'header',
      name: 'Centered Header',
      props: {
        logo: { kind: 'binding', source: 'site', field: 'logo' },
        navigation: { kind: 'binding', source: 'site', field: 'navigation' },
        showSubscribe: { kind: 'static', value: false }
      },
      styles: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        padding: '32px 64px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0'
      },
      responsiveStyles: {
        mobile: { padding: '24px', gap: '16px' }
      }
    })
  }
];
