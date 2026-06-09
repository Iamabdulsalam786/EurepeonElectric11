import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Preloader from './Preloader';
import Header from './Header';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import WhatsAppFloat from './WhatsAppFloat';
import { SITE } from '../config/site';
import { PAGE_META } from '../config/pageMeta';
import { bindScrollHandlers } from '../utils/initTemplate';
import { parseServiceHash, scrollToAnchor, scrollToServicesSection } from '../utils/serviceNavigation';

function getPageTitle(pathname) {
  const meta = PAGE_META[pathname];
  if (!meta) return 'Page Not Found';
  return meta.title;
}

function getPageDescription(pathname) {
  const meta = PAGE_META[pathname];
  return meta?.description ?? SITE.name;
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = getPageTitle(location.pathname);
  const description = getPageDescription(location.pathname);

  useEffect(() => {
    const hashTimers = [];

    if (location.hash) {
      const scrollToHash = () => {
        const { sectionId } = parseServiceHash(location.hash);
        if (sectionId === 'services') {
          scrollToServicesSection();
          return true;
        }
        if (scrollToAnchor(sectionId, 'smooth')) {
          return true;
        }
        return false;
      };
      if (!scrollToHash()) {
        [400, 900, 1400].forEach((delay) => {
          hashTimers.push(window.setTimeout(scrollToHash, delay));
        });
      }
    } else {
      window.scrollTo(0, 0);
    }

    document.title = title === 'Home' ? SITE.name : `${title} | ${SITE.name}`;

    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = SITE.logos.favicon;
    favicon.type = 'image/png';

    return () => {
      hashTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [location.pathname, location.hash, title, description]);

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
    const cleanupScroll = bindScrollHandlers();
    return cleanupScroll;
  }, [location.pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="boxed_wrapper">
        <Preloader />
        <Header />
        <MobileMenu />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppFloat />
      </div>
    </>
  );
}
