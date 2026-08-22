import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET all projects for the authenticated user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    include: { pages: { select: { id: true } } },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json(
    projects.map((p: any) => ({
      ...p,
      pageCount: p.pages.length,
      themeSettings: JSON.parse(p.themeSettings),
      designSystem: JSON.parse(p.designSystem),
      navigation: JSON.parse(p.navigation),
      pages: undefined,
    }))
  );
}

// POST create a new project
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, description, templateId } = await req.json();
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const defaultDesignSystem = JSON.stringify({
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textMuted: '#64748b',
      border: '#e2e8f0',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      h1Size: '48px',
      h2Size: '36px',
      h3Size: '28px',
      h4Size: '22px',
      bodySize: '16px',
      smallSize: '14px',
    },
    spacing: {
      sectionPadding: '80px',
      containerMaxWidth: '1200px',
    },
    borderRadius: '8px',
  });

  const project = await prisma.project.create({
    data: {
      userId: session.user.id,
      name,
      slug,
      description: description || '',
      designSystem: defaultDesignSystem,
      themeSettings: JSON.stringify({
        ghostVersion: '5.x',
        postsPerPage: 10,
      }),
      navigation: JSON.stringify([
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about/' },
        { label: 'Blog', url: '/blog/' },
        { label: 'Contact', url: '/contact/' },
      ]),
      customSettings: '[]',
      routing: '{}',
    },
  });

  // Create default pages if starting from scratch
  if (!templateId) {
    const defaultPages = [
      { name: 'Home', slug: 'home', type: 'home', isHomepage: true, sortOrder: 0 },
      { name: 'About', slug: 'about', type: 'page', isHomepage: false, sortOrder: 1 },
      { name: 'Blog', slug: 'blog', type: 'blog', isHomepage: false, sortOrder: 2 },
      { name: 'Contact', slug: 'contact', type: 'page', isHomepage: false, sortOrder: 3 },
    ];

    for (const page of defaultPages) {
      await prisma.page.create({
        data: {
          projectId: project.id,
          ...page,
          content: JSON.stringify({
            content: [
              { type: 'Header', props: { id: `Header-${page.slug}`, backgroundColor: '#ffffff' } },
              { type: 'Hero', props: { id: `Hero-${page.slug}`, backgroundColor: '#0f172a', minHeight: '500px' } },
              { type: 'Footer', props: { id: `Footer-${page.slug}`, backgroundColor: '#0f172a' } }
            ],
            root: { props: {} },
            zones: {
              [`Header-${page.slug}:header-left`]: [
                { type: 'GhostSiteLogo', props: { id: `Logo-${page.slug}` } }
              ],
              [`Header-${page.slug}:header-right`]: [
                { type: 'GhostNavigation', props: { id: `Nav-${page.slug}` } }
              ],
              [`Hero-${page.slug}:hero-content`]: [
                { type: 'Heading', props: { id: `HeroH1-${page.slug}`, text: page.name, level: 'h1', color: '#ffffff', textAlign: 'center', fontSize: '48px' } },
                { type: 'Paragraph', props: { id: `HeroP-${page.slug}`, text: 'This is a default layout. Start dragging components from the sidebar to build your page.', color: '#cbd5e1', textAlign: 'center', fontSize: '18px' } }
              ]
            }
          }),
        },
      });
    }
  }

  return NextResponse.json(project, { status: 201 });
}
