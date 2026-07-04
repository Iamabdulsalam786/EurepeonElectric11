/** Legacy client photos (kept for reference; not used on site cards) */
export const RELEVANT_PICS = {
  commercialConduit: '/assets/images/RelevantPics/1.jpeg',
  commercialPanels: '/assets/images/RelevantPics/2.jpeg',
  electricianAtPanel: '/assets/images/RelevantPics/3.jpeg',
  commercialSwitchgear: '/assets/images/RelevantPics/4.jpe',
};

export const RELEVANT_VIDEOS = {
  fieldWork: '/assets/images/soundless1.mp4',
  projectShowcase: '/assets/images/soundless2.mp4',
};

/**
 * Envato-licensed client images — optimized via npm run optimize-images.
 * Source: Easton/assets/images/RelevantPics/
 */
const RP = '/assets/images/RelevantPics';
const S = '/assets/images/service';
const B = '/assets/images/banner';

export const CLIENT_IMAGES = {
  residentialInstall: `${RP}/home-electrical-installation.jpg`,
  residentialRewire: `${RP}/home-rewiring.jpg`,
  residentialPanel: `${RP}/residential-panel.jpg`,
  commercialTenant: `${RP}/commercial-tenant.jpg`,
  commercialPower: `${RP}/commercial-power.jpg`,
  commercialLighting: `${RP}/commercial-lighting.jpg`,
  evCharging: `${RP}/ev-charging.jpg`,
  lightingIndoor: `${RP}/lighting-indoor.jpg`,
  lightingOutdoor: `${RP}/lighting-outdoor.jpg`,
  panelElectrical: `${RP}/panel-electrical.jpg`,
  safetyUpgrades: `${RP}/safety-upgrades.jpg`,
  newConstruction: `${RP}/new-construction.jpg`,
  remodelWiring: `${RP}/remodel-wiring.jpg`,
  heroOne: `${RP}/residential-hero-1-optimized.webp`,
  heroTwo: `${RP}/residential-hero-2-optimized.webp`,
  heroThree: `${RP}/commercial-hero-optimized.webp`,
  heroFour: `${RP}/ev-charger-hero-optimized.webp`,
};

/** Paths used by canonical HTML + React service cards */
export const STOCK_IMAGES = {
  residentialInstall: CLIENT_IMAGES.residentialInstall,
  residentialRewire: `${S}/residential-rewire.jpg`,
  residentialPanel: `${S}/residential-panel.jpg`,
  commercialTenant: `${S}/commercial-tenant.jpg`,
  commercialPower: CLIENT_IMAGES.commercialPower,
  commercialLighting: `${S}/commercial-lighting.jpg`,
  evCharging: `${S}/ev-charging.jpg`,
  lightingIndoor: `${S}/lighting-indoor.jpg`,
  lightingOutdoor: `${S}/lighting-outdoor.jpg`,
  panelElectrical: `${S}/panel-electrical.jpg`,
  panelService: `${S}/panel-service.jpg`,
  safetyUpgrades: `${S}/safety-upgrades.jpg`,
  newConstruction: `${S}/new-construction.jpg`,
  remodelWiring: `${S}/remodel-wiring.jpg`,
  insightPanel: CLIENT_IMAGES.residentialPanel,
  insightEv: `${S}/insight-ev.jpg`,
  insightLighting: CLIENT_IMAGES.commercialLighting,
  heroOne: CLIENT_IMAGES.heroOne,
  heroTwo: CLIENT_IMAGES.heroTwo,
  heroThree: CLIENT_IMAGES.heroThree,
  heroFour: CLIENT_IMAGES.heroFour,
  aboutPrimary: CLIENT_IMAGES.residentialInstall,
  aboutSecondary: CLIENT_IMAGES.commercialTenant,
  chooseUs: CLIENT_IMAGES.commercialPower,
  chooseUsAlt: CLIENT_IMAGES.lightingOutdoor,
  contactSidebar: CLIENT_IMAGES.lightingIndoor,
  featureSafety: CLIENT_IMAGES.safetyUpgrades,
  featureResidential: CLIENT_IMAGES.newConstruction,
  featurePanel: CLIENT_IMAGES.remodelWiring,
  pageTitle: CLIENT_IMAGES.commercialLighting,
};

export const CATEGORY_IMAGES = {
  residential: {
    installations: CLIENT_IMAGES.residentialInstall,
    rewiring: CLIENT_IMAGES.residentialRewire,
    panels: CLIENT_IMAGES.residentialPanel,
    default: CLIENT_IMAGES.residentialInstall,
  },
  commercial: {
    tenant: CLIENT_IMAGES.commercialTenant,
    power: CLIENT_IMAGES.commercialPower,
    lighting: CLIENT_IMAGES.commercialLighting,
    default: CLIENT_IMAGES.commercialTenant,
  },
  ev: {
    charging: CLIENT_IMAGES.evCharging,
    circuit: CLIENT_IMAGES.panelElectrical,
    default: CLIENT_IMAGES.evCharging,
  },
  lighting: {
    indoor: CLIENT_IMAGES.lightingIndoor,
    outdoor: CLIENT_IMAGES.lightingOutdoor,
    default: CLIENT_IMAGES.lightingIndoor,
  },
  panels: {
    electrical: CLIENT_IMAGES.panelElectrical,
    service: CLIENT_IMAGES.commercialPower,
    default: CLIENT_IMAGES.panelElectrical,
  },
  safety: {
    default: CLIENT_IMAGES.safetyUpgrades,
  },
  construction: {
    newBuild: CLIENT_IMAGES.newConstruction,
    remodel: CLIENT_IMAGES.remodelWiring,
    default: CLIENT_IMAGES.newConstruction,
  },
};

/** Each homepage/about slot uses a distinct client image where available */
export const SECTION_MEDIA = {
  heroSlides: [
    STOCK_IMAGES.heroOne,
    STOCK_IMAGES.heroTwo,
    STOCK_IMAGES.heroThree,
    STOCK_IMAGES.heroFour,
  ],
  aboutPrimary: CLIENT_IMAGES.residentialInstall,
  aboutSecondary: CLIENT_IMAGES.commercialTenant,
  featureSafety: CLIENT_IMAGES.safetyUpgrades,
  featureResidential: CLIENT_IMAGES.newConstruction,
  featurePanel: CLIENT_IMAGES.remodelWiring,
  chooseUsPhoto: CLIENT_IMAGES.commercialPower,
  chooseUsVideoPoster: CLIENT_IMAGES.lightingOutdoor,
  workShowcasePoster1: CLIENT_IMAGES.lightingOutdoor,
  workShowcasePoster2: CLIENT_IMAGES.evCharging,
  contactSidebar: CLIENT_IMAGES.lightingIndoor,
  insightPanel: CLIENT_IMAGES.residentialPanel,
  insightEv: CLIENT_IMAGES.evCharging,
  insightLighting: CLIENT_IMAGES.commercialLighting,
  aboutPageTitle: CLIENT_IMAGES.commercialLighting,
  aboutCardResidential: CLIENT_IMAGES.residentialRewire,
  aboutCardCommercial: CLIENT_IMAGES.commercialPower,
  aboutCardEv: CLIENT_IMAGES.evCharging,
  aboutCardPanel: CLIENT_IMAGES.residentialPanel,
  aboutCardLighting: CLIENT_IMAGES.lightingIndoor,
  aboutCardConstruction: CLIENT_IMAGES.newConstruction,
  aboutCardRemodel: CLIENT_IMAGES.remodelWiring,
  projectSlides: [
    CLIENT_IMAGES.residentialRewire,
    CLIENT_IMAGES.commercialTenant,
    CLIENT_IMAGES.panelElectrical,
  ],
  howItWorks: [
    CLIENT_IMAGES.remodelWiring,
    CLIENT_IMAGES.safetyUpgrades,
    CLIENT_IMAGES.panelElectrical,
  ],
};
