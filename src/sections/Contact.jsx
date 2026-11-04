import { useEffect, useRef, useState } from "react";
import { profile } from "../data/portfolio.js";
import { whatsappLink, emailLink } from "../utils/inquiry.js";
import { Icon, Reveal, Socials } from "../components/UI.jsx";
import InquiryForm from "../components/InquiryForm.jsx";

export default function Contact({ service, onServiceChange, request = 0 }) {
  const [copyStatus, setCopyStatus] = useState("");
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    if (request) setOpen(true);
  }, [request]);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    element.querySelector('input[name="name"]')?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      if (element.open) element.close();
    };
  }, [open]);
  const closeFromBackdrop = (event) => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) setOpen(false);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus(`Please copy the address: ${profile.email}`);
    }
  };
  return (
    <section id="contact" className="section contact-section">
      <div className="wrap">
        <p className="eyebrow">
          <span>07 /</span>THE NEXT GOOD THING STARTS HERE
        </p>
        <div className="contact-grid">
          <Reveal className="contact-copy">
            <h2>
              Have an idea?
              <br />
              Let’s make
              <br />
              <em>it happen.</em>
            </h2>
            <p>
              Tell me what you’re working on.
              <br />
              Let’s find the right frontend solution together.
            </p>
            <div className="contact-email-row">
              <a href={emailLink()} className="contact-email">
                {profile.email}
                <Icon name="arrow" size={20} />
              </a>
              <button
                type="button"
                className="icon-button"
                onClick={copy}
                aria-label="Copy email address"
              >
                <Icon name="copy" size={17} />
              </button>
            </div>
            <a
              className="whatsapp-link"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="message" size={20} />
              WhatsApp · {profile.phone}
              <Icon name="arrow" size={16} />
            </a>
            <p className="contact-location">
              <Icon name="location" size={16} />
              {profile.location} · Freelance / Remote
            </p>
            <Socials />
            <p className="copy-status" role="status" aria-live="polite">
              {copyStatus}
            </p>
            <div className="contact-note">
              <Icon name="sparkles" size={20} />
              <p>
                A little clarity goes a long way.
                <span>
                  Share the pages, features, and timeline you have in mind.
                  We’ll take it from there.
                </span>
              </p>
            </div>
          </Reveal>
          <Reveal className="contact-invite">
            <span className="contact-invite-icon"><Icon name="message" size={30} /></span>
            <p className="eyebrow">A GOOD PROJECT STARTS WITH A HELLO</p>
            <h3>Your next idea.<br /><em>Let’s talk about it.</em></h3>
            <p>A new website, a React interface, or a frontend fix. Share a few details and let’s see how I can help.</p>
            <button type="button" className="button" onClick={() => setOpen(true)}>
              Start a conversation <Icon name="arrow" size={19} />
            </button>
            <div className="contact-invite-footer">
              <Icon name="mail" size={16} />
              <span>Prefer email? <a href={emailLink()}>Write to me directly</a></span>
            </div>
          </Reveal>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="contact-dialog"
        aria-labelledby="inquiry-title"
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onClick={closeFromBackdrop}
      >
        <div className="contact-dialog-toolbar">
        <button type="button" className="icon-button contact-dialog-close"
          aria-label="Close contact form" onClick={() => setOpen(false)}>
          <Icon name="close" size={20} />
        </button>
        </div>
        <InquiryForm service={service} onServiceChange={onServiceChange} />
        <p className="contact-dialog-fallback">Or email me directly at <a href={emailLink()}>{profile.email}</a></p>
      </dialog>
    </section>
  );
}
