import { Link } from "react-router-dom";
import "./MyPlants.css";

function MyPlants() {
  return (
    <section className="project-detail-container">
      <header className="project-detail-header">
        <h1>My-Plants</h1>
      </header>
      <article className="project-detail-content">
        <p>
          Collaboratively developed a plant care app using React Native and
          Express/MongoDB. Features include user login, reminders, and plant
          tracking through a scalable API architecture.
        </p>
        <p>
          <strong>Technologies Used:</strong> React Native, Express, MongoDB.
        </p>
        <p>
          <strong>Skills Gained:</strong> Mobile App Development, API
          Architecture, Collaborative Development.
        </p>
      </article>
      <div className="project-detail-buttons">
        <a
          className="btn contained"
          href="https://github.com/AOYousufi/my-plants"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repo
        </a>
      </div>
      <footer className="project-detail-footer">
        <Link className="back-link" to="/projects">
          ← Back to Projects
        </Link>
      </footer>
    </section>
  );
}

export default MyPlants;
