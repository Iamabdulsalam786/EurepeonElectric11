import { useCallback, useId, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICE_TABS } from '../config/services';
import { getServicePagePath } from '../config/servicePages';
import { getServiceNavHref, parseServiceHash, scrollToServicesSection } from '../utils/serviceNavigation';
import { parseInternalHref } from '../utils/mobileMenu';

export default function MobileServiceGroupNav({ id, tabId, tabIds, label, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuId = useId();
  const [open, setOpen] = useState(false);

  const groupTabIds = tabIds?.length ? tabIds : [tabId];
  const tabs = groupTabIds
    .map((entryId) => SERVICE_TABS.find((entry) => entry.id === entryId))
    .filter(Boolean);
  const primaryTabId = groupTabIds[0];
  const isGrouped = tabs.length > 1;
  const isGroupActive =
    groupTabIds.some(
      (entryId) =>
        location.pathname === `/services/${entryId}` ||
        location.pathname.startsWith(`/services/${entryId}/`),
    ) ||
    (location.pathname === '/' &&
      (groupTabIds.some((entryId) => location.hash === `#services-${entryId}`) ||
        location.hash === '#services'));

  const scrollToServiceTarget = useCallback((hash) => {
    const { sectionId } = parseServiceHash(hash);
    if (sectionId !== 'services') return;

    const attemptScroll = () => scrollToServicesSection();
    attemptScroll();
    window.setTimeout(attemptScroll, 120);
    window.setTimeout(attemptScroll, 450);
  }, []);

  const goToAllServices = useCallback(() => {
    // For "other-services", go to /services/other-services
    const navHref = id === 'other-services'
      ? getServiceNavHref(id)
      : (isGrouped ? getServiceNavHref() : getServiceNavHref(primaryTabId));

    const target = parseInternalHref(navHref);
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
  }, [navigate, onNavigate, location.pathname, location.hash, scrollToServiceTarget, isGrouped, primaryTabId, id]);

  const goToServicePage = useCallback(
    (entryTabId, title) => {
      const path = getServicePagePath(entryTabId, title);
      if (!path) return;
      onNavigate?.();
      navigate(path);
    },
    [navigate, onNavigate],
  );

  const goToCategoryPage = useCallback(
    (entryTabId) => {
      onNavigate?.();
      navigate(`/services/${entryTabId}`);
    },
    [navigate, onNavigate],
  );

  if (!tabs.length) return null;

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
              groupTabIds.some((entryId) => location.pathname === `/services/${entryId}`) ||
              (location.pathname === '/' &&
                (groupTabIds.some((entryId) => location.hash === `#services-${entryId}`) ||
                  location.hash === '#services'))
                ? ' is-active'
                : ''
            }`}
            onClick={goToAllServices}
          >
            All {label} Services
          </button>
        </li>

        {tabs.map((entryTab) => (
          <li key={entryTab.id} className="mobile-nav-group">
            <span className="mobile-nav-group__label">
              {isGrouped ? entryTab.title : entryTab.categories[0]?.title}
            </span>
            <ul className="mobile-nav-group__items">
              {isGrouped && (
                <li>
                  <button
                    type="button"
                    className={`mobile-nav-sublink mobile-nav-sublink--leaf${
                      location.pathname === `/services/${entryTab.id}` ? ' is-active' : ''
                    }`}
                    onClick={() => goToCategoryPage(entryTab.id)}
                  >
                    All {entryTab.shortLabel ?? entryTab.tabLabel} Services
                  </button>
                </li>
              )}
              {entryTab.categories.flatMap((category) =>
                category.items.map((item) => {
                  const itemPath = getServicePagePath(entryTab.id, item);
                  const isItemActive = itemPath && location.pathname === itemPath;

                  return (
                    <li key={`${entryTab.id}-${item}`}>
                      <button
                        type="button"
                        className={`mobile-nav-sublink mobile-nav-sublink--leaf${isItemActive ? ' is-active' : ''}`}
                        onClick={() => goToServicePage(entryTab.id, item)}
                      >
                        {item}
                      </button>
                    </li>
                  );
                }),
              )}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  );
}
