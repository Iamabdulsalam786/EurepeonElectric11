import { useCallback, useId, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICE_TABS } from '../config/services';
import { getServiceNavHref, parseServiceHash, scrollToServicesSection } from '../utils/serviceNavigation';
import { parseInternalHref } from '../utils/mobileMenu';

export default function MobileServicesNav({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuId = useId();
  const [servicesOpen, setServicesOpen] = useState(true);
  const [expandedTabId, setExpandedTabId] = useState(null);

  const scrollToServiceTarget = useCallback((hash) => {
    const { sectionId } = parseServiceHash(hash);
    if (sectionId !== 'services') return;

    const attemptScroll = () => scrollToServicesSection();
    attemptScroll();
    window.setTimeout(attemptScroll, 120);
    window.setTimeout(attemptScroll, 450);
  }, []);

  const goToService = useCallback(
    (tabId) => {
      const target = parseInternalHref(getServiceNavHref(tabId));
      if (!target) return;

      const sameRoute = location.pathname === target.pathname && location.hash === target.hash;
      onNavigate?.();

      if (sameRoute) {
        scrollToServiceTarget(target.hash);
        return;
      }

      navigate(target);
      window.setTimeout(() => scrollToServiceTarget(target.hash), 300);
      window.setTimeout(() => scrollToServiceTarget(target.hash), 800);
      window.setTimeout(() => scrollToServiceTarget(target.hash), 1400);
    },
    [navigate, onNavigate, location.pathname, location.hash, scrollToServiceTarget],
  );

  const toggleTab = (tabId) => {
    setExpandedTabId((current) => (current === tabId ? null : tabId));
  };

  return (
    <li className={`mobile-nav-item mobile-nav-item--services${servicesOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="mobile-nav-link mobile-nav-link--toggle"
        aria-expanded={servicesOpen}
        aria-controls={menuId}
        onClick={() => setServicesOpen((open) => !open)}
      >
        <span>Services</span>
        <i className={`fas fa-chevron-right mobile-nav-caret${servicesOpen ? ' is-open' : ''}`} aria-hidden="true" />
      </button>

      <ul id={menuId} className="mobile-nav-sublist" hidden={!servicesOpen}>
        <li>
          <button type="button" className="mobile-nav-sublink" onClick={() => goToService()}>
            All Services
          </button>
        </li>

        {SERVICE_TABS.map((tab) => {
          const tabOpen = expandedTabId === tab.id;
          const tabListId = `${menuId}-${tab.id}`;

          return (
            <li key={tab.id} className={`mobile-nav-item mobile-nav-item--branch${tabOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className={`mobile-nav-sublink mobile-nav-sublink--branch${
                  location.hash === `#services-${tab.id}` ? ' is-active' : ''
                }`}
                aria-expanded={tabOpen}
                aria-controls={tabListId}
                onClick={() => toggleTab(tab.id)}
              >
                <span>{tab.shortLabel ?? tab.tabLabel}</span>
                <i className={`fas fa-chevron-right mobile-nav-caret${tabOpen ? ' is-open' : ''}`} aria-hidden="true" />
              </button>

              <ul id={tabListId} className="mobile-nav-sublist mobile-nav-sublist--branch" hidden={!tabOpen}>
                {tab.categories.map((category) => (
                  <li key={category.title} className="mobile-nav-group">
                    <span className="mobile-nav-group__label">{category.title}</span>
                    <ul className="mobile-nav-group__items">
                      {category.items.map((item) => (
                        <li key={item}>
                          <button
                            type="button"
                            className="mobile-nav-sublink mobile-nav-sublink--leaf"
                            onClick={() => goToService(tab.id)}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
