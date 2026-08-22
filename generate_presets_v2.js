const fs = require('fs');
const path = require('path');

// Generate SVG thumbnail on the fly as a data URI
function generateSvgDataUri(title, subtitle) {
  const svg = `<svg width="280" height="157" xmlns="http://www.w3.org/2000/svg">
  <rect width="280" height="157" fill="#f8fafc" />
  <rect width="278" height="155" x="1" y="1" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 4" rx="6" />
  <text x="50%" y="45%" font-family="system-ui, sans-serif" font-weight="600" font-size="14" fill="#334155" text-anchor="middle">${title}</text>
  <text x="50%" y="60%" font-family="system-ui, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">${subtitle}</text>
</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const definitions = {
  header: [
    { name: 'Classic Clean', props: { logo: 'Logo', nav: 'Home | About | Blog', cta: 'Subscribe' }, layout: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, styles: { padding: '24px 48px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' } },
    { name: 'Centered Minimalist', props: { logo: 'Publication Name', nav: 'Stories | Authors | Tags' }, layout: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }, styles: { padding: '32px', backgroundColor: '#fafafa' } },
    { name: 'Floating Glassmorphism', props: { logo: 'Icon', nav: 'Posts | Search' }, layout: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, styles: { padding: '16px 32px', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderRadius: '999px', margin: '24px auto', width: '90%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' } }
  ],
  hero: [
    { name: 'Big Typography Editorial', props: { heading: 'Thoughts, stories, and ideas.', form: 'Email Input ->' }, layout: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }, styles: { padding: '96px 24px', backgroundColor: '#ffffff' } },
    { name: 'Split Creator Hero', props: { col1: 'Publication Tagline & CTA', col2: 'Featured Post Cover Image' }, layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }, styles: { padding: '64px', backgroundColor: '#f8fafc' } },
    { name: 'Minimalist Search', props: { title: 'Find what you are looking for.', search: '[ Ghost SodoSearch Bar ]' }, layout: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }, styles: { padding: '80px 24px', backgroundColor: '#0f172a', color: '#ffffff' } }
  ],
  posts: [
    { name: 'Standard 3-Column Grid', props: { card1: 'Post Card', card2: 'Post Card', card3: 'Post Card' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }, styles: { padding: '48px' } },
    { name: 'Editorial 1-Column List', props: { card1: 'Wide Post Card', card2: 'Wide Post Card' }, layout: { display: 'flex', flexDirection: 'column', gap: '32px' }, styles: { padding: '48px', maxWidth: '800px', margin: '0 auto' } },
    { name: 'Headline Magazine Grid', props: { feature: 'Massive Featured Post', side: '4 Side Posts' }, layout: { display: 'grid', gridTemplateColumns: '60% 1fr', gap: '32px' }, styles: { padding: '48px' } }
  ],
  features: [
    { name: '3-Card Service Matrix', props: { col1: 'Feature 1', col2: 'Feature 2', col3: 'Feature 3' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'center' }, styles: { padding: '64px' } },
    { name: 'Alternating Zig-Zag', props: { row1: 'Image Left | Text Right', row2: 'Text Left | Image Right' }, layout: { display: 'flex', flexDirection: 'column', gap: '64px' }, styles: { padding: '64px' } },
    { name: 'Category Badges', props: { badges: 'Tech | Design | Culture | AI' }, layout: { display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }, styles: { padding: '48px' } }
  ],
  cta: [
    { name: 'Ghost Tier Pricing Table', props: { free: 'Free Tier', monthly: 'Premium $5/mo', yearly: 'VIP $50/yr' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }, styles: { padding: '64px' } },
    { name: 'Gradient Banner CTA', props: { heading: 'Join 10,000+ subscribers', form: 'Email Box' }, layout: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }, styles: { padding: '64px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', color: 'white', borderRadius: '16px', margin: '32px' } },
    { name: 'Floating Sticky Bar', props: { text: 'Enjoying the content? Subscribe!', btn: 'Subscribe' }, layout: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, styles: { padding: '16px 32px', backgroundColor: '#0f172a', color: 'white', position: 'fixed', bottom: '0', width: '100%', zIndex: '50' } }
  ],
  recommendations: [
    { name: 'Ghost Recommendations List', props: { item1: 'Publication 1', item2: 'Publication 2' }, layout: { display: 'flex', flexDirection: 'column', gap: '16px' }, styles: { padding: '48px', maxWidth: '600px', margin: '0 auto' } },
    { name: 'Resource Directory', props: { res1: 'Resource Link', res2: 'Resource Link', res3: 'Resource Link' }, layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }, styles: { padding: '48px' } },
    { name: 'Editors Pick Sidebar', props: { title: 'Editor Picks', posts: 'Post list...' }, layout: { display: 'flex', flexDirection: 'column', gap: '16px' }, styles: { padding: '32px', border: '1px solid #e2e8f0', borderRadius: '8px', maxWidth: '300px' } }
  ],
  newsletter: [
    { name: 'Simple Inline Form', props: { heading: 'Subscribe', form: 'Email Input' }, layout: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }, styles: { padding: '64px', textAlign: 'center' } },
    { name: 'Two-Column Social Proof', props: { perks: 'No spam, weekly digest', form: 'Email Input + 5k Members' }, layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }, styles: { padding: '64px', backgroundColor: '#f1f5f9' } },
    { name: 'Minimal Dark Pill', props: { form: 'Enter Email ->' }, layout: { display: 'flex', justifyContent: 'center' }, styles: { padding: '48px', backgroundColor: '#0f172a' } }
  ],
  authors: [
    { name: 'Author Grid Cards', props: { auth1: 'Author Profile', auth2: 'Author Profile' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }, styles: { padding: '48px' } },
    { name: 'Single Author Spotlight', props: { profile: 'Big Avatar + Bio + Socials' }, layout: { display: 'flex', gap: '32px', alignItems: 'center' }, styles: { padding: '64px', backgroundColor: '#fafafa', borderRadius: '12px' } },
    { name: 'Compact Avatar Row', props: { row: '(O) (O) (O) (O) 4 Contributors' }, layout: { display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }, styles: { padding: '32px' } }
  ],
  testimonials: [
    { name: 'Social Embed Wall', props: { wall: 'Masonry Tweets & Quotes' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }, styles: { padding: '64px' } },
    { name: '3-Column Quote Cards', props: { q1: 'Quote 1', q2: 'Quote 2', q3: 'Quote 3' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }, styles: { padding: '48px' } },
    { name: 'Big Single Slider', props: { quote: '"This is the best theme ever!" - John D.' }, layout: { display: 'flex', justifyContent: 'center', textAlign: 'center' }, styles: { padding: '96px 24px', fontStyle: 'italic', fontSize: '1.5rem' } }
  ],
  tags: [
    { name: 'Tag Cloud Pill Bar', props: { tags: 'Pills: Tech, Design, News' }, layout: { display: 'flex', flexWrap: 'wrap', gap: '12px' }, styles: { padding: '32px' } },
    { name: 'Visual Tag Cards', props: { card1: 'Tag Cover 1', card2: 'Tag Cover 2' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }, styles: { padding: '48px' } },
    { name: 'Split Category Columns', props: { col1: 'Top Tech Posts', col2: 'Top Design Posts' }, layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }, styles: { padding: '64px' } }
  ],
  products: [
    { name: 'E-book Showcase', props: { img: '3D Book Image', info: 'Details & Checkout' }, layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }, styles: { padding: '64px' } },
    { name: 'Digital Goods Grid', props: { prod1: 'Product Card', prod2: 'Product Card', prod3: 'Product Card' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }, styles: { padding: '48px' } },
    { name: 'Featured Resource Banner', props: { title: 'New Course Available', btn: 'Buy Now' }, layout: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, styles: { padding: '24px 48px', backgroundColor: '#e0e7ff' } }
  ],
  stats: [
    { name: '4-Column Big Numbers', props: { s1: '15k+ Subs', s2: '200+ Posts', s3: '50+ Authors', s4: '100% Free' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }, styles: { padding: '64px' } },
    { name: 'Progress Bar Badges', props: { b1: 'Milestone 1', b2: 'Milestone 2' }, layout: { display: 'flex', flexDirection: 'column', gap: '24px' }, styles: { padding: '48px', maxWidth: '600px', margin: '0 auto' } },
    { name: 'Dark Contrast Banner', props: { stats: 'Glowing Numbers' }, layout: { display: 'flex', justifyContent: 'space-around' }, styles: { padding: '64px', backgroundColor: '#020617', color: '#38bdf8' } }
  ],
  footer: [
    { name: 'Classic 4-Column Directory', props: { col1: 'Brand', col2: 'Links', col3: 'Tags', col4: 'Socials' }, layout: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }, styles: { padding: '64px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' } },
    { name: 'Compact Minimal Bar', props: { text: 'Copyright 2026', nav: 'Links' }, layout: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, styles: { padding: '24px 48px', borderTop: '1px solid #e2e8f0' } },
    { name: 'Newsletter Focused', props: { top: 'Subscribe Block', bottom: 'Legal Links' }, layout: { display: 'flex', flexDirection: 'column', gap: '48px', textAlign: 'center' }, styles: { padding: '64px', backgroundColor: '#0f172a', color: 'white' } }
  ],
  faq: [
    { name: 'Standard Accordion List', props: { q1: 'Question 1', q2: 'Question 2' }, layout: { display: 'flex', flexDirection: 'column', gap: '16px' }, styles: { padding: '64px', maxWidth: '800px', margin: '0 auto' } },
    { name: '2-Column FAQ Grid', props: { q1: 'Q1', q2: 'Q2', q3: 'Q3', q4: 'Q4' }, layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }, styles: { padding: '64px' } },
    { name: 'Minimalist Categorized', props: { cat1: 'Pricing FAQs', cat2: 'Support FAQs' }, layout: { display: 'flex', flexDirection: 'column', gap: '48px' }, styles: { padding: '48px' } }
  ],
  'logo-cloud': [
    { name: 'Trusted By 5-Column', props: { title: 'Trusted By', logos: 'Logo1 | Logo2 | Logo3 | Logo4 | Logo5' }, layout: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }, styles: { padding: '64px' } },
    { name: 'Infinite Marquee', props: { marquee: 'Scrolling Logos...' }, layout: { display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap' }, styles: { padding: '32px', backgroundColor: '#fafafa' } },
    { name: 'Centered Subtle', props: { logos: 'Faded monochrome logos' }, layout: { display: 'flex', justifyContent: 'center', gap: '48px', opacity: '0.5' }, styles: { padding: '48px' } }
  ]
};

Object.entries(definitions).forEach(([category, variants]) => {
  const presets = [];
  
  variants.forEach((variant, index) => {
    const presetId = `${category}-v${index + 1}`;
    const variantName = variant.name;
    const thumbnailUri = generateSvgDataUri(variantName.toUpperCase(), category.toUpperCase());
    
    // Create props objects dynamically based on the definition
    const propsStrings = Object.entries(variant.props).map(([k, v]) => {
      return `${k}: { kind: 'static', value: '${v}' }`;
    }).join(',\n        ');

    const presetStr = `{
    id: '${presetId}',
    category: '${category}',
    variantName: '${variantName}',
    keywords: ['${category}', '${variantName.toLowerCase()}'],
    thumbnailPath: '${thumbnailUri}',
    buildSection: () => ({
      id: \`sec-\${Date.now()}-\${Math.random().toString(36).substring(7)}\`,
      type: '${category}',
      name: '${variantName}',
      props: {
        ${propsStrings}
      },
      styles: ${JSON.stringify({ ...variant.styles, ...variant.layout })},
      responsiveStyles: {}
    })
  }`;
    presets.push(presetStr);
  });

  const fileContent = `import { SectionPreset } from '../types';

export const ${category.replace(/-([a-z])/g, g => g[1].toUpperCase())}Presets: SectionPreset[] = [
  ${presets.join(',\n  ')}
];
`;

  fs.writeFileSync(
    path.join(__dirname, 'src', 'presetLibrary', 'presets', `${category}.ts`),
    fileContent
  );
});

console.log('Successfully generated curated high-fidelity components.');
