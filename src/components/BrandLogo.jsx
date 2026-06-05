import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

export default function BrandLogo({ variant = 'header', className = '' }) {
  const isPreloader = variant === 'preloader';

  const lockup = (
    <>
      <span className="brand-lockup__mark" aria-hidden="true">
        <img src={SITE.logos.mark} alt="" />
      </span>
      <span className="brand-lockup__wordmark">
        <span className="brand-lockup__name brand-lockup__name--top">European</span>
        <span className="brand-lockup__name brand-lockup__name--bottom">Electric</span>
      </span>
    </>
  );

  const classes = ['brand-lockup', isPreloader ? 'brand-lockup--preloader' : '', className]
    .filter(Boolean)
    .join(' ');

  if (isPreloader) {
    return (
      <div className={classes} aria-label={SITE.name}>
        {lockup}
      </div>
    );
  }

  return (
    <Link to="/" className={classes} aria-label={SITE.name}>
      {lockup}
    </Link>
  );
}
