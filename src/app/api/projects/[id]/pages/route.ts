import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

// POST create a new page in a project
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { name, type, slug } = await req.json();

  const pageCount = await prisma.page.count({ where: { projectId: id } });

  const page = await prisma.page.create({
    data: {
      projectId: id,
      name: name || 'New Page',
      slug: slug || name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'new-page',
      type: type || 'page',
      sortOrder: pageCount,
      content: JSON.stringify({
        content: [
          { type: 'Header', props: { id: `Header-${Date.now()}`, backgroundColor: '#ffffff' } },
          { type: 'Hero', props: { id: `Hero-${Date.now()}`, backgroundColor: '#0f172a', minHeight: '500px' } },
          { type: 'Footer', props: { id: `Footer-${Date.now()}`, backgroundColor: '#0f172a' } }
        ],
        root: { props: {} },
        zones: {
          [`Header-${Date.now()}:header-left`]: [
            { type: 'GhostSiteLogo', props: { id: `Logo-${Date.now()}` } }
          ],
          [`Header-${Date.now()}:header-right`]: [
            { type: 'GhostNavigation', props: { id: `Nav-${Date.now()}` } }
          ],
          [`Hero-${Date.now()}:hero-content`]: [
            { type: 'Heading', props: { id: `HeroH1-${Date.now()}`, text: name || 'New Page', level: 'h1', color: '#ffffff', textAlign: 'center', fontSize: '48px' } },
            { type: 'Paragraph', props: { id: `HeroP-${Date.now()}`, text: 'This is a default layout. Start dragging components from the sidebar to build your page.', color: '#cbd5e1', textAlign: 'center', fontSize: '18px' } }
          ]
        }
      }),
    },
  });

  return NextResponse.json({
    ...page,
    content: JSON.parse(page.content),
    metadata: JSON.parse(page.metadata),
  }, { status: 201 });
}
