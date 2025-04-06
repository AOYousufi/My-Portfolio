import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import VirtualExhibition from "./pages/VirtualExhibition";
import NCNews from "./pages/NCNews";
import MyPlants from "./pages/MyPlants";
import Education from "./pages/Education";
import WorkExperience from "./pages/WorkExperience";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <section id="home">
            <Home />
          </section>
        }
      />
      <Route
        path="/projects"
        element={
          <section id="projects">
            <Projects />
          </section>
        }
      />
      <Route
        path="/projects/virtual-exhibition"
        element={
          <section id="virtual-exhibition">
            <VirtualExhibition />
          </section>
        }
      />
      <Route
        path="/projects/nc-news"
        element={
          <section id="nc-news">
            <NCNews />
          </section>
        }
      />
      <Route
        path="/projects/my-plants"
        element={
          <section id="my-plants">
            <MyPlants />
          </section>
        }
      />
      <Route
        path="/education"
        element={
          <section id="education">
            <Education />
          </section>
        }
      />
      <Route
        path="/work-experience"
        element={
          <section id="work-experience">
            <WorkExperience />
          </section>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <header>
          <Navbar />
        </header>
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
