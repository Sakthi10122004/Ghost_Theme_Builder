import { ZipArchive } from 'archiver';
import fs from 'fs';
import path from 'path';

export function themePackager(themeDir: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = new ZipArchive({ zlib: { level: 9 } });
    const chunks: Buffer[] = [];
    
    archive.on('data', (chunk: Buffer) => chunks.push(chunk));
    archive.on('end', () => resolve(Buffer.concat(chunks)));
    archive.on('error', (err: any) => reject(err));
    
    // Append files from the temp directory, placing them at the root of the ZIP
    archive.directory(themeDir, false);
    archive.finalize();
  });
}
