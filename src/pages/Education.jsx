import "./Education.css";

const educationData = [
  {
    institution: "Staffordshire University",
    title: "Undergraduate – Software Development BSc (Hons)",
    period: "09/2024 – 06/2028",
    details:
      "Currently enrolled in a comprehensive degree programme covering full-stack development, data structures, algorithms, web and mobile development, software architecture, and database systems. Regularly engage in practical labs and collaborative group projects that simulate real-world industry scenarios. Building strong foundations in modern technologies, design patterns, and agile project delivery.",
  },
  {
    institution: "Northcoders",
    title: "Junior Software Developer",
    period: "06/2024 – 08/2024",
    details:
      "Completed an intensive full-time software development bootcamp, specialising in full-stack JavaScript development. Designed and built responsive web and mobile applications using React, React Native, Node.js, Express, and PostgreSQL. Applied Test Driven Development (TDD) principles using Jest and Supertest to ensure robust, maintainable code. Collaborated daily in Agile teams using pair programming, Git version control, GitHub, and Scrum practices including stand-ups, sprints, and retrospectives. Led and contributed to real-world projects from planning through to deployment, gaining strong experience in problem-solving, clean code practices, RESTful API design, backend logic, and frontend responsiveness. Gained confidence in debugging, branching strategies, database modelling, and communicating effectively within technical teams.",
  },
  {
    institution: "Rana University",
    title: "Bachelor’s in Software Engineering (unfinished)",
    period: "01/2022 – 06/2023",
    details:
      "Completed key modules in software development fundamentals, including algorithm design, object-oriented programming, and system analysis. Participated in team-based projects focusing on problem-solving and application design. Though the programme was not completed due to relocation, it provided a strong technical and academic foundation that supports my ongoing development as a software engineer.",
  },
  {
    institution: "Faqir Frozi High School",
    title: "Secondary Education (Equivalent to GCSEs)",
    period: "01/2017 – 06/2020",
    details:
      "Achieved strong academic results across core subjects including Mathematics, Science, and English. Developed critical thinking and problem-solving skills through coursework and examinations. Participated in extracurricular activities that enhanced teamwork and leadership abilities.",
  },
];

const certificationsData = [
  {
    title: "IT Help Desk Support Training",
    issuer: "Rana University Afg",
    date: "Completed: 06/2020",
  },
];
function Education() {
  return (
    <>
      <section className="section-container education-container">
        <header className="section-header">
          <h1>Education</h1>
        </header>

        <div className="section-list">
          {educationData.map((edu, idx) => (
            <article key={idx} className="card education-item">
              <h2 className="education-institution">{edu.institution}</h2>
              <p className="education-title">
                {edu.title} <span className="accent-period">{edu.period}</span>
              </p>
              <p className="education-details">{edu.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container certifications-container">
        <header className="section-header">
          <h1>Certifications</h1>
        </header>

        <div className="section-list">
          {certificationsData.map((cert, idx) => (
            <article key={idx} className="card certifications-item">
              <h2 className="certifications-title">{cert.title}</h2>
              <p className="certifications-issuer">
                {cert.issuer} <span className="accent-period">{cert.date}</span>
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Education;
