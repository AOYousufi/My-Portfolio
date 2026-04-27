import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import AYLogo from '../assets/ay-logo.svg'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Home',      to: '/',               exact: true  },
  { label: 'Projects',  to: '/projects',        exact: false },
  { label: 'Education', to: '/education',       exact: false },
  { label: 'Work',      to: '/work-experience', exact: false },
]

function isActive(pathname, to, exact) {
  return exact ? pathname === to : pathname.startsWith(to)
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.8 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="navbar-container">

        <div className="navbar-brand">
          <Link to="/" aria-label="Ahmad Ozair Yousufi — Home">
            <img src={AYLogo} alt="AY" height="40" width="auto" />
          </Link>
        </div>

        <button
          className={`menu-toggle${open ? ' is-open' : ''}`}
          aria-label="Toggle navigation menu"
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
          className={`navbar-links${open ? ' is-open' : ''}`}
          role="list"
        >
          {NAV_LINKS.map(({ label, to, exact }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nav-link${isActive(pathname, to, exact) ? ' nav-link--active' : ''}`}
                aria-current={isActive(pathname, to, exact) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Icon-only external links — desktop */}
          <li className="nav-icon-item">
            <a
              href="https://github.com/AOYousufi"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-link"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
            </a>
          </li>
          <li className="nav-icon-item">
            <a
              href="https://www.linkedin.com/in/ahmad-ozair-yousufi-08b469326"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-link"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
          </li>

          {/* Mobile-only text links */}
          <li className="nav-mobile-only">
            <a
              href="https://github.com/AOYousufi"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </li>
          <li className="nav-mobile-only">
            <a
              href="https://www.linkedin.com/in/ahmad-ozair-yousufi-08b469326"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              LinkedIn
            </a>
          </li>

          {/* Hire Me CTA */}
          <li>
            <Link
              to="/contact"
              className={`nav-hire${isActive(pathname, '/contact', false) ? ' nav-hire--active' : ''}`}
            >
              Hire Me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
