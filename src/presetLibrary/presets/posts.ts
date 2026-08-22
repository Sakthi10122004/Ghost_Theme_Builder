import { SectionPreset } from '../types';

export const postsPresets: SectionPreset[] = [
  {
    id: 'posts-v1',
    category: 'posts',
    variantName: 'Standard 3-Column Grid',
    keywords: ['posts', 'standard 3-column grid'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNUQU5EQVJEIDMtQ09MVU1OIEdSSUQ8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NDc0OGIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBPU1RTPC90ZXh0Pgo8L3N2Zz4=',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'posts',
      name: 'Standard 3-Column Grid',
      props: {
        card1: { kind: 'static', value: 'Post Card' },
        card2: { kind: 'static', value: 'Post Card' },
        card3: { kind: 'static', value: 'Post Card' }
      },
      styles: {"padding":"48px","display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"24px"},
      responsiveStyles: {}
    })
  },
  {
    id: 'posts-v2',
    category: 'posts',
    variantName: 'Editorial 1-Column List',
    keywords: ['posts', 'editorial 1-column list'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVESVRPUklBTCAxLUNPTFVNTiBMSVNUPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjQ3NDhiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QT1NUUzwvdGV4dD4KPC9zdmc+',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'posts',
      name: 'Editorial 1-Column List',
      props: {
        card1: { kind: 'static', value: 'Wide Post Card' },
        card2: { kind: 'static', value: 'Wide Post Card' }
      },
      styles: {"padding":"48px","maxWidth":"800px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"32px"},
      responsiveStyles: {}
    })
  },
  {
    id: 'posts-v3',
    category: 'posts',
    variantName: 'Headline Magazine Grid',
    keywords: ['posts', 'headline magazine grid'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkhFQURMSU5FIE1BR0FaSU5FIEdSSUQ8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NDc0OGIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBPU1RTPC90ZXh0Pgo8L3N2Zz4=',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'posts',
      name: 'Headline Magazine Grid',
      props: {
        feature: { kind: 'static', value: 'Massive Featured Post' },
        side: { kind: 'static', value: '4 Side Posts' }
      },
      styles: {"padding":"48px","display":"grid","gridTemplateColumns":"60% 1fr","gap":"32px"},
      responsiveStyles: {}
    })
  }
];
