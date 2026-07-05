import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import manifest from '../content/manifest.json';
import homeHtml from '../content/index.html?raw';
import { loadPageEnhancements } from '../utils/loadScripts';
import { loadDeferredStyles } from '../utils/loadStyles';
import { initializeTemplate } from '../utils/initTemplate';

const contentModules = import.meta.glob(
  [
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
  const isHome = location.pathname === '/';
  // Default to homeHtml to prevent "Page Not Found" on mobile
  const [content, setContent] = useState(homeHtml);
  const [loadError, setLoadError] = useState('');
  const pageMeta = manifest[location.pathname];

  const parts = useMemo(() => {
    if (!isHome || !content) return null;
    return splitHomeContent(content);
  }, [content, isHome]);

  useEffect(() => {
    if (isHome) {
      setContent(homeHtml);
      setLoadError('');
      return;
    }

    setContent('');
    setLoadError('');

    if (!pageMeta) {
      setContent('');
      return;
    }

    const loader = contentModules[`../content/${pageMeta.file}`];
    if (!loader) {
      setContent('');
      setLoadError(`Could not find content file: ${pageMeta.file}`);
      return;
    }

    loader()
      .then((html) => setContent(html))
      .catch((error) => {
        setContent('');
        setLoadError(error?.message || 'Could not load page content.');
      });
  }, [location.pathname, pageMeta, isHome]);

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

  // Disabled "Page Not Found" to prevent mobile display issues
  // if (!content && !pageMeta) {
  //   return (
  //     <section className="page-title centred">
  //       <div className="auto-container">
  //         <div className="content-box">
  //           <h2>Page Not Found</h2>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  if (loadError) {
    return (
      <section className="page-title centred">
        <div className="auto-container">
          <div className="content-box">
            <h2>Page Content Error</h2>
            <p>{loadError}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!content) {
    return (
      <section className="page-title centred">
        <div className="auto-container">
          <div className="content-box">
            <h2>Loading...</h2>
          </div>
        </div>
      </section>
    );
  }

  if (isHome && parts?.hasServices) {
    return (
      <div key={location.pathname}>
        <div dangerouslySetInnerHTML={{ __html: parts.before }} />
        <div dangerouslySetInnerHTML={{ __html: parts.after }} />
      </div>
    );
  }

  return <div key={location.pathname} dangerouslySetInnerHTML={{ __html: content }} />;
}
