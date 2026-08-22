import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the raw list of presets directly from the TS files (this script will be run via a TS loader or we can just fetch the DOM)
// Actually, it's easier to just scrape the DOM ids from the page itself!

async function generateThumbnails() {
  console.log("Starting Puppeteer thumbnail generator...");
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1400, height: 900 });

  console.log("Navigating to http://localhost:3000/sandbox/thumbnails ...");
  // Make sure your dev server is running!
  await page.goto('http://localhost:3000/sandbox/thumbnails', { waitUntil: 'networkidle0' });

  // Get all preset IDs from the DOM
  const presetIds = await page.evaluate(() => {
    const wrappers = Array.from(document.querySelectorAll('[id^="preset-"]'));
    return wrappers.map(w => w.id.replace('preset-', ''));
  });

  console.log(`Found ${presetIds.length} presets to rasterize.`);

  const outputDir = path.join(__dirname, '../../public/preset-thumbnails');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const id of presetIds) {
    const element = await page.$(`#preset-${id}`);
    if (element) {
      const outPath = path.join(outputDir, `${id}.png`);
      await element.screenshot({ path: outPath });
      console.log(`✅ Saved: ${id}.png`);
    } else {
      console.error(`❌ Element not found for preset: ${id}`);
    }
  }

  await browser.close();
  console.log("Done!");
}

generateThumbnails().catch(console.error);
