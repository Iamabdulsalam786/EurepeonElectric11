import { SERVICE_TABS } from './services';

export const SERVICE_NAV_ITEMS = SERVICE_TABS.map((tab) => ({
  id: tab.id,
  label: tab.shortLabel ?? tab.tabLabel,
}));

export const MAIN_NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/#services', type: 'services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/#contact' },
];

export const FOOTER_NAV = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Get a Quote', to: '/appointment' },
  { label: 'Contact', to: '/#contact' },
];
