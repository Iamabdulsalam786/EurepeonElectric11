import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICE_NAV_ITEMS } from '../config/navigation';
import {
  getServiceNavHref,
  parseServiceHash,
  scrollToServicesSection,
} from '../utils/serviceNavigation';
import { parseInternalHref } from '../utils/mobileMenu';

export default function ServicesNavDropdown({ variant = 'header', onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuId = useId();
  const rootRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [open, setOpen] = useState(variant === 'mobile');

  const isServicesActive =
    location.pathname === '/' &&
    (location.hash === '#services' || location.hash.startsWith('#services-'));

  const closeDropdown = useCallback(() => setOpen(false), []);

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

  const goToService = useCallback(
    (tabId) => (event) => {
      event.preventDefault();
      event.stopPropagation();

      const target = parseInternalHref(getServiceNavHref(tabId));
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
    [navigate, handleNavigate, location.pathname, location.hash, scrollToServiceTarget],
  );

  const handleMouseEnter = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 200);
  }, []);

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
    if (!open || variant === 'mobile') return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        closeDropdown();
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeDropdown();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, closeDropdown, variant]);

  if (variant === 'mobile') {
    return (
      <li
        ref={rootRef}
        className={`mobile-nav-item mobile-nav-item--services${open ? ' is-open' : ''}`}
      >
        <button
          type="button"
          className="mobile-nav-link mobile-nav-link--toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>Services</span>
          <i className={`fas fa-chevron-down mobile-nav-caret${open ? ' is-open' : ''}`} aria-hidden="true" />
        </button>
        <ul id={menuId} className="mobile-nav-sublist" hidden={!open}>
          <li>
            <button type="button" className="mobile-nav-sublink" onClick={goToService()}>
              All Services
            </button>
          </li>
          {SERVICE_NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`mobile-nav-sublink${
                  location.hash === `#services-${item.id}` ? ' is-active' : ''
                }`}
                onClick={goToService(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li
      ref={rootRef}
      className={`nav-item-premium nav-item-premium--dropdown${open ? ' is-open' : ''}${
        isServicesActive ? ' is-active' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="nav-link-premium nav-link-premium--dropdown"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>Services</span>
        <i className={`fas fa-chevron-down nav-dropdown-caret${open ? ' is-open' : ''}`} aria-hidden="true" />
      </button>
      <ul id={menuId} className="nav-dropdown-menu" role="menu" hidden={!open}>
        <li role="none">
          <a
            href={getServiceNavHref()}
            className="nav-dropdown-link nav-dropdown-link--all"
            role="menuitem"
            onClick={goToService()}
          >
            View All Services
          </a>
        </li>
        {SERVICE_NAV_ITEMS.map((item) => (
          <li key={item.id} role="none">
            <a
              href={getServiceNavHref(item.id)}
              className={`nav-dropdown-link${
                location.hash === `#services-${item.id}` ? ' is-active' : ''
              }`}
              role="menuitem"
              onClick={goToService(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
