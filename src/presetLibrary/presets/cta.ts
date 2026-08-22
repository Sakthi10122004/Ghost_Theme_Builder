import { SectionPreset } from '../types';

export const ctaPresets: SectionPreset[] = [
  {
    id: 'cta-banner',
    category: 'cta',
    variantName: 'Dark Banner',
    keywords: ['subscribe', 'action', 'newsletter', 'banner'],
    thumbnailPath: '/preset-thumbnails/cta-banner.png',
    buildSection: () => ({
      id: `sec-${Date.now()}`,
      type: 'cta-banner',
      name: 'Subscription CTA',
      props: {
        headline: { kind: 'static', value: 'Get our weekly newsletter' },
        description: { kind: 'static', value: 'Join 10,000+ subscribers receiving tips every Tuesday.' },
        buttonText: { kind: 'static', value: 'Subscribe' }
      },
      styles: {
        padding: '80px 64px',
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        textAlign: 'center',
        margin: '40px 64px',
        borderRadius: '16px'
      },
      responsiveStyles: {
        tablet: { margin: '24px', padding: '64px 32px' },
        mobile: { margin: '16px', padding: '40px 24px' }
      }
    })
  }
];
