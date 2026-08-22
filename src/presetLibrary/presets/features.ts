import { SectionPreset } from '../types';

export const featuresPresets: SectionPreset[] = [
  {
  "id": "features-v1",
  "category": "features",
  "variantName": "Icon Grid",
  "keywords": [
    "features",
    "icon grid"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Icon Grid",props: {
      "title": {
            "kind": "static",
            "value": "Sample Icon Grid"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v2",
  "category": "features",
  "variantName": "Analytics Grid",
  "keywords": [
    "features",
    "analytics grid"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Analytics Grid",props: {
      "title": {
            "kind": "static",
            "value": "Sample Analytics Grid"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gridTemplateRows":"repeat(2, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v3",
  "category": "features",
  "variantName": "Inbox Workflow Split",
  "keywords": [
    "features",
    "inbox workflow split"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Inbox Workflow Split",props: {
      "title": {
            "kind": "static",
            "value": "Sample Inbox Workflow Split"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v4",
  "category": "features",
  "variantName": "Product Highlights Split",
  "keywords": [
    "features",
    "product highlights split"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Product Highlights Split",props: {
      "title": {
            "kind": "static",
            "value": "Sample Product Highlights Split"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v5",
  "category": "features",
  "variantName": "Release Essentials Centered",
  "keywords": [
    "features",
    "release essentials centered"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Release Essentials Centered",props: {
      "title": {
            "kind": "static",
            "value": "Sample Release Essentials Centered"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v6",
  "category": "features",
  "variantName": "Support Overview 3 Col",
  "keywords": [
    "features",
    "support overview 3 col"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Support Overview 3 Col",props: {
      "title": {
            "kind": "static",
            "value": "Sample Support Overview 3 Col"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v7",
  "category": "features",
  "variantName": "Finance Reasons 4 Col",
  "keywords": [
    "features",
    "finance reasons 4 col"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Finance Reasons 4 Col",props: {
      "title": {
            "kind": "static",
            "value": "Sample Finance Reasons 4 Col"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v8",
  "category": "features",
  "variantName": "Blog Categories 4 Col",
  "keywords": [
    "features",
    "blog categories 4 col"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v8.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Blog Categories 4 Col",props: {
      "title": {
            "kind": "static",
            "value": "Sample Blog Categories 4 Col"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v9",
  "category": "features",
  "variantName": "Editorial Blog Stack",
  "keywords": [
    "features",
    "editorial blog stack"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v9.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Editorial Blog Stack",props: {
      "title": {
            "kind": "static",
            "value": "Sample Editorial Blog Stack"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v10",
  "category": "features",
  "variantName": "Media Checklist",
  "keywords": [
    "features",
    "media checklist"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v10.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Media Checklist",props: {
      "title": {
            "kind": "static",
            "value": "Sample Media Checklist"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v11",
  "category": "features",
  "variantName": "Process Timeline",
  "keywords": [
    "features",
    "process timeline"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v11.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Process Timeline",props: {
      "title": {
            "kind": "static",
            "value": "Sample Process Timeline"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"flex","justifyContent":"space-between","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v12",
  "category": "features",
  "variantName": "Use Case Matrix",
  "keywords": [
    "features",
    "use case matrix"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v12.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Use Case Matrix",props: {
      "title": {
            "kind": "static",
            "value": "Sample Use Case Matrix"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "features-v13",
  "category": "features",
  "variantName": "Comparison Before After",
  "keywords": [
    "features",
    "comparison before after"
  ],
  "thumbnailPath": "/preset-thumbnails/features-features-v13.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "features",name: "Comparison Before After",props: {
      "title": {
            "kind": "static",
            "value": "Sample Comparison Before After"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful features section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"48px","padding":"64px"},responsiveStyles: {}})
}
];
