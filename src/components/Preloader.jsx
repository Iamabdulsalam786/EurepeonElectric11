import { useEffect } from 'react';
import { SITE } from '../config/site';
import BrandMark from './BrandMark';
import { hidePreloader } from '../utils/initTemplate';

const WORD_LINES = [
  { text: 'European', mod: 'primary', baseDelay: 0.35 },
  { text: 'Electric', mod: 'secondary', baseDelay: 0.78 },
];

function AnimatedWord({ text, mod, baseDelay }) {
  return (
    <span className={`preloader-brand__line preloader-brand__line--${mod}`}>
      {text.split('').map((char, index) => (
        <span
          key={`${mod}-${index}`}
          className="preloader-brand__char"
          style={{ animationDelay: `${baseDelay + index * 0.045}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Preloader() {
  useEffect(() => {
    const onClose = () => hidePreloader();
    const closeBtn = document.querySelector('.preloader-close');
    closeBtn?.addEventListener('click', onClose);
    closeBtn?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClose();
      }
    });

    const quickHide = window.setTimeout(hidePreloader, 900);
    const failSafeHide = window.setTimeout(hidePreloader, 2500);

    return () => {
      closeBtn?.removeEventListener('click', onClose);
      window.clearTimeout(quickHide);
      window.clearTimeout(failSafeHide);
    };
  }, []);

  return (
    <div className="loader-wrap">
      <div className="preloader">
        <div className="preloader-close" role="button" tabIndex={0} aria-label="Close loading screen">
          x
        </div>
        <div id="handle-preloader" className="handle-preloader handle-preloader--premium">
          <div className="animation-preloader animation-preloader--brand">
            <div className="preloader-brand preloader-brand--lockup" aria-label={SITE.name}>
              <div className="preloader-brand__glow" aria-hidden="true" />
              <div className="preloader-brand__icon-wrap">
                <span className="preloader-brand__ring" aria-hidden="true" />
                <span className="preloader-brand__ring preloader-brand__ring--delay" aria-hidden="true" />
                <div className="preloader-brand__icon">
                  <BrandMark />
                </div>
              </div>

              <div className="preloader-brand__text">
                <AnimatedWord
                  text={WORD_LINES[0].text}
                  mod={WORD_LINES[0].mod}
                  baseDelay={WORD_LINES[0].baseDelay}
                />
                <span className="preloader-brand__subline">
                  <AnimatedWord
                    text={WORD_LINES[1].text}
                    mod={WORD_LINES[1].mod}
                    baseDelay={WORD_LINES[1].baseDelay}
                  />
                </span>
              </div>
            </div>

            <div className="preloader-progress" role="status" aria-live="polite" aria-label="Loading website">
              <div className="preloader-progress__track">
                <div className="preloader-progress__bar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
