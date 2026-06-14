/** Business-owned photos and videos — RelevantPics folder */
export const RELEVANT_PICS = {
  commercialConduit: '/assets/images/RelevantPics/1.jpeg',
  commercialPanels: '/assets/images/RelevantPics/2.jpeg',
  electricianAtPanel: '/assets/images/RelevantPics/3.jpeg',
  commercialSwitchgear: '/assets/images/RelevantPics/4.jpe',
};

export const RELEVANT_VIDEOS = {
  fieldWork: '/assets/images/RelevantPics/video1.mp4',
  projectShowcase: '/assets/images/RelevantPics/video2.mp4',
};

/** Category-level images for nav + homepage services */
export const CATEGORY_IMAGES = {
  residential: {
    installations: RELEVANT_PICS.electricianAtPanel,
    rewiring: RELEVANT_PICS.electricianAtPanel,
    panels: RELEVANT_PICS.commercialPanels,
    default: RELEVANT_PICS.electricianAtPanel,
  },
  commercial: {
    tenant: RELEVANT_PICS.commercialConduit,
    power: RELEVANT_PICS.commercialPanels,
    lighting: RELEVANT_PICS.commercialConduit,
    default: RELEVANT_PICS.commercialConduit,
  },
  ev: {
    charging: '/assets/images/service/ev-charging.jpg',
    default: '/assets/images/service/ev-charging.jpg',
  },
  lighting: {
    indoor: RELEVANT_PICS.electricianAtPanel,
    outdoor: RELEVANT_PICS.commercialConduit,
    default: RELEVANT_PICS.electricianAtPanel,
  },
  panels: {
    electrical: RELEVANT_PICS.commercialPanels,
    service: RELEVANT_PICS.electricianAtPanel,
    default: RELEVANT_PICS.commercialPanels,
  },
};

/** Hero + section featured imagery */
export const SECTION_MEDIA = {
  heroResidential: RELEVANT_PICS.electricianAtPanel,
  heroCommercial: RELEVANT_PICS.commercialConduit,
  heroProjects: RELEVANT_PICS.commercialPanels,
  aboutPrimary: RELEVANT_PICS.electricianAtPanel,
  aboutSecondary: RELEVANT_PICS.commercialPanels,
  chooseUsPhoto: RELEVANT_PICS.electricianAtPanel,
  chooseUsVideo: RELEVANT_VIDEOS.fieldWork,
  workShowcaseVideo: RELEVANT_VIDEOS.projectShowcase,
  workShowcasePoster: RELEVANT_PICS.commercialConduit,
  pageTitle: RELEVANT_PICS.commercialConduit,
};
