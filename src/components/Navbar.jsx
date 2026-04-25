import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assets/Logo in Blue, Gray, and Teal.png";

const NAV_LINKS = [
  { label: "Home",      to: "/",               exact: true },
  { label: "Projects",  to: "/projects",        exact: false },
  { label: "Education", to: "/education",       exact: false },
  { label: "Work",      to: "/work-experience", exact: false },
  { label: "Contact",   to: "/contact",         exact: false },
];

const EXTERNAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/AOYousufi" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmad-ozair-yousufi-08b469326" },
];

function isActive(pathname, to, exact) {
  return exact ? pathname === to : pathname.startsWith(to);
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" aria-label="Home">
            <img src={Logo} alt="Ahmad Ozair Yousufi" />
          </Link>
        </div>

        <button
          className={`menu-toggle${open ? " is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>

        <ul
          id="primary-navigation"
          className={`navbar-links${open ? " is-open" : ""}`}
        >
          {NAV_LINKS.map(({ label, to, exact }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nav-link${isActive(pathname, to, exact) ? " nav-link--active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
          {EXTERNAL_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
