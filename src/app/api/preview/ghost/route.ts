import { NextResponse } from 'next/server';
import { ensureGhostInstance, installThemeOnGhost } from '@/compiler/preview/ghostPreviewOrchestrator';
import { astValidator } from '@/compiler/pipeline/01-astValidator';
import { semanticResolver } from '@/compiler/pipeline/02-semanticResolver';
import { handlebarsGenerator } from '@/compiler/pipeline/03-handlebarsGenerator';
import { cssGenerator } from '@/compiler/pipeline/04-cssGenerator';
import { jsGenerator } from '@/compiler/pipeline/05-jsGenerator';
import { packageJsonGenerator } from '@/compiler/pipeline/07-packageJsonGenerator';
import { routesYamlGenerator } from '@/compiler/pipeline/08-routesYamlGenerator';
import { themePackager } from '@/compiler/pipeline/09-themePackager';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function POST(req: Request) {
  try {
    const ast = await req.json();

    // LAYER 1: AST Validator
    // For Ghost Preview, we only block on Layer 1 errors (structural/fatal).
    const l1Issues = astValidator(ast);
    const fatalIssues = l1Issues.filter(i => i.severity === 'error');
    if (fatalIssues.length > 0) {
      console.error('[Ghost Preview] Fatal issues:', JSON.stringify(fatalIssues, null, 2));
      return NextResponse.json({ error: 'AST contains fatal errors', issues: fatalIssues }, { status: 400 });
    }

    // LAYER 2: Compile (we don't run Layer 3 GScan for preview speed)
    const resolvedTheme = semanticResolver(ast);
    const hbsFiles = handlebarsGenerator(resolvedTheme);
    const cssContent = cssGenerator(resolvedTheme);
    const jsContent = jsGenerator(resolvedTheme);
    const pkgJson = packageJsonGenerator(ast);
    const routesYaml = routesYamlGenerator();

    // Scaffold temporary directory
    const tempId = Math.random().toString(36).substring(7);
    const themeDir = path.join(os.tmpdir(), `theme-preview-${tempId}`);
    fs.mkdirSync(themeDir, { recursive: true });

    // Write HBS
    for (const [filename, content] of Object.entries(hbsFiles)) {
      const fullPath = path.join(themeDir, filename);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content);
    }

    // Write Assets
    const cssDir = path.join(themeDir, 'assets/css');
    fs.mkdirSync(cssDir, { recursive: true });
    fs.writeFileSync(path.join(cssDir, 'style.css'), cssContent);

    const jsDir = path.join(themeDir, 'assets/js');
    fs.mkdirSync(jsDir, { recursive: true });
    fs.writeFileSync(path.join(jsDir, 'script.js'), jsContent);

    // Write Configs
    fs.writeFileSync(path.join(themeDir, 'package.json'), pkgJson);
    fs.writeFileSync(path.join(themeDir, 'routes.yaml'), routesYaml);

    // Package to ZIP
    const zipBuffer = await themePackager(themeDir);

    // Clean up temp dir
    fs.rmSync(themeDir, { recursive: true, force: true });

    // Orchestrate Ghost
    const jwtToken = await ensureGhostInstance();
    const url = await installThemeOnGhost(jwtToken, zipBuffer);

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Preview compilation error:', error);
    try {
      require('fs').writeFileSync('/tmp/ghost-preview-error.log', error.stack || error.message);
    } catch (e) {}
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
