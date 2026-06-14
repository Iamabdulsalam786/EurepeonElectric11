import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE } from '../config/site';
import { MAIN_NAV } from '../config/navigation';
import BrandLogo from './BrandLogo';
import MobileServiceGroupNav from './MobileServiceGroupNav';
import { closeMobileMenu } from '../utils/mobileMenu';

export default function MobileMenu() {
  const location = useLocation();

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, location.hash]);

  return (
    <div className="mobile-menu mobile-menu--premium">
      <div
        className="menu-backdrop"
        aria-hidden="true"
        onClick={closeMobileMenu}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') closeMobileMenu();
        }}
        role="presentation"
      ></div>
      <button type="button" className="close-btn" aria-label="Close menu" onClick={closeMobileMenu}>
        <i className="fas fa-times" aria-hidden="true"></i>
      </button>

      <nav className="menu-box" aria-label="Mobile">
        <div className="mobile-menu__header">
          <div className="nav-logo">
            <BrandLogo />
          </div>
        </div>

        <div className="mobile-menu__body">
          <p className="mobile-menu__label">Menu</p>
          <ul className="mobile-nav-list" data-react-mobile-nav="true" data-react-nav="true">
            {MAIN_NAV.map((item) =>
              item.type === 'service-group' ? (
                <MobileServiceGroupNav
                  key={item.id}
                  tabId={item.tabId}
                  label={item.label}
                  onNavigate={closeMobileMenu}
                />
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `mobile-nav-link${isActive && !item.to.includes('#') ? ' is-active' : ''}`
                    }
                    onClick={closeMobileMenu}
                  >
                    <span>{item.label}</span>
                    <i className="fas fa-chevron-right" aria-hidden="true"></i>
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <div className="mobile-menu-cta">
            <Link to="/appointment" className="theme-btn btn-one" onClick={closeMobileMenu}>
              {SITE.cta.primary}
            </Link>
          </div>

          <div className="mobile-menu__contact contact-info">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <span>{SITE.address}</span>
              </li>
              <li>
                <i className="fas fa-phone" aria-hidden="true"></i>
                <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
              </li>
              <li>
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <i className="fas fa-clock" aria-hidden="true"></i>
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
