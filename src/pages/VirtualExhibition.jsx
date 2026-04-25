import { Link } from "react-router-dom";
import "../components/ProjectDetail.css";

function VirtualExhibition() {
  return (
    <div className="project-detail-page">
      <div className="project-detail-hero">
        <h1>Virtual Exhibition</h1>
        <div className="project-detail-badges">
          {["React", "Node.js", "Express", "REST APIs", "CSS3"].map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
      </div>

      <div className="project-detail-body glass-card">
        <p>
          Developed a responsive web app using JavaScript, React, Node.js, and
          Express. Integrated Harvard &amp; V&amp;A museum APIs with advanced
          filtering and pagination, focusing on performance and accessibility.
        </p>
        <p>
          <strong>Technologies:</strong> JavaScript, React, Node.js, Express, REST APIs
        </p>
        <p>
          <strong>Skills gained:</strong> API integration, responsive design, performance optimisation
        </p>

        <div className="project-detail-links">
          <a
            href="https://github.com/AOYousufi/Virtual-Exhibition"
            target="_blank"
            rel="noopener noreferrer"
            className="project-detail-btn"
          >
            GitHub
          </a>
          <a
            href="https://mueseumexhibition.netlify.app/"
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

export default VirtualExhibition;
