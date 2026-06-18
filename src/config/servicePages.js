import { SERVICE_TABS } from './services';
import { SITE } from './site';
import { CATEGORY_IMAGES, CLIENT_IMAGES, RELEVANT_VIDEOS } from './media';

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

/** Real no-face/local images for service detail heroes. Avoid placeholders and face-forward stock. */
const SERVICE_DETAIL_STOCK_POOL = [
  CLIENT_IMAGES.residentialInstall,
  CLIENT_IMAGES.residentialRewire,
  CLIENT_IMAGES.residentialPanel,
  CLIENT_IMAGES.commercialTenant,
  CLIENT_IMAGES.commercialPower,
  CLIENT_IMAGES.commercialLighting,
  CLIENT_IMAGES.evCharging,
  CLIENT_IMAGES.lightingIndoor,
  CLIENT_IMAGES.lightingOutdoor,
  CLIENT_IMAGES.panelElectrical,
  CLIENT_IMAGES.safetyUpgrades,
  CLIENT_IMAGES.newConstruction,
  CLIENT_IMAGES.remodelWiring,
  CLIENT_IMAGES.heroOne,
  CLIENT_IMAGES.heroTwo,
  CLIENT_IMAGES.heroThree,
  '/assets/images/service/service-3.jpg',
  '/assets/images/service/service-4.jpg',
  '/assets/images/service/service-7.jpg',
  '/assets/images/resource/chooseus-2.jpg',
  '/assets/images/resource/faq-2.jpg',
  '/assets/images/project/project-1.jpg',
  '/assets/images/project/project-3.jpg',
  '/assets/images/project/project-6.jpg',
  '/assets/images/news/news-2.jpg',
];

const SERVICE_DETAIL_SECONDARY_POOL = [
  CLIENT_IMAGES.safetyUpgrades,
  CLIENT_IMAGES.panelElectrical,
  CLIENT_IMAGES.lightingOutdoor,
  CLIENT_IMAGES.commercialPower,
  CLIENT_IMAGES.evCharging,
  '/assets/images/service/service-3.jpg',
  '/assets/images/service/service-4.jpg',
  '/assets/images/resource/chooseus-2.jpg',
  '/assets/images/project/project-1.jpg',
  '/assets/images/project/project-3.jpg',
];

function buildServiceDetailImageMap() {
  const map = new Map();
  let heroIndex = 0;
  let secondaryIndex = 0;

  for (const groupId of SERVICE_NAV_GROUP_IDS) {
    const tab = SERVICE_TABS.find((entry) => entry.id === groupId);
    if (!tab) continue;

    for (const category of tab.categories) {
      for (const title of category.items) {
        const slug = slugify(title);
        const hero = SERVICE_DETAIL_STOCK_POOL[heroIndex % SERVICE_DETAIL_STOCK_POOL.length];
        heroIndex += 1;

        let secondaryOne = SERVICE_DETAIL_SECONDARY_POOL[secondaryIndex % SERVICE_DETAIL_SECONDARY_POOL.length];
        secondaryIndex += 1;
        let secondaryTwo = SERVICE_DETAIL_SECONDARY_POOL[secondaryIndex % SERVICE_DETAIL_SECONDARY_POOL.length];
        secondaryIndex += 1;

        if (secondaryOne === hero) {
          secondaryIndex += 1;
          secondaryOne = SERVICE_DETAIL_SECONDARY_POOL[secondaryIndex % SERVICE_DETAIL_SECONDARY_POOL.length];
        }
        if (secondaryTwo === hero || secondaryTwo === secondaryOne) {
          secondaryIndex += 1;
          secondaryTwo = SERVICE_DETAIL_SECONDARY_POOL[secondaryIndex % SERVICE_DETAIL_SECONDARY_POOL.length];
        }

        map.set(`${groupId}:${slug}`, {
          hero,
          secondaryImages: [secondaryOne, secondaryTwo],
          imagePosition: category.imagePosition ?? 'center',
        });
      }
    }
  }

  return map;
}

const SERVICE_DETAIL_IMAGE_MAP = buildServiceDetailImageMap();

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
  const mapped = SERVICE_DETAIL_IMAGE_MAP.get(`${tab.id}:${slug}`);
  if (mapped) return mapped;

  return {
    hero: category.image ?? tab.image,
    secondaryImages: [
      SERVICE_DETAIL_SECONDARY_POOL[0],
      SERVICE_DETAIL_SECONDARY_POOL[1],
    ],
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
            ? RELEVANT_VIDEOS.projectShowcase
            : groupId === 'ev-chargers'
              ? RELEVANT_VIDEOS.fieldWork
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
