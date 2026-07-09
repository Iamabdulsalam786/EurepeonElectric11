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
const APPOINTMENT_SECTION_RE = /<!-- appointment-section -->/;

function splitHomeContent(html) {
  const bannerEndMatch = html.match(BANNER_SECTION_END_RE);
  
  if (!bannerEndMatch) {
    return { before: html, after: '', hasSections: false };
  }
  
  const bannerEndIndex = html.indexOf(bannerEndMatch[0]) + bannerEndMatch[0].length;
  
  const before = html.slice(0, bannerEndIndex);
  const after = html.slice(bannerEndIndex);
  
  return { before, after, hasSections: true };
}

function splitAppointmentContent(html) {
  const appointmentMatch = html.match(APPOINTMENT_SECTION_RE);
  
  if (!appointmentMatch) {
    return { before: html, after: '', hasSections: false };
  }
  
  const appointmentStartIndex = html.indexOf(appointmentMatch[0]);
  
  const before = html.slice(0, appointmentStartIndex);
  // Skip the whole static <!-- appointment-section --> ... <!-- appointment-section end --> part
  const appointmentEndComment = '<!-- appointment-section end -->';
  const appointmentEndIndex = html.indexOf(appointmentEndComment, appointmentStartIndex) + appointmentEndComment.length;
  const after = html.slice(appointmentEndIndex);
  
  return { before, after, hasSections: true };
}

export default function TemplatePage() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAppointment = location.pathname === '/appointment';
  const isAbout = location.pathname === '/about';
  const [content, setContent] = useState(homeHtml);
  const [loadError, setLoadError] = useState('');
  const pageMeta = manifest[location.pathname];

  const parts = useMemo(() => {
    if (!content) return null;
    if (isHome) return splitHomeContent(content);
    if (isAppointment) return splitAppointmentContent(content);
    return null;
  }, [content, isHome, isAppointment]);

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

      // Always run enhancements immediately - no conditional waiting!
      await runEnhancements();
    };

    boot();

    return () => {
      active = false;
    };
  }, [content, location.pathname]);

  if ((isHome || isAppointment) && parts?.hasSections) {
    return (
      <div key={location.pathname}>
        <div dangerouslySetInnerHTML={{ __html: parts.before }} />
        <ConsultationForm />
        <div dangerouslySetInnerHTML={{ __html: parts.after }} />
      </div>
    );
  }

  return <div key={location.pathname} dangerouslySetInnerHTML={{ __html: content }} />;
}
