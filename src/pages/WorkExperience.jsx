import React from "react";
import "./WorkExperience.css";

const workExperienceData = [
  {
    role: "Tech Returners- Freelance Consultant",
    location: "Remote",
    period: "Feb 2025 - March 2025",
    description:
      "Developed a full-stack web application using React, Node.js, Express, and MongoDB. Implemented RESTful APIs, integrated museum data, and deployed the application on netlify and Render.",
  },
  {
    role: "Unitemps – Website Developer",
    location: "Stoke-on-Trent, UK",
    period: "Feb 2025 - March 2025",
    description:
      "Created wireframes, attended weekly meetings, and ensured brand consistency.",
  },
  {
    role: "Marks & Spencer – Customer Service Assistant",
    location: "Stone, UK",
    period: "Dec 2024 - Feb 2025",
    description:
      "Collaborated with colleagues to meet operational goals and managed task prioritisation.",
  },
];

function WorkExperience() {
  return (
    <section className="work-experience-container">
      <header className="work-experience-header">
        <h1>Work Experience</h1>
      </header>
      <ul className="work-experience-list">
        {workExperienceData.map((item, idx) => (
          <li key={idx} className="work-experience-item">
            <h2 className="work-experience-role">{item.role}</h2>
            <p className="work-experience-details">
              {item.location} ({item.period}) – {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WorkExperience;
