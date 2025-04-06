import React from "react";
import "./Education.css";

const educationData = [
  {
    institution: "Staffordshire University",
    title: "Undergraduate – Software Development BSc (Hons)",
    period: "09/2024 – 06/2028",
    details:
      "Engaging in a comprehensive curriculum covering algorithms, web development, data science, and software engineering principles. Collaborating on industry projects and practical labs to build a strong foundation in modern programming languages and technologies.",
  },
  {
    institution: "Northcoders",
    title: "Junior Software Developer",
    period: "06/2024 – 08/2024",
    details:
      "Participated in a full-stack development programme focusing on building web applications using React and Node.js. Emphasised Agile practices, test-driven development, and version control. Contributed to real-world projects, enhancing skills in database management and software deployment.",
  },
  {
    institution: "Rana University",
    title: "Bachelor’s in Software Engineering (unfinished)",
    period: "01/2022 – 06/2023",
    details:
      "Completed core modules in software design, algorithms, and system architecture. Gained practical insights into collaborative project work and industry-standard practices. Although the degree was not completed, valuable knowledge and skills in software engineering fundamentals were developed.",
  },
];

function Education() {
  return (
    <section className="education-container">
      <header className="education-header">
        <h1>Education</h1>
      </header>
      <div className="education-list">
        {educationData.map((edu, idx) => (
          <article key={idx} className="education-item">
            <h2 className="education-institution">{edu.institution}</h2>
            <p className="education-title">
              {edu.title}{" "}
              <span className="education-period">({edu.period})</span>
            </p>
            <p className="education-details">{edu.details}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Education;
