import { Link } from "react-router-dom";
import "./Projects.css";

const projects = [
  {
    title: "Virtual Exhibition",
    description:
      "A responsive web app integrating Harvard & V&A museum APIs with advanced filtering and pagination.",
    path: "/projects/virtual-exhibition",
  },
  {
    title: "NC-News",
    description:
      "A full-stack news app featuring article browsing, voting, commenting, and user authentication.",
    path: "/projects/nc-news",
  },
  {
    title: "My-Plants",
    description:
      "A collaborative plant care app with login, reminders, and plant tracking using scalable API architecture.",
    path: "/projects/my-plants",
  },
];

function Projects() {
  return (
    <section className="projects-container">
      <header className="projects-header">
        <h1>Projects</h1>
      </header>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article key={index} className="project-card">
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
            </div>
            <footer className="project-actions">
              <Link to={project.path} className="btn learn-more">
                Learn More
              </Link>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
