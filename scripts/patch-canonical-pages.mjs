/**
 * Overwrites production route content with canonical copy from scripts/canonical/.
 * Prevents Easton template extract from reverting live-site content on every build.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const canonicalDir = path.join(__dirname, 'canonical');
const contentDir = path.join(__dirname, '..', 'src', 'content');

const PRODUCTION_PAGES = [
  'index.html',
  'about.html',
  'contact.html',
  'faq.html',
  'appointment.html',
  'error.html',
];

for (const file of PRODUCTION_PAGES) {
  const source = path.join(canonicalDir, file);
  const dest = path.join(contentDir, file);

  if (!fs.existsSync(source)) {
    console.warn(`Canonical content missing: ${file}`);
    continue;
  }

  fs.copyFileSync(source, dest);
}

console.log(`Applied canonical content for ${PRODUCTION_PAGES.length} production pages.`);
