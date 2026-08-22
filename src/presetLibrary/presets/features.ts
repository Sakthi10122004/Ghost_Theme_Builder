import { SectionPreset } from '../types';

export const featuresPresets: SectionPreset[] = [
  {
    id: 'features-v1',
    category: 'features',
    variantName: '3-Card Service Matrix',
    keywords: ['features', '3-card service matrix'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjMtQ0FSRCBTRVJWSUNFIE1BVFJJWDwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RkVBVFVSRVM8L3RleHQ+Cjwvc3ZnPg==',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'features',
      name: '3-Card Service Matrix',
      props: {
        col1: { kind: 'static', value: 'Feature 1' },
        col2: { kind: 'static', value: 'Feature 2' },
        col3: { kind: 'static', value: 'Feature 3' }
      },
      styles: {"padding":"64px","display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"24px","textAlign":"center"},
      responsiveStyles: {}
    })
  },
  {
    id: 'features-v2',
    category: 'features',
    variantName: 'Alternating Zig-Zag',
    keywords: ['features', 'alternating zig-zag'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFMVEVSTkFUSU5HIFpJRy1aQUc8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NDc0OGIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZFQVRVUkVTPC90ZXh0Pgo8L3N2Zz4=',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'features',
      name: 'Alternating Zig-Zag',
      props: {
        row1: { kind: 'static', value: 'Image Left | Text Right' },
        row2: { kind: 'static', value: 'Text Left | Image Right' }
      },
      styles: {"padding":"64px","display":"flex","flexDirection":"column","gap":"64px"},
      responsiveStyles: {}
    })
  },
  {
    id: 'features-v3',
    category: 'features',
    variantName: 'Category Badges',
    keywords: ['features', 'category badges'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNBVEVHT1JZIEJBREdFUzwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RkVBVFVSRVM8L3RleHQ+Cjwvc3ZnPg==',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'features',
      name: 'Category Badges',
      props: {
        badges: { kind: 'static', value: 'Tech | Design | Culture | AI' }
      },
      styles: {"padding":"48px","display":"flex","flexWrap":"wrap","gap":"16px","justifyContent":"center"},
      responsiveStyles: {}
    })
  }
];
