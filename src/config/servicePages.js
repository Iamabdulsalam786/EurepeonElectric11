import { SERVICE_TABS } from './services.js';
import { SITE } from './site.js';
import { CATEGORY_IMAGES, CLIENT_IMAGES, RELEVANT_PICS } from './media.js';

const RP = '/assets/images/RelevantPics';

export const SERVICE_NAV_GROUP_IDS = [
  'residential',
  'commercial',
  'new-construction',
  'ev-chargers',
  'lighting-solutions',
  'safety-upgrades',
  'panel-upgrades',
  'other-services',
];

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
  'new-construction': 'homeowners, builders, remodelers, and commercial project teams',
  'safety-upgrades': 'homeowners, property managers, and businesses that need safer electrical systems',
  'ev-chargers': 'homeowners and EV drivers',
  'lighting-solutions': 'homeowners, businesses, and property managers',
  'panel-upgrades': 'homes and businesses that need safer, higher-capacity electrical service',
  'other-services': 'homeowners, businesses, and property managers',
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
  'new-construction': [
    'Rough-in and finish wiring',
    'Code-ready project planning',
    'Coordination with builders',
    'Clean remodel integration',
  ],
  'safety-upgrades': [
    'Inspection-focused recommendations',
    'Code-compliant safety upgrades',
    'Clear issue documentation',
    'Reliable protection improvements',
  ],
  'ev-chargers': [
    'Certified EV charger installation',
    'Electrical panel assessment',
    'Circuit and permitting support',
    'Tesla and Level 2 compatible',
  ],
  'lighting-solutions': [
    'Indoor and outdoor lighting expertise',
    'Cleaner, more efficient fixture upgrades',
    'Practical layout recommendations',
    'Code-compliant installation',
  ],
  'panel-upgrades': [
    'Load and capacity evaluation',
    'Panel replacement and service upgrades',
    'Permit and utility coordination',
    'Safer breaker and subpanel solutions',
  ],
  'other-services': [
    'Licensed electricians',
    'Code-compliant work',
    'Upfront estimates',
    'Clean job sites',
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
  CLIENT_IMAGES.remodelWiring,
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

const SERVICE_DETAIL_IMAGE_OVERRIDES = {
  'residential:install-outlets-and-switches': `${RP}/install-outlets-and-switches-optimized.jpg`,
  'residential:install-ceiling-fans': `${RP}/install-ceiling-fan-optimized.jpg`,
  'residential:install-lighting-fixtures': `${RP}/install-lighting-fixtures-optimized.jpg`,
  'residential:install-dimmer-switches': `${RP}/install-dimmer-switches-optimized.jpg`,
  'residential:install-smoke-detectors': `${RP}/install-smoke-detectors-optimized.jpg`,
  'residential:install-carbon-monoxide-detectors': `${RP}/install-carbon-monoxide-detectors-optimized.jpg`,
  'residential:whole-house-rewiring': `${RP}/whole-house-rewiring-optimized.jpg`,
  'residential:partial-rewiring': CLIENT_IMAGES.residentialRewire,
  'residential:knob-and-tube-replacement': `${RP}/knob-and-tube-replacement-optimized.jpg`,
  'residential:aluminum-wiring-replacement': CLIENT_IMAGES.remodelWiring,
  'residential:code-compliance-upgrades': CLIENT_IMAGES.safetyUpgrades,
  'residential:main-panel-replacement': `${RP}/main-panel-replacement-optimized.jpg`,
  'residential:service-entrance-upgrades': `${RP}/service-entrance-upgrades-optimized.jpg`,
  'residential:circuit-breaker-replacement': `${RP}/circuit-breaker-replacement-optimized.jpg`,
  'residential:subpanel-installation': `${RP}/subpanel-installation-optimized.jpg`,
  'commercial:office-build-outs': `${RP}/office-build-outs-optimized.jpg`,
  'commercial:retail-space-wiring': `${RP}/retail-space-wiring-optimized.jpg`,
  'commercial:restaurant-electrical-installations': `${RP}/restaurant-electrical-installations-optimized.jpg`,
  'commercial:panel-installations': `${RP}/panel-installation-optimized.jpg`,
  'commercial:power-distribution-systems': `${RP}/power-distribution-systems-optimized.jpg`,
  'commercial:dedicated-circuits': `${RP}/dedicated-circuits-optimized.jpg`,
  'commercial:equipment-power-connections': `${RP}/commercial-equipment-power-connections-clean.jpg`,
  'commercial:led-retrofits': CLIENT_IMAGES.commercialLighting,
  'commercial:parking-lot-lighting': `${RP}/commercial-parking-lot-lighting-clean.jpg`,
  'commercial:warehouse-lighting': RELEVANT_PICS.commercialConduit,
  'commercial:emergency-lighting': RELEVANT_PICS.commercialSwitchgear,
  'new-construction:new-home-wiring': CLIENT_IMAGES.newConstruction,
  'new-construction:new-commercial-building-wiring': `${RP}/power-distribution-systems-optimized.jpg`,
  'new-construction:temporary-construction-power': CLIENT_IMAGES.commercialPower,
  'new-construction:kitchen-remodel-wiring': `${RP}/Kitchen Remodeling pic updated1.jpg`,
  'new-construction:bathroom-remodel-wiring': `${RP}/bathroom remodel wiring updated1.jpg`,
  'new-construction:room-additions': `${RP}/Room additions updated1.jpg`,
  'new-construction:adu-electrical-installation': `${RP}/ADU electrical installation updated1.jpg`,
  'safety-upgrades:electrical-safety-inspections': `${RP}/safety-upgrades.jpg`,
  'safety-upgrades:gfci-installation': `${RP}/safety-upgrades.jpg`,
  'safety-upgrades:afci-installation': `${RP}/circuit-breaker-replacement-optimized.jpg`,
  'safety-upgrades:surge-protection': `${RP}/4.jpe`,
  'safety-upgrades:grounding-improvements': CLIENT_IMAGES.safetyUpgrades,
  'ev-chargers:tesla-charger-installation': `${RP}/ev-tesla-charger-installation-clean.jpg`,
  'ev-chargers:level-2-charger-installation': `${RP}/ev-level-2-charger-installation-clean.jpg`,
  'ev-chargers:home-charging-station-setup': `${RP}/ev-home-charging-station-setup-clean.jpg`,
  'ev-chargers:circuit-installation': `${RP}/Circuit installation updated11.jpg`,
  'ev-chargers:permit-assistance': `${RP}/ev-permit-assistance-clean.jpg`,
};

const COMMERCIAL_SERVICE_COPY = {
  'office-build-outs': {
    intro:
      'Professional office build-out wiring for tenant improvements, renovations, and new workplace layouts. We plan circuits, lighting, device placement, and panel capacity around how the space will actually be used.',
    description:
      'From private offices and conference rooms to reception areas and shared workspaces, our electricians coordinate clean commercial installation work that supports computers, lighting, printers, dedicated equipment, and future expansion without disrupting the project schedule.',
  },
  'retail-space-wiring': {
    intro:
      'Retail space wiring designed for customer-facing stores, display lighting, checkout areas, signage, and back-of-house power needs.',
    description:
      'We help retail owners and contractors prepare safe, code-compliant electrical layouts for sales floors, stock rooms, POS equipment, lighting controls, and tenant improvement requirements so the space is ready for opening day.',
  },
  'restaurant-electrical-installations': {
    intro:
      'Restaurant electrical installation for kitchens, dining rooms, bars, prep areas, and commercial equipment that depends on reliable power.',
    description:
      'Our team plans dedicated circuits, equipment connections, lighting, panels, and inspection-ready wiring for restaurants where uptime, safety, and clean coordination with other trades matter from rough-in through final trim.',
  },
  'panel-installations': {
    intro:
      'Commercial panel installation for business spaces that need organized, expandable, and inspection-ready electrical distribution.',
    description:
      'We install and upgrade commercial panels with clear circuit planning, proper labeling, load awareness, and room for future equipment, lighting, HVAC, and tenant improvement requirements.',
  },
  'power-distribution-systems': {
    intro:
      'Commercial power distribution systems built to move power safely across offices, retail spaces, restaurants, warehouses, and mixed-use facilities.',
    description:
      'Our electricians review loads, panel locations, feeder routes, equipment demands, and code requirements before installing distribution that keeps critical areas powered and easy to service.',
  },
  'dedicated-circuits': {
    intro:
      'Dedicated commercial circuits for equipment, appliances, workstations, POS systems, servers, signage, and other business-critical loads.',
    description:
      'We separate high-demand devices onto properly sized circuits to reduce nuisance tripping, improve safety, and give your business a cleaner electrical setup for daily operations.',
  },
  'equipment-power-connections': {
    intro:
      'Equipment power connections for commercial appliances, machinery, HVAC equipment, kitchen systems, and specialty business tools that need dependable dedicated power.',
    description:
      'We verify voltage, amperage, wiring terminations, disconnects, grounding, circuit protection, and manufacturer requirements before making final connections so equipment can operate safely and pass inspection.',
  },
  'led-retrofits': {
    intro:
      'LED retrofit services that help commercial properties improve brightness, reduce energy use, and modernize outdated lighting.',
    description:
      'We replace inefficient fixtures and lamps with cleaner LED solutions for offices, retail areas, warehouses, and common spaces while keeping light levels, controls, and fixture placement practical for the building.',
  },
  'parking-lot-lighting': {
    intro:
      'Parking lot lighting services for safer entrances, drive lanes, storefronts, walkways, and exterior customer areas after dark.',
    description:
      'Our team supports pole light upgrades, fixture replacement, exterior circuit troubleshooting, controls, and power needs so commercial properties stay visible, welcoming, and easier to navigate at night.',
  },
  'warehouse-lighting': {
    intro:
      'Warehouse lighting designed for visibility, safety, productivity, and efficient coverage across open work areas, aisles, and loading zones.',
    description:
      'We help upgrade or install high-output lighting layouts that support inventory handling, equipment movement, and daily operations while keeping fixtures and circuits serviceable.',
  },
  'emergency-lighting': {
    intro:
      'Emergency lighting installation and replacement for commercial buildings that need code-compliant egress visibility during outages.',
    description:
      'We install and service emergency lights and exit-related lighting with attention to placement, backup power, testing access, and inspection requirements for safer commercial spaces.',
  },
};

const EV_SERVICE_COPY = {
  'tesla-charger-installation': {
    intro:
      'Tesla charger installation for homeowners who want a clean wall-mounted charging setup installed with proper wiring, protection, and testing.',
    description:
      'Our electricians review panel capacity, charger placement, wiring route, conduit needs, breaker sizing, and Tesla installation requirements so the finished charger is safe, neat, and ready for daily home charging.',
  },
  'level-2-charger-installation': {
    intro:
      'Level 2 charger installation for faster home charging using a properly sized circuit and a professional garage or exterior wall setup.',
    description:
      'We confirm available electrical capacity, install the required wiring, connect the charger hardware, and test the system so your EV can charge reliably without stressing existing household circuits.',
  },
  'home-charging-station-setup': {
    intro:
      'Home charging station setup for garages, driveways, and residential parking areas where the charger, cable management, and electrical layout all need to work together.',
    description:
      'Our team plans charger placement, wall mounting, wiring path, protection, labeling, and final testing so the charging station looks organized and works smoothly for everyday use.',
  },
  'circuit-installation': {
    intro:
      'Dedicated EV charger circuit installation focused on load capacity, breaker selection, wiring, and safe power delivery to the charging equipment.',
    description:
      'We size the breaker and conductors for the charger load, verify panel capacity, route the circuit professionally, and test the completed work so the EV charger has stable, inspection-ready power.',
  },
  'permit-assistance': {
    intro:
      'Permit assistance for EV charger projects that need documentation, code review, panel capacity details, and inspection support before final approval.',
    description:
      'Our team helps organize the electrical scope, circuit sizing, load details, compliance notes, and inspection preparation so the EV charger installation can move forward with fewer permit delays.',
  },
};

const SAFETY_SERVICE_COPY = {
  'electrical-safety-inspections': {
    intro:
      'Electrical safety inspections help identify wiring hazards, outdated protection, overloaded circuits, grounding issues, and code concerns before they become expensive or dangerous problems.',
    description:
      'Our electricians review visible electrical components, protection devices, panels, grounding, GFCI/AFCI needs, and safety risks, then explain practical upgrade recommendations in clear terms.',
  },
  'gfci-installation': {
    intro:
      'GFCI installation adds important shock protection in kitchens, bathrooms, garages, laundry areas, outdoor spaces, and other moisture-prone locations.',
    description:
      'We install and test GFCI protection where required so outlets respond properly to ground faults and help improve safety for people using the space.',
  },
  'afci-installation': {
    intro:
      'AFCI installation helps protect living areas from dangerous arc faults caused by damaged wiring, loose connections, or failing electrical devices.',
    description:
      'Our team installs AFCI protection with attention to panel compatibility, circuit behavior, and code requirements so the system is safer and easier to inspect.',
  },
  'surge-protection': {
    intro:
      'Surge protection helps defend sensitive electronics, appliances, and electrical systems from voltage spikes caused by utility events, storms, or equipment cycling.',
    description:
      'We review panel conditions and install suitable surge protection so the property has a stronger first line of defense against damaging electrical surges.',
  },
  'grounding-improvements': {
    intro:
      'Grounding improvements support safer fault clearing, better equipment protection, and a more reliable electrical system.',
    description:
      'We inspect grounding and bonding conditions, identify weak points, and complete code-conscious improvements that help the electrical system respond safely during faults.',
  },
};

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
        const hero =
          SERVICE_DETAIL_IMAGE_OVERRIDES[`${groupId}:${slug}`] ??
          SERVICE_DETAIL_STOCK_POOL[heroIndex % SERVICE_DETAIL_STOCK_POOL.length];
        if (!SERVICE_DETAIL_IMAGE_OVERRIDES[`${groupId}:${slug}`]) {
          heroIndex += 1;
        }

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
  if (groupId === 'commercial') {
    const customIntro = COMMERCIAL_SERVICE_COPY[slugify(title)]?.intro;
    if (customIntro) return customIntro;
  }
  if (groupId === 'ev-chargers') {
    const customIntro = EV_SERVICE_COPY[slugify(title)]?.intro;
    if (customIntro) return customIntro;
  }
  if (groupId === 'safety-upgrades') {
    const customIntro = SAFETY_SERVICE_COPY[slugify(title)]?.intro;
    if (customIntro) return customIntro;
  }

  return `${SITE.shortName} provides professional ${title.toLowerCase()} for ${GROUP_AUDIENCE[groupId]}. Our licensed electricians deliver safe, code-compliant ${category.toLowerCase()} with clear pricing, dependable scheduling, and workmanship built to pass inspection.`;
}

function buildDescription({ title, groupId }) {
  if (groupId === 'commercial') {
    const customDescription = COMMERCIAL_SERVICE_COPY[slugify(title)]?.description;
    if (customDescription) return customDescription;
  }
  if (groupId === 'ev-chargers') {
    const customDescription = EV_SERVICE_COPY[slugify(title)]?.description;
    if (customDescription) return customDescription;
  }
  if (groupId === 'safety-upgrades') {
    const customDescription = SAFETY_SERVICE_COPY[slugify(title)]?.description;
    if (customDescription) return customDescription;
  }

  const scope =
    groupId === 'ev-chargers'
      ? 'charger placement, circuit sizing, and permitting'
      : groupId === 'new-construction'
        ? 'plans, framing, load needs, wiring routes, and project schedule'
        : groupId === 'safety-upgrades'
          ? 'existing hazards, protection devices, grounding, and code requirements'
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
        video: null,
      };
    }),
  );
});

export function getServicePageBySlug(groupId, slug) {
  return SERVICE_PAGES.find((page) => page.groupId === groupId && page.slug === slug);
}

export function getCategorySlug(categoryTitle) {
  return slugify(categoryTitle);
}

export function getCategoryBySlug(groupId, categorySlug) {
  const tab = SERVICE_TABS.find((entry) => entry.id === groupId);
  if (!tab) return null;

  return tab.categories.find((category) => getCategorySlug(category.title) === categorySlug) ?? null;
}

export function getCategoryPath(groupId, categoryTitle) {
  return `/services/${groupId}/${getCategorySlug(categoryTitle)}`;
}

export function getServicesForCategory(groupId, categoryTitle) {
  return SERVICE_PAGES.filter(
    (page) => page.groupId === groupId && page.category === categoryTitle,
  );
}

export function getServicePagePath(groupId, title) {
  const page = SERVICE_PAGES.find((entry) => entry.groupId === groupId && entry.title === title);
  return page?.path ?? null;
}

export function getServicesByGroup(groupId) {
  return SERVICE_PAGES.filter((page) => page.groupId === groupId);
}

export function getServicePageMeta(pathname) {
  const categoryMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (categoryMatch) {
    const tab = SERVICE_TABS.find((entry) => entry.id === categoryMatch[1]);
    if (!tab) return null;

    return {
      title: tab.title,
      description: `${SITE.name} — ${tab.title} for ${GROUP_AUDIENCE[tab.id]}. Explore service options, featured images, and code-compliant electrical solutions.`,
    };
  }

  const match = pathname.match(/^\/services\/([^/]+)\/([^/]+)$/);
  if (!match) return null;

  const page = getServicePageBySlug(match[1], match[2]);
  if (page) {
    return {
      title: page.title,
      description: `${SITE.name} — ${page.title} for ${page.groupLabel.toLowerCase()} clients. Licensed, code-compliant electrical work with upfront pricing.`,
    };
  }

  const category = getCategoryBySlug(match[1], match[2]);
  if (category) {
    const tab = SERVICE_TABS.find((entry) => entry.id === match[1]);
    if (!tab) return null;

    return {
      title: category.title,
      description: `${SITE.name} — ${category.title} under ${tab.title}. Browse available services and request a free quote.`,
    };
  }

  return null;
}
