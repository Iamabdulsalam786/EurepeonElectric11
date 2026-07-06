import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import manifest from '../content/manifest.json';
import homeHtml from '../content/index.html?raw';
import ConsultationForm from '../components/ConsultationForm';
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

const SEARCH_FIELD_RE =
  /<!-- search-field -->[\s\S]*?<!-- search-field end -->/;

export default function TemplatePage() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  // Always default to homeHtml - never show "Loading" or "Page Not Found"
  const [content, setContent] = useState(homeHtml);
  const [loadError, setLoadError] = useState('');
  const pageMeta = manifest[location.pathname];

  useEffect(() => {
    if (isHome) {
      setContent(homeHtml);
      setLoadError('');
      return;
    }

    // If no pageMeta, keep homeHtml as fallback instead of clearing
    if (!pageMeta) {
      setContent(homeHtml);
      return;
    }

    setContent('');
    setLoadError('');

    const loader = contentModules[`../content/${pageMeta.file}`];
    if (!loader) {
      setContent(homeHtml);
      setLoadError(`Could not find content file: ${pageMeta.file}`);
      return;
    }

    loader()
      .then((html) => setContent(html))
      .catch((error) => {
        setContent(homeHtml);
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

  // Never show error or loading states - always render content
  // Content defaults to homeHtml, so homepage always shows

  if (isHome) {
    const beforeSearch = content.split('<!-- search-field -->')[0];
    const afterSearch = content.split('<!-- search-field end -->')[1];
    return (
      <div key={location.pathname}>
        <div dangerouslySetInnerHTML={{ __html: beforeSearch }} />
        <ConsultationForm />
        <div dangerouslySetInnerHTML={{ __html: afterSearch }} />
      </div>
    );
  }

  return <div key={location.pathname} dangerouslySetInnerHTML={{ __html: content }} />;
}
