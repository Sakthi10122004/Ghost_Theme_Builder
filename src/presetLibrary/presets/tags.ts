import { SectionPreset } from '../types';

export const tagsPresets: SectionPreset[] = [
  {
  "id": "tags-v1",
  "category": "tags",
  "variantName": "Tag Cloud",
  "keywords": [
    "tags",
    "tag cloud"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Tag Cloud",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 20,
      "order": "count.posts desc",
      "layoutStyle": "cloud"
},styles: {"display":"flex","flexWrap":"wrap"},responsiveStyles: {}})
},
  {
  "id": "tags-v2",
  "category": "tags",
  "variantName": "Tag Grid with Post Count",
  "keywords": [
    "tags",
    "tag grid with post count"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Tag Grid with Post Count",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 6,
      "order": "count.posts desc",
      "layoutStyle": "grid"
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)"},responsiveStyles: {}})
},
  {
  "id": "tags-v3",
  "category": "tags",
  "variantName": "Tag Header for Archive",
  "keywords": [
    "tags",
    "tag header for archive"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Tag Header for Archive",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 1,
      "order": "count.posts desc",
      "layoutStyle": "header"
},styles: {"display":"flex","flexDirection":"column","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "tags-v4",
  "category": "tags",
  "variantName": "Tag Pills Row",
  "keywords": [
    "tags",
    "tag pills row"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Tag Pills Row",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 10,
      "order": "count.posts desc",
      "layoutStyle": "pills"
},styles: {"display":"flex","overflowX":"auto"},responsiveStyles: {}})
},
  {
  "id": "tags-v5",
  "category": "tags",
  "variantName": "Tag List with Featured Post",
  "keywords": [
    "tags",
    "tag list with featured post"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Tag List with Featured Post",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 5,
      "order": "count.posts desc",
      "layoutStyle": "list-featured"
},styles: {"display":"grid","gridTemplateColumns":"1fr 2fr"},responsiveStyles: {}})
},
  {
  "id": "tags-v6",
  "category": "tags",
  "variantName": "Category Nav Bar",
  "keywords": [
    "tags",
    "category nav bar"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Category Nav Bar",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 5,
      "order": "count.posts desc",
      "layoutStyle": "nav"
},styles: {"display":"flex","justifyContent":"center"},responsiveStyles: {}})
},
  {
  "id": "tags-v7",
  "category": "tags",
  "variantName": "Tag Grid with Cover Images",
  "keywords": [
    "tags",
    "tag grid with cover images"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Tag Grid with Cover Images",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 4,
      "order": "count.posts desc",
      "layoutStyle": "grid-cover"
},styles: {"display":"grid","gridTemplateColumns":"repeat(2, 1fr)"},responsiveStyles: {}})
},
  {
  "id": "tags-v8",
  "category": "tags",
  "variantName": "Popular Tags Sidebar",
  "keywords": [
    "tags",
    "popular tags sidebar"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v8.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Popular Tags Sidebar",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 5,
      "order": "count.posts desc",
      "layoutStyle": "sidebar"
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "tags-v9",
  "category": "tags",
  "variantName": "Tag Filter + Post Grid Combined",
  "keywords": [
    "tags",
    "tag filter   post grid combined"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v9.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Tag Filter + Post Grid Combined",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 10,
      "order": "count.posts desc",
      "layoutStyle": "filter-grid"
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "tags-v10",
  "category": "tags",
  "variantName": "Minimal Tag List",
  "keywords": [
    "tags",
    "minimal tag list"
  ],
  "thumbnailPath": "/preset-thumbnails/tags-tags-v10.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "tags",name: "Minimal Tag List",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "tags",
      "source": "routes",
      "limit": 10,
      "order": "count.posts desc",
      "layoutStyle": "minimal"
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
}
];
