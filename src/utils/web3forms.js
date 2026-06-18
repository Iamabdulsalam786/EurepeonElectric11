import { SITE } from '../config/site';

const FORM_SUBJECTS = {
  quote: `Quote Request - ${SITE.shortName}`,
  consultation: `Consultation Request - ${SITE.shortName}`,
  appointment: `Appointment Request - ${SITE.shortName}`,
  faq: `Question from FAQ - ${SITE.shortName}`,
  newsletter: `Newsletter Signup - ${SITE.shortName}`,
};

function getManagedForm(eventTarget) {
  const form = eventTarget.closest('form');
  if (!form || !form.closest('#main-content')) return null;
  if (!form.querySelector('input[type="email"], input[name="email"]')) return null;

  const isKnownInquiry =
    form.id === 'contact-form' ||
    form.id === 'home-contact-form' ||
    form.closest('.search-field') ||
    form.closest('.subscribe-section') ||
    form.closest('.contact-style-two') ||
    form.closest('.appointment-section') ||
    form.getAttribute('action') === '/contact';

  return isKnownInquiry ? form : null;
}

function getFormType(form) {
  if (form.closest('.subscribe-section')) return 'newsletter';
  if (form.closest('.search-field')) return 'consultation';
  if (form.closest('.appointment-section')) return 'appointment';
  if (form.closest('.contact-style-two')) return 'faq';
  return 'quote';
}

function getStatusElement(form) {
  let status = form.querySelector('.web3form-status');
  if (status) return status;

  status = document.createElement('p');
  status.className = 'web3form-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');

  if (form.closest('.search-field')) {
    status.classList.add('web3form-status--hero');
    form.appendChild(status);
    return status;
  }

  const target =
    form.querySelector('.contact-quote-form__submit') ||
    form.querySelector('.message-btn') ||
    form.querySelector('.btn-box') ||
    form.querySelector('.form-group:last-of-type') ||
    form;

  target.appendChild(status);
  return status;
}

function showStatus(form, type, message) {
  const status = getStatusElement(form);
  status.textContent = message;
  status.className = `web3form-status web3form-status--${type}`;
}

function setSubmitting(form, isSubmitting) {
  const button = form.querySelector('button[type="submit"], input[type="submit"]');
  if (!button) return;

  if (isSubmitting) {
    button.dataset.originalLabel = button.dataset.originalLabel || button.innerHTML || button.value || '';
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    if (button.tagName === 'INPUT') {
      button.value = 'Sending...';
    } else {
      button.innerHTML = 'Sending...';
    }
    return;
  }

  button.disabled = false;
  button.removeAttribute('aria-busy');
  if (button.dataset.originalLabel) {
    if (button.tagName === 'INPUT') {
      button.value = button.dataset.originalLabel;
    } else {
      button.innerHTML = button.dataset.originalLabel;
    }
  }
}

function ensureHoneypot(form) {
  if (form.querySelector('[name="botcheck"]')) return;

  const honeypot = document.createElement('input');
  honeypot.type = 'checkbox';
  honeypot.name = 'botcheck';
  honeypot.className = 'web3form-honeypot';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  honeypot.setAttribute('aria-hidden', 'true');
  form.prepend(honeypot);
}

function prepareForms() {
  document.querySelectorAll('#main-content form').forEach((form) => {
    if (!getManagedForm(form)) return;
    ensureHoneypot(form);
  });
}

function getField(form, name) {
  return String(new FormData(form).get(name) || '').trim();
}

function buildPayload(form) {
  const formData = new FormData(form);
  if (formData.get('botcheck')) return null;

  const formType = getFormType(form);
  const email = getField(form, 'email');
  const name = getField(form, 'name') || getField(form, 'username') || email.split('@')[0] || 'Website visitor';
  const phone = getField(form, 'phone');
  const service = getField(form, 'service');
  const date = getField(form, 'date');
  const address = getField(form, 'address');
  const consent = getField(form, 'consent');
  let message = getField(form, 'message');

  if (!message && formType === 'consultation') {
    message = ['Homepage consultation request.', phone && `Phone: ${phone}`, date && `Preferred date: ${date}`]
      .filter(Boolean)
      .join('\n');
  }

  if (!message && formType === 'newsletter') {
    message = 'Newsletter subscription request.';
  }

  return {
    access_key: SITE.web3forms.accessKey,
    subject: FORM_SUBJECTS[formType],
    from_name: SITE.name,
    name,
    email,
    phone,
    service,
    date,
    address,
    consent,
    message,
    form_type: formType,
    page_url: window.location.href,
    site_email: SITE.email,
  };
}

function validateForm(form) {
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  const formType = getFormType(form);
  const payload = buildPayload(form);
  if (!payload) return false;

  if (!payload.email) {
    showStatus(form, 'error', 'Please enter a valid email address.');
    return false;
  }

  if (!['newsletter', 'consultation'].includes(formType) && !payload.message) {
    showStatus(form, 'error', 'Please add your message or project details before submitting.');
    return false;
  }

  return true;
}

async function submitToWeb3Forms(payload) {
  const response = await fetch(SITE.web3forms.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Unable to send your message right now. Please try again.');
  }

  return result;
}

async function handleSubmit(event) {
  const form = getManagedForm(event.target);
  if (!form) return;

  event.preventDefault();
  const status = form.querySelector('.web3form-status');
  if (status) status.textContent = '';

  if (!validateForm(form)) return;

  const payload = buildPayload(form);
  if (!payload) return;

  setSubmitting(form, true);

  try {
    await submitToWeb3Forms(payload);
    form.reset();
    showStatus(
      form,
      'success',
      getFormType(form) === 'newsletter'
        ? 'Thank you. You have been subscribed successfully.'
        : 'Thank you. Your message was sent successfully. We will get back to you soon.',
    );
  } catch (error) {
    showStatus(form, 'error', error.message || 'Something went wrong. Please try again.');
  } finally {
    setSubmitting(form, false);
  }
}

let initialized = false;

export function initWeb3Forms() {
  prepareForms();
  if (initialized) return;
  initialized = true;
  document.addEventListener('submit', handleSubmit);
}
