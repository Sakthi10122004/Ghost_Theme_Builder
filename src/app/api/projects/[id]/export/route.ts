import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { compileTheme } from '@/lib/editor/theme-compiler';
import JSZip from 'jszip';

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
    include: { pages: { orderBy: { sortOrder: 'asc' } } },
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  try {
    // Compile theme
    const themeFiles = compileTheme({
      name: project.name,
      slug: project.slug,
      designSystem: JSON.parse(project.designSystem),
      navigation: JSON.parse(project.navigation),
      themeSettings: JSON.parse(project.themeSettings),
      customSettings: JSON.parse(project.customSettings || '[]'),
      routing: JSON.parse(project.routing || '{}'),
      pages: project.pages.map((p: any) => ({
        name: p.name,
        slug: p.slug,
        type: p.type,
        isHomepage: p.isHomepage,
        isCollection: p.isCollection,
        collectionFilter: p.collectionFilter,
        content: JSON.parse(p.content),
      })),
    });

    // Create ZIP
    const zip = new JSZip();
    const themeFolder = zip.folder(project.slug)!;

    for (const file of themeFiles) {
      themeFolder.file(file.path, file.content);
    }

    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    return new NextResponse(zipBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${project.slug}.zip"`,
      },
    });
  } catch (error) {
    console.error('Export failed:', error);
    return NextResponse.json(
      { error: 'Theme compilation failed', details: String(error) },
      { status: 500 }
    );
  }
}
