import { Link } from 'react-router-dom';
import { SITE } from '../config/site';
import { MAIN_NAV } from '../config/navigation';

function NavItem({ item }) {
  return (
    <li className="nav-item-premium">
      <Link to={item.to} className="nav-link-premium">
        <span>{item.label}</span>
      </Link>
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
              <Link to="/">
                <img src={SITE.logos.main} alt={SITE.name} />
              </Link>
            </figure>
          </div>
          {!sticky && (
            <div className="mobile-nav-toggler">
              <i className="icon-bar"></i>
              <i className="icon-bar"></i>
              <i className="icon-bar"></i>
            </div>
          )}
          <nav className="main-menu navbar-expand-md navbar-light">
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
              <i className="icon-4"></i>
              Call:{' '}
              <a href={`tel:${SITE.phone.replace(/\D/g, '')}`}>{SITE.phone}</a>
            </h6>
          </div>
          <div className="search-box-outer search-toggler">
            <i className="icon-5"></i>
          </div>
          <div className="btn-box">
            <Link to="/appointment" className="theme-btn btn-one">
              Get a Quote
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
                  <i className="icon-1"></i>
                  {SITE.hours}
                </li>
                <li>
                  <i className="icon-2"></i>
                  {SITE.address}
                </li>
                <li>
                  <i className="icon-3"></i>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
              </ul>
            </div>
            <div className="right-column">
              <ul className="social-links clearfix">
                <li>
                  <p>Follow Us:</p>
                </li>
                <li>
                  <a href="/" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="/" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="/" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
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
