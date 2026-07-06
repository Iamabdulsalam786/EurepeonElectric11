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

const BANNER_SECTION_END_RE = /<!-- banner-section end -->/;

function splitHomeContent(html) {
  const bannerEndMatch = html.match(BANNER_SECTION_END_RE);
  
  if (!bannerEndMatch) {
    return { beforeBannerEnd: html, afterBannerEnd: '', hasSections: false };
  }
  
  const bannerEndIndex = html.indexOf(bannerEndMatch[0]) + bannerEndMatch[0].length;
  
  const beforeBannerEnd = html.slice(0, bannerEndIndex);
  const afterBannerEnd = html.slice(bannerEndIndex);
  
  return { beforeBannerEnd, afterBannerEnd, hasSections: true };
}

export default function TemplatePage() {
  const location = useLocation();
  const isHome = location.pathname === '/';
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

  if (isHome && parts?.hasSections) {
    return (
      <div key={location.pathname}>
        <div dangerouslySetInnerHTML={{ __html: parts.beforeBannerEnd }} />
        <ConsultationForm />
        <div dangerouslySetInnerHTML={{ __html: parts.afterBannerEnd }} />
      </div>
    );
  }

  return <div key={location.pathname} dangerouslySetInnerHTML={{ __html: content }} />;
}
