import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects } from "../data/portfolio.js";
import { Icon, Reveal, SectionTitle } from "../components/UI.jsx";

const filters = ["All work", "React", "JavaScript", "Websites", "In Progress"];
function Cover({ project }) {
  const [failed, setFailed] = useState(false);
  const titles = {
    erp: (
      <>
        Business.
        <br />
        <em>Organized.</em>
      </>
    ),
    agency: (
      <>
        Digital.
        <br />
        <em>Different.</em>
      </>
    ),
    atal: (
      <>
        Atal
        <br />
        <em>Kriya.</em>
      </>
    ),
    motiwala: (
      <>
        Motiwala
        <br />
        <em>Perfumes.</em>
      </>
    ),
  };
  return (
    <div className={`project-visual visual-${project.color}`}>
      <div className="cover-header">
        <span>{project.type}</span>
        <Icon name="arrow" size={16} />
      </div>
      {project.image && !failed ? (
        <div className="browser-preview">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>{new URL(project.live).hostname}</span>
          </div>
          <img
            src={project.image}
            alt={`${project.name} actual website screenshot`}
            width="1280"
            height="720"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div
          className="illustrated-cover"
          aria-label={`${project.name} illustrated project cover, not a screenshot`}
        >
          {project.id === "tetris" ? (
            <>
              <span className="cover-kicker">PLAY. ROTATE. REPEAT.</span>
              <div className="tetris-art" aria-hidden="true">
                {Array.from({ length: 40 }, (_, i) => (
                  <i key={i} className={`block-${i % 6}`} />
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="cover-kicker">
                {project.category === "React"
                  ? "BUILT WITH REACT"
                  : "A STUDY IN INTERFACES"}
              </span>
              <span className="cover-title">
                {titles[project.id] || project.name}
              </span>
            </>
          )}
          <span className="cover-foot">ILLUSTRATED PROJECT COVER</span>
        </div>
      )}
      <span
        className={`project-status ${project.status === "In Progress" ? "in-progress" : ""}`}
      >
        <i />
        {project.status}
      </span>
    </div>
  );
}
function Card({ project, index }) {
  return (
    <article className="project-card">
      <Cover project={project} />
      <div className="project-info">
        <div className="project-title">
          <h3>{project.name}</h3>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <p>{project.description}</p>
        <div className="tags">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <details className="project-notes">
          <summary>
            Project scope & notes <Icon name="plus" size={13} />
          </summary>
          <p>{project.note}</p>
          {project.credit && (
            <a href={project.credit} target="_blank" rel="noopener noreferrer">
              Original Figma design credit <Icon name="arrow" size={13} />
            </a>
          )}
        </details>
        <div className="project-links">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} source code (new tab)`}
          >
            <Icon name="github" size={17} /> Source code{" "}
            <Icon name="arrow" size={14} />
          </a>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live demo (new tab)`}
            >
              Live demo <Icon name="arrow" size={16} />
            </a>
          ) : (
            <span>Source available</span>
          )}
        </div>
      </div>
    </article>
  );
}
export default function Projects() {
  const [filter, setFilter] = useState("All work");
  const reduce = useReducedMotion();
  const visible = projects.filter(
    (p) =>
      filter === "All work" || p.category === filter || p.status === filter,
  );
  return (
    <section id="projects" className="section section-tinted">
      <div className="wrap">
        <SectionTitle
          number="04"
          label="SELECTED WORK"
          title={
            <>
              From an idea
              <br />
              to <em>something real.</em>
            </>
          }
          description="Dashboards, storefronts, and a little play. A selection of my frontend work."
        />
        <div className="project-toolbar">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? "selected" : ""}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
                {item === "All work" && <span>07</span>}
              </button>
            ))}
          </div>
          <span className="project-count" aria-live="polite">
            {visible.length} PROJECTS
          </span>
        </div>
        <motion.div layout={!reduce} className="projects-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project, position) => (
              <motion.div
                layout={!reduce}
                key={project.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : (position % 2) * 0.07, layout: { duration: reduce ? 0 : 0.25 } }}
              >
                <Card project={project} index={projects.indexOf(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <Reveal className="github-callout">
          <Icon name="github" size={25} />
          <p>A closer look at the code.</p>
          <a
            href="https://github.com/ukaninirmik65-hash"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore my GitHub <Icon name="arrow" size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
