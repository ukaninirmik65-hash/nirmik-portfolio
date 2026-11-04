import { useEffect, useRef, useState } from "react";
import { services } from "../data/portfolio.js";
import {
  pageOptions,
  durationOptions,
  designOptions,
  featureOptions,
  emptyInquiry,
} from "../data/inquiry.js";
import {
  validateContact,
  createInquiryMessage,
  emailLink,
  whatsappLink,
} from "../utils/inquiry.js";
import { Icon } from "./UI.jsx";
import { submitToWeb3Forms } from "../utils/web3forms.js";
import { getWeb3FormsAccessKey, hasWeb3FormsAccessKey } from "../config/web3forms.js";

function Field({ name, label, required, error, children }) {
  return (
    <div className="field">
      <label htmlFor={`inquiry-${name}`}>
        {label}
        {required && <span> *</span>}
      </label>
      {children}
      {error && (
        <span className="field-error" id={`${name}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
export default function InquiryForm({
  service,
  onServiceChange,
  sendInquiry = submitToWeb3Forms,
}) {
  const [values, setValues] = useState({ ...emptyInquiry });
  const [validationShown, setValidationShown] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const submitting = useRef(false);
  const form = useRef(null);
  const projectDetails = useRef(null);
  const feedback = useRef(null);
  const canSend = sendInquiry !== submitToWeb3Forms || hasWeb3FormsAccessKey(getWeb3FormsAccessKey());
  useEffect(() => {
    if (!apiError && !successMessage) return;
    const dialog = form.current?.closest("dialog");
    if (!dialog || dialog.open) feedback.current?.focus();
  }, [apiError, successMessage]);
  const current = { ...values, service };
  const errors = validationShown ? validateContact(current) : {};
  const hasValidationErrors = Object.values(errors).some(Boolean);
  const update = (event) => {
    if (submitting.current) return;
    const { name, value } = event.target;
    if (name === "service") onServiceChange(value);
    else setValues((prev) => ({ ...prev, [name]: value }));
    setPrepared(false);
    setSuccessMessage('');
  };
  const toggleFeature = (feature) => {
    if (submitting.current) return;
    setValues((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((item) => item !== feature)
        : [...prev.features, feature],
    }));
    setPrepared(false);
    setSuccessMessage('');
  };
  const validate = () => {
    const next = validateContact(current);
    setValidationShown(true);
    if (Object.keys(next).length) {
      setPrepared(false);
      const invalid = form.current.elements.namedItem(Object.keys(next)[0]);
      if (invalid?.closest("details")) invalid.closest("details").open = true;
      invalid?.focus();
      return false;
    }
    return true;
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!canSend) { prepare(event); return; }
    if (submitting.current || !validate()) return;
    submitting.current = true;
    setPrepared(false);
    setApiError('');
    setSuccessMessage('');
    setIsSending(true);
    try {
      const result = await sendInquiry(current, {
        botcheck: !!form.current.elements.namedItem("botcheck")?.checked,
      });
      if (result?.success !== true) throw new Error('The submission was not confirmed. Please try again.');
      setValues({ ...emptyInquiry });
      onServiceChange("");
      form.current.reset();
      if (projectDetails.current) projectDetails.current.open = false;
      setValidationShown(false);
      setSuccessMessage(
        "Thank you! Your inquiry was submitted successfully. I’ll review your brief and get back to you.",
      );
    } catch (error) {
      setApiError(
        error.message ||
          "Unable to send your inquiry. Please try again or contact me directly.",
      );
    } finally {
      submitting.current = false;
      setIsSending(false);
    }
  };
  const attributes = (name) => ({
    id: `inquiry-${name}`,
    name,
    value: current[name],
    onChange: update,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const select = (name, label, options, required = false) => (
    <Field name={name} label={label} required={required} error={errors[name]}>
      <div className="select-wrap">
        <select {...attributes(name)} required={required}>
          <option value="">
            {required ? "Please select" : "Optional — select if known"}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon name="chevron" size={16} />
      </div>
    </Field>
  );
  const message = createInquiryMessage(current);
  // Includes externally selected service in the validity check so an old prepared
  // draft never stays enabled after choosing a new service card.
  const preparedFor = useRef("");
  const validPrepared =
    prepared && preparedFor.current === JSON.stringify(current);
  function prepare(event) {
    event.preventDefault();
    if (submitting.current || !validate()) return;
    preparedFor.current = JSON.stringify(current);
    setPrepared(true);
    setSuccessMessage('');
  }
  return (
    <div className="inquiry-panel contact-form-panel">
      <div className="inquiry-top">
        <span>START A CONVERSATION</span>
        <Icon name="arrow" size={24} />
      </div>
      <div className="contact-form-intro">
        <h3 id="inquiry-title">Let’s build <em>something good.</em></h3>
        <p>Tell me what you have in mind. I’ll reply to your email to discuss the next step.</p>
        <span>Fields marked * are required.</span>
      </div>
      {!canSend && <div className="form-availability" role="status"><Icon name="mail" size={19} /><div><strong>Send your brief by email or WhatsApp</strong><p>Online sending is temporarily unavailable. You can still fill in this form and prepare a message below. Nothing is sent until you send it in your email or WhatsApp app.</p></div></div>}
      <form aria-labelledby="inquiry-title" ref={form} onSubmit={submit} noValidate aria-busy={isSending}>
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />
        {hasValidationErrors && <div className="validation-summary" role="alert">Please correct the highlighted fields before sending.</div>}
        <fieldset
          disabled={isSending}
          style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}
        >
          <div className="form-row">
            <Field name="name" label="Your name" required error={errors.name}>
              <input
                {...attributes("name")}
                autoComplete="name"
                maxLength={100}
                required
                placeholder="Your full name"
              />
            </Field>
            <Field
              name="email"
              label="Email address"
              required
              error={errors.email}
            >
              <input
                {...attributes("email")}
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                placeholder="you@company.com"
              />
            </Field>
          </div>
          <Field name="phone" label="WhatsApp / Phone" error={errors.phone}>
            <input
              {...attributes("phone")}
              type="tel"
              autoComplete="tel"
              maxLength={30}
              placeholder="Optional — include country code"
            />
          </Field>
          {select(
            "service",
            "What can I help you with?",
            services.map((s) => ({ value: s.id, label: s.name })),
            true,
          )}
          <Field
            name="message"
            label="Tell me about your project"
            required
            error={errors.message}
          >
            <textarea
              {...attributes("message")}
              rows={5}
              aria-describedby={[errors.message ? "message-error" : "", "message-hint"].filter(Boolean).join(" ")}
              minLength={20}
              maxLength={3000}
              required
              placeholder="Your goals, desired features, and anything I should know…"
            />
            <span className="field-hint" id="message-hint">At least 20 characters · {values.message.length}/3000</span>
          </Field>
          <details className="project-details" ref={projectDetails}>
            <summary><span>Additional project details <small>Optional</small></span><Icon name="plus" size={18} /></summary>
            <div className="project-details-content">
              <p>Have a clearer brief? Add the details below, or leave them for our conversation.</p>
              <Field
                name="company"
                label="Company / organization"
                error={errors.company}
              >
                <input
                  {...attributes("company")}
                  autoComplete="organization"
                  maxLength={150}
                  placeholder="Optional"
                />
              </Field>
              <div className="form-row">
                {select("pages", "Number of pages", pageOptions)}
                {select(
                  "duration",
                  "Preferred project timeline",
                  durationOptions,
                )}
              </div>
              {select("design", "Design readiness", designOptions)}
              <Field
                name="website"
                label="Existing website / reference URL"
                error={errors.website}
              >
                <input
                  {...attributes("website")}
                  type="url"
                  maxLength={500}
                  placeholder="https://example.com (optional)"
                />
              </Field>
              <fieldset className="feature-options">
                <legend>
                  Anything else you need? <span>Optional</span>
                </legend>
                {featureOptions.map((feature) => (
                  <label key={feature}>
                    <input
                      type="checkbox"
                      name="features"
                      value={feature}
                      checked={values.features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          </details>
          <p className="personal-quote">
            <Icon name="person" size={15} />I personally review every brief and
            provide a custom quotation.
          </p>
          <button
            type="submit"
            className="button form-submit"
            disabled={isSending}
          >
            {isSending ? "Sending…" : canSend ? "Send message" : "Prepare email / WhatsApp message"}{" "}
            <Icon name="right" size={18} />
          </button>
          <p className="privacy-note">
            {canSend ? "No email app needed. Your message is submitted directly, and I’ll reply to the email address you provide." : "Preparing a draft does not submit your inquiry. Review and send it using one of the actions below."}
          </p>
          {canSend && <button
            type="button"
            className="text-link"
            style={{ marginTop: 14, background: "transparent", padding: 0 }}
            onClick={prepare}
          >
            Prefer email or WhatsApp? Prepare a draft{" "}
            <Icon name="arrow" size={15} />
          </button>}
          {validPrepared && (
            <div className="prepared-actions">
              <a className="button" href={emailLink(message)}>
                <Icon name="mail" size={16} />
                Open email draft
              </a>
              <a
                className="button button-secondary"
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="message" size={16} />
                Open WhatsApp
              </a>
            </div>
          )}
        </fieldset>
        {isSending && <p className="submission-loading" role="status"><span className="sending-dot" aria-hidden="true"/>Sending your inquiry…</p>}
        {apiError && <div ref={feedback} tabIndex={-1} className="submission-alert submission-error" role="alert"><div><strong>Message not sent</strong><p>{apiError}</p></div><button type="button" className="icon-button" aria-label="Dismiss submission error" onClick={() => setApiError('')}><Icon name="close" size={16}/></button></div>}
        {successMessage && <div ref={feedback} tabIndex={-1} className="submission-alert submission-success" role="status"><Icon name="check" size={20}/><div><strong>Message submitted</strong><p>{successMessage}</p></div></div>}
        {validPrepared && <p className="form-status draft-status" role="status">Your draft is ready. Review and send it in your email or WhatsApp app. This draft has not been submitted.</p>}
      </form>
    </div>
  );
}
