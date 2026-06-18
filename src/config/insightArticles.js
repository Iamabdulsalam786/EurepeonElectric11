import { CLIENT_IMAGES, STOCK_IMAGES } from './media';
import { SITE } from './site';

export const INSIGHT_ARTICLES = [
  {
    slug: 'panel-upgrade-signs',
    path: '/insights/panel-upgrade-signs',
    title: '5 Signs You Need a Panel Upgrade',
    category: 'Electrical Safety',
    author: SITE.shortName,
    image: CLIENT_IMAGES.residentialPanel,
    imagePosition: 'center',
    excerpt:
      'Flickering lights, tripping breakers, and outdated panels are warning signs that your home may need a licensed upgrade.',
    intro:
      'Your electrical panel is the heart of your home power system. When it is undersized, damaged, or outdated, everyday loads can become safety risks — not just inconveniences.',
    sections: [
      {
        heading: '1. Breakers trip frequently',
        body:
          'Occasional trips happen, but repeated breaker trips often mean the panel cannot safely support your current load. Modern kitchens, HVAC, EV chargers, and workshops all draw more power than older panels were designed for.',
      },
      {
        heading: '2. Flickering or dimming lights',
        body:
          'Lights that dim when appliances start may indicate loose connections, failing breakers, or insufficient service capacity. A licensed electrician can test the panel and service entrance before problems worsen.',
      },
      {
        heading: '3. Fuse box or obsolete panel brand',
        body:
          'Fuse boxes and certain legacy panel models may not meet today’s safety expectations. Upgrading to a modern breaker panel improves protection, labeling, and room for future circuits.',
      },
      {
        heading: '4. Burning smell, warmth, or scorch marks',
        body:
          'Any burning odor, buzzing, or discoloration around the panel is urgent. Turn off affected circuits if safe to do so and call a licensed electrician immediately.',
      },
      {
        heading: '5. You are adding major new loads',
        body:
          'Planning an EV charger, heat pump, workshop, or home addition? A panel and service upgrade review should happen before installation — not after permits fail or breakers keep tripping.',
      },
    ],
    takeaways: [
      'Schedule a licensed panel assessment before major appliance or EV installs',
      'Ask for a written scope covering panel, service entrance, and grounding',
      'Coordinate permits and inspections with your electrician',
      'Upgrade proactively — not after repeated failures',
    ],
    relatedServicePath: '/services/residential/main-panel-replacement',
    relatedServiceLabel: 'Panel replacement services',
    secondaryImages: [CLIENT_IMAGES.panelElectrical, CLIENT_IMAGES.newConstruction],
  },
  {
    slug: 'home-ev-charger-planning',
    path: '/insights/home-ev-charger-planning',
    title: 'Planning a Home EV Charger Install',
    category: 'EV Charging',
    author: SITE.shortName,
    image: STOCK_IMAGES.insightEv,
    imagePosition: 'center top',
    excerpt:
      'Learn what to expect with circuit sizing, panel capacity, and permit-ready Level 2 or Tesla charger installation at home.',
    intro:
      'A reliable home EV charger starts with the right electrical foundation — not just mounting hardware on the wall. Here is how European Electric approaches Level 2 and Tesla-ready installs from quote to inspection.',
    sections: [
      {
        heading: 'Confirm panel capacity first',
        body:
          'Your electrician should verify available amperage, breaker spaces, and load calculations before choosing a charger circuit. A 40A or 48A Level 2 circuit may require a panel upgrade or load management device.',
      },
      {
        heading: 'Choose the right charger location',
        body:
          'Mounting location affects conduit run length, weather exposure for outdoor-rated gear, and daily convenience. We review garage layout, parking position, and manufacturer clearance requirements.',
      },
      {
        heading: 'Dedicated circuit and proper wire sizing',
        body:
          'EV chargers need a dedicated circuit with correct wire gauge, breaker pairing, and grounding. Code-compliant installation protects your vehicle, home, and inspection outcome.',
      },
      {
        heading: 'Permits and inspections',
        body:
          'Most jurisdictions require permits for new EV circuits. We handle permit paperwork where applicable and leave a clean installation ready for inspection.',
      },
      {
        heading: 'What to expect on install day',
        body:
          'A typical install includes routing conduit, pulling conductors, mounting the charger, testing voltage and ground, and walking you through app setup and breaker labeling.',
      },
    ],
    takeaways: [
      'Get panel capacity reviewed before buying hardware',
      'Use a licensed installer for dedicated EV circuits',
      'Plan conduit paths early in garage or carport layouts',
      'Keep manufacturer specs handy for your vehicle and charger model',
    ],
    relatedServicePath: '/services/ev-chargers/level-2-charger-installation',
    relatedServiceLabel: 'Level 2 charger installation',
    secondaryImages: [CLIENT_IMAGES.panelElectrical, CLIENT_IMAGES.remodelWiring],
  },
  {
    slug: 'commercial-lighting-energy',
    path: '/insights/commercial-lighting-energy',
    title: 'Commercial Lighting That Saves Energy',
    category: 'Commercial',
    author: SITE.shortName,
    image: CLIENT_IMAGES.lightingOutdoor,
    imagePosition: 'center',
    excerpt:
      'LED retrofits, warehouse lighting, and emergency lighting upgrades help businesses lower energy costs and stay compliant.',
    intro:
      'Lighting is one of the fastest commercial upgrades to cut operating cost — when it is planned with the right fixtures, controls, and code compliance in mind.',
    sections: [
      {
        heading: 'LED retrofits with proper light levels',
        body:
          'Replacing legacy fixtures is not a one-to-one swap. We evaluate foot-candle targets, color temperature, and glare so staff get safer, more comfortable workspaces — not just lower bills.',
      },
      {
        heading: 'Warehouse and high-bay applications',
        body:
          'High ceilings and long run times make warehouses ideal for efficient lighting. Correct mounting height, optic selection, and maintenance access matter as much as wattage savings.',
      },
      {
        heading: 'Parking lot and exterior security lighting',
        body:
          'Outdoor commercial lighting improves safety and visibility. We install weather-rated fixtures, photocells, and timers that balance security with energy use.',
      },
      {
        heading: 'Emergency and exit lighting compliance',
        body:
          'Commercial properties must maintain working emergency egress lighting. We test, replace, and document systems so you are prepared for inspections and audits.',
      },
      {
        heading: 'Phased upgrades to limit downtime',
        body:
          'For active businesses, we stage lighting upgrades by zone or after hours to reduce disruption while still delivering measurable savings.',
      },
    ],
    takeaways: [
      'Audit existing fixtures before ordering replacements',
      'Combine LED upgrades with occupancy or daylight controls where practical',
      'Include emergency lighting in every commercial maintenance plan',
      'Request itemized savings and scope in your written estimate',
    ],
    relatedServicePath: '/#services-commercial',
    relatedServiceLabel: 'Commercial lighting services',
    secondaryImages: [CLIENT_IMAGES.lightingIndoor, CLIENT_IMAGES.commercialLighting],
  },
];

export function getInsightBySlug(slug) {
  return INSIGHT_ARTICLES.find((article) => article.slug === slug);
}

export function getInsightPageMeta(pathname) {
  const match = pathname.match(/^\/insights\/([^/]+)$/);
  if (!match) return null;

  const article = getInsightBySlug(match[1]);
  if (!article) return null;

  return {
    title: article.title,
    description: `${SITE.shortName} — ${article.excerpt}`,
  };
}
