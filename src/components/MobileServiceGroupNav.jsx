import { useCallback, useId, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICE_TABS } from '../config/services';
import { getServicePagePath } from '../config/servicePages';
import { getServiceNavHref, parseServiceHash, scrollToServicesSection } from '../utils/serviceNavigation';
import { parseInternalHref } from '../utils/mobileMenu';

export default function MobileServiceGroupNav({ tabId, label, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuId = useId();
  const [open, setOpen] = useState(false);

  const tab = SERVICE_TABS.find((entry) => entry.id === tabId);
  const isGroupActive =
    location.pathname.startsWith(`/services/${tabId}/`) ||
    (location.pathname === '/' &&
      (location.hash === `#services-${tabId}` || location.hash === '#services'));

  const scrollToServiceTarget = useCallback((hash) => {
    const { sectionId } = parseServiceHash(hash);
    if (sectionId !== 'services') return;

    const attemptScroll = () => scrollToServicesSection();
    attemptScroll();
    window.setTimeout(attemptScroll, 120);
    window.setTimeout(attemptScroll, 450);
  }, []);

  const goToAllServices = useCallback(() => {
    const target = parseInternalHref(getServiceNavHref(tabId));
    if (!target) return;

    const sameRoute = location.pathname === target.pathname && location.hash === target.hash;
    onNavigate?.();

    if (sameRoute) {
      scrollToServiceTarget(target.hash);
      return;
    }

    navigate(target);
    window.setTimeout(() => scrollToServiceTarget(target.hash), 300);
    window.setTimeout(() => scrollToServiceTarget(target.hash), 800);
    window.setTimeout(() => scrollToServiceTarget(target.hash), 1400);
  }, [navigate, onNavigate, location.pathname, location.hash, scrollToServiceTarget, tabId]);

  const goToServicePage = useCallback(
    (title) => {
      const path = getServicePagePath(tabId, title);
      if (!path) return;
      onNavigate?.();
      navigate(path);
    },
    [navigate, onNavigate, tabId],
  );

  if (!tab) return null;

  return (
    <li
      className={`mobile-nav-item mobile-nav-item--services${open ? ' is-open' : ''}`}
      data-react-nav="true"
    >
      <button
        type="button"
        className={`mobile-nav-link mobile-nav-link--toggle${isGroupActive ? ' is-active' : ''}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{label}</span>
        <i className={`fas fa-chevron-right mobile-nav-caret${open ? ' is-open' : ''}`} aria-hidden="true" />
      </button>

      <ul id={menuId} className="mobile-nav-sublist" hidden={!open}>
        <li>
          <button
            type="button"
            className={`mobile-nav-sublink${
              location.pathname === '/' &&
              (location.hash === `#services-${tabId}` || location.hash === '#services')
                ? ' is-active'
                : ''
            }`}
            onClick={goToAllServices}
          >
            All {label} Services
          </button>
        </li>

        {tab.categories.map((category) => (
          <li key={category.title} className="mobile-nav-group">
            <span className="mobile-nav-group__label">{category.title}</span>
            <ul className="mobile-nav-group__items">
              {category.items.map((item) => {
                const itemPath = getServicePagePath(tabId, item);
                const isItemActive = itemPath && location.pathname === itemPath;

                return (
                  <li key={item}>
                    <button
                      type="button"
                      className={`mobile-nav-sublink mobile-nav-sublink--leaf${isItemActive ? ' is-active' : ''}`}
                      onClick={() => goToServicePage(item)}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  );
}
