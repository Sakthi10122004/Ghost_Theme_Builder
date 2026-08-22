import { SectionPreset } from '../types';

export const authorsPresets: SectionPreset[] = [
  {
  "id": "authors-v1",
  "category": "authors",
  "variantName": "Editorial Directory",
  "keywords": [
    "authors",
    "editorial directory"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Editorial Directory",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 6,
      "order": "name asc",
      "layoutStyle": "grid"
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "authors-v2",
  "category": "authors",
  "variantName": "Spaced Profiles",
  "keywords": [
    "authors",
    "spaced profiles"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Spaced Profiles",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 6,
      "order": "name asc",
      "layoutStyle": "grid"
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "authors-v3",
  "category": "authors",
  "variantName": "Compact Contributors",
  "keywords": [
    "authors",
    "compact contributors"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Compact Contributors",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 12,
      "order": "name asc",
      "layoutStyle": "compact-grid"
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px","padding":"48px"},responsiveStyles: {}})
},
  {
  "id": "authors-v4",
  "category": "authors",
  "variantName": "Magazine Row",
  "keywords": [
    "authors",
    "magazine row"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Magazine Row",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 10,
      "order": "name asc",
      "layoutStyle": "row"
},styles: {"display":"flex","overflowX":"auto","gap":"16px","padding":"32px"},responsiveStyles: {}})
},
  {
  "id": "authors-v5",
  "category": "authors",
  "variantName": "Filled Magazine Row",
  "keywords": [
    "authors",
    "filled magazine row"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Filled Magazine Row",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 10,
      "order": "name asc",
      "layoutStyle": "row"
},styles: {"display":"flex","overflowX":"auto","gap":"16px","padding":"32px","background":"#f1f5f9"},responsiveStyles: {}})
},
  {
  "id": "authors-v6",
  "category": "authors",
  "variantName": "Alternating Profiles",
  "keywords": [
    "authors",
    "alternating profiles"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Alternating Profiles",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 4,
      "order": "name asc",
      "layoutStyle": "alternating"
},styles: {"display":"flex","flexDirection":"column","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "authors-v7",
  "category": "authors",
  "variantName": "Contributor Directory",
  "keywords": [
    "authors",
    "contributor directory"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Contributor Directory",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 10,
      "order": "name asc",
      "layoutStyle": "directory"
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "authors-v8",
  "category": "authors",
  "variantName": "Inline Signatures",
  "keywords": [
    "authors",
    "inline signatures"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v8.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Inline Signatures",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 20,
      "order": "name asc",
      "layoutStyle": "inline"
},styles: {"display":"flex","flexWrap":"wrap","gap":"8px","padding":"32px"},responsiveStyles: {}})
},
  {
  "id": "authors-v9",
  "category": "authors",
  "variantName": "Filled Inline Signatures",
  "keywords": [
    "authors",
    "filled inline signatures"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v9.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Filled Inline Signatures",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 20,
      "order": "name asc",
      "layoutStyle": "chips"
},styles: {"display":"flex","flexWrap":"wrap","gap":"8px","padding":"32px"},responsiveStyles: {}})
},
  {
  "id": "authors-v10",
  "category": "authors",
  "variantName": "Leadership Team",
  "keywords": [
    "authors",
    "leadership team"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v10.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Leadership Team",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "custom",
      "limit": 4,
      "order": "name asc",
      "layoutStyle": "cards"
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "authors-v11",
  "category": "authors",
  "variantName": "Classic Filled Cards",
  "keywords": [
    "authors",
    "classic filled cards"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v11.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Classic Filled Cards",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 6,
      "order": "name asc",
      "layoutStyle": "cards"
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px","background":"#f8fafc"},responsiveStyles: {}})
},
  {
  "id": "authors-v12",
  "category": "authors",
  "variantName": "Classic Contrast Cards",
  "keywords": [
    "authors",
    "classic contrast cards"
  ],
  "thumbnailPath": "/preset-thumbnails/authors-authors-v12.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "authors",name: "Classic Contrast Cards",props: {
      "dynamicDataTarget": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},ghostDynamic: {
      "category": "authors",
      "source": "routes",
      "limit": 6,
      "order": "name asc",
      "layoutStyle": "contrast-cards"
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
}
];
