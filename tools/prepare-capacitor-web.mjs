import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const webDir = path.join(root, 'www');
const required = ['index.html', 'img'];

async function assertExists(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!existsSync(fullPath)) {
    throw new Error(`Missing required app asset: ${relativePath}`);
  }
  await stat(fullPath);
}

await Promise.all(required.map(assertExists));
await rm(webDir, { recursive: true, force: true });
await mkdir(webDir, { recursive: true });
await cp(path.join(root, 'index.html'), path.join(webDir, 'index.html'));
await cp(path.join(root, 'img'), path.join(webDir, 'img'), { recursive: true });

console.log('Prepared Capacitor web assets in ./www');
