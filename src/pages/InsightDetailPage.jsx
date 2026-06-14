import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getInsightBySlug, INSIGHT_ARTICLES } from '../config/insightArticles';
import { SITE } from '../config/site';
import { loadPageEnhancements } from '../utils/loadScripts';
import { initializeTemplate } from '../utils/initTemplate';

function InsightSidebar({ currentSlug }) {
  return (
    <aside className="insight-sidebar mr_50">
      <h4 className="insight-sidebar__title">More Insights</h4>
      <ul className="insight-sidebar__list">
        {INSIGHT_ARTICLES.filter((article) => article.slug !== currentSlug).map((article) => (
          <li key={article.slug}>
            <Link to={article.path}>{article.title}</Link>
            <span>{article.category}</span>
          </li>
        ))}
      </ul>
      <Link to="/#news" className="insight-sidebar__home theme-btn btn-one">
        Back to All Tips
      </Link>
    </aside>
  );
}

export default function InsightDetailPage() {
  const { insightSlug } = useParams();
  const article = getInsightBySlug(insightSlug);

  useEffect(() => {
    if (!article) return undefined;

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
  }, [article, insightSlug]);

  if (!article) {
    return (
      <section className="page-title centred">
        <div className="auto-container">
          <div className="content-box">
            <h2>Article Not Found</h2>
            <p>The insight you requested could not be found.</p>
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

  const [secondaryImageOne, secondaryImageTwo] = article.secondaryImages;

  return (
    <>
      <section className="page-title centred page-title--insight">
        <div
          className="bg-layer parallax-bg"
          data-parallax='{"y": 100}'
          style={{ backgroundImage: `url(${article.image})` }}
        />
        <div className="auto-container">
          <div className="content-box">
            <h2>{article.title}</h2>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/#news">Insights</Link>
              </li>
              <li>{article.category}</li>
            </ul>
          </div>
        </div>
      </section>

      <article className="insight-details insight-details-premium p_relative sec-pad">
        <div className="pattern-layer-2" style={{ backgroundImage: 'url(/assets/images/shape/shape-24.png)' }} />
        <div className="auto-container">
          <div className="row clearfix insight-details-premium__row">
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <InsightSidebar currentSlug={article.slug} />
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="insight-details-content">
                <figure className="image-box insight-details-premium__hero">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="eager"
                    decoding="async"
                    style={{ objectPosition: article.imagePosition }}
                  />
                </figure>

                <div className="insight-details-premium__meta">
                  <span className="insight-details-premium__category">{article.category}</span>
                  <span className="insight-details-premium__author">{article.author}</span>
                </div>

                <div className="text">
                  <p className="insight-details-premium__lede">{article.intro}</p>
                  {article.sections.map((section) => (
                    <div key={section.heading} className="insight-details-premium__section">
                      <h3>{section.heading}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </div>

                <div className="insight-details-premium__takeaways">
                  <h3>Key Takeaways</h3>
                  <ul className="list-style-one clearfix">
                    {article.takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="row clearfix insight-details-premium__gallery">
                  <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                    <figure className="image-box insight-details-premium__thumb">
                      <img
                        src={secondaryImageOne}
                        alt={`${article.title} — project photo`}
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                    <figure className="image-box insight-details-premium__thumb">
                      <img
                        src={secondaryImageTwo}
                        alt={`${article.category} electrical work`}
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                  </div>
                </div>

                <div className="insight-details-premium__cta">
                  <h3>Need help with your project?</h3>
                  <p>
                    {SITE.shortName} provides licensed {article.category.toLowerCase()} work with
                    upfront pricing and code-compliant installation. Request a quote or call our team
                    to discuss your next step.
                  </p>
                  <div className="btn-box">
                    <Link to="/appointment" className="theme-btn btn-one">
                      {SITE.cta.primary}
                    </Link>
                    <Link to={article.relatedServicePath} className="insight-details-premium__related-link">
                      {article.relatedServiceLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
