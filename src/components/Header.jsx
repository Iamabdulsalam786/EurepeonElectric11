import { Link, NavLink } from 'react-router-dom';
import { SITE } from '../config/site';
import { MAIN_NAV } from '../config/navigation';
import BrandLogo from './BrandLogo';

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
      {MAIN_NAV.map((item) => (
        <NavItem key={item.label} item={item} />
      ))}
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
          <button
            type="button"
            className="mobile-nav-toggler"
            aria-label="Open menu"
            aria-expanded="false"
          >
            <span className="icon-bar" aria-hidden="true"></span>
            <span className="icon-bar" aria-hidden="true"></span>
            <span className="icon-bar" aria-hidden="true"></span>
          </button>
          <nav className="main-menu navbar-expand-md navbar-light" aria-label="Primary">
            <div
              className="collapse navbar-collapse show clearfix"
              id={sticky ? undefined : 'navbarSupportedContent'}
            >
              <MainNavigation />
            </div>
          </nav>
        </div>
        <div className="nav-right">
          <div className="support-box">
            <h6>
              <i className="icon-4" aria-hidden="true"></i>
              Call:{' '}
              <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
            </h6>
          </div>
          <div className="btn-box header-cta">
            <Link to="/appointment" className="theme-btn btn-one">
              {SITE.cta.primary}
            </Link>
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
                <li>
                  <i className="icon-2" aria-hidden="true"></i>
                  {SITE.address}
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
