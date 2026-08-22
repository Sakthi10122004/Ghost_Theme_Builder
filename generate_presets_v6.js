const fs = require('fs');
const path = require('path');

const publicThumbnailsDir = path.join(__dirname, 'public', 'preset-thumbnails');
if (!fs.existsSync(publicThumbnailsDir)) {
  fs.mkdirSync(publicThumbnailsDir, { recursive: true });
}

function writeSvgThumbnail(category, variantId, title, subtitle, styles) {
  let boxes = '';
  const isGrid = styles && styles.display === 'grid';
  const isCol = styles && styles.flexDirection === 'column';
  
  if (isGrid && styles.gridTemplateColumns) {
    let cols = 2;
    if (styles.gridTemplateColumns.includes('3')) cols = 3;
    if (styles.gridTemplateColumns.includes('4')) cols = 4;
    if (styles.gridTemplateColumns.includes('5')) cols = 5;
    
    const boxWidth = (240 / cols) - 10;
    for (let i=0; i<cols; i++) {
      boxes += `<rect x="${20 + i*(boxWidth+10)}" y="80" width="${boxWidth}" height="40" fill="#cbd5e1" rx="4" />`;
    }
  } else if (isCol) {
    boxes = `<rect x="40" y="80" width="200" height="15" fill="#cbd5e1" rx="4" />
             <rect x="40" y="105" width="200" height="15" fill="#cbd5e1" rx="4" />
             <rect x="40" y="130" width="200" height="15" fill="#cbd5e1" rx="4" />`;
  } else {
    // Default flex row or unknown
    boxes = `<rect x="40" y="80" width="90" height="40" fill="#cbd5e1" rx="4" />
             <rect x="150" y="80" width="90" height="40" fill="#cbd5e1" rx="4" />`;
  }

  const svg = `<svg width="280" height="157" xmlns="http://www.w3.org/2000/svg">
  <rect width="280" height="157" fill="#f8fafc" />
  <rect width="278" height="155" x="1" y="1" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" rx="6" />
  <text x="50%" y="30%" font-family="system-ui, sans-serif" font-weight="600" font-size="14" fill="#1e293b" text-anchor="middle">${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>
  <text x="50%" y="45%" font-family="system-ui, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">${subtitle}</text>
  ${boxes}
</svg>`;
  
  const fileName = `${category}-${variantId}.svg`;
  fs.writeFileSync(path.join(publicThumbnailsDir, fileName), svg);
  return `/preset-thumbnails/${fileName}`;
}

const definitions = {
  header: [
    { name: 'Standard', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, props: { logo: 'site.logo', nav: 'navigation', search: 'icon', signin: 'data-portal="signin"', signup: 'data-portal="signup"' } },
    { name: 'Logo Left', styles: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, props: { logo: 'site.logo', nav: 'navigation', search: 'icon', signin: 'data-portal="signin"', signup: 'data-portal="signup"' } },
    { name: 'Centered Logo', styles: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }, props: { nav: 'navigation', logo: 'site.logo', actions: 'search | signin | signup' } },
    { name: 'Minimal', styles: { display: 'flex', justifyContent: 'space-between' }, props: { nav: 'navigation', logo: 'site.logo', search: 'icon' } },
    { name: 'Subscribe Focus', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, props: { logo: 'site.logo', signup: 'data-portal="signup"', nav: 'navigation' } },
    { name: 'Creator Minimal', styles: { display: 'flex', justifyContent: 'space-between' }, props: { nav: 'navigation', logo: 'site.logo', signup: 'data-portal="signup"' } }
  ],
  footer: [
    { name: 'Standard', styles: { display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }, props: { logo: 'site.logo', nav: 'navigation secondary', copyright: 'site.title' } },
    { name: 'Centered', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, props: { logo: 'site.logo', nav: 'navigation secondary', copyright: 'site.title' } },
    { name: 'Centered Minimal', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, props: { logo: 'site.logo', copyright: 'site.title' } },
    { name: 'Stacked Full', styles: { display: 'grid', gridTemplateRows: 'auto auto' }, props: { top: 'logo + site.description | nav', bottom: 'copyright | social' } },
    { name: 'Stacked Social', styles: { display: 'flex', justifyContent: 'space-between' }, props: { copyright: 'site.title', social: 'site.facebook | site.twitter' } }
  ],
  posts: [
    { name: 'Classic List', styles: { display: 'flex', flexDirection: 'column', gap: '32px' }, dynamic: { category: 'posts', source: 'routes', limit: 10, order: 'published_at desc', layoutStyle: 'list' } },
    { name: 'Grid with Sidebar', styles: { display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '48px' }, dynamic: { category: 'posts', source: 'routes', limit: 12, order: 'published_at desc', layoutStyle: 'grid-sidebar' } },
    { name: 'Clean Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }, dynamic: { category: 'posts', source: 'routes', limit: 12, order: 'published_at desc', layoutStyle: 'grid' } },
    { name: 'Thumbnail Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }, dynamic: { category: 'posts', source: 'routes', limit: 15, order: 'published_at desc', layoutStyle: 'dense-grid' } },
    { name: 'Magazine Split', styles: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }, dynamic: { category: 'posts', source: 'routes', limit: 6, order: 'published_at desc', layoutStyle: 'split' } },
    { name: 'Magazine 3-Column Feature', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }, dynamic: { category: 'posts', source: 'routes', limit: 4, order: 'published_at desc', layoutStyle: 'mixed' } },
    { name: 'Full-Bleed Feature', styles: { display: 'flex', flexDirection: 'column' }, dynamic: { category: 'posts', source: 'featured', limit: 3, order: 'published_at desc', layoutStyle: 'feature' } },
    { name: 'List Plus Subscribe Card', styles: { display: 'grid', gridTemplateColumns: '2fr 1fr' }, dynamic: { category: 'posts', source: 'routes', limit: 5, order: 'published_at desc', layoutStyle: 'list' } }
  ],
  hero: [
    { name: 'Centered Intro', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '96px 24px' } },
    { name: 'About with Image Left', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px', alignItems: 'center' } },
    { name: 'About with Image Right', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px', alignItems: 'center' } },
    { name: 'About Stacked', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px' } },
    { name: 'Screenshot with CTAs', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', padding: '64px' } },
    { name: 'Left Image Plus Highlights', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '48px', alignItems: 'center' } },
    { name: 'Background Image Centered', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 48px', color: 'white', background: '#333' } },
    { name: 'Background Image Bottom Left', styles: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 48px', color: 'white', background: '#333' } },
    { name: 'Search-Focused', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '96px 24px' } },
    { name: 'Social-Focused', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '96px 24px' } },
    { name: 'Newsletter Welcome', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '96px 24px' } },
    { name: 'Product Launch Announcement', styles: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '64px' } }
  ],
  features: [
    { name: 'Icon Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Analytics Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Inbox Workflow Split', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px' } },
    { name: 'Product Highlights Split', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px' } },
    { name: 'Release Essentials Centered', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', padding: '64px' } },
    { name: 'Support Overview 3 Col', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Finance Reasons 4 Col', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '64px' } },
    { name: 'Blog Categories 4 Col', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '64px' } },
    { name: 'Editorial Blog Stack', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Media Checklist', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '64px' } },
    { name: 'Process Timeline', styles: { display: 'flex', justifyContent: 'space-between', padding: '64px' } },
    { name: 'Use Case Matrix', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Comparison Before After', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px' } }
  ],
  cta: [
    { name: 'Dual Buttons', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px', textAlign: 'center' } },
    { name: 'Social Follow', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px', textAlign: 'center' } },
    { name: 'Search', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px', textAlign: 'center' } },
    { name: 'Split Dark', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '64px', background: '#111827', color: 'white' } },
    { name: 'Split Right', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px', alignItems: 'center' } },
    { name: 'Locations Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', padding: '64px' } },
    { name: 'Contact Options', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Next Best Actions', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } }
  ],
  newsletter: [
    { name: 'Lead Capture', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px' }, props: { form: 'data-members-form="signup"' } },
    { name: 'Centered CTA', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px' }, props: { form: 'data-members-form="signup"' } },
    { name: 'Email Plus Checklist', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '64px' }, props: { form: 'data-members-form="signup"' } },
    { name: 'Primary Filled', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px', background: '#3b82f6', color: 'white' }, props: { form: 'data-members-form="signup"' } },
    { name: 'Split with Image', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px' }, props: { form: 'data-members-form="signup"' } },
    { name: 'Background Image', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 48px', background: '#333', color: 'white' }, props: { form: 'data-members-form="signup"' } }
  ],
  authors: [
    { name: 'Editorial Directory', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' }, dynamic: { category: 'authors', source: 'routes', limit: 6, order: 'name asc', layoutStyle: 'grid' } },
    { name: 'Spaced Profiles', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', padding: '64px' }, dynamic: { category: 'authors', source: 'routes', limit: 6, order: 'name asc', layoutStyle: 'grid' } },
    { name: 'Compact Contributors', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '48px' }, dynamic: { category: 'authors', source: 'routes', limit: 12, order: 'name asc', layoutStyle: 'compact-grid' } },
    { name: 'Magazine Row', styles: { display: 'flex', overflowX: 'auto', gap: '16px', padding: '32px' }, dynamic: { category: 'authors', source: 'routes', limit: 10, order: 'name asc', layoutStyle: 'row' } },
    { name: 'Filled Magazine Row', styles: { display: 'flex', overflowX: 'auto', gap: '16px', padding: '32px', background: '#f1f5f9' }, dynamic: { category: 'authors', source: 'routes', limit: 10, order: 'name asc', layoutStyle: 'row' } },
    { name: 'Alternating Profiles', styles: { display: 'flex', flexDirection: 'column', gap: '48px', padding: '64px' }, dynamic: { category: 'authors', source: 'routes', limit: 4, order: 'name asc', layoutStyle: 'alternating' } },
    { name: 'Contributor Directory', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '64px' }, dynamic: { category: 'authors', source: 'routes', limit: 10, order: 'name asc', layoutStyle: 'directory' } },
    { name: 'Inline Signatures', styles: { display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '32px' }, dynamic: { category: 'authors', source: 'routes', limit: 20, order: 'name asc', layoutStyle: 'inline' } },
    { name: 'Filled Inline Signatures', styles: { display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '32px' }, dynamic: { category: 'authors', source: 'routes', limit: 20, order: 'name asc', layoutStyle: 'chips' } },
    { name: 'Leadership Team', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '64px' }, dynamic: { category: 'authors', source: 'custom', limit: 4, order: 'name asc', layoutStyle: 'cards' } },
    { name: 'Classic Filled Cards', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px', background: '#f8fafc' }, dynamic: { category: 'authors', source: 'routes', limit: 6, order: 'name asc', layoutStyle: 'cards' } },
    { name: 'Classic Contrast Cards', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' }, dynamic: { category: 'authors', source: 'routes', limit: 6, order: 'name asc', layoutStyle: 'contrast-cards' } }
  ],
  testimonials: [
    { name: "Editor's Note", styles: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', padding: '64px', alignItems: 'center' } },
    { name: 'Spotlight', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '96px', textAlign: 'center', fontStyle: 'italic', fontSize: '1.5rem' } },
    { name: 'Ratings', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Split with Ratings', styles: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', padding: '64px' } },
    { name: 'Executive Quotes', styles: { display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '48px', padding: '64px' } },
    { name: 'Community Voices', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '64px' } }
  ],
  stats: [
    { name: 'At a Glance', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '64px', textAlign: 'center' } },
    { name: 'Headline Plus Metrics', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', padding: '64px', textAlign: 'center' } },
    { name: 'Proof Points', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '48px', textAlign: 'center' } },
    { name: 'Bordered Cards', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Steps 2x2', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '64px' } },
    { name: 'Headline-less Minimal Row', styles: { display: 'flex', justifyContent: 'space-around', padding: '48px' } },
    { name: 'Editorial Impact', styles: { display: 'flex', justifyContent: 'space-between', padding: '64px', borderTop: '2px solid #e2e8f0', borderBottom: '2px solid #e2e8f0' } },
    { name: 'Case Study Results', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', padding: '64px' } },
    { name: 'Operations Dashboard', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '64px', background: '#f1f5f9' } },
    { name: 'Blur Cards', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px', background: '#0f172a' } }
  ],
  'logo-cloud': [
    { name: '5 Columns', styles: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '32px', padding: '64px', alignItems: 'center' } },
    { name: 'Enterprise Proof', styles: { display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '48px', padding: '64px', alignItems: 'center' } },
    { name: 'Flexible Row', styles: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px', padding: '64px' } },
    { name: 'With Subtitle', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', padding: '64px' } },
    { name: 'Minimal', styles: { display: 'flex', justifyContent: 'space-around', padding: '48px' } },
    { name: 'Press Mentions', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '64px' } },
    { name: 'Integration Ecosystem', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', padding: '64px' } }
  ],
  recommendations: [
    { name: 'List with Favicons', styles: { display: 'flex', flexDirection: 'column' }, dynamic: { category: 'recommendations', source: 'site-recommendations', limit: 10, order: 'published_at desc', layoutStyle: 'list-favicons' } },
    { name: 'Card Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }, dynamic: { category: 'recommendations', source: 'site-recommendations', limit: 6, order: 'published_at desc', layoutStyle: 'grid' } },
    { name: 'Compact Row', styles: { display: 'flex', overflowX: 'auto' }, dynamic: { category: 'recommendations', source: 'site-recommendations', limit: 10, order: 'published_at desc', layoutStyle: 'compact' } },
    { name: 'Featured Single', styles: { display: 'flex', flexDirection: 'column' }, dynamic: { category: 'recommendations', source: 'site-recommendations', limit: 1, order: 'published_at desc', layoutStyle: 'featured' } },
    { name: 'Minimal Text List', styles: { display: 'flex', flexDirection: 'column' }, dynamic: { category: 'recommendations', source: 'site-recommendations', limit: 10, order: 'published_at desc', layoutStyle: 'minimal' } },
    { name: 'Sidebar Widget', styles: { display: 'flex', flexDirection: 'column' }, dynamic: { category: 'recommendations', source: 'site-recommendations', limit: 5, order: 'published_at desc', layoutStyle: 'sidebar' } },
    { name: 'Modal Trigger Button', styles: { display: 'flex', justifyContent: 'center' }, props: { button: 'data-portal="recommendations"' } },
    { name: 'Two-Column Grid', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr' }, dynamic: { category: 'recommendations', source: 'site-recommendations', limit: 6, order: 'published_at desc', layoutStyle: 'grid-2' } },
    { name: 'With Header + View All', styles: { display: 'flex', flexDirection: 'column' }, props: { button: 'data-portal="recommendations"' }, dynamic: { category: 'recommendations', source: 'site-recommendations', limit: 4, order: 'published_at desc', layoutStyle: 'grid-2' } },
    { name: 'Grid with Descriptions Truncated', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }, dynamic: { category: 'recommendations', source: 'site-recommendations', limit: 9, order: 'published_at desc', layoutStyle: 'grid-truncated' } }
  ],
  tags: [
    { name: 'Tag Cloud', styles: { display: 'flex', flexWrap: 'wrap' }, dynamic: { category: 'tags', source: 'routes', limit: 20, order: 'count.posts desc', layoutStyle: 'cloud' } },
    { name: 'Tag Grid with Post Count', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }, dynamic: { category: 'tags', source: 'routes', limit: 6, order: 'count.posts desc', layoutStyle: 'grid' } },
    { name: 'Tag Header for Archive', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, dynamic: { category: 'tags', source: 'routes', limit: 1, order: 'count.posts desc', layoutStyle: 'header' } },
    { name: 'Tag Pills Row', styles: { display: 'flex', overflowX: 'auto' }, dynamic: { category: 'tags', source: 'routes', limit: 10, order: 'count.posts desc', layoutStyle: 'pills' } },
    { name: 'Tag List with Featured Post', styles: { display: 'grid', gridTemplateColumns: '1fr 2fr' }, dynamic: { category: 'tags', source: 'routes', limit: 5, order: 'count.posts desc', layoutStyle: 'list-featured' } },
    { name: 'Category Nav Bar', styles: { display: 'flex', justifyContent: 'center' }, dynamic: { category: 'tags', source: 'routes', limit: 5, order: 'count.posts desc', layoutStyle: 'nav' } },
    { name: 'Tag Grid with Cover Images', styles: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }, dynamic: { category: 'tags', source: 'routes', limit: 4, order: 'count.posts desc', layoutStyle: 'grid-cover' } },
    { name: 'Popular Tags Sidebar', styles: { display: 'flex', flexDirection: 'column' }, dynamic: { category: 'tags', source: 'routes', limit: 5, order: 'count.posts desc', layoutStyle: 'sidebar' } },
    { name: 'Tag Filter + Post Grid Combined', styles: { display: 'flex', flexDirection: 'column' }, dynamic: { category: 'tags', source: 'routes', limit: 10, order: 'count.posts desc', layoutStyle: 'filter-grid' } },
    { name: 'Minimal Tag List', styles: { display: 'flex', flexDirection: 'column' }, dynamic: { category: 'tags', source: 'routes', limit: 10, order: 'count.posts desc', layoutStyle: 'minimal' } }
  ],
  products: [
    { name: 'Pricing Tiers 3-Column', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' } },
    { name: 'Single Plan Highlight', styles: { display: 'flex', justifyContent: 'center' } },
    { name: 'Monthly Yearly Toggle', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
    { name: 'Feature Comparison', styles: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr' } },
    { name: 'Membership Benefits Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' } },
    { name: 'Free vs Paid Callout', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr' } }
  ],
  faq: [
    { name: 'Accordion', styles: { display: 'flex', flexDirection: 'column' } },
    { name: 'Two-Column', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr' } },
    { name: 'Searchable', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
    { name: 'Grid-of-Cards', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' } },
    { name: 'Categorized-Tabs', styles: { display: 'flex', flexDirection: 'column' } },
    { name: 'Minimalist List', styles: { display: 'flex', flexDirection: 'column' } },
    { name: 'Split FAQ and CTA', styles: { display: 'grid', gridTemplateColumns: '2fr 1fr' } },
    { name: 'Dark Mode FAQ', styles: { display: 'flex', flexDirection: 'column', background: '#0f172a', color: 'white' } },
    { name: 'FAQ and Contact Form', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr' } },
    { name: 'Single Card Focus', styles: { display: 'flex', justifyContent: 'center' } }
  ]
};

Object.entries(definitions).forEach(([category, variants]) => {
  const presets = [];
  
  variants.forEach((variant, index) => {
    const presetId = category + '-v' + (index + 1);
    const variantName = variant.name;
    const thumbnailUri = writeSvgThumbnail(category, presetId, variantName.toUpperCase(), category.toUpperCase(), variant.styles);
    
    // Assign generic realistic props for display if Ghost-dynamic isn't used.
    let propsObj = {
      title: { kind: 'static', value: 'Sample ' + variantName },
      description: { kind: 'static', value: 'This is a beautiful ' + category + ' section.' }
    };
      
    // Inject specific props (like data-portal or navigation) if defined in the catalog
    if (variant.props) {
      propsObj = {}; // override the generic props
      Object.entries(variant.props).forEach(([k, v]) => {
        if (v === 'navigation') {
          propsObj[k] = { kind: 'navigation', variant: 'primary' };
        } else if (v === 'navigation secondary') {
          propsObj[k] = { kind: 'navigation', variant: 'secondary' };
        } else if (v.includes('site.')) {
          const field = v.replace('site.', '');
          propsObj[k] = { kind: 'binding', source: 'site', field: field };
        } else if (v.includes('data-portal') || v.includes('data-members-form')) {
          const isForm = v.includes('members-form');
          const match = v.match(/="([^"]+)"/);
          const action = match ? (isForm ? 'members-form=' + match[1] : match[1]) : 'unknown';
          const label = k.includes('signin') ? 'Sign In' : (k.includes('button') ? 'View' : 'Subscribe');
          propsObj[k] = { kind: 'portal', action: action, label: label };
        } else {
          propsObj[k] = { kind: 'static', value: v };
        }
      });
    }

    let dynamicConfigObj = variant.dynamic ? { category: variant.dynamic.category, source: variant.dynamic.source, limit: variant.dynamic.limit, order: variant.dynamic.order, layoutStyle: variant.dynamic.layoutStyle } : undefined;
    
    if (variant.dynamic && !variant.props) {
      propsObj = {
        dynamicDataTarget: { kind: 'binding', source: 'site', field: 'title' } // fallback generic binding if no props specifically requested
      };
    }

    const presetObj = {
      id: presetId,
      category: category,
      variantName: variantName,
      keywords: [category, variantName.toLowerCase().replace(/[^a-z0-9]/g, ' ')],
      thumbnailPath: thumbnailUri,
      buildSection: '__FUNCTION_PLACEHOLDER__'
    };

    let presetStr = JSON.stringify(presetObj, null, 2);

    // We build the function string
    const functionStr = "() => ({" + 
      "id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`," + 
      "type: " + JSON.stringify(category) + "," + 
      "name: " + JSON.stringify(variantName) + "," + 
      "props: " + JSON.stringify(propsObj, null, 6) + "," + 
      (dynamicConfigObj ? "ghostDynamic: " + JSON.stringify(dynamicConfigObj, null, 6) + "," : "") + 
      "styles: " + JSON.stringify(variant.styles || {}) + "," + 
      "responsiveStyles: {}" + 
    "})";

    presetStr = presetStr.replace('"__FUNCTION_PLACEHOLDER__"', functionStr);
    presets.push(presetStr);
  });

  const fileContent = "import { SectionPreset } from '../types';\n\nexport const " + 
                      category.replace(/-([a-z])/g, g => g[1].toUpperCase()) + 
                      "Presets: SectionPreset[] = [\n  " + 
                      presets.join(',\n  ') + 
                      "\n];\n";

  fs.writeFileSync(
    path.join(__dirname, 'src', 'presetLibrary', 'presets', category + '.ts'),
    fileContent
  );
});

console.log('Successfully generated v6 with accurate Legacy variants, Option A SVGs, and Portal bindings.');
