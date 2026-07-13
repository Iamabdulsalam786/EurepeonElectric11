import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const RELEVANT_OUT = path.join(rootDir, 'public', 'assets', 'images', 'RelevantPics');

function optimizeImage(inputPath, maxPx = 1400, quality = 82) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const dir = path.dirname(inputPath);
  
  // Skip already optimized files
  if (baseName.includes('optimized') || baseName.includes('clean')) {
    console.log(`Skip already optimized: ${path.basename(inputPath)}`);
    return;
  }

  try {
    let currentPath = inputPath;
    
    // Step 1: Resize if needed
    const tmpResized = path.join(dir, `${baseName}-tmp-resized${ext}`);
    execSync(`sips -Z ${maxPx} "${currentPath}" --out "${tmpResized}"`, { stdio: 'pipe' });
    currentPath = tmpResized;

    // Step 2: Convert to optimized JPEG
    const jpgPath = path.join(dir, `${baseName}.jpg`);
    execSync(`sips -s format jpeg -s formatOptions ${quality} "${currentPath}" --out "${jpgPath}"`, {
      stdio: 'pipe',
    });
    const jpgSize = fs.statSync(jpgPath).size;
    console.log(`Optimized JPG: ${baseName}.jpg → ${(jpgSize / 1024).toFixed(1)} KB`);

    // Step 3: Try to convert to WebP (if possible, using cwebp if available)
    try {
      const webpPath = path.join(dir, `${baseName}.webp`);
      execSync(`cwebp -q ${quality} "${currentPath}" -o "${webpPath}" 2>/dev/null`, {
        stdio: 'pipe',
      });
      if (fs.existsSync(webpPath)) {
        const webpSize = fs.statSync(webpPath).size;
        console.log(`Optimized WebP: ${baseName}.webp → ${(webpSize / 1024).toFixed(1)} KB`);
      }
    } catch (e) {
      // cwebp not installed, skip WebP
    }

    // Cleanup tmp file
    fs.unlinkSync(tmpResized);
  } catch (e) {
    console.error(`Failed to optimize ${path.basename(inputPath)}:`, e.message);
  }
}

function main() {
  console.log('Optimizing new PNG images...\n');
  
  const files = fs.readdirSync(RELEVANT_OUT);
  
  // List of all the new PNGs we want to optimize
  const targetFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.png') return false;
    const baseName = path.basename(file, ext);
    // Skip if we already have optimized versions
    if (fs.existsSync(path.join(RELEVANT_OUT, `${baseName}.jpg`))) return false;
    return true;
  });

  if (targetFiles.length === 0) {
    console.log('No new PNGs to optimize.');
    return;
  }

  console.log(`Found ${targetFiles.length} PNG files to optimize:\n`);
  
  targetFiles.forEach(file => {
    const inputPath = path.join(RELEVANT_OUT, file);
    const isHero = file.toLowerCase().includes('banner') || file.toLowerCase().includes('hero');
    const maxPx = isHero ? 1920 : 1400;
    const quality = isHero ? 85 : 82;
    optimizeImage(inputPath, maxPx, quality);
  });

  console.log('\nDone optimizing images!');
}

main();
