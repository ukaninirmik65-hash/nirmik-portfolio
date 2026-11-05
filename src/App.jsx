import BrandLogo from "./components/BrandLogo.jsx";
import { useState } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Header from "./components/Header.jsx";
import { Icon } from "./components/UI.jsx";
import { navigation } from "./data/portfolio.js";
import {
  Hero,
  TechBand,
  About,
  Skills,
  Experience,
} from "./sections/Introduction.jsx";
import Projects from "./sections/Projects.jsx";
import { Services, Process, FAQ } from "./sections/Services.jsx";
import Contact from "./sections/Contact.jsx";
import { Analytics } from "@vercel/analytics/next";

function Progress() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : spring }}
    />
  );
}
export default function App() {
  const [service, setService] = useState("");
  const [contactRequest, setContactRequest] = useState(0);
  const discussService = (value) => {
    setService(value);
    setContactRequest((request) => request + 1);
  };
  return (
    <MotionConfig reducedMotion="user">
      <Analytics></Analytics>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Progress />
      <Header />
      <main id="main">
        <Hero />
        <TechBand />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services onSelect={discussService} />
        <Process />
        <FAQ />
        <Contact
          service={service}
          onServiceChange={setService}
          request={contactRequest}
        />
      </main>
      <footer className="footer wrap">
        <div className="footer-top">
          <a className="wordmark" href="#home" aria-label="Nirmik Ukani home">
            <BrandLogo />
          </a>
          <p>
            Thoughtful interfaces.
            <br />
            Built with intention.
          </p>
          <a href="#home" className="text-link">
            Back to top <Icon name="arrow" size={17} />
          </a>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navigation.map((link) => (
            <a href={`#${link.id}`} key={link.id}>
              {link.name}
            </a>
          ))}
        </nav>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nirmik Ukani</span>
          <span>Gujarat, India · Built with React</span>
        </div>
      </footer>
    </MotionConfig>
  );
}
