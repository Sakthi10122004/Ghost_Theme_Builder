import { SectionPreset } from '../types';

export const faqPresets: SectionPreset[] = [
  {
    id: 'faq-v1',
    category: 'faq',
    variantName: 'Standard Accordion List',
    keywords: ['faq', 'standard accordion list'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNUQU5EQVJEIEFDQ09SRElPTiBMSVNUPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjQ3NDhiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GQVE8L3RleHQ+Cjwvc3ZnPg==',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'faq',
      name: 'Standard Accordion List',
      props: {
        q1: { kind: 'static', value: 'Question 1' },
        q2: { kind: 'static', value: 'Question 2' }
      },
      styles: {"padding":"64px","maxWidth":"800px","margin":"0 auto","display":"flex","flexDirection":"column","gap":"16px"},
      responsiveStyles: {}
    })
  },
  {
    id: 'faq-v2',
    category: 'faq',
    variantName: '2-Column FAQ Grid',
    keywords: ['faq', '2-column faq grid'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjItQ09MVU1OIEZBUSBHUklEPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjQ3NDhiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GQVE8L3RleHQ+Cjwvc3ZnPg==',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'faq',
      name: '2-Column FAQ Grid',
      props: {
        q1: { kind: 'static', value: 'Q1' },
        q2: { kind: 'static', value: 'Q2' },
        q3: { kind: 'static', value: 'Q3' },
        q4: { kind: 'static', value: 'Q4' }
      },
      styles: {"padding":"64px","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"32px"},
      responsiveStyles: {}
    })
  },
  {
    id: 'faq-v3',
    category: 'faq',
    variantName: 'Minimalist Categorized',
    keywords: ['faq', 'minimalist categorized'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1JTklNQUxJU1QgQ0FURUdPUklaRUQ8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NDc0OGIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZBUTwvdGV4dD4KPC9zdmc+',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'faq',
      name: 'Minimalist Categorized',
      props: {
        cat1: { kind: 'static', value: 'Pricing FAQs' },
        cat2: { kind: 'static', value: 'Support FAQs' }
      },
      styles: {"padding":"48px","display":"flex","flexDirection":"column","gap":"48px"},
      responsiveStyles: {}
    })
  }
];
