import { NavLink } from 'react-router-dom';
import { SITE } from '../config/site';
import { MAIN_NAV } from '../config/navigation';
import BrandLogo from './BrandLogo';
import ServicesNavDropdown from './ServicesNavDropdown';
import { openMobileMenu } from '../utils/mobileMenu';

function NavItem({ item }) {
  return (
    <li className="nav-item-premium">
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `nav-link-premium${isActive && !item.to.includes('#') ? ' is-active' : ''}`
        }
      >
        <span>{item.label}</span>
      </NavLink>
    </li>
  );
}

function MainNavigation() {
  return (
    <ul className="navigation clearfix navigation-premium">
      {MAIN_NAV.map((item) =>
        item.type === 'service-group' ? (
          <ServicesNavDropdown key={item.id} tabId={item.tabId} tabIds={item.tabIds} label={item.label} />
        ) : (
          <NavItem key={item.label} item={item} />
        ),
      )}
    </ul>
  );
}

function HeaderBar({ sticky = false }) {
  return (
    <div className={`outer-box header-bar ${sticky ? 'header-bar--sticky' : ''}`}>
      <div className="header-shell header-shell--bar">
        <div className="menu-area clearfix">
          <div className="logo-box">
            <figure className="logo">
              <BrandLogo />
            </figure>
          </div>
          <nav className="main-menu navbar-expand-md navbar-light" aria-label="Primary">
            <div
              className="collapse navbar-collapse show clearfix"
              id={sticky ? undefined : 'navbarSupportedContent'}
            >
              <MainNavigation />
            </div>
          </nav>
        </div>
        <div className="header-bar__end">
          <div className="header-bar__controls">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="header-actions__call theme-btn btn-one"
              aria-label={`Call now ${SITE.phone}`}
            >
              <span className="header-actions__call-text">Call Now</span>
              <span className="header-actions__call-icon" aria-hidden="true">
                <i className="fas fa-phone" />
              </span>
            </a>
            <button
              type="button"
              className="mobile-nav-toggler"
              aria-label="Open menu"
              aria-expanded="false"
              onClick={openMobileMenu}
            >
              <span className="icon-bar" aria-hidden="true"></span>
              <span className="icon-bar" aria-hidden="true"></span>
              <span className="icon-bar" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="main-header main-header--premium">
      <div className="header-top">
        <div className="header-shell header-shell--top">
          <div className="top-inner">
            <div className="left-column">
              <ul className="info clearfix">
                <li>
                  <i className="icon-1" aria-hidden="true"></i>
                  {SITE.hours}
                </li>
                {SITE.showAddress && (
                  <li>
                    <i className="icon-2" aria-hidden="true"></i>
                    {SITE.address}
                  </li>
                )}
                <li>
                  <i className="fas fa-phone" aria-hidden="true"></i>
                  <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
                </li>
                <li>
                  <i className="icon-3" aria-hidden="true"></i>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header-lower">
        <HeaderBar />
      </div>

      <div className="sticky-header">
        <HeaderBar sticky />
      </div>
    </header>
  );
}
