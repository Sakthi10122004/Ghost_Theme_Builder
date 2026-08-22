import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET a single project with all pages
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
    include: {
      pages: { orderBy: { sortOrder: 'asc' } },
      assets: true,
    },
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({
    ...project,
    themeSettings: JSON.parse(project.themeSettings),
    designSystem: JSON.parse(project.designSystem),
    navigation: JSON.parse(project.navigation),
    customSettings: JSON.parse(project.customSettings || '[]'),
    routing: JSON.parse(project.routing || '{}'),
    pages: project.pages.map((p: any) => ({
      ...p,
      content: JSON.parse(p.content),
      metadata: JSON.parse(p.metadata),
    })),
  });
}

// PUT update a project
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.status !== undefined) updateData.status = body.status;
  if (body.themeSettings !== undefined)
    updateData.themeSettings = JSON.stringify(body.themeSettings);
  if (body.designSystem !== undefined)
    updateData.designSystem = JSON.stringify(body.designSystem);
  if (body.navigation !== undefined)
    updateData.navigation = JSON.stringify(body.navigation);
  if (body.customSettings !== undefined)
    updateData.customSettings = JSON.stringify(body.customSettings);
  if (body.routing !== undefined)
    updateData.routing = JSON.stringify(body.routing);

  const updated = await prisma.project.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(updated);
}

// DELETE a project
export async function DELETE(
  _req: Request,
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
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
