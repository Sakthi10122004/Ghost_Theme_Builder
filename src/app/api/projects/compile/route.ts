import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import handlebars from 'handlebars';

import { ThemeProject } from '../../../../ast/types';
import { astValidator } from '../../../../compiler/pipeline/01-astValidator';
import { semanticResolver } from '../../../../compiler/pipeline/02-semanticResolver';
import { handlebarsGenerator } from '../../../../compiler/pipeline/03-handlebarsGenerator';
import { cssGenerator } from '../../../../compiler/pipeline/04-cssGenerator';
import { jsGenerator } from '../../../../compiler/pipeline/05-jsGenerator';
import { assetProcessor } from '../../../../compiler/pipeline/06-assetProcessor';
import { packageJsonGenerator } from '../../../../compiler/pipeline/07-packageJsonGenerator';
import { routesYamlGenerator } from '../../../../compiler/pipeline/08-routesYamlGenerator';
import { themePackager } from '../../../../compiler/pipeline/09-themePackager';
import { gscanRunner } from '../../../../compiler/pipeline/10-gscanRunner';
import { ValidationIssue } from '../../../../compiler/validation/sharedTypes';

export async function POST(request: Request) {
  try {
    const ast: ThemeProject = await request.json();
    
    // 1. Layer 1 Validation (Server-side defense)
    const l1Issues = astValidator(ast);
    if (l1Issues.some(i => i.severity === 'error')) {
      return NextResponse.json({ issues: l1Issues }, { status: 400 });
    }

    // 2. Semantic Resolution
    const resolvedTheme = semanticResolver(ast);

    // 3. Generate Files
    const hbsFiles = handlebarsGenerator(resolvedTheme);
    const cssContent = cssGenerator(resolvedTheme);
    const jsContent = jsGenerator(resolvedTheme);
    const packageJsonContent = packageJsonGenerator(ast);
    const routesYamlContent = routesYamlGenerator();
    const assets = assetProcessor(resolvedTheme, ast.assets);

    // Layer 2 Checks (HBS compilation check)
    const l2Issues: ValidationIssue[] = [];
    for (const [filename, content] of Object.entries(hbsFiles)) {
      try {
        handlebars.precompile(content);
      } catch (e: any) {
        l2Issues.push({
          id: `l2-hbs-error-${filename}`,
          layer: 2, severity: 'error', checkName: 'Handlebars Syntax Error',
          message: `Failed to parse ${filename}: ${e.message}`
        });
      }
    }
    
    // Write everything to a temp dir for GScan & Zipping
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ghost-theme-'));
    
    // Write HBS
    for (const [filename, content] of Object.entries(hbsFiles)) {
      const fullPath = path.join(tmpDir, filename);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content);
    }
    
    // Write Assets (CSS/JS/etc)
    await fs.mkdir(path.join(tmpDir, 'assets', 'css'), { recursive: true });
    await fs.writeFile(path.join(tmpDir, 'assets', 'css', 'style.css'), cssContent);
    
    await fs.mkdir(path.join(tmpDir, 'assets', 'js'), { recursive: true });
    await fs.writeFile(path.join(tmpDir, 'assets', 'js', 'script.js'), jsContent);
    
    for (const asset of assets) {
      const dest = path.join(tmpDir, asset.path);
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.writeFile(dest, asset.content);
    }
    
    // Write config files
    await fs.writeFile(path.join(tmpDir, 'package.json'), packageJsonContent);
    await fs.writeFile(path.join(tmpDir, 'routes.yaml'), routesYamlContent);

    // If Layer 2 has errors, short-circuit
    if (l2Issues.some(i => i.severity === 'error')) {
      return NextResponse.json({ issues: l2Issues }, { status: 400 });
    }

    // Layer 3: GScan
    const l3Issues = await gscanRunner(tmpDir);
    
    // If there are blocking errors in Layer 3, return issues
    const allIssues = [...l2Issues, ...l3Issues];
    if (allIssues.some(i => i.severity === 'error')) {
      return NextResponse.json({ issues: allIssues }, { status: 400 });
    }

    // If no blocking errors, package the theme and return a download URL or binary
    const zipBuffer = await themePackager(tmpDir);
    
    // Return the issues AND the zip. Wait, we can't return both easily in a fetch API without multipart.
    // Let's create a temporary download URL, or encode it as base64.
    // For simplicity, we can encode as base64 data URL.
    const downloadUrl = `data:application/zip;base64,${zipBuffer.toString('base64')}`;

    return NextResponse.json({
      issues: allIssues,
      downloadUrl
    });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
