import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../utils/gsap";
import { Link } from "react-router-dom";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./Projects.css";

const PROJECTS = [
  {
    title: "Virtual Exhibition",
    description:
      "A responsive web app integrating Harvard & V&A museum APIs with advanced filtering, pagination, and performant data rendering.",
    stack: ["React", "Node.js", "Express", "REST APIs", "CSS3"],
    path: "/projects/virtual-exhibition",
    github: "https://github.com/AOYousufi/Virtual-Exhibition",
    live: "https://mueseumexhibition.netlify.app/",
  },
  {
    title: "NC-News",
    description:
      "Full-stack news platform featuring article browsing, upvoting, nested comments, and user authentication with a PostgreSQL backend.",
    stack: ["React", "Node.js", "Express", "PostgreSQL"],
    path: "/projects/nc-news",
    github: "https://github.com/AOYousufi/nc-news",
    live: "https://nc-news-sultan.netlify.app/",
  },
  {
    title: "My-Plants",
    description:
      "Collaborative React Native plant-care app with user login, smart reminders, and plant tracking powered by a scalable MongoDB API.",
    stack: ["React Native", "Express", "MongoDB", "Expo"],
    path: "/projects/my-plants",
    github: "https://github.com/AOYousufi/my-plants",
    live: null,
  },
];

function Projects() {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from(".projects-page-title", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".projects-page-title",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".project-card", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="projects-section" ref={containerRef}>
      <h1 className="projects-page-title section-title">Projects</h1>
      <p className="projects-subtitle">
        A selection of things I&apos;ve built — hover a card to explore.
      </p>

      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <article key={project.title} className="project-card glass-card">
            <div className="project-card-body">
              <h2 className="project-card-title">{project.title}</h2>
              <div className="project-stack">
                {project.stack.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
              <p className="project-card-desc">{project.description}</p>
            </div>

            <div className="project-card-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
              >
                GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn project-link-btn--live"
                >
                  Live Demo
                </a>
              )}
              <Link to={project.path} className="project-link-btn">
                Details →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
