import { SectionPreset } from '../types';

export const statsPresets: SectionPreset[] = [
  {
  "id": "stats-v1",
  "category": "stats",
  "variantName": "At a Glance",
  "keywords": [
    "stats",
    "at a glance"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "At a Glance",props: {
      "title": {
            "kind": "static",
            "value": "Sample At a Glance"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px","padding":"64px","textAlign":"center"},responsiveStyles: {}})
},
  {
  "id": "stats-v2",
  "category": "stats",
  "variantName": "Headline Plus Metrics",
  "keywords": [
    "stats",
    "headline plus metrics"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "Headline Plus Metrics",props: {
      "title": {
            "kind": "static",
            "value": "Sample Headline Plus Metrics"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"32px","padding":"64px","textAlign":"center"},responsiveStyles: {}})
},
  {
  "id": "stats-v3",
  "category": "stats",
  "variantName": "Proof Points",
  "keywords": [
    "stats",
    "proof points"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "Proof Points",props: {
      "title": {
            "kind": "static",
            "value": "Sample Proof Points"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px","padding":"48px","textAlign":"center"},responsiveStyles: {}})
},
  {
  "id": "stats-v4",
  "category": "stats",
  "variantName": "Bordered Cards",
  "keywords": [
    "stats",
    "bordered cards"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "Bordered Cards",props: {
      "title": {
            "kind": "static",
            "value": "Sample Bordered Cards"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "stats-v5",
  "category": "stats",
  "variantName": "Steps 2x2",
  "keywords": [
    "stats",
    "steps 2x2"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "Steps 2x2",props: {
      "title": {
            "kind": "static",
            "value": "Sample Steps 2x2"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "stats-v6",
  "category": "stats",
  "variantName": "Headline-less Minimal Row",
  "keywords": [
    "stats",
    "headline less minimal row"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "Headline-less Minimal Row",props: {
      "title": {
            "kind": "static",
            "value": "Sample Headline-less Minimal Row"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"flex","justifyContent":"space-around","padding":"48px"},responsiveStyles: {}})
},
  {
  "id": "stats-v7",
  "category": "stats",
  "variantName": "Editorial Impact",
  "keywords": [
    "stats",
    "editorial impact"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "Editorial Impact",props: {
      "title": {
            "kind": "static",
            "value": "Sample Editorial Impact"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"flex","justifyContent":"space-between","padding":"64px","borderTop":"2px solid #e2e8f0","borderBottom":"2px solid #e2e8f0"},responsiveStyles: {}})
},
  {
  "id": "stats-v8",
  "category": "stats",
  "variantName": "Case Study Results",
  "keywords": [
    "stats",
    "case study results"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v8.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "Case Study Results",props: {
      "title": {
            "kind": "static",
            "value": "Sample Case Study Results"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "stats-v9",
  "category": "stats",
  "variantName": "Operations Dashboard",
  "keywords": [
    "stats",
    "operations dashboard"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v9.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "Operations Dashboard",props: {
      "title": {
            "kind": "static",
            "value": "Sample Operations Dashboard"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px","padding":"64px","background":"#f1f5f9"},responsiveStyles: {}})
},
  {
  "id": "stats-v10",
  "category": "stats",
  "variantName": "Blur Cards",
  "keywords": [
    "stats",
    "blur cards"
  ],
  "thumbnailPath": "/preset-thumbnails/stats-stats-v10.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "stats",name: "Blur Cards",props: {
      "title": {
            "kind": "static",
            "value": "Sample Blur Cards"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful stats section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px","background":"#0f172a"},responsiveStyles: {}})
}
];
