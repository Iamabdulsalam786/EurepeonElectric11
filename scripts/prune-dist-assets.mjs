import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');

const TEXT_EXTENSIONS = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg']);
const PRUNE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.jpe', '.png', '.webp', '.gif', '.ico', '.mp4']);
const ALWAYS_KEEP_ASSETS = [
  '/assets/images/RelevantPics/ev-carousel-3-hero.jpg',
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function resolveDistAsset(assetPath) {
  const cleanPath = decodeURIComponent(assetPath.replace(/[?#].*$/, '').replace(/^\/+/, ''));
  if (!cleanPath.startsWith('assets/')) return null;
  return path.normalize(path.join(distDir, cleanPath));
}

function addReferenced(referenced, assetPath) {
  const resolved = resolveDistAsset(assetPath);
  if (resolved && fs.existsSync(resolved)) referenced.add(resolved);
}

function collectReferences() {
  const referenced = new Set();
  const productionSourceFiles = [
    path.join(rootDir, 'index.html'),
    path.join(rootDir, 'src', 'content', 'index.html'),
    path.join(rootDir, 'src', 'content', 'about.html'),
    path.join(rootDir, 'src', 'content', 'contact.html'),
    path.join(rootDir, 'src', 'content', 'faq.html'),
    path.join(rootDir, 'src', 'content', 'appointment.html'),
    path.join(rootDir, 'src', 'content', 'error.html'),
    path.join(rootDir, 'scripts', 'canonical', 'index.html'),
    path.join(rootDir, 'scripts', 'canonical', 'about.html'),
    path.join(rootDir, 'scripts', 'canonical', 'contact.html'),
    path.join(rootDir, 'scripts', 'canonical', 'faq.html'),
    path.join(rootDir, 'scripts', 'canonical', 'appointment.html'),
    path.join(rootDir, 'src', 'config', 'media.js'),
    path.join(rootDir, 'src', 'config', 'servicePages.js'),
    path.join(rootDir, 'src', 'config', 'insightArticles.js'),
    path.join(rootDir, 'src', 'config', 'site.js'),
    path.join(rootDir, 'src', 'utils', 'loadScripts.js'),
    path.join(rootDir, 'src', 'utils', 'loadStyles.js'),
  ];

  const textFiles = [
    ...walk(distDir).filter((filePath) => TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase())),
    ...productionSourceFiles,
  ].filter((filePath) => fs.existsSync(filePath));

  for (const filePath of textFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileDir = path.dirname(filePath);

    for (const match of content.matchAll(/\/assets\/[^"'`\s)<]+/g)) {
      addReferenced(referenced, match[0]);
    }

    for (const match of content.matchAll(/\$\{RP\}\/([^`'"]+)/g)) {
      addReferenced(referenced, `/assets/images/RelevantPics/${match[1]}`);
    }

    for (const match of content.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)) {
      const url = match[2].trim();
      if (!url || url.startsWith('data:') || /^https?:\/\//i.test(url)) continue;

      const resolved = url.startsWith('/')
        ? path.join(distDir, decodeURIComponent(url.replace(/^\/+/, '').replace(/[?#].*$/, '')))
        : path.resolve(fileDir, decodeURIComponent(url.replace(/[?#].*$/, '')));

      if (resolved.startsWith(assetsDir) && fs.existsSync(resolved)) referenced.add(resolved);
    }
  }

  for (const assetPath of ALWAYS_KEEP_ASSETS) {
    addReferenced(referenced, assetPath);
  }

  return referenced;
}

function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyDirs(path.join(dir, entry.name));
  }

  if (dir !== assetsDir && fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
  }
}

function formatBytes(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

function main() {
  if (!fs.existsSync(assetsDir)) {
    console.warn('No dist/assets directory found. Skipping asset prune.');
    return;
  }

  const referenced = collectReferences();
  let removedCount = 0;
  let removedBytes = 0;

  for (const filePath of walk(distDir)) {
    if (path.basename(filePath) !== '.DS_Store') continue;

    removedBytes += fs.statSync(filePath).size;
    fs.unlinkSync(filePath);
    removedCount += 1;
  }

  for (const filePath of walk(assetsDir)) {
    const ext = path.extname(filePath).toLowerCase();
    const baseName = path.basename(filePath);

    if (baseName === '.DS_Store' || (PRUNE_EXTENSIONS.has(ext) && !referenced.has(filePath))) {
      removedBytes += fs.statSync(filePath).size;
      fs.unlinkSync(filePath);
      removedCount += 1;
    }
  }

  removeEmptyDirs(assetsDir);

  console.log(`Pruned ${removedCount} unreferenced files from dist (${formatBytes(removedBytes)} removed).`);
  console.log(`Kept ${referenced.size} referenced asset files.`);
}

main();
