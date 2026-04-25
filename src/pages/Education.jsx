import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../utils/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./Education.css";

const EDUCATION = [
  {
    institution: "Staffordshire University",
    title: "Software Development BSc (Hons)",
    period: "Sep 2024 – Jun 2028",
    details:
      "Comprehensive degree covering full-stack development, data structures, algorithms, web & mobile, software architecture, and database systems. Building strong foundations through practical labs and Agile group projects.",
  },
  {
    institution: "Northcoders",
    title: "Junior Software Developer Bootcamp",
    period: "Jun 2024 – Aug 2024",
    details:
      "Intensive full-time bootcamp specialising in full-stack JavaScript. Built React, React Native, Node.js, Express, and PostgreSQL projects. Practiced TDD with Jest & Supertest, Agile sprints, pair programming, and Git workflows.",
  },
  {
    institution: "Rana University",
    title: "Software Engineering (unfinished)",
    period: "Jan 2022 – Jun 2023",
    details:
      "Completed modules in algorithm design, object-oriented programming, and system analysis. Programme interrupted by relocation — provided a solid technical foundation for ongoing development.",
  },
  {
    institution: "Faqir Frozi High School",
    title: "Secondary Education (GCSE equivalent)",
    period: "2017 – 2020",
    details:
      "Strong academic results across Mathematics, Science, and English. Developed critical thinking, problem-solving skills, and teamwork through coursework and extracurricular activities.",
  },
];

const CERTIFICATIONS = [
  {
    title: "IT Help Desk Support Training",
    issuer: "Rana University Afg",
    date: "Completed Jun 2020",
  },
];

function Education() {
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
        stagger: 0.12,
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
        <h1 className="timeline-page-title section-title">Education</h1>
        <p className="timeline-page-subtitle">
          My academic journey and qualifications.
        </p>

        <div className="timeline">
          {EDUCATION.map((edu, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-card glass-card">
                <span className="timeline-period">{edu.period}</span>
                <h2 className="edu-institution">{edu.institution}</h2>
                <p className="edu-title">{edu.title}</p>
                <p className="edu-details">{edu.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Certifications ─────────────────────────────────────────── */}
        <h2 className="timeline-section-heading">Certifications</h2>
        <div className="timeline">
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-card glass-card">
                <span className="timeline-period">{cert.date}</span>
                <h3 className="edu-institution">{cert.title}</h3>
                <p className="edu-title" style={{ color: "var(--accent-blue)" }}>{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Education;
