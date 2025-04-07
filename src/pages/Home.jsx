import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import profilePic from "../assets/IMG_7932 (3).jpg";
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
        <h2>Junior Software Developer</h2>
        <p>
          I'm Ahmad Ozair Yousufi, a passionate and proactive Junior Software
          Developer based in the UK, originally from Afghanistan. I'm currently
          pursuing a BSc (Hons) in Software Development at Staffordshire
          University, driven by a deep love for technology and problem-solving.
          My journey began with managing a retail business, where I developed
          real-world skills in leadership, adaptability, and customer
          service—skills I now bring into the world of software development.
          <br />
          <br />
          I have a solid foundation in JavaScript, Node.js, React, and SQL, with
          experience across full-stack development. I’ve contributed to projects
          involving web and mobile app development, including work with React
          Native, Express, and MongoDB. I'm proficient with Git, GitHub, TDD,
          and Agile methodologies, and I enjoy collaborative environments where
          I can continuously grow and share knowledge.
          <br />
          <br />
          Outside of coding, I’m a volleyball enthusiast, a curious learner, and
          a devoted Muslim whose values guide both my personal and professional
          life. I'm deeply committed to growth, both spiritually and
          intellectually. My ultimate goal is not just to build software, but to
          build a life of purpose—where I can make meaningful impact through
          technology and character.
          <br />
          <br />
          I’m always open to learning new technologies, exploring AI
          integration, and contributing to forward-thinking, user-centric
          solutions. Whether it’s building polished interfaces or solving
          backend challenges, I approach each task with energy, faith, and a
          clear intention to improve.
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
