import { SectionPreset } from '../types';

export const postsPresets: SectionPreset[] = [
  {
  "id": "posts-v1",
  "category": "posts",
  "variantName": "Classic List",
  "keywords": [
    "posts",
    "classic list"
  ],
  "thumbnailPath": "/preset-thumbnails/posts-posts-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "posts",name: "Classic List",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "posts",
      "source": "routes",
      "limit": 10,
      "order": "published_at desc",
      "layoutStyle": "list"
},styles: {"display":"flex","flexDirection":"column","gap":"32px"},responsiveStyles: {}})
},
  {
  "id": "posts-v2",
  "category": "posts",
  "variantName": "Grid with Sidebar",
  "keywords": [
    "posts",
    "grid with sidebar"
  ],
  "thumbnailPath": "/preset-thumbnails/posts-posts-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "posts",name: "Grid with Sidebar",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "posts",
      "source": "routes",
      "limit": 12,
      "order": "published_at desc",
      "layoutStyle": "grid-sidebar"
},styles: {"display":"grid","gridTemplateColumns":"3fr 1fr","gap":"48px"},responsiveStyles: {}})
},
  {
  "id": "posts-v3",
  "category": "posts",
  "variantName": "Clean Grid",
  "keywords": [
    "posts",
    "clean grid"
  ],
  "thumbnailPath": "/preset-thumbnails/posts-posts-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "posts",name: "Clean Grid",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "posts",
      "source": "routes",
      "limit": 12,
      "order": "published_at desc",
      "layoutStyle": "grid"
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px"},responsiveStyles: {}})
},
  {
  "id": "posts-v4",
  "category": "posts",
  "variantName": "Thumbnail Grid",
  "keywords": [
    "posts",
    "thumbnail grid"
  ],
  "thumbnailPath": "/preset-thumbnails/posts-posts-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "posts",name: "Thumbnail Grid",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "posts",
      "source": "routes",
      "limit": 15,
      "order": "published_at desc",
      "layoutStyle": "dense-grid"
},styles: {"display":"grid","gridTemplateColumns":"repeat(5, 1fr)","gap":"16px"},responsiveStyles: {}})
},
  {
  "id": "posts-v5",
  "category": "posts",
  "variantName": "Magazine Split",
  "keywords": [
    "posts",
    "magazine split"
  ],
  "thumbnailPath": "/preset-thumbnails/posts-posts-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "posts",name: "Magazine Split",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "posts",
      "source": "routes",
      "limit": 6,
      "order": "published_at desc",
      "layoutStyle": "split"
},styles: {"display":"grid","gridTemplateColumns":"2fr 1fr","gap":"32px"},responsiveStyles: {}})
},
  {
  "id": "posts-v6",
  "category": "posts",
  "variantName": "Magazine 3-Column Feature",
  "keywords": [
    "posts",
    "magazine 3 column feature"
  ],
  "thumbnailPath": "/preset-thumbnails/posts-posts-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "posts",name: "Magazine 3-Column Feature",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "posts",
      "source": "routes",
      "limit": 4,
      "order": "published_at desc",
      "layoutStyle": "mixed"
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)"},responsiveStyles: {}})
},
  {
  "id": "posts-v7",
  "category": "posts",
  "variantName": "Full-Bleed Feature",
  "keywords": [
    "posts",
    "full bleed feature"
  ],
  "thumbnailPath": "/preset-thumbnails/posts-posts-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "posts",name: "Full-Bleed Feature",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "posts",
      "source": "featured",
      "limit": 3,
      "order": "published_at desc",
      "layoutStyle": "feature"
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "posts-v8",
  "category": "posts",
  "variantName": "List Plus Subscribe Card",
  "keywords": [
    "posts",
    "list plus subscribe card"
  ],
  "thumbnailPath": "/preset-thumbnails/posts-posts-v8.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "posts",name: "List Plus Subscribe Card",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "posts",
      "source": "routes",
      "limit": 5,
      "order": "published_at desc",
      "layoutStyle": "list"
},styles: {"display":"grid","gridTemplateColumns":"2fr 1fr"},responsiveStyles: {}})
}
];
