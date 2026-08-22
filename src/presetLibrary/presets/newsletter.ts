import { SectionPreset } from '../types';

export const newsletterPresets: SectionPreset[] = [
  {
  "id": "newsletter-v1",
  "category": "newsletter",
  "variantName": "Lead Capture",
  "keywords": [
    "newsletter",
    "lead capture"
  ],
  "thumbnailPath": "/preset-thumbnails/newsletter-newsletter-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "newsletter",name: "Lead Capture",props: {
      "form": {
            "kind": "portal",
            "action": "members-form=signup",
            "label": "Subscribe"
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "newsletter-v2",
  "category": "newsletter",
  "variantName": "Centered CTA",
  "keywords": [
    "newsletter",
    "centered cta"
  ],
  "thumbnailPath": "/preset-thumbnails/newsletter-newsletter-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "newsletter",name: "Centered CTA",props: {
      "form": {
            "kind": "portal",
            "action": "members-form=signup",
            "label": "Subscribe"
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "newsletter-v3",
  "category": "newsletter",
  "variantName": "Email Plus Checklist",
  "keywords": [
    "newsletter",
    "email plus checklist"
  ],
  "thumbnailPath": "/preset-thumbnails/newsletter-newsletter-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "newsletter",name: "Email Plus Checklist",props: {
      "form": {
            "kind": "portal",
            "action": "members-form=signup",
            "label": "Subscribe"
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","gap":"24px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "newsletter-v4",
  "category": "newsletter",
  "variantName": "Primary Filled",
  "keywords": [
    "newsletter",
    "primary filled"
  ],
  "thumbnailPath": "/preset-thumbnails/newsletter-newsletter-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "newsletter",name: "Primary Filled",props: {
      "form": {
            "kind": "portal",
            "action": "members-form=signup",
            "label": "Subscribe"
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"64px","background":"#3b82f6","color":"white"},responsiveStyles: {}})
},
  {
  "id": "newsletter-v5",
  "category": "newsletter",
  "variantName": "Split with Image",
  "keywords": [
    "newsletter",
    "split with image"
  ],
  "thumbnailPath": "/preset-thumbnails/newsletter-newsletter-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "newsletter",name: "Split with Image",props: {
      "form": {
            "kind": "portal",
            "action": "members-form=signup",
            "label": "Subscribe"
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"48px","padding":"64px"},responsiveStyles: {}})
},
  {
  "id": "newsletter-v6",
  "category": "newsletter",
  "variantName": "Background Image",
  "keywords": [
    "newsletter",
    "background image"
  ],
  "thumbnailPath": "/preset-thumbnails/newsletter-newsletter-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "newsletter",name: "Background Image",props: {
      "form": {
            "kind": "portal",
            "action": "members-form=signup",
            "label": "Subscribe"
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center","padding":"120px 48px","background":"#333","color":"white"},responsiveStyles: {}})
}
];
