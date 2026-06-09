import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SERVICE_NAV_ITEMS } from '../config/navigation';
import { getServiceNavHref } from '../utils/serviceNavigation';

export default function ServicesNavDropdown({ variant = 'header', onNavigate }) {
  const location = useLocation();
  const menuId = useId();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);

  const isServicesActive =
    location.pathname === '/' &&
    (location.hash === '#services' || location.hash.startsWith('#services-'));

  const closeDropdown = useCallback(() => setOpen(false), []);

  const handleNavigate = useCallback(() => {
    setOpen(false);
    onNavigate?.();
  }, [onNavigate]);

  useEffect(() => {
    closeDropdown();
  }, [location.pathname, location.hash, closeDropdown]);

  useEffect(() => {
    if (!open) return undefined;

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
  }, [open, closeDropdown]);

  if (variant === 'mobile') {
    return (
      <li className={`mobile-nav-item mobile-nav-item--services${open ? ' is-open' : ''}`}>
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
            <Link to={getServiceNavHref()} className="mobile-nav-sublink" onClick={handleNavigate}>
              All Services
            </Link>
          </li>
          {SERVICE_NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                to={getServiceNavHref(item.id)}
                className={`mobile-nav-sublink${
                  location.hash === `#services-${item.id}` ? ' is-active' : ''
                }`}
                onClick={handleNavigate}
              >
                {item.label}
              </Link>
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
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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
          <Link
            to={getServiceNavHref()}
            className="nav-dropdown-link nav-dropdown-link--all"
            role="menuitem"
            onClick={closeDropdown}
          >
            View All Services
          </Link>
        </li>
        {SERVICE_NAV_ITEMS.map((item) => (
          <li key={item.id} role="none">
            <Link
              to={getServiceNavHref(item.id)}
              className={`nav-dropdown-link${
                location.hash === `#services-${item.id}` ? ' is-active' : ''
              }`}
              role="menuitem"
              onClick={closeDropdown}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
