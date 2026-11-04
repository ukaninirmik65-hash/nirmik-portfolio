import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { DiCss3 } from "react-icons/di";
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiGit,
  SiGithub,
  SiTypescript,
  SiNextdotjs,
} from "react-icons/si";
import { Icon, Reveal, SectionTitle } from "../components/UI.jsx";
import "../styles/tech-stack.css";

const groups = [
  {
    id: "core",
    name: "Core Frontend",
    note: "The foundation of my frontend work.",
    items: [
      {
        name: "HTML5",
        logo: SiHtml5,
        detail: "Page structure and semantic markup.",
      },
      {
        name: "CSS3",
        logo: DiCss3,
        detail: "Responsive layouts and detailed visual styling.",
      },
      {
        name: "JavaScript",
        logo: SiJavascript,
        detail: "Browser logic and interactive experiences.",
      },
      {
        name: "React.js",
        logo: SiReact,
        detail: "Reusable components and responsive user interfaces.",
        float: true,
      },
    ],
  },
  {
    id: "ui",
    name: "UI Frameworks",
    note: "Consistent styling, considered interfaces.",
    items: [
      {
        name: "Tailwind CSS",
        logo: SiTailwindcss,
        detail: "Utility-first styling for responsive interfaces.",
      },
      {
        name: "Bootstrap",
        logo: SiBootstrap,
        detail: "Responsive grids and interface components.",
      },
    ],
  },
  {
    id: "tools",
    name: "Tools & Development",
    note: "From version control to connected interfaces.",
    items: [
      {
        name: "Git",
        logo: SiGit,
        detail: "Version control for tracking and managing code changes.",
      },
      {
        name: "GitHub",
        logo: SiGithub,
        detail: "Repository hosting and collaborative development workflows.",
      },
      {
        name: "REST API Integration",
        detail: "Connecting frontend interfaces to REST API data and services.",
      },
    ],
  },
  {
    id: "learning",
    name: "Currently Learning",
    note: "Beginner knowledge. Always building on it.",
    items: [
      {
        name: "TypeScript",
        logo: SiTypescript,
        detail: "Learning typed JavaScript fundamentals.",
        learning: true,
      },
      {
        name: "Next.js",
        logo: SiNextdotjs,
        detail: "Learning the fundamentals of this React framework.",
        learning: true,
      },
    ],
  },
];
const technologies = groups.flatMap((group) => group.items);

export default function InteractiveSkills() {
  const section = useRef(null);
  const inView = useInView(section, { amount: 0.1 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState("React.js");
  const selected = technologies.find((item) => item.name === active);
  return (
    <section
      ref={section}
      id="skills"
      className="section section-tinted tech-stack"
      aria-labelledby="tech-stack-title"
      data-in-view={inView}
    >
      <div className="wrap">
        <SectionTitle
          number="02"
          label="INTERACTIVE TECH STACK"
          title={
            <>
              <span id="tech-stack-title">The tools behind</span>
              <br />
              <em>the experience.</em>
            </>
          }
          description="A focused frontend toolkit, with room to keep growing. Explore the technologies I work with."
        />
        <Reveal className="tech-stack-bar">
          <span>
            <Icon name="code" size={17} /> FRONTEND, WITH INTENTION
          </span>
          <span>
            11 technologies <i aria-hidden="true">/</i> 4 areas of focus
          </span>
        </Reveal>
        <div className="tech-stack-groups">
          {groups.map((group, groupIndex) => (
            <Reveal
              key={group.id}
              className={`tech-group tech-group--${group.id}`}
              delay={groupIndex * 0.04}
            >
              <div className="tech-group-header">
                <div>
                  <span className="tech-group-number">0{groupIndex + 1} /</span>
                  <h3>{group.name}</h3>
                </div>
                <p>{group.note}</p>
              </div>
              <ul className="tech-card-list" aria-label={group.name}>
                {group.items.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: reduce ? 0 : 0.4,
                      delay: reduce ? 0 : index * 0.055,
                    }}
                  >
                    <button
                      type="button"
                      className="tech-card"
                      aria-label={item.name}
                      aria-pressed={active === item.name}
                      aria-describedby={
                        active === item.name
                          ? "tech-stack-selection"
                          : undefined
                      }
                      onClick={() => setActive(item.name)}
                    >
                      <span
                        className={`tech-card-logo ${item.float ? "is-floating" : ""}`}
                        aria-hidden="true"
                      >
                        {item.logo ? (
                          <item.logo size={38} />
                        ) : (
                          <span className="tech-rest-mark">
                            REST
                            <br />
                            <small>API</small>
                          </span>
                        )}
                      </span>
                      <span className="tech-card-name">{item.name}</span>
                      <span className="tech-card-caption">
                        {item.learning
                          ? "Currently learning"
                          : group.id === "core"
                            ? "Core frontend"
                            : "Explore technology"}
                      </span>
                      <span className="tech-card-corner" aria-hidden="true">
                        <Icon
                          name={active === item.name ? "check" : "arrow"}
                          size={13}
                        />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div
          className="tech-stack-selection"
          id="tech-stack-selection"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="tech-selection-symbol" aria-hidden="true">
            &lt;/&gt;
          </span>
          <div>
            <strong>{selected.name}</strong>
            <p>{selected.detail}</p>
          </div>
          <span className="tech-selection-hint">
            Select a technology to explore
          </span>
        </div>
        <p className="tech-stack-note">
          TypeScript and Next.js are part of my learning journey, with
          beginner-level knowledge.
        </p>
      </div>
    </section>
  );
}
