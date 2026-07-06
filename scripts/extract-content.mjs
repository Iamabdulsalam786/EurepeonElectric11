import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const eastonDir = path.join(rootDir, 'Easton');
const outputDir = path.join(rootDir, 'src', 'content');

const routeMap = {
  'index.html': '/',
  'index-2.html': '/home-2',
  'index-3.html': '/home-3',
  'index-4.html': '/home-4',
  'index-5.html': '/home-5',
  'index-6.html': '/home-6',
  'index-onepage.html': '/onepage',
  'index-rtl.html': '/rtl',
  'about.html': '/about',
  'contact.html': '/contact',
  'service.html': '/services',
  'service-2.html': '/services-2',
  'service-3.html': '/services-3',
  'air-conditioning.html': '/air-conditioning',
  'heating-service.html': '/heating-service',
  'power-outlets.html': '/power-outlets',
  'indoor-lighting.html': '/indoor-lighting',
  'security-system.html': '/security-system',
  'electrical-panels.html': '/electrical-panels',
  'team.html': '/team',
  'team-2.html': '/team-2',
  'team-details.html': '/team-details',
  'project.html': '/projects',
  'project-2.html': '/projects-2',
  'project-details.html': '/project-details',
  'project-details-2.html': '/project-details-2',
  'testimonial.html': '/testimonials',
  'pricing.html': '/pricing',
  'faq.html': '/faq',
  'appointment.html': '/appointment',
  'error.html': '/404',
  'shop.html': '/shop',
  'shop-details.html': '/shop-details',
  'cart.html': '/cart',
  'checkout.html': '/checkout',
  'blog.html': '/blog',
  'blog-2.html': '/blog-2',
  'blog-details.html': '/blog-details',
};

const startMarker = '<!-- End Mobile Menu -->';
const endMarker = '<!-- main-footer -->';

function transformContent(html) {
  let content = html;

  content = content.replace(/src="assets\//g, 'src="/assets/');
  content = content.replace(/url\(assets\//g, 'url(/assets/');
  content = content.replace(/href="assets\//g, 'href="/assets/');

  for (const [htmlFile, route] of Object.entries(routeMap)) {
    const pattern = new RegExp(`href="${htmlFile.replace('.', '\\.')}"`, 'g');
    content = content.replace(pattern, `href="${route}"`);
  }

  content = content.replace(/action="[^"]*\.html"/g, (match) => {
    const file = match.match(/action="([^"]+)"/)?.[1];
    if (file && routeMap[file]) {
      return `action="${routeMap[file]}"`;
    }
    return match;
  });

  content = commentTeamSections(content);

  return content.trim();
}

function commentTeamSections(content) {
  const sectionPatterns = [
    /<!-- team-section -->[\s\S]*?<!-- team-section end -->/g,
    /<!-- team-style-two -->[\s\S]*?<!-- team-style-two end -->/g,
    /<!-- team-style-three -->[\s\S]*?<!-- team-style-three end -->/g,
  ];

  let result = content;
  for (const pattern of sectionPatterns) {
    result = result.replace(pattern, '<!-- team-section: disabled -->');
  }
  return result;
}

function getPageTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1] : 'European Electric LLC';
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const manifest = {};

for (const [fileName, route] of Object.entries(routeMap)) {
  const filePath = path.join(eastonDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping missing file: ${fileName}`);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Could not extract content from ${filePath}`);
  }

  const raw = html.slice(startIndex + startMarker.length, endIndex);
  const content = transformContent(raw);
  const slug = fileName.replace('.html', '');
  const outFile = path.join(outputDir, `${slug}.html`);
  fs.writeFileSync(outFile, content, 'utf8');

  manifest[route] = {
    file: `${slug}.html`,
    title: getPageTitle(html),
  };
}

fs.writeFileSync(
  path.join(outputDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
);

console.log(`Extracted ${Object.keys(manifest).length} pages to src/content/`);

execSync('node scripts/patch-canonical-pages.mjs', { cwd: rootDir, stdio: 'inherit' });
execSync('node scripts/patch-services-section.mjs', { cwd: rootDir, stdio: 'inherit' });
execSync('node scripts/patch-search-field.mjs', { cwd: rootDir, stdio: 'inherit' });
