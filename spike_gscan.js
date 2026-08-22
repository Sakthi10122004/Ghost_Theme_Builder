const gscan = require('gscan');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function runSpike() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ghost-spike-'));
  console.log('Created temporary theme dir:', tmpDir);

  // 1. Minimum package.json
  fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify({
    name: 'spike-theme',
    version: '1.0.0',
    engines: { ghost: '>=5.0.0' }
  }));

  // 2. index.hbs
  fs.writeFileSync(path.join(tmpDir, 'index.hbs'), '{{!< default}}\n<h1>Index</h1>');

  // 3. post.hbs
  fs.writeFileSync(path.join(tmpDir, 'post.hbs'), '{{!< default}}\n<h1>Post</h1>');

  // 4. default.hbs
  fs.writeFileSync(path.join(tmpDir, 'default.hbs'), '<!DOCTYPE html><html><head>{{ghost_head}}</head><body>{{{body}}}{{ghost_foot}}</body></html>');

  console.log('Running gscan.check...');
  try {
    const report = await gscan.check(tmpDir);
    const formatted = gscan.format(report);
    console.log('Formatted Keys:', Object.keys(formatted));
    console.log('Formatted results error:', formatted.error);
    console.log('Formatted results warning:', formatted.warning);
    console.log('Formatted results:', JSON.stringify(formatted.results, null, 2));
  } catch (err) {
    console.error('GScan threw an exception:', err);
  }
}

runSpike();
