import { SectionPreset } from '../types';

export const productsPresets: SectionPreset[] = [
  {
    id: 'products-v1',
    category: 'products',
    variantName: 'E-book Showcase',
    keywords: ['products', 'e-book showcase'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkUtQk9PSyBTSE9XQ0FTRTwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UFJPRFVDVFM8L3RleHQ+Cjwvc3ZnPg==',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'products',
      name: 'E-book Showcase',
      props: {
        img: { kind: 'static', value: '3D Book Image' },
        info: { kind: 'static', value: 'Details & Checkout' }
      },
      styles: {"padding":"64px","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"32px","alignItems":"center"},
      responsiveStyles: {}
    })
  },
  {
    id: 'products-v2',
    category: 'products',
    variantName: 'Digital Goods Grid',
    keywords: ['products', 'digital goods grid'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRJR0lUQUwgR09PRFMgR1JJRDwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UFJPRFVDVFM8L3RleHQ+Cjwvc3ZnPg==',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'products',
      name: 'Digital Goods Grid',
      props: {
        prod1: { kind: 'static', value: 'Product Card' },
        prod2: { kind: 'static', value: 'Product Card' },
        prod3: { kind: 'static', value: 'Product Card' }
      },
      styles: {"padding":"48px","display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"24px"},
      responsiveStyles: {}
    })
  },
  {
    id: 'products-v3',
    category: 'products',
    variantName: 'Featured Resource Banner',
    keywords: ['products', 'featured resource banner'],
    thumbnailPath: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE1NyIgZmlsbD0iI2Y4ZmFmYyIgLz4KICA8cmVjdCB3aWR0aD0iMjc4IiBoZWlnaHQ9IjE1NSIgeD0iMSIgeT0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgcng9IjYiIC8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzMzQxNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZFQVRVUkVEIFJFU09VUkNFIEJBTk5FUjwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UFJPRFVDVFM8L3RleHQ+Cjwvc3ZnPg==',
    buildSection: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: 'products',
      name: 'Featured Resource Banner',
      props: {
        title: { kind: 'static', value: 'New Course Available' },
        btn: { kind: 'static', value: 'Buy Now' }
      },
      styles: {"padding":"24px 48px","backgroundColor":"#e0e7ff","display":"flex","justifyContent":"space-between","alignItems":"center"},
      responsiveStyles: {}
    })
  }
];
