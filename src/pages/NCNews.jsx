import { Link } from "react-router-dom";
import "../components/ProjectDetail.css";

function NCNews() {
  return (
    <div className="project-detail-page">
      <div className="project-detail-hero">
        <h1>NC-News</h1>
        <div className="project-detail-badges">
          {["React", "Node.js", "Express", "PostgreSQL"].map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
      </div>

      <div className="project-detail-body glass-card">
        <p>
          Built a full-stack news app featuring article browsing, voting,
          commenting, and user authentication using React on the front-end and
          Express/Node.js with PostgreSQL on the back-end.
        </p>
        <p>
          <strong>Technologies:</strong> React, Node.js, Express, PostgreSQL
        </p>
        <p>
          <strong>Skills gained:</strong> Full-stack development, RESTful API integration, database management
        </p>

        <div className="project-detail-links">
          <a
            href="https://github.com/AOYousufi/nc-news"
            target="_blank"
            rel="noopener noreferrer"
            className="project-detail-btn"
          >
            GitHub
          </a>
          <a
            href="https://nc-news-sultan.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-detail-btn outline"
          >
            Live Demo
          </a>
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}

export default NCNews;
