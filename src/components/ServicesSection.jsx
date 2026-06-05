import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SERVICE_TABS } from '../config/services';

const animDurations = [800, 1000, 1200, 800, 1000, 1200];
const imagePositions = ['center top', 'center', 'left center', 'right center'];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState(SERVICE_TABS[0].id);
  const activeTab = SERVICE_TABS.find((tab) => tab.id === activeId) ?? SERVICE_TABS[0];

  useEffect(() => {
    AOS.init({ duration: 700, once: false, offset: 80 });
    const t1 = window.setTimeout(() => AOS.refresh(), 100);
    const t2 = window.setTimeout(() => AOS.refreshHard(), 400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [activeId]);

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
            One licensed team for every electrical need — residential, commercial, EV charging and 24/7
            emergency — with transparent pricing and guaranteed workmanship.
          </p>
        </div>

        <div className="services-premium__tabs" role="tablist" aria-label="Service categories">
          {SERVICE_TABS.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                className={`services-premium__tab${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveId(tab.id)}
              >
                {tab.tabLabel}
              </button>
            );
          })}
        </div>

        <div
          key={activeId}
          className="services-premium__panel home-services-grid"
          role="tabpanel"
          id={`panel-${activeId}`}
          aria-labelledby={`tab-${activeId}`}
        >
          <div className="row services-premium__cards-row">
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
                      src={activeTab.image}
                      alt={category.title}
                      loading="lazy"
                      style={{ objectPosition: imagePositions[index % imagePositions.length] }}
                    />
                  </div>
                  <div className="content-area">
                    <h3>{String(index + 1).padStart(2, '0')}</h3>
                    <span className="service-card-title">{category.title}</span>
                    <ul className="service-highlights">
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
              Request a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
