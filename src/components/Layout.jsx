import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Preloader from './Preloader';
import SearchPopup from './SearchPopup';
import Header from './Header';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { SITE } from '../config/site';
import manifest from '../content/manifest.json';
import { loadTemplateScripts } from '../utils/loadScripts';
import { bindScrollHandlers } from '../utils/initTemplate';

function getPageTitle(pathname) {
  const meta = manifest[pathname];
  if (!meta) return 'Page Not Found';
  return meta.title
    .replace('Easton - HTML 5 Template Preview', SITE.name)
    .replace('Easton', SITE.name);
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = getPageTitle(location.pathname);

  useEffect(() => {
    let hashTimer;
    if (location.hash) {
      const scrollToHash = () => {
        const target = document.getElementById(location.hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };
      if (!scrollToHash()) {
        hashTimer = window.setTimeout(scrollToHash, 400);
      }
    } else {
      window.scrollTo(0, 0);
    }
    document.title = title === SITE.name ? SITE.name : `${title} | ${SITE.name}`;

    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = SITE.logos.favicon;
    favicon.type = 'image/jpeg';
    return () => {
      if (hashTimer) window.clearTimeout(hashTimer);
    };
  }, [location.pathname, location.hash, title]);

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
        return;
      }

      if (href.startsWith('/')) {
        event.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  useEffect(() => {
    loadTemplateScripts();
  }, []);

  useEffect(() => {
    const cleanupScroll = bindScrollHandlers();
    return cleanupScroll;
  }, [location.pathname]);

  return (
    <>
      <div className="boxed_wrapper">
        <Preloader />
        <SearchPopup />
        <Header />
        <MobileMenu />
        <Outlet />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
