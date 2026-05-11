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
await copyFile(resolve(root, 'public/favicon.svg'), resolve(root, 'favicon.svg'));
await copyFile(resolve(root, 'public/.nojekyll'), resolve(root, '.nojekyll'));
await copyFile(resolve(root, 'public/favicon.svg'), resolve(dist, 'favicon.svg'));
await copyFile(resolve(root, 'public/.nojekyll'), resolve(dist, '.nojekyll'));
