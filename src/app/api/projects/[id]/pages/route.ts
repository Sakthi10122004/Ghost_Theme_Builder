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

  const ts = Date.now();
  const headerId = `Header-${ts}`;
  const heroId = `Hero-${ts}`;
  const footerId = `Footer-${ts}`;
  const logoId = `Logo-${ts}`;
  const navId = `Nav-${ts}`;
  const h1Id = `HeroH1-${ts}`;
  const pId = `HeroP-${ts}`;

  const page = await prisma.page.create({
    data: {
      projectId: id,
      name: name || 'New Page',
      slug: slug || name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'new-page',
      type: type || 'page',
      sortOrder: pageCount,
      content: JSON.stringify({
        content: [
          { type: 'Header', props: { id: headerId, backgroundColor: '#ffffff' } },
          { type: 'Hero', props: { id: heroId, backgroundColor: '#0f172a', minHeight: '500px' } },
          { type: 'Footer', props: { id: footerId, backgroundColor: '#0f172a' } }
        ],
        root: { props: {} },
        zones: {
          [`${headerId}:header-left`]: [
            { type: 'GhostSiteLogo', props: { id: logoId } }
          ],
          [`${headerId}:header-right`]: [
            { type: 'GhostNavigation', props: { id: navId } }
          ],
          [`${heroId}:hero-content`]: [
            { type: 'Heading', props: { id: h1Id, text: name || 'New Page', level: 'h1', color: '#ffffff', textAlign: 'center', fontSize: '48px' } },
            { type: 'Paragraph', props: { id: pId, text: 'Start building your page by dragging components from the sidebar.', color: '#cbd5e1', textAlign: 'center', fontSize: '18px' } }
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
