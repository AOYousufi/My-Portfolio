import { Link } from "react-router-dom";
import "../components/ProjectDetail.css";

function MyPlants() {
  return (
    <div className="project-detail-page">
      <div className="project-detail-hero">
        <h1>My-Plants</h1>
        <div className="project-detail-badges">
          {["React Native", "Expo", "Express", "MongoDB"].map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
      </div>

      <div className="project-detail-body glass-card">
        <p>
          Collaboratively developed a plant-care app using React Native and
          Express/MongoDB. Features include user login, smart reminders, and
          plant tracking through a scalable API architecture.
        </p>
        <p>
          <strong>Technologies:</strong> React Native, Expo, Express, MongoDB
        </p>
        <p>
          <strong>Skills gained:</strong> Mobile app development, API architecture, collaborative development
        </p>

        <div className="project-detail-links">
          <a
            href="https://github.com/AOYousufi/my-plants"
            target="_blank"
            rel="noopener noreferrer"
            className="project-detail-btn"
          >
            GitHub
          </a>
          <Link to="/projects" className="back-link">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}

export default MyPlants;
