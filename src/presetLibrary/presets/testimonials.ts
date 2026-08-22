import { SectionPreset } from '../types';

export const testimonialsPresets: SectionPreset[] = [
  {
  "id": "testimonials-v1",
  "category": "testimonials",
  "variantName": "Editor's Note",
  "keywords": [
    "testimonials",
    "editor s note"
  ],
  "thumbnailPath": "/preset-thumbnails/testimonials-testimonials-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "testimonials",name: "Editor's Note",props: {
      "title": {
            "kind": "static",
            "value": "Sample Editor's Note"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful testimonials section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 2fr","gap":"48px","padding":"64px","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "testimonials-v2",
  "category": "testimonials",
  "variantName": "Spotlight",
  "keywords": [
    "testimonials",
    "spotlight"
  ],
  "thumbnailPath": "/preset-thumbnails/testimonials-testimonials-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "testimonials",name: "Spotlight",props: {
      "title": {
            "kind": "static",
            "value": "Sample Spotlight"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful testimonials section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"96px","textAlign":"center","fontStyle":"italic","fontSize":"1.5rem"},responsiveStyles: {}})
},
  {
  "id": "testimonials-v3",
  "category": "testimonials",
  "variantName": "Ratings",
  "keywords": [
    "testimonials",
    "ratings"
  ],
  "thumbnailPath": "/preset-thumbnails/testimonials-testimonials-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "testimonials",name: "Ratings",props: {
      "title": {
            "kind": "static",
            "value": "Sample Ratings"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful testimonials section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)","gap":"32px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "testimonials-v4",
  "category": "testimonials",
  "variantName": "Split with Ratings",
  "keywords": [
    "testimonials",
    "split with ratings"
  ],
  "thumbnailPath": "/preset-thumbnails/testimonials-testimonials-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "testimonials",name: "Split with Ratings",props: {
      "title": {
            "kind": "static",
            "value": "Sample Split with Ratings"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful testimonials section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 2fr","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "testimonials-v5",
  "category": "testimonials",
  "variantName": "Executive Quotes",
  "keywords": [
    "testimonials",
    "executive quotes"
  ],
  "thumbnailPath": "/preset-thumbnails/testimonials-testimonials-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "testimonials",name: "Executive Quotes",props: {
      "title": {
            "kind": "static",
            "value": "Sample Executive Quotes"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful testimonials section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 3fr","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "testimonials-v6",
  "category": "testimonials",
  "variantName": "Community Voices",
  "keywords": [
    "testimonials",
    "community voices"
  ],
  "thumbnailPath": "/preset-thumbnails/testimonials-testimonials-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "testimonials",name: "Community Voices",props: {
      "title": {
            "kind": "static",
            "value": "Sample Community Voices"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful testimonials section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"32px","padding":"64px"},responsiveStyles: {}})
}
];
