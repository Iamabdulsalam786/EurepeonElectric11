import { SITE } from '../config/site';

export default function BrandMark({ className = '' }) {
  return (
    <img
      src={SITE.logos.mark}
      alt=""
      className={`brand-mark ${className}`.trim()}
      width={34}
      height={34}
      decoding="async"
    />
  );
}
