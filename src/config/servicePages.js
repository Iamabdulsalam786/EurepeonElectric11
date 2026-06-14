import { SERVICE_TABS } from './services';
import { SITE } from './site';
import { CATEGORY_IMAGES, RELEVANT_PICS } from './media';

export const SERVICE_NAV_GROUP_IDS = ['residential', 'commercial', 'ev-chargers'];

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const GROUP_AUDIENCE = {
  residential: 'homeowners and residential properties',
  commercial: 'businesses, offices, retail, and commercial properties',
  'ev-chargers': 'homeowners and EV drivers',
};

const GROUP_BENEFITS = {
  residential: [
    'Licensed residential electricians',
    'Code-compliant installations',
    'Upfront written estimates',
    'Clean, respectful job sites',
  ],
  commercial: [
    'Commercial-grade materials',
    'Minimal business disruption',
    'Permit and inspection support',
    'Reliable project scheduling',
  ],
  'ev-chargers': [
    'Certified EV charger installation',
    'Electrical panel assessment',
    'Circuit and permitting support',
    'Tesla and Level 2 compatible',
  ],
};

const RESIDENTIAL_IMAGES = {
  'install-outlets-and-switches': CATEGORY_IMAGES.residential.installations,
  'install-ceiling-fans': CATEGORY_IMAGES.residential.installations,
  'install-lighting-fixtures': CATEGORY_IMAGES.residential.installations,
  'install-dimmer-switches': CATEGORY_IMAGES.residential.installations,
  'install-smoke-detectors': CATEGORY_IMAGES.residential.installations,
  'install-carbon-monoxide-detectors': CATEGORY_IMAGES.residential.installations,
  'whole-house-rewiring': CATEGORY_IMAGES.residential.rewiring,
  'partial-rewiring': CATEGORY_IMAGES.residential.rewiring,
  'knob-and-tube-replacement': CATEGORY_IMAGES.residential.rewiring,
  'aluminum-wiring-replacement': CATEGORY_IMAGES.residential.rewiring,
  'code-compliance-upgrades': CATEGORY_IMAGES.residential.panels,
  'main-panel-replacement': CATEGORY_IMAGES.residential.panels,
  'service-entrance-upgrades': CATEGORY_IMAGES.residential.panels,
  'circuit-breaker-replacement': CATEGORY_IMAGES.residential.panels,
  'subpanel-installation': CATEGORY_IMAGES.residential.panels,
};

const COMMERCIAL_IMAGES = {
  'office-build-outs': CATEGORY_IMAGES.commercial.tenant,
  'retail-space-wiring': CATEGORY_IMAGES.commercial.tenant,
  'restaurant-electrical-installations': CATEGORY_IMAGES.commercial.tenant,
  'panel-installations': CATEGORY_IMAGES.commercial.power,
  'power-distribution-systems': CATEGORY_IMAGES.commercial.power,
  'dedicated-circuits': CATEGORY_IMAGES.commercial.power,
  'equipment-power-connections': CATEGORY_IMAGES.commercial.power,
  'led-retrofits': CATEGORY_IMAGES.commercial.lighting,
  'parking-lot-lighting': CATEGORY_IMAGES.commercial.lighting,
  'warehouse-lighting': CATEGORY_IMAGES.commercial.lighting,
  'emergency-lighting': CATEGORY_IMAGES.commercial.lighting,
};

const EV_IMAGES = {
  'tesla-charger-installation': CATEGORY_IMAGES.ev.charging,
  'level-2-charger-installation': CATEGORY_IMAGES.ev.charging,
  'home-charging-station-setup': CATEGORY_IMAGES.ev.charging,
  'circuit-installation': RELEVANT_PICS.electricianAtPanel,
  'permit-assistance': RELEVANT_PICS.electricianAtPanel,
};

const SERVICE_ITEM_IMAGES = {
  ...RESIDENTIAL_IMAGES,
  ...COMMERCIAL_IMAGES,
  ...EV_IMAGES,
};

const GROUP_SECONDARY_IMAGES = {
  residential: [CATEGORY_IMAGES.residential.rewiring, CATEGORY_IMAGES.residential.panels],
  commercial: [RELEVANT_PICS.commercialPanels, RELEVANT_PICS.commercialSwitchgear],
  'ev-chargers': [CATEGORY_IMAGES.ev.charging, RELEVANT_PICS.electricianAtPanel],
};

function buildIntro({ title, groupId, category }) {
  return `${SITE.shortName} provides professional ${title.toLowerCase()} for ${GROUP_AUDIENCE[groupId]}. Our licensed electricians deliver safe, code-compliant ${category.toLowerCase()} with clear pricing, dependable scheduling, and workmanship built to pass inspection.`;
}

function buildDescription({ title, groupId }) {
  const scope =
    groupId === 'ev-chargers'
      ? 'charger placement, circuit sizing, and permitting'
      : groupId === 'commercial'
        ? 'scheduling, safety planning, and commercial code requirements'
        : 'your home layout, existing wiring, and safety requirements';

  return `Our team reviews ${scope} before work begins, then completes ${title.toLowerCase()} with professional installation standards and a clean finish you can rely on for years.`;
}

function getPageImages(tab, category, slug) {
  const hero = SERVICE_ITEM_IMAGES[slug] ?? category.image ?? tab.image;
  const [secondaryOne, secondaryTwo] = GROUP_SECONDARY_IMAGES[tab.id] ?? [hero, hero];

  return {
    hero,
    secondaryImages: [secondaryOne, secondaryTwo],
    imagePosition: category.imagePosition ?? 'center',
  };
}

export const SERVICE_PAGES = SERVICE_NAV_GROUP_IDS.flatMap((groupId) => {
  const tab = SERVICE_TABS.find((entry) => entry.id === groupId);
  if (!tab) return [];

  return tab.categories.flatMap((category) =>
    category.items.map((title) => {
      const slug = slugify(title);
      const images = getPageImages(tab, category, slug);

      return {
        slug,
        path: `/services/${groupId}/${slug}`,
        title,
        groupId,
        groupLabel: tab.shortLabel ?? tab.tabLabel,
        category: category.title,
        image: images.hero,
        imagePosition: images.imagePosition,
        intro: buildIntro({ title, groupId, category: category.title }),
        description: buildDescription({ title, groupId }),
        benefits: GROUP_BENEFITS[groupId],
        relatedInCategory: category.items.filter((item) => item !== title).slice(0, 4),
        secondaryImages: images.secondaryImages,
        video:
          groupId === 'commercial'
            ? '/assets/images/RelevantPics/video2.mp4'
            : groupId === 'ev-chargers'
              ? '/assets/images/RelevantPics/video1.mp4'
              : null,
      };
    }),
  );
});

export function getServicePageBySlug(groupId, slug) {
  return SERVICE_PAGES.find((page) => page.groupId === groupId && page.slug === slug);
}

export function getServicePagePath(groupId, title) {
  const page = SERVICE_PAGES.find((entry) => entry.groupId === groupId && entry.title === title);
  return page?.path ?? null;
}

export function getServicesByGroup(groupId) {
  return SERVICE_PAGES.filter((page) => page.groupId === groupId);
}

export function getServicePageMeta(pathname) {
  const match = pathname.match(/^\/services\/([^/]+)\/([^/]+)$/);
  if (!match) return null;

  const page = getServicePageBySlug(match[1], match[2]);
  if (!page) return null;

  return {
    title: page.title,
    description: `${SITE.shortName} — ${page.title} for ${page.groupLabel.toLowerCase()} clients. Licensed, code-compliant electrical work with upfront pricing.`,
  };
}
