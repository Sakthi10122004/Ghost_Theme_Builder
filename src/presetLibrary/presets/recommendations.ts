import { SectionPreset } from '../types';

export const recommendationsPresets: SectionPreset[] = [
  {
  "id": "recommendations-v1",
  "category": "recommendations",
  "variantName": "List with Favicons",
  "keywords": [
    "recommendations",
    "list with favicons"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "List with Favicons",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "recommendations",
      "source": "site-recommendations",
      "limit": 10,
      "order": "published_at desc",
      "layoutStyle": "list-favicons"
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "recommendations-v2",
  "category": "recommendations",
  "variantName": "Card Grid",
  "keywords": [
    "recommendations",
    "card grid"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "Card Grid",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "recommendations",
      "source": "site-recommendations",
      "limit": 6,
      "order": "published_at desc",
      "layoutStyle": "grid"
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)"},responsiveStyles: {}})
},
  {
  "id": "recommendations-v3",
  "category": "recommendations",
  "variantName": "Compact Row",
  "keywords": [
    "recommendations",
    "compact row"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "Compact Row",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "recommendations",
      "source": "site-recommendations",
      "limit": 10,
      "order": "published_at desc",
      "layoutStyle": "compact"
},styles: {"display":"flex","overflowX":"auto"},responsiveStyles: {}})
},
  {
  "id": "recommendations-v4",
  "category": "recommendations",
  "variantName": "Featured Single",
  "keywords": [
    "recommendations",
    "featured single"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "Featured Single",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "recommendations",
      "source": "site-recommendations",
      "limit": 1,
      "order": "published_at desc",
      "layoutStyle": "featured"
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "recommendations-v5",
  "category": "recommendations",
  "variantName": "Minimal Text List",
  "keywords": [
    "recommendations",
    "minimal text list"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "Minimal Text List",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "recommendations",
      "source": "site-recommendations",
      "limit": 10,
      "order": "published_at desc",
      "layoutStyle": "minimal"
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "recommendations-v6",
  "category": "recommendations",
  "variantName": "Sidebar Widget",
  "keywords": [
    "recommendations",
    "sidebar widget"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "Sidebar Widget",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "recommendations",
      "source": "site-recommendations",
      "limit": 5,
      "order": "published_at desc",
      "layoutStyle": "sidebar"
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "recommendations-v7",
  "category": "recommendations",
  "variantName": "Modal Trigger Button",
  "keywords": [
    "recommendations",
    "modal trigger button"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "Modal Trigger Button",props: {
      "button": {
            "kind": "portal",
            "action": "recommendations",
            "label": "View"
      }
},styles: {"display":"flex","justifyContent":"center"},responsiveStyles: {}})
},
  {
  "id": "recommendations-v8",
  "category": "recommendations",
  "variantName": "Two-Column Grid",
  "keywords": [
    "recommendations",
    "two column grid"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v8.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "Two-Column Grid",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "recommendations",
      "source": "site-recommendations",
      "limit": 6,
      "order": "published_at desc",
      "layoutStyle": "grid-2"
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr"},responsiveStyles: {}})
},
  {
  "id": "recommendations-v9",
  "category": "recommendations",
  "variantName": "With Header + View All",
  "keywords": [
    "recommendations",
    "with header   view all"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v9.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "With Header + View All",props: {
      "button": {
            "kind": "portal",
            "action": "recommendations",
            "label": "View"
      }
},ghostDynamic: {
      "category": "recommendations",
      "source": "site-recommendations",
      "limit": 4,
      "order": "published_at desc",
      "layoutStyle": "grid-2"
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "recommendations-v10",
  "category": "recommendations",
  "variantName": "Grid with Descriptions Truncated",
  "keywords": [
    "recommendations",
    "grid with descriptions truncated"
  ],
  "thumbnailPath": "/preset-thumbnails/recommendations-recommendations-v10.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "recommendations",name: "Grid with Descriptions Truncated",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "recommendations",
      "source": "site-recommendations",
      "limit": 9,
      "order": "published_at desc",
      "layoutStyle": "grid-truncated"
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)"},responsiveStyles: {}})
}
];
