import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import profilePic from "../assets/IMG_7669.jpg";
function Home() {
  return (
    <section className="home-container">
      <motion.article
        className="home-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={profilePic}
          alt="Ahmad Ozair Yousufi"
          className="profile-pic"
        />
        <h1>Ahmad Ozair Yousufi</h1>
        <h2>Junior Software Engineer</h2>
        <p>
          I’m Ahmad, a passionate Junior Software Engineer based in the UK.
          Currently studying Software Development BSc (Hons) at Staffordshire
          University, I bring hands-on experience in JavaScript, React, Node.js,
          and SQL, with projects spanning full-stack web and mobile apps and many more.
          <br />
          <br />
          My background in business taught me leadership, problem-solving, and
          adaptability— qualities I now apply to coding and teamwork. I thrive
          in Agile environments, use Git daily, and enjoy building clean,
          user-focused solutions.
          <br />
          <br />
          Beyond tech, I’m a lifelong learner, volleyball enthusiast, and
          someone who values growth, purpose, and impact. My goal is simple: to
          keep learning, keep
        </p>
        <div className="home-buttons">
          <Link to="/projects" className="home-btn home-btn--filled">
            View Projects
          </Link>
          <Link to="/education" className="home-btn home-btn--outline">
            Education
          </Link>
        </div>
      </motion.article>
    </section>
  );
}

export default Home;
