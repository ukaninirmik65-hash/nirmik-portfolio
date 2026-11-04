import BrandLogo from "../components/BrandLogo.jsx";
import { services, process, faqs } from "../data/portfolio.js";
import { Icon, Reveal, SectionTitle } from "../components/UI.jsx";

export function Services({ onSelect }) {
  return (
    <section id="services" className="section wrap">
      <SectionTitle
        number="05"
        label="HOW I CAN HELP"
        title={
          <>
            Your idea.
            <br />
            <em>My frontend focus.</em>
          </>
        }
        description="From a landing page to a React interface. Thoughtful execution, tailored to your brief."
      />
      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal
            className="service-card"
            key={service.id}
            delay={(index % 4) * 0.03}
          >
            <div className="service-top">
              <Icon name={service.icon} size={26} />
              <span>0{index + 1}</span>
            </div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <a
              href="#contact"
              onClick={() => onSelect(service.id)}
              aria-label={`Discuss ${service.name}`}
            >
              Let’s discuss <Icon name="arrow" size={19} />
            </a>
          </Reveal>
        ))}
        <Reveal className="service-card service-invite">
          <span className="brand-invite-mark" aria-hidden="true">
            <BrandLogo iconOnly />
          </span>
          <h3>
            Have something
            <br />
            in mind?
          </h3>
          <p>A clear brief is the start of something good.</p>
          <a href="#contact">
            Tell me about it <Icon name="arrow" size={19} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="section section-tinted">
      <div className="wrap">
        <SectionTitle
          number="06"
          label="THE WAY I WORK"
          title={
            <>
              A clear process.
              <br />
              <em>A better result.</em>
            </>
          }
        />
        <div className="process-grid">
          {process.map((step, index) => (
            <Reveal
              className="process-step"
              key={step.title}
              delay={index * 0.03}
            >
              <div className="process-number">
                <span>0{index + 1}</span>
                <Icon name="right" size={17} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="section wrap faq-grid" aria-labelledby="faq-title">
      <Reveal>
        <p className="eyebrow">
          <span>LET’S MAKE IT CLEAR /</span>
        </p>
        <h2 id="faq-title">
          Good questions.
          <br />
          <em>Clear answers.</em>
        </h2>
        <p className="faq-intro">
          Have another question?
          <br />
          <a className="text-link" href="#contact">
            Let’s talk <Icon name="arrow" size={16} />
          </a>
        </p>
      </Reveal>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details className="faq" key={faq.question}>
            <summary>
              <span>0{index + 1}</span>
              <h3>{faq.question}</h3>
              <Icon name="plus" size={17} />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
