import { useEffect, useState } from 'react';
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

export default function TemplatePage() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  // Always default to homeHtml - never show "Loading" or "Page Not Found"
  const [content, setContent] = useState(homeHtml);
  const [loadError, setLoadError] = useState('');
  const pageMeta = manifest[location.pathname];

  useEffect(() => {
    console.log('=== TemplatePage useEffect ran ===');
    console.log('  location.pathname:', location.pathname);
    console.log('  isHome:', isHome);
    console.log('  pageMeta:', pageMeta);
    console.log('  contentModules keys:', Object.keys(contentModules));
    console.log('  homeHtml includes searchFieldStart:', homeHtml.includes('<!-- search-field -->'));

    if (isHome) {
      console.log('  Setting content to homeHtml');
      setContent(homeHtml);
      setLoadError('');
      return;
    }

    // If no pageMeta, keep homeHtml as fallback instead of clearing
    if (!pageMeta) {
      console.log('  No pageMeta, setting to homeHtml');
      setContent(homeHtml);
      return;
    }

    console.log('  Setting content to empty');
    setContent('');
    setLoadError('');

    const loaderKey = `../content/${pageMeta.file}`;
    const loader = contentModules[loaderKey];
    console.log('  loaderKey:', loaderKey);
    console.log('  loader exists:', !!loader);
    
    if (!loader) {
      console.log('  No loader, setting to homeHtml');
      setContent(homeHtml);
      setLoadError(`Could not find content file: ${pageMeta.file}`);
      return;
    }

    loader()
      .then((html) => {
        console.log('  Loader resolved, setting content to HTML');
        setContent(html);
      })
      .catch((error) => {
        console.log('  Loader error, setting to homeHtml');
        setContent(homeHtml);
        setLoadError(error?.message || 'Could not load page content.');
      });
  }, [location.pathname, pageMeta, isHome, homeHtml]);

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

  // Never show error or loading states - always render content
  // Content defaults to homeHtml, so homepage always shows

  if (isHome) {
    // Split the home HTML into before search-field, and after search-field
    const searchFieldStart = '<!-- search-field -->';
    const searchFieldEnd = '<!-- search-field end -->';
    
    console.log('Content contains searchFieldStart:', content.includes(searchFieldStart));
    console.log('Content contains searchFieldEnd:', content.includes(searchFieldEnd));
    
    const beforeSearch = content.split(searchFieldStart)[0];
    const afterSearch = content.split(searchFieldEnd)[1];
    
    console.log('isHome:', isHome, 'location:', location.pathname);
    console.log('beforeSearch length:', beforeSearch.length, 'afterSearch length:', afterSearch?.length);
    
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
