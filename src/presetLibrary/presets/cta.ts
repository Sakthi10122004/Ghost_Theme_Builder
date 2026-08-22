import { SectionPreset } from '../types';

export const ctaPresets: SectionPreset[] = [
  {
  "id": "cta-v1",
  "category": "cta",
  "variantName": "Dual Buttons",
  "keywords": [
    "cta",
    "dual buttons"
  ],
  "thumbnailPath": "/preset-thumbnails/cta-cta-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "cta",name: "Dual Buttons",props: {
      "title": {
            "kind": "static",
            "value": "Sample Dual Buttons"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful cta section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"64px","textAlign":"center"},responsiveStyles: {}})
},
  {
  "id": "cta-v2",
  "category": "cta",
  "variantName": "Social Follow",
  "keywords": [
    "cta",
    "social follow"
  ],
  "thumbnailPath": "/preset-thumbnails/cta-cta-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "cta",name: "Social Follow",props: {
      "title": {
            "kind": "static",
            "value": "Sample Social Follow"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful cta section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"64px","textAlign":"center"},responsiveStyles: {}})
},
  {
  "id": "cta-v3",
  "category": "cta",
  "variantName": "Search",
  "keywords": [
    "cta",
    "search"
  ],
  "thumbnailPath": "/preset-thumbnails/cta-cta-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "cta",name: "Search",props: {
      "title": {
            "kind": "static",
            "value": "Sample Search"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful cta section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"64px","textAlign":"center"},responsiveStyles: {}})
},
  {
  "id": "cta-v4",
  "category": "cta",
  "variantName": "Split Dark",
  "keywords": [
    "cta",
    "split dark"
  ],
  "thumbnailPath": "/preset-thumbnails/cta-cta-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "cta",name: "Split Dark",props: {
      "title": {
            "kind": "static",
            "value": "Sample Split Dark"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful cta section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","padding":"64px","background":"#111827","color":"white"},responsiveStyles: {}})
},
  {
  "id": "cta-v5",
  "category": "cta",
  "variantName": "Split Right",
  "keywords": [
    "cta",
    "split right"
  ],
  "thumbnailPath": "/preset-thumbnails/cta-cta-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "cta",name: "Split Right",props: {
      "title": {
            "kind": "static",
            "value": "Sample Split Right"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful cta section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"48px","padding":"64px","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "cta-v6",
  "category": "cta",
  "variantName": "Locations Grid",
  "keywords": [
    "cta",
    "locations grid"
  ],
  "thumbnailPath": "/preset-thumbnails/cta-cta-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "cta",name: "Locations Grid",props: {
      "title": {
            "kind": "static",
            "value": "Sample Locations Grid"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful cta section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(auto-fit, minmax(200px, 1fr))","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "cta-v7",
  "category": "cta",
  "variantName": "Contact Options",
  "keywords": [
    "cta",
    "contact options"
  ],
  "thumbnailPath": "/preset-thumbnails/cta-cta-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "cta",name: "Contact Options",props: {
      "title": {
            "kind": "static",
            "value": "Sample Contact Options"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful cta section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "cta-v8",
  "category": "cta",
  "variantName": "Next Best Actions",
  "keywords": [
    "cta",
    "next best actions"
  ],
  "thumbnailPath": "/preset-thumbnails/cta-cta-v8.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "cta",name: "Next Best Actions",props: {
      "title": {
            "kind": "static",
            "value": "Sample Next Best Actions"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful cta section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
}
];
