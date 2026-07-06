import { forwardRef, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './consultation-datepicker.css';
import { SITE } from '../config/site';

const DateInput = forwardRef(function DateInput(
  { value, onClick, onChange, placeholder, onFocus, onBlur, id, name },
  ref,
) {
  return (
    <div className="consultation-date-input-wrapper">
      <input
        ref={ref}
        type="text"
        id={id}
        name={name}
        readOnly
        value={value ?? ''}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete="off"
        aria-label="Preferred consultation date"
      />
      <span className="icon" aria-hidden="true">
        <i className="icon-8" />
      </span>
    </div>
  );
});

export default function ConsultationForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return undefined;

    const onReset = () => setSelectedDate(null);
    form.addEventListener('reset', onReset);
    return () => form.removeEventListener('reset', onReset);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.set('access_key', SITE.web3forms.accessKey);
    formData.set('subject', `Consultation Request - ${SITE.shortName}`);
    formData.set('from_name', SITE.name);
    formData.set('site_email', SITE.email);
    formData.set('page_url', window.location.href);
    formData.set('form_type', 'consultation');

    if (selectedDate) {
      formData.set('date', selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }));
    }

    const message = [
      'Homepage consultation request.',
      formData.get('phone') && `Phone: ${formData.get('phone')}`,
      formData.get('date') && `Preferred date: ${formData.get('date')}`
    ].filter(Boolean).join('\n');
    formData.set('message', message);

    setIsSubmitting(true);
    try {
      const response = await fetch(SITE.web3forms.endpoint, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          form.reset();
          setSelectedDate(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="search-field">
      <div className="auto-container">
        <div className="outer-container">
          <div className="title-text centred p_relative d_block">
            <h6>Request a Free Electrical Consultation</h6>
          </div>
          {showSuccess && (
            <div className="consultation-success-notification">
              <i className="fa-solid fa-check-circle"></i>
              <span>Thank you! Your request has been submitted successfully.</span>
            </div>
          )}
          <div className="search-area">
            <form ref={formRef} onSubmit={handleSubmit} method="post">
              <div className="row clearfix">
                <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                  <input type="text" name="name" placeholder="Your name" required />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                  <input type="email" name="email" placeholder="Your email" required />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                  <input type="text" name="phone" placeholder="Phone" required />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 form-group consultation-date-field">
                  <DatePicker
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    dateFormat="MM/dd/yyyy"
                    minDate={new Date()}
                    placeholderText="Date"
                    id="consultation-date"
                    name="date"
                    customInput={<DateInput />}
                    showPopperArrow={false}
                    popperPlacement="bottom-start"
                    popperProps={{ strategy: 'fixed' }}
                    calendarClassName="consultation-datepicker-calendar"
                    popperClassName="consultation-datepicker-popper"
                    shouldCloseOnSelect
                  />
                </div>
              </div>
              <div className="btn-box">
                <button type="submit" className="theme-btn btn-one" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Request a Quote'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
