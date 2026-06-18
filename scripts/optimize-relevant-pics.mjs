import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const SOURCE_DIR = path.join(rootDir, 'Easton', 'assets', 'images', 'RelevantPics');

const RELEVANT_OUT = path.join(rootDir, 'public', 'assets', 'images', 'RelevantPics');
const SERVICE_OUT = path.join(rootDir, 'public', 'assets', 'images', 'service');
const BANNER_OUT = path.join(rootDir, 'public', 'assets', 'images', 'banner');

/** Envato source filename → canonical slug in RelevantPics/ */
const FILE_MAP = {
  'Home Electric installations.jpg': 'home-electrical-installation.jpg',
  'Home reviring.jpg': 'home-rewiring.jpg',
  'Residential Panel.jpg': 'residential-panel.jpg',
  'commercial tenant.jpg': 'commercial-tenant.jpg',
  'CommercialPower.jpg': 'commercial-power.jpg',
  'Commercial Lighting.jpg': 'commercial-lighting.jpg',
  'EV Charger.jpg': 'ev-charging.jpg',
  'Indoorlighting.jpg': 'lighting-indoor.jpg',
  'outdoorlighting.jpg': 'lighting-outdoor.jpg',
  'Panel Upgrade.jpg': 'panel-electrical.jpg',
  'SafetyUpgrades.jpg': 'safety-upgrades.jpg',
  'constructrion wiring.jpg': 'new-construction.jpg',
  'remodeling wiring.jpg': 'remodel-wiring.jpg',
  'Hero Banner1.jpg': 'hero-banner-1.jpg',
  'Hero banner 2.jpg': 'hero-banner-2.jpg',
  'Hero Banner 3.jpg': 'hero-banner-3.jpg',
};

const SERVICE_ALIASES = {
  'home-electrical-installation.jpg': 'residential-install.jpg',
  'home-rewiring.jpg': 'residential-rewire.jpg',
  'residential-panel.jpg': 'residential-panel.jpg',
  'commercial-tenant.jpg': 'commercial-tenant.jpg',
  'commercial-power.jpg': 'commercial-power.jpg',
  'commercial-lighting.jpg': 'commercial-lighting.jpg',
  'ev-charging.jpg': 'ev-charging.jpg',
  'lighting-indoor.jpg': 'lighting-indoor.jpg',
  'lighting-outdoor.jpg': 'lighting-outdoor.jpg',
  'panel-electrical.jpg': 'panel-electrical.jpg',
  'safety-upgrades.jpg': 'safety-upgrades.jpg',
  'new-construction.jpg': 'new-construction.jpg',
  'remodel-wiring.jpg': 'remodel-wiring.jpg',
};

const BANNER_ALIASES = {
  'hero-banner-1.jpg': 'banner-1.jpg',
  'hero-banner-2.jpg': 'banner-2.jpg',
  'hero-banner-3.jpg': 'banner-3.jpg',
};

function optimizeJpeg(inputPath, outputPath, maxPx, quality) {
  const dir = path.dirname(outputPath);
  fs.mkdirSync(dir, { recursive: true });

  const tmp = `${outputPath}.tmp.jpg`;
  execSync(`sips -Z ${maxPx} "${inputPath}" --out "${tmp}"`, { stdio: 'pipe' });
  execSync(`sips -s format jpeg -s formatOptions ${quality} "${tmp}" --out "${outputPath}"`, {
    stdio: 'pipe',
  });
  fs.unlinkSync(tmp);

  return fs.statSync(outputPath).size;
}

function main() {
  let count = 0;

  for (const [sourceName, slugName] of Object.entries(FILE_MAP)) {
    const inputPath = path.join(SOURCE_DIR, sourceName);
    if (!fs.existsSync(inputPath)) {
      console.warn(`Skip missing: ${sourceName}`);
      continue;
    }

    const isHero = slugName.startsWith('hero-banner-');
    const maxPx = isHero ? 1920 : 1400;
    const quality = isHero ? 85 : 82;

    const relevantPath = path.join(RELEVANT_OUT, slugName);
    const bytes = optimizeJpeg(inputPath, relevantPath, maxPx, quality);
    console.log(`Optimized: RelevantPics/${slugName} → ${(bytes / 1024).toFixed(0)} KB`);

    if (SERVICE_ALIASES[slugName]) {
      const servicePath = path.join(SERVICE_OUT, SERVICE_ALIASES[slugName]);
      const serviceBytes = optimizeJpeg(inputPath, servicePath, maxPx, quality);
      console.log(`Optimized: service/${SERVICE_ALIASES[slugName]} → ${(serviceBytes / 1024).toFixed(0)} KB`);
    }

    if (BANNER_ALIASES[slugName]) {
      const bannerPath = path.join(BANNER_OUT, BANNER_ALIASES[slugName]);
      const bannerBytes = optimizeJpeg(inputPath, bannerPath, maxPx, quality);
      console.log(`Optimized: banner/${BANNER_ALIASES[slugName]} → ${(bannerBytes / 1024).toFixed(0)} KB`);
    }

    count += 1;
  }

  const panelServiceSrc = path.join(SERVICE_OUT, 'commercial-power.jpg');
  const panelServiceDest = path.join(SERVICE_OUT, 'panel-service.jpg');
  if (fs.existsSync(panelServiceSrc)) {
    fs.copyFileSync(panelServiceSrc, panelServiceDest);
    console.log('Alias: panel-service.jpg ← commercial-power.jpg');
  }

  console.log(`\nDone. ${count} client images optimized.`);
}

main();
