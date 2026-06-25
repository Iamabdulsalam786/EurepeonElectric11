import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SITE } from '../config/site';
import { SERVICE_TABS } from '../config/services';
import {
  getServicePageBySlug,
  getServicesByGroup,
} from '../config/servicePages';
import { loadPageEnhancements } from '../utils/loadScripts';
import { initializeTemplate } from '../utils/initTemplate';

function ServiceVideo({ src, poster, title }) {
  if (!src) return null;

  return (
    <div className="service-details-premium__video">
      <h3>See Our {title} Work</h3>
      <div className="service-details-premium__video-frame">
        <video controls playsInline muted preload="metadata" poster={poster}>
          <source src={src} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
    </div>
  );
}

function ServiceCardGroups({ tab, pages, currentSlug }) {
  if (!tab || !pages.length) return null;

  const groups = tab.categories
    .map((category) => ({
      title: category.title,
      pages: category.items
        .map((item) => pages.find((page) => page.title === item))
        .filter(Boolean),
    }))
    .filter((category) => category.pages.length);

  return (
    <div className="service-card-nav__groups">
      {groups.map((category) => (
        <div className="service-card-nav__group" key={category.title}>
          <div className="service-card-nav__group-title">
            <span>{tab.shortLabel ?? tab.tabLabel}</span>
            <h3>{category.title}</h3>
          </div>
          <div className="services-premium__panel home-services-grid service-card-nav__services-grid">
            <div
              className={`row services-premium__cards-row services-premium__cards-row--count-${category.pages.length}`}
            >
              {category.pages.map((item, index) => (
                <div
                  className="col-lg-4 col-md-6 services-premium__card-col"
                  key={item.path}
                >
                  <a
                    href={item.path}
                    data-service-detail-route="true"
                    className={`service-auhtor-boxarea service-auhtor-boxarea--link${
                      currentSlug === item.slug ? ' is-current' : ''
                    }`}
                  >
                    <div className="img1">
                      <img
                        src={item.image}
                        alt={`${item.title} — ${SITE.shortName}`}
                        loading="lazy"
                        style={{ objectPosition: item.imagePosition }}
                      />
                    </div>
                    <div className="content-area">
                      <span className="service-card-index" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="service-card-title">{item.title}</h3>
                      <p className="service-card-summary">{item.intro}</p>
                      <span className="service-card-action">View Details</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServiceDetailPage() {
  const { groupId, serviceSlug } = useParams();
  const groupServices = getServicesByGroup(groupId);
  const page = serviceSlug ? getServicePageBySlug(groupId, serviceSlug) : null;
  const tab = SERVICE_TABS.find((entry) => entry.id === groupId);
  const groupLabel = tab?.shortLabel ?? tab?.tabLabel ?? page?.groupLabel;
  const groupTitle = tab?.title ?? page?.groupLabel;
  const isCategoryPage = Boolean(groupId && !serviceSlug && tab);

  useEffect(() => {
    if (!page && !isCategoryPage) return undefined;

    let active = true;

    const boot = async () => {
      await loadPageEnhancements();
      if (!active) return;
      window.requestAnimationFrame(() => {
        if (!active) return;
        initializeTemplate();
      });
    };

    boot();

    return () => {
      active = false;
    };
  }, [page, isCategoryPage, groupId, serviceSlug]);

  if (!page && !isCategoryPage) {
    return (
      <section className="page-title centred">
        <div className="auto-container">
          <div className="content-box">
            <h2>Service Not Found</h2>
            <p>The service you requested could not be found.</p>
            <div className="btn-box mt_20">
              <Link to="/" className="theme-btn btn-one">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isCategoryPage) {
    return (
      <>
        <section className="page-title centred page-title--service">
          <div className="bg-layer" />
          <div className="auto-container">
            <div className="content-box">
              <h2>{groupTitle}</h2>
              <ul className="bread-crumb clearfix">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>{groupLabel}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="service-details service-details-premium service-category-premium p_relative sec-pad">
          <div className="pattern-layer-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-24.png)' }} />
          <div className="auto-container">
            <div className="service-card-nav service-card-nav--category">
              <div className="sec-title p_relative mb_45 centred">
                <h5 className="d_block fs_17 lh_25 fw_medium mb_9">{groupLabel} Services</h5>
                <h2 className="d_block fs_40 lh_50 fw_bold">{groupTitle}</h2>
                <p className="service-card-nav__lead">
                  Choose a service below to view its existing details, featured image, and project
                  information.
                </p>
              </div>
              <ServiceCardGroups tab={tab} pages={groupServices} />
            </div>
          </div>
        </section>
      </>
    );
  }

  const relatedServices = groupServices.filter((item) => item.slug !== page.slug);

  return (
    <>
      <section className="page-title centred page-title--service">
        <div className="bg-layer" />
        <div className="auto-container">
          <div className="content-box">
            <h2>{page.title}</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{page.groupLabel}</li>
              <li>{page.title}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="service-details service-details-premium p_relative sec-pad">
        <div className="pattern-layer-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-24.png)' }} />
        <div className="auto-container">
          <div className="row clearfix service-details-premium__row">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="service-details-content">
                <div className="content-one p_relative d_block">
                  <figure className="image-box service-details-premium__hero">
                    <img
                      src={page.image}
                      alt={`${page.title} — ${SITE.shortName}`}
                      loading="eager"
                      style={{ objectPosition: page.imagePosition }}
                    />
                  </figure>
                  <div className="text">
                    <span className="service-details-premium__eyebrow">{page.category}</span>
                    <h3>{page.title}</h3>
                    <p>{page.intro}</p>
                    <p>{page.description}</p>
                  </div>
                  <div className="row clearfix service-details-premium__benefits">
                    <div className="col-lg-6 col-md-6 col-sm-12 list-column">
                      <ul className="list-style-one clearfix">
                        {page.benefits.slice(0, 2).map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 list-column">
                      <ul className="list-style-one clearfix">
                        {page.benefits.slice(2).map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <ServiceVideo
                  src={page.video}
                  title={page.groupLabel}
                />

                <div className="content-three service-details-premium__cta">
                  <h3>Request {page.title}</h3>
                  <p>
                    Contact {SITE.shortName} for a free quote on {page.title.toLowerCase()}. We will
                    review your project, explain the scope, and schedule licensed electricians at a
                    time that works for you.
                  </p>
                  <div className="btn-box">
                    <Link to="/appointment" className="theme-btn btn-one">
                      {SITE.cta.primary}
                    </Link>
                    <a href={`tel:${SITE.phoneTel}`} className="service-details-premium__call">
                      Call {SITE.phone}
                    </a>
                  </div>
                </div>

                {relatedServices.length > 0 && (
                  <div className="content-three service-details-premium__related service-card-nav service-card-nav--related">
                    <div className="service-card-nav__head">
                      <span className="service-details-premium__eyebrow">{page.groupLabel} Services</span>
                      <h3>Explore More {page.groupLabel} Services</h3>
                    </div>
                    <ServiceCardGroups tab={tab} pages={relatedServices} currentSlug={page.slug} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
