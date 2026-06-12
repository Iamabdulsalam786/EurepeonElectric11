export function openMobileMenu() {
  document.body.classList.add('mobile-menu-visible');
  document.querySelectorAll('.mobile-nav-toggler').forEach((btn) => {
    btn.setAttribute('aria-expanded', 'true');
  });
}

export function closeMobileMenu() {
  document.body.classList.remove('mobile-menu-visible');
  document.querySelectorAll('.mobile-nav-toggler').forEach((btn) => {
    btn.setAttribute('aria-expanded', 'false');
  });
}

export function parseInternalHref(href) {
  if (!href || !href.startsWith('/')) return null;

  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) {
    return { pathname: href, hash: '' };
  }

  return {
    pathname: href.slice(0, hashIndex) || '/',
    hash: href.slice(hashIndex),
  };
}
