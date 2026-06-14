import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { parseServiceHash } from '../utils/serviceNavigation';
import {
  SERVICE_TABS,
  SERVICE_PRIMARY_NAV,
  SPECIALTY_SERVICE_IDS,
} from '../config/services';
import { SITE } from '../config/site';
import { CATEGORY_IMAGES } from '../config/media';

const DEFAULT_SERVICE_IMAGE = CATEGORY_IMAGES.residential.default;
const animDurations = [800, 1000, 1200, 800, 1000, 1200];

function getPrimaryNavId(tabId) {
  if (tabId === 'residential') return 'residential';
  if (tabId === 'commercial') return 'commercial';
  return 'specialty';
}

export default function ServicesSection() {
  const location = useLocation();
  const [activeId, setActiveId] = useState(SERVICE_TABS[0].id);
  const activeTab = SERVICE_TABS.find((tab) => tab.id === activeId) ?? SERVICE_TABS[0];
  const activePrimaryId = getPrimaryNavId(activeId);

  useEffect(() => {
    const { tabId } = parseServiceHash(location.hash);
    if (tabId && SERVICE_TABS.some((tab) => tab.id === tabId)) {
      setActiveId(tabId);
    }
  }, [location.hash]);

  const specialtyTabs = useMemo(
    () => SERVICE_TABS.filter((tab) => SPECIALTY_SERVICE_IDS.includes(tab.id)),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    let refreshTimer;

    const bootAos = async () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const [{ default: AOS }] = await Promise.all([
        import('aos'),
        import('aos/dist/aos.css'),
      ]);

      if (cancelled) return;

      AOS.init({ duration: 700, once: true, offset: 80 });
      refreshTimer = window.setTimeout(() => AOS.refresh(), 100);
    };

    bootAos();

    return () => {
      cancelled = true;
      if (refreshTimer) window.clearTimeout(refreshTimer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    import('aos').then(({ default: AOS }) => {
      if (!cancelled) AOS.refreshHard();
    });

    return () => {
      cancelled = true;
    };
  }, [activeId]);

  const handlePrimarySelect = useCallback((navItem) => {
    if (navItem.tabId) {
      setActiveId(navItem.tabId);
      return;
    }
    setActiveId((current) =>
      SPECIALTY_SERVICE_IDS.includes(current) ? current : SPECIALTY_SERVICE_IDS[0],
    );
  }, []);

  const handleTabKeyDown = useCallback(
    (event, tabs, index, onSelect) => {
      let nextIndex = index;

      if (event.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      onSelect(tabs[nextIndex].id);
      document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus();
    },
    [],
  );

  return (
    <section className="service-section services-premium" id="services">
      <div className="auto-container">
        <div className="services-premium__head">
          <span className="services-premium__eyebrow" data-aos="fade-up" data-aos-duration={800}>
            Our Services
          </span>
          <h2 data-aos="fade-up" data-aos-duration={900}>
            Full-Service Electrical Expertise
          </h2>
          <p data-aos="fade-up" data-aos-duration={1000}>
            One licensed team for residential, commercial, EV charging, lighting, panel upgrades,
            safety improvements, and new construction — with transparent pricing and guaranteed
            workmanship.
          </p>
        </div>

        <div
          className="services-premium__tabs services-premium__tabs--primary"
          role="tablist"
          aria-label="Service categories"
        >
          {SERVICE_PRIMARY_NAV.map((navItem) => {
            const isActive = activePrimaryId === navItem.id;
            return (
              <button
                key={navItem.id}
                type="button"
                role="tab"
                id={`primary-tab-${navItem.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${activeId}`}
                tabIndex={isActive ? 0 : -1}
                className={`services-premium__tab services-premium__tab--primary${isActive ? ' is-active' : ''}`}
                onClick={() => handlePrimarySelect(navItem)}
              >
                {navItem.label}
              </button>
            );
          })}
        </div>

        {activePrimaryId === 'specialty' && (
          <div
            className="services-premium__subnav"
            role="tablist"
            aria-label="Specialty services"
          >
            {specialtyTabs.map((tab, index) => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`services-premium__tab services-premium__tab--sub${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveId(tab.id)}
                  onKeyDown={(event) =>
                    handleTabKeyDown(event, specialtyTabs, index, setActiveId)
                  }
                >
                  {tab.shortLabel ?? tab.tabLabel}
                </button>
              );
            })}
          </div>
        )}

        <div
          key={activeId}
          className="services-premium__panel home-services-grid"
          role="tabpanel"
          id={`panel-${activeId}`}
          aria-labelledby={
            activePrimaryId === 'specialty' ? `tab-${activeId}` : `primary-tab-${activePrimaryId}`
          }
          tabIndex={0}
        >
          <div
            className={`row services-premium__cards-row services-premium__cards-row--count-${activeTab.categories.length}`}
          >
            {activeTab.categories.map((category, index) => (
              <div
                className="col-lg-4 col-md-6 services-premium__card-col"
                key={category.title}
                data-aos="zoom-out"
                data-aos-duration={animDurations[index % animDurations.length]}
              >
                <div className="service-auhtor-boxarea">
                  <div className="img1">
                    <img
                      src={category.image ?? activeTab.image ?? DEFAULT_SERVICE_IMAGE}
                      alt={category.title}
                      loading="lazy"
                      style={{
                        objectPosition: category.imagePosition ?? 'center',
                      }}
                    />
                  </div>
                  <div className="content-area">
                    <span className="service-card-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="service-card-title">{category.title}</h3>
                    <ul
                      className={[
                        'service-highlights',
                        category.items.length < 5 ? 'service-highlights--balanced' : '',
                        category.items.length > 5 ? 'service-highlights--compact' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {category.items.map((item) => (
                        <li key={item}>
                          <i className="fa-solid fa-bolt" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="services-premium__footer">
            <Link to="/appointment" className="theme-btn btn-one">
              {SITE.cta.secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
