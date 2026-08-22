import { SectionPreset } from '../types';

export const heroPresets: SectionPreset[] = [
  {
  "id": "hero-v1",
  "category": "hero",
  "variantName": "Centered Intro",
  "keywords": [
    "hero",
    "centered intro"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "Centered Intro",props: {
      "title": {
            "kind": "static",
            "value": "Sample Centered Intro"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","textAlign":"center","padding":"96px 24px"},responsiveStyles: {}})
},
  {
  "id": "hero-v2",
  "category": "hero",
  "variantName": "About with Image Left",
  "keywords": [
    "hero",
    "about with image left"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "About with Image Left",props: {
      "title": {
            "kind": "static",
            "value": "Sample About with Image Left"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"48px","padding":"64px","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "hero-v3",
  "category": "hero",
  "variantName": "About with Image Right",
  "keywords": [
    "hero",
    "about with image right"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "About with Image Right",props: {
      "title": {
            "kind": "static",
            "value": "Sample About with Image Right"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"48px","padding":"64px","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "hero-v4",
  "category": "hero",
  "variantName": "About Stacked",
  "keywords": [
    "hero",
    "about stacked"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "About Stacked",props: {
      "title": {
            "kind": "static",
            "value": "Sample About Stacked"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "hero-v5",
  "category": "hero",
  "variantName": "Screenshot with CTAs",
  "keywords": [
    "hero",
    "screenshot with ctas"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "Screenshot with CTAs",props: {
      "title": {
            "kind": "static",
            "value": "Sample Screenshot with CTAs"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "hero-v6",
  "category": "hero",
  "variantName": "Left Image Plus Highlights",
  "keywords": [
    "hero",
    "left image plus highlights"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "Left Image Plus Highlights",props: {
      "title": {
            "kind": "static",
            "value": "Sample Left Image Plus Highlights"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"48px","padding":"48px","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "hero-v7",
  "category": "hero",
  "variantName": "Background Image Centered",
  "keywords": [
    "hero",
    "background image centered"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "Background Image Centered",props: {
      "title": {
            "kind": "static",
            "value": "Sample Background Image Centered"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"120px 48px","color":"white","background":"#333"},responsiveStyles: {}})
},
  {
  "id": "hero-v8",
  "category": "hero",
  "variantName": "Background Image Bottom Left",
  "keywords": [
    "hero",
    "background image bottom left"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v8.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "Background Image Bottom Left",props: {
      "title": {
            "kind": "static",
            "value": "Sample Background Image Bottom Left"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"flex","flexDirection":"column","justifyContent":"flex-end","padding":"120px 48px","color":"white","background":"#333"},responsiveStyles: {}})
},
  {
  "id": "hero-v9",
  "category": "hero",
  "variantName": "Search-Focused",
  "keywords": [
    "hero",
    "search focused"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v9.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "Search-Focused",props: {
      "title": {
            "kind": "static",
            "value": "Sample Search-Focused"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"96px 24px"},responsiveStyles: {}})
},
  {
  "id": "hero-v10",
  "category": "hero",
  "variantName": "Social-Focused",
  "keywords": [
    "hero",
    "social focused"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v10.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "Social-Focused",props: {
      "title": {
            "kind": "static",
            "value": "Sample Social-Focused"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"96px 24px"},responsiveStyles: {}})
},
  {
  "id": "hero-v11",
  "category": "hero",
  "variantName": "Newsletter Welcome",
  "keywords": [
    "hero",
    "newsletter welcome"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v11.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "Newsletter Welcome",props: {
      "title": {
            "kind": "static",
            "value": "Sample Newsletter Welcome"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"96px 24px"},responsiveStyles: {}})
},
  {
  "id": "hero-v12",
  "category": "hero",
  "variantName": "Product Launch Announcement",
  "keywords": [
    "hero",
    "product launch announcement"
  ],
  "thumbnailPath": "/preset-thumbnails/hero-hero-v12.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "hero",name: "Product Launch Announcement",props: {
      "title": {
            "kind": "static",
            "value": "Sample Product Launch Announcement"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful hero section."
      }
},styles: {"display":"flex","justifyContent":"space-between","alignItems":"center","padding":"64px"},responsiveStyles: {}})
}
];
