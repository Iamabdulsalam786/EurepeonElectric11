import { Link } from 'react-router-dom';
import { SITE } from '../config/site';
import BrandMark from './BrandMark';

export default function BrandLogo({ variant = 'header', className = '' }) {
  const isFooter = variant === 'footer';

  if (isFooter) {
    return (
      <Link
        to="/"
        className={['brand-lockup', 'brand-lockup--footer', 'brand-lockup--footer-image', className]
          .filter(Boolean)
          .join(' ')}
        aria-label={SITE.name}
      >
        <img
          src={SITE.logos.footer}
          alt={SITE.name}
          className="brand-lockup__footer-img"
          decoding="async"
        />
      </Link>
    );
  }

  const classes = ['brand-lockup', 'brand-lockup--header', className].filter(Boolean).join(' ');

  return (
    <Link to="/" className={classes} aria-label={SITE.name}>
      <span className="brand-lockup__mark" aria-hidden="true">
        <BrandMark />
      </span>
      <span className="brand-lockup__wordmark">
        <span className="brand-lockup__line brand-lockup__line--primary">European</span>
        <span className="brand-lockup__line brand-lockup__line--secondary">
          Electric
          <span className="brand-lockup__llc"> LLC</span>
        </span>
      </span>
    </Link>
  );
}
