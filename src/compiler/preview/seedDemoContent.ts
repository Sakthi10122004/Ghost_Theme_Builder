import fs from 'fs';
import path from 'path';

export async function seedDemoContent(apiUrl: string, jwtToken: string) {
  // Check if content is already seeded
  const checkRes = await fetch(`${apiUrl}/posts/?filter=slug:special-featured-post`, {
    headers: { Authorization: `Ghost ${jwtToken}` }
  });
  
  if (checkRes.ok) {
    const data = await checkRes.json();
    if (data.posts && data.posts.length > 0) {
      console.log('[seedDemoContent] Demo content already exists. Skipping.');
      return;
    }
  }

  // Content doesn't exist, import it
  console.log('[seedDemoContent] Seeding demo content...');
  const jsonPath = path.join(process.cwd(), 'src/compiler/preview/demoContent/casper-demo-content.json');
  const fileContent = fs.readFileSync(jsonPath, 'utf-8');
  
  // Create a Blob from the file content to simulate a file upload in fetch
  const blob = new Blob([fileContent], { type: 'application/json' });
  const formData = new FormData();
  formData.append('importfile', blob, 'casper-demo-content.json');

  const importRes = await fetch(`${apiUrl}/db/`, {
    method: 'POST',
    headers: {
      Authorization: `Ghost ${jwtToken}`,
      // Do NOT set Content-Type here, let fetch handle the multipart boundary
    },
    body: formData
  });

  if (!importRes.ok) {
    const err = await importRes.text();
    console.error('[seedDemoContent] Failed to import demo content:', importRes.status, err);
    throw new Error(`Failed to import demo content: ${importRes.status}`);
  }

  console.log('[seedDemoContent] Demo content seeded successfully.');
}
