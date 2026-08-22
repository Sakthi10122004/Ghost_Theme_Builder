import { SectionPreset } from '../types';

export const heroPresets: SectionPreset[] = [
  {
    id: 'hero-split',
    category: 'hero',
    variantName: 'Split Image',
    keywords: ['header', 'top', 'image', 'split'],
    thumbnailPath: '/preset-thumbnails/hero-split.png',
    buildSection: () => ({
      id: `sec-${Date.now()}`,
      type: 'hero',
      name: 'Split Hero',
      props: {
        headline: { kind: 'static', value: 'Publish your best work with our platform.' },
        subheadline: { kind: 'static', value: 'Join thousands of creators who rely on us for fast, beautiful blogs.' },
        ctaText: { kind: 'static', value: 'Start reading' },
        image: { kind: 'static', value: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643' }
      },
      styles: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        padding: '80px 64px',
        backgroundColor: '#ffffff'
      },
      responsiveStyles: {
        tablet: { gridTemplateColumns: '1fr', padding: '48px' },
        mobile: { padding: '32px 24px' }
      }
    })
  },
  {
    id: 'hero-centered',
    category: 'hero',
    variantName: 'Centered Text',
    keywords: ['header', 'top', 'text', 'center'],
    thumbnailPath: '/preset-thumbnails/hero-centered.png',
    buildSection: () => ({
      id: `sec-${Date.now()}`,
      type: 'hero',
      name: 'Centered Hero',
      props: {
        headline: { kind: 'binding', source: 'site', field: 'title' },
        subheadline: { kind: 'binding', source: 'site', field: 'description' },
        ctaText: { kind: 'static', value: 'Subscribe Now' },
      },
      styles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 64px',
        backgroundColor: '#f8fafc'
      },
      responsiveStyles: {
        mobile: { padding: '80px 24px' }
      }
    })
  }
];
