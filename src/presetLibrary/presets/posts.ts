import { SectionPreset } from '../types';

export const postsPresets: SectionPreset[] = [
  {
    id: 'posts-grid-3',
    category: 'posts',
    variantName: '3-Column Grid',
    keywords: ['articles', 'blog', 'list', 'grid'],
    thumbnailPath: '/preset-thumbnails/posts-grid-3.png',
    buildSection: () => ({
      id: `sec-${Date.now()}`,
      type: 'post-grid',
      name: 'Latest Posts (3 Columns)',
      ghostDynamic: { 
        category: 'posts',
        source: 'routes',
        limit: 6,
        order: 'published_at desc',
        layoutStyle: 'grid'
      },
      props: {
        title: { kind: 'static', value: 'Latest from the blog' },
        limit: { kind: 'static', value: 6 },
        columns: { kind: 'static', value: 3 },
        showExcerpts: { kind: 'static', value: true }
      },
      styles: {
        padding: '80px 64px',
        backgroundColor: '#ffffff'
      },
      responsiveStyles: {
        tablet: { padding: '48px' },
        mobile: { padding: '32px 24px' }
      }
    })
  },
  {
    id: 'posts-list',
    category: 'posts',
    variantName: 'Simple List',
    keywords: ['articles', 'blog', 'list', 'row'],
    thumbnailPath: '/preset-thumbnails/posts-list.png',
    buildSection: () => ({
      id: `sec-${Date.now()}`,
      type: 'post-list',
      name: 'Recent Posts List',
      ghostDynamic: { 
        category: 'posts',
        source: 'routes',
        limit: 5,
        order: 'published_at desc',
        layoutStyle: 'list'
      },
      props: {
        title: { kind: 'static', value: 'Recent Articles' },
        limit: { kind: 'static', value: 5 },
        showDates: { kind: 'static', value: true }
      },
      styles: {
        padding: '64px',
        backgroundColor: '#f8fafc',
        maxWidth: '800px',
        margin: '0 auto'
      },
      responsiveStyles: {
        mobile: { padding: '32px 24px' }
      }
    })
  }
];
