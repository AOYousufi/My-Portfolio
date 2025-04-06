import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";

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
          src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          alt="Ahmad Ozair Yousufi"
          className="profile-pic"
        />
        <h1>Ahmad Ozair Yousufi</h1>
        <h2>Junior Software Developer</h2>
        <p>
          Passionate and proactive Junior Developer pursuing a degree in
          Software Development at Staffordshire University. I love building
          futuristic, elegant, and user-centric experiences through code.
        </p>
        <div className="home-buttons">
          <Link to="/projects" className="btn filled">
            View Projects
          </Link>
          <Link to="/education" className="btn outline">
            Education
          </Link>
        </div>
      </motion.article>
    </section>
  );
}

export default Home;
