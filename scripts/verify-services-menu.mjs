/**
 * Verifies SERVICE_TABS matches the production menu spec (sections 1–3 on homepage tabs).
 * Run: node scripts/verify-services-menu.mjs
 */
import { SERVICE_TABS } from '../src/config/services.js';

const SPEC = {
  residential: {
    title: 'Residential Electrical Services',
    categories: {
      'Electrical Repairs': [
        'Troubleshoot power outages',
        'Fix faulty outlets',
        'Repair circuit breakers',
        'Resolve flickering lights',
        'Diagnose electrical faults',
        'Repair damaged wiring',
      ],
      'Electrical Installations': [
        'Install outlets and switches',
        'Install ceiling fans',
        'Install lighting fixtures',
        'Install dimmer switches',
        'Install smoke detectors',
        'Install carbon monoxide detectors',
      ],
      'Home Rewiring': [
        'Whole-house rewiring',
        'Partial rewiring',
        'Knob-and-tube replacement',
        'Aluminum wiring replacement',
        'Code compliance upgrades',
      ],
      'Panel & Service Upgrades': [
        'Main panel replacement',
        'Service entrance upgrades',
        'Circuit breaker replacement',
        'Subpanel installation',
        'Electrical capacity upgrades',
      ],
    },
  },
  commercial: {
    title: 'Commercial Electrical Services',
    categories: {
      'Tenant Improvements': [
        'Office build-outs',
        'Retail space wiring',
        'Restaurant electrical installations',
        'Commercial remodeling',
        'Workspace electrical upgrades',
      ],
      'Commercial Power Systems': [
        'Panel installations',
        'Power distribution systems',
        'Dedicated circuits',
        'Equipment power connections',
        'Electrical load balancing',
      ],
      'Commercial Lighting': [
        'LED retrofits',
        'Parking lot lighting',
        'Warehouse lighting',
        'Emergency lighting',
        'Exit sign installation',
      ],
      'Maintenance & Repairs': [
        'Preventive maintenance',
        'Emergency repairs',
        'Electrical inspections',
        'System troubleshooting',
        'Equipment diagnostics',
      ],
    },
  },
  'ev-chargers': {
    title: 'EV Charger Installation',
    categories: {
      'Residential EV Charging': [
        'Tesla charger installation',
        'Level 2 charger installation',
        'Home charging station setup',
        'Circuit installation',
        'Permit assistance',
      ],
      'Commercial EV Charging': [
        'Fleet charging stations',
        'Apartment complex charging',
        'Workplace charging solutions',
        'Public charging stations',
        'Charging infrastructure planning',
      ],
      'EV Charger Maintenance': [
        'Charger diagnostics',
        'Charger repairs',
        'Software updates',
        'System upgrades',
      ],
    },
  },
};

let failed = false;

for (const tab of SERVICE_TABS) {
  const spec = SPEC[tab.id];
  if (!spec) {
    console.error(`✗ Unknown tab id: ${tab.id}`);
    failed = true;
    continue;
  }

  if (tab.title !== spec.title) {
    console.error(`✗ [${tab.id}] title mismatch: "${tab.title}" vs "${spec.title}"`);
    failed = true;
  }

  const specCats = Object.keys(spec.categories);
  const actualCats = tab.categories.map((c) => c.title);

  for (const name of specCats) {
    if (!actualCats.includes(name)) {
      console.error(`✗ [${tab.id}] missing category: ${name}`);
      failed = true;
    }
  }

  for (const cat of tab.categories) {
    const expected = spec.categories[cat.title];
    if (!expected) {
      console.error(`✗ [${tab.id}] unexpected category: ${cat.title}`);
      failed = true;
      continue;
    }
    for (const item of expected) {
      if (!cat.items.includes(item)) {
        console.error(`✗ [${tab.id} › ${cat.title}] missing item: ${item}`);
        failed = true;
      }
    }
    for (const item of cat.items) {
      if (!expected.includes(item)) {
        console.error(`✗ [${tab.id} › ${cat.title}] extra/wrong item: ${item}`);
        failed = true;
      }
    }
  }
}

if (failed) {
  console.error('\nService menu verification FAILED.');
  process.exit(1);
}

console.log('✓ All homepage tab services (Residential, Commercial, EV) match the production menu spec.');
console.log(`  Residential: ${SERVICE_TABS[0].categories.length} categories, ${SERVICE_TABS[0].categories.reduce((n, c) => n + c.items.length, 0)} items`);
console.log(`  Commercial:  ${SERVICE_TABS[1].categories.length} categories, ${SERVICE_TABS[1].categories.reduce((n, c) => n + c.items.length, 0)} items`);
console.log(`  EV Chargers: ${SERVICE_TABS[2].categories.length} categories, ${SERVICE_TABS[2].categories.reduce((n, c) => n + c.items.length, 0)} items`);
