import { SectionPreset } from '../types';

export const footerPresets: SectionPreset[] = [
  {
    id: 'footer-v1',
    category: 'footer',
    variantName: 'Classic 4-Column Directory',
    keywords: ['footer', 'classic 4-column directory'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNMQVNTSUMgNC1DT0xVTU4gRElSRUNUT1JZPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjQ3NDhiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GT09URVI8L3RleHQ+Cjwvc3ZnPg==',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'footer',
      name: 'Classic 4-Column Directory',
      props: {
        col1: { kind: 'static', value: 'Brand' },
        col2: { kind: 'static', value: 'Links' },
        col3: { kind: 'static', value: 'Tags' },
        col4: { kind: 'static', value: 'Socials' }
      },
      styles: {"padding":"64px","backgroundColor":"#f8fafc","borderTop":"1px solid #e2e8f0","display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"32px"},
      responsiveStyles: {}
    })
  },
  {
    id: 'footer-v2',
    category: 'footer',
    variantName: 'Compact Minimal Bar',
    keywords: ['footer', 'compact minimal bar'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNPTVBBQ1QgTUlOSU1BTCBCQVI8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NDc0OGIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZPT1RFUjwvdGV4dD4KPC9zdmc+',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'footer',
      name: 'Compact Minimal Bar',
      props: {
        text: { kind: 'static', value: 'Copyright 2026' },
        nav: { kind: 'static', value: 'Links' }
      },
      styles: {"padding":"24px 48px","borderTop":"1px solid #e2e8f0","display":"flex","justifyContent":"space-between","alignItems":"center"},
      responsiveStyles: {}
    })
  },
  {
    id: 'footer-v3',
    category: 'footer',
    variantName: 'Newsletter Focused',
    keywords: ['footer', 'newsletter focused'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5FV1NMRVRURVIgRk9DVVNFRDwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Rk9PVEVSPC90ZXh0Pgo8L3N2Zz4=',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'footer',
      name: 'Newsletter Focused',
      props: {
        top: { kind: 'static', value: 'Subscribe Block' },
        bottom: { kind: 'static', value: 'Legal Links' }
      },
      styles: {"padding":"64px","backgroundColor":"#0f172a","color":"white","display":"flex","flexDirection":"column","gap":"48px","textAlign":"center"},
      responsiveStyles: {}
    })
  }
];
