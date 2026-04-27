import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../utils/gsap";
import { Link } from "react-router-dom";
import { useTypewriter } from "../hooks/useTypewriter";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./Home.css";
import profilePic from "../assets/IMG_7669.jpg";

const PHRASES = [
  "Junior Software Engineer",
  "React & Node.js Developer",
  "Full-Stack Builder",
  "Problem Solver",
];

const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    label: "Mobile & Tools",
    skills: ["React Native", "Git", "Jest", "Vite"],
  },
];

const STATS = [
  { value: "4+",        label: "Projects Built"  },
  { value: "Full-Stack", label: "Specialisation" },
  { value: "BSc",       label: "Software Dev"    },
  { value: "UK",        label: "Based"           },
];

function Home() {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const typeText = useTypewriter(PHRASES, 55, 2000);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-eyebrow",    { opacity: 0, y: 14, duration: 0.5 })
        .from(".hero-name",       { opacity: 0, y: 36, duration: 0.7 }, "-=0.25")
        .from(".hero-role",       { opacity: 0, y: 14, duration: 0.45 }, "-=0.3")
        .from(".hero-bio",        { opacity: 0, y: 14, duration: 0.45 }, "-=0.25")
        .from(".hero-cta > *",    { opacity: 0, y: 12, stagger: 0.1, duration: 0.4 }, "-=0.2")
        .from(".hero-social > *", { opacity: 0, y: 8,  stagger: 0.07, duration: 0.35 }, "-=0.25")
        .from(".hero-visual",     { opacity: 0, scale: 0.88, duration: 0.85, ease: "power3.out" }, "<0.25");

      gsap.from(".about-text > *", {
        opacity: 0, y: 28, stagger: 0.1, duration: 0.7, ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".about-section", start: "top 80%", once: true },
      });

      gsap.from(".stat-card", {
        opacity: 0, scale: 0.82, stagger: 0.08, duration: 0.5, ease: "back.out(1.7)",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".about-stats", start: "top 88%", once: true },
      });

      gsap.from(".skills-badge", {
        opacity: 0, scale: 0.72, stagger: 0.04, duration: 0.45, ease: "back.out(1.7)",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".skills-section", start: "top 88%", once: true },
      });

      gsap.from(".skill-group-label", {
        opacity: 0, x: -16, stagger: 0.1, duration: 0.5, ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".skills-section", start: "top 85%", once: true },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero-section" aria-label="Introduction">
        <div className="hero-orbs" aria-hidden="true">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
        </div>
        <div className="hero-grid-bg" aria-hidden="true" />

        <div className="hero-content">

          {/* Left — Text */}
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span className="hero-status-dot" aria-hidden="true" />
              Available for opportunities
            </div>

            <h1 className="hero-name">
              Ahmad Ozair<br />Yousufi
            </h1>

            <h2 className="hero-role" aria-live="polite">
              {reducedMotion ? PHRASES[0] : typeText}
              <span className="tw-cursor" aria-hidden="true">|</span>
            </h2>

            <p className="hero-bio">
              Full-stack developer building clean, tested, and performant web
              &amp; mobile applications. Currently studying Software Development
              BSc at Staffordshire University.
            </p>

            <div className="hero-cta">
              <Link to="/projects" className="btn-primary">View Projects</Link>
              <Link to="/contact"  className="btn-secondary">Get In Touch</Link>
            </div>

            <div className="hero-social" aria-label="Social links">
              <a
                href="https://github.com/AOYousufi"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.8 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ahmad-ozair-yousufi-08b469326"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:ozairyousufi1400@gmail.com"
                className="hero-social-link"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right — Photo */}
          <div className="hero-visual" aria-hidden="true">
            <div className="profile-frame">
              <div className="profile-ring-glow" />
              <div className="profile-ring" />
              <div className="profile-img-wrap">
                <img
                  src={profilePic}
                  alt="Ahmad Ozair Yousufi"
                  className="profile-img"
                  width="300"
                  height="300"
                />
              </div>
              <div className="profile-status-badge">
                <span className="profile-status-dot" />
                Open to work
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section className="about-section" aria-label="About me">
        <div className="home-section-bg" aria-hidden="true" />

        <div className="about-heading">
          <h2 className="about-title">About Me</h2>
          <div className="about-title-line" aria-hidden="true" />
          <p className="about-eyebrow">Who I am</p>
        </div>

        <div className="about-body">
          <div className="about-text">
            <p>
              I&apos;m Ahmad, a passionate Junior Software Engineer based in the
              UK. Studying Software Development BSc&nbsp;(Hons) at Staffordshire
              University, I bring hands-on experience in JavaScript, React,
              Node.js, and SQL — with projects spanning full-stack web and mobile
              apps.
            </p>
            <p>
              My background in business gave me leadership, problem-solving, and
              adaptability — skills I now channel into code. I thrive in Agile
              environments, ship clean and tested solutions, and believe great
              software is built through collaboration and continuous learning.
            </p>
            <div className="about-links">
              <Link to="/education"      className="btn-secondary btn-sm">Education</Link>
              <Link to="/work-experience" className="btn-secondary btn-sm">Experience</Link>
            </div>
          </div>

          <div className="about-stats" aria-label="Key facts">
            {STATS.map((s) => (
              <div key={s.label} className="stat-card glass-card">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────── */}
      <section className="skills-section" aria-label="Tech stack">
        <div className="home-section-bg" aria-hidden="true" />

        <div className="skills-heading">
          <h2 className="skills-title">Tech Stack</h2>
          <div className="skills-title-line" aria-hidden="true" />
          <p className="skills-eyebrow">Tools I work with</p>
        </div>

        <div className="skills-groups">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="skill-group">
              <h3 className="skill-group-label">{group.label}</h3>
              <div className="skill-group-badges">
                {group.skills.map((skill) => (
                  <span key={skill} className="badge skills-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
