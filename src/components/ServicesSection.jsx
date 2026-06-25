import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_TABS } from '../config/services';
import { SITE } from '../config/site';
import { CATEGORY_IMAGES } from '../config/media';

const DEFAULT_SERVICE_IMAGE = CATEGORY_IMAGES.residential.default;
const animDurations = [800, 1000, 1200, 800, 1000, 1200];

const MAIN_CATEGORY_SUMMARIES = {
  residential: 'Professional home electrical installations, rewiring, panel work, and code-ready upgrades.',
  commercial: 'Reliable electrical solutions for offices, retail spaces, restaurants, and business properties.',
  'new-construction': 'Electrical planning and wiring for new builds, remodels, additions, and ADU projects.',
  'ev-chargers': 'Tesla and Level 2 EV charger installation with circuit planning and permit support.',
  'lighting-solutions': 'Indoor, outdoor, LED, security, landscape, and energy-efficient lighting solutions.',
  'panel-upgrades': 'Panel replacement, service upgrades, subpanels, breakers, and higher-capacity electrical service.',
  'safety-upgrades': 'Electrical inspections, GFCI, AFCI, surge protection, grounding, and safety improvements.',
};

export default function ServicesSection() {
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

  return (
    <section className="service-section services-premium" id="services">
      <div className="auto-container">
        <div className="services-premium__head">
          <span className="services-premium__eyebrow" data-aos="fade-up" data-aos-duration={800}>
            Our Services
          </span>
          <h2 data-aos="fade-up" data-aos-duration={900}>
            Main Electrical Service Categories
          </h2>
          <p data-aos="fade-up" data-aos-duration={1000}>
            {SITE.name} provides complete residential, commercial, EV charging, lighting,
            panel, inspection, and construction electrical services with clear navigation to each
            main category.
          </p>
        </div>

        <div className="services-premium__panel home-services-grid">
          <div
            className={`row services-premium__cards-row services-premium__cards-row--count-${SERVICE_TABS.length}`}
          >
            {SERVICE_TABS.map((tab, index) => (
              <div
                className="col-lg-4 col-md-6 services-premium__card-col"
                key={tab.id}
                data-aos="zoom-out"
                data-aos-duration={animDurations[index % animDurations.length]}
              >
                <Link to={`/services/${tab.id}`} className="service-auhtor-boxarea service-auhtor-boxarea--link">
                  <div className="img1">
                    <img
                      src={tab.image ?? DEFAULT_SERVICE_IMAGE}
                      alt={tab.title}
                      loading="lazy"
                      style={{
                        objectPosition: 'center',
                      }}
                    />
                  </div>
                  <div className="content-area">
                    <span className="service-card-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="service-card-title">{tab.tabLabel}</h3>
                    <p className="service-card-summary">
                      {MAIN_CATEGORY_SUMMARIES[tab.id] ?? `Explore ${tab.title.toLowerCase()} from ${SITE.name}.`}
                    </p>
                    <span className="service-card-action">View Category</span>
                  </div>
                </Link>
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
