import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

async function main() {
  if (!fs.existsSync(assetsDir)) {
    console.warn('No dist/assets directory found. Skipping asset prune.');
    return;
  }

  // Only remove .DS_Store files, keep everything else
  let removedCount = 0;
  let removedBytes = 0;

  for (const filePath of walk(distDir)) {
    if (path.basename(filePath) !== '.DS_Store') continue;

    removedBytes += fs.statSync(filePath).size;
    fs.unlinkSync(filePath);
    removedCount += 1;
  }

  console.log(`Removed ${removedCount} .DS_Store files (${(removedBytes / 1024).toFixed(1)} KB removed).`);
  console.log('All other assets preserved!');
}

main();
