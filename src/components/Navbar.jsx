import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-brand">Ahmad Ozair Yousufi</div>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className="nav-link">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/education" className="nav-link">
              Education
            </Link>
          </li>
          <li>
            <Link to="/work-experience" className="nav-link">
              Work
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/AOYousufi"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/ahmad-ozair-yousufi-08b469326"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
