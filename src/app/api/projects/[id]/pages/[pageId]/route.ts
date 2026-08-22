import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

// PUT update a page's content
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; pageId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, pageId } = await params;

  // Verify project ownership
  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await req.json();
  const updateData: Record<string, unknown> = {};

  if (body.name !== undefined) updateData.name = body.name;
  if (body.slug !== undefined) updateData.slug = body.slug;
  if (body.type !== undefined) updateData.type = body.type;
  if (body.isHomepage !== undefined) updateData.isHomepage = body.isHomepage;
  if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;
  if (body.content !== undefined) updateData.content = JSON.stringify(body.content);
  if (body.metadata !== undefined) updateData.metadata = JSON.stringify(body.metadata);
  if (body.isCollection !== undefined) updateData.isCollection = body.isCollection;
  if (body.collectionFilter !== undefined) updateData.collectionFilter = body.collectionFilter;

  const page = await prisma.page.update({
    where: { id: pageId },
    data: updateData,
  });

  return NextResponse.json({
    ...page,
    content: JSON.parse(page.content),
    metadata: JSON.parse(page.metadata),
  });
}

// DELETE a page
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; pageId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, pageId } = await params;

  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.page.delete({ where: { id: pageId } });
  return NextResponse.json({ success: true });
}
