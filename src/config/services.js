/** Homepage showcase cards — summary copy for the 3-card layout */
export const SERVICE_CARD_META = {
  residential: {
    cardTitle: 'Residential Electrical',
    description: 'Installations, rewiring, and panel upgrades for homes — done safely and to code.',
    highlights: [
      'Outlets, lighting & detectors',
      'Whole-house rewiring',
      'Panel & service upgrades',
    ],
  },
  commercial: {
    cardTitle: 'Commercial Electrical',
    description:
      'Tenant build-outs, power systems and lighting for offices, retail and restaurants.',
    highlights: ['Tenant improvements', 'Power distribution', 'LED & emergency lighting'],
  },
  'ev-chargers': {
    cardTitle: 'EV Chargers',
    description: 'Certified Tesla and Level 2 home charging — circuit, setup, and permits.',
    highlights: [
      'Tesla & Level 2 installation',
      'Home charging station setup',
      'Circuit & permit assistance',
    ],
  },
};

/** Primary nav groups — keeps the services UI compact (3 tabs + specialty sub-nav) */
export const SERVICE_PRIMARY_NAV = [
  { id: 'residential', label: 'Residential', tabId: 'residential' },
  { id: 'commercial', label: 'Commercial', tabId: 'commercial' },
  { id: 'specialty', label: 'Specialty Services' },
];

export const SPECIALTY_SERVICE_IDS = [
  'ev-chargers',
  'lighting-solutions',
  'panel-upgrades',
  'safety-upgrades',
  'new-construction',
];

/** Exact production copy — do not paraphrase item text */
export const SERVICE_TABS = [
  {
    id: 'residential',
    tabLabel: 'Residential Services',
    shortLabel: 'Residential',
    title: 'Residential Electrical Services',
    image: '/assets/images/service/service-1.jpg',
    link: '/#services',
    categories: [
      {
        title: 'Electrical Installations',
        items: [
          'Install outlets and switches',
          'Install ceiling fans',
          'Install lighting fixtures',
          'Install dimmer switches',
          'Install smoke detectors',
          'Install carbon monoxide detectors',
        ],
      },
      {
        title: 'Home Rewiring',
        items: [
          'Whole-house rewiring',
          'Partial rewiring',
          'Knob-and-tube replacement',
          'Aluminum wiring replacement',
          'Code compliance upgrades',
        ],
      },
      {
        title: 'Panel & Service Upgrades',
        items: [
          'Main panel replacement',
          'Service entrance upgrades',
          'Circuit breaker replacement',
          'Subpanel installation',
        ],
      },
    ],
  },
  {
    id: 'commercial',
    tabLabel: 'Commercial Services',
    shortLabel: 'Commercial',
    title: 'Commercial Electrical Services',
    image: '/assets/images/service/service-3.jpg',
    link: '/#services',
    categories: [
      {
        title: 'Tenant Improvements',
        items: [
          'Office build-outs',
          'Retail space wiring',
          'Restaurant electrical installations',
        ],
      },
      {
        title: 'Commercial Power Systems',
        items: [
          'Panel installations',
          'Power distribution systems',
          'Dedicated circuits',
          'Equipment power connections',
        ],
      },
      {
        title: 'Commercial Lighting',
        items: [
          'LED retrofits',
          'Parking lot lighting',
          'Warehouse lighting',
          'Emergency lighting',
        ],
      },
    ],
  },
  {
    id: 'ev-chargers',
    tabLabel: 'EV Charger Installation',
    shortLabel: 'EV Charging',
    title: 'EV Charger Installation',
    image: '/assets/images/service/service-4.jpg',
    link: '/#services',
    categories: [
      {
        title: 'Residential EV Charging',
        items: [
          'Tesla charger installation',
          'Level 2 charger installation',
          'Home charging station setup',
          'Circuit installation',
          'Permit assistance',
        ],
      },
    ],
  },
  {
    id: 'lighting-solutions',
    tabLabel: 'Lighting Solutions',
    shortLabel: 'Lighting',
    title: 'Lighting Solutions',
    image: '/assets/images/service/service-5.jpg',
    link: '/#services',
    categories: [
      {
        title: 'Indoor Lighting',
        items: [
          'Recessed lighting',
          'Pendant lighting',
          'Chandeliers',
          'Cabinet lighting',
          'Accent lighting',
        ],
      },
      {
        title: 'Outdoor Lighting',
        items: [
          'Landscape lighting',
          'Security lighting',
          'Pathway lighting',
          'Motion sensor lights',
          'Deck and patio lighting',
        ],
      },
    ],
  },
  {
    id: 'panel-upgrades',
    tabLabel: 'Panel Upgrades',
    shortLabel: 'Panels',
    title: 'Panel Upgrades & Electrical Service',
    image: '/assets/images/service/service-6.jpg',
    link: '/#services',
    categories: [
      {
        title: 'Electrical Panels',
        items: [
          'Panel replacement',
          'Panel upgrades',
          'Subpanel installation',
          'Breaker replacement',
          'Fuse box replacement',
        ],
      },
      {
        title: 'Service Upgrades',
        items: [
          '100A to 200A upgrades',
          '200A to 400A upgrades',
          'Utility service coordination',
          'Meter upgrades',
        ],
      },
    ],
  },
  {
    id: 'safety-upgrades',
    tabLabel: 'Safety Upgrades',
    shortLabel: 'Safety',
    title: 'Electrical Safety Upgrades',
    image: '/assets/images/service/service-7.jpg',
    link: '/#services',
    categories: [
      {
        title: 'Safety Upgrades',
        items: ['GFCI installation', 'AFCI installation', 'Surge protection', 'Grounding improvements'],
      },
    ],
  },
  {
    id: 'new-construction',
    tabLabel: 'New Construction',
    shortLabel: 'Construction',
    title: 'New Construction & Remodeling',
    image: '/assets/images/service/service-8.jpg',
    link: '/#services',
    categories: [
      {
        title: 'New Construction',
        items: [
          'New home wiring',
          'New commercial building wiring',
          'Temporary construction power',
        ],
      },
      {
        title: 'Remodeling Projects',
        items: [
          'Kitchen remodel wiring',
          'Bathroom remodel wiring',
          'Room additions',
          'ADU electrical installation',
        ],
      },
    ],
  },
];

/** Sections 4–7 — same data as homepage tabs (for reference / footer links) */
export const EXTENDED_SERVICE_MENU = SERVICE_TABS.slice(3).map(({ id, title, categories }) => ({
  id,
  title,
  categories,
}));
