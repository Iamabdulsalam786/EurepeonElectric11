export const SERVICE_GROUP_NAV = [
  { id: 'residential', label: 'Residential', tabId: 'residential' },
  { id: 'commercial', label: 'Commercial', tabId: 'commercial' },
  { id: 'new-construction', label: 'Construction & Remodeling', tabId: 'new-construction' },
  {
    id: 'other-services',
    label: 'Other Services',
    tabIds: ['ev-chargers', 'lighting-solutions', 'safety-upgrades', 'panel-upgrades'],
  },
];

export const MAIN_NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  ...SERVICE_GROUP_NAV.map((group) => ({ ...group, type: 'service-group' })),
  { label: 'Contact', to: '/#contact' },
];

export const FOOTER_NAV = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Get a Quote', to: '/appointment' },
  { label: 'Contact', to: '/#contact' },
];
