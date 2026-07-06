import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import manifest from '../content/manifest.json';
import homeHtml from '../content/index.html?raw';
import ConsultationForm from '../components/ConsultationForm';
import ServicesSection from '../components/ServicesSection';
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

  // Never show error or loading states - always render content
  // Content defaults to homeHtml, so homepage always shows

  if (isHome) {
    // First split at search-field for ConsultationForm
    const searchFieldStart = '<!-- search-field -->';
    const searchFieldEnd = '<!-- search-field end -->';
    const beforeSearch = content.split(searchFieldStart)[0];
    const afterSearch = content.split(searchFieldEnd)[1];
    
    // Now split afterSearch into before service-section and after service-section
    const serviceSectionStart = '<!-- service-section -->';
    const serviceSectionEnd = '<!-- service-section end -->';
    const beforeServices = afterSearch.split(serviceSectionStart)[0];
    const afterServices = afterSearch.split(serviceSectionEnd)[1];
    
    return (
      <div key={location.pathname}>
        <div dangerouslySetInnerHTML={{ __html: beforeSearch }} />
        <ConsultationForm />
        <div dangerouslySetInnerHTML={{ __html: beforeServices }} />
        <ServicesSection />
        <div dangerouslySetInnerHTML={{ __html: afterServices }} />
      </div>
    );
  }

  return <div key={location.pathname} dangerouslySetInnerHTML={{ __html: content }} />;
}
