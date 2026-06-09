import { SITE } from '../config/site';

function buildWhatsAppHref() {
  const digits = (SITE.whatsapp?.number || '').replace(/\D/g, '');
  if (!digits) return null;

  const text = encodeURIComponent(SITE.whatsapp?.defaultMessage || '');
  return `https://wa.me/${digits}${text ? `?text=${text}` : ''}`;
}

export default function WhatsAppFloat() {
  const href = buildWhatsAppHref();
  if (!href) return null;

  const label = SITE.whatsapp?.label || 'Chat on WhatsApp';

  return (
    <a
      href={href}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <span className="whatsapp-float__pulse" aria-hidden="true" />
      <span className="whatsapp-float__btn">
        <i className="fab fa-whatsapp whatsapp-float__icon" aria-hidden="true" />
      </span>
    </a>
  );
}
