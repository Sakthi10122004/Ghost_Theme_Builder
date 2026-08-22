import { SectionPreset } from '../types';

export const logoCloudPresets: SectionPreset[] = [
  {
  "id": "logo-cloud-v1",
  "category": "logo-cloud",
  "variantName": "5 Columns",
  "keywords": [
    "logo-cloud",
    "5 columns"
  ],
  "thumbnailPath": "/preset-thumbnails/logo-cloud-logo-cloud-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "logo-cloud",name: "5 Columns",props: {
      "title": {
            "kind": "static",
            "value": "Sample 5 Columns"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful logo-cloud section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(5, 1fr)","gap":"32px","padding":"64px","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "logo-cloud-v2",
  "category": "logo-cloud",
  "variantName": "Enterprise Proof",
  "keywords": [
    "logo-cloud",
    "enterprise proof"
  ],
  "thumbnailPath": "/preset-thumbnails/logo-cloud-logo-cloud-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "logo-cloud",name: "Enterprise Proof",props: {
      "title": {
            "kind": "static",
            "value": "Sample Enterprise Proof"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful logo-cloud section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 4fr","gap":"48px","padding":"64px","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "logo-cloud-v3",
  "category": "logo-cloud",
  "variantName": "Flexible Row",
  "keywords": [
    "logo-cloud",
    "flexible row"
  ],
  "thumbnailPath": "/preset-thumbnails/logo-cloud-logo-cloud-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "logo-cloud",name: "Flexible Row",props: {
      "title": {
            "kind": "static",
            "value": "Sample Flexible Row"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful logo-cloud section."
      }
},styles: {"display":"flex","flexWrap":"wrap","justifyContent":"center","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "logo-cloud-v4",
  "category": "logo-cloud",
  "variantName": "With Subtitle",
  "keywords": [
    "logo-cloud",
    "with subtitle"
  ],
  "thumbnailPath": "/preset-thumbnails/logo-cloud-logo-cloud-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "logo-cloud",name: "With Subtitle",props: {
      "title": {
            "kind": "static",
            "value": "Sample With Subtitle"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful logo-cloud section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "logo-cloud-v5",
  "category": "logo-cloud",
  "variantName": "Minimal",
  "keywords": [
    "logo-cloud",
    "minimal"
  ],
  "thumbnailPath": "/preset-thumbnails/logo-cloud-logo-cloud-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "logo-cloud",name: "Minimal",props: {
      "title": {
            "kind": "static",
            "value": "Sample Minimal"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful logo-cloud section."
      }
},styles: {"display":"flex","justifyContent":"space-around","padding":"48px"},responsiveStyles: {}})
},
  {
  "id": "logo-cloud-v6",
  "category": "logo-cloud",
  "variantName": "Press Mentions",
  "keywords": [
    "logo-cloud",
    "press mentions"
  ],
  "thumbnailPath": "/preset-thumbnails/logo-cloud-logo-cloud-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "logo-cloud",name: "Press Mentions",props: {
      "title": {
            "kind": "static",
            "value": "Sample Press Mentions"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful logo-cloud section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","gap":"24px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "logo-cloud-v7",
  "category": "logo-cloud",
  "variantName": "Integration Ecosystem",
  "keywords": [
    "logo-cloud",
    "integration ecosystem"
  ],
  "thumbnailPath": "/preset-thumbnails/logo-cloud-logo-cloud-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "logo-cloud",name: "Integration Ecosystem",props: {
      "title": {
            "kind": "static",
            "value": "Sample Integration Ecosystem"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful logo-cloud section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
}
];
