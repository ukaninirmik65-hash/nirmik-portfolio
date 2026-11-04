import { useState } from "react";
import { profile } from "../data/portfolio.js";
import { whatsappLink, emailLink } from "../utils/inquiry.js";
import { Icon, Reveal, Socials } from "../components/UI.jsx";
import InquiryForm from "../components/InquiryForm.jsx";

export default function Contact({ service, onServiceChange }) {
  const [copyStatus, setCopyStatus] = useState("");
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
          <Reveal>
            <InquiryForm service={service} onServiceChange={onServiceChange} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
