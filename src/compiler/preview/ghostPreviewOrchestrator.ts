import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { createClient } from '@libsql/client';
import crypto from 'crypto';
import { seedDemoContent } from './seedDemoContent';

const execAsync = promisify(exec);
const GHOST_DIR = '/tmp/ghost-preview';

function getGhostConfig() {
  try {
    const configPath = path.join(GHOST_DIR, 'config.development.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return { port: config.server.port };
    }
  } catch (err) {}
  return { port: 2368 };
}
const GHOST_PORT = getGhostConfig().port;
const GHOST_URL = `http://localhost:${GHOST_PORT}`;
const API_URL = `${GHOST_URL}/ghost/api/admin`;

export async function ensureGhostInstance(): Promise<string> {
  if (!fs.existsSync(GHOST_DIR)) {
    console.log('[GhostOrchestrator] Installing Ghost...');
    fs.mkdirSync(GHOST_DIR, { recursive: true });
    // Run install in background or wait. We wait so we know it's ready.
    await execAsync('ghost install local --no-prompt', { cwd: GHOST_DIR });
  } else {
    // Check if running
    try {
      const { stdout } = await execAsync('ghost status', { cwd: GHOST_DIR });
      if (stdout.includes('stopped')) {
        console.log('[GhostOrchestrator] Starting Ghost...');
        await execAsync('ghost start', { cwd: GHOST_DIR });
      }
    } catch (e) {
      console.log('[GhostOrchestrator] Starting Ghost (recovered)...');
      await execAsync('ghost start', { cwd: GHOST_DIR });
    }
  }

  // Ensure Integration and API key exist in DB
  const dbPath = path.join(GHOST_DIR, 'content/data/ghost-local.db');
  
  // Create libSQL client
  const db = createClient({ url: `file:${dbPath}` });

  // We'll use a hardcoded known ID to make it idempotent
  const integrationId = '123456789012345678901234';
  const apiKeyId = '123456789012345678901235';
  
  let apiKeyRes = await db.execute({
    sql: 'SELECT id, secret FROM api_keys WHERE integration_id = ?',
    args: [integrationId]
  });

  let tokenSecret = '';
  let didInject = false;
  if (apiKeyRes.rows.length === 0) {
    console.log('[GhostOrchestrator] Injecting Admin API Integration...');
    const roleRes = await db.execute({
      sql: `SELECT id FROM roles WHERE name = 'Admin Integration'`
    });
    const roleId = roleRes.rows[0].id;

    await db.execute({
      sql: `INSERT INTO integrations (id, type, name, slug, created_at) VALUES (?, 'custom', 'Theme Builder', 'theme-builder', datetime('now'))`,
      args: [integrationId]
    });
    const newSecret = crypto.randomBytes(32).toString('hex');
    await db.execute({
      sql: `INSERT INTO api_keys (id, type, secret, role_id, integration_id, created_at) VALUES (?, 'admin', ?, ?, ?, datetime('now'))`,
      args: [apiKeyId, newSecret, roleId, integrationId]
    });
    tokenSecret = newSecret;
    didInject = true;
  } else {
    tokenSecret = apiKeyRes.rows[0].secret as string;
  }

  if (didInject) {
    console.log('[GhostOrchestrator] Restarting Ghost to pick up new API key...');
    await execAsync('ghost restart', { cwd: GHOST_DIR });
  }

  const jwtToken = createJWT(apiKeyId, tokenSecret);

  // Seed demo content
  await seedDemoContent(API_URL, jwtToken);

  return jwtToken;
}

export async function installThemeOnGhost(jwtToken: string, themeZipBuffer: Buffer) {
  // Use Ghost Admin API to upload the theme
  const formData = new FormData();
  const blob = new Blob([new Uint8Array(themeZipBuffer)], { type: 'application/zip' });
  const uniqueName = `theme-builder-preview-${Math.random().toString(36).substring(7)}.zip`;
  formData.append('file', blob, uniqueName);

  const res = await fetch(`${API_URL}/themes/upload/`, {
    method: 'POST',
    headers: {
      Authorization: `Ghost ${jwtToken}`,
      'Accept-Version': 'v5.0'
    },
    body: formData
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to upload theme to Ghost: ${res.status} ${text}`);
  }

  const json = await res.json();
  const uploadedThemeName = json.themes[0].name;

  // Activate the theme
  const activateRes = await fetch(`${API_URL}/themes/${uploadedThemeName}/activate/`, {
    method: 'PUT',
    headers: {
      Authorization: `Ghost ${jwtToken}`,
      'Accept-Version': 'v5.0'
    }
  });

  if (!activateRes.ok) {
    const text = await activateRes.text();
    throw new Error(`Failed to activate theme on Ghost: ${activateRes.status} ${text}`);
  }

  return `${GHOST_URL}/`;
}

function createJWT(id: string, secret: string) {
  const jwt = require('jsonwebtoken');
  return jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: `/admin/`
  });
}
