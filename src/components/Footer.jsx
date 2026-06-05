import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

export default function Footer() {
  return (
    <footer className="main-footer p_relative bg-color-2">
      <div className="icon-layer">
        <img src="/assets/images/icons/icon-5.png" alt="" />
      </div>
      <div className="footer-top p_relative d_block">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-4 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget logo-widget">
                <figure className="footer-logo">
                  <Link to="/">
                    <img src={SITE.logos.footer} alt={SITE.name} />
                  </Link>
                </figure>
                <div className="text">
                  <p>
                    {SITE.name} provides trusted residential and commercial electrical services with a commitment to
                    safety, quality workmanship, and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget ml_100">
                <div className="widget-title">
                  <h3>Links</h3>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      {/* Standalone /services page disabled — homepage section instead */}
                      <Link to="/#services">Services</Link>
                    </li>
                    <li>
                      <Link to="/appointment">Appointment</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="/projects">Projects</Link>
                    </li>
                    <li>
                      <Link to="/blog">Article</Link>
                    </li>
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
                    <li>
                      <Link to="/air-conditioning">Air Conditioning</Link>
                    </li>
                    <li>
                      <Link to="/heating-service">Heating Service</Link>
                    </li>
                    <li>
                      <Link to="/power-outlets">Power Outlets</Link>
                    </li>
                    <li>
                      <Link to="/indoor-lighting">Indoor Lighting</Link>
                    </li>
                    <li>
                      <Link to="/security-system">Security System</Link>
                    </li>
                    <li>
                      <Link to="/electrical-panels">Electrical Panels</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget contact-widget">
                <div className="widget-title">
                  <h3>Contacts</h3>
                </div>
                <div className="widget-content">
                  <ul className="info-list clearfix">
                    <li>{SITE.address}</li>
                    <li>
                      <a href={`tel:${SITE.phone.replace(/\D/g, '')}`}>{SITE.phone}</a>
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
                <Link to="/">{SITE.name}</Link> &copy; {new Date().getFullYear()} All Right Reserved
              </p>
            </div>
            <ul className="footer-nav">
              <li>
                <Link to="/">Terms of Service</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
