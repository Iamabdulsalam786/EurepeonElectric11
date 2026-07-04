import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SITE } from '../config/site';
import { SERVICE_TABS } from '../config/services';
import {
  getCategoryBySlug,
  getCategoryPath,
  getServicePageBySlug,
  getServicesByGroup,
  getServicesForCategory,
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

const CATEGORY_CARD_HIGHLIGHT_MAX = 6;

function ServiceCategoryHighlights({ items }) {
  const highlights = items.slice(0, CATEGORY_CARD_HIGHLIGHT_MAX);
  const compact = highlights.length > 4;

  return (
    <ul
      className={`service-highlights${compact ? ' service-highlights--compact' : ''}`}
      aria-label="Available services"
    >
      {highlights.map((item) => (
        <li key={item}>
          <i className="fas fa-check" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ServiceCategoryCards({ tab, groupId }) {
  if (!tab?.categories?.length) return null;

  return (
    <div className="services-premium__panel home-services-grid service-card-nav__services-grid">
      <div
        className={`row services-premium__cards-row services-premium__cards-row--count-${tab.categories.length}`}
      >
        {tab.categories.map((category, index) => (
          <div className="col-lg-4 col-md-6 services-premium__card-col" key={category.title}>
            <a
              href={getCategoryPath(groupId, category.title)}
              data-service-detail-route="true"
              className="service-auhtor-boxarea service-auhtor-boxarea--link"
            >
              <div className="img1">
                <img
                  src={category.image ?? tab.image}
                  alt={`${category.title} — ${SITE.shortName}`}
                  loading="lazy"
                  style={{ objectPosition: category.imagePosition ?? 'center' }}
                />
              </div>
              <div className="content-area">
                <h3 className="service-card-title">{category.title}</h3>
                <ServiceCategoryHighlights items={category.items} />
                <span className="service-card-action">View Services</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceListNav({ pages, currentSlug }) {
  if (!pages.length) return null;

  return (
    <ul className="list-style-one clearfix service-list-nav">
      {pages.map((item) => (
        <li key={item.path} className={currentSlug === item.slug ? 'is-current' : undefined}>
          <a href={item.path} data-service-detail-route="true">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ServiceListGroups({ tab, pages, currentSlug }) {
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
    <div className="service-list-nav__groups">
      {groups.map((category) => (
        <div className="service-list-nav__group" key={category.title}>
          <h4 className="service-list-nav__group-title">{category.title}</h4>
          <ServiceListNav pages={category.pages} currentSlug={currentSlug} />
        </div>
      ))}
    </div>
  );
}

export default function ServiceDetailPage() {
  const { groupId, serviceSlug } = useParams();
  const groupServices = getServicesByGroup(groupId);
  const page = serviceSlug ? getServicePageBySlug(groupId, serviceSlug) : null;
  const category = serviceSlug && !page ? getCategoryBySlug(groupId, serviceSlug) : null;
  const tab = SERVICE_TABS.find((entry) => entry.id === groupId);
  const groupLabel = tab?.shortLabel ?? tab?.tabLabel ?? page?.groupLabel;
  const groupTitle = tab?.title ?? page?.groupLabel;
  const isCategoryPage = Boolean(groupId && !serviceSlug && tab);
  const isSubcategoryPage = Boolean(groupId && category && tab);
  const categoryServices = category ? getServicesForCategory(groupId, category.title) : [];

  useEffect(() => {
    if (!page && !isCategoryPage && !isSubcategoryPage) return undefined;

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
  }, [page, isCategoryPage, isSubcategoryPage, groupId, serviceSlug]);

  if (!page && !isCategoryPage && !isSubcategoryPage) {
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
                  Choose a service category below to browse available services and view full details.
                </p>
              </div>
              <ServiceCategoryCards tab={tab} groupId={groupId} />
            </div>
          </div>
        </section>
      </>
    );
  }

  if (isSubcategoryPage) {
    return (
      <>
        <section className="page-title centred page-title--service">
          <div className="bg-layer" />
          <div className="auto-container">
            <div className="content-box">
              <h2>{category.title}</h2>
              <ul className="bread-crumb clearfix">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={`/services/${groupId}`}>{groupLabel}</Link>
                </li>
                <li>{category.title}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="service-details service-details-premium service-category-premium p_relative sec-pad">
          <div className="pattern-layer-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-24.png)' }} />
          <div className="auto-container">
            <div className="service-list-nav__panel">
              <div className="sec-title p_relative mb_45 centred">
                <h5 className="d_block fs_17 lh_25 fw_medium mb_9">{groupLabel} Services</h5>
                <h2 className="d_block fs_40 lh_50 fw_bold">{category.title}</h2>
                <p className="service-card-nav__lead">
                  Select a service below to view details, featured images, and project information.
                </p>
              </div>
              <ServiceListNav pages={categoryServices} />
              <div className="service-list-nav__back mt_30 centred">
                <Link to={`/services/${groupId}`} className="service-list-nav__back-link">
                  Back to {groupLabel} Categories
                </Link>
              </div>
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
              <li>
                <Link to={`/services/${groupId}`}>{page.groupLabel}</Link>
              </li>
              <li>
                <Link to={getCategoryPath(groupId, page.category)}>{page.category}</Link>
              </li>
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

                <ServiceVideo src={page.video} title={page.groupLabel} />

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
                  <div className="content-three service-details-premium__related service-list-nav service-list-nav--related">
                    <div className="service-card-nav__head">
                      <span className="service-details-premium__eyebrow">{page.groupLabel} Services</span>
                      <h3>Explore More {page.groupLabel} Services</h3>
                    </div>
                    <ServiceListGroups tab={tab} pages={relatedServices} currentSlug={page.slug} />
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
