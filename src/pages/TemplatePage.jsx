import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import manifest from '../content/manifest.json';
import ServicesSection from '../components/ServicesSection';
import { loadPageEnhancements } from '../utils/loadScripts';
import { loadDeferredStyles } from '../utils/loadStyles';
import { initializeTemplate } from '../utils/initTemplate';

const contentModules = import.meta.glob(
  [
    '../content/index.html',
    '../content/about.html',
    '../content/contact.html',
    '../content/faq.html',
    '../content/appointment.html',
    '../content/error.html',
  ],
  {
    query: '?raw',
    import: 'default',
  },
);

const SERVICE_SECTION_RE =
  /<!-- service-section -->[\s\S]*?<!-- service-section end -->/;

function splitHomeContent(html) {
  const match = html.match(SERVICE_SECTION_RE);
  if (!match) {
    return { before: html, hasServices: false, after: '' };
  }

  const [segment] = match;
  const start = html.indexOf(segment);
  return {
    before: html.slice(0, start),
    hasServices: true,
    after: html.slice(start + segment.length),
  };
}

export default function TemplatePage() {
  const location = useLocation();
  const [content, setContent] = useState('');
  const pageMeta = manifest[location.pathname];
  const isHome = location.pathname === '/';

  const parts = useMemo(() => {
    if (!isHome || !content) return null;
    return splitHomeContent(content);
  }, [content, isHome]);

  useEffect(() => {
    if (!pageMeta) {
      setContent('');
      return;
    }

    const loader = contentModules[`../content/${pageMeta.file}`];
    if (!loader) {
      setContent('');
      return;
    }

    loader()
      .then((html) => setContent(html))
      .catch(() => setContent(''));
  }, [location.pathname, pageMeta]);

  useEffect(() => {
    if (!content) return undefined;

    let active = true;

    const boot = async () => {
      loadDeferredStyles().catch(() => {});

      const runEnhancements = async () => {
        await loadPageEnhancements();
        if (!active) return;
        initializeTemplate();
      };

      if (document.querySelector('.banner-carousel, .owl-carousel')) {
        await runEnhancements();
        return;
      }

      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => runEnhancements(), { timeout: 900 });
      } else {
        window.setTimeout(runEnhancements, 50);
      }
    };

    boot();

    return () => {
      active = false;
    };
  }, [content, location.pathname]);

  if (!pageMeta) {
    return (
      <section className="page-title centred">
        <div className="auto-container">
          <div className="content-box">
            <h2>Page Not Found</h2>
          </div>
        </div>
      </section>
    );
  }

  if (isHome && parts?.hasServices) {
    return (
      <div key={location.pathname}>
        <div dangerouslySetInnerHTML={{ __html: parts.before }} />
        <ServicesSection />
        <div dangerouslySetInnerHTML={{ __html: parts.after }} />
      </div>
    );
  }

  return <div key={location.pathname} dangerouslySetInnerHTML={{ __html: content }} />;
}
