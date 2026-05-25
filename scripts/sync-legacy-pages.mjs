import { copyFile, cp, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const rootAssets = resolve(root, 'assets');
const distAssets = resolve(dist, 'assets');

await rm(rootAssets, { recursive: true, force: true });
await mkdir(rootAssets, { recursive: true });
await cp(distAssets, rootAssets, { recursive: true });

await copyFile(resolve(root, 'index.html'), resolve(dist, 'index.html'));

const publicFiles = [
  'ads.txt',
  'favicon.svg',
  '.nojekyll',
  'robots.txt',
  'sitemap.xml',
  'privacy.html',
  'terms.html',
];

for (const file of publicFiles) {
  await copyFile(resolve(root, 'public', file), resolve(root, file));
  await copyFile(resolve(root, 'public', file), resolve(dist, file));
}
