const fs = require('fs');
const path = require('path');

// Generate SVG thumbnail on the fly as a data URI
function generateSvgDataUri(title, subtitle) {
  const svg = `<svg width="280" height="157" xmlns="http://www.w3.org/2000/svg">
  <rect width="280" height="157" fill="#f8fafc" />
  <rect width="278" height="155" x="1" y="1" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" rx="6" />
  <text x="50%" y="45%" font-family="system-ui, sans-serif" font-weight="600" font-size="14" fill="#1e293b" text-anchor="middle">${title}</text>
  <text x="50%" y="60%" font-family="system-ui, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">${subtitle}</text>
</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const definitions = {
  header: [
    { name: 'Standard', styles: { display: 'flex', justifyContent: 'space-between' } },
    { name: 'Logo Left', styles: { display: 'flex', justifyContent: 'flex-start', gap: '48px' } },
    { name: 'Centered Logo', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
    { name: 'Subscribe Focus', styles: { display: 'flex', justifyContent: 'space-between' } },
    { name: 'Creator Minimal', styles: { display: 'flex', justifyContent: 'space-between' } },
    { name: 'Search-First', styles: { display: 'flex', justifyContent: 'flex-start', gap: '32px' } },
    { name: 'Mega Menu', styles: { display: 'flex', justifyContent: 'space-between' } },
    { name: 'Transparent Overlay', styles: { display: 'flex', position: 'absolute', top: 0, width: '100%', background: 'transparent' } },
    { name: 'Announcement Bar Standard', styles: { display: 'flex', flexDirection: 'column' } },
    { name: 'Split Nav', styles: { display: 'flex', justifyContent: 'center', gap: '48px' } },
    { name: 'Dark Standard', styles: { display: 'flex', justifyContent: 'space-between', backgroundColor: '#000', color: '#fff' } },
    { name: 'Icon Nav', styles: { display: 'flex', justifyContent: 'space-between' } }
  ],
  footer: [
    { name: 'Standard', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' } },
    { name: 'Centered Minimal', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' } },
    { name: 'Stacked Full', styles: { display: 'flex', flexDirection: 'column', gap: '32px' } },
    { name: 'Stacked Social', styles: { display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' } },
    { name: 'Newsletter CTA', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' } },
    { name: 'Sitemap Style', styles: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px' } },
    { name: 'Dark Contrast', styles: { backgroundColor: '#111827', color: '#f9fafb', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' } },
    { name: 'Logo Cloud Footer', styles: { display: 'flex', flexDirection: 'column', gap: '48px' } },
    { name: 'Contact-Forward', styles: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr' } },
    { name: 'Minimal Legal Bar', styles: { display: 'flex', justifyContent: 'space-between' } }
  ],
  hero: [
    { name: 'Classic Centered', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '96px 24px' } },
    { name: 'Split Image Right', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '48px', padding: '64px' } },
    { name: 'Full-Bleed Background Image', styles: { display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 48px', color: 'white', background: '#333' } },
    { name: 'Video Background', styles: { display: 'flex', padding: '120px 48px', color: 'white', background: '#000' } },
    { name: 'Stat-Forward', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '80px' } },
    { name: 'Search-Bar Hero', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', padding: '96px' } },
    { name: 'Two-CTA Split', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '80px' } },
    { name: 'Trust-Bar Hero', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', padding: '96px' } },
    { name: 'Latest-Post Hero', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px' }, dynamic: { category: 'posts', source: 'featured', limit: 1, order: 'published_at desc', layoutStyle: 'hero' } },
    { name: 'Newsletter Hero', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '96px' } },
    { name: 'Grid Background Hero', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '96px', background: 'radial-gradient(circle, #eee 1px, transparent 1px)' } },
    { name: 'Asymmetric Offset', styles: { display: 'flex', position: 'relative', padding: '96px' } }
  ],
  posts: [
    { name: 'Classic List', styles: { display: 'flex', flexDirection: 'column', gap: '32px' }, dynamic: { category: 'posts', source: 'routes', limit: 5, order: 'published_at desc', layoutStyle: 'list' } },
    { name: 'Grid 3-Column', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }, dynamic: { category: 'posts', source: 'routes', limit: 6, order: 'published_at desc', layoutStyle: 'grid' } },
    { name: 'Grid 3-1-3 Featured', styles: { display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '24px' }, dynamic: { category: 'posts', source: 'routes', limit: 7, order: 'published_at desc', layoutStyle: 'mixed' } },
    { name: 'Magazine Mixed', styles: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }, dynamic: { category: 'posts', source: 'routes', limit: 5, order: 'published_at desc', layoutStyle: 'magazine' } },
    { name: 'Masonry', styles: { columnCount: 3, columnGap: '24px' }, dynamic: { category: 'posts', source: 'routes', limit: 9, order: 'published_at desc', layoutStyle: 'masonry' } },
    { name: 'Minimal Text List', styles: { display: 'flex', flexDirection: 'column', gap: '16px' }, dynamic: { category: 'posts', source: 'routes', limit: 10, order: 'published_at desc', layoutStyle: 'text-list' } },
    { name: 'Carousel Slider', styles: { display: 'flex', overflowX: 'auto', gap: '24px' }, dynamic: { category: 'posts', source: 'routes', limit: 6, order: 'published_at desc', layoutStyle: 'carousel' } },
    { name: 'Category Tabs', styles: { display: 'flex', flexDirection: 'column', gap: '24px' }, dynamic: { category: 'posts', source: 'routes', limit: 6, order: 'published_at desc', layoutStyle: 'tabs' } },
    { name: 'Sidebar Layout', styles: { display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '48px' }, dynamic: { category: 'posts', source: 'routes', limit: 5, order: 'published_at desc', layoutStyle: 'sidebar' } },
    { name: 'Author-Grouped', styles: { display: 'flex', flexDirection: 'column', gap: '48px' }, dynamic: { category: 'posts', source: 'routes', limit: 6, order: 'published_at desc', layoutStyle: 'grouped' } },
    { name: 'Timeline', styles: { display: 'flex', flexDirection: 'column', gap: '32px', paddingLeft: '24px', borderLeft: '2px solid #e2e8f0' }, dynamic: { category: 'posts', source: 'routes', limit: 5, order: 'published_at desc', layoutStyle: 'timeline' } },
    { name: 'Compact Related', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }, dynamic: { category: 'posts', source: 'related', limit: 3, order: 'published_at desc', layoutStyle: 'grid' } }
  ],
  features: [
    { name: '3-Column Icon Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', textAlign: 'center', padding: '64px' } },
    { name: 'Alternating Rows', styles: { display: 'flex', flexDirection: 'column', gap: '64px', padding: '64px' } },
    { name: 'Numbered Steps', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '64px' } },
    { name: 'Tabbed Features', styles: { display: 'flex', flexDirection: 'column', gap: '32px', padding: '64px' } },
    { name: 'Checklist Style', styles: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '48px' } },
    { name: 'Bento Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(100px, auto)', gap: '16px', padding: '48px' } },
    { name: 'Comparison Table', styles: { display: 'table', width: '100%', padding: '64px' } },
    { name: 'Icon Plus Large Stat', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', textAlign: 'center', padding: '64px' } },
    { name: 'Feature Spotlight', styles: { display: 'flex', flexDirection: 'column', gap: '48px', padding: '64px' } },
    { name: 'Accordion Features', styles: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto', padding: '64px' } }
  ],
  cta: [
    { name: 'Simple Banner', styles: { padding: '64px', textAlign: 'center', backgroundColor: '#f8fafc' } },
    { name: 'Split CTA', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px', alignItems: 'center' } },
    { name: 'Boxed Card CTA', styles: { padding: '64px', margin: '48px auto', maxWidth: '800px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', textAlign: 'center' } },
    { name: 'Two-Button CTA', styles: { padding: '80px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' } },
    { name: 'Countdown Urgency CTA', styles: { padding: '64px', textAlign: 'center', backgroundColor: '#fff7ed', border: '1px solid #ffedd5' } },
    { name: 'Testimonial-Backed CTA', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px', backgroundColor: '#f1f5f9' } },
    { name: 'Gradient Background CTA', styles: { padding: '80px', textAlign: 'center', background: 'linear-gradient(90deg, #4f46e5, #06b6d4)', color: 'white' } },
    { name: 'Minimal Text-Link CTA', styles: { padding: '48px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' } },
    { name: 'Newsletter CTA', styles: { padding: '64px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px', backgroundColor: '#f8fafc' } },
    { name: 'Sticky Bottom CTA', styles: { padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#0f172a', color: 'white' } }
  ],
  recommendations: [
    { name: 'Related Posts Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '48px' }, dynamic: { category: 'recommendations', source: 'related', limit: 3, order: 'published_at desc', layoutStyle: 'grid' } },
    { name: 'You Might Also Like List', styles: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '48px' }, dynamic: { category: 'recommendations', source: 'related', limit: 5, order: 'published_at desc', layoutStyle: 'list' } },
    { name: 'Cross-Category Carousel', styles: { display: 'flex', overflowX: 'auto', gap: '24px', padding: '48px' }, dynamic: { category: 'recommendations', source: 'related', limit: 6, order: 'published_at desc', layoutStyle: 'carousel' } },
    { name: 'Authors Other Posts', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '48px' }, dynamic: { category: 'recommendations', source: 'related', limit: 4, order: 'published_at desc', layoutStyle: 'grid' } },
    { name: 'Most Popular', styles: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '48px' }, dynamic: { category: 'recommendations', source: 'featured', limit: 5, order: 'published_at desc', layoutStyle: 'list' } },
    { name: 'Series Next-in-Series', styles: { padding: '32px', backgroundColor: '#f1f5f9', borderRadius: '8px' }, dynamic: { category: 'recommendations', source: 'related', limit: 1, order: 'published_at asc', layoutStyle: 'banner' } },
    { name: 'Editors Picks', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '48px' }, dynamic: { category: 'recommendations', source: 'featured', limit: 3, order: 'published_at desc', layoutStyle: 'grid' } },
    { name: 'Recently Viewed', styles: { display: 'flex', gap: '16px', overflowX: 'auto', padding: '48px' }, dynamic: { category: 'recommendations', source: 'custom', limit: 4, order: 'published_at desc', layoutStyle: 'row' } },
    { name: 'Recommendation Cards with Reason Tag', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '48px' }, dynamic: { category: 'recommendations', source: 'related', limit: 2, order: 'published_at desc', layoutStyle: 'cards' } },
    { name: 'Minimal Text Links Only', styles: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '32px' }, dynamic: { category: 'recommendations', source: 'related', limit: 5, order: 'published_at desc', layoutStyle: 'text-list' } }
  ],
  newsletter: [
    { name: 'Inline Bar', styles: { display: 'flex', justifyContent: 'center', gap: '16px', padding: '32px', backgroundColor: '#f8fafc' } },
    { name: 'Boxed Card', styles: { padding: '48px', margin: '32px auto', maxWidth: '600px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' } },
    { name: 'Split with Illustration', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px', alignItems: 'center' } },
    { name: 'Value-Prop Newsletter', styles: { padding: '64px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '24px' } },
    { name: 'Social-Proof Newsletter', styles: { padding: '64px', textAlign: 'center', backgroundColor: '#f1f5f9' } },
    { name: 'Modal Popup Variant', styles: { padding: '48px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', zIndex: 100, borderRadius: '16px' } },
    { name: 'Two-Step Newsletter', styles: { padding: '64px', textAlign: 'center' } },
    { name: 'Newsletter Plus Social Icons Combo', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', padding: '64px' } },
    { name: 'Full-Bleed Newsletter Section', styles: { padding: '96px 24px', backgroundColor: '#3b82f6', color: 'white', textAlign: 'center' } },
    { name: 'Footer-Embedded Minimal', styles: { padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }
  ],
  authors: [
    { name: 'Single Author Bio Card', styles: { display: 'flex', gap: '24px', padding: '48px', backgroundColor: '#f8fafc', borderRadius: '12px' }, dynamic: { category: 'authors', source: 'routes', limit: 1, order: 'name asc', layoutStyle: 'card' } },
    { name: 'Author Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', padding: '64px' }, dynamic: { category: 'authors', source: 'routes', limit: 12, order: 'name asc', layoutStyle: 'grid' } },
    { name: 'Featured Author Spotlight', styles: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', padding: '64px', backgroundColor: '#0f172a', color: 'white' }, dynamic: { category: 'authors', source: 'routes', limit: 1, order: 'name asc', layoutStyle: 'spotlight' } },
    { name: 'Author List Compact', styles: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '48px' }, dynamic: { category: 'authors', source: 'routes', limit: 20, order: 'name asc', layoutStyle: 'list' } },
    { name: 'Author Header', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '80px', textAlign: 'center' }, dynamic: { category: 'authors', source: 'routes', limit: 1, order: 'name asc', layoutStyle: 'header' } },
    { name: 'Team Carousel', styles: { display: 'flex', overflowX: 'auto', gap: '24px', padding: '48px' }, dynamic: { category: 'authors', source: 'routes', limit: 8, order: 'name asc', layoutStyle: 'carousel' } },
    { name: 'Author with Recent Posts', styles: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', padding: '64px' }, dynamic: { category: 'authors', source: 'routes', limit: 1, order: 'name asc', layoutStyle: 'mixed' } },
    { name: 'Guest Author Badge Variant', styles: { padding: '32px', border: '2px solid #e2e8f0', borderRadius: '12px' }, dynamic: { category: 'authors', source: 'routes', limit: 1, order: 'name asc', layoutStyle: 'badge' } },
    { name: 'Author Stats Card', styles: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '48px', textAlign: 'center' }, dynamic: { category: 'authors', source: 'routes', limit: 1, order: 'name asc', layoutStyle: 'stats' } },
    { name: 'Minimal Byline', styles: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }, dynamic: { category: 'authors', source: 'routes', limit: 1, order: 'name asc', layoutStyle: 'inline' } }
  ],
  testimonials: [
    { name: 'Single Large Quote', styles: { padding: '96px 24px', textAlign: 'center', fontSize: '1.5rem', fontStyle: 'italic' } },
    { name: '3-Column Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Carousel Slider', styles: { display: 'flex', overflowX: 'auto', padding: '64px', gap: '24px' } },
    { name: 'Wall of Love', styles: { columnCount: 3, columnGap: '24px', padding: '64px' } },
    { name: 'Video Testimonial', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px', alignItems: 'center' } },
    { name: 'Logo Plus Quote Combo', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '64px', textAlign: 'center' } },
    { name: 'Before After Framing', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '64px' } },
    { name: 'Star Rating Testimonials', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Testimonial Plus Stat', styles: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', padding: '64px', alignItems: 'center' } },
    { name: 'Minimal Text-Only List', styles: { display: 'flex', flexDirection: 'column', gap: '32px', padding: '48px', maxWidth: '800px', margin: '0 auto' } }
  ],
  tags: [
    { name: 'Tag Cloud', styles: { display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '48px', justifyContent: 'center' }, dynamic: { category: 'tags', source: 'routes', limit: 20, order: 'count.posts desc', layoutStyle: 'cloud' } },
    { name: 'Tag Grid with Post Count', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '64px' }, dynamic: { category: 'tags', source: 'routes', limit: 8, order: 'count.posts desc', layoutStyle: 'grid' } },
    { name: 'Tag Header', styles: { padding: '96px 24px', textAlign: 'center', backgroundColor: '#f8fafc' }, dynamic: { category: 'tags', source: 'routes', limit: 1, order: 'name asc', layoutStyle: 'header' } },
    { name: 'Tag Pills Row', styles: { display: 'flex', overflowX: 'auto', gap: '16px', padding: '24px' }, dynamic: { category: 'tags', source: 'routes', limit: 10, order: 'count.posts desc', layoutStyle: 'pills' } },
    { name: 'Tag List with Featured Post', styles: { display: 'flex', flexDirection: 'column', gap: '32px', padding: '64px' }, dynamic: { category: 'tags', source: 'routes', limit: 5, order: 'count.posts desc', layoutStyle: 'list' } },
    { name: 'Category Navigation Bar', styles: { display: 'flex', justifyContent: 'center', gap: '32px', padding: '16px', borderBottom: '1px solid #e2e8f0' }, dynamic: { category: 'tags', source: 'routes', limit: 6, order: 'count.posts desc', layoutStyle: 'nav' } },
    { name: 'Tag Grid with Cover Images', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '64px' }, dynamic: { category: 'tags', source: 'routes', limit: 6, order: 'count.posts desc', layoutStyle: 'cards' } },
    { name: 'Popular Tags Sidebar', styles: { display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', backgroundColor: '#f8fafc', borderRadius: '8px' }, dynamic: { category: 'tags', source: 'routes', limit: 5, order: 'count.posts desc', layoutStyle: 'sidebar' } },
    { name: 'Tag Filter Plus Post Grid Combined', styles: { display: 'flex', flexDirection: 'column', gap: '48px', padding: '64px' }, dynamic: { category: 'tags', source: 'routes', limit: 10, order: 'count.posts desc', layoutStyle: 'interactive' } },
    { name: 'Minimal Tag List', styles: { display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '32px' }, dynamic: { category: 'tags', source: 'routes', limit: 10, order: 'name asc', layoutStyle: 'text' } }
  ],
  products: [
    { name: 'Pricing Tiers 3 Column', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Single Plan Highlight', styles: { padding: '64px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', border: '2px solid #3b82f6', borderRadius: '16px' } },
    { name: 'Monthly Yearly Toggle Pricing', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', padding: '64px' } },
    { name: 'Feature Comparison Pricing', styles: { display: 'table', width: '100%', padding: '64px' } },
    { name: 'Membership Benefits Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '64px' } },
    { name: 'Product Card Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', padding: '64px' } },
    { name: 'Single Product Spotlight', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', padding: '64px', alignItems: 'center' } },
    { name: 'Tier Comparison Slider', styles: { display: 'flex', overflowX: 'auto', gap: '24px', padding: '64px' } },
    { name: 'Free vs Paid Callout', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '64px', maxWidth: '800px', margin: '0 auto' } },
    { name: 'FAQ-Adjacent Pricing', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', padding: '64px' } }
  ],
  stats: [
    { name: 'Simple 4-Number Row', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center', padding: '64px' } },
    { name: 'Stats with Icons', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', textAlign: 'center', padding: '64px' } },
    { name: 'Animated Counter Stats', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', textAlign: 'center', padding: '64px' } },
    { name: 'Stat Plus Description Pair', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px' } },
    { name: 'Split Stats Plus Image', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', padding: '64px', alignItems: 'center' } },
    { name: 'Full-Bleed Stats Banner', styles: { display: 'flex', justifyContent: 'space-around', padding: '80px 24px', backgroundColor: '#4f46e5', color: 'white' } },
    { name: 'Comparison Stats Before After', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '64px', textAlign: 'center' } },
    { name: 'Milestone Timeline Stats', styles: { display: 'flex', justifyContent: 'space-between', padding: '64px', borderBottom: '4px solid #e2e8f0' } },
    { name: 'Live Dynamic Stat', styles: { padding: '64px', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }, dynamic: { category: 'posts', source: 'routes', limit: 1, order: 'count.posts desc', layoutStyle: 'live' } },
    { name: 'Minimal Inline Stats', styles: { padding: '32px', textAlign: 'center', fontSize: '1.25rem', color: '#64748b' } }
  ],
  faq: [
    { name: 'Accordion', styles: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto', padding: '64px' } },
    { name: 'Two-Column', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '64px' } },
    { name: 'Searchable', styles: { display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto', padding: '64px' } },
    { name: 'Grid-of-Cards', styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '64px' } },
    { name: 'Categorized-Tabs', styles: { display: 'flex', flexDirection: 'column', gap: '48px', padding: '64px' } },
    { name: 'Minimalist List', styles: { display: 'flex', flexDirection: 'column', gap: '32px', padding: '48px', maxWidth: '600px', margin: '0 auto' } },
    { name: 'Split FAQ and CTA', styles: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '64px', padding: '64px' } },
    { name: 'Dark Mode FAQ', styles: { padding: '80px', backgroundColor: '#0f172a', color: 'white' } },
    { name: 'FAQ with Contact Form', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', padding: '64px' } },
    { name: 'Single Card FAQ Focus', styles: { padding: '64px', margin: '48px auto', maxWidth: '800px', backgroundColor: '#f8fafc', borderRadius: '16px' } }
  ],
  'logo-cloud': [
    { name: 'Static Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '32px', padding: '64px', alignItems: 'center' } },
    { name: 'Scrolling Marquee', styles: { display: 'flex', overflowX: 'hidden', padding: '48px 0', whiteSpace: 'nowrap' } },
    { name: 'Grayscale-Until-Hover', styles: { display: 'flex', justifyContent: 'center', gap: '48px', padding: '64px', filter: 'grayscale(100%)' } },
    { name: 'Grouped-by-Category', styles: { display: 'flex', flexDirection: 'column', gap: '64px', padding: '64px' } },
    { name: '2-Row Staggered', styles: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px', padding: '64px' } },
    { name: 'Logo Cloud with Heading', styles: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', padding: '64px' } },
    { name: 'Bordered Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #e2e8f0', padding: '0' } },
    { name: 'Dark Theme Logos', styles: { padding: '64px', backgroundColor: '#111827', color: 'white', display: 'flex', justifyContent: 'space-around' } },
    { name: 'Minimalist Opacity', styles: { display: 'flex', justifyContent: 'center', gap: '64px', padding: '80px', opacity: '0.4' } },
    { name: 'Split Logos and Trust Stat', styles: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '64px', padding: '64px', alignItems: 'center' } }
  ]
};

Object.entries(definitions).forEach(([category, variants]) => {
  const presets = [];
  
  variants.forEach((variant, index) => {
    const presetId = `${category}-v${index + 1}`;
    const variantName = variant.name;
    const thumbnailUri = generateSvgDataUri(variantName.toUpperCase(), category.toUpperCase());
    
    // Assign generic realistic props for display if Ghost-dynamic isn't used.
    let propsObj = `{
        title: { kind: 'static', value: 'Sample ${variantName}' },
        description: { kind: 'static', value: 'This is a beautifully configured ${category} section.' }
      }`;
      
    let dynamicConfig = '';
    if (variant.dynamic) {
      dynamicConfig = `\n      ghostDynamic: ${JSON.stringify(variant.dynamic)},`;
      // For dynamic components, we might inject a title binding or just use the ghostDynamic flag to signal the UI
      propsObj = `{
        dynamicDataTarget: { kind: 'binding', source: 'site', field: 'title' }
      }`;
    }

    const presetStr = `{
    id: '${presetId}',
    category: '${category}',
    variantName: '${variantName}',
    keywords: ['${category}', '${variantName.toLowerCase().replace(/[^a-z0-9]/g, ' ')}'],
    thumbnailPath: '${thumbnailUri}',
    buildSection: () => ({
      id: \`sec-\${Date.now()}-\${Math.random().toString(36).substring(7)}\`,
      type: '${category}',
      name: '${variantName}',
      props: ${propsObj},${dynamicConfig}
      styles: ${JSON.stringify(variant.styles)},
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

console.log('Successfully generated 150+ comprehensive components based on the detailed brief.');
