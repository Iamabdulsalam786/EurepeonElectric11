import { Link, NavLink } from 'react-router-dom';
import { SITE } from '../config/site';
import { FOOTER_NAV } from '../config/navigation';
import { SERVICE_TABS } from '../config/services';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="main-footer p_relative bg-color-2">
      <div className="icon-layer">
        <img src="/assets/images/icons/icon-5.png" alt="" aria-hidden="true" />
      </div>
      <div className="footer-top p_relative d_block">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-4 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget logo-widget">
                <figure className="footer-logo">
                  <BrandLogo variant="footer" />
                </figure>
                <div className="text">
                  <p>
                    {SITE.name} delivers licensed residential and commercial electrical work — wiring, panels, lighting,
                    EV charging, safety upgrades, and new construction — with transparent pricing and dependable results.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget ml_100">
                <div className="widget-title">
                  <h3>Quick Links</h3>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    {FOOTER_NAV.map((item) => (
                      <li key={item.label}>
                        <Link to={item.to}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget">
                <div className="widget-title">
                  <h3>Services</h3>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    {SERVICE_TABS.map((tab) => (
                      <li key={tab.id}>
                        <Link to="/#services">{tab.tabLabel}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget contact-widget">
                <div className="widget-title">
                  <h3>Contact</h3>
                </div>
                <div className="widget-content">
                  <ul className="info-list clearfix">
                    {SITE.showAddress && <li>{SITE.address}</li>}
                    <li>
                      <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
                    </li>
                    <li>
                      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom p_relative">
        <div className="auto-container">
          <div className="bottom-inner p_relative">
            <div className="copyright">
              <p>
                <Link to="/">{SITE.name}</Link> &copy; {new Date().getFullYear()} All Rights Reserved
              </p>
              <p className="footer-credit">Designed by The Nexus dynamics</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
