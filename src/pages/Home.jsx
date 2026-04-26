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

const SKILLS = [
  "React", "JavaScript", "TypeScript", "Node.js", "Express",
  "PostgreSQL", "MongoDB", "React Native", "REST APIs",
  "Git", "Jest", "HTML5", "CSS3", "Vite",
];

function Home() {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const typeText = useTypewriter(PHRASES, 55, 2000);

  useGSAP(
    () => {
      if (reducedMotion) return;

      /* ── Hero entrance ── */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-card", { opacity: 0, scale: 0.96, duration: 0.7 })
        .from(".hero-greeting", { opacity: 0, y: 12, duration: 0.45 }, "-=0.35")
        .from(".hero-title",    { opacity: 0, y: 28, duration: 0.6  }, "-=0.25")
        .from(".hero-subtitle", { opacity: 0, y: 12, duration: 0.45 }, "-=0.3")
        .from(".hero-cta > *",  { opacity: 0, y: 12, stagger: 0.1, duration: 0.4 }, "-=0.25");

      /* ── About section ── */
      gsap.from(".about-img", {
        opacity: 0,
        scale: 0.85,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".about-section", start: "top 82%", once: true },
        onComplete() {
          gsap.to(".about-img", {
            y: -10,
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      });

      gsap.from(".about-text > *", {
        opacity: 0,
        x: 35,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".about-section", start: "top 82%", once: true },
      });

      /* ── Skills section ── */
      gsap.from(".skills-badge", {
        opacity: 0,
        scale: 0.72,
        stagger: 0.04,
        duration: 0.45,
        ease: "back.out(1.7)",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".skills-section", start: "top 88%", once: true },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-orbs" aria-hidden="true">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
        </div>

        <div className="hero-card glass-card">
          <span className="hero-greeting">Hello, I&apos;m</span>
          <h1 className="hero-title">Ahmad Ozair<br />Yousufi</h1>
          <h2 className="hero-subtitle" aria-live="polite">
            {reducedMotion ? PHRASES[0] : typeText}
            <span className="tw-cursor" aria-hidden="true">|</span>
          </h2>
          <div className="hero-cta">
            <Link to="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-photo">
            <img
              src={profilePic}
              alt="Ahmad Ozair Yousufi — portrait"
              className="about-img"
              loading="lazy"
              width="400"
              height="400"
            />
          </div>
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
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
              <Link to="/education" className="btn-secondary btn-sm">
                Education
              </Link>
              <Link to="/work-experience" className="btn-secondary btn-sm">
                Experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────── */}
      <section className="skills-section">
        <h2 className="section-title">Tech Stack</h2>
        <p className="skills-subtitle">
          Tools and technologies I work with regularly.
        </p>
        <div className="skills-grid">
          {SKILLS.map((skill) => (
            <span key={skill} className="badge skills-badge">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
