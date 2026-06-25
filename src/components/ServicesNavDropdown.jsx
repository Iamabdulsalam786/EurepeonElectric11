import { Fragment, useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICE_TABS } from '../config/services';
import { getServicePagePath } from '../config/servicePages';
import {
  getServiceNavHref,
  parseServiceHash,
  scrollToServicesSection,
} from '../utils/serviceNavigation';
import { parseInternalHref } from '../utils/mobileMenu';

export default function ServicesNavDropdown({ tabId, tabIds, label, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuId = useId();
  const rootRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const groupTabIds = tabIds?.length ? tabIds : [tabId];
  const tabs = groupTabIds
    .map((entryId) => SERVICE_TABS.find((entry) => entry.id === entryId))
    .filter(Boolean);
  const primaryTabId = groupTabIds[0];
  const isGrouped = tabs.length > 1;
  const isGroupActive =
    groupTabIds.some((entryId) => location.pathname.startsWith(`/services/${entryId}/`)) ||
    (location.pathname === '/' &&
      (groupTabIds.some((entryId) => location.hash === `#services-${entryId}`) ||
        location.hash === '#services'));

  const openDropdown = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  }, []);

  const closeDropdown = useCallback(() => setOpen(false), []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 220);
  }, []);

  const handleNavigate = useCallback(() => {
    setOpen(false);
    onNavigate?.();
  }, [onNavigate]);

  const scrollToServiceTarget = useCallback((hash) => {
    const { sectionId } = parseServiceHash(hash);
    if (sectionId !== 'services') return;

    const attemptScroll = () => scrollToServicesSection();
    attemptScroll();
    window.setTimeout(attemptScroll, 120);
    window.setTimeout(attemptScroll, 450);
  }, []);

  const goToAllServices = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const target = parseInternalHref(isGrouped ? getServiceNavHref() : getServiceNavHref(primaryTabId));
      if (!target) return;

      const sameRoute = location.pathname === target.pathname && location.hash === target.hash;
      handleNavigate();

      if (sameRoute) {
        scrollToServiceTarget(target.hash);
        return;
      }

      navigate(target);
      window.setTimeout(() => scrollToServiceTarget(target.hash), 300);
      window.setTimeout(() => scrollToServiceTarget(target.hash), 800);
      window.setTimeout(() => scrollToServiceTarget(target.hash), 1400);
    },
    [navigate, handleNavigate, location.pathname, location.hash, scrollToServiceTarget, isGrouped, primaryTabId],
  );

  const goToServicePage = useCallback(
    (itemPath) => (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!itemPath) return;

      handleNavigate();
      navigate(itemPath);
    },
    [navigate, handleNavigate],
  );

  useEffect(() => {
    closeDropdown();
  }, [location.pathname, location.hash, closeDropdown]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeDropdown();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeDropdown]);

  if (!tabs.length) return null;

  return (
    <li
      ref={rootRef}
      className={`nav-item-premium nav-item-premium--dropdown${open ? ' is-open' : ''}${
        isGroupActive ? ' is-active' : ''
      }`}
      onMouseEnter={openDropdown}
      onMouseLeave={scheduleClose}
      data-react-nav="true"
    >
      <button
        type="button"
        className="nav-link-premium nav-link-premium--dropdown"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
        onFocus={openDropdown}
      >
        <span>{label}</span>
        <i className={`fas fa-chevron-down nav-dropdown-caret${open ? ' is-open' : ''}`} aria-hidden="true" />
      </button>
      <ul
        id={menuId}
        className="nav-dropdown-menu"
        role="menu"
        onMouseEnter={openDropdown}
        onMouseLeave={scheduleClose}
      >
        <li role="none">
          <a
            href={isGrouped ? getServiceNavHref() : getServiceNavHref(primaryTabId)}
            className="nav-dropdown-link nav-dropdown-link--all"
            role="menuitem"
            onClick={goToAllServices}
          >
            All {label} Services
          </a>
        </li>
        {tabs.map((entryTab) => (
          <Fragment key={entryTab.id}>
            {isGrouped && (
              <li role="presentation" className="nav-dropdown-divider">
                <span className="nav-dropdown-group__label">{entryTab.title}</span>
              </li>
            )}
            {entryTab.categories.map((category) => (
              <Fragment key={`${entryTab.id}-${category.title}`}>
                {!isGrouped && (
                  <li role="presentation" className="nav-dropdown-divider">
                    <span className="nav-dropdown-group__label">{category.title}</span>
                  </li>
                )}
                {category.items.map((item) => {
                  const itemPath = getServicePagePath(entryTab.id, item);
                  const isItemActive = itemPath && location.pathname === itemPath;

                  return (
                    <li key={`${entryTab.id}-${item}`} role="none">
                      <a
                        href={itemPath ?? '#'}
                        className={`nav-dropdown-link${isItemActive ? ' is-active' : ''}`}
                        role="menuitem"
                        onClick={goToServicePage(itemPath)}
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </ul>
    </li>
  );
}
