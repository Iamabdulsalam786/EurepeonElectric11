import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SITE } from '../config/site';
import { SERVICE_TABS } from '../config/services';
import {
  getServicePageBySlug,
  getServicePagePath,
  slugify,
} from '../config/servicePages';
import { getServiceNavHref } from '../utils/serviceNavigation';
import { loadPageEnhancements } from '../utils/loadScripts';
import { initializeTemplate } from '../utils/initTemplate';

function ServiceDetailSidebar({ groupId, currentSlug, groupLabel }) {
  const tab = SERVICE_TABS.find((entry) => entry.id === groupId);
  if (!tab) return null;

  return (
    <div className="service-sidebar mr_50 service-sidebar-premium">
      <h4 className="service-sidebar-premium__title">{groupLabel} Services</h4>
      {tab.categories.map((category) => (
        <div key={category.title} className="service-sidebar-premium__group">
          <p className="service-sidebar-premium__label">{category.title}</p>
          <ul className="service-list clearfix">
            {category.items.map((item) => {
              const slug = slugify(item);
              const path = getServicePagePath(groupId, item);
              return (
                <li key={item}>
                  <Link to={path} className={currentSlug === slug ? 'current' : undefined}>
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Link to={getServiceNavHref(groupId)} className="service-sidebar-premium__all theme-btn btn-one">
        View All {groupLabel} Services
      </Link>
    </div>
  );
}

function ServiceVideo({ src, poster, title }) {
  if (!src) return null;

  return (
    <div className="service-details-premium__video">
      <h3>See Our {title} Work</h3>
      <div className="service-details-premium__video-frame">
        <video controls playsInline preload="metadata" poster={poster}>
          <source src={src} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </div>
    </div>
  );
}

export default function ServiceDetailPage() {
  const { groupId, serviceSlug } = useParams();
  const page = getServicePageBySlug(groupId, serviceSlug);

  useEffect(() => {
    if (!page) return undefined;

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
  }, [page, groupId, serviceSlug]);

  if (!page) {
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

  const [secondaryImageOne, secondaryImageTwo] = page.secondaryImages;

  return (
    <>
      <section className="page-title centred page-title--service">
        <div
          className="bg-layer parallax-bg"
          data-parallax='{"y": 100}'
          style={{ backgroundImage: `url(${page.image})` }}
        />
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
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <ServiceDetailSidebar
                groupId={page.groupId}
                currentSlug={page.slug}
                groupLabel={page.groupLabel}
              />
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
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
                  poster={page.image}
                  title={page.groupLabel}
                />

                <div className="content-two p_relative d_block service-details-premium__gallery">
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                      <figure className="image-box service-details-premium__thumb">
                        <img src={secondaryImageOne} alt={`${page.title} electrical project`} loading="lazy" />
                      </figure>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                      <figure className="image-box service-details-premium__thumb">
                        <img
                          src={secondaryImageTwo}
                          alt={`${page.groupLabel} electrical installation`}
                          loading="lazy"
                        />
                      </figure>
                    </div>
                  </div>
                </div>

                {page.relatedInCategory.length > 0 && (
                  <div className="content-three service-details-premium__related">
                    <h3>Related {page.groupLabel} Services</h3>
                    <ul className="list-style-one clearfix">
                      {page.relatedInCategory.map((item) => (
                        <li key={item}>
                          <Link to={getServicePagePath(page.groupId, item)}>{item}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
