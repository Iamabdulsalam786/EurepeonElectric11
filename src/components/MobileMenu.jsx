import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

export default function MobileMenu() {
  return (
    <div className="mobile-menu">
      <div className="menu-backdrop"></div>
      <div className="close-btn">
        <i className="fas fa-times"></i>
      </div>

      <nav className="menu-box">
        <div className="nav-logo">
          <Link to="/">
            <img src={SITE.logos.mobile} alt={SITE.name} title={SITE.name} />
          </Link>
        </div>
        <div className="menu-outer"></div>
        <div className="contact-info">
          <h4>Contact Info</h4>
          <ul>
            <li>{SITE.address}</li>
            <li>
              <a href={`tel:${SITE.phone.replace(/\D/g, '')}`}>{SITE.phone}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
        </div>
        <div className="social-links">
          <ul className="clearfix">
            <li>
              <a href="/">
                <span className="fab fa-twitter"></span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fab fa-facebook-square"></span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fab fa-pinterest-p"></span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fab fa-instagram"></span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fab fa-youtube"></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
