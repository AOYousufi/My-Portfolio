import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../utils/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./WorkExperience.css";

const WORK = [
  {
    role: "Freelance Consultant",
    company: "Tech Returners",
    location: "Remote",
    period: "Feb 2025 – Mar 2025",
    bullets: [
      "Developed a full-stack web app using React, Node.js, Express, and MongoDB.",
      "Implemented RESTful APIs and integrated Harvard & V&A museum data.",
      "Deployed on Netlify and Render with CI/CD pipelines.",
    ],
  },
  {
    role: "Website Developer",
    company: "Unitemps — Staffordshire University",
    location: "Stoke-on-Trent, UK",
    period: "Feb 2025 – Mar 2025",
    bullets: [
      "Created wireframes and UI mockups for the university web team.",
      "Attended weekly stakeholder meetings to align design with brand guidelines.",
      "Ensured visual consistency across all digital touchpoints.",
    ],
  },
  {
    role: "Customer Service Assistant",
    company: "Marks & Spencer",
    location: "Stone, UK",
    period: "Dec 2024 – Feb 2025",
    bullets: [
      "Collaborated with a fast-paced team to meet daily operational targets.",
      "Managed task prioritisation under time pressure.",
      "Developed communication and customer-facing skills.",
    ],
  },
];

function WorkExperience() {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from(".timeline-page-title", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".timeline-page", start: "top 88%", once: true },
      });

      gsap.from(".timeline-card", {
        opacity: 0,
        y: 35,
        stagger: 0.13,
        duration: 0.65,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".timeline", start: "top 88%", once: true },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section className="timeline-page">
        <h1 className="timeline-page-title section-title">Work Experience</h1>
        <p className="timeline-page-subtitle">
          Roles where I&apos;ve built real products and grown as an engineer.
        </p>

        <div className="timeline">
          {WORK.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-card glass-card">
                <span className="timeline-period">{item.period}</span>
                <h2 className="work-role">{item.role}</h2>
                <p className="work-company">
                  {item.company}
                  <span className="work-location"> · {item.location}</span>
                </p>
                <ul className="work-bullets">
                  {item.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default WorkExperience;
