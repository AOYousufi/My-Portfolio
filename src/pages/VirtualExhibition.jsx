import React from "react";
import { Link } from "react-router-dom";
import "./VirtualExhibition.css";

function VirtualExhibition() {
  return (
    <section className="project-detail-container">
      <header className="project-detail-header">
        <h1>Virtual Exhibition</h1>
      </header>
      <article className="project-detail-content">
        <p>
          Developed a responsive web app using JavaScript, React, Node.js, and
          Express. Integrated Harvard &amp; V&amp;A museum APIs with advanced
          filtering and pagination, focusing on performance and accessibility.
        </p>
        <p>
          <strong>Technologies Used:</strong> JavaScript, React, Node.js,
          Express, APIs.
        </p>
        <p>
          <strong>Skills Gained:</strong> API Integration, Responsive Design,
          Performance Optimisation.
        </p>
      </article>
      <div className="project-detail-buttons">
        <a
          className="virtual-exhibition-btn virtual-exhibition-btn--contained"
          href="https://github.com/AOYousufi/Virtual-Exhibition"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repo
        </a>
        <a
          className="virtual-exhibition-btn virtual-exhibition-btn--outlined"
          href="https://mueseumexhibition.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Demo
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

export default VirtualExhibition;
