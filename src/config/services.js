/** Homepage showcase cards — summary copy for the 3-card layout */
export const SERVICE_CARD_META = {
  residential: {
    cardTitle: 'Residential Electrical',
    description: 'Repairs, installations and rewiring for homes — done safely and to code.',
    highlights: [
      'Repairs & troubleshooting',
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
    description: 'Certified Tesla & Level 2 chargers for homes, businesses and fleets.',
    highlights: ['Tesla & Level 2 chargers', 'Fleet & commercial sites', 'Diagnostics & repairs'],
  },
};

/** Exact production copy — do not paraphrase item text */
export const SERVICE_TABS = [
  {
    id: 'residential',
    tabLabel: 'Residential Services',
    title: 'Residential Electrical Services',
    image: '/assets/images/service/service-1.jpg',
    link: '/services',
    categories: [
      {
        title: 'Electrical Repairs',
        items: [
          'Troubleshoot power outages',
          'Fix faulty outlets',
          'Repair circuit breakers',
          'Resolve flickering lights',
          'Diagnose electrical faults',
          'Repair damaged wiring',
        ],
      },
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
          'Electrical capacity upgrades',
        ],
      },
    ],
  },
  {
    id: 'commercial',
    tabLabel: 'Commercial Services',
    title: 'Commercial Electrical Services',
    image: '/assets/images/service/service-3.jpg',
    link: '/services',
    categories: [
      {
        title: 'Tenant Improvements',
        items: [
          'Office build-outs',
          'Retail space wiring',
          'Restaurant electrical installations',
          'Commercial remodeling',
          'Workspace electrical upgrades',
        ],
      },
      {
        title: 'Commercial Power Systems',
        items: [
          'Panel installations',
          'Power distribution systems',
          'Dedicated circuits',
          'Equipment power connections',
          'Electrical load balancing',
        ],
      },
      {
        title: 'Commercial Lighting',
        items: [
          'LED retrofits',
          'Parking lot lighting',
          'Warehouse lighting',
          'Emergency lighting',
          'Exit sign installation',
        ],
      },
      {
        title: 'Maintenance & Repairs',
        items: [
          'Preventive maintenance',
          'Emergency repairs',
          'Electrical inspections',
          'System troubleshooting',
          'Equipment diagnostics',
        ],
      },
    ],
  },
  {
    id: 'ev-chargers',
    tabLabel: 'EV Charger Installation',
    title: 'EV Charger Installation',
    image: '/assets/images/service/service-4.jpg',
    link: '/services',
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
      {
        title: 'Commercial EV Charging',
        items: [
          'Fleet charging stations',
          'Apartment complex charging',
          'Workplace charging solutions',
          'Public charging stations',
          'Charging infrastructure planning',
        ],
      },
      {
        title: 'EV Charger Maintenance',
        items: [
          'Charger diagnostics',
          'Charger repairs',
          'Software updates',
          'System upgrades',
        ],
      },
    ],
  },
];

/**
 * Sections 4–8 of the full company menu — used on /services and extended pages.
 * Homepage tabs (SERVICE_TABS) intentionally cover sections 1–3 only.
 */
export const EXTENDED_SERVICE_MENU = [
  {
    id: 'lighting-solutions',
    title: 'Lighting Solutions',
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
      {
        title: 'Smart Lighting',
        items: [
          'Automated lighting systems',
          'Smart switches',
          'Remote lighting controls',
          'Lighting scheduling',
        ],
      },
    ],
  },
  {
    id: 'panel-upgrades',
    title: 'Panel Upgrades & Electrical Service',
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
    id: 'safety-inspections',
    title: 'Electrical Safety & Inspections',
    categories: [
      {
        title: 'Safety Inspections',
        items: [
          'Home electrical inspections',
          'Commercial inspections',
          'Pre-purchase inspections',
          'Code compliance inspections',
        ],
      },
      {
        title: 'Safety Upgrades',
        items: ['GFCI installation', 'AFCI installation', 'Surge protection', 'Grounding improvements'],
      },
      {
        title: 'Compliance Services',
        items: ['Permit inspections', 'Electrical code corrections', 'Safety certifications'],
      },
    ],
  },
  {
    id: 'emergency-electrical',
    title: 'Emergency Electrical Services',
    categories: [
      {
        title: 'Emergency Repairs',
        items: [
          'Power outage diagnosis',
          'Burning smell investigations',
          'Electrical fire damage repair',
          'Emergency breaker replacement',
        ],
      },
      {
        title: 'Urgent Troubleshooting',
        items: [
          'Fault finding',
          'Short circuit diagnosis',
          'Tripped breaker investigation',
          'Electrical hazard mitigation',
        ],
      },
      {
        title: '24/7 Service Calls',
        items: ['Residential emergencies', 'Commercial emergencies', 'Storm damage repairs'],
      },
    ],
  },
  {
    id: 'new-construction',
    title: 'New Construction & Remodeling',
    categories: [
      {
        title: 'New Construction',
        items: [
          'Complete electrical system design',
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
      {
        title: 'Final Connections',
        items: ['Appliance connections', 'Fixture installations', 'Final electrical inspections'],
      },
    ],
  },
];
