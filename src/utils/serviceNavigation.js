/** Service links: /services/:groupId for category pages, #services for the full homepage section */
const SERVICE_HASH_PREFIX = 'services';

export function getServiceNavHref(tabId) {
  return tabId ? `/services/${tabId}` : `/#${SERVICE_HASH_PREFIX}`;
}

export function parseServiceHash(hash = '') {
  const raw = hash.replace(/^#/, '');
  if (!raw || raw === SERVICE_HASH_PREFIX) {
    return { sectionId: SERVICE_HASH_PREFIX, tabId: null };
  }
  const match = raw.match(/^services-(.+)$/);
  if (match) {
    return { sectionId: SERVICE_HASH_PREFIX, tabId: match[1] };
  }
  return { sectionId: raw, tabId: null };
}

export function scrollToServicesSection(behavior = 'smooth') {
  scrollToAnchor(SERVICE_HASH_PREFIX, behavior);
}

const SCROLL_ANCHOR_OFFSET = 96;

export function scrollToAnchor(sectionId, behavior = 'smooth') {
  const el = document.getElementById(sectionId);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_ANCHOR_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}
