import { SITE } from '../config/site';

const WORD_LINES = [
  { text: 'European', mod: 'top', baseDelay: 0.3 },
  { text: 'Electric', mod: 'bottom', baseDelay: 0.72 },
  { text: 'LLC', mod: 'llc', baseDelay: 1.14 },
];

function AnimatedWord({ text, mod, baseDelay }) {
  return (
    <span className={`preloader-brand__line preloader-brand__line--${mod}`}>
      {text.split('').map((char, index) => (
        <span
          key={`${mod}-${index}`}
          className="preloader-brand__char"
          style={{ animationDelay: `${baseDelay + index * 0.05}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Preloader() {
  return (
    <div className="loader-wrap">
      <div className="preloader">
        <div className="preloader-close">x</div>
        <div id="handle-preloader" className="handle-preloader handle-preloader--premium">
          <div className="animation-preloader animation-preloader--brand">
            <div className="preloader-brand" aria-label={SITE.name}>
              <div className="preloader-brand__glow" aria-hidden="true" />
              <div className="preloader-brand__icon-wrap">
                <span className="preloader-brand__ring" aria-hidden="true" />
                <span className="preloader-brand__ring preloader-brand__ring--delay" aria-hidden="true" />
                <div className="preloader-brand__icon">
                  <img src={SITE.logos.mark} alt="" />
                </div>
              </div>

              <div className="preloader-brand__text">
                <AnimatedWord
                  text={WORD_LINES[0].text}
                  mod={WORD_LINES[0].mod}
                  baseDelay={WORD_LINES[0].baseDelay}
                />
                <span className="preloader-brand__divider" aria-hidden="true" />
                <AnimatedWord
                  text={WORD_LINES[1].text}
                  mod={WORD_LINES[1].mod}
                  baseDelay={WORD_LINES[1].baseDelay}
                />
                <AnimatedWord
                  text={WORD_LINES[2].text}
                  mod={WORD_LINES[2].mod}
                  baseDelay={WORD_LINES[2].baseDelay}
                />
              </div>
            </div>

            <div className="preloader-progress" role="progressbar" aria-label="Loading">
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
