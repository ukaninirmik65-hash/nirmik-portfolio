import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile, skills, experience } from "../data/portfolio.js";
import {
  Icon,
  Reveal,
  Button,
  Socials,
  SectionTitle,
} from "../components/UI.jsx";

function Role() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const roles = [
    "React.js Developer",
    "Frontend Developer",
    "Freelance Web Developer",
  ];
  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % 3), 4500);
    return () => clearInterval(timer);
  }, [reduce]);
  return (
    <span
      className="rotating-role"
      aria-label="Frontend Developer, React.js Developer, Freelance Web Developer"
    >
      <AnimatePresence mode="wait">
        <motion.span
          aria-hidden="true"
          key={index}
          initial={reduce ? false : { y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="home" className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-grid">
        <Reveal className="hero-copy">
          <p className="status-pill">
            <span className="status-dot" /> FRONTEND DEVELOPMENT · FREELANCE /
            REMOTE
          </p>
          <p className="hero-intro">
            HELLO, I’M NIRMIK UKANI <Icon name="arrow" size={15} />
          </p>
          <h1 id="hero-title">
            <span className="sr-only">Thoughtful code. Meaningful experiences.</span>
            <span className="hero-title-lines" aria-hidden="true">
              {['Thoughtful code.','Meaningful','experiences.'].map((line,index) => <span className="text-reveal-line" key={line}><motion.span initial={reduce?false:{y:'105%'}} animate={{y:0}} transition={{duration:reduce?0:.7,delay:reduce?0:.08+index*.09,ease:[.22,1,.36,1]}}>{line}</motion.span></span>)}
            </span>
          </h1>
          <p className="hero-description">
            I build responsive websites and React interfaces that bring ideas to
            life. Clean code, considered details, and a focus on the people
            using them.
          </p>
          <div className="hero-buttons">
            <Button href="#projects">Explore my work</Button>
            <Button href="#contact" secondary>
              Let’s build something
            </Button>
          </div>
          <div className="hero-meta">
            <span>
              <i />
              <Role />
            </span>
            <span>
              <Icon name="location" size={14} />
              Gujarat, India
            </span>
          </div>
        </Reveal>
        <Reveal className="portrait-card" delay={0.12}>
          <div className="portrait-top">
            <span>THE PERSON BEHIND THE PIXELS</span>
            <Icon name="arrow" size={18} />
          </div>
          <img
            className="profile-photo"
            src={profile.photo}
            alt="Professional portrait of Nirmik Ukani wearing a suit and glasses"
            width={profile.photoWidth}
            height={profile.photoHeight}
            fetchPriority="high"
          />
          <div className="portrait-caption">
            <div>
              <strong>Nirmik Ukani</strong>
              <span>Frontend developer · Gujarat, IN</span>
            </div>
            <span className="signature">nu.</span>
          </div>
        </Reveal>
      </div>
      <div className="hero-bottom">
        <span>CRAFTED WITH CARE. BUILT WITH REACT.</span>
        <a href="#about">
          A little more about me <Icon name="down" size={16} />
        </a>
      </div>
    </section>
  );
}

export function TechBand() {
  return (
    <div className="tech-band">
      <div className="wrap tech-band-inner">
        <span className="tech-band-label">
          MY EVERYDAY
          <br />
          BUILDING BLOCKS
        </span>
        {["react", "javascript", "tailwind", "html", "css", "git"].map(
          (icon) => {
            const skill = skills.find((item) => item.icon === icon);
            return (
              <span key={icon}>
                <Icon name={icon} size={23} />
                {skill.name}
              </span>
            );
          },
        )}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section wrap">
      <SectionTitle
        number="01"
        label="A LITTLE ABOUT ME"
        title={
          <>
            Good interfaces start
            <br />
            with <em>thoughtful details.</em>
          </>
        }
      />
      <div className="about-grid">
        <Reveal className="about-aside">
          <div className="monogram" aria-hidden="true">
            n<span>u</span>.<Icon name="arrow" size={24} />
          </div>
          <p>
            Frontend developer.
            <br />
            Constantly curious.
          </p>
          <Socials compact />
        </Reveal>
        <Reveal className="about-copy">
          <p className="lead-copy">{profile.about}</p>
          <p>{profile.approach}</p>
          <div className="values">
            <span>
              <Icon name="code" size={18} />
              Clean, maintainable code
            </span>
            <span>
              <Icon name="devices" size={18} />
              Responsive by design
            </span>
            <span>
              <Icon name="sparkles" size={18} />
              Details that make a difference
            </span>
          </div>
          <a className="text-link" href="#experience">
            Explore my experience <Icon name="right" size={17} />
          </a>
          {profile.resume && (
            <Button href={profile.resume} external>
              Download resume
            </Button>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section section-tinted">
      <div className="wrap">
        <SectionTitle
          number="02"
          label="THE TOOLKIT"
          title={
            <>
              The tools behind
              <br />
              <em>the experience.</em>
            </>
          }
          description="A focused frontend toolkit, and a commitment to keep learning."
        />
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <Reveal
              key={skill.name}
              className="skill-card"
              delay={(i % 4) * 0.055} distance={14}
            >
              <Icon name={skill.icon} size={28} />
              <div>
                <h3>{skill.name}</h3>
                <span>{skill.category}</span>
              </div>
              {skill.category === "Beginner" && <i className="learning-dot" />}
            </Reveal>
          ))}
        </div>
        <p className="section-note">
          TypeScript and Next.js are part of my learning journey.
        </p>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section wrap">
      <SectionTitle
        number="03"
        label="PROFESSIONAL JOURNEY"
        title={
          <>
            Learning by doing.
            <br />
            <em>Growing with teams.</em>
          </>
        }
      />
      <div className="experience-grid">
        <Reveal className="experience-aside">
          <Icon name="code" size={36} />
          <h3>
            Self-taught curiosity.
            <br />
            Professional experience.
          </h3>
          <p>
            From my first internship to building React interfaces with a remote
            team.
          </p>
          <span className="eyebrow">GUJARAT, INDIA ↗</span>
        </Reveal>
        <div className="timeline">
          {experience.map((job) => (
            <Reveal
              key={job.role + job.company}
              className={`job ${job.current ? "current" : ""}`}
            >
              <span className="timeline-dot" />
              <div className="job-top">
                <span>{job.date}</span>
                {job.current && <span className="badge">CURRENT</span>}
              </div>
              <h3>{job.role}</h3>
              <p className="company">{job.company}</p>
              <p className="job-meta">{job.meta}</p>
              {job.details.length > 0 && (
                <ul>
                  {job.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
