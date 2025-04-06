import React from "react";
import { Link } from "react-router-dom";
import "./NCNews.css";

function NCNews() {
  return (
    <section className="project-detail-container">
      <header className="project-detail-header">
        <h1>NC-News</h1>
      </header>
      <article className="project-detail-content">
        <p>
          Built a full-stack news app featuring article browsing, voting,
          commenting, and user authentication using React on the front-end and
          Express/Node.js with PostgreSQL on the back-end.
        </p>
        <p>
          <strong>Technologies Used:</strong> React, Node.js, Express,
          PostgreSQL.
        </p>
        <p>
          <strong>Skills Gained:</strong> Full-stack Development, RESTful API
          Integration, Database Management.
        </p>
      </article>
      <div className="project-detail-buttons">
        <a
          className="btn contained"
          href="https://github.com/ozairyousufi/nc-news"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repo
        </a>
        <a
          className="btn outlined"
          href="https://ncnews.demo"
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

export default NCNews;
